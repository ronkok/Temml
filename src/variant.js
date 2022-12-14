import symbols from "./symbols";

/**
 * Maps TeX font commands to "mathvariant" attribute in buildMathML.js
 */
const fontMap = {
  // styles
  mathbf: "bold",
  mathrm: "normal",
  textit: "italic",
  mathit: "italic",
  mathnormal: "italic",

  // families
  mathbb: "double-struck",
  mathcal: "script",
  mathfrak: "fraktur",
  mathscr: "script",
  mathsf: "sans-serif",
  mathtt: "monospace"
}

/**
 * Returns the math variant as a string or null if none is required.
 */
export const getVariant = function(group, style) {
  // Handle font specifiers as best we can.
  // Chromium does not support the MathML mathvariant attribute.
  // So we'll use Unicode replacement characters instead.
  // But first, determine the math variant.

  // Deal with the \textit, \textbf, etc., functions.
  if (style.fontFamily === "texttt") {
    return "monospace"
  } else if (style.fontFamily === "textsc") {
    return "normal"; // handled via character substitution in symbolsOrd.js.
  } else if (style.fontFamily === "textsf") {
    if (style.fontShape === "textit" && style.fontWeight === "textbf") {
      return "sans-serif-bold-italic"
    } else if (style.fontShape === "textit") {
      return "sans-serif-italic"
    } else if (style.fontWeight === "textbf") {
      return "sans-serif-bold"
    } else {
      return "sans-serif"
    }
  } else if (style.fontShape === "textit" && style.fontWeight === "textbf") {
    return "bold-italic"
  } else if (style.fontShape === "textit") {
    return "italic"
  } else if (style.fontWeight === "textbf") {
    return "bold"
  }

  // Deal with the \mathit, mathbf, etc, functions.
  const font = style.font
  if (!font || font === "mathnormal") {
    return null
  }

  const mode = group.mode;
  switch (font) {
    case "mathit":
      return "italic"
    case "mathrm": {
      const codePoint = group.text.codePointAt(0)
      // LaTeX \mathrm returns italic for Greek characters.
      return  (0x03ab < codePoint && codePoint < 0x03cf) ? "italic" : "normal"
    }
    case "greekItalic":
      return "italic"
    case "up@greek":
      return "normal"
    case "boldsymbol":
    case "mathboldsymbol":
      return "bold-italic"
    case "mathbf":
      return "bold"
    case "mathbb":
      return "double-struck"
    case "mathfrak":
      return "fraktur"
    case "mathscr":
    case "mathcal":
      return "script"
    case "mathsf":
      return "sans-serif"
    case "mathtt":
      return "monospace"
    default:
      break
  }

  let text = group.text;
  if (symbols[mode][text] && symbols[mode][text].replace) {
    text = symbols[mode][text].replace
  }

  return Object.prototype.hasOwnProperty.call(fontMap, font) ? fontMap[font] : null
};
