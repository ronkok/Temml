import defineFunction, { ordargument } from "../defineFunction";
import { StyleLevel } from "../constants"
import * as mml from "../buildMathML";

// Non-mathy text, possibly in a font
const textFontFamilies = {
  "\\text": undefined,
  "\\textrm": "textrm",
  "\\textsf": "textsf",
  "\\texttt": "texttt",
  "\\textnormal": "textrm",
  "\\textsc": "textsc"      // small caps
};

const textFontWeights = {
  "\\textbf": "textbf",
  "\\textmd": "textmd"
};

const textFontShapes = {
  "\\textit": "textit",
  "\\textup": "textup"
};

const styleWithFont = (group, style) => {
  const font = group.font;
  // Checks if the argument is a font family or a font style.
  if (!font) {
    return style;
  } else if (textFontFamilies[font]) {
    return style.withTextFontFamily(textFontFamilies[font]);
  } else if (textFontWeights[font]) {
    return style.withTextFontWeight(textFontWeights[font]);
  } else {
    return style.withTextFontShape(textFontShapes[font]);
  }
};

defineFunction({
  type: "text",
  names: [
    // Font families
    "\\text",
    "\\textrm",
    "\\textsf",
    "\\texttt",
    "\\textnormal",
    "\\textsc",
    // Font weights
    "\\textbf",
    "\\textmd",
    // Font Shapes
    "\\textit",
    "\\textup"
  ],
  props: {
    numArgs: 1,
    argTypes: ["text"],
    allowedInArgument: true,
    allowedInText: true
  },
  handler({ parser, funcName }, args) {
    const body = args[0];
    return {
      type: "text",
      mode: parser.mode,
      body: ordargument(body),
      font: funcName
    };
  },
  mathmlBuilder(group, style) {
    const newStyle = styleWithFont(group, style.withLevel(StyleLevel.TEXT))
    const mrow = mml.buildExpressionRow(group.body, newStyle)

    // If possible, consolidate adjacent <mtext> elements into a single element.
    // First, check if it is possible. If not, return the <mrow>.
    if (mrow.type !== "mrow") { return mrow }
    if (mrow.children.length === 0) { return mrow } // empty group, e.g., \text{}
    const mtext = mrow.children[0]
    if (!mtext.attributes || mtext.type !== "mtext") { return mrow }
    const variant = mtext.attributes.mathvariant || ""
    for (let i = 1; i < mrow.children.length; i++) {
      const localVariant = mrow.children[i].attributes.mathvariant || ""
      if (localVariant !== variant || mrow.children[i].type !== "mtext") { return mrow }
    }

    // Consolidate the <mtext> elements.
    for (let i = 1; i < mrow.children.length; i++) {
      mtext.children[0].text += mrow.children[i].children[0].text
    }
    mtext.children.splice(1, mtext.children.length - 1)
    return mtext
  }
});
