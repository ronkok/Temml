// Row breaks within tabular environments, and line breaks at top level

import defineFunction from "../defineFunction"
import mathMLTree from "../mathMLTree"
import { calculateSize } from "../units"
import { assertNodeType } from "../parseNode"

// \DeclareRobustCommand\\{...\@xnewline}
defineFunction({
  type: "cr",
  names: ["\\\\"],
  props: {
    numArgs: 0,
    numOptionalArgs: 0,
    allowedInText: true
  },

  handler({ parser }, args, optArgs) {
    const size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
    const newLine = !parser.settings.displayMode;
    return {
      type: "cr",
      mode: parser.mode,
      newLine,
      size: size && assertNodeType(size, "size").value
    }
  },

  // The following builder is called only at the top level,
  // not within tabular/array environments.

  mathmlBuilder(group, style) {
    // MathML 3.0 calls for newline to occur in an <mo> or an <mspace>.
    // Ref: https://www.w3.org/TR/MathML3/chapter3.html#presm.linebreaking
    const node = new mathMLTree.MathNode("mo")
    if (group.newLine) {
      node.setAttribute("linebreak", "newline")
      if (group.size) {
        const size = calculateSize(group.size, style)
        node.setAttribute("height", size.number + size.unit)
      }
    }
    return node
  }
})
