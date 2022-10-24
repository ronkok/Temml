import defineFunction, { normalizeArgument } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import stretchy from "../stretchy"
import * as mml from "../buildMathML"

const mathmlBuilder = (group, style) => {
  const accentNode = group.isStretchy
    ? stretchy.mathMLnode(group.label)
    : new mathMLTree.MathNode("mo", [mml.makeText(group.label, group.mode)]);

  if (group.label === "\\vec") {
    accentNode.style.transform = "scale(0.75) translate(10%, 30%)"
  } else {
    accentNode.style.mathStyle = "normal"
    accentNode.style.mathDepth = "0"
  }
  if (!group.isStretchy) {
    accentNode.setAttribute("stretchy", "false")
  }

  const node = new mathMLTree.MathNode((group.label === "\\c" ? "munder" : "mover"),
    [mml.buildGroup(group.base, style), accentNode]
  );

  return node;
};

const NON_STRETCHY_ACCENT_REGEX = new RegExp(
  [
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
  ]
    .map((accent) => `\\${accent}`)
    .join("|")
);

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

    const isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);

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

    return {
      type: "accent",
      mode: mode,
      label: context.funcName,
      isStretchy: false,
      isShifty: true,
      base: base
    };
  },
  mathmlBuilder
});
