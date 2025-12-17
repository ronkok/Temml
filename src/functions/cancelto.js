import defineFunction from "../defineFunction";
import * as mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";
import { isCharacterBox, smalls } from "../utils";

defineFunction({
  type: "cancelto",
  names: ["\\cancelto"],
  props: {
    numArgs: 2
  },
  handler({ parser }, args) {
    const to = args[0];
    const body = args[1];
    return {
      type: "cancelto",
      mode: parser.mode,
      body,
      to,
      isCharacterBox: isCharacterBox(body)
    };
  },
  mathmlBuilder(group, style) {
    const fromNode = new mathMLTree.MathNode(
      "mrow",
      [mml.buildGroup(group.body, style)],
      ["ff-narrow"] // A zero-width mrow.
    )
    // Write the arrow in a node written after the content.
    // That way, the arrow will be an overlay on the content.
    const phantom = new mathMLTree.MathNode("mphantom", [mml.buildGroup(group.body, style)])
    const arrow = new mathMLTree.MathNode("mrow", [phantom], ["tml-cancelto"])
    if (group.isCharacterBox && smalls.indexOf(group.body.body[0].text) > -1) {
      arrow.style.left = "0.1em"
      arrow.style.width = "90%"
    }
    const node = new mathMLTree.MathNode("mrow", [fromNode, arrow], ["menclose"])
    if (!group.isCharacterBox || /[f∫∑]/.test(group.body.body[0].text)) {
      // Add 0.2em space to right of content to make room for the arrowhead.
      phantom.style.paddingRight = "0.2em"
    } else {
      phantom.style.padding = "0.5ex 0.1em 0 0"
      const strut = new mathMLTree.MathNode('mspace', [])
      strut.setAttribute('height', "0.85em")
      fromNode.children.push(strut)
    }

    // Create the "to" value above and to the right of the arrow.
    // First, we want a dummy node with the same height as the `from` content.
    // We'll place the `to` node above the dummy to get the correct vertical alignment.
    let dummyNode
    if (group.isCharacterBox) {
      dummyNode = new mathMLTree.MathNode('mspace', [])
      dummyNode.setAttribute('height', "1em")
    } else {
      // Create a phantom node with the same content as the body.
      const inner = mml.buildGroup(group.body, style)
      // The phantom node will be zero-width, so it won't affect horizontal spacing.
      const zeroWidthNode = new mathMLTree.MathNode("mpadded", [inner])
      zeroWidthNode.setAttribute("width", "0.1px") // Don't use 0. WebKit would omit it.
      dummyNode = new mathMLTree.MathNode("mphantom", [zeroWidthNode]) // Hide it.
    }
    const toNode = mml.buildGroup(group.to, style)
    const zeroWidthToNode = new mathMLTree.MathNode("mpadded", [toNode])
    if (!group.isCharacterBox || /[f∫∑]/.test(group.body.body[0].text)) {
      const w = new mathMLTree.MathNode("mspace", [])
      w.setAttribute('width', "0.2em")
      zeroWidthToNode.children.unshift(w)
    }
    zeroWidthToNode.setAttribute("width", "0.1px") // Don't use 0. WebKit would hide it.
    const mover = new mathMLTree.MathNode("mover", [dummyNode, zeroWidthToNode])
    // Fix Firefox positioning.
    const nudgeLeft = new mathMLTree.MathNode('mrow', [], ["ff-nudge-left"])
    return mathMLTree.newDocumentFragment([mml.makeRow([node, mover]), nudgeLeft])
  }
})
