import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";
import utils from "../utils";

// The \newextarrow macro expands to this function.
defineFunction({
  type: "newExtArrow",
  names: ["\\ext@arrow"],
  props: {
    numArgs: 4,
    argTypes: ["raw", "raw", "raw", "math"]
  },
  handler({ parser }, args) {
    return {
      type: "newExtArrow",
      mode: parser.mode,
      lspace: utils.round(Number(args[0].string.trim()) / 18),
      rspace: utils.round(Number(args[1].string.trim()) / 18),
      charCode: Number(args[2].string.trim()),
      body: args[3]
    };
  },
  mathmlBuilder(group, style) {
    const arrowNode = new mathMLTree.MathNode(
      "mo",
      [new mathMLTree.TextNode(String.fromCodePoint(group.charCode))]
    );
    arrowNode.setAttribute("stretchy", "true");
    arrowNode.setAttribute("minsize", "1.75em");

    let node;
    if (group.body) {
      let upperNode = mml.buildGroup(group.body, style.incrementLevel());
      upperNode = new mathMLTree.MathNode("mpadded", [upperNode]);
      upperNode.setAttribute("width", "+" + (group.lspace + group.rspace) + "em");
      upperNode.setAttribute("lspace", group.lspace + "em");
      node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
    } else {
      // This should never happen.
      // Parser.js throws an error if there is no argument.
      // eslint-disable-next-line no-undef
      node = paddedNode();
      node = new mathMLTree.MathNode("mover", [arrowNode, node]);
    }
    return node;
  }
});
