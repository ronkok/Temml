import defineFunction, { ordargument } from "../defineFunction";
import * as mml from "../buildMathML";

export const consolidateText = mrow => {
  // If possible, consolidate adjacent <mtext> elements into a single element.
  // First, check if it is possible. If not, return the <mrow>.
  if (mrow.type !== "mrow") { return mrow }
  if (mrow.children.length === 0) { return mrow } // empty group, e.g., \text{}
  const mtext = mrow.children[0]
  if (!mtext.attributes || mtext.type !== "mtext") { return mrow }
  const variant = mtext.attributes.mathvariant || ""
  for (let i = 1; i < mrow.children.length; i++) {
    const localVariant = mrow.children[i].attributes.mathvariant || ""
    if (mrow.children[i].type === "mrow") {
      const childRow = mrow.children[i]
      for (let j = 0; j < childRow.children.length; j++) {
        const childVariant = childRow.children[j].attributes.mathvariant || ""
        if (childVariant !== variant || childRow.children[j].type !== "mtext") { return mrow }
      }
    } else if (localVariant !== variant || mrow.children[i].type !== "mtext") {
      return mrow
    }
  }

  // Consolidate the <mtext> elements.
  for (let i = 1; i < mrow.children.length; i++) {
    if (mrow.children[i].type === "mrow") {
      const childRow = mrow.children[i]
      for (let j = 0; j < childRow.children.length; j++ ) {
        mtext.children[0].text += childRow.children[j].children[0].text
      }
    } else {
      mtext.children[0].text += mrow.children[i].children[0].text
    }
  }
  mtext.children.splice(1, mtext.children.length - 1)
  // Firefox does not render a space at either end of the <mtext> string.
  // To get proper rendering, we replace with no-break spaces.
  if (mtext.children[0].text.charAt(0) === " ") {
    mtext.children[0].text = "\u00a0" + mtext.children[0].text.slice(1)
  }
  const L = mtext.children[0].text.length
  if (L > 0 && mtext.children[0].text.charAt(L - 1) === " ") {
    mtext.children[0].text = mtext.children[0].text.slice(0, -1) + "\u00a0"
  }
  return mtext
}

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
    const newStyle = styleWithFont(group, style)
    const mrow = mml.buildExpressionRow(group.body, newStyle)
    return consolidateText(mrow)
  }
});
