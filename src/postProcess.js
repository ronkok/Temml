/* Temml Post Process
 * Populate the text contents of each \ref & \eqref
 *
 * As with other Temml code, this file is released under terms of the MIT license.
 * https://mit-license.org/
 */

export const version = "0.11.11";

export function postProcess(block) {
  const labelMap = {}
  let i = 0

  // Get a collection of the parents of each \tag & auto-numbered equation
  const amsEqns = document.getElementsByClassName('tml-eqn')
  for (let parent of amsEqns) {
    // AMS automatically numbered equation.
    // Assign an id.
    i += 1;
    parent.setAttribute("id", "tml-eqn-" + String(i))
    // No need to write a number into the text content of the element.
    // A CSS counter has done that even if this postProcess() function is not used.

    // Find any \label that refers to an AMS automatic eqn number.
    while (true) {
      if (parent.tagName === "mtable") { break }
      const labels = parent.getElementsByClassName("tml-label")
      if (labels.length > 0) {
        const id = parent.attributes.id.value
        labelMap[id] = String(i)
        break
      } else {
        parent = parent.parentElement
      }
    }
  }

  // Find \labels associated with \tag
  const taggedEqns = document.getElementsByClassName('tml-tageqn')
  for (const parent of taggedEqns) {
    const labels = parent.getElementsByClassName("tml-label")
    if (labels.length > 0) {
      const tags = parent.getElementsByClassName("tml-tag")
      if (tags.length > 0) {
        const id = parent.attributes.id.value
        labelMap[id] = tags[0].textContent
      }
    }
  }

  // Populate \ref & \eqref text content
  const refs = block.getElementsByClassName("tml-ref");
  [...refs].forEach(ref => {
    const attr = ref.getAttribute("href")
    let str = labelMap[attr.slice(1)];
    if (ref.className.indexOf("tml-eqref") === -1) {
      // \ref. Omit parens.
      str = str.replace(/^\(/, "")
      str = str.replace(/\)$/, "")
    } else {
      // \eqref. Include parens
      if (str.charAt(0) !== "(") { str = "(" + str }
      if (str.slice(-1) !== ")") { str =  str + ")" }
    }
    const mtext = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mtext")
    mtext.appendChild(document.createTextNode(str))
    const math =  document.createElementNS("http://www.w3.org/1998/Math/MathML", "math")
    math.appendChild(mtext)
    ref.textContent = ''
    ref.appendChild(math)
  })
}
