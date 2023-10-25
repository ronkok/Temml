import defineFunction, { ordargument } from "../defineFunction"
import { wrapWithMstyle } from "../mathMLTree"
import * as mml from "../buildMathML"

// In LaTeX, \pmb is a simulation of bold font.
// The version of \pmb in ambsy.sty works by typesetting three copies of the argument
// with small offsets. We use CSS font-weight:bold.

defineFunction({
  type: "pmb",
  names: ["\\pmb"],
  props: {
    numArgs: 1,
    allowedInText: true
  },
  handler({ parser }, args) {
    return {
      type: "pmb",
      mode: parser.mode,
      body: ordargument(args[0])
    }
  },
  mathmlBuilder(group, style) {
    const inner = mml.buildExpression(group.body, style)
    // Wrap with an <mstyle> element.
    const node = wrapWithMstyle(inner)
    node.setAttribute("style", "font-weight:bold")
    return node
  }
})
