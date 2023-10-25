import { defineFunctionBuilders } from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// Operator ParseNodes created in Parser.js from symbol Groups in src/symbols.js.

const short = ["\\shortmid", "\\nshortmid", "\\shortparallel",
  "\\nshortparallel", "\\smallsetminus"]

const arrows = ["\\Rsh", "\\Lsh", "\\restriction"]

const isArrow = str => {
  if (str.length === 1) {
    const codePoint = str.codePointAt(0)
    return (0x218f < codePoint && codePoint < 0x2200)
  }
  return str.indexOf("arrow") > -1 || str.indexOf("harpoon") > -1 || arrows.includes(str)
}

defineFunctionBuilders({
  type: "atom",
  mathmlBuilder(group, style) {
    const node = new mathMLTree.MathNode("mo", [mml.makeText(group.text, group.mode)]);
    if (group.family === "punct") {
      node.setAttribute("separator", "true");
    } else if (group.family === "open" || group.family === "close") {
      // Delims built here should not stretch vertically.
      // See delimsizing.js for stretchy delims.
      if (group.family === "open") {
        node.setAttribute("form", "prefix")
        // Set an explicit attribute for stretch. Otherwise Firefox may do it wrong.
        node.setAttribute("stretchy", "false")
      } else if (group.family === "close") {
        node.setAttribute("form", "postfix");
        node.setAttribute("stretchy", "false")
      }
    } else if (group.text === "\\mid") {
      // Firefox messes up this spacing if at the end of an <mrow>. See it explicitly.
      node.setAttribute("lspace", "0.22em") // medium space
      node.setAttribute("rspace", "0.22em")
      node.setAttribute("stretchy", "false")
    } else if (group.family === "rel" && isArrow(group.text)) {
      node.setAttribute("stretchy", "false")
    } else if (short.includes(group.text)) {
      node.setAttribute("mathsize", "70%")
    } else if (group.text === ":") {
      // ":" is not in the MathML operator dictionary. Give it BIN spacing.
      node.attributes.lspace = "0.2222em"
      node.attributes.rspace = "0.2222em"
    }
    return node;
  }
});
