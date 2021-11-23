/* eslint-disable no-undef */

/****************************************************
 *
 *  physics.js
 *
 *  Implements the Physics Package for LaTeX input.
 *
 *  ---------------------------------------------------------------------
 *
 *  The original version of this file is licensed as follows:
 *  Copyright (c) 2015-2016 Kolen Cheung <https://github.com/ickc/MathJax-third-party-extensions>.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  ---------------------------------------------------------------------
 *
 *  This file has been revised from the original in the following ways:
 *  1. The interface is changed so that it can be called from Temml, not MathJax.
 *  2. \Re and \Im are not used, to avoid conflict with existing LaTeX letters.
 *
 *  This revision of the file is released under the MIT license.
 *  https://mit-license.org/
 */
temml.__defineMacro("\\quantity", "{\\left\\{ #1 \\right\\}}");
temml.__defineMacro("\\qty", "{\\left\\{ #1 \\right\\}}");
temml.__defineMacro("\\pqty", "{\\left( #1 \\right)}");
temml.__defineMacro("\\bqty", "{\\left[ #1 \\right]}");
temml.__defineMacro("\\vqty", "{\\left\\vert #1 \\right\\vert}");
temml.__defineMacro("\\Bqty", "{\\left\\{ #1 \\right\\}}");
temml.__defineMacro("\\absolutevalue", "{\\left\\vert #1 \\right\\vert}");
temml.__defineMacro("\\abs", "{\\left\\vert #1 \\right\\vert}");
temml.__defineMacro("\\norm", "{\\left\\Vert #1 \\right\\Vert}");
temml.__defineMacro("\\evaluated", "{\\left.#1 \\right\\vert}");
temml.__defineMacro("\\eval", "{\\left.#1 \\right\\vert}");
temml.__defineMacro("\\order", "{\\mathcal{O} \\left( #1 \\right)}");
temml.__defineMacro("\\commutator", "{\\left[ #1 , #2 \\right]}");
temml.__defineMacro("\\comm", "{\\left[ #1 , #2 \\right]}");
temml.__defineMacro("\\anticommutator", "{\\left\\{ #1 , #2 \\right\\}}");
temml.__defineMacro("\\acomm", "{\\left\\{ #1 , #2 \\right\\}}");
temml.__defineMacro("\\poissonbracket", "{\\left\\{ #1 , #2 \\right\\}}");
temml.__defineMacro("\\pb", "{\\left\\{ #1 , #2 \\right\\}}");
temml.__defineMacro("\\vectorbold", "{\\boldsymbol{ #1 }}");
temml.__defineMacro("\\vb", "{\\boldsymbol{ #1 }}");
temml.__defineMacro("\\vectorarrow", "{\\vec{\\boldsymbol{ #1 }}}");
temml.__defineMacro("\\va", "{\\vec{\\boldsymbol{ #1 }}}");
temml.__defineMacro("\\vectorunit", "{{\\boldsymbol{\\hat{ #1 }}}}");
temml.__defineMacro("\\vu", "{{\\boldsymbol{\\hat{ #1 }}}}");
temml.__defineMacro("\\dotproduct", "\\mathbin{\\boldsymbol\\cdot}");
temml.__defineMacro("\\vdot", "{\\boldsymbol\\cdot}");
temml.__defineMacro("\\crossproduct", "\\mathbin{\\boldsymbol\\times}");
temml.__defineMacro("\\cross", "\\mathbin{\\boldsymbol\\times}");
temml.__defineMacro("\\cp", "\\mathbin{\\boldsymbol\\times}");
temml.__defineMacro("\\gradient", "{\\boldsymbol\\nabla}");
temml.__defineMacro("\\grad", "{\\boldsymbol\\nabla}");
temml.__defineMacro("\\divergence", "{\\grad\\vdot}");
//temml.__defineMacro("\\div", "{\\grad\\vdot}"); Not included in Temml. Conflicts w/LaTeX \div
temml.__defineMacro("\\curl", "{\\grad\\cross}");
temml.__defineMacro("\\laplacian", "\\nabla^2");
temml.__defineMacro("\\tr", "{\\operatorname{tr}}");
temml.__defineMacro("\\Tr", "{\\operatorname{Tr}}");
temml.__defineMacro("\\rank", "{\\operatorname{rank}}");
temml.__defineMacro("\\erf", "{\\operatorname{erf}}");
temml.__defineMacro("\\Res", "{\\operatorname{Res}}");
temml.__defineMacro("\\principalvalue", "{\\mathcal{P}}");
temml.__defineMacro("\\pv", "{\\mathcal{P}}");
temml.__defineMacro("\\PV", "{\\operatorname{P.V.}}");
// Temml does not use the next two lines. They conflict with LaTeX letters.
//temml.__defineMacro("\\Re", "{\\operatorname{Re} \\left\\{ #1 \\right\\}}");
//temml.__defineMacro("\\Im", "{\\operatorname{Im} \\left\\{ #1 \\right\\}}");
temml.__defineMacro("\\qqtext", "{\\quad\\text{ #1 }\\quad}");
temml.__defineMacro("\\qq", "{\\quad\\text{ #1 }\\quad}");
temml.__defineMacro("\\qcomma", "{\\text{,}\\quad}");
temml.__defineMacro("\\qc", "{\\text{,}\\quad}");
temml.__defineMacro("\\qcc", "{\\quad\\text{c.c.}\\quad}");
temml.__defineMacro("\\qif", "{\\quad\\text{if}\\quad}");
temml.__defineMacro("\\qthen", "{\\quad\\text{then}\\quad}");
temml.__defineMacro("\\qelse", "{\\quad\\text{else}\\quad}");
temml.__defineMacro("\\qotherwise", "{\\quad\\text{otherwise}\\quad}");
temml.__defineMacro("\\qunless", "{\\quad\\text{unless}\\quad}");
temml.__defineMacro("\\qgiven", "{\\quad\\text{given}\\quad}");
temml.__defineMacro("\\qusing", "{\\quad\\text{using}\\quad}");
temml.__defineMacro("\\qassume", "{\\quad\\text{assume}\\quad}");
temml.__defineMacro("\\qsince", "{\\quad\\text{since}\\quad}");
temml.__defineMacro("\\qlet", "{\\quad\\text{let}\\quad}");
temml.__defineMacro("\\qfor", "{\\quad\\text{for}\\quad}");
temml.__defineMacro("\\qall", "{\\quad\\text{all}\\quad}");
temml.__defineMacro("\\qeven", "{\\quad\\text{even}\\quad}");
temml.__defineMacro("\\qodd", "{\\quad\\text{odd}\\quad}");
temml.__defineMacro("\\qinteger", "{\\quad\\text{integer}\\quad}");
temml.__defineMacro("\\qand", "{\\quad\\text{and}\\quad}");
temml.__defineMacro("\\qor", "{\\quad\\text{or}\\quad}");
temml.__defineMacro("\\qas", "{\\quad\\text{as}\\quad}");
temml.__defineMacro("\\qin", "{\\quad\\text{in}\\quad}");
temml.__defineMacro("\\differential", "{\\text{d}}");
temml.__defineMacro("\\dd", "{\\text{d}}");
temml.__defineMacro("\\derivative", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}");
temml.__defineMacro("\\dv", "{\\frac{\\text{d}{ #1 }}{\\text{d}{ #2 }}}");
temml.__defineMacro("\\partialderivative", "{\\frac{\\partial{ #1 }}{\\partial{ #2 }}}");
temml.__defineMacro("\\variation", "{\\delta}");
temml.__defineMacro("\\var", "{\\delta}");
temml.__defineMacro("\\functionalderivative", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}");
temml.__defineMacro("\\fdv", "{\\frac{\\delta{ #1 }}{\\delta{ #2 }}}");
temml.__defineMacro("\\innerproduct", "{\\left\\langle {#1} \\mid { #2} \\right\\rangle}");
temml.__defineMacro("\\outerproduct",
  "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}");
temml.__defineMacro("\\dyad",
  "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}");
temml.__defineMacro("\\ketbra",
  "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}");
temml.__defineMacro("\\op",
  "{\\left\\vert { #1 } \\right\\rangle\\left\\langle { #2} \\right\\vert}");
temml.__defineMacro("\\expectationvalue", "{\\left\\langle {#1 } \\right\\rangle}");
temml.__defineMacro("\\expval", "{\\left\\langle {#1 } \\right\\rangle}");
temml.__defineMacro("\\ev", "{\\left\\langle {#1 } \\right\\rangle}");
temml.__defineMacro("\\matrixelement",
  "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}");
temml.__defineMacro("\\matrixel",
  "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}");
temml.__defineMacro("\\mel",
  "{\\left\\langle{ #1 }\\right\\vert{ #2 }\\left\\vert{#3}\\right\\rangle}");
