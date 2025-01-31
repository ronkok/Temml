import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// \vcenter:  Vertically center the argument group on the math axis.

defineFunction({
  type: "vcenter",
  names: ["\\vcenter"],
  props: {
    numArgs: 1,
    argTypes: ["original"],
    allowedInText: false
  },
  handler({ parser }, args) {
    return {
      type: "vcenter",
      mode: parser.mode,
      body: args[0]
    };
  },
  mathmlBuilder(group, style) {
    // Use a math table to create vertically centered content.
    const mtd = new mathMLTree.MathNode("mtd", [mml.buildGroup(group.body, style)])
    mtd.style.padding = "0"
    const mtr = new mathMLTree.MathNode("mtr", [mtd])
    return new mathMLTree.MathNode("mtable", [mtr])
  }
});

