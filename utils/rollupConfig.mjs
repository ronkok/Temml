export default [
  {
    input: "./temml-default.js",
    output: { format: "iife", name: "temml", file: "./test/temml.js" }
  },
  {
    input: "./temml-default.js",
    output: { format: "cjs", name: "temml",  file: "./utils/temml.cjs" }
  },
  {
    input: "./temml.js",
    output: { format: "es", name: "temml", exports: "auto", file: "./utils/temml.mjs" }
  },
  {
    input: "./src/postProcess.js",
    output: { format: "umd", name: "temml", file: "./test/temmlPostProcess.js" }
  }
];
