/**
 * This file does conversion between units.  In particular, it provides
 * calculateSize to convert other units into CSS units.
 */

import ParseError from "./ParseError"
import utils from "./utils"

const ptPerUnit = {
  // Convert to CSS (Postscipt) points, not TeX points
  // https://en.wikibooks.org/wiki/LaTeX/Lengths and
  // https://tex.stackexchange.com/a/8263
  pt: 800 / 803, // convert TeX point to CSS (Postscript) point
  pc: (12 * 800) / 803, // pica
  dd: ((1238 / 1157) * 800) / 803, // didot
  cc: ((14856 / 1157) * 800) / 803, // cicero (12 didot)
  nd: ((685 / 642) * 800) / 803, // new didot
  nc: ((1370 / 107) * 800) / 803, // new cicero (12 new didot)
  sp: ((1 / 65536) * 800) / 803, // scaled point (TeX's internal smallest unit)
  mm: (25.4 / 72),
  cm: (2.54 / 72),
  in: (1 / 72),
  px: (96 / 72)
}

/**
 * Determine whether the specified unit (either a string defining the unit
 * or a "size" parse node containing a unit field) is valid.
 */
const validUnits = [
  "em",
  "ex",
  "mu",
  "pt",
  "mm",
  "cm",
  "in",
  "px",
  "bp",
  "pc",
  "dd",
  "cc",
  "nd",
  "nc",
  "sp"
]

export const validUnit = function(unit) {
  if (typeof unit !== "string") {
    unit = unit.unit
  }
  return validUnits.indexOf(unit) > -1
}

export const emScale = styleLevel => {
  const scriptLevel = Math.max(styleLevel - 1, 0)
  return [1, 0.7, 0.5][scriptLevel]
};

/*
 * Convert a "size" parse node (with numeric "number" and string "unit" fields,
 * as parsed by functions.js argType "size") into a CSS value.
 */
export const calculateSize = function(sizeValue, style) {
  let number = sizeValue.number
  if (style.maxSize[0] < 0 && number > 0) {
    return { number: 0, unit: "em" }
  }
  const unit = sizeValue.unit
  switch (unit) {
    case "mm":
    case "cm":
    case "in":
    case "px": {
      const numInCssPts = number * ptPerUnit[unit];
      if (numInCssPts > style.maxSize[1]) {
        return { number: style.maxSize[1], unit: "pt" }
      }
      return { number, unit }; // absolute CSS units.
    }
    case "em":
    case "ex": {
      // In TeX, em and ex do not change size in \scriptstyle.
      if (unit === "ex") { number *= 0.431 }
      number = Math.min(number / emScale(style.level), style.maxSize[0])
      return { number: utils.round(number), unit: "em" };
    }
    case "bp": {
      if (number > style.maxSize[1]) { number = style.maxSize[1] }
      return { number, unit: "pt" }; // TeX bp is a CSS pt. (1/72 inch).
    }
    case "pt":
    case "pc":
    case "dd":
    case "cc":
    case "nd":
    case "nc":
    case "sp": {
      number = Math.min(number * ptPerUnit[unit], style.maxSize[1])
      return { number: utils.round(number), unit: "pt" }
    }
    case "mu": {
      number = Math.min(number / 18, style.maxSize[0])
      return { number: utils.round(number), unit: "em" }
    }
    default:
      throw new ParseError("Invalid unit: '" + unit + "'")
  }
}
