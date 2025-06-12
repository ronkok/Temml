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

// From the KaTeX font metrics, identify letters that encroach on a superscript.
const smallPad = "DHKLUcegorsuvxyzΠΥΨαδηιμνοτυχϵ"
const mediumPad = "BCEFGIMNOPQRSTXZlpqtwΓΘΞΣΦΩβεζθξρςφψϑϕϱ"
const largePad = "AJdfΔΛ"

// Super scripts and subscripts, whose precise placement can depend on other
// functions that precede them.
defineFunctionBuilders({
  type: "supsub",
  mathmlBuilder(group, style) {
    // Is the inner group a relevant horizontal brace?
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

    if (group.base && !group.stack &&
      (group.base.type === "op" || group.base.type === "operatorname")) {
      group.base.parentIsSupSub = true
      appendApplyFunction = !group.base.symbol
      appendSpace = appendApplyFunction && !group.isFollowedByDelimiter
      needsLeadingSpace = group.base.needsLeadingSpace
    }

    const children = group.stack && group.base.body.length === 1
      ? [mml.buildGroup(group.base.body[0], style)]
      : [mml.buildGroup(group.base, style)];

    // Note regarding scriptstyle level.
    // (Sub|super)scripts should not shrink beyond MathML scriptlevel 2 aka \scriptscriptstyle
    // Ref: https://w3c.github.io/mathml-core/#the-displaystyle-and-scriptlevel-attributes
    // (BTW, MathML scriptlevel 2 is equal to Temml level 3.)
    // But Chromium continues to shrink the (sub|super)scripts. So we explicitly set scriptlevel 2.

    const childStyle = style.inSubOrSup()
    if (group.sub) {
      const sub = mml.buildGroup(group.sub, childStyle)
      if (style.level === 3) { sub.setAttribute("scriptlevel", "2") }
      children.push(sub)
    }

    if (group.sup) {
      const sup = mml.buildGroup(group.sup, childStyle)
      if (style.level === 3) { sup.setAttribute("scriptlevel", "2") }
      if (group.base && group.base.text && group.base.text.length === 1) {
        // Make an italic correction on the superscript.
        const text = group.base.text
        if (smallPad.indexOf(text) > -1) {
          sup.classes.push("tml-sml-pad")
        } else if (mediumPad.indexOf(text) > -1) {
          sup.classes.push("tml-med-pad")
        } else if (largePad.indexOf(text) > -1) {
          sup.classes.push("tml-lrg-pad")
        }
      }
      children.push(sup)
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
      if (group.stack) {
        nodeType = "munder";
      } else if (
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
