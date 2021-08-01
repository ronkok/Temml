import { defineFunctionBuilders } from "../defineFunction"
import { getVariant } from "../variant"
import { variantChar, smallCaps } from "../replace"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"
import { Span } from "../domTree"

// "mathord" and "textord" ParseNodes created in Parser.js from symbol Groups in
// src/symbols.js.

const numberRegEx = /^\d[\d.]*$/  // Keep in sync with numberRegEx in Parser.js

defineFunctionBuilders({
  type: "mathord",
  mathmlBuilder(group, style) {
    const variant = getVariant(group, style) || "italic"
    const text = mml.makeText(group.text, group.mode, style)
    if (variant === "script" && style.font === "mathscr") {
      const span = new Span(["script"], [text])
      return new mathMLTree.MathNode("mi", [span])
    }
    if (variant !== "italic") {
      text.text = variantChar(text.text, variant)
    }
    const node = new mathMLTree.MathNode("mi", [text])
    if (variant === "normal") {
      node.setAttribute("mathvariant", "normal")
    }
    return node
  }
})

defineFunctionBuilders({
  type: "textord",
  mathmlBuilder(group, style) {
    let ch = group.text
    const codePoint = ch.codePointAt(0)
    if (style.fontFamily === "textsc") {
      // Convert small latin letters to small caps.
      if (96 < codePoint && codePoint < 123) {
        ch = smallCaps[ch]
      }
    }
    const text = mml.makeText(ch, group.mode, style)
    const variant = getVariant(group, style) || "normal"

    let node
    if (group.mode === "text") {
      if (variant === "italic" || variant === "bold-italic") {
        if (numberRegEx.test(group.text)) {
          const span = new Span([`${variant}-number`], [text])
          return new mathMLTree.MathNode("mtext", [span])
        }
      }
      if (variant !== "normal") {
        text.text = variantChar(text.text, variant)
      }
      node = new mathMLTree.MathNode("mtext", [text])
    } else if (numberRegEx.test(group.text)) {
      if (variant === "oldstylenums") {
        const span = new Span(["oldstylenums"], [text])
        node = new mathMLTree.MathNode("mn", [span])
      } else if (variant === "italic" || variant === "bold-italic") {
        const span = new Span([`${variant}-number`], [text])
        node = new mathMLTree.MathNode("mn", [span])
      } else {
        if (variant !== "normal") { text.text = variantChar(text.text, variant) }
        node = new mathMLTree.MathNode("mn", [text])
      }
    } else if (group.text === "\\prime") {
      node = new mathMLTree.MathNode("mo", [text])
    } else {
      const origText = text.text
      if (variant !== "italic") {
        text.text = variantChar(text.text, variant)
      }
      node = new mathMLTree.MathNode("mi", [text])
      if (text.text === origText ) {
        node.setAttribute("mathvariant", "italic")
      }
    }
    return node
  }
})
