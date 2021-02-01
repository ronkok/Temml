/**
 * This file contains information about the style that the Parser carries
 * around with it while parsing. Data is held in an `Style` object, and when
 * recursing, a new `Style` object can be created with the `.with*` functions.
 */

/**
 * This is the main Style class. It contains the current style.level, color, and font.
 *
 * Style objects should not be modified. To create a new Style with
 * different properties, call a `.with*` method.
 */
class Style {
  constructor(data) {
    // Style.level can be 0 | 1 | 2 | 3, which correspond to
    //       displaystyle, textstyle, scriptstyle, and scriptscriptstyle.
    // style.level does not directly set MathML's script level. MathML does that itself.
    // We use style.level to track, not set, math style so that we can get the
    // correct scriptlevel when needed in supsub.js, mathchoice.js, or for dimensions in em.
    this.level = data.level;
    this.color = data.color;  // string | void
    // A font family applies to a group of fonts (i.e. SansSerif), while a font
    // represents a specific font (i.e. SansSerif Bold).
    // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
    this.font = data.font || "";                // string
    this.fontFamily = data.fontFamily || "";    // string
    this.fontWeight = data.fontWeight || "";
    this.fontShape = data.fontShape || "";
    this.maxSize = data.maxSize;                // number
  }

  /**
   * Returns a new style object with the same properties as "this".  Properties
   * from "extension" will be copied to the new style object.
   */
  extend(extension) {
    const data = {
      level: this.level,
      color: this.color,
      font: this.font,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontShape: this.fontShape,
      maxSize: this.maxSize
    };

    for (const key in extension) {
      if (Object.prototype.hasOwnProperty.call(extension, key)) {
        data[key] = extension[key];
      }
    }

    return new Style(data);
  }

  withLevel(n) {
    return this.extend({
      level: n
    });
  }

  incrementLevel() {
    return this.extend({
      level: Math.min(this.level + 1, 3)
    });
  }

  /**
   * Create a new style object with the given color.
   */
  withColor(color) {
    return this.extend({
      color: color
    });
  }

  /**
   * Creates a new style object with the given math font or old text font.
   * @type {[type]}
   */
  withFont(font) {
    return this.extend({
      font
    });
  }

  /**
   * Create a new style objects with the given fontFamily.
   */
  withTextFontFamily(fontFamily) {
    return this.extend({
      fontFamily,
      font: ""
    });
  }

  /**
   * Creates a new style object with the given font weight
   */
  withTextFontWeight(fontWeight) {
    return this.extend({
      fontWeight,
      font: ""
    });
  }

  /**
   * Creates a new style object with the given font weight
   */
  withTextFontShape(fontShape) {
    return this.extend({
      fontShape,
      font: ""
    });
  }

  /**
   * Gets the CSS color of the current style object
   */
  getColor() {
    return this.color;
  }
}

export default Style;
