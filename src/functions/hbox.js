import defineFunction, { ordargument } from "../defineFunction";
import { StyleLevel } from "../constants"
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// \hbox is provided for compatibility with LaTeX functions that act on a box.
// This function by itself doesn't do anything but prevent a soft line break.

defineFunction({
  type: "hbox",
  names: ["\\hbox"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInArgument: true,
    allowedInText: false
  },
  handler({ parser }, args) {
    return {
      type: "hbox",
      mode: parser.mode,
      body: ordargument(args[0])
    };
  },
  mathmlBuilder(group, style) {
    const newOptions = style.withLevel(StyleLevel.TEXT)
    return new mathMLTree.MathNode("mrow", mml.buildExpression(group.body, newOptions));
  }
});
