// Horizontal overlap functions
import defineFunction from "../defineFunction"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"

defineFunction({
  type: "lap",
  names: ["\\mathllap", "\\mathclap"],
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
    // mathllap, mathclap
    const node = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body, style)])
    const offset = group.alignment === "llap" ? "-1" : "-0.5"
    node.setAttribute("lspace", offset + "width")
    node.setAttribute("width", "0px")
    return node
  }
})

defineFunction({
  type: "mathrlap",
  names: ["\\mathrlap"],
  props: {
    numArgs: 2,
    allowedInText: true
  },
  handler: ({ parser, funcName }, args) => {
    const body0 = args[0]
    const body1 = args[1]
    return {
      type: "mathrlap",
      mode: parser.mode,
      body0,
      body1
    }
  },
  mathmlBuilder: (group, style) => {
    const node0 = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body0, style)])
    // The next node also has to be wrapped in <mpadded> or Firefox will not align it properly.
    const node1 = new mathMLTree.MathNode("mpadded", [mml.buildGroup(group.body1, style)])
    node0.setAttribute("width", "0px")
    return new mathMLTree.MathNode("mrow", [node0, node1])
  }
})
