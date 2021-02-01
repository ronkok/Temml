import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import stretchy from "../stretchy";
import * as mml from "../buildMathML";

// Helper function
const paddedNode = (group) => {
  const node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
  node.setAttribute("width", "+0.6em");
  node.setAttribute("lspace", "0.3em");
  return node;
};

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
    "\\xrightleftharpoons",
    "\\xleftrightharpoons",
    "\\xlongequal",
    "\\xtwoheadrightarrow",
    "\\xtwoheadleftarrow",
    "\\xtofrom",
    // The next 4 functions are here to support the mhchem extension.
    // Direct use of these functions is discouraged and may break someday.
    "\\longrightleftharpoons",
    "\\longleftrightarrows",   // <--> or
    "\\longRightleftharpoons",
    "\\longLeftrightharpoons",
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
    const arrowNode = stretchy.mathMLnode(group.label, group.macros);
    const minWidth = group.label.charAt(0) === "x" ? "1.75em" : "3.0em";
    arrowNode.setAttribute("minsize", minWidth);
    // minsize attribute doesn't work in Firefox.
    // https://bugzilla.mozilla.org/show_bug.cgi?id=320303
    // I tried adding a CSS min-width. That didn't work either.
    let node;
    const labelOptions = style.incrementLevel();

    if (group.body) {
      const upperNode = paddedNode(mml.buildGroup(group.body, labelOptions));
      if (group.below) {
        const lowerNode = paddedNode(mml.buildGroup(group.below, labelOptions));
        node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
      } else {
        node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
      }
    } else if (group.below) {
      const lowerNode = paddedNode(mml.buildGroup(group.below, labelOptions));
      node = new mathMLTree.MathNode("munder", [arrowNode, lowerNode]);
    } else {
      // This should never happen.
      // Parser.js throws an error if there is no argument.
      node = paddedNode();
      node = new mathMLTree.MathNode("mover", [arrowNode, node]);
    }
    return node;
  }
});
