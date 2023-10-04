const fs = require('fs');

// Populate the `dist` folder.

fs.copyFile('site/assets/Temml-Local.css', 'dist/Temml-Local.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/Temml-Latin-Modern.css', 'dist/Temml-Latin-Modern.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/Temml-Asana.css', 'dist/Temml-Asana.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/Temml-STIX2.css', 'dist/Temml-STIX2.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/Temml-Libertinus.css', 'dist/Temml-Libertinus.css', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/temml.min.js', 'dist/temml.min.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('test/temml.js', 'dist/temml.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('utils/temml.cjs', 'dist/temml.cjs', (err) => {
  if (err) { throw err }
})

fs.copyFile('utils/temml.mjs', 'dist/temml.mjs', (err) => {
  if (err) { throw err }
})

fs.copyFile('test/temmlPostProcess.js', 'dist/temmlPostProcess.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/Temml.woff2', 'dist/Temml.woff2', (err) => {
  if (err) { throw err }
})

fs.copyFile('site/assets/mhchem.min.js', 'contrib/mhchem/mhchem.min.js', (err) => {
  if (err) { throw err }
})

fs.copyFile('contrib/auto-render/test/auto-render.js', 'contrib/auto-render/dist/auto-render.js',
(err) => {
  if (err) { throw err }
})

fs.copyFile('temml.d.ts', 'dist/temml.d.ts',
(err) => {
  if (err) { throw err }
})
