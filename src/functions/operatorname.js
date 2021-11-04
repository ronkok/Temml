import defineFunction, { ordargument } from "../defineFunction"
import defineMacro from "../defineMacro";
import mathMLTree from "../mathMLTree"
import { spaceCharacter } from "./kern"
import { ordTypes } from "./op"
import utils from "../utils"

import * as mml from "../buildMathML"

// NOTE: Unlike most builders, this one handles not only
// "operatorname", but also  "supsub" since \operatorname* can
// affect super/subscripting.

const mathmlBuilder = (group, style) => {
  let expression = mml.buildExpression(group.body, style.withFont("mathrm"))

  // Is expression a string or has it something like a fraction?
  let isAllString = true; // default
  for (let i = 0; i < expression.length; i++) {
    const node = expression[i]
    if (node instanceof mathMLTree.MathNode) {
      switch (node.type) {
        case "mi":
        case "mn":
        case "ms":
        case "mtext":
          break; // Do nothing yet.
        case "mspace":
          {
            if (node.attributes.width) {
              const width = node.attributes.width.replace("em", "")
              const ch = spaceCharacter(Number(width))
              if (ch === "") {
                isAllString = false
              } else {
                expression[i] = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode(ch)])
              }
            }
          }
          break
        case "mo": {
          const child = node.children[0]
          if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
            child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*")
          } else {
            isAllString = false
          }
          break
        }
        default:
          isAllString = false
      }
    } else {
      isAllString = false
    }
  }

  if (isAllString) {
    // Write a single TextNode instead of multiple nested tags.
    const word = expression.map((node) => node.toText()).join("")
    expression = [new mathMLTree.TextNode(word)]
  } else if (
    expression.length === 1
    && utils.contains(["mover", "munder"], expression[0].type) &&
    (expression[0].children[0].type === "mi" || expression[0].children[0].type === "mtext")
  ) {
    expression[0].children[0].type = "mi"
    if (group.parentIsSupSub) {
      return new mathMLTree.MathNode("mrow", expression)
    } else {
      const operator = new mathMLTree.MathNode("mo", [mml.makeText("\u2061", "text")])
      return mathMLTree.newDocumentFragment([expression[0], operator])
    }
  }

  let wrapper;
  if (isAllString) {
    wrapper = new mathMLTree.MathNode("mi", expression)
    wrapper.setAttribute("mathvariant", "normal")
  } else {
    wrapper = new mathMLTree.MathNode("mrow", expression)
  }

  if (!group.parentIsSupSub) {
    // Append an <mo>&ApplyFunction;</mo>.
    // ref: https://www.w3.org/TR/REC-MathML/chap3_2.html#sec3.2.4
    const operator = new mathMLTree.MathNode("mo", [mml.makeText("\u2061", "text")])
    if (group.needsLeadingSpace) {
      // LaTeX gives operator spacing, but a <mi> gets ord spacing.
      // So add a leading space.
      const space = new mathMLTree.MathNode("mspace")
      space.setAttribute("width", "0.1667em") // thin space.
      return mathMLTree.newDocumentFragment([space, wrapper, operator])
    } else {
      return mathMLTree.newDocumentFragment([wrapper, operator])
    }
  }

  return wrapper
};

// \operatorname
// amsopn.dtx: \mathop{#1\kern\z@\operator@font#3}\newmcodes@
defineFunction({
  type: "operatorname",
  names: ["\\operatorname@", "\\operatornamewithlimits"],
  props: {
    numArgs: 1
  },
  handler: ({ parser, funcName }, args) => {
    const body = args[0]
    const prevAtomType = parser.prevAtomType
    return {
      type: "operatorname",
      mode: parser.mode,
      body: ordargument(body),
      alwaysHandleSupSub: (funcName === "\\operatornamewithlimits"),
      limits: false,
      parentIsSupSub: false,
      needsLeadingSpace: prevAtomType.length > 0 && utils.contains(ordTypes, prevAtomType)
    };
  },
  mathmlBuilder
});

defineMacro("\\operatorname",
  "\\@ifstar\\operatornamewithlimits\\operatorname@");
