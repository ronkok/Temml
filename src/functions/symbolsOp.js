import { defineFunctionBuilders } from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// Operator ParseNodes created in Parser.js from symbol Groups in src/symbols.js.

defineFunctionBuilders({
  type: "atom",
  mathmlBuilder(group, style) {
    const node = new mathMLTree.MathNode("mo", [mml.makeText(group.text, group.mode)]);
    if (group.family === "punct") {
      node.setAttribute("separator", "true");
    } else if (group.family === "open" || group.family === "close" || group.family === "rel") {
      // Delims built here should not stretch vertically.
      // See delimsizing.js for stretchy delims.
      node.setAttribute("stretchy", "false");
      if (group.family === "open") {
        node.setAttribute("form", "prefix");
      } else if (group.family === "close") {
        node.setAttribute("form", "postfix");
      }
    }
    return node;
  }
});
