import { defineFunctionBuilders } from "../defineFunction"
import { getVariant } from "../variant"
import { variantChar, smallCaps } from "../replace"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"
import { Span } from "../domTree"

// "mathord" and "textord" ParseNodes created in Parser.js from symbol Groups in
// src/symbols.js.

const numberRegEx = /^\d[\d.]*$/  // Keep in sync with numberRegEx in Parser.js

const italicNumber = (text, variant) => {
  const span = new Span([], [text])
  const numberStyle = variant === "italic"
    ? `font-family: Cambria, "Times New Roman", serif; font-style: italic;`
    : `font-family: Cambria, "Times New Roman", serif; font-style: italic; font-weight: bold;`
  span.setAttribute("style", numberStyle)
  return new mathMLTree.MathNode("mn", [span])
}

defineFunctionBuilders({
  type: "mathord",
  mathmlBuilder(group, style) {
    const text = mml.makeText(group.text, group.mode, style)
    if (style.font === "mathscr") {
      const span = new Span([], [text])
      span.setAttribute("style", `font-family: "KaTeX_Script", serif;`)
      const node = new mathMLTree.MathNode("mi", [span])
      return node
    }
    const variant = getVariant(group, style) || "italic"
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
          return italicNumber(text, variant)
        }
      }
      if (variant !== "normal") {
        text.text = variantChar(text.text, variant)
      }
      node = new mathMLTree.MathNode("mtext", [text])
    } else if (numberRegEx.test(group.text)) {
      if (variant === "oldstylenums") {
        const span = new Span([], [text])
        span.setAttribute("style", `font-family: Cambria, "Times New Roman", serif;
            font-variant-numeric: oldstyle-nums; font-feature-settings: 'onum';`)
        node = new mathMLTree.MathNode("mn", [span])
      } else if (variant === "italic" || variant === "bold-italic") {
        return italicNumber(text, variant)
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
