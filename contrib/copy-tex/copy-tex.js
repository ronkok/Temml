// Mostly, a copy of Eric Demaine's copy-tex extension for KaTex

// Return <math> element, or null if not found.
function closestMath(node) {
  // If node is a Text Node, for example, go up to containing Element,
  // where we can apply the `closest` method.
  const element = (node instanceof Element ? node : node.parentElement)
  return element && element.closest('math')
}

const defaultCopyDelimiters = {
  inline: ['$', '$'],   // alternative: ['\(', '\)']
  display: ['$$', '$$'] // alternative: ['\[', '\]']
};

// Replace math elements with their TeX source, given an <annotation> element.
function replaceMathwithTeX(fragment, copyDelimiters = defaultCopyDelimiters) {
  const mathElements = fragment.querySelectorAll('math');
  for (let i = 0; i < mathElements.length; i++) {
    const element = mathElements[i];
    const texSource = element.querySelector('annotation');
    if (texSource) {
      if (element.replaceWith) { element.replaceWith(texSource) }
      texSource.innerHTML = copyDelimiters.inline[0] +
        texSource.innerHTML + copyDelimiters.inline[1];
    }
  }
  return fragment
}

// Global copy handler to modify behavior on/within math elements.
document.addEventListener('copy', function(event) {
  const selection = window.getSelection()
  if (selection.isCollapsed || !event.clipboardData) {
    return // default action OK if selection is empty or unchangeable
  }
  const clipboardData = event.clipboardData
  const range = selection.getRangeAt(0)

  // When start point is within a formula, expand to entire formula.
  const startMath = closestMath(range.startContainer);
  if (startMath) {
    range.setStartBefore(startMath)
  }

  // Similarly, when end point is within a formula, expand to entire formula.
  const endMath = closestMath(range.endContainer);
  if (endMath) {
    range.setEndAfter(endMath)
  }

  const fragment = range.cloneContents()
  if (!fragment.querySelector('annotation')) {
    return // default action OK if no annotation elements
  }

  const htmlContents = Array.prototype.map.call(fragment.childNodes,
    (el) => (el instanceof Text ? el.textContent : el.outerHTML)).join('')

  // Preserve usual HTML copy/paste behavior.
  clipboardData.setData('text/html', htmlContents)
  // Rewrite plain-text version.
  clipboardData.setData('text/plain', replaceMathwithTeX(fragment).textContent)
  // Prevent normal copy handling.
  event.preventDefault()
})
