import { defineFunctionBuilders } from "../defineFunction"
import { StyleLevel } from "../constants"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"

/**
 * Sometimes, groups perform special rules when they have superscripts or
 * subscripts attached to them. This function lets the `supsub` group know that
 * Sometimes, groups perform special rules when they have superscripts or
 * its inner element should handle the superscripts and subscripts instead of
 * handling them itself.
 */

// Helpers
const symbolRegEx = /^m(over|under|underover)$/

// Super scripts and subscripts, whose precise placement can depend on other
// functions that precede them.
defineFunctionBuilders({
  type: "supsub",
  mathmlBuilder(group, style) {
    // Is the inner group a relevant horizonal brace?
    let isBrace = false
    let isOver
    let isSup
    let appendApplyFunction = false
    let appendSpace = false
    let needsLeadingSpace = false

    if (group.base && group.base.type === "horizBrace") {
      isSup = !!group.sup
      if (isSup === group.base.isOver) {
        isBrace = true
        isOver = group.base.isOver
      }
    }

    if (group.base && !group.base.stack &&
      (group.base.type === "op" || group.base.type === "operatorname")) {
      group.base.parentIsSupSub = true
      appendApplyFunction = !group.base.symbol
      appendSpace = appendApplyFunction && !group.isFollowedByDelimiter
      needsLeadingSpace = group.base.needsLeadingSpace
    }

    const children = group.base && group.base.stack
      ? [mml.buildGroup(group.base.body[0], style)]
      : [mml.buildGroup(group.base, style)]

    const childStyle = style.inSubOrSup()
    if (group.sub) {
      children.push(mml.buildGroup(group.sub, childStyle))
    }

    if (group.sup) {
      children.push(mml.buildGroup(group.sup, childStyle))
    }

    let nodeType;
    if (isBrace) {
      nodeType = isOver ? "mover" : "munder"
    } else if (!group.sub) {
      const base = group.base
      if (
        base &&
        base.type === "op" &&
        base.limits &&
        (style.level === StyleLevel.DISPLAY || base.alwaysHandleSupSub)
      ) {
        nodeType = "mover"
      } else if (
        base &&
        base.type === "operatorname" &&
        base.alwaysHandleSupSub &&
        (base.limits || style.level === StyleLevel.DISPLAY)
      ) {
        nodeType = "mover"
      } else {
        nodeType = "msup"
      }
    } else if (!group.sup) {
      const base = group.base;
      if (
        base &&
        base.type === "op" &&
        base.limits &&
        (style.level === StyleLevel.DISPLAY || base.alwaysHandleSupSub)
      ) {
        nodeType = "munder";
      } else if (
        base &&
        base.type === "operatorname" &&
        base.alwaysHandleSupSub &&
        (base.limits || style.level === StyleLevel.DISPLAY)
      ) {
        nodeType = "munder"
      } else {
        nodeType = "msub"
      }
    } else {
      const base = group.base;
      if (base && ((base.type === "op" && base.limits) || base.type === "multiscript") &&
        (style.level === StyleLevel.DISPLAY || base.alwaysHandleSupSub)
      ) {
        nodeType = "munderover"
      } else if (
        base &&
        base.type === "operatorname" &&
        base.alwaysHandleSupSub &&
        (style.level === StyleLevel.DISPLAY || base.limits)
      ) {
        nodeType = "munderover"
      } else {
        nodeType = "msubsup"
      }
    }

    let node = new mathMLTree.MathNode(nodeType, children)
    if (appendApplyFunction) {
      // Append an <mo>&ApplyFunction;</mo>.
      // ref: https://www.w3.org/TR/REC-MathML/chap3_2.html#sec3.2.4
      const operator = new mathMLTree.MathNode("mo", [mml.makeText("\u2061", "text")])
      if (needsLeadingSpace) {
        const space = new mathMLTree.MathNode("mspace")
        space.setAttribute("width", "0.1667em") // thin space.
        node = mathMLTree.newDocumentFragment([space, node, operator])
      } else {
        node = mathMLTree.newDocumentFragment([node, operator])
      }
      if (appendSpace) {
        const space = new mathMLTree.MathNode("mspace")
        space.setAttribute("width", "0.1667em") // thin space.
        node.children.push(space)
      }
    } else if (symbolRegEx.test(nodeType)) {
      // Wrap in a <mrow>. Otherwise Firefox stretchy parens will not stretch to include limits.
      node = new mathMLTree.MathNode("mrow", [node])
    }

    return node
  }
});
