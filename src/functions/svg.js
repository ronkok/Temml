import defineFunction from "../defineFunction";
import mathMLTree from "../mathMLTree";
import { Svg } from "../domTree";

// The math fonts omit a few characters that we need.
// We'll create SVG images for them.

defineFunction({
  type: "svg",
  names: [
    "\\centerdot",          // AMS function that returns a small square on the baseline
    "\\tripleDash",         // mhchem hydrogen bond
    "\\tripleDashOverLine", // more mhchem bonds
    "\\tripleDashOverDoubleLine",
    "\\tripleDashBetweenDoubleLine"
  ],
  props: { numArgs: 0 },
  handler({ parser, funcName }) {
    const title = funcName.slice(1)
    const data = (title === "centerdot")
      // eslint-disable-next-line max-len
      ? { width: 0.278, height: 0.278, viewBox: '0 0 1466 1466', path: 'm160 652 69-1c7.333-6 11.667-10.667 13-14V478c-2-4.667-6.333-9.667-13-15H90l-4 2c-4.667 4.667-8 8.333-10 11l-1 80v80c2.667 8 8 13.333 16 16h69Z' }
      // get the data from the mhchem extension
      : JSON.parse(parser.gullet.macros.get(`\\@${title}`))
    return { type: "svg", title, data, mode: parser.mode }
  },
  mathmlBuilder(group, style) {
    const data = group.data
    const svg = new Svg(group.title, data.width, data.height, data.viewBox, data.path)
    const mo = new mathMLTree.MathNode("mo", [svg])
    if (group.title === "centerdot") {
      mo.setAttribute("lspace", "0.2222em") // bin spacing
      mo.setAttribute("rspace", "0.2222em")
    }
    return mo
  }
});
