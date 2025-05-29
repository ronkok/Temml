import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import ParseError from "../ParseError"

const numRegEx = /^[0-9]$/
const unicodeNumSubs = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉'
}
const unicodeNumSups = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹'
}

defineFunction({
  type: "sfrac",
  names: ["\\sfrac"],
  props: {
    numArgs: 2,
    allowedInText: true,
    allowedInMath: true
  },
  handler({ parser }, args) {
    let numerator = ""
    for (const node of args[0].body) {
      if (node.type !== "textord" || !numRegEx.test(node.text)) {
        throw new ParseError("Numerator must be an integer.", node)
      }
      numerator += node.text
    }
    let denominator = ""
    for (const node of args[1].body) {
      if (node.type !== "textord" || !numRegEx.test(node.text)) {
        throw new ParseError("Denominator must be an integer.", node)
      }
      denominator += node.text
    }
    return {
      type: "sfrac",
      mode: parser.mode,
      numerator,
      denominator
    };
  },
  mathmlBuilder(group, style) {
    const numerator = group.numerator.split('').map(c => unicodeNumSups[c]).join('')
    const denominator = group.denominator.split('').map(c => unicodeNumSubs[c]).join('')
    // Use a fraction slash.
    const text = new mathMLTree.TextNode(numerator + "\u2044" + denominator, group.mode, style)
    return new mathMLTree.MathNode("mn", [text], ["special-fraction"])
  }
});
