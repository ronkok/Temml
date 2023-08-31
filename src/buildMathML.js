/**
 * This file converts a parse tree into a corresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

import mathMLTree from "./mathMLTree"
import ParseError from "./ParseError"
import symbols, { ligatures } from "./symbols"
import { _mathmlGroupBuilders as groupBuilders } from "./defineFunction"
import { MathNode } from "./mathMLTree"
import { DocumentFragment } from "./tree"
import setLineBreaks from "./linebreaking"

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

export const consolidateText = mrow => {
  // If possible, consolidate adjacent <mtext> elements into a single element.
  if (mrow.type !== "mrow") { return mrow }
  if (mrow.children.length === 0) { return mrow } // empty group, e.g., \text{}
  if (!mrow.children[0].attributes || mrow.children[0].type !== "mtext") { return mrow }
  const variant = mrow.children[0].attributes.mathvariant || ""
  const mtext = new mathMLTree.MathNode(
    "mtext",
    [new mathMLTree.TextNode(mrow.children[0].children[0].text)]
  )
  for (let i = 1; i < mrow.children.length; i++) {
    // Check each child and, if possible, copy the character into child[0].
    const localVariant = mrow.children[i].attributes.mathvariant || ""
    if (mrow.children[i].type === "mrow") {
      const childRow = mrow.children[i]
      for (let j = 0; j < childRow.children.length; j++) {
        // We'll also check the children of a mrow. One level only. No recursion.
        const childVariant = childRow.children[j].attributes.mathvariant || ""
        if (childVariant !== variant || childRow.children[j].type !== "mtext") {
          return mrow // At least one element cannot be consolidated. Get out.
        } else {
          mtext.children[0].text += childRow.children[j].children[0].text
        }
      }
    } else if (localVariant !== variant || mrow.children[i].type !== "mtext") {
      return mrow
    } else {
      mtext.children[0].text += mrow.children[i].children[0].text
    }
  }
  // Firefox does not render a space at either end of an <mtext> string.
  // To get proper rendering, we replace leading or trailing spaces with no-break spaces.
  if (mtext.children[0].text.charAt(0) === " ") {
    mtext.children[0].text = "\u00a0" + mtext.children[0].text.slice(1)
  }
  const L = mtext.children[0].text.length
  if (L > 0 && mtext.children[0].text.charAt(L - 1) === " ") {
    mtext.children[0].text = mtext.children[0].text.slice(0, -1) + "\u00a0"
  }
  return mtext
}

const numberRegEx = /^[0-9]$/
const isCommaOrDot = node => {
  return (node.type === "atom" && node.text === ",") ||
         (node.type === "textord" && node.text === ".")
}
const consolidateNumbers = expression => {
  // Consolidate adjacent numbers. We want to return <mn>1,506.3</mn>,
  // not <mn>1</mn><mo>,</mo><mn>5</mn><mn>0</mn><mn>6</mn><mi>.</mi><mn>3</mn>
  if (expression.length < 2) { return }
  const nums = [];
  let inNum = false
  // Find adjacent numerals
  for (let i = 0; i < expression.length; i++) {
    const node = expression[i];
    if (node.type === "textord" && numberRegEx.test(node.text)) {
      if (!inNum) { nums.push({ start: i }) }
      inNum = true
    } else {
      if (inNum) { nums[nums.length - 1].end = i - 1 }
      inNum = false
    }
  }
  if (inNum) { nums[nums.length - 1].end = expression.length - 1 }

  // Determine if numeral groups are separated by a comma or dot.
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i - 1].end === nums[i].start - 2 && isCommaOrDot(expression[nums[i].start - 1])) {
      // Merge the two groups.
      nums[i - 1].end = nums[i].end
      nums.splice(i, 1)
    }
  }

  // Consolidate the number nodes
  for (let i = nums.length - 1; i >= 0; i--) {
    for (let j = nums[i].start + 1; j <= nums[i].end; j++) {
      expression[nums[i].start].text += expression[j].text
    }
    expression.splice(nums[i].start + 1, nums[i].end - nums[i].start)
  }
}

/**
 * Wrap the given array of nodes in an <mrow> node if needed, i.e.,
 * unless the array has length 1.  Always returns a single node.
 */
export const makeRow = function(body) {
  if (body.length === 1 && !(body[0] instanceof DocumentFragment)) {
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

  consolidateNumbers(expression)

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
  return new mathMLTree.MathNode("mtd", [], [], { padding: "0", width: "50%" })
}

const taggedExpression = (expression, tag, style, leqno) => {
  tag = buildExpressionRow(tag[0].body, style)
  tag = consolidateText(tag)
  tag.classes.push("tml-tag")

  expression = new mathMLTree.MathNode("mtd", [expression])
  const rowArray = [glue(), expression, glue()]
  if (leqno) {
    rowArray[0].children.push(tag)
    rowArray[0].style.textAlign = "-webkit-left"
  } else {
    rowArray[2].children.push(tag)
    rowArray[2].style.textAlign = "-webkit-right"
  }
  const mtr = new mathMLTree.MathNode("mtr", rowArray, ["tml-tageqn"])
  const table = new mathMLTree.MathNode("mtable", [mtr])
  table.style.width = "100%"
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
  const wrap = (settings.displayMode || settings.annotate) ? "none" : settings.wrap

  const n1 = expression.length === 0 ? null : expression[0]
  let wrapper = expression.length === 1 && tag === null && (n1 instanceof MathNode)
      ? expression[0]
      : setLineBreaks(expression, wrap, settings.displayMode)

  if (tag) {
    wrapper = taggedExpression(wrapper, tag, style, settings.leqno)
  }

  if (settings.annotate) {
    // Build a TeX annotation of the source
    const annotation = new mathMLTree.MathNode(
      "annotation", [new mathMLTree.TextNode(texExpression)]);
    annotation.setAttribute("encoding", "application/x-tex");
    wrapper = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
  }

  const math = new mathMLTree.MathNode("math", [wrapper])

  if (settings.xml) {
    math.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML")
  }
  if (settings.displayMode) {
    math.setAttribute("display", "block");
    math.style.display = "block math" // necessary in Chromium.
    // Firefox and Safari do not recognize display: "block math".
    // Set a class so that the CSS file can set display: block.
    math.classes = ["tml-display"]
  }
  return math;
}
