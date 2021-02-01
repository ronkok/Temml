import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { invalidIdRegEx } from "./label";

defineFunction({
  type: "ref",
  names: ["\\ref", "\\eqref"],
  props: {
    numArgs: 1,
    argTypes: ["raw"]
  },
  handler({ parser, funcName }, args) {
    return {
      type: "ref",
      mode: parser.mode,
      funcName,
      string: args[0].string.replace(invalidIdRegEx, "")
    };
  },
  mathmlBuilder(group, style) {
    // Create an empty text node. Set a class and an href.
    // The post-processor will populate with the target's tag or equation number.
    const classes = group.funcName === "\\ref" ? ["tml-ref"] : ["tml-ref", "tml-eqref"]
    const node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("")], classes)
    node.setAttribute("href", "#" + group.string)
    return node
  }
});
