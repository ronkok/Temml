/**
 * This file provides support for building horizontal stretchy elements.
 */

import mathMLTree from "./mathMLTree"

// TODO: Remove when Chromium stretches \widetilde & \widehat
const estimatedWidth = node => {
  let width = 0
  if (node.body) {
    for (const item of node.body) {
      width += estimatedWidth(item)
    }
  } else if (node.type === "supsub") {
    width += estimatedWidth(node.base)
    if (node.sub) { width += 0.7 * estimatedWidth(node.sub) }
    if (node.sup) { width += 0.7 * estimatedWidth(node.sup) }
  } else if (node.type === "mathord" || node.type === "textord") {
    for (const ch of node.text.split('')) {
      const codePoint = ch.codePointAt(0)
      if ((0x60 < codePoint && codePoint < 0x7B) || (0x03B0 < codePoint && codePoint < 0x3CA)) {
        width += 0.56 // lower case latin or greek. Use advance width of letter n
      } else if (0x2F < codePoint && codePoint < 0x3A) {
        width += 0.50 // numerals.
      } else {
        width += 0.92 // advance width of letter M
      }
    }
  } else {
    width += 1.0
  }
  return width
}

const stretchyCodePoint = {
  widehat: "^",
  widecheck: "ˇ",
  widetilde: "~",
  wideparen: "⏜", // \u23dc
  utilde: "~",
  overleftarrow: "\u2190",
  underleftarrow: "\u2190",
  xleftarrow: "\u2190",
  overrightarrow: "\u2192",
  underrightarrow: "\u2192",
  xrightarrow: "\u2192",
  underbrace: "\u23df",
  overbrace: "\u23de",
  overgroup: "\u23e0",
  overparen: "⏜",
  undergroup: "\u23e1",
  underparen: "\u23dd",
  overleftrightarrow: "\u2194",
  underleftrightarrow: "\u2194",
  xleftrightarrow: "\u2194",
  Overrightarrow: "\u21d2",
  xRightarrow: "\u21d2",
  overleftharpoon: "\u21bc",
  xleftharpoonup: "\u21bc",
  overrightharpoon: "\u21c0",
  xrightharpoonup: "\u21c0",
  xLeftarrow: "\u21d0",
  xLeftrightarrow: "\u21d4",
  xhookleftarrow: "\u21a9",
  xhookrightarrow: "\u21aa",
  xmapsto: "\u21a6",
  xrightharpoondown: "\u21c1",
  xleftharpoondown: "\u21bd",
  xtwoheadleftarrow: "\u219e",
  xtwoheadrightarrow: "\u21a0",
  xlongequal: "=",
  xrightleftarrows: "\u21c4",
  yields: "\u2192",
  yieldsLeft: "\u2190",
  mesomerism: "\u2194",
  longrightharpoonup: "\u21c0",
  longleftharpoondown: "\u21bd",
  eqrightharpoonup: "\u21c0",
  eqleftharpoondown: "\u21bd",
  "\\cdrightarrow": "\u2192",
  "\\cdleftarrow": "\u2190",
  "\\cdlongequal": "="
}

const mathMLnode = function(label) {
  const child = new mathMLTree.TextNode(stretchyCodePoint[label.slice(1)])
  const node = new mathMLTree.MathNode("mo", [child])
  node.setAttribute("stretchy", "true")
  return node
}

const crookedWides = ["\\widetilde", "\\widehat", "\\widecheck", "\\utilde"]

// TODO: Remove when Chromium stretches \widetilde & \widehat
const accentNode = (group) => {
  const mo = mathMLnode(group.label)
  if (crookedWides.includes(group.label)) {
    const width = estimatedWidth(group.base)
    if (1 < width && width < 1.6) {
      mo.classes.push("tml-crooked-2")
    } else if (1.6 <= width && width < 2.5) {
      mo.classes.push("tml-crooked-3")
    } else if (2.5 <= width) {
      mo.classes.push("tml-crooked-4")
    }
  }
  return mo
}

export default {
  mathMLnode,
  accentNode
}
