import defineFunction from "../defineFunction";
import * as mathMLTree from "../mathMLTree";
import * as stretchy from "../stretchy";

import * as mml from "../buildMathML";

defineFunction({
  type: "accentUnder",
  names: [
    "\\underleftarrow",
    "\\underrightarrow",
    "\\underleftrightarrow",
    "\\undergroup",
    "\\underparen",
    "\\utilde"
  ],
  props: {
    numArgs: 1
  },
  handler: ({ parser, funcName }, args) => {
    const base = args[0];
    return {
      type: "accentUnder",
      mode: parser.mode,
      label: funcName,
      base: base
    };
  },
  mathmlBuilder: (group, style) => {
    const accentNode = stretchy.accentNode(group);
    accentNode.style["math-depth"] = 0
    const node = new mathMLTree.MathNode("munder", [
      mml.buildGroup(group.base, style),
      accentNode
    ]);
    return node;
  }
});
