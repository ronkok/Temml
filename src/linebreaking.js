import mathMLTree from "./mathMLTree"

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
 * We want the expression to render with soft line breaks after each top-level binary or
 * relational operator, per TeXbook p. 173. So we gather the expression into <mrow>s so that
 * each <mrow> ends in a binary or relational operator.
 *
 * Hopefully browsers will someday do their own linebreaking and we will be able to delete
 * most of this module.
 */

export default function setLineBreaks(expression, isDisplayMode) {
  const mtrs = [];
  let mrows = [];
  let block = [];
  let canBeBIN = false // The first node cannot be an infix binary operator.
  for (let i = 0; i < expression.length; i++) {
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
      mtrs.push(new mathMLTree.MathNode("mtr", [mtd]))
      mrows = [];
      continue
    }
    block.push(node);
    if (node.type && node.type === "mo" && !isDisplayMode) {
      if (canBeBIN && !node.attributes.form) {
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
          mrows.push(new mathMLTree.MathNode("mrow", block));
          block = [];
        }
        canBeBIN = false;
      }
      const isOpenDelimiter = node.attributes.form && node.attributes.form === "prefix";
      // Any operator that follows an open delimiter is unary.
      canBeBIN = !(node.attributes.separator || isOpenDelimiter);
    } else {
      canBeBIN = true;
    }
  }
  if (block.length > 0) {
    mrows.push(new mathMLTree.MathNode("mrow", block));
  }
  if (mtrs.length > 0) {
    const mtd = new mathMLTree.MathNode("mtd", mrows)
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
