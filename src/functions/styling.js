import defineFunction from "../defineFunction";
import { wrapWithMstyle } from "../utils"
import * as mml from "../buildMathML";

const styleMap = {
  display: 0,
  text: 1,
  script: 2,
  scriptscript: 3
};

defineFunction({
  type: "styling",
  names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
  props: {
    numArgs: 0,
    allowedInText: true,
    primitive: true
  },
  handler({ breakOnTokenText, funcName, parser }, args) {
    // parse out the implicit body
    const body = parser.parseExpression(true, breakOnTokenText);

    const scriptLevel = funcName.slice(1, funcName.length - 5);
    return {
      type: "styling",
      mode: parser.mode,
      // Figure out what scriptLevel to use by pulling out the scriptLevel from
      // the function name
      scriptLevel,
      body
    };
  },
  mathmlBuilder(group, style) {
    // Figure out what scriptLevel we're changing to.
    const newStyle = style.withLevel(styleMap[group.scriptLevel]);

    const inner = mml.buildExpression(group.body, newStyle);
    // Wrap with an <mstyle> element.
    const node = wrapWithMstyle(inner)

    const styleAttributes = {
      display: ["0", "true"],
      text: ["0", "false"],
      script: ["1", "false"],
      scriptscript: ["2", "false"]
    };

    const attr = styleAttributes[group.scriptLevel];

    node.setAttribute("scriptlevel", attr[0]);
    node.setAttribute("displaystyle", attr[1]);

    return node;
  }
});
