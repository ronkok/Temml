/**
 * This is a module for storing settings passed into Temml. It correctly handles
 * default settings.
 */

import utils from "./utils";

/**
 * The main Settings object
 */
export default class Settings {
  constructor(options) {
    // allow null options
    options = options || {};
    this.displayMode = utils.deflt(options.displayMode, false);    // boolean
    this.annotate = utils.deflt(options.annotate, false)           // boolean
    this.leqno = utils.deflt(options.leqno, false);                // boolean
    this.throwOnError = utils.deflt(options.throwOnError, false);  // boolean
    this.errorColor = utils.deflt(options.errorColor, "#b22222");  // string
    this.macros = options.macros || {};
    this.wrap = utils.deflt(options.wrap, "tex")                    // "tex" | "="
    this.xml = utils.deflt(options.xml, false);                     // boolean
    this.colorIsTextColor = utils.deflt(options.colorIsTextColor, false);  // booelean
    this.strict = utils.deflt(options.strict, false);    // boolean
    this.trust = utils.deflt(options.trust, false);  // trust context. See html.js.
    this.maxSize = (options.maxSize === undefined
      ? [Infinity, Infinity]
      : Array.isArray(options.maxSize)
      ? options.maxSize
      : [Infinity, Infinity]
    )
    this.maxExpand = Math.max(0, utils.deflt(options.maxExpand, 1000)); // number
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
      context.protocol = utils.protocolFromUrl(context.url);
    }
    const trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
    return Boolean(trust);
  }
}
