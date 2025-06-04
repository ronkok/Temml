import defineFunction, { normalizeArgument } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import stretchy from "../stretchy"
import * as mml from "../buildMathML"

const smalls = "acegıȷmnopqrsuvwxyzαγεηικμνοπρςστυχωϕ𝐚𝐜𝐞𝐠𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐮𝐯𝐰𝐱𝐲𝐳"

const mathmlBuilder = (group, style) => {
  const accentNode = group.isStretchy
    ? stretchy.accentNode(group)
    : new mathMLTree.MathNode("mo", [mml.makeText(group.label, group.mode)]);

  if (group.label === "\\vec") {
    accentNode.style.transform = "scale(0.75) translate(10%, 30%)"
  } else {
    accentNode.style.mathDepth = "0" // not scriptstyle
  }
  if (needWebkitShift.has(group.label)) {
    accentNode.classes.push("tml-accent")
  }
  const tag = group.label === "\\c" ? "munder" : "mover"
  const node = new mathMLTree.MathNode(tag, [mml.buildGroup(group.base, style), accentNode]);
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
  "\\dot",
  "\\ddot",
  "\\grave",
  "\\mathring",
  "\\'", "\\~", "\\=", "\\u", "\\.", '\\"', "\\r", "\\H", "\\v"
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
