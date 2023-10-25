/**
 * All registered global/built-in macros.
 * `macros.js` exports this same dictionary again and makes it public.
 * `Parser.js` requires this dictionary via `macros.js`.
 */
export const _macros = {};

// This function might one day accept an additional argument and do more things.
export default function defineMacro(name, body) {
  _macros[name] = body;
}
