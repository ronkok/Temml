/**
 * This file converts a parse tree into a corresponding MathML tree. The main
 * entry point is the `buildMathML` function, which takes a parse tree from the
 * parser.
 */

import mathMLTree from "./mathMLTree"
import ParseError from "./ParseError"
import symbols, { ligatures } from "./symbols"
import { _mathmlGroupBuilders as groupBuilders } from "./defineFunction"
import { MathNode, TextNode } from "./mathMLTree"
import { DocumentFragment } from "./tree"
import setLineBreaks from "./linebreaking"
import { AnchorNode } from "./domTree"

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

const copyChar = (newRow, child) => {
  if (newRow.children.length === 0 ||
      newRow.children[newRow.children.length - 1].type !== "mtext") {
    const mtext = new mathMLTree.MathNode(
      "mtext",
      [new mathMLTree.TextNode(child.children[0].text)]
    )
    newRow.children.push(mtext)
  } else {
    newRow.children[newRow.children.length - 1].children[0].text += child.children[0].text
  }
}

export const consolidateText = mrow => {
  // If possible, consolidate adjacent <mtext> elements into a single element.
  if (mrow.type !== "mrow" && mrow.type !== "mstyle") { return mrow }
  if (mrow.children.length === 0) { return mrow } // empty group, e.g., \text{}
  const newRow = new mathMLTree.MathNode("mrow")
  for (let i = 0; i < mrow.children.length; i++) {
    const child = mrow.children[i];
    if (child.type === "mtext" && Object.keys(child.attributes).length === 0) {
      copyChar(newRow, child)
    } else if (child.type === "mrow") {
      // We'll also check the children of an mrow. One level only. No recursion.
      let canConsolidate = true
      for (let j = 0; j < child.children.length; j++) {
        const grandChild = child.children[j];
        if (grandChild.type !== "mtext" || Object.keys(child.attributes).length !== 0) {
          canConsolidate = false
          break
        }
      }
      if (canConsolidate) {
        for (let j = 0; j < child.children.length; j++) {
          const grandChild = child.children[j];
          copyChar(newRow, grandChild)
        }
      } else {
        newRow.children.push(child)
      }
    } else {
      newRow.children.push(child)
    }
  }
  for (let i = 0; i < newRow.children.length; i++) {
    if (newRow.children[i].type === "mtext") {
      const mtext = newRow.children[i];
      // Firefox does not render a space at either end of an <mtext> string.
      // To get proper rendering, we replace leading or trailing spaces with no-break spaces.
      if (mtext.children[0].text.charAt(0) === " ") {
        mtext.children[0].text = "\u00a0" + mtext.children[0].text.slice(1)
      }
      const L = mtext.children[0].text.length
      if (L > 0 && mtext.children[0].text.charAt(L - 1) === " ") {
        mtext.children[0].text = mtext.children[0].text.slice(0, -1) + "\u00a0"
      }
      for (const [key, value] of Object.entries(mrow.attributes)) {
        mtext.attributes[key] = value
      }
    }
  }
  if (newRow.children.length === 1 && newRow.children[0].type === "mtext") {
    return newRow.children[0]; // A consolidated <mtext>
  } else {
    return newRow
  }
}

/**
 * Wrap the given array of nodes in an <mrow> node if needed, i.e.,
 * unless the array has length 1.  Always returns a single node.
 */
export const makeRow = function(body, semisimple = false) {
  if (body.length === 1 && !(body[0] instanceof DocumentFragment)) {
    return body[0];
  } else if (!semisimple) {
    // Suppress spacing on <mo> nodes at both ends of the row.
    if (body[0] instanceof MathNode && body[0].type === "mo" && !body[0].attributes.fence) {
      body[0].attributes.lspace = "0em"
      body[0].attributes.rspace = "0em"
    }
    const end = body.length - 1
    if (body[end] instanceof MathNode && body[end].type === "mo" && !body[end].attributes.fence) {
      body[end].attributes.lspace = "0em"
      body[end].attributes.rspace = "0em"
    }
  }
  return new mathMLTree.MathNode("mrow", body);
};

/**
 * Check for <mi>.</mi> which is how a dot renders in MathML,
 * or <mo separator="true" lspace="0em" rspace="0em">,</mo>
 * which is how a braced comma {,} renders in MathML
 */
function isNumberPunctuation(group) {
  if (!group) {
    return false
  }
  if (group.type === 'mi' && group.children.length === 1) {
    const child = group.children[0];
    return child instanceof TextNode && child.text === '.'
  } else if (group.type === "mtext" && group.children.length === 1) {
    const child = group.children[0];
    return child instanceof TextNode && child.text === '\u2008' // punctuation space
  } else if (group.type === 'mo' && group.children.length === 1 &&
    group.getAttribute('separator') === 'true' &&
    group.getAttribute('lspace') === '0em' &&
    group.getAttribute('rspace') === '0em') {
    const child = group.children[0];
    return child instanceof TextNode && child.text === ','
  } else {
    return false
  }
}
const isComma = (expression, i) => {
  const node = expression[i];
  const followingNode = expression[i + 1];
  return (node.type === "atom" && node.text === ",") &&
    // Don't consolidate if there is a space after the comma.
    node.loc && followingNode.loc && node.loc.end === followingNode.loc.start
}

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
export const buildExpression = function(expression, style, semisimple = false) {
  if (!semisimple && expression.length === 1) {
    const group = buildGroup(expression[0], style);
    if (group instanceof MathNode && group.type === "mo") {
      // When TeX writers want to suppress spacing on an operator,
      // they often put the operator by itself inside braces.
      group.setAttribute("lspace", "0em");
      group.setAttribute("rspace", "0em");
    }
    return [group];
  }

  const groups = [];
  const groupArray = [];
  let lastGroup
  for (let i = 0; i < expression.length; i++) {
    groupArray.push(buildGroup(expression[i], style))
  }

  for (let i = 0; i < groupArray.length; i++) {
    const group = groupArray[i];

    // Suppress spacing between adjacent relations
    if (i < expression.length - 1 && isRel(expression[i]) && isRel(expression[i + 1])) {
      group.setAttribute("rspace", "0em")
    }
    if (i > 0 && isRel(expression[i]) && isRel(expression[i - 1])) {
      group.setAttribute("lspace", "0em")
    }

    // Concatenate numbers
    if (group.type === 'mn' && lastGroup && lastGroup.type === 'mn') {
      // Concatenate <mn>...</mn> followed by <mi>.</mi>
      lastGroup.children.push(...group.children)
      continue
    } else if (isNumberPunctuation(group) && lastGroup && lastGroup.type === 'mn') {
      // Concatenate <mn>...</mn> followed by <mi>.</mi>
      lastGroup.children.push(...group.children)
      continue
    } else if (lastGroup && lastGroup.type === "mn" && i < groupArray.length - 1 &&
      groupArray[i + 1].type === "mn" && isComma(expression, i)) {
      lastGroup.children.push(...group.children)
      continue
    } else if (group.type === 'mn' && isNumberPunctuation(lastGroup)) {
      // Concatenate <mi>.</mi> followed by <mn>...</mn>
      group.children = [...lastGroup.children, ...group.children];
      groups.pop()
    } else if ((group.type === 'msup' || group.type === 'msub') &&
        group.children.length >= 1 && lastGroup &&
        (lastGroup.type === 'mn' || isNumberPunctuation(lastGroup))) {
      // Put preceding <mn>...</mn> or <mi>.</mi> inside base of
      // <msup><mn>...base...</mn>...exponent...</msup> (or <msub>)
      const base = group.children[0];
      if (base instanceof MathNode && base.type === 'mn' && lastGroup) {
        base.children = [...lastGroup.children, ...base.children];
        groups.pop()
      }
    }
    groups.push(group)
    lastGroup = group
  }
  return groups
};

/**
 * Equivalent to buildExpression, but wraps the elements in an <mrow>
 * if there's more than one.  Returns a single node instead of an array.
 */
export const buildExpressionRow = function(expression, style, semisimple = false) {
  return makeRow(buildExpression(expression, style, semisimple), semisimple);
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
  rowArray[leqno ? 0 : 2].classes.push(leqno ? "tml-left" : "tml-right")
  rowArray[leqno ? 0 : 2].children.push(tag)
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

  const expression = buildExpression(tree, style)

  if (expression.length === 1 && expression[0] instanceof AnchorNode) {
    return expression[0]
  }

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
  if (wrapper.style.width) {
    math.style.width = "100%"
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
