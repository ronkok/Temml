/**
 * A `Namespace` refers to a space of nameable things like macros or lengths,
 * which can be `set` either globally or local to a nested group, using an
 * undo stack similar to how TeX implements this functionality.
 * Performance-wise, `get` and `set` take constant time.
 */

import ParseError from "./ParseError";

export default class Namespace {
  /**
   * Both arguments are optional.  The first argument is an object of
   * built-in mappings which never change.  The second argument is an object
   * of initial (global-level) mappings, which will constantly change
   * according to any global/top-level `set`s done.
   */
  constructor(builtins = {}, globalMacros = {}) {
    this.current = globalMacros;
    this.builtins = builtins;
    this.undefStack = [];
  }

  /**
   * Start a new nested group, affecting future local `set`s.
   */
  beginGroup() {
    this.undefStack.push({});
  }

  /**
   * End current nested group, restoring values before the group began.
   */
  endGroup() {
    if (this.undefStack.length === 0) {
      throw new ParseError(
        "Unbalanced namespace destruction: attempt " +
          "to pop global namespace; please report this as a bug"
      );
    }
    const undefs = this.undefStack.pop();
    for (const undef in undefs) {
      if (Object.prototype.hasOwnProperty.call(undefs, undef )) {
        if (undefs[undef] === undefined) {
          delete this.current[undef];
        } else {
          this.current[undef] = undefs[undef];
        }
      }
    }
  }

  /**
   * Detect whether `name` has a definition.  Equivalent to
   * `get(name) != null`.
   */
  has(name) {
    return Object.prototype.hasOwnProperty.call(this.current, name ) ||
    Object.prototype.hasOwnProperty.call(this.builtins, name );
  }

  /**
   * Get the current value of a name, or `undefined` if there is no value.
   *
   * Note: Do not use `if (namespace.get(...))` to detect whether a macro
   * is defined, as the definition may be the empty string which evaluates
   * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
   * `if (namespace.has(...))`.
   */
  get(name) {
    if (Object.prototype.hasOwnProperty.call(this.current, name )) {
      return this.current[name];
    } else {
      return this.builtins[name];
    }
  }

  /**
   * Set the current value of a name, and adds an undo
   * operation to the undo stack.
   */
  set(name, value) {
    // Undo this set at end of this group (possibly to `undefined`),
    // unless an undo is already in place, in which case that older
    // value is the correct one.
    const top = this.undefStack[this.undefStack.length - 1];
    if (top && !Object.prototype.hasOwnProperty.call(top, name )) {
      top[name] = this.current[name];
    }
    this.current[name] = value;
  }
}
