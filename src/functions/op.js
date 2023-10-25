// Limits, symbols
import defineFunction, { ordargument } from "../defineFunction";
import * as mathMLTree from "../mathMLTree";
import * as mml from "../buildMathML";
import { isDelimiter } from "./delimsizing"

// Some helpers

const ordAtomTypes = ["textord", "mathord", "atom"]

// Most operators have a large successor symbol, but these don't.
const noSuccessor = ["\\smallint"];

// Math operators (e.g. \sin) need a space between these types and themselves:
export const ordTypes = ["textord", "mathord", "ordgroup", "close", "leftright"];

// NOTE: Unlike most `builders`s, this one handles not only "op", but also
// "supsub" since some of them (like \int) can affect super/subscripting.

const mathmlBuilder = (group, style) => {
  let node;

  if (group.symbol) {
    // This is a symbol. Just add the symbol.
    node = new mathMLTree.MathNode("mo", [mml.makeText(group.name, group.mode)]);
    if (noSuccessor.includes(group.name)) {
      node.setAttribute("largeop", "false")
    } else {
      node.setAttribute("movablelimits", "false")
    }
  } else if (group.body) {
    // This is an operator with children. Add them.
    node = new mathMLTree.MathNode("mo", mml.buildExpression(group.body, style));
  } else {
    // This is a text operator. Add all of the characters from the operator's name.
    node = new mathMLTree.MathNode("mi", [new mathMLTree.TextNode(group.name.slice(1))]);

    if (!group.parentIsSupSub) {
      // Append an invisible <mo>&ApplyFunction;</mo>.
      // ref: https://www.w3.org/TR/REC-MathML/chap3_2.html#sec3.2.4
      const operator = new mathMLTree.MathNode("mo", [mml.makeText("\u2061", "text")]);
      const row = [node, operator]
      // Set spacing
      if (group.needsLeadingSpace) {
        const lead = new mathMLTree.MathNode("mspace")
        lead.setAttribute("width", "0.1667em") // thin space.
        row.unshift(lead)
      }
      if (!group.isFollowedByDelimiter) {
        const trail = new mathMLTree.MathNode("mspace")
        trail.setAttribute("width", "0.1667em") // thin space.
        row.push(trail)
      }
      node = new mathMLTree.MathNode("mrow", row)
    }
  }

  return node;
};

const singleCharBigOps = {
  "\u220F": "\\prod",
  "\u2210": "\\coprod",
  "\u2211": "\\sum",
  "\u22c0": "\\bigwedge",
  "\u22c1": "\\bigvee",
  "\u22c2": "\\bigcap",
  "\u22c3": "\\bigcup",
  "\u2a00": "\\bigodot",
  "\u2a01": "\\bigoplus",
  "\u2a02": "\\bigotimes",
  "\u2a04": "\\biguplus",
  "\u2a05": "\\bigsqcap",
  "\u2a06": "\\bigsqcup"
};

defineFunction({
  type: "op",
  names: [
    "\\coprod",
    "\\bigvee",
    "\\bigwedge",
    "\\biguplus",
    "\\bigcap",
    "\\bigcup",
    "\\intop",
    "\\prod",
    "\\sum",
    "\\bigotimes",
    "\\bigoplus",
    "\\bigodot",
    "\\bigsqcap",
    "\\bigsqcup",
    "\\smallint",
    "\u220F",
    "\u2210",
    "\u2211",
    "\u22c0",
    "\u22c1",
    "\u22c2",
    "\u22c3",
    "\u2a00",
    "\u2a01",
    "\u2a02",
    "\u2a04",
    "\u2a06"
  ],
  props: {
    numArgs: 0
  },
  handler: ({ parser, funcName }, args) => {
    let fName = funcName;
    if (fName.length === 1) {
      fName = singleCharBigOps[fName];
    }
    return {
      type: "op",
      mode: parser.mode,
      limits: true,
      parentIsSupSub: false,
      symbol: true,
      stack: false, // This is true for \stackrel{}, not here.
      name: fName
    };
  },
  mathmlBuilder
});

// Note: calling defineFunction with a type that's already been defined only
// works because the same mathmlBuilder is being used.
defineFunction({
  type: "op",
  names: ["\\mathop"],
  props: {
    numArgs: 1,
    primitive: true
  },
  handler: ({ parser }, args) => {
    const body = args[0];
    // It would be convienient to just wrap a <mo> around the argument.
    // But if the argument is a <mi> or <mord>, that would be invalid MathML.
    // In that case, we instead promote the text contents of the body to the parent.
    const arr = (body.body) ? body.body : [body];
    const isSymbol = arr.length === 1 && ordAtomTypes.includes(arr[0].type)
    return {
      type: "op",
      mode: parser.mode,
      limits: true,
      parentIsSupSub: false,
      symbol: isSymbol,
      stack: false,
      name: isSymbol ? arr[0].text : null,
      body: isSymbol ? null : ordargument(body)
    };
  },
  mathmlBuilder
});

// There are 2 flags for operators; whether they produce limits in
// displaystyle, and whether they are symbols and should grow in
// displaystyle. These four groups cover the four possible choices.

const singleCharIntegrals = {
  "\u222b": "\\int",
  "\u222c": "\\iint",
  "\u222d": "\\iiint",
  "\u222e": "\\oint",
  "\u222f": "\\oiint",
  "\u2230": "\\oiiint",
  "\u2231": "\\intclockwise",
  "\u2232": "\\varointclockwise",
  "\u2a0c": "\\iiiint",
  "\u2a0d": "\\intbar",
  "\u2a0e": "\\intBar",
  "\u2a0f": "\\fint",
  "\u2a12": "\\rppolint",
  "\u2a13": "\\scpolint",
  "\u2a15": "\\pointint",
  "\u2a16": "\\sqint",
  "\u2a17": "\\intlarhk",
  "\u2a18": "\\intx",
  "\u2a19": "\\intcap",
  "\u2a1a": "\\intcup"
};

// No limits, not symbols
defineFunction({
  type: "op",
  names: [
    "\\arcsin",
    "\\arccos",
    "\\arctan",
    "\\arctg",
    "\\arcctg",
    "\\arg",
    "\\ch",
    "\\cos",
    "\\cosec",
    "\\cosh",
    "\\cot",
    "\\cotg",
    "\\coth",
    "\\csc",
    "\\ctg",
    "\\cth",
    "\\deg",
    "\\dim",
    "\\exp",
    "\\hom",
    "\\ker",
    "\\lg",
    "\\ln",
    "\\log",
    "\\sec",
    "\\sin",
    "\\sinh",
    "\\sh",
    "\\sgn",
    "\\tan",
    "\\tanh",
    "\\tg",
    "\\th"
  ],
  props: {
    numArgs: 0
  },
  handler({ parser, funcName }) {
    const prevAtomType = parser.prevAtomType
    const next = parser.gullet.future().text
    return {
      type: "op",
      mode: parser.mode,
      limits: false,
      parentIsSupSub: false,
      symbol: false,
      stack: false,
      isFollowedByDelimiter: isDelimiter(next),
      needsLeadingSpace: prevAtomType.length > 0 && ordTypes.includes(prevAtomType),
      name: funcName
    };
  },
  mathmlBuilder
});

// Limits, not symbols
defineFunction({
  type: "op",
  names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
  props: {
    numArgs: 0
  },
  handler({ parser, funcName }) {
    const prevAtomType = parser.prevAtomType
    const next = parser.gullet.future().text
    return {
      type: "op",
      mode: parser.mode,
      limits: true,
      parentIsSupSub: false,
      symbol: false,
      stack: false,
      isFollowedByDelimiter: isDelimiter(next),
      needsLeadingSpace: prevAtomType.length > 0 && ordTypes.includes(prevAtomType),
      name: funcName
    };
  },
  mathmlBuilder
});

// No limits, symbols
defineFunction({
  type: "op",
  names: [
    "\\int",
    "\\iint",
    "\\iiint",
    "\\iiiint",
    "\\oint",
    "\\oiint",
    "\\oiiint",
    "\\intclockwise",
    "\\varointclockwise",
    "\\intbar",
    "\\intBar",
    "\\fint",
    "\\rppolint",
    "\\scpolint",
    "\\pointint",
    "\\sqint",
    "\\intlarhk",
    "\\intx",
    "\\intcap",
    "\\intcup",
    "\u222b",
    "\u222c",
    "\u222d",
    "\u222e",
    "\u222f",
    "\u2230",
    "\u2231",
    "\u2232",
    "\u2a0c",
    "\u2a0d",
    "\u2a0e",
    "\u2a0f",
    "\u2a12",
    "\u2a13",
    "\u2a15",
    "\u2a16",
    "\u2a17",
    "\u2a18",
    "\u2a19",
    "\u2a1a"
  ],
  props: {
    numArgs: 0
  },
  handler({ parser, funcName }) {
    let fName = funcName;
    if (fName.length === 1) {
      fName = singleCharIntegrals[fName];
    }
    return {
      type: "op",
      mode: parser.mode,
      limits: false,
      parentIsSupSub: false,
      symbol: true,
      stack: false,
      name: fName
    };
  },
  mathmlBuilder
});
