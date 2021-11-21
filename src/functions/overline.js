import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

defineFunction({
  type: "overline",
  names: ["\\overline"],
  props: {
    numArgs: 1
  },
  handler({ parser }, args) {
    const body = args[0];
    return {
      type: "overline",
      mode: parser.mode,
      body
    };
  },
  mathmlBuilder(group, style) {
    const operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u005F")]);
    operator.setAttribute("stretchy", "true");

    const node = new mathMLTree.MathNode(
      "mover",
      [mml.buildGroup(group.body, style), operator]
    );
    node.setAttribute("accent", "true");

    return node;
  }
});
