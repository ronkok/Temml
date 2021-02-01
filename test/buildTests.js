const fs = require("fs")  // Node.js file system
const marked = require("../docs/marked.js")

let visualTest = fs.readFileSync('./test/visual-test.md').toString('utf8')
// convert Markdown to HTML
visualTest =  marked(visualTest)
fs.writeFileSync('./test/visual-test.html', visualTest)
