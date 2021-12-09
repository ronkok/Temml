import defineFunction, { ordargument } from "../defineFunction";
import mathMLTree from "../mathMLTree";
import utils from "../utils";

import * as mml from "../buildMathML";

const textAtomTypes = ["text", "textord", "mathord", "atom"]

function mathmlBuilder(group, style) {
  let node;
  const inner = mml.buildExpression(group.body, style);

  if (group.mclass === "minner") {
    return mathMLTree.newDocumentFragment(inner);
  } else if (group.mclass === "mord") {
    if (group.isCharacterBox || inner[0].type === "mathord") {
      node = inner[0];
      node.type = "mi";
    } else {
      node = new mathMLTree.MathNode("mi", inner);
    }
  } else {
    if (group.isCharacterBox) {
      node = inner[0];
      node.type = "mo";
      if (group.body[0].text && /[A-Za-z]/.test(group.body[0].text)) {
        node.setAttribute("mathvariant", "italic")
      }
    } else {
      node = new mathMLTree.MathNode("mo", inner);
    }

    // Set spacing based on what is the most likely adjacent atom type.
    // See TeXbook p170.
    const doSpacing = style.level < 2 // Operator spacing is zero inside a (sub|super)script.
    if (group.mclass === "mbin") {
      // medium space
      node.attributes.lspace = (doSpacing ? "0.2222em" : "0")
      node.attributes.rspace = (doSpacing ? "0.2222em" : "0")
    } else if (group.mclass === "mrel") {
      // thickspace
      node.attributes.lspace = (doSpacing ? "0.2778em" : "0")
      node.attributes.rspace = (doSpacing ? "0.2778em" : "0")
    } else if (group.mclass === "mpunct") {
      node.attributes.lspace = "0em";
      node.attributes.rspace = (doSpacing ? "0.1667em" : "0")
    } else if (group.mclass === "mopen" || group.mclass === "mclose") {
      node.attributes.lspace = "0em"
      node.attributes.rspace = "0em"
    }
    if (!(group.mclass === "mopen" || group.mclass === "mclose")) {
      delete node.attributes.stretchy
      delete node.attributes.form
    }
  }
  return node;
}

// Math class commands except \mathop
defineFunction({
  type: "mclass",
  names: [
    "\\mathord",
    "\\mathbin",
    "\\mathrel",
    "\\mathopen",
    "\\mathclose",
    "\\mathpunct",
    "\\mathinner"
  ],
  props: {
    numArgs: 1,
    primitive: true
  },
  handler({ parser, funcName }, args) {
    const body = args[0]
    // We should not wrap a <mo> around a <mi> or <mord>. That would be invalid MathML.
    // In that case, we instead promote the text contents of the body to the parent.
    let mustPromote = true
    const mord = { type: "mathord", text: "", mode: parser.mode }
    const arr = (body.body) ? body.body : [body]
    for (const arg of arr) {
      if (textAtomTypes.includes(arg.type)) {
        if (arg.text) {
          mord.text += arg.text
        } else if (arg.body) {
          arg.body.map(e => { mord.text += e.text })
        }
      } else {
        mustPromote = false
        break
      }
    }
    return {
      type: "mclass",
      mode: parser.mode,
      mclass: "m" + funcName.substr(5),
      body: ordargument(mustPromote ? mord : body),
      isCharacterBox: utils.isCharacterBox(body) || mustPromote
    };
  },
  mathmlBuilder
});

export const binrelClass = (arg) => {
  // \binrel@ spacing varies with (bin|rel|ord) of the atom in the argument.
  // (by rendering separately and with {}s before and after, and measuring
  // the change in spacing).  We'll do roughly the same by detecting the
  // atom type directly.
  const atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
  if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
    return "m" + atom.family;
  } else {
    return "mord";
  }
};

// \@binrel{x}{y} renders like y but as mbin/mrel/mord if x is mbin/mrel/mord.
// This is equivalent to \binrel@{x}\binrel@@{y} in AMSTeX.
defineFunction({
  type: "mclass",
  names: ["\\@binrel"],
  props: {
    numArgs: 2
  },
  handler({ parser }, args) {
    return {
      type: "mclass",
      mode: parser.mode,
      mclass: binrelClass(args[0]),
      body: ordargument(args[1]),
      isCharacterBox: utils.isCharacterBox(args[1])
    };
  }
});

// Build a relation or stacked op by placing one symbol on top of another
defineFunction({
  type: "mclass",
  names: ["\\stackrel", "\\overset", "\\underset"],
  props: {
    numArgs: 2
  },
  handler({ parser, funcName }, args) {
    const baseArg = args[1];
    const shiftedArg = args[0];

    const baseOp = {
      type: "op",
      mode: baseArg.mode,
      limits: true,
      alwaysHandleSupSub: true,
      parentIsSupSub: false,
      symbol: false,
      stack: true,
      suppressBaseShift: funcName !== "\\stackrel",
      body: ordargument(baseArg)
    };

    return {
      type: "supsub",
      mode: shiftedArg.mode,
      base: baseOp,
      sup: funcName === "\\underset" ? null : shiftedArg,
      sub: funcName === "\\underset" ? shiftedArg : null
    };
  },
  mathmlBuilder
});
