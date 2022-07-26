import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import stretchy from "../stretchy";
import * as mml from "../buildMathML";

const mathmlBuilder = (group, style) => {
  const accentNode = stretchy.mathMLnode(group.label);
  accentNode.style["math-depth"] = 0
  return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [
    mml.buildGroup(group.base, style),
    accentNode
  ]);
};

// Horizontal stretchy braces
defineFunction({
  type: "horizBrace",
  names: ["\\overbrace", "\\underbrace"],
  props: {
    numArgs: 1
  },
  handler({ parser, funcName }, args) {
    return {
      type: "horizBrace",
      mode: parser.mode,
      label: funcName,
      isOver: /^\\over/.test(funcName),
      base: args[0]
    };
  },
  mathmlBuilder
});
