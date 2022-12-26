//
/**
 * These objects store data about MathML nodes.
 * The `toNode` and `toMarkup` functions  create namespaced DOM nodes and
 * HTML text markup respectively.
 */

import utils from "./utils";
import { DocumentFragment } from "./tree";
import { createClass } from "./domTree";

export function newDocumentFragment(children) {
  return new DocumentFragment(children);
}

/**
 * This node represents a general purpose MathML node of any type,
 * for example, `"mo"` or `"mspace"`, corresponding to `<mo>` and
 * `<mspace>` tags).
 */
export class MathNode {
  constructor(type, children, classes, style) {
    this.type = type;
    this.attributes = {};
    this.children = children || [];
    this.classes = classes || [];
    this.style = style || {};   // Used for <mstyle> elements
  }

  /**
   * Sets an attribute on a MathML node. MathML depends on attributes to convey a
   * semantic content, so this is used heavily.
   */
  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  /**
   * Gets an attribute on a MathML node.
   */
  getAttribute(name) {
    return this.attributes[name];
  }

  /**
   * Converts the math node into a MathML-namespaced DOM element.
   */
  toNode() {
    const node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);

    for (const attr in this.attributes) {
      if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
        node.setAttribute(attr, this.attributes[attr]);
      }
    }

    if (this.classes.length > 0) {
      node.className = createClass(this.classes);
    }

    // Apply inline styles
    for (const style in this.style) {
      if (Object.prototype.hasOwnProperty.call(this.style, style )) {
        node.style[style] = this.style[style];
      }
    }

    for (let i = 0; i < this.children.length; i++) {
      node.appendChild(this.children[i].toNode());
    }

    return node;
  }

  /**
   * Converts the math node into an HTML markup string.
   */
  toMarkup() {
    let markup = "<" + this.type;

    // Add the attributes
    for (const attr in this.attributes) {
      if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
        markup += " " + attr + '="';
        markup += utils.escape(this.attributes[attr]);
        markup += '"';
      }
    }

    if (this.classes.length > 0) {
      markup += ` class="${utils.escape(createClass(this.classes))}"`;
    }

    let styles = "";

    // Add the styles, after hyphenation
    for (const style in this.style) {
      if (Object.prototype.hasOwnProperty.call(this.style, style )) {
        styles += `${utils.hyphenate(style)}:${this.style[style]};`;
      }
    }

    if (styles) {
      markup += ` style="${styles}"`;
    }

    markup += ">";

    for (let i = 0; i < this.children.length; i++) {
      markup += this.children[i].toMarkup();
    }

    markup += "</" + this.type + ">";

    return markup;
  }

  /**
   * Converts the math node into a string, similar to innerText, but escaped.
   */
  toText() {
    return this.children.map((child) => child.toText()).join("");
  }
}

/**
 * This node represents a piece of text.
 */
export class TextNode {
  constructor(text) {
    this.text = text;
  }

  /**
   * Converts the text node into a DOM text node.
   */
  toNode() {
    return document.createTextNode(this.text);
  }

  /**
   * Converts the text node into escaped HTML markup
   * (representing the text itself).
   */
  toMarkup() {
    return utils.escape(this.toText());
  }

  /**
   * Converts the text node into a string
   * (representing the text itself).
   */
  toText() {
    return this.text;
  }
}

// Do not make an <mrow> the only child of a <mstyle>.
// An <mstyle> acts as its own implicit <mrow>.
export const wrapWithMstyle = expression => {
  let node
  if (expression.length === 1 && expression[0].type === "mrow") {
    node = expression.pop()
    node.type = "mstyle"
  } else {
    node = new MathNode("mstyle", expression);
  }
  return node
}

export default {
  MathNode,
  TextNode,
  newDocumentFragment
};
