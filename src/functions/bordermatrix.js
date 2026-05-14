import defineFunction from "../defineFunction"
import environments from "../environments"

// \bordermatrix  from TeXbook pp 177 & 361
// Optional argument from Herbert Voß, Math mode, p 20
// Ref: https://tug.ctan.org/obsolete/info/math/voss/mathmode/Mathmode.pdf

defineFunction({
  type: "bordermatrix",
  names: ["\\bordermatrix", "\\matrix"],
  props: {
    numArgs: 0,
    numOptionalArgs: 1
  },
  handler: ({ parser, funcName }, args, optArgs) => {
    // Find out if the author has defined custom delimiters
    let delimiters = ["(", ")"]; // default
    if (funcName === "\\bordermatrix" && optArgs[0] && optArgs[0].body) {
      const body = optArgs[0].body
      if (body.length === 1 && body[0].type === "delimiter") {
        delimiters = [body[0].left, body[0].right]
      }
    }
    // consume the opening brace
    parser.consumeSpaces()
    parser.consume()

    // Pass control to the environment handler in array.js.
    const env = environments["bordermatrix"];
    const context = {
      mode: parser.mode,
      envName: funcName.slice(1),
      delimiters,
      parser
    }
    const result = env.handler(context)
    parser.expect("}", true)
    return result
  }
});
