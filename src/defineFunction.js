/**
 * All registered functions.
 * `functions.js` just exports this same dictionary again and makes it public.
 * `Parser.js` requires this dictionary.
 */
export const _functions = {}

/**
 * All MathML builders. Should be only used in the `define*` and the `build*ML`
 * functions.
 */
export const _mathmlGroupBuilders = {}

export default function defineFunction({
  type,
  names,
  props,
  handler,
  mathmlBuilder
}) {
  // Set default values of functions
  const data = {
    type,
    numArgs: props.numArgs,
    argTypes: props.argTypes,
    allowedInArgument: !!props.allowedInArgument,
    allowedInText: !!props.allowedInText,
    allowedInMath: props.allowedInMath === undefined ? true : props.allowedInMath,
    numOptionalArgs: props.numOptionalArgs || 0,
    infix: !!props.infix,
    primitive: !!props.primitive,
    handler: handler
  }
  for (let i = 0; i < names.length; ++i) {
    _functions[names[i]] = data
  }
  if (type) {
    if (mathmlBuilder) {
      _mathmlGroupBuilders[type] = mathmlBuilder
    }
  }
}

/**
 * Use this to register only the MathML builder for a function(e.g.
 * if the function's ParseNode is generated in Parser.js rather than via a
 * stand-alone handler provided to `defineFunction`).
 */
export function defineFunctionBuilders({ type, mathmlBuilder }) {
  defineFunction({
    type,
    names: [],
    props: { numArgs: 0 },
    handler() {
      throw new Error("Should never be called.")
    },
    mathmlBuilder
  })
}

export const normalizeArgument = function(arg) {
  return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg
}

// Since the corresponding buildMathML function expects a
// list of elements, we normalize for different kinds of arguments
export const ordargument = function(arg) {
  return arg.type === "ordgroup" ? arg.body : [arg]
}
