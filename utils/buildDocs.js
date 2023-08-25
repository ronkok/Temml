const fs = require("fs")  // Node.js file system
const hurmet = require('./hurmet.cjs');
const temml = require('./temml.cjs');
const katex = require('./katex.min.js');
const TeXZilla = require("./TeXZilla.js");

// The main Hurmet function has to be async because it contains an 'await' statement.
(async function main() {
  // Build supported.html.
  let supported = fs.readFileSync('./docs/supported.md').toString('utf8')
  // convert Markdown to HTML
  supported = await hurmet.md2html(supported, "", true)
  fs.writeFileSync('./site/docs/en/supported.html', supported)

  let table = fs.readFileSync('./docs/support_table.md').toString('utf8')
  // convert Markdown to HTML
  table =  await hurmet.md2html(table, "", true)
  table = table.replace(/\(Not supported\)/g, `<span class="no-sup">Not supported</span>`)
  fs.writeFileSync('./site/docs/en/support_table.html', table)

  let admin = fs.readFileSync('./docs/administration.md').toString('utf8')
  // convert Markdown to HTML
  admin =  await hurmet.md2html(admin, "", true)
  fs.writeFileSync('./site/docs/en/administration.html', admin)
})();

// helper function for comparison page.
const arrayOfRegExMatches = (regex, text) => {
  if (regex.constructor !== RegExp) { throw new Error('not RegExp') }
  const result = []
  let match = null
  // eslint-disable-next-line no-cond-assign
  while (match = regex.exec(text)) {
    result.push({
      value: match[0],
      index: match.index,
      lastindex: match.index + match[0].length
    })
  }
  return result
}

// Comparison page
const temmlRegEx = /₮{1,2}[^₮]+₮{1,2}/g
let comp = fs.readFileSync('./docs/comparison.html').toString('utf8')
let macros = {};
let matches = arrayOfRegExMatches(temmlRegEx, comp)
for (let i = matches.length - 1; i >= 0; i--) {
  const displayMode = matches[i].value.charAt(1) === "₮"
  let tex = displayMode
      ? matches[i].value.slice(2, -2).trim()
      : matches[i].value.slice(1, -1).trim();
  tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  let math =  temml.renderToString(tex, { displayMode, trust: true, macros });
  if (math.indexOf("#b22222") > -1) {
    math = '<span class="no-sup">Not supported</span>'
  }
  comp = comp.slice(0, matches[i].index) + math + comp.slice(matches[i].lastindex);
}

const katexRegEx = /₭{1,2}[^₭]+₭{1,2}/g
macros = {};
matches = arrayOfRegExMatches(katexRegEx, comp)
for (let i = matches.length - 1; i >= 0; i--) {
  const displayMode = matches[i].value.charAt(1) === "₭"
  let tex = displayMode
      ? matches[i].value.slice(2, -2).trim()
      : matches[i].value.slice(1, -1).trim();
  tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  let math = katex.renderToString(
    tex,
    { displayMode, output: "mathml", trust: true, strict: false, throwOnError: false, macros }
  );
  if (math.indexOf("#cc0000") > -1) {
    math = '<span class="no-sup">Not supported</span>'
  }
  comp = comp.slice(0, matches[i].index) + math + comp.slice(matches[i].lastindex);
}

const texzillaRegEx = /₸{1,2}[^₸]+₸{1,2}/g
matches = arrayOfRegExMatches(texzillaRegEx, comp)
for (let i = matches.length - 1; i >= 0; i--) {
  const displayMode = matches[i].value.charAt(1) === "₸"
  let tex = displayMode
      ? matches[i].value.slice(2, -2).trim()
      : matches[i].value.slice(1, -1).trim();
  tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  let math = TeXZilla.toMathMLString(tex)
  if (math.indexOf("error") > -1) {
    math = '<span class="no-sup">Not supported</span>'
  }
  comp = comp.slice(0, matches[i].index) + math + comp.slice(matches[i].lastindex);
}

fs.writeFileSync('./site/docs/en/comparison.html', comp)
