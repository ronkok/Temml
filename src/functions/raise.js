import defineFunction from "../defineFunction"
import { StyleLevel } from "../constants"
import mathMLTree from "../mathMLTree"
import { assertNodeType } from "../parseNode"
import { calculateSize } from "../units"
import * as mml from "../buildMathML"

// \raise, \lower, and \raisebox

const mathmlBuilder = (group, style) => {
  const newStyle = style.withLevel(StyleLevel.TEXT)
  const node = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body, newStyle)])
  const dy = calculateSize(group.dy, style)
  node.setAttribute("voffset", dy.number + dy.unit)
  // Add padding, which acts to increase height in Chromium.
  // TODO: Figure out some way to change height in Firefox w/o breaking Chromium.
  if (dy.number > 0) {
    node.style.padding = dy.number + dy.unit + " 0 0 0"
  } else {
    node.style.padding = "0 0 " + Math.abs(dy.number) + dy.unit + " 0"
  }
  return node
}

defineFunction({
  type: "raise",
  names: ["\\raise", "\\lower"],
  props: {
    numArgs: 2,
    argTypes: ["size", "primitive"],
    primitive: true
  },
  handler({ parser, funcName }, args) {
    const amount = assertNodeType(args[0], "size").value;
    if (funcName === "\\lower") { amount.number *= -1 }
    const body = args[1]
    return {
      type: "raise",
      mode: parser.mode,
      dy: amount,
      body
    };
  },
  mathmlBuilder
})


defineFunction({
  type: "raise",
  names: ["\\raisebox"],
  props: {
    numArgs: 2,
    argTypes: ["size", "hbox"],
    allowedInText: true
  },
  handler({ parser, funcName }, args) {
    const amount = assertNodeType(args[0], "size").value
    const body = args[1]
    return {
      type: "raise",
      mode: parser.mode,
      dy: amount,
      body
    };
  },
  mathmlBuilder
})

