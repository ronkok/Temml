import defineFunction, { ordargument } from "../defineFunction";
import symbols from "../symbols";
import * as mml from "../buildMathML";
import utils from "../utils"

defineFunction({
  type: "not",
  names: ["\\not"],
  props: {
    numArgs: 1,
    primitive: true,
    allowedInText: false
  },
  handler({ parser }, args) {
    const isCharacterBox = utils.isCharacterBox(args[0])
    let body
    if (isCharacterBox) {
      body = ordargument(args[0])
      if (body[0].text.charAt(0) === "\\") {
        body[0].text = symbols.math[body[0].text].replace
      }
      // \u0338 is the Unicode Combining Long Solidus Overlay
      body[0].text = body[0].text.slice(0, 1) + "\u0338" + body[0].text.slice(1)
    } else {
      // When the argument is not a character box, TeX does an awkward, poorly placed overlay.
      // We'll do the same.
      const notNode = { type: "textord", mode: "math", text: "\u0338" }
      const kernNode = { type: "kern", mode: "math", dimension: { number: -0.6, unit: "em" } }
      body = [notNode, kernNode, args[0]]
    }
    return {
      type: "not",
      mode: parser.mode,
      body,
      isCharacterBox
    };
  },
  mathmlBuilder(group, style) {
    if (group.isCharacterBox) {
      const inner = mml.buildExpression(group.body, style);
      return inner[0]
    } else {
      return mml.buildExpressionRow(group.body, style, true)
    }
  }
});
