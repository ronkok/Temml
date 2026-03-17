const fs = require("fs")  // Node.js file system
//const { JSDOM } = require('jsdom');
const hurmet = require('./hurmet.cjs');
const temml = require('./temml.cjs');
//const katex = require('./katex.min.js');
//const TeXZilla = require("./TeXZilla.js");
// eslint-disable-next-line no-undef
globalThis.temml = temml;

// Build supported.html.
let supported = fs.readFileSync('./docs/supported.md').toString('utf8')
// convert Markdown to HTML
supported = hurmet.md2html(supported, true)
fs.writeFileSync('./site/docs/en/supported.html', supported)

let table = fs.readFileSync('./docs/support_table.md').toString('utf8')
// convert Markdown to HTML
table =  hurmet.md2html(table, true)
table = table.replace(/\(Not supported\)/g, `<span class="no-sup">Not supported</span>`)
fs.writeFileSync('./site/docs/en/support_table.html', table)

let admin = fs.readFileSync('./docs/administration.md').toString('utf8')
// convert Markdown to HTML
admin =  hurmet.md2html(admin, true)
fs.writeFileSync('./site/docs/en/administration.html', admin)

/*
// Comparison page
// This script is not working properly. I'm currently maintaining the comparison page manually.
// Also note: I hate the MathJax API.
const temmlRegEx = /₮{1,2}[^₮]+₮{1,2}/g
const katexRegEx = /₭{1,2}[^₭]+₭{1,2}/g
const texzillaRegEx = /₸{1,2}[^₸]+₸{1,2}/g
const temmlMacros = {};
const katexMacros = {};
const sourceComp = fs.readFileSync('./docs/comparison.html').toString('utf8')
const sourceDom = new JSDOM(sourceComp);
const sourceDocument = sourceDom.window.document;
const targetComp = fs.readFileSync('./site/docs/en/comparison.html').toString('utf8')
const targetDom = new JSDOM(targetComp);
const targetDocument = targetDom.window.document;

// Iterate through all the tables. Keep track of which cell we are in.
// If the cell contains TeX code, render it with the appropriate libarary.
// and replace the content of the target cell with the rendered MathML.

const tables = sourceDocument.querySelectorAll('table');
for (let tableIndex = 0; tableIndex < tables.length; tableIndex++) {
  const sourceTable = tables[tableIndex];
  const targetTable = targetDocument.querySelectorAll('table')[tableIndex];
  const sourceRows = sourceTable.querySelectorAll('tr');
  const targetRows = targetTable.querySelectorAll('tr');
  for (let rowIndex = 0; rowIndex < sourceRows.length; rowIndex++) {
    const sourceCells = sourceRows[rowIndex].querySelectorAll('td, th');
    const targetCells = targetRows[rowIndex].querySelectorAll('td, th');
    for (let cellIndex = 0; cellIndex < sourceCells.length; cellIndex++) {
      const cellContent = sourceCells[cellIndex].innerHTML;
      const targetCell = targetCells[cellIndex];
      if (temmlRegEx.test(cellContent)) {
        const displayMode = cellContent.charAt(1) === "₮"
        let tex = displayMode
          ? cellContent.slice(2, -2).trim()
          : cellContent.slice(1, -1).trim();
        tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        const mathML = temml.renderToString(tex, { displayMode, trust: true, temmlMacros });
        targetCell.innerHTML = mathML;
      } else if (katexRegEx.test(cellContent)) {
        const displayMode = cellContent.charAt(1) === "₭"
        let tex = displayMode
          ? cellContent.slice(2, -2).trim()
          : cellContent.slice(1, -1).trim();
        tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        const mathML = katex.renderToString(tex, { displayMode, output: "mathml", strict: false, trust: true, katexMacros });
        targetCell.innerHTML = mathML;
      } else if (texzillaRegEx.test(cellContent)) {
        const displayMode = cellContent.charAt(1) === "₸"
        let tex = displayMode
          ? cellContent.slice(2, -2).trim()
          : cellContent.slice(1, -1).trim();
        tex = tex.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
        let math = TeXZilla.toMathMLString(tex)
        if (math.indexOf("error") > -1) {
          math = '<span class="no-sup">Not supported</span>'
        }
        targetCell.innerHTML = math;
      } else if (cellContent.trim().slice(0, 21) === '<span class="no-sup">') {
        // Copy the "Not supported" span as is.
        targetCell.innerHTML = cellContent;
      } else if (cellIndex === 5) {
        // Copy the content of the "Notes" column as is.
        targetCell.innerHTML = cellContent;
      }
    }
  }
}

const comp = targetDocument.documentElement.outerHTML;

fs.writeFileSync('./site/docs/en/comparison.html', comp)
*/