/**
 * These objects store the data about the DOM nodes we create, as well as some
 * extra data. They can then be transformed into real DOM nodes with the
 * `toNode` function or HTML markup using `toMarkup`. They are useful for both
 * storing extra properties on the nodes, as well as providing a way to easily
 * work with the DOM.
 *
 * Similar functions for working with MathML nodes exist in mathMLTree.js.
 *
 */
import utils from "./utils";

/**
 * Create an HTML className based on a list of classes. In addition to joining
 * with spaces, we also remove empty classes.
 */
export const createClass = function(classes) {
  return classes.filter((cls) => cls).join(" ");
};

const initNode = function(classes, style) {
  this.classes = classes || [];
  this.attributes = {};
  this.style = style || {};
};

/**
 * Convert into an HTML node
 */
const toNode = function(tagName) {
  const node = document.createElement(tagName);

  // Apply the class
  node.className = createClass(this.classes);

  // Apply inline styles
  for (const style in this.style) {
    if (Object.prototype.hasOwnProperty.call(this.style, style )) {
      node.style[style] = this.style[style];
    }
  }

  // Apply attributes
  for (const attr in this.attributes) {
    if (Object.prototype.hasOwnProperty.call(this.attributes, attr )) {
      node.setAttribute(attr, this.attributes[attr]);
    }
  }

  // Append the children, also as HTML nodes
  for (let i = 0; i < this.children.length; i++) {
    node.appendChild(this.children[i].toNode());
  }

  return node;
};

/**
 * Convert into an HTML markup string
 */
const toMarkup = function(tagName) {
  let markup = `<${tagName}`;

  // Add the class
  if (this.classes.length) {
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

  // Add the attributes
  for (const attr in this.attributes) {
    if (Object.prototype.hasOwnProperty.call(this.attributes, attr )) {
      markup += ` ${attr}="${utils.escape(this.attributes[attr])}"`;
    }
  }

  markup += ">";

  // Add the markup of the children, also as markup
  for (let i = 0; i < this.children.length; i++) {
    markup += this.children[i].toMarkup();
  }

  markup += `</${tagName}>`;

  return markup;
};

/**
 * This node represents a span node, with a className, a list of children, and
 * an inline style.
 *
 */
export class Span {
  constructor(classes, children, style) {
    initNode.call(this, classes, style);
    this.children = children || [];
  }

  setAttribute(attribute, value) {
    this.attributes[attribute] = value;
  }

  toNode() {
    return toNode.call(this, "span");
  }

  toMarkup() {
    return toMarkup.call(this, "span");
  }
}

export class TextNode {
  constructor(text) {
    this.text = text;
  }
  toNode() {
    return document.createTextNode(this.text);
  }
  toMarkup() {
    return utils.escape(this.text);
  }
}

const uppercase = /([A-Z])/g;
/**
 * This node represents an SVG element.
 * It is used for characters that are not found in math fonts, e.g., \centerdot
 */
export class Svg {
  constructor(title, width, height, viewBox, path) {
    this.title = title;
    this.width = width;    // number, in ems
    this.height = height;  // ditto
    this.viewBox = viewBox
    this.path = path;
  }

  toNode() {
    const node = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    node.setAttribute("xmlns", 'http://www.w3.org/2000/svg')
    node.setAttribute("width", this.width + "em")
    node.setAttribute("height", this.height + "em")
    node.setAttribute("viewBox", this.viewBox)
    node.setAttribute("fill", 'currrentColor')
    node.setAttribute("stroke", 'none')
    node.setAttribute("fill-rule", 'non-zero')
    node.setAttribute("fill-opacity", '1')

    const title = document.createElementNS("http://www.w3.org/2000/svg", "title")
    title.textContent = this.title.replace(uppercase, " $1").toLowerCase()

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
    path.setAttribute("d", this.path)

    node.appendChild(title)
    node.appendChild(path)
    return node
  }

  toMarkup() {
    return `<svg xmlns='http://www.w3.org/2000/svg' width='${this.width}em'
 height='${this.height}em' viewBox='${this.viewBox}' fill='currrentColor'
 stroke='none' fill-rule='non-zero' fill-opacity='1'>
 <title>${this.title}</title><path d='${this.path}'/></svg>`
  }
}

/**
 * This node represents an image embed (<img>) element.
 */
export class Img {
  constructor(src, alt, style) {
    this.alt = alt;
    this.src = src;
    this.classes = ["mord"];
    this.style = style;
  }

  hasClass(className) {
    return utils.contains(this.classes, className);
  }

  toNode() {
    const node = document.createElement("img");
    node.src = this.src;
    node.alt = this.alt;
    node.className = "mord";

    // Apply inline styles
    for (const style in this.style) {
      if (Object.prototype.hasOwnProperty.call(this.style, style )) {
        node.style[style] = this.style[style];
      }
    }

    return node;
  }

  toMarkup() {
    let markup = `<img src='${this.src}' alt='${this.alt}'`;

    // Add the styles, after hyphenation
    let styles = "";
    for (const style in this.style) {
      if (Object.prototype.hasOwnProperty.call(this.style, style )) {
        styles += `${utils.hyphenate(style)}:${this.style[style]};`;
      }
    }
    if (styles) {
      markup += ` style="${utils.escape(styles)}"`;
    }

    markup += "/>";
    return markup;
  }
}
