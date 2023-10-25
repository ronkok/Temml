import mathMLTree from "./mathMLTree"
import { DocumentFragment } from "./tree"

/*
 * Neither Firefox nor Chrome support hard line breaks or soft line breaks.
 * (Despite https://www.w3.org/Math/draft-spec/mathml.html#chapter3_presm.lbattrs)
 * So Temml has work-arounds for both hard and soft breaks.
 * The work-arounds sadly do not work simultaneously. Any top-level hard
 * break makes soft line breaks impossible.
 *
 * Hard breaks are simulated by creating a <mtable> and putting each line in its own <mtr>.
 *
 * To create soft line breaks, Temml avoids using the <semantics> and <annotation> tags.
 * Then the top level of a <math> element can be occupied by <mrow> elements, and the browser
 * will break after a <mrow> if the expression extends beyond the container limit.
 *
 * The default is for soft line breaks after each top-level binary or
 * relational operator, per TeXbook p. 173. So we gather the expression into <mrow>s so that
 * each <mrow> ends in a binary or relational operator.
 *
 * An option is for soft line breaks before an "=" sign. That changes the <mrow>s.
 *
 * Soft line breaks will not work in Chromium and Safari, only Firefox.
 *
 * Hopefully browsers will someday do their own linebreaking and we will be able to delete
 * much of this module.
 */

const openDelims = "([{⌊⌈⟨⟮⎰⟦⦃"
const closeDelims = ")]}⌋⌉⟩⟯⎱⟦⦄"

export default function setLineBreaks(expression, wrapMode, isDisplayMode) {
  const mtrs = [];
  let mrows = [];
  let block = [];
  let numTopLevelEquals = 0
  let i = 0
  let level = 0
  while (i < expression.length) {
    while (expression[i] instanceof DocumentFragment) {
      expression.splice(i, 1, ...expression[i].children) // Expand the fragment.
    }
    const node = expression[i];
    if (node.attributes && node.attributes.linebreak &&
      node.attributes.linebreak === "newline") {
      // A hard line break. Create a <mtr> for the current block.
      if (block.length > 0) {
        mrows.push(new mathMLTree.MathNode("mrow", block))
      }
      mrows.push(node)
      block = [];
      const mtd = new mathMLTree.MathNode("mtd", mrows)
      mtd.style.textAlign = "left"
      mtrs.push(new mathMLTree.MathNode("mtr", [mtd]))
      mrows = [];
      i += 1
      continue
    }
    block.push(node);
    if (node.type && node.type === "mo" && node.children.length === 1) {
      const ch = node.children[0].text
      if (openDelims.indexOf(ch) > -1) {
        level += 1
      } else if (closeDelims.indexOf(ch) > -1) {
        level -= 1
      } else if (level === 0 && wrapMode === "=" && ch === "=") {
        numTopLevelEquals += 1
        if (numTopLevelEquals > 1) {
          block.pop()
          // Start a new block. (Insert a soft linebreak.)
          const element = new mathMLTree.MathNode("mrow", block)
          mrows.push(element)
          block = [node];
        }
      } else if (level === 0 && wrapMode === "tex") {
        // Check if the following node is a \nobreak text node, e.g. "~""
        const next = i < expression.length - 1 ? expression[i + 1] : null;
        let glueIsFreeOfNobreak = true;
        if (
          !(
            next &&
            next.type === "mtext" &&
            next.attributes.linebreak &&
            next.attributes.linebreak === "nobreak"
          )
        ) {
          // We may need to start a new block.
          // First, put any post-operator glue on same line as operator.
          for (let j = i + 1; j < expression.length; j++) {
            const nd = expression[j];
            if (
              nd.type &&
              nd.type === "mspace" &&
              !(nd.attributes.linebreak && nd.attributes.linebreak === "newline")
            ) {
              block.push(nd);
              i += 1;
              if (
                nd.attributes &&
                nd.attributes.linebreak &&
                nd.attributes.linebreak === "nobreak"
              ) {
                glueIsFreeOfNobreak = false;
              }
            } else {
              break;
            }
          }
        }
        if (glueIsFreeOfNobreak) {
          // Start a new block. (Insert a soft linebreak.)
          const element = new mathMLTree.MathNode("mrow", block)
          mrows.push(element)
          block = [];
        }
      }
    }
    i += 1
  }
  if (block.length > 0) {
    const element = new mathMLTree.MathNode("mrow", block)
    mrows.push(element)
  }
  if (mtrs.length > 0) {
    const mtd = new mathMLTree.MathNode("mtd", mrows)
    mtd.style.textAlign = "left"
    const mtr = new mathMLTree.MathNode("mtr", [mtd])
    mtrs.push(mtr)
    const mtable = new mathMLTree.MathNode("mtable", mtrs)
    if (!isDisplayMode) {
      mtable.setAttribute("columnalign", "left")
      mtable.setAttribute("rowspacing", "0em")
    }
    return mtable
  }
  return mathMLTree.newDocumentFragment(mrows);
}
