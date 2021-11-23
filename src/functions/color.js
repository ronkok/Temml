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
  "Apricot": "#ffb484",
  "Aquamarine": "#08b4bc",
  "Bittersweet": "#c84c14",
  "blue": "#0804fc",
  "Blue": "#303494",
  "BlueGreen": "#08b4bc",
  "BlueViolet": "#503c94",
  "BrickRed": "#b8341c",
  "brown": "#c08444",
  "Brown": "#802404",
  "BurntOrange": "#f8941c",
  "CadetBlue": "#78749c",
  "CarnationPink": "#f884b4",
  "Cerulean": "#08a4e4",
  "CornflowerBlue": "#40ace4",
  "cyan": "#08acec",
  "Cyan": "#08acec",
  "Dandelion": "#ffbc44",
  "darkgray": "#484444",
  "DarkOrchid": "#a8548c",
  "Emerald": "#08ac9c",
  "ForestGreen": "#089c54",
  "Fuchsia": "#90348c",
  "Goldenrod": "#ffdc44",
  "gray": "#888484",
  "Gray": "#98949c",
  "green": "#08fc04",
  "Green": "#08a44c",
  "GreenYellow": "#e0e474",
  "JungleGreen": "#08ac9c",
  "Lavender": "#f89cc4",
  "lightgray": "#c0bcbc",
  "lime": "#c0fc04",
  "LimeGreen": "#90c43c",
  "magenta": "#f0048c",
  "Magenta": "#f0048c",
  "Mahogany": "#b0341c",
  "Maroon": "#b03434",
  "Melon": "#f89c7c",
  "MidnightBlue": "#086494",
  "Mulberry": "#b03c94",
  "NavyBlue": "#086cbc",
  "olive": "#988c04",
  "OliveGreen": "#407c34",
  "orange": "#ff8404",
  "Orange": "#f8843c",
  "OrangeRed": "#f0145c",
  "Orchid": "#b074ac",
  "Peach": "#f8945c",
  "Periwinkle": "#8074bc",
  "PineGreen": "#088c74",
  "pink": "#ffbcbc",
  "Plum": "#98248c",
  "ProcessBlue": "#08b4ec",
  "purple": "#c00444",
  "Purple": "#a0449c",
  "RawSienna": "#983c04",
  "red": "#ff0404",
  "Red": "#f01c24",
  "redOrange": "#f86434",
  "RedViolet": "#a0246c",
  "Rhodamine": "#f0549c",
  "Royallue": "#0874bc",
  "RoyalPurple": "#683c9c",
  "RubineRed": "#f0047c",
  "Salmon": "#f8948c",
  "SeaGreen": "#30bc9c",
  "Sepia": "#701404",
  "SkyBlue": "#48c4dc",
  "SpringGreen": "#c8dc64",
  "Tan": "#e09c74",
  "teal": "#088484",
  "TealBlue": "#08acb4",
  "Thistle": "#d884b4",
  "Turquoise": "#08b4cc",
  "violet": "#880484",
  "Violet": "#60449c",
  "VioletRed": "#f054a4",
  "WildStrawberry": "#f0246c",
  "yellow": "#fff404",
  "Yellow": "#fff404",
  "YellowGreen": "#98cc6c",
  "YellowOrange": "#ffa41c"
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
  const macroName = `\\\\color@${color}` // from \defineColor.
  const match = htmlOrNameRegEx.exec(color);
  if (!match) { throw new ParseError("Invalid color: '" + color + "'") }
  // We allow a 6-digit HTML color spec without a leading "#".
  // This follows the xcolor package's HTML color model.
  // Predefined color names are all missed by this RegEx pattern.
  if (xcolorHtmlRegEx.test(color)) {
    return "#" + color
  } else if (color.charAt(0) === "#") {
    return color
  } else if (macros.has(macroName)) {
    color = macros.get(macroName).tokens[0].text
  } else if (xcolors[color]) {
    color = xcolors[color]
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
    // Since \color nodes should not be nested, break on \color.
    const body = parser.parseExpression(true, "\\color")

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
