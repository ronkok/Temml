import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";

// Unlike TeX, MathML (at least Firefox) does not suppress spacing between relations.
// `:=` is so common that I want to override MathML and render it well.

defineFunction({
  type: "colonequal",
  names: [":"],
  props: { numArgs: 0, allowedInText: true, allowedInMath: true },
  handler({ parser }, args) {
    if (parser.mode === "text") {
      return { type: "textord", text: ":", mode: "text" }
    } else if (parser.fetch().text === "=") {
      // Special case for :=
      parser.consume()
      return { type: "colonequal", mode: "math" }
    }
    return { type: "atom", family: "rel", text: ":", mode: "math" }
  },
  mathmlBuilder(group, style) {
    return new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u2254")])
  }
});
