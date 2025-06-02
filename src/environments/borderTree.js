
const ordGroup = (body) => {
  return {
    "type": "ordgroup",
    "mode": "math",
    "body": body,
    "semisimple": true
  }
}

const phantom = (body, type) => {
  return {
    "type": type,
    "mode": "math",
    "body": ordGroup(body)
  }
}

/*
 * A helper for \bordermatrix.
 * parseArray() has parsed the tokens as if the environment
 * was \begin{matrix}. That parse tree is this function’s input.
 * Here, we rearrange the parse tree to get one that will
 * result in TeX \bordermatrix.
 * The final result includes a {pmatrix}, which is the bottom
 * half of a <mover> element. The top of the <mover> contains
 * the \bordermatrix headings. The top section also contains the
 * contents of the bottom {pmatrix}. Those elements are hidden via
 * \hphantom, but they ensure that column widths are the same top and
 * bottom.
 *
 * We also create a left {matrix} with a single column that contains
 * elements shifted out of the matrix. The left {matrix} also
 * contains \vphantom copies of the other {pmatrix} elements.
 * As before, this ensures consistent row heights of left and main.
 */

export const bordermatrixParseTree = (matrix, delimiters) => {
  const body = matrix.body
  body[0].shift() // dispose of top left cell

  // Create an array for the left column
  const leftColumnBody = new Array(body.length - 1).fill().map(() => [])
  for (let i = 1; i < body.length; i++) {
    // The visible part of the cell
    leftColumnBody[i - 1].push(body[i].shift())
    // A vphantom with contents from the pmatrix, to set minimum cell height
    const phantomBody = [];
    for (let j = 0; j < body[i].length; j++) {
      phantomBody.push(body[i][j])
    }
    leftColumnBody[i - 1].push(phantom(phantomBody, "vphantom"))
  }

  // Create an array for the top row
  const topRowBody = new Array(body.length).fill().map(() => [])
  for (let j = 0; j < body[0].length; j++) {
    topRowBody[0].push(body[0][j])
  }
  // Copy the rest of the pmatrix, but squashed via \hphantom
  for (let i = 1; i < body.length; i++) {
    for (let j = 0; j < body[0].length; j++) {
      topRowBody[i].push(phantom(body[i][j].body, "hphantom"))
    }
  }

  // Squash the top row of the main {pmatrix}
  for (let j = 0; j < body[0].length; j++) {
    body[0][j] = phantom(body[0][j].body, "hphantom")
  }

  // Now wrap the arrays in the proper parse nodes.

  const leftColumn = {
    type: "array",
    mode: "math",
    body: leftColumnBody,
    cols: [{ type: "align", align: "c" }],
    rowGaps: new Array(leftColumnBody.length - 1).fill(null),
    hLinesBeforeRow: new Array(leftColumnBody.length + 1).fill().map(() => []),
    envClasses: [],
    scriptLevel: "text",
    arraystretch: 1,
    labels: new Array(leftColumnBody.length).fill(""),
    arraycolsep: { "number": 0.04, unit: "em" }
  }

  const topRow = {
    type: "array",
    mode: "math",
    body: topRowBody,
    cols: new Array(topRowBody.length).fill({ type: "align", align: "c" }),
    rowGaps: new Array(topRowBody.length - 1).fill(null),
    hLinesBeforeRow: new Array(topRowBody.length + 1).fill().map(() => []),
    envClasses: [],
    scriptLevel: "text",
    arraystretch: 1,
    labels: new Array(topRowBody.length).fill(""),
    arraycolsep: null
  }

  const topWrapper = {
    type: "styling",
    mode: "math",
    scriptLevel: "text", // Must set this explicitly.
    body: [topRow]       // Default level is "script".
  }

  const container = {
    type: "leftright",
    mode: "math",
    body: [matrix],
    left: delimiters ? delimiters[0] : "(",
    right: delimiters ? delimiters[1] : ")",
    rightColor: undefined
  }

  const base = {
    type: "op",   // The base of a TeX \overset
    mode: "math",
    limits: true,
    alwaysHandleSupSub: true,
    parentIsSupSub: true,
    symbol: false,
    suppressBaseShift: true,
    body: [container]
  }

  const mover = {
    type: "supsub",  // We're using the MathML equivalent
    mode: "math",    // of TeX \overset.
    stack: true,
    base: base,      // That keeps the {pmatrix} aligned with
    sup: topWrapper, // the math centerline.
    sub: null
  }

  return ordGroup([leftColumn, mover])
}
