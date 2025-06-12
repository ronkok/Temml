import defineFunction, { normalizeArgument } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import stretchy from "../stretchy"
import * as mml from "../buildMathML"

// Identify letters to which we'll attach a combining accent character
const smalls = "acegıȷmnopqrsuvwxyzαγεηικμνοπρςστυχωϕ𝐚𝐜𝐞𝐠𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐮𝐯𝐰𝐱𝐲𝐳"

// From the KaTeX font metrics, identify letters whose accents need a italic correction.
const smallNudge = "DHKLUcegorsuvxyzΠΥΨαδηιμνοτυχϵ"
const mediumNudge = "BCEGIMNOPQRSTXZlpqtwΓΘΞΣΦΩβεζθξρςφψϑϕϱ"
const largeNudge = "AFJdfΔΛ"

const mathmlBuilder = (group, style) => {
  const accentNode = group.isStretchy
    ? stretchy.accentNode(group)
    : new mathMLTree.MathNode("mo", [mml.makeText(group.label, group.mode)]);
  if (!group.isStretchy) {
    accentNode.setAttribute("stretchy", "false") // Keep Firefox from stretching \check
  }
  if (group.label !== "\\vec") {
    accentNode.style.mathDepth = "0" // not scriptstyle
    // Don't use attribute accent="true" because MathML Core eliminates a needed space.
  }
  const tag = group.label === "\\c" ? "munder" : "mover"
  const needsWbkVertShift = needsWebkitVerticalShift.has(group.label)
  if (tag === "mover" && group.mode === "math" && (!group.isStretchy) && group.base.text
      && group.base.text.length === 1) {
    const text = group.base.text
    const isVec = group.label === "\\vec"
    const vecPostfix = isVec === "\\vec" ? "-vec" : ""
    if (isVec) {
      accentNode.classes.push("tml-vec") // Firefox sizing of \vec arrow
    }
    const wbkPostfix = isVec ? "-vec" : needsWbkVertShift ? "-acc" : ""
    if (smallNudge.indexOf(text) > -1) {
      accentNode.classes.push(`chr-sml${vecPostfix}`)
      accentNode.classes.push(`wbk-sml${wbkPostfix}`)
    } else if (mediumNudge.indexOf(text) > -1) {
      accentNode.classes.push(`chr-med${vecPostfix}`)
      accentNode.classes.push(`wbk-med${wbkPostfix}`)
    } else if (largeNudge.indexOf(text) > -1) {
      accentNode.classes.push(`chr-lrg${vecPostfix}`)
      accentNode.classes.push(`wbk-lrg${wbkPostfix}`)
    } else if (isVec) {
      accentNode.classes.push(`wbk-vec`)
    } else if (needsWbkVertShift) {
      accentNode.classes.push(`wbk-acc`)
    }
  } else if (needsWbkVertShift) {
    // text-mode accents
    accentNode.classes.push("wbk-acc")
  }
  const node = new mathMLTree.MathNode(tag, [mml.buildGroup(group.base, style), accentNode]);
  return node;
};

const nonStretchyAccents = new Set([
  "\\acute",
  "\\check",
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

const needsWebkitVerticalShift = new Set([
  "\\acute",
  "\\bar",
  "\\breve",
  "\\check",
  "\\dot",
  "\\ddot",
  "\\grave",
  "\\hat",
  "\\mathring",
  "\\`", "\\'", "\\^", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"
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
  "\\v": "\u030C",
  "\\c": "\u0327"
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
      isStretchy,
      base
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
        && context.funcName in combiningChar && smalls.indexOf(base.text) > -1) {
      // Return a combining accent character
      return {
        type: "textord",
        mode: "text",
        text: base.text + combiningChar[context.funcName]
      }
    } else if (context.funcName === "\\c" && mode === "text" && base.text
        && base.text.length === 1) {
      // combining cedilla
      return { type: "textord", mode: "text", text: base.text + "\u0327" }
    } else {
      // Build up the accent
      return {
        type: "accent",
        mode,
        label: context.funcName,
        isStretchy: false,
        base
      }
    }
  },
  mathmlBuilder
});
