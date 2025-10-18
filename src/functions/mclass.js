import defineFunction, { ordargument } from "../defineFunction";
import symbols from "../symbols";
import * as mathMLTree from "../mathMLTree";
import * as utils from "../utils.js"
import { padding } from "./arrow";

import * as mml from "../buildMathML";

const textAtomTypes = ["text", "textord", "mathord", "atom"]

function mathmlBuilder(group, style) {
  let node;
  const inner = mml.buildExpression(group.body, style);

  if (group.mclass === "minner") {
    node = new mathMLTree.MathNode("mpadded", inner)
  } else if (group.mclass === "mord") {
    if (group.isCharacterBox || inner[0].type === "mathord") {
      node = inner[0];
      node.type = "mi";
      if (node.children.length === 1 && node.children[0].text && node.children[0].text === "∇") {
        node.setAttribute("mathvariant", "normal")
      }
    } else {
      node = new mathMLTree.MathNode("mi", inner);
    }
  } else {
    node = new mathMLTree.MathNode("mrow", inner)
    if (group.mustPromote) {
      node = inner[0];
      node.type = "mo";
      if (group.isCharacterBox && group.body[0].text && /[A-Za-z]/.test(group.body[0].text)) {
        node.setAttribute("mathvariant", "italic")
      }
    } else {
      node = new mathMLTree.MathNode("mrow", inner);
    }

    // Set spacing based on what is the most likely adjacent atom type.
    // See TeXbook p170.
    const doSpacing = style.level < 2 // Operator spacing is zero inside a (sub|super)script.
    if (node.type === "mrow") {
      if (doSpacing ) {
        if (group.mclass === "mbin") {
          // medium space
          node.children.unshift(padding(0.2222))
          node.children.push(padding(0.2222))
        } else if (group.mclass === "mrel") {
          // thickspace
          node.children.unshift(padding(0.2778))
          node.children.push(padding(0.2778))
        } else if (group.mclass === "mpunct") {
          node.children.push(padding(0.1667))
        } else if (group.mclass === "minner") {
          node.children.unshift(padding(0.0556))  // 1 mu is the most likely option
          node.children.push(padding(0.0556))
        }
      }
    } else {
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
      } else if (group.mclass === "minner" && doSpacing) {
        node.attributes.lspace = "0.0556em" // 1 mu is the most likely option
        node.attributes.width = "+0.1111em"
      }
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
    const isCharacterBox = utils.isCharacterBox(body)
    // We should not wrap a <mo> around a <mi> or <mord>. That would be invalid MathML.
    // In that case, we instead promote the text contents of the body to the parent.
    let mustPromote = true
    const mord = { type: "mathord", text: "", mode: parser.mode }
    const arr = (body.body) ? body.body : [body];
    for (const arg of arr) {
      if (textAtomTypes.includes(arg.type)) {
        if (symbols[parser.mode][arg.text]) {
          mord.text += symbols[parser.mode][arg.text].replace
        } else if (arg.text) {
          mord.text += arg.text
        } else if (arg.body) {
          arg.body.map(e => { mord.text += e.text })
        }
      } else {
        mustPromote = false
        break
      }
    }
    if (mustPromote && funcName === "\\mathord" && mord.type === "mathord"
                    && mord.text.length > 1) {
      return mord
    } else {
      return {
        type: "mclass",
        mode: parser.mode,
        mclass: "m" + funcName.slice(5),
        body: ordargument(mustPromote ? mord : body),
        isCharacterBox,
        mustPromote
      };
    }
  },
  mathmlBuilder
});

export const binrelClass = (arg) => {
  // \binrel@ spacing varies with (bin|rel|ord) of the atom in the argument.
  // (by rendering separately and with {}s before and after, and measuring
  // the change in spacing).  We'll do roughly the same by detecting the
  // atom type directly.
  const atom = arg.type === "ordgroup" && arg.body.length && arg.body.length === 1
    ? arg.body[0]
    : arg;
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

    let mclass
    if (funcName !== "\\stackrel") {
      // LaTeX applies \binrel spacing to \overset and \underset.
      mclass = binrelClass(baseArg)
    } else {
      mclass = "mrel"  // for \stackrel
    }

    const baseType = mclass === "mrel" || mclass === "mbin"
      ? "op"
      : "ordgroup"

    const baseOp = {
      type: baseType,
      mode: baseArg.mode,
      limits: true,
      alwaysHandleSupSub: true,
      parentIsSupSub: false,
      symbol: false,
      suppressBaseShift: funcName !== "\\stackrel",
      body: ordargument(baseArg)
    };

    return {
      type: "supsub",
      mode: shiftedArg.mode,
      stack: true,
      base: baseOp,
      sup: funcName === "\\underset" ? null : shiftedArg,
      sub: funcName === "\\underset" ? shiftedArg : null
    };
  },
  mathmlBuilder
});
