// Horizontal spacing commands

import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { calculateSize } from "../units";
import { assertNodeType } from "../parseNode";
import ParseError from "../ParseError"

// TODO: \hskip and \mskip should support plus and minus in lengths

defineFunction({
  type: "kern",
  names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
  props: {
    numArgs: 1,
    argTypes: ["size"],
    primitive: true,
    allowedInText: true
  },
  handler({ parser, funcName, token }, args) {
    const size = assertNodeType(args[0], "size");
    if (parser.settings.strict) {
      const mathFunction = funcName[1] === "m"; // \mkern, \mskip
      const muUnit = size.value.unit === "mu";
      if (mathFunction) {
        if (!muUnit) {
          throw new ParseError(`LaTeX's ${funcName} supports only mu units, ` +
            `not ${size.value.unit} units`, token)
        }
        if (parser.mode !== "math") {
          throw new ParseError(`LaTeX's ${funcName} works only in math mode`, token)
        }
      } else {
        // !mathFunction
        if (muUnit) {
          throw new ParseError(`LaTeX's ${funcName} doesn't support mu units`, token)
        }
      }
    }
    return {
      type: "kern",
      mode: parser.mode,
      dimension: size.value
    };
  },
  mathmlBuilder(group, style) {
    const dimension = calculateSize(group.dimension, style);
    const ch = dimension.unit === "em" ? spaceCharacter(dimension.number) : "";
    if (group.mode === "text" && ch.length > 0) {
      const character = new mathMLTree.TextNode(ch);
      return new mathMLTree.MathNode("mtext", [character]);
    } else {
      const node = new mathMLTree.MathNode("mspace");
      node.setAttribute("width", dimension.number + dimension.unit);
      if (dimension.number < 0) {
        node.style.marginLeft = dimension.number + dimension.unit
      }
      return node;
    }
  }
});

export const spaceCharacter = function(width) {
  if (width >= 0.05555 && width <= 0.05556) {
    return "\u200a"; // &VeryThinSpace;
  } else if (width >= 0.1666 && width <= 0.1667) {
    return "\u2009"; // &ThinSpace;
  } else if (width >= 0.2222 && width <= 0.2223) {
    return "\u2005"; // &MediumSpace;
  } else if (width >= 0.2777 && width <= 0.2778) {
    return "\u2005\u200a"; // &ThickSpace;
  } else {
    return "";
  }
};
