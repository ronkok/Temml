import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";

/* In LaTeX, \colon is defined as:
 * \renewcommand{\colon}{\nobreak\mskip2mu\mathpunct{}\nonscript
 * \mkern-\thinmuskip{:}\mskip6muplus1mu\relax}
 *
 * Doing that with a Temml macro produces semantically poor MathML. Do it more directly.
 */

defineFunction({
  type: "colonFunction",
  names: ["\\colon"],
  props: { numArgs: 0 },
  handler({ parser }) { return { type: "colonFunction", mode: parser.mode } },
  mathmlBuilder(group, style) {
    const mo = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(":")])
    // lspace depends on the script level.
    mo.attributes.lspace = (style.level < 2 ? "0.05556em" : "0.1111em")
    mo.attributes.rspace = "0.3333em" // 6mu
    return mo
  }
});
