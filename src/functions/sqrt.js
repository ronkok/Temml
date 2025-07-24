import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// Letters that are x-height w/o a descender.
const xHeights = ['a', 'c', 'e', 'ı', 'm', 'n', 'o', 'r', 's', 'u', 'v', 'w', 'x', 'z', 'α',
  'ε', 'ι', 'κ', 'ν', 'ο', 'π', 'σ', 'τ', 'υ', 'ω', '\\alpha', '\\epsilon', "\\iota",
  '\\kappa', '\\nu', '\\omega', '\\pi', '\\tau', '\\omega']

defineFunction({
  type: "sqrt",
  names: ["\\sqrt"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler({ parser }, args, optArgs) {
    const index = optArgs[0];
    const body = args[0];
    // Check if the body consists entirely of an x-height letter.
    // TODO: Remove this check after Chromium is fixed.
    if (body.body && body.body.length === 1 && body.body[0].text &&
          xHeights.includes(body.body[0].text)) {
      // Chromium does not put enough space above an x-height letter.
      // Insert a strut.
      body.body.push({
        "type": "rule",
        "mode": "math",
        "shift": null,
        "width": { "number": 0, "unit": "pt" },
        "height": { "number": 0.5, "unit": "em" }
      })
    }
    return {
      type: "sqrt",
      mode: parser.mode,
      body,
      index
    };
  },
  mathmlBuilder(group, style) {
    const { body, index } = group;
    return index
      ? new mathMLTree.MathNode("mroot", [
        mml.buildGroup(body, style),
        mml.buildGroup(index, style.incrementLevel())
      ])
    : new mathMLTree.MathNode("msqrt", [mml.buildGroup(body, style)]);
  }
});
