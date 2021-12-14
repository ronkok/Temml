import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { assertNodeType } from "../parseNode";
import { colorFromSpec, validateColor } from "./color"
import * as mml from "../buildMathML";

const mathmlBuilder = (group, style) => {
  const node = new mathMLTree.MathNode(
    group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose",
    [mml.buildGroup(group.body, style)]
  );
  switch (group.label) {
    case "\\cancel":
      node.setAttribute("notation", "updiagonalstrike");
      break;
    case "\\bcancel":
      node.setAttribute("notation", "downdiagonalstrike");
      break;
    case "\\longdiv":
      node.setAttribute("notation", "longdiv");
      break;
    case "\\phase":
      node.setAttribute("notation", "phasorangle");
      break;
    case "\\sout":
      node.setAttribute("notation", "horizontalstrike");
      break;
    case "\\fbox":
      node.setAttribute("notation", "box");
      break;
    case "\\angl":
      node.setAttribute("notation", "actuarial");
      break;
    case "\\fcolorbox":
    case "\\colorbox": {
      // <menclose> doesn't have a good notation option for \colorbox.
      // So use <mpadded> instead. Set some attributes that come
      // included with <menclose>.
      const fboxsep = 3; // 3 pt from LaTeX source2e
      node.setAttribute("width", `+${2 * fboxsep}pt`);
      node.setAttribute("height", `+${2 * fboxsep}pt`);
      node.setAttribute("lspace", `${fboxsep}pt`); //
      node.setAttribute("voffset", `${fboxsep}pt`);
      if (group.label === "\\fcolorbox") {
        node.setAttribute("style", "border: 0.06em solid " + String(group.borderColor));
      }
      break;
    }
    case "\\xcancel":
      node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
      break;
  }
  if (group.backgroundColor) {
    node.setAttribute("mathbackground", group.backgroundColor);
  }
  return node;
};

defineFunction({
  type: "enclose",
  names: ["\\colorbox"],
  props: {
    numArgs: 2,
    numOptionalArgs: 1,
    allowedInText: true,
    argTypes: ["raw", "raw", "text"]
  },
  handler({ parser, funcName }, args, optArgs) {
    const model = optArgs[0] && assertNodeType(optArgs[0], "raw").string
    let color = ""
    if (model) {
      const spec = assertNodeType(args[0], "raw").string
      color = colorFromSpec(model, spec)
    } else {
      color = validateColor(assertNodeType(args[0], "raw").string, parser.gullet.macros)
    }
    const body = args[1];
    return {
      type: "enclose",
      mode: parser.mode,
      label: funcName,
      backgroundColor: color,
      body
    };
  },
  mathmlBuilder
});

defineFunction({
  type: "enclose",
  names: ["\\fcolorbox"],
  props: {
    numArgs: 3,
    numOptionalArgs: 1,
    allowedInText: true,
    argTypes: ["raw", "raw", "raw", "text"]
  },
  handler({ parser, funcName }, args, optArgs) {
    const model = optArgs[0] && assertNodeType(optArgs[0], "raw").string
    let borderColor = ""
    let backgroundColor
    if (model) {
      const borderSpec = assertNodeType(args[0], "raw").string
      const backgroundSpec = assertNodeType(args[0], "raw").string
      borderColor = colorFromSpec(model, borderSpec)
      backgroundColor = colorFromSpec(model, backgroundSpec)
    } else {
      borderColor = validateColor(assertNodeType(args[0], "raw").string, parser.gullet.macros)
      backgroundColor = validateColor(assertNodeType(args[1], "raw").string, parser.gullet.macros)
    }
    const body = args[2];
    return {
      type: "enclose",
      mode: parser.mode,
      label: funcName,
      backgroundColor,
      borderColor,
      body
    };
  },
  mathmlBuilder
});

defineFunction({
  type: "enclose",
  names: ["\\fbox"],
  props: {
    numArgs: 1,
    argTypes: ["hbox"],
    allowedInText: true
  },
  handler({ parser }, args) {
    return {
      type: "enclose",
      mode: parser.mode,
      label: "\\fbox",
      body: args[0]
    };
  }
});

defineFunction({
  type: "enclose",
  names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase", "\\longdiv"],
  props: {
    numArgs: 1
  },
  handler({ parser, funcName }, args) {
    const body = args[0];
    return {
      type: "enclose",
      mode: parser.mode,
      label: funcName,
      body
    };
  },
  mathmlBuilder
});

defineFunction({
  type: "enclose",
  names: ["\\angl"],
  props: {
    numArgs: 1,
    allowedInText: false
  },
  handler({ parser }, args) {
    return {
      type: "enclose",
      mode: parser.mode,
      label: "\\angl",
      body: args[0]
    };
  }
});
