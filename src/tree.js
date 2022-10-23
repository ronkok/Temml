/**
 * This node represents a document fragment, which contains elements, but when
 * placed into the DOM doesn't have any representation itself. It only contains
 * children and doesn't have any DOM node properties.
 */
export class DocumentFragment {
  constructor(children) {
    this.children = children;
    this.classes = [];
    this.style = {};
  }

  hasClass(className) {
    return this.classes.includes(className);
  }

  /** Convert the fragment into a node. */
  toNode() {
    const frag = document.createDocumentFragment();

    for (let i = 0; i < this.children.length; i++) {
      frag.appendChild(this.children[i].toNode());
    }

    return frag;
  }

  /** Convert the fragment into HTML markup. */
  toMarkup() {
    let markup = "";

    // Simply concatenate the markup for the children together.
    for (let i = 0; i < this.children.length; i++) {
      markup += this.children[i].toMarkup();
    }

    return markup;
  }

  /**
   * Converts the math node into a string, similar to innerText. Applies to
   * MathDomNode's only.
   */
  toText() {
    // To avoid this, we would subclass documentFragment separately for
    // MathML, but polyfills for subclassing is expensive per PR 1469.
    const toText = (child) => child.toText();
    return this.children.map(toText).join("");
  }
}
