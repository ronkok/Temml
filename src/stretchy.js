/**
 * This file provides support for building horizontal stretchy elements.
 */

import mathMLTree from "./mathMLTree"
import { Span } from "./domTree";
import ParseError from "./ParseError";

// From mhchem reaction arrows \ce{A <=>> B} and \ce{A <<=> B}
const keysWithoutUnicodePoints = ["equilibriumRight", "equilibriumLeft"]

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
  "\\cdrightarrow": "\u2192",
  "\\cdleftarrow": "\u2190",
  "\\cdlongequal": "="
}

const nodeFromObject = (obj) => {
  // Build a stretchy arrow from two SVGs.
  const children = [];
  if (obj.children) {
    obj.children.map(child => { children.push(nodeFromObject(child)) })
  }
  const node = obj.type === "span"
    ? new Span(null, children, obj.style)
    : new mathMLTree.MathNode(obj.type, children, [], obj.style, true)
  Object.entries(obj.attributes).forEach(([key, value]) => {
    node.setAttribute(key, value)
  })
  return node
}

const mathMLnode = function(label, macros = {}) {
  const key = label.slice(1)
  let child
  if (!keysWithoutUnicodePoints.includes(key)) {
    child = new mathMLTree.TextNode(stretchyCodePoint[key])
  } else {
    const atKey = "\\@" + key
    if (!macros.has(atKey)) {
      throw new ParseError("Arrow not available. The mhchem package is needed.")
    }
    child = nodeFromObject(JSON.parse(macros.get(atKey)))
  }
  const node = new mathMLTree.MathNode("mo", [child])
  node.setAttribute("stretchy", "true")
  return node
}

export default {
  mathMLnode
}
