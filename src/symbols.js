/**
 * This file holds a list of all no-argument functions and single-character
 * symbols (like 'a' or ';').
 *
 * For each of the symbols, there are two properties they can have:
 * - group (required): the ParseNode group type the symbol should have (i.e.
     "textord", "mathord", etc).
 * - replace: the character that this symbol or function should be
 *   replaced with (i.e. "\phi" has a replace value of "\u03d5", the phi
 *   character in the main font).
 *
 * The outermost map in the table indicates what mode the symbols should be
 * accepted in (e.g. "math" or "text").
 */

// Some of these have a "-token" suffix since these are also used as `ParseNode`
// types for raw text tokens, and we want to avoid conflicts with higher-level
// `ParseNode` types. These `ParseNode`s are constructed within `Parser` by
// looking up the `symbols` map.
export const ATOMS = {
  bin: 1,
  close: 1,
  inner: 1,
  open: 1,
  punct: 1,
  rel: 1
};
export const NON_ATOMS = {
  "accent-token": 1,
  mathord: 1,
  "op-token": 1,
  spacing: 1,
  textord: 1
};

const symbols = {
  math: {},
  text: {}
};
export default symbols;

/** `acceptUnicodeChar = true` is only applicable if `replace` is set. */
export function defineSymbol(mode, group, replace, name, acceptUnicodeChar) {
  symbols[mode][name] = { group, replace };

  if (acceptUnicodeChar && replace) {
    symbols[mode][replace] = symbols[mode][name];
  }
}

// Some abbreviations for commonly used strings.
// This helps minify the code, and also spotting typos using jshint.

// modes:
const math = "math";
const text = "text";

// groups:
const accent = "accent-token";
const bin = "bin";
const close = "close";
const inner = "inner";
const mathord = "mathord";
const op = "op-token";
const open = "open";
const punct = "punct";
const rel = "rel";
const spacing = "spacing";
const textord = "textord";

// Now comes the symbol table

// Relation Symbols
defineSymbol(math, rel, "\u2261", "\\equiv", true);
defineSymbol(math, rel, "\u227a", "\\prec", true);
defineSymbol(math, rel, "\u227b", "\\succ", true);
defineSymbol(math, rel, "\u223c", "\\sim", true);
defineSymbol(math, rel, "\u27c2", "\\perp", true);
defineSymbol(math, rel, "\u2aaf", "\\preceq", true);
defineSymbol(math, rel, "\u2ab0", "\\succeq", true);
defineSymbol(math, rel, "\u2243", "\\simeq", true);
defineSymbol(math, rel, "\u224c", "\\backcong", true);
defineSymbol(math, rel, "|", "\\mid", true);
defineSymbol(math, rel, "\u226a", "\\ll", true);
defineSymbol(math, rel, "\u226b", "\\gg", true);
defineSymbol(math, rel, "\u224d", "\\asymp", true);
defineSymbol(math, rel, "\u2225", "\\parallel");
defineSymbol(math, rel, "\u2323", "\\smile", true);
defineSymbol(math, rel, "\u2291", "\\sqsubseteq", true);
defineSymbol(math, rel, "\u2292", "\\sqsupseteq", true);
defineSymbol(math, rel, "\u2250", "\\doteq", true);
defineSymbol(math, rel, "\u2322", "\\frown", true);
defineSymbol(math, rel, "\u220b", "\\ni", true);
defineSymbol(math, rel, "\u220c", "\\notni", true);
defineSymbol(math, rel, "\u221d", "\\propto", true);
defineSymbol(math, rel, "\u22a2", "\\vdash", true);
defineSymbol(math, rel, "\u22a3", "\\dashv", true);
defineSymbol(math, rel, "\u220b", "\\owns");
defineSymbol(math, rel, "\u2258", "\\arceq", true);
defineSymbol(math, rel, "\u2259", "\\wedgeq", true);
defineSymbol(math, rel, "\u225a", "\\veeeq", true);
defineSymbol(math, rel, "\u225b", "\\stareq", true);
defineSymbol(math, rel, "\u225d", "\\eqdef", true);
defineSymbol(math, rel, "\u225e", "\\measeq", true);
defineSymbol(math, rel, "\u225f", "\\questeq", true);
defineSymbol(math, rel, "\u2260", "\\ne", true);
defineSymbol(math, rel, "\u2260", "\\neq");
// unicodemath
defineSymbol(math, rel, "\u2a75", "\\eqeq", true);
defineSymbol(math, rel, "\u2a76", "\\eqeqeq", true);
// mathtools.sty
defineSymbol(math, rel, "\u2237", "\\dblcolon", true);
defineSymbol(math, rel, "\u2254", "\\coloneqq", true);
defineSymbol(math, rel, "\u2255", "\\eqqcolon", true);
defineSymbol(math, rel, "\u2239", "\\eqcolon", true);
defineSymbol(math, rel, "\u2A74", "\\Coloneqq", true);

// Punctuation
defineSymbol(math, punct, "\u002e", "\\ldotp");
defineSymbol(math, punct, "\u00b7", "\\cdotp");

// Misc Symbols
defineSymbol(math, textord, "\u0023", "\\#");
defineSymbol(text, textord, "\u0023", "\\#");
defineSymbol(math, textord, "\u0026", "\\&");
defineSymbol(text, textord, "\u0026", "\\&");
defineSymbol(math, textord, "\u2135", "\\aleph", true);
defineSymbol(math, textord, "\u2200", "\\forall", true);
defineSymbol(math, textord, "\u210f", "\\hbar", true);
defineSymbol(math, textord, "\u2203", "\\exists", true);
defineSymbol(math, textord, "\u2207", "\\nabla", true);
defineSymbol(math, textord, "\u266d", "\\flat", true);
defineSymbol(math, textord, "\u2113", "\\ell", true);
defineSymbol(math, textord, "\u266e", "\\natural", true);
defineSymbol(math, textord, "Å", "\\AA", true);
defineSymbol(text, textord, "Å", "\\AA", true);
defineSymbol(math, textord, "\u2663", "\\clubsuit", true);
defineSymbol(math, textord, "\u2667", "\\varclubsuit", true);
defineSymbol(math, textord, "\u2118", "\\wp", true);
defineSymbol(math, textord, "\u266f", "\\sharp", true);
defineSymbol(math, textord, "\u2662", "\\diamondsuit", true);
defineSymbol(math, textord, "\u2666", "\\vardiamondsuit", true);
defineSymbol(math, textord, "\u211c", "\\Re", true);
defineSymbol(math, textord, "\u2661", "\\heartsuit", true);
defineSymbol(math, textord, "\u2665", "\\varheartsuit", true);
defineSymbol(math, textord, "\u2111", "\\Im", true);
defineSymbol(math, textord, "\u2660", "\\spadesuit", true);
defineSymbol(math, textord, "\u2664", "\\varspadesuit", true);
defineSymbol(math, textord, "\u2640", "\\female", true);
defineSymbol(math, textord, "\u2642", "\\male", true);
defineSymbol(math, textord, "\u00a7", "\\S", true);
defineSymbol(text, textord, "\u00a7", "\\S");
defineSymbol(math, textord, "\u00b6", "\\P", true);
defineSymbol(text, textord, "\u00b6", "\\P");
defineSymbol(text, textord, "\u263a", "\\smiley", true);
defineSymbol(math, textord, "\u263a", "\\smiley", true);

// Math and Text
defineSymbol(math, textord, "\u2020", "\\dag");
defineSymbol(text, textord, "\u2020", "\\dag");
defineSymbol(text, textord, "\u2020", "\\textdagger");
defineSymbol(math, textord, "\u2021", "\\ddag");
defineSymbol(text, textord, "\u2021", "\\ddag");
defineSymbol(text, textord, "\u2021", "\\textdaggerdbl");

// Large Delimiters
defineSymbol(math, close, "\u23b1", "\\rmoustache", true);
defineSymbol(math, open, "\u23b0", "\\lmoustache", true);
defineSymbol(math, close, "\u27ef", "\\rgroup", true);
defineSymbol(math, open, "\u27ee", "\\lgroup", true);

// Binary Operators
defineSymbol(math, bin, "\u2213", "\\mp", true);
defineSymbol(math, bin, "\u2296", "\\ominus", true);
defineSymbol(math, bin, "\u228e", "\\uplus", true);
defineSymbol(math, bin, "\u2293", "\\sqcap", true);
defineSymbol(math, bin, "\u2217", "\\ast");
defineSymbol(math, bin, "\u2294", "\\sqcup", true);
defineSymbol(math, bin, "\u25ef", "\\bigcirc", true);
defineSymbol(math, bin, "\u2219", "\\bullet", true);
defineSymbol(math, bin, "\u2021", "\\ddagger");
defineSymbol(math, bin, "\u2240", "\\wr", true);
defineSymbol(math, bin, "\u2a3f", "\\amalg");
defineSymbol(math, bin, "\u0026", "\\And"); // from amsmath

// Arrow Symbols
defineSymbol(math, rel, "\u27f5", "\\longleftarrow", true);
defineSymbol(math, rel, "\u21d0", "\\Leftarrow", true);
defineSymbol(math, rel, "\u27f8", "\\Longleftarrow", true);
defineSymbol(math, rel, "\u27f6", "\\longrightarrow", true);
defineSymbol(math, rel, "\u21d2", "\\Rightarrow", true);
defineSymbol(math, rel, "\u27f9", "\\Longrightarrow", true);
defineSymbol(math, rel, "\u2194", "\\leftrightarrow", true);
defineSymbol(math, rel, "\u27f7", "\\longleftrightarrow", true);
defineSymbol(math, rel, "\u21d4", "\\Leftrightarrow", true);
defineSymbol(math, rel, "\u27fa", "\\Longleftrightarrow", true);
defineSymbol(math, rel, "\u21a4", "\\mapsfrom", true);
defineSymbol(math, rel, "\u21a6", "\\mapsto", true);
defineSymbol(math, rel, "\u27fc", "\\longmapsto", true);
defineSymbol(math, rel, "\u2197", "\\nearrow", true);
defineSymbol(math, rel, "\u21a9", "\\hookleftarrow", true);
defineSymbol(math, rel, "\u21aa", "\\hookrightarrow", true);
defineSymbol(math, rel, "\u2198", "\\searrow", true);
defineSymbol(math, rel, "\u21bc", "\\leftharpoonup", true);
defineSymbol(math, rel, "\u21c0", "\\rightharpoonup", true);
defineSymbol(math, rel, "\u2199", "\\swarrow", true);
defineSymbol(math, rel, "\u21bd", "\\leftharpoondown", true);
defineSymbol(math, rel, "\u21c1", "\\rightharpoondown", true);
defineSymbol(math, rel, "\u2196", "\\nwarrow", true);
defineSymbol(math, rel, "\u21cc", "\\rightleftharpoons", true);
defineSymbol(math, mathord, "\u21af", "\\lightning", true);
defineSymbol(math, mathord, "\u220E", "\\QED", true);
defineSymbol(math, mathord, "\u2030", "\\permil", true);
defineSymbol(text, textord, "\u2030", "\\permil");
defineSymbol(math, mathord, "\u2609", "\\astrosun", true);
defineSymbol(math, mathord, "\u263c", "\\sun", true);
defineSymbol(math, mathord, "\u263e", "\\leftmoon", true);
defineSymbol(math, mathord, "\u263d", "\\rightmoon", true);

// AMS Negated Binary Relations
defineSymbol(math, rel, "\u226e", "\\nless", true);
// Symbol names preceeded by "@" each have a corresponding macro.
defineSymbol(math, rel, "\u2a87", "\\lneq", true);
defineSymbol(math, rel, "\u2268", "\\lneqq", true);
defineSymbol(math, rel, "\u2268\ufe00", "\\lvertneqq");
defineSymbol(math, rel, "\u22e6", "\\lnsim", true);
defineSymbol(math, rel, "\u2a89", "\\lnapprox", true);
defineSymbol(math, rel, "\u2280", "\\nprec", true);
// unicode-math maps \u22e0 to \npreccurlyeq. We'll use the AMS synonym.
defineSymbol(math, rel, "\u22e0", "\\npreceq", true);
defineSymbol(math, rel, "\u22e8", "\\precnsim", true);
defineSymbol(math, rel, "\u2ab9", "\\precnapprox", true);
defineSymbol(math, rel, "\u2241", "\\nsim", true);
defineSymbol(math, rel, "\u2224", "\\nmid", true);
defineSymbol(math, rel, "\u2224", "\\nshortmid");
defineSymbol(math, rel, "\u22ac", "\\nvdash", true);
defineSymbol(math, rel, "\u22ad", "\\nvDash", true);
defineSymbol(math, rel, "\u22ea", "\\ntriangleleft");
defineSymbol(math, rel, "\u22ec", "\\ntrianglelefteq", true);
defineSymbol(math, rel, "\u2284", "\\nsubset", true);
defineSymbol(math, rel, "\u2285", "\\nsupset", true);
defineSymbol(math, rel, "\u228a", "\\subsetneq", true);
defineSymbol(math, rel, "\u228a\ufe00", "\\varsubsetneq");
defineSymbol(math, rel, "\u2acb", "\\subsetneqq", true);
defineSymbol(math, rel, "\u2acb\ufe00", "\\varsubsetneqq");
defineSymbol(math, rel, "\u226f", "\\ngtr", true);
defineSymbol(math, rel, "\u2a88", "\\gneq", true);
defineSymbol(math, rel, "\u2269", "\\gneqq", true);
defineSymbol(math, rel, "\u2269\ufe00", "\\gvertneqq");
defineSymbol(math, rel, "\u22e7", "\\gnsim", true);
defineSymbol(math, rel, "\u2a8a", "\\gnapprox", true);
defineSymbol(math, rel, "\u2281", "\\nsucc", true);
// unicode-math maps \u22e1 to \nsucccurlyeq. We'll use the AMS synonym.
defineSymbol(math, rel, "\u22e1", "\\nsucceq", true);
defineSymbol(math, rel, "\u22e9", "\\succnsim", true);
defineSymbol(math, rel, "\u2aba", "\\succnapprox", true);
// unicode-math maps \u2246 to \simneqq. We'll use the AMS synonym.
defineSymbol(math, rel, "\u2246", "\\ncong", true);
defineSymbol(math, rel, "\u2226", "\\nparallel", true);
defineSymbol(math, rel, "\u2226", "\\nshortparallel");
defineSymbol(math, rel, "\u22af", "\\nVDash", true);
defineSymbol(math, rel, "\u22eb", "\\ntriangleright");
defineSymbol(math, rel, "\u22ed", "\\ntrianglerighteq", true);
defineSymbol(math, rel, "\u228b", "\\supsetneq", true);
defineSymbol(math, rel, "\u228b", "\\varsupsetneq");
defineSymbol(math, rel, "\u2acc", "\\supsetneqq", true);
defineSymbol(math, rel, "\u2acc\ufe00", "\\varsupsetneqq");
defineSymbol(math, rel, "\u22ae", "\\nVdash", true);
defineSymbol(math, rel, "\u2ab5", "\\precneqq", true);
defineSymbol(math, rel, "\u2ab6", "\\succneqq", true);
defineSymbol(math, bin, "\u22b4", "\\unlhd");
defineSymbol(math, bin, "\u22b5", "\\unrhd");

// AMS Negated Arrows
defineSymbol(math, rel, "\u219a", "\\nleftarrow", true);
defineSymbol(math, rel, "\u219b", "\\nrightarrow", true);
defineSymbol(math, rel, "\u21cd", "\\nLeftarrow", true);
defineSymbol(math, rel, "\u21cf", "\\nRightarrow", true);
defineSymbol(math, rel, "\u21ae", "\\nleftrightarrow", true);
defineSymbol(math, rel, "\u21ce", "\\nLeftrightarrow", true);

// AMS Misc
defineSymbol(math, rel, "\u25b3", "\\vartriangle");
defineSymbol(math, textord, "\u210f", "\\hslash");
defineSymbol(math, textord, "\u25bd", "\\triangledown");
defineSymbol(math, textord, "\u25ca", "\\lozenge");
defineSymbol(math, textord, "\u24c8", "\\circledS");
defineSymbol(math, textord, "\u00ae", "\\circledR", true);
defineSymbol(text, textord, "\u00ae", "\\circledR");
defineSymbol(text, textord, "\u00ae", "\\textregistered");
defineSymbol(math, textord, "\u2221", "\\measuredangle", true);
defineSymbol(math, textord, "\u2204", "\\nexists");
defineSymbol(math, textord, "\u2127", "\\mho");
defineSymbol(math, textord, "\u2132", "\\Finv", true);
defineSymbol(math, textord, "\u2141", "\\Game", true);
defineSymbol(math, textord, "\u2035", "\\backprime");
defineSymbol(math, textord, "\u25b2", "\\blacktriangle");
defineSymbol(math, textord, "\u25bc", "\\blacktriangledown");
defineSymbol(math, textord, "\u25a0", "\\blacksquare");
defineSymbol(math, textord, "\u29eb", "\\blacklozenge");
defineSymbol(math, textord, "\u2605", "\\bigstar");
defineSymbol(math, textord, "\u2222", "\\sphericalangle", true);
defineSymbol(math, textord, "\u2201", "\\complement", true);
// unicode-math maps U+F0 to \matheth. We map to AMS function \eth
defineSymbol(math, textord, "\u00f0", "\\eth", true);
defineSymbol(text, textord, "\u00f0", "\u00f0");
defineSymbol(math, textord, "\u2571", "\\diagup");
defineSymbol(math, textord, "\u2572", "\\diagdown");
defineSymbol(math, textord, "\u25a1", "\\square");
defineSymbol(math, textord, "\u25a1", "\\Box");
defineSymbol(math, textord, "\u25ca", "\\Diamond");
// unicode-math maps U+A5 to \mathyen. We map to AMS function \yen
defineSymbol(math, textord, "\u00a5", "\\yen", true);
defineSymbol(text, textord, "\u00a5", "\\yen", true);
defineSymbol(math, textord, "\u2713", "\\checkmark", true);
defineSymbol(text, textord, "\u2713", "\\checkmark");
defineSymbol(math, textord, "\u2717", "\\ballotx", true);
defineSymbol(text, textord, "\u2717", "\\ballotx");
defineSymbol(text, textord, "\u2022", "\\textbullet");

// AMS Hebrew
defineSymbol(math, textord, "\u2136", "\\beth", true);
defineSymbol(math, textord, "\u2138", "\\daleth", true);
defineSymbol(math, textord, "\u2137", "\\gimel", true);

// AMS Greek
defineSymbol(math, textord, "\u03dd", "\\digamma", true);
defineSymbol(math, textord, "\u03f0", "\\varkappa");

// AMS Delimiters
defineSymbol(math, open, "\u231C", "\\ulcorner", true);
defineSymbol(math, close, "\u231D", "\\urcorner", true);
defineSymbol(math, open, "\u231E", "\\llcorner", true);
defineSymbol(math, close, "\u231F", "\\lrcorner", true);

// AMS Binary Relations
defineSymbol(math, rel, "\u2266", "\\leqq", true);
defineSymbol(math, rel, "\u2a7d", "\\leqslant", true);
defineSymbol(math, rel, "\u2a95", "\\eqslantless", true);
defineSymbol(math, rel, "\u2272", "\\lesssim", true);
defineSymbol(math, rel, "\u2a85", "\\lessapprox", true);
defineSymbol(math, rel, "\u224a", "\\approxeq", true);
defineSymbol(math, bin, "\u22d6", "\\lessdot");
defineSymbol(math, rel, "\u22d8", "\\lll", true);
defineSymbol(math, rel, "\u2276", "\\lessgtr", true);
defineSymbol(math, rel, "\u22da", "\\lesseqgtr", true);
defineSymbol(math, rel, "\u2a8b", "\\lesseqqgtr", true);
defineSymbol(math, rel, "\u2251", "\\doteqdot");
defineSymbol(math, rel, "\u2253", "\\risingdotseq", true);
defineSymbol(math, rel, "\u2252", "\\fallingdotseq", true);
defineSymbol(math, rel, "\u223d", "\\backsim", true);
defineSymbol(math, rel, "\u22cd", "\\backsimeq", true);
defineSymbol(math, rel, "\u2ac5", "\\subseteqq", true);
defineSymbol(math, rel, "\u22d0", "\\Subset", true);
defineSymbol(math, rel, "\u228f", "\\sqsubset", true);
defineSymbol(math, rel, "\u227c", "\\preccurlyeq", true);
defineSymbol(math, rel, "\u22de", "\\curlyeqprec", true);
defineSymbol(math, rel, "\u227e", "\\precsim", true);
defineSymbol(math, rel, "\u2ab7", "\\precapprox", true);
defineSymbol(math, rel, "\u22b2", "\\vartriangleleft");
defineSymbol(math, rel, "\u22b4", "\\trianglelefteq");
defineSymbol(math, rel, "\u22a8", "\\vDash", true);
defineSymbol(math, rel, "\u22ab", "\\VDash", true);
defineSymbol(math, rel, "\u22aa", "\\Vvdash", true);
defineSymbol(math, rel, "\u2323", "\\smallsmile");
defineSymbol(math, rel, "\u2322", "\\smallfrown");
defineSymbol(math, rel, "\u224f", "\\bumpeq", true);
defineSymbol(math, rel, "\u224e", "\\Bumpeq", true);
defineSymbol(math, rel, "\u2267", "\\geqq", true);
defineSymbol(math, rel, "\u2a7e", "\\geqslant", true);
defineSymbol(math, rel, "\u2a96", "\\eqslantgtr", true);
defineSymbol(math, rel, "\u2273", "\\gtrsim", true);
defineSymbol(math, rel, "\u2a86", "\\gtrapprox", true);
defineSymbol(math, bin, "\u22d7", "\\gtrdot");
defineSymbol(math, rel, "\u22d9", "\\ggg", true);
defineSymbol(math, rel, "\u2277", "\\gtrless", true);
defineSymbol(math, rel, "\u22db", "\\gtreqless", true);
defineSymbol(math, rel, "\u2a8c", "\\gtreqqless", true);
defineSymbol(math, rel, "\u2256", "\\eqcirc", true);
defineSymbol(math, rel, "\u2257", "\\circeq", true);
defineSymbol(math, rel, "\u225c", "\\triangleq", true);
defineSymbol(math, rel, "\u223c", "\\thicksim");
defineSymbol(math, rel, "\u2248", "\\thickapprox");
defineSymbol(math, rel, "\u2ac6", "\\supseteqq", true);
defineSymbol(math, rel, "\u22d1", "\\Supset", true);
defineSymbol(math, rel, "\u2290", "\\sqsupset", true);
defineSymbol(math, rel, "\u227d", "\\succcurlyeq", true);
defineSymbol(math, rel, "\u22df", "\\curlyeqsucc", true);
defineSymbol(math, rel, "\u227f", "\\succsim", true);
defineSymbol(math, rel, "\u2ab8", "\\succapprox", true);
defineSymbol(math, rel, "\u22b3", "\\vartriangleright");
defineSymbol(math, rel, "\u22b5", "\\trianglerighteq");
defineSymbol(math, rel, "\u22a9", "\\Vdash", true);
defineSymbol(math, rel, "\u2223", "\\shortmid");
defineSymbol(math, rel, "\u2225", "\\shortparallel");
defineSymbol(math, rel, "\u226c", "\\between", true);
defineSymbol(math, rel, "\u22d4", "\\pitchfork", true);
defineSymbol(math, rel, "\u221d", "\\varpropto");
defineSymbol(math, rel, "\u25c0", "\\blacktriangleleft");
// unicode-math says that \therefore is a mathord atom.
// We kept the amssymb atom type, which is rel.
defineSymbol(math, rel, "\u2234", "\\therefore", true);
defineSymbol(math, rel, "\u220d", "\\backepsilon");
defineSymbol(math, rel, "\u25b6", "\\blacktriangleright");
// unicode-math says that \because is a mathord atom.
// We kept the amssymb atom type, which is rel.
defineSymbol(math, rel, "\u2235", "\\because", true);
defineSymbol(math, rel, "\u22d8", "\\llless");
defineSymbol(math, rel, "\u22d9", "\\gggtr");
defineSymbol(math, bin, "\u22b2", "\\lhd");
defineSymbol(math, bin, "\u22b3", "\\rhd");
defineSymbol(math, rel, "\u2242", "\\eqsim", true);
defineSymbol(math, rel, "\u2251", "\\Doteq", true);
defineSymbol(math, rel, "\u297d", "\\strictif", true);
defineSymbol(math, rel, "\u297c", "\\strictfi", true);

// AMS Binary Operators
defineSymbol(math, bin, "\u2214", "\\dotplus", true);
defineSymbol(math, bin, "\u2216", "\\smallsetminus");
defineSymbol(math, bin, "\u22d2", "\\Cap", true);
defineSymbol(math, bin, "\u22d3", "\\Cup", true);
defineSymbol(math, bin, "\u2a5e", "\\doublebarwedge", true);
defineSymbol(math, bin, "\u229f", "\\boxminus", true);
defineSymbol(math, bin, "\u229e", "\\boxplus", true);
defineSymbol(math, bin, "\u22c7", "\\divideontimes", true);
defineSymbol(math, bin, "\u22c9", "\\ltimes", true);
defineSymbol(math, bin, "\u22ca", "\\rtimes", true);
defineSymbol(math, bin, "\u22cb", "\\leftthreetimes", true);
defineSymbol(math, bin, "\u22cc", "\\rightthreetimes", true);
defineSymbol(math, bin, "\u22cf", "\\curlywedge", true);
defineSymbol(math, bin, "\u22ce", "\\curlyvee", true);
defineSymbol(math, bin, "\u229d", "\\circleddash", true);
defineSymbol(math, bin, "\u229b", "\\circledast", true);
defineSymbol(math, bin, "\u22ba", "\\intercal", true);
defineSymbol(math, bin, "\u22d2", "\\doublecap");
defineSymbol(math, bin, "\u22d3", "\\doublecup");
defineSymbol(math, bin, "\u22a0", "\\boxtimes", true);
defineSymbol(math, bin, "\u22c8", "\\bowtie", true);
defineSymbol(math, bin, "\u22c8", "\\Join");
defineSymbol(math, bin, "\u27d5", "\\leftouterjoin", true);
defineSymbol(math, bin, "\u27d6", "\\rightouterjoin", true);
defineSymbol(math, bin, "\u27d7", "\\fullouterjoin", true);

// AMS Arrows
// Note: unicode-math maps \u21e2 to their own function \rightdasharrow.
// We'll map it to AMS function \dashrightarrow. It produces the same atom.
defineSymbol(math, rel, "\u21e2", "\\dashrightarrow", true);
// unicode-math maps \u21e0 to \leftdasharrow. We'll use the AMS synonym.
defineSymbol(math, rel, "\u21e0", "\\dashleftarrow", true);
defineSymbol(math, rel, "\u21c7", "\\leftleftarrows", true);
defineSymbol(math, rel, "\u21c6", "\\leftrightarrows", true);
defineSymbol(math, rel, "\u21da", "\\Lleftarrow", true);
defineSymbol(math, rel, "\u219e", "\\twoheadleftarrow", true);
defineSymbol(math, rel, "\u21a2", "\\leftarrowtail", true);
defineSymbol(math, rel, "\u21ab", "\\looparrowleft", true);
defineSymbol(math, rel, "\u21cb", "\\leftrightharpoons", true);
defineSymbol(math, rel, "\u21b6", "\\curvearrowleft", true);
// unicode-math maps \u21ba to \acwopencirclearrow. We'll use the AMS synonym.
defineSymbol(math, rel, "\u21ba", "\\circlearrowleft", true);
defineSymbol(math, rel, "\u21b0", "\\Lsh", true);
defineSymbol(math, rel, "\u21c8", "\\upuparrows", true);
defineSymbol(math, rel, "\u21bf", "\\upharpoonleft", true);
defineSymbol(math, rel, "\u21c3", "\\downharpoonleft", true);
defineSymbol(math, rel, "\u22b6", "\\origof", true);
defineSymbol(math, rel, "\u22b7", "\\imageof", true);
defineSymbol(math, rel, "\u22b8", "\\multimap", true);
defineSymbol(math, rel, "\u21ad", "\\leftrightsquigarrow", true);
defineSymbol(math, rel, "\u21c9", "\\rightrightarrows", true);
defineSymbol(math, rel, "\u21c4", "\\rightleftarrows", true);
defineSymbol(math, rel, "\u21a0", "\\twoheadrightarrow", true);
defineSymbol(math, rel, "\u21a3", "\\rightarrowtail", true);
defineSymbol(math, rel, "\u21ac", "\\looparrowright", true);
defineSymbol(math, rel, "\u21b7", "\\curvearrowright", true);
// unicode-math maps \u21bb to \cwopencirclearrow. We'll use the AMS synonym.
defineSymbol(math, rel, "\u21bb", "\\circlearrowright", true);
defineSymbol(math, rel, "\u21b1", "\\Rsh", true);
defineSymbol(math, rel, "\u21ca", "\\downdownarrows", true);
defineSymbol(math, rel, "\u21be", "\\upharpoonright", true);
defineSymbol(math, rel, "\u21c2", "\\downharpoonright", true);
defineSymbol(math, rel, "\u21dd", "\\rightsquigarrow", true);
defineSymbol(math, rel, "\u21dd", "\\leadsto");
defineSymbol(math, rel, "\u21db", "\\Rrightarrow", true);
defineSymbol(math, rel, "\u21be", "\\restriction");

defineSymbol(math, textord, "\u2018", "`");
defineSymbol(math, textord, "$", "\\$");
defineSymbol(text, textord, "$", "\\$");
defineSymbol(text, textord, "$", "\\textdollar");
defineSymbol(math, textord, "¢", "\\cent");
defineSymbol(text, textord, "¢", "\\cent");
defineSymbol(math, textord, "%", "\\%");
defineSymbol(text, textord, "%", "\\%");
defineSymbol(math, textord, "_", "\\_");
defineSymbol(text, textord, "_", "\\_");
defineSymbol(text, textord, "_", "\\textunderscore");
defineSymbol(text, textord, "\u2423", "\\textvisiblespace", true);
defineSymbol(math, textord, "\u2220", "\\angle", true);
defineSymbol(math, textord, "\u221e", "\\infty", true);
defineSymbol(math, textord, "\u2032", "\\prime");
defineSymbol(math, textord, "\u25b3", "\\triangle");
defineSymbol(text, textord, "\u0391", "\\Alpha", true);
defineSymbol(text, textord, "\u0392", "\\Beta", true);
defineSymbol(text, textord, "\u0393", "\\Gamma", true);
defineSymbol(text, textord, "\u0394", "\\Delta", true);
defineSymbol(text, textord, "\u0395", "\\Epsilon", true);
defineSymbol(text, textord, "\u0396", "\\Zeta", true);
defineSymbol(text, textord, "\u0397", "\\Eta", true);
defineSymbol(text, textord, "\u0398", "\\Theta", true);
defineSymbol(text, textord, "\u0399", "\\Iota", true);
defineSymbol(text, textord, "\u039a", "\\Kappa", true);
defineSymbol(text, textord, "\u039b", "\\Lambda", true);
defineSymbol(text, textord, "\u039c", "\\Mu", true);
defineSymbol(text, textord, "\u039d", "\\Nu", true);
defineSymbol(text, textord, "\u039e", "\\Xi", true);
defineSymbol(text, textord, "\u039f", "\\Omicron", true);
defineSymbol(text, textord, "\u03a0", "\\Pi", true);
defineSymbol(text, textord, "\u03a1", "\\Rho", true);
defineSymbol(text, textord, "\u03a3", "\\Sigma", true);
defineSymbol(text, textord, "\u03a4", "\\Tau", true);
defineSymbol(text, textord, "\u03a5", "\\Upsilon", true);
defineSymbol(text, textord, "\u03a6", "\\Phi", true);
defineSymbol(text, textord, "\u03a7", "\\Chi", true);
defineSymbol(text, textord, "\u03a8", "\\Psi", true);
defineSymbol(text, textord, "\u03a9", "\\Omega", true);
defineSymbol(math, mathord, "\u0391", "\\Alpha", true);
defineSymbol(math, mathord, "\u0392", "\\Beta", true);
defineSymbol(math, mathord, "\u0393", "\\Gamma", true);
defineSymbol(math, mathord, "\u0394", "\\Delta", true);
defineSymbol(math, mathord, "\u0395", "\\Epsilon", true);
defineSymbol(math, mathord, "\u0396", "\\Zeta", true);
defineSymbol(math, mathord, "\u0397", "\\Eta", true);
defineSymbol(math, mathord, "\u0398", "\\Theta", true);
defineSymbol(math, mathord, "\u0399", "\\Iota", true);
defineSymbol(math, mathord, "\u039a", "\\Kappa", true);
defineSymbol(math, mathord, "\u039b", "\\Lambda", true);
defineSymbol(math, mathord, "\u039c", "\\Mu", true);
defineSymbol(math, mathord, "\u039d", "\\Nu", true);
defineSymbol(math, mathord, "\u039e", "\\Xi", true);
defineSymbol(math, mathord, "\u039f", "\\Omicron", true);
defineSymbol(math, mathord, "\u03a0", "\\Pi", true);
defineSymbol(math, mathord, "\u03a1", "\\Rho", true);
defineSymbol(math, mathord, "\u03a3", "\\Sigma", true);
defineSymbol(math, mathord, "\u03a4", "\\Tau", true);
defineSymbol(math, mathord, "\u03a5", "\\Upsilon", true);
defineSymbol(math, mathord, "\u03a6", "\\Phi", true);
defineSymbol(math, mathord, "\u03a7", "\\Chi", true);
defineSymbol(math, mathord, "\u03a8", "\\Psi", true);
defineSymbol(math, mathord, "\u03a9", "\\Omega", true);
defineSymbol(math, open, "\u00ac", "\\neg", true);
defineSymbol(math, open, "\u00ac", "\\lnot");
defineSymbol(math, textord, "\u22a4", "\\top");
defineSymbol(math, textord, "\u22a5", "\\bot");
defineSymbol(math, textord, "\u2205", "\\emptyset");
defineSymbol(math, textord, "\u00f8", "\\varnothing");
defineSymbol(math, mathord, "\u03b1", "\\alpha", true);
defineSymbol(math, mathord, "\u03b2", "\\beta", true);
defineSymbol(math, mathord, "\u03b3", "\\gamma", true);
defineSymbol(math, mathord, "\u03b4", "\\delta", true);
defineSymbol(math, mathord, "\u03f5", "\\epsilon", true);
defineSymbol(math, mathord, "\u03b6", "\\zeta", true);
defineSymbol(math, mathord, "\u03b7", "\\eta", true);
defineSymbol(math, mathord, "\u03b8", "\\theta", true);
defineSymbol(math, mathord, "\u03b9", "\\iota", true);
defineSymbol(math, mathord, "\u03ba", "\\kappa", true);
defineSymbol(math, mathord, "\u03bb", "\\lambda", true);
defineSymbol(math, mathord, "\u03bc", "\\mu", true);
defineSymbol(math, mathord, "\u03bd", "\\nu", true);
defineSymbol(math, mathord, "\u03be", "\\xi", true);
defineSymbol(math, mathord, "\u03bf", "\\omicron", true);
defineSymbol(math, mathord, "\u03c0", "\\pi", true);
defineSymbol(math, mathord, "\u03c1", "\\rho", true);
defineSymbol(math, mathord, "\u03c3", "\\sigma", true);
defineSymbol(math, mathord, "\u03c4", "\\tau", true);
defineSymbol(math, mathord, "\u03c5", "\\upsilon", true);
defineSymbol(math, mathord, "\u03d5", "\\phi", true);
defineSymbol(math, mathord, "\u03c7", "\\chi", true);
defineSymbol(math, mathord, "\u03c8", "\\psi", true);
defineSymbol(math, mathord, "\u03c9", "\\omega", true);
defineSymbol(math, mathord, "\u03b5", "\\varepsilon", true);
defineSymbol(math, mathord, "\u03d1", "\\vartheta", true);
defineSymbol(math, mathord, "\u03d6", "\\varpi", true);
defineSymbol(math, mathord, "\u03f1", "\\varrho", true);
defineSymbol(math, mathord, "\u03c2", "\\varsigma", true);
defineSymbol(math, mathord, "\u03c6", "\\varphi", true);
defineSymbol(math, mathord, "\u03d8", "\\Coppa", true);
defineSymbol(math, mathord, "\u03d9", "\\coppa", true);
defineSymbol(math, mathord, "\u03d9", "\\varcoppa", true);
defineSymbol(math, mathord, "\u03de", "\\Koppa", true);
defineSymbol(math, mathord, "\u03df", "\\koppa", true);
defineSymbol(math, mathord, "\u03e0", "\\Sampi", true);
defineSymbol(math, mathord, "\u03e1", "\\sampi", true);
defineSymbol(math, mathord, "\u03da", "\\Stigma", true);
defineSymbol(math, mathord, "\u03db", "\\stigma", true);
defineSymbol(math, mathord, "\u2aeb", "\\Bot");
defineSymbol(math, bin, "\u2217", "\u2217", true);
defineSymbol(math, bin, "+", "+");
defineSymbol(math, bin, "*", "*");
defineSymbol(math, bin, "\u2044", "\u2044");
defineSymbol(math, bin, "\u2212", "-", true);
defineSymbol(math, bin, "\u22c5", "\\cdot", true);
defineSymbol(math, bin, "\u2218", "\\circ", true);
defineSymbol(math, bin, "\u00f7", "\\div", true);
defineSymbol(math, bin, "\u00b1", "\\pm", true);
defineSymbol(math, bin, "\u00d7", "\\times", true);
defineSymbol(math, bin, "\u2229", "\\cap", true);
defineSymbol(math, bin, "\u222a", "\\cup", true);
defineSymbol(math, bin, "\u2216", "\\setminus", true);
defineSymbol(math, bin, "\u2227", "\\land");
defineSymbol(math, bin, "\u2228", "\\lor");
defineSymbol(math, bin, "\u2227", "\\wedge", true);
defineSymbol(math, bin, "\u2228", "\\vee", true);
defineSymbol(math, open, "\u27e6", "\\llbracket", true); // stmaryrd/semantic packages
defineSymbol(math, close, "\u27e7", "\\rrbracket", true);
defineSymbol(math, open, "\u27e8", "\\langle", true);
defineSymbol(math, open, "|", "\\lvert");
defineSymbol(math, open, "\u2016", "\\lVert");
defineSymbol(math, textord, "!", "\\oc"); // cmll package
defineSymbol(math, textord, "?", "\\wn");
defineSymbol(math, textord, "\u2193", "\\shpos");
defineSymbol(math, textord, "\u2195", "\\shift");
defineSymbol(math, textord, "\u2191", "\\shneg");
defineSymbol(math, close, "?", "?");
defineSymbol(math, close, "!", "!");
defineSymbol(math, close, "‼", "‼");
defineSymbol(math, close, "\u27e9", "\\rangle", true);
defineSymbol(math, close, "|", "\\rvert");
defineSymbol(math, close, "\u2016", "\\rVert");
defineSymbol(math, open, "\u2983", "\\lBrace", true); // stmaryrd/semantic packages
defineSymbol(math, close, "\u2984", "\\rBrace", true);
defineSymbol(math, rel, "=", "\\equal", true);
defineSymbol(math, rel, ":", ":");
defineSymbol(math, rel, "\u2248", "\\approx", true);
defineSymbol(math, rel, "\u2245", "\\cong", true);
defineSymbol(math, rel, "\u2265", "\\ge");
defineSymbol(math, rel, "\u2265", "\\geq", true);
defineSymbol(math, rel, "\u2190", "\\gets");
defineSymbol(math, rel, ">", "\\gt", true);
defineSymbol(math, rel, "\u2208", "\\in", true);
defineSymbol(math, rel, "\u2209", "\\notin", true);
defineSymbol(math, rel, "\ue020", "\\@not");
defineSymbol(math, rel, "\u2282", "\\subset", true);
defineSymbol(math, rel, "\u2283", "\\supset", true);
defineSymbol(math, rel, "\u2286", "\\subseteq", true);
defineSymbol(math, rel, "\u2287", "\\supseteq", true);
defineSymbol(math, rel, "\u2288", "\\nsubseteq", true);
defineSymbol(math, rel, "\u2288", "\\nsubseteqq");
defineSymbol(math, rel, "\u2289", "\\nsupseteq", true);
defineSymbol(math, rel, "\u2289", "\\nsupseteqq");
defineSymbol(math, rel, "\u22a8", "\\models");
defineSymbol(math, rel, "\u2190", "\\leftarrow", true);
defineSymbol(math, rel, "\u2264", "\\le");
defineSymbol(math, rel, "\u2264", "\\leq", true);
defineSymbol(math, rel, "<", "\\lt", true);
defineSymbol(math, rel, "\u2192", "\\rightarrow", true);
defineSymbol(math, rel, "\u2192", "\\to");
defineSymbol(math, rel, "\u2271", "\\ngeq", true);
defineSymbol(math, rel, "\u2271", "\\ngeqq");
defineSymbol(math, rel, "\u2271", "\\ngeqslant");
defineSymbol(math, rel, "\u2270", "\\nleq", true);
defineSymbol(math, rel, "\u2270", "\\nleqq");
defineSymbol(math, rel, "\u2270", "\\nleqslant");
defineSymbol(math, rel, "\u2aeb", "\\Perp", true); //cmll package
defineSymbol(math, spacing, "\u00a0", "\\ ");
defineSymbol(math, spacing, "\u00a0", "\\space");
// Ref: LaTeX Source 2e: \DeclareRobustCommand{\nobreakspace}{%
defineSymbol(math, spacing, "\u00a0", "\\nobreakspace");
defineSymbol(text, spacing, "\u00a0", "\\ ");
defineSymbol(text, spacing, "\u00a0", " ");
defineSymbol(text, spacing, "\u00a0", "\\space");
defineSymbol(text, spacing, "\u00a0", "\\nobreakspace");
defineSymbol(math, spacing, null, "\\nobreak");
defineSymbol(math, spacing, null, "\\allowbreak");
defineSymbol(math, punct, ",", ",");
defineSymbol(text, punct, ":", ":");
defineSymbol(math, punct, ";", ";");
defineSymbol(math, bin, "\u22bc", "\\barwedge", true);
defineSymbol(math, bin, "\u22bb", "\\veebar", true);
defineSymbol(math, bin, "\u2299", "\\odot", true);
defineSymbol(math, bin, "\u2295", "\\oplus", true);
defineSymbol(math, bin, "\u2297", "\\otimes", true);
defineSymbol(math, textord, "\u2202", "\\partial", true);
defineSymbol(math, bin, "\u2298", "\\oslash", true);
defineSymbol(math, bin, "\u229a", "\\circledcirc", true);
defineSymbol(math, bin, "\u22a1", "\\boxdot", true);
defineSymbol(math, bin, "\u25b3", "\\bigtriangleup");
defineSymbol(math, bin, "\u25bd", "\\bigtriangledown");
defineSymbol(math, bin, "\u2020", "\\dagger");
defineSymbol(math, bin, "\u22c4", "\\diamond");
defineSymbol(math, bin, "\u22c6", "\\star");
defineSymbol(math, bin, "\u25c3", "\\triangleleft");
defineSymbol(math, bin, "\u25b9", "\\triangleright");
defineSymbol(math, open, "{", "\\{");
defineSymbol(text, textord, "{", "\\{");
defineSymbol(text, textord, "{", "\\textbraceleft");
defineSymbol(math, close, "}", "\\}");
defineSymbol(text, textord, "}", "\\}");
defineSymbol(text, textord, "}", "\\textbraceright");
defineSymbol(math, open, "{", "\\lbrace");
defineSymbol(math, close, "}", "\\rbrace");
defineSymbol(math, open, "[", "\\lbrack", true);
defineSymbol(text, textord, "[", "\\lbrack", true);
defineSymbol(math, close, "]", "\\rbrack", true);
defineSymbol(text, textord, "]", "\\rbrack", true);
defineSymbol(math, open, "(", "\\lparen", true);
defineSymbol(math, close, ")", "\\rparen", true);
defineSymbol(text, textord, "<", "\\textless", true); // in T1 fontenc
defineSymbol(text, textord, ">", "\\textgreater", true); // in T1 fontenc
defineSymbol(math, open, "\u230a", "\\lfloor", true);
defineSymbol(math, close, "\u230b", "\\rfloor", true);
defineSymbol(math, open, "\u2308", "\\lceil", true);
defineSymbol(math, close, "\u2309", "\\rceil", true);
defineSymbol(math, textord, "\\", "\\backslash");
defineSymbol(math, textord, "|", "|");
defineSymbol(math, textord, "|", "\\vert");
defineSymbol(text, textord, "|", "\\textbar", true); // in T1 fontenc
defineSymbol(math, textord, "\u2016", "\\|");
defineSymbol(math, textord, "\u2016", "\\Vert");
defineSymbol(text, textord, "\u2016", "\\textbardbl");
defineSymbol(text, textord, "~", "\\textasciitilde");
defineSymbol(text, textord, "\\", "\\textbackslash");
defineSymbol(text, textord, "^", "\\textasciicircum");
defineSymbol(math, rel, "\u2191", "\\uparrow", true);
defineSymbol(math, rel, "\u21d1", "\\Uparrow", true);
defineSymbol(math, rel, "\u2193", "\\downarrow", true);
defineSymbol(math, rel, "\u21d3", "\\Downarrow", true);
defineSymbol(math, rel, "\u2195", "\\updownarrow", true);
defineSymbol(math, rel, "\u21d5", "\\Updownarrow", true);
defineSymbol(math, op, "\u2210", "\\coprod");
defineSymbol(math, op, "\u22c1", "\\bigvee");
defineSymbol(math, op, "\u22c0", "\\bigwedge");
defineSymbol(math, op, "\u2a04", "\\biguplus");
defineSymbol(math, op, "\u22c2", "\\bigcap");
defineSymbol(math, op, "\u22c3", "\\bigcup");
defineSymbol(math, op, "\u222b", "\\int");
defineSymbol(math, op, "\u222b", "\\intop");
defineSymbol(math, op, "\u222c", "\\iint");
defineSymbol(math, op, "\u222d", "\\iiint");
defineSymbol(math, op, "\u220f", "\\prod");
defineSymbol(math, op, "\u2211", "\\sum");
defineSymbol(math, op, "\u2a02", "\\bigotimes");
defineSymbol(math, op, "\u2a01", "\\bigoplus");
defineSymbol(math, op, "\u2a00", "\\bigodot");
defineSymbol(math, op, "\u222e", "\\oint");
defineSymbol(math, op, "\u222f", "\\oiint");
defineSymbol(math, op, "\u2230", "\\oiiint");
defineSymbol(math, op, "\u2231", "\\intclockwise");
defineSymbol(math, op, "\u2232", "\\varointclockwise");
defineSymbol(math, op, "\u2a0c", "\\iiiint");
defineSymbol(math, op, "\u2a0d", "\\intbar");
defineSymbol(math, op, "\u2a0e", "\\intBar");
defineSymbol(math, op, "\u2a0f", "\\fint");
defineSymbol(math, op, "\u2a12", "\\rppolint");
defineSymbol(math, op, "\u2a13", "\\scpolint");
defineSymbol(math, op, "\u2a15", "\\pointint");
defineSymbol(math, op, "\u2a16", "\\sqint");
defineSymbol(math, op, "\u2a17", "\\intlarhk");
defineSymbol(math, op, "\u2a18", "\\intx");
defineSymbol(math, op, "\u2a19", "\\intcap");
defineSymbol(math, op, "\u2a1a", "\\intcup");
defineSymbol(math, op, "\u2a05", "\\bigsqcap");
defineSymbol(math, op, "\u2a06", "\\bigsqcup");
defineSymbol(math, op, "\u222b", "\\smallint");
defineSymbol(text, inner, "\u2026", "\\textellipsis");
defineSymbol(math, inner, "\u2026", "\\mathellipsis");
defineSymbol(text, inner, "\u2026", "\\ldots", true);
defineSymbol(math, inner, "\u2026", "\\ldots", true);
defineSymbol(math, inner, "\u22f0", "\\iddots", true);
defineSymbol(math, inner, "\u22ef", "\\@cdots", true);
defineSymbol(math, inner, "\u22f1", "\\ddots", true);
defineSymbol(math, textord, "\u22ee", "\\varvdots"); // \vdots is a macro
defineSymbol(math, accent, "\u02ca", "\\acute");
defineSymbol(math, accent, "\u0060", "\\grave");
defineSymbol(math, accent, "\u00a8", "\\ddot");
defineSymbol(math, accent, "\u2026", "\\dddot");
defineSymbol(math, accent, "\u2026\u002e", "\\ddddot");
defineSymbol(math, accent, "\u007e", "\\tilde");
defineSymbol(math, accent, "\u203e", "\\bar");
defineSymbol(math, accent, "\u02d8", "\\breve");
defineSymbol(math, accent, "\u02c7", "\\check");
defineSymbol(math, accent, "\u005e", "\\hat");
defineSymbol(math, accent, "\u2192", "\\vec");
defineSymbol(math, accent, "\u02d9", "\\dot");
defineSymbol(math, accent, "\u02da", "\\mathring");
defineSymbol(math, mathord, "\u0131", "\\imath", true);
defineSymbol(math, mathord, "\u0237", "\\jmath", true);
defineSymbol(math, textord, "\u0131", "\u0131");
defineSymbol(math, textord, "\u0237", "\u0237");
defineSymbol(text, textord, "\u0131", "\\i", true);
defineSymbol(text, textord, "\u0237", "\\j", true);
defineSymbol(text, textord, "\u00df", "\\ss", true);
defineSymbol(text, textord, "\u00e6", "\\ae", true);
defineSymbol(text, textord, "\u0153", "\\oe", true);
defineSymbol(text, textord, "\u00f8", "\\o", true);
defineSymbol(math, mathord, "\u00f8", "\\o", true);
defineSymbol(text, textord, "\u00c6", "\\AE", true);
defineSymbol(text, textord, "\u0152", "\\OE", true);
defineSymbol(text, textord, "\u00d8", "\\O", true);
defineSymbol(math, mathord, "\u00d8", "\\O", true);
defineSymbol(text, accent, "\u02ca", "\\'"); // acute
defineSymbol(text, accent, "\u02cb", "\\`"); // grave
defineSymbol(text, accent, "\u02c6", "\\^"); // circumflex
defineSymbol(text, accent, "\u02dc", "\\~"); // tilde
defineSymbol(text, accent, "\u02c9", "\\="); // macron
defineSymbol(text, accent, "\u02d8", "\\u"); // breve
defineSymbol(text, accent, "\u02d9", "\\."); // dot above
defineSymbol(text, accent, "\u00b8", "\\c"); // cedilla
defineSymbol(text, accent, "\u02da", "\\r"); // ring above
defineSymbol(text, accent, "\u02c7", "\\v"); // caron
defineSymbol(text, accent, "\u00a8", '\\"'); // diaresis
defineSymbol(text, accent, "\u02dd", "\\H"); // double acute
defineSymbol(math, accent, "\u02ca", "\\'"); // acute
defineSymbol(math, accent, "\u02cb", "\\`"); // grave
defineSymbol(math, accent, "\u02c6", "\\^"); // circumflex
defineSymbol(math, accent, "\u02dc", "\\~"); // tilde
defineSymbol(math, accent, "\u02c9", "\\="); // macron
defineSymbol(math, accent, "\u02d8", "\\u"); // breve
defineSymbol(math, accent, "\u02d9", "\\."); // dot above
defineSymbol(math, accent, "\u00b8", "\\c"); // cedilla
defineSymbol(math, accent, "\u02da", "\\r"); // ring above
defineSymbol(math, accent, "\u02c7", "\\v"); // caron
defineSymbol(math, accent, "\u00a8", '\\"'); // diaresis
defineSymbol(math, accent, "\u02dd", "\\H"); // double acute

// These ligatures are detected and created in Parser.js's `formLigatures`.
export const ligatures = {
  "--": true,
  "---": true,
  "``": true,
  "''": true
};

defineSymbol(text, textord, "\u2013", "--", true);
defineSymbol(text, textord, "\u2013", "\\textendash");
defineSymbol(text, textord, "\u2014", "---", true);
defineSymbol(text, textord, "\u2014", "\\textemdash");
defineSymbol(text, textord, "\u2018", "`", true);
defineSymbol(text, textord, "\u2018", "\\textquoteleft");
defineSymbol(text, textord, "\u2019", "'", true);
defineSymbol(text, textord, "\u2019", "\\textquoteright");
defineSymbol(text, textord, "\u201c", "``", true);
defineSymbol(text, textord, "\u201c", "\\textquotedblleft");
defineSymbol(text, textord, "\u201d", "''", true);
defineSymbol(text, textord, "\u201d", "\\textquotedblright");
//  \degree from gensymb package
defineSymbol(math, textord, "\u00b0", "\\degree", true);
defineSymbol(text, textord, "\u00b0", "\\degree");
// \textdegree from inputenc package
defineSymbol(text, textord, "\u00b0", "\\textdegree", true);
// TODO: In LaTeX, \pounds can generate a different character in text and math
// mode, but among our fonts, only Main-Regular defines this character "163".
defineSymbol(math, textord, "\u00a3", "\\pounds");
defineSymbol(math, textord, "\u00a3", "\\mathsterling", true);
defineSymbol(text, textord, "\u00a3", "\\pounds");
defineSymbol(text, textord, "\u00a3", "\\textsterling", true);
defineSymbol(math, textord, "\u2720", "\\maltese");
defineSymbol(text, textord, "\u2720", "\\maltese");
defineSymbol(math, textord, "\u20ac", "\\euro", true);
defineSymbol(text, textord, "\u20ac", "\\euro", true);
defineSymbol(text, textord, "\u20ac", "\\texteuro");
defineSymbol(math, textord, "\u00a9", "\\copyright", true);
defineSymbol(text, textord, "\u00a9", "\\textcopyright");

// Italic Greek
defineSymbol(math, textord, "𝛤", "\\varGamma");
defineSymbol(math, textord, "𝛥", "\\varDelta");
defineSymbol(math, textord, "𝛩", "\\varTheta");
defineSymbol(math, textord, "𝛬", "\\varLambda");
defineSymbol(math, textord, "𝛯", "\\varXi");
defineSymbol(math, textord, "𝛱", "\\varPi");
defineSymbol(math, textord, "𝛴", "\\varSigma");
defineSymbol(math, textord, "𝛶", "\\varUpsilon");
defineSymbol(math, textord, "𝛷", "\\varPhi");
defineSymbol(math, textord, "𝛹", "\\varPsi");
defineSymbol(math, textord, "𝛺", "\\varOmega");
defineSymbol(text, textord, "𝛤", "\\varGamma");
defineSymbol(text, textord, "𝛥", "\\varDelta");
defineSymbol(text, textord, "𝛩", "\\varTheta");
defineSymbol(text, textord, "𝛬", "\\varLambda");
defineSymbol(text, textord, "𝛯", "\\varXi");
defineSymbol(text, textord, "𝛱", "\\varPi");
defineSymbol(text, textord, "𝛴", "\\varSigma");
defineSymbol(text, textord, "𝛶", "\\varUpsilon");
defineSymbol(text, textord, "𝛷", "\\varPhi");
defineSymbol(text, textord, "𝛹", "\\varPsi");
defineSymbol(text, textord, "𝛺", "\\varOmega");


// There are lots of symbols which are the same, so we add them in afterwards.
// All of these are textords in math mode
const mathTextSymbols = '0123456789/@."';
for (let i = 0; i < mathTextSymbols.length; i++) {
  const ch = mathTextSymbols.charAt(i);
  defineSymbol(math, textord, ch, ch);
}

// All of these are textords in text mode
const textSymbols = '0123456789!@*()-=+";:?/.,';
for (let i = 0; i < textSymbols.length; i++) {
  const ch = textSymbols.charAt(i);
  defineSymbol(text, textord, ch, ch);
}

// All of these are textords in text mode, and mathords in math mode
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
for (let i = 0; i < letters.length; i++) {
  const ch = letters.charAt(i);
  defineSymbol(math, mathord, ch, ch);
  defineSymbol(text, textord, ch, ch);
}

// Some more letters in Unicode Basic Multilingual Plane.
const narrow = "ÇÐÞçþℂℍℕℙℚℝℤℎℏℊℋℌℐℑℒℓ℘ℛℜℬℰℱℳℭℨ";
for (let i = 0; i < narrow.length; i++) {
  const ch = narrow.charAt(i);
  defineSymbol(math, mathord, ch, ch);
  defineSymbol(text, textord, ch, ch);
}

// The next loop loads wide (surrogate pair) characters.
// We support some letters in the Unicode range U+1D400 to U+1D7FF,
// Mathematical Alphanumeric Symbols.
let wideChar = "";
for (let i = 0; i < letters.length; i++) {
  // The hex numbers in the next line are a surrogate pair.
  // 0xD835 is the high surrogate for all letters in the range we support.
  // 0xDC00 is the low surrogate for bold A.
  wideChar = String.fromCharCode(0xd835, 0xdc00 + i); // A-Z a-z bold
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdc34 + i); // A-Z a-z italic
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdc68 + i); // A-Z a-z bold italic
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdd04 + i); // A-Z a-z Fractur
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdda0 + i); // A-Z a-z sans-serif
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xddd4 + i); // A-Z a-z sans bold
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xde08 + i); // A-Z a-z sans italic
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xde70 + i); // A-Z a-z monospace
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdd38 + i); // A-Z a-z double struck
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  const ch = letters.charAt(i);
  wideChar = String.fromCharCode(0xd835, 0xdc9c + i); // A-Z a-z calligraphic
  defineSymbol(math, mathord, ch, wideChar);
  defineSymbol(text, textord, ch, wideChar);
}

// Next, some wide character numerals
for (let i = 0; i < 10; i++) {
  wideChar = String.fromCharCode(0xd835, 0xdfce + i); // 0-9 bold
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdfe2 + i); // 0-9 sans serif
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdfec + i); // 0-9 bold sans
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);

  wideChar = String.fromCharCode(0xd835, 0xdff6 + i); // 0-9 monospace
  defineSymbol(math, mathord, wideChar, wideChar);
  defineSymbol(text, textord, wideChar, wideChar);
}
