import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML"
import ParseError from "../ParseError";

// Helper function
export const buildGroup = (el, style, noneNode) => {
  if (!el) { return noneNode }
  const node = mml.buildGroup(el, style)
  if (node.type === "mrow" && node.children.length === 0) { return noneNode }
  return node
}

defineFunction({
  type: "multiscript",
  names: ["\\sideset", "\\pres@cript"], // See macros.js for \prescript
  props: {
    numArgs: 3
  },
  handler({ parser, funcName, token }, args) {
    if (args[2].body.length === 0) {
      throw new ParseError(funcName + `cannot parse an empty base.`)
    }
    const base = args[2].body[0]
    if (parser.settings.strict && funcName === "\\sideset" && !base.symbol) {
      throw new ParseError(`The base of \\sideset must be a big operator. Try \\prescript.`)
    }

    if ((args[0].body.length > 0 && args[0].body[0].type !== "supsub") ||
        (args[1].body.length > 0 && args[1].body[0].type !== "supsub")) {
      throw new ParseError("\\sideset can parse only subscripts and " +
                            "superscripts in its first two arguments", token)
    }

    // The prescripts and postscripts come wrapped in a supsub.
    const prescripts = args[0].body.length > 0 ? args[0].body[0] : null
    const postscripts = args[1].body.length > 0 ? args[1].body[0] : null

    if (!prescripts && !postscripts) {
      return base
    } else if (!prescripts) {
      // It's not a multi-script. Get a \textstyle supsub.
      return {
        type: "styling",
        mode: parser.mode,
        scriptLevel: "text",
        body: [{
          type: "supsub",
          mode: parser.mode,
          base,
          sup: postscripts.sup,
          sub: postscripts.sub
        }]
      }
    } else {
      return {
        type: "multiscript",
        mode: parser.mode,
        isSideset: funcName === "\\sideset",
        prescripts,
        postscripts,
        base
      }
    }
  },
  mathmlBuilder(group, style) {
    const base =  mml.buildGroup(group.base, style)

    const prescriptsNode = new mathMLTree.MathNode("mprescripts")
    const noneNode = new mathMLTree.MathNode("none")
    let children = []

    const preSub = buildGroup(group.prescripts.sub, style, noneNode)
    const preSup = buildGroup(group.prescripts.sup, style, noneNode)
    if (group.isSideset) {
      // This seems silly, but LaTeX does this. Firefox ignores it, which does not make me sad.
      preSub.setAttribute("style", "text-align: left;")
      preSup.setAttribute("style", "text-align: left;")
    }

    if (group.postscripts) {
      const postSub = buildGroup(group.postscripts.sub, style, noneNode)
      const postSup = buildGroup(group.postscripts.sup, style, noneNode)
      children = [base, postSub, postSup, prescriptsNode, preSub, preSup]
    } else {
      children = [base, prescriptsNode, preSub, preSup]
    }

    return new mathMLTree.MathNode("mmultiscripts", children);
  }
});
