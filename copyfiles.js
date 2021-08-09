const fs = require('fs');

// Populate the `dist` folder.

fs.copyFile('site/temml/temml-dual.css', 'dist/temml-dual.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('test/temml.css', 'dist/temml.css', (err) => {
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
