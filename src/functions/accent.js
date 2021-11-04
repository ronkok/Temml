import defineFunction, { normalizeArgument } from "../defineFunction"
import mathMLTree from "../mathMLTree"
import stretchy from "../stretchy"
import * as mml from "../buildMathML"

const mathmlBuilder = (group, style) => {
  const accentNode = group.isStretchy
    ? stretchy.mathMLnode(group.label)
    : new mathMLTree.MathNode("mo", [mml.makeText(group.label, group.mode)]);

  if (group.isStretchy) {
    accentNode.setAttribute("stretchy", "true")
  }

  const node = new mathMLTree.MathNode((group.label === "\\c" ? "munder" : "mover"),
    [mml.buildGroup(group.base, style), accentNode]
  );

  node.setAttribute("accent", "true");
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
    const isShifty =
      !isStretchy ||
      context.funcName === "\\widehat" ||
      context.funcName === "\\widetilde" ||
      context.funcName === "\\widecheck";

    return {
      type: "accent",
      mode: context.parser.mode,
      label: context.funcName,
      isStretchy: isStretchy,
      isShifty: isShifty,
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
    allowedInMath: true, // unless in strict mode
    argTypes: ["primitive"]
  },
  handler: (context, args) => {
    const base = args[0];
    let mode = context.parser.mode;

    if (mode === "math") {
      context.parser.settings.reportNonstrict("mathVsTextAccents",
          `LaTeX's accent ${context.funcName} works only in text mode`);
      mode = "text";
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
