export interface Options {
  displayMode?: boolean;
  annotate?: boolean;
  leqno?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: Record<string, any>;
  wrap?: "none" | "tex" | "=";
  xml?: boolean;
  colorIsTextColor?: boolean;
  strict?: boolean;
  trust?: boolean | ((context: any) => boolean);
  maxSize?: [number, number];
  maxExpand?: number;
}

declare const version: string;

declare function render(expression: string, baseNode: HTMLElement | MathMLElement, options?: Options): void;

declare function renderToString(expression: string, options?: Options): string;

declare function renderMathInElement(block: any, options?: Options): void;

declare function generateParseTree(expression: string, options?: Options): any;

declare function definePreamble(expression: string, options?: Options): any;

declare function renderToMathMLTree(expression: string, options?: Options): any;

declare function postProcess(block: any): void;
declare function defineMacro(name: string, body: any): void;
declare function defineSymbol(
  mode: string,
  group: string,
  replace: string,
  name: string,
  acceptUnicodeChar: boolean,
): void;
declare class ParseError {
  constructor(
    message: string, // The error message
    token: any, // An object providing position information
  );
}

export {
  version,
  render,
  renderToString,
  renderMathInElement,
  postProcess,
  ParseError,
  definePreamble,
  generateParseTree as __parse,
  renderToMathMLTree as __renderToMathMLTree,
  defineSymbol as __defineSymbol,
  defineMacro as __defineMacro
}

declare const Temml: {
  version: string;
  render: typeof render;
  renderToString: typeof renderToString;
  renderMathInElement: typeof renderMathInElement;
  postProcess: typeof postProcess;
  ParseError: typeof ParseError;
  definePreamble: typeof definePreamble;
  __parse: typeof generateParseTree;
  __renderToMathMLTree: typeof renderToMathMLTree;
  __defineSymbol: typeof defineSymbol;
  __defineMacro: typeof defineMacro;
};

export default Temml;
