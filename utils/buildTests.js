const fs = require("fs")  // Node.js file system
const  hurmet = require("./hurmet.cjs");

// The main Hurmet function has to be async because it contains an 'await' statement.
(async function main() {
  let katexTests = fs.readFileSync('./test/katex-tests.md').toString('utf8')
  // convert Markdown to HTML
  katexTests =  await hurmet.md2html(katexTests, "", true)
  fs.writeFileSync('./site/tests/katex-tests.html', katexTests)

  let mhchemTests = fs.readFileSync('./test/mhchem-tests.md').toString('utf8')
  mhchemTests =  await hurmet.md2html(mhchemTests, "", true)
  fs.writeFileSync('./site/tests/mhchem-tests.html', mhchemTests)

  let mozillaTests = fs.readFileSync('./test/mozilla-tests.md').toString('utf8')
  mozillaTests =  await hurmet.md2html(mozillaTests, "", true)
  fs.writeFileSync('./site/tests/mozilla-tests.html', mozillaTests)

  let wikiTests = fs.readFileSync('./test/wiki-tests.md').toString('utf8')
  wikiTests =  await hurmet.md2html(wikiTests, "", true)
  fs.writeFileSync('./site/tests/wiki-tests.html', wikiTests)

  let latexmlTests = fs.readFileSync('./test/LaTeXML-tests.md').toString('utf8')
  latexmlTests =  await hurmet.md2html(latexmlTests, "", true)
  fs.writeFileSync('./site/tests/LaTeXML-tests.html', latexmlTests)

  let environmentTests = fs.readFileSync('./test/environment-tests.md').toString('utf8')
  environmentTests =  await hurmet.md2html(environmentTests, "", true)
  fs.writeFileSync('./site/tests/environment-tests.html', environmentTests)
})();
