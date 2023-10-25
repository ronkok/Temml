import { defineFunctionBuilders } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import ParseError from "../ParseError"

// A map of CSS-based spacing functions to their CSS class.
const cssSpace = {
  "\\nobreak": "nobreak",
  "\\allowbreak": "allowbreak"
}

// A lookup table to determine whether a spacing function/symbol should be
// treated like a regular space character.  If a symbol or command is a key
// in this table, then it should be a regular space character.  Furthermore,
// the associated value may have a `className` specifying an extra CSS class
// to add to the created `span`.
const regularSpace = {
  " ": {},
  "\\ ": {},
  "~": {
    className: "nobreak"
  },
  "\\space": {},
  "\\nobreakspace": {
    className: "nobreak"
  }
}

// ParseNode<"spacing"> created in Parser.js from the "spacing" symbol Groups in
// src/symbols.js.
defineFunctionBuilders({
  type: "spacing",
  mathmlBuilder(group, style) {
    let node

    if (Object.prototype.hasOwnProperty.call(regularSpace, group.text)) {
      // Firefox does not render a space in a <mtext> </mtext>. So write a no-break space.
      // TODO: If Firefox fixes that bug, uncomment the next line and write ch into the node.
      //const ch = (regularSpace[group.text].className === "nobreak") ? "\u00a0" : " "
      node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\u00a0")])
    } else if (Object.prototype.hasOwnProperty.call(cssSpace, group.text)) {
      // MathML 3.0 calls for nobreak to occur in an <mo>, not an <mtext>
      // Ref: https://www.w3.org/Math/draft-spec/mathml.html#chapter3_presm.lbattrs
      node = new mathMLTree.MathNode("mo")
      if (group.text === "\\nobreak") {
        node.setAttribute("linebreak", "nobreak")
      }
    } else {
      throw new ParseError(`Unknown type of space "${group.text}"`)
    }

    return node
  }
})
