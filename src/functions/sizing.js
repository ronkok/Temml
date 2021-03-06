import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";

// The size mappings are taken from TeX with \normalsize=10pt.
// We don't have to track script level. MathML does that.
const sizeMap = {
  "\\tiny": 0.5,
  "\\sixptsize": 0.6,
  "\\Tiny": 0.6,
  "\\scriptsize": 0.7,
  "\\footnotesize": 0.8,
  "\\small": 0.9,
  "\\normalsize": 1.0,
  "\\large": 1.2,
  "\\Large": 1.44,
  "\\LARGE": 1.728,
  "\\huge": 2.074,
  "\\Huge": 2.488
};

defineFunction({
  type: "sizing",
  names: [
    "\\tiny",
    "\\sixptsize",
    "\\Tiny",
    "\\scriptsize",
    "\\footnotesize",
    "\\small",
    "\\normalsize",
    "\\large",
    "\\Large",
    "\\LARGE",
    "\\huge",
    "\\Huge"
  ],
  props: {
    numArgs: 0,
    allowedInText: true
  },
  handler: ({ breakOnTokenText, funcName, parser }, args) => {
    const body = parser.parseExpression(false, breakOnTokenText);
    return {
      type: "sizing",
      mode: parser.mode,
      funcName,
      body
    };
  },
  mathmlBuilder: (group, style) => {
    const inner = mml.buildExpression(group.body, style);
    const node = new mathMLTree.MathNode("mstyle", inner);
    node.setAttribute("mathsize", sizeMap[group.funcName] + "em");
    return node;
  }
});
