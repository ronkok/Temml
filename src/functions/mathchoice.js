import defineFunction, { ordargument } from "../defineFunction";
import { StyleLevel } from "../constants";
import * as mml from "../buildMathML";

const chooseStyle = (group, style) => {
  switch (style.level) {
    case StyleLevel.DISPLAY:       // 0
      return group.display;
    case StyleLevel.TEXT:          // 1
      return group.text;
    case StyleLevel.SCRIPT:        // 2
      return group.script;
    case StyleLevel.SCRIPTSCRIPT:  // 3
      return group.scriptscript;
    default:
      return group.text;
  }
};

defineFunction({
  type: "mathchoice",
  names: ["\\mathchoice"],
  props: {
    numArgs: 4,
    primitive: true
  },
  handler: ({ parser }, args) => {
    return {
      type: "mathchoice",
      mode: parser.mode,
      display: ordargument(args[0]),
      text: ordargument(args[1]),
      script: ordargument(args[2]),
      scriptscript: ordargument(args[3])
    };
  },
  mathmlBuilder: (group, style) => {
    const body = chooseStyle(group, style);
    return mml.buildExpressionRow(body, style);
  }
});
