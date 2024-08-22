export default [
  {
    input: "./temml.js",
    output: { format: "iife", name: "temml", file: "./test/temml.js" }
  },
  {
    input: "./temml.js",
    output: { format: "cjs", name: "temml", exports: "auto", file: "./utils/temml.cjs" }
  },
  {
    input: "./temml.js",
    output: { format: "es", name: "temml", exports: "auto", file: "./utils/temml.mjs" }
  },
  {
    input: "./src/postProcess.js",
    output: { format: "umd", name: "temml", file: "./test/temmlPostProcess.js" }
  },
  {
    input: "./contrib/auto-render/auto-render.js",
    external: ["temml"],
    output: {
      format: "iife",
      name: "renderMathInElement",
      file: "./contrib/auto-render/test/auto-render.js",
      globals: { temml: "temml" }
    }
  }
];
