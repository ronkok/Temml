import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { assertNodeType } from "../parseNode";
import { colorFromSpec, validateColor } from "./color"
import * as mml from "../buildMathML";

const padding = _ => {
  const node = new mathMLTree.MathNode("mspace")
  node.setAttribute("width", "3pt")
  return node
}

const mathmlBuilder = (group, style) => {
  let node
  if (group.label.indexOf("colorbox") > -1 || group.label === "\\boxed") {
    // MathML core does not support +width attribute in <mpadded>.
    // Firefox does not reliably add side padding.
    // Insert <mspace>
    node = new mathMLTree.MathNode("mrow", [
      padding(),
      mml.buildGroup(group.body, style),
      padding()
    ])
  } else {
    node = new mathMLTree.MathNode("mrow", [mml.buildGroup(group.body, style)])
  }
  switch (group.label) {
    case "\\overline":
      node.style.padding = "0.1em 0 0 0"
      node.style.borderTop = "0.065em solid"
      break
    case "\\underline":
      node.style.padding = "0 0 0.1em 0"
      node.style.borderBottom = "0.065em solid"
      break
    case "\\cancel":
      node.style.background = `linear-gradient(to top left,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0) calc(50% - 0.06em),
rgba(0,0,0,1) 50%,
rgba(0,0,0,0) calc(50% + 0.06em),
rgba(0,0,0,0) 100%);`
      break
    case "\\bcancel":
      node.style.background = `linear-gradient(to top right,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0) calc(50% - 0.06em),
rgba(0,0,0,1) 50%,
rgba(0,0,0,0) calc(50% + 0.06em),
rgba(0,0,0,0) 100%);`
      break
    /*
    case "\\longdiv":
      node.setAttribute("notation", "longdiv");
      break
    case "\\phase":
      node.setAttribute("notation", "phasorangle");
      break */
    case "\\angl":
      node.style.padding = "0.03889em 0.03889em 0 0.03889em"
      node.style.borderTop = "0.049em solid"
      node.style.borderRight = "0.049em solid"
      node.style.marginRight = "0.03889em"
      break
    case "\\sout":
      node.style["text-decoration"] = "line-through 0.08em solid"
      break
    case "\\boxed":
      // \newcommand{\boxed}[1]{\fbox{\m@th$\displaystyle#1$}} from amsmath.sty
      node.style = { padding: "3pt 0 3pt 0", border: "1px solid" }
      node.setAttribute("scriptlevel", "0")
      node.setAttribute("displaystyle", "true")
      break
    case "\\fbox":
      node.style = { padding: "3pt", border: "1px solid" }
      break
    case "\\fcolorbox":
    case "\\colorbox": {
      // <menclose> doesn't have a good notation option for \colorbox.
      // So use <mpadded> instead. Set some attributes that come
      // included with <menclose>.
      //const fboxsep = 3; // 3 pt from LaTeX source2e
      //node.setAttribute("height", `+${2 * fboxsep}pt`)
      //node.setAttribute("voffset", `${fboxsep}pt`)
      const style = { padding: "3pt 0 3pt 0" }

      if (group.label === "\\fcolorbox") {
        style.border = "0.06em solid " + String(group.borderColor)
      }
      node.style = style
      break
    }
    case "\\xcancel":
      node.style.background = `linear-gradient(to top left,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0) calc(50% - 0.06em),
rgba(0,0,0,1) 50%,
rgba(0,0,0,0) calc(50% + 0.06em),
rgba(0,0,0,0) 100%),
linear-gradient(to top right,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0) calc(50% - 0.06em),
rgba(0,0,0,1) 50%,
rgba(0,0,0,0) calc(50% + 0.06em),
rgba(0,0,0,0) 100%);`
      break
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
  names: ["\\angl", "\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\overline", "\\boxed"],
   // , "\\phase", "\\longdiv"
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
  names: ["\\underline"],
  props: {
    numArgs: 1,
    allowedInText: true
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
