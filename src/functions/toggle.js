import { defineFunctionBuilders } from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

defineFunctionBuilders({
  type: "toggle",
  mathmlBuilder(group, style) {
    const expression = mml.buildExpression(group.body, style)
    const node = new mathMLTree.MathNode("maction", expression, [], { cursor: "default" })
    node.setAttribute("actiontype", "toggle")
    return node
  }
})
