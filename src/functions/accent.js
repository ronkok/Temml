import defineFunction, { normalizeArgument } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import stretchy from "../stretchy"
import * as mml from "../buildMathML"
import utils from "../utils"

const smalls = "acegıȷmnopqrsuvwxyzαγεηικμνοπρςστυχωϕ𝐚𝐜𝐞𝐠𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐮𝐯𝐰𝐱𝐲𝐳"
const talls = "ABCDEFGHIJKLMNOPQRSTUVWXYZbdfhkltΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩβδλζφθψ"
             + "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐛𝐝𝐟𝐡𝐤𝐥𝐭"
const longSmalls = new Set(["\\alpha", "\\gamma", "\\delta", "\\epsilon", "\\eta", "\\iota",
  "\\kappa", "\\mu", "\\nu", "\\pi", "\\rho", "\\sigma", "\\tau", "\\upsilon", "\\chi", "\\psi",
  "\\omega", "\\imath", "\\jmath"])
const longTalls = new Set(["\\Gamma", "\\Delta", "\\Sigma", "\\Omega", "\\beta", "\\delta",
  "\\lambda", "\\theta", "\\psi"])

const mathmlBuilder = (group, style) => {
  const accentNode = group.isStretchy
    ? stretchy.accentNode(group)
    : new mathMLTree.MathNode("mo", [mml.makeText(group.label, group.mode)]);

  if (group.label === "\\vec") {
    accentNode.style.transform = "scale(0.75) translate(10%, 30%)"
  } else {
    accentNode.style.mathStyle = "normal"
    accentNode.style.mathDepth = "0"
    if (needWebkitShift.has(group.label) &&  utils.isCharacterBox(group.base)) {
      let shift = ""
      const ch = group.base.text
      if (smalls.indexOf(ch) > -1 || longSmalls.has(ch)) { shift = "tml-xshift" }
      if (talls.indexOf(ch) > -1  || longTalls.has(ch))  { shift = "tml-capshift" }
      if (shift) { accentNode.classes.push(shift) }
    }
  }
  if (!group.isStretchy) {
    accentNode.setAttribute("stretchy", "false")
  }

  const node = new mathMLTree.MathNode((group.label === "\\c" ? "munder" : "mover"),
    [mml.buildGroup(group.base, style), accentNode]
  );

  return node;
};

const nonStretchyAccents = new Set([
  "\\acute",
  "\\grave",
  "\\ddot",
  "\\dddot",
  "\\ddddot",
  "\\tilde",
  "\\bar",
  "\\breve",
  "\\check",
  "\\hat",
  "\\vec",
  "\\dot",
  "\\mathring"
])

const needWebkitShift = new Set([
  "\\acute",
  "\\bar",
  "\\breve",
  "\\check",
  "\\dot",
  "\\ddot",
  "\\grave",
  "\\hat",
  "\\mathring",
  "\\'", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"
])

const combiningChar = {
  "\\`": "\u0300",
  "\\'": "\u0301",
  "\\^": "\u0302",
  "\\~": "\u0303",
  "\\=": "\u0304",
  "\\u": "\u0306",
  "\\.": "\u0307",
  '\\"': "\u0308",
  "\\r": "\u030A",
  "\\H": "\u030B",
  "\\v": "\u030C"
}

// Accents
defineFunction({
  type: "accent",
  names: [
    "\\acute",
    "\\grave",
    "\\ddot",
    "\\dddot",
    "\\ddddot",
    "\\tilde",
    "\\bar",
    "\\breve",
    "\\check",
    "\\hat",
    "\\vec",
    "\\dot",
    "\\mathring",
    "\\overparen",
    "\\widecheck",
    "\\widehat",
    "\\wideparen",
    "\\widetilde",
    "\\overrightarrow",
    "\\overleftarrow",
    "\\Overrightarrow",
    "\\overleftrightarrow",
    "\\overgroup",
    "\\overleftharpoon",
    "\\overrightharpoon"
  ],
  props: {
    numArgs: 1
  },
  handler: (context, args) => {
    const base = normalizeArgument(args[0]);

    const isStretchy = !nonStretchyAccents.has(context.funcName);

    return {
      type: "accent",
      mode: context.parser.mode,
      label: context.funcName,
      isStretchy: isStretchy,
      base: base
    };
  },
  mathmlBuilder
});

// Text-mode accents
defineFunction({
  type: "accent",
  names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\c", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"],
  props: {
    numArgs: 1,
    allowedInText: true,
    allowedInMath: true,
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    const base = normalizeArgument(args[0]);
    const mode = context.parser.mode;

    if (mode === "math" && context.parser.settings.strict) {
      // LaTeX only writes a warning. It doesn't stop. We'll issue the same warning.
      // eslint-disable-next-line no-console
      console.log(`Temml parse error: Command ${context.funcName} is invalid in math mode.`)
    }

    if (mode === "text" && base.text && base.text.length === 1
        && context.funcName in combiningChar  && smalls.indexOf(base.text) > -1) {
      // Return a combining accent character
      return {
        type: "textord",
        mode: "text",
        text: base.text + combiningChar[context.funcName]
      }
    } else {
      // Build up the accent
      return {
        type: "accent",
        mode: mode,
        label: context.funcName,
        isStretchy: false,
        base: base
      }
    }
  },
  mathmlBuilder
});
