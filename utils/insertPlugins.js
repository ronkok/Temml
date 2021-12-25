// Embed extensions into the cjs and mjs version of Temml.

const fs = require("fs")  // Node.js file system

// Get the temml.cjs and mjs code
let cjs = fs.readFileSync('./utils/temml.cjs').toString('utf8')
let mjs = fs.readFileSync('./utils/temml.mjs').toString('utf8')

// Get the extension macros
const regex = /temml\.__/g;
const mhchem = fs.readFileSync('./contrib/mhchem/mhchem.js').toString('utf8').replace(regex, "")
const texvc = fs.readFileSync('./contrib/texvc/texvc.js').toString('utf8').replace(regex, "")
const physics = fs.readFileSync('./contrib/physics/physics.js').toString('utf8').replace(regex, "")

// Insert the extension macros into temml.cjs and temml.mjs
let pos = cjs.indexOf("⦵") + 6
cjs = cjs.slice(0, pos) + "\n" + mhchem + "\n" + texvc + "\n" + physics + "\n" + cjs.slice(pos + 1)
fs.writeFileSync('./utils/temml.cjs', cjs)

pos = mjs.indexOf("⦵") + 6
mjs = mjs.slice(0, pos) + "\n" + mhchem + "\n" + texvc + "\n" + physics + "\n" + mjs.slice(pos + 1)
fs.writeFileSync('./utils/temml.mjs', mjs)
