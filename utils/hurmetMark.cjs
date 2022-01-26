'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * # hurmetMark.js
 *
 * Hurmet.app uses a version of Markdown as a plain text file format.
 * This version of Markdown is stricter in some ways than CommonMark or
 * Gruber's original Markdown. So the parser can be considerably simplified.
 * md2ast() returns an AST that matches the memory structure  of a Hurmet.app document.
 *
 * ## Ways in which this syntax is more strict than Markdown.
 *
 * 1. Emphasis: _emphasis_ only. Asterisks do not create standard emphasis.
 * 2. Strong emphasis: **strong emphasis** only. Underlines do not create strong emphasis.
 * 3. Code blocks must be fenced by triple backticks.
 *    Indented text does not indicate a code block.
 * 4. A blank line must precede the beginning of a list, even a nested list.
 * 5. A hard line break is indicated when a line ends with "\". Double spaces do not count.
 * 6. "Shortcut" reference links [ref] are not recognized.
 *    See below for implicit reference links.
 *
 * ## Extensions
 *
 * 1. Hurmet inline calculation is delimited ¢`…`.
 *    Hurmet display calculation is fenced ¢¢\n … \n¢¢.
 * 2. LaTeX inline math is delimited $`…`.
 *    LaTeX display math is fenced  $$\n … \n$$.
 * 3. ~~strikethrough~~
 * 4. Pipe tables as per GFM.
 * 5. Grid tables as per reStructuredText, with two exceptions:
 *    a. The top border contains ":" characters to indicate column justtification.
 *    b. Top & left borders contain "*" characters to indicate the location
 *       of a table column or rows boundary.
 * 6. Implicit reference links [title][] and implicit reference images ![alt][]
 *    ⋮
 *    [alt]: path
 *    Reference images can have captions and directives. Format is:
 *    ![alt text][ref]{caption}   or [alt][]{caption}
 *      ⋮
 *    [ref]: filepath
 *    {.class #id width=number}
 * 7. Table directives. They are placed on the line after the table. The format is:
 *    {.class #id width=num widths="num1 num2 …"}
 * 8. Lists that allow the user to pick list ordering.
 *      1. →  1. 2. 3.  etc.
 *      A. →  A. B. C.  etc. (future)
 *      a) →  (a) (b) (c)  etc. (future)
 * 9. Definition lists, per Pandoc.  (future)
 * 10. Blurbs set an attribute on a block element, as in Markua.
 *     Blurbs are denoted by a symbol in the left margin.
 *     Subsequent indented text blocks are children of the blurb.
 *     Blurb symbols:
 *       i> indented block
 *       C> Centered block
 *       H> print header element, <header>
 *       I> Information admonition (future)
 *       W> Warning admonition (future)
 *       T> Tip admonition (future)
 *       c> Comment admonition (future)
 * 11. [^1] is a reference to a footnote. (future)
 *     [^1]: The body of the footnote is deferred, similar to reference links.
 * 12. [#1] is a reference to a citation. (future)
 *     [#1]: The body of the citation is deferred, similar to reference links.
 * 13. Line blocks begin with "| ", as per Pandoc. (future)
 *
 * hurmetMark.js copyright (c) 2021 Ron Kok
 *
 * This file has been adapted (and heavily modified) from Simple-Markdown.
 * Simple-Markdown copyright (c) 2014-2019 Khan Academy & Aria Buckles.
 *
 * Portions of Simple-Markdown were adapted from marked.js copyright (c) 2011-2014
 * Christopher Jeffrey (https://github.com/chjj/).
 *
 * LICENSE (MIT):
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


const CR_NEWLINE_R = /\r\n?/g;
const TAB_R = /\t/g;
const FORMFEED_R = /\f/g;
const CLASS_R = /(?:^| )\.([a-z-]+)(?: |$)/;
const WIDTH_R = /(?:^| )width="?([\d.a-z]+"?)(?: |$)/;
const COL_WIDTHS_R = /(?:^| )colWidths="([^"]*)"/;
const ID_R = /(?:^| )#([a-z-]+)(?: |$)/;

// Turn various whitespace into easy-to-process whitespace
const preprocess = function(source) {
  return source.replace(CR_NEWLINE_R, "\n").replace(FORMFEED_R, "").replace(TAB_R, "    ");
};

// Creates a match function for an inline scoped element from a regex
const inlineRegex = function(regex) {
  const match = function(source, state) {
    return state.inline ? regex.exec(source) : null
  };
  match.regex = regex;
  return match;
};

// Creates a match function for a block scoped element from a regex
const blockRegex = function(regex) {
  const match = function(source, state) {
    return state.inline ? null : regex.exec(source)
  };
  match.regex = regex;
  return match;
};

// Creates a match function from a regex, ignoring block/inline scope
const anyScopeRegex = function(regex) {
  const match = function(source, state) {
    return regex.exec(source);
  };
  match.regex = regex;
  return match;
};

const UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g;
const unescapeUrl = function(rawUrlString) {
  return rawUrlString.replace(UNESCAPE_URL_R, "$1");
};

const parseList = (str, state) => {
  const items = str.replace(LIST_BLOCK_END_R, "\n").match(LIST_ITEM_R);
  const isTight = state.inHtml && !/\n\n(?!$)/.test(str);
  const itemContent = items.map(function(item, i) {
    // We need to see how far indented this item is:
    const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
    const space = prefixCapture ? prefixCapture[0].length : 0;
    // And then we construct a regex to "unindent" the subsequent
    // lines of the items by that amount:
    const spaceRegex = new RegExp("^ {1," + space + "}", "gm");

    // Before processing the item, we need a couple things
    const content = item
      // remove indents on trailing lines:
      .replace(spaceRegex, "")
      // remove the bullet:
      .replace(LIST_ITEM_PREFIX_R, "");

    // backup our state for restoration afterwards. We're going to
    // want to set state._list to true, and state.inline depending
    // on our list's looseness.
    const oldStateInline = state.inline;
    const oldStateList = state._list;
    state._list = true;
    const oldStateTightness = state.isTight;
    state.isTight = isTight;

    // Parse the list item
    state.inline = isTight;
    const adjustedContent = content.replace(LIST_ITEM_END_R, "");
    const result = isTight
      ? { type: "list_item", content: parseInline(adjustedContent, state) }
      : { type: "list_item", content: parse(adjustedContent, state) };

    // Restore our state before returning
    state.inline = oldStateInline;
    state._list = oldStateList;
    state.isTight = oldStateTightness;
    return result;
  });

  return itemContent
};

const TABLES = (function() {
  const TABLE_ROW_SEPARATOR_TRIM = /^ *\| *| *\| *$/g;
  const TABLE_RIGHT_ALIGN = /^[-=]+:$/;
  const TABLE_CENTER_ALIGN = /^:[-=]+:$/;

  const parseTableAlign = function(source) {
    // Inspect ":" characters to set column justification.
    // Return class names that specify center or right justification on specific columns.
    source = source.replace(TABLE_ROW_SEPARATOR_TRIM, "");
    const alignArr = source.trim().split(/[|+*]/);
    let alignStr = "";
    for (let i = 0; i < alignArr.length; i++) {
      alignStr += TABLE_CENTER_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}c`
        : (TABLE_RIGHT_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}r`
        : "");
    }
    return alignStr.trim()
  };

  const tableDirectives = (directives, align) => {
    // Get CSS class, ID, and column widths, if any.
    if (!directives && align === "") { return ["", "", null] }
    const userDefClass = CLASS_R.exec(directives);
    let myClass = (userDefClass) ? userDefClass[1] : "";
    if (align.length > 0) { myClass += (myClass.length > 0 ? " " : "") + align; }
    const userDefId = ID_R.exec(directives);
    const myID = (userDefId) ? userDefId[1] : "";
    const colWidthMatch = COL_WIDTHS_R.exec(directives);
    const colWidths = (colWidthMatch) ? colWidthMatch[1].split(" ") : null;
    return [myClass, myID, colWidths]
  };

  const parsePipeTableRow = function(source, parse, state, colWidths, inHeader) {
    const prevInTable = state.inTable;
    state.inTable = true;
    const tableRow = parse(source.trim(), state);
    consolidate(tableRow);
    state.inTable = prevInTable;

    const row = {
      type: "table_row",
      content: []
    };
    let j = -1;
    tableRow.forEach(function(node, i) {
      if (node.type === "tableSeparator") {
        if (i !== tableRow.length - 1) {  // Filter out the row's  last table separator
          // Create a new cell
          j += 1;
          row.content.push({
            "type": inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": 1,
              "rowspan": 1,
              "colwidth": (colWidths) ? [Number(colWidths[j])] : null,
              "background": null
            },
            content: (state.inHtml ? [] : [{ "type": "paragraph", "content": [] }])
          });
        }
      } else if (state.inHtml) {
        // For direct to HTML, write the inline contents directly into the <td> element.
        // row   cell    content      text
        row.content[j].content.push(node);
      } else {
        // Hurmet.app table cells always contain a paragraph.
        // row   cell  paragraph  content      text
        row.content[j].content[0].content.push(node);
      }
    });

    return row;
  };

  const parsePipeTable = function() {
    return function(capture, state) {
      state.inline = true;
      const align = parseTableAlign(capture[2]);
      const [myClass, myID, colWidths] = tableDirectives(capture[4], align);
      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      table.content.push(parsePipeTableRow(capture[1], parse, state, colWidths, true));
      const tableBody = capture[3].trim().split("\n");
      tableBody.forEach(row => {
        table.content.push(parsePipeTableRow(row, parse, state, colWidths, false));
      });
      state.inline = false;
      return table
    };
  };

  const headerRegEx = /^\+:?=/

  const parseGridTable = function() {
    return function(capture, state) {
      const topBorder = capture[2];
      const align = parseTableAlign(topBorder.slice(1));
      const [myClass, myID, colWidths] = tableDirectives(capture[3], align);
      const lines = capture[1].slice(0, -1).split("\n");

      // Does the grid table contain a line separating header from table body?
      let headerExists = false;
      let headerSepLine = lines.length + 10;
      for (let i = 0; i < lines.length; i++) {
        if (headerRegEx.test(lines[i])) {
          headerExists = true;
          headerSepLine = i;
          break
        }
      }

      // Read the top & left borders to find the locations of the cell corners.
      const xCorners = [0];
      for (let j = 1; j < topBorder.length; j++) {
        const ch = topBorder.charAt(j);
        // A "*" character indicates a column border, but the top row
        // contains a merged cell, so the column border does not extend
        // all the way to the top of the table.
        if (ch === "+" || ch === "*") { xCorners.push(j); }
      }
      const yCorners = [0];
      for (let i = 1; i < lines.length; i++) {
        const ch = lines[i].charAt(0);
        if (ch === "+" || ch === "*") { yCorners.push(i); }
      }

      const numCols = xCorners.length - 1;
      const numRows = yCorners.length - 1;
      const gridTable = [];

      // Create default rows and cells. They may be merged later.
      for (let i = 0; i < numRows; i++) {
        const row = new Array(numCols);
        for (let j = 0; j < numCols; j++) { row[j] = { rowspan: 1 }; }
        gridTable.push(row);
      }

      for (let i = 0; i < numRows; i++) {
        const row = gridTable[i];
        // Determine the actual rowspan and colspan of each cell.
        for (let j = 0; j < numCols; j++) {
          const cell = row[j];
          if (cell.rowspan === 0) { continue }
          cell.colspan = 1;
          const lastTextRow = lines[yCorners[i + 1] - 1];
          for (let k = j + 1; k < xCorners.length; k++) {
            if (lastTextRow.charAt(xCorners[k]) === "|") { break }
            cell.colspan += 1;
            row[k].rowspan = 0;
          }
          for (let k = i + 1; k < yCorners.length; k++) {
            const ch = lines[yCorners[k]].charAt(xCorners[j] + 1);
            if (ch === "-" || ch === "=") { break }
            cell.rowspan += 1;
            for (let jj = 0; jj < cell.colspan; jj++) {
              gridTable[k][j + jj].rowspan = 0;
            }
          }
          // Now that we know the cell extents, get the cell contents.
          const xStart = xCorners[j] + 2;
          const xEnd = xCorners[j + cell.colspan] - 1;
          const yStart = yCorners[i] + 1;
          const yEnd = yCorners[i + cell.rowspan];
          let str = "";
          for (let ii = yStart; ii < yEnd; ii++) {
            str += lines[ii].slice(xStart, xEnd).replace(/ +$/, "") + "\n";
          }
          cell.blob = str.slice(0, -1);

          cell.inHeader = (headerExists && yStart < headerSepLine);

          if (colWidths) {
            // Set an attribute used by ProseMirror.
            let cellWidth = 0;
            for (let k = 0; k < cell.colspan; k++) {
              cellWidth += Number(colWidths[j + k]);
            }
            cell.width = cellWidth;
          }
        }
      }

      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      for (let i = 0; i < numRows; i++) {
        table.content.push({ type: "table_row", content: [] } );
        for (let j = 0; j < numCols; j++) {
          if (gridTable[i][j].rowspan === 0) { continue }
          const cell = gridTable[i][j];
          state.inline = false;
          let content = state.inHtml && cell.blob.indexOf("```") === -1 && !/\n\n/.test(cell.blob.replace(/\n+$/g, ""))
            ? parseInline(cell.blob, state) // Write inline content directly into each <td>
            : parse(cell.blob, state);       // Hurmet.app has a paragraph in each cell.
          if (content.length === 1 && content[0].type === "null") {
            content = state.inHtml
              ? [{ type: "text", text: "" }]
              : [{ type: "paragraph", content: [] }];
          }
          table.content[i].content.push({
            "type": cell.inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": cell.colspan,
              "rowspan": cell.rowspan,
              "colwidth": (colWidths) ? [cell.width] : null,
              "background": null
            },
            content: content
          });
        }
      }
      state.inline = false;
      return table
    };
  };

  return {
    parsePipeTable: parsePipeTable(),
    PIPE_TABLE_REGEX: /^(\|.+)\n\|([-:]+[-| :]*)\n((?:\|.*(?:\n|$))*)(?:\{([^\n}]+)\}\n)?\n*/,
    parseGridTable: parseGridTable(),
    GRID_TABLE_REGEX: /^((\+(?:[-:*=]+\+)+)\n(?:[+|*][^\n]+[+|]\n)+)(?:\{([^\n}]+)\}\n)?\n*/
  };
})();

const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE =
  "\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";

const linkIndex = marks => {
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].type === "link") { return i }
  }
};

const parseRef = function(capture, state, refNode) {
  let ref = capture[2] ? capture[2] : capture[1];
  ref = ref.replace(/\s+/g, " ");

  // We store information about previously seen defs on
  // state._defs (_ to deconflict with client-defined
  // state). If the def for this reflink/refimage has
  // already been seen, we can use its target/source
  // and title here:
  if (state._defs && state._defs[ref]) {
    const def = state._defs[ref];
    if (refNode.type === "image") {
      refNode.attrs.src = def.target;
      refNode.attrs.width = null;
    } else {
      // refNode is a link
      refNode.attrs.href = def.target;
    }
  }

  // In case we haven't seen our def yet (or if someone
  // overwrites that def later on), we add this node
  // to the list of ref nodes for that def. Then, when
  // we find the def, we can modify this link/image AST
  // node :).
  state._refs = state._refs || {};
  state._refs[ref] = state._refs[ref] || [];
  state._refs[ref].push(refNode);

  return refNode;
};

const parseTextMark = (capture, state, mark) => {
  const text = parseInline(capture, state);
  if (Array.isArray(text) && text.length === 0) { return text }
  consolidate(text);
  if (text[0].marks) {
    text[0].marks.push({ type: mark });
  } else {
    text[0].marks = [{ type: mark }];
  }
  return text
};

const BLOCK_HTML = /^ *(?:<(head|h[1-6]|p|pre|script|style|table)[\s>][\s\S]*?(?:<\/\1>[^\n]*\n)|<!--[^>]+-->[^\n]*\n|<\/?(?:body|details|(div|input|label)(?: [^>]+)?|!DOCTYPE[a-z ]*|html[a-z ="]*|br|dl(?: class="[a-z-]+")?|li|main[a-z\- ="]*|nav|ol|ul(?: [^>]+)?)\/?>[^\n]*?(?:\n|$))/
const divType = { C: "centered_div", H: "header", "i": "indented_div" };

// Rules must be applied in a specific order, so use a Map instead of an object.
const rules = new Map();
rules.set("html", {
  isLeaf: true,
  match: blockRegex(BLOCK_HTML),
  parse: function(capture, state) {
    if (!state.inHtml) { return null }
    return { type: "html", text: capture[0] }
  }
});
rules.set("heading", {
  isLeaf: false,
  match: blockRegex(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      attrs: { level: capture[1].length },
      content: parseInline(capture[2].trim(), state)
    };
  }
});
rules.set("dt", {  // description term
  isLeaf: false,
  match: blockRegex(/^(([^\n]*)\n)(?=<dd>|\n:)/),
  parse: function(capture, state) {
    return { content: parseInline(capture[2].trim(), state) }
  }
});
rules.set("horizontal_rule", {
  isLeaf: true,
  match: blockRegex(/^( *[-*_]){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return { type: "horizontal_rule" };
  }
});
rules.set("lheading", {
  isLeaf: false,
  match: blockRegex(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return {
      type: "heading",
      level: capture[2] === '=' ? 1 : 2,
      content: parseInline(parse, capture[1])
    };
  }
});
rules.set("fence", {
  isLeaf: true,
  match: blockRegex(/^(`{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      type: "code_block",
//      lang: capture[2] || undefined,
      content: [{ type: "text", text: capture[3] }]
    };
  }
});
rules.set("blockquote", {
  isLeaf: false,
  match: blockRegex(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
  parse: function(capture, state) {
    const content = capture[0].replace(/^ *> ?/gm, "");
    return { content: parse(content, state) };
  }
});
rules.set("ordered_list", {
  isLeaf: false,
  match: blockRegex(/^( {0,3})(\d{1,9}\.) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:\d{1,9}\.) )\n*|\s*$)/),
  parse: function(capture, state) {
    const start = Number(capture[2].trim());
    return { attrs: { order: start }, content: parseList(capture[0], state, capture[1]) }
  }
});
rules.set("bullet_list", {
  isLeaf: false,
  match: blockRegex(/^( {0,3})([*+-]) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:[*+-]) )\n*|\s*$)/),
  parse: function(capture, state) {
    return { content: parseList(capture[0], state, capture[1]) }
  }
});
rules.set("dd", {  // description details
  isLeaf: false,
  match: blockRegex(/^:( +)[\s\S]+?(?:\n{2,}(?! |:)(?!\1)\n*|\s*$)/),
  parse: function(capture, state) {
    let div = " " + capture[0].slice(1);
    const indent = 1 + capture[1].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { content: parse(div, state) };
  }
});
rules.set("special_div", {
  isLeaf: false,
  match: blockRegex(/^(C|H|i)>( {1,})[\s\S]+?(?:\n{2,}(?! {2,2}\2)\n*|\s*$)/),
  parse: function(capture, state) {
    const type = divType[capture[1]];
    let div = "  " + capture[0].slice(2);
    const indent = 2 + capture[2].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { type, content: parse(div, state) };
  }
});
rules.set("def", {
  // TODO(aria): This will match without a blank line before the next
  // block element, which is inconsistent with most of the rest of
  // simple-markdown.
  isLeaf: true,
  match: blockRegex(/^\[([^\]]+)\]: *<?([^\n>]*)>? *\n(?:\{([^\n}]*)\}\n)?/),
  parse: function(capture, state) {
    const def = capture[1].replace(/\s+/g, " ");
    const target = capture[2];
    const directives = capture[3] || "";
    const attrs = {};

    // Look for previous links/images using this def
    // If any links/images using this def have already been declared,
    // they will have added themselves to the state._refs[def] list
    // (_ to deconflict with client-defined state). We look through
    // that list of reflinks for this def, and modify those AST nodes
    // with our newly found information now.
    // Sorry :(.
    if (state._refs && state._refs[def]) {
      // `refNode` can be a link or an image
      state._refs[def].forEach(function(refNode) {
        if (refNode.type === "image") {
          refNode.attrs.src = target;
          if (directives) {
            const matchClass = CLASS_R.exec(directives);
            if (matchClass) {
              refNode.attrs.class = matchClass[1];
              attrs.class = matchClass[1];
            }
            const matchWidth = WIDTH_R.exec(directives);
            if (matchWidth) {
              refNode.attrs.width = matchWidth[1];
              attrs.width = matchWidth[1];
            }
            const matchID = ID_R.exec(directives);
            if (matchID) {
              refNode.attrs.id = matchID[1];
              attrs.id = matchID[1];
            }
          }
        } else {
          refNode.attrs.href = target;
        }
      });
    }

    // Add this def to our map of defs for any future links/images
    // In case we haven't found any or all of the refs referring to
    // this def yet, we add our def to the table of known defs, so
    // that future reflinks can modify themselves appropriately with
    // this information.
    state._defs = state._defs || {};
    state._defs[def] = { target, attrs };

    // return the relevant parsed information
    // for debugging only.
    return {
      def: def,
      target: target,
      directives: directives
    };
  }
});
rules.set("pipeTable", {
  isLeaf: false,
  match: blockRegex(TABLES.PIPE_TABLE_REGEX),
  parse: TABLES.parsePipeTable
});
rules.set("gridTable", {
  isLeaf: false,
  match: blockRegex(TABLES.GRID_TABLE_REGEX),
  parse: TABLES.parseGridTable
});
rules.set("newline", {
  isLeaf: true,
  match: blockRegex(/^(?:\n *)*\n/),
  parse: function() { return { type: "null" } }
});
rules.set("paragraph", {
  isLeaf: false,
  match: blockRegex(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: function(capture, state) {
    return { content: parseInline(capture[1], state) };
  }
});
rules.set("escape", {
  // We don't allow escaping numbers, letters, or spaces here so that
  // backslashes used in plain text still get rendered. But allowing
  // escaping anything else provides a very flexible escape mechanism,
  // regardless of how this grammar is extended.
  isLeaf: true,
  match: inlineRegex(/^\\([^0-9A-Za-z\s])/),
  parse: function(capture, state) {
    return {
      type: "text",
      text: capture[1]
    };
  }
});
rules.set("tableSeparator", {
  isLeaf: true,
  match: function(source, state) {
    if (!state.inTable) {
      return null;
    }
    return /^ *\| */.exec(source);
  },
  parse: function() {
    return { type: "tableSeparator" };
  }
});
rules.set("calculation", {
  isLeaf: true,
  match: anyScopeRegex(/^(?:¢(`+)([\s\S]*?[^`])\1(?!`)|¢¢\n((?:\\[\s\S]|[^\\])+?)\n¢¢)/),
  parse: function(capture, state) {
    if (capture[2]) {
      let entry = capture[2].trim();
      if (!/^function/.test(entry) && entry.indexOf("``") === -1) {
        entry = entry.replace(/\n/g, " ");
      }
      return { content: "", attrs: { entry } }
    } else {
      const entry = capture[3].trim();
      return { content: "", attrs: { entry, displayMode: true } }
    }
  }
});
rules.set("tex", {
  isLeaf: true,
  match: anyScopeRegex(/^(?:\$(`+)([\s\S]*?[^`])\1(?!`)|\$\$\n?((?:\\[\s\S]|[^\\])+?)\n?\$\$)/),
  parse: function(capture, state) {
    if (capture[2]) {
      const tex = capture[2].trim().replace(/\n/g, " ");
      return { content: "", attrs: { tex } }
    } else {
      return { content: "", attrs: { tex: capture[3].trim(), displayMode: true } }
    }
  }
});
rules.set("link", {
  isLeaf: true,
  match: inlineRegex(
    new RegExp("^\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")
  ),
  parse: function(capture, state) {
    const textNode = parseTextMark(capture[1], state, "link" )[0];
    const i = linkIndex(textNode.marks);
    textNode.marks[i].attrs = { href: unescapeUrl(capture[2]) };
    return textNode
  }
});
rules.set("image", {
  isLeaf: true,
  match: inlineRegex(
    new RegExp("^!\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")
  ),
  parse: function(capture, state) {
    return { attrs: { alt: capture[1], src: unescapeUrl(capture[2]) } }
  }
});
rules.set("reflink", {
  isLeaf: true,
  match: inlineRegex(/^\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    const textNode = parseTextMark(capture[1], state, "link" )[0];
    const i = linkIndex(textNode.marks);
    textNode.marks[i].attrs = { href: null };
    if (capture[2]) {
      textNode.marks[i].attrs.title = capture[2];
    }
    parseRef(capture, state, textNode.marks[i]);
    return textNode
  }
});
rules.set("refimage", {
  isLeaf: true,
  match: inlineRegex(/^!\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    return parseRef(capture, state, {
      type: "image",
      attrs: { alt: capture[1] }
    });
  }
});
rules.set("code", {
  isLeaf: true,
  match: inlineRegex(/^(`+)([\s\S]*?[^`])\1(?!`)/),
  parse: function(capture, state) {
    const text = capture[2].trim();
    return [{ type: "text", text, marks: [{ type: "code" }] }]
/*    state.inCode = true;
    const code = parseTextMark(text, state, "code" );
    state.inCode = false;
    console.log(code)
    return code */
  }
});
rules.set("em", {
  isLeaf: true,
  match: inlineRegex(/^_((?:\\[\s\S]|[^\\])+?)_/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "em" )
  }
});
rules.set("strong", {
  isLeaf: true,
  match: inlineRegex(/^\*\*(?=\S)((?:\\[\s\S]|\*(?!\*)|[^\s*\\]|\s(?!\*\*))+?)\*\*/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "strong" )
  }
});
rules.set("strikethru", {
  isLeaf: true,
  match: inlineRegex(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "strikethru" )
  }
});
rules.set("superscript", {
  isLeaf: true,
  match: inlineRegex(/^<sup>([\s\S]*?)<\/sup>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "superscript" )
  }
});
rules.set("subscript", {
  isLeaf: true,
  match: inlineRegex(/^<sub>([\s\S]*?)<\/sub>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "subscript" )
  }
});
rules.set("underline", {
  isLeaf: true,
  match: inlineRegex(/^<u>([\s\S]*?)<\/u>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "underline" )
  }
});
rules.set("highlight", {
  isLeaf: true,
  match: inlineRegex(/^<mark>([\s\S]*?)<\/mark>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "highlight" )
  }
});
rules.set("hard_break", {
  isLeaf: true,
  match: anyScopeRegex(/^\\\n/),
  parse: function() { return { text: "\n" } }
});
rules.set("inline_break", {
  isLeaf: true,
  match: anyScopeRegex(/^<br>/),
  parse: function() { return { type: "hard_break", text: "\n" } }
});
rules.set("span", {
  isLeaf: true,
  match: inlineRegex(/^<span [a-z =":]+>[^<]+<\/span>/),
  parse: function(capture, state) {
    return !state.inHtml ? null : { type: "html", text: capture[0] }
  }
});
rules.set("text", {
  // Here we look for anything followed by non-symbols,
  // double newlines, or double-space-newlines
  // We break on any symbol characters so that this grammar
  // is easy to extend without needing to modify this regex
  isLeaf: true,
  match: anyScopeRegex(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
  parse: function(capture, state) {
    return {
      text: capture[0].replace(/\n/g, " ")
    };
  }
});

const doNotEscape = ["calculation", "code", "tex"];

const parse = (source, state) => {
  if (!state.inline) { source += "\n\n"; }
  source = preprocess(source);
  const result = [];
  while (source) {
    // store the best match and its rule:
    let capture = null;
    let ruleName = null;
    let rule = null;
    for (const [currRuleName, currRule] of rules) {
      if (state.inCode && doNotEscape.includes(currRuleName)) { continue }
      capture = currRule.match(source, state);
      if (capture) {
        rule = currRule;
        ruleName = currRuleName;
        break
      }
    }
    const parsed = rule.parse(capture, state);
    if (Array.isArray(parsed)) {
      Array.prototype.push.apply(result, parsed);
    } else {
      if (parsed.type == null) { parsed.type = ruleName; }
      result.push(parsed);
    }
    source = source.substring(capture[0].length);
  }
  return result
};



/**
 * Parse some content with the parser `parse`, with state.inline
 * set to true. Useful for block elements; not generally necessary
 * to be used by inline elements (where state.inline is already true.
 */
const parseInline = function(content, state) {
  const isCurrentlyInline = state.inline || false;
  state.inline = true;
  const result = parse(content, state);
  state.inline = isCurrentlyInline;
  return result;
};


// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
const LIST_BULLET = "(?:[*+-]|\\d+\\.)";
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = "( *)(" + LIST_BULLET + ") +";
const LIST_ITEM_PREFIX_R = new RegExp("^" + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R = new RegExp(
  LIST_ITEM_PREFIX + "[^\\n]*(?:\\n" + "(?!\\1" + LIST_BULLET + " )[^\\n]*)*(\n|$)",
  "gm"
);
const BLOCK_END_R = /\n{2,}$/;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R = BLOCK_END_R;
const LIST_ITEM_END_R = / *\n+$/;

const ignore = ["def", "newline", "null"];

const consolidate = arr => {
  if (Array.isArray(arr) && arr.length > 0) {
    // Group any text nodes together into a single string output.
    for (let i = arr.length - 1; i > 0; i--) {
      const node = arr[i];
      const prevNode = arr[i - 1];
      if (node.type === 'text' && prevNode.type === 'text' &&
          !node.marks && !prevNode.marks) {
        prevNode.text += node.text;
        arr.splice(i, 1);
      } else if (ignore.includes(node.type)) {
        arr.splice(i, 1);
      } else if (!rules.has(node.type) || !rules.get(node.type).isLeaf) {
        consolidate(node.content);
      }
    }

    if (!rules.has(arr[0].type) || !rules.get(arr[0].type).isLeaf) {
      consolidate(arr[0].content);
    }
  }
};

const md2ast = (md, inHtml = false) => {
  const ast = parse(md, { inline: false, inHtml });
  consolidate(ast);
  return ast
};

// const hurmet = require("./hurmet.js");
const temml = require('./temml.cjs');

const sanitizeUrl = function(url) {
  if (url == null) {
    return null;
  }
  try {
    const prot = decodeURIComponent(url)
      .replace(/[^A-Za-z0-9/:]/g, "")
      .toLowerCase();
    if (
      prot.indexOf("javascript:") === 0 ||
      prot.indexOf("vbscript:") === 0 ||
      prot.indexOf("data:") === 0
    ) {
      return null;
    }
  } catch (e) {
    // decodeURIComponent sometimes throws a URIError
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null;
  }
  return url;
};

const SANITIZE_TEXT_R = /[<>&"']/g;
const SANITIZE_TEXT_CODES = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;"
};
const sanitizeText = function(text /* : Attr */) {
  return String(text).replace(SANITIZE_TEXT_R, function(chr) {
    return SANITIZE_TEXT_CODES[chr];
  });
};

const htmlTag = (tagName, content, attributes = {}, isClosed = true) => {
  let attributeString = "";
  for (const attr in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
      const attribute = attributes[attr];
    // Removes falsey attributes
      if (attribute) {
        attributeString += " " + sanitizeText(attr) + '="' + sanitizeText(attribute) + '"';
      }
    }
  }

  const unclosedTag = "<" + tagName + attributeString + ">";

  if (isClosed) {
    return unclosedTag + content + "</" + tagName + ">";
  } else {
    return unclosedTag;
  }
};

const tagName = {
  em: "em",
  strong: "strong",
  code: "code",
  strikethru: "del",
  subscript: "sub",
  superscript: "sup",
  underline: "u",
  highlight: "mark"
};

const nodes = {
  html(node) { return node.text },
  heading(node)    {
    const text = output(node.content);
    let tag = "h" + node.attrs.level;
    tag = htmlTag(tag, text);
    // Add id so others can link to it.
    tag = tag.slice(0, 3) + " id='" + text.toLowerCase().replace(/,/g, "").replace(/\s+/g, '-') + "'" + tag.slice(3);
    return tag + "\n"
  },
  paragraph(node)  { return htmlTag("p", output(node.content)) + "\n" },
  blockquote(node) {return htmlTag("blockquote", output(node.content)) },
  code_block(node) {
    return htmlTag("pre", htmlTag("code", sanitizeText(node.content[0].text)))
  },
  hard_break(node) { return "<br>" },
  def(node)        { return "" },
  newline(node)    { return "\n" },
  horizontal_rule(node) { return "<hr>\n" },
  ordered_list(node) {
    const attributes = node.attrs.order !== 1 ? { start: node.attrs.order } : undefined;
    return htmlTag("ol", output(node.content), attributes) + "\n"
  },
  bullet_list(node)  { return htmlTag("ul", output(node.content)) + "\n" },
  list_item(node)    { return htmlTag("li", output(node.content)) + "\n" },
  table(node)        { return htmlTag("table", output(node.content), node.attrs) + "\n" },
  table_row(node)    { return htmlTag("tr", output(node.content)) + "\n" },
  table_header(node) {
    const attributes = {};
    if (node.attrs.colspan !== 1) { attributes.colspan = node.attrs.colspan; }
    if (node.attrs.rowspan !== 1) { attributes.rowspan = node.attrs.rowspan; }
    if (node.attrs.colwidth !== null && !isNaN(node.attrs.colwidth) ) {
      attributes.style = `width: ${node.attrs.colwidth}px`
    }
    return htmlTag("th", output(node.content), attributes) + "\n"
  },
  table_cell(node) {
    const attributes = {};
    if (node.attrs.colspan !== 1) { attributes.colspan = node.attrs.colspan; }
    if (node.attrs.rowspan !== 1) { attributes.rowspan = node.attrs.rowspan; }
    if (node.attrs.colwidth !== null && !isNaN(node.attrs.colwidth) ) {
      attributes.style = `width: ${node.attrs.colwidth}px`
    }
    return htmlTag("td", output(node.content), attributes)
  },
  link(node) {
    const attributes = { href: sanitizeUrl(node.attrs.href), title: node.attrs.title };
    return htmlTag("a", output(node.content), attributes);
  },
  image(node) {
    const attributes = { src: sanitizeUrl(node.attrs.src), alt: node.attrs.alt };
    if (node.attrs.class) { attributes.class = node.attrs.class; }
    if (node.attrs.id)    { attributes.id = node.attrs.id; }
    if (node.attrs.width) { attributes.width = node.attrs.width; }
    return htmlTag("img", "", attributes, false);
  },
/*  calculation(node) {
    const tex = hurmet.parse(node.attrs.entry);
    return htmlTag("span", "", { class: "tex", "data-tex": tex })
  },*/
  tex(node) {
    return temml.renderToString(
      node.attrs.tex,
      { trust: true, displayMode: (node.attrs.displayMode || false) }
    )
  },
  indented_div(node)    { return htmlTag("div", output(node.content), { class: 'indented' }) },
  centered_div(node)    {
    return htmlTag("div", output(node.content), { class: 'centered' } )
  },
  dt(node)    {
    let text = output(node.content);
    let tag = htmlTag("dt", text);
    // Add id so others can link to it.
    const pos = text.indexOf("(");
    if (pos > -1) { text = text.slice(0, pos).replace("_", "-"); }
    tag = tag.slice(0, 3) + " id='" + text.toLowerCase().replace(/\s+/g, '-') + "'" + tag.slice(3);
    return tag + "\n"
  },
  dd(node)    { return htmlTag("dd", output(node.content)) + "\n" },
  text(node) {
    const text = sanitizeText(node.text);
    if (!node.marks) {
      return text
    } else {
      let span = text;
      for (const mark of node.marks) {
        if (mark.type === "link") {
          let tag = `<a href='${mark.attrs.href}'`;
          if (mark.attrs.title) { tag += ` title='${mark.attrs.title}''`; }
          span = tag + ">" + span + "</a>";
        } else {
          const tag = tagName[mark.type];
          span = `<${tag}>${span}</${tag}>`;
        }
      }
      return span
    }
  }
};

const output = (ast) => {
  // Return HTML.
  let html = "";
  if (Array.isArray(ast)) {
    for (let i = 0; i < ast.length; i++) {
      html += output(ast[i]);
    }
  } else if (ast.type !== "null") {
    html += nodes[ast.type](ast);
  }
  return html
};

const md2html = (md, inHtml = false) => {
  const ast = md2ast(md, inHtml);
  return output(ast)
};

const hmd = {
  md2ast,
  md2html
};

exports.hmd = hmd;
