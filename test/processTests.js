const fs = require("fs")  // Node.js file system

let str = fs.readFileSync('./test/katex-spec1.js').toString('utf8')
str = str.replace(/Expect(`[^`]*`)/g,
  'Expect($1)')
fs.writeFileSync('./test/katex-spec2.js', str)
