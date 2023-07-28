/**
 * Predefined macros for Temml.
 * This can be used to define some commands in terms of others.
 */

// Export global macros object from defineMacro
import defineMacro, { _macros } from "./defineMacro";
const macros = _macros;
export default macros;

import symbols from "./symbols";
import ParseError from "./ParseError";

//////////////////////////////////////////////////////////////////////
// macro tools

defineMacro("\\noexpand", function(context) {
  // The expansion is the token itself; but that token is interpreted
  // as if its meaning were ‘\relax’ if it is a control sequence that
  // would ordinarily be expanded by TeX’s expansion rules.
  const t = context.popToken();
  if (context.isExpandable(t.text)) {
    t.noexpand = true;
    t.treatAsRelax = true;
  }
  return { tokens: [t], numArgs: 0 };
});

defineMacro("\\expandafter", function(context) {
  // TeX first reads the token that comes immediately after \expandafter,
  // without expanding it; let’s call this token t. Then TeX reads the
  // token that comes after t (and possibly more tokens, if that token
  // has an argument), replacing it by its expansion. Finally TeX puts
  // t back in front of that expansion.
  const t = context.popToken();
  context.expandOnce(true); // expand only an expandable token
  return { tokens: [t], numArgs: 0 };
});

// LaTeX's \@firstoftwo{#1}{#2} expands to #1, skipping #2
// TeX source: \long\def\@firstoftwo#1#2{#1}
defineMacro("\\@firstoftwo", function(context) {
  const args = context.consumeArgs(2);
  return { tokens: args[0], numArgs: 0 };
});

// LaTeX's \@secondoftwo{#1}{#2} expands to #2, skipping #1
// TeX source: \long\def\@secondoftwo#1#2{#2}
defineMacro("\\@secondoftwo", function(context) {
  const args = context.consumeArgs(2);
  return { tokens: args[1], numArgs: 0 };
});

// LaTeX's \@ifnextchar{#1}{#2}{#3} looks ahead to the next (unexpanded)
// symbol that isn't a space, consuming any spaces but not consuming the
// first nonspace character.  If that nonspace character matches #1, then
// the macro expands to #2; otherwise, it expands to #3.
defineMacro("\\@ifnextchar", function(context) {
  const args = context.consumeArgs(3); // symbol, if, else
  context.consumeSpaces();
  const nextToken = context.future();
  if (args[0].length === 1 && args[0][0].text === nextToken.text) {
    return { tokens: args[1], numArgs: 0 };
  } else {
    return { tokens: args[2], numArgs: 0 };
  }
});

// LaTeX's \@ifstar{#1}{#2} looks ahead to the next (unexpanded) symbol.
// If it is `*`, then it consumes the symbol, and the macro expands to #1;
// otherwise, the macro expands to #2 (without consuming the symbol).
// TeX source: \def\@ifstar#1{\@ifnextchar *{\@firstoftwo{#1}}}
defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");

// LaTeX's \TextOrMath{#1}{#2} expands to #1 in text mode, #2 in math mode
defineMacro("\\TextOrMath", function(context) {
  const args = context.consumeArgs(2);
  if (context.mode === "text") {
    return { tokens: args[0], numArgs: 0 };
  } else {
    return { tokens: args[1], numArgs: 0 };
  }
});

const stringFromArg = arg => {
  // Reverse the order of the arg and return a string.
  let str = ""
  for (let i = arg.length - 1; i > -1; i--) {
    str += arg[i].text
  }
  return str
}

// Lookup table for parsing numbers in base 8 through 16
const digitToNumber = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};

const nextCharNumber = context => {
  const numStr = context.future().text
  if (numStr === "EOF") { return [null, ""] }
  return [digitToNumber[numStr.charAt(0)], numStr]
}

const appendCharNumbers = (number, numStr, base) => {
  for (let i = 1; i < numStr.length; i++) {
    const digit = digitToNumber[numStr.charAt(i)]
    number *= base;
    number += digit;
  }
  return number
}

// TeX \char makes a literal character (catcode 12) using the following forms:
// (see The TeXBook, p. 43)
//   \char123  -- decimal
//   \char'123 -- octal
//   \char"123 -- hex
//   \char`x   -- character that can be written (i.e. isn't active)
//   \char`\x  -- character that cannot be written (e.g. %)
// These all refer to characters from the font, so we turn them into special
// calls to a function \@char dealt with in the Parser.
defineMacro("\\char", function(context) {
  let token = context.popToken();
  let base;
  let number = "";
  if (token.text === "'") {
    base = 8;
    token = context.popToken();
  } else if (token.text === '"') {
    base = 16;
    token = context.popToken();
  } else if (token.text === "`") {
    token = context.popToken();
    if (token.text[0] === "\\") {
      number = token.text.charCodeAt(1);
    } else if (token.text === "EOF") {
      throw new ParseError("\\char` missing argument");
    } else {
      number = token.text.charCodeAt(0);
    }
  } else {
    base = 10;
  }
  if (base) {
    // Parse a number in the given base, starting with first `token`.
    let numStr = token.text
    number = digitToNumber[numStr.charAt(0)];
    if (number == null || number >= base) {
      throw new ParseError(`Invalid base-${base} digit ${token.text}`);
    }
    number = appendCharNumbers(number, numStr, base)
    let digit;
    [digit, numStr] = nextCharNumber(context)
    while (digit != null && digit < base) {
      number *= base;
      number += digit;
      number = appendCharNumbers(number, numStr, base)
      context.popToken();
      [digit, numStr] = nextCharNumber(context)
    }
  }
  return `\\@char{${number}}`;
});

// The Latin Modern font renders <mi>√</mi> at the wrong vertical alignment.
// This macro provides a better rendering.
defineMacro("\\surd", '\\sqrt{\\vphantom{|}}')

defineMacro("\\hbox", "\\text{#1}");

// Per TeXbook p.122, "/" gets zero operator spacing.
// And MDN recommends using U+2044 instead of / for inline
defineMacro("/", "{\u2044}")

// Since Temml has no \par, ignore \long.
defineMacro("\\long", "")

//////////////////////////////////////////////////////////////////////
// Grouping
// \let\bgroup={ \let\egroup=}
defineMacro("\\bgroup", "{");
defineMacro("\\egroup", "}");

// Symbols from latex.ltx:
// \def~{\nobreakspace{}}
// \def\lq{`}
// \def\rq{'}
// \def \aa {\r a}
defineMacro("~", "\\nobreakspace");
defineMacro("\\lq", "`");
defineMacro("\\rq", "'");
defineMacro("\\aa", "\\r a");

defineMacro("\\Bbbk", "\\Bbb{k}");

// \mathstrut from the TeXbook, p 360
defineMacro("\\mathstrut", "\\vphantom{(}");

// \underbar from TeXbook p 353
defineMacro("\\underbar", "\\underline{\\text{#1}}");

//////////////////////////////////////////////////////////////////////
// LaTeX_2ε

// \vdots{\vbox{\baselineskip4\p@  \lineskiplimit\z@
// \kern6\p@\hbox{.}\hbox{.}\hbox{.}}}
// We'll call \varvdots, which gets a glyph from symbols.js.
// The zero-width rule gets us an equivalent to the vertical 6pt kern.
defineMacro("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
defineMacro("\u22ee", "\\vdots");

//////////////////////////////////////////////////////////////////////
// amsmath.sty
// http://mirrors.concertpass.com/tex-archive/macros/latex/required/amsmath/amsmath.pdf

//\newcommand{\substack}[1]{\subarray{c}#1\endsubarray}
defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");

// \def\iff{\DOTSB\;\Longleftrightarrow\;}
// \def\implies{\DOTSB\;\Longrightarrow\;}
// \def\impliedby{\DOTSB\;\Longleftarrow\;}
defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");

// AMSMath's automatic \dots, based on \mdots@@ macro.
const dotsByToken = {
  ",": "\\dotsc",
  "\\not": "\\dotsb",
  // \keybin@ checks for the following:
  "+": "\\dotsb",
  "=": "\\dotsb",
  "<": "\\dotsb",
  ">": "\\dotsb",
  "-": "\\dotsb",
  "*": "\\dotsb",
  ":": "\\dotsb",
  // Symbols whose definition starts with \DOTSB:
  "\\DOTSB": "\\dotsb",
  "\\coprod": "\\dotsb",
  "\\bigvee": "\\dotsb",
  "\\bigwedge": "\\dotsb",
  "\\biguplus": "\\dotsb",
  "\\bigcap": "\\dotsb",
  "\\bigcup": "\\dotsb",
  "\\prod": "\\dotsb",
  "\\sum": "\\dotsb",
  "\\bigotimes": "\\dotsb",
  "\\bigoplus": "\\dotsb",
  "\\bigodot": "\\dotsb",
  "\\bigsqcap": "\\dotsb",
  "\\bigsqcup": "\\dotsb",
  "\\And": "\\dotsb",
  "\\longrightarrow": "\\dotsb",
  "\\Longrightarrow": "\\dotsb",
  "\\longleftarrow": "\\dotsb",
  "\\Longleftarrow": "\\dotsb",
  "\\longleftrightarrow": "\\dotsb",
  "\\Longleftrightarrow": "\\dotsb",
  "\\mapsto": "\\dotsb",
  "\\longmapsto": "\\dotsb",
  "\\hookrightarrow": "\\dotsb",
  "\\doteq": "\\dotsb",
  // Symbols whose definition starts with \mathbin:
  "\\mathbin": "\\dotsb",
  // Symbols whose definition starts with \mathrel:
  "\\mathrel": "\\dotsb",
  "\\relbar": "\\dotsb",
  "\\Relbar": "\\dotsb",
  "\\xrightarrow": "\\dotsb",
  "\\xleftarrow": "\\dotsb",
  // Symbols whose definition starts with \DOTSI:
  "\\DOTSI": "\\dotsi",
  "\\int": "\\dotsi",
  "\\oint": "\\dotsi",
  "\\iint": "\\dotsi",
  "\\iiint": "\\dotsi",
  "\\iiiint": "\\dotsi",
  "\\idotsint": "\\dotsi",
  // Symbols whose definition starts with \DOTSX:
  "\\DOTSX": "\\dotsx"
};

defineMacro("\\dots", function(context) {
  // TODO: If used in text mode, should expand to \textellipsis.
  // However, in Temml, \textellipsis and \ldots behave the same
  // (in text mode), and it's unlikely we'd see any of the math commands
  // that affect the behavior of \dots when in text mode.  So fine for now
  // (until we support \ifmmode ... \else ... \fi).
  let thedots = "\\dotso";
  const next = context.expandAfterFuture().text;
  if (next in dotsByToken) {
    thedots = dotsByToken[next];
  } else if (next.slice(0, 4) === "\\not") {
    thedots = "\\dotsb";
  } else if (next in symbols.math) {
    if (["bin", "rel"].includes(symbols.math[next].group)) {
      thedots = "\\dotsb";
    }
  }
  return thedots;
});

const spaceAfterDots = {
  // \rightdelim@ checks for the following:
  ")": true,
  "]": true,
  "\\rbrack": true,
  "\\}": true,
  "\\rbrace": true,
  "\\rangle": true,
  "\\rceil": true,
  "\\rfloor": true,
  "\\rgroup": true,
  "\\rmoustache": true,
  "\\right": true,
  "\\bigr": true,
  "\\biggr": true,
  "\\Bigr": true,
  "\\Biggr": true,
  // \extra@ also tests for the following:
  $: true,
  // \extrap@ checks for the following:
  ";": true,
  ".": true,
  ",": true
};

defineMacro("\\dotso", function(context) {
  const next = context.future().text;
  if (next in spaceAfterDots) {
    return "\\ldots\\,";
  } else {
    return "\\ldots";
  }
});

defineMacro("\\dotsc", function(context) {
  const next = context.future().text;
  // \dotsc uses \extra@ but not \extrap@, instead specially checking for
  // ';' and '.', but doesn't check for ','.
  if (next in spaceAfterDots && next !== ",") {
    return "\\ldots\\,";
  } else {
    return "\\ldots";
  }
});

defineMacro("\\cdots", function(context) {
  const next = context.future().text;
  if (next in spaceAfterDots) {
    return "\\@cdots\\,";
  } else {
    return "\\@cdots";
  }
});

defineMacro("\\dotsb", "\\cdots");
defineMacro("\\dotsm", "\\cdots");
defineMacro("\\dotsi", "\\!\\cdots");
defineMacro("\\idotsint", "\\dotsi");
// amsmath doesn't actually define \dotsx, but \dots followed by a macro
// starting with \DOTSX implies \dotso, and then \extra@ detects this case
// and forces the added `\,`.
defineMacro("\\dotsx", "\\ldots\\,");

// \let\DOTSI\relax
// \let\DOTSB\relax
// \let\DOTSX\relax
defineMacro("\\DOTSI", "\\relax");
defineMacro("\\DOTSB", "\\relax");
defineMacro("\\DOTSX", "\\relax");

// Spacing, based on amsmath.sty's override of LaTeX defaults
// \DeclareRobustCommand{\tmspace}[3]{%
//   \ifmmode\mskip#1#2\else\kern#1#3\fi\relax}
defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
// \renewcommand{\,}{\tmspace+\thinmuskip{.1667em}}
// TODO: math mode should use \thinmuskip
defineMacro("\\,", "{\\tmspace+{3mu}{.1667em}}");
// \let\thinspace\,
defineMacro("\\thinspace", "\\,");
// \def\>{\mskip\medmuskip}
// \renewcommand{\:}{\tmspace+\medmuskip{.2222em}}
// TODO: \> and math mode of \: should use \medmuskip = 4mu plus 2mu minus 4mu
defineMacro("\\>", "\\mskip{4mu}");
defineMacro("\\:", "{\\tmspace+{4mu}{.2222em}}");
// \let\medspace\:
defineMacro("\\medspace", "\\:");
// \renewcommand{\;}{\tmspace+\thickmuskip{.2777em}}
// TODO: math mode should use \thickmuskip = 5mu plus 5mu
defineMacro("\\;", "{\\tmspace+{5mu}{.2777em}}");
// \let\thickspace\;
defineMacro("\\thickspace", "\\;");
// \renewcommand{\!}{\tmspace-\thinmuskip{.1667em}}
// TODO: math mode should use \thinmuskip
defineMacro("\\!", "{\\tmspace-{3mu}{.1667em}}");
// \let\negthinspace\!
defineMacro("\\negthinspace", "\\!");
// \newcommand{\negmedspace}{\tmspace-\medmuskip{.2222em}}
// TODO: math mode should use \medmuskip
defineMacro("\\negmedspace", "{\\tmspace-{4mu}{.2222em}}");
// \newcommand{\negthickspace}{\tmspace-\thickmuskip{.2777em}}
// TODO: math mode should use \thickmuskip
defineMacro("\\negthickspace", "{\\tmspace-{5mu}{.277em}}");
// \def\enspace{\kern.5em }
defineMacro("\\enspace", "\\kern.5em ");
// \def\enskip{\hskip.5em\relax}
defineMacro("\\enskip", "\\hskip.5em\\relax");
// \def\quad{\hskip1em\relax}
defineMacro("\\quad", "\\hskip1em\\relax");
// \def\qquad{\hskip2em\relax}
defineMacro("\\qquad", "\\hskip2em\\relax");

// \tag@in@display form of \tag
defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
defineMacro("\\tag@literal", (context) => {
  if (context.macros.get("\\df@tag")) {
    throw new ParseError("Multiple \\tag");
  }
  return "\\def\\df@tag{\\text{#1}}";
});

// \renewcommand{\bmod}{\nonscript\mskip-\medmuskip\mkern5mu\mathbin
//   {\operator@font mod}\penalty900
//   \mkern5mu\nonscript\mskip-\medmuskip}
// \newcommand{\pod}[1]{\allowbreak
//   \if@display\mkern18mu\else\mkern8mu\fi(#1)}
// \renewcommand{\pmod}[1]{\pod{{\operator@font mod}\mkern6mu#1}}
// \newcommand{\mod}[1]{\allowbreak\if@display\mkern18mu
//   \else\mkern12mu\fi{\operator@font mod}\,\,#1}
// TODO: math mode should use \medmuskip = 4mu plus 2mu minus 4mu
defineMacro("\\bmod", "\\mathbin{\\text{mod}}");
defineMacro(
  "\\pod",
  "\\allowbreak" + "\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)"
);
defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
defineMacro(
  "\\mod",
  "\\allowbreak" +
    "\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}" +
    "{\\rm mod}\\,\\,#1"
);

//////////////////////////////////////////////////////////////////////
// LaTeX source2e

// \expandafter\let\expandafter\@normalcr
//     \csname\expandafter\@gobble\string\\ \endcsname
// \DeclareRobustCommand\newline{\@normalcr\relax}
defineMacro("\\newline", "\\\\\\relax");

// \def\TeX{T\kern-.1667em\lower.5ex\hbox{E}\kern-.125emX\@}
// TODO: Doesn't normally work in math mode because \@ fails.
defineMacro("\\TeX", "\\textrm{T}\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125em\\textrm{X}");

defineMacro(
  "\\LaTeX",
    "\\textrm{L}\\kern-.35em\\raisebox{0.2em}{\\scriptstyle A}\\kern-.15em\\TeX"
);

defineMacro(
  "\\Temml",
  // eslint-disable-next-line max-len
  "\\textrm{T}\\kern-0.2em\\lower{0.2em}{\\textrm{E}}\\kern-0.08em{\\textrm{M}\\kern-0.08em\\raise{0.2em}\\textrm{M}\\kern-0.08em\\textrm{L}}"
);

// \DeclareRobustCommand\hspace{\@ifstar\@hspacer\@hspace}
// \def\@hspace#1{\hskip  #1\relax}
// \def\@hspacer#1{\vrule \@width\z@\nobreak
//                 \hskip #1\hskip \z@skip}
defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
defineMacro("\\@hspace", "\\hskip #1\\relax");
defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");

defineMacro("\\colon", `\\mathpunct{\\char"3a}`)

//////////////////////////////////////////////////////////////////////
// mathtools.sty

defineMacro("\\prescript", "\\pres@cript{_{#1}^{#2}}{}{#3}")

//\providecommand\ordinarycolon{:}
defineMacro("\\ordinarycolon", `\\char"3a`);
// Raise to center on the math axis, as closely as possible.
defineMacro("\\vcentcolon", "\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}}");
// \providecommand*\coloneq{\vcentcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
defineMacro("\\coloneq", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2212}');
// \providecommand*\Coloneq{\dblcolon\mathrel{\mkern-1.2mu}\mathrel{-}}
defineMacro("\\Coloneq", '\\mathrel{\\char"2237\\char"2212}');
// \providecommand*\Eqqcolon{=\mathrel{\mkern-1.2mu}\dblcolon}
defineMacro("\\Eqqcolon", '\\mathrel{\\char"3d\\char"2237}');
// \providecommand*\Eqcolon{\mathrel{-}\mathrel{\mkern-1.2mu}\dblcolon}
defineMacro("\\Eqcolon", '\\mathrel{\\char"2212\\char"2237}');
// \providecommand*\colonapprox{\vcentcolon\mathrel{\mkern-1.2mu}\approx}
defineMacro("\\colonapprox", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"2248}');
// \providecommand*\Colonapprox{\dblcolon\mathrel{\mkern-1.2mu}\approx}
defineMacro("\\Colonapprox", '\\mathrel{\\char"2237\\char"2248}');
// \providecommand*\colonsim{\vcentcolon\mathrel{\mkern-1.2mu}\sim}
defineMacro("\\colonsim", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}');
// \providecommand*\Colonsim{\dblcolon\mathrel{\mkern-1.2mu}\sim}
defineMacro("\\Colonsim", '\\mathrel{\\raisebox{0.035em}{\\ordinarycolon}\\char"223c}');

//////////////////////////////////////////////////////////////////////
// colonequals.sty

// Alternate names for mathtools's macros:
defineMacro("\\ratio", "\\vcentcolon");
defineMacro("\\coloncolon", "\\dblcolon");
defineMacro("\\colonequals", "\\coloneqq");
defineMacro("\\coloncolonequals", "\\Coloneqq");
defineMacro("\\equalscolon", "\\eqqcolon");
defineMacro("\\equalscoloncolon", "\\Eqqcolon");
defineMacro("\\colonminus", "\\coloneq");
defineMacro("\\coloncolonminus", "\\Coloneq");
defineMacro("\\minuscolon", "\\eqcolon");
defineMacro("\\minuscoloncolon", "\\Eqcolon");
// \colonapprox name is same in mathtools and colonequals.
defineMacro("\\coloncolonapprox", "\\Colonapprox");
// \colonsim name is same in mathtools and colonequals.
defineMacro("\\coloncolonsim", "\\Colonsim");

// Present in newtxmath, pxfonts and txfonts
defineMacro("\\notni", "\\mathrel{\\char`\u220C}");
defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");

//////////////////////////////////////////////////////////////////////
// From amsopn.sty
defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{\\text{lim}}}");
defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{\\text{lim}}}");
defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{\\text{lim}}}");
defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{\\text{lim}}}");

defineMacro("\\centerdot", "{\\medspace\\rule{0.167em}{0.189em}\\medspace}")

//////////////////////////////////////////////////////////////////////
// statmath.sty
// https://ctan.math.illinois.edu/macros/latex/contrib/statmath/statmath.pdf

defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
defineMacro("\\plim", "\\DOTSB\\operatorname*{plim}");

//////////////////////////////////////////////////////////////////////
// braket.sty
// http://ctan.math.washington.edu/tex-archive/macros/latex/contrib/braket/braket.pdf

defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
defineMacro("\\Bra", "\\left\\langle#1\\right|");
defineMacro("\\Ket", "\\left|#1\\right\\rangle");
const braketHelper = (one) => (context) => {
  const left = context.consumeArg().tokens;
  const middle = context.consumeArg().tokens;
  const middleDouble = context.consumeArg().tokens;
  const right = context.consumeArg().tokens;
  const oldMiddle = context.macros.get("|");
  const oldMiddleDouble = context.macros.get("\\|");
  context.macros.beginGroup();
  const midMacro = (double) => (context) => {
    if (one) {
      // Only modify the first instance of | or \|
      context.macros.set("|", oldMiddle);
      if (middleDouble.length) {
        context.macros.set("\\|", oldMiddleDouble);
      }
    }
    let doubled = double;
    if (!double && middleDouble.length) {
      // Mimic \@ifnextchar
      const nextToken = context.future();
      if (nextToken.text === "|") {
        context.popToken();
        doubled = true;
      }
    }
    return {
      tokens: doubled ? middleDouble : middle,
      numArgs: 0
    };
  };
  context.macros.set("|", midMacro(false));
  if (middleDouble.length) {
    context.macros.set("\\|", midMacro(true));
  }
  const arg = context.consumeArg().tokens;
  const expanded = context.expandTokens([...right, ...arg, ...left]);  // reversed
  context.macros.endGroup();
  return {
    tokens: expanded.reverse(),
    numArgs: 0
  };
};
defineMacro("\\bra@ket", braketHelper(false));
defineMacro("\\bra@set", braketHelper(true));
defineMacro("\\Braket", "\\bra@ket{\\left\\langle}" +
  "{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
defineMacro("\\Set", "\\bra@set{\\left\\{\\:}" +
  "{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
  // has no support for special || or \|

//////////////////////////////////////////////////////////////////////
// actuarialangle.dtx
defineMacro("\\angln", "{\\angl n}");

//////////////////////////////////////////////////////////////////////
// derivative.sty
defineMacro("\\odv", "\\@ifstar\\odv@next\\odv@numerator");
defineMacro("\\odv@numerator", "\\frac{\\mathrm{d}#1}{\\mathrm{d}#2}")
defineMacro("\\odv@next", "\\frac{\\mathrm{d}}{\\mathrm{d}#2}#1")
defineMacro("\\pdv", "\\@ifstar\\pdv@next\\pdv@numerator");

const pdvHelper = args => {
  const numerator = args[0][0].text
  const denoms = stringFromArg(args[1]).split(",")
  const power = String(denoms.length)
  const numOp = power === "1" ? "\\partial" : `\\partial^${power}`
  let denominator = ""
  denoms.map(e => { denominator += "\\partial " + e.trim() +  "\\,"})
  return [numerator, numOp,  denominator.replace(/\\,$/, "")]
}
defineMacro("\\pdv@numerator", function(context) {
  const [numerator, numOp, denominator] = pdvHelper(context.consumeArgs(2))
  return `\\frac{${numOp} ${numerator}}{${denominator}}`
})
defineMacro("\\pdv@next", function(context) {
  const [numerator, numOp, denominator] = pdvHelper(context.consumeArgs(2))
  return `\\frac{${numOp}}{${denominator}} ${numerator}`
})

//////////////////////////////////////////////////////////////////////
// upgreek.dtx
defineMacro("\\upalpha", "\\up@greek{\\alpha}");
defineMacro("\\upbeta", "\\up@greek{\\beta}");
defineMacro("\\upgamma", "\\up@greek{\\gamma}");
defineMacro("\\updelta", "\\up@greek{\\delta}");
defineMacro("\\upepsilon", "\\up@greek{\\epsilon}");
defineMacro("\\upzeta", "\\up@greek{\\zeta}");
defineMacro("\\upeta", "\\up@greek{\\eta}");
defineMacro("\\uptheta", "\\up@greek{\\theta}");
defineMacro("\\upiota", "\\up@greek{\\iota}");
defineMacro("\\upkappa", "\\up@greek{\\kappa}");
defineMacro("\\uplambda", "\\up@greek{\\lambda}");
defineMacro("\\upmu", "\\up@greek{\\mu}");
defineMacro("\\upnu", "\\up@greek{\\nu}");
defineMacro("\\upxi", "\\up@greek{\\xi}");
defineMacro("\\upomicron", "\\up@greek{\\omicron}");
defineMacro("\\uppi", "\\up@greek{\\pi}");
defineMacro("\\upalpha", "\\up@greek{\\alpha}");
defineMacro("\\uprho", "\\up@greek{\\rho}");
defineMacro("\\upsigma", "\\up@greek{\\sigma}");
defineMacro("\\uptau", "\\up@greek{\\tau}");
defineMacro("\\upupsilon", "\\up@greek{\\upsilon}");
defineMacro("\\upphi", "\\up@greek{\\phi}");
defineMacro("\\upchi", "\\up@greek{\\chi}");
defineMacro("\\uppsi", "\\up@greek{\\psi}");
defineMacro("\\upomega", "\\up@greek{\\omega}");

//////////////////////////////////////////////////////////////////////
// cmll package
defineMacro("\\invamp", '\\mathbin{\\char"214b}')
defineMacro("\\parr", '\\mathbin{\\char"214b}')
defineMacro("\\with", '\\mathbin{\\char"26}')
defineMacro("\\multimapinv", '\\mathrel{\\char"27dc}')
defineMacro("\\multimapboth", '\\mathrel{\\char"29df}')
defineMacro("\\scoh", '{\\mkern5mu\\char"2322\\mkern5mu}')
defineMacro("\\sincoh", '{\\mkern5mu\\char"2323\\mkern5mu}')
defineMacro("\\coh", `{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2322}}}
{\\smash{\\lower4mu{\\char"2323}}}\\mkern5mu}`)
defineMacro("\\incoh", `{\\mkern5mu\\rule{}{0.7em}\\mathrlap{\\smash{\\raise2mu{\\char"2323}}}
{\\smash{\\lower4mu{\\char"2322}}}\\mkern5mu}`)


//////////////////////////////////////////////////////////////////////
// chemstyle package
defineMacro("\\standardstate", "\\text{\\tiny\\char`⦵}");
