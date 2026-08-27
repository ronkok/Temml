/**
 * This is a module for storing settings passed into Temml. It correctly handles
 * default settings.
 */

import * as utils from "./utils";

const FORBIDDEN_MACRO_KEYS = ["__proto__", "prototype", "constructor"];

// Sanitize a user-supplied macros object: strip its prototype (so later
// bracket-notation writes, e.g. from \gdef, can never reach Object.prototype)
// and delete any own key that could be used to pollute it. This mutates
// `macros` in place and returns the same reference, rather than a copy,
// because callers such as auto-render.js rely on that identity to share
// \gdef'd macros across multiple render calls that pass the same options
// object.
const sanitizeMacros = (macros) => {
  if (macros == null || typeof macros !== "object") {
    return Object.create(null);
  }
  for (const key of FORBIDDEN_MACRO_KEYS) {
    if (Object.prototype.hasOwnProperty.call(macros, key)) {
      delete macros[key];
    }
  }
  return Object.setPrototypeOf(macros, null);
};

/**
 * The main Settings object
 */
export default class Settings {
  constructor(options) {
    // allow null options
    options = options || {};
    this.displayMode = utils.deflt(options, "displayMode", false);    // boolean
    this.annotate = utils.deflt(options, "annotate", false)           // boolean
    this.leqno = utils.deflt(options, "leqno", false);                // boolean
    this.throwOnError = utils.deflt(options, "throwOnError", false);  // boolean
    this.errorColor = utils.deflt(options, "errorColor", "#b22222");  // string
    this.macros = sanitizeMacros(
      Object.prototype.hasOwnProperty.call(options, "macros") ? options.macros : undefined
    );
    this.wrap = utils.deflt(options, "wrap", "none")                   // "none" | "tex" | "="
    this.xml = utils.deflt(options, "xml", false);                     // boolean
    this.colorIsTextColor = utils.deflt(options, "colorIsTextColor", false);  // boolean
    this.strict = utils.deflt(options, "strict", false);    // boolean
    this.trust = utils.deflt(options, "trust", false);  // trust context. See html.js.
    const maxSize = Object.prototype.hasOwnProperty.call(options, "maxSize")
      ? options.maxSize
      : undefined;
    this.maxSize = (maxSize === undefined
      ? [Infinity, Infinity]
      : Array.isArray(maxSize)
      ? maxSize
      : [Infinity, Infinity]
    )
    this.maxExpand = Math.max(0, utils.deflt(options, "maxExpand", 1000)); // number
    this.wrapDelimiterPairs = true; // boolean
  }

  /**
   * Check whether to test potentially dangerous input, and return
   * `true` (trusted) or `false` (untrusted).  The sole argument `context`
   * should be an object with `command` field specifying the relevant LaTeX
   * command (as a string starting with `\`), and any other arguments, etc.
   * If `context` has a `url` field, a `protocol` field will automatically
   * get added by this function (changing the specified object).
   */
  isTrusted(context) {
    if (context.url && !context.protocol) {
      const protocol = utils.protocolFromUrl(context.url);
      if (protocol == null) {
        return false
      }
      context.protocol = protocol
    }
    const trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
    return Boolean(trust);
  }
}
