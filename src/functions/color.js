import defineFunction, { ordargument } from "../defineFunction"
import { wrapWithMstyle } from "../mathMLTree"
import { assertNodeType } from "../parseNode"
import * as mml from "../buildMathML"

const mathmlBuilder = (group, style) => {
  const inner = mml.buildExpression(group.body, style.withColor(group.color))
  // Wrap with an <mstyle> element.
  const node = wrapWithMstyle(inner)

  node.setAttribute("mathcolor", group.color)

  return node
}

defineFunction({
  type: "color",
  names: ["\\textcolor"],
  props: {
    numArgs: 2,
    allowedInText: true,
    argTypes: ["color", "original"]
  },
  handler({ parser }, args) {
    const color = assertNodeType(args[0], "color-token").color;
    const body = args[1];
    return {
      type: "color",
      mode: parser.mode,
      color,
      body: ordargument(body)
    }
  },
  mathmlBuilder
})

defineFunction({
  type: "color",
  names: ["\\color"],
  props: {
    numArgs: 1,
    allowedInText: true,
    argTypes: ["color"]
  },
  handler({ parser, breakOnTokenText }, args) {
    const color = assertNodeType(args[0], "color-token").color

    // Set macro \current@color in current namespace to store the current
    // color, mimicking the behavior of color.sty.
    // This is currently used just to correctly color a \right
    // that follows a \color command.
    parser.gullet.macros.set("\\current@color", color)

    // Parse out the implicit body that should be colored.
    const body = parser.parseExpression(true, breakOnTokenText)

    return {
      type: "color",
      mode: parser.mode,
      color,
      body
    }
  },
  mathmlBuilder
})
