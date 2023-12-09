import defineFunction, { ordargument } from "../defineFunction";
import { StyleLevel } from "../constants"
import * as mml from "../buildMathML";

// \hbox is provided for compatibility with LaTeX functions that act on a box.
// This function by itself doesn't do anything but set scriptlevel to \textstyle
// and prevent a soft line break.

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
    const newStyle = style.withLevel(StyleLevel.TEXT)
    const mrow = mml.buildExpressionRow(group.body, newStyle)
    return mml.consolidateText(mrow)
  }
});
