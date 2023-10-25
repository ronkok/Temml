// Chromium does not support the MathML `mathvariant` attribute.
// Instead, we replace ASCII characters with Unicode characters that
// are defined in the font as bold, italic, double-struck, etc.
// This module identifies those Unicode code points.

// First, a few helpers.
const script = Object.freeze({
  B: 0x20EA, // Offset from ASCII B to Unicode script B
  E: 0x20EB,
  F: 0x20EB,
  H: 0x20C3,
  I: 0x20C7,
  L: 0x20C6,
  M: 0x20E6,
  R: 0x20C9,
  e: 0x20CA,
  g: 0x20A3,
  o: 0x20C5
})

const frak = Object.freeze({
  C: 0x20EA,
  H: 0x20C4,
  I: 0x20C8,
  R: 0x20CA,
  Z: 0x20CE
})

const bbb = Object.freeze({
  C: 0x20BF, // blackboard bold
  H: 0x20C5,
  N: 0x20C7,
  P: 0x20C9,
  Q: 0x20C9,
  R: 0x20CB,
  Z: 0x20CA
})

const bold = Object.freeze({
  "\u03f5": 0x1D2E7, // lunate epsilon
  "\u03d1": 0x1D30C, // vartheta
  "\u03f0": 0x1D2EE, // varkappa
  "\u03c6": 0x1D319, // varphi
  "\u03f1": 0x1D2EF, // varrho
  "\u03d6": 0x1D30B  // varpi
})

const boldItalic = Object.freeze({
  "\u03f5": 0x1D35B, // lunate epsilon
  "\u03d1": 0x1D380, // vartheta
  "\u03f0": 0x1D362, // varkappa
  "\u03c6": 0x1D38D, // varphi
  "\u03f1": 0x1D363, // varrho
  "\u03d6": 0x1D37F  // varpi
})

const boldsf = Object.freeze({
  "\u03f5": 0x1D395, // lunate epsilon
  "\u03d1": 0x1D3BA, // vartheta
  "\u03f0": 0x1D39C, // varkappa
  "\u03c6": 0x1D3C7, // varphi
  "\u03f1": 0x1D39D, // varrho
  "\u03d6": 0x1D3B9  // varpi
})

const bisf = Object.freeze({
  "\u03f5": 0x1D3CF, // lunate epsilon
  "\u03d1": 0x1D3F4, // vartheta
  "\u03f0": 0x1D3D6, // varkappa
  "\u03c6": 0x1D401, // varphi
  "\u03f1": 0x1D3D7, // varrho
  "\u03d6": 0x1D3F3  // varpi
})

// Code point offsets below are derived from https://www.unicode.org/charts/PDF/U1D400.pdf
const offset = Object.freeze({
  upperCaseLatin: { // A-Z
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return 0x1D3BF },
    "italic": ch =>                 { return 0x1D3F3 },
    "bold-italic": ch =>            { return 0x1D427 },
    "script": ch =>                 { return script[ch] || 0x1D45B },
    "script-bold": ch =>            { return 0x1D48F },
    "fraktur": ch =>                { return frak[ch] || 0x1D4C3 },
    "fraktur-bold": ch =>           { return 0x1D52B },
    "double-struck": ch =>          { return bbb[ch] || 0x1D4F7 },
    "sans-serif": ch =>             { return 0x1D55F },
    "sans-serif-bold": ch =>        { return 0x1D593 },
    "sans-serif-italic": ch =>      { return 0x1D5C7 },
    "sans-serif-bold-italic": ch => { return 0x1D63C },
    "monospace": ch =>              { return 0x1D62F }
  },
  lowerCaseLatin: { // a-z
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return 0x1D3B9 },
    "italic": ch =>                 { return ch === "h" ? 0x20A6 : 0x1D3ED },
    "bold-italic": ch =>            { return 0x1D421 },
    "script": ch =>                 { return script[ch] || 0x1D455 },
    "script-bold": ch =>            { return 0x1D489 },
    "fraktur": ch =>                { return 0x1D4BD },
    "fraktur-bold": ch =>           { return 0x1D525 },
    "double-struck": ch =>          { return 0x1D4F1 },
    "sans-serif": ch =>             { return 0x1D559 },
    "sans-serif-bold": ch =>        { return 0x1D58D },
    "sans-serif-italic": ch =>      { return 0x1D5C1 },
    "sans-serif-bold-italic": ch => { return 0x1D5F5 },
    "monospace": ch =>              { return 0x1D629 }
  },
  upperCaseGreek: { // A-Ω ∇
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return ch === "∇" ? 0x1B4BA : 0x1D317 },
    "italic": ch =>                 { return ch === "∇" ? 0x1B4F4 : 0x1D351 },
    // \boldsymbol actually returns upright bold for upperCaseGreek
    "bold-italic": ch =>            { return ch === "∇" ? 0x1B4BA : 0x1D317 },
    "script": ch =>                 { return 0 },
    "script-bold": ch =>            { return 0 },
    "fraktur": ch =>                { return 0 },
    "fraktur-bold": ch =>           { return 0 },
    "double-struck": ch =>          { return 0 },
    // Unicode has no code points for regular-weight san-serif Greek. Use bold.
    "sans-serif": ch =>             { return ch === "∇" ? 0x1B568 : 0x1D3C5 },
    "sans-serif-bold": ch =>        { return ch === "∇" ? 0x1B568 : 0x1D3C5 },
    "sans-serif-italic": ch =>      { return 0 },
    "sans-serif-bold-italic": ch => { return ch === "∇" ? 0x1B5A2 : 0x1D3FF },
    "monospace": ch =>              { return 0 }
  },
  lowerCaseGreek: { // α-ω
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return 0x1D311 },
    "italic": ch =>                 { return 0x1D34B },
    "bold-italic": ch =>            { return ch === "\u03d5" ? 0x1D37E : 0x1D385 },
    "script": ch =>                 { return 0 },
    "script-bold": ch =>            { return 0 },
    "fraktur": ch =>                { return 0 },
    "fraktur-bold": ch =>           { return 0 },
    "double-struck": ch =>          { return 0 },
    // Unicode has no code points for regular-weight san-serif Greek. Use bold.
    "sans-serif": ch =>             { return 0x1D3BF },
    "sans-serif-bold": ch =>        { return 0x1D3BF },
    "sans-serif-italic": ch =>      { return 0 },
    "sans-serif-bold-italic": ch => { return 0x1D3F9 },
    "monospace": ch =>              { return 0 }
  },
  varGreek: { // \varGamma, etc
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return  bold[ch] || -51 },
    "italic": ch =>                 { return 0 },
    "bold-italic": ch =>            { return boldItalic[ch] || 0x3A },
    "script": ch =>                 { return 0 },
    "script-bold": ch =>            { return 0 },
    "fraktur": ch =>                { return 0 },
    "fraktur-bold": ch =>           { return 0 },
    "double-struck": ch =>          { return 0 },
    "sans-serif": ch =>             { return boldsf[ch] || 0x74 },
    "sans-serif-bold": ch =>        { return boldsf[ch] || 0x74 },
    "sans-serif-italic": ch =>      { return 0 },
    "sans-serif-bold-italic": ch => { return bisf[ch] || 0xAE },
    "monospace": ch =>              { return 0 }
  },
  numeral: { // 0-9
    "normal": ch =>                 { return 0 },
    "bold": ch =>                   { return 0x1D79E },
    "italic": ch =>                 { return 0 },
    "bold-italic": ch =>            { return 0 },
    "script": ch =>                 { return 0 },
    "script-bold": ch =>            { return 0 },
    "fraktur": ch =>                { return 0 },
    "fraktur-bold": ch =>           { return 0 },
    "double-struck": ch =>          { return 0x1D7A8 },
    "sans-serif": ch =>             { return 0x1D7B2 },
    "sans-serif-bold": ch =>        { return 0x1D7BC },
    "sans-serif-italic": ch =>      { return 0 },
    "sans-serif-bold-italic": ch => { return 0 },
    "monospace": ch =>              { return 0x1D7C6 }
  }
})

export const variantChar = (ch, variant) => {
  const codePoint = ch.codePointAt(0)
  const block = 0x40 < codePoint && codePoint < 0x5b
    ? "upperCaseLatin"
    : 0x60 < codePoint && codePoint < 0x7b
    ? "lowerCaseLatin"
    : (0x390  < codePoint && codePoint < 0x3AA) || ch === "∇"
    ? "upperCaseGreek"
    : 0x3B0 < codePoint && codePoint < 0x3CA || ch === "\u03d5"
    ? "lowerCaseGreek"
    : 0x1D6E1 < codePoint && codePoint < 0x1D6FC  || bold[ch]
    ? "varGreek"
    : (0x2F < codePoint && codePoint <  0x3A)
    ? "numeral"
    : "other"
  return block === "other"
    ? ch
    : String.fromCodePoint(codePoint + offset[block][variant](ch))
}

export const smallCaps = Object.freeze({
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ"
})
