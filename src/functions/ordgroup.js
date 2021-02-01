import { defineFunctionBuilders } from "../defineFunction";
import * as mml from "../buildMathML";

defineFunctionBuilders({
  type: "ordgroup",
  mathmlBuilder(group, style) {
    return mml.buildExpressionRow(group.body, style, true);
  }
});
