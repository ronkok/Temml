import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import ParseError from "../ParseError";
import { assertNodeType, checkSymbolNodeType } from "../parseNode";

import * as mml from "../buildMathML";
import symbols from "../symbols";

// Extra data needed for the delimiter handler down below
export const delimiterSizes = {
  "\\bigl": { mclass: "mopen", size: 1 },
  "\\Bigl": { mclass: "mopen", size: 2 },
  "\\biggl": { mclass: "mopen", size: 3 },
  "\\Biggl": { mclass: "mopen", size: 4 },
  "\\bigr": { mclass: "mclose", size: 1 },
  "\\Bigr": { mclass: "mclose", size: 2 },
  "\\biggr": { mclass: "mclose", size: 3 },
  "\\Biggr": { mclass: "mclose", size: 4 },
  "\\bigm": { mclass: "mrel", size: 1 },
  "\\Bigm": { mclass: "mrel", size: 2 },
  "\\biggm": { mclass: "mrel", size: 3 },
  "\\Biggm": { mclass: "mrel", size: 4 },
  "\\big": { mclass: "mord", size: 1 },
  "\\Big": { mclass: "mord", size: 2 },
  "\\bigg": { mclass: "mord", size: 3 },
  "\\Bigg": { mclass: "mord", size: 4 }
};

export const delimiters = [
  "(",
  "\\lparen",
  ")",
  "\\rparen",
  "[",
  "\\lbrack",
  "]",
  "\\rbrack",
  "\\{",
  "\\lbrace",
  "\\}",
  "\\rbrace",
  "⦇",
  "\\llparenthesis",
  "⦈",
  "\\rrparenthesis",
  "\\lfloor",
  "\\rfloor",
  "\u230a",
  "\u230b",
  "\\lceil",
  "\\rceil",
  "\u2308",
  "\u2309",
  "<",
  ">",
  "\\langle",
  "\u27e8",
  "\\rangle",
  "\u27e9",
  "\\lAngle",
  "\u27ea",
  "\\rAngle",
  "\u27eb",
  "\\llangle",
  "⦉",
  "\\rrangle",
  "⦊",
  "\\lt",
  "\\gt",
  "\\lvert",
  "\\rvert",
  "\\lVert",
  "\\rVert",
  "\\lgroup",
  "\\rgroup",
  "\u27ee",
  "\u27ef",
  "\\lmoustache",
  "\\rmoustache",
  "\u23b0",
  "\u23b1",
  "\\llbracket",
  "\\rrbracket",
  "\u27e6",
  "\u27e6",
  "\\lBrace",
  "\\rBrace",
  "\u2983",
  "\u2984",
  "/",
  "\\backslash",
  "|",
  "\\vert",
  "\\|",
  "\\Vert",
  "\u2016",
  "\\uparrow",
  "\\Uparrow",
  "\\downarrow",
  "\\Downarrow",
  "\\updownarrow",
  "\\Updownarrow",
  "."
];

// Export isDelimiter for benefit of parser.
const dels = ["}", "\\left", "\\middle", "\\right"]
export const isDelimiter = str => str.length > 0 &&
  (delimiters.includes(str) || delimiterSizes[str] || dels.includes(str))

// Metrics of the different sizes. Found by looking at TeX's output of
// $\bigl| // \Bigl| \biggl| \Biggl| \showlists$
// Used to create stacked delimiters of appropriate sizes in makeSizedDelim.
const sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3.0];

// Delimiter functions
function checkDelimiter(delim, context) {
  const symDelim = checkSymbolNodeType(delim)
  if (symDelim && delimiters.includes(symDelim.text)) {
    // If a character is not in the MathML operator dictionary, it will not stretch.
    // Replace such characters w/characters that will stretch.
    if (["<", "\\lt"].includes(symDelim.text)) { symDelim.text = "⟨" }
    if ([">", "\\gt"].includes(symDelim.text)) { symDelim.text = "⟩" }
    return symDelim;
  } else if (symDelim) {
    throw new ParseError(`Invalid delimiter '${symDelim.text}' after '${context.funcName}'`, delim);
  } else {
    throw new ParseError(`Invalid delimiter type '${delim.type}'`, delim);
  }
}

//                               /         \
const needExplicitStretch = ["\u002F", "\u005C", "\\backslash", "\\vert", "|"];

defineFunction({
  type: "delimsizing",
  names: [
    "\\bigl",
    "\\Bigl",
    "\\biggl",
    "\\Biggl",
    "\\bigr",
    "\\Bigr",
    "\\biggr",
    "\\Biggr",
    "\\bigm",
    "\\Bigm",
    "\\biggm",
    "\\Biggm",
    "\\big",
    "\\Big",
    "\\bigg",
    "\\Bigg"
  ],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    const delim = checkDelimiter(args[0], context);

    return {
      type: "delimsizing",
      mode: context.parser.mode,
      size: delimiterSizes[context.funcName].size,
      mclass: delimiterSizes[context.funcName].mclass,
      delim: delim.text
    };
  },
  mathmlBuilder: (group) => {
    const children = [];

    if (group.delim === ".") { group.delim = "" }
    children.push(mml.makeText(group.delim, group.mode));

    const node = new mathMLTree.MathNode("mo", children);

    if (group.mclass === "mopen" || group.mclass === "mclose") {
      // Only some of the delimsizing functions act as fences, and they
      // return "mopen" or "mclose" mclass.
      node.setAttribute("fence", "true");
    } else {
      // Explicitly disable fencing if it's not a fence, to override the
      // defaults.
      node.setAttribute("fence", "false");
    }
    if (needExplicitStretch.includes(group.delim) || group.delim.indexOf("arrow") > -1) {
      // We have to explicitly set stretchy to true.
      node.setAttribute("stretchy", "true")
    }
    node.setAttribute("symmetric", "true"); // Needed for tall arrows in Firefox.
    node.setAttribute("minsize", sizeToMaxHeight[group.size] + "em")
    node.setAttribute("maxsize", sizeToMaxHeight[group.size] + "em")
    return node;
  }
});

function assertParsed(group) {
  if (!group.body) {
    throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
  }
}

defineFunction({
  type: "leftright-right",
  names: ["\\right"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    return {
      type: "leftright-right",
      mode: context.parser.mode,
      delim: checkDelimiter(args[0], context).text
    };
  }
});

defineFunction({
  type: "leftright",
  names: ["\\left"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    const delim = checkDelimiter(args[0], context);

    const parser = context.parser;
    // Parse out the implicit body
    ++parser.leftrightDepth;
    // parseExpression stops before '\\right' or `\\middle`
    let body = parser.parseExpression(false, null, true)
    let nextToken = parser.fetch()
    while (nextToken.text === "\\middle") {
      // `\middle`, from the ε-TeX package, ends one group and starts another group.
      // We had to parse this expression with `breakOnMiddle` enabled in order
      // to get TeX-compliant parsing of \over.
      // But we do not want, at this point, to end on \middle, so continue
      // to parse until we fetch a `\right`.
      parser.consume()
      const middle = parser.fetch().text
      if (!symbols.math[middle]) {
        throw new ParseError(`Invalid delimiter '${middle}' after '\\middle'`);
      }
      checkDelimiter({ type: "atom", mode: "math", text: middle }, { funcName: "\\middle" })
      body.push({ type: "middle", mode: "math", delim: middle })
      parser.consume()
      body = body.concat(parser.parseExpression(false, null, true))
      nextToken = parser.fetch()
    }
    --parser.leftrightDepth;
    // Check the next token
    parser.expect("\\right", false);
    const right = assertNodeType(parser.parseFunction(), "leftright-right");
    return {
      type: "leftright",
      mode: parser.mode,
      body,
      left: delim.text,
      right: right.delim
    };
  },
  mathmlBuilder: (group, style) => {
    assertParsed(group);
    const inner = mml.buildExpression(group.body, style);

    if (group.left === ".") { group.left = "" }
    const leftNode = new mathMLTree.MathNode("mo", [mml.makeText(group.left, group.mode)]);
    leftNode.setAttribute("fence", "true")
    leftNode.setAttribute("form", "prefix")
    if (group.left === "/" || group.left === "\u005C" || group.left.indexOf("arrow") > -1) {
      leftNode.setAttribute("stretchy", "true")
    }
    inner.unshift(leftNode)

    if (group.right === ".") { group.right = "" }
    const rightNode = new mathMLTree.MathNode("mo", [mml.makeText(group.right, group.mode)]);
    rightNode.setAttribute("fence", "true")
    rightNode.setAttribute("form", "postfix")
    if (group.right === "\u2216" || group.right.indexOf("arrow") > -1) {
      rightNode.setAttribute("stretchy", "true")
    }
    if (group.body.length > 0) {
      const lastElement = group.body[group.body.length - 1];
      if (lastElement.type === "color" && !lastElement.isTextColor) {
        // \color is a switch. If the last element is of type "color" then
        // the user set the \color switch and left it on.
        // A \right delimiter turns the switch off, but the delimiter itself gets the color.
        rightNode.setAttribute("mathcolor", lastElement.color);
      }
    }
    inner.push(rightNode)

    return mml.makeRow(inner);
  }
});

defineFunction({
  type: "middle",
  names: ["\\middle"],
  props: {
    numArgs: 1,
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    const delim = checkDelimiter(args[0], context);
    if (!context.parser.leftrightDepth) {
      throw new ParseError("\\middle without preceding \\left", delim);
    }

    return {
      type: "middle",
      mode: context.parser.mode,
      delim: delim.text
    };
  },
  mathmlBuilder: (group, style) => {
    const textNode = mml.makeText(group.delim, group.mode);
    const middleNode = new mathMLTree.MathNode("mo", [textNode]);
    middleNode.setAttribute("fence", "true");
    if (group.delim.indexOf("arrow") > -1) {
      middleNode.setAttribute("stretchy", "true")
    }
    // The next line is not semantically correct, but
    // Chromium fails to stretch if it is not there.
    middleNode.setAttribute("form", "prefix")
    // MathML gives 5/18em spacing to each <mo> element.
    // \middle should get delimiter spacing instead.
    middleNode.setAttribute("lspace", "0.05em");
    middleNode.setAttribute("rspace", "0.05em");
    return middleNode;
  }
});
