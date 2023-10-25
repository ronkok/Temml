// In TeX, there are actually three sets of dimensions, one for each of
// textstyle, scriptstyle, and scriptscriptstyle.  These are
// provided in the the arrays below, in that order.
//
export const metrics = {
  quad: [1.0, 1.171, 1.472], // Extracted from TeX

  // The TeX default rule thickness, 0.04 em, often disappears from a browser screen.
  // So we use a thicker rule.
  defaultRuleThickness: [0.06, 0.074, 0.074],

  // The space between adjacent `|` columns in an array definition.
  doubleRuleSep: [0.3, 0.3, 0.3],

  // The width of separator lines in {array} environments.
  arrayRuleWidth: [0.06, 0.06, 0.04]
};

// Math style is not quite the same thing as script level.
export const StyleLevel = {
  DISPLAY: 0,
  TEXT: 1,
  SCRIPT: 2,
  SCRIPTSCRIPT: 3
};
