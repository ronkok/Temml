import { defineFunctionBuilders } from "../defineFunction"
import { getVariant } from "../variant"
import mathMLTree from "../mathMLTree"
import * as mml from "../buildMathML"
import { Span } from "../domTree"

// "mathord" and "textord" ParseNodes created in Parser.js from symbol Groups in
// src/symbols.js.

const defaultVariant = {
  mi: "italic",
  mn: "normal",
  mtext: "normal"
}

const numberRegEx = /^\d[\d.]*$/  // Keep in sync with numberRegEx in Parser.js

const smallCaps = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ"
}

defineFunctionBuilders({
  type: "mathord",
  mathmlBuilder(group, style) {
    const variant = getVariant(group, style) || "italic"
    const text = mml.makeText(group.text, group.mode, style)
    if (variant === "script" && style.font === "mathscr") {
      const span = new Span(["script"], [text])
      return new mathMLTree.MathNode("mi", [span])
    }
    const node = new mathMLTree.MathNode("mi", [text]);
    if (variant === "lowerCaseGreekItalic") {
      node.setAttribute("mathvariant", "italic")
    } else if (variant !== defaultVariant[node.type]) {
      node.setAttribute("mathvariant", variant)
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
      node = new mathMLTree.MathNode("mtext", [text])
    } else if (numberRegEx.test(group.text)) {
      if (variant === "oldstylenums") {
        const span = new Span(["oldstylenums"], [text])
        node = new mathMLTree.MathNode("mn", [span])
      } else {
        node = new mathMLTree.MathNode("mn", [text])
      }
    } else if (group.text === "\\prime") {
      node = new mathMLTree.MathNode("mo", [text])
    } else {
      node = new mathMLTree.MathNode("mi", [text])
    }
    if (variant !== defaultVariant[node.type]) {
      node.setAttribute("mathvariant", variant)
    }
    return node
  }
})
