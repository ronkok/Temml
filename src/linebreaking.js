import mathMLTree from "./mathMLTree"

/*
 * Neither Firefox nor Chrome support hard line breaks or soft line breaks.
 * (Despite https://www.w3.org/Math/draft-spec/mathml.html#chapter3_presm.lbattrs)
 * So Temml has a work-around for hard line breaks.
 * They are simulated by creating a <mtable> and putting each line in its own <mtr>.
 *
 * LaTeX also places soft line breaks at top-level relations and binary operators.
 * I would like to emulate that behavior, but the Chromium version of MathML provides no
 * way that I can do so.
 *
 * Hopefully browsers will someday do their own linebreaking and we will be able to delete
 * most of this module.
 */

export default function setLineBreaks(expression, isDisplayMode) {
  const mtrs = [];
  let mrows = [];
  let block = [];
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
