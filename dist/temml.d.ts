export interface Options {
  displayMode?: boolean;
  annotate?: boolean;
  leqno?: boolean;
  throwOnError?: boolean;
  errorColor?: string;
  macros?: Record<string, string>;
  wrap?: "tex" | "=" | "none";
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
  ) {}
}

declare const Temml: {
  version: string;
  render: typeof render;
  renderToString: typeof renderToString;
  postProcess: typeof postProcess;
  ParseError: typeof ParseError;
  definePreamble: typeof definePreamble;
  __parse: typeof generateParseTree;
  __renderToMathMLTree: typeof renderToMathMLTree;
  __defineSymbol: typeof defineSymbol;
  __defineMacro: typeof defineMacro;
};

export default Temml;
