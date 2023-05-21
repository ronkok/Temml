import { defineFunctionBuilders } from "../defineFunction"
import { getVariant } from "../variant"
import { variantChar, smallCaps } from "../replace"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"

// "mathord" and "textord" ParseNodes created in Parser.js from symbol Groups in
// src/symbols.js.

const numberRegEx = /^\d(?:[\d,.]*\d)?$/
const latinRegEx = /[A-Ba-z]/

const italicNumber = (text, variant, tag) => {
  const mn = new mathMLTree.MathNode(tag, [text])
  const wrapper = new mathMLTree.MathNode("mstyle", [mn])
  wrapper.style["font-style"] = "italic"
  wrapper.style["font-family"] = "Cambria, 'Times New Roman', serif"
  if (variant === "bold-italic") { wrapper.style["font-weight"] = "bold" }
  return wrapper
}

defineFunctionBuilders({
  type: "mathord",
  mathmlBuilder(group, style) {
    const text = mml.makeText(group.text, group.mode, style)
    const codePoint = text.text.codePointAt(0)
    // Test for upper-case Greek
    const defaultVariant = (0x0390 < codePoint && codePoint < 0x03aa) ? "normal" : "italic"
    const variant = getVariant(group, style) || defaultVariant
    if (variant === "script") {
      text.text = variantChar(text.text, variant)
      return new mathMLTree.MathNode("mi", [text], [style.font])
    } else if (variant !== "italic") {
      text.text = variantChar(text.text, variant)
    }
    let node = new mathMLTree.MathNode("mi", [text])
    // TODO: Handle U+1D49C - U+1D4CF per https://www.unicode.org/charts/PDF/U1D400.pdf
    if (variant === "normal") {
      node.setAttribute("mathvariant", "normal")
      if (text.text.length === 1) {
        // A Firefox bug will apply spacing here, but there should be none. Fix it.
        node = new mathMLTree.MathNode("mrow", [node])
      }
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
    if (numberRegEx.test(group.text)) {
      const tag = group.mode === "text" ? "mtext" : "mn"
      if (variant === "italic" || variant === "bold-italic") {
        return italicNumber(text, variant, tag)
      } else {
        if (variant !== "normal") {
          text.text = text.text.split("").map(c => variantChar(c, variant)).join("")
        }
        node = new mathMLTree.MathNode(tag, [text])
      }
    } else if (group.mode === "text") {
      if (variant !== "normal") {
        text.text = variantChar(text.text, variant)
      }
      node = new mathMLTree.MathNode("mtext", [text])
    } else if (group.text === "\\prime") {
      node = new mathMLTree.MathNode("mo", [text])
      // TODO: If/when Chromium uses ssty variant for prime, remove the next line.
      node.classes.push("tml-prime")
    } else {
      const origText = text.text
      if (variant !== "italic") {
        text.text = variantChar(text.text, variant)
      }
      node = new mathMLTree.MathNode("mi", [text])
      if (text.text === origText && latinRegEx.test(origText)) {
        node.setAttribute("mathvariant", "italic")
      } else if (text.text === "∇" && variant === "normal") {
        node.setAttribute("mathvariant", "normal")
      }
    }
    return node
  }
})
