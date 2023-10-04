(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.temml = {}));
})(this, (function (exports) { 'use strict';

  /* Temml Post Process
   * Perform two tasks not done by Temml when it created each individual Temml <math> element.
   * Given a block,
   *   1. At each AMS auto-numbered environment, assign an id.
   *   2. Populate the text contents of each \ref & \eqref
   *
   * As with other Temml code, this file is released under terms of the MIT license.
   * https://mit-license.org/
   */

  const version = "0.10.15";

  function postProcess(block) {
    const labelMap = {};
    let i = 0;

    // Get a collection of the parents of each \tag & auto-numbered equation
    const parents = block.getElementsByClassName("tml-tageqn");
    for (const parent of parents) {
      const eqns = parent.getElementsByClassName("tml-eqn");
      if (eqns. length > 0 ) {
        // AMS automatically numbered equation.
        // Assign an id.
        i += 1;
        eqns[0].id = "tml-eqn-" + i;
        // No need to write a number into the text content of the element.
        // A CSS counter does that even if this postProcess() function is not used.
      }
      // If there is a \label, add it to labelMap
      const labels = parent.getElementsByClassName("tml-label");
      if (labels.length === 0) { continue }
      if (eqns.length > 0) {
        labelMap[labels[0].id] = String(i);
      } else {
        const tags = parent.getElementsByClassName("tml-tag");
        if (tags.length > 0) {
          labelMap[labels[0].id] = tags[0].textContent;
        }
      }
    }

    // Populate \ref & \eqref text content
    const refs = block.getElementsByClassName("tml-ref");
    [...refs].forEach(ref => {
      let str = labelMap[ref.getAttribute("href").slice(1)];
      if (ref.className.indexOf("tml-eqref") === -1) {
        // \ref. Omit parens.
        str = str.replace(/^\(/, "");
        str = str.replace(/\($/, "");
      }  {
        // \eqref. Include parens
        if (str.charAt(0) !== "(") { str = "(" + str; }
        if (str.slice(-1) !== ")") { str =  str + ")"; }
      }
      ref.textContent = str;
    });
  }

  exports.postProcess = postProcess;
  exports.version = version;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
