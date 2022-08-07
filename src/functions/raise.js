import defineFunction from "../defineFunction"
import { StyleLevel } from "../constants"
import mathMLTree from "../mathMLTree"
import { assertNodeType } from "../parseNode"
import { calculateSize } from "../units"
import * as mml from "../buildMathML"

const sign = num => num >= 0 ? "+" : "-"

// \raise, \lower, and \raisebox

const mathmlBuilder = (group, style) => {
  const newStyle = style.withLevel(StyleLevel.TEXT)
  const node = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body, newStyle)])
  const dy = calculateSize(group.dy, style)
  node.setAttribute("voffset", dy.number + dy.unit)
  const dyAbs = Math.abs(dy.number)
  // The next two lines do not work in Chromium.
  // TODO: Find some other way to adjust height and depth.
  node.setAttribute("height", sign(dy.number) +  dyAbs + dy.unit)
  node.setAttribute("depth", sign(-dy.number) +  dyAbs + dy.unit)
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

