import defineEnvironment from "../defineEnvironment";
import { parseCD } from "./cd";
import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { StyleLevel } from "../constants"
import ParseError from "../ParseError";
import { assertNodeType, assertSymbolNodeType } from "../parseNode";
import { checkSymbolNodeType } from "../parseNode";

import * as mml from "../buildMathML";

// Helper functions
function getHLines(parser) {
  // Return an array. The array length = number of hlines.
  // Each element in the array tells if the line is dashed.
  const hlineInfo = [];
  parser.consumeSpaces();
  let nxt = parser.fetch().text;
  if (nxt === "\\relax") {
    parser.consume();
    parser.consumeSpaces();
    nxt = parser.fetch().text;
  }
  while (nxt === "\\hline" || nxt === "\\hdashline") {
    parser.consume();
    hlineInfo.push(nxt === "\\hdashline");
    parser.consumeSpaces();
    nxt = parser.fetch().text;
  }
  return hlineInfo;
}

const validateAmsEnvironmentContext = context => {
  const settings = context.parser.settings;
  if (!settings.displayMode) {
    throw new ParseError(`{${context.envName}} can be used only in display mode.`);
  }
}

const getTag = (group, style, rowNum) => {
  let tag
  const tagContents = group.tags.shift()
  if (tagContents) {
    // The author has written a \tag or a \notag in this row.
    if (tagContents.body) {
      tag = mml.buildExpressionRow(tagContents.body, style)
      tag.classes = ["tml-tag"]
    } else {
      // \notag. Return an empty span.
      tag = new mathMLTree.MathNode("mtext", [], [])
      return tag
    }
  } else if (group.envClasses.includes("multline") &&
    ((group.leqno && rowNum !== 0) || (!group.leqno && rowNum !== group.body.length - 1))) {
    // A multiline that does not receive a tag. Return an empty cell.
    tag = new mathMLTree.MathNode("mtext", [], [])
    return tag
  } else {
    // AMS automatcally numbered equaton.
    // Insert a class so the element can be populated by a post-processor.
    tag = new mathMLTree.MathNode("mtext", [], ["tml-eqn"])
  }
  return tag
}

/**
 * Parse the body of the environment, with rows delimited by \\ and
 * columns delimited by &, and create a nested list in row-major order
 * with one group per cell.  If given an optional argument scriptLevel
 * ("text", "display", etc.), then each cell is cast into that scriptLevel.
 */
function parseArray(
  parser,
  {
    cols, // [{ type: string , align: l|c|r|null }]
    envClasses, // align(ed|at|edat) | array | cases | cd | small | multline
    addEqnNum, // boolean
    singleRow, // boolean
    emptySingleRow, // boolean
    maxNumCols, // number
    leqno // boolean
  },
  scriptLevel
) {
  parser.gullet.beginGroup();
  if (!singleRow) {
    // \cr is equivalent to \\ without the optional size argument (see below)
    // TODO: provide helpful error when \cr is used outside array environment
    parser.gullet.macros.set("\\cr", "\\\\\\relax");
  }
  if (addEqnNum) {
    parser.gullet.macros.set("\\tag", "\\env@tag{\\text{#1}}");
    parser.gullet.macros.set("\\notag", "\\env@notag");
    parser.gullet.macros.set("\\nonumber", "\\env@notag")
  }

  // Start group for first cell
  parser.gullet.beginGroup();

  let row = [];
  const body = [row];
  const rowGaps = [];
  const tags = [];
  let rowTag;
  const hLinesBeforeRow = [];

  // Test for \hline at the top of the array.
  hLinesBeforeRow.push(getHLines(parser));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Parse each cell in its own group (namespace)
    let cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");

    if (addEqnNum && !rowTag) {
      // Check if the author wrote a \tag{} inside this cell.
      for (let i = 0; i < cell.length; i++) {
        if (cell[i].type === "envTag" || cell[i].type === "noTag") {
          // Get the contents of the \text{} nested inside the \env@Tag{}
          rowTag = cell[i].type === "envTag"
            ? cell.splice(i, 1)[0].body.body[0]
            : { body: null };
          break
        }
      }
    }
    parser.gullet.endGroup();
    parser.gullet.beginGroup();

    cell = {
      type: "ordgroup",
      mode: parser.mode,
      body: cell
    };
    row.push(cell);
    const next = parser.fetch().text;
    if (next === "&") {
      if (maxNumCols && row.length === maxNumCols) {
        if (envClasses.includes("array")) {
          if (parser.settings.strict) {
            throw new ParseError("Too few columns " + "specified in the {array} column argument.",
              parser.nextToken)
          }
        } else if (maxNumCols === 2) {
          throw new ParseError("The split environment accepts no more than two columns",
            parser.nextToken);
        } else {
          throw new ParseError("The equation environment accepts only one column",
            parser.nextToken)
        }
      }
      parser.consume();
    } else if (next === "\\end") {
      // Arrays terminate newlines with `\crcr` which consumes a `\cr` if
      // the last line is empty.  However, AMS environments keep the
      // empty row if it's the only one.
      // NOTE: Currently, `cell` is the last item added into `row`.
      if (row.length === 1 && cell.body.length === 0 && (body.length > 1 || !emptySingleRow)) {
        body.pop();
      }
      if (hLinesBeforeRow.length < body.length + 1) {
        hLinesBeforeRow.push([]);
      }
      break;
    } else if (next === "\\\\") {
      parser.consume();
      let size;
      // \def\Let@{\let\\\math@cr}
      // \def\math@cr{...\math@cr@}
      // \def\math@cr@{\new@ifnextchar[\math@cr@@{\math@cr@@[\z@]}}
      // \def\math@cr@@[#1]{...\math@cr@@@...}
      // \def\math@cr@@@{\cr}
      if (parser.gullet.future().text !== " ") {
        size = parser.parseSizeGroup(true);
      }
      rowGaps.push(size ? size.value : null);

      tags.push(rowTag)

      // check for \hline(s) following the row separator
      hLinesBeforeRow.push(getHLines(parser));

      row = [];
      rowTag = null;
      body.push(row);
    } else {
      throw new ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
    }
  }

  // End cell group
  parser.gullet.endGroup();
  // End array group defining \cr
  parser.gullet.endGroup();

  tags.push(rowTag)

  return {
    type: "array",
    mode: parser.mode,
    body,
    cols,
    rowGaps,
    hLinesBeforeRow,
    envClasses,
    addEqnNum,
    scriptLevel,
    tags,
    leqno
  };
}

// Decides on a scriptLevel for cells in an array according to whether the given
// environment name starts with the letter 'd'.
function dCellStyle(envName) {
  return envName.slice(0, 1) === "d" ? "display" : "text"
}

const alignMap = {
  c: "center ",
  l: "left ",
  r: "right "
};

const glue = group => {
  const glueNode = new mathMLTree.MathNode("mtd", [])
  glueNode.style = { padding: "0", width: "50%" }
  if (group.envClasses.includes("multline")) {
    glueNode.style.width = "7.5%"
  }
  return glueNode
}

const mathmlBuilder = function(group, style) {
  const tbl = [];
  const numRows = group.body.length
  const hlines = group.hLinesBeforeRow;

  for (let i = 0; i < numRows; i++) {
    const rw = group.body[i];
    const row = [];
    const cellLevel = group.scriptLevel === "text"
      ? StyleLevel.TEXT
      : group.scriptLevel === "script"
      ? StyleLevel.SCRIPT
      : StyleLevel.DISPLAY

    for (let j = 0; j < rw.length; j++) {
      const mtd = new mathMLTree.MathNode(
        "mtd",
        [mml.buildGroup(rw[j], style.withLevel(cellLevel))]
      )

      if (group.envClasses.includes("multline")) {
        const align = i === 0 ? "left" : i === numRows - 1 ? "right" : "center"
        mtd.setAttribute("columnalign", align)
        if (align !== "center") {
          mtd.style.textAlign = "-webkit-" + align
        }
      }
      row.push(mtd)
    }
    if (group.addEqnNum) {
      row.unshift(glue(group));
      row.push(glue(group));
      const tag = getTag(group, style.withLevel(cellLevel), i)
      if (group.leqno) {
        row[0].children.push(tag)
        row[0].style.textAlign = "-webkit-left"
      } else {
        row[row.length - 1].children.push(tag)
        row[row.length - 1].style.textAlign = "-webkit-right"
      }
    }
    const mtr = new mathMLTree.MathNode("mtr", row, [])
    // Write horizontal rules
    if (i === 0 && hlines[0].length > 0) {
      if (hlines[0].length === 2) {
        mtr.children.forEach(cell => { cell.style.borderTop = "0.15em double" })
      } else {
        mtr.children.forEach(cell => {
          cell.style.borderTop = hlines[0][0] ? "0.06em dashed" : "0.06em solid"
        })
      }
    }
    if (hlines[i + 1].length > 0) {
      if (hlines[i + 1].length === 2) {
        mtr.children.forEach(cell => { cell.style.borderBottom = "0.15em double" })
      } else {
        mtr.children.forEach(cell => {
          cell.style.borderBottom = hlines[i + 1][0] ? "0.06em dashed" : "0.06em solid"
        })
      }
    }
    tbl.push(mtr);
  }

  if (group.envClasses.length > 0) {
    const pad = group.envClasses.includes("jot")
      ? "0.7" // 0.5ex + 0.09em top & bot padding
      : group.envClasses.includes("small")
      ? "0.35"
      : "0.5" // 0.5ex default top & bot padding
    const sidePadding = group.envClasses.includes("abut")
      ? "0"
      : group.envClasses.includes("cases")
      ? "0"
      : group.envClasses.includes("small")
      ? "0.1389"
      : group.envClasses.includes("cd")
      ? "0.25"
      : "0.4" // default side padding

    const numCols = tbl.length === 0 ? 0 : tbl[0].children.length

    const sidePad = (j, hand) => {
      if (j === 0 && hand === 0) { return "0" }
      if (j === numCols - 1 && hand === 1) { return "0" }
      if (group.envClasses[0] !== "align") { return sidePadding }
      if (hand === 1) { return "0" }
      if (group.addEqnNum) {
        return (j % 2) ? "1" : "0"
      } else {
        return (j % 2) ? "0" : "1"
      }
    }

    // Padding
    for (let i = 0; i < tbl.length; i++) {
      for (let j = 0; j < tbl[i].children.length; j++) {
        tbl[i].children[j].style.padding = `${pad}ex ${sidePad(j, 1)}em ${pad}ex ${sidePad(j, 0)}em`
      }
    }

    // Justification
    const align = group.envClasses.includes("align") || group.envClasses.includes("alignat")
    for (let i = 0; i < tbl.length; i++) {
      const row = tbl[i];
      if (align) {
        for (let j = 0; j < row.children.length; j++) {
          // Chromium does not recognize text-align: left. Use -webkit-
          // TODO: Remove -webkit- when Chromium no longer needs it.
          row.children[j].style.textAlign = "-webkit-" + (j % 2 ? "left" : "right")
        }
      }
      if (row.children.length > 1 && group.envClasses.includes("cases")) {
        row.children[1].style.padding = row.children[1].style.padding.replace(/0em$/, "1em")
      }

      if (group.envClasses.includes("cases") || group.envClasses.includes("subarray")) {
        for (const cell of row.children) {
          cell.style.textAlign = "-webkit-" + "left"
        }
      }
    }
  } else {
    // Set zero padding on side of the matrix
    for (let i = 0; i < tbl.length; i++) {
      tbl[i].children[0].style.paddingLeft = "0em"
      if (tbl[i].children.length === tbl[0].children.length) {
        tbl[i].children[tbl[i].children.length - 1].style.paddingRight = "0em"
      }
    }
  }

  let table = new mathMLTree.MathNode("mtable", tbl)
  if (group.scriptLevel === "display") { table.setAttribute("displaystyle", "true") }

  if (group.addEqnNum || group.envClasses.includes("multline")) {
    table.style.width = "100%"
  }

  // Column separator lines and column alignment
  let align = "";

  if (group.cols && group.cols.length > 0) {
    const cols = group.cols;
    let prevTypeWasAlign = false;
    let iStart = 0;
    let iEnd = cols.length;

    while (cols[iStart].type === "separator") {
      iStart += 1
    }
    while (cols[iEnd - 1].type === "separator") {
      iEnd -= 1
    }

    if (cols[0].type === "separator") {
      const sep = cols[1].type === "separator"
        ? "0.15em double"
        : cols[0].separator === "|"
        ? "0.06em solid "
        : "0.06em dashed "
      for (const row of table.children) {
        row.children[0].style.borderLeft = sep
      }
    }
    let iCol = group.addEqnNum ? 0 : -1
    for (let i = iStart; i < iEnd; i++) {
      if (cols[i].type === "align") {
        const colAlign = alignMap[cols[i].align];
        align += colAlign
        iCol += 1
        for (const row of table.children) {
          if (colAlign.trim() !== "center" && iCol < row.children.length) {
            row.children[iCol].style.textAlign = "-webkit-" + colAlign.trim()
          }
        }
        prevTypeWasAlign = true;
      } else if (cols[i].type === "separator") {
        // MathML accepts only single lines between cells.
        // So we read only the first of consecutive separators.
        if (prevTypeWasAlign) {
          const sep = cols[i + 1].type === "separator"
            ? "0.15em double"
            : cols[i].separator === "|"
            ? "0.06em solid"
            : "0.06em dashed"
          for (const row of table.children) {
            if (iCol < row.children.length) {
              row.children[iCol].style.borderRight = sep
            }
          }
        }
        prevTypeWasAlign = false
      }
    }
    if (cols[cols.length - 1].type === "separator") {
      const sep = cols[cols.length - 2].type === "separator"
        ? "0.15em double"
        : cols[cols.length - 1].separator === "|"
        ? "0.06em solid"
        : "0.06em dashed"
      for (const row of table.children) {
        row.children[row.children.length - 1].style.borderRight = sep
        row.children[row.children.length - 1].style.paddingRight = "0.4em"
      }
    }
  }
  if (group.addEqnNum) {
     // allow for glue cells on each side
    align = "left " + (align.length > 0 ? align : "center ") + "right "
  }
  if (align) {
    // Firefox reads this attribute, not the -webkit-left|right written above.
    // TODO: When Chrome no longer needs "-webkit-", use CSS and delete the next line.
    table.setAttribute("columnalign", align.trim())
  }

  if (group.envClasses.includes("small")) {
    // A small array. Wrap in scriptstyle.
    table = new mathMLTree.MathNode("mstyle", [table])
    table.setAttribute("scriptlevel", "1")
  }

  return table
};

// Convenience function for align, align*, aligned, alignat, alignat*, alignedat, split.
const alignedHandler = function(context, args) {
  if (context.envName.indexOf("ed") === -1) {
    validateAmsEnvironmentContext(context);
  }
  const cols = [];
  const res = parseArray(
    context.parser,
    {
      cols,
      addEqnNum: context.envName === "align" || context.envName === "alignat",
      emptySingleRow: true,
      envClasses: ["abut", "jot"], // set row spacing & provisional column spacing
      maxNumCols: context.envName === "split" ? 2 : undefined,
      leqno: context.parser.settings.leqno
    },
    "display"
  );

  // Determining number of columns.
  // 1. If the first argument is given, we use it as a number of columns,
  //    and makes sure that each row doesn't exceed that number.
  // 2. Otherwise, just count number of columns = maximum number
  //    of cells in each row ("aligned" mode -- isAligned will be true).
  //
  // At the same time, prepend empty group {} at beginning of every second
  // cell in each row (starting with second cell) so that operators become
  // binary.  This behavior is implemented in amsmath's \start@aligned.
  let numMaths;
  let numCols = 0;
  const isAlignedAt = context.envName.indexOf("at") > -1
  if (args[0] && isAlignedAt) {
    // alignat environment takes an argument w/ number of columns
    let arg0 = ""
    for (let i = 0; i < args[0].body.length; i++) {
      const textord = assertNodeType(args[0].body[i], "textord")
      arg0 += textord.text
    }
    if (isNaN(arg0)) {
      throw new ParseError("The alignat enviroment requires a numeric first argument.")
    }
    numMaths = Number(arg0)
    numCols = numMaths * 2
  }
  res.body.forEach(function(row) {
    if (isAlignedAt) {
      // Case 1
      const curMaths = row.length / 2;
      if (numMaths < curMaths) {
        throw new ParseError(
          "Too many math in a row: " + `expected ${numMaths}, but got ${curMaths}`,
          row[0]
        );
      }
    } else if (numCols < row.length) {
      // Case 2
      numCols = row.length;
    }
  });

  // Adjusting alignment.
  // In aligned mode, we add one \qquad between columns;
  // otherwise we add nothing.
  for (let i = 0; i < numCols; ++i) {
    let align = "r";
    if (i % 2 === 1) {
      align = "l";
    }
    cols[i] = {
      type: "align",
      align: align
    };
  }
  if (context.envName === "split") {
    // Append no more classes
  } else if (isAlignedAt) {
    res.envClasses.push("alignat") // Sets justification
  } else {
    res.envClasses[0] = "align" // Sets column spacing & justification
  }
  return res;
};

// Arrays are part of LaTeX, defined in lttab.dtx so its documentation
// is part of the source2e.pdf file of LaTeX2e source documentation.
// {darray} is an {array} environment where cells are set in \displaystyle,
// as defined in nccmath.sty.
defineEnvironment({
  type: "array",
  names: ["array", "darray"],
  props: {
    numArgs: 1
  },
  handler(context, args) {
    // Since no types are specified above, the two possibilities are
    // - The argument is wrapped in {} or [], in which case Parser's
    //   parseGroup() returns an "ordgroup" wrapping some symbol node.
    // - The argument is a bare symbol node.
    const symNode = checkSymbolNodeType(args[0]);
    const colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
    const cols = colalign.map(function(nde) {
      const node = assertSymbolNodeType(nde);
      const ca = node.text;
      if ("lcr".indexOf(ca) !== -1) {
        return {
          type: "align",
          align: ca
        };
      } else if (ca === "|") {
        return {
          type: "separator",
          separator: "|"
        };
      } else if (ca === ":") {
        return {
          type: "separator",
          separator: ":"
        };
      }
      throw new ParseError("Unknown column alignment: " + ca, nde);
    });
    const res = {
      cols,
      envClasses: ["array"],
      maxNumCols: cols.length
    };
    return parseArray(context.parser, res, dCellStyle(context.envName));
  },
  mathmlBuilder
});

// The matrix environments of amsmath builds on the array environment
// of LaTeX, which is discussed above.
// The mathtools package adds starred versions of the same environments.
// These have an optional argument to choose left|center|right justification.
defineEnvironment({
  type: "array",
  names: [
    "matrix",
    "pmatrix",
    "bmatrix",
    "Bmatrix",
    "vmatrix",
    "Vmatrix",
    "matrix*",
    "pmatrix*",
    "bmatrix*",
    "Bmatrix*",
    "vmatrix*",
    "Vmatrix*"
  ],
  props: {
    numArgs: 0
  },
  handler(context) {
    const delimiters = {
      matrix: null,
      pmatrix: ["(", ")"],
      bmatrix: ["[", "]"],
      Bmatrix: ["\\{", "\\}"],
      vmatrix: ["|", "|"],
      Vmatrix: ["\\Vert", "\\Vert"]
    }[context.envName.replace("*", "")];
    // \hskip -\arraycolsep in amsmath
    let colAlign = "c";
    const payload = {
      envClasses: [],
      cols: []
    };
    if (context.envName.charAt(context.envName.length - 1) === "*") {
      // It's one of the mathtools starred functions.
      // Parse the optional alignment argument.
      const parser = context.parser;
      parser.consumeSpaces();
      if (parser.fetch().text === "[") {
        parser.consume();
        parser.consumeSpaces();
        colAlign = parser.fetch().text;
        if ("lcr".indexOf(colAlign) === -1) {
          throw new ParseError("Expected l or c or r", parser.nextToken);
        }
        parser.consume();
        parser.consumeSpaces();
        parser.expect("]");
        parser.consume();
        payload.cols = [];
      }
    }
    const res = parseArray(context.parser, payload, "text")
    res.cols = new Array(res.body[0].length).fill({ type: "align", align: colAlign })
    return delimiters
      ? {
        type: "leftright",
        mode: context.mode,
        body: [res],
        left: delimiters[0],
        right: delimiters[1],
        rightColor: undefined // \right uninfluenced by \color in array
      }
      : res;
  },
  mathmlBuilder
});

defineEnvironment({
  type: "array",
  names: ["smallmatrix"],
  props: {
    numArgs: 0
  },
  handler(context) {
    const payload = { type: "small" };
    const res = parseArray(context.parser, payload, "script");
    res.envClasses = ["small"];
    return res;
  },
  mathmlBuilder
});

defineEnvironment({
  type: "array",
  names: ["subarray"],
  props: {
    numArgs: 1
  },
  handler(context, args) {
    // Parsing of {subarray} is similar to {array}
    const symNode = checkSymbolNodeType(args[0]);
    const colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
    const cols = colalign.map(function(nde) {
      const node = assertSymbolNodeType(nde);
      const ca = node.text;
      // {subarray} only recognizes "l" & "c"
      if ("lc".indexOf(ca) !== -1) {
        return {
          type: "align",
          align: ca
        };
      }
      throw new ParseError("Unknown column alignment: " + ca, nde);
    });
    if (cols.length > 1) {
      throw new ParseError("{subarray} can contain only one column");
    }
    let res = {
      cols,
      envClasses: ["small"]
    };
    res = parseArray(context.parser, res, "script");
    if (res.body.length > 0 && res.body[0].length > 1) {
      throw new ParseError("{subarray} can contain only one column");
    }
    return res;
  },
  mathmlBuilder
});

// A cases environment (in amsmath.sty) is almost equivalent to
// \def
// \left\{\begin{array}{@{}l@{\quad}l@{}} … \end{array}\right.
// {dcases} is a {cases} environment where cells are set in \displaystyle,
// as defined in mathtools.sty.
// {rcases} is another mathtools environment. It's brace is on the right side.
defineEnvironment({
  type: "array",
  names: ["cases", "dcases", "rcases", "drcases"],
  props: {
    numArgs: 0
  },
  handler(context) {
    const payload = {
      cols: [],
      envClasses: ["cases"]
    };
    const res = parseArray(context.parser, payload, dCellStyle(context.envName));
    return {
      type: "leftright",
      mode: context.mode,
      body: [res],
      left: context.envName.indexOf("r") > -1 ? "." : "\\{",
      right: context.envName.indexOf("r") > -1 ? "\\}" : ".",
      rightColor: undefined
    };
  },
  mathmlBuilder
});

// In the align environment, one uses ampersands, &, to specify number of
// columns in each row, and to locate spacing between each column.
// align gets automatic numbering. align* and aligned do not.
// The alignedat environment can be used in math mode.
defineEnvironment({
  type: "array",
  names: ["align", "align*", "aligned", "split"],
  props: {
    numArgs: 0
  },
  handler: alignedHandler,
  mathmlBuilder
});

// alignat environment is like an align environment, but one must explicitly
// specify maximum number of columns in each row, and can adjust where spacing occurs.
defineEnvironment({
  type: "array",
  names: ["alignat", "alignat*", "alignedat"],
  props: {
    numArgs: 1
  },
  handler: alignedHandler,
  mathmlBuilder
});

// A gathered environment is like an array environment with one centered
// column, but where rows are considered lines so get \jot line spacing
// and contents are set in \displaystyle.
defineEnvironment({
  type: "array",
  names: ["gathered", "gather", "gather*"],
  props: {
    numArgs: 0
  },
  handler(context) {
    if (context.envName !== "gathered") {
      validateAmsEnvironmentContext(context);
    }
    const res = {
      cols: [],
      envClasses: ["abut", "jot"],
      addEqnNum: context.envName === "gather",
      emptySingleRow: true,
      leqno: context.parser.settings.leqno
    };
    return parseArray(context.parser, res, "display");
  },
  mathmlBuilder
});

defineEnvironment({
  type: "array",
  names: ["equation", "equation*"],
  props: {
    numArgs: 0
  },
  handler(context) {
    validateAmsEnvironmentContext(context);
    const res = {
      addEqnNum: context.envName === "equation",
      emptySingleRow: true,
      singleRow: true,
      maxNumCols: 1,
      envClasses: ["align"],
      leqno: context.parser.settings.leqno
    };
    return parseArray(context.parser, res, "display");
  },
  mathmlBuilder
});

defineEnvironment({
  type: "array",
  names: ["multline", "multline*"],
  props: {
    numArgs: 0
  },
  handler(context) {
    validateAmsEnvironmentContext(context);
    const res = {
      addEqnNum: context.envName === "multline",
      maxNumCols: 1,
      envClasses: ["jot", "multline"],
      leqno: context.parser.settings.leqno
    };
    return parseArray(context.parser, res, "display");
  },
  mathmlBuilder
});

defineEnvironment({
  type: "array",
  names: ["CD"],
  props: {
    numArgs: 0
  },
  handler(context) {
    validateAmsEnvironmentContext(context);
    return parseCD(context.parser);
  },
  mathmlBuilder
});

// Catch \hline outside array environment
defineFunction({
  type: "text", // Doesn't matter what this is.
  names: ["\\hline", "\\hdashline"],
  props: {
    numArgs: 0,
    allowedInText: true,
    allowedInMath: true
  },
  handler(context, args) {
    throw new ParseError(`${context.funcName} valid only within array environment`);
  }
});
