import defineFunction, { normalizeArgument } from "../defineFunction"
import * as mml from "../buildMathML"
import mathMLTree from "../mathMLTree"

const mathmlBuilder = (group, style) => {
  const font = group.font
  const newStyle = style.withFont(font)
  const mathGroup = mml.buildGroup(group.body, newStyle)

  if (mathGroup.children.length === 0) { return mathGroup } // empty group, e.g., \mathrm{}
  if (font === "boldsymbol" && ["mo", "mpadded"].includes(mathGroup.type)) {
    mathGroup.style.fontWeight = "bold"
    return mathGroup
  }
  // Check if it is possible to consolidate elements into a single <mi> element.
  let canConsolidate = mathGroup.children[0].type === "mo"
  for (let i = 1; i < mathGroup.children.length; i++) {
    if (mathGroup.children[i].type === "mo" && font === "boldsymbol") {
      mathGroup.children[i].style.fontWeight = "bold"
    }
    if (mathGroup.children[i].type !== "mi") { canConsolidate = false }
    const localVariant = mathGroup.children[i].attributes &&
      mathGroup.children[i].attributes.mathvariant || ""
    if (localVariant !== "normal") { canConsolidate = false }
  }
  if (!canConsolidate) { return mathGroup }
  // Consolidate the <mi> elements.
  const mi = mathGroup.children[0]
  for (let i = 1; i < mathGroup.children.length; i++) {
    mi.children.push(mathGroup.children[i].children[0])
  }
  if (mi.attributes.mathvariant && mi.attributes.mathvariant === "normal") {
    // Workaround for a Firefox bug that renders spurious space around
    // a <mi mathvariant="normal">
    // Ref: https://bugs.webkit.org/show_bug.cgi?id=129097
    // We insert a text node that contains a zero-width space and wrap in an mrow.
    // TODO: Get rid of this <mi> workaround when the Firefox bug is fixed.
    const bogus = new mathMLTree.MathNode("mtext", new mathMLTree.TextNode("\u200b"))
    return new mathMLTree.MathNode("mrow", [bogus, mi])
  }
  return mi
};

const fontAliases = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak",
  "\\bm": "\\boldsymbol"
};

defineFunction({
  type: "font",
  names: [
    // styles
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    "\\up@greek",
    "\\boldsymbol",

    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",

    // aliases
    "\\Bbb",
    "\\bm",
    "\\bold",
    "\\frak"
  ],
  props: {
    numArgs: 1,
    allowedInArgument: true
  },
  handler: ({ parser, funcName }, args) => {
    const body = normalizeArgument(args[0]);
    let func = funcName;
    if (func in fontAliases) {
      func = fontAliases[func];
    }
    return {
      type: "font",
      mode: parser.mode,
      font: func.slice(1),
      body
    };
  },
  mathmlBuilder
});

// Old font changing functions
defineFunction({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: {
    numArgs: 0,
    allowedInText: true
  },
  handler: ({ parser, funcName, breakOnTokenText }, args) => {
    const { mode } = parser;
    const body = parser.parseExpression(true, breakOnTokenText);
    const fontStyle = `math${funcName.slice(1)}`;

    return {
      type: "font",
      mode: mode,
      font: fontStyle,
      body: {
        type: "ordgroup",
        mode: parser.mode,
        body
      }
    };
  },
  mathmlBuilder
});
