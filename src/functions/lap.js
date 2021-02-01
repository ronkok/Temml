// Horizontal overlap functions
import defineFunction from "../defineFunction"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"

defineFunction({
  type: "lap",
  names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
  props: {
    numArgs: 1,
    allowedInText: true
  },
  handler: ({ parser, funcName }, args) => {
    const body = args[0]
    return {
      type: "lap",
      mode: parser.mode,
      alignment: funcName.slice(5),
      body
    }
  },
  mathmlBuilder: (group, style) => {
    // mathllap, mathrlap, mathclap
    const node = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body, style)])

    if (group.alignment !== "rlap") {
      const offset = group.alignment === "llap" ? "-1" : "-0.5"
      node.setAttribute("lspace", offset + "width")
    }
    node.setAttribute("width", "0px")
    return node
  }
})
