/**
 * This file provides support for building horizontal stretchy elements.
 */

import mathMLTree from "./mathMLTree"
import { Span } from "./domTree";
import utils from "./utils";

const keysWithoutUnicodePoints = ["longRightleftharpoons", "longLeftrightharpoons"]

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
  xrightleftharpoons: "\u21cc",
  xleftrightharpoons: "\u21cb",
  xtwoheadleftarrow: "\u219e",
  xtwoheadrightarrow: "\u21a0",
  xlongequal: "=",
  xtofrom: "\u21c4",
  xrightleftarrows: "\u21c4",
  longleftrightarrows: "\u21c4",
  longrightleftharpoons: "\u21cc",
  "\\cdrightarrow": "\u2192",
  "\\cdleftarrow": "\u2190",
  "\\cdlongequal": "="
}

// For stretchy elements for which no font glyph exists.
const svgData = {
  longRightleftharpoons: { minWidth: 1.75,  height: 0.716 },
  longLeftrightharpoons: { minWidth: 1.75,  height: 0.716 }
}
const svgPaths = {
  linesegmentLeft: `M50 290 V428 H0 V94 H50 V240 H400000 v50z
  M50 290 V428 H0 V94 H50 V240 H400000 v50z`,
  linesegmentRight: `M399950 240 V94 h50 V428 h-50 V290 H0 v-50z
  M399950 240 V94 h50 V428 h-50 V290 H0 v-50z`
}

const setSvgAttributes = (svg, key, aspect) => {
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  svg.setAttribute("width", "400em")
  svg.setAttribute("height", svgData[key].height + "em")
  svg.setAttribute("viewBox", `0 0 400000 ${1000 * svgData[key].height}`)
  svg.setAttribute("preserveAspectRatio", aspect)
  svg.setAttribute("fill", "currentColor")
  svg.setAttribute("fill-rule", "non-zero")
  svg.setAttribute("fill-opacity", "1")
  return svg
}

const stretchySVG = (key, macros) => {
  // No Unicode glyph matches the desired arrow.
  // So we'll create our own arrow from SVGs.

  // Two SVGs, one for each end of the arrow. The SVGs are very long (400em).
  const leftPath = new mathMLTree.MathNode("path", [], [], {}, true)
  leftPath.setAttribute("stroke", "none")
  const leftPathGeometry = macros.get(key + "Left")
  leftPath.setAttribute("d", leftPathGeometry)

  const rightPath = new mathMLTree.MathNode("path", [], [], {}, true)
  rightPath.setAttribute("stroke", "none")
  const rightPathGeometry = macros.get(key + "Right")
  rightPath.setAttribute("d", rightPathGeometry)

  let leftSVG = new mathMLTree.MathNode("svg", [leftPath], [], {}, true)
  leftSVG = setSvgAttributes(leftSVG, key, "xMinYMin slice")
  leftSVG.setAttribute("style", "position: absolute; left:0;")

  let rightSVG = new mathMLTree.MathNode("svg", [rightPath], [], {}, true)
  rightSVG = setSvgAttributes(rightSVG, key, "xMaxYMin slice")
  rightSVG.setAttribute("style", "position: absolute; right:0")

  const height = svgData[key].height

  // Wrap the SVG in a span. Set the span width to 50% and set overflow: hidden.
  // That enables us to stretch the arrow without deforming the arrowhead.
  const leftSpan = new Span([], [leftSVG])
  leftSpan.setAttribute(
    "style",
    `position: absolute; left: 0; width: 50.2%; height: ${height}em; overflow: hidden;`
  )

  const rightSpan = new Span([], [rightSVG])
  rightSpan.setAttribute(
    "style",
    `position: absolute; right: 0; width: 50.2%; height: ${height}em; overflow: hidden;`
  )

  const wrapper = new Span(["stretchy"], [leftSpan, rightSpan]);
  wrapper.setAttribute(
    "style",
    `display: block; position: relative; width: 100%; height: ${height}em;
min-width: ${svgData[key].minWidth}em;`
  )

  return wrapper
}

const mathMLnode = function(label, macros) {
  const key = label.slice(1)
  const child = utils.contains(keysWithoutUnicodePoints, key)
    ? stretchySVG(key, macros)
    : new mathMLTree.TextNode(stretchyCodePoint[key])
  const node = new mathMLTree.MathNode("mo", [child])
  node.setAttribute("stretchy", "true")
  return node
}

export default {
  mathMLnode
}
