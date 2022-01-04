import { defineFunctionBuilders } from "../defineFunction";

defineFunctionBuilders({
  type: "tag"
});

// For a \tag, the work usually done in a mathmlBuilder is instead done in buildMathML.js.
// That way, a \tag can be pulled out of the parse tree and wrapped around the outer node.
