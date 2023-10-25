/* eslint no-console:0 */
/**
 * This is the main entry point for Temml. Here, we expose functions for
 * rendering expressions either to DOM nodes or to markup strings.
 *
 * We also expose the ParseError class to check if errors thrown from Temml are
 * errors in the expression, or errors in javascript handling.
 */

import ParseError from "./src/ParseError";
import Settings from "./src/Settings";

import Parser from "./src/Parser";
import parseTree from "./src/parseTree";
import buildMathML from "./src/buildMathML";
import { StyleLevel } from "./src/constants";
import Style from "./src/Style";
import { Span, TextNode } from "./src/domTree";
import { defineSymbol } from "./src/symbols";
import defineMacro from "./src/defineMacro";
import { postProcess, version } from "./src/postProcess";

/**
 * @type {import('./temml').render}
 * Parse and build an expression, and place that expression in the DOM node
 * given.
 */
let render = function(expression, baseNode, options) {
  baseNode.textContent = "";
  const alreadyInMathElement = baseNode.tagName === "MATH"
  if (alreadyInMathElement) { options.wrap = "none" }
  const math = renderToMathMLTree(expression, options)
  if (alreadyInMathElement) {
    // The <math> element already exists. Populate it.
    baseNode.textContent = ""
    math.children.forEach(e => { baseNode.appendChild(e.toNode()) })
  } else if (math.children.length > 1) {
    baseNode.textContent = ""
    math.children.forEach(e => { baseNode.appendChild(e.toNode()) })
  } else {
    baseNode.appendChild(math.toNode())
  }
};

// Temml's styles don't work properly in quirks mode. Print out an error, and
// disable rendering.
if (typeof document !== "undefined") {
  if (document.compatMode !== "CSS1Compat") {
    typeof console !== "undefined" &&
      console.warn(
        "Warning: Temml doesn't work in quirks mode. Make sure your " +
          "website has a suitable doctype."
      );

    render = function() {
      throw new ParseError("Temml doesn't work in quirks mode.");
    };
  }
}

/**
 * @type {import('./temml').renderToString}
 * Parse and build an expression, and return the markup for that.
 */
const renderToString = function(expression, options) {
  const markup = renderToMathMLTree(expression, options).toMarkup();
  return markup;
};

/**
 * @type {import('./temml').generateParseTree}
 * Parse an expression and return the parse tree.
 */
const generateParseTree = function(expression, options) {
  const settings = new Settings(options);
  return parseTree(expression, settings);
};

/**
 * @type {import('./temml').definePreamble}
 * Take an expression which contains a preamble.
 * Parse it and return the macros.
 */
const definePreamble = function(expression, options) {
  const settings = new Settings(options);
  settings.macros = {};
  if (!(typeof expression === "string" || expression instanceof String)) {
    throw new TypeError("Temml can only parse string typed expression")
  }
  const parser = new Parser(expression, settings, true)
  // Blank out any \df@tag to avoid spurious "Duplicate \tag" errors
  delete parser.gullet.macros.current["\\df@tag"]
  const macros = parser.parse()
  return macros
};

/**
 * If the given error is a Temml ParseError,
 * renders the invalid LaTeX as a span with hover title giving the Temml
 * error message.  Otherwise, simply throws the error.
 */
const renderError = function(error, expression, options) {
  if (options.throwOnError || !(error instanceof ParseError)) {
    throw error;
  }
  const node = new Span(["temml-error"], [new TextNode(expression + "\n" + error.toString())]);
  node.style.color = options.errorColor
  node.style.whiteSpace = "pre-line"
  return node;
};

/**
 * @type {import('./temml').renderToMathMLTree}
 * Generates and returns the Temml build tree. This is used for advanced
 * use cases (like rendering to custom output).
 */
const renderToMathMLTree = function(expression, options) {
  const settings = new Settings(options);
  try {
    const tree = parseTree(expression, settings);
    const style = new Style({
      level: settings.displayMode ? StyleLevel.DISPLAY : StyleLevel.TEXT,
      maxSize: settings.maxSize
    });
    return buildMathML(tree, expression, style, settings);
  } catch (error) {
    return renderError(error, expression, settings);
  }
};

/** @type {import('./temml').default} */
export default {
  /**
   * Current Temml version
   */
  version: version,
  /**
   * Renders the given LaTeX into MathML, and adds
   * it as a child to the specified DOM node.
   */
  render,
  /**
   * Renders the given LaTeX into MathML string,
   * for sending to the client.
   */
  renderToString,
  /**
   * Post-process an entire HTML block.
   * Writes AMS auto-numbers and implements \ref{}.
   * Typcally called once, after a loop has rendered many individual spans.
   */
  postProcess,
  /**
   * Temml error, usually during parsing.
   */
  ParseError,
  /**
   * Creates a set of macros with document-wide scope.
   */
  definePreamble,
  /**
   * Parses the given LaTeX into Temml's internal parse tree structure,
   * without rendering to HTML or MathML.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __parse: generateParseTree,
  /**
   * Renders the given LaTeX into a MathML internal DOM tree
   * representation, without flattening that representation to a string.
   *
   * NOTE: This method is not currently recommended for public use.
   * The internal tree representation is unstable and is very likely
   * to change. Use at your own risk.
   */
  __renderToMathMLTree: renderToMathMLTree,
  /**
   * adds a new symbol to builtin symbols table
   */
  __defineSymbol: defineSymbol,
  /**
   * adds a new macro to builtin macro list
   */
  __defineMacro: defineMacro
}
