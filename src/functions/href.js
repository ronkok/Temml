import defineFunction, { ordargument } from "../defineFunction";
import { assertNodeType } from "../parseNode";
import { MathNode } from "../mathMLTree";
import * as mml from "../buildMathML";
import ParseError from "../ParseError";

defineFunction({
  type: "href",
  names: ["\\href"],
  props: {
    numArgs: 2,
    argTypes: ["url", "original"],
    allowedInText: true
  },
  handler: ({ parser, token }, args) => {
    const body = args[1];
    const href = assertNodeType(args[0], "url").url;

    if (
      !parser.settings.isTrusted({
        command: "\\href",
        url: href
      })
    ) {
      throw new ParseError(`Function "\\href" is not trusted`, token)
    }

    return {
      type: "href",
      mode: parser.mode,
      href,
      body: ordargument(body)
    };
  },
  mathmlBuilder: (group, style) => {
    let math = mml.buildExpressionRow(group.body, style);
    if (!(math instanceof MathNode)) {
      math = new MathNode("mrow", [math]);
    }
    math.setAttribute("href", group.href);
    return math;
  }
});

defineFunction({
  type: "href",
  names: ["\\url"],
  props: {
    numArgs: 1,
    argTypes: ["url"],
    allowedInText: true
  },
  handler: ({ parser, token }, args) => {
    const href = assertNodeType(args[0], "url").url;

    if (
      !parser.settings.isTrusted({
        command: "\\url",
        url: href
      })
    ) {
      throw new ParseError(`Function "\\url" is not trusted`, token)
    }

    const chars = [];
    for (let i = 0; i < href.length; i++) {
      let c = href[i];
      if (c === "~") {
        c = "\\textasciitilde";
      }
      chars.push({
        type: "textord",
        mode: "text",
        text: c
      });
    }
    const body = {
      type: "text",
      mode: parser.mode,
      font: "\\texttt",
      body: chars
    };
    return {
      type: "href",
      mode: parser.mode,
      href,
      body: ordargument(body)
    };
  }
});
