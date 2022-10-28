const fs = require("fs")  // Node.js file system
const hurmetMark = require("./hurmetMark.cjs")

let katexTests = fs.readFileSync('./test/katex-tests.md').toString('utf8')
// convert Markdown to HTML
katexTests = hurmetMark.md2html(katexTests, true)
fs.writeFileSync('./site/tests/katex-tests.html', katexTests)

let mhchemTests = fs.readFileSync('./test/mhchem-tests.md').toString('utf8')
mhchemTests = hurmetMark.md2html(mhchemTests, true)
fs.writeFileSync('./site/tests/mhchem-tests.html', mhchemTests)

let mozillaTests = fs.readFileSync('./test/mozilla-tests.md').toString('utf8')
mozillaTests = hurmetMark.md2html(mozillaTests, true)
fs.writeFileSync('./site/tests/mozilla-tests.html', mozillaTests)

let wikiTests = fs.readFileSync('./test/wiki-tests.md').toString('utf8')
wikiTests = hurmetMark.md2html(wikiTests, true)
fs.writeFileSync('./site/tests/wiki-tests.html', wikiTests)

let latexmlTests = fs.readFileSync('./test/LaTeXML-tests.md').toString('utf8')
latexmlTests = hurmetMark.md2html(latexmlTests, true)
fs.writeFileSync('./site/tests/LaTeXML-tests.html', latexmlTests)
