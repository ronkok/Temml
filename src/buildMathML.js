/**
 * This file converts a parse tree into a cooresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

import mathMLTree from "./mathMLTree"
import ParseError from "./ParseError"
import symbols, { ligatures } from "./symbols"
import { _mathmlGroupBuilders as groupBuilders } from "./defineFunction"
import { MathNode } from "./mathMLTree"
import setLineBreaks from "./linebreaking"
import utils from "./utils";

/**
 * Takes a symbol and converts it into a MathML text node after performing
 * optional replacement from symbols.js.
 */
export const makeText = function(text, mode, style) {
  if (
    symbols[mode][text] &&
    symbols[mode][text].replace &&
    text.charCodeAt(0) !== 0xd835 &&
    !(
      Object.prototype.hasOwnProperty.call(ligatures, text) &&
      style &&
      ((style.fontFamily && style.fontFamily.slice(4, 6) === "tt") ||
        (style.font && style.font.slice(4, 6) === "tt"))
    )
  ) {
    text = symbols[mode][text].replace;
  }

  return new mathMLTree.TextNode(text);
};

/**
 * Wrap the given array of nodes in an <mrow> node if needed, i.e.,
 * unless the array has length 1.  Always returns a single node.
 */
export const makeRow = function(body) {
  if (body.length === 1) {
    return body[0];
  } else {
    return new mathMLTree.MathNode("mrow", body);
  }
};

const isRel = item => {
  return (item.type === "atom" && item.family === "rel") ||
      (item.type === "mclass" && item.mclass === "mrel")
}

/**
 * Takes a list of nodes, builds them, and returns a list of the generated
 * MathML nodes.  Also do a couple chores along the way:
 * (1) Suppress spacing when an author wraps an operator w/braces, as in {=}.
 * (2) Suppress spacing between two adjacent relations.
 */
export const buildExpression = function(expression, style, isOrdgroup) {
  if (expression.length === 1) {
    const group = buildGroup(expression[0], style);
    if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
      // When TeX writers want to suppress spacing on an operator,
      // they often put the operator by itself inside braces.
      group.setAttribute("lspace", "0em");
      group.setAttribute("rspace", "0em");
    }
    return [group];
  }

  const groups = [];
  for (let i = 0; i < expression.length; i++) {
    const group = buildGroup(expression[i], style);
    // Suppress spacing between adjacent relations
    if (i < expression.length - 1 && isRel(expression[i]) && isRel(expression[i + 1])) {
      group.setAttribute("rspace", "0em")
    }
    if (i > 0 && isRel(expression[i]) && isRel(expression[i - 1])) {
      group.setAttribute("lspace", "0em")
    }
    groups.push(group);
  }
  return groups;
};

/**
 * Equivalent to buildExpression, but wraps the elements in an <mrow>
 * if there's more than one.  Returns a single node instead of an array.
 */
export const buildExpressionRow = function(expression, style, isOrdgroup) {
  return makeRow(buildExpression(expression, style, isOrdgroup));
};

/**
 * Takes a group from the parser and calls the appropriate groupBuilders function
 * on it to produce a MathML node.
 */
export const buildGroup = function(group, style) {
  if (!group) {
    return new mathMLTree.MathNode("mrow");
  }

  if (groupBuilders[group.type]) {
    // Call the groupBuilders function
    const result = groupBuilders[group.type](group, style);
    return result;
  } else {
    throw new ParseError("Got group of unknown type: '" + group.type + "'");
  }
};

const glue = _ => {
  const glueNode = new mathMLTree.MathNode("mtd", [])
  glueNode.setAttribute("style", "padding: 0;width: 50%;")
  return glueNode
}

const taggedExpression = (expression, tag, style, leqno, preventTagLap) => {
  tag = buildExpressionRow(tag[0].body, style)
  tag = utils.consolidateText(tag)
  tag.classes = ["tml-tag"];
  if (!preventTagLap) {
    tag = new mathMLTree.MathNode("mpadded", [tag])
    tag.setAttribute("style", "width:0;")
    tag.setAttribute("width", "0")
    tag.setAttribute((leqno ? "rspace" : "lspace"), "-1width")
  }
  tag = new mathMLTree.MathNode("mtd", [tag])
  if (!preventTagLap) { tag.setAttribute("style", "padding: 0; min-width:0") }

  expression = new mathMLTree.MathNode("mtd", [expression])
  const rowArray = leqno
    ? [tag, glue(), expression, glue()]
    : [glue(), expression, glue(), tag];
  const mtr = new mathMLTree.MathNode("mtr", rowArray, ["tml-tageqn"])
  const table = new mathMLTree.MathNode("mtable", [mtr])
  table.setAttribute("width", "100%")
  table.setAttribute("displaystyle", "true")
  return table
}

/**
 * Takes a full parse tree and settings and builds a MathML representation of
 * it.
 */
export default function buildMathML(tree, texExpression, style, settings) {
  // Strip off outer tag wrapper for processing below.
  let tag = null
  if (tree.length === 1 && tree[0].type === "tag") {
    tag = tree[0].tag
    tree = tree[0].body
  }

  const expression = buildExpression(tree, style);

  const n1 = expression.length === 0 ? null : expression[0]
  let wrapper = expression.length === 1 && tag === null && (n1 instanceof MathNode)
          && !(n1.type === "mstyle" && n1.attributes.mathcolor)
      ? expression[0]
      : setLineBreaks(expression, settings.displayMode, settings.annotate)

  if (tag) {
    wrapper = taggedExpression(wrapper, tag, style, settings.leqno, settings.preventTagLap)
  }

  let semantics
  if (settings.annotate) {
    // Build a TeX annotation of the source
    const annotation = new mathMLTree.MathNode(
      "annotation", [new mathMLTree.TextNode(texExpression)]);
    annotation.setAttribute("encoding", "application/x-tex");
    semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
  }

  const math = settings.annotate
    ? new mathMLTree.MathNode("math", [semantics])
    : new mathMLTree.MathNode("math", [wrapper])

  if (settings.xml) {
    math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML")
  }
  if (settings.displayMode) {
    math.setAttribute("display", "block");
  }
  return math;
}
