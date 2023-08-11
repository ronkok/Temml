export interface Options {
  displayMode?: boolean;
  annotate?: boolean;
  leqno?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: Record<string, string>;
  wrap?: "tex" | "=";
  xml?: boolean;
  colorIsTextColor?: boolean;
  strict?: boolean;
  trust?: boolean | ((context: any) => boolean);
  maxSize?: [number, number];
  maxExpand?: number;
}

export function render(
  expression: string,
  baseNode: HTMLElement,
  options?: Options,
): void;

export function renderToString(expression: string, options?: Options): string;

export function generateParseTree(expression: string, options?: Options): any;

export function definePreamble(expression: string, options?: Options): any;

export function renderToMathMLTree(expression: string, options?: Options): any;

export default {
  version: string,
  render,
  renderToString,
  postProcess,
  ParseError,
  definePreamble,
  __parse: generateParseTree,
  __renderToMathMLTree: renderToMathMLTree,
  __defineSymbol: defineSymbol,
  __defineMacro: defineMacro,
};
