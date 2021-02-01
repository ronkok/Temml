import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

defineFunction({
  type: "sqrt",
  names: ["\\sqrt"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler({ parser }, args, optArgs) {
    const index = optArgs[0];
    const body = args[0];
    return {
      type: "sqrt",
      mode: parser.mode,
      body,
      index
    };
  },
  mathmlBuilder(group, style) {
    const { body, index } = group;
    return index
      ? new mathMLTree.MathNode("mroot", [
        mml.buildGroup(body, style),
        mml.buildGroup(index, style.incrementLevel())
      ])
    : new mathMLTree.MathNode("msqrt", [mml.buildGroup(body, style)]);
  }
});
