/**
 * This is the ParseError class, which is the main error thrown by Temml
 * functions when something has gone wrong. This is used to distinguish internal
 * errors from errors in the expression that the user provided.
 *
 * If possible, a caller should provide a Token or ParseNode with information
 * about where in the source string the problem occurred.
 */
class ParseError {
  constructor(
    message, // The error message
    token // An object providing position information
  ) {
    let error = " " + message;
    let start;

    const loc = token && token.loc;
    if (loc && loc.start <= loc.end) {
      // If we have the input and a position, make the error a bit fancier

      // Get the input
      const input = loc.lexer.input;

      // Prepend some information
      start = loc.start;
      const end = loc.end;
      if (start === input.length) {
        error += " at end of input: ";
      } else {
        error += " at position " + (start + 1) + ": ";
      }

      // Underline token in question using combining underscores
      const underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");

      // Extract some context from the input and add it to the error
      let left;
      if (start > 15) {
        left = "…" + input.slice(start - 15, start);
      } else {
        left = input.slice(0, start);
      }
      let right;
      if (end + 15 < input.length) {
        right = input.slice(end, end + 15) + "…";
      } else {
        right = input.slice(end);
      }
      error += left + underlined + right;
    }

    // Some hackery to make ParseError a prototype of Error
    // See http://stackoverflow.com/a/8460753
    const self = new Error(error);
    self.name = "ParseError";
    self.__proto__ = ParseError.prototype;
    self.position = start;
    return self;
  }
}

ParseError.prototype.__proto__ = Error.prototype;

export default ParseError;
