'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// autocorrect.js

const autoCorrectRegEx = /([!?:<>\-~/_]=| \.|~~|\+-|-\+|<-->|<->|<>|<--|<-|-->|->|=>|-:|\^\^|\|\||\/\/\/|\b(bar|hat|vec|tilde|dot|ddot|ul)|\b(bb|bbb|cc|ff|ss) [A-Za-z]|\\?[A-Za-z]{2,}|\\c|\\ |\\o|root [234]|<<|>>|\^-?[0-9]+|\|\|\||\/_|''|""|00)\s$/;

const accents = {
  acute: "\u0301",
  bar: "\u0305",
  breve: "\u0306",
  check: "\u030c",
  dot: "\u0307",
  ddot: "\u0308",
  grave: "\u0300",
  hat: "\u0302",
  harpoon: "\u20d1",
  leftharpoon: "\u20d0",
  leftrightvec: "\u20e1",
  leftvec: "\u20d6",
  ring: "\u030a",
  tilde: "\u0303",
  vec: "\u20d7",
  ul: "\u0332"
};

const autoCorrections = {
  alpha: "α",
  beta: "β",
  chi: "χ",
  delta: "δ",
  Delta: "Δ",
  epsilon: "ε",
  varepsilon: "\u025B",
  eta: "\u03B7",
  gamma: "γ",
  Gamma: "Γ",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "λ",
  Lambda: "Λ",
  mu: "μ",
  nu: "\u03BD",
  omega: "ω",
  Omega: "Ω",
  phi: "\u03D5",
  varphi: "\u03C6",
  Phi: "\u03A6",
  pi: "π",
  Pi: "Π",
  psi: "ψ",
  Psi: "Ψ",
  rho: "ρ",
  sigma: "σ",
  Sigma: "Σ",
  tau: "τ",
  theta: "θ",
  vartheta: "\u03D1",
  Theta: "Θ",
  upsilon: "\u03C5",
  xi: "\u03BE",
  Xi: "\u039E",
  zeta: "\u03B6",
  prime: "ʹ",
  ee: "ε",
  ll: "λ",
  sqrt: "√",
  "root 2": "\u221A",
  "root 3": "\u221B",
  "root 4": "\u221C",
  AA: "∀",
  CC: "\u2102",
  EE: "∃",
  HH: "\u210D",
  NN: "\u2115",
  QQ: "\u211A",
  RR: "\u211D",
  ZZ: "\u2124",
  OO: "𝒪",
  ii: "√(-1)",
  oo: "∞", // infinity
  ooo: "°",
  not: "¬",
  "-:": "÷",
  "\\ ": "˽",  // space
  "\\c": "¢",
  "\\cdots": "\u22ef",
  "\\vdots": "\u22ee",
  "\\ddots": "\u22f1",
  "\\floor": "\u23BF\u23CC",
  "\\ceil": "\u23BE\u23CB",
  xx: "×",
  "\\int": "∫",
  "\\iint": "∬",
  "\\oint": "∮",
  "\\sum": "∑",
  nn: "∩", // cap
  nnn: "⋂",
  uu: "∪", // cup
  uuu: "⋃",
  "\\del": "∂",
  "\\grad": "∇",
  "\\hbar": "ℏ",
  "\\ell": "ℓ",
  "\\nabla": "∇",
  "\\alef": "ℵ",
  "\\subset": "⊂",
  "\\supset": "⊃",
  "\\Subset": "⋐",
  "\\forall": "∀",
  "\\therefore": "∴",
  "\\mapsto": "↦",
  "\\checkmark": "✓",
  bar: "\u02C9",
  dot: "\u02D9",
  ddot: "\u00A8",
  hat: "\u02C6",
  tilde: "\u02DC",
  vec: "\u00A0\u20D7",
  "\\land": "∧",
  "\\lor": "∨",
  "\\not": "¬",
  "\\notin": "∉",
  "\\euro": "€",
  "\\pound": "£",
  "\\yen": "¥",
  "\\o": "ø",
  "^^": "∧",
  vv: "∨",
  vvv: "⋁",
  "\\xor": "⊻",
  "\\in": "\u2208",
  "!=": "≠",
  "<>": "≠",
  ":=": "≔",
  "?=": "≟",
  "<=": "≤",
  ">=": "≥",
  "-=": "≡",
  "~=": "≅",
  "_=": "≡",
  "~~": "≈",
  "+-": "±",
  "-+": "∓",
  "<<": "\u27E8",
  ">>": "\u27E9",
  "///": "\u2215",
  "<->": "\u2194",
  "<-": "\u2190",
  "<--": "\u27F5",
  "-->": "⟶",
  "->": "→",
  "=>": "⇒",
  "<-->": "\\xrightleftarrows",
  "\\circ": "∘",
  "\\otimes": "⊗",
  "|||": "¦",
  "||": "‖",
  "/_": "∠",
  " .": "\u00B7", // half-high dot
  "''": "\u2032", // two apostrophes → prime
  '""': "\u2033" // double prime
};

const supCharFromNum = {
  "^": "",
  "-": "⁻",
  "2": "²",
  "3": "³",
  "1": "¹",
  "0": "⁰",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "(": "",
  ")": ""
};

const superscript = str => {
  let superChar = "";
  for (const ch of str) {
    superChar += supCharFromNum[ch];
  }
  return superChar
};

const lowSurrogateDiff = {
  // captital diff, lower case diff
  bb: [0xdbbf, 0xdbb9], //  bold
  bbb: [0xdcf7, 0xdcf1], // blackboard bold
  cc: [0xdc5b, 0xdc55], // calligraphic
  ff: [0xdd5f, 0xdd59] //   sans-serif
};

// 7 blackboard bold characters (ℂ, ℍ, ℕ, ℙ, ℚ, ℝ, ℤ) have Unicode code points in the
// basic multi-lingual plane. So they must be treated differently than the other
// blackboard bold characters. Eleven calligraphic characters work the same way.
const wideExceptions = [0xdd3a, 0xdd3f, 0xdd45, 0xdd47, 0xdd48, 0xdd49, 0xdd51, // bbb
  0xdc9d, 0xdca0, 0xdca1, 0xdca3, 0xdca4, 0xdca7, 0xdca8, // calligraphic
  0xdcad, 0xdcba, 0xdcbc, 0xdcc1, 0xdcc4];

const bbb = {
  C: "\u2102",
  H: "\u210D",
  N: "\u2115",
  P: "\u2119",
  Q: "\u211A",
  R: "\u211D",
  Z: "\u2124"
};
const calligraphic = {
  B: "\u212C",
  E: "\u2130",
  F: "\u2131",
  H: "\u210B",
  I: "\u2110",
  L: "\u2112",
  M: "\u2133",
  R: "\u211B",
  e: "\u212F",
  g: "\u210A",
  l: "\u2113",
  o: "\u2134"
};

const accentedChar = str => {
  const posSpace = str.indexOf(" ");
  const ch = str.substring(posSpace + 1);
  const accentName = str.substring(0, posSpace);
  switch (accentName) {
    case "bb": // bold
    case "bbb": // blackboard bold
    case "cc": // caligraphic
    case "ff": { // sans-serif
      const code = ch.charCodeAt(0);
      let newChar = "";
      if (code < 0x0041 || code > 0x007a) { return null }
      const isSmall = code < 0x005b ? 0 : 1;
      if (accentName === "cc" && isSmall && code !== 0x006c) { return null }
      if (code > 0x005a && accentName === "bbb") { return null }
      const lowSurrogate = code + lowSurrogateDiff[accentName][isSmall];
      if (wideExceptions.includes(lowSurrogate)) {
        newChar = accentName === "bbb" ? bbb[ch] : calligraphic[ch];
      } else {
        newChar = "\uD835" + String.fromCharCode(lowSurrogate);
      }
      return newChar
    }

    default:
      return null
  }
};

const autoCorrect = (jar, preText, postText) => {
  // Auto-correct math in real time.
  // jar is an instance of a CodeJar editing box.
//  const pos = doc.getCursor()
  if (preText.length > 0 && preText.slice(-1) === " ") {
    // Auto-correct only after the user hits the space bar.
    const matches = autoCorrectRegEx.exec(preText);
    if (matches) {
      const word = matches[0].slice(0, -1); // Trim the final space.
      let correction;
      const accent = accents[word];
      if (accent) {
        const newStr = preText.slice(0, -(matches[0].length + 1)) + accent;
        jar.updateCode(newStr + postText);
        // Move the cursor to the correct location
        const L = newStr.length;
        jar.restore({ start: L, end: L, dir: undefined });
      } else {
        correction = autoCorrections[word]; // Check for a match in the lookup table.
        if (!correction) {
          // No perfect match in the lookup table. Try for a superscript or an accent.
          if (word.charAt(0) === "^") {
            correction = superscript(word); // e.g. x²
          } else {
            if (word.indexOf(" ") > 0) {
              // accented char or Unicode character. E.g. bar y   or   bb M
              correction = accentedChar(word);
            }
          }
        }
      }
      if (correction) {
        const newStr = preText.slice(0, -matches[0].length) + correction;
        jar.updateCode(newStr + postText);
        // Move the cursor to the correct location
        const L = newStr.length;
        jar.restore({ start: L, end: L, dir: undefined });
      }
    }
  }
};

// unit exponents of a number with no unit.
const allZeros = Object.freeze([0, 0, 0, 0, 0, 0, 0, 0]);

// Data types
// Some operands will be two types at the same time, e.g. RATIONAL + MATRIX.
// So we'll enumerate data types in powers of two.
// That way, we can use a bit-wise "&" operator to test for an individual type.
const dt = Object.freeze({
  NULL: 0,
  RATIONAL: 1,
  COMPLEX: 2,
  BOOLEAN: 4,
  FROMCOMPARISON: 8,
  BOOLEANFROMCOMPARISON: 12, // 4 + 8, useful for chained comparisons
  STRING: 16,
  QUANTITY: 32, // Contains both a magnitude and a unit-of-measure
  DATE: 64, //     Not currently used
  RANGE: 128, //   as in:  1:10
  TUPLE: 256, //   Used for multiple assignment from a module.
  MAP: 512,  //    A key:value store with all the same data type the same unit
  ROWVECTOR: 1024,
  COLUMNVECTOR: 2048,
  MATRIX: 4096, // two dimensional
  DATAFRAME: 8192,
  MODULE: 16384, // contains user-defined functions
  ERROR: 32768,
  UNIT: 65536, // User-defined units.
  DRAWING: 131072,
  RICHTEXT: 262144
});

/*
 * Hurmet, copyright (c) by Ron Kok
 * Distributed under an MIT license: https://Hurmet.app/LICENSE.txt
 *
 * Hurmet adds calculation cells to the ProseMirror rich text editor.
 * See https://Hurmet.app and https://Hurmet.app/docs/en/manual.html
 */

// utils.js

const isIn = (item, arry) => {
  // Binary search to see if item is in an array
  // This works only if the array is pre-sorted.
  if (arry.length === 0) { return false }
  let i = 0;
  let iLow = 0;
  let iHigh = arry.length - 1;
  while (iLow < iHigh) {
    i = Math.floor((iLow + iHigh) / 2);
    if (item > arry[i]) {
      iLow = i + 1;
    } else {
      iHigh = i;
    }
  }
  return item === arry[iLow]
};

const clone = obj => {
  // Clone a JavaScript object.
  // That is, make a deep copy that does not contain any reference to the original object.
  // This function works if the object conatains only these types:
  //     boolean, number, bigint, string, null, undefined, date, array, object, Map
  // Any other type, or non-tree structure (e.g., "this"), cannot be handled by this function.
  // This is a modified version of https://stackoverflow.com/a/728694

  // Handle boolean, number, bigint, string, null, or undefined
  // eslint-disable-next-line eqeqeq
  if (null == obj || "object" != typeof obj) { return obj }

  if (obj instanceof Date) { return new Date().setTime(obj.valueOf()) }

  if (Array.isArray(obj)) {
    const copy = [];
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = clone(obj[i]);
    }
    return copy
  }

  if (obj instanceof Map) {
    const copy = new Map();
    for (const [key, value] of obj.entries()) {
      copy.set(key, clone(value));
    }
    return copy
  }

  if (typeof obj === "object") {
    const copy = Object.create(null);
    Object.entries(obj).forEach(([key, value]) => {
      copy[key] = clone(value);
    });
    return copy
  }

  throw new Error("Unable to clone obj! Its type isn't supported.")
};


// A map function for Maps
const mapMap = (map, fn) => {
  const newMap = new Map();
  for (const [key, value] of map.entries()) {
    newMap.set(key, fn(value));
  }
  return newMap
};


// A function to return an array containing all matches to a RegEx pattern.
const arrayOfRegExMatches = (regex, text) => {
  if (regex.constructor !== RegExp) { throw new Error('not RegExp') }
  const result = [];
  let match = null;

  /* eslint-disable no-cond-assign */
  if (regex.global) {
    while (match = regex.exec(text)) {
      result.push({ value: match[0], index: match.index, length: match[0].length });
    }
  } else if (match = regex.exec(text)) {
    result.push({ value: match[0], index: match.index, length: match[0].length });
  }
  /* eslint-enable no-cond-assign */

  return result
};

const textAccent = {
  "\u0300": "`",
  "\u0301": "'",
  "\u0302": "^",
  "\u0303": "~",
  "\u0304": "=",
  "\u0305": "=",
  "\u0306": "u",
  "\u0307": ".",
  "\u0308": '"',
  "\u030A": 'r',
  "\u030c": "v",
};

const escapeRegEx = /[#$&%_~^]/g;
const accentRegEx = /[\u0300-\u0308\u030A\u030c]/g;

const addTextEscapes = str => {
  // Insert escapes for # $ & % _ ~ ^ \ { }
  // TODO: \textbackslash.
  // TODO: How to escape { } without messing up Lex?
  if (str.length > 1) {
    let matches = arrayOfRegExMatches(escapeRegEx, str);
    let L = matches.length;
    if (L > 0) {
      for (let i = L - 1; i >= 0; i--) {
        const match = matches[i];
        const pos = match.index;
        if (match.value === "~") {
          str = str.slice(0, pos) + "\\textasciitilde " + str.slice(pos + 1);
        } else if (match.value === "^") {
          str = str.slice(0, pos) + "\\textasciicircum " + str.slice(pos + 1);
        } else if (pos === 0) {
          str = "\\" + str;
        } else {
          const pc = str.substr(pos - 1, 1);
          if (pc !== "\\") {
            str = str.slice(0, pos) + "\\" + str.slice(pos);
          }
        }
      }
    }
    matches = arrayOfRegExMatches(accentRegEx, str);
    L = matches.length;
    if (L > 0) {
      for (let i = L - 1; i >= 0; i--) {
        const match = matches[i];
        const pos = match.index;
        if (pos > 0) {
          str = str.slice(0, pos - 1) + "\\" + textAccent[match.value]
              + str.slice(pos - 1, pos) + str.slice(pos + 1);
        }
      }
    }
  }
  return str
};

const numeralFromSuperScript = ch => {
  // convert a superscript character, ⁰¹²³ etc, to the regular numeral equivalent.
  switch (ch) {
    case "²":
      return "2"
    case "³":
      return "3"
    case "⁻":
      return "-"
    case "¹":
      return "1"
    case "⁰":
      return "0"
    default:
      return String.fromCharCode(ch.charCodeAt(0) - 0x2040)
  }
};

// Trim spaces except for tabs. This is used to read tab-delimited CSV.
const leadingSpaceRegEx = /^[ \r\n\f]+/;
const trailingSpaceRegEx = /[ \r\n\f]+$/;
const tablessTrim = str => {
  return str.replace(leadingSpaceRegEx, "").replace(trailingSpaceRegEx, "")
};

const midDotRegEx = /^(\*|·|\.|-[A-Za-z])/;
const exponentRegEx = /[⁰¹²³\u2074-\u2079⁻]/;

const unitTeXFromString = str => {
  // I wrap a unit name with an extra pair of braces {}.
  // Tt's a hint so that plugValsIntoEcho() can easily remove a unit name.
  let unit = " {\\text{";
  let inExponent = false;

  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (exponentRegEx.test(ch)) {
      ch = numeralFromSuperScript(ch);
    }
    if (midDotRegEx.test(str.slice(i))) {
      unit += "}\\mkern1mu{\\cdot}\\mkern1mu\\text{";
    } else if (/[0-9-]/.test(ch)) {
      ch = ch === "-" ? "\\text{-}" : ch;
      if (inExponent) {
        unit += ch;
      } else {
        unit += "}^{" + ch;
        inExponent = true;
      }
    } else if (ch === "^") {
      unit += "}^{";
      inExponent = true;
    } else if (inExponent) {
      unit += "}\\text{" + ch;
      inExponent = false;
    } else if (ch === "$") {
      unit += "\\$";
    } else {
      unit += ch;
    }
  }

  return unit + "}}"
};

const errorMessages = Object.freeze({
  EN: {
    ERROR:     "Error. Hurmet does not understand the expression.",
    ERR_FUNC:  "@",
    BAD_FUN_NM:"Error. Unrecognized function name \"@\".",
    DIV:       "Error. Divide by zero.",
    NAN:       "Error. Value of $@$ is not a numeric.",
    NANARG:    "Error. Argument to function $@$ must be numeric.",
    NULL:      "Error. Missing value for $@$.", // $@$ will be italic in TeX
    V_NAME:    "Error. Variable $@$ not found.",
    F_NAME:    "Error. Function @ not found.",
    NAN_OP:    "Error. Arithmetic operation on a non-numeric value.",
    UNIT_ADD:  "Error. Adding incompatible units.",
    UNIT_COMP: "Error. Comparing incompatible units.",
    UNIT_APEND:"Error. Apppending incompatible units.",
    UNIT_RES:  "Error. Calculated units are not compatible with the desired result unit:",
    UNIT_MISS: "Error. No units specified for the result.",
    UNIT_IN:   "Error. Incorrect unit for input to function @.",
    UNIT_ARG:  "Error. Unit mis-match between arguments to function @.",
    UNIT_COL:  "Error. Data frame column @ has no units. Do not make a unit-aware call to it.",
    UNIT_AWARE: "Error. Calculation must be unit-aware in order to apply unit @",
    DATE:      "Error. Date required.",
    LOGIC:     "Error. Logic operation “@” on a non-boolean value.",
    FACT:      "Error. Factorial may be applied only to a unit-less non-negative integer.",
    PER:       "Error. Percentage may be applied only to a unit-less number.",
    BINOM:     "Error. Binomial may be applied only to unit-less numbers.",
    LOGF:      "Error. Argument to log!() must be a non-negative integer.",
    Γ0:        "Error. Γ(0) is infinite.",
    ΓPOLE:     "Error. Γ() of a negative integer is infinite.",
    LOGΓ:      "Error. Argument to Hurmet logΓ() must be a positive number.",
    TAN90:     "Error. tan($@$) is infinite.",
    ATRIG:     "Error. Input to @ must be between -1 and 1.",
    COT:       "Error. Input to @ must not be zero.",
    ASEC:      "Error. Absolute value of input to @ must be ≥ 1",
    STRING:    "Error. Text operand required.",
    NUMARGS:   "Error. Wrong number of arguments passed to function @.",
    NONSQUARE: "Error. Only a square matrix can be inverted.",
    SINGULAR:  "Error. Matrix is singular and cannot be inverted.",
    BAD_ROW_NAME:     "Error. Data frame does not have a row named @.",
    BAD_COLUMN_NAME:  "Error. Data frame does not have a column named @.",
    SINGLE_ARG:"Error. A call to a data frame must have two arguments in the brackets.",
    BAD_TYPE:  "Error. Unrecognized data type for $@$.",
    CONCAT:    "Error. Cannot add strings. Use \"&\" if concatenation is desired.",
    MATRIX_DIV:"Error. Cannot divide one matrix by another.",
    MATRIX_MOD:"Error. Cannot take the modulo of one matrix by another.",
    BAD_INDEX: "Error. Index to a matrix must be numeric.",
    FUNC_LINE: "Error in function @.",
    BAD_BREAK: "Error in function @. break called outside of a loop",
    FETCH:     "Error. A fetch() function must be the only item in its expression.",
    STR_INDEX: "Error. The index to text may be only a real number or a range.",
    UNIT_NAME: "Error. Unrecognized unit name: @",
    INT_NUM:   "Error. Number display type \"@\" must be an integer.",
    TWO_MAPS:  "Error. Both operands are maps. Hurmet accepts only one.",
    BAD_FORMAT:"Error. Invalid format @.",
    BAD_PREC:  "Error. Significant digit specification must be between 1 and 15.",
    ZERO_ROOT: "Error. Zeroth root.",
    BAD_ROOT:  "Error while taking root.",
    UNREAL:    "Error. Argument to function \"@\" must be a real number.",
    BIGINDEX:  "Error. Index too large.",
    MIS_ELNUM: "Error. Mis-matched number of elements",
    // eslint-disable-next-line max-len
    CROSS:     "Error. Cross product can be performed only on three-vectors. Use * if you want element-wise multiplication.",
    QUANT_NUM: "Error. A Quantity must include a numeric magnitude.",
    CURRENCY:  "Error. Currency exchange rates must be defined before using a monetary unit.",
    DF_UNIT:   "Invalid unit \"&\" in data frame.",
    FORM_FRAC: "Error. Hurmet can do binary or hexadecimal format only on integers.",
    PRIVATE:   "Error. Function @ is not private.",
    GCD:       "Error. The gcd function can take only integers as arguments.",
    BAD_KEY:   "Error. Data structure does not contain key \"@\".",
    NUM_KEY:   "Error. A key must be a string, not a number.",
    IMMUT_UDF: `Error. Variable @ already contains a user-defined function.
                Hurmet cannot assign a different value to @.`,
    NO_PROP:   `Error. Cannot call a property from variable "@" because it has no properties.`,
    NOT_ARRAY: `Error. Cannot check if an element is in the second operand because
 the second operand is not an array.`,
    MULT_MIS:  "Error. Mismatch in number of multiple assignment.",
    COUNT:     "Error. The count() function works only on strings.",
    NOT_VECTOR:"Error. Arguments to dataframe() must be vectors.",
    BAD_DISPLAY:"Error. Result may not be suppressed. Use '?' display selector.",
    NA_COMPL_OP:"Error. \"@\" cannot be performed on a complex number.",
    NA_REAL:    "Error. \"@\" can be performed only a complex number.",
    ORIGIN:     "Error. Function \"@\" is undefined at the origin.",
    LOG_ZERO:   "Error. Logarithm of zero is negative infinity.",
    END_MISS:   "Error. Too few END statments in function @.",
    BAD_CONCAT: "Error. Unmatched dimensions.",
    BAD_KEYSTR: "Error. The key in a key:value pair must be a string.",
    BAD_APPEND: "Error. Can not append a @",
    MAP_APPEND: "Error. Can not append. Wrong data type.",
    BAD_J:      "Error. Do not use j for a loop index. In Hurmet, j = √(-1)"
  }
});

const errorOprnd = (errorCode, messageInsert) => {
  if (errorCode === "") { return { value: "Error", unit: null, dtype: dt.ERROR } }
  let msg = errorMessages["EN"][errorCode];
  if (msg === undefined) { return { value: "Error", unit: null, dtype: dt.ERROR } }
  if (messageInsert) {
    messageInsert = addTextEscapes(messageInsert);
    msg = msg.replace(/@/g, messageInsert);
  } else {
    msg = msg.replace(/@ ?/, "");
  }
  return { value: msg, unit: null, dtype: dt.ERROR }
};

/*
 * This file implements a rational number data type.
 * Each rational number, r, is held as an array containing two BigInts.
 * r[0] is the numerator and r[1] is the denominator.
 * Negative rationals have a negative numerator, not a negative denominator.
 *
 * The code in this file is heavily influenced by Chapter 5 of
 * __How JavaScript Works__ by Douglas Crockford
 */

const iZero = BigInt(0);
const iOne = BigInt(1);
const iTwo = BigInt(2);
const zero = [iZero, iOne];
const one = [iOne, iOne];
const two = [iTwo, iOne];
const pi$1 = [BigInt(31415926535897932384626433832795028841971693993751),
  BigInt(10000000000000000000000000000000000000000000000000)];
const e$1 = [BigInt(2718281828459045235360287471352662497757247093699959574966),
  BigInt(1000000000000000000000000000000000000000000000000000000000)];
// reduced Planck constant
const hbar = [BigInt(1054571817),
  BigInt(10000000000000000000000000000000000000000000)];

const intAbs = i => i >= iZero ? i : BigInt(-1) * i;  // absolute value of a BigInt

// eslint-disable-next-line max-len
const numberPattern = "^(-?)(?:(0x[0-9A-Fa-f]+)|([0-9]+)(?: ([0-9]+)\\/([0-9]+)|(?:\\.([0-9]+))?(?:e([+-]?[0-9]+)|(%))?))";
const numberRegEx = new RegExp(numberPattern);
// Capturing groups:
//    [1] sign
//    [2] hexadecimal integer
//    [3] integer part
//    [4] numerator of a mixed fraction
//    [5] denominator of a mixed fraction
//    [6] decimal fraction of significand, not including decimal point
//    [7] exponent of a number in scientific notation
//    [8] percentage sign

const fromNumber = num => {
  // Convert a JavaScript Number to a rational.
  if (Number.isInteger(num)) {
    return [BigInt(num), iOne]
  } else {
    const parts = num.toExponential().match(numberRegEx);
    const decimalFrac = parts[6] || "";
    const exp = BigInt(parts[7]) - BigInt(decimalFrac.length);
    if (exp < 0) {
      return [BigInt(parts[1] + parts[3] + decimalFrac), BigInt(10) ** -exp]
    } else if (parts[5]) {
      const denominator = BigInt(parts[5]);
      return normalize(
        [BigInt(parts[1] + parts[3]) * denominator + BigInt(parts[4]) ])
    } else {
      return normalize([BigInt(parts[1] + parts[3] + decimalFrac) * BigInt(10) ** exp, iOne])
    }
  }
};

const fromString = str => {
  // Convert an author's input string to a number.
  const parts = str.match(numberRegEx);
  let r;
  if (parts[5]) {
    // mixed fraction
    const denominator = BigInt(parts[5]);
    const numerator = BigInt(parts[1] + parts[3]) * denominator + BigInt(parts[4]);
    r = normalize([numerator, denominator]);

  } else if (parts[2]) {
    // hexadecimal
    r = [BigInt(parts[2]), iOne];

  } else {
    // decimal
    const decimalFrac = parts[6] || "";
    const numerator = BigInt(parts[3] + decimalFrac);
    const exp = parts[7]
      ? BigInt(parts[7]) - BigInt(decimalFrac.length)  // scientific notation.
      : parts[8]
      ? BigInt(-2) - BigInt(decimalFrac.length)  // percentage.
      : BigInt(0) - BigInt(decimalFrac.length);
    r = (exp < 0)
      ? [numerator, BigInt(10) ** -exp]
      : normalize([numerator * BigInt(10) ** exp, iOne]);
  }
  if (parts[1]) { r = negate(r); }
  return r
};

const gcdi = (a, b) => {
  // Greatest common divisor of two big integers
  a = intAbs(a);
  b = intAbs(b);
  while (b !== iZero) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a
};

const gcd = (m, n) => {
  // Greatest common divisor of two rationals
  if (!Rnl.isInteger(m) || !Rnl.isInteger(n)) { return errorOprnd("GCD") }
  return [gcdi(m[0] / m[1], n[0] / n[1]), iOne]
};

const normalize = r => {
  const [numerator, denominator] = r;
  if (denominator === iOne) { return r }
  const gcD = gcdi(numerator, denominator);
  return gcD === iOne ? r : [numerator / gcD, denominator / gcD]
};

const isRational = a => {
  return Array.isArray(a) && a.length === 2
    && typeof a[0] === "bigint" && typeof a[1] === "bigint"
};

const isInteger = r => r[1] === iOne || (r[0] % r[1]) === iZero;

const isZero = r => r[0] === iZero;

const isNegative = r => r[0] < iZero;
const isPositive = r => r[0] > iZero;

const negate = r => [BigInt(-1) * r[0], r[1]];

const abs = r => {
  const numerator = r[0] < iZero ? BigInt(-1) * r[0] : r[0];
  return [numerator, r[1]]
};

const increment = r => [r[0] + r[1], r[1]];

const decrement = r => [r[0] - r[1], r[1]];

const floor = r => {
  if (r[0] % r[1] === iZero) { return [r[0] / r[1], iOne] }
  return (r[0] >= iZero)
    ? [r[0] / r[1], iOne]
    : [r[0] / r[1] - iOne, iOne]
};

const ceil = r => {
  if (r[0] % r[1] === iZero) { return [r[0] / r[1], iOne] }
  return (r[0] >= iZero)
    ? [r[0] / r[1] + iOne, iOne]
    : [r[0] / r[1], iOne]
};

const add = (a, b) => {
  return a[1] === b[1]
    ? [a[0] + b[0], a[1]]
    : normalize([a[0] * b[1] + b[0] * a[1], a[1] * b[1]])
};

const subtract = (a, b) => {
  return (a[1] === b[1])
    ? [a[0] - b[0], a[1]]
    : normalize([a[0] * b[1] - b[0] * a[1], a[1] * b[1]])
};

const multiply = (a, b) => [a[0] * b[0], a[1] * b[1]];

const divide = (a, b) => {
  let numerator = a[0] * b[1];
  let denominator = a[1] * b[0];
  if (denominator < 0) {
    // Move the negative from the denominator to the numerator.
    numerator *= BigInt(-1);
    denominator *= BigInt(-1);
  }
  return [numerator, denominator]
};

const power = (a, b) => {
  if (b[0] === iZero) {
    return [iOne, iOne]
  } else {
    b = normalize(b);
    let result;
    try {
      result = isInteger(b) && isNegative(b)
        ? [a[1] ** (BigInt(-1) * b[0]), a[0] ** (BigInt(-1) * b[0])]
        : isInteger(b)
        ? [a[0] ** b[0], a[1] ** b[0]]
        : isPositive(a) || greaterThan(b, one) || lessThan(b, negate(one))
        ? fromNumber(toNumber(a) ** toNumber(b))
        : areEqual(modulo(b, two), one)
        ? fromNumber(-1 * (-1 * toNumber(a)) ** toNumber(b))
        : errorOprnd("BAD_ROOT");
    } catch (err) {
      result = fromNumber(toNumber(a) ** toNumber(b));
    }
    return result
  }
};

const sqrt = r => fromNumber(Math.sqrt(toNumber(r)));

const exp = r => fromNumber(Math.exp(toNumber(r)));

const reciprocal = r => {
  let numerator = r[1];
  let denominator = r[0];
  if (denominator < 0) {
    numerator *= BigInt(-1);
    denominator *= BigInt(-1);
  }
  return [numerator, denominator]
};

const hypot = (a, b) => {
  // Ref: https://www.johndcook.com/blog/2010/06/02/whats-so-hard-about-finding-a-hypotenuse/
  const absA = abs(a);
  const absB = abs(b);
  const maximum = max(absA, absB);
  const minimum = min(absA, absB);
  const r = Rnl.divide(minimum, maximum);
  return Rnl.multiply(maximum, sqrt(Rnl.increment(Rnl.multiply(r, r))))
};

const modulo = (a, b) => {
  const quotient = divide(normalize(a), normalize(b));
  return [intAbs(quotient[0] % quotient[1]), iOne]
};

const areEqual = (a, b) => {
  return (a[1] === b[1])
    ? a[0] === b[0]
    : a[0] * b[1] === a[1] * b[0]
};

const lessThan = (a, b) => {
  return (isNegative(a) !== isNegative(b))
    ? isNegative(a)
    : isNegative(subtract(a, b))
};

const greaterThan = (a, b) => {
  return (isPositive(a) !== isPositive(b))
    ? isPositive(a)
    : isPositive(subtract(a, b))
};

const lessThanOrEqualTo = (a, b) => lessThan(a, b) || areEqual(a, b);

const greaterThanOrEqualTo = (a, b) => greaterThan(a, b) || areEqual(a, b);

const max = (a, b) => greaterThan(a, b) ? [a[0], a[1]] : [b[0], b[1]];

const min = (a, b) => lessThan(a, b) ? [a[0], a[1]] : [b[0], b[1]];

const cos = x => {
  return areEqual(x, divide(pi$1, two))
    ? zero
    : fromNumber(Math.cos(toNumber(x)))
};

const sin = x => fromNumber(Math.sin(toNumber(x)));

const tan = x => {
  if (areEqual(x, divide(pi$1, two))) {
    return errorOprnd("TAN90", "π/2")
  }
  return fromNumber(Math.tan(toNumber(x)))
};

const cosh = x => {
  // cosh(n) = (eⁿ + e⁻ⁿ) / 2
  const num = toNumber(x);
  return fromNumber((Math.exp(num) + Math.exp(-num)) / 2)
};

const sinh = x => {
  // sinh(n) = (eⁿ - e⁻ⁿ) / 2
  const num = toNumber(x);
  return fromNumber((Math.exp(num) - Math.exp(-num)) / 2)
};

const tanh = x => {
  // tanh(n) = (eⁿ - e⁻ⁿ) / (eⁿ + e⁻ⁿ)
  const num = toNumber(x);
  return fromNumber(
    (Math.exp(num) - Math.exp(-num)) / (Math.exp(num) + Math.exp(-num))
  )
};

const toNumber = r => {
  // Return a JavaScript Number
  const num = Number(r[0]) / Number(r[1]);  // May be imprecise.
  if (!isNaN(num) && num !== Infinity ) { return num }
  const numStr = toStringSignificant(r, 20);
  return Number(numStr)
};

const toStringSignificant = (r, numSignificantDigits) => {
  // Return a string rounded to numSignificantDigits.
  if (isZero(r)) {
    return "0"
  } else {
    const quotient = intAbs(r[0] / r[1]);
    if (quotient > 0) {
      return toString(r, numSignificantDigits - String(quotient).length)
    } else {
      const inverseQuotientLength = String(intAbs(r[1] / r[0])).length;
      return toString(r, inverseQuotientLength + numSignificantDigits - 1)
    }
  }
};

const toString = (r, numDigitsAfterDecimal) => {
  // Return a string rounded to numDigitsAfterDecimal.
  if (isZero(r)) {
    return "0"
  } else if (numDigitsAfterDecimal < 0) {
    const N = -numDigitsAfterDecimal;
    const significand = toString(divide(r, [BigInt(10) ** BigInt(N), iOne]), 0);
    return significand + "0".repeat(N)
  } else {
    const [numerator, denominator] = normalize(r);
    const quotient = numerator / denominator;
    let remainder = numerator % denominator;
    let result = String(quotient);
    if (remainder === iZero && numDigitsAfterDecimal > 0) {
      result += "." + "0".repeat(numDigitsAfterDecimal);
    } else if (remainder !== iZero) {
      remainder = intAbs(remainder);
      const newNumerator = remainder * (BigInt(10) ** BigInt(numDigitsAfterDecimal));
      let fractus = newNumerator / denominator;
      const residue = newNumerator % denominator;
      if (numDigitsAfterDecimal === 0) {
        return (intAbs(iTwo * residue) >= intAbs(denominator))
          ? String(quotient + iOne)
          : result
      }
      if (intAbs(iTwo * residue) >= intAbs(denominator)) {
        fractus = fractus + iOne;
      }
      result += "." + String(fractus).padStart(numDigitsAfterDecimal, "0");
    }
    return result
  }
};

// eslint-disable-next-line max-len
const preComputedFactorials = ["1", "1", "2", "6", "24", "120", "720", "5040", "40320", "362880", "3628800", "39916800", "479001600", "6227020800", "87178291200", "1307674368000", "20922789888000", "355687428096000", "6402373705728000", "121645100408832000", "2432902008176640000", "51090942171709440000", "1124000727777607680000", "25852016738884976640000", "620448401733239439360000", "15511210043330985984000000", "403291461126605635584000000", "10888869450418352160768000000", "304888344611713860501504000000", "8841761993739701954543616000000", "265252859812191058636308480000000", "8222838654177922817725562880000000", "263130836933693530167218012160000000", "8683317618811886495518194401280000000", "295232799039604140847618609643520000000", "10333147966386144929666651337523200000000", "371993326789901217467999448150835200000000", "13763753091226345046315979581580902400000000", "523022617466601111760007224100074291200000000", "20397882081197443358640281739902897356800000000", "815915283247897734345611269596115894272000000000", "33452526613163807108170062053440751665152000000000", "1405006117752879898543142606244511569936384000000000", "60415263063373835637355132068513997507264512000000000", "2658271574788448768043625811014615890319638528000000000", "119622220865480194561963161495657715064383733760000000000", "5502622159812088949850305428800254892961651752960000000000", "258623241511168180642964355153611979969197632389120000000000", "12413915592536072670862289047373375038521486354677760000000000", "608281864034267560872252163321295376887552831379210240000000000", "30414093201713378043612608166064768844377641568960512000000000000", "1551118753287382280224243016469303211063259720016986112000000000000", "80658175170943878571660636856403766975289505440883277824000000000000", "4274883284060025564298013753389399649690343788366813724672000000000000", "230843697339241380472092742683027581083278564571807941132288000000000000", "12696403353658275925965100847566516959580321051449436762275840000000000000", "710998587804863451854045647463724949736497978881168458687447040000000000000", "40526919504877216755680601905432322134980384796226602145184481280000000000000", "2350561331282878571829474910515074683828862318181142924420699914240000000000000", "138683118545689835737939019720389406345902876772687432540821294940160000000000000", "8320987112741390144276341183223364380754172606361245952449277696409600000000000000", "507580213877224798800856812176625227226004528988036003099405939480985600000000000000", "31469973260387937525653122354950764088012280797258232192163168247821107200000000000000", "1982608315404440064116146708361898137544773690227268628106279599612729753600000000000000", "126886932185884164103433389335161480802865516174545192198801894375214704230400000000000000", "8247650592082470666723170306785496252186258551345437492922123134388955774976000000000000000", "544344939077443064003729240247842752644293064388798874532860126869671081148416000000000000000", "36471110918188685288249859096605464427167635314049524593701628500267962436943872000000000000000", "2480035542436830599600990418569171581047399201355367672371710738018221445712183296000000000000000", "171122452428141311372468338881272839092270544893520369393648040923257279754140647424000000000000000", "11978571669969891796072783721689098736458938142546425857555362864628009582789845319680000000000000000", "850478588567862317521167644239926010288584608120796235886430763388588680378079017697280000000000000000", "61234458376886086861524070385274672740778091784697328983823014963978384987221689274204160000000000000000", "4470115461512684340891257138125051110076800700282905015819080092370422104067183317016903680000000000000000", "330788544151938641225953028221253782145683251820934971170611926835411235700971565459250872320000000000000000", "24809140811395398091946477116594033660926243886570122837795894512655842677572867409443815424000000000000000000", "1885494701666050254987932260861146558230394535379329335672487982961844043495537923117729972224000000000000000000", "145183092028285869634070784086308284983740379224208358846781574688061991349156420080065207861248000000000000000000", "11324281178206297831457521158732046228731749579488251990048962825668835325234200766245086213177344000000000000000000", "894618213078297528685144171539831652069808216779571907213868063227837990693501860533361810841010176000000000000000000", "71569457046263802294811533723186532165584657342365752577109445058227039255480148842668944867280814080000000000000000000", "5797126020747367985879734231578109105412357244731625958745865049716390179693892056256184534249745940480000000000000000000", "475364333701284174842138206989404946643813294067993328617160934076743994734899148613007131808479167119360000000000000000000", "39455239697206586511897471180120610571436503407643446275224357528369751562996629334879591940103770870906880000000000000000000", "3314240134565353266999387579130131288000666286242049487118846032383059131291716864129885722968716753156177920000000000000000000", "281710411438055027694947944226061159480056634330574206405101912752560026159795933451040286452340924018275123200000000000000000000", "24227095383672732381765523203441259715284870552429381750838764496720162249742450276789464634901319465571660595200000000000000000000", "2107757298379527717213600518699389595229783738061356212322972511214654115727593174080683423236414793504734471782400000000000000000000", "185482642257398439114796845645546284380220968949399346684421580986889562184028199319100141244804501828416633516851200000000000000000000", "16507955160908461081216919262453619309839666236496541854913520707833171034378509739399912570787600662729080382999756800000000000000000000", "1485715964481761497309522733620825737885569961284688766942216863704985393094065876545992131370884059645617234469978112000000000000000000000", "135200152767840296255166568759495142147586866476906677791741734597153670771559994765685283954750449427751168336768008192000000000000000000000", "12438414054641307255475324325873553077577991715875414356840239582938137710983519518443046123837041347353107486982656753664000000000000000000000", "1156772507081641574759205162306240436214753229576413535186142281213246807121467315215203289516844845303838996289387078090752000000000000000000000", "108736615665674308027365285256786601004186803580182872307497374434045199869417927630229109214583415458560865651202385340530688000000000000000000000", "10329978488239059262599702099394727095397746340117372869212250571234293987594703124871765375385424468563282236864226607350415360000000000000000000000", "991677934870949689209571401541893801158183648651267795444376054838492222809091499987689476037000748982075094738965754305639874560000000000000000000000", "96192759682482119853328425949563698712343813919172976158104477319333745612481875498805879175589072651261284189679678167647067832320000000000000000000000", "9426890448883247745626185743057242473809693764078951663494238777294707070023223798882976159207729119823605850588608460429412647567360000000000000000000000", "933262154439441526816992388562667004907159682643816214685929638952175999932299156089414639761565182862536979208272237582511852109168640000000000000000000000", "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"];

const factorial = (n) => {
  if (lessThan(n, [BigInt(101), iOne])) {
    return fromString(preComputedFactorials[toNumber(n)])
  } else {
    return lanczos(increment(n))
  }
};

const lanczos = xPlusOne => {
  // Lanczos approximation of Gamma function.
  // Coefficients are from 2004 PhD thesis by Glendon Pugh.
  // *An Analysis of the Lanczos Gamma Approximation*
  // The following equation is from p. 116 of the Pugh thesis:
  // Γ(x+1) ≈ 2 * √(e / π) * ((x + 10.900511 + 0.5) / e) ^ (x + 0.5) * sum
  const x = subtract(xPlusOne, one);
  const term1 = multiply(two, sqrt(divide(e$1, pi$1)));
  const term2 = power(divide(add(x, fromNumber(11.400511)), e$1), add(x, [iOne, iTwo]));

  // Coefficients from Pugh, Table 8.5
  const d = ["2.48574089138753565546e-5", "1.05142378581721974210",
    "-3.45687097222016235469", "4.51227709466894823700", "-2.98285225323576655721",
    "1.05639711577126713077", "-0.195428773191645869583", "0.0170970543404441224307",
    "-0.000571926117404305781283", "0.00000463399473359905636708",
    "-0.00000000271994908488607703910"];

  // sum = d_0 + ∑_(k=1)^10 d_k/(x+k)
  let sum = fromString(d[0]);
  for (let k = 1; k <= 10; k++) {
    sum = add(sum, divide(fromString(d[k]), add(x, fromNumber(k))));
  }

  return multiply(multiply(term1, term2), sum)
};

const Rnl = Object.freeze({
  fromNumber,
  fromString,
  normalize,
  isRational,
  isInteger,
  isZero,
  isNegative,
  isPositive,
  negate,
  abs,
  increment,
  decrement,
  exp,
  floor,
  ceil,
  add,
  subtract,
  multiply,
  divide,
  reciprocal,
  gcd,
  hbar,
  modulo,
  hypot,
  one,
  pi: pi$1,
  power,
  sqrt,
  two,
  cos,
  sin,
  tan,
  cosh,
  sinh,
  tanh,
  areEqual,
  lessThan,
  greaterThan,
  lessThanOrEqualTo,
  greaterThanOrEqualTo,
  factorial,
  lanczos,
  max,
  min,
  numberPattern,
  toNumber,
  toString,
  toStringSignificant,
  zero
});

const siPrefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k",
  "M", "G", "T", "P", "E", "Z", "Y"];

const groupByThreeRegEx = /\B(?=(\d{3})+$)/g;
const groupByFourRegEx = /\B(?=(\d{4})+$)/g;  // use sometimes in China
// Grouping as common in south Asia: 10,10,000
const groupByLakhCroreRegEx = /(\d)(?=(\d\d)+\d$)/g;

const formatRegEx = /^([beEfhkmprsStx%])?(-?[\d]+)?([j∠°])?$/;

const superscript$1 = str => {
  // Convert a numeral string to Unicode superscript characters.
  // Used for denominator in mixed fractions/
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    result += (charCode === 0x31)
      ? "¹"
      : charCode === 0x32
      ? "²"
      : charCode === 0x33
      ? "³"
      : String.fromCharCode(charCode + 0x2040);
  }
  return result
};

const subscript = str => {
  // Convert a numeral string to Unicode subscript characters.
  // Used for mixed fraction denominators.
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) + 0x2050);
  }
  return result
};

const texFromMixedFraction = (numParts) => {
  return (numParts[1] ? "-" : "") +
    numParts[3] + "\\,\\class{special-fraction}{\\text{" +
    superscript$1(numParts[4]) + "\u2044" + subscript(numParts[5]) + "}}"
};

const intAbs$1 = i => i >= BigInt(0) ? i : BigInt(-1) * i;  // absolute value of a BigInt

const roundedString = (r, spec) => {
  // Return a string rounded to the correct number of digits
  const N = spec.numDigits;

  switch (spec.ftype) {
    case "h": {
      // Round a fraction, but not an integer, to N significant digits.
      const integerStr = String(Rnl.toString(r, 0));
      if (integerStr.replace("-", "").length >= N) { return integerStr }
      if (N < 1 || N > 15) { return errorOprnd("BAD_PREC") }
      return Rnl.toNumber(r).toPrecision(N)
    }

    case "f":
    case "%":
      // Exactly N digits after the decimal.
      return Rnl.toString(r, N)

    case "r":
    case "p": {
      // Round to N significant digits
      if (N < 1 || N > 15) { return errorOprnd("BAD_PREC") }
      const numStr = Rnl.toNumber(r).toPrecision(N);
      return numStr.indexOf("e") > -1 ? Number(numStr).toPrecision() : numStr
    }

    case "s":
    case "S":
    case "e":
    case "E":
    case "n":
    case "N":
    case "k":
      // Some variety of scientific notation.
      if (N < 1 || N > 15) { return errorOprnd("BAD_PREC") }
      return Rnl.toNumber(r).toExponential(N - 1).replace("+", "")

    default: {
      r = Rnl.normalize(r);
      const sign =  Rnl.isNegative(r) ? "-" : "";
      const numerator = intAbs$1(r[0]);
      const denominator = r[1];

      switch (spec.ftype) {
        case "m": {
          // Mixed fraction
          const quotientStr = String(numerator / denominator);
          const remainder = numerator % denominator;
          return sign + quotientStr + "\u00a0" + superscript$1(remainder) +
            "⁄" + subscript(denominator)
        }

        case "t":
          // Truncate to integer
          return sign + String(numerator / denominator)

        case "b":
        case "x":
        case "X":
          // binary or hexadecimal integer
          if (denominator !== BigInt(1)) { return errorOprnd("INT_NUM", spec.ftype) }
          if (numerator <= Number.MAX_SAFE_INTEGER) {
            return (spec.ftype === "b")
              ? sign + "0b" + Number(numerator).toString(2)
              : spec.ftype === "x"
              ? sign + "0x" + Number(numerator).toString(16)
              : sign + "0x" + Number(numerator).toString(16).toUpperCase()
          } else {
            // TODO: display large hex or binary.
            return ""
          }
      }
    }
  }
};

const formattedInteger = (intStr, decimalFormat) => {
  const thousandsSeparator = decimalFormat.charAt(1);
  if (thousandsSeparator === "0") {
    return intStr
  } else if (decimalFormat === "1,00,000.") {
    return intStr.replace(groupByLakhCroreRegEx, "$1{,}")
  } else if (decimalFormat === "1,0000,0000.") {
    return intStr.replace(groupByFourRegEx, "$1{,}")
  } else {
    return intStr.replace(groupByThreeRegEx,
      (thousandsSeparator === ",")
      ? "{,}"
      : (thousandsSeparator === " ")
      ? "\\:"
      : (thousandsSeparator === "’")
      ? "’"
      : "."
    )
  }
};

const formattedDecimal = (numStr, decimalFormat, truncateTrailingZeros) => {
  const pos = numStr.indexOf(".");
  if (pos === -1) {
    return formattedInteger(numStr, decimalFormat)
  } else {
    const intStr = numStr.slice(0, pos);
    const decimalSeparator = decimalFormat.slice(-1);
    let frac = (decimalSeparator === "." ? "." : "{,}") + numStr.slice(pos + 1);
    if (truncateTrailingZeros) { frac = frac.replace(/(\.|{,})?0+$/, ""); }
    return formattedInteger(intStr, decimalFormat) + frac
  }
};

const parseFormatSpec = str => {
  // Do the RegEx once, at compile time, not every time a number is formatted.
  //
  // str ≔ "Tn", where:
  //    T = type, [bEefhkmNnprSstx%], default: "h"
  //    n = number of digits, [0-9]+, default: 15
  //
  //    Possible future additions: complex number format [√∠°]

  const match = formatRegEx.exec(str);
  if (!match) {
    const message = errorOprnd("BAD_FORMAT", str).value;
    return [str, undefined, dt.ERROR, "\\text{" + message + "}"]
  }

  let ftype = match[1] || "h";
  let N = Number(match[2] || "15");
  const ctype = match[3]  || "";

  // Check the specified number of digits
  switch (ftype) {
    case "b":
    case "x":
    case "X":
      return [str, undefined, dt.STRING, "\\text{" + ftype + ctype + "}" ]
    case "t":
      N = 0;
      break
    case "f":
    case "%":
      break
    default:
      if (N < 1 || N > 15) {
        const message = "\\text{" + errorOprnd("BAD_PREC").value + "}";
        return [str, undefined, dt.ERROR, message]
      }
  }

  if (ftype === "%") { ftype = "\\%"; }
  return [str, undefined, dt.STRING, "\\text{" + ftype + String(N) + ctype + "}" ]
};

const format = (num, specStr = "h3", decimalFormat = "1,000,000.") => {
  if (Rnl.isZero(num)) { return "0" }

  const spec = { ftype: specStr.charAt(0) };
  if (/[j∠°]$/.test(specStr)) { specStr = specStr.slice(0, -1); }
  if (specStr.length > 1) { spec.numDigits = Number(specStr.slice(1)); }

  if (spec.ftype === "%" || spec.ftype === "p") { num[0] = num[0] * BigInt(100); }

  if ((spec .ftype === "b" || spec.ftype === "x") && !Rnl.isInteger(num)) {
    return errorOprnd("FORM_FRAC")
  }

  // Round the number
  const numStr = roundedString(num, spec);

  // Add separators
  switch (spec.ftype) {
    case "f":
    case "r":
    case "h":
      return formattedDecimal(numStr, decimalFormat, spec.ftype === "h")
    case "t":
      return formattedInteger(numStr, decimalFormat)
    case "%":
    case "p":
      return formattedDecimal(numStr, decimalFormat) + "\\%"
    case "m":
    case "b":
    case "x":
    case "X":
      return numStr
    default: {
      // Some sort of scientific notation.
      const pos = numStr.indexOf("e");
      let significand = numStr.slice(0, pos);
      if (decimalFormat.slice(-1) === ",") { significand = significand.replace(".", "{,}"); }

      switch (spec.ftype) {
        case "e":
        case "E": {
          const result = significand + "\\text{" + spec.ftype;
          if (numStr.charAt(pos + 1) === "-") {
            return result + "-}" + numStr.slice(pos + 2)
          } else {
            return result + "}" + numStr.slice(pos + 1)
          }
        }

        case "s":
        case "S":
        case "n":
        case "N": {
          const op = spec.ftype === "S" ? "×" : "\\mkern2mu{\\cdot}\\mkern1mu";
          return significand + op + "10^{" + numStr.slice(pos + 1) + "}"
        }

        case "k": {
          const exponent = Number(numStr.slice(pos + 1));
          const quotient = exponent  / 3;
          const q = quotient >= 0 ? Math.floor(quotient) : Math.ceil(quotient);
          const modulo = exponent  % 3;
          if (modulo !== 0) {
            significand = String(Number(significand) * Math.pow(10, modulo));
          }
          return significand + siPrefixes[8 + q]
        }
      }
    }
  }
};

// units.js

/*
 *  Unit-aware calculation is a core feature of Hurmet.
 *  Dimensional analysis is used to verify that a calculation contains compatible units.
 *  Example: Check unit compatibility for:  L = '145 N·m'/'15.2 lbf' = ?? feet
 *  Analysis step 1: first operand:  N·m →  mass¹·length²·time⁻²
 *                   2nd  operand:  lbf →  mass¹·length¹·time⁻²
 *  Note the exponents of those two operands. When terms multiply, we add exponents.
 *  When terms divide, we subtract exponents. As in step 2, next line:
 *                   mass^(1-1)∙length^(2-1)∙time^(-2-(-2)) = mass⁰·length¹·time⁰ = length¹
 *  In the example, the exponents for mass and time both zero'd out.
 *  Only length has a non-zero exponent. In fact, the result dimension = length¹.
 *  This matches the desired result dimension (feet is a length), so this example checks out.
 *
 *  Hurmet automates this process of checking unit compatibility.
 *  Each instance of a Hurmet quantity operand contains an array of unit-checking exponents.
 *  Each element of that array contains an exponent of one of the Hurmet base dimensions.
 *  Those exponent values come from the unitTable, below.
 *
 *  The Hurmet base dimensions and standard units are, in order of array values:
 *      length (meter)
 *      mass (kg)
 *      time (second)
 *      electrical current (ampere)
 *      temperature (Kelvin)
 *      finite amount (1 unit)   (Yes, I know that SI uses a mole. That's just silly.)
 *      luminous intensity (cd)
 *      money (Euro)   (A user can redefine the default to some other currency)
 */

const unitsAreCompatible = (a, b) => {
  // Do a compatibility check on the unit-checking exponents  a and b.
  if (a == null && b == null) { return true }
  if (a == null || b == null) { return false }
  if (!Array.isArray(a) || !Array.isArray(b)) { return false }
  // Compare the exponents in the arrays.
  if (a.length !== b.length) { return false }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false }
  }
  return true
};

// JSON.parse() is faster than a big object literal
// eslint-disable-next-line max-len
const prefixFactor = JSON.parse('{"Y":1e24,"yotta":1e24,"Z":1e21,"zetta":1e21,"E":1e18,"exa":1e18,"P":1e15,"peta":1e15,"T":1e12,"tera":1e12,"G":1e9,"giga":1e9,"M":1e6,"mega":1e6,"k":1000,"kilo":1000,"h":100,"hecto":100,"deka":10,"d":0.1,"deci":0.1,"c":0.01,"centi":0.01,"m":0.001,"milli":0.001,"µ":1e-6,"\u00B5":1e-6,"micro":1e-6,"n":1e-9,"nano":1e-9,"p":1e-12,"pico":1e-12,"f":1e-15,"femto":1e-15,"a":1e-18,"atto":1e-18,"z":1e-21,"zepto":1e-21,"y":1e-24,"yocto":1e-24,"Ki":1024,"kibi":1024,"Mi":1048576,"mebi":1048576,"Gi":1073741824,"gibi":1073741824,"Ti":1099511627776,"tebi":1099511627776}');

  //  factor, numerator, denominator,  gauge, prefix|logarithm|currency, exponents
  //  exponent break-down: length, mass, time, elect, temp, amount, lum inten, money
  //  Each money factor is a revised weekly with data from the European Central Bank.
const unitTable = Object.freeze(JSON.parse(`{
"#":["0.45359237", "1","0","0",[0,1,0,0,0,0,0,0]],
"$":["1","1","0","USD",[0,0,0,0,0,0,0,1]],
"£":["1","1","0","GBP",[0,0,0,0,0,0,0,1]],
"'":["0.3048","1","0","0",[1,0,0,0,0,0,0,0]],
"A":["1","1","0","siSymbol",[0,0,0,1,0,0,0,0]],
"AUD":["1.5266","1","0","AUD",[0,0,0,0,0,0,0,1]],
"Adobe point":["0.0254","72","0","0",[1,0,0,0,0,0,0,0]],
"At":["1","1","0","siSymbol",[0,0,0,0,1,0,1,0]],
"Australian dollar":["1","1","0","AUD",[0,0,0,0,0,0,0,1]],
"BRL":["5.1075","1","0","BRL",[0,0,0,0,0,0,0,1]],
"BTU":["1055.056","1","0","0",[2,1,-2,0,0,0,0,0]],
"BThU":["1055.056","1","0","0",[2,1,-2,0,0,0,0,0]],
"Bq":["1","1","0","siSymbol",[0,0,-1,0,0,0,0,0]],
"Brazilian Real":["1","1","0","BRL",[0,0,0,0,0,0,0,1]],
"British Pound":["1","1","0","GBP",[0,0,0,0,0,0,0,1]],
"Btu":["1055.056","1","0","0",[2,1,-2,0,0,0,0,0]],
"C":["1","1","0","siSymbol",[0,0,1,1,0,0,0,0]],
"C$":["1","1","0","CAD",[0,0,0,0,0,0,0,1]],
"CAD":["1.3437","1","0","CAD",[0,0,0,0,0,0,0,1]],
"CCF":["1","1","0","0",[3,0,0,0,0,0,0,0]],
"CHF":["0.9700","1","0","CHF",[0,0,0,0,0,0,0,1]],
"CNY":["6.9715","1","0","CNY",[0,0,0,0,0,0,0,1]],
"CY":["0.764554857984","1","0","0",[3,0,0,0,0,0,0,0]],
"Calorie":["4186.8","1","0","0",[2,1,-2,0,0,0,0,0]],
"Canadian dollar":["1","1","0","CAD",[0,0,0,0,0,0,0,1]],
"Celsius":["1","1","273.15","0",[0,0,0,0,1,0,0,0]],
"Chinese Yuan":["1","1","0","CNY",[0,0,0,0,0,0,0,1]],
"Ci":["37000000000","1","0","siSymbol",[0,0,-1,0,0,0,0,0]],
"Ckm":["100000","1","0","siSymbol",[1,0,0,0,0,0,0,0]],
"Da":["1.66053872e-24","1","0","siSymbol",[0,1,0,0,0,0,0,0]],
"Dalton":["1.66053872e-24","1","0","0",[0,1,0,0,0,0,0,0]],
"Didot point":["15.625","41559","0","0",[1,0,0,0,0,0,0,0]],
"EB":["9223372036854770000","1","0","0",[0,0,0,0,0,1,0,0]],
"EMU":["0.01","360000","0","0",[1,0,0,0,0,0,0,0]],
"EUR":["1","1","0","EUR",[0,0,0,0,0,0,0,1]],
"EiB":["9223372036854770000","1","0","0",[0,0,0,0,0,1,0,0]],
"Euro":["1","1","0","EUR",[0,0,0,0,0,0,0,1]],
"F":["1","1","0","siSymbol",[-2,-1,4,2,0,0,0,0]],
"Fahrenheit":["5","9","459","0",[0,0,0,0,1,0,0,0]],
"G":["0.0001","1","0","siSymbol",[-2,-2,-2,-1,0,0,0,0]],
"GB":["8589934592","1","0","0",[0,0,0,0,0,1,0,0]],
"GBP":["0.87383","1","0","GBP",[0,0,0,0,0,0,0,1]],
"Gal":["0.01","1","0","siSymbol",[1,0,-2,0,0,0,0,0]],
"Gi":["10","12.5663706143592","0","siWord",[0,0,0,0,1,0,1,0]],
"GiB":["8589934592","1","0","0",[0,0,0,0,0,1,0,0]],
"Gregorian year":["31556952","1","0","0",[0,0,1,0,0,0,0,0]],
"Gy":["1","1","0","siSymbol",[2,0,-2,0,0,0,0,0]],
"H":["1","1","0","siSymbol",[2,1,-2,-2,0,0,0,0]],
"HK$":["1","1","0","HKD",[0,0,0,0,0,0,0,1]],
"HKD":["7.6906","1","0","HKD",[0,0,0,0,0,0,0,1]],
"HP":["745.69987158227","1","0","0",[2,1,-3,0,0,0,0,0]],
"Hong Kong dollar":["1","1","0","HKD",[0,0,0,0,0,0,0,1]],
"Hz":["1","1","0","siSymbol",[0,0,-1,0,0,0,0,0]],
"ILS":["3.4477","1","0","ILS",[0,0,0,0,0,0,0,1]],
"INR":["80.5460","1","0","INR",[0,0,0,0,0,0,0,1]],
"Indian Rupee":["1","1","0","INR",[0,0,0,0,0,0,0,1]],
"Israeli New Shekel":["1","1","0","ILS",[0,0,0,0,0,0,0,1]],
"J":["1","1","0","siSymbol",[2,1,-2,0,0,0,0,0]],
"JPY":["141.92","1","0","JPY",[0,0,0,0,0,0,0,1]],
"Japanese Yen":["1","1","0","JPY",[0,0,0,0,0,0,0,1]],
"Joule":["1","1","0","0",[2,1,-2,0,0,0,0,0]],
"Julian year":["31557600","1","0","0",[0,0,1,0,0,0,0,0]],
"Jy":["1e-26","1","0","siSymbol",[0,1,-2,0,0,0,0,0]],
"K":["1","1","0","0",[0,0,0,0,1,0,0,0]],
"KiB":["8192","1","0","0",[0,0,0,0,0,1,0,0]],
"KRW":["1381.42","1","0","KRW",[0,0,0,0,0,0,0,1]],
"L":["0.001","1","0","siSymbol",[3,0,0,0,0,0,0,0]],
"Lego stud":["0.008","1","0","siSymbol",[1,0,0,0,0,0,0,0]],
"MB":["8388608","1","0","0",[0,0,0,0,0,1,0,0]],
"MCM":["5.06707479097497e-07","1","0","0",[2,0,0,0,0,0,0,0]],
"MMBtu":["1055056000","1","0","0",[2,1,-2,0,0,0,0,0]],
"MMbbl":["158987.294928","1","0","0",[3,0,0,0,0,0,0,0]],
"MMbblpd":["158987.294928","86400","0","0",[3,0,-1,0,0,0,0,0]],
"MMscf":["28316.846592","1","0","0",[3,0,0,0,0,0,0,0]],
"MMscfd":["0.32774128","1","0","0",[3,0,0,0,0,0,0,0]],
"MT":["1000","1","0","0",[0,1,0,0,0,0,0,0]],
"MXN":["19.6430","1","0","MXN",[0,0,0,0,0,0,0,1]],
"Mach":["331.6","1","0","0",[1,0,-1,0,0,0,0,0]],
"Mbbl":["158.987294928","1","0","0",[3,0,0,0,0,0,0,0]],
"Mexican Peso":["1","1","0","MXN",[0,0,0,0,0,0,0,1]],
"MiB":["8388608","1","0","0",[0,0,0,0,0,1,0,0]],
"Mscfd":["0.00032774128","1","0","0",[3,0,0,0,0,0,0,0]],
"Mscfh":["0.00786579072","1","0","0",[3,0,0,0,0,0,0,0]],
"N":["1","1","0","siSymbol",[1,1,-2,0,0,0,0,0]],
"NM":["1852","1","0","0",[1,0,0,0,0,0,0,0]],
"PB":["9007199254740990","1","0","0",[0,0,0,0,0,1,0,0]],
"PS":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"Pa":["1","1","0","siSymbol",[-1,1,-2,0,0,0,0,0]],
"Pascal":["1","1","0","siWord",[-1,1,-2,0,0,0,0,0]],
"Pferdestärke":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"PiB":["9007199254740990","1","0","0",[0,0,0,0,0,1,0,0]],
"R":["0.000258","1","0","siSymbol",[0,-1,1,1,0,0,0,0]],
"R$":["1","1","0","BRL",[0,0,0,0,0,0,0,1]],
"RT":["3516.8532","1","0","0",[2,1,-3,0,0,0,0,0]],
"RUB":["1","1","0","RUB",[0,0,0,0,0,0,0,1]],
"S":["1","1","0","siSymbol",[-2,-1,3,2,0,0,0,0]],
"SF":["0.09290304","1","0","0",[2,0,0,0,0,0,0,0]],
"SY":["0.83612736","1","0","0",[2,0,0,0,0,0,0,0]],
"Sv":["1","1","0","siSymbol",[2,0,-2,0,0,0,0,0]],
"Swiss Franc":["1","1","0","CHF",[0,0,0,0,0,0,0,1]],
"T":["1","1","0","siSymbol",[-2,-2,-2,-1,0,0,0,0]],
"TB":["8796093022208","1","0","0",[0,0,0,0,0,1,0,0]],
"TWD":["1","1","0","TWD",[0,0,0,0,0,0,0,1]],
"TeX point":["0.0003515","1","0","0",[1,0,0,0,0,0,0,0]],
"TiB":["8796093022208","1","0","0",[0,0,0,0,0,1,0,0]],
"US$":["1","1","0","USD",[0,0,0,0,0,0,0,1]],
"USD":["0.9797","1","0","USD",[0,0,0,0,0,0,0,1]],
"V":["1","1","0","siSymbol",[2,1,-3,-1,0,0,0,0]],
"VA":["1","1","0","siSymbol",[2,1,-3,0,0,0,0,0]],
"W":["1","1","0","siSymbol",[2,1,-3,0,0,0,0,0]],
"Wb":["1","1","0","siSymbol",[2,1,-2,-1,0,0,0,0]],
"Wh":["3600","1","0","siSymbol",[2,1,-2,0,0,0,0,0]],
"Won":["1","1","0","KRW",[0,0,0,0,0,0,0,1]],
"Yen":["1","1","0","JPY",[0,0,0,0,0,0,0,1]],
"a":["31556925.9747","1","0","siSymbol",[0,0,1,0,0,0,0,0]],
"ac":["4046.8564224","1","0","0",[2,0,0,0,0,0,0,0]],
"acre":["4046.8564224","1","0","0",[2,0,0,0,0,0,0,0]],
"admiralty mile":["1853.188","1","0","0",[1,0,0,0,0,0,0,0]],
"af":["1233.48183754752","1","0","0",[3,0,0,0,0,0,0,0]],
"amp":["1","1","0","0",[0,0,0,1,0,0,0,0]],
"ampere":["1","1","0","siWord",[0,0,0,1,0,0,0,0]],
"ampere turn":["1","1","0","siWord",[0,0,0,0,1,0,1,0]],
"amu":["1.66053872e-24","1","0","0",[0,1,0,0,0,0,0,0]],
"angstrom":["0.0000000001","1","0","0",[1,0,0,0,0,0,0,0]],
"angstrom star":["0.00000000010000015","1","0","0",[1,0,0,0,0,0,0,0]],
"apostilb":["1","3.14159265358979","0","0",[-2,0,0,0,0,0,1,0]],
"arcminute":["3.14159265358979","10800","0","0",[0,0,0,0,0,0,0,0]],
"arcsecond":["3.14159265358979","648000","0","0",[0,0,0,0,0,0,0,0]],
"are":["100","1","0","0",[2,0,0,0,0,0,0,0]],
"as":["4.3.14159265358979","648000","0","0",[0,0,0,0,0,0,0,0]],
"asb":["1","3.14159265358979","0","0",[-2,0,0,0,0,0,1,0]],
"assay ton":["0.0875","3","0","0",[0,1,0,0,0,0,0,0]],
"astronomical unit":["149597870691","1","0","0",[1,0,0,0,0,0,0,0]],
"atmosphere":["101325","1","0","siSymbol",[-1,1,-2,0,0,0,0,0]],
"au":["149597870691","1","0","0",[1,0,0,0,0,0,0,0]],
"bar":["100000","1","0","siWord",[-1,1,-2,0,0,0,0,0]],
"barg":["100000","1","0","0",[-1,1,-2,0,0,0,0,0]],
"barleycorn":["0.0254","3","0","0",[1,0,0,0,0,0,0,0]],
"barrel":["0.158987294928","1","0","0",[3,0,0,0,0,0,0,0]],
"barrel bulk":["0.14158423296","1","0","0",[3,0,0,0,0,0,0,0]],
"basis point":["0.0001","1","0","0",[0,0,0,0,0,0,0,0]],
"baud":["1","1","0","siSymbol",[0,0,-1,0,0,1,0,0]],
"bbl":["0.158987294928","1","0","0",[3,0,0,0,0,0,0,0]],
"becquerel":["1","1","0","siWord",[0,0,-1,0,0,0,0,0]],
"beer barrel":["0.119240471196","1","0","0",[3,0,0,0,0,0,0,0]],
"bit":["1","1","0","0",[0,0,0,0,0,1,0,0]],
"blink":["0.864","1","0","0",[0,0,1,0,0,0,0,0]],
"bo":["0.158987294928","1","0","0",[3,0,0,0,0,0,0,0]],
"boe":["6119000000","1","0","0",[2,1,-2,0,0,0,0,0]],
"boiler horsepower":["9812.5","1","0","0",[2,1,-3,0,0,0,0,0]],
"bpd":["0.158987294928","86400","0","0",[3,0,-1,0,0,0,0,0]],
"bph":["0.158987294928","3600","0","0",[3,0,-1,0,0,0,0,0]],
"breadth":["0.2286","1","0","0",[1,0,0,0,0,0,0,0]],
"bushel":["0.03523907016688","1","0","0",[3,0,0,0,0,0,0,0]],
"byte":["8","1","0","0",[0,0,0,0,0,1,0,0]],
"caballo de vapor":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"cal":["4.1868","1","0","0",[2,1,-2,0,0,0,0,0]],
"calorie":["4.1868","1","0","siWord",[2,1,-2,0,0,0,0,0]],
"candela":["1","1","0","siWord",[0,0,0,0,0,0,1,0]],
"candlepower":["1","1","0","siWord",[0,0,0,0,0,0,1,0]],
"carat":["0.00002","1","0","0",[0,1,0,0,0,0,0,0]],
"cc":["0.000001","1","0","0",[3,0,0,0,0,0,0,0]],
"cd":["1","1","0","siSymbol",[0,0,0,0,0,0,1,0]],
"centipoise":["0.001","1","0","0",[-1,1,-1,0,0,0,0,0]],
"centistoke":["0.000001","1","0","0",[2,0,-1,0,0,0,0,0]],
"cfm":["0.0004719474432","1","0","0",[3,0,-1,0,0,0,0,0]],
"cfs":["0.028316846592","1","0","0",[3,0,-1,0,0,0,0,0]],
"ch":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"chain":["20.116","1","0","0",[1,0,0,0,0,0,0,0]],
"cheval vapeur":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"cmil":["5.06707479097497e-10","1","0","0",[2,0,0,0,0,0,0,0]],
"cmm":["0.00001","1","0","0",[1,0,0,0,0,0,0,0]],
"constant":["1","1","0","0",[0,0,0,0,0,0,0,0]],
"coulomb":["1","1","0","siWord",[0,0,1,1,0,0,0,0]],
"cp":["1","1","0","siWord",[0,0,0,0,0,0,1,0]],
"cps":["1","1","0","0",[0,0,-1,0,0,0,0,0]],
"cu ft":["0.028316846592","1","0","0",[3,0,0,0,0,0,0,0]],
"cu in":["0.000016387064","1","0","0",[3,0,0,0,0,0,0,0]],
"cu yd":["0.764554857984","1","0","0",[3,0,0,0,0,0,0,0]],
"cubic meter":["1","1","0","0",[3,0,0,0,0,0,0,0]],
"cubic metre":["1","1","0","0",[3,0,0,0,0,0,0,0]],
"cup":["0.0002365882365","1","0","0",[3,0,0,0,0,0,0,0]],
"curie":["37000000000","1","0","siWord",[0,0,-1,0,0,0,0,0]],
"cv":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"cy":["0.764554857984","1","0","0",[3,0,0,0,0,0,0,0]],
"d":["86400","1","0","0",[0,0,1,0,0,0,0,0]],
"daN":["10","1","0","0",[1,1,-2,0,0,0,0,0]],
"darcy":["0.0000000000009869233","1","0","0",[2,0,0,0,0,0,0,0]],
"day":["86400","1","0","0",[0,0,1,0,0,0,0,0]],
"deg":["3.14159265358979","180","0","0",[0,0,0,0,0,0,0,0]],
"degree":["3.14159265358979","180","0","0",[0,0,0,0,0,0,0,0]],
"dekan":["31.4159265358979","180","0","0",[0,0,0,0,0,0,0,0]],
"diopter":["1","1","0","0",[-1,0,0,0,0,0,0,0]],
"dioptre":["1","1","0","0",[-1,0,0,0,0,0,0,0]],
"dollar":["1","1","0","USD",[0,0,0,0,0,0,0,1]],
"drum":["0.20819764812","1","0","0",[3,0,0,0,0,0,0,0]],
"dscf":["0.028316846592","1","0","0",[3,0,0,0,0,0,0,0]],
"dyn":["0.00001","1","0","0",[1,1,-2,0,0,0,0,0]],
"dyne":["0.00001","1","0","0",[1,1,-2,0,0,0,0,0]],
"eV":["1.602176462e-19","1","0","0",[2,1,-2,0,0,0,0,0]],
"electric horsepower":["746","1","0","0",[2,1,-3,0,0,0,0,0]],
"electrical horsepower":["746","1","0","0",[2,1,-3,0,0,0,0,0]],
"electron volt":["1.602176462e-19","1","0","0",[2,1,-2,0,0,0,0,0]],
"erg":["0.0000001","1","0","0",[2,1,-2,0,0,0,0,0]],
"euro":["1","1","0","EUR",[0,0,0,0,0,0,0,1]],
"exabyte":["9223372036854770000","1","0","0",[0,0,0,0,0,1,0,0]],
"exbibyte":["9223372036854770000","1","0","0",[0,0,0,0,0,1,0,0]],
"farad":["1","1","0","siWord",[-2,-1,4,2,0,0,0,0]],
"faraday":["96485.339924","1","0","0",[0,0,1,1,0,0,0,0]],
"fathom":["1.8288","1","0","0",[1,0,0,0,0,0,0,0]],
"fc":["10.7639104167097","1","0","0",[-2,0,0,0,0,0,1,0]],
"feet":["0.3048","1","0","0",[1,0,0,0,0,0,0,0]],
"fermi":["0.000000000000001","1","0","siWord",[1,0,0,0,0,0,0,0]],
"fl oz":["0.003785411784","128","0","0",[3,0,0,0,0,0,0,0]],
"flop":["1","1","0","0",[0,0,-1,0,0,0,0,0]],
"fluid ounce":["0.003785411784","128","0","0",[3,0,0,0,0,0,0,0]],
"food calorie":["4186.8","1","0","0",[2,1,-2,0,0,0,0,0]],
"foot":["0.3048","1","0","0",[1,0,0,0,0,0,0,0]],
"footcandle":["10.7639104167097","1","0","0",[-2,0,0,0,0,0,1,0]],
"footlambert":["1","3.14159265358979","0","0",[-2,0,0,0,0,0,1,0]],
"fortnight":["1209600","1","0","0",[0,0,1,0,0,0,0,0]],
"fps":["0.3048","1","0","0",[1,0,-1,0,0,0,0,0]],
"franklin":["0.00000000033356","1","0","siWord",[0,0,1,1,0,0,0,0]],
"ft":["0.3048","1","0","0",[1,0,0,0,0,0,0,0]],
"ft water":["2988.874","1","0","0",[-1,1,-2,0,0,0,0,0]],
"ftc":["10.7639104167097","1","0","0",[-2,0,0,0,0,0,1,0]],
"ftl":["3.426259","1","0","0",[-2,0,0,0,0,0,1,0]],
"furlong":["201.168","1","0","0",[1,0,0,0,0,0,0,0]],
"g":["0.001","1","0","siSymbol",[0,1,0,0,0,0,0,0]],
"gal":["0.003785411784","1","0","0",[3,0,0,0,0,0,0,0]],
"galileo":["0.01","1","0","siWord",[1,0,-2,0,0,0,0,0]],
"gallon":["0.003785411784","1","0","0",[3,0,0,0,0,0,0,0]],
"gauss":["0.0001","1","0","siSymbol",[-2,-2,-2,-1,0,0,0,0]],
"gigabyte":["8589934592","1","0","0",[0,0,0,0,0,1,0,0]],
"gilbert":["10","12.5663706143592","0","siWord",[0,0,0,0,1,0,1,0]],
"gill":["0.003785411784","32","0","0",[3,0,0,0,0,0,0,0]],
"gon":["3.14159265358979","200","0","0",[0,0,0,0,0,0,0,0]],
"gongjin":["1","1","0","siSymbol",[0,1,0,0,0,0,0,0]],
"gongli":["1000","1","0","siSymbol",[1,0,0,0,0,0,0,0]],
"gpd":["0.003785411784","86400","0","0",[3,0,-1,0,0,0,0,0]],
"gph":["0.003785411784","3600","0","0",[3,0,-1,0,0,0,0,0]],
"gpm":["0.003785411784","60","0","0",[3,0,-1,0,0,0,0,0]],
"gps":["0.003785411784","1","0","0",[3,0,-1,0,0,0,0,0]],
"gr":["0.00006479891","1","0","0",[0,1,0,0,0,0,0,0]],
"grad":["3.14159265358979","200","0","0",[0,0,0,0,0,0,0,0]],
"grain":["0.00006479891","1","0","0",[0,1,0,0,0,0,0,0]],
"gram":["0.001","1","0","0",[0,1,0,0,0,0,0,0]],
"gramme":["0.001","1","0","0",[0,1,0,0,0,0,0,0]],
"gray":["1","1","0","0",[2,0,-2,0,0,0,0,0]],
"great year":["814000000000","1","0","0",[0,0,1,0,0,0,0,0]],
"gsm":["0.001","1","0","0",[-2,1,0,0,0,0,0,0]],
"gutenberg":["0.0254","7200","0","0",[1,0,0,0,0,0,0,0]],
"gōngjin":["1","1","0","siSymbol",[0,1,0,0,0,0,0,0]],
"gōngli":["1000","1","0","siSymbol",[1,0,0,0,0,0,0,0]],
"h":["3600","1","0","0",[0,0,1,0,0,0,0,0]],
"ha":["10000","1","0","siSymbol",[2,0,0,0,0,0,0,0]],
"hand":["0.1016","1","0","0",[1,0,0,0,0,0,0,0]],
"hectare":["10000","1","0","siWord",[2,0,0,0,0,0,0,0]],
"helek":["10","3","0","0",[0,0,1,0,0,0,0,0]],
"hemisphere":["6.28318530717959","1","0","0",[0,0,0,0,0,0,0,0]],
"henrie":["1","1","0","siWord",[2,1,-2,-2,0,0,0,0]],
"henry":["1","1","0","siWord",[2,1,-2,-2,0,0,0,0]],
"hertz":["1","1","0","siWord",[0,0,-1,0,0,0,0,0]],
"hk":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"horsepower":["745.69987158227","1","0","0",[2,1,-3,0,0,0,0,0]],
"hour":["3600","1","0","0",[0,0,1,0,0,0,0,0]],
"hp":["745.69987158227","1","0","0",[2,1,-3,0,0,0,0,0]],
"hpE":["746","1","0","0",[2,1,-3,0,0,0,0,0]],
"hpI":["745.69987158227","1","0","0",[2,1,-3,0,0,0,0,0]],
"hpM":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"hpS":["9812.5","1","0","0",[2,1,-3,0,0,0,0,0]],
"hr":["3600","1","0","0",[0,0,1,0,0,0,0,0]],
"in":["0.0254","1","0","0",[1,0,0,0,0,0,0,0]],
"in Hg":["3863.8","1","0","0",[-1,1,-2,0,0,0,0,0]],
"inch":["0.0254","1","0","0",[1,0,0,0,0,0,0,0]],
"inche":["0.0254","1","0","0",[1,0,0,0,0,0,0,0]],
"jansky":["1e-26","1","0","0",[0,1,-2,0,0,0,0,0]],
"jar":["1","900000000","0","0",[-2,-1,4,2,0,0,0,0]],
"joule":["1","1","0","0",[2,1,-2,0,0,0,0,0]],
"k":["4448.2216152605","1","0","0",[1,1,-2,0,0,0,0,0]],
"kB":["8192","1","0","0",[0,0,0,0,0,1,0,0]],
"kB":["8192","1","0","0",[0,0,0,0,0,1,0,0]],
"kairi":["1852","1","0","0",[1,0,0,0,0,0,0,0]],
"kanal":["505.8570528","1","0","0",[2,0,0,0,0,0,0,0]],
"katal":["6.02214179e+23","1","0","siWord",[0,0,-1,0,0,1,0,0]],
"kcal":["4186.8","1","0","0",[2,1,-2,0,0,0,0,0]],
"kcmil":["5.06707479097497e-07","1","0","0",[2,0,0,0,0,0,0,0]],
"keg":["0.058673882652","1","0","0",[3,0,0,0,0,0,0,0]],
"kelvin":["1","1","0","0",[0,0,0,0,1,0,0,0]],
"kgf":["9.80665","1","0","0",[1,1,-2,0,0,0,0,0]],
"kilo":["1","1","0","0",[0,1,0,0,0,0,0,0]],
"kilobyte":["8192","1","0","0",[0,0,0,0,0,1,0,0]],
"kilogram":["1","1","0","0",[0,1,0,0,0,0,0,0]],
"kilogramme":["1","1","0","0",[0,1,0,0,0,0,0,0]],
"kilopond":["9.80665","1","0","0",[1,1,-2,0,0,0,0,0]],
"kip":["4448.2216152605","1","0","0",[1,1,-2,0,0,0,0,0]],
"klf":["4448.2216152605","0.3048","0","0",[0,1,-2,0,0,0,0,0]],
"kn":["1852","3600","0","0",[1,0,-1,0,0,0,0,0]],
"knot":["1852","3600","0","0",[1,0,-1,0,0,0,0,0]],
"kp":["9.80665","1","0","0",[1,1,-2,0,0,0,0,0]],
"kpf":["4448.2216152605","0.3048","0","0",[0,1,-2,0,0,0,0,0]],
"kph":["1000/3600","1","0","0",[1,0,-1,0,0,0,0,0]],
"kpph":["1000/3600","1","0","0",[-1,1,-3,0,0,0,0,0]],
"ks":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"ksf":["47880.2589803358","1","0","0",[-1,1,-2,0,0,0,0,0]],
"ksi":["6894757.29316836","1","0","0",[-1,1,-2,0,0,0,0,0]],
"kwh":["3600000","1","0","0",[2,1,-2,0,0,0,0,0]],
"l":["0.001","1","0","siSymbol",[3,0,0,0,0,0,0,0]],
"lambert":["10000","3.14159265358979","0","0",[-2,0,0,0,0,0,1,0]],
"lb":["0.45359237","1","0","0",[0,1,0,0,0,0,0,0]],
"lbf":["4.4482216152605","1","0","0",[1,1,-2,0,0,0,0,0]],
"lbm":["0.45359237","1","0","0",[0,1,0,0,0,0,0,0]],
"league":["5556","1","0","0",[1,0,0,0,0,0,0,0]],
"lf":["0.3048","1","0","0",[1,0,0,0,0,0,0,0]],
"li":["500","1","0","0",[1,0,0,0,0,0,0,0]],
"light year":["9460730472580800","1","0","0",[1,0,0,0,0,0,0,0]],
"link":["0.201168","1","0","0",[1,0,0,0,0,0,0,0]],
"liter":["0.001","1","0","siWord",[3,0,0,0,0,0,0,0]],
"litre":["0.001","1","0","siWord",[3,0,0,0,0,0,0,0]],
"lm":["1","1","0","siSymbol",[0,0,0,0,0,0,1,0]],
"long ton":["1016.0469088","1","0","0",[0,1,0,0,0,0,0,0]],
"lt":["1016.0469088","1","0","0",[0,1,0,0,0,0,0,0]],
"ltpd":["0.0117598021851852","1","0","0",[0,1,-1,0,0,0,0,0]],
"lumen":["1","1","0","siWord",[0,0,0,0,0,0,1,0]],
"lunar day":["89416.32","1","0","0",[0,0,1,0,0,0,0,0]],
"lunar month":["2551442.976","1","0","0",[0,0,1,0,0,0,0,0]],
"lux":["1","1","0","siWord",[-2,0,0,0,0,0,1,0]],
"lx":["1","1","0","siSymbol",[-2,0,0,0,0,0,1,0]],
"m":["1","1","0","siSymbol",[1,0,0,0,0,0,0,0]],
"mD":["9.869233e-16","1","0","0",[2,0,0,0,0,0,0,0]],
"marathon":["42195","1","0","0",[1,0,0,0,0,0,0,0]],
"marla":["25.29285264","1","0","0",[2,0,0,0,0,0,0,0]],
"mas":["3.14159265358979","648000000","0","0",[0,0,0,0,0,0,0,0]],
"maxwell":["0.00000001","1","0","siSymbol",[2,1,-2,-1,0,0,0,0]],
"mb":["100","1","0","0",[-1,1,-2,0,0,0,0,0]],
"megabyte":["8388608","1","0","0",[0,0,0,0,0,1,0,0]],
"megaton TNT":["4184000000000000","1","0","0",[2,1,-2,0,0,0,0,0]],
"megatons TNT":["4184000000000000","1","0","0",[2,1,-2,0,0,0,0,0]],
"megohm":["1000000","1","0","0",[2,1,-3,-2,0,0,0,0]],
"meter":["1","1","0","siWord",[1,0,0,0,0,0,0,0]],
"metre":["1","1","0","siWord",[1,0,0,0,0,0,0,0]],
"metric horsepower":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"metric ton":["1000","1","0","0",[0,1,0,0,0,0,0,0]],
"mgd":["3785.411784","86400","0","0",[3,0,-1,0,0,0,0,0]],
"mho":["1","1","0","0",[-2,-1,3,2,0,0,0,0]],
"mi":["1609.344","1","0","0",[1,0,0,0,0,0,0,0]],
"mil":["0.0000254","1","0","0",[1,0,0,0,0,0,0,0]],
"mile":["1609.344","1","0","0",[1,0,0,0,0,0,0,0]],
"min":["60","1","0","0",[0,0,1,0,0,0,0,0]],
"minute":["60","1","0","0",[0,0,1,0,0,0,0,0]],
"moa":["3.14159265358979","10800","0","0",[0,0,0,0,0,0,0,0]],
"mol":["6.02214179e+23","1","0","0",[0,0,0,0,0,1,0,0]],
"mole":["6.02214179e+23","1","0","0",[0,0,0,0,0,1,0,0]],
"mpg":["1609.344","0.003785411784","0","0",[-2,0,0,0,0,0,0,0]],
"mph":["0.44704","1","0","0",[1,0,-1,0,0,0,0,0]],
"mt":["1000","1","0","0",[0,1,0,0,0,0,0,0]],
"nautical mile":["1852","1","0","0",[1,0,0,0,0,0,0,0]],
"newton":["1","1","0","0",[1,1,-2,0,0,0,0,0]],
"nit":["1","1","0","0",[-2,0,0,0,0,0,1,0]],
"ohm":["1","1","0","siWord",[2,1,-3,-2,0,0,0,0]],
"ounce":["0.45359237","16","0","0",[0,1,0,0,0,0,0,0]],
"oz":["0.45359237","16","0","0",[0,1,0,0,0,0,0,0]],
"oz t":["0.0311034768","1","0","0",[0,1,0,0,0,0,0,0]],
"parsec":["30856780000000000","1","0","0",[1,0,0,0,0,0,0,0]],
"pc":["0.0254","6","0","0",[1,0,0,0,0,0,0,0]],
"pcf":["4.4482216152605","0.028316846592","0","0",[-2,1,-2,0,0,0,0,0]],
"pci":["4.4482216152605","0.000016387064","0","0",[-2,1,-2,0,0,0,0,0]],
"pebibyte":["9007199254740990","1","0","0",[0,0,0,0,0,1,0,0]],
"peck":["0.00880976754172","1","0","0",[3,0,0,0,0,0,0,0]],
"perfect ream":["516","1","0","0",[0,0,0,0,0,1,0,0]],
"person":["1","1","0","0",[0,0,0,0,0,1,0,0]],
"petabyte":["9007199254740990","1","0","0",[0,0,0,0,0,1,0,0]],
"pfd":["0.5","1","0","0",[0,1,0,0,0,0,0,0]],
"pferdestärke":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"pfund":["0.5","1","0","0",[0,1,0,0,0,0,0,0]],
"phot":["10000","1","0","0",[-2,0,0,0,0,0,1,0]],
"pica":["0.0254","6","0","0",[1,0,0,0,0,0,0,0]],
"pied du roi":["9000","27706","0","0",[1,0,0,0,0,0,0,0]],
"pieze":["1000","1","0","0",[-1,1,-2,0,0,0,0,0]],
"pint":["0.000473176473","1","0","0",[3,0,0,0,0,0,0,0]],
"pk":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"platonic year":["814000000000","1","0","0",[0,0,1,0,0,0,0,0]],
"plf":["4.4482216152605","0.3048","0","0",[0,1,-2,0,0,0,0,0]],
"point":["0.0254","72","0","0",[1,0,0,0,0,0,0,0]],
"poise":["0.1","1","0","siWord",[-1,1,-1,0,0,0,0,0]],
"pound":["0.45359237","1","0","0",[0,1,0,0,0,0,0,0]],
"poundal":["4.4482216152605","32.174","0","0",[1,1,-2,0,0,0,0,0]],
"ppm":["0.000001","1","0","0",[0,0,0,0,0,0,0,0]],
"ppmdv":["0.000001","1","0","0",[0,0,0,0,0,0,0,0]],
"ppmv":["0.000001","1","0","0",[0,0,0,0,0,0,0,0]],
"ppmw":["0.000001","1","0","0",[0,0,0,0,0,0,0,0]],
"printer's point":["0.0003515","1","0","0",[1,0,0,0,0,0,0,0]],
"printer's ream":["516","1","0","0",[0,0,0,0,0,1,0,0]],
"ps":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"psf":["4.4482216152605","0.09290304","0","0",[-1,1,-2,0,0,0,0,0]],
"psi":["4.4482216152605","0.00064516","0","0",[-1,1,-2,0,0,0,0,0]],
"psia":["6894.75729316836","1","0","0",[-1,1,-2,0,0,0,0,0]],
"psig":["6894.75729316836","1","14.6959","0",[-1,1,-2,0,0,0,0,0]],
"px":["0.0254","96","0","0",[1,0,0,0,0,0,0,0]],
"pz":["1000","1","0","0",[-1,1,-2,0,0,0,0,0]],
"quart":["0.003785411784","4","0","0",[3,0,0,0,0,0,0,0]],
"quire":["25","1","0","0",[0,0,0,0,0,1,0,0]],
"rad":["1","1","0","0",[0,0,0,0,0,0,0,0]],
"radian":["1","1","0","0",[0,0,0,0,0,0,0,0]],
"rankin":["5","9","0","0",[0,0,0,0,1,0,0,0]],
"rd":["0.01","1","0","siSymbol",[2,0,-2,0,0,0,0,0]],
"real":["1","1","0","BRL",[0,0,0,0,0,0,0,1]],
"ream":["500","1","0","0",[0,0,0,0,0,1,0,0]],
"rem":["0.01","1","0","siSymbol",[2,0,-2,0,0,0,0,0]],
"rev":["6.28318530717959","1","0","0",[0,0,0,0,0,0,0,0]],
"rod":["5.0292","1","0","0",[1,0,0,0,0,0,0,0]],
"roentgen":["0.000258","1","0","siWord",[0,-1,1,1,0,0,0,0]],
"rpm":["6.28318530717959","3600","0","0",[0,0,-1,0,0,0,0,0]],
"ruble":["1","1","0","RUB",[0,0,0,0,0,0,0,1]],
"röntgen":["0.000258","1","0","siWord",[0,-1,1,1,0,0,0,0]],
"s":["1","1","0","siSymbol",[0,0,1,0,0,0,0,0]],
"saltspoon":["0.003785411784","3072","0","0",[3,0,0,0,0,0,0,0]],
"scf":["0.028316846592","1","0","0",[3,0,0,0,0,0,0,0]],
"scfd":["0.028316846592","86400","0","0",[3,0,-1,0,0,0,0,0]],
"scfh":["0.028316846592","3600","0","0",[3,0,-1,0,0,0,0,0]],
"scfm":["0.028316846592","60","0","0",[3,0,-1,0,0,0,0,0]],
"sea mile":["1852","1","0","0",[1,0,0,0,0,0,0,0]],
"sec":["1","1","0","0",[0,0,1,0,0,0,0,0]],
"second":["1","1","0","0",[0,0,1,0,0,0,0,0]],
"section":["2589988.110336","1","0","0",[2,0,0,0,0,0,0,0]],
"sennight":["604800","1","0","0",[0,0,1,0,0,0,0,0]],
"sheet":["1","1","0","0",[0,0,0,0,0,1,0,0]],
"short ream":["480","1","0","0",[0,0,0,0,0,1,0,0]],
"short ton":["907.18474","1","0","0",[0,1,0,0,0,0,0,0]],
"siemen":["1","1","0","siWord",[-2,-1,3,2,0,0,0,0]],
"sievert":["1","1","0","siWord",[2,0,-2,0,0,0,0,0]],
"slinch":["175.126835246477","1","0","0",[0,1,0,0,0,0,0,0]],
"slug":["14.5939029372064","1","0","0",[0,1,0,0,0,0,0,0]],
"smoot":["1.7018","1","0","0",[0,1,0,0,0,0,0,0]],
"span":["0.2286","1","0","0",[1,0,0,0,0,0,0,0]],
"sphere":["12.5663706143592","1","0","0",[0,0,0,0,0,0,0,0]],
"sq ft":["0.09290304","1","0","0",[2,0,0,0,0,0,0,0]],
"sq in":["0.00064516","1","0","0",[2,0,0,0,0,0,0,0]],
"sq km":["1000000","1","0","0",[2,0,0,0,0,0,0,0]],
"sq mi":["2589988.110336","1","0","0",[2,0,0,0,0,0,0,0]],
"sq yd":["0.83612736","1","0","0",[2,0,0,0,0,0,0,0]],
"square degree":["0.000304617419786709","1","0","0",[0,0,0,0,0,0,0,0]],
"square meter":["1","1","0","0",[2,0,0,0,0,0,0,0]],
"square metre":["1","1","0","0",[2,0,0,0,0,0,0,0]],
"square mi":["2589988.110336","1","0","0",[2,0,0,0,0,0,0,0]],
"sr":["1","1","0","siSymbol",[0,0,0,0,0,0,0,0]],
"ssp":["0.003785411784","3072","0","0",[3,0,0,0,0,0,0,0]],
"standard volume":["22.414","1","0","0",[3,0,0,0,0,0,0,0]],
"statampere":["0.00000000033356","1","0","0",[0,0,0,1,0,0,0,0]],
"statcoulomb":["0.00000000033356","1","0","0",[0,0,1,1,0,0,0,0]],
"statfarad":["0.0000000000011126","1","0","0",[-2,-1,4,2,0,0,0,0]],
"stathenrie":["898760000000","1","0","0",[2,1,-2,-2,0,0,0,0]],
"stathenry":["898760000000","1","0","0",[2,1,-2,-2,0,0,0,0]],
"statohm":["898760000000","1","0","0",[2,1,-3,-2,0,0,0,0]],
"statvolt":["299.79","1","0","0",[2,1,-3,-1,0,0,0,0]],
"statwatt":["0.0000001","1","0","0",[2,1,-3,0,0,0,0,0]],
"steam horsepower":["9812.5","1","0","0",[2,1,-3,0,0,0,0,0]],
"steradian":["1","1","0","0",[0,0,0,0,0,0,0,0]],
"stere":["1","1","0","0",[3,0,0,0,0,0,0,0]],
"stoke":["0.0001","1","0","0",[2,0,-1,0,0,0,0,0]],
"stone":["6.35029318","1","0","0",[0,1,0,0,0,0,0,0]],
"stpd":["0.0104998233796296","1","0","0",[0,1,-1,0,0,0,0,0]],
"stunde":["3600","1","0","0",[0,0,1,0,0,0,0,0]],
"survey feet":["1200","3937","0","0",[1,0,0,0,0,0,0,0]],
"survey foot":["1200","3937","0","0",[1,0,0,0,0,0,0,0]],
"Sv":["1","1","0","siSymbol",[2,0,-2,0,0,0,0,0]],
"sverdrup":["1000000","1","0","0",[3,0,-1,0,0,0,0,0]],
"sym":["1","1","0","siSymbol",[0,0,0,0,0,1,0,0]],
"tablespoon":["0.003785411784","256","0","0",[3,0,0,0,0,0,0,0]],
"tbsp":["0.003785411784","256","0","0",[3,0,0,0,0,0,0,0]],
"teaspoon":["0.003785411784","768","0","0",[3,0,0,0,0,0,0,0]],
"tebibyte":["8796093022208","1","0","0",[0,0,0,0,0,1,0,0]],
"terabyte":["8796093022208","1","0","0",[0,0,0,0,0,1,0,0]],
"tesla":["1","1","0","siSymbol",[-2,-2,-2,-1,0,0,0,0]],
"therm":["105480400","1","0","0",[2,1,-2,0,0,0,0,0]],
"tidal day":["89416.32","1","0","0",[0,0,1,0,0,0,0,0]],
"ton":["907.18474","1","0","0",[0,1,0,0,0,0,0,0]],
"tonf":["8896.443230521","1","0","0",[1,1,-2,0,0,0,0,0]],
"ton TNT":["4184000000","1","0","0",[2,1,-2,0,0,0,0,0]],
"ton refrigeration":["3516.8532","1","0","0",[2,1,-3,0,0,0,0,0]],
"tonne":["1000","1","0","0",[0,1,0,0,0,0,0,0]],
"tons TNT":["4184000000","1","0","0",[2,1,-2,0,0,0,0,0]],
"tons refrigeration":["3516.8532","1","0","0",[2,1,-3,0,0,0,0,0]],
"township":["93239571.972096","1","0","0",[2,0,0,0,0,0,0,0]],
"toz":["0.0311034768","1","0","0",[0,1,0,0,0,0,0,0]],
"tpy":["0.0000287475400032297","1","0","0",[0,1,-1,0,0,0,0,0]],
"tropical year":["31556925.9747","1","0","0",[0,0,1,0,0,0,0,0]],
"troy ounce":["0.0311034768","1","0","0",[0,1,0,0,0,0,0,0]],
"tsp":["0.003785411784","768","0","0",[3,0,0,0,0,0,0,0]],
"turn":["6.28318530717958","1","0","0",[0,0,0,0,0,0,0,0]],
"twip":["0.0254","1440","0","0",[1,0,0,0,0,0,0,0]],
"unit":["1","1","0","0",[0,0,0,0,0,1,0,0]],
"vapeur":["735.49875","1","0","0",[2,1,-3,0,0,0,0,0]],
"var":["1","1","0","siSymbol",[2,1,-3,0,0,0,0,0]],
"varistor":["1","1","0","siWord",[2,1,-3,0,0,0,0,0]],
"volt":["1","1","0","siWord",[2,1,-3,-1,0,0,0,0]],
"watt":["1","1","0","siWord",[2,1,-3,0,0,0,0,0]],
"weber":["1","1","0","siSymbol",[2,1,-2,-1,0,0,0,0]],
"week":["604800","1","0","0",[0,0,1,0,0,0,0,0]],
"won":["1","1","0","KRW",[0,0,0,0,0,0,0,1]],
"wppm":["0.000001","1","0","0",[0,0,0,0,0,0,0,0]],
"yard":["0.9144","1","0","0",[1,0,0,0,0,0,0,0]],
"yd":["0.9144","1","0","0",[1,0,0,0,0,0,0,0]],
"year":["31556952","1","0","0",[0,0,1,0,0,0,0,0]],
"yen":["1","1","0","JPY",[0,0,0,0,0,0,0,1]],
"£":["1","1","0","GBP",[0,0,0,0,0,0,0,1]],
"¥":["1","1","0","JPY",[0,0,0,0,0,0,0,1]],
"°":["3.14159265358979","180","0","0",[0,0,0,0,0,0,0,0]],
"°C":["1","1","273.15","0",[0,0,0,0,1,0,0,0]],
"°F":["5","9","459","0",[0,0,0,0,1,0,0,0]],
"°K":["1","1","0","0",[0,0,0,0,1,0,0,0]],
"°R":["5","9","0","0",[0,0,0,0,1,0,0,0]],
"°R":["5","9","0","0",[0,0,0,0,1,0,0,0]],
"Å":["0.0000000001","1","0","0",[1,0,0,0,0,0,0,0]],
"Ω":["1","1","0","siSymbol",[2,1,-3,-2,0,0,0,0]],
"”":["0.0254","1","0","0",[1,0,0,0,0,0,0,0]],
"₨":["1","1","0","INR",[0,0,0,0,0,0,0,1]],
"₪":["1","1","0","ILS",[0,0,0,0,0,0,0,1]],
"€":["1","1","0","EUR",[0,0,0,0,0,0,0,1]],
"℃":["1","1","273.15","0",[0,0,0,0,1,0,0,0]],
"℉":["5","9","459","0",[0,0,0,0,1,0,0,0]],
"Ω":["1","1","0","siSymbol",[2,1,-3,-2,0,0,0,0]],
"K":["1","1","0","0",[0,0,0,0,1,0,0,0]],
"Å":["0.0000000001","1","0","0",[1,0,0,0,0,0,0,0,0]]
}`));

const synonyms = Object.freeze({
  "$": "USD",
  "US$": "USD",
  "dollar": "USD",
  "A$": "AUD",
  "Australian dollar": "AUD",
  "Brazilian Real": "BRL",
  "real": "BRL",
  "R$": "BRL",
  "British Pound": "GBP",
  "£": "GBP",
  "C$": "CAD",
  "Canadian dollar": "CAD",
  "Chinese Yuan": "CNY",
  "€": "EUR",
  "Euro": "EUR",
  "euro": "EUR",
  "HK$": "HKD",
  "Hong Kong dollar":"HKD",
  "Indian Rupee": "IDR",
  "₨": "IDR",
  "Israeli New Shekel": "ILS",
  "₪": "ILS",
  "Mexican Peso": "MXN",
  "Swiss Franc": "CHF",
  "Won": "KRW",
  "won": "KRW",
  "yen": "JPY",
  "Yen": "JPY",
  "Japanese Yen": "JPY",
  "¥": "JPY"
});

const unitFromWord = (inputStr, currencies, customUnits) => {
  const str = inputStr.trim();
  const L = str.length;
  const u = {
    name: str,
    factor: Rnl.one,
    gauge: Rnl.zero,
    log: "",
    expos: [0, 0, 0, 0, 0, 0, 0, 0]
  };
  if (inputStr === "") { return u }
  let word = "";
  let unitArray;
  let doTheSearch = false;
  let prefix = "";
  let gotSiPrefixUnit = false;
  let gotMatch = false;

  for (let iPass = 1; iPass < 3; iPass++) {
    if (iPass === 1) {
      // The first pass will search with the assumption of no short-form SI prefix.
      // We will, however, check for a long form SI prefix if the word is long enough.

      doTheSearch = true;
      word = str;

      // Translate plural to signular
      if (L > 2) {
        if (word.charAt(word.length - 1) === "s") {
          if (!(word === "cfs" || (L === 3 & word.charAt(1) === "p"))) {
            word = word.slice(0, -1);
          }
        }
      }

      let prefix = "";
      if (L > 3) {
        const match = /^(yotta|zetta|exa|peta|tera|giga|mega|kilo|hecto|deka|deci|centi|milli|micro|nano|pico|femto|atto|zepto|yocto)/.exec(word);
        if (match) {
          prefix = match[0].value;
          doTheSearch = true;
          word = word.slice(prefix.length);
        }
      }
    } else {
      // We're in the second pass. Try an SI short-form prefix.
      doTheSearch = false;
      prefix = word.charAt(0);
      if ("YZEPTGMkhdcmnpfazyµμ".indexOf(prefix) > -1) {
        doTheSearch = true;
        word = word.substring(1);
      }
    }

    if ((customUnits) && (Object.hasOwnProperty.call(customUnits.value.columnMap, word))) {
      // User-defined unit
      const n = customUnits.value.columnMap[word];
      const baseUnit = customUnits.unit[customUnits.value.units[n]];
      u.factor = Rnl.multiply(Rnl.fromString(customUnits.value.data[n][0]), baseUnit.factor);
      u.expos = baseUnit.expos;
      return u
    }

    if (doTheSearch) {
      unitArray = unitTable[word];
      if (unitArray) { gotMatch = true; }
      if (iPass === 1 && gotMatch && prefix === "") {
        break
      } else if (gotMatch) {
        if (iPass === 1) {
          gotMatch = (unitArray[3] === "siWord");
          gotSiPrefixUnit = true;
          break
        } else {
          gotMatch = (unitArray[3] === "siSymbol");
          gotSiPrefixUnit = true;
        }
      }
    }
  }

  if (gotMatch) {
    u.gauge = Rnl.fromString(unitArray[2]);
    u.expos = Object.freeze(unitArray[4]);
    if (u.expos[7] === 1) {
      const currencyCode = (synonyms[word] ? synonyms[word] : word);
      if (currencies && currencies.value.has(currencyCode)) {
        // User defined currency exchange rate.
        u.factor = Rnl.reciprocal(currencies.value.get(currencyCode));
      } else {
        // Read the line whose key is the standard 3-letter currency code.
        unitArray = unitTable[currencyCode];
        if (unitArray[0] === "0") {
          return errorOprnd("CURRENCY")
        } else {
          u.factor = Rnl.reciprocal(Rnl.fromString(unitArray[0]));
        }
      }
    } else {
      // TODO: Change factor table to integers and use BigInt() instead of Rnl.fromString
      u.factor = Rnl.divide(Rnl.fromString(unitArray[0]), Rnl.fromString(unitArray[1]));
    }

    if (gotSiPrefixUnit) {
      u.factor =  Rnl.multiply(u.factor, Rnl.fromNumber(prefixFactor[prefix]));
    }

    // TODO: Logarithmic units like dB or EMM
//    const misc = unitArray[3] // SI prefix, or logarithm data, or 3-letter currency code
//    if (misc === "10") {
//      u.log = "°"
//    } else if (misc === "10+")  {
//      u.log = "10+" + " " + u.gauge + " " + u.factor
//    }

  } else {
    return errorOprnd("UNIT_NAME", str)
  }

  return Object.freeze(u)
};

const opOrNumRegEx = /[0-9·\-⁰¹²³\u2074-\u2079⁻/^()]/;
const numeralRegEx = /[0-9-]/;

const unitFromUnitName = (inputStr, vars) => {

  // TODO: Handle ° ʹ ″

  if (!inputStr) { return { name: null, factor: null, gauge: null, log: "", expos: null } }

  const currencies = vars.currencies;

  const customUnits = (vars.units) ? vars.units : null;

  let str = inputStr.trim();
  // Replace dashes & bullets with half-high dot
  str = str.replace(/[*.•×\-−](?![0-9.])/g, "·");

  // Create a unit object with default values.
  const u = { name: str, factor: Rnl.one, gauge: Rnl.zero, log: "", expos: allZeros };

  if (str === "") {
    return u
  } else if (str === "°" || str === "°ʹ" || str === "degMinSec") {
    u.factor = Rnl.fromString("0.0174532925199433");
    return u
  } else if (str === "feetInch") {
    u.unitExpos = [1, 0, 0, 0, 0, 0, 0, 0];
    u.factor = Rnl.fromString("0.3048");
    return u
  } else if (str === "″" || str === "ʹʹ") {
    // TODO: Move to unitTable
    u.unitExpos = [1, 0, 0, 0, 0, 0, 0, 0];
    u.factor = Rnl.fromString("0.0254");
    return u
  }

  // Parse str for compound units
  const tokenSep = ";";
  let inExponent = false;
  let ch = "";
  let word = "";
  let rpnString = "";
  let expoRpnString = "";
  const expoQueue = [];
  let iQueue = 0;
  const opStack = [{ symbol: "", prec: -1 }];
  let simpleUnit = "";

  // Operator Precedence for shunting yard algorithm
  // 0   ( )    parentheses
  // 1   · /    multiplication or division
  // 2   -      unary minus operator
  // 3   ^      exponentiation, right-to-left

  for (let i = 0; i < str.length; i++) {
    ch = str.charAt(i);

    if (numeralRegEx.test(ch)) {
      if (!inExponent) {
        rpnString += tokenSep;
        expoRpnString += tokenSep;
        opStack.push({ symbol: "^", prec: 3 });
        inExponent = true;
      }
      rpnString += ch;  // Append numbers directly to the RPN string.
      expoRpnString += ch;

    } else if (exponentRegEx.test(ch)) {
      if (!inExponent) {
        rpnString += tokenSep;
        expoRpnString += tokenSep;
        opStack.push({ symbol: "^", prec: 3 });
        inExponent = true;
      }
      const asciiCh = numeralFromSuperScript(ch);
      rpnString += asciiCh;  // Append numbers directly to the RPN string.
      expoRpnString += asciiCh;

    } else if (ch === "^") {
      // The "^" character is not required, but it is permitted.
      rpnString += tokenSep;
      expoRpnString += tokenSep;
      opStack.push({ symbol: "^", prec: 3 });
      inExponent = true;

    } else if (ch === "·" || ch === "/") {
      inExponent = false;
      rpnString += tokenSep;
      expoRpnString += tokenSep;
      while (opStack[opStack.length - 1].prec >= 1) {
        const symbol = opStack.pop().symbol;
        rpnString += symbol + tokenSep;
        expoRpnString += symbol + tokenSep;
      }
      opStack.push({ symbol: ch, prec: 1 });

    } else if (ch === "(") {
      opStack.push({ symbol: "(", prec: 0 });

    } else if (ch === ")") {
      while (opStack[opStack.length - 1].prec > 0) {
        const symbol = opStack.pop().symbol;
        rpnString += symbol + tokenSep;
        expoRpnString += symbol + tokenSep;
      }
      opStack.pop();  // Discard the opening parenthesis.
      inExponent = false;

    } else if (ch === "-") {  // Negative unary operator at the start of an exponent.
      inExponent = true;
      opStack.push({ symbol: "^", prec: 3 });
      opStack.push({ symbol: "-", prec: 2 });
      rpnString += tokenSep;
      expoRpnString += tokenSep;

    } else {
      inExponent = false;
      let j;
      for (j = i + 1; j < str.length; j++) {
        if (opOrNumRegEx.test(str.charAt(j))) { break }
      }
      word = str.substring(i, j);   // May actually be two words, as in "nautical miles"
      simpleUnit = unitFromWord(word, currencies, customUnits);

      if (simpleUnit.dtype && simpleUnit.dtype === dt.ERROR) { return simpleUnit }

      if (simpleUnit.factor === 0) {
        u.name = "";
        return u
      }

      rpnString += String(simpleUnit.factor[0]) + "," + String(simpleUnit.factor[1]);
      expoRpnString += "¿" + iQueue;
      expoQueue.push(simpleUnit.expos);
      iQueue += 1;

      i = j - 1;
    }

  }

  if (word === u.name) {
    return Object.freeze(simpleUnit)
  }

  // All the input characters have been addresssed. Clear the opStack.
  while (opStack.length > 1) {
    const symbol = opStack.pop().symbol;
    rpnString += tokenSep + symbol;
    expoRpnString +=  tokenSep + symbol;
  }

  // Now, resolve the RPN string
  const factors = [];
  const expoStack = [];
  const rpnArray = rpnString.split(tokenSep);
  const expoRpnArray = expoRpnString.split(tokenSep);
  let val2 = 1;
  let e2;
  iQueue = 0;

  for (let i = 0; i < rpnArray.length; i++) {
    if (/[·/\-^]/.test(rpnArray[i])) {
      val2 = factors.pop();
      e2 = expoStack.pop();
    }

    switch (rpnArray[i]) {
      case "·":
        factors[factors.length - 1] = Rnl.multiply(factors[factors.length - 1], val2);
        expoStack[expoStack.length - 1] = expoStack[expoStack.length - 1].map((el, j) => {
          return el + e2[j]
        });
        break

      case "/":
        // TODO: Rewrite next line.
        if (Rnl.isZero(val2)) { return errorOprnd("DIV") }
        factors[factors.length - 1] = Rnl.divide(factors[factors.length - 1], val2);
        expoStack[expoStack.length - 1] = expoStack[expoStack.length - 1].map((el, j) => {
          return el - e2[j]
        });
        break

      case "^":
        factors[factors.length - 1] = Rnl.power(factors[factors.length - 1], val2);
        expoStack[expoStack.length - 1] = expoStack[expoStack.length - 1].map((el) => el * e2);
        break

      case "-":   // Negative unary operator
        factors[factors.length - 1] = Rnl.negate(factors[factors.length - 1]);
        break

      default:
        if (rpnArray[i].indexOf(",") > -1) {
          const ints = rpnArray[i].split(",");
          factors.push([BigInt(ints[0]), BigInt(ints[1])]);
        } else {
          factors.push([BigInt(rpnArray[i]), BigInt(1)]);
        }
        if (expoRpnArray[i].charAt(0) === "¿") {
          expoStack.push(expoQueue[iQueue]);
          iQueue += 1;
        } else {
          expoStack.push(expoRpnArray[i]);
        }
    }
  }

  u.factor = Object.freeze(factors.pop());
  u.expos = Object.freeze(expoStack.pop());
  return Object.freeze(u)
};

/* eslint-disable */

/*
 * This file implements a complex number data type.
 * Each complex number, z, is held as an array containing two rational number.
 * z[0] is the real part and z[1] is the imaginary part.
 *
 * This module is a work in progress.
 */

const j = [Rnl.zero, Rnl.one];

const isComplex = a => {
  return Array.isArray(a) && a.length === 2
    && Rnl.isRational(a[0]) && Rnl.isRational(a[1])
};

const re = z => z[0];
const im = z => z[1];
const abs$1 = z => Rnl.hypot(z[0], z[1]);
const negate$1 = z => [Rnl.negate(z[0]), Rnl.negate(z[1])];
const conjugate = z => [z[0], Rnl.negate(z[1])];

const argument = (z) => {
    // For a complex number z, the "argument" is the angle (in radians) from
    // the positive real axis to the vector representing z.  + implies counter-clockwise.
    // Electrical engineers call this the phase angle of the complex number.
  if (Rnl.isZero(z[0]) && Rnl.isZero(z[1])) {
    return errorOprnd("ORIGIN", "argument")
  } else if (Rnl.isZero(z[1])) {
    return  Rnl.isPositive(z[0]) ? Rnl.zero : Rnl.pi
  } else if (Rnl.isZero(z[0])) {
    return  Rnl.isPositive(z[1])
      ? Rnl.divide(Rnl.pi, Rnl.two)
      : Rnl.negate(Rnl.divide(Rnl.pi, Rnl.two))
  } else {
    return  Rnl.fromNumber(Math.atan2(Rnl.toNumber(z[1]), Rnl.toNumber(z[0])))
  }
};

const add$1 = (x, y) => [Rnl.add(x[0], y[0]), Rnl.add(x[1], y[1])];
const subtract$1 = (x, y) => [Rnl.subtract(x[0], y[0]), Rnl.subtract(x[1], y[1])];

const multiply$1 = (x, y) => {
  return [
    Rnl.subtract(Rnl.multiply(x[0], y[0]), Rnl.multiply(x[1], y[1])),
    Rnl.add(Rnl.multiply(x[0], y[1]), Rnl.multiply(x[1], y[0]))
  ]
};

const divide$1 = (x, y) => {
  if (!Rnl.isZero(x[1]) && !Rnl.isZero(y[1])) {
    if (Rnl.lessThan(Rnl.abs(y[1]), Rnl.abs(y[0]))) {
      const ratio = Rnl.divide(y[1], y[0]);
      const denom = Rnl.add(y[0], Rnl.multiply(y[1], ratio));
      return  [
        Rnl.divide(Rnl.add(x[0], Rnl.multiply(x[1], ratio)), denom),
        Rnl.divide(Rnl.subtract(x[1], Rnl.multiply(x[0], ratio)), denom),
      ]
    } else {
      const ratio = Rnl.divide(y[0], y[1]);
      const denom = Rnl.add(y[1], Rnl.multiply(y[0], ratio));
      return  [
        Rnl.divide(Rnl.add(x[1], Rnl.multiply(x[0], ratio)), denom),
        Rnl.divide(Rnl.add(Rnl.negate(x[0]), Rnl.multiply(x[1], ratio)), denom),
      ]
    }
  } else if (Rnl.isZero(x[1])) {
    // real x divided by complex y
    if (Rnl.lessThan(Rnl.abs(y[1]), Rnl.abs(y[0]))) {
      const ratio = Rnl.divide(y[1], y[0]);
      const denom = Rnl.add(y[0], Rnl.multiply(y[1], ratio));
      return  [
        Rnl.divide(x[0], denom),
        Rnl.negate(Rnl.multiply(x[0], Rnl.divide(ratio, denom))),
      ]
    } else {
      const ratio = Rnl.divide(y[0], y[1]);
      const denom = Rnl.add(y[1], Rnl.multiply(y[0], ratio));
      return  [
        Rnl.divide(Rnl.multiply(x[0], ratio), denom),
        Rnl.negate(Rnl.divide(x[0], denom)),
      ]
    }
  } else if (Rnl.isZero(y[1])) {
    // Complex x divided by real y
    if (Rnl.isZero(y[0])) ; else {
      return  [Rnl.divide(x[0], y[0]), Rnl.divide(x[1], y[0])]
    }
  } else {
    // both x and y are reals
    if (Rnl.isZero(y[0])) {
      return errorOprnd("DIV")
    } else {
      return [Rnl.divide(x[0], y[0]), Rnl.zero ]
    }
  }
};

const increment$1 = z => [Rnl.increment(z[0]), z[1]];
const decrement$1 = z => [Rnl.decrement(z[0]), z[1]];

const inverse = z => {
  // Complex inverse 1 / z
  if (Rnl.isZero(z[1])) {
    if (Rnl.isZero((z[0]))) { return errorOprnd("DIV") }
    return [Rnl.inverse(z[0]), 0]
  } else {
    return divide$1([Rnl.one, Rnl.zero], z)
  }
};

const cos$1 = z => {
  const real = Rnl.multiply(Rnl.cos(z[0]), Rnl.cosh(z[1]));
  const im = Rnl.multiply(Rnl.negate(Rnl.sin(z[0])), Rnl.sinh(z[1]));
  return [real, im]
};

const sin$1 = z => {
  const real = Rnl.multiply(Rnl.sin(z[0]), Rnl.cosh(z[1]));
  const im = Rnl.multiply(Rnl.cos(z[0]), Rnl.sinh(z[1]));
  return [real, im]
};

const log = x => {
  let z = [Rnl.zero, Rnl.zero];
  // Natural (base e) logarithm of a complex number, x
  if (Rnl.isZero(x[0]) && Rnl.isZero(x[1])) {
    return errorOprnd("ORIGIN", "log")
  } else {
    z[0] = Rnl.fromNumber(Math.log(Rnl.toNumber(Rnl.hypot(x[0], x[1]))));
    z[1] = argument(x);   // phase angle, in radians
  }
  return z
};

const isSmall = x => Rnl.lessThan(Rnl.abs(x), [BigInt(1), BigInt(100000000000000)]);

const exp$1 = x => {
  // Complex exponentiation
  let z = [Rnl.zero, Rnl.zero];
  if (isSmall(x[1])) {
    z[1] = Rnl.zero;
    z[0] = Rnl.exp(x[0]);
  } else {
    if (Rnl.isZero(x[0])) {
      z[0] = Rnl.cos(x[1]);
      if (isSmall(z[0])) { z[0] = Rnl.zero; }
      z[1] = Rnl.sin(x[1]);
      if (isSmall(z[1])) { z[1] = Rnl.zero; }
    } else {
      const realExp = Rnl.exp(x[0]);
      z[0] = Rnl.multiply(realExp, Rnl.cos(x[1]));
      z[1] = Rnl.multiply(realExp, Rnl.sin(x[1]));
    }
  }
  return z
};

const power$1 = (x, y) =>{
  let z = [Rnl.zero, Rnl.zero];
  // powers: z = e^(log(x) × y)
  if (!isComplex(y)) {
    z = log(x);
    z[0] = Rnl.multiply(z[0], y);
    z[1] = Rnl.multiply(z[1], y);
  } else if (Rnl.isZero(y[1])) {
    z = log(x);
    z[0] = Rnl.multiply(z[0], y[0]);
    z[1] = Rnl.multiply(z[1], y[0]);
  } else if (Rnl.isZero(x[1]) && !Rnl.isNegative(x[0])) { 
    x[0] = Rnl.fromNumber(Math.log(Rnl.toNumber(x[0])));
    z[0] = Rnl.multiply(x[0], y[0]);
    z[1] = Rnl.multiply(x[0], y[1]);
  } else {
    x = log(x);
    z[0] = Rnl.subtract(Rnl.multiply(x[0], y[0]), Rnl.multiply(x[1], y[1]));
    z[1] = Rnl.add(Rnl.multiply(x[1], y[0]), Rnl.multiply(x[0], y[1]));
  }
  
  z = exp$1(z);
  if (isSmall(z[1])) { z[1] = Rnl.zero; }
  if (isSmall(z[0])) { z[0] = Rnl.zero; }
  return z
};

const acosh = z => {
  // acosh(z) = log( z + √(z - 1) × √(z + 1) )
  return log(add$1(z, multiply$1(sqrt$1(decrement$1(z)), sqrt$1(increment$1(z)))))
};

const asinh = z => {
  // Log(z + Sqrt(z * z + 1))
  const s = sqrt$1(add$1(multiply$1(z, z), [Rnl.one, Rnl.zero]));
  return log(add$1(z, s))
};

const atanh = z => {
  // atanh(z) = [ log(1+z) - log(1-z) ] / 2
  return divide$1(subtract$1(log(increment$1(z)), log(subtract$1([Rnl.one, Rnl.zero], z))), [Rnl.two, Rnl.zero])
};

const asin = z => {
  // arcsinh (i * z) / i
  return divide$1(asinh(multiply$1(j, z)), j)
};

const atan = z => {
  // (Log(1 + iz) - Log(1 - iz)) / (2 * i)  cf Kahan
  const term1 = log(increment$1(multiply$1(j, z)));
  const term2 = log(subtract$1([Rnl.one, Rnl.zero],(multiply$1(j, z))));
  return divide$1(subtract$1(term1, term2), [Rnl.zero, Rnl.two])  
};

const sqrt$1 = x => {
  const z = log(x);
  z[0] = Rnl.divide(z[0], Rnl.two);
  z[1] = Rnl.divide(z[1], Rnl.two);
  return exp$1(z)
};

const lanczos$1 = zPlusOne => {
  // Lanczos approximation of Gamma function.
  // Coefficients are from 2004 PhD thesis by Glendon Pugh.
  // *An Analysis of the Lanczos Gamma Approximation*
  // The following equation is from p. 116 of the Pugh thesis:
  // Γ(z+1) ≈ 2 * √(e / π) * ((z + 10.900511 + 0.5) / e) ^ (z + 0.5) * sum
  const z = subtract$1(zPlusOne, [Rnl.one, Rnl.zero]);
  const sqr = Rnl.sqrt(Rnl.divide(e, pi));
  const term1 = multiply$1([Rnl.two, Rnl.zero], [sqr, Rnl.zero]);
  const k = Rnl.fromNumber(11.400511);
  const oneHalf = [[BigInt(1), BigInt(2)], Rnl.zero];
  const term2 = power$1(divide$1(add$1(z, [k, Rnl.zero]), [e, Rnl.zero]), add$1(z, oneHalf));

  // Coefficients from Pugh, Table 8.5
  const d = ["2.48574089138753565546e-5", "1.05142378581721974210",
    "-3.45687097222016235469", "4.51227709466894823700", "-2.98285225323576655721",
    "1.05639711577126713077", "-0.195428773191645869583", "0.0170970543404441224307",
    "-0.000571926117404305781283", "0.00000463399473359905636708",
    "-0.00000000271994908488607703910"];

  // sum = d_0 + ∑_(k=1)^10 d_k/(z+k)
  let sum = [Rnl.fromString(d[0]), Rnl.zero];
  for (let k = 1; k <= 10; k++) {
    const d = [Rnl.fromString(d[k]), Rnl.zero];
    const complexK = [Rnl.fromNumber(k), Rnl.zero];
    sum = add$1(sum, divide$1(d, add$1(z, complexK)));
  }

  return multiply$1(multiply$1(term1, term2), sum)
};

const display = (z, formatSpec, decimalFormat) => {
  const complexSpec = /[j∠°]/.test(formatSpec) ? formatSpec.slice(-1) : "j";
  let resultDisplay = "";
  let altResultDisplay = "";
  if (complexSpec === "j") {
    const real = format(z[0], formatSpec, decimalFormat);
    let im = format(z[1], formatSpec, decimalFormat);
    if (im.charAt(0) === "-") { im = "(" + im + ")"; }
    resultDisplay = real + " + j" + im;
    altResultDisplay = real + " + j" + im;
  } else {
    const mag = Rnl.hypot(z[0], z[1]);
    let angle = Cpx.argument(result.value);
    if (complexSpec === "°") {
      angle = Rnl.divide(Rnl.multiply(angle, Rnl.fromNumber(180)), Rnl.pi);
    }
    resultDisplay = format(mag, formatSpec, decimalFormat) + "∠" +
                    format(angle, formatSpec, decimalFormat) +
                    (complexSpec === "°" ? "°" : "");
    altResultDisplay = resultDisplay;
  }
  return [resultDisplay, altResultDisplay]
};

const Cpx = Object.freeze({
  j,
  re,
  im,
  abs: abs$1,
  conjugate,
  argument,
  inverse,
  increment: increment$1,
  decrement: decrement$1,
  isComplex,
  add: add$1,
  subtract: subtract$1,
  divide: divide$1,
  multiply: multiply$1,
  negate: negate$1,
  power: power$1,
  exp: exp$1,
  log,
  sqrt: sqrt$1,
  sin: sin$1,
  cos: cos$1,
  asin,
  atan,
  acosh,
  asinh,
  atanh,
  lanczos: lanczos$1,
  display
});

// Two helper functions
const isMatrix = oprnd => {
  return (
    (oprnd.dtype & dt.ROWVECTOR) ||
    (oprnd.dtype & dt.COLUMNVECTOR) ||
    (oprnd.dtype & dt.MATRIX)
  )
};
const isVector = oprnd => {
  return (((oprnd.dtype & dt.ROWVECTOR) || (oprnd.dtype & dt.COLUMNVECTOR)) > 0)
};

const convertFromBaseUnits = (oprnd, gauge, factor) => {
  let conversion = (isVector(oprnd))
    ? oprnd.value.map((e) => Rnl.divide(e, factor))
    : oprnd.value.map(row => row.map(e => Rnl.divide(e, factor)));
  if (!Rnl.isZero(gauge)) {
    conversion = (isVector(oprnd))
      ? oprnd.value.map((e) => Rnl.subtract(e, gauge))
      : oprnd.value.map(row => row.map(e => Rnl.subtract(e, gauge)));
  }
  return Object.freeze(conversion)
};

const convertToBaseUnits = (oprnd, gauge, factor) => {
  let conversion = clone(oprnd.value);
  if (!Rnl.isZero(gauge)) {
    conversion = (isVector(oprnd))
      ? oprnd.value.map((e) => Rnl.add(e, gauge))
      : oprnd.value.map(row => row.map(e => Rnl.add(e, gauge)));
  }
  conversion = (isVector(oprnd))
    ? conversion.map((e) => Rnl.multiply(e, factor))
    : conversion.map(row => row.map(e => Rnl.multiply(e, factor)));
  return Object.freeze(conversion)
};

const display$1 = (m, formatSpec, decimalFormat) => {
  let str = "\\begin";
  if (m.dtype & dt.MATRIX) {
    str += "{pmatrix}";
    const numRows = m.value.length;
    const numCols = m.value[1].length;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        str += format(m.value[i][j], formatSpec, decimalFormat) + " &";
      }
      str = str.slice(0, -1) + " \\\\ ";
    }
    str = str.slice(0, -3).trim();
    str += "\\end{pmatrix}";
  } else {
    str += "{bmatrix}";
    const argSep = (m.dtype & dt.ROWVECTOR) ? " & " : " \\\\ ";
    if (m.value.plain) {
      const numArgs = m.value.plain.length;
      for (let i = 0; i < numArgs; i++) {
        str += format(m.value.plain[i], formatSpec, decimalFormat) +
          ((i < numArgs - 1) ? argSep : "");
      }
    } else {
      const numArgs = m.value.length;
      for (let i = 0; i < numArgs; i++) {
        const elementDisplay = m.value[i] === undefined
          ? ""
          : (m.dtype & dt.RATIONAL)
          ? format(m.value[i], formatSpec, decimalFormat)
          : (m.dtype & dt.COMPLEX)
          ? Cpx.display(m.value[i], formatSpec, decimalFormat)[0]
          : (m.dtype & dt.BOOLEAN) || (m.dtype & dt.STRING)
          ? "\\text{" + m.value[i] + "}"
          : m.value[i];
        str += elementDisplay + ((i < numArgs - 1) ? argSep : "");
      }
    }
    str += "\\end{bmatrix}";
  }
  return str
};

const displayAlt = (m, formatSpec, decimalFormat) => {
  let str = "";
  if (m.dtype & dt.MATRIX) {
    str += "(";
    const numRows = m.value.length;
    const numCols = m.value[1].length;
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        str += format(m.value[i][j], formatSpec, decimalFormat).replace(/{,}/g, ",") + ", ";
      }
      str = str.slice(0, -2) + "; ";
    }
    str = str.slice(0, -2).trim();
    str += ")";
  } else {
    str += "[";
    const argSep = (m.dtype & dt.ROWVECTOR) ? ", " : "; ";
    if (m.value.plain) {
      const numArgs = m.value.plain.length;
      for (let i = 0; i < numArgs; i++) {
        str += format(m.value.plain[i], formatSpec, decimalFormat).replace(/{,}/g, ",") +
           ((i < numArgs - 1) ? argSep : "");
      }
    } else {
      const numArgs = m.value.length;
      for (let i = 0; i < numArgs; i++) {
        const elementDisplay = m.value[i] === undefined
          ? ""
          : (m.dtype & dt.RATIONAL)
          ? format(m.value[i], formatSpec, decimalFormat).replace(/{,}/g, ",")
          : (m.dtype & dt.COMPLEX)
          ? Cpx.display(m.value[i], formatSpec, decimalFormat)[1].replace(/{,}/g, ",")
          : m.value[i];
        str += elementDisplay + ((i < numArgs - 1) ? argSep : "");
      }
    }
    str += "]";
  }
  return str
};

const displayMapOfVectors = (value, formatSpec, decimalFormat) => {
  // Display a map full of vectors
  let str = "\\begin{Bmatrix}";
  Object.keys(value).forEach(key => {
    const vector = value[key];
    str += "\\text{" + key + "}: \\begin{bmatrix}";
    const numArgs = vector.plain.length;
    if (vector.plain) {
      for (let i = 0; i < numArgs; i++) {
        str += format(vector.plain[i], formatSpec, decimalFormat) +
          ((i < numArgs - 1) ? ", " : "");
      }
    } else {
      for (let i = 0; i < numArgs; i++) {
        const elementDisplay = Rnl.isRational(vector[i])
          ? format(vector[i], formatSpec, decimalFormat)
          : (typeof vector[i] === "boolean") || (typeof vector[i] === "string")
          ? "\\text{" + vector[i] + "}"
          : vector[i];
        str += elementDisplay + ((i < numArgs - 1) ? " & " : "");
      }
    }
    str += "\\end{bmatrix} \\\\";
  });
  str = str.slice(0, -2) + "\\end{Bmatrix}";
  return str
};

const displayAltMapOfVectors = (value, formatSpec, decimalFormat) => {
  let str = "{";
  Object.keys(value).forEach(key => {
    const vector = value[key];
    str += key + ": [";
    const numArgs = vector.plain.length;
    if (vector.plain) {
      for (let i = 0; i < numArgs; i++) {
        str += format(vector.plain[i], formatSpec, decimalFormat) +
        ((i < numArgs - 1) ? ", " : "").replace(/{,}/g, ",") + " ";
      }
    } else {
      for (let i = 0; i < numArgs; i++) {
        const elementDisplay = Rnl.isRational(vector[i])
          ? format(vector[i], formatSpec, decimalFormat).replace(/{,}/g, ",") + " "
          : String(vector[i]) + "}";
        str += elementDisplay + ((i < numArgs - 1) ? " " : "");
      }
    }
    str += "];";
  });
  return str.slice(0, -1) + "}"
};


const identity = (num, mutable) => {
  const n = Rnl.isRational(num) ? Rnl.toNumber(num) : num;
  if (n === 1) {
    return  [Rnl.one]
  } else {
    const M = [];
    for (let i = 0; i < n; i++) {
      M.push(new Array(n).fill(Rnl.zero));
      M[i][i] = Rnl.one;
    }
    return mutable ? M : Object.freeze(M)
  }
};

const invert = (matrix, returnDeterminant) => {
  // Invert a square matrix via Gaussian elimination.
  // A lightly editied copy of http://blog.acipo.com/matrix-inversion-in-javascript/

  if (matrix.length !== matrix[0].length) {
    return errorOprnd("NONSQUARE")
  }
  const dim = matrix.length;
  let i = 0;
  let ii = 0;
  let j = 0;
  let temp = Rnl.zero;
  let determinant = Rnl.one;

  const C = clone(matrix);
  const I = identity(dim, true);

  for (i = 0; i < dim; i += 1) {
    // get the element temp on the diagonal
    temp = C[i][i];

    // if we have a 0 on the diagonal (we'll need to swap with a lower row)
    if (Rnl.isZero(temp)) {
      //look through every row below the i'th row
      for (ii = i + 1; ii < dim; ii++) {
        //if the ii'th row has a non-0 in the i'th col
        if (!Rnl.isZero(C[ii][i])) {
          //it would make the diagonal have a non-0 so swap it
          for (j = 0; j < dim; j++) {
            temp = C[i][j];     // temp store i'th row
            C[i][j] = C[ii][j]; // replace i'th row by ii'th
            C[ii][j] = temp;    // repace ii'th by temp
            temp = I[i][j];     // temp store i'th row
            I[i][j] = I[ii][j]; // replace i'th row by ii'th
            I[ii][j] = temp;    // repace ii'th by temp
          }
          //don't bother checking other rows since we've swapped
          break
        }
      }
      //get the new diagonal
      temp = C[i][i];
      //if it's still 0, not invertable (error)
      if (Rnl.isZero(temp)) { return errorOprnd("SINGULAR") }
    }

    if (returnDeterminant) {
      determinant = Rnl.divide(determinant, temp);
      if (i === dim - 1) {
        return determinant
      }
    }

    // Scale this row down by temp (so we have a 1 on the diagonal)
    for (j = 0; j < dim; j++) {
      C[i][j] = Rnl.divide(C[i][j], temp); //apply to original matrix
      I[i][j] = Rnl.divide(I[i][j], temp); //apply to identity
    }

    // Subtract this row (scaled appropriately for each row) from ALL of
    // the other rows so that there will be 0's in this column in the
    // rows above and below this one
    for (ii = 0; ii < dim; ii++) {
      // Only apply to other rows (we want a 1 on the diagonal)
      if (ii === i) { continue }

      // We want to change this element to 0
      temp = C[ii][i];

      // Subtract (the row above(or below) scaled by temp) from (the
      // current row) but start at the i'th column and assume all the
      // stuff left of diagonal is 0 (which it should be if we made this
      // algorithm correctly)
      for (j = 0; j < dim; j++) {
        C[ii][j] = Rnl.subtract(C[ii][j], Rnl.multiply(temp, C[i][j])); // original matrix
        I[ii][j] = Rnl.subtract(I[ii][j], Rnl.multiply(temp, I[i][j])); // identity
      }
    }
  }

  // We've finished. C should be the identity matrix.
  // Matrix I should be the inverse.
  return Object.freeze(I)
};


const submatrix = (oprnd, index, colIndex) => {
  if (!((index.dtype & dt.RATIONAL) || (index.dtype & dt.RANGE))) {
    return errorOprnd("BAD_INDEX")
  }
  let value = [];
  let dtype = oprnd.dtype;

  // Get the row index
  let start = 0;
  let step = 1;
  let end = 0;
  if (index.dtype & dt.RANGE) {
    start = Rnl.toNumber(index.value[0]);
    step = Rnl.toNumber(index.value[1]);
    end = index.value[2] === "∞"
      ? oprnd.value.length
      : Rnl.toNumber(index.value[2]);
  } else if (Rnl.areEqual(index.value, Rnl.zero)) {
    // Return all the rows
    start = 1;
    end = oprnd.value.length;
  } else {
    start = Rnl.toNumber(index.value);
    end = start;
  }

  if (isVector(oprnd)) {
    // Skip the column index. Proceed directly to load values into the result.
    if (start === end) {
      // return a scalar
      value = oprnd.value[start - 1];
      dtype = oprnd.dtype - (oprnd.dtype & dt.ROWVECTOR) -
        (oprnd.dtype & dt.COLUMNVECTOR);
    } else if (step === 1) {
      value = oprnd.value.slice(start - 1, end);
    } else {
      for (let i = start - 1; i < end; i += step) {
        value.push(oprnd.value[i]);
      }
    }
    Object.freeze(value);
    return Object.freeze({ value, unit: oprnd.unit, dtype })
  }

  // Get the column index
  let colStart = 0;
  let colStep = 1;
  let colEnd = 0;
  if (colIndex) {
    if (colIndex.dtype & dt.RANGE) {
      colStart = Rnl.toNumber(colIndex.value[0]);
      colStep = Rnl.toNumber(colIndex.value[1]);
      colEnd = colIndex.value[2] === "∞"
        ? oprnd.value[0].length
        : Rnl.toNumber(colIndex.value[2]);
    } else if (Rnl.areEqual(colIndex.value, Rnl.zero)) {
      // Return an entire row.
      colStart = 1;
      colEnd = oprnd.value[0].length;
    } else {
      colStart = Rnl.toNumber(colIndex.value);
      colEnd = colStart;
    }
  }

  // Now load values into the result
  if (start === end && colStart === colEnd) {
    // return a scalar
    value = oprnd.value[start - 1][colStart - 1];
    dtype -= dt.MATRIX;

  } else if (start === end) {
    // return a row vector
    if (colStep === 1) {
      value = oprnd.value[start - 1].slice(colStart - 1, colEnd);
    } else {
      for (let j = colStart - 1; j < colEnd; j += colStep) {
        value.push(oprnd.value[start - 1][j]);
      }
    }
    dtype = dtype - dt.MATRIX + dt.ROWVECTOR;

  } else if (colStart === colEnd) {
    // return a column vector
    for (let i = start - 1; i < end; i += step) {
      value.push(oprnd.value[i][colStart - 1]);
    }
    dtype = dtype - dt.MATRIX + dt.COLUMNVECTOR;

  } else if (colStep === 1) {
    for (let i = start - 1; i < end; i += step) {
      value.push([]);
      value[value.length - 1] = oprnd.value[i].slice(colStart - 1, colEnd);
    }

  } else {
    for (let i = start - 1; i < end; i += step) {
      value.push([]);
      for (let j = colStart - 1; j < colEnd; j += colStep) {
        value[value.length - 1].push(oprnd[i][j]);
      }
    }
  }
  Object.freeze(value);
  return Object.freeze({ value, unit: oprnd.unit, dtype })
};

const multResultType = (o1, o2) => {
  // o1 and o2 are to undergo matrix multiplication.
  // The value is found elsewhere.
  // Here we find the resulting data type.
  if ((o1.dtype & dt.ROWVECTOR) && (o2.dtype & dt.COLUMNVECTOR)) {
    return dt.RATIONAL
  } else if ((o1.dtype & dt.MATRIX) && (o2.dtype & dt.COLUMNVECTOR)) {
    return o2.dtype
  } else if ((o1.dtype & dt.ROWVECTOR) && (o2.dtype & dt.MATRIX)) {
    return o1.dtype
  } else {
    return dt.MATRIX + dt.RATIONAL
  }
};

const operandFromRange = range => {
  // Input was [start:step:end]
  // Populate a vector with values from a range
  const array = [];
  if (Rnl.greaterThan(range[2], range[0])) {
    for (let j = range[0]; Rnl.lessThan(j, range[2]); j = Rnl.add(j, range[1])) {
      array.push(j);
    }
  } else {
    for (let j = range[0]; Rnl.greaterThanOrEqualTo(j, range[2]);
        j = Rnl.add(j, range[1])) {
      array.push(j);
    }
  }
  if (!Rnl.areEqual(array[array.length - 1], range[2])) {
    array.push(range[2]);
  }
  Object.freeze(array);
  return Object.freeze({
    value: array,
    unit: { expos: allZeros },
    dtype: dt.RATIONAL + dt.ROWVECTOR
  })
};

const operandFromTokenStack = (tokenStack, numRows, numCols) => {
  // TODO: Get dtype correct for matrices that contain strings or booleans.
  if (numRows === 0 && numCols === 0) {
    return Object.freeze({ value: new Array(0), unit: null, dtype: dt.ROWVECTOR })
  } else if (numRows === 1 && numCols === 1) {
    // One element. Return a scalar.
    return tokenStack.pop()

  } else if (numRows === 1 || numCols === 1) {
    const numArgs = Math.max(numRows, numCols);
    let array;
    let dtype = tokenStack[tokenStack.length - 1].dtype;
    if (numRows === 1 && (dtype & dt.COLUMNVECTOR)) {
      // Matrix composed of column vectors appended side by side
      dtype = dtype - dt.COLUMNVECTOR + dt.MATRIX;
      array = new Array(tokenStack[0].value.length);
      for (let i = 0; i < tokenStack[0].value.length; i++) {
        array[i] = [];
        for (let j = 0; j < numArgs; j++) {
          array[i][j] = tokenStack[j].value[i];
        }
      }
      for (let i = 0; i < numArgs; i++) { tokenStack.pop(); }
    } else  {
      // Vector
      array = new Array(numArgs);
      dtype += numRows === 1 ? dt.ROWVECTOR : dt.COLUMNVECTOR;
      for (let j = numArgs - 1; j >= 0; j--) {
        array[j] = tokenStack.pop().value;
      }
    }
    Object.freeze((array));
    return Object.freeze({
      value: array,
      unit: (dtype & dt.RATIONAL) ? { expos: allZeros } : null,
      dtype
    })

  } else {
    // 2D matrix
    const array = new Array(numRows);
    const dtype = tokenStack[tokenStack.length - 1].dtype + dt.MATRIX;
    for (let j = 0; j < numRows; j++) {
      array[j] = new Array(numCols);
    }
    for (let k = numRows - 1; k >= 0; k--) {
      for (let j = numCols - 1; j >= 0; j--) {
        array[k][j] =  tokenStack.pop().value;
      }
    }
    Object.freeze((array));
    return Object.freeze({
      value: array,
      unit: (dtype & dt.RATIONAL) ? { expos: allZeros } : null,
      dtype
    })
  }
};

const zeros = (m, n) => {
  if (m === 1) {
    return {
      value: new Array(n).fill(Rnl.zero),
      unit: allZeros,
      dtype: dt.RATIONAL + dt.ROWVECTOR
    }
  } else if (n === 1) {
    return {
      value: new Array(m).fill(Rnl.zero),
      unit: allZeros,
      dtype: dt.RATIONAL + dt.COLUMNVECTOR
    }
  } else {
    const value = [];
    for (let i = 0; i < m; i++) {
      value.push(new Array(n).fill(Rnl.zero));
    }
    Object.freeze(value);
    return Object.freeze({
      value: value,
      unit: { expos: allZeros },
      dtype: dt.RATIONAL + dt.MATRIX
    })
  }
};

const Matrix = Object.freeze({
  convertFromBaseUnits,
  convertToBaseUnits,
  display: display$1,
  displayAlt,
  displayMapOfVectors,
  displayAltMapOfVectors,
  identity,
  invert,
  isVector,
  multResultType,
  operandFromRange,
  operandFromTokenStack,
  submatrix,
  zeros
});

const columnListFromRange = (start, end) => {
  const columnList = [];
  for (let i = start; i <= end; i++) {
    columnList.push(i);
  }
  return columnList
};

const valueFromDatum = datum => {
  return datum === "true"
  ? true
  : datum === "false"
  ? false
  : numberRegEx$1.test(datum)
  ? Rnl.fromString(datum)
  : datum === ""
  ? undefined
  : datum
};

const datumFromValue = (value, dtype) => {
  return value === true
    ? "true"
    : value === false
    ? "false"
    : value =  (dtype === dt.RATIONAL)
    ? "0 " + String(value[0]) + "/" + String(value[1])
    : value
};

const range = (df, args, vars, unitAware) => {
  let iStart;
  let iEnd;
  const rowList = [];
  let columnList = [];
  let unit = Object.create(null);

  // Find what must be returned. I.e. populate rowList and columnList
  if (df.value.data[0].length === 1) {
    // The source is a single-row data frame. Each argument calls a column.
    iStart = 0;
    iEnd = 0;
    for (let i = 0; i < args.length; i++) {
      if (args[i].dtype === dt.STRING) {
        columnList.push(df.value.columnMap[args[i].value]);
      } else if (args[i].dtype === dt.RATIONAL) {
        columnList.push(Rnl.toNumber(args[i].value));
      } else if (args[i].dtype === dt.RANGE) {
        const jStart = Rnl.toNumber(args[i].value[0]);
        const jEnd = Rnl.toNumber(args[i].value[1]);
        for (let j = jStart; j <= jEnd; j++) {
          columnList.push(j);
        }
      }
    }
  } else if (args.length === 1 && args[0].dtype === dt.RATIONAL) {
    iStart = Rnl.toNumber(args[0].value) - 1;
    iEnd = iStart;
    columnList = columnListFromRange(0, df.value.data.length - 1);
  } else if (args.length === 1 && args[0].dtype === dt.RANGE) {
    iStart = Rnl.toNumber(args[0].value[0]) - 1;
    iEnd = Rnl.toNumber(args[0].value[1]) - 1;
    columnList = columnListFromRange(0, df.value.data.length - 1);
  } else if (args.length === 1 && args[0].dtype === dt.STRING) {
    // Only one indicator has been given.
    // Check both the rowMap and the columnMap.
    if (df.value.rowMap && args[0].value in df.value.rowMap) {
      // Return a row
      iStart = df.value.rowMap[args[0].value];
      iEnd = iStart;
      columnList = columnListFromRange(0, df.value.data.length - 1);
    } else if (df.value.columnMap && args[0].value in df.value.columnMap) {
      // Return a column vector
      iStart = 0;
      iEnd = df.value.data[0].length - 1;
      columnList.push(df.value.columnMap[args[0].value]);
    } else {
      return errorOprnd("BAD_ROW_NAME", args[0].value)
    }
  } else if (args.length === 1 && args[0].dtype === dt.STRING + dt.COLUMNVECTOR) {
    // A vector of row names
    for (const rowName of args[0].value) {
      rowList.push(rowName);
    }
    columnList = columnListFromRange(0, df.value.data.length - 1); // All the columns.
  } else if (args.length === 1 && args[0].dtype === dt.STRING + dt.ROWVECTOR) {
    // A vector of column names
    iStart = 0;
    iEnd = df.value.data[0].length;
    for (const colName of args[0].value) {
      columnList.push(df.columnIndicator[colName]);
    }
  } else if (args.length === 2 && args[0].dtype === dt.STRING && df.value.rowMap
    && args[0].value in df.value.rowMap && args[1].dtype === dt.STRING &&
    df.value.columnMap && args[0].value in df.value.columnMap) {
    // Return a single cell value
    iStart = df.value.rowMap[args[0].value];
    iEnd = iStart;
    columnList.push(df.value.columnMap[args[0].value]);
  }

  if (rowList.length === 0 && iStart === iEnd && columnList.length === 1) {
    // Return one value.
    let dtype = df.value.dtype[columnList[0]];
    if (dtype & dt.QUANTITY) { dtype -= dt.QUANTITY; }
    const j = columnList[0];
    let value = valueFromDatum(df.value.data[j][iStart]);
    unit.expos = (dtype & dt.RATIONAL) ? allZeros : null;
    if (unitAware && df.value.units[j]) {
      const unitName = df.value.units[j] ? df.value.units[j] : undefined;
      const unitObj = unitFromUnitName(unitName, vars);
      value = Rnl.multiply(Rnl.add(value, unitObj.gauge), unitObj.factor);
      unit.expos = unitObj.expos;
    }
    return { value, unit, dtype }

  } else if (columnList.length === 1) {
    // Return data from one column, in a column vector or a quantity
    const j = columnList[0];
    const unitName = df.value.units[j] ? df.value.units[j] : {};
    unit = (df.unit && df.unit[unitName]) ? df.unit[unitName] : { expos: null };
    const value = df.value.data[j].slice(iStart, iEnd + 1).map(e => valueFromDatum(e));
    const dtype = df.value.dtype[j] + dt.COLUMNVECTOR;
    const newdf = { value, name: df.value.headings[j], unit, dtype };
    if (unitAware && unit.gauge) {
      return {
        value: Matrix.convertToBaseUnits(newdf, unit.gauge, unit.factor),
        name: df.value.headings[j],
        unit: { expos: clone(unit.expos) },
        dtype: dt.RATIONAL + dt.COLUMNVECTOR
      }
    } else {
      return newdf
    }

  } else {
    // Return a data frame.
    const headings = [];
    const units = [];
    const dtype = [];
    const data = [];
    const columnMap = Object.create(null);
    const unitMap = Object.create(null);
    const rowMap = rowList.length === 0 ? false : Object.create(null);
    for (let j = 0; j < columnList.length; j++) {
      headings.push(df.value.headings[columnList[j]]);
      const unitName = df.value.units[columnList[j]];
      units.push(unitName);
      if (unitName && !unitMap[unitName]) { unitMap[unitName] = df.unit[unitName]; }
      dtype.push(df.value.dtype[columnList[j]]);
      columnMap[df.value.headings[j]] = j;
      if (rowList.length > 0) {
        const elements = [];
        for (let i = 0; i < rowList.length; i++) {
          const rowName = rowList[i];
          elements.push(df.value.data[columnList[j]][df.value.rowMap[rowName]]);
          rowMap[rowName] = i;
        }
        data.push(elements);
      } else {
        data.push(df.value.data[columnList[j]].slice(iStart, iEnd + 1));
      }
    }
    return {
      value: {
        data: data,
        headings: headings,
        columnMap: columnMap,
        rowMap: false,
        units: units,
        dtype: dtype
      },
      unit: clone(unitMap),
      dtype: dt.DATAFRAME
    }
  }
};

// const numberRegEx = new RegExp(Rnl.numberPattern + "$")
const numberRegEx$1 = new RegExp("^(?:=|" + Rnl.numberPattern.slice(1) + "$)");
const mixedFractionRegEx = /^-?(?:[0-9]+(?: [0-9]+\/[0-9]+))$/;

const dataFrameFromCSV = (str, vars) => {
  // Load a CSV string into a data frame.
  // Data frames are loaded column-wise. The subordinate data structures are:
  const data = [];    // where the main data lives, not including column names or units.
  const headings = [];                   // An array containing the column names
  const columnMap = Object.create(null); // map of column names to column index numbers
  let rowMap =  false;                   // ditto for rows.
  const units = [];                      // array of unit names, one for each column
  const dtype = [];                      // each column's Hurmet operand type
  const unitMap = Object.create(null);   // map from unit names to unit data
  let gotUnits = false;
  // Determine if the file is tab separated or pipe separated
  const sepChar = str.indexOf("\t") > -1 ? "\t" : "|";

  if (str.charAt(0) === "`") { str = str.slice(1); }
  let row = 0;
  let col = 0;

  // Before we start loading data, let's write two closed functions, to share variable scope.
  const checkForUnitRow = _ => {
    // Determine if there is a row for unit names.
    let gotAnswer = false;
    for (let iCol = 0; iCol < data.length; iCol++) {
      if (numberRegEx$1.test(data[iCol][0])) { gotAnswer = true; break }
    }
    if (!gotAnswer) {
      for (let iCol = 0; iCol < data.length; iCol++) {
        if (numberRegEx$1.test(data[iCol][1])) { gotUnits = true; break }
      }
    }
    if (gotUnits) {
      // Shift the top row of data into units.
      for (let iCol = 0; iCol < data.length; iCol++) {
        const unitName = data[iCol].shift();
        units.push(unitName);
        if (unitName.length > 0) {
          if (!unitMap[unitName]) {
            const unit = unitFromUnitName(unitName, vars);
            if (unit) {
              unitMap[unitName] = unit;
            } else {
              return errorOprnd("DF_UNIT", unitName)
            }
          }
        }
      }
      if (rowMap) {
        Object.entries(rowMap).forEach(([key, value]) => { rowMap[key] = value - 1; });
      }
    }
  };

  const harvest = (datum) => {
    // Load a datum into the dataTable
    datum = datum.trim();

    if (row === 3 && col === 0) { checkForUnitRow(); }

    if (row === 0) {
      headings.push(datum);
      columnMap[datum] = col;
      if (col === 0 && (datum.length === 0 || datum === "name" || datum === "label")) {
        rowMap = Object.create(null);
      }
    } else {
      if (row === 1) { data.push([]); } // First data row.
      data[col].push(datum);
      if (rowMap && col === 0) {
        rowMap[datum] = row - 1 - (gotUnits ? 1 : 0);
      }
    }
  };

  // With the closure out of the way, let's load in data.
  if (str.indexOf('"') === -1) {
    // There are no quotation marks in the string. Use splits.
    const lines = str.split(/\r?\n/g);
    for (const line of lines) {
      if (line.length > 0) {
        col = 0;
        const items = line.split(sepChar);
        for (const item of items) { harvest(item.trim()); col++; }
        row += 1;
      }
    }
    if (row === 3) { checkForUnitRow(); }

  } else {
    // The string contains at least one quotation mark, so we can't rely on splits.
    // Much of this section comes from https://stackoverflow.com/a/14991797
    let datum = "";
    let inQuote = false;  // true means we're inside a quoted field
    // iterate over each character, keep track of current row and column
    for (let c = 0; c < str.length; c++) {
      const cc = str[c];       // current character
      const nc = str[c + 1];   // next character

      // If the current character is a quotation mark, and we're inside a
      // quoted field, and the next character is also a quotation mark,
      // add a quotation mark to the current datum and skip the next character
      if (cc === '"' && inQuote && nc === '"') { datum += cc; ++c; continue; }

      // If it's just one quotation mark, begin/end quoted field
      if (cc === '"') { inQuote = !inQuote; continue; }

      // If it's a separator character and we're not in a quoted field, harvest the datum
      if (cc === sepChar && !inQuote) { harvest(datum); datum = ""; ++col; continue }

      // If it's a CRLF and we're not in a quoted field, skip the next character,
      // harvest the datum, and move on to the next row and move to column 0 of that new row
      if (cc === '\r' && nc === '\n' && !inQuote) {
        harvest(datum); datum = ""; ++row; col = 0; ++c; continue
      }

      // If it's a CR or LF and we're not in a quoted field, skip the next character,
      // harvest the datum, and move on to the next row and move to column 0 of that new row
      if (cc === "\n" && !inQuote) {
        harvest(datum); datum = ""; ++row; col = 0; ++c; continue
      }
      if (cc === "\r" && !inQuote) {
        harvest(datum); datum = ""; ++row; col = 0; ++c; continue
      }

      // Otherwise, append the current character to the current datum
      datum += cc;
    }
    if (datum.length > 0) { harvest(datum); }
    if (row === 2) { checkForUnitRow(); }
  }

  // Data is loaded in. Finish by determining the operand type of each column
  for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data[0].length; i++) {
      const datum = data[j][i];
      if (datum === "") { continue } // undefined datum.
      dtype.push(
        numberRegEx$1.test(datum)
        ? dt.RATIONAL + ((units.length > 0 && units[j].length > 0) ? dt.QUANTITY : 0)
        : (datum === "true" || datum === "false")
        ? dt.BOOLEAN
        : dt.STRING
      );
      break
    }
  }

  // Check if this data qualifies as a Hurmet Map.
  let isMap = false;
  if (data[0].length === 1 && Object.keys(unitMap).length === 0) {
    isMap = true;
    for (let i = 1; i < dtype.length; i++) {
      if (dtype[i] !== dtype[0]) { isMap = false; break }
    }
  }

  if (isMap) {
    const value = new Map();
    const keys = Object.keys(columnMap);
    for (let i = 0; i < keys.length; i++) {
      value.set(keys[i], valueFromDatum(data[i][0]));
    }
    return {
      value,
      unit: (dtype[0] === dt.RATIONAL ? allZeros : null),
      dtype: dt.MAP + dtype[0]
    }
  } else {
    return {
      value: { data, headings, columnMap, rowMap, units, dtype },
      unit: unitMap,
      dtype: dt.DATAFRAME
    }
  }
};

const dataFrameFromVectors = (vectors, vars) => {
  // Take an array of vectors and return a dataframe.
  const data = [];
  const headings = [];
  const columnMap = Object.create(null);
  const units = [];
  const dtype = [];
  const unitMap = Object.create(null);
  const rowMap = (vectors[0].name && vectors[0].name === "name") ? Object.create(null) : false;
  for (let j = 0; j < vectors.length; j++) {
    const vector = vectors[j];
    const vectorType = (vector.dtype & dt.ROWVECTOR)
      ? dt.ROWVECTOR
      : (vector.dtype & dt.COLUMNVECTOR)
      ? dt.COLUMNVECTOR
      : dt.ERROR;
    if (vectorType === dt.ERROR) { return errorOprnd("NOT_VECTOR") }
    headings.push(vector.name);
    columnMap[vector.name] = j;
    const colDtype = vector.dtype - vectorType;
    data.push(vector.value.map(e => datumFromValue(e, colDtype)));
    dtype.push(colDtype);
    if (vector.unit.name) {
      units.push(vector.unit.name);
      if (!unitMap[vector.unit.name]) {
        const unit = unitFromUnitName(vector.unit.name, vars);
        unitMap[vector.unit.name] = unit;
      }
    } else {
      units.push(null);
    }
    if (rowMap) {
      const nameVector = vectors[0].value;
      for (let i = 0; i < nameVector.length; i++) {
        rowMap[nameVector[i]] = i;
      }
    }
  }
  return {
    value: {
      data: data,
      headings: headings,
      columnMap: columnMap,
      rowMap: rowMap,
      units: units,
      dtype: dtype
    },
    unit: unitMap,
    dtype: dt.DATAFRAME
  }
};

const matrix2table = (matrix, rowNames, columnNames, vars) => {
  // Use the contents of a matrix to create a dataframe.
  const data = [];
  for (let i = 0; i <= matrix.value[0].length; i++) { data.push([]); }
  const headings = columnNames.value;
  headings.unshift("");
  const columnMap = Object.create(null);
  for (let i = 1; i < columnNames.value[0].length; i++) { columnMap[headings[i]] = i; }
  const colDtype = dt.RATIONAL + (matrix.unit ? dt.QUANTITY : 0);
  const dtype = Array(matrix.value[0].length).fill(colDtype);
  dtype.unshift(null);
  let units = [];
  const unitMap = Object.create(null);
  if (matrix.unit.name) {
    units = Array(matrix.value[0].length).fill(matrix.unit.name);
    units.unshift("");
    unitMap[matrix.unit.name] = unitFromUnitName(matrix.unit.name, vars);
  }

  const rowMap = Object.create(null);
  data[0] = rowNames.value;
  const formatSpec = vars.format ? vars.format.value : "h15";
  for (let i = 0; i < rowNames.value.length; i++) { rowMap[data[0][i]] = i; }
  for (let i = 0; i < matrix.value.length; i++) {
    for (let j = 0; j < matrix.value[0].length; j++) {
      const value = matrix.value[i][j];
      data[j + 1].push(format(value, formatSpec, "1000000."));
    }
  }

  return {
    value: { data, headings, columnMap, rowMap, units, dtype },
    unit: unitMap,
    dtype: dt.DATAFRAME
  }
};

const append = (o1, o2, vars, unitAware) => {
  // Append a vector to a dataframe.
  const oprnd = clone(o1); // We employ copy-on-write for data frames.
  const numRows = o1.value.data[0].length;
  if (numRows !== o2.value.length) { return errorOprnd("BAD_CONCAT") }
  oprnd.value.headings.push(o2.name);
  oprnd.value.columnMap[o2.name] = o1.value.headings.length - 1;
  const dtype = (o2.dtype & dt.COLUMNVECTOR)
    ? o2.dtype - dt.COLUMNVECTOR
    : o2.dtype - dt.ROWVECTOR;
  if (o2.unit.name && o2.unit.name.length > 0) {
    oprnd.value.units.push(o2.unit.name);
    const unit = unitFromUnitName(o2.unit.name, vars);
    if (!oprnd.unit[o2.unit.name]) {
      oprnd.unit[o2.unit.name] = unit;
    }
    if (unitAware) {
      const v = Matrix.convertFromBaseUnits(o2, unit.gauge, unit.factor);
      oprnd.value.data.push(v.map(e => datumFromValue(e, dtype)));
    } else {
      oprnd.value.data.push(o2.value.map(e => datumFromValue(e, dtype)));
    }
  } else {
    oprnd.value.units.push(null);
  }
  oprnd.value.dtype.push(dtype);
  return oprnd
};

const quickDisplay = str => {
  // This is called from the lexer for a display that changes with every keystroke.
  // It is a quick, rough approximation of a CSV parser.
  // I use this partly for speed, partly because it is more tolerant of badly formatted CSV
  // while the author is composing the CSV. This function doesn't spit up many error messages.
  // Final rendering of a data frame does not use this function.
  // Final rendering calls dataFrameFromCSV() and display() for accurate CSV parsing.
  if (str === "") { return "" }
  str = addTextEscapes(str.trim());
  const sepRegEx = str.indexOf("\t") > -1
    ? / *\t */g
    : / *\| */g;
  const lines = str.split(/\r?\n/g);
  let tex = "";
  if (lines.length < 3) {
    tex = "\\begin{matrix}\\text{";
    for (let i = 0; i < lines.length; i++) {
      tex += tablessTrim(lines[i]).replace(sepRegEx, "} & \\text{") + "} \\\\ \\text{";
    }
    tex = tex.slice(0, -10) + "\\end{matrix}";
  } else {
    tex = "\\begin{array}{l|cccccccccccccccccccccccc}\\text{";
    const cells = new Array(lines.length);
    for (let i = 0; i < lines.length; i++) {
      cells[i] = tablessTrim(lines[i]).split(sepRegEx);
    }

    let gotUnits = false;
    let gotAnswer = false;
    for (let j = 0; j < cells[1].length; j++) {
      if (numberRegEx$1.test(cells[1][j])) { gotAnswer = true; break }
    }
    if (!gotAnswer) {
      // line[1] had no numbers. If any numbers are ine line[2] then line[1] is units.
      for (let j = 0; j < cells[2].length; j++) {
        if (numberRegEx$1.test(cells[2][j])) { gotUnits = true; break }
      }
    }

    for (let i = 0; i < lines.length; i++) {
      tex += tablessTrim(lines[i]).replace(sepRegEx, "} & \\text{");
      tex += ((gotUnits && i === 1) || (!gotUnits && i === 0))
        ? "} \\\\ \\hline \\text{"
        : "} \\\\ \\text{";
    }

    tex = tex.slice(0, -10) + "\\end{array}";
  }
  tex = tex.replace(/·/g, "$·$");
  return tex
};

// The next 40 lines contain helper functions for display().
const isValidIdentifier = /^(?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′*$/;
const accentRegEx$1 = /^([^\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]+)([\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1])(.+)?/;
const subscriptRegEx = /([^_]+)(_[^']+)?(.*)?/;
const accentFromChar = Object.freeze({
  "\u0300": "\\grave",
  "\u0301": "\\acute",
  "\u0302": "\\hat",
  "\u0303": "\\tilde",
  "\u0304": "\\bar",
  "\u0305": "\\bar",
  "\u0307": "\\dot",
  "\u0308": "\\ddot",
  "\u030A": "\\mathring",
  "\u030C": "\\check",
  "\u0332": "\\underline",
  "\u20d0": "\\overleftharpoon",
  "\u20d1": "\\overrightharpoon",
  "\u20d6": "\\overleftarrow",
  "\u20d7": "\\vec",
  "\u20e1": "\\overleftrightarrow"
});
const formatColumnName = str => {
  // We can't call parse(str) because that would be a circular dependency.
  // So this module needs its own function to format dataframe column names.
  if (!isValidIdentifier.test(str)) {
    return "\\text{" + addTextEscapes(str) + "}"
  } else {
    // Format it like a Hurmet identifier.
    str = str.replace(/′/g, "'"); // primes
    let parts = str.match(accentRegEx$1);
    if (parts) {
      str = accentFromChar[parts[2]] + "{" + parts[1] + "}";
      return str + (parts[3] ? parts[3] : "")
    } else {
      parts = str.match(subscriptRegEx);
      let result = parts[1].length > 1 ? `\\text{${parts[1]}}` : parts[1];
      if (parts[2]) {
        result += "_" + `\\text{${parts[2].slice(1)}}`;
      }
      return result + (parts[3] ? parts[3] : "")
    }
  }
};

const isNotEmpty = row => {
  for (let i = 0; i < row.length; i++) {
    if (row[i] !== "" && row[i] !== null) { return true }
  }
  return false
};

const getNumInfo =  df => {
  // Gather info for in setting numbers on a decimal tab.
  const numCols = df.data.length;
  const colInfo = new Array(numCols);
  const cellInfo = new Array(numCols);
  for (let j = 0; j < numCols; j++) {
    if (df.dtype[j] & dt.RATIONAL) {
      colInfo[j] = { hasAlignChar: false, maxLenAfterAlignChar: 0 };
      cellInfo[j] = [];
      for (let i = 0; i < df.data[0].length; i++) {
        const datum = df.data[j][i];
        const pos = datum.indexOf(".");
        const hasAlignChar = pos > -1;
        const lenAfterAlignChar = hasAlignChar ? datum.length - pos - 1 : 0;
        cellInfo[j].push({ hasAlignChar, lenAfterAlignChar });
        if (hasAlignChar) {
          colInfo[j].hasAlignChar = true;
          if (lenAfterAlignChar > colInfo[j].maxLenAfterAlignChar) {
            colInfo[j].maxLenAfterAlignChar = lenAfterAlignChar;
          }
        }
      }
    }
  }
  return [colInfo, cellInfo]
};

const displayNum = (datum, colInfo, cellInfo, decimalFormat) => {
  let str = formattedDecimal(datum, decimalFormat);
  const n = colInfo.maxLenAfterAlignChar - cellInfo.lenAfterAlignChar;
  if (colInfo.hasAlignChar && (n > 0 || !cellInfo.hasAlignChar)) {
    str += "\\phantom{";
    if (colInfo.hasAlignChar && !cellInfo.hasAlignChar) {
      str += decimalFormat.slice(-1) === "." ? "." : "{,}";
    }
    if (n > 0) { str += "0".repeat(n); }
    str += "}";
  }
  return str
};

const display$2 = (df, formatSpec = "h3", decimalFormat = "1,000,000.", omitHeading = false) => {
  if (df.data.length === 0) { return "" }
  const numRows = df.data[0].length;
  const numCols = df.data.length;
  const writeRowNums = numRows > 5 && !df.rowMap;
  const numColsInHeading = numCols + (writeRowNums ? 1 : 0);
  let str = "\\begin{array}{";
  str += df.rowMap
    ? "l|"
    : writeRowNums
    ? "r|"
    : "";
  for (let j = 1; j < numColsInHeading; j++) {
    str += (df.dtype[j] & dt.RATIONAL ? "r " : "l " );
  }
  str = str.slice(0, -1) + "}";

  if (!omitHeading) {
    // Write the column names
    if (writeRowNums) { str += "&"; }
    for (let j = 0; j < numCols; j++) {
      str += "{" + formatColumnName(df.headings[j]) + "}&";
    }
    str = str.slice(0, -1) + " \\\\ ";
  }

  // Write the unit names
  if (isNotEmpty(df.units)) {
    if (writeRowNums) { str += "&"; }
    for (let j = 0; j < numCols; j++) {
      let rowTex = "";
      if (df.units[j] && df.units[j].length > 0) {
        const unitTex = unitTeXFromString(df.units[j]);
        rowTex = unitTex.replace("\\;\\, ", "");
      } else {
        rowTex = "";
      }
      str += rowTex + "&";
    }
    str = str.slice(0, -1) + " \\\\ ";
  }
  str += "\\hline ";

  const [colInfo, cellInfo] = getNumInfo(df);

  // Write the data
  for (let i = 0; i < numRows; i++) {
    if (writeRowNums) { str += String(i + 1) + " & "; }
    for (let j = 0; j < numCols; j++) {
      const datum = df.data[j][i];
      str += mixedFractionRegEx.test(datum)
        ? format(Rnl.fromString(datum), formatSpec, decimalFormat) + "&"
        : numberRegEx$1.test(datum)
        ? displayNum(datum, colInfo[j], cellInfo[j][i], decimalFormat) + "&"
//        ? formattedDecimal(datum, decimalFormat) + "&"
        : datum === ""
        ? "&"
        : "\\text{" + addTextEscapes(datum) + "}&";
    }
    str = str.slice(0, -1) + " \\\\ ";
  }

  str = str.slice(0, -3).trim();
  str += "\\end{array}";
  return str
};

const displayAlt$1 = (df, formatSpec = "h3", omitHeading = false) => {
  if (df.data.length === 0) { return "" }
  const numRows = df.data[0].length;
  const numCols = df.data.length;
  const writeRowNums = numRows > 5 && !df.rowMap;
  let str = "``";

  if (!omitHeading) {
    // Write the column names
    if (writeRowNums) { str += "|"; }
    str += ( df.headings[0] === "name" ? "" : df.headings[0]) + "|";
    for (let j = 1; j < numCols; j++) {
      str += df.headings[j] + "|";
    }
    str = str.slice(0, -1) + "\n";
  }

  // Write the unit names
  if (isNotEmpty(df.units)) {
    if (writeRowNums) { str += "|"; }
    for (let j = 0; j < numCols; j++) {
      str += df.units[j] + "|";
    }
    str = str.slice(0, -1) + "\n";
  }

  // Write the data
  for (let i = 0; i < numRows; i++) {
    if (writeRowNums) { str += String(i + 1) + "|"; }
    for (let j = 0; j < numCols; j++) {
      const datum = df.data[j][i];
      if (mixedFractionRegEx.test(datum)) {
        str += format(Rnl.fromString(datum), formatSpec, "100000.") + "|";
      } else {
        str += datum + "|";
      }
    }
    str = str.slice(0, -1) + "\n";
  }

  str = str.slice(0, -1).trim();
  str += "``";
  return str
};

const DataFrame = Object.freeze({
  append,
  dataFrameFromCSV,
  dataFrameFromVectors,
  matrix2table,
  display: display$2,
  displayAlt: displayAlt$1,
  quickDisplay,
  range
});

/*
 * This file deals with Hurmet maps, which are similar to hash maps.
 * In a map, every value is of the same data type and has the same unit-of-measure.
 */

const checkUnitEquality = (u1, u2) => {
  let x;
  let y;
  if (u1.expos && u2.expos) {
    x = u1.expos;
    y = u2.expos;
  } else {
    x = u1;
    y = u2;
  }
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      if (x.length !== y.length) { return false }
      x.forEach((e, i) => { if (e !== y[i]) { return false } });
      return true
    } else {
      return false
    }
  } else {
    return x === y
  }
};

const append$1 = (o1, o2, shape1, shape2) => {
  let map;
  let scalar;
  if (o1.dtype & dt.MAP) {
    if (shape2 !== "scalar") { return errorOprnd("BAD_APPEND", shape2) }
    map = o1;
    scalar = o2;
  } else {
    if (shape1 !== "scalar") { return errorOprnd("BAD_APPEND", shape1) }
    map = o2;
    scalar = o1;
  }
  if (!(map.dtype & scalar.dtype)) { errorOprnd("MAP_APPEND"); }
  if (!checkUnitEquality(map.unit, scalar.unit)) { errorOprnd("UNIT_APEND"); }
  map.value.set(scalar.name, scalar.value);
  return map
};

const convertFromBaseUnits$1 = (map, gauge, factor) => {
  map = mapMap( map, value =>  Rnl.divide(value, factor));
  if (!Rnl.isZero(gauge)) {
    map = mapMap( map, value => Rnl.subtract(value, gauge));
  }
  return  map
};

const convertToBaseUnits$1 = (map, gauge, factor) => {
  if (!Rnl.isZero(gauge)) {
    map = mapMap(map, value => Rnl.add(value, gauge));
  }
  return mapMap(map, value => Rnl.multiply(value, factor))
};

const display$3 = (result, formatSpec, decimalFormat, omitHeading = false) => {
  const mapValue = result.value.plain ? result.value.plain : result.value;
  let topRow = "";
  let botRow = "";
  for (const [key, value] of mapValue.entries()) {
    topRow += formatColumnName(key) + " & ";
    botRow += format(value, formatSpec, decimalFormat) + " & ";
  }
  topRow = topRow.slice(0, -3);
  botRow = botRow.slice(0, -3);
  let str = "\\begin{array}{c}";
  if (!omitHeading) { str += topRow + " \\\\ \\hline "; }
  str += botRow + "\\end{array}";
  if (result.unit && result.unit.name) {
    str += "\\;" + unitTeXFromString(result.unit.name);
  }
  return str
};

const displayAlt$2 = (result, formatSpec, decimalFormat, omitHeading = false) => {
  const mapValue = result.value.plain ? result.value.plain : result.value;
  let topRow = "";
  let botRow = "";
  for (const [key, value] of mapValue.entries()) {
    topRow += key + ' | ';
    botRow += format(value, formatSpec, decimalFormat) + " | ";
  }
  topRow = topRow.slice(0, -3);
  botRow = botRow.slice(0, -3);
  let str = "``";
  if (!omitHeading) { str += topRow + "\n"; }
  str += botRow + "``";
  if (result.unit && result.unit.name) {
    str = `${str} '${result.unit.name}'`;
  }
  return str
};

const singleValueFromMap = (map, key, isNumeric, unitAware) => {
  if (!map.value.has(key)) { return errorOprnd("BAD_KEY", key) }
  const value = clone(map.value.get(key));
  if (!isNumeric) {
    return { value, unit: map.unit, dtype: map.dtype - dt.MAP }
  } else if (unitAware) {
    return { value, unit: { expos: map.unit.expos }, dtype: map.dtype - dt.MAP }
  } else {
    return { value, unit: allZeros, dtype: map.dtype - dt.MAP }
  }
};

const valueFromMap = (map, keys, unitAware) => {
  // Return the value of a map's key/value pair.
  // `keys` is an array.
  for (let j = 0; j < keys.length; j++) {
    if (keys[j].dtype === dt.RATIONAL) { return errorOprnd("NUM_KEY") }
    keys[j] = keys[j].value;
  }
  if (keys.length === 1) {
    const isNumeric = (map.dtype & dt.RATIONAL);
    const treatAsUnitAware = keys.length > 1 || unitAware;
    return singleValueFromMap(map, keys[0], isNumeric, treatAsUnitAware)
  } else {
    const value = new Map();
    for (let i = 0; i < keys.length; i++) {
      value.set(keys[i], map.value.get(keys[i]));
    }
    return { value, unit: map.unit, dtype: map.dtype }
  }
};

const map = Object.freeze({
  append: append$1,
  convertFromBaseUnits: convertFromBaseUnits$1,
  convertToBaseUnits: convertToBaseUnits$1,
  display: display$3,
  displayAlt: displayAlt$2,
  valueFromMap
});

/*
 * lexer.js
 * This file supports parser.js.
 */

// Define constants for token types.
const tt = Object.freeze({
  UNARY: 0, //  unary TeX function, e.g. \sqrt
  BINARY: 1, // binary TeX function, e.g. \xrightarrow, differs from tt.BIN
  SUB: 2,
  SUP: 3,
  ACCENT: 4,
  // A left paren or bracket, ( or [], will be made invisible if located
  // directly after a token whose token type < 5.
  UNARYMINUS: 5,
  DIV: 6, //    stacked division: / \atop
  PRIME: 7,
  CURRENCY: 8, // currency symbol: $,£,¥,€, etc. Precedes its number.
  ORD: 9,
  VAR: 10,   // variable name, one letter long
  NUM: 11,
  SPACE: 12,
  LONGVAR: 13,
  LEFTBRACKET: 14,
  RIGHTBRACKET: 15,
  UNDEROVER: 16,
  LEFTRIGHT: 17, //   |
  STRING: 18,
  UNIT: 19, //    unit-of-measure, e.g., 'meters' or °
  BIN: 20, //     binary infix operators that render but don't calculate, e.g., ± \cdots
  ADD: 21, //     binary infix addition or subtraction operator: + -
  MULT: 22, //    binary infix multiplication or division operator: × * · // ÷
  REL: 23, //     relational operator:  ≟ > < ≤ ≥ etc.
  LOGIC: 24, //   if and or xor else otherwise
  SEP: 25, //     argument separators, cell separators and row separators: , ;
  FUNCTION: 26,
  ACCESSOR: 28, //   dot between a data frame name and a property, as in r.prop
  ENVIRONMENT: 29,
  FACTORIAL: 30,
  SUPCHAR: 31,
  ANGLE: 32,
  ELLIPSIS: 33, //       separator for ranges (1:n)
  KEYWORD: 34, //     keywords: for in while
  PROPERTY: 36, //    property name after a dot accessor
  COMMENT: 37,
  RETURN: 38,  // A return statement inside a user-defined function.
  TO: 39,
  DATAFRAME: 40,
  RICHTEXT: 41
});

const minusRegEx = /^-(?![-=<>:])/;
const numberRegEx$2 = new RegExp(Rnl.numberPattern);
const unitRegEx = /^(?:'[^']+'|[°ΩÅK])/;

const texFromNumStr = (numParts, decimalFormat) => {
  let num = "";
  if (numParts[2]) {
    // Hexadecimal
    num = "\\mathrm{" + numParts[2] + "}";
  } else if (numParts[5]) {
    return texFromMixedFraction(numParts)
  } else {
    // Decimal
    num = numParts[3];
    if (numParts[6]) { num += "." + numParts[6]; }
    num = formattedDecimal(num, decimalFormat);
    if (numParts[8]) {
      num += "\\%";
    } else if (numParts[7]) {
      if (numParts[7].charAt(0) === "-") {
        num += "\\text{e-}" + numParts[7].slice(1);
      } else {
        num += "\\text{e}" + numParts[7];
      }
    }
  }
  if (numParts[1]) {
    num = "\\text{-}" + num;
  }
  return num
};

const isUnary = (prevToken) => {
  switch (prevToken.ttype) {
    case tt.NUM:
    case tt.ORD:
    case tt.VAR:
    case tt.RIGHTBRACKET:
    case tt.LONGVAR:
    case tt.CURRENCY:
    case tt.SUPCHAR:
    case tt.PRIME:
    case tt.FACTORIAL:
      return false
    default:
      return true
  }
};

const wordRegEx = /^(?:(?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u212C\u2130\u2131\u210B\u2110\u2112\u2133\u211B\u212F\u210A\u2113\u2134]|(?:\uD835[\uDC00-\udc33\udc9c-\udccf\udd38-\udd50]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*|!in|-->|->|left\.|right\.|log10|log2)/;

const words = Object.freeze({
  //       input,    tex output,               type, closeDelim
  "true": ["true", "\\mathord{\\text{true}}", tt.ORD, ""],
  "false": ["false", "\\mathord{\\text{false}}", tt.ORD, ""],
  j: ["j", "j", tt.ORD, ""],
  cos: ["cos", "\\cos", tt.FUNCTION, ""],
  cosd: ["cosd", "\\operatorname{\\cos_d}", tt.FUNCTION, ""],
  if: ["if", "\\mathrel{\\mathrm{if}}", tt.LOGIC, ""],
  else: ["else", "\\mathrel{\\mathrm{else}}", tt.LOGIC, ""],
  and: ["and", "\\mathrel{\\mathrm{and}}", tt.LOGIC, ""],
  or: ["or", "\\mathrel{\\mathrm{or}}", tt.LOGIC, ""],
  for: ["for", "\\mathrel{\\mathrm{for}}", tt.KEYWORD, ""],
  while: ["while", "\\mathrel{\\mathrm{while}}", tt.KEYWORD, ""],
  in: ["in", "\\mathrel{\\mathrm{in}}", tt.KEYWORD, ""],
  break: ["break", "\\mathrel{\\mathrm{break}}", tt.KEYWORD, ""],
  to: ["to", "\\mathbin{\\mathrm{to}}", tt.TO, "" ],
  raise: ["raise", "\\mathrel{\\mathrm{raise}}", tt.UNARY, ""],
  echo: ["echo", "\\mathrel{\\mathrm{echo}}", tt.UNARY, ""],
  return: ["return", "\\mathrel{\\mathrm{return}}", tt.RETURN, ""],
  sqrt: ["sqrt", "\\sqrt", tt.UNARY, ""],
  otherwise: ["otherwise", "\\mathrel{\\mathrm{otherwise}}", tt.LOGIC, ""],
  root: ["root", "\\sqrt", tt.BINARY, ""],
  sin: ["sin", "\\sin", tt.FUNCTION, ""],
  sind: ["sind", "\\operatorname{\\sin_d}", tt.FUNCTION, ""],
  tan: ["tan", "\\tan", tt.FUNCTION, ""],
  tand: ["tand", "\\operatorname{\\tan_d}", tt.FUNCTION, ""],
  cotd: ["cotd", "\\operatorname{\\cot_d}", tt.FUNCTION, ""],
  secd: ["secd", "\\operatorname{\\sec_d}", tt.FUNCTION, ""],
  cscd: ["cscd", "\\operatorname{\\csc_d}", tt.FUNCTION, ""],
  log: ["log", "\\log", tt.FUNCTION, ""],
  ln: ["ln", "\\ln", tt.FUNCTION, ""],
  log10: ["log10", "\\log_{10}", tt.FUNCTION, ""],
  log2: ["log2", "\\log_{2}", tt.FUNCTION, ""],
  "log!": ["log!", "\\operatorname{log!}", tt.FUNCTION, ""],

  π: ["π", "π", tt.ORD, ""],
  "ℓ": ["ℓ", "ℓ", tt.VAR, ""],
  modulo: ["modulo", "\\operatorname{modulo}", tt.MULT, ""],
  // A few arrows are placed here to give them priority over other arrows
  "->": ["->", "\u2192", tt.REL, ""], // right arrow
  "-->": ["-->", "\\xrightarrow", tt.UNARY, ""],
  "<-->": ["<-->", "\\xrightleftarrows", tt.UNARY, ""]
});

const miscRegEx = /^([/÷\u2215_:,;^+\\\-–−*×∘⊗⦼⊙√∛∜·.%∘|╏‖¦><=≈≟≠≡≤≥≅∈∉⋐!¡‼¬∧∨⊻~#?⇒⟶⟵→←&@′″∀∃∫∬∮∑([{⟨⌊⎿⌈⎾〖〗⏋⌉⏌⌋⟩}\])˽∣ℂℕℚℝℤℓℏ∠¨ˆˉ˙˜▪✓\u00A0\u20D7$£¥€₨₩₪]+)/;

const miscSymbols = Object.freeze({
  //    input, output, type,  closeDelim
  "#": ["#", "#", tt.COMMENT, ""],
  "/": ["/", "\\dfrac{", tt.DIV, ""],   // displaystyle fraction
  "//": ["//", "\\tfrac{", tt.DIV, ""], // textstyle fraction
  "///": ["///", "/", tt.MULT, ""],     // inline (shilling) fraction
  "\u2215": ["\u2215", "\u2215", tt.MULT, ""], // inline (shilling) fraction
  "÷": ["÷", "÷", tt.MULT, ""],
  "_": ["_", "_", tt.SUB, ""],
  "^": ["^", "^", tt.SUP, ""],
  "+": ["+", "+", tt.ADD, ""],
  "-": ["-", "-", tt.ADD, ""],
  "–": ["-", "-", tt.ADD, ""], // \u2013 en dash
  "−": ["-", "-", tt.ADD, ""], // \u2212 math minus
  "*": ["*", "*", tt.MULT, ""],
  "×": ["×", "×", tt.MULT, ""],
  "∘": ["∘", "\\circ", tt.MULT, ""], // U+2218
  "⊗": ["⊗", "⊗", tt.MULT, ""],
  "√": ["√", "\\sqrt", tt.UNARY, ""],
  "\u221B": ["\u221B", "\\sqrt[3]", tt.UNARY, ""],
  "\u221C": ["\u221C", "\\sqrt[4]", tt.UNARY, ""],
  "+-": ["+-", "\u00B1", tt.BIN, ""],
  "**": ["**", "\\star", tt.BIN, ""],
  "·": ["·", "\u22C5", tt.MULT, ""], // dot operator
  "...": ["...", "\\dots", tt.ORD, ""],
  "%": ["%", "\\%", tt.FACTORIAL, ""],
  "^*": ["^*", "^*", tt.FACTORIAL, ""],
  "-:": ["-:", "÷", tt.MULT, ""],
  "=": ["=", "=", tt.REL, ""],
  "≈": ["≈", "≈", tt.REL, ""],
  "==": ["==", "==", tt.REL, ""],
  "≡": ["≡", "≡", tt.REL, ""],
  ">": [">", "\\gt", tt.REL, ""],
  "<": ["<", "\\lt", tt.REL, ""],
  "?=": ["?=", "\u225F", tt.REL, ""],
  "≟": ["≟", "\u225F", tt.REL, ""],
  "≠": ["≠", "≠", tt.REL, ""],
  "!=": ["!=", "≠", tt.REL, ""],
  "<>": ["<>", "≠", tt.REL, ""],
  ":=": [":=", "\u2254", tt.REL, ""],
  "<=": ["<=", "≤", tt.REL, ""],
  "≤": ["≤", "≤", tt.REL, ""],
  ">=": [">=", "\u2265", tt.REL, ""],
  "≥": ["≥", "≥", tt.REL, ""],
  "-=": ["-=", "\u2261", tt.REL, ""],
  "~=": ["~=", "\u2245", tt.REL, ""],
  "≅": ["≅", "≅", tt.REL, ""],
  "~~": ["~~", "\u2248", tt.REL, ""],
  "~": ["~", "\\sim", tt.REL, ""],
  "=>": ["=>", "\u21D2", tt.REL, ""],
  "⟶": ["⟶", "\\xrightarrow", tt.UNARY, ""],
  "⟵": ["⟵", "\\xleftarrow", tt.UNARY, ""],
  "⇒": ["⇒", "\u21D2", tt.REL, ""],
  "<=>": ["<=>", "\u21D4", tt.REL, ""],
  "-<": ["-<", "\u227A", tt.REL, ""],
  ">-": [">-", "\u227B", tt.REL, ""],
  "-<=": ["-<=", "\u2AAF", tt.REL, ""],
  ">-=": [">-=", "\u2AB0", tt.REL, ""],
  "_|_": ["_|_", "\\bot", tt.REL, ""],
  "|--": ["|--", "\u22A2", tt.REL, ""],
  "|==": ["|==", "\\models", tt.REL, ""],
  "∈": ["∈", "∈", tt.REL, ""],
  "∉": ["∉", "∉", tt.REL, ""],
  "⋐": ["⋐", "⋐", tt.REL, ""],
  "▪": ["▪", "\\mathrel{▪}", tt.REL, ""],

  "!": ["!", "!", tt.FACTORIAL, ""],
  "‼": ["‼", "!!", tt.FACTORIAL, ""],
  "!!": ["!!", "!!", tt.FACTORIAL, ""],
  "¡": ["¡", "¡", tt.FACTORIAL, ""],
  "&": ["&", "\\mathbin{\\&}", tt.ADD, ""], // string concatenator
  "&_": ["&_", "\\mathbin{\\underline{\\&}}", tt.ADD, ""], // concatenate to bottom
  "′": ["′", "'", tt.PRIME, ""],
  "″": ["″", "''", tt.PRIME, ""],
  "′′": ["′′", "''", tt.PRIME, ""],
  "′′′": ["′′′", "'''", tt.PRIME, ""],

  "∀": ["∀", "∀", tt.LOGIC, ""],
  "∃": ["∃", "∃", tt.LOGIC, ""],
  "∧": ["∧", "∧", tt.LOGIC, ""],
  "∨": ["∨", "∨", tt.LOGIC, ""],
  "⊻": ["⊻", "⊻", tt.LOGIC, ""], // xor
  "¬": ["¬", "¬", tt.UNARY, ""], // logical not
  // calculations do not use a ":"" token. But LOGIC is the right precedence for display.
  ":": [":", ":", tt.LOGIC, ""],

  "\u222B": ["\u222B", "\u222B", tt.UNDEROVER, ""], // \int
  "\u222C": ["\u222C", "\u222C", tt.UNDEROVER, ""], // \iint
  "\u222E": ["\u222E", "\u222E", tt.UNDEROVER, ""], // \oint
  "\u2211": ["\u2211", "\u2211", tt.UNDEROVER, ""], // \sum

  "(": ["(", "(", tt.LEFTBRACKET, ")"],
  "[": ["[", "[", tt.LEFTBRACKET, "]"],
  "{": ["{", "\\{", tt.LEFTBRACKET, "\\}"],
  "{:": ["{:", "{", tt.LEFTBRACKET, "}"],
  "⟨": ["⟨", "⟨", tt.LEFTBRACKET, "⟩"],
  ")": [")", ")", tt.RIGHTBRACKET, ""],
  "]": ["]", "]", tt.RIGHTBRACKET, ""],
  "}": ["}", "\\}", tt.RIGHTBRACKET, ""],
  "⟩": ["⟩", "⟩", tt.RIGHTBRACKET, ""],
  ":}": [":}", "}", tt.RIGHTBRACKET, ""],
  "|": ["|", "|", tt.LEFTRIGHT, ""],
  "||": ["||", "\\Vert ", tt.LEFTRIGHT, ""],
  "‖": ["‖", "\\Vert ", tt.LEFTRIGHT, ""],
  "<<": ["<<", "\u27E8", tt.LEFTBRACKET, "\u27E9"],
  ">>": [">>", "\u27E9", tt.RIGHTBRACKET, ""],
  "\u23BF": ["\u23BF", "\\lfloor ", tt.LEFTBRACKET, "\\rfloor "],
  "\u230B": ["\u230B", "\\rfloor ", tt.RIGHTBRACKET, ""],
  "\u23CC": ["\u23CC", "\\rfloor ", tt.RIGHTBRACKET, ""],
  "\u2308": ["\u2308", "\\lceil ", tt.LEFTBRACKET, "\\rceil "],
  "\u23BE": ["\u23BE", "\\lceil ", tt.LEFTBRACKET, "\\rceil "],
  "\u2309": ["\u2309", "\\rceil ", tt.RIGHTBRACKET, ""],
  "\u23CB": ["\u23CB", "\\rceil ", tt.RIGHTBRACKET, ""],
  "\u3016": ["\u3016", "{", tt.LEFTBRACKET, "}"],
  "\u3017": ["\u3017", "}", tt.RIGHTBRACKET, ""],
  "¦": ["¦", "\\mid ", tt.REL, ""],

  // double-struck, i.e. blackboard bold
  "ℂ": ["ℂ", "\u2102", tt.ORD, ""],
  "ℕ": ["ℕ", "\u2115", tt.ORD, ""],
  "ℚ": ["ℚ", "\u211A", tt.ORD, ""],
  "ℝ": ["ℝ", "\u211D", tt.ORD, ""],
  "ℤ": ["ℤ", "\u2124", tt.ORD, ""],

  "ℏ": ["ℏ", "ℏ", tt.ORD, ""],

  //arrows
  "\u2192": ["\u2192", "\u2192", tt.REL, ""],
  "\u2190": ["\u2190", "\u2190", tt.REL, ""], // left arrow
  ">->": [">->", "\u21a3", tt.REL, ""], // \rightarrowtail
  "->>": ["->>", "\u21a0", tt.REL, ""], // \twoheadrightarrow
  "|->": ["|->", "\u21a6", tt.REL, ""], // \mapsto

  // extensible arrows
  "<--": ["<--", "\\xleftarrow", tt.UNARY, ""],
  "==>": ["==>", "\\xRightarrow", tt.UNARY, ""],
  "<==": ["<==", "\\xLeftarrow", tt.UNARY, ""],
  "<-->": ["<-->", "\\xleftrightarrow", tt.UNARY, ""],
  "<==>": ["<==>", "\\xLeftrightarrow", tt.UNARY, ""],

  "\u2220": ["\u2220", "\u2220", tt.ANGLE, ""],
  "✓": ["✓", "✓", tt.ORD, ""],
  "˽": ["˽", "~", tt.SPACE, ""],  // "~" is a no-break space in LaTeX.
  "\\,": ["\\,", ",\\:", tt.SEP, ""], // escape character to enable non-matrix comma in parens
  "\\;": ["\\;", ";\\:", tt.SEP, ""],
  "…": ["…", "…", tt.ORD, ""],

  "..": ["..", "..", tt.RANGE, ""], // range separator
  ",": [",", ",\\:", tt.SEP, ""], // function argument separator
  ";": [";", ";\\:", tt.SEP, ""], // row separator

  "$": ["$", "\\$", tt.CURRENCY, ""],
  "£": ["£", "£", tt.CURRENCY, ""],
  "¥": ["¥", "¥", tt.CURRENCY, ""],
  "€": ["€", "€", tt.CURRENCY, ""],
  "₨": ["₨", "₨", tt.CURRENCY, ""],
  "₩": ["₩", "₩", tt.CURRENCY, ""],
  "₪": ["₪", "₪", tt.CURRENCY, ""]
});

const texFunctionRegEx = /^(\\[A-Za-z]+\.?|\\([:.!\u0020]|'+))/;

const texFunctions = Object.freeze({
  //          input,    output,  type,  closeDelim
  "\\aleph": ["\\aleph", "\u2135", tt.VAR, ""],
  "\\beth": ["\\beth", "\u2136", tt.VAR, ""],
  "\\gimel": ["gimel", "\u2137", tt.VAR, ""],
  "\\daleth": ["daleth", "\u2138", tt.VAR, ""],
  "\\atop": ["\\atop", "\\atop{", tt.DIV, ""],
  "\\cdots": ["\\cdots", "\u22ef", tt.BIN, ""],
  "\\vdots": ["\\vdots", "\u22ee", tt.BIN, ""],
  "\\ddots": ["\\ddots", "\u22f1", tt.BIN, ""],
  "\\iff": ["\\iff", "\\iff", tt.LOGIC, ""],
  "\\land": ["\\land", "\\land", tt.BIN, ""],
  "\\lor": ["\\lor", "\\lor", tt.BIN, ""],
  "\\in": ["\\in", "∈", tt.REL, ""],
  "\\notin": ["\\notin", "∉", tt.REL, ""],
  "\\Subset": ["\\Subset", "⋐", tt.REL, ""],
  "\\left.": ["\\left.", "\\left.", tt.LEFTBRACKET, "\\right."],
  "\\right.": ["\\right.", "\\right.", tt.RIGHTBRACKET, ""],
  "\\mod": ["\\mod", "\\mod", tt.BIN, ""],
  "\\diamond": ["\\diamond", "\\diamond", tt.ORD, ""],
  "\\square": ["\\square", "\\square", tt.ORD, ""],
  "\\int": ["\\int", "\\int", tt.UNDEROVER, ""],
  "\\iint": ["\\iint", "\\iint", tt.UNDEROVER, ""],
  "\\iiint": ["\\iiint", "\\iiint", tt.UNDEROVER, ""],
  "\\oint": ["\\oint", "\\oint", tt.UNDEROVER, ""],
  "\\oiint": ["\\oiint", "\\oiint", tt.UNDEROVER, ""],
  "\\oiiint": ["\\oiiint", "\\oiiint", tt.UNDEROVER, ""],
  "\\over": ["\\over", "\\dfrac{", tt.DIV],
  "\\sum": ["\\sum", "\\sum", tt.UNDEROVER, ""],
  "\\prod": ["\\prod", "\\prod", tt.UNDEROVER, ""],
  "\\quad": ["\\quad", "\\quad", tt.SPACE, ""],
  "\\qquad": ["\\qquad", "\\qquad", tt.SPACE, ""]
});

const accents$1 = Object.freeze([
  "Bbb",
  "Overrightarrow",
  "acute",
  "bar",
  "bm",
  "bold",
  "boldsymbol",
  "breve",
  "check",
  "ddot",
  "dot",
  "frak",
  "grave",
  "hat",
  "mathbb",
  "mathbf",
  "mathcal",
  "mathfrak",
  "mathit",
  "mathnormal",
  "mathring",
  "mathrm",
  "mathscr",
  "mathsf",
  "mathtt",
  "overbrace",
  "overgroup",
  "overleftarrow",
  "overleftharpoon",
  "overleftrightarrow",
  "overline",
  "overrightarrow",
  "overrightharpoon",
  "tilde",
  "underbrace",
  "undergroup",
  "underleftarrow",
  "underleftrightarrow",
  "underline",
  "underrightarrow",
  "utilde",
  "vec",
  "widecheck",
  "widehat",
  "widetilde"
]);

// Avoid "operatorname" for functions that are already math operators.
const mathOperators = Object.freeze([
  "arccos",
  "arcsin",
  "arctan",
  "arctg",
  "arcctg",
  "cos",
  "cosec",
  "cosh",
  "cot",
  "cotg",
  "coth",
  "csc",
  "ctg",
  "cth",
  "det",
  "dim",
  "exp",
  "gcd",
  "lg",
  "lim",
  "ln",
  "log",
  "max",
  "min",
  "sec",
  "sin",
  "sinh",
  "sh",
  "sqrt",
  "sup",
  "tan",
  "tanh",
  "tg",
  "th"
]);

const colors = Object.freeze([
  "blue",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red"
]);

const unaries = Object.freeze([
  "bcancel",
  "boxed",
  "cancel",
  // Hurmet does not support \ce.
  "clap",
  "color",
  "llap",
  "mathclap",
  "not",
  "operatorname",
  "phantom",
  "pu",
  "rlap",
  "sout",
  "sqrt",
  "tag",
  "textbf",
  "textit",
  "textmd",
  "textnormal",
  "textrm",
  "textsf",
  "texttt",
  "textup",
  "xLeftarrow",
  "xLeftrightarrow",
  "xRightarrow",
  "xcancel",
  "xleftarrow",
  "xleftrightarrow",
  "xleftharpoondown",
  "xleftharpoons",
  "xleftharpoonup",
  "xlongequal",
  "xmapsto",
  "xrightarrow",
  "xrightharpoondown",
  "xrightharpoonup",
  "xrightleftarrows",
  "xrightleftharpoons",
  "xtofrom",
  "xtwoheadleftarrow",
  "xtwoheadrightarrow"
]);

const binaries = Object.freeze([
  "dfrac",
  "frac",
  "lower",
  "overset",
  "raisebox",
  "stackrel",
  "tag",
  "tfrac",
  "underset"
]);

const texREL = Object.freeze([
  "Bumpeq", "Colonapprox", "Coloneq", "Coloneqq", "Colonsim", "Darr", "Doteq", "Downarrow",
  "Eqcolon", "Eqqcolon", "Harr", "Larr", "Leftarrow", "Leftrightarrow", "Lleftarrow",
  "Longleftarrow", "Longleftrightarrow", "Longrightarrow", "Lrarr", "Lsh", "Rarr",
  "Rightarrow", "Rrightarrow", "Rsh", "Supset", "Subset", "Uarr", "Uparrow", "Updownarrow",
  "Vdash", "Vvdash", "approx", "approxeq", "asymp", "backepsilon", "backsim", "backsimeq",
  "between", "bowtie", "bumpeq", "circeq", "circlearrowleft", "circlearrowright",
  "colonapprox", "coloneq", "coloneqq", "colonsim", "cong", "curlyeqprec", "curlyeqsucc",
  "curvearrowleft", "curvearrowright", "dArr", "darr", "dashleftarrow", "dashrightarrow",
  "dashv", "dblcolon", "doteq", "doteqdot", "downarrow", "downdownarrows", "downharpoonleft",
  "downharpoonright", "eqcirc", "eqcolon", "eqqcolon", "eqsim", "eqslantgtr", "eqslantless",
  "equiv", "fallingdotseq", "frown", "ge", "geq", "geqq", "geqslant", "gets", "gg", "ggg",
  "gggtr", "gnapprox", "gneq", "gneqq", "gnsim", "gt", "gtrapprox", "gtreqless", "gtreqqless",
  "gtrless", "gtrsim", "gvertneqq", "hArr", "harr", "hookleftarrow", "hookrightarrow", "iff",
  "impliedby", "implies", "in", "isin", "Join", "gets", "impliedby", "implies", "in", "isin",
  "lArr", "larr", "le", "leadsto", "leftarrow", "leftarrowtail", "leftharpoondown",
  "leftharpoonup", "leftleftarrows", "leftrightarrow", "leftrightarrows", "leftrightharpoons",
  "leftrightsquigarrow", "leq", "leqq", "leqslant", "lessapprox", "lesseqgtr", "lesseqqgtr",
  "lessgtr", "lesssim", "ll", "lll", "llless", "lnapprox", "lneq", "lneqq", "lnsim",
  "longleftarrow", "longleftrightarrow", "longmapsto", "longrightarrow", "looparrowleft",
  "looparrowright", "lrArr", "lrarr", "lt", "lvertneqq", "mapsto", "mid", "models",
  "multimap", "nLeftarrow", "nLeftrightarrow", "nRightarrow", "nVDash", "nVdash", "ncong",
  "ne", "nearrow", "neq", "nexists", "ngeq", "ngeqq", "ngeqslant", "ngtr", "ni", "nleftarrow",
  "nleftrightarrow", "nleq", "nleqq", "nleqslant", "nless", "nmid", "notin", "notni",
  "nparallel", "nprec", "npreceq", "nrightarrow", "nshortmid", "nshortparallel", "nsim",
  "nsubseteq", "nsubseteqq", "nsucc", "nsucceq", "nsupseteq", "nsupseteqq", "ntriangleleft",
  "ntrianglelefteq", "ntriangleright", "ntrianglerighteq", "nvDash", "nvdash", "nwarrow",
  "owns", "parallel", "perp", "pitchfork", "prec", "precapprox", "preccurlyeq", "preceq",
  "precnapprox", "precneqq", "precnsim", "precsim", "propto", "rArr", "rarr", "restriction",
  "rightarrow", "rightarrowtail", "rightharpoondown", "rightharpoonup", "rightleftarrows",
  "rightleftharpoons", "rightrightarrows", "rightsquigarrow", "risingdotseq", "searrow",
  "shortmid", "shortparallel", "sim", "simeq", "smallfrown", "smallsmile", "smile",
  "sqsubset", "sqsubseteq", "sqsupset", "sqsupseteq", "sub", "sube", "subset", "subseteq",
  "subseteqq", "subsetneq", "subsetneqq", "succ", "succapprox", "succcurlyeq", "succeq",
  "succnapprox", "succneqq", "succnsim", "succsim", "supe", "supset", "supseteq", "supseteqq",
  "supsetneq", "supsetneqq", "swarrow", "thickapprox", "thicksim", "to", "trianglelefteq",
  "triangleq", "trianglerighteq", "twoheadleftarrow", "twoheadrightarrow", "uArr", "uarr",
  "uparrow", "updownarrow", "upharpoonleft", "upharpoonright", "upuparrows", "varpropto",
  "varsubsetneq", "varsubsetneqq", "varsupsetneq", "varsupsetneqq", "vartriangle",
  "vartriangleleft", "vartriangleright", "vcentcolon", "vdash", "vDash"
]);

const superRegEx = /^⁻?[²³¹⁰⁴⁵⁶⁷⁸⁹]+/;

const cloneToken = tkn => [tkn[0], tkn[1], tkn[2], tkn[3]];

const accentFromChar$1 = Object.freeze({
  "\u0300": "\\grave",
  "\u0301": "\\acute",
  "\u0302": "\\hat",
  "\u0303": "\\tilde",
  "\u0304": "\\bar",
  "\u0305": "\\bar",
  "\u0307": "\\dot",
  "\u0308": "\\ddot",
  "\u030A": "\\mathring",
  "\u030C": "\\check",
  "\u0332": "\\underline",
  "\u20d0": "\\overleftharpoon",
  "\u20d1": "\\overrightharpoon",
  "\u20d6": "\\overleftarrow",
  "\u20d7": "\\vec",
  "\u20e1": "\\overleftrightarrow"
});

const wideAccentFromChar = Object.freeze({
  "\u0300": "\\grave",
  "\u0301": "\\acute",
  "\u0302": "\\widehat",
  "\u0303": "\\widetilde",
  "\u0304": "\\overline",
  "\u0305": "\\overline",
  "\u0307": "\\dot",
  "\u0308": "\\ddot",
  "\u030A": "\\mathring",
  "\u030C": "\\check",
  "\u0332": "\\underline",
  "\u20d0": "\\overleftharpoon",
  "\u20d1": "\\overrightharpoon",
  "\u20d6": "\\overleftarrow",
  "\u20d7": "\\overrightarrow",
  "\u20e1": "\\overleftrightarrow"
});

const groupSubscript = word => {
  const pos = word.indexOf("_");
  return pos === -1
    ? word
    : word.slice(0, pos + 1) + "{" + word.slice(pos + 1) + "}"
};

const checkForTrailingAccent = word => {
  const ch = word.slice(-1);
  if (/[\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]/.test(ch)) {
    word = word.slice(0, -1);
    return word === "i"
      ? accentFromChar$1[ch] + "{ı}"  // dotless i
      : word === "j"
      ? accentFromChar$1[ch] + "{ȷ}"  // dotless j
      : word.length === 1
      ? accentFromChar$1[ch] + "{" + word + "}"
      : wideAccentFromChar[ch] + "{" + word + "}"
  } else {
    return word
  }
};

const lexOneWord = (str, prevToken) => {
  const matchObj = wordRegEx.exec(str);
  if (matchObj) {
    let match = matchObj[0].replace(/_*$/, ""); // drop trailing underscores

    // Get the immediately following character
    const fc = str.charAt(match.length);

    const word = words[match];
    if (word && fc !== "′") {
      return word
    } else if (/^\(/.test(fc)) {
      // word is followed by an open paren. Treat it as a function name
      return (prevToken.ttype === tt.ACCENT)
        ? [match, match + "}{", tt.FUNCTION, ""]
        : match === "sqrt"
        ? [match, "\\sqrt", tt.UNARY, ""]
        : match === "f"
        ? [match, match, tt.FUNCTION, ""]
        : isIn(match, mathOperators)
        ? [match, "\\" + match, tt.FUNCTION, ""]
        : [match, "\\operatorname{" + groupSubscript(match) + "}", tt.FUNCTION, ""]
    } else if (prevToken.ttype === tt.ACCESSOR) {
      return [match, match, tt.PROPERTY, ""]
    } else if (/[_\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]/.test(match)) {
      let identifier = "";
      if (match.indexOf("_") === -1) {
        identifier = checkForTrailingAccent(match);
        return [match, identifier, (match.length > 2) ? tt.LONGVAR : tt.VAR, ""]
      } else {
        const segments = match.split("_");
        for (let i = segments.length - 1; i >= 0; i--) {
          segments[i] = checkForTrailingAccent(segments[i]);
          if (i > 0) {
            segments[i] = "_\\text{" + segments[i] + "}";
          }
        }
        identifier = segments.join("");
        const primes = /^′*/.exec(str.slice(match.length));
        if (primes) {
          match += primes[0];
          identifier += "'".repeat(primes[0].length);
        }
        const pos = identifier.indexOf("_");
        if (pos > -1) {
          // Cramp subscript placement by wrapping it with braces.
          // This helps Cambria Math to supply the correct size radical.
          identifier = identifier.slice(0, pos) + "{" + identifier.slice(pos) + "}";
        }
        return [match, identifier, (segments[0].length > 1) ? tt.LONGVAR : tt.VAR, ""]
      }
    } else if (match.length === 2 & match.charAt(0) === "\uD835") {
      return [match, match, tt.VAR, ""]
    } else if (match.length > 1) {
      return [match, match, tt.LONGVAR, ""]
    } else {
      // Return a single character variable name
      if (match.charAt(0) === "\uD835") {
        return [match.substring(0, 2), match.substring(0, 2), tt.VAR, ""]
      } else {
        return [match.charAt(0), match.charAt(0), tt.VAR, ""]
      }
    }
  }
};

const lex = (str, decimalFormat, prevToken, inRealTime = false) => {
  // Get the next token in str. Return an array with the token's information:
  // [input, TeX output, type, associated close delimiter]
  let pos = 0;
  let st = "";
  let matchObj;

  if (str.charAt(0) === '"') {
    // String between double quotation marks. Parser will convert it to \text{…}
    pos = str.indexOf('"', 1);
    if (pos > 0) {
      // Disallow \r or \n by truncating the string.
      st = str.substring(1, pos).replace(/\r?\n.*/, "");
      return ['"' + st + '"', st, tt.STRING, ""]
    } else {
      return [str, str.replace(/\r?\n.*/, ""), tt.STRING, ""]
    }
  }

  if (/^#/.test(str)) {
    // comment
    st = str.slice(2);
    pos = st.indexOf("\n");
    if (pos > -1) {
      const posReturn = st.indexOf("\n");
      if (posReturn > -1 && posReturn < pos) { pos = posReturn; }
    }
    if (pos > -1) {
      st = st.slice(0, pos);
    }
    return [`#${st}`, `\\text{\\texttt{ \\#${st}}}`, tt.COMMENT, ""]
  }

  if (/^``/.test(str)) {
    // inline CSV string between double back ticks, a data frame literal.
    pos = str.indexOf("`", (str.charAt(2) === "`" ? 3 : 2));
    const inputStr = (pos > 0 ? str.slice(2, pos) : str.slice(2));
    const st = tablessTrim(inputStr);
    let tex = "";
    if (inRealTime) {
      tex = DataFrame.quickDisplay(st);
    } else {
      const dataStructure = DataFrame.dataFrameFromCSV(st, {});
      if (dataStructure.dtype === dt.DATAFRAME) {
        tex = DataFrame.display(dataStructure.value, "h3", decimalFormat);
      } else {
        tex = map.display(dataStructure, "h3", decimalFormat);
      }
    }
    return ["``" + inputStr + "``", tex, tt.DATAFRAME, ""]
  }

  if (str.charAt(0) === '`') {
    // Rich text string. Usually a return from a calculation.
    // String between double quotation marks. Parser will convert it to \text{…}
    pos = str.indexOf('`', 1);
    if (pos > 0) {
      // Disallow \r or \n by truncating the string.
      st = str.substring(1, pos).replace(/\r?\n.*/, "");
      return ['`' + st + '`', st, tt.RICHTEXT, ""]
    } else {
      return [str, str.replace(/\r?\n.*/, ""), tt.RICHTEXT, ""]
    }
  }

  if (unitRegEx.test(str)) {
    // String between single quotation marks. That signals a tt.UNIT.
    pos = str.indexOf("'", 1);
    if (pos > 0) {
      st = str.substring(1, pos);
      return ["'" + st + "'", unitTeXFromString(st), tt.UNIT, ""]
    } else {
      // One of the unambiguous unit symbols, like ° or Å
      return [str.charAt(0), str.charAt(0), tt.UNIT, ""]
    }
  }

  // Strings beginning with "\" are passed through as a TeX control word.
  matchObj = texFunctionRegEx.exec(str);
  if (matchObj) {
    // TeX control word, starting with backslash. e.g. \, or \circ
    const match = matchObj[0];
    st = match.substring(1);
    if (isIn(st, accents$1)) {
      return [match, match, tt.ACCENT, ""]
    }
    if (isIn(st, unaries)) {
      return [match, match, tt.UNARY, ""]
    }
    if (isIn(st, colors)) {
      return [match, "\\textcolor{" + st + "}", tt.UNARY, ""]
    }
    if (isIn(st, binaries)) {
      return [match, match, tt.BINARY, ""]
    }
    if (isIn(st, texREL)) {
      return [match, match, tt.REL, ""]
    }
    const texFunc = texFunctions[match];
    if (texFunc) {
      return cloneToken(texFunc)
    }
    // default case is a mathord. So I have not enumerated any ORDs
    return [match, match, tt.ORD, ""]
  }

  if (minusRegEx.test(str)) {
    if (isUnary(prevToken)) {
      // Check if the unary minus is part of a number
      const numParts = str.match(numberRegEx$2);
      if (numParts) {
        // numbers
        st = texFromNumStr(numParts, decimalFormat);
        return [numParts[0], st, tt.NUM, ""]
      }
    }
    return ["-", "-", tt.ADD, ""]
  }

  const numParts = str.match(numberRegEx$2);
  if (numParts) {
    // numbers
    st = texFromNumStr(numParts, decimalFormat);
    return [numParts[0], st, tt.NUM, ""]
  }

  // Before lexing for a word, find underscores before a group
  if (/^_[([{]/.test(str)) {
    return ["_", "_", tt.SUB, ""]
  }

  const word = lexOneWord(str, prevToken);
  if (word) { return cloneToken(word) }

  const nums = superRegEx.exec(str);
  if (nums) {
    return [nums[0], nums[0], tt.SUPCHAR, ""]
  }

  //return maximal initial substring of str that appears in misc names
  matchObj = miscRegEx.exec(str);
  if (matchObj) {
    const match = matchObj[0];
    for (let i = match.length; i >= 1; i--) {
      st = match.substr(0, i);
      if (miscSymbols[st]) { return cloneToken(miscSymbols[st]) }
    }
  }

  // No keywords were matched. Return 1 character.
  const c1 = str.charAt(0);
  if (c1 === "." && (prevToken.ttype === tt.VAR || prevToken.ttype === tt.LONGVAR ||
    prevToken.ttype === tt.STRING || prevToken.input === "]" ||
    prevToken.ttype === tt.PROPERTY)) {
    // Suppress the spacing of the accessor dot.
    return [".", "{.}", tt.ACCESSOR, ""]
  }
  return [c1, addTextEscapes(c1), tt.VAR, ""]
};

/*
 * parser.js
 *
 * This file takes a text string and compiles it to TeX.
 * If the isCalc flag is set, then parse() also compiles the text to an RPN string
 * used elsewhere for further Hurmet computation.
 *
*/

// Keep the next three lists sorted, so that the isIn() binary search will work properly.
const builtInFunctions = [
  "Gamma", "Im", "Re", "abs", "acos", "acosd", "acosh", "acot", "acotd", "acoth", "acsc",
  "acscd", "acsch", "argument", "asec", "asecd", "asech", "asin", "asind", "asinh", "atan",
  "atan2", "atand", "atanh", "binomial", "chr", "cos", "cosd", "cosh", "cosh", "cot", "cotd",
  "coth", "coth", "count", "csc", "cscd", "csch", "csch", "exp",
  "fetch", "format", "gcd", "hypot", "isNaN", "length", "lerp", "ln", "log", "log10", "log2",
  "logFactorial", "logGamma", "logn", "logΓ", "matrix2table", "random", "rms", "round",
  "roundSig", "roundn", "sec", "secd", "sech", "sech", "sign", "sin", "sind", "sinh",
  "startSvg", "string", "tan", "tand", "tanh", "tanh", "trace", "transpose", "zeros", "Γ"
];

const builtInReducerFunctions = ["dataframe",
  "max", "mean", "median", "min", "product", "range", "stddev", "sum", "variance"
];

const trigFunctions = ["cos", "cosd", "cot", "cotd", "csc", "cscd", "sec", "secd",
  "sin", "sind", "tand", "tan"];

const rationalRPN = numStr => {
  // Return a representation of a rational number that is recognized by evalRPN().
  const num = Rnl.fromString(numStr);
  return "®" + String(num[0]) + "/" + String(num[1])
};

const calligraphicRegEx = /^(:?\uD835[\uDC9C-\uDCCF]|[\udc9d\udca0\udca1\udca3\udca4\udca7\udca8\udcad\udcba\udcbc\udcc1\udcc4])/;

const bmpCalligraphic = {
  "\u212C": "B",
  "\u2130": "E",
  "\u2131": "F",
  "\u210B": "H",
  "\u2110": "I",
  "\u2112": "L",
  "\u2133": "M",
  "\u211B": "R",
  "\u212F": "e",
  "\u210A": "g",
  "\u2113": "l",
  "\u2134": "o"
};

const assertCalligraphic = str => {
  // The Unicode code points for "fancy" letters do not distinguish between script
  // and calligraphic. Hurmet takes them to be calligraphic.
  // That currently comes naturally to MathML if the system font in use is Cambria Math.
  // For KaTeX HTML, we have to assert it, which we do here.
  // I may have to revisit this and also assert in MathML, depending on how
  // https://github.com/mathml-refresh/mathml/issues/61 is resolved.
  // I do not append \uFE00 as Murray Sargent proposes, at least not yet.
  // Ref: https://blogs.msdn.microsoft.com/murrays/2016/02/05/unicode-math-calligraphic-alphabets/
  const match = calligraphicRegEx.exec(str);
  if (!match) { return str }
  let ch = "";
  if (str.charAt(0) === "\uD835") {
    const codePoint = str.charCodeAt(1);
    ch = String.fromCharCode(codePoint - (codePoint <= 0xdcb5 ? 0xdc5b : 0xdc55));
  } else {
    // Characters in the Unicode Basic Multilingual Plane
    ch = bmpCalligraphic[str.charAt(0)];
  }
  return `\\mathcal{${ch}}` + str.slice(match[0].length)
};

const checkForUnaryMinus = (token, prevToken) => {
  switch (prevToken.ttype) {
    case tt.NUM:
    case tt.ORD:
    case tt.VAR:
    case tt.RIGHTBRACKET:
    case tt.LONGVAR:
    case tt.PROPERTY:
    case tt.UNIT:
    case tt.SUPCHAR:
    case tt.PRIME:
    case tt.FACTORIAL:
      return token
    // do nothing
  }
  if (token.output === "-") {
    return { input: "~", output: "\\text{-}", ttype: tt.UNARYMINUS }
  } else {
    return { input: "+", output: "~+", ttype: tt.UNARYMINUS }
  }
};

const numFromSuperChar = {
  "⁻": "-",
  "²": "2",
  "³": "3",
  "¹": "1",
  "⁰": "0",
  "⁴": "4",
  "⁵": "5",
  "⁶": "6",
  "⁷": "7",
  "⁸": "8",
  "⁹": "9"
};

const numFromSupChars = str => {
  let num = "";
  for (const ch of str) {
    num += numFromSuperChar[ch];
  }
  return num
};

const colorSpecRegEx = /^(#([a-f0-9]{6}|[a-f0-9]{3})|[a-z]+|\([^)]+\))/i;

const factors = /^[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133\uD835[({√∛∜]/;

const setUpIf = (rpn, tokenInput, exprStack, delim) => {
  // The Hurmet CASES expression acts lazily. To accommodate that, push the
  // sub-expression onto a stack of expressions. At the closing brace,
  // we'll pop all the expressions off the stack and place them after the conditions.
  // Later, evaluate.js will evaluate the conditions and then pick the correct expression.
  const expression = rpn.replace(/^.*\xa0/, "").replace(/§$/, "\xa0");
  exprStack.push(expression);
  rpn = rpn.length === expression.length ? "" : rpn.slice(0, rpn.length - expression.length);
  delim.numArgs += 1;
  if (tokenInput === "otherwise") { rpn += "true"; }
  return rpn
};

const functionExpoRegEx = /^[\^⁻⁰¹²³\u2074-\u2079]/;

const openParenRegEx = /^ *\(/;

const exponentOfFunction = (str, decimalFormat, isCalc) => {
  // As in: sin²()
  let expoInput = "";
  if (str.charAt(0) !== "^") {
    expoInput = /^[⁰¹²³\u2074-\u2079⁻]+/.exec(str)[0];
    expoInput = numeralFromSuperScript(expoInput);
  } else if (!openParenRegEx.test(str.slice(1))) {
    expoInput = lex(str.slice(1), decimalFormat, { input: "", output: "", ttype: 50 })[0];
  } else {
    // The exponent is in parens. Find its extent.
    expoInput = "(";
    let level = 1;
    for (let i = 2; i < str.length; i++) {
      const ch = str.charAt(i);
      expoInput += ch;
      if ("\"'`".indexOf(ch) > -1) {
        const pos = str.indexOf(ch, i + 1);
        expoInput += str.slice(i + 1, pos + 1);
        i = pos;
      } else if ("([{⟨\u2308\u23BF\u23BE\u3016".indexOf(ch) > -1) {
        level += 1;
      } else if (")]}⟩\u2309\u230B\u23CC\u3017".indexOf(ch) > -1) {
        level -= 1;
      }
      if (level === 0) { break }
    }
  }

  const parseInput = (expoInput.charAt(0) === "(")
    ? expoInput.slice(1, -1).trim()
    : expoInput;

  if (isCalc) {
    const expoOutput = parse(parseInput, decimalFormat, true);
    return [expoInput, "{" + expoOutput[0] + "}", expoOutput[1]]
  } else {
    const expoTex = parse(parseInput, decimalFormat, false);
    return [expoInput, "{" + expoTex + "}", ""]
  }
};

const testForImplicitMult = (prevToken, texStack, str) => {
  // Some math expressions imply a multiplication without writing an explicit operator token.
  // Examples:  e = m c², y = 3(2+5), n = (a+5)x, z = 5 + 2i
  // Hurmet writes the echo expression with a more explicit written form of multiplication.
  // The echo shows each multiplication in one of three ways: a x b,  a · b, or (a)(b)
  // This sub is going to determine if such an adjustment is required for the current position.

  if (texStack.length > 0) {
    // Test for a tex unary function or a function w/ tt.SUP or tt.SUB
    const topType = texStack[texStack.length - 1].ttype;
    if (topType === tt.UNARY || topType === tt.BINARY) { return false }
    if (topType === tt.SUB || topType === tt.SUP) {
      if (texStack[texStack.length - 1].isOnFunction) { return false }
    }
  }

  let isPreceededByFactor = false;
  if (prevToken.output) {
    const pc = prevToken.output.charAt(prevToken.length - 1);
    if (")]}".indexOf(pc) > -1) {
      if ((pc === ")" || pc === "]") && /^[([]/.test(str)) {
        // This was already handled by the tt.RIGHTBRACKET case
        return false
      } else {
        isPreceededByFactor = true;
      }
    } else {
      switch (prevToken.ttype) {
        case tt.ORD:
        case tt.NUM:
        case tt.VAR:
        case tt.LONGVAR:
        case tt.PRIME:
        case tt.SUP:
        case tt.SUPCHAR:
        case tt.SUB:
        case tt.PROPERTY:
        case tt.UNIT:
        case tt.RIGHTBRACKET:
        case tt.FACTORIAL:
          isPreceededByFactor = true;
          break
        default:
          isPreceededByFactor = false;
      }
    }
  }
  if (isPreceededByFactor && nextCharIsFactor(str, prevToken.ttype)) { return true }
  return false
};

const nextCharIsFactor = (str, tokenType) => {
  const st = str.replace(leadingLaTeXSpaceRegEx, "");
  const fc = st.charAt(0);

  let fcMeetsTest = false;
  if (st.length > 0) {
    if (fc === "|" || fc === "‖") ; else if (/^[({[√∛∜0-9]/.test(st) &&
      (isIn(tokenType, [tt.ORD, tt.VAR, tt.NUM, tt.LONGVAR, tt.RIGHTBRACKET,
        tt.CURRENCY, tt.SUPCHAR]))) {
      return true
    } else {
      if (factors.test(fc)) {
        fcMeetsTest = !/^(if|and|atop|or|else|modulo|otherwise|not|for|in|while|end)\b/.test(st);
      }
    }
  }
  return fcMeetsTest
};

const cloneToken$1 = token => {
  return {
    input: token.input,
    output: token.output,
    ttype: token.ttype,
    closeDelim: token.closeDelim
  }
};

// The RegEx below is equal to /^\s+/ except it omits \n and the no-break space \xa0.
// I use \xa0 to precede the combining arrow accent character \u20D7.
const leadingSpaceRegEx$1 = /^[ \f\r\t\v\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
const leadingLaTeXSpaceRegEx = /^(˽|\\quad|\\qquad)+/;

/* eslint-disable indent-legacy */
const rpnPrecFromType = [
  12, 12, 15, 13, 16, 10,
       7, 10, 12, -1, -1,
      -1,  1, -1,  0,  0,
      -1,  0, -1, 14,  0,
       6,  7,  5,  4,  1,
      -1, 16, 15, -1, 14,
      13,  9,  3,  2, 10,
      -1, -1,  4,  3, -1,
      -1
];

const texPrecFromType = [
  12, 12, 15, 13, 16, 10,
       2, 10, 12,  2,  2,
       2,  1,  2,  2,  0,
       1,  1,  2, 14,  1,
       2,  2,  1,  1,  1,
       2, -1, 15,  2, 14,
      13,  9, -1,  1, -1,
      15, -1,  1,  -1, 2,
       2
];
/* eslint-enable indent-legacy */

/* Operator Precedence
TeX  RPN
  0    0    ( [ {        delimiters
  1    1    , ;  :       separators for arguments, elements, rows, and ranges
  1    2    for in while loop keywords
  1    3    :            range separator
  1    4    if ∧ ∨       logical operators, return
  1    5    < > ≤ ≥      comparisons
  2    6    + -          addition and subtraction
  2    7    * (x)(y) /   multiplication, division
  9    9    ∠            \angle. Used as a separator for complex numbers in polar notation
 10   10    -            unary minus
 12   12    sqrt sin     unary functions, math functions, and binary functions (e.g. root 3 x)
 13   13    ^            superscript, i.e. exponent
 14   14    ! % ‰ °      factorial, percent, permil, degree
 15   15    _ ' .        subscript, prime, dot notation property accessor
 16   16    hat bb       accent and font
*/

// Delimiter types
const dNOTHING = 0;
const dPAREN = 1; //           () or [] or {}, but not one of the use cases below
const dFUNCTION = 2; //        sin(x)
const dACCESSOR = 3; //        identifier[index] or identifier[start:step:end]
const dMATRIX = 4; //          [1; 2] or (1, 2; 3, 4) or {1, 2}
const dVECTORFROMRANGE = 5; // [start:end] or [start:step:end]
const dCASES = 7; //           { a if b; c otherwise }
const dBINOMIAL = 8;
const dSUBSCRIPT = 9; //       Parens around a subscript do not get converted into matrices.
const dDISTRIB = 10; //         A probability distribution defined by a confidence interval.

const parse = (
  str,
  decimalFormat = "1,000,000.",
  isCalc = false,     // true when parsing the blue echo of an expression
  inRealTime = false  // true when updating a rendering with every keystroke in the editor.
) => {
  // Variable definitions
  let tex = "";
  let rpn = "";
  let token = {};
  let prevToken = { input: "", output: "", ttype: 50 };
  let mustLex = true;
  let mustAlign = false;
  let posOfPrevRun = 0;
  let isPrecededBySpace = false;
  let isFollowedBySpace = false;
  let isFollowedBySpaceOrNewline = false;
  let isImplicitMult = false;
  let followedByFactor = false;
  let op;
  const texStack = []; // operator stack for TeX rendering
  const rpnStack = []; // operator stack for RPN
  const delims = [{ delimType: dNOTHING, isTall: false }]; // delimiter stack
  let okToAppend = true;
  let fc = "";
  let pendingFunctionName = "";
  let tokenSep = "\xa0"; // no break space
  let rpnPrec = -1;
  const exprStack = []; // Use for lazy evalulation of ternary (If) expressions

  // This function, parse(), is the main function for this module.
  // Before we get to the start line, we write two enclosed functions,
  // popRpnTokens() and popTexTokens().
  // They are placed here in order to share variable scope with parse().

  const popRpnTokens = rpnPrec => {
    if (isCalc && rpnPrec >= 0) {
      // Pop operators off the rpnStack and append them to the rpn string
      while (rpnStack.length > 0) {
        const topPrec = rpnStack[rpnStack.length - 1].prec;
        //                         exponents, from right to left.
        if (topPrec < rpnPrec || (topPrec === 13 && rpnPrec === 13)) { break }
        rpn += rpnStack.pop().symbol + tokenSep;
      }
    }
  };

  const popTexTokens = (texPrec, okToAppend, closeDelim) => {

    if (!okToAppend) { return }

    // Pop tokens off the texStack. Append closing delimiters to the tex string.
    // When necessary, insert an opening brace before a fraction numerator.
    if (texStack.length === 0) {
      if (prevToken.ttype !== tt.RIGHTBRACKET && prevToken.ttype !== tt.LEFTRIGHT) {
        // The purpose of op.pos in general is to let some possible
        // upcoming division know where to insert a "\frac{" before the numerator.
        // If we've gotten here, then no operators are on the texStack, so set op.pos
        // at the beginning of the previous token.
        op = { pos: posOfPrevRun, ttype: prevToken.ttype, closeDelim: "" };
      }
      return
    }

    const topOp = texStack[texStack.length - 1];
    if (
      (texPrec === 2 || texPrec === 12  || texPrec === 14 || texPrec === 15) &&
      (prevToken.ttype !== tt.RIGHTBRACKET && prevToken.ttype !== tt.LEFTRIGHT) &&
      topOp.prec < texPrec
    ) {
      op = { pos: posOfPrevRun, ttype: prevToken.ttype, closeDelim: "" };
      return
    }

    //  Pop operators whose precedence ≥ texPrec. Append a close delimiter for each.
    let delim = {};
    while (texStack[texStack.length - 1].prec >= texPrec &&
      // Also handle exponents, from right to left, as in 3^4^5
      !(texStack[texStack.length - 1].prec === 13 && texPrec === 13)) {
      op = texStack.pop();

      // Before we append braces, check if we must hide a pair of parens.
      if (op.prec === 0) {
        // We just popped a delimiter operator.
        delim = delims[delims.length - 1];
        if ((op.ttype === tt.LEFTBRACKET || op.ttype === tt.LEFTRIGHT) &&
          op.closeDelim.length > 0) {
          if (texStack.length > 0) {
            if (
              op.ttype === tt.LEFTRIGHT &&
              token.output === ")" &&
              texStack[texStack.length - 1].closeDelim === ")"
            ) {
              // op is a middle |, as in P(A|B). Check if it's tall.
              if (delim.isTall) {
                tex = tex.substring(0, op.pos) + "\\middle" + tex.substring(op.pos);
                delims[delims.length - 1].isTall = true;
              }
              // Pop another delim.
              op = texStack.pop();
              delims.pop();
              delim = delims[delims.length - 1];
            }
          }

          if (delim.delimType === dMATRIX) {
            const inc = tex.slice(op.pos, op.pos + 1) === "\\" ? 2 : 1;
            tex = tex.slice(0, op.pos) + delim.open + tex.slice(op.pos + inc);
            op.closeDelim = delim.close;
          } else if (delim.delimType === dCASES) {
            tex = tex.slice(0, op.pos) + delim.open + tex.slice(op.pos + 2);
            op.closeDelim = delim.close;
          } else if (delim.delimType === dPAREN &&
            delim.name === "(" && /^(\/|\\atop\s)/.test(str)) {
            // The parens surround a numerator. Delete them.
            tex = tex.substring(0, op.pos) + tex.substring(op.pos + 1);
            op.closeDelim = "";
          } else if (delim.isPrecededByDiv && delim.delimType === dPAREN &&
              delim.name === "(" && (/^[^^_!%°⁻²³¹⁰⁴⁵⁶⁷⁸⁹]/.test(str) || str.length === 0)) {
            // The parens surround a denominator. Delete them.
            tex = tex.substring(0, op.pos) + tex.substring(op.pos + 1);
            op.closeDelim = "";
          } else if (delim.isTall) {
            // Make the delims tall.
            if (/^\\left/.test(tex.substring(op.pos)) === false) {
              tex = tex.substring(0, op.pos) + "\\left" + tex.substring(op.pos);
            }
            if (/\\right/.test(op.closeDelim) === false) {
              op.closeDelim = "\\right" + token.output;
            }
          }
        }
      }

      tex = tex.replace(/\\, *$/, ""); // Remove an implicit multiplication space.
      tex += op.closeDelim;

      if (op.closeDelim.slice(-1) === "{") {
        // We just closed the first part of a binary function, e.g. root()(),
        // or a function exponent (sin^2 θ) or function subscript (log_10)
        if (op.ttype === tt.BINARY) {
          texStack.push({ prec: 12, pos: op.pos, ttype: tt.UNARY, closeDelim: "}" });
          if (isCalc) {
            rpn += tokenSep;
            if (rpnStack[rpnStack.length - 1].symbol === "\\sqrt") {
              rpnStack[rpnStack.length - 1].symbol = "root";
            }
          }
        }
        op.ttype = tt.UNARY;
        prevToken = { input: "", output: "", ttype: tt.UNARY };
        return
      }

      if (texStack.length === 0 || op.prec === 0) {
        return
      }
    }
  };

  // With the closed functions out of the way, execute the main parse loop.
  str = str.replace(leadingSpaceRegEx$1, ""); //       trim leading white space from string
  str = str.replace(/\s+$/, ""); //                  trim trailing white space

  while (str.length > 0) {
    // Get the next token.
    if (str.charAt(0) === "\n") {
      str = str.slice(1);
      const prevChar = prevToken ? prevToken.input.slice(-1) : "0";
      if (
        prevToken.ttype === tt.COMMENT ||
        ("{[(,;+-".indexOf(prevChar) === -1 && !/^ *[)}\]]/.test(str))
      ) {
        popTexTokens(0, true);
        tex += "\\\\ ";
        const matchObj = /^ +/.exec(str);
        str = str.replace(/^ */, "");
        if (str.length > 0 && str.charAt(0) === "=" & tex.indexOf("=") > -1) {
          mustAlign = true; // We'll use the TeX {aligned} environment to align = signs.
          tex += "&";
        } else if (matchObj) {
          tex += "\\quad ".repeat(matchObj[0].length - 1);
        }
      }
      str = str.trim();
    }

    mustLex = true; // default

    isImplicitMult = isPrecededBySpace && okToAppend &&
      testForImplicitMult(prevToken, texStack, str);
    if (isImplicitMult) {
      const prevType = prevToken.ttype;
      token = {
        input: "⌧",
        output: [tt.LONGVAR, tt.NUM, tt.UNIT].includes(prevType) ? "\\," : "",
        ttype: tt.MULT
      };
      isFollowedBySpace = false;
      isFollowedBySpaceOrNewline = false;
      mustLex = false;
    }

    if (mustLex) {
      const tkn = lex(str, decimalFormat, prevToken, inRealTime);
      token = { input: tkn[0], output: tkn[1], ttype: tkn[2], closeDelim: tkn[3] };
      str = str.substring(token.input.length);
      isFollowedBySpace = leadingSpaceRegEx$1.test(str) || /^(˽|\\quad|\\qquad)+/.test(str);
      isFollowedBySpaceOrNewline = /^[ \n]/.test(str);
      str = str.replace(leadingSpaceRegEx$1, "");
      followedByFactor = nextCharIsFactor(str, token.ttype);
    }

    switch (token.ttype) {
      case tt.SPACE: //      spaces and newlines
      case tt.BIN: //        infix math operators that render but don't calc, e.g. \bowtie
      case tt.ADD: //        infix add/subtract operators, + -
      case tt.MULT: //       infix mult/divide operators, × * · // ÷
      case tt.REL: //        relational operators, e.g  < →
      case tt.UNDEROVER: { // int, sum, lim, etc
        if (token.output.length > 0 && "- +".indexOf(token.output) > -1) {
          token = checkForUnaryMinus(token, prevToken);
        }

        if (isCalc && token.ttype !== tt.SPACE) {
          if (token.output !== "\\text{-}") { rpn += tokenSep; }
          rpnPrec = rpnPrecFromType[token.ttype];
          popRpnTokens(rpnPrec);
        }

        const texPrec = texPrecFromType[token.ttype];
        popTexTokens(texPrec, okToAppend);
        tex += token.output + " ";
        posOfPrevRun = tex.length;

        if (token.ttype === tt.UNDEROVER && delims.length > 1) {
          delims[delims.length - 1].isTall = true;
        } else if (isCalc) {
          rpnStack.push({ prec: rpnPrec, symbol: token.input });
        }

        okToAppend = true;
        break
      }

      case tt.ACCESSOR:  //   dot between a map name and a property, as in r.PROPERTY
      case tt.ANGLE:    // \angle. Used as a separator for complex numbers in polar notation
        token = checkForUnaryMinus(token, prevToken);
        if (isCalc) {
          rpn += tokenSep;
          rpnPrec = rpnPrecFromType[token.ttype];
          popRpnTokens(rpnPrec);
          rpnStack.push({ prec: rpnPrec, symbol: token.input });
        }
        popTexTokens(texPrecFromType[token.ttype], okToAppend);
        tex += isCalc ? token.input : token.output + " ";
        okToAppend = true;
        break

      case tt.NUM:
      case tt.ORD:
        // Numbers and ORDs get appended directly onto rpn. Pass -1 to suppress an rpn pop.
        popTexTokens(2, okToAppend);
        if (isCalc) {
          popRpnTokens(-1);
          rpn += token.ttype === tt.NUM ? rationalRPN(token.input) : token.input;
        }
        if (isPrecededBySpace) { posOfPrevRun = tex.length; }
        if (isCalc &&
          (prevToken.ttype === tt.MULT || (followedByFactor && prevToken.ttype !== tt.DIV))) {
          token.output = "(" + token.output + ")";
        }
        tex += token.output + " ";
        okToAppend = true;

        if (!isFollowedBySpace && followedByFactor) {
          // We've encountered something like the expression "2a".
          popTexTokens(2, okToAppend);
          if (isCalc) {
            rpn += tokenSep;
            popRpnTokens(7);
            rpnStack.push({ prec: rpnPrecFromType[tt.MULT], symbol: "⌧" });
          }
        }
        break

      case tt.STRING: {
        popTexTokens(2, okToAppend);
        const ch = token.input.charAt(0);
        if (isCalc) { rpn += ch + token.output + ch; }  // Keep before addTextEscapes()
        if (isPrecededBySpace) { posOfPrevRun = tex.length; }
        token.output = addTextEscapes(token.output);
        token.output = token.output.replace(/ +$/, "\\,"); // Prevent loss of trailing space
        tex += "\\text{" + token.output + "}";
        okToAppend = true;
        break
      }

      case tt.RICHTEXT: {
        popTexTokens(2, okToAppend);
        const ch = token.input.charAt(0);
        if (isCalc) { rpn += ch + token.output + ch; }
        if (isPrecededBySpace) { posOfPrevRun = tex.length; }
        token.output = token.output === "`" ? "`" : parse(token.output, decimalFormat, false);
        tex += "{" + token.output + "}";
        okToAppend = true;
        break
      }

      case tt.DATAFRAME:
        popTexTokens(2, okToAppend);
        posOfPrevRun = tex.length;
        tex += token.output;
        okToAppend = true;
        break

      case tt.VAR:         // variable name, one letter long
      case tt.LONGVAR: {   // multi-letter variable name
        if (token.ttype === tt.LONGVAR && prevToken.input === "⌧") {
          tex += "\\,"; // Place a space before a long variable name.
        }
        // variables get appended directly onto rpn.
        popTexTokens(7, okToAppend);
        if (isPrecededBySpace) { posOfPrevRun = tex.length; }
        token.output = assertCalligraphic(token.output);

        if (!isCalc) {
          if (token.ttype === tt.LONGVAR) {
            token.output = "\\mathrm{" + token.output + "}";
          }
        } else if (prevToken.input === "for") {
          rpn += '"' + token.input + '"'; // a loop index variable name.
        } else {
          // We're in the echo of a Hurmet calculation.
          if (/^(\.[^.]|\[)/.test(str)) {
            // When the blue echo has an index in a bracket, e.g., varName[indes], it renders
            // the name of the variable, not the value. The value of the value of the index.
            token.output = token.ttype === tt.LONGVAR
              ? "\\mathrm{" + token.output + "}"
              : token.output;
          } else {
            token.output = token.input;
            token.output = "〖" + token.output;
          }
          rpn += "¿" + token.input;
        }

        tex += token.output + (str.charAt(0) === "." ? "" : " ");
        if (isCalc) {
          // The variable's value may be tall. We don't know.
          delims[delims.length - 1].isTall = true;
        }
        okToAppend = true;
        break
      }

      case tt.UNIT: {  //  e.g.  'meters'
        popTexTokens(14, true);
        texStack.push({ prec: 14, pos: op.pos, ttype: tt.UNIT, closeDelim: "" });
        if (isCalc) {
          popRpnTokens(14);
          rpn += tokenSep + "applyUnit" + tokenSep + token.input.replace(/'/g, "");
        }
        if (!/^'?°'?$/.test(token.input)) { tex += "\\;"; }
        tex += token.output;
        okToAppend = true;
        break
      }

      case tt.PROPERTY: {
        // A word after a dot ACCESSOR operator. I.e., A property in dot notation
        // Treat somewhat similarly to tt.STRING
        popTexTokens(15, okToAppend);
        const pos = token.input.indexOf("_");
        if (isCalc) {
          rpn += '"' + token.output + '"';
          tex += `\\mathrm{${token.output}}`;
          if (str.charAt(0) !== ".") { tex += " "; }
        } else if (pos > -1) {
          tex += token.input.substring(0, pos) + "_\\mathrm{" +
            token.input.substring(pos + 1) + "}";
        } else {
          token.output = addTextEscapes(token.output);
          token.output = token.output.replace(/ +$/, "\\,"); // Prevent loss of trailing space
          tex += "\\text{" + token.output + "}";
        }
        okToAppend = true;
        break
      }

      case tt.TO: {
        // A probability distribution defined by its low and high values.
        // As in: (2 to 3) or [2 to 3] or {2 to 3}
        delims[delims.length - 1].delimType = dDISTRIB;
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;
        tex += token.output;
        if (isCalc) {
          rpn += tokenSep;
          popRpnTokens(3);
          const symbol = delims[delims.length - 1].symbol;
          const distribution = symbol === "("
            ? "normal"
            : symbol === "["
            ? "uniform"
            : "lognormal";
          rpnStack.push({ prec: 3, symbol: distribution });
        }
        break
      }

      case tt.RANGE: {
        //   range separator, as in 1..n
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;

        if (isCalc) {
          rpn += tokenSep;
          popRpnTokens(3);
          rpnStack.push({ prec: 3, symbol: ".." });
          if (str.charAt(0) === "]" || str.length === 0) {
            rpn += '"∞"'; // slice of the form: identifier[n:]
          }
        }
        tex += token.output;
        break
      }

      case tt.DIV:  //  / or \atop
        if (isCalc) { rpn += tokenSep; }
        popTexTokens(2, true);
        popRpnTokens(7);
        if (token.input === "//") {
          // case fraction
          texStack.push({ prec: 2, pos: op.pos, ttype: tt.DIV, closeDelim: "}" });
          tex = tex.substring(0, op.pos) + "\\tfrac{" + tex.substring(op.pos) + "}{";
        } else if (token.input === "/" || token.input === "\\over") {
          // displaystyle fraction
          texStack.push({ prec: 2, pos: op.pos, ttype: tt.DIV, closeDelim: "}" });
          tex = tex.substring(0, op.pos) + "\\dfrac{" + tex.substring(op.pos) + "}{";
        } else {
          // atop, for binomials
          texStack.push({ prec: 2, pos: op.pos, ttype: tt.DIV, closeDelim: "}}" });
          tex = tex.substring(0, op.pos) + "{{" + tex.substring(op.pos) + "}\\atop{";
          if (delims[delims.length - 1].name === "(") {
            delims[delims.length - 1].delimType = dBINOMIAL;
          }
        }
        if (isCalc) {
          if (token.input === "\\atop") {
            if (delims[delims.length - 1].delimType === dBINOMIAL) {
              rpnStack.push({ prec: 7, symbol: "()" });
            }
          } else {
            rpnStack.push({ prec: 7, symbol: token.input });
          }
        }
        delims[delims.length - 1].isTall = true;
        posOfPrevRun = tex.length;
        okToAppend = false;
        break

      case tt.SUB: { // _
        popTexTokens(15, true);
        const subCD = prevToken.ttype === tt.FUNCTION ? "}{" : "}";
        texStack.push({ prec: 15, pos: op.pos, ttype: tt.SUB, closeDelim: subCD });
        tex += "_{";
        if (isCalc) { rpn += "_"; }
        okToAppend = false;
        break
      }

      case tt.SUP: // ^
        if (isCalc) {
          if (/¿e$/.test(rpn)) {
            // e^3. Replace e with 2.7182818284590452353602874713527
            // eslint-disable-next-line max-len
            rpn = rpn.slice(0, -2) + "®27182818284590452353602874713527/10000000000000000000000000000000";
          }
          rpn += tokenSep;
          popRpnTokens(13);
        }
        popTexTokens(13, true);
        if (prevToken.ttype === tt.RIGHTBRACKET) {
          texStack.push({ prec: 13, pos: op.pos, ttype: tt.SUP, closeDelim: "}" });
        } else {
          texStack.push({ prec: 13, pos: posOfPrevRun, ttype: tt.SUP, closeDelim: "}" });
        }
        if (isCalc) { rpnStack.push({ prec: 13, symbol: "^" }); }
        tex += "^{";
        okToAppend = false;
        break

      case tt.SUPCHAR: { //  ²³¹⁰⁴⁵⁶⁷⁸⁹⁻
        if (isCalc) {
          if (/¿e$/.test(rpn)) {
            // e^3. Replace e with 2.7182818284590452353602874713527
            // eslint-disable-next-line max-len
            rpn = rpn.slice(0, -2) + "®27182818284590452353602874713527/10000000000000000000000000000000";
          }
          rpn += tokenSep;
          popRpnTokens(13);
        }
        popTexTokens(13, true);
        const supNum = numFromSupChars(token.output);
        if (prevToken.ttype === tt.RIGHTBRACKET) {
          texStack.push({ prec: 13, pos: op.pos, ttype: tt.SUP, closeDelim: "}" });
        } else {
          texStack.push({ prec: 13, pos: posOfPrevRun, ttype: tt.SUP, closeDelim: "}" });
        }
        tex += "^{" + supNum;
        if (isCalc) {
          rpnStack.push({ prec: 13, symbol: "^" });
          rpn += rationalRPN(supNum);
        }
        okToAppend = true;
        break
      }

      case tt.FUNCTION: { // e.g. sin or tan,  shows parens
        popTexTokens(2, okToAppend);
        posOfPrevRun = tex.length;
        // Is there an exponent on the function name?
        if (functionExpoRegEx.test(str)) {
          const [expoInput, expoTex, expoRPN] = exponentOfFunction(str, decimalFormat, isCalc);
          if (isCalc && expoRPN === `®1/1${tokenSep}~` && isIn(token.input, trigFunctions)) {
            // Inverse trig function.
            token.input = "a" + token.input;
            token.output = "\\a" + token.output.slice(1);
          } else {
            if (isCalc) { token.input += tokenSep + expoRPN + tokenSep + "^"; }
            token.output += "^" + expoTex;
          }
          const L = expoInput.length + (str.charAt(0) === "^" ? 1 : 0);
          str = str.slice(L).trim();
        }
        if (isCalc) {
          rpnStack.push({ prec: 12, symbol: token.input });
          if (prevToken.input === "⌧") { tex += "×"; }
        }
        fc = str.charAt(0);
        texStack.push({
          prec: 12,
          pos: tex.length,
          ttype: tt.FUNCTION,
          closeDelim: fc === "(" ? "" : "}"
        });
        tex += token.output;
        tex += fc === "(" ? "" : "{";
        pendingFunctionName = token.input;
        okToAppend = false;
        break
      }

      case tt.ACCENT:
        if (isCalc) {
          rpn += tokenSep;
          popRpnTokens(16);
        }
        popTexTokens(1, okToAppend);

        if (isCalc) {
          texStack.push({ prec: 16, pos: tex.length, ttype: tt.ACCENT, closeDelim: "〗" });
          tex += "〖" + token.input;
          rpn += "¿" + token.input;
        } else {
          texStack.push({ prec: 16, pos: tex.length, ttype: tt.ACCENT, closeDelim: "}" });
          tex += token.output + "{";
        }

        delims[delims.length - 1].isTall = true;
        okToAppend = false;
        break

      case tt.PRIME:
        popTexTokens(15, true);
        if (isCalc) { rpn += token.input; }
        tex = tex.trim() + token.output + " ";
        okToAppend = true;
        break

      case tt.BINARY: { // e.g. root(3)(x)
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;
        const binCD = token.input === "root" ? "]{" : "}{";
        texStack.push({ prec: 12, pos: tex.length, ttype: tt.BINARY, closeDelim: binCD });
        if (isCalc) { rpnStack.push({ prec: 12, symbol: token.output }); }
        tex += token.output + (token.input === "root" ? "[" : "{");
        delims[delims.length - 1].isTall = true;
        okToAppend = false;
        break
      }

      case tt.CURRENCY: {  // e.g. $, £, etc
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;
        texStack.push({ prec: 12, pos: tex.length, ttype: tt.CURRENCY, closeDelim: "" });
        if (isCalc) {
          rpnStack.push({ prec: 12, symbol: "applyUnit" + tokenSep + token.input });
          if (prevToken.input === "⌧") { tex += "×"; }
        }
        tex += token.output;
        okToAppend = false;
        break
      }

      case tt.UNARY: // e.g. bb, hat, or sqrt, or xrightarrow, hides parens
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;
        texStack.push({ prec: 12, pos: tex.length, ttype: tt.UNARY, closeDelim: "}" });
        if (isCalc) {
          rpnStack.push({ prec: 12, symbol: token.input });
          if (prevToken.input === "⌧") { tex += "×"; }
        }
        tex += token.output;

        if (/det|inf/.test(token.input) && str.charAt(0) === "_") {
          texStack.push({ prec: 15, pos: tex.length, ttype: tt.SUB, closeDelim: "}" });
          token = { input: "_", output: "_", ttype: tt.SUB };
          tex += "_{";
          str = str.substring(1);
          str = str.replace(/^\s+/, "");
        } else if (token.input === "\\color") {
          const colorMatch = colorSpecRegEx.exec(str);
          if (colorMatch) {
            tex += "{" + colorMatch[0].replace(/[()]/g, "") + "}";
            texStack.pop();
            str = str.slice(colorMatch[0].length).trim();
          } else {
            // User is in the middle of writing a color spec. Avoid an error message.
            tex += "{";
          }
        } else {
          tex += "{";
        }
        delims[delims.length - 1].isTall = true;
        okToAppend = false;
        break

      case tt.FACTORIAL:
        popTexTokens(14, true);
        texStack.push({ prec: 14, pos: op.pos, ttype: tt.FACTORIAL, closeDelim: "" });
        if (isCalc) {
          popRpnTokens(14);
          rpn += tokenSep + token.output;
        }
        tex += token.output;
        okToAppend = true;
        break

      case tt.RETURN:
        // Special treatment in order to enable user-defined functions.
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;
        if (isCalc) {
          popRpnTokens(4);
          rpnStack.push({ prec: 4, symbol: "return" });
        }
        tex += token.output + " ";
        break

      case tt.KEYWORD:
        // Either "for", "in", "while", or "break"
        popTexTokens(1, true);
        posOfPrevRun = tex.length;
        if (isCalc) {
          popRpnTokens(2);
          if (token.input === "in") {
            rpn += tokenSep;
            rpnStack.push({ prec: rpnPrec, symbol: "for" });
          }
        }
        tex += token.output + " ";
        break

      case tt.LOGIC: {
        // logic words: if and or otherwise
        popTexTokens(1, okToAppend);
        if (isCalc) { rpn += tokenSep; }
        popRpnTokens(4);
        const topDelim = delims[delims.length - 1];
        if (token.input === "if" || token.input === "otherwise") {
          if (topDelim.delimType === dPAREN && topDelim.name === "{") {
            // Change the enclosing delim pair to a CASES expression.
            topDelim.delimType = dCASES;
            topDelim.close = "\\end{cases}";
            topDelim.open = "\\begin{cases}";
            // In order to get lazy evaluation of a CASES, we will have to move the
            // expressions after the conditions. Temporarily change the token separator.
            if (isCalc && tokenSep === "\xa0" && token.input === "if") {
              // Change the token separators in the preceding RPN.
              rpn = rpn.slice(0, topDelim.rpnPos) +
                rpn.slice(topDelim.rpnPos).replace(/\xa0/g, "§");
            }
          }
        }
        if (topDelim.delimType === dCASES && isIn(token.input, ["if", "otherwise"])) {
          tex += "&";
        }
        if (token.input === ":"  && topDelim.delimType === dPAREN && topDelim.symbol === "{") {
          token.output = "\\colon";
        }
        tex += token.output;
        if (isCalc) {
          if (topDelim.delimType === dCASES &&
            (token.input === "if" || token.input === "otherwise")) {
            // We're in an If Expression and we just reached the end of an expression.
            rpn = setUpIf(rpn, token.input, exprStack, topDelim);
            tokenSep = "\xa0";
          } else {
            rpnStack.push({ prec: 4, symbol: token.input });
          }
        }
        posOfPrevRun = tex.length;
        okToAppend = true;
        break
      }

      case tt.LEFTBRACKET: {
        popTexTokens(2, okToAppend);
        const isPrecededByDiv = prevToken.ttype === tt.DIV;
        let isFuncParen = false;

        const texStackItem = {
          prec: 0,
          pos: tex.length,
          ttype: tt.LEFTBRACKET,
          closeDelim: token.closeDelim
        };

        if ((token.input === "(" || token.input === "[") && prevToken.ttype < 5) {
          // The delimiters are here to delimit a TeX function extent.
          // Make the delimiters invisible.
          texStackItem.closeDelim = "";
        } else if (token.input === "(" && op.ttype === tt.BINARY) {
          texStackItem.closeDelim = "";
        } else {
          texStackItem.closeDelim = token.closeDelim;
          isFuncParen = (token.input === "(" || token.input === "[") &&
            prevToken.ttype === tt.FUNCTION;
          tex += token.output;
        }
        texStack.push(texStackItem);

        if (isCalc) {
          while (rpnStack.length > 0 && rpnStack[rpnStack.length - 1].symbol === ".") {
            rpn += tokenSep + rpnStack.pop().symbol;
          }
          rpnStack.push({ prec: 0, symbol: token.output.trim() });
        }

        const numArgs = /^\s*[)}\]]/.test(str) ? 0 : 1;

        const delim = {
          name: token.input,
          isTall: false,
          open: token.output,
          close: texStackItem.closeDelim,
          numArgs,
          numRows: numArgs,
          rpnPos: rpn.length,
          isPrecededByDiv,
          isFuncParen,
          isControlWordParen: prevToken.ttype < 5
        };

        if (isFuncParen) {
          delim.delimType = dFUNCTION;
          delim.name = pendingFunctionName;
        } else if (prevToken.ttype === tt.SUB) {
          delim.delimType = dSUBSCRIPT;
          delim.name = "(";
        } else if (token.input === "{") {
          // This may change to a CASES.
          delim.delimType = dPAREN;
          delim.rpnLength = rpn.length;
        } else if (token.input === "[" &&
            (isIn(prevToken.ttype, [tt.VAR, tt.LONGVAR, tt.STRING, tt.PROPERTY]) ||
            prevToken.input === "]")) {
          rpn += tokenSep;
          delim.delimType = dACCESSOR;
        } else {
          // This may change to a MATRIX, but for now we'll say it's a paren.
          delim.delimType = dPAREN;
          delim.name = token.input;
        }
        delims.push(delim);

        pendingFunctionName = "";
        posOfPrevRun = tex.length;
        okToAppend = false;
        break
      }

      case tt.SEP: {
        // Either a comma or a semi-colon. Colons are handled elsewhere.
        popTexTokens(1, okToAppend);
        posOfPrevRun = tex.length;

        if (token.input === "\\," || token.input === "\\;") {
          // escape characters that enable commas in a non-matrix paren.
          tex += token.output + " ";
        } else {
          const delim = delims[delims.length - 1];
          if (delim.delimType === dPAREN && isFollowedBySpaceOrNewline) {
            delim.delimType = dMATRIX;
            const ch = delim.name === "["
              ? "b"
              : delim.name === "("
              ? "p"
              : delim.name === "{:"
              ? ""
              : "B";
            delim.open = `\\begin{${ch}matrix}`;
            delim.close = `\\end{${ch}matrix}`;
            delim.isTall = true;
            token.output = token.input === "," ? "&" : "\\\\";
          } else if (delim.delimType === dMATRIX && token.input === ",") {
            token.output = "&";
          } else if (delim.delimType > 3 && token.input === ";") {
            token.output = "\\\\";
          }
          if (isCalc) {
            if (prevToken.ttype === tt.LEFTBRACKET && delim.delimType === dACCESSOR) {
              rpn += "®0/1";
            }
            rpn += tokenSep;
            popRpnTokens(1);
          }

          tex += token.output + " ";

          if (isCalc) {
            if (delims.length === 1) {
              rpn += token.output;

            } else {
              if (token.input === ";") {
                delim.numRows += 1;
                if (delims.length > 0 && delim.delimType === dCASES) {
                // We're about to begin an expression inside an If Expression.
                // Temporarily change the token separator.
                  tokenSep = "§";
                }
              }

              if (delim.numRows === 1) {
                if (token.input === ","  ||
                    (token.input === " " && (delim.delimType === dMATRIX))) {
                  if (str.charAt(0) === "]") {
                    rpn += "®0/1";
                  } else if (token.input === "," && delim.delimType === dFUNCTION &&
                             delim.numArgs === 2 && delim.name === "plot" ) {
                    // The literal function for a plot() statement inside a draw()
                    // Wrap the rpn in quotation marks.
                    rpn = rpn.slice(0, delim.rpnPos + 5) + '"'
                        + rpn.slice(delim.rpnPos + 5, -1).replace(/\u00a0/g, "§") + '"' + tokenSep;
                  }
                }
              }
              delim.numArgs += 1;
            }
          }
        }
        okToAppend = true;
        break
      }

      case tt.RIGHTBRACKET: {
        popTexTokens(0, true, token.output);
        const topDelim = delims.pop();

        if (topDelim.delimType === dPAREN && (!topDelim.isControlWordParen)
            && topDelim.close !== token.output) {
          // Enable unmatched delims, such as (1.2] or |ϕ⟩
          tex = tex.slice(0, -1 * topDelim.close.length) + token.output;
        }

        if (topDelim.isTall && delims.length > 1) {
          // If the inner parens are tall, then the outer parens must also be tall.
          delims[delims.length - 1].isTall = true;
        }

        if (isCalc) {
          while (rpnStack.length > 0 && rpnStack[rpnStack.length - 1].prec > 0) {
            rpn += tokenSep + rpnStack.pop().symbol;
          }
          if (topDelim.delimType === dCASES && prevToken.input !== "otherwise") {
            // "otherwise" is optional. We've just found a case where it is omitted.
            // So run function setUpIf as if "otherwise" were present.
            rpn = setUpIf(rpn, "otherwise", exprStack, topDelim);
            tokenSep = "\xa0";
          }
          const rpnOp = rpnStack.pop();
          const numArgs = topDelim.numArgs;
          const numRows = topDelim.numRows;
          const numCols = topDelim.numArgs / topDelim.numRows;

          const firstSep = numArgs === 0 ? "" : tokenSep;

          switch (topDelim.delimType) {
            case dFUNCTION: {
              let symbol = rpnStack.pop().symbol;
              const regEx = new RegExp(tokenSep + '!$');
              if (numArgs === 2) {
                if (symbol === "log") { symbol = "logn"; }
                if (symbol === "round") { symbol = "roundn"; }
                if (symbol === "atan") { symbol = "atan2"; }
                if (symbol === "plot") {
                  rpn = rpn.slice(0, 6) + '"' + rpn.slice(6).replace(/\u00a0/g, "§") + '"';
                }
              } else if (symbol === "log" && regEx.test(rpn)) {
                rpn = rpn.slice(0, rpn.length - 1) + "logFactorial";
                break
              }
              rpn += (symbol.slice(-1) === "^")
                ? firstSep + symbol
                : isIn(symbol, builtInFunctions)
                ? firstSep + symbol
                : isIn(symbol, builtInReducerFunctions)
                ? firstSep + symbol + tokenSep + numArgs
                : firstSep + "function" + tokenSep + symbol + tokenSep + numArgs;
              break
            }

            case dACCESSOR:
              // This is the end of a […] following a variable name.
              rpn += firstSep + "[]" + tokenSep + numArgs;
              break

            case dMATRIX:
              rpn += firstSep + "matrix" + tokenSep + numRows + tokenSep + numCols;
              break

            case dCASES:
              tokenSep = "\xa0";
              rpn += tokenSep + "cases" + tokenSep + numRows + tokenSep;
              while (exprStack.length > 0) {
                // Append the expressions that correspond to each condition.
                rpn += exprStack.shift();
              }
              rpn = rpn.slice(0, -1);
              break

            case dVECTORFROMRANGE:
              // [start:step:end]
              rpn += tokenSep + "matrix" + tokenSep + "1" + tokenSep + "1";
              break

            case dDISTRIB:
              // (bottom to top)
              // Do nothing. This is handled by tt.TO above.
              break

            default:
              if (numArgs === 0 && topDelim.open === "[") {
                // Treat as an empty matrix
                rpn += "matrix" + tokenSep + 0 + tokenSep + 0;
              } else if (numArgs === 1 && topDelim.open === "[") {
                rpn += tokenSep + "matrix" + tokenSep + 1 + tokenSep + 1;
              }
              if (rpnOp.symbol === "\\lfloor") { rpn += tokenSep + "⎿⏌"; }
              if (rpnOp.symbol === "\\lceil") { rpn += tokenSep + "⎾⏋"; }
          }
          if ((token.input === ")" && nextCharIsFactor(str, tt.RIGHTBRACKET)) ||
            (token.input === "]" && /^\(/.test(str))) {
            // Implicit multiplication between parens, as in (2)(3)
            // Not between square brackets, as in dict[row][property]
            rpn += tokenSep;
            popRpnTokens(rpnPrecFromType[tt.MULT]);
            rpnStack.push({ prec: rpnPrecFromType[tt.MULT], symbol: "⌧" });
            isFollowedBySpace = false;
          }
        }

        posOfPrevRun = tex.length;
        okToAppend = op.ttype !== tt.BINARY;
        break
      }

      case tt.LEFTRIGHT: {
        // A "|" or "‖" character, which are used as |x|, ‖M‖,  P(A|B),  {x|x ∈ℝ}, |ϕ⟩
        popTexTokens(1, okToAppend);
        const topDelim = delims[delims.length - 1];

        let isRightDelim = false;
        if (texStack.length > 0) {
          isRightDelim =
            texStack[texStack.length - 1].ttype === tt.LEFTRIGHT ||
            texStack[texStack.length - 1].closeDelim === "\u27E9" || // Dirac ket
            texStack[texStack.length - 1].closeDelim === "\\right." ||
            texStack[texStack.length - 1].closeDelim === "\\end{vmatrix}";
        }
        if (isRightDelim) {
          // Treat as a right delimiter
          topDelim.close = token.input === "|" ? "\\vert " : "\\Vert ";
          texStack[texStack.length - 1].closeDelim = topDelim.close;
          popTexTokens(0, okToAppend);
          delims.pop();
          if (isCalc) {
            while (rpnStack.length > 0 && rpnStack[rpnStack.length - 1].prec > 0) {
              rpn += tokenSep + rpnStack.pop().symbol;
            }
            rpn += tokenSep + rpnStack.pop().symbol;
          }
          okToAppend = op.ttype !== tt.BINARY;
        } else if (topDelim.delimType === dPAREN && topDelim.name === "{") {
          tex += "\\mid ";
          posOfPrevRun = tex.length;
          okToAppend = true;
        } else {
          // Treat as a left delimiter
          texStack.push({
            prec: 0,
            pos: tex.length,
            ttype: tt.LEFTRIGHT,
            closeDelim: token.input === "|" ? "\\vert " : "\\Vert "
          });

          delims.push({
            delimType: dPAREN,
            name: token.input,
            isTall: false,
            open: token.input === "|" ? "\\vert " : "\\Vert ",
            close: token.input === "|" ? "\\vert " : "\\Vert ",
            numArgs: 1,
            numRows: 1,
            rpnPos: rpn.length,
            isPrecededByDiv: prevToken.ttype === tt.DIV
          });

          if (isCalc) {
            rpnStack.push({ prec: 0, symbol: token.output });
          }

          tex += token.input === "|" ? "\\vert " : "\\Vert ";
          posOfPrevRun = tex.length;
          okToAppend = false;
        }
        break
      }

      case tt.COMMENT:
        popTexTokens(0, true);
        tex += token.output + " ";
        break

      default:
        if (isCalc) {
          rpn += tokenSep;
          popRpnTokens(12);
        }
        popTexTokens(1, okToAppend);
        texStack.push({ prec: 1, pos: tex.length, ttype: tt.ORD, closeDelim: "" });
        if (isCalc) { rpnStack.push({ prec: 12, symbol: token.output }); }
        tex += token.output + " ";
        posOfPrevRun = tex.length;
        okToAppend = true;
    }

    prevToken = cloneToken$1(token);
    isPrecededBySpace = isFollowedBySpace || token.input === "⌧";
  }

  popTexTokens(0, true); // Pop all the remaining close delimiters off the stack.

  if (isCalc) {
    while (rpnStack.length > 0) {
      rpn += tokenSep + rpnStack.pop().symbol;
    }
    const varRegEx = /〖[^ ().]+/g;
    let arr;
    while ((arr = varRegEx.exec(tex)) !== null) {
      if ("¨ˆˉ˙˜".indexOf(arr[0][1]) === -1) {
        const pos = arr.index + arr[0].length;
        if (tex.length > pos && tex.charAt(pos) === "(") {
          // We found a method, not a data index. Delete the 〖
          tex = tex.slice(0, arr.index) + tex.slice(arr.index + 1);
        } else {
          tex = tex.substring(0, pos) + "〗" + tex.substring(pos);
        }
      }
    }
  }

  tex = tex.replace(/ {2,}/g, " "); // Replace multiple spaces with single space.
  tex = tex.replace(/\s+(?=[_^'!)}\]〗])/g, ""); // Delete spaces before right delims
  tex = tex.replace(/\s+$/, ""); //                 Delete trailing space

  if (mustAlign) {
    const pos = tex.indexOf("=");
    tex = "\\begin{aligned}" + tex.slice(0, pos) + "&" + tex.slice(pos) + "\\end{aligned}";
  }

  return isCalc ? [tex, rpn] : tex
};

/*
 * Hurmet operands often have numeric values. Sometimes they are the numbers originally
 * input by the writer, henceforward known as "plain". Sometimes we work instead with
 * values that have been converted to SI base units. It turns out that operands inside
 * evalRpn() can often get by with less information than in the original cell assignment attrs.
 * Some details for various data types:
 *
 * RATIONAL operand: { value: plain, unit: allZeros, dtype: RATIONAL }
 * RATIONAL cell attrs: ditto.
 * Note: "allZeros" is the array of unit-checking exponents for a number: [0,0,0,0,0,0,0,0,0]
 *
 * RATIONAL + QUANTITY unit-unaware operand: same as RATIONAL.
 * RATIONAL + QUANTITY unit-AWARE oprnd: {
 *   value: inBaseUnits, unit: expos, dtype: RATIONAL + QUANTITY
 * }
 * RATIONAL + QUANTITY cell attrs include both of the above and also a `resultdisplay` string.
 *
 * RATIONAL + ROWVECTOR is the same as RATIONAL except the value is an array of plains.
 * RATIONAL + ROWVECTOR + QUANTITY is the same as RATIONAL + QUANTITY except values are arrays.
 * COLUMNVECTOR is the same as ROWVECTOR exept that they are treated differently by operators.
 * MATRIX indicates that values are each an array of row vectors.
 * *
 * A MAP's values are all the same data type and all have the same unit of measure.
 * MAP oprnd: {name, value: see below, unit: {name, factor, gauge, expos}, dtype: dMAP + ...}
 *    where: value is: {name1: value, name2: value} or
 *    where value is: {plain: {name1: value, name2: value},
 *                     inBaseUnits: {name1: value, name2: value},
 *                     etc}
 * A `resultdisplay` string is always in a MAP's cell attrs and sometimes in an operand.
 *
 * ERROR operand: { value: error message, unit: undefined, dtype: ERROR }
 *
 * When this module creates Hurmet operands, it does not make defensive copies of
 * cell attributes. The deep data is referenced. So Hurmet evaluate.js must copy whenever
 * operators or functions might change a cell attribute.
 *
 */

const fromAssignment = (cellAttrs, unitAware) => {
  // Get the value that was assigned to a variable. Load it into an operand.
  if (cellAttrs.value === null) {
    // Return an error message.
    const insert = (cellAttrs.name) ? cellAttrs.name : "?";
    return errorOprnd("NULL", insert)
  }

  const oprnd = Object.create(null);
  oprnd.dtype = cellAttrs.dtype;
  oprnd.name = cellAttrs.name;

  // Get the unit data.
  const dtype = cellAttrs.dtype;
  if (dtype === dt.STRING || dtype === dt.BOOLEAN || dtype === dt.DRAWING ||
      dtype === dt.MODULE || dtype === dt.NULL) {
    oprnd.unit = null;
  } else if (dtype === dt.DATAFRAME || (dtype & dt.MAP)) {
    oprnd.unit = Object.freeze(clone(cellAttrs.unit));
  } else if (cellAttrs.unit && cellAttrs.unit.expos) {
    oprnd.unit = clone(cellAttrs.unit);
  } else if (cellAttrs.unit) {
    oprnd.unit = Object.create(null);
    if (cellAttrs.unit)  { oprnd.unit.name = cellAttrs.unit; }
    if (cellAttrs.expos) { oprnd.unit.expos = clone(cellAttrs.expos); }
  } else if (cellAttrs.expos && Array.isArray(cellAttrs.expos)) {
    oprnd.unit = { expos: clone(cellAttrs.expos) };
  } else {
    oprnd.unit = null;
  }

  // Get the value.
  if (cellAttrs.dtype & dt.QUANTITY) {
    // Here we discard some of the cellAttrs information. In a unit-aware calculation,
    // number, matrix, and map operands contain only the value.inBaseUnits.
    oprnd.value = Object.freeze(unitAware
      ? clone(cellAttrs.value.inBaseUnits)
      : clone(cellAttrs.value.plain)
    );
    oprnd.dtype = cellAttrs.dtype - dt.QUANTITY;

  } else if (cellAttrs.dtype === dt.STRING) {
    const str = cellAttrs.value;
    const ch = str.charAt(0);
    const chEnd = str.charAt(str.length - 1);
    oprnd.value = ch === '"' && chEnd === '"' ? str.slice(1, -1).trim() : str.trim();

  } else if (cellAttrs.dtype === dt.DATAFRAME) {
    // For data frames, Hurmet employs copy-on-write tactics.
    // So at this point, we can pass a reference to the value
    oprnd.value = cellAttrs.value;

    // Note the only operations on data frames are: (1) access, and (2) concatenate.
    // That's where the copy-on-write takes place.

  } else {
    // For all other data types, we employ copy-on-read. So we return a deep copy from here.
    oprnd.value = clone(cellAttrs.value);
  }

  return Object.freeze(oprnd)
};

function propertyFromDotAccessor(parent, index, vars, unitAware) {
  const property = Object.create(null);
  if (parent.dtype & dt.MAP) {
    return map.valueFromMap(parent, [index], unitAware)

  } else if (parent.dtype & dt.DATAFRAME) {
    return DataFrame.range(parent, [index], vars, unitAware)

  } else if ((parent.dtype === dt.STRING || (parent.dtype & dt.ARRAY)) &&
    index.dtype === dt.RATIONAL) {
    const indexVal = Rnl.toNumber(index.value);
    property.value = parent.value.slice(indexVal - 1, indexVal);
    property.unit = parent.unit;
    property.dtype = parent.dtype;
    return property

  } else if ((parent.dtype === dt.STRING || (parent.dtype & dt.ARRAY)) &&
        index.dtype === dt.RANGE) {
    const start = index.value[0] - 1;
    const step = index.value[1];
    const end = (index.value[2] === "∞") ? parent.value.length : index.value[2];
    property.unit = parent.unit;
    property.dtype = parent.dtype;
    if (step === 1) {
      property.value = parent.value.slice(start, end);
    } else {
      property.value = [];
      for (let j = start; j < end; j += step) {
        property.value.push(parent.value[j]);
      }
    }
    return property

  } else if (parent.dtype === dt.MODULE) {
    // parent is a module and index has a value assigned to it.
    return fromAssignment(parent.value[index.value], unitAware)

  } else {
    return errorOprnd("NO_PROP", parent.name)
  }
}

const display$4 = (tuple, formatSpec = "h3", decimalFormat = "1,000,000.") => {
  if (tuple.size === 0) { return "" }
  let str = "\\begin{array}{c}";

  let haveUnits = false;
  for (const attrs of tuple.values()) {
    if (attrs.unit && attrs.unit.name) { haveUnits = true; break }
  }

  // Write the unit names
  if (haveUnits) {
    let rowTex = "";
    for (const attrs of tuple.values()) {
      if (attrs.unit && attrs.unit.name) {
        rowTex += unitTeXFromString(attrs.unit.name).replace("\\;\\, ", "");
      }
      rowTex += "&";
    }
    str += rowTex.slice(0, -1) + " \\\\ ";
    str += "\\hline ";
  }

  // Write the data
  let botRow = "";
  for (const attrs of tuple.values()) {
    botRow += format(attrs.value, formatSpec, decimalFormat) + " & ";
  }
  str += botRow.slice(0, -1);
  str += "\\end{array}";
  return str
};

const displayAlt$3 = (tuple, formatSpec = "h3") => {
  if (tuple.size === 0) { return "" }
  let str = "``";

  let haveUnits = false;
  for (const attrs of tuple.values()) {
    if (attrs.unit && attrs.unit.name) { haveUnits = true; break }
  }

  // Write the unit names
  if (haveUnits) {
    let rowTex = "";
    for (const attrs of tuple.values()) {
      if (attrs.unit && attrs.unit.name) {
        rowTex += attrs.unit.name;
      }
      rowTex += " | ";
    }
    str += rowTex.slice(0, -3) + "\n";
  }

  // Write the data
  let botRow = "";
  for (const attrs of tuple.values()) {
    botRow += format(attrs.value, formatSpec, "100000.") + " | ";
  }
  str = botRow.slice(0, -3);
  return str + "``"
};

const Tuple = Object.freeze({
  display: display$4,
  displayAlt: displayAlt$3
});

// A result has been sent here from evaluate.js or updateCalculations.js.
// Format the result for display.

const numMisMatchError = _ => {
  const str = "Error. Mismatch in number of multiple assignment.";
  return [`\\color{firebrick}\\text{${str}}`, str]
};

const formatResult = (stmt, result, formatSpec, decimalFormat, isUnitAware) => {
  if (!result) { return stmt }

  if (result.dtype === dt.DRAWING) {
    stmt.resultdisplay = result.value;
    delete stmt.resultdisplay.temp;
    return stmt
  }

  const numNames = !stmt.name
    ? 0
    : !Array.isArray(stmt.name)
    ? 1
    : stmt.name.length;

  if (stmt.resulttemplate.indexOf("?") > -1 ||
      stmt.resulttemplate.indexOf("!") > -1 ||
      stmt.resulttemplate.indexOf("@") > -1 ||
      stmt.resulttemplate.indexOf("%") > -1) {
    stmt.value = result.value;
    let resultDisplay = "";
    let altResultDisplay = "";
    if (stmt.resulttemplate.indexOf("!") > -1) {
      // Suppress display of the result
      resultDisplay = "";
      altResultDisplay = "";
      return stmt

    } else if (isMatrix(result) && (result.dtype & dt.MAP)) {
      resultDisplay = Matrix.displayMapOfVectors(result.value, formatSpec, decimalFormat);
      altResultDisplay = Matrix.displayAltMapOfVectors(result.value,
        formatSpec, decimalFormat);

    } else if (isMatrix(result)) {
      resultDisplay = Matrix.display(
        isUnitAware ? { value: result.value.plain, dtype: result.dtype } : result,
        formatSpec,
        decimalFormat
      );
      altResultDisplay = Matrix.displayAlt(
        isUnitAware ? { value: result.value.plain, dtype: result.dtype } : result,
        formatSpec,
        decimalFormat
      );

    } else if (result.dtype === dt.DATAFRAME) {
      if (numNames > 1 && numNames !== result.value.data.length) {
        [resultDisplay, altResultDisplay] = numMisMatchError();
      } else {
        const omitHeading = stmt.name && Array.isArray(stmt.name) && stmt.name.length > 1;
        resultDisplay = DataFrame.display(result.value, formatSpec,
                                          decimalFormat, omitHeading);
        altResultDisplay = DataFrame.displayAlt(result.value, formatSpec, omitHeading);
      }

    } else if (result.dtype & dt.MAP) {
      const mapSize = (stmt.dtype & dt.QUANTITY) ? result.value.plain.size : result.value.size;
      if (numNames > 1 && numNames !== mapSize) {
        [resultDisplay, altResultDisplay] = numMisMatchError();
      } else {
        const omitHeading = stmt.name && Array.isArray(stmt.name) && stmt.name.length > 1;
        resultDisplay = map.display(result, formatSpec, decimalFormat, omitHeading);
        altResultDisplay = map.displayAlt(result, formatSpec, decimalFormat, omitHeading);
      }

    } else if (result.dtype === dt.TUPLE) {
      if (numNames > 1 && numNames !== result.length) {
        [resultDisplay, altResultDisplay] = numMisMatchError();
      } else {
        resultDisplay = Tuple.display(result.value, formatSpec, decimalFormat);
        altResultDisplay = Tuple.displayAlt(result.value, formatSpec);
      }

    } else if (result.dtype & dt.STRING) {
      resultDisplay = "\\text{" + addTextEscapes(result.value) + "}";
      if (result.unit) {
        // This is a hack to return a color
        resultDisplay = `\\textcolor{${result.unit}}{${resultDisplay}}`;
      }
      altResultDisplay = result.value;

    } else if (result.dtype & dt.RICHTEXT) {
      resultDisplay = parse(result.value, decimalFormat, false);
      altResultDisplay = result.value;

    } else if (result.dtype & dt.BOOLEAN) {
      resultDisplay = "\\text{" + result.value + "}";
      altResultDisplay = String(result.value);

    } else if (result.dtype === dt.COMPLEX) {
      const z = result.value;
      [resultDisplay, altResultDisplay] = Cpx.display(z, formatSpec, decimalFormat);
/*        const complexSpec = /[j∠°]/.test(formatSpec) ? formatSpec.slice(-1) : "j"
      if (complexSpec === "j") {
        const real = format(z[0], formatSpec, decimalFormat)
        let im = format(z[1], formatSpec, decimalFormat)
        if (im.charAt(0) === "-") { im = "(" + im + ")" }
        resultDisplay = real + " + j" + im
        altResultDisplay = real + " + j" + im
      } else {
        const mag = Rnl.hypot(z[0], z[1])
        let angle = Cpx.argument(result.value)
        if (complexSpec === "°") {
          angle = Rnl.divide(Rnl.multiply(angle, Rnl.fromNumber(180)), Rnl.pi)
        }
        resultDisplay = format(mag, formatSpec, decimalFormat) + "∠" +
                        format(angle, formatSpec, decimalFormat) +
                        (complexSpec === "°" ? "°" : "")
        altResultDisplay = resultDisplay
      } */

    } else if (result.value.plain) {
      resultDisplay = format(result.value.plain, formatSpec, decimalFormat);
      if (resultDisplay.dtype && resultDisplay.dtype === dt.ERROR) {
        resultDisplay = "\\color{firebrick}\\text{" + resultDisplay.value + "}";
        altResultDisplay = resultDisplay.value;
      } else {
        altResultDisplay = resultDisplay.replace(/{,}/g, ",").replace("\\", "");
      }

    } else if (Rnl.isRational(result.value)) {
      resultDisplay = format(result.value, formatSpec, decimalFormat);
      if (resultDisplay.dtype && resultDisplay.dtype === dt.ERROR) {
        resultDisplay = "\\color{firebrick}\\text{" + resultDisplay.value + "}";
        altResultDisplay = resultDisplay.value;
      } else {
        altResultDisplay = resultDisplay.replace(/{,}/g, ",").replace("\\", "");
      }

    } else if (result.dtype === dt.IMAGE) {
      return stmt

    } else {
      resultDisplay = result.value;
      altResultDisplay = resultDisplay;

    }

    // Write the string to be plugged into echos of dependent nodes
    stmt.resultdisplay = stmt.resulttemplate.replace(/(\? *\??|@ *@?|%%?)/, resultDisplay);

    // Write the TeX for this node
    if (stmt.resulttemplate.indexOf("@") > -1) {
      stmt.tex = stmt.resultdisplay;
      stmt.alt = stmt.altresulttemplate.replace(/@@?/, altResultDisplay);
    } else if (stmt.resulttemplate.indexOf("?") > -1) {
      let pos = stmt.tex.lastIndexOf("?");
      stmt.tex = stmt.tex.slice(0, pos).replace(/\? *$/, "") + resultDisplay + stmt.tex.slice(pos + 1);
      pos = stmt.alt.lastIndexOf("?");
      stmt.alt = stmt.alt.slice(0, pos).replace(/\? *$/, "") + altResultDisplay + stmt.alt.slice(pos + 1);
    } else if (stmt.resulttemplate.indexOf("%") > -1) {
      let pos = stmt.tex.lastIndexOf("%");
      stmt.tex = stmt.tex.slice(0, pos).replace(/% *$/, "") + resultDisplay + stmt.tex.slice(pos + 1);
      pos = stmt.alt.lastIndexOf("%");
      stmt.alt = stmt.alt.slice(0, pos).replace(/% *$/, "") + altResultDisplay + stmt.alt.slice(pos + 1);
    }
  }
  return stmt
};

/*
 *  This module receives a TeX template string and a object containing Hurmet variables.
 *  At each location where the template contains a variable, this module plugs in a TeX string
 *  of the variable's value, for display in the Hurmet blue echo..
 */

const varRegEx = /〖[^〗]*〗/;
const openParenRegEx$1 = /([([{|‖]|[^\\][,;:])$/;

const plugValsIntoEcho = (str, vars, unitAware, formatSpec, decimalFormat) => {
  // For each variable name in the echo string, substitute a value.
  // The parser surrounded those names with 〖〗 delimiters.
  let match;
  while ((match = varRegEx.exec(str)) !== null) {
    const varName = match[0].replace(/[〖〗()]/g, "").trim().replace(/'/g, "′");
    const matchLength = match[0].length;
    const pos = match.index;
    let hvar;
    let display = "";

    if (varName.indexOf(".") > -1) {
      // Object with a dot accessor.
      const names = varName.split(".");
      const parentName = names[0];
      if (!vars[parentName]) { return errorOprnd("V_NAME", parentName) }
      hvar = vars[parentName];
      if (hvar.dtype === dt.DATAFRAME && names.length === 2) {
        // This is a dataframe.dict. I don't want to write an entire dictionary into
        // a blue echo, so display just the names.
        display = "\\mathrm{" + vars[names[0]].name + "{.}\\mathrm{" + names[1] + "}";
        return str.substring(0, pos) + display + str.substring(pos + matchLength)
      } else {
        // we want to display the property value.
        for (let i = 1; i < names.length; i++) {
          const propName = names[i].replace("}", "").replace("\\mathrm{", "").trim();
          const indexOprnd = { value: propName, unit: null, dtype: dt.STRING };
          hvar = propertyFromDotAccessor(hvar, indexOprnd, vars, unitAware);
          if (!hvar) { return errorOprnd("V_NAME", propName) }
          const stmt = { resulttemplate: "@", altresulttemplate: "@" };
          hvar.resultdisplay = formatResult(stmt, hvar, formatSpec,
                decimalFormat).resultdisplay;
        }
      }
    } else if (!vars[varName] && varName === "T") {
      // Transposed matrix
      hvar = { dtype: dt.RATIONAL, resultdisplay: "\\text{T}" };
    } else if (varName === "e" && /^\^/.test(str.slice(pos + 3).trim())) {
      // e^x
      str = str.substring(0, pos) + "e" + str.substring(pos + matchLength);
      continue
    } else if (!vars[varName]) {
      return errorOprnd("V_NAME", varName)
    } else {
      // Get a clone in order to avoid mutating the inner properties of vars.
      hvar = {
        dtype: vars[varName].dtype,
        resultdisplay: vars[varName].resultdisplay
      };
    }

    if (!hvar || !hvar.resultdisplay) {
      const insert = (varName) ? varName : "?";
      return errorOprnd("NULL", insert)
    } else if (hvar.error) {
      return errorOprnd("NULL", varName)
    }

    let needsParens = true; // default
    if (isMatrix(hvar) || (hvar.dtype & dt.DATAFRAME)) { needsParens = false; }
    if (unitAware && (hvar.dtype & dt.QUANTITY)) { needsParens = true; }

    let isParened = false; // Is the match already nested inside parens?
    if (pos > 0) {
      const pStr = str.slice(0, pos).trim();
      if (openParenRegEx$1.test(pStr)) {
        const fStr = str.slice(pos + varName.length + 2).trim();
        isParened = fStr.length > 0 && /^([)|‖\]},;:]|\\right)/.test(fStr);
      } else if (/^\\begin{[bp]matrix}/.test(hvar.resultdisplay)) {
        isParened = /\\end{[bp]matrix}$/.test(hvar.resultdisplay);
      }
    }
    needsParens = needsParens && !isParened;

    if (hvar.dtype === dt.DATAFRAME || (hvar.dtype & dt.MAP)) {
      display = "\\mathrm{" + vars[varName].name + "}";
    } else if (unitAware) {
      display = needsParens ? "\\left(" + hvar.resultdisplay + "\\right)" : hvar.resultdisplay;
    } else {
      let displaySansUnits = hvar.resultdisplay;
      const posUnit = hvar.resultdisplay.lastIndexOf("{\\text{");
      if (posUnit > -1) {
        displaySansUnits = hvar.resultdisplay.slice(0, posUnit).trim();
        displaySansUnits = displaySansUnits.replace(/\\; *$/, "").trim();
      }
      display = needsParens ? "\\left(" + displaySansUnits + "\\right)" : displaySansUnits;
    }
    str = str.substring(0, pos) + display + str.substring(pos + matchLength);
  }
  return str
};

const negativeOne = Object.freeze(Rnl.negate(Rnl.one));
const oneHalf = [BigInt(1), BigInt(2)];
const thirty = [BigInt(30), BigInt(1)];
const fortyFive = [BigInt(45), BigInt(1)];
const sixty = [BigInt(60), BigInt(1)];
const ninety = [BigInt(90), BigInt(1)];
const halfPi = Object.freeze(Rnl.divide(Rnl.pi, Rnl.two));

const functionExpos = (functionName, args) => {
  const numArgs = args.length;

  const expos = numArgs === 1 ? args[0].unit.expos : null;

  switch (functionName) {
    case "abs":
    case "round":
    case "roundn":
    case "sign":
    case "trace":
    case "fetch":
      return expos

    case "cos":
    case "sin":
    case "tan":
    case "sec":
    case "csc":
    case "cot":
    case "acos":
    case "arccos":
    case "asin":
    case "arcsin":
    case "atan":
    case "arctan":
    case "asec":
    case "arcsec":
    case "acsc":
    case "arccsc":
    case "acot":
    case "arccot":
    case "cosd":
    case "sind":
    case "tand":
    case "secd":
    case "cscd":
    case "cotd":
    case "acosd":
    case "asind":
    case "atand":
    case "asecd":
    case "acscd":
    case "acotd":
    case "gud":
      if (!unitsAreCompatible(expos, allZeros)) {
        return errorOprnd("UNIT_IN", functionName)
      }
      return allZeros

    case "exp":
    case "log":
    case "ln":
    case "log10":
    case "log2":
    case "logn":
    case "cosh":
    case "sinh":
    case "tanh":
    case "sech":
    case "csch":
    case "coth":
    case "acosh":
    case "asinh":
    case "atanh":
    case "asech":
    case "acsch":
    case "acoth":
    case "binomial":
    case "gamma":
    case "Γ":
    case "logΓ":
    case "logFactorial":
      if (!unitsAreCompatible(expos, allZeros)) {
        return errorOprnd("UNIT_IN", functionName)
      }
      return allZeros

    case "sqrt":
      return expos.map(e => e / 2)

    case "gcd":
    case "mht":
      if (!unitsAreCompatible(expos, allZeros)) {
        return errorOprnd("UNIT_IN", functionName)
      }
      return functionName === "hmt" ? [1, 0, 0, 0, 0, 0, 0, 0] : allZeros

    case "atan2":
    case "hypot":
    case "rms":
    case "sum":
    case "mean":
    case "median":
    case "min":
    case "max":
    case "range":
    case "stddev":
    case "variance": {
      const x = args[0].unit.expos;
      for (let i = 1; i < args.length; i++) {
        const y = args[i].unit.expos;
        if (x.length !== y.length) { return errorOprnd("UNIT_ARG", functionName) }
        for (let j = 0; j < x.length; j++) {
          if (x[j] !== y[j]) { return errorOprnd("UNIT_ARG", functionName) }
        }
      }
      return functionName === "atan2" ? allZeros : x
    }

    case "Re":
    case "Im":
    case "argument":
      return allZeros

    case "product": {
      const expos = clone(args[0].unit.expos);
      for (let i = 1; i < args.length; i++) {
        const p = args[i].unit.expos;
        expos.map((e, j) => e + p[j]);
      }
      return expos
    }

    default:
      return errorOprnd("F_NAME", functionName)
  }
};

const gamma = x => {
  if (Rnl.isZero(x)) {
    return errorOprnd("Γ0")
  } else if (Rnl.isPositive(x) && Rnl.isInteger(x) && Rnl.lessThan(x, Rnl.fromNumber(101))) {
    return Rnl.factorial(Rnl.subtract(x, Rnl.one))
  } else if (Rnl.isNegative(x) && Rnl.isInteger(x)) {
    return errorOprnd("ΓPOLE")
  } else if (Rnl.lessThan(x, oneHalf)) {
    // reflection formula
    return Rnl.fromNumber(Math.PI / (Math.sin(Math.PI * Rnl.toNumber(x)))
      * Rnl.toNumber(gamma(Rnl.subtract(Rnl.one, x))))
  } else {
    return Rnl.lanczos(x)
  }
};

const logΓ = r => {
  // logGamma function. Returns natural logarithm of the Gamma function.
  // Ref: https://www.johndcook.com/blog/2010/08/16/how-to-compute-log-factorial/
  if (Rnl.isZero(r)) { return errorOprnd("Γ0") }
  if (Rnl.isNegative(r)) { return errorOprnd("LOGΓ") }
  if (Rnl.areEqual(r, Rnl.one) || Rnl.areEqual(r, Rnl.two)) { return Rnl.zero }
  if (Rnl.lessThanOrEqualTo(r, Rnl.fromNumber(14))) {
    return Rnl.fromNumber(Math.log(Rnl.toNumber(gamma(r))))
  } else {
    const x = Rnl.toNumber(r);
    // eslint-disable-next-line max-len
    const y = (x - 0.5) * Math.log(x) - x + 0.5 * Math.log(2 * Math.PI) + 1 / (12 * x) - 1 / (360 * x ** 3) + 1 / (1260 * x ** 5) - 1 / (1680 * x ** 7) + 5 / (540 * x ** 9);
    //  Error bounded by: -691/(360360 * x^11), 16 significant digits
    return Rnl.fromNumber(y)
  }
};

const binomial = (n, k) => {
  // (n \atop k) = n! / (k! (n - k)!)
  //             = exp(log!(n) - [log!(k) + log!(n - k)])
  if (Rnl.areEqual(n, k)) { return Rnl.one }
  if (Rnl.isZero(n)) { return Rnl.zero }
  if (Rnl.isNegative(k)) { return Rnl.zero }
  if (Rnl.lessThan(n, k)) { return Rnl.zero }

  if (Rnl.isInteger(n) && Rnl.isInteger(k) && Rnl.isPositive(n) && Rnl.isPositive(k)) {
    // positive integers
//    if (Rnl.lessThan(n, twenty)) {
    return Rnl.divide(Rnl.factorial(n),
      Rnl.multiply(Rnl.factorial(k), Rnl.factorial(Rnl.subtract(n, k))))
//    } else {
//      return Rnl.fromNumber(Math.round(Math.exp(Rnl.toNumber(
//        Rnl.subtract(logFactorial(n),
//          Rnl.add(logFactorial(k), logFactorial(Rnl.subtract(n, k))))))))
//    }

  } else if (Rnl.isInteger(n) && Rnl.isInteger(k) && Rnl.isPositive(k)) {
    // negative integer n
    // (-n \atop k) = (-1)^k * multiset(n, k)
    return Rnl.multiply(Rnl.power(negativeOne, k), multiset(Rnl.negate(n), k))

  } else {
    // generalized for real or complex arguments
    // (x \atop y) = Γ(x+1) / ( Γ(y+1) Γ(x-y+1) )
    return Rnl.divide(
      gamma(Rnl.increment(n)),
      Rnl.multiply(gamma(Rnl.increment(k)), gamma(Rnl.increment(Rnl.subtract(n, k))))
    )

  }
};

const multiset = (n, k) => {
  // ((n \atop k)) = ((n+k-1) \atop k)
  // multiset(n, k) = binomial(n+k-1, k)
  return binomial(Rnl.add(n, Rnl.decrement(k)), k)
};

const piOver180 = Rnl.divide(Rnl.pi, [BigInt(180), BigInt(1)]);

const unary = {
  scalar: {
    // Functions that take one real argument.
    abs(x)  { return Rnl.abs(x) },
    argument(x) { return errorOprnd("NA_REAL", "argument") },
    Re(x)   { return errorOprnd("NA_REAL", "Re") },
    Im(x)   { return errorOprnd("NA_REAL", "Im") },
    cos(x)  { return Rnl.cos(x) },
    sin(x)  { return Rnl.sin(x) },
    tan(x)  { return Rnl.tan(x) },
    cosh(x) { return Rnl.cosh(x) },
    sinh(x) { return Rnl.sinh(x) },
    tanh(x) { return Rnl.tanh(x) },
    acos(x) {
      if (Rnl.greaterThan(Rnl.abs(x), Rnl.one)) { return errorOprnd("ATRIG", "acos") }
      return Rnl.fromNumber(Math.acos(Rnl.toNumber(x)))
    },
    asin(x) {
      if (Rnl.greaterThan(Rnl.abs(x), Rnl.one)) { return errorOprnd("ATRIG", "asin") }
      return Rnl.fromNumber(Math.asin(Rnl.toNumber(x)))
    },
    atan(x) {
      return Rnl.fromNumber(Math.atan(Rnl.toNumber(x)))
    },
    sec(x) {
      return Rnl.fromNumber(1 / Math.cos(Rnl.toNumber(x)))
    },
    csc(x) {
      return Rnl.fromNumber(1 / Math.sin(Rnl.toNumber(x)))
    },
    cot(x) {
      if (Rnl.isZero(x)) { return errorOprnd("COT", "cotangent") }
      return  Rnl.fromNumber(1 / Math.tan(Rnl.toNumber(x)))
    },
    asec(x) {
      if (Rnl.greaterThanOrEqualTo(Rnl.abs(x), Rnl.one)) {
        return errorOprnd("ASEC", "arcecant")
      }
      const temp = Math.atn(Math.sqrt(Rnl.toNumber(Rnl.decrement(Rnl.multiply(x, x)))));
      return  (Rnl.isPositive(x))
        ? Rnl.fromNumber(temp)
        : Rnl.fromNumber(temp - Math.PI)
    },
    acot(x) {
      if (Rnl.greaterThanOrEqualTo(Rnl.abs(x), Rnl.one)) {
        return errorOprnd("ASEC", "acot")
      }
      const temp = Math.atn(1 / (Math.sqrt(Rnl.toNumber(Rnl.decrement(Rnl.multiply(x, x))))));
      return (Rnl.isPositive(x))
        ? Rnl.fromNumber(temp)
        : Rnl.fromNumber(temp - Math.PI)
    },
    acsc(x) {
      return Rnl.fromNumber(Math.atn(-Rnl.toNumber(x)) + Math.PI)
    },
    exp(x) {
      return Rnl.exp(x)
    },
    log(x) {
      return Rnl.isZero(x) ? errorOprnd("LOG_ZERO") : Rnl.fromNumber(Math.log(Rnl.toNumber(x)))
    },
    ln(x) {
      return Rnl.isZero(x) ? errorOprnd("LOG_ZERO") : Rnl.fromNumber(Math.log(Rnl.toNumber(x)))
    },
    log10(x) {
      return Rnl.isZero(x)
        ? errorOprnd("LOG_ZERO")
        : Rnl.fromNumber(Math.log10(Rnl.toNumber(x)))
    },
    log2(x) {
      return Rnl.isZero(x)
        ? errorOprnd("LOG_ZERO")
        : Rnl.fromNumber(Math.log2(Rnl.toNumber(x)))
    },
    sech(x) {
      // sech(n) = 2 / (eⁿ + e⁻ⁿ)
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(2 / (Math.exp(num) + Math.exp(-num)))
    },
    csch(x) {
      // csch(n) = 2 / (eⁿ - e⁻ⁿ)
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(2 / (Math.exp(num) - Math.exp(-num)))
    },
    coth(x) {
      // coth(n) = (eⁿ + e⁻ⁿ) / (eⁿ - e⁻ⁿ)
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(
        (Math.exp(num) + Math.exp(-num)) / (Math.exp(num) - Math.exp(-num))
      )
    },
    acosh(x) {
      // acosh(x) = log( x + sqrt(x - 1) × sqrt(x + 1) )
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(Math.log( num + Math.sqrt(num - 1) * Math.sqrt(num + 1) ))
    },
    asinh(x) {
      // asinh(x) = log(x + sqrt(x² + 1))
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(Math.log(num + Math.sqrt(Math.pow(num, 2) + 1)))
    },
    atanh(x) {
      // atanh(x) = [ log(1+x) - log(1-x) ] / 2
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber((Math.log(1 + num) - Math.log(1 - num) ) / 2)
    },
    asech(x) {
      // asech(x) = log( [sqrt(-x * x + 1) + 1] / x )
      if (Rnl.isZero(x)) { return errorOprnd("DIV") }
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(Math.log((Math.sqrt(-num * num + 1) + 1) / num))
    },
    ascsh(x) {
      // acsch(x) = log( sqrt(1 + 1/x²) + 1/x )
      if (Rnl.isZero(x)) { return errorOprnd("DIV") }
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber(Math.log(Math.sqrt(1 + 1 / Math.pow(num, 2)) + 1 / num))
    },
    acoth(x) {
      // acoth(x) = [ log(1 + 1/x) - log(1 - 1/x) ] / 2
      if (Rnl.isZero(x)) { return errorOprnd("DIV") }
      const num = Rnl.toNumber(x);
      return Rnl.fromNumber((Math.log(1 + 1 / num) - Math.log(1 - 1 / num)) / 2)
    },
    Gamma(x) {
      return gamma(x)
    },
    Γ(x) {
      return gamma(x)
    },
    logΓ(x) {
      if (Rnl.isNegative(x) || Rnl.isZero(x)) { return errorOprnd("LOGΓ") }
      return logΓ(x)
    },
    logFactorial(x) {
      if (Rnl.isNegative(x) || !Rnl.isInteger(x)) { return errorOprnd("FACT") }
      return logΓ(Rnl.add(x, Rnl.one))
    },
    sign(x) {
      return Rnl.isPositive(x) ? Rnl.one : Rnl.isZero(x) ? Rnl.zero : negativeOne
    },
    cosd(x) {
      if (Rnl.areEqual(x, ninety)) { return Rnl.zero }
      if (Rnl.areEqual(x, sixty)) { return oneHalf }
      return this.cos(Rnl.multiply(x, piOver180))
    },
    sind(x) {
      if (Rnl.areEqual(x, thirty)) { return oneHalf }
      return this.sin(Rnl.multiply(x, piOver180))
    },
    tand(x) {
      if (Rnl.areEqual(x, fortyFive)) { return Rnl.one }
      if (Rnl.areEqual(x, ninety)) { return errorOprnd("TAN90", "90°") }
      return this.tan(Rnl.multiply(x, piOver180))
    },
    cotd(x) {
      return this.cot(Rnl.multiply(x, piOver180))
    },
    cscd(x) {
      return this.csc(Rnl.multiply(x, piOver180))
    },
    secd(x) {
      return this.sec(Rnl.multiply(x, piOver180))
    },
    acosd(x) {
      const y = this.acos(x);
      return y.dtype ? y : Rnl.divide(y, piOver180)
    },
    asind(x) {
      const y = this.asin(x);
      return y.dtype ? y : Rnl.divide(y, piOver180)
    },
    atand(x) {
      return Rnl.divide(this.atan(x), piOver180)
    },
    acotd(x) {
      const y = this.acot(x);
      return y.dtype ? y : Rnl.divide(y, piOver180)
    },
    acscd(x) {
      const y = this.acsc(x);
      return y.dtype ? y : Rnl.divide(y, piOver180)
    },
    asecd(x) {
      const y = this.asec(x);
      return y.dtype ? y : Rnl.divide(y, piOver180)
    },
    chr(x) {
      return String.fromCodePoint(Number(x))
    },
    sqrt(x) {
      const y = [BigInt(1), BigInt(2)];
      return Cpx.isComplex(x) || (Rnl.isNegative(x))
          ? Cpx.power([x, Rnl.zero], y)
          : Rnl.power(x, y)
    },
    round(x) {
      return Rnl.fromString(Rnl.toString(x, 0))
    }
  },
  complex: {
    // Functions that take one complex argument.
    abs(z)      { return Cpx.abs(z) },
    argument(z) { return Cpx.argument(z) },
    Re(z)       { return z[0] },
    Im(z)       { return z[1] },
    cos(z)      { return Cpx.cos(z) },
    sin(z)      { return Cpx.sin(z) },
    asin(z)     { return Cpx.asin(z) },
    atan(z)     { return Cpx.atan(z) },
    acos(z)     { return Cpx.subtract([halfPi, Rnl.zero], Cpx.asin(z))}, // π/2 - arcsin(z)
    tan(z)      { return Cpx.divide(Cpx.sin(z), Cpx.cos(z)) },
    cot(z)      { return Cpx.divide(Cpx.cos(z), Cpx.sin(z)) },
    sec(z) {
      const c = Cpx.cos(z);
      return c.dtype ? c : Cpx.inverse(c)
    },
    csc(z) {
      const s = Cpx.sin(z);
      return s.dtype ? s : Cpx.inverse(s)
    },
    asec(z) {
      // acos(inverse(z))
      const inv = Cpx.inverse(z);
      return Cpx.subtract([halfPi, Rnl.zero], Cpx.asin(inv))
    },
    acot(z) { return Cpx.atan(Cpx.inverse(z)) },
    acsc(z) {
      return Cpx.asin(Cpx.inverse(z))
    },
    exp(z) {
      return Cpx.exp(z)
    },
    log(z) {
      return Cpx.log(z)
    },
    ln(z) {
      return Cpx.log(z)
    },
    log10(z) {
      return Rnl.fromNumber(Math.log10(Rnl.toNumber(z)))
    },
    log2(z) {
      return Rnl.fromNumber(Math.log2(Rnl.toNumber(z)))
    },
    cosh(z) {
      // cosh(z) = (eᶻ + e⁻ᶻ) / 2
      return Cpx.divide(Cpx.add(Cpx.exp(z), Cpx.exp(Cpx.negate(z))), [Rnl.two, Rnl.zero])
    },
    sinh(z) {
      // sinh(z) = (eᶻ - e⁻ᶻ) / 2
      return Cpx.divide(Cpx.subtract(Cpx.exp(z), Cpx.exp(Cpx.negate(z))), [Rnl.two, Rnl.zero])
    },
    tanh(z) {
      // tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)
      const ez = Cpx.exp(z);
      const eMinuxZ = Cpx.exp(Cpx.negate(z));
      return Cpx.divide(Cpx.subtract(ez, eMinuxZ), Cpx.add(ez, eMinuxZ))
    },
    sech(z) {
      // sech(z) = 2 / (eᶻ + e⁻ᶻ)
      return Cpx.divide([Rnl.two, Rnl.zero], Cpx.add(Cpx.exp(z), Cpx.exp(Cpx.negate(z))))
    },
    csch(z) {
      // csch(z) = 2 / (eᶻ - e⁻ᶻ)
      return Cpx.divide([Rnl.two, Rnl.zero], Cpx.subtract(Cpx.exp(z), Cpx.exp(Cpx.negate(z))))
    },
    coth(z) {
      // coth(z) = (eᶻ + e⁻ᶻ) / (eᶻ - e⁻ᶻ)
      const ez = Cpx.exp(z);
      const eMinuxZ = Cpx.exp(Cpx.negate(z));
      return Cpx.divide(Cpx.add(ez, eMinuxZ), Cpx.subtract(ez, eMinuxZ))
    },
    acosh(z) {
      return Cpx.acosh(z)
    },
    asinh(z) {
      return Cpx.asinh(z)
    },
    atanh(z) {
      return Cpx.atanh(z)
    },
    asech(z) {
      return Cpx.acosh(Cpx.inverse(z))
    },
    acsch(z) {
      return Cpx.asinh(Cpx.inverse(z))
    },
    acoth(z) {
      return Cpx.atanh(Cpx.inverse(z))
    },
    Gamma(z) {
      return Cpx.gamma(z)
    },
    Γ(z) {
      return Cpx.gamma(z)
    },
    logΓ(z) {
      // TODO: complex logΓ
      return errorOprnd("NA_COMPL_OP", "logΓ")
    },
    sign(z) {
      if (Rnl.isZero(z[1]) && Rnl.isPositive(z[0])) {
        return Rnl.one
      } else if (Rnl.isZero(z[1]) && Rnl.isNegative(z[0])) {
        return Rnl.negate(Rnl.one)
      } else {
        return Cpx.divide(z, [Cpx.abs(z), Rnl.zero])
      }
    },
    round(z) {
      // TODO: complex round function
      return errorOprnd("NA_COMPL_OP", "round")
    }
  }
};

const binary = {
  logn([n, x]) {
    return Rnl.fromNumber(Math.log(Rnl.toNumber(x)) / Math.log(Rnl.toNumber(n)))
  },
  roundFixed([x, n]) {
    return Rnl.fromString(Rnl.toString(x, n))
  },
  roundSignificant([x, n]) {
    return Rnl.fromString(Rnl.toStringSignificant(x, n))
  },
  stringFixed([x, n]) {
    return Rnl.toString(x, n)
  },
  stringSignificant([x, n]) {
    return Rnl.toStringSignificant(x, n)
  },
  atan2([x, y]) {
    return Rnl.fromNumber(Math.atan2(Rnl.toNumber(y), Rnl.toNumber(x)))
  },
  hypot([x, y]) {
    // sqrt(x^2)
    // https://www.johndcook.com/blog/2010/06/02/whats-so-hard-about-finding-a-hypotenuse/
    const max = Rnl.max(x, y);
    const r = Rnl.divide(Rnl.min(x, y), max);
    return Rnl.multiply(max, Rnl.sqrt(Rnl.increment(Rnl.multiply(r, r))))
  },
  gcd([m, n]) {
    return Rnl.gcd(m, n)
  },
  rms([x, y]) {
    return this.hypot(x, y)
  },
  binomial([x, y]) {
    return binomial(x, y)
  },
  zeros([m, n]) {
    return Matrix.zeros(Rnl.toNumber(m), Rnl.toNumber(n))
  }
};

const reduce = {
  max(list) {
    return list.reduce((max, e) => Rnl.max(max, e))
  },
  min(list) {
    return list.reduce((min, e) => Rnl.min(min, e))
  },
  sum(list) {
    return list.reduce((sum, e) => Rnl.add(sum, e))
  },
  product(list) {
    return list.reduce((sum, e) => Rnl.multiply(sum, e))
  },
  mean(list) {
    const sum = this.sum(list);
    return Rnl.divide(sum, Rnl.fromNumber(list.length))
  },
  median(list) {
    const max = this.max(list);
    const min = this.min(list);
    return Rnl.divide(Rnl.add(max, min), Rnl.two)
  },
  range(list) {
    return Rnl.subtract(this.max(list), this.min(list))
  },
  variance(list) {
    const sum = this.sum(list);
    const mean = Rnl.divide(sum, Rnl.fromNumber(list.length));
    const num = list.reduce((num, e) => Rnl.add(num, Rnl.pow(Rnl.subtract(e, mean), Rnl.two)));
    return Rnl.divide(num, Rnl.subtract(Rnl.fromNumber(list.length), Rnl.one))
  },
  stddev(list) {
    const variance = this.variance(list);
    return Rnl.power(variance, oneHalf)
  }
};

const lerp = (args, unitAware) => {
  // linear interpolation
  for (let i = 0; i < 3; i++) {
    if (!(args[i].dtype & dt.RATIONAL)) { return errorOprnd("") }
  }
  let expos = allZeros;
  if (unitAware) {
    if (args[0].expos !== args[1].expos) { return errorOprnd("") }
    if (args[1].expos !== args[2].expos) { return errorOprnd("") }
    expos = args[0].expos;
  }
  const output = Object.create(null);
  output.unit = Object.create(null);
  output.unit.expos = expos;
  output.dtype = dt.RATIONAL;

  const v0 = args[0].value;  // a vector
  const v1 = args[1].value;  // another vector
  const x = args[2].value;   // the input value
  // TODO: Use binary search
  for (let i = 0; i < v0.length - 1; i++) {
    if (Rnl.lessThanOrEqualTo(v0[i], x) & Rnl.lessThanOrEqualTo(x, v0[i + 1])) {
      const slope = Rnl.divide((Rnl.subtract(v1[i + 1], v1[i])),
        (Rnl.subtract(v0[i + 1], v0[i])));
      output.value = Rnl.add(v1[i], Rnl.multiply(slope, (Rnl.subtract(x, v0[i]))));
      return Object.freeze(output)
    }
  }
};

const Functions = Object.freeze({
  functionExpos,
  unary,
  binary,
  reduce,
  lerp
});

const multivarFunction = (arity, functionName, args) => {
  // Deal with a function that may have multiple arguments.

  if (args.length === 1) {
    const list = Matrix.isVector(args[0])
      ? args[0].value
      : (args.dtype & dt.MATRIX)
      // TODO: fix the next line.
      ? args[0].value.flat()
      : args[0].value;

    const value = Functions[arity][functionName](list);

    let dtype = args[0].dtype;
    if (arity === "reduce") {
      // Mask off any matrix or vector indicator from the dtype
      if (dtype & dt.MATRIX) { dtype -= dt.MATRIX; }
      if (dtype & dt.ROWVECTOR) { dtype -= dt.ROWVECTOR; }
      if (dtype & dt.COLUMNVECTOR) { dtype -= dt.COLUMNVECTOR; }
    }

    return [value, dtype]

  } else {
    // We have multiple arguments.
    // Is one of them a vector?
    let iArg = 0;
    let gotVector = false;
    let dtype = args[0].dtype;

    for (iArg = 0; iArg < args.length; iArg++) {
      if (Matrix.isVector(args[iArg])) {
        gotVector = true;
        dtype = args[iArg].dtype;
        break
      }
    }
    const list = args.map(e => e.value);
    if (!gotVector) {
      const result = Functions[arity][functionName](list);
      return functionName === "zeros"
        ? [result.value, result.dtype]
        : [result, args[0].dtype]

    } else {
      const listClone = clone(list);
      const result = [];
      for (let i = 0; i < list[iArg].length; i++) {
        listClone[iArg] = list[iArg][i];
        result.push(Functions[arity][functionName](listClone));
      }
      return [ result, dtype ]
    }
  }
};

// compare.js

const equals = (x, y) => {
  if (Rnl.isRational(x) && Rnl.isRational(y)) {
    return Rnl.areEqual(x, y)
  } else {
    return x === y
  }
};

const compare = (op, x, y, yPrev) => {
  // If yPrev is defined, then this is part of a chained comparison, e.g.: a < b < c
  if (x === false && yPrev) { return false }  // The chain is false if any part is false.
  if (x === true && yPrev) { x = yPrev; }  // Compare this link in the chain.

  switch (op) {
    case "=":
      return equals(x, y)

    case "≠":
    case "!=":
    case "/=":
      if (Rnl.isRational(x) && Rnl.isRational(y)) {
        return !Rnl.areEqual(x, y)
      } else {
        return x !== y
      }

    case ">":
      if (Rnl.isRational(x) && Rnl.isRational(y)) {
        return Rnl.greaterThan(x, y)
      } else {
        return x > y
      }

    case "<":
      if (Rnl.isRational(x) && Rnl.isRational(y)) {
        return Rnl.lessThan(x, y)
      } else {
        return x < y
      }

    case "≥":
    case ">=":
      if (Rnl.isRational(x) && Rnl.isRational(y)) {
        return Rnl.greaterThanOrEqualTo(x, y)
      } else {
        return x >= y
      }

    case "≤":
    case "<=":
      if (Rnl.isRational(x) && Rnl.isRational(y)) {
        return Rnl.lessThanOrEqualTo(x, y)
      } else {
        return x <= y
      }

    case "∈":
      if (typeof x === "string" && typeof y === "string") {
        return y.indexOf(x) > -1
      } else if (Array.isArray(y) && !Array.isArray(x)) {
        for (let i = 0; i < y.length; i++) {
          if (equals(x, y[i])) { return true }
        }
        return false
      } else if (y instanceof Map) {
        return y.has(x)
      } else {
        return errorOprnd("NOT_ARRAY")
      }

    case "⋐":
      if (typeof x === "string" && typeof y === "string") {
        return y.indexOf(x) > -1
      } else if (Array.isArray(x) && Array.isArray(y)) {
        for (let i = 0; i < y.length; i++) {
          if (equals(x[0], y[i])) {
            if (i + x.length > y.length) { return false }
            for (let j = 1; j < x.length; j++) {
              if (!equals(x[j], y[i + j])) { return false }
            }
            return true
          }
        }
        return false
      } else {
        return errorOprnd("NOT_ARRAY")
      }

    case "∉":
      if (typeof x === "string" && typeof y === "string") {
        return y.indexOf(x) === -1
      } else if (Array.isArray(y)) {
        for (let i = 0; i < y.length; i++) {
          if (x === y[i]) { return false }
        }
        return true
      } else if (y instanceof Map) {
        return !y.has(x)
      } else {
        return errorOprnd("NOT_ARRAY")
      }
  }
};

// Hurmet math operators are overloaded to handle operands of various shapes.
// Those shapes being scalars, vectors, matrices, and maps.
// This file implements the overloading.

// Some helper functions
const transpose2D = a => a[0].map((x, i) => a.map(y => y[i]));
const dotProduct = (a, b) => {
  return a.map((e, j) => Rnl.multiply(e, b[j])).reduce((m, n) => Rnl.add(m, n))
};
const sumOfSquares = vector => {
  return vector.map((e) => Rnl.multiply(e, e)).reduce((m, n) => Rnl.add(m, n))
};
const oneTenth = [BigInt(1), BigInt(100)];

// From the object below, calculations.js will call operators using statements
// that look like this:
// resultValue = Operations.unary[shape][operator](inputValue)

const unary$1 = {
  scalar: {
    abs(x)       { return Rnl.abs(x) },
    norm(x)      { return Rnl.abs(x) },
    negate(x)    { return Rnl.negate(x) },
    exp(x)       { return Rnl.exp(x) },
    floor(x)     { return Rnl.floor(x) },
    ceil(x)      { return Rnl.ceil(x) },
    percent(x)   { return Rnl.multiply(oneTenth, x) },
    factorial(x) { return Rnl.factorial(x) },
    not(x)       { return !x }
  },

  complex: {
    abs(z)       { return Cpx.abs(z) },
    norm(z)      { return Cpx.abs(z) },
    conjugate(z) { return Cpx.conjugate(z) },
    negate(z)    { return Cpx.negate(z) },
    exp(z)       { return Cpx.exp(z) },
    floor(z)     { return errorOprnd("NA_COMPL_OP", "floor") },
    ceil(z)      { return errorOprnd("NA_COMPL_OP", "ceil") },
    percent(z)   { return errorOprnd("NA_COMPL_OP", "percent") },
    factorial(z) { return errorOprnd("NA_COMPL_OP", "factorial") },
    not(z)       { return errorOprnd("NA_COMPL_OP", "not") }
  },

  vector: {
    abs(v)       { return Rnl.sqrt(sumOfSquares(v)) },   // magnitude of a vector
    norm(v)      { return Rnl.sqrt(sumOfSquares(v)) },   // ditto
    negate(v)    { return v.map(e => Rnl.negate(e)) },
    exp(v)       { return v.map(e => Rnl.exp(e)) },
    floor(v)     { return v.map(e => Rnl.floor(e)) },
    ceil(v)      { return v.map(e => Rnl.ceil(e)) },
    percent(v)   { return v.map(e => Rnl.multiply(oneTenth, e)) },
    factorial(v) { return v.map(e => Rnl.factorial(e)) },
    not(v)       { return v.map(e => !e) }
  },

  matrix: {
    abs(m) { return Matrix.invert(m, true) },
    norm(m) {
      if (m.length === m[0].length) {
        let sum = Rnl.zero;
        for (let i = 0; i < m.length; i++) {
          sum = Rnl.add(sum, sumOfSquares(m[i]));
        }
        return sum.sqrt()
      }
    },
    negate(m)    { return m.map(row => row.map(e => Rnl.negate(e))) },
    exp(m)       { return m.map(row => row.map(e => Rnl.exp(e))) },
    floor(m)     { return m.map(row => row.map(e => Rnl.floor(e))) },
    ceil(m)      { return m.map(row => row.map(e => Rnl.ceil(e))) },
    percent(m)   { return m.map(row => row.map(e => Rnl.multiply(oneTenth, e))) },
    factorial(m) { return m.map(row => row.map(e => Rnl.factorial(e))) },
    not(m)       { return m.map(row => row.map(e => !e)) }
  },

  map: {
    abs(map)       { return mapMap(map, value => Rnl.abs(value)) },
    negate(map)    { return mapMap(map, value => Rnl.negate(value)) },
    exp(map)       { return mapMap(map, value => Rnl.exp(value)) },
    floor(map)     { return mapMap(map, value => Rnl.floor(value)) },
    ceil(map)      { return mapMap(map, value => Rnl.ceil(value)) },
    percent(map)   { return mapMap(map, value => Rnl.multiply(oneTenth, value)) },
    factorial(map) { return mapMap(map, value => Rnl.factorial(value)) },
    not(map)       { return mapMap(map, value => !value) }
  },

  mapWithVectorValues: {
    abs(map)       { return mapMap(map, array => array.map(e => Rnl.abs(e))) },
    negate(map)    { return mapMap(map, array => array.map(e => Rnl.negate(e))) },
    exp(map)       { return mapMap(map, array => array.map(e => Rnl.exp(e)))},
    floor(map)     { return mapMap(map, array => array.map(e => Rnl.floor(e))) },
    ceil(map)      { return mapMap(map, array => array.map(e => Rnl.ceil(e))) },
    percent(map)   { return mapMap(map, array => array.map(e => Rnl.multiply(oneTenth, e))) },
    factorial(map) { return mapMap(map, array => array.map(e => Rnl.factorial(e))) },
    not(map)       { return mapMap(map, array => array.map(e => !e)) }
  }
};

const dtype = {
  // Given the shapes which are operands to a binary operator,
  // return the resulting data type.
  scalar: {
    scalar(t0, t1, tkn)     {
      return (tkn === "&" || tkn === "&_")
        ? t0 + (tkn === "&" ? dt.ROWVECTOR : dt.COLUMNVECTOR )
        : t0
    },
    complex(t0, t1, tkn)    { return t1 },
    vector(t0, t1, tkn)     { return t1 },
    matrix(t0, t1, tkn)     { return t1 },
    dataFrame(t0, t1, tkn)  { return t1 },
    map(t0, t1, tkn)        { return t1 },
    mapWithVectorValues(t0, t1, tkn) { return t1 }
  },
  complex: {
    scalar(t0, t1, tkn)  { return t0 },
    complex(t0, t1, tkn) { return t0 }
  },
  vector: {
    scalar(t0, t1, tkn) { return t0 },
    map(t0, t1, tkn)    { return t1 + (t0 & dt.ROWVECTOR) + (t0 & dt.COLUMNVECTOR) }
  },
  rowVector: {
    rowVector(t0, t1, tkn) { return tkn === "&_" ? t0 - dt.ROWVECTOR + dt.MATRIX : t0 },
    columnVector(t0, t1, tkn) { return t0 },
    matrix(t0, t1, tkn) { return tkn === "&_" ? t1 : t0 }
  },
  columnVector: {
    rowVector(t0, t1, op) {
      return op === "dot"
      ? dt.RATIONAL
      : op === "cross"
      ? t0
      : t0 - dt.COLUMNVECTOR + dt.MATRIX
    },
    columnVector(t0, t1, tkn) { return tkn === "&" ? t0 - dt.COLUMNVECTOR + dt.MATRIX : t0 },
    matrix(t0, t1, tkn) { return t1 }
  },
  matrix: {
    scalar(t0, t1, tkn) { return t0 },
    rowVector(t0, t1, tkn) { return t0 },
    columnVector(t0, t1, tkn) { return tkn === "&" ? t0 : t1 },
    matrix(t0, t1, tkn) { return t0 },
    map(t0, t1, tkn)    { return 0 }
  },
  dataFrame: {
    scalar(t0, t1, tkn) { return t0 }
  },
  map: {
    scalar(t0, t1, tkn) { return t0 },
    vector(t0, t1, tkn) { return t0 + (t1 & dt.ROWVECTOR) + (t1 & dt.COLUMNVECTOR) },
    matrix(t0, t1, tkn) { return 0 },
    map(t0, t1, tkn)    { return t0 }
  },
  mapWithVectorValues: {
    scalar(t0, t1, tkn) { return t0 }
  }
};


// The binary operators below are called like this:
// resultValue = Operations.binary[shape_0][shape_1][operator](input_0, input_1)

const binary$1 = {
  scalar: {
    scalar: {
      // Binary operations on two scalars
      add(x, y)      { return Rnl.add(x, y) },
      subtract(x, y) { return Rnl.subtract(x, y) },
      multiply(x, y) { return Rnl.multiply(x, y) },
      divide(x, y)   { return Rnl.divide(x, y) },
      power(x, y)    {
        // eslint-disable-next-line max-len
        return Cpx.isComplex(x) || (Rnl.isNegative(x) && Rnl.isPositive(y) && Rnl.lessThan(y, Rnl.one))
          ? Cpx.power([x, Rnl.zero], y)
          : Rnl.power(x, y)
      },
      hypot(x, y)    { return Rnl.hypot(x, y) },
      modulo(x, y)   { return Rnl.modulo(x, y) },
      and(x, y)      { return x && y },
      or(x, y)       { return x || y },
      xor(x, y)      { return x !== y },
      concat(x, y)   { return [x, y] },
      unshift(x, y)  { return [x, y] }
    },
    complex: {
      add(x, z)      { return [Rnl.add(x, z[0]), z[1]] },
      subtract(x, z) { return [Rnl.subtract(x, z[0]), Rnl.negate(z[1])] },
      multiply(x, z) { return [Rnl.multiply(x, z[0]), Rnl.multiply(x, z[1])] },
      divide(x, z)   { return Cpx.divide([x, Rnl.zero], z) },
      power(x, z)    { return Cpx.power([x, Rnl.zero], z) },
      modulo(x, z)   { return errorOprnd("NA_COMPL_OP", "modulo") },
      and(x, z)      { return errorOprnd("NA_COMPL_OP", "and") },
      or(x, z)       { return errorOprnd("NA_COMPL_OP", "or") },
      xor(x, z)      { return errorOprnd("NA_COMPL_OP", "xor") }
    },
    vector: {
      // Binary operations with a scalar and a vector.
      // Perform element-wise operations.
      add(x, v)      { return v.map(e => Rnl.add(x, e)) },
      subtract(x, v) { return v.map(e => Rnl.subtract(x, e)) },
      multiply(x, v) { return v.map(e => Rnl.multiply(x, e)) },
      divide(x, v)   { return v.map(e => Rnl.divide(x, e)) },
      power(x, v)    { return v.map(e => Rnl.power(x, e)) },
      modulo(x, v)   { return v.map(e => Rnl.modulo(x, e)) },
      and(x, v)      { return v.map(e => x && e) },
      or(x, v)       { return v.map(e => x || e) },
      xor(x, v)      { return v.map(e => x !== e) },
      concat(x, v)   { return [x, ...v] }
    },
    matrix: {
      // Binary operations with a scalar and a matrix.
      // Perform element-wise operations.
      add(x, m)      { return m.map(row => row.map(e => Rnl.add(x, e))) },
      subtract(x, m) { return m.map(row => row.map(e => Rnl.subtract(x, e))) },
      multiply(x, m) { return m.map(row => row.map(e => Rnl.multiply(x, e))) },
      divide(x, m)   { return m.map(row => row.map(e => Rnl.divide(x, e))) },
      power(x, m)    { return m.map(row => row.map(e => Rnl.power(x, e))) },
      modulo(x, m)   { return m.map(row => row.map(e => Rnl.modulo(x, e))) },
      and(x, m)      { return m.map(row => row.map(e => x && e)) },
      or(x, m)       { return m.map(row => row.map(e => x || e)) },
      xor(x, m)      { return m.map(row => row.map(e => x !== e)) },
      concat(x, m)   { return errorOprnd("BAD_CONCAT") }
    },
    dataFrame: {
      multiply(x, df) {
        df.data = df.data.map(col => isNaN(col[0]) ? col : col.map(e => {
          let L = e.length;
          if (e.indexOf(".")) { L -= 1; }
          return Rnl.toStringSignificant(Rnl.multiply(x, Rnl.fromString(e)), L)
        }));
        return df
      },
      divide(x, df) {
        df.data = df.data.map(col => isNaN(col[0]) ? col : col.map(e => {
          let L = e.length;
          if (e.indexOf(".")) { L -= 1; }
          return Rnl.toStringSignificant(Rnl.divide(x, Rnl.fromString(e)), L)
        }));
        return df
      }
    },
    map: {
      // Binary operations with a scalar and a map.
      // Perform element-wise operations.
      add(scalar, map) {
        return mapMap(map, value => Rnl.add(scalar, value))
      },
      subtract(scalar, map) {
        return mapMap(map, value => Rnl.subtract(scalar, value))
      },
      multiply(scalar, map) {
        return mapMap(map, value => Rnl.multiply(scalar, value))
      },
      divide(scalar, map) {
        return mapMap(map, value => Rnl.divide(scalar, value))
      },
      power(scalar, map) {
        return mapMap(map, value => Rnl.power(scalar, value))
      },
      modulo(scalar, map) {
        return mapMap(map, value => Rnl.modulo(scalar, value))
      },
      and(scalar, map) {
        return mapMap(map, value => scalar && value)
      },
      or(scalar, map) {
        return mapMap(map, value => scalar || value)
      },
      xor(scalar, map) {
        return mapMap(map, value => scalar !== value)
      }
    },
    mapWithVectorValues: {
      add(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.add(scalar, e)))
      },
      subtract(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.subtract(scalar, e)))
      },
      multiply(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.multiply(scalar, e)))
      },
      divide(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.divide(scalar, e)))
      },
      power(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.power(scalar, e)))
      },
      modulo(scalar, map) {
        return mapMap(map, array => array.map(e => Rnl.modulo(scalar, e)))
      },
      and(scalar, map) {
        return mapMap(map, array => array.map(e => scalar && e))
      },
      or(scalar, map) {
        return mapMap(map, array => array.map(e => scalar || e))
      },
      xor(scalar, map) {
        return mapMap(map, array => array.map(e => scalar !== e))
      }
    }
  },

  complex: {
    scalar: {
      add(z, y)      { return [Rnl.add(z[0], y), z[1]] },
      subtract(z, y) { return [Rnl.subtract(z[0], y), z[1]] },
      multiply(z, y) { return [Rnl.multiply(z[0], y), Rnl.multiply(z[1], y) ] },
      divide(z, y)   { return Cpx.divide(z, [y, Rnl.zero]) },
      power(z, y)    { return Cpx.power(z, [y, Rnl.zero]) },
      modulo(z, y)   { return errorOprnd("NA_COMPL_OP", "modulo") },
      and(z, y)      { return errorOprnd("NA_COMPL_OP", "and") },
      or(z, y)       { return errorOprnd("NA_COMPL_OP", "or") },
      xor(z, y)      { return errorOprnd("NA_COMPL_OP", "xor") }
    },
    complex: {
      add(x, y)      { return [Rnl.add(x[0], y[0]), Rnl.add(x[1], y[1])] },
      subtract(x, y) { return [Rnl.subtract(x[0], y[0]), Rnl.subtract(x[1], y[1])] },
      multiply(x, y) { return Cpx.multiply(x, y) },
      divide(x, y)   { return Cpx.divide(x, y) },
      power(x, y)    { return Cpx.power(x, y) },
      modulo(x, y)   { return errorOprnd("NA_COMPL_OP", "modulo") },
      and(x, y)      { return errorOprnd("NA_COMPL_OP", "and") },
      or(x, y)       { return errorOprnd("NA_COMPL_OP", "or") },
      xor(x, y)      { return errorOprnd("NA_COMPL_OP", "xor") }

    }
  },

  vector: {
    scalar: {
      // Binary operations with a vector and a scalar.
      // Perform element-wise operations.
      add(v, x)      { return v.map(e => Rnl.add(e, x)) },
      subtract(v, x) { return v.map(e => Rnl.subtract(e, x)) },
      multiply(v, x) { return v.map(e => Rnl.multiply(e, x)) },
      divide(v, x)   { return v.map(e => Rnl.divide(e, x)) },
      power(v, x)    { return v.map(e => Rnl.power(e, x)) },
      modulo(v, x)   { return v.map(e => Rnl.modulo(e, x)) },
      and(v, x)      { return v.map(e => e && x) },
      or(v, x)       { return v.map(e => e || x) },
      xor(v, x)      { return v.map(e => e !== x) },
      concat(v, x)   { return [...v, x]}
    },
    map: {
      // Binary operations with a vector and a map
      add(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.add(val, e)))
      },
      subtract(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.subtract(val, e)))
      },
      multiply(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.multiply(val, e)))
      },
      divide(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.divide(val, e)))
      },
      power(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.power(val, e)))
      },
      modulo(vector, map) {
        return mapMap(map, val => vector.map(e => Rnl.modulo(val, e)))
      },
      and(vector, map) {
        return mapMap(map, val => vector.map(e => val && e))
      },
      or(vector, map) {
        return mapMap(map, val => vector.map(e => val || e))
      },
      xor(vector, map) {
        return mapMap(map, val => vector.map(e => val !== e))
      }
    }
  },

  rowVector: {
    rowVector: {
      // Binary operations on two row vectors.
      add(x, y) {
        // element-wise addition
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.add(e, y[i]))
      },
      subtract(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.subtract(e, y[i]))
      },
      divide(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.divide(e, y[i]))
      },
      dot(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      cross(x, y) {
        if (x.length !== 3 || y.length !== 3) { return errorOprnd("CROSS") }
        const v = [Rnl.zero, Rnl.zero, Rnl.zero];
        v[0] = Rnl.subtract(Rnl.multiply(x[1], y[2]), Rnl.multiply(x[2], y[1]));
        v[1] = Rnl.subtract(Rnl.multiply(x[2], y[0]), Rnl.multiply(x[0], y[2]));
        v[2] = Rnl.subtract(Rnl.multiply(x[0], y[1]), Rnl.multiply(x[1], y[0]));
        return v
      },
      multiply(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.multiply(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      asterisk(x, y) {
        // Element-wise multiplication
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.multiply(e, y[i]))
      },
      power(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.power(e, y[i]))
      },
      modulo(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.modulo(e, y[i]))
      },
      and(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e && y[i])
      },
      or(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e || y[i])
      },
      xor(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e !== y[i])
      },
      concat(x, y) { return x.concat(y) },
      unshift(x, y) { return [x, y] }
    },
    columnVector: {
      // Binary operations on a row vector and a column vector.
      // Except for multiplication, these work only if both vectors have only one element.
      add(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.add(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      subtract(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.subtract(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      dot(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      cross(x, y) {
        if (x.length !== 3 || y.length !== 3) { return errorOprnd("CROSS") }
        const v = [Rnl.zero, Rnl.zero, Rnl.zero];
        v[0] = Rnl.subtract(Rnl.multiply(x[1], y[2]), Rnl.multiply(x[2], y[1]));
        v[1] = Rnl.subtract(Rnl.multiply(x[2], y[0]), Rnl.multiply(x[0], y[2]));
        v[2] = Rnl.subtract(Rnl.multiply(x[0], y[1]), Rnl.multiply(x[1], y[0]));
        return v
      },
      multiply(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      asterisk(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.multiply(e, y[i]))
      },
      power(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.power(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      modulo(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.modulo(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      and(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] && y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      or(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] || y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      xor(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] !== y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      concat(x, y)  { return "BAD_CONCAT" },
      unshift(x, y) { return "BAD_CONCAT" }
    },
    matrix: {
      // Binary operations on a row vector and a 2-D matrix.
      add(v, m) {
        // Add the row vector to each row in the matrix
        if (v.length !== m[0].length) { return errorOprnd("MIS_ELNUM") }
        return m.map(row => row.map((e, i) => Rnl.add(v[i], e)))
      },
      subtract(v, m) {
        if (v.length !== m[0].length) { return errorOprnd("MIS_ELNUM") }
        return m.map(row => row.map((e, i) => Rnl.subtract(v[i], e)))
      },
      concat(v, m) {
        if (v.length !== m[0].length) { return errorOprnd("BAD_CONCAT") }
        return m.map((row, i) => [v[i], ...row])
      },
      unshift(v, m) {
        if (v.length !== m.length) { return errorOprnd("BAD_CONCAT") }
        return [v, ...m]
      }
    }
  },

  columnVector: {
    rowVector: {
      // Binary operations on a column vector and a row vector.
      // Except for multiplication, these work only if both vectors have only one element.
      add(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.add(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      subtract(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.subtract(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      dot(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      cross(x, y) {
        if (x.length !== 3 || y.length !== 3) { return errorOprnd("CROSS") }
        const v = [Rnl.zero, Rnl.zero, Rnl.zero];
        v[0] = Rnl.subtract(Rnl.multiply(x[1], y[2]), Rnl.multiply(x[2], y[1]));
        v[1] = Rnl.subtract(Rnl.multiply(x[2], y[0]), Rnl.multiply(x[0], y[2]));
        v[2] = Rnl.subtract(Rnl.multiply(x[0], y[1]), Rnl.multiply(x[1], y[0]));
        return v
      },
      multiply(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      divide(x, y) {
        return x.map(m => y.map(e => Rnl.divide(m, e)))
      },
      asterisk(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.multiply(e, y[i]))
      },
      power(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.power(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      modulo(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.modulo(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      and(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] && y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      or(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] || y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      xor(x, y) {
        if (x.length === 1 && y.length === 1) { return [x[0] !== y[0]] }
        return errorOprnd("MIS_ELNUM")
      },
      concat(x, y)  { return "BAD_CONCAT" },
      unshift(x, y) { return "BAD_CONCAT" }
    },
    columnVector: {
      // Binary operations on two column vectors.
      add(x, y) {
        // element-wise addition
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.add(e, y[i]))
      },
      subtract(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.subtract(e, y[i]))
      },
      divide(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.divide(e, y[i]))
      },
      dot(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return dotProduct(x, y)
      },
      cross(x, y) {
        if (x.length !== 3 || y.length !== 3) { return errorOprnd("CROSS") }
        const v = [Rnl.zero, Rnl.zero, Rnl.zero];
        v[0] = Rnl.subtract(Rnl.multiply(x[1], y[2]), Rnl.multiply(x[2], y[1]));
        v[1] = Rnl.subtract(Rnl.multiply(x[2], y[0]), Rnl.multiply(x[0], y[2]));
        v[2] = Rnl.subtract(Rnl.multiply(x[0], y[1]), Rnl.multiply(x[1], y[0]));
        return v
      },
      multiply(x, y) {
        if (x.length === 1 && y.length === 1) { return [Rnl.multiply(x[0], y[0])] }
        return errorOprnd("MIS_ELNUM")
      },
      asterisk(x, y) {
        // Element-wise multiplication
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.multiply(e, y[i]))
      },
      power(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.power(e, y[i]))
      },
      modulo(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => Rnl.modulo(e, y[i]))
      },
      and(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e && y[i])
      },
      or(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e || y[i])
      },
      xor(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => e !== y[i])
      },
      concat(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((e, i) => [e, y[i]])
      },
      unshift(x, y) { return x.concat(y) }
    },

    matrix: {
      // Binary operations on a column vector and a 2-D matrix.
      add(v, m) {
        // Add the column vector to each column of the matrix
        const result = clone(m);
        if (v.length !== m.length) { return errorOprnd("MIS_ELNUM") }
        for (let i = 0; i < m.length; i++) {
          for (let j = 0; j < m[0].length; j++) {
            result[i][j] = Rnl.add(m[i][j], v[j]);
          }
        }
        return result
      },
      subtract(v, m) {
        // Add the column vector to each column of the matrix
        const result = clone(m);
        if (v.length !== m.length) { return errorOprnd("MIS_ELNUM") }
        for (let i = 0; i < m.length; i++) {
          for (let j = 0; j < m[0].length; j++) {
            result[i][j] = Rnl.subtract(m[i][j], v[j]);
          }
        }
        return result
      },
      concat(v, m) {
        if (v.length !== m.length) { return errorOprnd("MIS_ELNUM") }
        return m.map((row, i) => [v[i], ...row])
      },
      unshift(x, y) { return "BAD_CONCAT" }
    }
  },

  matrix: {
    scalar: {
      // Binary operations with a matrix and a scalar.
      // Perform element-wise operations.
      add(m, x)      { return m.map(row => row.map(e => Rnl.add(e, x))) },
      subtract(m, x) { return m.map(row => row.map(e => Rnl.subtract(e, x))) },
      multiply(m, x) { return m.map(row => row.map(e => Rnl.multiply(e, x))) },
      divide(m, x)   { return m.map(row => row.map(e => Rnl.divide(e, x))) },
      power(m, x)    {
        if (x === "T") { return transpose2D(m) }
        if (m.length === m[0].length && Rnl.areEqual(x, [BigInt(-1), BigInt(1)])) {
          return Matrix.invert(m)
        }
        return m.map(row => row.map(e => Rnl.power(e, x)))
      },
      modulo(m, x)   { return m.map(row => row.map(e => Rnl.modulo(e, x))) }
    },
    rowVector: {
      add(m, v)      { return m.map(row => row.map((e, i) => Rnl.add(e, v[i]) )) },
      subtract(m, v) { return m.map(row => row.map((e, i) => Rnl.subtract(e, v[i]) )) },
      multiply(m, v) { return m.map(row => row.map((e, i) => Rnl.multiply(e, v[i]) )) },
      divide(m, v)   { return m.map(row => row.map((e, i) => Rnl.divide(e, v[i]) )) },
      power(m, v)    { return m.map(row => row.map((e, i) => Rnl.power(e, v[i]) )) },
      unshift(m, v) {
        if (m[0].length !== v.length) { return errorOprnd("MIS_ELNUM") }
        return [...m, v]
      }
    },
    columnVector: {
      add(m, v)      { return m.map(row => row.map((e, i) => Rnl.add(e, v[i]) )) },
      subtract(m, v) { return m.map(row => row.map((e, i) => Rnl.subtract(e, v[i]) )) },
      multiply(m, v) {
        // Multiply a matrix times a column vector
        if (m[0].length !== v.length) { return errorOprnd("MIS_ELNUM") }
        return m.map(row => dotProduct(row, v))
      },
      concat(m, v) {
        if (m.length !== v.length) { return errorOprnd("MIS_ELNUM") }
        return m.map((row, i) => [...row, v[i]])
      }
    },
    matrix: {
      // Binary operations on two 2-D matrices.
      add(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.add(n, y[i][j])))
      },
      subtract(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.subtract(n, y[i][j])))
      },
      dot(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((row, i) => dotProduct(row, y[i])).reduce((m, n) => Rnl.add(m, n))
      },
      cross(x, y) {
        return errorOprnd("CROSS")
      },
      multiply(x, y) {

      },
      asterisk(x, y) {
        // Element-wise multiplication
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.multiply(n, y[i][j])))
      },
      divide(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.divide(n, y[i][j])))
      },
      power(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.power(n, y[i][j])))
      },
      modulo(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => Rnl.modulo(n, y[i][j])))
      },
      and(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => n && y[i][j]))
      },
      or(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => n || y[i][j]))
      },
      xor(x, y) {
        if (x.length !== y.length)       { return errorOprnd("MIS_ELNUM") }
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.map((m, i) => m.map((n, j) => n !== y[i][j]))
      },
      concat(x, y) {
        if (x.length !== y.length) { return errorOprnd("MIS_ELNUM") }
        return x.map((row, i) => row.concat(y[i]))
      },
      unshift(x, y) {
        if (x[0].length !== y[0].length) { return errorOprnd("MIS_ELNUM") }
        return x.concat(y)
      }
    },
    map: {

    }
  },

  dataFrame: {
    multiply(df, scalar) {
      df.data = df.data.map(col => isNaN(col[0]) ? col : col.map(e => {
        let L = e.length;
        if (e.indexOf(".")) { L -= 1; }
        return Rnl.toStringSignificant(Rnl.multiply(scalar, Rnl.fromString(e)), L)
      }));
      return df
    },
    divide(df, scalar) {
      df.data = df.data.map(col => isNaN(col[0]) ? col : col.map(e => {
        let L = e.length;
        if (e.indexOf(".")) { L -= 1; }
        return Rnl.toStringSignificant(Rnl.divide(scalar, Rnl.fromString(e)), L)
      }));
      return df
    }
  },

  map: {
    scalar: {
      // Binary opertions on a map and a scalar
      add(map, scalar) {
        return mapMap(map, value => Rnl.add(value, scalar))
      },
      subtract(map, scalar) {
        return mapMap(map, value => Rnl.subtract(value, scalar))
      },
      multiply(map, scalar) {
        return mapMap(map, value => Rnl.multiply(value, scalar))
      },
      divide(map, scalar) {
        return mapMap(map, value => Rnl.divide(value, scalar))
      },
      power(map, scalar) {
        return mapMap(map, value => Rnl.power(value, scalar))
      },
      modulo(map, scalar) {
        return mapMap(map, value => Rnl.modulo(value, scalar))
      },
      and(map, scalar) {
        return mapMap(map, value => value && scalar)
      },
      or(map, scalar) {
        return mapMap(map, value => value || scalar)
      },
      xor(map, scalar) {
        return mapMap(map, value => value !== scalar)
      }
    },
    vector: {
      add(map, array) {
        return mapMap(map, value => array.map(e => Rnl.add(value, e)))
      },
      subtract(map, array) {
        return mapMap(map, value => array.map(e => Rnl.subtract(value, e)))
      },
      multiply(map, array) {
        return mapMap(map, value => array.map(e => Rnl.multiply(value, e)))
      },
      divide(map, array) {
        return mapMap(map, value => array.map(e => Rnl.divide(value, e)))
      },
      power(map, array) {
        return mapMap(map, value => array.map(e => Rnl.power(value, e)))
      },
      modulo(map, array) {
        return mapMap(map, value => array.map(e => Rnl.modulo(value, e)))
      },
      and(map, array) {
        return mapMap(map, value => array.map(e => value && e))
      },
      or(map, array) {
        return mapMap(map, value => array.map(e => value || e))
      },
      xor(map, array) {
        return mapMap(map, value => array.map(e => value !== e))
      }
    },
    matrix: {

    },
    map: {

    }
  },
  mapWithVectorValues: {
    scalar: {
      add(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.add(e, scalar)))
      },
      subtract(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.subtract(e, scalar)))
      },
      multiply(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.multiply(e, scalar)))
      },
      divide(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.divide(e, scalar)))
      },
      power(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.power(e, scalar)))
      },
      modulo(map, scalar) {
        return mapMap(map, array => array.map(e => Rnl.modulo(e, scalar)))
      },
      and(map, scalar) {
        return mapMap(map, array => array.map(e => e && scalar))
      },
      or(map, scalar) {
        return mapMap(map, array => array.map(e => e || scalar))
      },
      xor(map, scalar) {
        return mapMap(map, array => array.map(e => e !== scalar))
      }

    },
    vector: {

    },
    matrix: {

    },
    map: {

    },
    mapWithVectorValues: {

    }
  }
};

// Binary relations get their own object, separate from other binary operations.
// That's because Hurmet allows chained comparisons, as in  a < b < c.
// So we have to pass yPrev as well as the two current operands.

const relations = {
  scalar: {
    scalar: {
      relate(op, x, y, yPrev) { return compare(op, x, y, yPrev) }
    },
    vector: {
      relate(op, x, v, yPrev) {
        if (yPrev === undefined) {
          return v.map(e => compare(op, x, e, undefined))
        } else if (typeof yPrev !== "object") {
          return v.map(e => compare(op, x, e, yPrev))
        } else if (Array.isArray(yPrev)) {
          return v.map((e, i) => compare(op, x, e, yPrev[i]))
        }
      }
    },
    matrix: {
      relate(op, x, m, yPrev) {
        if (yPrev === undefined) {
          return m.map(row => row.map(e => compare(op, x, e, undefined)))
        } else if (typeof yPrev !== "object") {
          return m.map(row => row.map(e => compare(op, x, e, yPrev)))
        } else if (Array.isArray(yPrev)) {
          return m.map((row, i) => row.map((e, j) => compare(op, x, e, yPrev[i][j])))
        }
      }
    },
    map: {
      relate(op, x, map, yPrev) {
        if (yPrev === undefined) {
          return mapMap(map, value => compare(op, x, value, undefined))
        } else if (typeof yPrev !== "object") {
          return mapMap(map, value => compare(op, x, value, yPrev))
        } else {
          const newMap = new Map();
          for (const [key, value] of map.entries()) {
            newMap.set(key,  compare(op, x, value, yPrev[key]));
          }
          return newMap
        }
      }
    }
  },
  vector: {
    scalar: {
      relate(op, v, y, yPrev) {
        if (yPrev === undefined) {
          return v.map(e => compare(op, e, y, undefined))
        } else if (typeof yPrev !== "object") {
          return v.map(e => compare(op, e, y, yPrev))
        } else if (Array.isArray(yPrev)) {
          return v.map((e, i) => compare(op, e, y, yPrev[i]))
        }
      }
    }
  },
  rowVector: {
    rowVector: {
      relate(op, x, y, yPrev) {
        if (yPrev === undefined) {
          return x.map((e, i) => compare(op, e, y[i], undefined))
        }
      }
    }
  },
  columnVector: {
    columnVector: {
      relate(op, x, y, yPrev) {
        if (yPrev === undefined) {
          return x.map((e, i) => compare(op, e, y[i], undefined))
        }
      }
    }
  },
  matrix: {
    scalar: {
      relate(op, m, y, yPrev) {
        if (yPrev === undefined) {
          return m.map(row => row.map(e => compare(op, e, y, undefined)))
        } else if (typeof yPrev !== "object") {
          return m.map(row => row.map(e => compare(op, e, y, yPrev)))
        } else if (Array.isArray(yPrev)) {
          return m.map((row, i) => row.map((e, j) => compare(op, e, y, yPrev[i][j])))
        }
      }
    }
  }
};

const isDivByZero = (quotient, shape) => {
  switch (shape) {
    case "scalar":
      return quotient[1] === BigInt(0)
    case "vector":
      for (let i = 0; i < quotient.length; i++) {
        if (quotient[i][1] === BigInt(0)) { return true }
      }
      return false
    case "matrix":
      for (let i = 0; i < quotient.length; i++) {
        for (let j = 0; j < quotient[0].length; j++) {
          if (quotient[i][j][1] === BigInt(0)) { return true }
        }
      }
      return false
    case "map":
      for (const [_, value] of Object.entries(quotient)) {
        if (value[1] === BigInt(0)) { return true }
      }
      return false
    case "mapWithVectorValues":
      for (const [_, value] of Object.entries(quotient)) {
        for (let i = 0; i < value.length; i++) {
          if (value[i][1] === BigInt(0)) { return true }
        }
      }
      return false
    default:
      return false
  }
};

const Operators = Object.freeze({
  unary: unary$1,
  binary: binary$1,
  relations,
  dtype
});

const wideCharRegEx = /[\uD800-\uDBFF][\uDC00-\uDFFF][\uFE00\uFE01]?/g;

const textRange = (str, index) => {
  // Find a range of the string str
  if (index.dtype !== dt.RATIONAL && index.dtype !== dt.RANGE) {
    return errorOprnd("STR_INDEX")
  }

  const wideCharMatches = arrayOfRegExMatches(wideCharRegEx, str);
  let value = "";

  if (wideCharMatches.length === 0) {
    // No surrogate pairs were found.
    // Each text character is one UTF-16 code unit.
    // So do a naive access of the string.
    if (index.dtype === dt.RATIONAL) {
      value = str.charAt(Rnl.toNumber(index.value) - 1);
    } else if (index.dtype === dt.RANGE) {
      const start = Rnl.toNumber(index.value[0]);
      const step = Rnl.toNumber(index.value[1]);
      const end = index.value[2] === "∞"
        ? str.length
        : Rnl.toNumber(index.value[2]);
      if (step === 1) {
        // No step size specified.
        value = str.slice(start - 1, end);
      } else {
        for (let i = start - 1; i < end; i += step) {
          value += str.charAt(i);
        }
      }
    }
  } else {
    // We must account for surrogate pairs and variation selectors.
    let discardLength = 0;
    let endOfPrevWideChar = 0;
    let cleanString = "";
    let start = 0;
    let step = 0;
    let end = 0;
    if (index.dtype === dt.RATIONAL) {
      // Return one character.
      start = Rnl.toNumber(index.value);
      step = 1;
      end = start;
    } else {
      // index is a range and str contains at least one surrogate pair.
      start = Rnl.toNumber(index.value[0]);
      step = Rnl.toNumber(index.value[1]);
      end = Rnl.toNumber(index.value[2]);
    }
    let realIndex = start;

    for (let i = 0; i < wideCharMatches.length; i++) {
      const posWideChar = wideCharMatches[i].index;
      cleanString = str.slice(endOfPrevWideChar, posWideChar);
      while (realIndex <= end && discardLength + cleanString.length >= realIndex) {
        value += cleanString[realIndex - discardLength - 1];
        realIndex += step;
      }
      if (realIndex <= end && discardLength + cleanString.length === realIndex - 1) {
        value += wideCharMatches[i].value;
        realIndex += step;
      }
      if (realIndex > end) {
        return { value, unit: null, dtype: dt.STRING }
      }
      discardLength += cleanString.length + 1;
      endOfPrevWideChar = posWideChar + wideCharMatches[i].length;
    }
    if (realIndex >= discardLength && realIndex <= end) {
      cleanString = str.slice(endOfPrevWideChar);
      while (realIndex <= end && discardLength + cleanString.length >= realIndex) {
        value += cleanString[realIndex - discardLength - 1];
        realIndex += step;
      }
    } else {
      return errorOprnd("BIGINDEX")
    }
  }
  return { value, unit: null, dtype: dt.STRING }
};

function insertOneHurmetVar(hurmetVars, attrs, decimalFormat) {
  // hurmetVars is a key:value store of variable names and attributes.
  // This function is called to insert an assignment into hurmetVars.
  const formatSpec = hurmetVars.format ? hurmetVars.format.value : "h15";

  if (!Array.isArray(attrs.name)) {
    // This is the typical case.
    hurmetVars[attrs.name] = attrs;

  } else if (attrs.value === null) {
    for (let i = 0; i < attrs.name.length; i++) {
      hurmetVars[attrs.name[i]] = { value: null };
    }

  } else if (isMatrix(attrs)) {
    // Assign to a matrix of names
    const isQuantity = Boolean(attrs.dtype & dt.QUANTITY);
    let resultDisplay = attrs.resultdisplay;
    resultDisplay = resultDisplay.replace(/\\(begin|end){[bp]matrix}/g, "").trim();
    const displays = resultDisplay.split(/&|\\\\/);
    if (attrs.dtype & dt.MATRIX) {
      // A 2 dimensional matrix.
      const dtype = attrs.dtype - dt.MATRIX;
      const numRows = isQuantity ? attrs.value.plain.length : attrs.value.length;
      const numCols = attrs.name.length / numRows;
      let iName = 0;
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          const value = isQuantity
            ? { plain: attrs.value.plain[i][j], inBaseUnits: attrs.value.inBaseUnits[i][j] }
            : attrs.value[i][j];
          hurmetVars[attrs.name[i]] = {
            name: attrs.name[iName],
            value,
            resultdisplay: isQuantity
              ? parse(displays[iName].trim() + " '" + attrs.unit + "'")
              : displays[iName].trim(),
            expos: attrs.expos,
            unit: isQuantity ? attrs.unit : undefined,
            dtype
          };
          iName += 1;
        }
      }
    } else {
      // Assign to a vector of names.
      const isColumn = Boolean(attrs.dtype & dt.COLUMNVECTOR);
      const dtype = attrs.dtype - (isColumn ? dt.COLUMNVECTOR : dt.ROWVECTOR);
      for (let i = 0; i < attrs.name.length; i++) {
        const value = isQuantity
          ? { plain: attrs.value.plain[i], inBaseUnits: attrs.value.inBaseUnits[i] }
          : attrs.value[i];
        hurmetVars[attrs.name[i]] = {
          name: attrs.name[i],
          value,
          resultdisplay: isQuantity
            ? parse(displays[i].trim() + " '" + attrs.unit + "'")
            : displays[i].trim(),
          expos: attrs.expos,
          unit: isQuantity ? attrs.unit : undefined,
          dtype
        };
      }
    }

  // From this point forward, we're dealing with multiple assignment
  } else if (attrs.dtype & dt.MAP) {
    const unit = attrs.value.unit;
    const unitName = unit && unit.name ? unit.name : undefined;
    const dtype = attrs.dtype - dt.MAP;
    let i = 0;
    if (attrs.dtype & dt.QUANTITY) {
      for (const value of attrs.value.plain.values()) {
        const result = {
          value: { plain: value },
          expos: attrs.expos,
          factor: attrs.factor,
          dtype
        };
        result.resultdisplay = format(value, formatSpec, decimalFormat);
        if (unitName) { result.resultdisplay += " " + unitTeXFromString(unitName); }
        hurmetVars[attrs.name[i]] = result;
        i += 1;
      }
      i = 0;
      for (const value of attrs.value.inBaseUnits.values()) {
        hurmetVars[attrs.name[i]].value.inBaseUnits = value;
        i += 1;
      }
    } else {
      for (const value of attrs.value.values()) {
        const result = { value, expos: attrs.expos, factor: attrs.factor, dtype };
        result.resultdisplay = Rnl.isRational(value)
          ? format(value, formatSpec, decimalFormat)
          : String(value);
        if (unitName) { result.resultdisplay += " " + unitTeXFromString(unitName); }
        hurmetVars[attrs.name[i]] = result;
        i += 1;
      }
    }
  } else if (attrs.dtype === dt.DATAFRAME) {
    for (let i = 0; i < attrs.name.length; i++) {
      const datum = attrs.value.data[i][0];
      const dtype = attrs.value.dtype[i];
      const val = (dtype & dt.RATIONAL) ? Rnl.fromString(datum) : datum;
      const result = {
        value: val,
        unit: attrs.unit[attrs.value.units[i]],
        dtype,
        resultdisplay: (dtype & dt.RATIONAL) ? parse(format(val)) : parse(val)
      };
      if (attrs.value.units[i]) {
        result.value = { plain: result.value };
        const unit = attrs.unit[attrs.value.units[i]];
        result.value.inBaseUnits =
          Rnl.multiply(Rnl.add(result.value.plain, unit.gauge), unit.factor);
        result.expos = unit.expos;
        result.resultdisplay += " " + unitTeXFromString(result.unit.name);
      }
      hurmetVars[attrs.name[i]] = result;
    }
  } else if (attrs.dtype === dt.TUPLE) {
    let i = 0;
    for (const value of attrs.value.values()) {
      hurmetVars[attrs.name[i]] = value;
      i += 1;
    }
  } else if (attrs.dtype === dt.MODULE) {
    if (attrs.name.length !== attrs.value.length) {
      return errorOprnd("MULT_MIS")
    } else {
      let i = 0;
      for (const value of attrs.value.values()) {
        const result = clone(value);
        hurmetVars[attrs.name[i]] = result;
        i += 1;
      }
    }
  }
}

/**
 * # hurmetMark.js
 *
 * Hurmet.app can export to its own flavor of Markdown.
 * This version of Markdown is stricter in some ways than CommonMark or
 * Gruber's original Markdown. So the parser can be considerably simplified.
 * md2ast() returns an AST that matches the memory structure  of a Hurmet.app document.
 *
 * ## Ways in which this syntax is more strict than Markdown.
 *
 * 1. Emphasis: _emphasis_ only. Asterisks do not create standard emphasis.
 * 2. Strong emphasis: **strong emphasis** only. Underlines do not create strong emphasis.
 * 3. Code blocks must be fenced by triple backticks.
 *    Indented text does not indicate a code block.
 * 4. A blank line must precede the beginning of a list, even a nested list.
 * 5. A hard line break is indicated when a line ends with "\". Double spaces do not count.
 * 6. "Shortcut" reference links [ref] are not recognized.
 *    Implicit reference links are recognized and are expanded, see below.
 *
 * ## Extensions
 *
 * 1. Hurmet inline calculation is delimited ¢…¢.
 *    Hurmet display calculation is fenced ¢¢\n … \n¢¢.
 * 2. LaTeX inline math is delimited $…$. $ and \\ are escaped \$ & \\\\.
 *    LaTeX display math is fenced  $$\n … \n$$.
 * 3. ~subscript~
 * 4. ~~strikethrough~~
 * 5. Pipe tables as per Github Flavored Markdown (GFM).
 * 6. Grid tables as per reStructuredText, with two exceptions:
 *    a. The top border contains ":" characters to indicate column justtification.
 *    b. Top & left borders contain "+" characters at border locations, even where
 *       a merged cell prevents a border from extending to the tables outer edge.
 * 7. Implicit reference links [title][] and implicit reference images ![alt][]
 *    ⋮
 *    [alt]: path
 *    Reference images can have captions and directives. Format is:
 *    ![alt text][ref]{caption}   or [alt][]{caption}
 *      ⋮
 *    [ref]: filepath
 *    {.class #id width=number}
 * 8. Table directives. They are placed on the line after the table. The format is:
 *    {.class #id width=num widths="num1 num2 …"}
 * 9. Lists that allow the user to pick list ordering.
 *      1. →  1. 2. 3.  etc.
 *      A. →  A. B. C.  etc. (future)
 *      a) →  (a) (b) (c)  etc. (future)
 * 10. Definition lists, per Pandoc.  (future)
 * 11. Blurbs set an attribute on a block element, as in Markua.
 *     Blurbs are denoted by a symbol in the left margin.
 *     Subsequent indented text blocks are children of the blurb.
 *     Blurb symbols:
 *       i> indented block
 *       C> Centered block
 *       H> print header element, <header>
 *       I> Information admonition (future)
 *       W> Warning admonition (future)
 *       T> Tip admonition (future)
 *       c> Comment admonition (future)
 * 12. [^1] is a reference to a footnote. (future)
 *     [^1]: The body of the footnote is deferred, similar to reference links.
 * 13. [#1] is a reference to a citation. (future)
 *     [#1]: The body of the citation is deferred, similar to reference links.
 * 14. Line blocks begin with "| ", as per Pandoc. (future)
 *
 * hurmetMark.js copyright (c) 2021, 2022 Ron Kok
 *
 * This file has been adapted (and heavily modified) from Simple-Markdown.
 * Simple-Markdown copyright (c) 2014-2019 Khan Academy & Aria Buckles.
 *
 * Portions of Simple-Markdown were adapted from marked.js copyright (c) 2011-2014
 * Christopher Jeffrey (https://github.com/chjj/).
 *
 * LICENSE (MIT):
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


const CR_NEWLINE_R = /\r\n?/g;
const TAB_R = /\t/g;
const FORMFEED_R = /\f/g;
const CLASS_R = /(?:^| )\.([a-z-]+)(?: |$)/;
const WIDTH_R = /(?:^| )width="?([\d.a-z]+"?)(?: |$)/;
const COL_WIDTHS_R = /(?:^| )colWidths="([^"]*)"/;
const ID_R = /(?:^| )#([a-z-]+)(?: |$)/;

// Turn various whitespace into easy-to-process whitespace
const preprocess = function(source) {
  return source.replace(CR_NEWLINE_R, "\n").replace(FORMFEED_R, "").replace(TAB_R, "    ");
};

// Creates a match function for an inline scoped element from a regex
const inlineRegex = function(regex) {
  const match = function(source, state) {
    return state.inline ? regex.exec(source) : null
  };
  match.regex = regex;
  return match;
};

// Creates a match function for a block scoped element from a regex
const blockRegex = function(regex) {
  const match = function(source, state) {
    return state.inline ? null : regex.exec(source)
  };
  match.regex = regex;
  return match;
};

// Creates a match function from a regex, ignoring block/inline scope
const anyScopeRegex = function(regex) {
  const match = function(source, state) {
    return regex.exec(source);
  };
  match.regex = regex;
  return match;
};

const UNESCAPE_URL_R = /\\([^0-9A-Za-z\s])/g;
const unescapeUrl = function(rawUrlString) {
  return rawUrlString.replace(UNESCAPE_URL_R, "$1");
};

const parseList = (str, state) => {
  const items = str.replace(LIST_BLOCK_END_R, "\n").match(LIST_ITEM_R);
  const isTight = state.inHtml && !/\n\n(?!$)/.test(str);
  const itemContent = items.map(function(item, i) {
    // We need to see how far indented this item is:
    const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
    const space = prefixCapture ? prefixCapture[0].length : 0;
    // And then we construct a regex to "unindent" the subsequent
    // lines of the items by that amount:
    const spaceRegex = new RegExp("^ {1," + space + "}", "gm");

    // Before processing the item, we need a couple things
    const content = item
      // remove indents on trailing lines:
      .replace(spaceRegex, "")
      // remove the bullet:
      .replace(LIST_ITEM_PREFIX_R, "");

    // backup our state for restoration afterwards. We're going to
    // want to set state._list to true, and state.inline depending
    // on our list's looseness.
    const oldStateInline = state.inline;
    const oldStateList = state._list;
    state._list = true;
    const oldStateTightness = state.isTight;
    state.isTight = isTight;

    // Parse the list item
    state.inline = isTight;
    const adjustedContent = content.replace(LIST_ITEM_END_R, "");
    const result = isTight
      ? { type: "list_item", content: parseInline(adjustedContent, state) }
      : { type: "list_item", content: parse$1(adjustedContent, state) };

    // Restore our state before returning
    state.inline = oldStateInline;
    state._list = oldStateList;
    state.isTight = oldStateTightness;
    return result;
  });

  return itemContent
};

const TABLES = (function() {
  const TABLE_ROW_SEPARATOR_TRIM = /^ *\| *| *\| *$/g;
  const TABLE_RIGHT_ALIGN = /^[-=]+:$/;
  const TABLE_CENTER_ALIGN = /^:[-=]+:$/;

  const parseTableAlign = function(source) {
    // Inspect ":" characters to set column justification.
    // Return class names that specify center or right justification on specific columns.
    source = source.replace(TABLE_ROW_SEPARATOR_TRIM, "");
    const alignArr = source.trim().split(/[|+*]/);
    let alignStr = "";
    for (let i = 0; i < alignArr.length; i++) {
      alignStr += TABLE_CENTER_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}c`
        : (TABLE_RIGHT_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}r`
        : "");
    }
    return alignStr.trim()
  };

  const tableDirectives = (directives, align) => {
    // Get CSS class, ID, and column widths, if any.
    if (!directives && align === "") { return ["", "", null] }
    const userDefClass = CLASS_R.exec(directives);
    let myClass = (userDefClass) ? userDefClass[1] : "";
    if (align.length > 0) { myClass += (myClass.length > 0 ? " " : "") + align; }
    const userDefId = ID_R.exec(directives);
    const myID = (userDefId) ? userDefId[1] : "";
    const colWidthMatch = COL_WIDTHS_R.exec(directives);
    const colWidths = (colWidthMatch) ? colWidthMatch[1].split(" ") : null;
    return [myClass, myID, colWidths]
  };

  const parsePipeTableRow = function(source, parse, state, colWidths, inHeader) {
    const prevInTable = state.inTable;
    state.inTable = true;
    const tableRow = parse(source.trim(), state);
    consolidate(tableRow);
    state.inTable = prevInTable;

    const row = {
      type: "table_row",
      content: []
    };
    let j = -1;
    tableRow.forEach(function(node, i) {
      if (node.type === "text") { node.text = node.text.trim(); }
      if (node.type === "tableSeparator") {
        if (i !== tableRow.length - 1) {  // Filter out the row's  last table separator
          // Create a new cell
          j += 1;
          row.content.push({
            "type": inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": 1,
              "rowspan": 1,
              "colwidth": (colWidths) ? [Number(colWidths[j])] : null,
              "background": null
            },
            content: (state.inHtml ? [] : [{ "type": "paragraph", "content": [] }])
          });
        }
      } else if (state.inHtml) {
        // For direct to HTML, write the inline contents directly into the <td> element.
        // row   cell    content      text
        row.content[j].content.push(node);
      } else {
        // Hurmet.app table cells always contain a paragraph.
        // row   cell  paragraph  content      text
        row.content[j].content[0].content.push(node);
      }
    });

    return row;
  };

  const parsePipeTable = function() {
    return function(capture, state) {
      state.inline = true;
      const align = parseTableAlign(capture[2]);
      const [myClass, myID, colWidths] = tableDirectives(capture[4], align);
      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      table.content.push(parsePipeTableRow(capture[1], parse$1, state, colWidths, true));
      const tableBody = capture[3].trim().split("\n");
      tableBody.forEach(row => {
        table.content.push(parsePipeTableRow(row, parse$1, state, colWidths, false));
      });
      state.inline = false;
      return table
    };
  };

  const headerRegEx = /^\+:?=/;

  const parseGridTable = function() {
    return function(capture, state) {
      const topBorder = capture[2];
      const align = parseTableAlign(topBorder.slice(1));
      const [myClass, myID, colWidths] = tableDirectives(capture[3], align);
      const lines = capture[1].slice(0, -1).split("\n");

      // Does the grid table contain a line separating header from table body?
      let headerExists = false;
      let headerSepLine = lines.length + 10;
      for (let i = 0; i < lines.length; i++) {
        if (headerRegEx.test(lines[i])) {
          headerExists = true;
          headerSepLine = i;
          break
        }
      }

      // Read the top & left borders to find the locations of the cell corners.
      const xCorners = [0];
      for (let j = 1; j < topBorder.length; j++) {
        const ch = topBorder.charAt(j);
        // A "+" character indicates a column border.
        if (ch === "+") { xCorners.push(j); }
      }
      const yCorners = [0];
      for (let i = 1; i < lines.length; i++) {
        const ch = lines[i].charAt(0);
        if (ch === "+") { yCorners.push(i); }
      }

      const numCols = xCorners.length - 1;
      const numRows = yCorners.length - 1;
      const gridTable = [];

      // Create default rows and cells. They may be merged later.
      for (let i = 0; i < numRows; i++) {
        const row = new Array(numCols);
        for (let j = 0; j < numCols; j++) { row[j] = { rowspan: 1 }; }
        gridTable.push(row);
      }

      for (let i = 0; i < numRows; i++) {
        const row = gridTable[i];
        // Determine the actual rowspan and colspan of each cell.
        for (let j = 0; j < numCols; j++) {
          const cell = row[j];
          if (cell.rowspan === 0) { continue }
          cell.colspan = 1;
          const lastTextRow = lines[yCorners[i + 1] - 1];
          for (let k = j + 1; k < xCorners.length; k++) {
            if (lastTextRow.charAt(xCorners[k]) === "|") { break }
            cell.colspan += 1;
            row[k].rowspan = 0;
          }
          for (let k = i + 1; k < yCorners.length; k++) {
            const ch = lines[yCorners[k]].charAt(xCorners[j] + 1);
            if (ch === "-" || ch === "=") { break }
            cell.rowspan += 1;
            for (let jj = 0; jj < cell.colspan; jj++) {
              gridTable[k][j + jj].rowspan = 0;
            }
          }
          // Now that we know the cell extents, get the cell contents.
          const xStart = xCorners[j] + 2;
          const xEnd = xCorners[j + cell.colspan] - 1;
          const yStart = yCorners[i] + 1;
          const yEnd = yCorners[i + cell.rowspan];
          let str = "";
          for (let ii = yStart; ii < yEnd; ii++) {
            str += lines[ii].slice(xStart, xEnd).replace(/ +$/, "") + "\n";
          }
          cell.blob = str.slice(0, -1).replace(/^\n+/, "");

          cell.inHeader = (headerExists && yStart < headerSepLine);

          if (colWidths) {
            // Set an attribute used by ProseMirror.
            let cellWidth = 0;
            for (let k = 0; k < cell.colspan; k++) {
              cellWidth += Number(colWidths[j + k]);
            }
            cell.width = cellWidth;
          }
        }
      }

      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      for (let i = 0; i < numRows; i++) {
        table.content.push({ type: "table_row", content: [] } );
        for (let j = 0; j < numCols; j++) {
          if (gridTable[i][j].rowspan === 0) { continue }
          const cell = gridTable[i][j];
          state.inline = false;
          let content = state.inHtml && cell.blob.indexOf("```") === -1 && !/\n\n/.test(cell.blob.replace(/\n+$/g, ""))
            ? parseInline(cell.blob, state) // Write inline content directly into each <td>
            : parse$1(cell.blob, state);       // Hurmet.app has a paragraph in each cell.
          if (content.length === 1 && content[0].type === "null") {
            content = state.inHtml
              ? [{ type: "text", text: "" }]
              : [{ type: "paragraph", content: [] }];
          }
          table.content[i].content.push({
            "type": cell.inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": cell.colspan,
              "rowspan": cell.rowspan,
              "colwidth": (colWidths) ? [cell.width] : null,
              "background": null
            },
            content: content
          });
        }
      }
      state.inline = false;
      return table
    };
  };

  return {
    parsePipeTable: parsePipeTable(),
    PIPE_TABLE_REGEX: /^(\|.+)\n\|([-:]+[-| :]*)\n((?:\|.*(?:\n|$))*)(?:\{([^\n}]+)\}\n)?\n*/,
    parseGridTable: parseGridTable(),
    GRID_TABLE_REGEX: /^((\+(?:[-:=]+\+)+)\n(?:[+|][^\n]+[+|]\n)+)(?:\{([^\n}]+)\}\n)?\n*/
  };
})();

const LINK_INSIDE = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE =
  "\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";

const linkIndex = marks => {
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].type === "link") { return i }
  }
};

const parseRef = function(capture, state, refNode) {
  let ref = capture[2] ? capture[2] : capture[1];
  ref = ref.replace(/\s+/g, " ");

  // We store information about previously seen defs on
  // state._defs (_ to deconflict with client-defined
  // state). If the def for this reflink/refimage has
  // already been seen, we can use its target/source
  // and title here:
  if (state._defs && state._defs[ref]) {
    const def = state._defs[ref];
    if (refNode.type === "image") {
      refNode.attrs.src = def.target;
      refNode.attrs.width = null;
    } else {
      // refNode is a link
      refNode.attrs.href = def.target;
    }
  }

  // In case we haven't seen our def yet (or if someone
  // overwrites that def later on), we add this node
  // to the list of ref nodes for that def. Then, when
  // we find the def, we can modify this link/image AST
  // node :).
  state._refs = state._refs || {};
  state._refs[ref] = state._refs[ref] || [];
  state._refs[ref].push(refNode);

  return refNode;
};

const parseTextMark = (capture, state, mark) => {
  const text = parseInline(capture, state);
  if (Array.isArray(text) && text.length === 0) { return text }
  consolidate(text);
  for (const range of text) {
    if (range.marks) {
      range.marks.push({ type: mark });
    } else {
      range.marks = [{ type: mark }];
    }
  }
  return text
};

const BLOCK_HTML = /^ *(?:<(head|h[1-6]|p|pre|script|style|table)[\s>][\s\S]*?(?:<\/\1>[^\n]*\n)|<!--[^>]+-->[^\n]*\n|<\/?(?:body|details|(div|input|label)(?: [^>]+)?|!DOCTYPE[a-z ]*|html[a-z ="]*|br|dl(?: class="[a-z-]+")?|li|main[a-z\- ="]*|nav|ol|ul(?: [^>]+)?)\/?>[^\n]*?(?:\n|$))/;
const divType = { C: "centered_div", H: "header", "i": "indented_div" };

// Rules must be applied in a specific order, so use a Map instead of an object.
const rules = new Map();
rules.set("html", {
  isLeaf: true,
  match: blockRegex(BLOCK_HTML),
  parse: function(capture, state) {
    if (!state.inHtml) { return null }
    return { type: "html", text: capture[0] }
  }
});
rules.set("heading", {
  isLeaf: false,
  match: blockRegex(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      attrs: { level: capture[1].length },
      content: parseInline(capture[2].trim(), state)
    };
  }
});
rules.set("dt", {  // description term
  isLeaf: false,
  match: blockRegex(/^(([^\n]*)\n)(?=<dd>|\n:)/),
  parse: function(capture, state) {
    return { content: parseInline(capture[2].trim(), state) }
  }
});
rules.set("horizontal_rule", {
  isLeaf: true,
  match: blockRegex(/^( *[-*_]){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return { type: "horizontal_rule" };
  }
});
rules.set("lheading", {
  isLeaf: false,
  match: blockRegex(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return {
      type: "heading",
      level: capture[2] === '=' ? 1 : 2,
      content: parseInline(parse, capture[1])
    };
  }
});
rules.set("fence", {
  isLeaf: true,
  match: blockRegex(/^(`{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      type: "code_block",
//      lang: capture[2] || undefined,
      content: [{ type: "text", text: capture[3] }]
    };
  }
});
rules.set("blockquote", {
  isLeaf: false,
  match: blockRegex(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
  parse: function(capture, state) {
    const content = capture[0].replace(/^ *> ?/gm, "");
    return { content: parse$1(content, state) };
  }
});
rules.set("ordered_list", {
  isLeaf: false,
  match: blockRegex(/^( {0,3})(\d{1,9}\.) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:\d{1,9}\.) )\n*|\s*$)/),
  parse: function(capture, state) {
    const start = Number(capture[2].trim());
    return { attrs: { order: start }, content: parseList(capture[0], state, capture[1]) }
  }
});
rules.set("bullet_list", {
  isLeaf: false,
  match: blockRegex(/^( {0,3})([*+-]) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:[*+-]) )\n*|\s*$)/),
  parse: function(capture, state) {
    return { content: parseList(capture[0], state, capture[1]) }
  }
});
rules.set("dd", {  // description details
  isLeaf: false,
  match: blockRegex(/^:( +)[\s\S]+?(?:\n{2,}(?! |:)(?!\1)\n*|\s*$)/),
  parse: function(capture, state) {
    let div = " " + capture[0].slice(1);
    const indent = 1 + capture[1].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { content: parse$1(div, state) };
  }
});
rules.set("special_div", {
  isLeaf: false,
  match: blockRegex(/^(C|H|i)>( {1,})[\s\S]+?(?:\n{2,}(?! {2,2}\2)\n*|\s*$)/),
  parse: function(capture, state) {
    const type = divType[capture[1]];
    let div = "  " + capture[0].slice(2);
    const indent = 2 + capture[2].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { type, content: parse$1(div, state) };
  }
});
rules.set("def", {
  // TODO(aria): This will match without a blank line before the next
  // block element, which is inconsistent with most of the rest of
  // simple-markdown.
  isLeaf: true,
  match: blockRegex(/^\[([^\]]+)\]: *<?([^\n>]*)>? *\n(?:\{([^\n}]*)\}\n)?/),
  parse: function(capture, state) {
    const def = capture[1].replace(/\s+/g, " ");
    const target = capture[2];
    const directives = capture[3] || "";
    const attrs = {};

    // Look for previous links/images using this def
    // If any links/images using this def have already been declared,
    // they will have added themselves to the state._refs[def] list
    // (_ to deconflict with client-defined state). We look through
    // that list of reflinks for this def, and modify those AST nodes
    // with our newly found information now.
    // Sorry :(.
    if (state._refs && state._refs[def]) {
      // `refNode` can be a link or an image
      state._refs[def].forEach(function(refNode) {
        if (refNode.type === "image") {
          refNode.attrs.src = target;
          if (directives) {
            const matchClass = CLASS_R.exec(directives);
            if (matchClass) {
              refNode.attrs.class = matchClass[1];
              attrs.class = matchClass[1];
            }
            const matchWidth = WIDTH_R.exec(directives);
            if (matchWidth) {
              refNode.attrs.width = matchWidth[1];
              attrs.width = matchWidth[1];
            }
            const matchID = ID_R.exec(directives);
            if (matchID) {
              refNode.attrs.id = matchID[1];
              attrs.id = matchID[1];
            }
          }
        } else {
          refNode.attrs.href = target;
        }
      });
    }

    // Add this def to our map of defs for any future links/images
    // In case we haven't found any or all of the refs referring to
    // this def yet, we add our def to the table of known defs, so
    // that future reflinks can modify themselves appropriately with
    // this information.
    state._defs = state._defs || {};
    state._defs[def] = { target, attrs };

    // return the relevant parsed information
    // for debugging only.
    return {
      def: def,
      target: target,
      directives: directives
    };
  }
});
rules.set("toc", {
  isLeaf: true,
  match: blockRegex(/^{\.toc start=(\d) end=(\d)}\n/),
  parse: function(capture, state) {
    return { attrs: { start: Number(capture[1]), end: Number(capture[2]), body: [] } }
  }
});
rules.set("pipeTable", {
  isLeaf: false,
  match: blockRegex(TABLES.PIPE_TABLE_REGEX),
  parse: TABLES.parsePipeTable
});
rules.set("gridTable", {
  isLeaf: false,
  match: blockRegex(TABLES.GRID_TABLE_REGEX),
  parse: TABLES.parseGridTable
});
rules.set("newline", {
  isLeaf: true,
  match: blockRegex(/^(?:\n *)*\n/),
  parse: function() { return { type: "null" } }
});
rules.set("paragraph", {
  isLeaf: false,
  match: blockRegex(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: function(capture, state) {
    return { content: parseInline(capture[1], state) };
  }
});
rules.set("escape", {
  // We don't allow escaping numbers, letters, or spaces here so that
  // backslashes used in plain text still get rendered. But allowing
  // escaping anything else provides a very flexible escape mechanism,
  // regardless of how this grammar is extended.
  isLeaf: true,
  match: inlineRegex(/^\\([^0-9A-Za-z\s])/),
  parse: function(capture, state) {
    return {
      type: "text",
      text: capture[1]
    };
  }
});
rules.set("tableSeparator", {
  isLeaf: true,
  match: function(source, state) {
    if (!state.inTable) {
      return null;
    }
    return /^ *\| */.exec(source);
  },
  parse: function() {
    return { type: "tableSeparator" };
  }
});
rules.set("calculation", {
  isLeaf: true,
  match: anyScopeRegex(/^(?:¢((?:\\[\s\S]|[^\\])+?)¢|¢¢\n?((?:\\[\s\S]|[^\\])+?)\n?¢¢)/),
  parse: function(capture, state) {
    if (capture[1]) {
      let entry = capture[1].trim();
      if (!/^(?:function|draw\()/.test(entry) && entry.indexOf("``") === -1) {
        entry = entry.replace(/\n/g, " ");
      }
      return { content: "", attrs: { entry } }
    } else {
      const entry = capture[2].trim();
      return { content: "", attrs: { entry, displayMode: true } }
    }
  }
});
rules.set("tex", {
  isLeaf: true,
  match: anyScopeRegex(/^(?:\$((?:\\[\s\S]|[^\\])+?)\$|\$\$\n?((?:\\[\s\S]|[^\\])+?)\n?\$\$)/),
  parse: function(capture, state) {
    if (capture[1]) {
      const tex = capture[1].trim().replace(/\n/g, " ").replace(/`\$/g, "$");
      return { content: "", attrs: { tex } }
    } else {
      const tex = capture[2].trim().replace(/`\$/g, "$");
      return { content: "", attrs: { tex, displayMode: true } }
    }
  }
});
rules.set("link", {
  isLeaf: true,
  match: inlineRegex(
    new RegExp("^\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")
  ),
  parse: function(capture, state) {
    const textNode = parseTextMark(capture[1], state, "link" )[0];
    const i = linkIndex(textNode.marks);
    textNode.marks[i].attrs = { href: unescapeUrl(capture[2]) };
    return textNode
  }
});
rules.set("image", {
  isLeaf: true,
  match: inlineRegex(
    new RegExp("^!\\[(" + LINK_INSIDE + ")\\]\\(" + LINK_HREF_AND_TITLE + "\\)")
  ),
  parse: function(capture, state) {
    return { attrs: { alt: capture[1], src: unescapeUrl(capture[2]) } }
  }
});
rules.set("reflink", {
  isLeaf: true,
  match: inlineRegex(/^\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    const textNode = parseTextMark(capture[1], state, "link" )[0];
    const i = linkIndex(textNode.marks);
    textNode.marks[i].attrs = { href: null };
    if (capture[2]) {
      textNode.marks[i].attrs.title = capture[2];
    }
    parseRef(capture, state, textNode.marks[i]);
    return textNode
  }
});
rules.set("refimage", {
  isLeaf: true,
  match: inlineRegex(/^!\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    return parseRef(capture, state, {
      type: "image",
      attrs: { alt: capture[1] }
    });
  }
});
rules.set("code", {
  isLeaf: true,
  match: inlineRegex(/^(`+)([\s\S]*?[^`])\1(?!`)/),
  parse: function(capture, state) {
    const text = capture[2].trim();
    return [{ type: "text", text, marks: [{ type: "code" }] }]
/*    state.inCode = true
    const code = parseTextMark(text, state, "code" )
    state.inCode = false
    return code */
  }
});
rules.set("em", {
  isLeaf: true,
  match: inlineRegex(/^_((?:\\[\s\S]|[^\\])+?)_/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "em" )
  }
});
rules.set("strong", {
  isLeaf: true,
  match: inlineRegex(/^\*\*(?=\S)((?:\\[\s\S]|\*(?!\*)|[^\s*\\]|\s(?!\*\*))+?)\*\*/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "strong" )
  }
});
rules.set("strikethru", {
  isLeaf: true,
  match: inlineRegex(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "strikethru" )
  }
});
rules.set("superscript", {
  isLeaf: true,
  match: inlineRegex(/^<sup>([\s\S]*?)<\/sup>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "superscript" )
  }
});
rules.set("subscript", {
  isLeaf: true,
  match: inlineRegex(/^~((?:\\[\s\S]|[^\\])+?)~/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "subscript" )
  }
});
rules.set("underline", {
  isLeaf: true,
  match: inlineRegex(/^<u>([\s\S]*?)<\/u>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "underline" )
  }
});
rules.set("highlight", {
  isLeaf: true,
  match: inlineRegex(/^<mark>([\s\S]*?)<\/mark>/),
  parse: function(capture, state) {
    return parseTextMark(capture[1], state, "highlight" )
  }
});
rules.set("hard_break", {
  isLeaf: true,
  match: anyScopeRegex(/^\\\n/),
  parse: function() { return { text: "\n" } }
});
rules.set("inline_break", {
  isLeaf: true,
  match: anyScopeRegex(/^<br>/),
  parse: function() { return { type: "hard_break", text: "\n" } }
});
rules.set("span", {
  isLeaf: true,
  match: inlineRegex(/^<span [a-z =":]+>[^<]+<\/span>/),
  parse: function(capture, state) {
    return !state.inHtml ? null : { type: "html", text: capture[0] }
  }
});
rules.set("text", {
  // Here we look for anything followed by non-symbols,
  // double newlines, or double-space-newlines
  // We break on any symbol characters so that this grammar
  // is easy to extend without needing to modify this regex
  isLeaf: true,
  match: anyScopeRegex(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
  parse: function(capture, state) {
    return {
      text: capture[0].replace(/\n/g, " ")
    };
  }
});

const doNotEscape = ["calculation", "code", "tex"];

const parse$1 = (source, state) => {
  if (!state.inline) { source += "\n\n"; }
  source = preprocess(source);
  const result = [];
  while (source) {
    // store the best match and its rule:
    let capture = null;
    let ruleName = null;
    let rule = null;
    for (const [currRuleName, currRule] of rules) {
      if (state.inCode && doNotEscape.includes(currRuleName)) { continue }
      capture = currRule.match(source, state);
      if (capture) {
        rule = currRule;
        ruleName = currRuleName;
        break
      }
    }
    const parsed = rule.parse(capture, state);
    if (Array.isArray(parsed)) {
      Array.prototype.push.apply(result, parsed);
    } else {
      if (parsed.type == null) { parsed.type = ruleName; }
      result.push(parsed);
    }
    source = source.substring(capture[0].length);
  }
  return result
};



/**
 * Parse some content with the parser `parse`, with state.inline
 * set to true. Useful for block elements; not generally necessary
 * to be used by inline elements (where state.inline is already true.
 */
const parseInline = function(content, state) {
  const isCurrentlyInline = state.inline || false;
  state.inline = true;
  const result = parse$1(content, state);
  state.inline = isCurrentlyInline;
  return result;
};


// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
const LIST_BULLET = "(?:[*+-]|\\d+\\.)";
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX = "( *)(" + LIST_BULLET + ") +";
const LIST_ITEM_PREFIX_R = new RegExp("^" + LIST_ITEM_PREFIX);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R = new RegExp(
  LIST_ITEM_PREFIX + "[^\\n]*(?:\\n" + "(?!\\1" + LIST_BULLET + " )[^\\n]*)*(\n|$)",
  "gm"
);
const BLOCK_END_R = /\n{2,}$/;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R = BLOCK_END_R;
const LIST_ITEM_END_R = / *\n+$/;

const ignore = ["def", "newline", "null"];

const consolidate = arr => {
  if (Array.isArray(arr) && arr.length > 0) {
    // Group any text nodes together into a single string output.
    for (let i = arr.length - 1; i > 0; i--) {
      const node = arr[i];
      const prevNode = arr[i - 1];
      if (node.type === 'text' && prevNode.type === 'text' &&
          !node.marks && !prevNode.marks) {
        prevNode.text += node.text;
        arr.splice(i, 1);
      } else if (ignore.includes(node.type)) {
        arr.splice(i, 1);
      } else if (!rules.has(node.type) || !rules.get(node.type).isLeaf) {
        consolidate(node.content);
      }
    }

    if (!rules.has(arr[0].type) || !rules.get(arr[0].type).isLeaf) {
      consolidate(arr[0].content);
    }
  }
};

const populateTOC = ast => {
  let tocNode;
  for (const node of ast) {
    if (node.type === "toc") { tocNode = node; break }
  }
  if (!tocNode) { return }
  const start = tocNode.attrs.start;
  const end = tocNode.attrs.end;
  for (const node of ast) {
    if (node.type === "heading") {
      const level = node.attrs.level;
      if (start <= level && level <= end) {
        const tocEntry = [];
        let str = "";
        for (const range of node.content) { str += range.text; }
        tocEntry.push(str);
        tocEntry.push(level);
        tocEntry.push(0); // page number unknown
        tocEntry.push(0); // element number unknown
        tocNode.attrs.body.push(tocEntry);
      }
    }
  }
};

const md2ast = (md, inHtml = false) => {
  const ast = parse$1(md, { inline: false, inHtml });
  if (Array.isArray(ast) && ast.length > 0 && ast[0].type === "null") { ast.shift(); }
  consolidate(ast);
  populateTOC(ast);
  return ast
};

const temml = require('./temml.cjs');

const startSvg = _ => {
  return {
    tag: 'svg',
    children: [],
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: 250,
      height: 250,
      style: "display: inline;"
    },
    temp: {
      width: 250,
      height: 250,
      xmin: 0,
      xmax: 5,
      ymin: 0,
      ymax: 5,
      xunitlength: 20,  // px
      yunitlength: 20,  // px
      origin: [0, 0],   // in px (default is bottom left corner)
      stroke: "black",
      strokewidth: 1,
      strokedasharray: null,
      fill: "none",
      fontstyle: "normal",
      fontfamily: "sans-serif",
      fontsize: 13.33, // px, ~10 pt
      fontweight: "normal",
      markerstrokewidth: 1,
      markerstroke: "black",
      markerfill: "yellow",
      markersize: 4,
      marker: "none",
      dotradius: 4,
      axesstroke: "black",
      gridstroke: "grey",
      isDim: false
    }
  }
};

// Helpers
const setStrokeAndFill = (node, attrs) => {
  node.attrs["stroke-width"] = attrs.strokewidth;
  node.attrs.stroke = attrs.stroke;
  node.attrs.fill = attrs.fill;
  if (attrs.strokedasharray != null && attrs.strokedasharray !== "none") {
    node.attrs["stroke-dasharray"] = attrs.strokedasharray;
  }
};

const pointZeroRegEx = /\.0+$/;
const chopZ = str => {
  const k = str.indexOf(".");
  if (k === -1) { return str }
  if (pointZeroRegEx.test(str)) { return str.replace(pointZeroRegEx, "") }
  let i;
  for (i = str.length - 1; i > k && str.charAt(i) === "0"; i--) {
    if (i === k) { i--; }
  }
  return str.slice(0, i + 1)
};

const markerDot = (center, attrs, s, f) => { // coordinates in units, radius in pixel
  if (s == null) { s = attrs.stroke; }
  if (f == null) { f = attrs.fill; }
  const node = { tag: "circle", attrs: {} };
  node.attrs.cx = center[0] * attrs.xunitlength + attrs.origin[0];
  node.attrs.cy = attrs.height - center[1] * attrs.yunitlength - attrs.origin[1];
  node.attrs.r = attrs.markersize;
  node.attrs["stroke-width"] = attrs.strokewidth;
  node.attrs.stroke = s;
  node.attrs.fill = f;
  return node
};

const arrowhead = (svg, p, q) => { // draw arrowhead at q (in units)
  const attrs = svg.temp;
  const v = [p[0] * attrs.xunitlength + attrs.origin[0], attrs.height -
             p[1] * attrs.yunitlength - attrs.origin[1]];
  const w = [q[0] * attrs.xunitlength + attrs.origin[0], attrs.height -
             q[1] * attrs.yunitlength - attrs.origin[1]];
  let u = [w[0] - v[0], w[1] - v[1]];
  const d = Math.sqrt(u[0] * u[0] + u[1] * u[1]);
  if (d > 0.00000001) {
    u = [u[0] / d, u[1] / d];
    const z = attrs.marker === "markerdot" ? 3 : attrs.isDim ? 0 : 1;
    const up = [-u[1], u[0]];
    const node = { tag: "path", attrs: {} };
    node.attrs.d = "M " + (w[0] - 12.5 * u[0] - 3 * up[0]) + "," +
      (w[1] - 12.5 * u[1] - 3 * up[1]) + " L " + (w[0] - z * u[0]) + "," + (w[1] - z * u[1]) +
      " L " + (w[0] - 12.5 * u[0] + 3 * up[0]) + "," + (w[1] - 12.5 * u[1] + 3 * up[1]) + " z";
    if (attrs.isDim) {
      node.attrs.stroke = "none";
    } else {
      node.attrs["stroke-width"] = attrs.markerstrokewidth;
      node.attrs.stroke = attrs.stroke;
    }
    node.attrs.fill = attrs.stroke;
    svg.children.push(node);
  }
};

const markAttribute = {
  em:         ["font-style", "italic"],
  strong:     ["font-weight", "bold"],
  code:       ["font-family", "monospace"],
  strikethru: ["text-decoration", "line-through"],
  subscript:  ["font-size", "0.8em"]
};

const textLocal = (svg, p, str, pos) => {
  const attrs = svg.temp;
  let textanchor = "middle";
  let dx = 0;
  let dy = attrs.fontsize / 3;
  if (pos != null) {
    if (pos.slice(0, 5) === "above") { dy = -attrs.fontsize / 2; }
    if (pos.slice(0, 5) === "below") { dy = 1.25 * attrs.fontsize; }
    if (pos.slice(0, 5) === "right" || pos.slice(5, 10) === "right") {
      textanchor = "start";
      dx = attrs.fontsize / 2;
    }
    if (pos.slice(0, 4) === "left" || pos.slice(5, 9) === "left") {
      textanchor = "end";
      dx = -attrs.fontsize / 2;
    }
  }
  const textNode = { tag: "text", children: [], attrs: {} };
  textNode.attrs["text"] = str;
  textNode.attrs.x = p[0] * attrs.xunitlength + attrs.origin[0] + dx;
  textNode.attrs.y = attrs.height - p[1] * attrs.yunitlength - attrs.origin[1] + dy;
  textNode.attrs["font-family"] = attrs.fontfamily;
  textNode.attrs["font-size"] = attrs.fontsize;
  textNode.attrs["text-anchor"] = textanchor;
  // Load Markdown into an AST
  const ast = md2ast(str)[0].content;
  // Load content of AST into <tspan> nodes.
  if (Array.isArray(ast)) {
    let prevNodeContainedSubscript = false;
    for (const markNode of ast) {
      const tspan = { tag: "tspan", text: markNode.text };
      let currentNodeContainsSubscript = false;
      if (markNode.marks) {
        tspan.attrs = {};
        for (const mark of markNode.marks) {
          const markAttr = markAttribute[mark.type];
          tspan.attrs[markAttr[0]] = markAttr[1];
          if (mark.type === "subscript") { currentNodeContainsSubscript = true; }
        }
      }
      if (currentNodeContainsSubscript) {
        if (!prevNodeContainedSubscript) { tspan.attrs.dy  = "2"; }
      } else if (prevNodeContainedSubscript) {
        if (!markNode.marks) { tspan.attrs = {}; }
        tspan.attrs.dy  = "-2";
      }
      prevNodeContainedSubscript = currentNodeContainsSubscript;
      textNode.children.push(tspan);
    }
  }
  svg.children.push(textNode);
  return svg
};

const functions = {
  // Set attributes
  stroke(svgOprnd, color) {
    svgOprnd.value.temp.stroke = color.value;
    return svgOprnd
  },

  strokewidth(svgOprnd, num) {
    svgOprnd.value.temp.strokewidth = Rnl.toNumber(num.value);
    return svgOprnd
  },

  strokedasharray(svgOprnd, str) {
    svgOprnd.value.temp.strokedasharray = str.value;
    return svgOprnd
  },

  fill(svgOprnd, color) {
    svgOprnd.value.temp.fill = color.value;
    return svgOprnd
  },

  fontsize(svgOprnd, size) {
    svgOprnd.value.temp.fontsize = Rnl.toNumber(size.value);
    return svgOprnd
  },

  fontfamily(svgOprnd, str) {
    svgOprnd.value.temp.fontfamily = str.value; // "sansserif"|"serif"|"fixed"|"monotype"
    return svgOprnd
  },

  marker(svgOprnd, str) {
    svgOprnd.value.temp.marker = str.value; // "none" | "dot" | "arrow" | "arrowdot"
    return svgOprnd
  },

  // Initialize the svg.

  title(svgOprnd, strOprnd) {
    svgOprnd.value.children.push( { tag: "title", attrs: { text: strOprnd.value } });
    return svgOprnd
  },

  frame(svgOprnd, width = 250, height = 250, position = "inline") {
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    attrs.width = typeof width === "number" ? width : Rnl.toNumber(width.value);
    svg.attrs.width = attrs.width;
    attrs.height = typeof height === "number" ? height : Rnl.toNumber(height.value);
    svg.attrs.height = attrs.height;
    if (typeof position !== "string") { position = position.value; }
    svg.attrs.style = `float: ${position}`;
    attrs.xunitlength = attrs.width / (attrs.xmax - attrs.xmin);
    attrs.yunitlength = attrs.height / (attrs.ymax - attrs.ymin);
    attrs.origin = [-attrs.xmin * attrs.xunitlength, -attrs.ymin * attrs.yunitlength];
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  view(svgOprnd, xmin = 0, xmax = 5, ymin, ymax) {
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    attrs.xmin = typeof xmin === "number" ? xmin : Rnl.toNumber(xmin.value);
    attrs.xmax = typeof xmax === "number" ? xmax : Rnl.toNumber(xmax.value);
    attrs.xunitlength = attrs.width / (attrs.xmax - attrs.xmin);
    attrs.yunitlength = attrs.xunitlength; // This may change below.
    if (ymin == null) {
      attrs.origin = [-attrs.xmin * attrs.xunitlength, attrs.height / 2];
      attrs.ymin = -attrs.height / (2 * attrs.yunitlength);
      attrs.ymax = -attrs.ymin;
    } else {
      attrs.ymin = Rnl.toNumber(ymin.value);
      if (ymax != null) {
        attrs.ymax = Rnl.toNumber(ymax.value);
        attrs.yunitlength = attrs.height / (attrs.ymax - attrs.ymin);
      } else {
        attrs.ymax = attrs.height / attrs.yunitlength + attrs.ymin;
      }
      attrs.origin = [-attrs.xmin * attrs.xunitlength, -attrs.ymin * attrs.yunitlength];
    }
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  // Draw things

  grid(svgOprnd, gdx, gdy, isLocal) {
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    gdx = gdx == null ? attrs.xunitlength : Rnl.toNumber(gdx.value) * attrs.xunitlength;
    gdy = gdy == null ? gdx : Rnl.toNumber(gdy.value) * attrs.yunitlength;
    const pnode = { tag: "path", attrs: {} };
    let str = "";
    for (let x = attrs.origin[0]; x < attrs.width; x += gdx) {
      str += " M" + x + ",0 " + x + "," + attrs.height;
    }
    for (let x = attrs.origin[0] - gdx; x > 0; x -= gdx) {
      str += " M" + x + ",0 " + x + "," + attrs.height;
    }
    for (let y = attrs.height - attrs.origin[1]; y < attrs.height; y += gdy) {
      str += " M0," + y + " " + attrs.width + "," + y;
    }
    for (let y = attrs.height - attrs.origin[1] - gdy; y > 0; y -= gdy) {
      str += " M0," + y + " " + attrs.width + "," + y;
    }
    pnode.attrs.d = str;
    pnode.attrs["stroke-width"] = 0.5;
    pnode.attrs.stroke = attrs.gridstroke;
    pnode.attrs.fill = attrs.fill;
    svg.children.push(pnode);
    if (!isLocal) {
      return { value: svg, unit: null, dtype: dt.DRAWING }
    }
  },

  axes(svgOprnd, dx, dy, labels, gdx, gdy) {
    let svg = svgOprnd.value;
    const attrs = svg.temp;
    dx = (dx == null ? attrs.xunitlength : Rnl.toNumber(dx.value) * attrs.xunitlength);
    dy = (dy == null ? dx : Rnl.toNumber(dy.value) * attrs.yunitlength);
    const parentFontsize = attrs.fontsize;
    attrs.fontsize = Math.min(dx / 2, dy / 2, 10);
    const ticklength = attrs.fontsize / 4;
    if (gdx != null) {
      this.grid(svgOprnd, gdx, gdy, true);
    }
    const pnode = { tag: "path", attrs: {} };
    let str = "M0," + (attrs.height - attrs.origin[1]) + " " + attrs.width + "," +
      (attrs.height - attrs.origin[1]) + " M" + attrs.origin[0] + ",0 " +
      attrs.origin[0] + "," + attrs.height;
    for (let x = attrs.origin[0] + dx; x < attrs.width; x += dx) {
      str += " M" + x + " " + (attrs.height - attrs.origin[1] + ticklength) + " " + x
            + "," + (attrs.height - attrs.origin[1] - ticklength);
    }
    for (let x = attrs.origin[0] - dx; x > 0; x -= dx) {
      str += " M" + x + "," + (attrs.height - attrs.origin[1] + ticklength) + " " + x
            + "," + (attrs.height - attrs.origin[1] - ticklength);
    }
    for (let y = attrs.height - attrs.origin[1] + dy; y < attrs.height; y += dy) {
      str += " M" + (attrs.origin[0] + ticklength) + "," + y + " " +
                   (attrs.origin[0] - ticklength) + "," + y;
    }
    for (let y = attrs.height - attrs.origin[1] - dy; y > 0; y -= dy) {
      str += " M" + (attrs.origin[0] + ticklength) + "," + y + " " +
                   (attrs.origin[0] - ticklength) + "," + y;
    }
    if (labels != null) {
      const ldx = dx / attrs.xunitlength;
      const ldy = dy / attrs.yunitlength;
      const lx = (attrs.xmin > 0 || attrs.xmax < 0 ? attrs.xmin : 0);
      const ly = (attrs.ymin > 0 || attrs.ymax < 0 ? attrs.ymin : 0);
      const lxp = (ly === 0 ? "below" : "above");
      const lyp = (lx === 0 ? "left" : "right");
      const ddx = Math.floor(1.1 - Math.log(ldx) / Math.log(10)) + 1;
      const ddy = Math.floor(1.1 - Math.log(ldy) / Math.log(10)) + 1;
      for (let x = ldx; x <= attrs.xmax; x += ldx) {
        svg = textLocal(svg, [x, ly], chopZ(x.toFixed(ddx)), lxp);
      }
      for (let x = -ldx; attrs.xmin <= x; x -= ldx) {
        svg = textLocal(svg, [x, ly], chopZ(x.toFixed(ddx)), lxp);
      }
      for (let y = ldy; y <= attrs.ymax; y += ldy) {
        svg = textLocal(svg, [lx, y], chopZ(y.toFixed(ddy)), lyp);
      }
      for (let y = -ldy; attrs.ymin <= y; y -= ldy) {
        svg = textLocal(svg, [lx, y], chopZ(y.toFixed(ddy)), lyp);
      }
    }
    pnode.attrs.d = str;
    pnode.attrs["stroke-width"] = 0.5;
    pnode.attrs.stroke = attrs.axesstroke;
    pnode.attrs.fill = attrs.fill;
    svg.temp.fontsize = parentFontsize;
    svg.children.push(pnode);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  line(svgOprnd, m) { // segment connecting points p,q (coordinates in units)
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "path", attrs: {} };
    const p = [Rnl.toNumber(m.value[0][0]), Rnl.toNumber(m.value[0][1])];
    const q = [Rnl.toNumber(m.value[1][0]), Rnl.toNumber(m.value[1][1])];
    node.attrs.d = "M" + (p[0] * attrs.xunitlength + attrs.origin[0]) + "," +
      (attrs.height - p[1] * attrs.yunitlength - attrs.origin[1]) + " " +
      (q[0] * attrs.xunitlength + attrs.origin[0]) + "," + (attrs.height -
       q[1] * attrs.yunitlength - attrs.origin[1]);
    setStrokeAndFill(node, attrs);
    svg.children.push(node);
    if (attrs.marker === "dot" || attrs.marker === "arrowdot") {
      svg.children.push(markerDot(p, attrs, attrs.markerstroke, attrs.markerfill));
      if (attrs.marker === "arrowdot") { arrowhead(svg, p, q); }
      svg.children.push(markerDot(q, attrs, attrs.markerstroke, attrs.markerfill));
    } else if (attrs.marker === "arrow") {
      arrowhead(svg, p, q);
    }
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  path(svgOprnd, plistOprnd, c) {
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "path", attrs: {} };
    // Get the "d" attribute of a path
    let str = "";
    let plist;
    if (typeof plistOprnd === "string") {
      str = plistOprnd.value;
    } else {
      plist = plistOprnd.value.map(row => row.map(e => Rnl.toNumber(e)));
      if (c == null) {
        c = new Array(plist.length).fill("L");
        c[0] = "M";
      } else if (c.dtype === dt.STRING) {
        c = new Array(plist.length).fill(c.value);
        c[0] = "M";
      } else if (typeof c === "string") {
        c = new Array(plist.length).fill(c);
        c[0] = "M";
      } else if ((c.dtype & dt.ROWVECTOR) || (c.dtype & dt.COLUMNVECTOR)) {
        c = c.value.map(e => {
          if (Rnl.isZero(e)) { return "L" }
          const radius = Rnl.toNumber(e) * attrs.xunitlength;
          return `A${radius} ${radius} 0 0 0 `
        });
        c.unshift("M");
      } else {
        c = new Array(plist.length).fill("L");
        c[0] = "M";
      }
      for (let i = 0; i < plist.length; i++) {
        str += c[i] + (plist[i][0] * attrs.xunitlength + attrs.origin[0]) + ","
            + (attrs.height - plist[i][1] * attrs.yunitlength - attrs.origin[1]) + " ";
      }
    }
    node.attrs.d = str;
    node.attrs["stroke-width"] = attrs.strokewidth;
    if (attrs.strokedasharray != null) {
      node.attrs["stroke-dasharray"] = attrs.strokedasharray;
    }
    node.attrs.stroke = attrs.stroke;
    node.attrs.fill = attrs.fill;
    if (attrs.marker === "dot" || attrs.marker === "arrowdot") {
      for (let i = 0; i < plist.length; i++) {
        if (c !== "C" && c !== "T" || i !== 1 && i !== 2) {
          svg.children.push(markerDot(plist[i], attrs, attrs.markerstroke, attrs.markerfill));
        }
      }
    } else if (attrs.marker === "arrow") {
      arrowhead(svg, plist[plist.length - 2], plist[plist.length - 1]);
    }
    svg.children.push(node);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  curve(svgOprnd, plist) {
    return functions.path(svgOprnd, plist, "T")
  },

  rect(svgOprnd, m, r) { // opposite corners in units, rounded by radius
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "rect", attrs: {} };
    const p = [Rnl.toNumber(m.value[0][0]), Rnl.toNumber(m.value[0][1])];
    const q = [Rnl.toNumber(m.value[1][0]), Rnl.toNumber(m.value[1][1])];
    node.attrs.x = p[0] * attrs.xunitlength + attrs.origin[0];
    node.attrs.y = attrs.height - q[1] * attrs.yunitlength - attrs.origin[1];
    node.attrs.width = (q[0] - p[0]) * attrs.xunitlength;
    node.attrs.height = (q[1] - p[1]) * attrs.yunitlength;
    if (r != null) {
      const rNum = Rnl.toNumber(r.value) * attrs.xunitlength;
      node.attrs.rx = rNum;
      node.attrs.ry = rNum;
    }
    setStrokeAndFill(node, attrs);
    svg.children.push(node);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  circle(svgOprnd, center, radius) { // coordinates in units
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "circle", attrs: {} };
    node.attrs.cx = Rnl.toNumber(center.value[0]) * attrs.xunitlength + attrs.origin[0];
    node.attrs.cy = attrs.height - Rnl.toNumber(center.value[1]) * attrs.yunitlength
                  - attrs.origin[1];
    node.attrs.r = Rnl.toNumber(radius.value) * attrs.xunitlength;
    setStrokeAndFill(node, attrs);
    svg.children.push(node);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  ellipse(svgOprnd, center, rx, ry) { // coordinates in units
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "ellipse", attrs: {} };
    node.attrs.cx = Rnl.toNumber(center.value[0]) * attrs.xunitlength + attrs.origin[0];
    node.attrs.cy = attrs.height - Rnl.toNumber(center.value[1]) * attrs.yunitlength
                    - attrs.origin[1];
    node.attrs.rx = Rnl.toNumber(rx.value) * attrs.xunitlength;
    node.attrs.ry = Rnl.toNumber(ry.value) * attrs.yunitlength;
    setStrokeAndFill(node, attrs);
    svg.children.push(node);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  arc(svgOprnd, m, radius) { // coordinates in units
    const svg = svgOprnd.value;
    const attrs = svg.temp;
    const node = { tag: "path", attrs: {} };
    const start = [Rnl.toNumber(m.value[0][0]), Rnl.toNumber(m.value[0][1])];
    const end = [Rnl.toNumber(m.value[1][0]), Rnl.toNumber(m.value[1][1])];
    if (radius == null) {
      const v = [end[0] - start[0], end[1] - start[1]];
      radius = (Math.sqrt(v[0] * v[0] + v[1] * v[1])) * attrs.yunitlength;
    } else if (isVector(radius)) {
      radius = radius.value.map(e => Rnl.toNumber(e) * attrs.yunitlength);
    } else {
      radius = Rnl.toNumber(radius.value) * attrs.yunitlength;
    }
    let str = "M" + (start[0] * attrs.xunitlength + attrs.origin[0]) + "," +
      (attrs.height - start[1] * attrs.yunitlength - attrs.origin[1]) + " A";
    str += Array.isArray(radius) ? radius[0] + "," + radius[1] : radius + "," + radius;
    str += " 0 0,0 " + (end[0] * attrs.xunitlength + attrs.origin[0]) + "," +
      (attrs.height - end[1] * attrs.yunitlength - attrs.origin[1]);
    node.attrs.d = str;
    setStrokeAndFill(node, attrs);
    let v = 0;
    if (attrs.marker === "arrow" || attrs.marker === "arrowdot") {
      const u = [(end[1] - start[1]) / 4, (start[0] - end[0]) / 4];
      v = [(end[0] - start[0]) / 2, (end[1] - start[1]) / 2];
      v = [start[0] + v[0] + u[0], start[1] + v[1] + u[1]];
    } else {
      v = [start[0], start[1]];
    }
    if (attrs.marker === "dot" || attrs.marker === "arrowdot") {
      svg.children.push(markerDot(start, attrs, attrs.markerstroke, attrs.markerfill));
      if (attrs.marker === "arrowdot") { arrowhead(svg,  v, end); }
      svg.children.push(markerDot(end, attrs, attrs.markerstroke, attrs.markerfill));
    } else if (attrs.marker === "arrow") {
      arrowhead(svg, v, end);
    }
    svg.children.push(node);
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  text(svgOprnd, p, str, pos) {
    const svg = textLocal(
      svgOprnd.value,
      [Rnl.toNumber(p.value[0]), Rnl.toNumber(p.value[1])],
      str.value,
      pos == null ? null : pos.value
      );
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  dot(svgOprnd, center, typ, label, pos) {
    let svg = svgOprnd.value;
    const attrs = svg.temp;
    let node;
    const cx = Rnl.toNumber(center.value[0]) * attrs.xunitlength + attrs.origin[0];
    const cy = attrs.height - Rnl.toNumber(center.value[1]) * attrs.yunitlength
             - attrs.origin[1];
    if (typ.value === "+" || typ.value === "-" || typ.value === "|") {
      node = { tag: "path", attrs: {} };
      if (typ.value === "+") {
        node.attrs.d = " M " + (cx - attrs.ticklength) + "," + cy
                    + " L " + ( cx + attrs.ticklength) + "," + cy
                    + " M " + cx + "," + (cy - attrs.ticklength) + " L " + cx
                    + "," + (cy + attrs.ticklength);
        node.attrs["stroke-width"] = 0.5;
        node.attrs.stroke = attrs.axesstroke;
      } else {
        if (typ.value === "-") {
          node.attrs.d = " M " + (cx - attrs.ticklength) + "," + cy
                       + " L " + (cx + attrs.ticklength) + "," + cy;
        } else {
          node.attrs.d = " M " + cx + "," + (cy - attrs.ticklength)
                       + " L " + cx + "," + (cy + attrs.ticklength);
        }
        node.attrs["stroke-width"] = attrs.strokewidth;
        node.attrs["stroke"] = attrs.stroke;
      }
    } else {
      node = { tag: "circle", attrs: {} };
      node.attrs.cx = cx;
      node.attrs.cy = cy;
      node.attrs.r = attrs.dotradius;
      node.attrs["stroke-width"] = attrs.strokewidth;
      node.attrs.stroke = attrs.stroke;
      node.attrs.fill =  (typ.value === "open" ? "white" : attrs.stroke);
    }
    svg.children.push(node);
    if (label != null) {
      svg = textLocal(
        svg,
        [Rnl.toNumber(center.value[0]), Rnl.toNumber(center.value[1])],
        label.value,
        (pos == null ? "below" : pos.value)
        );
    }
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  leader(svgOprnd, plistOprnd, label) {
    const marker = svgOprnd.value.temp.marker;
    svgOprnd.value.temp.marker = "arrow";
    svgOprnd.value.temp.isDim = true;
    const plistCopy = clone(plistOprnd);
    plistCopy.value.reverse();
    svgOprnd = this.path(svgOprnd, plistCopy, "L");
    const p = plistCopy.value[0].map(e => Rnl.toNumber(e));
    const q = plistCopy.value[1].map(e => Rnl.toNumber(e));
    let pos = "right";
    if (Math.abs(p[0] - q[0]) >= Math.abs(p[1] - q[1])) {
      pos = p[0] >= q[0] ? "right" : "left";
    } else {
      pos = p[1] < q[1] ? "below" : "above";
    }
    const svg = textLocal(svgOprnd.value, p, label.value, pos);
    svg.temp.marker = marker;
    svg.temp.isDim = false;
    return { value: svg, unit: null, dtype: dt.DRAWING }
  },

  dimension(svgOprnd, plistOprnd, label) {
    const p = clone(plistOprnd.value);
    const q = p.pop();
    const origstrokewidth = svgOprnd.value.temp.strokewidth;
    svgOprnd.value.temp.strokewidth = 0.5;
    svgOprnd.value.temp.isDim = true; // set small arrowhead
    let six = Rnl.fromNumber(6 / svgOprnd.value.temp.xunitlength);
    const pEnd = p[p.length - 1];
    let svg;
    // Is the label y-coord between the y-coords of the end points?
    if ((Rnl.lessThan(p[0][1], q[1]) && Rnl.lessThan(q[1], pEnd[1])) ||
        (Rnl.lessThan(pEnd[1], q[1]) && Rnl.lessThan(q[1], p[0][1]))) {
      if (!Rnl.lessThan(pEnd[0], q[0])) { six = Rnl.negate(six); }
      p.forEach(e => {
        svgOprnd = this.line(svgOprnd, { value: [
          [Rnl.add(e[0], six), e[1]],
          [Rnl.add(q[0], six), e[1]]
        ] });
      });
      svgOprnd.value.temp.marker = "arrow";
      const pos = Rnl.lessThanOrEqualTo(pEnd[0], q[0]) ? "right" : "left";
      for (let i = 0; i < p.length - 1; i++) {
        svgOprnd = this.line(svgOprnd, { value : [[q[0], p[i][1]], [q[0], p[i + 1][1]]],
          unit: null, dtype: dt.MATRIX });
        svgOprnd = this.line(svgOprnd, { value : [[q[0], p[i + 1][1]], [q[0], p[i][1]]],
          unit: null, dtype: dt.MATRIX });
        const p3 = [
          Rnl.toNumber(q[0]),
          (Rnl.toNumber(p[i][1]) + Rnl.toNumber(p[i + 1][1])) / 2
        ];
        const str = p.length === 2 ? label.value : label.value[i];
        svg = textLocal(svgOprnd.value, p3, str, pos);
      }
    } else {
      if (!Rnl.lessThan(pEnd[1], q[1])) { six = Rnl.negate(six); }
      p.forEach(e => {
        svgOprnd = this.line(svgOprnd, { value: [
          [e[0], Rnl.add(e[1], six)],
          [e[0], Rnl.add(q[1], six)]
        ] });
      });
      svgOprnd.value.temp.marker = "arrow";
      const pos = Rnl.lessThanOrEqualTo(pEnd[1], q[1]) ? "above" : "below";
      for (let i = 0; i < p.length - 1; i++) {
        svgOprnd = this.line(svgOprnd, { value: [ [p[i][0], q[1]], [ p[i + 1][0], q[1]] ],
          unit: null, dtype: dt.MATRIX });
        svgOprnd = this.line(svgOprnd, { value: [ [ p[i + 1][0], q[1]], [p[i][0], q[1]] ],
          unit: null, dtype: dt.MATRIX });
        const p3 = [
          (Rnl.toNumber(p[i][0]) + Rnl.toNumber(p[i + 1][0])) / 2,
          Rnl.toNumber(q[1])
        ];
        const str = p.length === 2 ? label.value : label.value[i];
        svg = textLocal(svgOprnd.value, p3, str, pos);
      }
    }
    svg.temp.strokewidth = origstrokewidth;
    svg.temp.marker = "none";
    svg.temp.isDim = false;
    return { value: svg, unit: null, dtype: dt.DRAWING }
  }

};

const renderSVG = dwg => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  Object.keys(dwg.attrs).forEach(key => {
    svg.setAttribute(key, dwg.attrs[key]);
  });
  dwg.children.forEach(el => {
    const node = document.createElementNS("http://www.w3.org/2000/svg", el.tag);
    Object.keys(el.attrs).forEach(attr => {
      node.setAttribute(attr, el.attrs[attr]);
      if (attr === "title") {
        node.appendChild(document.createTextNode(el.attrs["text"]));
      } else {
        node.setAttribute(attr, el.attrs[attr]);
      }
    });
    if (el.tag === "text") {
      el.children.forEach(child => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        if (child.attrs) {
          Object.keys(child.attrs).forEach(mark => {
            tspan.setAttribute(mark, child.attrs[mark]);
          });
        }
        tspan.appendChild(document.createTextNode(child.text));
        node.appendChild(tspan);
      });
    }
    svg.appendChild(node);
  });
  return svg
};

const Draw = Object.freeze({
  startSvg,
  functions,
  renderSVG
});

// evaluate.js

/*
 *  This module receives an RPN string and a object containing Hurmet variables.
 *  It does the calculation, doing unit-compatibility checks along the way.
 *  It returns a result in two formats: (1) a TeX string that can be displayed and
 *  (2) numeric and unit data that can used for calculations by other cells.
 *
 *  Hurmet does automatic unit conversions and checks for unit compatibility.
 *  Compatibility checks are done by keeping track of the unit exponents.
 *  So for instance if we divide an area by a length, the unit exponent calculation runs as:
 *     LENGTH^2 / LENGTH^1 = LENGTH^(2-1) = LENGTH^1
 *  We keep track of unit exponents for each of 9 base dimensions. That's why
 *  you see an array of 9 integers occuring in the code below.
 *
 *  Inside evalRpn(), Hurmet operands are each an object with three fields:
 *     value: the value of the operand
 *     unit:  holds unit info, either unit name, an array of exponents, or a unitMap
 *     dtype: an integer indicating data type.
 *
 *     Note that an operand can be two data types at once, such as RATIONAL and MATRIX.
 *     In such cases, dtype is the sum of the two underlying integers.
 *     So, in constants.js, we have enumerated the data types in powers of two.
 *     That way, we can use a bit-wise "&" operator to test for an individual type.
 *
 *     Numeric matrices and numeric maps can have math operations done to them.
 *     We distinguish numeric matrices from other matrices by the fact that
 *     (oprnd.dtype & dt.RATIONAL) returns a true if the matrix is numeric.
 *
 *     File operands.js contains further explanation of Hurmet operands.
 */

// Some helper functions

const needsMap = (...args) => {
  for (let i = 0; i < args.length; i++) {
    if ((args[i].dtype & dt.MAP) && (args[i].dtype & dt.RATIONAL)) { return true }
  }
  return false
};

const shapeOf = oprnd => {
  return oprnd.dtype === dt.COMPLEX
    ? "complex"
    : oprnd.dtype < 128
    ? "scalar"
    : Matrix.isVector(oprnd)
    ? "vector"
    : (oprnd.dtype & dt.MATRIX)
    ? "matrix"
    : oprnd.dtype === dt.DATAFRAME
    ? "dataFrame"
    : ((oprnd.dtype & dt.MAP) &&
       ((oprnd.dtype & dt.ROWVECTOR) || (oprnd.dtype & dt.COLUMNVECTOR)))
    ? "mapWithVectorValues"
    : (oprnd.dtype & dt.MAP)
    ? "map"
    : "other"
};

const binaryShapesOf = (o1, o2) => {
  let shape1 = shapeOf(o1);
  let shape2 = shapeOf(o2);
  let needsMultBreakdown = false;
  if (isMatrix(o1) && isMatrix(o2)) {
    // If both operands are matrices, we need to return more information.
    // That enables the various ways to multiply two matrices.
    needsMultBreakdown = true;
    if (shape1 === "vector") {
      shape1 = (o1.dtype & dt.ROWVECTOR) ? "rowVector" : "columnVector";
    }
    if (shape2 === "vector") {
      shape2 = (o2.dtype & dt.ROWVECTOR) ? "rowVector" : "columnVector";
    }
  }
  return [shape1, shape2, needsMultBreakdown]
};

const nextToken = (tokens, i) => {
  if (tokens.length < i + 2) { return undefined }
  return tokens[i + 1]
};

// array of function names that return a real number from a complex argument.
const arfn = ["abs", "argument", "Im", "Re", "Γ"];

const stringFromOperand = (oprnd, decimalFormat) => {
  return oprnd.dtype === dt.STRING
    ? oprnd.value
    : oprnd.dtype === dt.RATIONAL
    ? format(oprnd.value, "h15", decimalFormat)
    : isMatrix(oprnd.dtype)
    ? Matrix.displayAlt(oprnd, "h15", decimalFormat)
    : (oprnd.dtype & dt.MAP)
    ? map.displayAlt(oprnd.value, "h15", decimalFormat)
    : oprnd.value
};

const evalRpn = (rpn, vars, decimalFormat, unitAware, lib) => {
  // This is the function that does calculations with the rpn string.
  const tokens = rpn.split("\u00A0");
  const stack = [];
  let oPrev;
  for (let i = 0; i < tokens.length; i++) {
    const tkn = tokens[i];
    const ch = tkn.charAt(0);

    if (ch === "®") {
      // A rational number.
      const r = new Array(2);
      const pos = tkn.indexOf("/");
      r[0] = BigInt(tkn.slice(1, pos));   // numerator
      r[1] = BigInt(tkn.slice(pos + 1));  // denominator
      const num = Object.create(null);
      num.value = r;
      num.unit = Object.create(null);
      num.unit.expos = allZeros;
      num.dtype = dt.RATIONAL;
      stack.push(Object.freeze(num));

    } else if (ch === "©") {
      // A complex number.
      const ints = tkn.slice(1).split(",");
      const z = new Array(2);
      z[0] = [BigInt(ints[0]), BigInt(ints[1])];  // real part
      z[1] = [BigInt(ints[2]), BigInt(ints[3])];  // imaginary part
      const num = Object.create(null);
      num.value = z;
      num.unit = Object.create(null);
      num.unit.expos = allZeros;
      num.dtype = dt.COMPLEX;
      stack.push(Object.freeze(num));

    } else if (ch === "¿") {
      // A variable. Get the value from vars
      const varName = tkn.substring(1);
      let oprnd = Object.create(null);
      if (varName === "undefined") {
        oprnd.value = undefined;
        oprnd.unit = null;
        oprnd.dtype = 0;
      } else if (varName === "T" && nextToken(tokens, i) === "^" &&
        stack.length > 0 && isMatrix(stack[stack.length - 1])) {
        // Transpose a matrix.
        oprnd.value = "T";
        oprnd.unit = null;
        oprnd.dtype = dt.RATIONAL;
      } else {
        const cellAttrs = vars[varName];
        if (!cellAttrs) { return errorOprnd("V_NAME", varName) }
        oprnd = fromAssignment(cellAttrs, unitAware);
        if (oprnd.dtype === dt.ERROR) { return oprnd }
      }
      stack.push(Object.freeze(oprnd));

    } else if (ch === '"') {
      // A string literal.
      const chEnd = tkn.charAt(tkn.length - 1);
      const str = ch === '"' && chEnd === '"' ? tkn.slice(1, -1).trim() : tkn.trim();
      stack.push(Object.freeze({ value: str, unit: null, dtype: dt.STRING }));

    } else if (/^``/.test(tkn)) {
      stack.push(DataFrame.dataFrameFromCSV(tablessTrim(tkn.slice(2, -2)), {}));

    } else if (ch === '`') {
      // A rich text literal
      const chEnd = tkn.charAt(tkn.length - 1);
      const str = ch === '`' && chEnd === '`' ? tkn.slice(1, -1).trim() : tkn.trim();
      stack.push(Object.freeze({ value: str, unit: null, dtype: dt.RICHTEXT }));

    } else {
      switch (tkn) {
        case "true":
        case "false": {
          const bool = Object.create(null);
          bool.value = tkn === "true";
          bool.unit = null;
          bool.dtype = dt.BOOLEAN;
          stack.push(Object.freeze(bool));
          break
        }

        case "π": {
          const pi = Object.create(null);
          pi.value = Rnl.pi;
          pi.dtype = dt.RATIONAL;
          pi.unit = Object.create(null);
          pi.unit.expos = allZeros;
          stack.push(Object.freeze(pi));
          break
        }

        case "e": {
          const e = Object.create(null);
          e.value = "e";
          e.dtype = dt.RATIONAL;
          e.unit = Object.create(null);
          e.unit.expos = allZeros;
          stack.push(Object.freeze(e));
          break
        }

        case "j": {
          // j = √(-1)
          const j = Object.create(null);
          j.value = [Rnl.zero, Rnl.one];
          j.unit = Object.create(null);
          j.unit.expos = allZeros;
          j.dtype = dt.COMPLEX;
          stack.push(Object.freeze(j));
          break
        }

        case "ℏ": {
          // Reduced Plank constant
          const hbar = Object.create(null);
          hbar.value = Rnl.hbar;
          hbar.dtype = dt.RATIONAL;
          hbar.unit = Object.create(null);
          hbar.unit.expos = Object.freeze(unitAware ? [2, 1, -1, 0, 0, 0, 0, 0] : allZeros);
          stack.push(Object.freeze(hbar));
          break
        }

        case "∠": {
          // Complex number in polar notation.
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (o1.dtype !== dt.RATIONAL || o2.dtype !== dt.RATIONAL) {
            return errorOprnd("NAN_OP")
          }
          const theta = Rnl.toNumber(o2.value);
          const z = Object.create(null);
          z.value = [
            Rnl.multiply(o1.value, Rnl.fromNumber(Math.cos(theta))), // real part
            Rnl.multiply(o1.value, Rnl.fromNumber(Math.sin(theta)))  // imaginary part
          ];
          z.unit = Object.create(null);
          z.unit.expos = allZeros;
          z.dtype = dt.COMPLEX;
          stack.push(Object.freeze(z));
          break
        }

        case "+":
        case "-": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          const op = tkn === "+" ? "add" : "subtract";
          if (!(((o1.dtype & dt.RATIONAL) || (o1.dtype & dt.COMPLEX)) &&
                ((o2.dtype & dt.RATIONAL) || (o2.dtype & dt.COMPLEX)))) {
            return errorOprnd("NAN_OP")
          }
          if (unitAware) {
            if (!unitsAreCompatible(o1.unit.expos, o2.unit.expos)) {
              return errorOprnd("UNIT_ADD")
            }
          }
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);
          const sum = Object.create(null);
          // See file operations.js for an explanation of what goes on in the next line.
          sum.value = Operators.binary[shape1][shape2][op](o1.value, o2.value);
          if (sum.value.dtype && sum.value.dtype === dt.ERROR) { return sum.value }
          sum.unit = o1.unit;
          sum.dtype = Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, tkn);
          stack.push(Object.freeze(sum));
          break
        }

        case "~": {
          // Unary minus
          const o1 = stack.pop();
          if (!((o1.dtype & dt.RATIONAL) || o1.dtype === dt.COMPLEX)) {
            return errorOprnd("NAN_OP")
          }
          const neg = Object.create(null);
          neg.value = Operators.unary[shapeOf(o1)]["negate"](o1.value);
          if (neg.value.dtype && neg.value.dtype === dt.ERROR) { return neg.value }
          neg.unit = o1.unit;
          neg.dtype = o1.dtype;
          stack.push(Object.freeze(neg));
          break
        }

        case "×":
        case "·":
        case "*":
        case "⌧": {
          const oprnd2 = stack.pop();
          const o2 = oprnd2.dtype === dt.DATAFRAME ? clone(oprnd2) : oprnd2;
          const o1 = stack.pop();
          if (!(((o1.dtype & dt.RATIONAL) || (o1.dtype & dt.COMPLEX)) &&
            ((o2.dtype & dt.RATIONAL) || (o2.dtype & dt.COMPLEX) ||
            o2.dtype === dt.DATAFRAME))) {
            return errorOprnd("NAN_OP")
          }
          const product = Object.create(null);
          let unit = Object.create(null);
          if (unitAware) {
            if ((o1.dtype === dt.DATAFRAME && o2.dtype === dt.RATIONAL) ||
                (o1.dtype === dt.RATIONAL && o2.dtype === dt.DATAFRAME)) {
              unit = o1.dtype === dt.DATAFRAME ? o1.unit : o2.unit;
            } else {
              unit.expos = o1.unit.expos.map((e, j) => e + o2.unit.expos[j]);
            }
          } else {
            unit.expos = allZeros;
          }
          product.unit = o2.dtype === dt.DATAFRAME ? clone(o2.unit) : Object.freeze(unit);

          const [shape1, shape2, needsMultBreakdown] = binaryShapesOf(o1, o2);
          const op = needsMultBreakdown
            ? { "×": "cross", "·": "dot", "*": "asterisk", "⌧": "multiply" }[tkn]
            : "multiply";

          product.dtype = (tkn === "*" || shape1 === "scalar" || shape1 === "map" ||
            shape1 === "complex" || shape2 === "scalar" ||
            shape2 === "map" || shape2 === "complex")
            ? Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, op)
            : tkn === "·"
            ? dt.RATIONAL
            : tkn === "×"
            ? dt.COLUMNVECTOR
            : Matrix.multResultType(o1, o2);

          product.value = Operators.binary[shape1][shape2][op](o1.value, o2.value);
          if (product.value.dtype && product.value.dtype === dt.ERROR) {
            return product.value
          }

          stack.push(Object.freeze(product));
          break
        }

        case "/":
        case "//":
        case "÷":
        case "///":
        case "\u2215": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (!(((o1.dtype & dt.RATIONAL) || o1.dtype === dt.COMPLEX) &&
                ((o2.dtype & dt.RATIONAL) || o2.dtype === dt.COMPLEX))) {
            return errorOprnd("NAN_OP")
          }
          const quotient = Object.create(null);
          const unit = Object.create(null);
          unit.expos = unitAware
            ? o1.unit.expos.map((e, j) => e - o2.unit.expos[j])
            : allZeros;
          quotient.unit = Object.freeze(unit);
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);
          quotient.value = Operators.binary[shape1][shape2]["divide"](o1.value, o2.value);
          quotient.dtype = Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, "divide");
          if (isDivByZero(quotient.value, shapeOf(quotient))) { return errorOprnd("DIV") }
          stack.push(Object.freeze(quotient));
          break
        }

        case "^": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (Matrix.isVector(o1) && o2.value === "T") {
            // Transpose a vector
            const oprnd = clone(o1);
            oprnd.dtype = o1.dtype + ((o1.dtype & dt.ROWVECTOR)
              ? dt.COLUMNVECTOR - dt.ROWVECTOR
              : dt.ROWVECTOR - dt.COLUMNVECTOR);
            stack.push(Object.freeze(oprnd));
            break
          }
          if (!(((o1.dtype & dt.RATIONAL) || o1.dtype === dt.COMPLEX) &&
                ((o2.dtype & dt.RATIONAL) || o2.dtype === dt.COMPLEX) ||
                (isMatrix(o1) && o2.value === "T"))) {
            return errorOprnd("NAN_OP")
          }
          const power = Object.create(null);
          const unit = Object.create(null);
          unit.expos = allZeros;
          if (unitAware) {
            // TODO: lots to do here
            const d = typeof o2.unit === "number" ? o2.unit : Rnl.toNumber(o2.value);
            unit.expos = o1.unit.expos.map(e => e * d);
          }
          power.unit = Object.freeze(unit);
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);
          power.value = Operators.binary[shape1][shape2]["power"](o1.value, o2.value);
          if (power.value.dtype) { return power.value } // Error
          power.dtype = Cpx.isComplex(power.value)
            ? dt.COMPLEX
            : Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, tkn);
          stack.push(Object.freeze(power));
          break
        }

        case "^*": {
          // complex conjugate
          const oprnd = stack.pop();
          if (!(oprnd.dtype & dt.COMPLEX)) { return errorOprnd("NA_REAL"), "conjugate" }
          const o2 = {
            value: Cpx.conjugate(oprnd.value),
            unit: oprnd.unit,
            dtype: oprnd.dtype
          };
          stack.push(Object.freeze(o2));
          break
        }

        case "&":
        case "&_": {
          // Concatenation
          const o2 = stack.pop();
          const o1 = stack.pop();
          const opName = tkn === "&" ? "concat" : "unshift";
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);
          let o3 = Object.create(null);
          if (o1.dtype === dt.STRING && o1.dtype === dt.STRING) {
            const str1 = stringFromOperand(o1, decimalFormat);
            const str2 = stringFromOperand(o2, decimalFormat);
            o3.value = str1 + str2;
            o3.unit = null;
            o3.dtype = dt.STRING;
          } else if ((o1.dtype & dt.DATAFRAME) && Matrix.isVector(o2) && tkn === "&") {
            o3 = DataFrame.append(o1, o2, vars, unitAware);
            if (o3.dtype === dt.ERROR) { return o3 }
          } else if ((o1.dtype & dt.MAP) || (o2.dtype & dt.MAP)) {
            o3 = map.append(o1, o2, shape1, shape2, vars);
            if (o3.dtype === dt.ERROR) { return o3 }
          } else {
            if (unitAware) {
              if (!unitsAreCompatible(o1.unit.expos, o2.unit.expos)) {
                return errorOprnd("UNIT_ADD")
              }
            }
            o3.value = Operators.binary[shape1][shape2][opName](o1.value, o2.value);
            if (o3.value.dtype) { return o3.value } // Error
            o3.dtype = Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, tkn);
            o3.unit = o1.unit;
          }
          stack.push(Object.freeze(o3));
          break
        }

        case "√":
        case "∛":
        case "∜": {
          const index = tkn.charCodeAt(0) - 8728;
          const pow = [BigInt(1), BigInt(index)];
          const o1 = stack.pop();
          if (!((o1.dtype & dt.RATIONAL) || (o1.dtype & dt.COMPLEX))) {
            return errorOprnd("NAN_OP")
          }
          const root = Object.create(null);
          const unit = Object.create(null);
          unit.expos = allZeros;
          if (unitAware) { unit.expos = o1.unit.expos.map(e => e / index); }
          root.unit = Object.freeze(unit);

          const shape1 = shapeOf(o1);
          root.value = Operators.binary[shape1]["scalar"]["power"](o1.value, pow);
          if (root.value.dtype && root.value.dtype === dt.ERROR) { return root.value }

          root.dtype = Cpx.isComplex(root.value)
            ? dt.COMPLEX
            : Operators.dtype[shape1]["scalar"](o1.dtype, dt.RATIONAL, tkn);

          stack.push(Object.freeze(root));
          break
        }

        case "root": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (!((o1.dtype & dt.RATIONAL) & (o2.dtype & dt.RATIONAL))) {
            return errorOprnd("NAN_OP")
          }
          const root = Object.create(null);
          const unit = Object.create(null);
          unit.expos = allZeros;
          if (unitAware) { unit.expos = o2.unit.expos.map(e => e / Number(o1.value[0])); }
          root.unit = Object.freeze(unit);

          const pow = Rnl.reciprocal(o1.value);
          const shape1 = shapeOf(o1);
          root.value = Operators.binary[shape1]["scalar"]["power"](o2.value, pow);
          if (root.value.dtype && root.value.dtype === dt.ERROR) { return root.value }

          root.dtype = Operators.dtype[shape1]["scalar"](o1.dtype, dt.RATIONAL, tkn);
          stack.push(Object.freeze(root));
          break
        }

        case ".": {
          // Accessor of a object's property in dot notation
          const o2 = stack.pop();
          const o1 = stack.pop();
          const property = propertyFromDotAccessor(o1, o2, vars, unitAware);
          if (property.dtype === dt.ERROR) { return property }
          stack.push(Object.freeze(property));
          break
        }

        case "[]": {
          // Bracket accessor to a data frame, matrix, string, data frame, or module.
          const numArgs = Number(tokens[i + 1]);
          i += 1;
          const args = [];
          for (let j = 0; j < numArgs; j++) { args.unshift(stack.pop()); }
          const o1 = stack.pop();
          let property;
          if (o1.dtype & dt.DATAFRAME) {
            property = DataFrame.range(o1, args, vars, unitAware);

          } else if (o1.dtype & dt.MAP) {
            property = map.valueFromMap(o1, args, unitAware);

          } else if (o1.dtype === dt.STRING) {
            property = textRange(o1.value, args[0]);

          } else if (o1.dtype === dt.MODULE) {
            if (numArgs === 1) {
              property = fromAssignment(o1.value[args[0].value], unitAware);
            } else {
              // Multiple assignment.
              property = { value: new Map(), unit: null, dtype: dt.TUPLE };
              for (let j = 0; j < args.length; j++) {
                const name = args[j].value;
                property.value.set(name, fromAssignment(o1.value[name], unitAware));
              }
            }

          } else {
            // o1 is a matrix or a data frame
            const rowIndex = args[0];
            const colIndex = (numArgs === 2)
              ? args[1]
              : isVector(o1)
              ? null
              : { value: Rnl.zero, unit: allZeros, dtype: dt.RATIONAL };
            property = (o1.dtype & dt.DATAFRAME)
              ? DataFrame.range(o1, rowIndex, colIndex, vars, unitAware)
              : Matrix.submatrix(o1, rowIndex, colIndex);
          }
          if (property.dtype === dt.ERROR) { return property }
          stack.push(Object.freeze(property));
          break
        }

        case "..": {
          // range separator.
          const end = stack.pop();
          const o1 = stack.pop();
          if (!(o1.dtype === dt.RATIONAL || o1.dtype === dt.RANGE)) {
            return errorOprnd("NAN_OP")
          }
          const range = Object.create(null);
          range.unit = null;
          range.dtype = dt.RANGE;
          const step = o1.dtype !== dt.RATIONAL
            ? o1.value[2]
            : Rnl.lessThan(o1.value, end.value)
            ? Rnl.one
            : Rnl.negate(Rnl.one);
          range.value = o1.dtype === dt.RATIONAL
            ? [o1.value, step, end.value]
            : [o1.value[0], o1.value[2], end.value];
          stack.push((Object.freeze(range)));
          break
        }

        case ":": {
          const o2 = stack.pop();
          const key = stack.pop();
          if (key.dtype !== dt.STRING) { return errorOprnd("BAD_KEYSTR") }
          stack.push(Object.freeze({
            name: key.value, value: o2.value, unit: o2.unit, dtype: o2.dtype
          }));
          break
        }

        case "normal":
        case "uniform":
        case "lognormal": {
          // eslint-disable-next-line no-unused-vars
          const high = stack.pop();
          // eslint-disable-next-line no-unused-vars
          const low = stack.pop();
          // low and high define a probablility distribution. They are the ends of a
          // uniform distribution or they mark the 90% confidence interval of (log)normal.
          // TODO: Implement probability distributions as a data type.
          break
        }

        case "!": {
          // TODO: "!!" and "¡"
          const o1 = stack.pop();
          if (!(o1.dtype & dt.RATIONAL)) { return errorOprnd("NAN_OP") }
          if (unitAware) {
            if (!unitsAreCompatible(o1.unit.expos, allZeros)) { return errorOprnd("FACT") }
          }
          const x = o1.value;
          if (!Rnl.isInteger(x) || Rnl.isNegative(x)) { return errorOprnd("FACT") }
          const factorial = Object.create(null);
          factorial.unit = allZeros;
          factorial.dtype = dt.RATIONAL;
          factorial.value = Operators.unary[shapeOf(o1)]["factorial"](x);
          if (factorial.value.dtype) { return factorial.value } // Error
          stack.push(Object.freeze(factorial));
          break
        }

        case "%": {
          // TODO: per thousand, ‰
          const o1 = stack.pop();
          if (!(o1.dtype & dt.RATIONAL)) { return errorOprnd("NAN_OP") }
          const percentage = Object.create(null);
          percentage.unit = o1.unit;
          percentage.dtype = o1.dtype;
          percentage.value = Operators.unary[shapeOf(o1)]["percent"](o1.value);
          if (percentage.value) { return percentage.value } // Error
          stack.push(Object.freeze(percentage));
          break
        }

        case "|":
        case "‖": {
            // Find |x| or ‖x‖
          const o1 = stack.pop();
          if (!((o1.dtype & dt.RATIONAL) || o1.dtype === dt.COMPLEX)) {
            return errorOprnd("NAN_OP")
          }
          const op = tkn === "|" ? "abs" : "norm";
          const abs = Object.create(null);
          abs.unit = o1.unit;
          abs.dtype = dt.RATIONAL;
          abs.value = Operators.unary[shapeOf(o1)][op](o1.value);
          if (abs.value.dtype && abs.value.dtype === dt.ERROR) { return abs.value }
          stack.push(Object.freeze(abs));
          break
        }

        case "matrix": {
          // matrix
          const numRows = Number(tokens[i + 1]);
          const numCols = Number(tokens[i + 2]);
          i += 2;

          if (stack[stack.length - 1].dtype === dt.RANGE) {
            // Input was [start:step:end]
            stack.push(Matrix.operandFromRange(stack.pop().value));
          } else {
            stack.push(Matrix.operandFromTokenStack(stack, numRows, numCols));
          }
          break
        }

        case "startSvg":
          stack.push({ value: Draw.startSvg(), unit: null, dtype: dt.DRAWING });
          break

        case "abs":
        case "cos":
        case "sin":
        case "tan":
        case "acos":
        case "asin":
        case "atan":
        case "sec":
        case "csc":
        case "cot":
        case "asec":
        case "acsc":
        case "acot":
        case "exp":
        case "log":
        case "ln":
        case "log10":
        case "log2":
        case "cosh":
        case "sinh":
        case "tanh":
        case "sech":
        case "csch":
        case "coth":
        case "acosh":
        case "asinh":
        case "atanh":
        case "asech":
        case "acsch":
        case "acoth":
        case "Gamma":
        case "Γ":
        case "logGamma":
        case "logΓ":
        case "logFactorial":
        case "cosd":
        case "sind":
        case "tand":
        case "acosd":
        case "asind":
        case "atand":
        case "secd":
        case "cscd":
        case "cotd":
        case "asecd":
        case "acscd":
        case "acotd":
        case "Re":
        case "Im":
        case "argument":
        case "chr":
        case "round":
        case "sqrt":
        case "sign": {
          // Functions with one real or complex argument.
          const arg = stack.pop();
          if (!((arg.dtype & dt.RATIONAL) || (arg.dtype & dt.COMPLEX))) {
            return errorOprnd("UNREAL", tkn)
          }

          const output = Object.create(null);
          const unit = Object.create(null);
          unit.expos = unitAware ? Functions.functionExpos(tkn, [arg]) : allZeros;
          if (unit.expos.dtype && unit.expos.dtype === dt.ERROR) { return unit.expos }
          output.unit = Object.freeze(unit);

          const shape = (arg.dtype & dt.RATIONAL) ? "scalar" : "complex";
          const value = ((arg.dtype & dt.MAP) && Matrix.isVector(arg))
            // eslint-disable-next-line max-len
            ? mapMap(arg.value, array => array.map(e => Functions.unary[shape][tkn](e)))
            : Matrix.isVector(arg)
            ? arg.value.map(e => Functions.unary[shape][tkn](e))
            : isMatrix(arg)
            ? arg.value.map(row => row.map(e => Functions.unary[shape][tkn](e)))
            : needsMap(arg)
            ? mapMap(arg.value, val => Functions.unary[shape][tkn](val))
            : Functions.unary[shape][tkn](arg.value);
          if (value.dtype && value.dtype === dt.ERROR) { return value }
          output.value = Object.freeze(value);

          output.dtype = tkn === "chr"
            ? arg.dtype - dt.RATIONAL + dt.STRING
            : (arg.dtype & dt.COMPLEX) && arfn.includes(tkn)
            ? arg.dtype - dt.COMPLEX + dt.RATIONAL
            : arg.dtype;

          stack.push(Object.freeze(output));
          break
        }

        case "logn":
        case "atan2":
        case "hypot":
        case "gcd":
        case "rms":
        case "binomial":
        case "zeros": {
          // Functions with two real arguments.
          const args = [];
          args.push(stack.pop());
          args.unshift(stack.pop());
          if (!(args[0].dtype & dt.RATIONAL)) { return errorOprnd("") }

          const output = Object.create(null);
          const unit = Object.create(null);
          unit.expos = unitAware ? Functions.functionExpos(tkn, args) : allZeros;
          if (unit.dtype && unit.dtype === dt.ERROR) { return unit }
          output.unit = Object.freeze(unit);

          const [value, dtype] = multivarFunction("binary", tkn, args);
          output.value = Object.freeze(value);
          output.dtype = dtype;
          stack.push(Object.freeze(output));
          break
        }

        case "roundn":
        case "string": {
          // Round a numeric value.
          const spec = stack.pop();
          const num = stack.pop();
          if (!(num.dtype & dt.RATIONAL)) { return errorOprnd("") }
          if (!(spec.dtype & dt.STRING)) { return errorOprnd("") }
          if (!/(?:f-?|r)\d+/.test(spec.value)) { return errorOprnd("") }
          let funcName = "";
          const output = Object.create(null);
          if (tkn === "string") {
            funcName = spec.value.charAt() === "f" ? "stringFixed" : "stringSignificant";
            output.unit = null;
            output.dtype = num.dtype - dt.RATIONAL + dt.STRING;
          } else {
            funcName = spec.value.charAt() === "f" ? "roundFixed" : "roundSignificant";
            output.unit = num.unit;
            output.dtype = num.dtype;
          }
          const n = Number(spec.value.slice(1));
          const value = ((num.dtype & dt.MAP) && Matrix.isVector(num))
            ? mapMap(num.value, array => array.map(e => Functions.binary[funcName]([e, n])))
            : Matrix.isVector(num)
            ? num.value.map(e => Functions.binary[funcName]([e, n]))
            : isMatrix(num)
            ? num.value.map(row => row.map(e => Functions.binary[funcName]([e, n])))
            : needsMap(num)
            ? mapMap(num.value, val => Functions.binary[funcName]([val, n]))
            : Functions.binary[funcName]([num.value, n]);
          if (value.dtype && value.dtype === dt.ERROR) { return value }
          output.value = Object.freeze(value);
          if (num.name) { output.name = num.name; }
          stack.push(Object.freeze(output));
          break
        }

        case "dataframe":
        case "max":
        case "min":
        case "sum":
        case "product":
        case "range":
        case "mean":
        case "median":
        case "variance":
        case "stddev": {
          // Functions that reduce multiple arguments to one result.
          // TODO: unit-aware reducing functions.
          const numArgs = Number(tokens[i + 1]);
          i += 1;
          const args = [];
          for (let j = 0; j < numArgs; j++) {
            const datum = stack.pop();
            if (tkn !== "dataframe" && !(datum.dtype & dt.RATIONAL)) {
              return errorOprnd("NANARG", tkn)
            }
            args.unshift(datum);
          }

          if (tkn === "dataframe") {
            const df = DataFrame.dataFrameFromVectors(args, vars);
            if (df.dtype && df.dtype === dt.ERROR) { return df }
            stack.push(df);
            break
          }

          const output = Object.create(null);
          const unit = Object.create(null);
          unit.expos = unitAware ? Functions.functionExpos(tkn, args) : allZeros;
          if (unit.dtype && unit.dtype === dt.ERROR) { return errorOprnd("") }
          output.unit = Object.freeze(unit);

          const [value, dtype] = multivarFunction("reduce", tkn, args);
          output.value = Object.freeze(value);
          output.dtype = dtype;
          stack.push(Object.freeze(output));
          break
        }

        case "random": {
          // No arguments
          const num = Object.create(null);
          num.value = Rnl.fromNumber(Math.random());
          num.unit = Object.create(null);
          num.unit.expos = allZeros;
          num.dtype = dt.RATIONAL;
          stack.push(Object.freeze(num));
          break
        }

        case "isNaN": {
          const oprnd = stack.pop();
          const output = Object.create(null);
          output.value = !(oprnd.dtype & dt.RATIONAL);
          output.unit = null;
          output.dtype = dt.BOOLEAN;
          stack.push(Object.freeze(output));
          break
        }

        case "length": {
          const arg = stack.pop();
          const value = arg.value;
          const length = Matrix.isVector(arg)
            ? value.length
            : (arg.dtype & dt.MATRIX)
            ? value.length * value[0].length
            : (arg.dtype === dt.STRING)
            ? value.length - arrayOfRegExMatches(/[\uD800-\uD8FF\uFE00\uFE01]/g, value).length
            : (arg.dtype & dt.MAP)
            ? arg.keys().value.length
            : 0;
          const output = Object.create(null);
          output.value = Object.freeze(Rnl.fromNumber(length));
          output.unit = Object.create(null);
          output.unit.expos = allZeros;
          output.dtype = dt.RATIONAL;
          stack.push(Object.freeze(output));
          break
        }

        case "count": {
          const pattern = stack.pop();
          const str = stack.pop();
          if (pattern.dtype !== dt.STRING || str.dtype !== dt.STRING) {
            return errorOprnd("COUNT")
          }
          const output = Object.create(null);
          output.value = Object.freeze(
            Rnl.fromNumber(str.value.split(pattern.value).length - 1)
          );
          output.unit = Object.create(null);
          output.unit.expos = allZeros;
          output.dtype = dt.RATIONAL;
          stack.push(Object.freeze(output));
          break
        }

        case "format": {
          const formatSpec = stack.pop().value;
          const str = format(stack.pop().value, formatSpec);
          stack.push({ value: str, unit: null, dtype: dt.STRING });
          break
        }

        case "lerp": {
          // linear interpolation function
          const args = new Array(3);
          args[2] = stack.pop();
          args[1] = stack.pop();
          args[0] = stack.pop();
          const result = Functions.lerp(args, unitAware);
          if (result.dtype === dt.ERROR) { return result }
          stack.push(result);
          break
        }

        case "matrix2table": {
          const colNames = stack.pop();
          const rowNames = stack.pop();
          const matrix = stack.pop();
          const result = DataFrame.matrix2table(matrix, rowNames, colNames, vars);
          if (result.dtype === dt.ERROR) { return result }
          stack.push(result);
          break
        }

        case "transpose":
          stack.push(Matrix.transpose(stack.pop()));
          break

        case "trace":
          stack.push(Matrix.trace(stack.pop()));
          break

        case "fetch":
          // fetch() is handled in updateCalculations.js.
          // It's easier from there to coordinate an async function with ProseMirror.
          // So if control flow get here, we have an error.
          return errorOprnd("FETCH")

        case "function": {
          // User defined function.
          const functionName = tokens[i + 1];
          const numArgs = Number(tokens[i + 2]);
          i += 2;
          const args = new Array(numArgs);
          for (let j = numArgs - 1; j >= 0; j--) {
            args[j] = stack.pop();
          }
          let oprnd;
          if (vars.svg && (functionName === "plot" || (Draw.functions[functionName]))) {
            if (functionName === "plot") {
              args.splice(1, 0, decimalFormat);
              oprnd = plot(...args);
            } else {
              oprnd = Draw.functions[functionName](...args);
            }
          } else if (nextToken(tokens, i) === ".") {
            // Function from a module
            let lib = stack.pop().value;         // remote module
            if (lib.value) { lib = lib.value; }  // local module
            const udf = lib[functionName];
            if (udf === undefined) { return errorOprnd("F_NAME", functionName) }
            if (udf.dtype === dt.ERROR) { return udf }
            if (udf.isPrivate) { return errorOprnd("PRIVATE", functionName) }
            oprnd = evalCustomFunction(udf, args, decimalFormat, unitAware, lib);
            i += 1;
          } else if (lib && lib[functionName]) {
            // A module, "lib", was passed to this instance of evalRpn().
            const udf = lib[functionName];
            oprnd = evalCustomFunction(udf, args, decimalFormat, unitAware, lib);
          } else if (vars[functionName] && vars[functionName].dtype === dt.MODULE) {
            // User-defined function from a calculation node.
            const udf = vars[functionName]["value"];
            oprnd = evalCustomFunction(udf, args, decimalFormat, unitAware);
          } else {
            return errorOprnd("BAD_FUN_NM", functionName)
          }
          if (oprnd.dtype === dt.ERROR) { return oprnd }
          stack.push(oprnd);
          break
        }

        case "=":
        case "==":
        case "<":
        case ">":
        case "<=":
        case "≤":
        case ">=":
        case "≥":
        case "≠":
        case "!=":
        case "∈":
        case "∉":
        case "⋐": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (unitAware &&
            !((o1.dtype & dt.STRING) || (o2.dtype & dt.STRING) ||
               o1.dtype === dt.NULL || o2.dtype === dt.NULL)) {
            if (!unitsAreCompatible(o1.unit.expos, o2.unit.expos)) {
              return errorOprnd("UNIT_COMP")
            }
          }
          const bool = Object.create(null);
          bool.unit = null;
          const prevValue = (o1.dtype & dt.BOOLEANFROMCOMPARISON) ? oPrev.value : undefined;

          if (isIn(tkn, ["∈", "∉", "⋐"])) {
            bool.value = compare(tkn, o1.value, o2.value, prevValue);
          } else {
            const [shape1, shape2, _] = binaryShapesOf(o1, o2);
            bool.value = Operators.relations[shape1][shape2].relate(tkn, o1.value,
              o2.value, prevValue);
          }
          if (bool.value.dtype && bool.value.dtype === dt.ERROR) { return bool.value }
          bool.dtype = dt.BOOLEANFROMCOMPARISON;
          oPrev = o2;
          stack.push(Object.freeze(bool));
          break
        }

        case "and":
        case "or":
        case "∧":
        case "∨":
        case "⊻": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (!(o1.dtype & dt.BOOLEAN) || !(o2.dtype & dt.BOOLEAN)) {
            return errorOprnd("LOGIC", tokens[i])
          }
          const op = { "and": "and", "or": "or", "∧": "and", "∨": "or", "⊻": "xor" }[tkn];
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);

          const bool = Object.create(null);
          bool.unit = null;
          bool.value = Operators.binary[shape1][shape2][op](o1.value, o2.value);
          if (bool.value.dtype && bool.value.dtype === dt.ERROR) { return bool.value }

          bool.dtype = Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, tkn);
          stack.push(Object.freeze(bool));
          break
        }

        case "not":
        case "¬": {
          const o1 = stack.pop();
          if (!(o1.dtype & dt.BOOLEAN)) { return errorOprnd("LOGIC", tkn) }
          const bool = Object.create(null);
          bool.unit = null;
          bool.value = Operators.unary[shapeOf(o1)]["not"](o1.value);
          if (bool.value.dtype && bool.value.dtype === dt.ERROR) { return bool.value }
          bool.dtype = dt.BOOLEAN;
          stack.push(Object.freeze(bool));
          break
        }

        case "cases": {
          // A multi-line cases expression. Hurmet's ternary expression.
          const numArgs = Number(tokens[i + 1]);
          i += 1;
          // We evaluate cases expressions lazily. Pop the conditions into an array.
          const conditions = new Array(numArgs);
          for (let j = numArgs - 1; j >= 0; j--) {
            conditions[j] = stack.pop();
          }
          // Check each condition.
          // When we reach the first true condition, evaluate the corresponding expression.
          for (let j = 0; j < numArgs; j++) {
            if ((conditions[j].dtype & dt.BOOLEAN) === 0) {
              return errorOprnd("LOGIC", "if")
            }
            if (conditions[j].value) {
              const rpnLocal = tokens[i + j + 1].replace(/§/g, "\u00A0");
              const oprnd = evalRpn(rpnLocal, vars, decimalFormat, unitAware, lib);
              if (oprnd.dtype === dt.ERROR) { return oprnd }
              stack.push(oprnd);
              break
            }
          }
          i += numArgs;  // Discard the unused expressions
          break
        }

        case "applyUnit": {
          // Pop a magnitude off the stack and apply a unit.
          // This happens where a user writes a QUANTITY literal.
          if (!unitAware) { return errorOprnd("UNIT_AWARE", tokens[i + 1]) }
          const o1 = stack.pop();
          if (!(o1.dtype & dt.RATIONAL)) { return errorOprnd("QUANT_NUM") }
          const unitName = tokens[i + 1];
          i += 1;
          const output = Object.create(null);
          output.unit = Object.create(null);
          output.dtype = o1.dtype;
          if (!unitAware) {
            output.value = o1.value;
            if (o1.dtype & dt.MAP) {
              output.unit = unitFromUnitName(unitName, vars);
            } else {
              output.unit.name = unitName;
            }
          } else {
            // Convert the magnitude to base units.
            const unit = unitFromUnitName(unitName, vars);
            if (unit.dtype && unit.dtype === dt.ERROR) { return unit }
            if (isMatrix(o1)) {
              output.unit.expos = o1.unit.expos.map((e, j) => e + unit.expos[j]);
              output.value = Matrix.convertToBaseUnits(o1, unit.gauge, unit.factor);
            } else if (o1.dtype & dt.MAP) {
              output.unit = unitFromUnitName(o1.unit);
              output.value = o1.value;
            } else {
              output.unit.expos = o1.unit.expos.map((e, j) => e + unit.expos[j]);
              output.value = Rnl.multiply(Rnl.add(o1.value, unit.gauge), unit.factor);
            }
          }
          stack.push(Object.freeze(output));
          break
        }

        case "modulo": {
          const o2 = stack.pop();
          const o1 = stack.pop();
          if (!((o1.dtype & dt.RATIONAL) & (o2.dtype & dt.RATIONAL))) {
            return errorOprnd("NAN_OP")
          }
          const [shape1, shape2, _] = binaryShapesOf(o1, o2);
          const mod = Object.create(null);
          mod.unit = Object.create(null);
          mod.unit.expos = allZeros;
          mod.value = Operators.binary[shape1][shape2]["modulo"](o1.value, o2.value);
          if (mod.value.dtype && mod.value.dtype === dt.ERROR) { return mod.value }
          mod.dtype = Operators.dtype[shape1][shape2](o1.dtype, o2.dtype, tkn);
          stack.push(Object.freeze(mod));
          break
        }

        case "⎾⏋":
        case "⎿⏌": {
          // ceiling or floor
          const o1 = stack.pop();
          if (!(o1.dtype & dt.RATIONAL)) { return errorOprnd("NAN_OP") }
          if (unitAware) {
            if (!unitsAreCompatible(o1.unit.expos, allZeros)) {
              // TODO: Write an error message.
              { return errorOprnd("") }
            }
          }
          const op = tkn === "⎾⏋" ? "ceil" : "floor";
          const output = Object.create(null);
          output.value = Operators.unary[shapeOf(o1)][op](o1.value);
          if (output.value.dtype && output.value.dtype === dt.ERROR) { return output.value }
          output.unit = o1.unit;
          output.dtype = o1.dtype;
          stack.push(Object.freeze(output));
          break
        }

        case "()": {
          // binomial
          const args = [];
          args.unshift(stack.pop());
          args.unshift(stack.pop());
          if (unitAware) {
            if (!unitsAreCompatible(args[0].unit.expos, allZeros) ||
              !unitsAreCompatible(args[1].unit.expos, allZeros)) {
              return errorOprnd("BINOM")
            }
          }
          const binom = Object.create(null);
          binom.unit = Object.create(null);
          binom.unit.expos = allZeros;
          const [value, dtype] = multivarFunction("binary", "binomial", args);
          binom.value = value;
          binom.dtype = dtype;
          stack.push(Object.freeze(binom));
          break
        }

        case "raise":
          return { value: stack.pop().value, unit: null, dtype: dt.ERROR }

        case "\\blue":
        case "\\gray":
        case "\\green":
        case "\\orange":
        case "\\pink":
        case "\\purple":
        case "\\red": {
          const color = clone(stack.pop());
          if (color.dtype === dt.STRING) { color.unit = tkn.slice(1); }
          stack.push(color);
          break
        }
          // TODO: Write an error message
      }
    }
  } // next i

  const oprnd = stack.pop();
  if (stack.length > 0) {
    return errorOprnd("ERROR")
  }

  return oprnd
};

const plot = (svg, decimalFormat, fun, numPoints, xMin, xMax) => {
  // Plot a function.
  // To avoid a circular reference, this function has to be here instead of in draw.js.
  const attrs = svg.value.temp;
  numPoints = (numPoints == null) ? Rnl.fromNumber(250) : numPoints.value;
  const min = (xMin == null) ? Rnl.fromNumber(attrs.xmin) : xMin.value;
  const max = (xMax == null) ? Rnl.fromNumber(attrs.xmax) : xMax.value;
  // Vectorize the evaluation. Start by finding a vector of the input.
  const step = Rnl.divide(Rnl.subtract(max, min), numPoints);
  const rowVector = Matrix.operandFromRange([min, step, max]);
  // Transpose the row vector into a column vector.
  const arg = { value: rowVector.value, unit: null, dtype: dt.COLUMNVECTOR + dt.RATIONAL };
  // Run the function on the vector.
  let funResult;
  let pathValue;
  if (fun.value.dtype && fun.value.dtype === dt.MODULE) {
    funResult = evalCustomFunction(fun.value, [arg], decimalFormat, false);
    pathValue = arg.value.map((e, i) => [e, funResult.value[i]]);
  } else if (fun.dtype === dt.STRING) {
    if (/§matrix§1§2$/.test(fun.value)) {
      arg.name = "t";
      pathValue = evalRpn(fun.value.replace(/§/g, "\xa0"), { t: arg }, decimalFormat, false).value;
    } else {
      arg.name = "x";
      funResult = evalRpn(fun.value.replace(/§/g, "\xa0"), { x: arg }, decimalFormat, false);
      pathValue = arg.value.map((e, i) => [e, funResult.value[i]]);
    }
  }
  const pth = { value: pathValue, unit: null, dtype: dt.MATRIX + dt.RATIONAL };
  return Draw.functions.path(svg, pth, "L")
};

const elementFromIterable = (iterable, index, step) => {
  // A helper function. This is called by `for` loops in evalCustomFunction()
  let value;
  let nextIndex = Rnl.increment(index);
  let dtype = 0;
  if (iterable.dtype === dt.RANGE) {
    value = index;
    nextIndex = Rnl.add(index, step);
    dtype = dt.RATIONAL;
  } else if ((iterable.dtype === dt.STRING) &&
    iterable.value[Rnl.fromNumber(index)] === "\uD835") {
    value = Rnl.fromNumber(iterable.value[index] + iterable.value[index + 1]);
    nextIndex = Rnl.add(index, 2);
    dtype = dt.STRING;
  } else {
    value = iterable.value[Rnl.toNumber(index)];
    dtype = (iterable.dtype & dt.STRING)
      ? dt.STRING
      : (iterable.dtype & dt.ROWVECTOR)
      ? iterable.dtype - dt.ROWVECTOR
      : (iterable.dtype & dt.COLUMNVECTOR)
      ? iterable.dtype - dt.COLUMNVECTOR
      : iterable.dtype - dt.MATRIX;
  }
  const oprnd = { value: value, unit: iterable.unit, dtype: dtype };
  return [oprnd, nextIndex]
};

const loopTypes = ["while", "for"];

const evalCustomFunction = (udf, args, decimalFormat, isUnitAware, lib) => {
  // UDF stands for "user-defined function"
  // lib is short for library. If not omitted, it contains a module with more functions.

  if (udf.dtype === dt.ERROR) {
    return udf
  }

  // Populate the function parameters.
  if (args.length > udf.parameters.length) { return errorOprnd("NUMARGS", udf.name) }
  const vars = Object.create(null);
  for (let i = 0; i < args.length; i++) {
    vars[udf.parameters[i]] = args[i];
  }
  if (udf.parameters.length > args.length) {
    for (let i = args.length; i < udf.parameters.length; i++) {
      vars[udf.parameters[i]] = { value: undefined, unit: null, dtype: 0 };
    }
  }
  if (udf.dtype === dt.DRAWING) {
    vars["svg"] = { value: Draw.startSvg(), unit: null, dtype: dt.DRAWING };
  }

  // Execute the function statements.
  // There will be nested flow of control, of course. So we'll create a
  // "control" stack. The topmost element contains info about the control
  // that applies to the current nesting level.
  const control = [{ type: "if", condition: true, endOfBlock: udf.statements.length - 1 }];
  for (let i = 0; i < udf.statements.length; i++) {
    const statement = udf.statements[i];
    const stype = statement.stype;
    const level = control.length - 1;
    switch (stype) {
      case "statement": {
        if (control[level].condition) {
          const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
          if (result.dtype === dt.ERROR) { return result }
          if (statement.name) {
            statement.resultdisplay = isUnitAware ? "!!" : "!";
            const [stmt, _] = conditionResult(statement, result, isUnitAware);
            insertOneHurmetVar(vars, stmt, decimalFormat);
          }
        }
        break
      }

      case "if": {
        if (control[level].condition) {
          const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
          if (result.dtype === dt.ERROR) { return result }
          control.push({
            type: "if",
            condition: result.value,
            endOfBlock: statement.endOfBlock
          });
        } else {
          // Skip this block
          i = statement.endOfBlock;
        }
        break
      }

      case "else if": {
        if (control[level].type === "if" && control[level].condition) {
          i = control[level].endOfBlock;
          control.pop();
        } else {
          const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
          if (result.dtype === dt.ERROR) { return result }
          control[control.length - 1].condition = result.value;
        }
        break
      }

      case "else":
        if (control[level].type === "if" && control[level].condition) {
          i = control[level].endOfBlock;
          control.pop();
        } else {
          control[level].condition = true;
        }
        break

      case "while": {
        if (control[level].condition) {
          const cntrl = {
            type: "while",
            startStatement: i,
            rpn: statement.rpn,
            endOfBlock: statement.endOfBlock
          };
          const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
          if (result.dtype === dt.ERROR) { return result }
          cntrl.condition = result.value;
          if (cntrl.condition === true) {
            control.push(cntrl);
          } else {
            i = statement.endOfBlock;
          }
        } else {
          i = statement.endOfBlock;
        }
        break
      }

      case "for": {
        const ctrl = {
          type: "for",
          condition: true,
          startStatement: i,
          endOfBlock: statement.endOfBlock
        };
        const tokens = statement.rpn.split("\u00A0");
        tokens.pop(); // Discard the "for"
        ctrl.dummyVariable = tokens.shift().slice(1);
        const iterable = evalRpn(tokens.join("\u00A0"), vars, decimalFormat, isUnitAware, lib);
        ctrl.index = (iterable.dtype & dt.RANGE) ? iterable.value[0] : Rnl.fromNumber(0);
        ctrl.step = (iterable.dtype & dt.RANGE) ? iterable.value[1] : Rnl.fromNumber(0);
        ctrl.endIndex = (iterable.dtype & dt.RANGE)
          ? iterable.value[2]
          : Rnl.fromNumber(iterable.value.length - 1);
        const [oprnd, nextIndex] = elementFromIterable(iterable, ctrl.index, ctrl.step);
        ctrl.nextIndex = nextIndex;
        ctrl.iterable = iterable;
        control.push(ctrl);
        vars[ctrl.dummyVariable] = oprnd;
        break
      }

      case "break": {
        if (control[level].condition) {
          // Find the enclosing loop and pop out of it.
          for (let j = control.length - 1; j > 0; j--) {
            if (loopTypes.includes(control[j].type) || j === 0) {
              i = control[j].endOfBlock;
              control.pop();
              break
            } else {
              control.pop();
            }
          }
        }
        break
      }

      case "end": {
        // end of code block
        if (control[level].type === "if" && i >= control[level].endOfBlock) {
          control.pop();
        } else if (control[level].type === "if" && control[level].condition) {
          // Jump ahead to end of if block
          if (i < control[level].endOfBlock) { i = control[level].endOfBlock; }
          control.pop();
        } else if (control[level].type === "while") {
          const result = evalRpn(control[level].rpn, vars, decimalFormat, isUnitAware, lib);
          if (result.dtype === dt.ERROR) { return result }
          control[level].condition = result.value;
          if (control[level].condition) {
            i = control[level].startStatement;
          } else {
            control.pop();
          }
        } else if (control[level].type === "for") {
          control[level].index = control[level].nextIndex;
          const proceed = Rnl.isRational(control[level].index)
            && Rnl.isPositive(control[level].step)
            ? Rnl.lessThanOrEqualTo(control[level].index, control[level].endIndex)
            : Rnl.isRational(control[level].index)
            ? Rnl.greaterThanOrEqualTo(control[level].index, control[level].endIndex)
            : control[level].index <= control[level].endIndex;
          if (proceed) {
            const [oprnd, nextIndex] = elementFromIterable(
              control[level].iterable,
              control[level].index, control[level].step
            );
            vars[control[level].dummyVariable] = oprnd;
            control[level].nextIndex = nextIndex;
            i = control[level].startStatement;
          } else {
            control.pop();
          }
        }
        break
      }

      case "return":
        if (control[level].condition) {
          if (statement.rpn) {
            const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
            return result
          } else {
            return { value: Rnl.zero, unit: allZeros, dtype: dt.RATIONAL }
          }
        }
        break

      case "echo":
        if (control[level].condition) {
          if (statement.rpn) {
            const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
            if (result.dtype === dt.ERROR) { return result }
            const msg = result.dtype === dt.RATIONAL
              ? Rnl.toNumber(result.value)
              : result.dtype === dt.STRING
              ? result.value
              : isVector(result) && (result.dtype & dt.RATIONAL)
              ? result.value.map(e => Rnl.toNumber(e))
              : result.dtype === dt.MATRIX + dt.RATIONAL
              ? result.value.map(row => row.map(e => Rnl.toNumber(e)))
              : result.value;
            // eslint-disable-next-line no-console
            console.log(msg);
          }
        }
        break

      case "raise":
        if (control[level].condition) {
          if (statement.rpn) {
            const result = evalRpn(statement.rpn, vars, decimalFormat, isUnitAware, lib);
            return { value: result.value, unit: null, dtype: dt.ERROR }
          } else {
            return { value: statement.rpn, unit: null, dtype: dt.ERROR }
          }
        }
        break
        // TODO: Error message.
    }
  }
};

const errorResult = (stmt, result) => {
  stmt.value = null;
  stmt.resultDisplay = "\\color{firebrick}\\text{" + result.value + "}";
  stmt.altResultDisplay = result.value;
  stmt.error = true;
  if (stmt.resulttemplate.indexOf("!") > -1) {
    stmt.tex += "= " + stmt.resultDisplay;
    stmt.alt += result.value;
  } else if (stmt.resulttemplate.indexOf("@") > -1) {
    stmt.tex = stmt.resulttemplate.replace(/@@?/, stmt.resultDisplay);
    stmt.alt = stmt.altresulttemplate.replace(/@@?/, stmt.altResultDisplay);
  } else {
    stmt.tex = stmt.tex.replace(/[?%] *[?%]|[?%]/, stmt.resultDisplay);
    stmt.alt = stmt.alt.replace(/[?%] *[?%]|[?%]/, stmt.altResultDisplay);
  }
  return [stmt, result]
};

const conditionResult = (stmt, oprnd, unitAware) => {
  let result = Object.create(null);
  result.value = clone(oprnd.value);
  result.unit = clone(oprnd.unit);
  result.dtype = oprnd.dtype;

  if (result.dtype === dt.COMPLEX && Rnl.isZero(Cpx.im(result.value))) {
    result.value = Cpx.re(result.value);
    result.dtype = 1;
  }

  // Check unit compatibility.
  if (result.dtype !== dt.ERROR && unitAware && stmt.resultdisplay.indexOf("!") === -1 &&
    (stmt.expos || (result.unit && result.unit.expos && Array.isArray(result.unit.expos)))) {
    const expos = (stmt.expos) ? stmt.expos : allZeros;
    if (!unitsAreCompatible(result.unit.expos, expos)) {
      const message = stmt.expos ? "UNIT_RES" : "UNIT_MISS";
      result = errorOprnd(message);
    }
  }
  if (result.dtype === dt.ERROR) { return errorResult(stmt, result) }

  // Check for a valid display indicator.
  if (stmt.resulttemplate && stmt.resulttemplate.indexOf("!") > -1 &&
    !(result.dtype === dt.DATAFRAME || (result.dtype & dt.MAP) || isMatrix(result)
    || (result.dtype & dt.TUPLE))) {
    return errorResult(stmt, errorOprnd("BAD_DISPLAY"))
  }

  if (result.dtype & dt.RATIONAL) {
    result.value = isVector(result)
      ? result.value.map(e => Rnl.normalize(e))
      : isMatrix(result)
      ? result.value.map(row => row.map(e => Rnl.normalize(e)))
      : result.dtype === dt.RATIONAL
      ? Rnl.normalize(result.value)
      : result.value;
  } else if (result.dtype === dt.COMPLEX) {
    result.value = [Rnl.normalize(result.value[0]), Rnl.normalize(result.value[1])];
  }
  stmt.dtype = result.dtype;

  // If unit-aware, convert result to desired result units.
  const unitInResultSpec = (stmt.factor && (stmt.factor !== 1 || stmt.gauge));
  if ((result.dtype & dt.DATAFRAME) ||
      (typeof stmt.resultdisplay === "string" && stmt.resultdisplay.indexOf("!") > -1)) {
    stmt.unit = result.unit;
  } else if (unitAware && (result.dtype & dt.RATIONAL)) {
    if (!unitInResultSpec & unitsAreCompatible(result.unit.expos, allZeros)) {
      stmt.factor = Rnl.one; stmt.gauge = Rnl.zero; stmt.expos = allZeros;
    }
    result.value = {
      plain: (isMatrix(result))
        ? Matrix.convertFromBaseUnits(
          { value: result.value, dtype: result.dtype },
          stmt.gauge,
          stmt.factor
          )
        : (result.dtype & dt.MAP)
        ? map.convertFromBaseUnits(result.value, stmt.gauge, stmt.factor)
        : Rnl.subtract(Rnl.divide(result.value, stmt.factor), stmt.gauge),
      inBaseUnits: result.value
    };
    stmt.dtype += dt.QUANTITY;
    stmt.expos = result.unit.expos;
  } else if (unitInResultSpec) {
    // A non-unit aware calculation, but with a unit attached to the result.
    result.value = {
      plain: result.value,
      inBaseUnits: (isMatrix(result) && (result.dtype & dt.MAP))
        ? mapMap(result.value, val => {
          return val.map(e => Rnl.multiply(Rnl.add(e, stmt.gauge), stmt.factor))
        })
        : (isMatrix(result))
        ? Matrix.convertToBaseUnits(
          { value: result.value, dtype: result.dtype },
          stmt.gauge,
          stmt.factor
          )
        : (result.dtype & dt.MAP)
        ? mapMap(result.value, val => {
          return Rnl.multiply(Rnl.add(val, stmt.gauge), stmt.factor)
        })
        : Rnl.multiply(Rnl.add(result.value, stmt.gauge), stmt.factor)
    };
    stmt.dtype += dt.QUANTITY;

  } else if ((result.dtype & dt.RATIONAL) || (result.dtype & dt.COMPLEX) ) {
    // A numeric result with no unit specified.
    stmt.expos = allZeros;
  }
  if (result.value)  { stmt.value = result.value; }
  return [stmt, result]
};

const evaluateDrawing = (stmt, vars, decimalFormat = "1,000,000.") => {
  // eslint-disable-next-line no-prototype-builtins
  const udf = stmt.value;
  const args = [];
  for (let i = 0; i < udf.parameters.length; i++) {
    const argName = udf.parameters[i];
    args.push(evalRpn("¿" + argName, vars, decimalFormat, false, {}));
  }
  const funcResult = evalCustomFunction(udf, args, decimalFormat, false, {});
  if (funcResult.dtype === dt.ERROR) {
    stmt.error = true;
    stmt.tex = "\\color{firebrick}\\text{" + funcResult.value + "}";
    stmt.value = null;
    stmt.dtype = dt.ERROR;
  } else {
    stmt.resultdisplay = funcResult.value;
    delete stmt.resultdisplay.temp;
  }
  return stmt
};

const evaluate = (stmt, vars, decimalFormat = "1,000,000.") => {
  stmt.tex = stmt.template;
  stmt.alt = stmt.altTemplate;
  const isUnitAware = /\?\?|!!|%%|@@|¡¡/.test(stmt.resulttemplate);

  const formatSpec = vars.format ? vars.format.value : "h15";

  if (stmt.tex.indexOf("〖") > -1) {
    // eslint-disable-next-line max-len
    const eqnWithVals = plugValsIntoEcho(stmt.tex, vars, isUnitAware, formatSpec, decimalFormat);
    if (eqnWithVals.dtype && eqnWithVals.dtype === dt.ERROR) {
      const [newStmt, _] = errorResult(stmt, eqnWithVals);
      return newStmt
    } else {
      stmt.tex = eqnWithVals;
    }
  }

  if (stmt.rpn) {
    let oprnd = evalRpn(stmt.rpn, vars, decimalFormat, isUnitAware);
    if (oprnd.dtype === dt.ERROR) { [stmt, oprnd] = errorResult(stmt, oprnd); return stmt}
    let result;
    [stmt, result] = conditionResult(stmt, oprnd, isUnitAware);
    if (stmt.error) { return stmt }
    stmt = formatResult(stmt, result, formatSpec, decimalFormat, isUnitAware);
  }
  return stmt
};

const numberRegEx$3 = new RegExp(Rnl.numberPattern);
const unitRegEx$1 = /('[^']+'|[°ΩÅK])$/;
/* eslint-disable max-len */

const numStr = "(-?(?:0x[0-9A-Fa-f]+|[0-9]+(?: [0-9]+\\/[0-9]+|(?:\\.[0-9]+)?(?:e[+-]?[0-9]+|%)?)))";
const nonNegNumStr = "(0x[0-9A-Fa-f]+|[0-9]+(?: [0-9]+\\/[0-9]+|(?:\\.[0-9]+)?(?:e[+-]?[0-9]+|%)?))";
const complexRegEx = new RegExp("^" + numStr + "(?: *([+-]) *j +" + nonNegNumStr + "|∠" + numStr + "(°)?)");
// const complexRegEx = /^(number)(?: *([+-]) *j +(non-negative number)|∠(number)(°)?)/
/* eslint-enable max-len */
// Capturing groups:
//    [1] First number, either a in a + j b, or r in r∠θ
//    [2] + or -. Gives the sign of the imaginary part in an a + j b.
//    [3] b, the imaginary part in an a + j b expression
//    [4] theta, the argument (phase angle ) of an r∠θ expression
//    [5] °, optional trailing degree sign in an r∠θ expression

const valueFromLiteral = (str, name, decimalFormat) => {
  // Read a literal string and return a value
  // The return should take the form: [value, unit, dtype, resultDisplay]

  // Start by checking for a unit
  let unitName = "";
  let unitDisplay = "";
  const unitMatch = unitRegEx$1.exec(str);
  if (unitMatch) {
    unitName = unitMatch[0].replace(/'/g, "").trim();
    str = str.slice(0, -unitMatch[0].length).trim();
    unitDisplay = unitTeXFromString(unitName);
  }

  if (/^[({[].* to /.test(str)) {
    // str defines a quantity distribution, (a to b). That is handled by calculation.js.
    // This is not a valid literal.
    return [0, null, dt.ERROR, ""]

  } else if (str === "true" || str === "false") {
    return [Boolean(str), null, dt.BOOLEAN, `\\mathord{\\text{${str}}}`]

  } else if (/^\x22.+\x22/.test(str)) {
    // str contains text between quotation marks
    if (name === "format") {
      return parseFormatSpec(str.slice(1, -1).trim())
    } else {
      const tex = parse(str, decimalFormat);
      return [str, undefined, dt.STRING, tex]
    }

  } else if (/^[([]/.test(str)) {
    // We're processing a matrix
    const [tex, rpn] = parse(str, decimalFormat, true);
    const oprnd = evalRpn(rpn, {}, decimalFormat, false, {});
    let unit = (oprnd.dtype & dt.RATIONAL) ? allZeros : null;
    let dtype = oprnd.dtype;
    if (unitName) {
      unit = unitName;
      dtype += dt.QUANTITY;
      return [oprnd.value, unit, dtype, tex + "\\," + unitDisplay]
    } else {
      return [oprnd.value, unit, dtype, tex]
    }

  } else if (/^``/.test(str)) {
    // A CSV between double back ticks.
    // Read the CSV into a data frame.
    str = tablessTrim(str.slice(2, -2));
    const dataStructure = DataFrame.dataFrameFromCSV(str, {});
    if (dataStructure.dtype === dt.DATAFRAME) {
      return [dataStructure.value, dataStructure.unit, dt.DATAFRAME,
        DataFrame.display(dataStructure.value, "h3", decimalFormat)]
    } else {
      // It's a Hurmet Map
      if (unitName) {
        dataStructure.unit = unitName;
        dataStructure.dtype = dt.MAP + dt.RATIONAL + dt.QUANTITY;
      }
      return [dataStructure.value, dataStructure.unit, dataStructure.dtype,
        map.display(dataStructure, "h3", decimalFormat) + "\\;" + unitDisplay]
    }

  } else if (complexRegEx.test(str)) {
    // str is a complex number.
    const resultDisplay = parse(str, decimalFormat);
    const parts = str.match(complexRegEx);
    let real;
    let im;
    if (parts[3]) {
      // a + j b expression
      real = Rnl.fromString(parts[1]);
      im = Rnl.fromString(parts[3]);
      if (parts[2] === "-") { im = Rnl.negate(im); }
    } else {
      // r∠θ expression
      const r = Rnl.fromString(parts[1]);
      let theta = Rnl.fromString(parts[4]);
      if (parts[5]) { theta = Rnl.divide(Rnl.multiply(theta, Rnl.pi), Rnl.fromNumber(180)); }
      real = Rnl.multiply(r, Rnl.fromNumber(Math.cos(Rnl.toNumber(theta))));
      im = Rnl.multiply(r, Rnl.fromNumber(Math.sin(Rnl.toNumber(theta))));
    }
    return [[real, im], allZeros, dt.COMPLEX, resultDisplay]

  } else if (str.match(numberRegEx$3)) {
    // str is a number.
    const resultDisplay = parse(str, decimalFormat);
    if (unitName) {
      return [Rnl.fromString(str), unitName, dt.RATIONAL + dt.QUANTITY,
        resultDisplay + "\\;" + unitDisplay]
    } else {
      return [Rnl.fromString(str), allZeros, dt.RATIONAL, resultDisplay]
    }

  } else {
    return [0, null, dt.ERROR, ""]

  }
};

/*  This module, like prepareStatement.js, is called only when
 *  (1) an author submits a Hurmet calculation dialog box, or
 *  (2) when a new document is opened, or (3) when recalculate-all is called.
 *  Here we process literal values of assignment statements.
 */

const improveQuantities = (attrs, vars) => {
  if (attrs.name && attrs.value && (attrs.dtype & dt.QUANTITY)) {
    // Assignment of a quantity. Get it in base units
    const unit = (attrs.unit === undefined)
      ? {
        name: "",
        factor: Rnl.one,
        gauge: Rnl.zero,
        log: "",
        expos: allZeros
      }
      : typeof attrs.unit === "string"
      ? unitFromUnitName(attrs.unit, vars)
      : attrs.unit; // unit from a MAP is already expanded.

    if (unit.dtype && unit.dtype === dt.ERROR) {
      attrs.tex += "\u00a0\\color{firebrick}{\\text{" + unit.value + "}}";
      attrs.alt += unit.value;
      return attrs
    }

    attrs.expos = unit.expos;
    if (Rnl.isRational(attrs.value)) {
      attrs.value = {
        plain: attrs.value,
        inBaseUnits: Rnl.multiply(Rnl.add(attrs.value, unit.gauge), unit.factor)
      };
    } else if (isMatrix(attrs)) {
      attrs.value = {
        plain: attrs.value,
        inBaseUnits: Matrix.convertToBaseUnits(attrs, unit.gauge, unit.factor)
      };
    } else if (attrs.dtype & dt.MAP) {
      const plain = clone(attrs.value);
      const inBaseUnits = map.convertToBaseUnits(plain, unit.gauge, unit.factor);
      attrs.value = { plain, inBaseUnits };
      attrs.unit = { expos: unit.expos };
    }
  }
  if (attrs.rpn && !attrs.value) {
    if (attrs.unit) {
      const unit = (attrs.unit)
        ? unitFromUnitName(attrs.unit, vars)
        : { factor: 1, gauge: 0, expos: allZeros };
      // We save factor and gauge with the cell attrs so that the result of
      // a later calculation can be converted into the desired display units.
      attrs.factor = unit.factor;
      attrs.gauge = unit.gauge;
      attrs.expos = unit.expos;
    }
  }

};

const isValidIdentifier$1 = /^(?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′*$/;
const keywordRegEx = /^(if|else if|else|return|raise|while|for|break|echo|end)\b/;
const drawCommandRegEx = /^(title|frame|view|axes|grid|stroke|strokewidth|strokedasharray|fill|fontsize|fontweight|fontstyle|fontfamily|marker|line|path|plot|curve|rect|circle|ellipse|arc|text|dot|leader|dimension)\b/;

// If you change functionRegEx, then also change it in mathprompt.js.
// It isn't called from there in order to avoid duplicating Hurmet code inside ProseMirror.js.
const functionRegEx = /^(?:private +)?function (?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′*\(/;
const drawRegEx = /^draw\(/;
const startSvgRegEx = /^startSvg\(\)/;
const lexRegEx = /"[^"]*"|``.*|`[^`]*`|'[^']*'|#|[^"`'#]+/g;

const testForStatement = str => {
  const pos = str.indexOf("=");
  if (pos === -1) { return false }
  const leadStr = str.slice(0, pos).trim();
  if (isValidIdentifier$1.test(leadStr)) { return true }
  if (leadStr.indexOf(",") === -1) { return false }
  let result = true;
  const arry = leadStr.split(",");
  arry.forEach(e => {
    if (!isValidIdentifier$1.test(e.trim())) { result = false; }
  });
  return result
};

const stripComment = str => {
  // Strip the comment, if any, from the end of a code line.
  const matches = arrayOfRegExMatches(lexRegEx, str);
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].value === "#") {
      str = str.slice(0, matches[i].index);
      break
    }
  }
  return str.trim()
};

const scanModule = (str, decimalFormat) => {
  // Scan the code and break it down into individual lines of code.
  // Assemble the lines into functions and assign each function to parent.
  const parent = Object.create(null);

  // Statements end at a newline.
  const lines = str.split(/\r?\n/g);

  for (let i = 0; i < lines.length; i++) {
    // Get a single line of code and strip off any comments.
    const line = stripComment(lines[i]);
    if (line.length === 0) { continue }

    if (functionRegEx.test(line) || drawRegEx.test(line)) {
      // This line starts a new function.
      const [funcObj, endLineNum] = scanFunction(lines, decimalFormat, i);
      if (funcObj.dtype && funcObj.dtype === dt.ERROR) { return funcObj }
      parent[funcObj.name] = funcObj;
      i = endLineNum;
    } else if (testForStatement(line)) {
      // This line starts a Hurmet assignment.
      const [stmt, endLineNum] = scanAssignment(lines, decimalFormat, i);
      parent[stmt.name] = stmt;
      i = endLineNum;
    }
  }
  return { value: parent, unit: null, dtype: dt.MODULE }

};

const handleCSV = (expression, lines, startLineNum) => {
  for (let i = startLineNum + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length === 0) { continue }
    expression += "\n" + line;
    if (line.slice(-2) === "``") { return [expression, i] }
  }
};

const scanFunction = (lines, decimalFormat, startLineNum) => {
  const line1 = stripComment(lines[startLineNum]);
  let isDraw = line1.charAt(0) === "d";
  const posParen = line1.indexOf("(");
  let functionName = "";
  if (isDraw) {
    functionName = "draw";
  } else {
    const posFn = line1.indexOf("function");
    functionName = line1.slice(posFn + 8, posParen).trim();
  }
  const isPrivate = /^private /.test(line1);
  const parameterList =  line1.slice(posParen + 1, -1).trim();
  const parameters = parameterList.length === 0 ? [] : parameterList.split(/, */g);
  const funcObj = {
    name: functionName,
    dtype: isDraw ? dt.DRAWING : dt.MODULE,
    isPrivate,
    parameters,
    statements: []
  };

  const stackOfCtrls = [];
  let expression = "";
  let prevLineEndedInContinuation = false;
  let prevLine = "";
  let name = "";
  let isStatement = false;

  for (let i = startLineNum + 1; i < lines.length; i++) {
    let line = stripComment(lines[i]);
    if (line.length === 0) { continue }

    if (prevLineEndedInContinuation) {
      // Check if the previous character is a semi-colon just before a matrix literal closes.
      const lastChar = prevLine.slice(-1);
      line = lastChar === ";" && "})]".indexOf(line.charAt(0)) > -1
        ? prevLine.slice(0, -1).trim() + line
        : lastChar === ";" || lastChar === ","
        ? prevLine + " " + line
        : prevLine + line;
    }

    // Line continuation characters are: { ( [ , ; + -
    if (/[{([,;]$/.test(line)) {
      prevLineEndedInContinuation = true;
      prevLine = line;
      continue
    } else if (lines.length > i + 1 && /^\s*[+\-)\]}]/.test(lines[i + 1])) {
      prevLineEndedInContinuation = true;
      prevLine = line;
      continue
    }

    const keyword = keywordRegEx.exec(line);
    if (keyword) {
      name = keyword[0];
      expression = line.slice(name.length).trim();
      if (expression.length > 0 && /^``/.test(expression)) {
        [expression, i] = handleCSV(expression, lines, i);
      }
    } else if (isDraw && drawCommandRegEx.test(line)) {
      name = "svg";
      expression = line.indexOf(" ") === -1
        ? line + "(svg)"
        : line.replace(" ", "(svg, ") + ")";
      isStatement = true;
    } else {
      if (testForStatement(line)) {
        // We have an "=" assignment operator.
        const posEq = line.indexOf("=");
        name = line.slice(0, posEq - 1).trim();
        expression = line.slice(posEq + 1).trim();
        if (/^``/.test(expression)) { [expression, i] = handleCSV(expression, lines, i); }
        if (startSvgRegEx.test(expression)) { isDraw = true; }
        isStatement = true;
      } else {
        // TODO: We shouldn't get here. Write an error.
        return [errorOprnd("FUNC_LINE", functionName + ", line " + (i + 1)), i]
      }
    }

    let rpn = "";
    if (expression) {
      [, rpn] = parse(expression, decimalFormat, true);
    }
    const stype = isStatement ? "statement" : name;
    if (isStatement && /[,;]/.test(name)) {
      name = name.split(/[,;]/).map(e => e.trim());
    }
    funcObj.statements.push({ name: name, rpn: rpn, stype: stype });
    if (stype === "if" || stype === "while" || stype === "for") {
      stackOfCtrls.push({ type: stype, statementNum: funcObj.statements.length - 1 });
      if (stype === "for" && rpn.indexOf("j\u00a0") === 0) { return [errorOprnd("BAD_J")] }
    } else if (stype === "end") {
      if (stackOfCtrls.length === 0) {
        // Finished the current function.
        if (isDraw) {
          funcObj.statements.splice(-1, 0, { name: "return", rpn: "¿svg", stype: "return" });
        }
        return [funcObj, i]
      }
      const ctrl = stackOfCtrls[stackOfCtrls.length - 1];
      funcObj.statements[ctrl.statementNum].endOfBlock = funcObj.statements.length - 1;
      stackOfCtrls.pop();
    }

    // Reset for next statement
    isStatement = false;
    prevLineEndedInContinuation = false;
    prevLine = "";
    name = "";
    expression = "";
  }
  return [errorOprnd("END_MISS", functionName), 0]
};

const scanAssignment = (lines, decimalFormat, iStart) => {
  let prevLineEndedInContinuation = false;
  let str = "";
  let iEnd = iStart;
  for (let i = iStart; i < lines.length; i++) {
    const line = stripComment(lines[i]);
    if (line.length === 0) { continue }

    if (prevLineEndedInContinuation) {
      // Check if the previous character is a semi-colon just before a matrix literal closes.
      str = str.slice(-1) === ";" && "})]".indexOf(line.charAt(0)) > -1
        ? str.slice(0, -1).trim() + line
        : str + line;
    } else {
      str = line;
    }

    // Line continuation characters are: { ( [ , ; + -
    if (/[{([,;]$/.test(str)) {
      prevLineEndedInContinuation = true;
    } else if (lines.length > i + 1 && /^\s*[+\-)\]}]/.test(lines[i + 1])) {
      prevLineEndedInContinuation = true;
    } else {
      iEnd = i;
      break
    }
  }

  const posEquals = str.indexOf("=");
  let name = str.slice(0, posEquals).trim();
  if (/[,;]/.test(name)) {
    name = name.split(/[,;]/).map(e => e.trim());
  }
  const trailStr = str.slice(posEquals + 1).trim();
  const [value, unit, dtype, resultDisplay] = valueFromLiteral(trailStr, name, decimalFormat);
  const stmt = { name, value, unit, dtype, resultDisplay };
  improveQuantities(stmt, {});
  return [stmt, iEnd]
};

/*  prepareStatement.js
 *
 *  This module is called when: (1) an author submits a Hurmet calculation dialog box, or
 *  (2) when a new document is opened, or (3) when recalculate-all is called.
 *  Here we do some preparation in a calculation cell prior to calculation.
 *
 *  This module does NOT calculate the result of an expression. It stops just short of that.
 *  How do we choose where to draw the line between tasks done here and tasks done later?
 *  We do as much here as we can without knowing the values that other cells have assigned
 *  to variables. The goal is to minimize the amount of work done by each dependent cell
 *  when an author changes an assigned value.  Later, calculation updates will not have to
 *  repeat the work done in this module, so updates will be faster.
 *
 *  Variable inputStr contains the string that an author wrote into the dialog box.
 *
 *  From that entry this module will:
 *    1. Determine the name of the cell, as in "x" from "x = 12"
 *    2. Parse the entry string into TeX, to be passed later to KaTeX for rendering.
 *    3. If the input asks for a calculation:
 *       a. Parse the expression into an echo string (in TeX) with placeholders that will be
 *          filled in later with values when the calculation is done.
 *       b. Parse the expression into RPN (postfix) to be passed later to evaluate().
 *       c. Process the unit of measure, if any, of the result. Save it for later calculation.
 *    4. If an assigned value is static, not calculated, find its value.
 *    5. If a unit has been defined in a staic assignment, find the value in Hurmet base units.
 *    6. Append all the display strings together.
 *    7. Return the result. Hurmet will attach it to ProseMirror "attrs" of that node.
 */

const containsOperator = /[+\-×·*∘⌧/^%‰&√!¡|‖&=<>≟≠≤≥∈∉⋐∧∨⊻¬]|\xa0(function|modulo|\\atop|root|sum|\?{}|%|⎾⏋|⎿⏌|\[\]|\(\))\xa0/;
const mustDoCalculation = /^(``.+``|[$$£¥\u20A0-\u20CF]?(\?{1,2}|@{1,2}|%{1,2}|!{1,2})[^=!(?@%!{})]*)$/;
const assignDataFrameRegEx = /^[^=]+=\s*``/;
const currencyRegEx = /^[$£¥\u20A0-\u20CF]/;
const isValidIdentifier$2 = /^(?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′*$/;
const matrixOfNames = /^[([](?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′*[,;].+[)\]]$/;
const isKeyWord = /^(π|true|false|root|if|else|and|or|otherwise|modulo|for|while|break|return|raise)$/;

const shortcut = (str, decimalFormat) => {
  // No calculation in str. Parse it just for presentation.
  const tex = parse(str, decimalFormat);
  return { entry: str, tex, alt: str }
};

const prepareStatement = (inputStr, decimalFormat = "1,000,000.") => {
  let leadStr = "";
  let mainStr = "";
  let trailStr = "";
  let isCalc = false;
  let suppressResultDisplay = false;
  let displayResultOnly = false;
  let omitEcho = false;
  let mustAlign = false;
  let posOfFirstEquals = 0;
  let expression = "";
  let echo = "";
  let rpn = "";
  let resultDisplay = "";
  let name = "";
  let leadsWithCurrency = false;
  let value;
  let unit;
  let dtype;
  let str = "";

  const isDraw = drawRegEx.test(inputStr);
  if (functionRegEx.test(inputStr) || isDraw) {
    // This cell contains a custom function.
    let name = "";
    if (isDraw) {
      name = "draw";
    } else {
      const posFn = inputStr.indexOf("function");
      const posParen = inputStr.indexOf("(");
      name = inputStr.slice(posFn + 8, posParen).trim();
    }
    const module = scanModule(inputStr, decimalFormat);
    const isError = module.dtype && module.dtype === dt.ERROR;
    if (isError) {
      // eslint-disable-next-line no-alert
      window.alert(module.value);
    }
    const attrs = {
      entry: inputStr,
      name,
      value: (isError) ? module.value : module.value[name],
      // TODO: what to do with comma decimals?
      dtype: isError ? dt.ERROR : name === "draw" ? dt.DRAWING : dt.MODULE,
      error: isError
    };
    return attrs
  }

  str = inputStr;

  const isDataFrameAssigment = assignDataFrameRegEx.test(str);
  const posOfLastEquals = isDataFrameAssigment
    ? str.indexOf("=") + 1
    : str.lastIndexOf("=") + 1;

  if (posOfLastEquals > 1) {
    // input has form:  mainStr = trailStr
    mainStr = str.substring(0, posOfLastEquals - 1).replace(/ +$/, "");
    if (mainStr.length > 0 && /;\s*$/.test(mainStr)) {
      mustAlign = true;
      mainStr = mainStr.replace(/;\s*$/, "");
    }
    mainStr = mainStr.trim();
    trailStr = str.substring(posOfLastEquals).trim();

    if (mustDoCalculation.test(trailStr)) {
      // trailStr contains a ? or a @ or a % or a !. In other words,
      // input has form:  mainStr = something [?@%!] something
      // The [?@%!] signals that the author wants a calculation done.
      isCalc = true;

      // A ! tells us to calculate and save the result, but to NOT display the result.
      suppressResultDisplay = trailStr.indexOf("!") > -1;

      // A @ tells us to display only the result.
      displayResultOnly = trailStr.indexOf("@") > -1;

      omitEcho = trailStr.indexOf("%") > -1;

      posOfFirstEquals = mainStr.indexOf("=") + 1;
      if (posOfFirstEquals) {
        // input has form:  leadStr = something = trailStr
        leadStr = mainStr.slice(0, posOfFirstEquals - 1).trim();

        // Input has form:  name = expression = trailStr, or
        //                  name1, name2, = expression = trailStr
        expression = mainStr.substring(posOfFirstEquals).trim();
        if (matrixOfNames.test(leadStr)) { leadStr = leadStr.slice(1, -1).trim(); }
        if (/[,;]/.test(leadStr)) {
          const potentialIdentifiers = leadStr.split(/[,;]/);
          for (let i = 0; i < potentialIdentifiers.length; i++) {
            const candidate = potentialIdentifiers[i].trim();
            if (isKeyWord.test(candidate) || !isValidIdentifier$2.test(candidate)) {
              // leadStr is not a list of valid identifiers.
              // So this isn't a valid calculation statement. Let's finish early.
              return shortcut(str, decimalFormat)
            }
          }
          // multiple assignment.
          name = potentialIdentifiers.map(e => e.trim());

        } else {
          if (isValidIdentifier$2.test(leadStr) && !isKeyWord.test(leadStr)) {
            name = leadStr;
          } else {
            // The "=" sign is inside an expression. There is no lead identifier.
            // This statement does not assign a value to a variable. But it may do a calc.
            // input has form:  expression = trailStr
            expression = mainStr;
          }
        }
      } else {
        // This calculation string contains only one "=" character.
        // input has form:  expression = trailStr
        expression = mainStr;
      }
    } else if (isDataFrameAssigment) {
      name = mainStr;
      expression = trailStr;
    } else  if (isValidIdentifier$2.test(mainStr) && !isKeyWord.test(mainStr)) {
      // No calculation display selector is present,
      // but there is one "=" and a valid idendtifier.
      // It may be an assignment statement.
      // input has form:  name = trailStr
      name = mainStr;
      if (trailStr === "") {
        const tex = parse(str, decimalFormat);
        return { entry: str, tex, alt: str }
      }
    } else {
      // input has form:  mainStr = trailStr.
      // It almost works as an assignment statment, but mainStr is not a valid identifier.
      // So we'll finish early.
      return shortcut(str, decimalFormat)
    }
  } else {
    // str contains no "=" character. Let's fnish early.
    return shortcut(str, decimalFormat)
  }

  if (expression.length > 0) {
    // The author may want a calculaltion done on the expression.
    if (/^\s*fetch\(/.test(expression)) {
      // fetch() functions are handled in updateCalculations.js, not here.
      // It's easier from there to send a fetch() callback to a ProseMirror transaction.
      echo = "";

    } else {
      // Parse the expression. Stop short of doing the calculation.
      [echo, rpn] = parse(expression, decimalFormat, true);

      // Shoulld we display an echo of the expression, with values shown for each variable?
      if (suppressResultDisplay || displayResultOnly || echo.indexOf("〖") === -1
          || /\u00a0for\u00a0/.test(rpn)) {
        // No.
        echo = "";
      } else if (omitEcho) {
        echo = "";
      } else {
        // The expression calls a variable.
        // If it also contains an operator or a function, then we need to show the echo.
        if (containsOperator.test("\xa0" + rpn + "\xa0")) {
          echo = "{\\color{#0000ff}" + echo + "}";
        } else {
          echo = "";
        }
      }
    }
  }

  // Now let's turn our attention from the expression to the trailStr.
  if (currencyRegEx.test(trailStr)) {
    leadsWithCurrency = true;
    unit = trailStr.charAt(0);
  }

  if (isCalc) {
    // trailStr contains a display selector.
    value = null;

    if (!leadsWithCurrency) {
      // Check for a unit, even if it isn't a unit-aware calculation
      unit = trailStr.replace(/[?@%!']/g, "").trim();
    }

    if (suppressResultDisplay) {
      resultDisplay = trailStr;
    } else {
      if (unit) {
        resultDisplay = trailStr.trim().replace(/([^ ?!@%]+)$/, "'" + "$1" + "'");
        resultDisplay = parse(resultDisplay, decimalFormat).replace(/\\%/g, "%").replace("@ @", "@@");
      } else {
        resultDisplay = parse(trailStr, decimalFormat).replace(/\\%/g, "%").replace("@ @", "@@");
      }
      resultDisplay = resultDisplay.replace(/\\text\{(\?\??|%%?)\}/, "$1");
      resultDisplay = resultDisplay.replace(/([?%]) ([?%])/, "$1" + "$2");
    }

  } else {
    // trailStr may be a static value in an assignment statement.
    // Check if trailStr is a valid literal.
    [value, unit, dtype, resultDisplay] = valueFromLiteral(trailStr, name, decimalFormat);

    if (dtype === dt.ERROR) { return shortcut(str, decimalFormat) }
    rpn = "";
  }

  // Assemble the equation to display
  let eqn = "";
  let altEqn = "";
  if (!displayResultOnly) {
    eqn = parse(mainStr, decimalFormat);
    if (mustAlign) {
      eqn = "\\begin{aligned}" + eqn;
      const pos = eqn.indexOf("=");
      eqn = eqn.slice(0, pos) + "&" + eqn.slice(pos);
    }
    const alignChar = mustAlign ? "\\\\ &" : "";
    altEqn = mainStr;
    if (echo.length > 0 && !omitEcho) {
      eqn += ` ${alignChar}= ` + echo;
    }
    if (!suppressResultDisplay) {
      eqn += " " + (mustAlign ? "\\\\&" : "") + "= " + resultDisplay;
      altEqn += " = " + trailStr;
    }
    if (mustAlign) { eqn += "\\end{aligned}"; }
  }

  // Populate the object to be returned.
  // It will eventually be attached to ProseMirror schema attrs, so call it "attrs".
  const attrs = {
    entry: str,
    template: eqn,
    altTemplate: altEqn,
    resultdisplay: resultDisplay,
    dtype: dtype,
    error: false
  };

  if (name) { attrs.name = name; }
  if (isCalc) {
    attrs.resulttemplate = resultDisplay;
    attrs.altresulttemplate = trailStr;
  } else {
    attrs.tex = eqn;
    attrs.alt = altEqn;
  }
  if (rpn) { attrs.rpn = rpn; }
  if (value) { attrs.value = value; }
  if (unit) {
    if (Array.isArray(unit)) {
      attrs.expos = unit;
    } else {
      attrs.unit = unit;
    }
  }

  return attrs
};

/*
 *  This module mostly organizes one or two passes through the data structure of a Hurmet
 *  document, calling for a calculation to be done on each Hurmet calculation cell.
 *  If you are looking for the calculation itself, look at evaluate.js.
 *
 *  To be more precise, this module is called:
 *    1. When an author submits one calculation cell, or
 *    2. When a new Hurmet.app instance has opened (from index.js), or
 *    3. When a user has opened a new file         (from openFile.js), or
 *    4. When a recalculate-all has been called, possibly after a paste. (from menu.js)
 *
 *  Case 1 calculates the submitted cell and all dependent calculation cells.
 *  Cases 2 thru 4 re-calculate the entire document. I.e., isCalcAll is set to true.
 *  After calculation is complete, we send the results to ProseMirror to be
 *  rendered in the document.
 *
 *   This module's main exported function is updateCalculations(…)
 */

/*
* Note 1: state.selection shenanigans
*
* Before creating a ProseMirror (PM) transaction, this module first changes `state.selection`.
* That is to say, I change the PM state without running that change thru a PM transaction.
* PM docs advise against that, so I want to explain why I do so.
*
* For Undo purposes, a calculation should be atomic.
* An Undo of a calculation should return the doc to the condition before the
* calculation cell was edited. That will feel natural to people accustomed to Excel.
* When a calculation is submitted, Hurmet creates a single PM transaction and into it,
* Hurmet collects all the changes that the calculation makes to the original cell and
* also all the changes to dependent cells.
* When a user submits a calculation, the cell is open, so a PM Undo would ordinarily return
* the state to a condition that once again has the cell open.
*
* But now consider a user who wants to Undo twice. The first Undo retreats to a condition in
* which a cell is open. The user thinks a second Undo will change the PM document. But no!
* Because the cell is open, the CodeMirror plain text editor is active and the Undo is captured
* by CodeMirror. An Undo affects CodeMirror but not the outer document. It's very confusing!
* So the Undo should return to a condition in which the cell is closed. That's why I change
* the PM state.selection object _before_ I create the PM transaction. I don't want an Undo to
* open that cell and so I don't want the Undo to finish with the selection point inside the
* cell. Before creating the transaction, I move the selection point to just after the cell.
*/

const fetchRegEx = /^(?:[A-Za-zıȷ\u0391-\u03C9\u03D5\u210B\u210F\u2110\u2112\u2113\u211B\u212C\u2130\u2131\u2133]|(?:\uD835[\uDC00-\udc33\udc9c-\udcb5]))[A-Za-z0-9_\u0391-\u03C9\u03D5\u0300-\u0308\u030A\u030C\u0332\u20d0\u20d1\u20d6\u20d7\u20e1]*′* *= *(?:fetch|import)\(/;
const importRegEx = /^[^=]+= *import/;
const fileErrorRegEx = /^Error while reading file. Status Code: \d*$/;
const textRegEx = /\\text{[^}]+}/;

const urlFromEntry = entry => {
  // Get the URL from the entry input string.
  const str = entry.replace(/^[^()]+\("?/, "");
  return str.replace(/"?\).*$/, "").trim()
};

// Helper function.
const processFetchedString = (entry, text, hurmetVars, decimalFormat) => {
  const attrs = Object.create(null);
  attrs.entry = entry;
  attrs.name = entry.replace(/=.+$/, "").trim();
  let str = parse(entry.replace(/\s*=\s*[$$£¥\u20A0-\u20CF]?(?:!{1,2}).*$/, ""), decimalFormat);
  const url = urlFromEntry(entry);
  if (/\.(?:csv|txt)$/.test(url)) {
    // Shorten the URL.
    const fileName = url.replace(/.+\//, "");
    const match = textRegEx.exec(str);
    str = str.slice(0, match.index) + "\\text{" + addTextEscapes(fileName) + "})";
  }
  attrs.tex = str;
  attrs.alt = entry;
  if (text === "File not found." || fileErrorRegEx.test(text)) {
    attrs.dtype = dt.ERROR;
    attrs.tex += ` = \\red{\\text{${text}}}`;
    attrs.alt = " = " + text;
    attrs.value = null;
    return attrs
  }
  const data = importRegEx.test(entry)
    ? scanModule(text, decimalFormat)               // import code
    : DataFrame.dataFrameFromCSV(text, hurmetVars);  // fetch data

  // Append the data to attrs
  attrs.value = data.value;
  attrs.dtype = data.dtype;
  attrs.unit = data.unit;
  attrs.isFetch = true;
  if (data.dtype === dt.MODULE && /^importedParameters *=/.test(entry)) {
    // Assign to multiple variables, not one namespace.
    let nameTex = "\\begin{matrix}";
    let i = 0;
    Object.entries(data.value).forEach(([key, value]) => {
      hurmetVars[key] =  value;
      nameTex += parse(value.name) + " & ";
      i += 1;
      if (i === 5) {
        nameTex = nameTex.slice(0, -1) + "\\\\ ";
        i = 0;
      }
    });
    nameTex = nameTex.slice(0, (i === 0 ? -2 : -1)) + "\\end{matrix}";
    attrs.tex = attrs.tex.replace("\\mathrm{importedParameters}", nameTex);
  }
  return attrs
};

const workAsync = (
  view,
  calcNodeSchema,
  isCalcAll,
  nodeAttrs,
  curPos,
  hurmetVars,
  urls,
  fetchPositions
) => {

  // Here we fetch the remote data.
  const doc = view.state.doc;
  const inDraftMode = doc.attrs.inDraftMode;
  const decimalFormat = doc.attrs.decimalFormat;

  Promise.all(
    urls.map(url => fetch(url, {
      method: "GET",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      mode: "cors"
    }))
  ).then(fetchResponses => {
    // The fetch promises have resolved. Now we extract their text.
    return Promise.all(fetchResponses.map(r => {
      if (r.status !== 200 && r.status !== 0) {
        return r.status === 404
          ? 'File not found.'
          : 'Error while reading file. Status Code: ' + r.status
      }
      return r.text()
    }))
  }).then((texts) => {
    // At this point, we have the text of each Hurmet fetch and import.
    // Create a ProseMirror transacation.
    // Each node update below will be one step in the transaction.
    const state = view.state;
    if (state.selection.to === curPos + 1) {
      // See Note 1 above for an explanation of the state.selection shenanigans.
      state.selection = state.selection.constructor.near(state.doc.resolve(curPos + 1));
    }
    const tr = state.tr;

    // Load in the data from the fetch statements
    for (let i = 0; i < texts.length; i++) {
      const pos = fetchPositions[i];
      const entry = isCalcAll
        ? doc.nodeAt(pos).attrs.entry
        : nodeAttrs.entry;
      const attrs = processFetchedString(entry, texts[i], hurmetVars, decimalFormat);
      attrs.inDraftMode = inDraftMode;
      tr.replaceWith(pos, pos + 1, calcNodeSchema.createAndFill(attrs));
      if (attrs.name) {
        insertOneHurmetVar(hurmetVars, attrs, decimalFormat);
      }
    }
    // There. Fetches are done and are loaded into the document.
    // Now proceed to the rest of the work.
    try {
      proceedAfterFetch(view, calcNodeSchema, isCalcAll, nodeAttrs,
                        curPos, hurmetVars, tr);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      const pos = nodeAttrs.template.indexOf(nodeAttrs.resultdisplay);
      nodeAttrs.tex = nodeAttrs.template.slice(0, pos) + "\\text{" + err + "}";
      tr.replaceWith(curPos, curPos + 1, calcNodeSchema.createAndFill(nodeAttrs));
      tr.setSelection(view.state.selection.constructor.near(tr.doc.resolve(curPos + 1)));
      view.dispatch(tr);
      view.focus();
    }
  });
};

const proceedAfterFetch = (
  view,
  calcNodeSchema,
  isCalcAll,
  nodeAttrs,
  curPos,
  hurmetVars,
  tr
) => {
  // This function happens either
  //   1. After remote, fetched data has been processed, or
  //   2. After we know that no fetch statements need be processed.
  const doc = view.state.doc;
  const decimalFormat = doc.attrs.decimalFormat;

  if (!isCalcAll && (nodeAttrs.name || nodeAttrs.rpn ||
    (nodeAttrs.dtype && nodeAttrs.dtype === dt.DRAWING))) {
    // Load hurmetVars with values from earlier in the document.
    doc.nodesBetween(0, curPos, function(node) {
      if (node.type.name === "calculation") {
        const attrs = node.attrs;
        if (attrs.name) {
          if (attrs.name === "importedParameters") {
            Object.entries(attrs.value).forEach(([key, value]) => {
              hurmetVars[key] =  value;
            });
          } else {
            insertOneHurmetVar(hurmetVars, attrs, decimalFormat);
          }
        }
      }
    });

    // Hoist any user-defined functions located below the selection.
    doc.nodesBetween(curPos + 1, doc.content.size, function(node, pos) {
      if (node.type.name === "calculation" && node.attrs.dtype === dt.MODULE) {
        insertOneHurmetVar(hurmetVars, node.attrs, decimalFormat);
      }
    });

    // Calculate the current node.
    if (!fetchRegEx.test(nodeAttrs.entry)) {
      // This is the typical calculation statement. We'll evalutate it.
      let attrs = clone(nodeAttrs); // prepareStatement was already run in mathprompt.js.
      // The mathPrompt dialog box did not have accesss to hurmetVars, so it
      // did not do unit conversions on the result template. Do that first.
      improveQuantities(attrs, hurmetVars);
      // Now proceed to do the calculation of the cell.
      if (attrs.rpn || (nodeAttrs.dtype && nodeAttrs.dtype === dt.DRAWING)) {
        attrs = attrs.dtype && attrs.dtype === dt.DRAWING
          ? evaluateDrawing(attrs, hurmetVars, decimalFormat)
          : evaluate(attrs, hurmetVars, decimalFormat);
      }
      if (attrs.name) { insertOneHurmetVar(hurmetVars, attrs, decimalFormat); }
      attrs.displayMode = nodeAttrs.displayMode;
      tr.replaceWith(curPos, curPos + 1, calcNodeSchema.createAndFill(attrs));
    }
  }

  // Finally, update calculations after startPos.
  const startPos = isCalcAll ? 0 : (curPos + 1);
  doc.nodesBetween(startPos, doc.content.size, function(node, pos) {
    if (node.type.name === "calculation") {
      const mustCalc = isCalcAll ? !fetchRegEx.test(node.attrs.entry) : !node.attrs.isFetch;
      if (mustCalc) {
        const entry = node.attrs.entry;
        let attrs = isCalcAll
          ? prepareStatement(entry, decimalFormat)
          : clone(node.attrs);
        attrs.displayMode = node.attrs.displayMode;
        const mustRedraw = attrs.dtype && attrs.dtype === dt.DRAWING &&
          (attrs.rpn || (attrs.value.parameters.length > 0 || isCalcAll));
        if (isCalcAll || attrs.rpn || mustRedraw || (attrs.name && !(hurmetVars[attrs.name] &&
          hurmetVars[attrs.name].isFetch))) {
          if (isCalcAll) { improveQuantities(attrs, hurmetVars); }
          if (attrs.rpn || mustRedraw) {
            attrs = attrs.rpn // attrs.dtype && attrs.dtype === dt.DRAWING
              ? evaluate(attrs, hurmetVars, decimalFormat)
              : evaluateDrawing(attrs, hurmetVars, decimalFormat);
          }
          if (attrs.name) { insertOneHurmetVar(hurmetVars, attrs, decimalFormat); }
          if (isCalcAll || attrs.rpn || mustRedraw) {
            tr.replaceWith(pos, pos + 1, calcNodeSchema.createAndFill(attrs));
          }
        }
      } else if (node.attrs.name && !(isCalcAll && node.attrs.isFetch)) {
        if (node.attrs.name) {
          if (node.attrs.name === "importedParameters") {
            Object.entries(node.attrs.value).forEach(([key, value]) => {
              hurmetVars[key] =  value;
            });
          } else {
            insertOneHurmetVar(hurmetVars, node.attrs, decimalFormat);
          }
        }
      }
    }
  });

  // All the steps are now loaded into the transaction.
  // Dispatch the transaction to ProseMirror, which will re-render the document.
  if (!isCalcAll) {
    tr.setSelection(view.state.selection.constructor.near(tr.doc.resolve(curPos + 1)));
  }
  view.dispatch(tr);
  view.focus();
};

function updateCalculations(
  view,
  calcNodeSchema,
  isCalcAll = false,
  nodeAttrs,
  curPos
) {
  const doc = view.state.doc;

  if (!(isCalcAll || nodeAttrs.name || nodeAttrs.rpn ||
      (nodeAttrs.dtype && nodeAttrs.dtype === dt.DRAWING))) {
    // No calculation is required. Just render the node and get out.
    const state = view.state;
    if (state.selection.to === curPos + 1) {
      // See Note 1 above for an explanation of the state.selection shenanigans.
      state.selection = state.selection.constructor.near(state.doc.resolve(curPos + 1));
    }
    const tr = state.tr;
    try {
      tr.replaceWith(curPos, curPos + 1, calcNodeSchema.createAndFill(nodeAttrs));
    } catch (err) {
      // nada
    } finally {
      view.dispatch(tr);
      view.focus();
    }
    return
  }

  // Create an object in which we'll hold variable values.
  const hurmetVars = Object.create(null);
  hurmetVars.format = { value: "h15" }; // default rounding format

  // Get an array of all the URLs called by fetch statements.
  const urls = [];
  const fetchPositions = [];
  if (!isCalcAll) {
    // The author has submitted a single calculation cell.
    const entry = nodeAttrs.entry;
    if (fetchRegEx.test(entry)) {
      urls.push(urlFromEntry(entry));
      fetchPositions.push(curPos);
    }
  } else {
    // We're updating the entire document.
    doc.nodesBetween(0, doc.content.size, function(node, pos) {
      if (node.type.name === "calculation" && !node.attrs.value) {
        const entry = node.attrs.entry;
        if (fetchRegEx.test(entry)) {
          urls.push(urlFromEntry(entry));
          fetchPositions.push(pos);
        } else if (/^function /.test(entry)) {
          node.attrs = prepareStatement(entry, doc.attrs.decimalFormat);
          insertOneHurmetVar(hurmetVars, node.attrs, doc.attrs.decimalFormat);
        }
      } else if (node.attrs.isFetch || (node.attrs.dtype && node.attrs.dtype === dt.MODULE)) {
        insertOneHurmetVar(hurmetVars, node.attrs, doc.attrs.decimalFormat);
      }
    });
  }

  if (urls.length > 0) {
    // We have to fetch some remote data. Asynchronous work ahead.
    workAsync(view, calcNodeSchema, isCalcAll, nodeAttrs, curPos,
              hurmetVars, urls, fetchPositions);
  } else {
    // Skip the fetches and go directly to work that we can do synchronously.
    const state = view.state;
    if (state.selection.to === curPos + 1) {
      // See Note 1 above for an explanation of the state.selection shenanigans.
      state.selection = state.selection.constructor.near(state.doc.resolve(curPos + 1));
    }
    const tr = state.tr;
    try {
      proceedAfterFetch(view, calcNodeSchema, isCalcAll, nodeAttrs, curPos, hurmetVars, tr);
    } catch (err) {
      console.log(err); // eslint-disable-line no-console
      const pos = nodeAttrs.template.indexOf(nodeAttrs.resultdisplay);
      nodeAttrs.tex = nodeAttrs.template.slice(0, pos) + "\\text{" + err + "}";
      tr.replaceWith(curPos, curPos + 1, calcNodeSchema.createAndFill(nodeAttrs));
      tr.setSelection(view.state.selection.constructor.near(tr.doc.resolve(curPos + 1)));
      view.dispatch(tr);
      view.focus();
    }
  }
}

// This function is not used by the Hurmet.app page.
// It is provided for use by unit tests.
// If you are looking for the app's main calculation module, try evaluate.js.
const calculate = (
  entry,
  vars = {},
  inDraftMode = false,
  decimalFormat = "1,000,000."
) => {
  let attrs = prepareStatement(entry, decimalFormat);
  improveQuantities(attrs, vars);
  if (attrs.rpn) {
    attrs = evaluate(clone(attrs), vars, decimalFormat);
  } else if (attrs.dtype && attrs.dtype === dt.DRAWING) {
    attrs = evaluateDrawing(attrs, vars, decimalFormat);
  }
  if (attrs.name) {
    insertOneHurmetVar(vars, attrs);
  }
  return attrs.dtype && attrs.dtype === dt.DRAWING
   ? attrs
   : inDraftMode
   ? attrs.alt
   : attrs.tex
};

/*
 * This file bundles together and exposes the calculation parts of Hurmet.
 * I use Rollup to create a UMD module from this code.
 * That way, one file can expose the same functionality to (1) the Hurmet.app web page,
 * (2) the REPL in the reference manual, (3) the script that transpiles
 * the Hurmet reference manual from Markdown to HTML, and (4) unit testing.
 *
 * Some of Hurmet’s exported functions are valuable only to the Hurmet.app web page.
 * If you wish to use Hurmet’s math parsing and/or calculation abilities,
 * the two functions you want are:
 *   parse(entry: string, decimalFormat?: string)
 *   calculate(entry: string, vars?: Object, draftMode?: boolean, decimalFormat?: string)
 *
 *   parse() returns a TeX string.
 *   calculate() returns either a TeX string or a string in Hurmet calculation syntax.
 *
 * The parameters of those two function are:
 *   entry: The string that a user types into a calculation editing box.
 *   draftMode: Determines if result is in TeX or in Hurmet calculation syntax.
 *   decimalFormat: A string containing one of the options available in the Hurmet ● menu.
 *   vars: If you want to evaluate several statements, the variable "vars" holds variable data.
 *         Initialize it as: vars = {}
 *         Or, if you want to specify a rounding format, initialize it as:
 *             vars = { format: { value: "h3" } }
 *         vars is updated with new variable data each time calculate() is called.
 */

const hurmet = Object.freeze({
  dt,
  parse,
  calculate,
  autoCorrect,
  prepareStatement,
  improveQuantities,
  evaluate,
  scanModule,
  updateCalculations,
  Draw
});

/**
 * # hurmetMark.js
 *
 * Hurmet.app can export to its own flavor of Markdown.
 * This version of Markdown is stricter in some ways than CommonMark or
 * Gruber's original Markdown. So the parser can be considerably simplified.
 * md2ast() returns an AST that matches the memory structure  of a Hurmet.app document.
 *
 * ## Ways in which this syntax is more strict than Markdown.
 *
 * 1. Emphasis: _emphasis_ only. Asterisks do not create standard emphasis.
 * 2. Strong emphasis: **strong emphasis** only. Underlines do not create strong emphasis.
 * 3. Code blocks must be fenced by triple backticks.
 *    Indented text does not indicate a code block.
 * 4. A blank line must precede the beginning of a list, even a nested list.
 * 5. A hard line break is indicated when a line ends with "\". Double spaces do not count.
 * 6. "Shortcut" reference links [ref] are not recognized.
 *    Implicit reference links are recognized and are expanded, see below.
 *
 * ## Extensions
 *
 * 1. Hurmet inline calculation is delimited ¢…¢.
 *    Hurmet display calculation is fenced ¢¢\n … \n¢¢.
 * 2. LaTeX inline math is delimited $…$. $ and \\ are escaped \$ & \\\\.
 *    LaTeX display math is fenced  $$\n … \n$$.
 * 3. ~subscript~
 * 4. ~~strikethrough~~
 * 5. Pipe tables as per Github Flavored Markdown (GFM).
 * 6. Grid tables as per reStructuredText, with two exceptions:
 *    a. The top border contains ":" characters to indicate column justtification.
 *    b. Top & left borders contain "+" characters at border locations, even where
 *       a merged cell prevents a border from extending to the tables outer edge.
 * 7. Implicit reference links [title][] and implicit reference images ![alt][]
 *    ⋮
 *    [alt]: path
 *    Reference images can have captions and directives. Format is:
 *    ![alt text][ref]{caption}   or [alt][]{caption}
 *      ⋮
 *    [ref]: filepath
 *    {.class #id width=number}
 * 8. Table directives. They are placed on the line after the table. The format is:
 *    {.class #id width=num widths="num1 num2 …"}
 * 9. Lists that allow the user to pick list ordering.
 *      1. →  1. 2. 3.  etc.
 *      A. →  A. B. C.  etc. (future)
 *      a) →  (a) (b) (c)  etc. (future)
 * 10. Definition lists, per Pandoc.  (future)
 * 11. Blurbs set an attribute on a block element, as in Markua.
 *     Blurbs are denoted by a symbol in the left margin.
 *     Subsequent indented text blocks are children of the blurb.
 *     Blurb symbols:
 *       i> indented block
 *       C> Centered block
 *       H> print header element, <header>
 *       I> Information admonition (future)
 *       W> Warning admonition (future)
 *       T> Tip admonition (future)
 *       c> Comment admonition (future)
 * 12. [^1] is a reference to a footnote. (future)
 *     [^1]: The body of the footnote is deferred, similar to reference links.
 * 13. [#1] is a reference to a citation. (future)
 *     [#1]: The body of the citation is deferred, similar to reference links.
 * 14. Line blocks begin with "| ", as per Pandoc. (future)
 *
 * hurmetMark.js copyright (c) 2021, 2022 Ron Kok
 *
 * This file has been adapted (and heavily modified) from Simple-Markdown.
 * Simple-Markdown copyright (c) 2014-2019 Khan Academy & Aria Buckles.
 *
 * Portions of Simple-Markdown were adapted from marked.js copyright (c) 2011-2014
 * Christopher Jeffrey (https://github.com/chjj/).
 *
 * LICENSE (MIT):
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


const CR_NEWLINE_R$1 = /\r\n?/g;
const TAB_R$1 = /\t/g;
const FORMFEED_R$1 = /\f/g;
const CLASS_R$1 = /(?:^| )\.([a-z-]+)(?: |$)/;
const WIDTH_R$1 = /(?:^| )width="?([\d.a-z]+"?)(?: |$)/;
const COL_WIDTHS_R$1 = /(?:^| )colWidths="([^"]*)"/;
const ID_R$1 = /(?:^| )#([a-z-]+)(?: |$)/;

// Turn various whitespace into easy-to-process whitespace
const preprocess$1 = function(source) {
  return source.replace(CR_NEWLINE_R$1, "\n").replace(FORMFEED_R$1, "").replace(TAB_R$1, "    ");
};

// Creates a match function for an inline scoped element from a regex
const inlineRegex$1 = function(regex) {
  const match = function(source, state) {
    return state.inline ? regex.exec(source) : null
  };
  match.regex = regex;
  return match;
};

// Creates a match function for a block scoped element from a regex
const blockRegex$1 = function(regex) {
  const match = function(source, state) {
    return state.inline ? null : regex.exec(source)
  };
  match.regex = regex;
  return match;
};

// Creates a match function from a regex, ignoring block/inline scope
const anyScopeRegex$1 = function(regex) {
  const match = function(source, state) {
    return regex.exec(source);
  };
  match.regex = regex;
  return match;
};

const UNESCAPE_URL_R$1 = /\\([^0-9A-Za-z\s])/g;
const unescapeUrl$1 = function(rawUrlString) {
  return rawUrlString.replace(UNESCAPE_URL_R$1, "$1");
};

const parseList$1 = (str, state) => {
  const items = str.replace(LIST_BLOCK_END_R$1, "\n").match(LIST_ITEM_R$1);
  const isTight = state.inHtml && !/\n\n(?!$)/.test(str);
  const itemContent = items.map(function(item, i) {
    // We need to see how far indented this item is:
    const prefixCapture = LIST_ITEM_PREFIX_R$1.exec(item);
    const space = prefixCapture ? prefixCapture[0].length : 0;
    // And then we construct a regex to "unindent" the subsequent
    // lines of the items by that amount:
    const spaceRegex = new RegExp("^ {1," + space + "}", "gm");

    // Before processing the item, we need a couple things
    const content = item
      // remove indents on trailing lines:
      .replace(spaceRegex, "")
      // remove the bullet:
      .replace(LIST_ITEM_PREFIX_R$1, "");

    // backup our state for restoration afterwards. We're going to
    // want to set state._list to true, and state.inline depending
    // on our list's looseness.
    const oldStateInline = state.inline;
    const oldStateList = state._list;
    state._list = true;
    const oldStateTightness = state.isTight;
    state.isTight = isTight;

    // Parse the list item
    state.inline = isTight;
    const adjustedContent = content.replace(LIST_ITEM_END_R$1, "");
    const result = isTight
      ? { type: "list_item", content: parseInline$1(adjustedContent, state) }
      : { type: "list_item", content: parse$2(adjustedContent, state) };

    // Restore our state before returning
    state.inline = oldStateInline;
    state._list = oldStateList;
    state.isTight = oldStateTightness;
    return result;
  });

  return itemContent
};

const TABLES$1 = (function() {
  const TABLE_ROW_SEPARATOR_TRIM = /^ *\| *| *\| *$/g;
  const TABLE_RIGHT_ALIGN = /^[-=]+:$/;
  const TABLE_CENTER_ALIGN = /^:[-=]+:$/;

  const parseTableAlign = function(source) {
    // Inspect ":" characters to set column justification.
    // Return class names that specify center or right justification on specific columns.
    source = source.replace(TABLE_ROW_SEPARATOR_TRIM, "");
    const alignArr = source.trim().split(/[|+*]/);
    let alignStr = "";
    for (let i = 0; i < alignArr.length; i++) {
      alignStr += TABLE_CENTER_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}c`
        : (TABLE_RIGHT_ALIGN.test(alignArr[i])
        ? ` c${String(i + 1)}r`
        : "");
    }
    return alignStr.trim()
  };

  const tableDirectives = (directives, align) => {
    // Get CSS class, ID, and column widths, if any.
    if (!directives && align === "") { return ["", "", null] }
    const userDefClass = CLASS_R$1.exec(directives);
    let myClass = (userDefClass) ? userDefClass[1] : "";
    if (align.length > 0) { myClass += (myClass.length > 0 ? " " : "") + align; }
    const userDefId = ID_R$1.exec(directives);
    const myID = (userDefId) ? userDefId[1] : "";
    const colWidthMatch = COL_WIDTHS_R$1.exec(directives);
    const colWidths = (colWidthMatch) ? colWidthMatch[1].split(" ") : null;
    return [myClass, myID, colWidths]
  };

  const parsePipeTableRow = function(source, parse, state, colWidths, inHeader) {
    const prevInTable = state.inTable;
    state.inTable = true;
    const tableRow = parse(source.trim(), state);
    consolidate$1(tableRow);
    state.inTable = prevInTable;

    const row = {
      type: "table_row",
      content: []
    };
    let j = -1;
    tableRow.forEach(function(node, i) {
      if (node.type === "text") { node.text = node.text.trim(); }
      if (node.type === "tableSeparator") {
        if (i !== tableRow.length - 1) {  // Filter out the row's  last table separator
          // Create a new cell
          j += 1;
          row.content.push({
            "type": inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": 1,
              "rowspan": 1,
              "colwidth": (colWidths) ? [Number(colWidths[j])] : null,
              "background": null
            },
            content: (state.inHtml ? [] : [{ "type": "paragraph", "content": [] }])
          });
        }
      } else if (state.inHtml) {
        // For direct to HTML, write the inline contents directly into the <td> element.
        // row   cell    content      text
        row.content[j].content.push(node);
      } else {
        // Hurmet.app table cells always contain a paragraph.
        // row   cell  paragraph  content      text
        row.content[j].content[0].content.push(node);
      }
    });

    return row;
  };

  const parsePipeTable = function() {
    return function(capture, state) {
      state.inline = true;
      const align = parseTableAlign(capture[2]);
      const [myClass, myID, colWidths] = tableDirectives(capture[4], align);
      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      table.content.push(parsePipeTableRow(capture[1], parse$2, state, colWidths, true));
      const tableBody = capture[3].trim().split("\n");
      tableBody.forEach(row => {
        table.content.push(parsePipeTableRow(row, parse$2, state, colWidths, false));
      });
      state.inline = false;
      return table
    };
  };

  const headerRegEx = /^\+:?=/;

  const parseGridTable = function() {
    return function(capture, state) {
      const topBorder = capture[2];
      const align = parseTableAlign(topBorder.slice(1));
      const [myClass, myID, colWidths] = tableDirectives(capture[3], align);
      const lines = capture[1].slice(0, -1).split("\n");

      // Does the grid table contain a line separating header from table body?
      let headerExists = false;
      let headerSepLine = lines.length + 10;
      for (let i = 0; i < lines.length; i++) {
        if (headerRegEx.test(lines[i])) {
          headerExists = true;
          headerSepLine = i;
          break
        }
      }

      // Read the top & left borders to find the locations of the cell corners.
      const xCorners = [0];
      for (let j = 1; j < topBorder.length; j++) {
        const ch = topBorder.charAt(j);
        // A "+" character indicates a column border.
        if (ch === "+") { xCorners.push(j); }
      }
      const yCorners = [0];
      for (let i = 1; i < lines.length; i++) {
        const ch = lines[i].charAt(0);
        if (ch === "+") { yCorners.push(i); }
      }

      const numCols = xCorners.length - 1;
      const numRows = yCorners.length - 1;
      const gridTable = [];

      // Create default rows and cells. They may be merged later.
      for (let i = 0; i < numRows; i++) {
        const row = new Array(numCols);
        for (let j = 0; j < numCols; j++) { row[j] = { rowspan: 1 }; }
        gridTable.push(row);
      }

      for (let i = 0; i < numRows; i++) {
        const row = gridTable[i];
        // Determine the actual rowspan and colspan of each cell.
        for (let j = 0; j < numCols; j++) {
          const cell = row[j];
          if (cell.rowspan === 0) { continue }
          cell.colspan = 1;
          const lastTextRow = lines[yCorners[i + 1] - 1];
          for (let k = j + 1; k < xCorners.length; k++) {
            if (lastTextRow.charAt(xCorners[k]) === "|") { break }
            cell.colspan += 1;
            row[k].rowspan = 0;
          }
          for (let k = i + 1; k < yCorners.length; k++) {
            const ch = lines[yCorners[k]].charAt(xCorners[j] + 1);
            if (ch === "-" || ch === "=") { break }
            cell.rowspan += 1;
            for (let jj = 0; jj < cell.colspan; jj++) {
              gridTable[k][j + jj].rowspan = 0;
            }
          }
          // Now that we know the cell extents, get the cell contents.
          const xStart = xCorners[j] + 2;
          const xEnd = xCorners[j + cell.colspan] - 1;
          const yStart = yCorners[i] + 1;
          const yEnd = yCorners[i + cell.rowspan];
          let str = "";
          for (let ii = yStart; ii < yEnd; ii++) {
            str += lines[ii].slice(xStart, xEnd).replace(/ +$/, "") + "\n";
          }
          cell.blob = str.slice(0, -1).replace(/^\n+/, "");

          cell.inHeader = (headerExists && yStart < headerSepLine);

          if (colWidths) {
            // Set an attribute used by ProseMirror.
            let cellWidth = 0;
            for (let k = 0; k < cell.colspan; k++) {
              cellWidth += Number(colWidths[j + k]);
            }
            cell.width = cellWidth;
          }
        }
      }

      const table = {
        type: "table",
        attrs: {},
        content: []
      };
      if (myID) { table.attrs.id = myID; }
      if (myClass) { table.attrs.class = myClass; }
      for (let i = 0; i < numRows; i++) {
        table.content.push({ type: "table_row", content: [] } );
        for (let j = 0; j < numCols; j++) {
          if (gridTable[i][j].rowspan === 0) { continue }
          const cell = gridTable[i][j];
          state.inline = false;
          let content = state.inHtml && cell.blob.indexOf("```") === -1 && !/\n\n/.test(cell.blob.replace(/\n+$/g, ""))
            ? parseInline$1(cell.blob, state) // Write inline content directly into each <td>
            : parse$2(cell.blob, state);       // Hurmet.app has a paragraph in each cell.
          if (content.length === 1 && content[0].type === "null") {
            content = state.inHtml
              ? [{ type: "text", text: "" }]
              : [{ type: "paragraph", content: [] }];
          }
          table.content[i].content.push({
            "type": cell.inHeader ? "table_header" : "table_cell",
            "attrs": {
              "colspan": cell.colspan,
              "rowspan": cell.rowspan,
              "colwidth": (colWidths) ? [cell.width] : null,
              "background": null
            },
            content: content
          });
        }
      }
      state.inline = false;
      return table
    };
  };

  return {
    parsePipeTable: parsePipeTable(),
    PIPE_TABLE_REGEX: /^(\|.+)\n\|([-:]+[-| :]*)\n((?:\|.*(?:\n|$))*)(?:\{([^\n}]+)\}\n)?\n*/,
    parseGridTable: parseGridTable(),
    GRID_TABLE_REGEX: /^((\+(?:[-:=]+\+)+)\n(?:[+|][^\n]+[+|]\n)+)(?:\{([^\n}]+)\}\n)?\n*/
  };
})();

const LINK_INSIDE$1 = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*";
const LINK_HREF_AND_TITLE$1 =
  "\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*";

const linkIndex$1 = marks => {
  for (let i = 0; i < marks.length; i++) {
    if (marks[i].type === "link") { return i }
  }
};

const parseRef$1 = function(capture, state, refNode) {
  let ref = capture[2] ? capture[2] : capture[1];
  ref = ref.replace(/\s+/g, " ");

  // We store information about previously seen defs on
  // state._defs (_ to deconflict with client-defined
  // state). If the def for this reflink/refimage has
  // already been seen, we can use its target/source
  // and title here:
  if (state._defs && state._defs[ref]) {
    const def = state._defs[ref];
    if (refNode.type === "image") {
      refNode.attrs.src = def.target;
      refNode.attrs.width = null;
    } else {
      // refNode is a link
      refNode.attrs.href = def.target;
    }
  }

  // In case we haven't seen our def yet (or if someone
  // overwrites that def later on), we add this node
  // to the list of ref nodes for that def. Then, when
  // we find the def, we can modify this link/image AST
  // node :).
  state._refs = state._refs || {};
  state._refs[ref] = state._refs[ref] || [];
  state._refs[ref].push(refNode);

  return refNode;
};

const parseTextMark$1 = (capture, state, mark) => {
  const text = parseInline$1(capture, state);
  if (Array.isArray(text) && text.length === 0) { return text }
  consolidate$1(text);
  for (const range of text) {
    if (range.marks) {
      range.marks.push({ type: mark });
    } else {
      range.marks = [{ type: mark }];
    }
  }
  return text
};

const BLOCK_HTML$1 = /^ *(?:<(head|h[1-6]|p|pre|script|style|table)[\s>][\s\S]*?(?:<\/\1>[^\n]*\n)|<!--[^>]+-->[^\n]*\n|<\/?(?:body|details|(div|input|label)(?: [^>]+)?|!DOCTYPE[a-z ]*|html[a-z ="]*|br|dl(?: class="[a-z-]+")?|li|main[a-z\- ="]*|nav|ol|ul(?: [^>]+)?)\/?>[^\n]*?(?:\n|$))/;
const divType$1 = { C: "centered_div", H: "header", "i": "indented_div" };

// Rules must be applied in a specific order, so use a Map instead of an object.
const rules$1 = new Map();
rules$1.set("html", {
  isLeaf: true,
  match: blockRegex$1(BLOCK_HTML$1),
  parse: function(capture, state) {
    if (!state.inHtml) { return null }
    return { type: "html", text: capture[0] }
  }
});
rules$1.set("heading", {
  isLeaf: false,
  match: blockRegex$1(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      attrs: { level: capture[1].length },
      content: parseInline$1(capture[2].trim(), state)
    };
  }
});
rules$1.set("dt", {  // description term
  isLeaf: false,
  match: blockRegex$1(/^(([^\n]*)\n)(?=<dd>|\n:)/),
  parse: function(capture, state) {
    return { content: parseInline$1(capture[2].trim(), state) }
  }
});
rules$1.set("horizontal_rule", {
  isLeaf: true,
  match: blockRegex$1(/^( *[-*_]){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return { type: "horizontal_rule" };
  }
});
rules$1.set("lheading", {
  isLeaf: false,
  match: blockRegex$1(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
  parse: function(capture, parse, state) {
    return {
      type: "heading",
      level: capture[2] === '=' ? 1 : 2,
      content: parseInline$1(parse, capture[1])
    };
  }
});
rules$1.set("fence", {
  isLeaf: true,
  match: blockRegex$1(/^(`{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
  parse: function(capture, state) {
    return {
      type: "code_block",
//      lang: capture[2] || undefined,
      content: [{ type: "text", text: capture[3] }]
    };
  }
});
rules$1.set("blockquote", {
  isLeaf: false,
  match: blockRegex$1(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
  parse: function(capture, state) {
    const content = capture[0].replace(/^ *> ?/gm, "");
    return { content: parse$2(content, state) };
  }
});
rules$1.set("ordered_list", {
  isLeaf: false,
  match: blockRegex$1(/^( {0,3})(\d{1,9}\.) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:\d{1,9}\.) )\n*|\s*$)/),
  parse: function(capture, state) {
    const start = Number(capture[2].trim());
    return { attrs: { order: start }, content: parseList$1(capture[0], state, capture[1]) }
  }
});
rules$1.set("bullet_list", {
  isLeaf: false,
  match: blockRegex$1(/^( {0,3})([*+-]) [\s\S]+?(?:\n{2,}(?! )(?!\1(?:[*+-]) )\n*|\s*$)/),
  parse: function(capture, state) {
    return { content: parseList$1(capture[0], state, capture[1]) }
  }
});
rules$1.set("dd", {  // description details
  isLeaf: false,
  match: blockRegex$1(/^:( +)[\s\S]+?(?:\n{2,}(?! |:)(?!\1)\n*|\s*$)/),
  parse: function(capture, state) {
    let div = " " + capture[0].slice(1);
    const indent = 1 + capture[1].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { content: parse$2(div, state) };
  }
});
rules$1.set("special_div", {
  isLeaf: false,
  match: blockRegex$1(/^(C|H|i)>( {1,})[\s\S]+?(?:\n{2,}(?! {2,2}\2)\n*|\s*$)/),
  parse: function(capture, state) {
    const type = divType$1[capture[1]];
    let div = "  " + capture[0].slice(2);
    const indent = 2 + capture[2].length;
    const spaceRegex = new RegExp("^ {" + indent + "," + indent + "}", "gm");
    div = div.replace(spaceRegex, ""); // remove indents on trailing lines:
    return { type, content: parse$2(div, state) };
  }
});
rules$1.set("def", {
  // TODO(aria): This will match without a blank line before the next
  // block element, which is inconsistent with most of the rest of
  // simple-markdown.
  isLeaf: true,
  match: blockRegex$1(/^\[([^\]]+)\]: *<?([^\n>]*)>? *\n(?:\{([^\n}]*)\}\n)?/),
  parse: function(capture, state) {
    const def = capture[1].replace(/\s+/g, " ");
    const target = capture[2];
    const directives = capture[3] || "";
    const attrs = {};

    // Look for previous links/images using this def
    // If any links/images using this def have already been declared,
    // they will have added themselves to the state._refs[def] list
    // (_ to deconflict with client-defined state). We look through
    // that list of reflinks for this def, and modify those AST nodes
    // with our newly found information now.
    // Sorry :(.
    if (state._refs && state._refs[def]) {
      // `refNode` can be a link or an image
      state._refs[def].forEach(function(refNode) {
        if (refNode.type === "image") {
          refNode.attrs.src = target;
          if (directives) {
            const matchClass = CLASS_R$1.exec(directives);
            if (matchClass) {
              refNode.attrs.class = matchClass[1];
              attrs.class = matchClass[1];
            }
            const matchWidth = WIDTH_R$1.exec(directives);
            if (matchWidth) {
              refNode.attrs.width = matchWidth[1];
              attrs.width = matchWidth[1];
            }
            const matchID = ID_R$1.exec(directives);
            if (matchID) {
              refNode.attrs.id = matchID[1];
              attrs.id = matchID[1];
            }
          }
        } else {
          refNode.attrs.href = target;
        }
      });
    }

    // Add this def to our map of defs for any future links/images
    // In case we haven't found any or all of the refs referring to
    // this def yet, we add our def to the table of known defs, so
    // that future reflinks can modify themselves appropriately with
    // this information.
    state._defs = state._defs || {};
    state._defs[def] = { target, attrs };

    // return the relevant parsed information
    // for debugging only.
    return {
      def: def,
      target: target,
      directives: directives
    };
  }
});
rules$1.set("toc", {
  isLeaf: true,
  match: blockRegex$1(/^{\.toc start=(\d) end=(\d)}\n/),
  parse: function(capture, state) {
    return { attrs: { start: Number(capture[1]), end: Number(capture[2]), body: [] } }
  }
});
rules$1.set("pipeTable", {
  isLeaf: false,
  match: blockRegex$1(TABLES$1.PIPE_TABLE_REGEX),
  parse: TABLES$1.parsePipeTable
});
rules$1.set("gridTable", {
  isLeaf: false,
  match: blockRegex$1(TABLES$1.GRID_TABLE_REGEX),
  parse: TABLES$1.parseGridTable
});
rules$1.set("newline", {
  isLeaf: true,
  match: blockRegex$1(/^(?:\n *)*\n/),
  parse: function() { return { type: "null" } }
});
rules$1.set("paragraph", {
  isLeaf: false,
  match: blockRegex$1(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
  parse: function(capture, state) {
    return { content: parseInline$1(capture[1], state) };
  }
});
rules$1.set("escape", {
  // We don't allow escaping numbers, letters, or spaces here so that
  // backslashes used in plain text still get rendered. But allowing
  // escaping anything else provides a very flexible escape mechanism,
  // regardless of how this grammar is extended.
  isLeaf: true,
  match: inlineRegex$1(/^\\([^0-9A-Za-z\s])/),
  parse: function(capture, state) {
    return {
      type: "text",
      text: capture[1]
    };
  }
});
rules$1.set("tableSeparator", {
  isLeaf: true,
  match: function(source, state) {
    if (!state.inTable) {
      return null;
    }
    return /^ *\| */.exec(source);
  },
  parse: function() {
    return { type: "tableSeparator" };
  }
});
rules$1.set("calculation", {
  isLeaf: true,
  match: anyScopeRegex$1(/^(?:¢((?:\\[\s\S]|[^\\])+?)¢|¢¢\n?((?:\\[\s\S]|[^\\])+?)\n?¢¢)/),
  parse: function(capture, state) {
    if (capture[1]) {
      let entry = capture[1].trim();
      if (!/^(?:function|draw\()/.test(entry) && entry.indexOf("``") === -1) {
        entry = entry.replace(/\n/g, " ");
      }
      return { content: "", attrs: { entry } }
    } else {
      const entry = capture[2].trim();
      return { content: "", attrs: { entry, displayMode: true } }
    }
  }
});
rules$1.set("tex", {
  isLeaf: true,
  match: anyScopeRegex$1(/^(?:\$\$\n?((?:\\[\s\S]|[^\\])+?)\n?\$\$|\$((?:\\[\s\S]|[^\\])+?)\$)/),
  parse: function(capture, state) {
    if (capture[2]) {
      const tex = capture[2].trim().replace(/\n/g, " ").replace(/`\$/g, "$");
      return { content: "", attrs: { tex } }
    } else {
      const tex = capture[1].trim().replace(/`\$/g, "$");
      return { content: "", attrs: { tex, displayMode: true } }
    }
  }
});
rules$1.set("link", {
  isLeaf: true,
  match: inlineRegex$1(
    new RegExp("^\\[(" + LINK_INSIDE$1 + ")\\]\\(" + LINK_HREF_AND_TITLE$1 + "\\)")
  ),
  parse: function(capture, state) {
    const textNode = parseTextMark$1(capture[1], state, "link" )[0];
    const i = linkIndex$1(textNode.marks);
    textNode.marks[i].attrs = { href: unescapeUrl$1(capture[2]) };
    return textNode
  }
});
rules$1.set("image", {
  isLeaf: true,
  match: inlineRegex$1(
    new RegExp("^!\\[(" + LINK_INSIDE$1 + ")\\]\\(" + LINK_HREF_AND_TITLE$1 + "\\)")
  ),
  parse: function(capture, state) {
    return { attrs: { alt: capture[1], src: unescapeUrl$1(capture[2]) } }
  }
});
rules$1.set("reflink", {
  isLeaf: true,
  match: inlineRegex$1(/^\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    const textNode = parseTextMark$1(capture[1], state, "link" )[0];
    const i = linkIndex$1(textNode.marks);
    textNode.marks[i].attrs = { href: null };
    if (capture[2]) {
      textNode.marks[i].attrs.title = capture[2];
    }
    parseRef$1(capture, state, textNode.marks[i]);
    return textNode
  }
});
rules$1.set("refimage", {
  isLeaf: true,
  match: inlineRegex$1(/^!\[((?:(?:\\[\s\S]|[^\\])+?)?)\]\[([^\]]*)\]/),
  parse: function(capture, state) {
    return parseRef$1(capture, state, {
      type: "image",
      attrs: { alt: capture[1] }
    });
  }
});
rules$1.set("code", {
  isLeaf: true,
  match: inlineRegex$1(/^(`+)([\s\S]*?[^`])\1(?!`)/),
  parse: function(capture, state) {
    const text = capture[2].trim();
    return [{ type: "text", text, marks: [{ type: "code" }] }]
/*    state.inCode = true
    const code = parseTextMark(text, state, "code" )
    state.inCode = false
    return code */
  }
});
rules$1.set("em", {
  isLeaf: true,
  match: inlineRegex$1(/^_((?:\\[\s\S]|[^\\])+?)_/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "em" )
  }
});
rules$1.set("strong", {
  isLeaf: true,
  match: inlineRegex$1(/^\*\*(?=\S)((?:\\[\s\S]|\*(?!\*)|[^\s*\\]|\s(?!\*\*))+?)\*\*/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "strong" )
  }
});
rules$1.set("strikethru", {
  isLeaf: true,
  match: inlineRegex$1(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "strikethru" )
  }
});
rules$1.set("superscript", {
  isLeaf: true,
  match: inlineRegex$1(/^<sup>([\s\S]*?)<\/sup>/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "superscript" )
  }
});
rules$1.set("subscript", {
  isLeaf: true,
  match: inlineRegex$1(/^~((?:\\[\s\S]|[^\\])+?)~/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "subscript" )
  }
});
rules$1.set("underline", {
  isLeaf: true,
  match: inlineRegex$1(/^<u>([\s\S]*?)<\/u>/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "underline" )
  }
});
rules$1.set("highlight", {
  isLeaf: true,
  match: inlineRegex$1(/^<mark>([\s\S]*?)<\/mark>/),
  parse: function(capture, state) {
    return parseTextMark$1(capture[1], state, "highlight" )
  }
});
rules$1.set("hard_break", {
  isLeaf: true,
  match: anyScopeRegex$1(/^\\\n/),
  parse: function() { return { text: "\n" } }
});
rules$1.set("inline_break", {
  isLeaf: true,
  match: anyScopeRegex$1(/^<br>/),
  parse: function() { return { type: "hard_break", text: "\n" } }
});
rules$1.set("span", {
  isLeaf: true,
  match: inlineRegex$1(/^<span [a-z =":]+>[^<]+<\/span>/),
  parse: function(capture, state) {
    return !state.inHtml ? null : { type: "html", text: capture[0] }
  }
});
rules$1.set("text", {
  // Here we look for anything followed by non-symbols,
  // double newlines, or double-space-newlines
  // We break on any symbol characters so that this grammar
  // is easy to extend without needing to modify this regex
  isLeaf: true,
  match: anyScopeRegex$1(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
  parse: function(capture, state) {
    return {
      text: capture[0].replace(/\n/g, " ")
    };
  }
});

const doNotEscape$1 = ["calculation", "code", "tex"];
const textModeRegEx = /\\(ce|text|hbox|raisebox|fbox)\{/

const identifyTeX = (source) => {
  // In TeX, a pair of $…$ delimiters can be nested inside \text{…}.
  // Parse the string and do not end on a $ inside a {} group.
  let prevChar = "$"
  let groupLevel = 0
  for (let i = 1; i < source.length; i++) {
    const ch = source.charAt(i)
    if (ch === "{" && prevChar !== "\\") { groupLevel += 1 }
    if (ch === "}" && prevChar !== "\\") { groupLevel -= 1 }
    if (ch === "$" && prevChar !== "\\" && groupLevel === 0) {
      return [source.slice(0, i + 1), null, source.slice(1, i)]
    }
    prevChar = ch
  }
  return [source, null, source.slice(1, -1)]
}

const parse$2 = (source, state) => {
  if (!state.inline) { source += "\n\n"; }
  source = preprocess$1(source);
  const result = [];
  while (source) {
    // store the best match and its rule:
    let capture = null;
    let ruleName = null;
    let rule = null;
    for (const [currRuleName, currRule] of rules$1) {
      if (state.inCode && doNotEscape$1.includes(currRuleName)) { continue }
      capture = currRule.match(source, state);
      if (capture) {
        rule = currRule;
        ruleName = currRuleName;
        break
      }
    }
    if (ruleName === "tex" && capture[2] && textModeRegEx.test(capture[2])) {
      capture = identifyTeX(source)  // Check a TeX string for nested $
    }
    const parsed = rule.parse(capture, state);
    if (Array.isArray(parsed)) {
      Array.prototype.push.apply(result, parsed);
    } else {
      if (parsed.type == null) { parsed.type = ruleName; }
      result.push(parsed);
    }
    source = source.substring(capture[0].length);
  }
  return result
};



/**
 * Parse some content with the parser `parse`, with state.inline
 * set to true. Useful for block elements; not generally necessary
 * to be used by inline elements (where state.inline is already true.
 */
const parseInline$1 = function(content, state) {
  const isCurrentlyInline = state.inline || false;
  state.inline = true;
  const result = parse$2(content, state);
  state.inline = isCurrentlyInline;
  return result;
};


// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
const LIST_BULLET$1 = "(?:[*+-]|\\d+\\.)";
// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const LIST_ITEM_PREFIX$1 = "( *)(" + LIST_BULLET$1 + ") +";
const LIST_ITEM_PREFIX_R$1 = new RegExp("^" + LIST_ITEM_PREFIX$1);
// recognize an individual list item:
//  * hi
//    this is part of the same item
//
//    as is this, which is a new paragraph in the same item
//
//  * but this is not part of the same item
const LIST_ITEM_R$1 = new RegExp(
  LIST_ITEM_PREFIX$1 + "[^\\n]*(?:\\n" + "(?!\\1" + LIST_BULLET$1 + " )[^\\n]*)*(\n|$)",
  "gm"
);
const BLOCK_END_R$1 = /\n{2,}$/;
// recognize the end of a paragraph block inside a list item:
// two or more newlines at end end of the item
const LIST_BLOCK_END_R$1 = BLOCK_END_R$1;
const LIST_ITEM_END_R$1 = / *\n+$/;

const ignore$1 = ["def", "newline", "null"];

const consolidate$1 = arr => {
  if (Array.isArray(arr) && arr.length > 0) {
    // Group any text nodes together into a single string output.
    for (let i = arr.length - 1; i > 0; i--) {
      const node = arr[i];
      const prevNode = arr[i - 1];
      if (node.type === 'text' && prevNode.type === 'text' &&
          !node.marks && !prevNode.marks) {
        prevNode.text += node.text;
        arr.splice(i, 1);
      } else if (ignore$1.includes(node.type)) {
        arr.splice(i, 1);
      } else if (!rules$1.has(node.type) || !rules$1.get(node.type).isLeaf) {
        consolidate$1(node.content);
      }
    }

    if (!rules$1.has(arr[0].type) || !rules$1.get(arr[0].type).isLeaf) {
      consolidate$1(arr[0].content);
    }
  }
};

const populateTOC$1 = ast => {
  let tocNode;
  for (const node of ast) {
    if (node.type === "toc") { tocNode = node; break }
  }
  if (!tocNode) { return }
  const start = tocNode.attrs.start;
  const end = tocNode.attrs.end;
  for (const node of ast) {
    if (node.type === "heading") {
      const level = node.attrs.level;
      if (start <= level && level <= end) {
        const tocEntry = [];
        let str = "";
        for (const range of node.content) { str += range.text; }
        tocEntry.push(str);
        tocEntry.push(level);
        tocEntry.push(0); // page number unknown
        tocEntry.push(0); // element number unknown
        tocNode.attrs.body.push(tocEntry);
      }
    }
  }
};

const md2ast$1 = (md, inHtml = false) => {
  const ast = parse$2(md, { inline: false, inHtml });
  if (Array.isArray(ast) && ast.length > 0 && ast[0].type === "null") { ast.shift(); }
  consolidate$1(ast);
  populateTOC$1(ast);
  return ast
};

const sanitizeUrl = function(url) {
  if (url == null) {
    return null;
  }
  try {
    const prot = decodeURIComponent(url)
      .replace(/[^A-Za-z0-9/:]/g, "")
      .toLowerCase();
    if (
      prot.indexOf("javascript:") === 0 ||
      prot.indexOf("vbscript:") === 0 ||
      prot.indexOf("data:") === 0
    ) {
      return null;
    }
  } catch (e) {
    // decodeURIComponent sometimes throws a URIError
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null;
  }
  return url;
};

const SANITIZE_TEXT_R = /[<>&"']/g;
const SANITIZE_TEXT_CODES = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;"
};
const sanitizeText = function(text /* : Attr */) {
  return String(text).replace(SANITIZE_TEXT_R, function(chr) {
    return SANITIZE_TEXT_CODES[chr];
  });
};

const htmlTag = (tagName, content, attributes = {}, isClosed = true) => {
  let attributeString = "";
  for (const attr in attributes) {
    if (Object.prototype.hasOwnProperty.call(attributes, attr)) {
      const attribute = attributes[attr];
    // Removes falsey attributes
      if (attribute) {
        const sanitizedAttribute = attr === "src"
          ? attribute.replace(/</g, "%3C").replace(/>/g, "%3E")
          : sanitizeText(attribute);
        attributeString += " " + sanitizeText(attr) + '="' + sanitizedAttribute + '"';
      }
    }
  }

  const unclosedTag = "<" + tagName + attributeString + ">";

  if (isClosed) {
    return unclosedTag + content + "</" + tagName + ">";
  } else {
    return unclosedTag;
  }
};

const tagName = {
  em: "em",
  strong: "strong",
  code: "code",
  strikethru: "del",
  subscript: "sub",
  superscript: "sup",
  underline: "u",
  highlight: "mark"
};

const nodes = {
  html(node) { return node.text },
  heading(node)    {
    const text = output(node.content);
    let tag = "h" + node.attrs.level;
    tag = htmlTag(tag, text);
    // Add id so others can link to it.
    tag = tag.slice(0, 3) + " id='" + text.toLowerCase().replace(/,/g, "").replace(/\s+/g, '-') + "'" + tag.slice(3);
    return tag + "\n"
  },
  paragraph(node)  { return htmlTag("p", output(node.content)) + "\n" },
  blockquote(node) {return htmlTag("blockquote", output(node.content)) },
  code_block(node) {
    return htmlTag("pre", htmlTag("code", sanitizeText(node.content[0].text)))
  },
  hard_break(node) { return "<br>" },
  def(node)        { return "" },
  newline(node)    { return "\n" },
  horizontal_rule(node) { return "<hr>\n" },
  ordered_list(node) {
    const attributes = node.attrs.order !== 1 ? { start: node.attrs.order } : undefined;
    return htmlTag("ol", output(node.content), attributes) + "\n"
  },
  bullet_list(node)  { return htmlTag("ul", output(node.content)) + "\n" },
  list_item(node)    { return htmlTag("li", output(node.content)) + "\n" },
  table(node)        { return htmlTag("table", output(node.content), node.attrs) + "\n" },
  table_row(node)    { return htmlTag("tr", output(node.content)) + "\n" },
  table_header(node) {
    const attributes = {};
    if (node.attrs.colspan !== 1) { attributes.colspan = node.attrs.colspan; }
    if (node.attrs.rowspan !== 1) { attributes.rowspan = node.attrs.rowspan; }
    if (node.attrs.colwidth !== null && !isNaN(node.attrs.colwidth) ) {
      attributes.style = `width: ${node.attrs.colwidth}px`;
    }
    return htmlTag("th", output(node.content), attributes) + "\n"
  },
  table_cell(node) {
    const attributes = {};
    if (node.attrs.colspan !== 1) { attributes.colspan = node.attrs.colspan; }
    if (node.attrs.rowspan !== 1) { attributes.rowspan = node.attrs.rowspan; }
    if (node.attrs.colwidth !== null && !isNaN(node.attrs.colwidth) ) {
      attributes.style = `width: ${node.attrs.colwidth}px`;
    }
    return htmlTag("td", output(node.content), attributes)
  },
  link(node) {
    const attributes = { href: sanitizeUrl(node.attrs.href), title: node.attrs.title };
    return htmlTag("a", output(node.content), attributes);
  },
  image(node) {
    const attributes = { src: node.attrs.src, alt: node.attrs.alt };
    if (node.attrs.class) { attributes.class = node.attrs.class; }
    if (node.attrs.id)    { attributes.id = node.attrs.id; }
    if (node.attrs.width) { attributes.width = node.attrs.width; }
    return htmlTag("img", "", attributes, false);
  },
/*  calculation(node) {
    const tex = hurmet.parse(node.attrs.entry);
    return htmlTag("span", "", { class: "tex", "data-tex": tex })
  },*/
  tex(node) {
    return temml.renderToString(
      node.attrs.tex,
      { trust: true, displayMode: (node.attrs.displayMode || false) }
    )
  },
  indented_div(node)    { return htmlTag("div", output(node.content), { class: 'indented' }) },
  centered_div(node)    {
    return htmlTag("div", output(node.content), { class: 'centered' } )
  },
  dt(node)    {
    let text = output(node.content);
    let tag = htmlTag("dt", text);
    // Add id so others can link to it.
    const pos = text.indexOf("(");
    if (pos > -1) { text = text.slice(0, pos).replace("_", "-"); }
    tag = tag.slice(0, 3) + " id='" + text.toLowerCase().replace(/\s+/g, '-') + "'" + tag.slice(3);
    return tag + "\n"
  },
  dd(node)    { return htmlTag("dd", output(node.content)) + "\n" },
  text(node) {
    const text = sanitizeText(node.text);
    if (!node.marks) {
      return text
    } else {
      let span = text;
      for (const mark of node.marks) {
        if (mark.type === "link") {
          let tag = `<a href='${mark.attrs.href}'`;
          if (mark.attrs.title) { tag += ` title='${mark.attrs.title}''`; }
          span = tag + ">" + span + "</a>";
        } else {
          const tag = tagName[mark.type];
          span = `<${tag}>${span}</${tag}>`;
        }
      }
      return span
    }
  }
};

const output = ast => {
  // Return HTML.
  let html = "";
  if (Array.isArray(ast)) {
    for (let i = 0; i < ast.length; i++) {
      html += output(ast[i]);
    }
  } else if (ast.type !== "null") {
    html += nodes[ast.type](ast);
  }
  return html
};

const md2html = (md, inHtml = false) => {
  const ast = md2ast$1(md, inHtml);
  return output(ast)
};

var hurmetMark = {
  md2ast: md2ast$1,
  md2html
};

module.exports = hurmetMark;
