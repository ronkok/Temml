import defineFunction, { ordargument } from "../defineFunction"
import { wrapWithMstyle } from "../mathMLTree"
import * as mml from "../buildMathML"

// \pmb is a simulation of bold font.
// The version of \pmb in ambsy.sty works by typesetting three copies of the argument
// with small offsets. We use CSS text-shadow.
// It's a hack. Not as good as a real bold font. Better than nothing.

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
    node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px")
    return node
  }
})
