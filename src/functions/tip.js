import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// Two functions included to enable migration from Mathjax.

defineFunction({
  type: "tip",
  names: ["\\mathtip"],
  props: {
    numArgs: 2
  },
  handler({ parser }, args) {
    return {
      type: "tip",
      mode: parser.mode,
      body: args[0],
      tip: args[1]
    };
  },
  mathmlBuilder: (group, style) => {
    const math = mml.buildGroup(group.body, style)
    const tip = mml.buildGroup(group.tip, style)
    // Browsers don't support the tooltip actiontype.
    // TODO: Come back and fix \mathtip when it can be done via CSS w/o a JS event.
    const node = new mathMLTree.MathNode("maction", [math, tip], ["tml-tip"])
    node.setAttribute("actiontype", "tooltip")
    return node
  }
})

defineFunction({
  type: "tip",
  names: ["\\texttip"],
  props: {
    numArgs: 2,
    argTypes: ["math", "text"]
  },
  handler({ parser }, args) {
    return {
      type: "tip",
      mode: parser.mode,
      body: args[0],
      tip: args[1]
    };
  },
  mathmlBuilder: (group, style) => {
    const math = mml.buildGroup(group.body, style)
    const tip = mml.buildGroup(group.tip, style)
    // args[1] only accepted text, so tip is a <mtext> element or a <mrow> of them.
    let str = ""
    if (tip.type === "mtext") {
      str = tip.children[0].text
    } else {
      for (const child of tip.children) {
        str += child.children[0].text
      }
    }
    // Implement \texttip via a title attribute.
    math.setAttribute("title", str)
    return math
  }
})
