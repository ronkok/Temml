// Embed extensions into the cjs version of Temml.

const fs = require("fs")  // Node.js file system

// Get the temml.cjs code
let temml = fs.readFileSync('./docs/temml.cjs.js').toString('utf8')

// Get the extension macros
const regex = /temml\.__/g;
const mhchem = fs.readFileSync('./contrib/mhchem/mhchem.js').toString('utf8').replace(regex, "")
const texvc = fs.readFileSync('./contrib/texvc/texvc.js').toString('utf8').replace(regex, "")
const physics = fs.readFileSync('./contrib/physics/physics.js').toString('utf8').replace(regex, "")

// Insert the extension macros into temml.cjs
const pos = temml.indexOf("⦵") + 6
temml = temml.slice(0, pos) + "\n" + mhchem + "\n" + texvc + "\n" + physics + "\n" + temml.slice(pos + 1)
fs.writeFileSync('./docs/temml.cjs.js', temml)
