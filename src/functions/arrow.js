import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import stretchy from "../stretchy";
import * as mml from "../buildMathML";

// Helper functions
const paddedNode = (group, width = "+0.6em") => {
  const node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
  node.setAttribute("width", width)
  node.setAttribute("lspace", "0.3em")
  return node;
};

const munderoverNode = (label, body, below, style, macros = {}) => {
  const arrowNode = stretchy.mathMLnode(label, macros);
  const minWidth = label.charAt(1) === "x"
    ? "1.75em"  // mathtools extensible arrows
    : label.slice(2, 4) === "cd"
    ? "3.0em"  // cd package arrows
    : "2.0em"; // mhchem arrows
  arrowNode.setAttribute("minsize", minWidth);
  // minsize attribute doesn't work in Firefox.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=320303
  const labelStyle = style.incrementLevel();

  const upperNode = (body && body.body && body.body.length > 0)
    ? paddedNode(mml.buildGroup(body, labelStyle))
      // Since Firefox does not recognize minsize set on the arrow,
      // create an upper node w/correct width.
    : paddedNode(null, minWidth)
  const lowerNode = (below && below.body && below.body.length > 0)
    ? paddedNode(mml.buildGroup(below, labelStyle))
    : paddedNode(null, minWidth)
  const node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
  return node
}

// Stretchy arrows with an optional argument
defineFunction({
  type: "xArrow",
  names: [
    "\\xleftarrow",
    "\\xrightarrow",
    "\\xLeftarrow",
    "\\xRightarrow",
    "\\xleftrightarrow",
    "\\xLeftrightarrow",
    "\\xhookleftarrow",
    "\\xhookrightarrow",
    "\\xmapsto",
    "\\xrightharpoondown",
    "\\xrightharpoonup",
    "\\xleftharpoondown",
    "\\xleftharpoonup",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    // The next 7 functions are here only to support mhchem
    "\\yields",
    "\\yieldsLeft",
    "\\mesomerism",
    "\\longrightharpoonup",
    "\\longleftharpoondown",
    "\\equilibriumRight",
    "\\equilibriumLeft",
    // The next 3 functions are here only to support the {CD} environment.
    "\\\\cdrightarrow",
    "\\\\cdleftarrow",
    "\\\\cdlongequal"
  ],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler({ parser, funcName }, args, optArgs) {
    return {
      type: "xArrow",
      mode: parser.mode,
      label: funcName,
      body: args[0],
      below: optArgs[0],
      macros: parser.gullet.macros // Contains SVG paths for mhchem equilibrium arrows.
    };
  },
  mathmlBuilder(group, style) {
    return munderoverNode(group.label, group.body, group.below, style, group.macros)
  }
});

const arrowComponent = {
  "\\xtofrom": ["\\xrightarrow", "\\xleftarrow"],
  "\\xleftrightharpoons": ["\\xleftharpoonup", "\\xrightharpoondown"],
  "\\xrightleftharpoons": ["\\xrightharpoonup", "\\xleftharpoondown"],
  "\\yieldsLeftRight": ["\\yields", "\\yieldsLeft"],
  "\\equilibrium": ["\\longrightharpoonup", "\\longleftharpoondown"]
}

// Browser are not good at stretching stacked arrows such as ⇄.
// So we stack a pair of single arrows.
defineFunction({
  type: "stackedArrow",
  names: [
    "\\xtofrom",              // expfeil
    "\\xleftrightharpoons",   // mathtools
    "\\xrightleftharpoons",   // mathtools
    "\\yieldsLeftRight",      // mhchem
    "\\equilibrium"           // mhchem
  ],
  props: {
    numArgs: 1,
    numOptionalArgs: 1
  },
  handler({ parser, funcName }, args, optArgs) {
    const lowerArrowBody = args[0]
      ? {
        type: "hphantom",
        mode: parser.mode,
        body: args[0]
      }
      : null;
    const upperArrowBelow = optArgs[0]
      ? {
        type: "hphantom",
        mode: parser.mode,
        body: optArgs[0]
      }
      : null;
    return {
      type: "stackedArrow",
      mode: parser.mode,
      label: funcName,
      body: args[0],
      upperArrowBelow,
      lowerArrowBody,
      below: optArgs[0]
    };
  },
  mathmlBuilder(group, style) {
    const topLabel = arrowComponent[group.label][0]
    const botLabel = arrowComponent[group.label][1]
    const topArrow = munderoverNode(topLabel, group.body, group.upperArrowBelow, style)
    const botArrow = munderoverNode(botLabel, group.lowerArrowBody, group.below, style)

    const topSpace = new mathMLTree.MathNode("mspace");
    topSpace.setAttribute("width", "0.2778em");
    const botSpace = new mathMLTree.MathNode("mspace");
    botSpace.setAttribute("width", "-0.2778em");

    const raiseNode = new mathMLTree.MathNode("mpadded", [topSpace, topArrow])
    raiseNode.setAttribute("voffset", "0.3em")
    raiseNode.setAttribute("height", "+0.3em")
    raiseNode.setAttribute("depth", "-0.3em")
    raiseNode.setAttribute("width", "0em")

    const botRow = new mathMLTree.MathNode("mrow", [botSpace, botArrow])

    const wrapper = new mathMLTree.MathNode("mpadded", [raiseNode, botRow])
    wrapper.setAttribute("voffset", "-0.18em")
    wrapper.setAttribute("height", "-0.18em")
    wrapper.setAttribute("depth", "+0.18em")
    return wrapper
  }
});

