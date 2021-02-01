import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// \vcenter:  Vertically center the argument group on the math axis.

defineFunction({
  type: "vcenter",
  names: ["\\vcenter"],
  props: {
    numArgs: 1,
    argTypes: ["math"],
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
    // There is no way to do this in MathML.
    // Write a class so a post-processor can easily find this element.
    // TODO: Monitor MathML and update this when possible.
    return new mathMLTree.MathNode("mpadded",
      [mml.buildGroup(group.body, style)], ["vcenter"]
    );
  }
});
