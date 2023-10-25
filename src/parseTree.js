import Parser from "./Parser"
import ParseError from "./ParseError"

/**
 * Parses an expression using a Parser, then returns the parsed result.
 */
const parseTree = function(toParse, settings) {
  if (!(typeof toParse === "string" || toParse instanceof String)) {
    throw new TypeError("Temml can only parse string typed expression")
  }
  const parser = new Parser(toParse, settings)
  // Blank out any \df@tag to avoid spurious "Duplicate \tag" errors
  delete parser.gullet.macros.current["\\df@tag"]

  let tree = parser.parse()

  // LaTeX ignores a \tag placed outside an AMS environment.
  if (!(tree.length > 0 &&  tree[0].type && tree[0].type === "array" && tree[0].addEqnNum)) {
    // If the input used \tag, it will set the \df@tag macro to the tag.
    // In this case, we separately parse the tag and wrap the tree.
    if (parser.gullet.macros.get("\\df@tag")) {
      if (!settings.displayMode) {
        throw new ParseError("\\tag works only in display mode")
      }
      parser.gullet.feed("\\df@tag")
      tree = [
        {
          type: "tag",
          mode: "text",
          body: tree,
          tag: parser.parse()
        }
      ]
    }
  }

  return tree
}

export default parseTree
