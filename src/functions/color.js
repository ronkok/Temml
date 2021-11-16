import defineFunction, { ordargument } from "../defineFunction"
import { wrapWithMstyle } from "../mathMLTree"
import { assertNodeType } from "../parseNode"
import ParseError from "../ParseError"
import * as mml from "../buildMathML"

// Helpers
const htmlRegEx = /^(#[a-f0-9]{3}|#?[a-f0-9]{6})$/i
const htmlOrNameRegEx = /^(#[a-f0-9]{3}|#?[a-f0-9]{6}|[a-z]+)$/i
const RGBregEx = /^ *\d{1,3} *(?:, *\d{1,3} *){2}$/
const rgbRegEx = /^ *[10](?:\.\d*)? *(?:, *[10](?:\.\d*)? *){2}$/
const xcolorHtmlRegEx = /^[a-f0-9]{6}$/i
const toHex = num => {
  let str = num.toString(16)
  if (str.length === 1) { str = "0" + str }
  return str
}

export const colorFromSpec = (model, spec) => {
  let color = ""
  if (model === "HTML") {
    if (!htmlRegEx.test(spec)) {
      throw new ParseError("Invalid HTML input.")
    }
    color = spec
  } else if (model === "RGB") {
    if (!RGBregEx.test(spec)) {
      throw new ParseError("Invalid RGB input.")
    }
    spec.split(",").map(e => { color += toHex(Number(e.trim())) })
  } else {
    if (!rgbRegEx.test(spec)) {
      throw new ParseError("Invalid rbg input.")
    }
    spec.split(",").map(e => {
      if (!isNaN(e)) { throw new ParseError("Non-numeric rgb input.") }
      const num = Number(e.trim())
      if (num > 1) { throw new ParseError("Color rgb input must be < 1.") }
      color += toHex((num * 255))
    })
  }
  if (color.charAt(0) !== "#") { color = "#" + color }
  return color
}

export const validateColor = (color, macros) => {
  const match = htmlOrNameRegEx.exec(color);
  if (!match) { throw new ParseError("Invalid color: '" + color + "'") }
  // We allow a 6-digit HTML color spec without a leading "#".
  // This follows the xcolor package's HTML color model.
  // Predefined color names are all missed by this RegEx pattern.
  if (xcolorHtmlRegEx.test(color)) {
    return "#" + color
  } else if (color.charAt(0) === "#") {
    return color
  } else {
    // Check if \defineColor has created a color for this name.
    const macroName = `\\\\color@${color}`
    if (macros.has(macroName)) {
      color = macros.get(macroName).tokens[0].text
    }
  }
  return color
}

const mathmlBuilder = (group, style) => {
  const inner = mml.buildExpression(group.body, style.withColor(group.color))
  // Wrap with an <mstyle> element.
  const node = wrapWithMstyle(inner)

  node.setAttribute("mathcolor", group.color)

  return node
}

defineFunction({
  type: "color",
  names: ["\\textcolor"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    allowedInText: true,
    argTypes: ["raw", "raw", "original"]
  },
  handler({ parser }, args, optArgs) {
    const model = optArgs[0] && assertNodeType(optArgs[0], "raw").string
    let color = ""
    if (model) {
      const spec = assertNodeType(args[0], "raw").string
      color = colorFromSpec(model, spec)
    } else {
      color = validateColor(assertNodeType(args[0], "raw").string, parser.gullet.macros)
    }
    const body = args[1];
    return {
      type: "color",
      mode: parser.mode,
      color,
      body: ordargument(body)
    }
  },
  mathmlBuilder
})

defineFunction({
  type: "color",
  names: ["\\color"],
  props: {
    numArgs: 1,
    numOptionalArgs: 1,
    allowedInText: true,
    argTypes: ["raw", "raw"]
  },
  handler({ parser, breakOnTokenText }, args, optArgs) {
    const model = optArgs[0] && assertNodeType(optArgs[0], "raw").string
    let color = ""
    if (model) {
      const spec = assertNodeType(args[0], "raw").string
      color = colorFromSpec(model, spec)
    } else {
      color = validateColor(assertNodeType(args[0], "raw").string, parser.gullet.macros)
    }

    // Set macro \current@color in current namespace to store the current
    // color, mimicking the behavior of color.sty.
    // This is currently used just to correctly color a \right
    // that follows a \color command.
    parser.gullet.macros.set("\\current@color", color)

    // Parse out the implicit body that should be colored.
    const body = parser.parseExpression(true, breakOnTokenText)

    return {
      type: "color",
      mode: parser.mode,
      color,
      body
    }
  },
  mathmlBuilder
})

defineFunction({
  type: "color",
  names: ["\\definecolor"],
  props: {
    numArgs: 3,
    allowedInText: true,
    argTypes: ["raw", "raw", "raw"]
  },
  handler({ parser }, args) {
    const name = assertNodeType(args[0], "raw").string
    if (!/^[A-Za-z]+$/.test(name)) {
      throw new ParseError("Color name must be latin letters.")
    }
    const model = assertNodeType(args[1], "raw").string
    if (!["HTML", "RGB", "rgb"].includes(model)) {
      throw new ParseError("Color model must be HTML, RGB, or rgb.")
    }
    const spec = assertNodeType(args[2], "raw").string
    const color = colorFromSpec(model, spec)
    parser.gullet.macros.set(`\\\\color@${name}`, { tokens: [{ text: color }], numArgs: 0 })
    return { type: "internal", mode: parser.mode }
  }
  // No mathmlBuilder. The point of \definecolor is to set a macro.
})
