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

// Colors from Tables 4.1 and 4.2 of the xcolor package.
const xcolors = JSON.parse(`{
  "apricot": "#ffb484",
  "aquamarine": "#08b4bc",
  "bittersweet": "#c84c14",
  "blue": "#303494",
  "bluegreen": "#08b4bc",
  "blueviolet": "#503c94",
  "brickred": "#b8341c",
  "brown": "#802404",
  "burntorange": "#f8941c",
  "cadetblue": "#78749c",
  "carnationpink": "#f884b4",
  "cerulean": "#08a4e4",
  "cornflowerblue": "#40ace4",
  "cyan": "#08acec",
  "dandelion": "#ffbc44",
  "darkgray": "#484444",
  "darkorchid": "#a8548c",
  "emerald": "#08ac9c",
  "forestgreen": "#089c54",
  "fuchsia": "#90348c",
  "goldenrod": "#ffdc44",
  "gray": "#98949c",
  "green": "#08a44c",
  "greenyellow": "#e0e474",
  "junglegreen": "#08ac9c",
  "lavender": "#f89cc4",
  "lightgray": "#c0bcbc",
  "lime": "#c0fc04",
  "limegreen": "#90c43c",
  "magenta": "#f0048c",
  "mahogany": "#b0341c",
  "maroon": "#b03434",
  "melon": "#f89c7c",
  "midnightblue": "#086494",
  "mulberry": "#b03c94",
  "navyblue": "#086cbc",
  "olive": "#988c04",
  "olivegreen": "#407c34",
  "orange": "#f8843c",
  "orangered": "#f0145c",
  "orchid": "#b074ac",
  "peach": "#f8945c",
  "periwinkle": "#8074bc",
  "pinegreen": "#088c74",
  "pink": "#ffbcbc",
  "plum": "#98248c",
  "processblue": "#08b4ec",
  "purple": "#a0449c",
  "rawsienna": "#983c04",
  "red": "#f01c24",
  "redorange": "#f86434",
  "redviolet": "#a0246c",
  "rhodamine": "#f0549c",
  "royalblue": "#0874bc",
  "royalpurple": "#683c9c",
  "rubinered": "#f0047c",
  "salmon": "#f8948c",
  "seagreen": "#30bc9c",
  "sepia": "#701404",
  "skyblue": "#48c4dc",
  "springgreen": "#c8dc64",
  "tan": "#e09c74",
  "teal": "#088484",
  "tealblue": "#08acb4",
  "thistle": "#d884b4",
  "turquoise": "#08b4cc",
  "violet": "#60449c",
  "violetred": "#f054a4",
  "wildstrawberry": "#f0246c",
  "yellow": "#fff404",
  "yellowgreen": "#98cc6c",
  "yelloworange": "#ffa41c"
}`)

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
  } else if (xcolors[color.toLowerCase()]) {
    color = xcolors[color.toLowerCase()]
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
