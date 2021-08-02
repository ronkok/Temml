import { binrelClass } from "./mclass"
import defineFunction, { normalizeArgument } from "../defineFunction"
import utils from "../utils"
import * as mml from "../buildMathML"
import mathMLTree from "../mathMLTree"

const mathmlBuilder = (group, style) => {
  const font = group.font
  const newOptions = style.withFont(font)
  const mrow = mml.buildGroup(group.body, newOptions)

  // If possible, consolidate adjacent <mi> elements into a single element.
  // First, check if it is possible. If not, return the <mrow>.
  if (mrow.children.length === 0) { return mrow } // empty group, e.g., \mathrm{}
  let mi = mrow.children[0]
  if (mi.type !== "mi") {
    mi = mrow
  } else {
    for (let i = 1; i < mrow.children.length; i++) {
      if (mrow.children[i].type !== "mi") { return mrow }
      const localVariant = mrow.children[i].attributes.mathvariant || ""
      if (localVariant !== "normal") { return mrow }
    }
    // Consolidate the <mi> elements.
    for (let i = 1; i < mrow.children.length; i++) {
      mi.children.push(mrow.children[i].children[0])
    }
    if (mrow.attributes.mathcolor) { mi.attributes.mathcolor = mrow.attributes.mathcolor }
  }
  if (mi.attributes.mathvariant && mi.attributes.mathvariant === "normal") {
    // Workaround for a Firefox bug that renders spurious space around
    // a <mi mathvariant="normal">
    // Ref: https://bugs.webkit.org/show_bug.cgi?id=129097
    // We insert a text node that contains a zero-width space and wrap in an mrow.
    // TODO: Get rid of this <mi> workaround when the Firefox bug is fixed.
    const bogus = new mathMLTree.MathNode("mtext", new mathMLTree.TextNode("\u200b"))
    return new mathMLTree.MathNode("mrow", [bogus, mi])
  }
  return mi
};

const fontAliases = {
  "\\Bbb": "\\mathbb",
  "\\bold": "\\mathbf",
  "\\frak": "\\mathfrak",
  "\\bm": "\\boldsymbol"
};

defineFunction({
  type: "font",
  names: [
    // styles, except \boldsymbol defined below
    "\\mathrm",
    "\\mathit",
    "\\mathbf",
    "\\mathnormal",
    "\\up@greek",
    "\\pmb",

    // families
    "\\mathbb",
    "\\mathcal",
    "\\mathfrak",
    "\\mathscr",
    "\\mathsf",
    "\\mathtt",
    "\\oldstylenums",

    // aliases, except \bm defined below
    "\\Bbb",
    "\\bold",
    "\\frak"
  ],
  props: {
    numArgs: 1,
    allowedInArgument: true
  },
  handler: ({ parser, funcName }, args) => {
    const body = normalizeArgument(args[0]);
    let func = funcName;
    if (func in fontAliases) {
      func = fontAliases[func];
    }
    return {
      type: "font",
      mode: parser.mode,
      font: func.slice(1),
      body
    };
  },
  mathmlBuilder
});

defineFunction({
  type: "mclass",
  names: ["\\bm", "\\boldsymbol"],
  props: {
    numArgs: 1
  },
  handler: ({ parser }, args) => {
    const body = args[0];
    const isCharacterBox = utils.isCharacterBox(body);
    // amsbsy.sty's \boldsymbol uses \binrel spacing to inherit the
    // argument's bin|rel|ord status
    const mclass =  binrelClass(body)
    if (mclass === "mbin" || mclass === "mrel") {
      return {
        type: "mclass",
        mode: parser.mode,
        mclass,
        body: [
          {
            type: "font",
            mode: parser.mode,
            font: "boldsymbol",
            body
          }
        ],
        isCharacterBox: isCharacterBox
      };
    } else {
      return {
        type: "font",
        mode: parser.mode,
        font: "boldsymbol",
        body
      }
    }
  }
});

// Old font changing functions
defineFunction({
  type: "font",
  names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
  props: {
    numArgs: 0,
    allowedInText: true
  },
  handler: ({ parser, funcName, breakOnTokenText }, args) => {
    const { mode } = parser;
    const body = parser.parseExpression(true, breakOnTokenText);
    const fontStyle = `math${funcName.slice(1)}`;

    return {
      type: "font",
      mode: mode,
      font: fontStyle,
      body: {
        type: "ordgroup",
        mode: parser.mode,
        body
      }
    };
  },
  mathmlBuilder
});
