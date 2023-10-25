import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

defineFunction({
  type: "cancelto",
  names: ["\\cancelto"],
  props: {
    numArgs: 2
  },
  handler({ parser }, args) {
    return {
      type: "cancelto",
      mode: parser.mode,
      value: args[0],
      expression: args[1]
    };
  },
  mathmlBuilder(group, style) {
    const value = new mathMLTree.MathNode(
      "mpadded",
      [mml.buildGroup(group.value, style)]
    )
    value.setAttribute("depth", `-0.1em`)
    value.setAttribute("height", `+0.1em`)
    value.setAttribute("voffset", `0.1em`)

    const expression = new mathMLTree.MathNode(
      "menclose",
      [mml.buildGroup(group.expression, style)]
    )
    expression.setAttribute("notation", `updiagonalarrow`)

    return new mathMLTree.MathNode("msup", [expression, value])
  }
})
