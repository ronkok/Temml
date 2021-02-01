import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

defineFunction({
  type: "underline",
  names: ["\\underline"],
  props: {
    numArgs: 1,
    allowedInText: true
  },
  handler({ parser }, args) {
    return {
      type: "underline",
      mode: parser.mode,
      body: args[0]
    };
  },
  mathmlBuilder(group, style) {
    const operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203e")]);
    operator.setAttribute("stretchy", "true");

    const node = new mathMLTree.MathNode("munder",
      [mml.buildGroup(group.body, style), operator]
    );
    node.setAttribute("accentunder", "true");

    return node;
  }
});
