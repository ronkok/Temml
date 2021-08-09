const fs = require('fs');

// Populate the `dist` folder.

fs.copyFile('site/temml/Temml-Cambria-Math.css', 'dist/Temml-Cambria-Math.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/Temml-Latin-Modern.css', 'dist/Temml-Latin-Modern.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/Temml-Asana.css', 'dist/Temml-Asana.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/Temml-STIX2.css', 'dist/Temml-STIX2.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/Temml-XITS.css', 'dist/Temml-XITS.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/temml.min.js', 'dist/temml.min.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('test/temml.js', 'dist/temml.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('docs/temml.cjs.js', 'dist/temml.cjs.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('test/temmlPostProcess.js', 'dist/temmlPostProcess.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/Temml-Script.woff2', 'dist/Temml-Script.woff2', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/temml/mhchem.min.js', 'contrib/mhchem/mhchem.min.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('contrib/auto-render/test/auto-render.js', 'contrib/auto-render/dist/auto-render.js',
(err) => {
  if (err) { throw err }
})
