/* eslint-disable max-len */
/* eslint-disable comma-spacing */
/* eslint-disable indent-legacy */
/* eslint-disable no-console */

import temml from "../utils/temml.cjs"; // includess mhchem & physics extensions
import ParseError from "../src/ParseError";
import parseTree from "../src/parseTree";
import Settings from "../src/Settings";
//import splitAtDelimiters from "../contrib/auto-render/splitAtDelimiters.js";
// import renderMathInElement from "../contrib/auto-render/auto-render";

/*
 * Unit tests.
 * Temml aims to minimize dependency hell by minimizing dependencies.
 * When Jest is installed, it adds several thousand files. So I don't use it.
 * Instead, I use this roll-your-own testing apparatus.
 * Many of the tests in this file have been ported from the Jest tests in KaTeX.
 */

// First, a few helpers.
const defaultSettings = new Settings();
const strictSettings = new Settings({ strict: true });

// tagging literal
const r = x => x != null && Object.prototype.hasOwnProperty.call(x, 'raw') ? x.raw[0] : x;

// Strip positions from ParseNodes.
const stripPositions = expr => {
  if (typeof expr !== "object" || expr === null) {
      return expr;
  }
  if (expr.loc && expr.loc.lexer && typeof expr.loc.start === "number") {
      delete expr.loc;
  }
  Object.keys(expr).forEach(function(key) {
      stripPositions(expr[key]);
  });
  return expr;
};

const dataTexRegEx = / data-tex="[^"]*"/
const stripDataTex = str => {
  return str.replace(dataTexRegEx, "")
}

const parse = (expr, settings = defaultSettings) => {
  const tree = parseTree(expr, settings)
  return stripPositions(tree)
}

function build(expr, settings) {
  expr = r(expr); // support tagging literals
  const rootNode = temml.__renderToMathMLTree(expr, settings);

  if (rootNode.classes.indexOf('temml-error') >= 0) {
      return rootNode;
  }

  // grab the root node of the MathML rendering
  // rootNode.children[0] is the MathML rendering
  const builtMathML = rootNode.children[0];

  // combine the non-strut children of all base spans
  const children = [];
  for (let i = 0; i < builtMathML.children.length; i++) {
      children.push(...builtMathML.children[i].children.filter(
          (node) => node.classes.indexOf("strut") < 0));
  }
  return children;
}

// This is the main testing function.
const test = () => {
  // Before we write any tests, write an Expect class that mimics Jest expect().
  // The Expect class and the say() helper function are inside this closure
  // so that they will have access to the `assertion` variable.
  const say = problem => {
    numFailures += 1
    console.log(assertion + ", but " + problem)
    console.log("")
  }

  class Expect {
    constructor(input) {
      this.input = input;
    }

    toEqual(x) {
      numTests += 1
      if (this.input !== x) { say(this.input + " does not equal " + x) }
    }

    toNotEqual(x) {
      numTests += 1
      if (this.input === x) { say(this.input + " equals " + x + "!") }
    }

    toMatchSnapshot(str) {
      numTests += 1
      const flattened = JSON.stringify(this.input)
      if (flattened !== str) { say(flattened + " is not " + str) }
    }

    toBeDefined() {
      numTests += 1
      if (this.input === undefined) { say(this.input + " is undefinded") }
    }

    toBeUndefined() {
      numTests += 1
      if (this.input !== undefined) { say(this.input + " is defined.") }
    }

    toHaveLength(expectedNum) {
      numTests += 1
      if (!this.input.length) { say("No length!") }
      if (this.input.length !== expectedNum) { say(this.input.length + " is not " + expectedNum) }
    }

    toBeTruthy() {
      numTests += 1
      if (!this.input) { say(this.input + " is not truthy.") }
    }

    toBeCloseTo(expected) {
      numTests += 1
      if (Math.abs(expected - this.input) >= 0.005) {
        say(this.input + " is not close to " + expected)
      }
    }

    toContain(fragment) {
      numTests += 1
      if (this.input.indexOf(fragment) === -1) {
        say(this.input + " does not contain " + fragment)
      }
    }

    toNotContain(fragment) {
      numTests += 1
      if (this.input.indexOf(fragment) !== -1) {
        say(this.input + " contains " + fragment + "!")
      }
    }

    toParse(settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = parse(this.input, settings)
        if (tree instanceof ParseError) { result = false }
      } catch (e) {
        result = false
      }
      if (!result) { say(this.input + " does not parse.") }
    }

    toNotParse(settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = parse(this.input, settings)
        if (tree instanceof ParseError) { result = false }
      } catch (e) {
        result = false
      }
      if (result) { say(this.input + " parses!") }
    }

    toParseLike(str, settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = parse(this.input, settings)
        if (tree instanceof ParseError) { result = false }
        const comp = parse(str, settings)
        if (comp instanceof ParseError) { result = false }
        result = JSON.stringify(tree) === JSON.stringify(comp)
      } catch (e) {
        result = false
      }
      if (!result) { say(this.input + " does not parse like " + str) }
    }

    toBuild(settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = build(this.input, settings)
        if (tree.classes && tree.classes[0] === "temml-error") { result = false }
      } catch (e) {
        result = false
      }
      if (!result) { say(this.input + " does not build.") }
    }

    toNotBuild(settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = build(this.input, settings)
        if (tree.classes && tree.classes[0] === "temml-error") { result = false }
      } catch (e) {
        result = false
      }
      if (result) { say(this.input + " builds!") }
    }

    toBuildLike(str, settings = defaultSettings) {
      numTests += 1
      let result = true
      try {
        const tree = build(this.input, settings)
        if (tree instanceof ParseError) { result = false }
        const comp = build(str, settings)
        if (comp instanceof ParseError) { result = false }
        result = stripDataTex(JSON.stringify(tree)) === stripDataTex(JSON.stringify(comp))
      } catch (e) {
        result = false
      }
      if (!result) { say(this.input + " does not build like " + str) }
    }
  }

  // Now we have an Expect class. Here come lots of tests.

  let numTests = 0
  let numFailures = 0
  console.log("")

  let assertion = "Parser should work"
  new Expect("").toParse()
  new Expect("1234|/@.\"`abcdefgzABCDEFGZ").toParse()

  assertion = "Parser should ignore whitespace"
  new Expect(`    x    y    `).toParseLike("xy")
  new Expect(`    x   ^ y    `).toParseLike("x^y")

  assertion = "Parser should build a list of ords"
  const ords = parse("1234|/@.\"`abcdefgzABCDEFGZ");
  for (let i = 0; i < ords.length; i++) {
      new Expect(ords[i].type.slice(4)).toEqual("ord");
  }

  assertion = "Parser should build a list of bins"
  let nodes = parse(`+-*\\cdot\\pm\\div`)
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toEqual("atom");
    new Expect(nodes[i].family).toEqual("bin");
  }

  assertion = "Parser should build a list of rels"
  nodes = parse(`=<>\\leq\\geq\\neq\\nleq\\ngeq\\cong\\in`)
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toEqual("atom");
    new Expect(nodes[i].family).toEqual("rel");
  }

  assertion = "Parse should build a list of puncts"
  nodes = parse(",;")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toEqual("atom");
    new Expect(nodes[i].family).toEqual("punct");
  }

  assertion = "Parser should build a list of opens"
  nodes = parse("([")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toEqual("atom");
    new Expect(nodes[i].family).toEqual("open");
  }

  assertion = "Parser should build a list of closes"
  nodes = parse("])")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toEqual("atom");
    new Expect(nodes[i].family).toEqual("close");
  }

  assertion = "\\Temml should parse"
  new Expect("\\Temml").toParse()

  assertion = "Subscripts and superscripts should parse"
  new Expect(`x^2`).toParse()
  new Expect(`x_3`).toParse()
  new Expect(`x^2_3`).toParse()
  new Expect(`x_2^3`).toParse()
  new Expect(`^3`).toParse();
  new Expect(`^3+`).toParse();
  new Expect(`_2`).toParse();
  new Expect(`^3_2`).toParse();
  new Expect(`_2^3`).toParse();

  let node = parse("x^2")[0]
  new Expect(node.type).toEqual("supsub");
  new Expect(node.base).toBeDefined();
  new Expect(node.sup).toBeDefined();
  new Expect(node.sub).toBeUndefined();

  node = parse("x_3")[0]
  new Expect(node.type).toEqual("supsub");
  new Expect(node.base).toBeDefined();
  new Expect(node.sub).toBeDefined();
  new Expect(node.sup).toBeUndefined();

  node = parse("x^2_3")[0]
  new Expect(node.type).toEqual("supsub");
  new Expect(node.base).toBeDefined();
  new Expect(node.sub).toBeDefined();
  new Expect(node.sup).toBeDefined();

  new Expect(`x^2_3`).toParseLike(`x_3^2`)

  assertion = "Double exponents should not parse"
  new Expect(`x^x^x`).toNotParse();
  new Expect(`x_x_x`).toNotParse();
  new Expect(`x_x^x_x`).toNotParse();
  new Expect(`x_x^x^x`).toNotParse();
  new Expect(`x^x_x_x`).toNotParse();
  new Expect(`x^x_x^x`).toNotParse();

  assertion = "A subsup parser should work correctly with {}s"
  new Expect(`x^{2+3}`).toParse();
  new Expect(`x_{3-2}`).toParse();
  new Expect(`x^{2+3}_3`).toParse();
  new Expect(`x^2_{3-2}`).toParse();
  new Expect(`x^{2+3}_{3-2}`).toParse();
  new Expect(`x_{3-2}^{2+3}`).toParse();
  new Expect(`x_3^{2+3}`).toParse();
  new Expect(`x_{3-2}^2`).toParse();

  assertion = "A subsup parser should work with nested super/subscripts"
  new Expect(`x^{x^x}`).toParse();
  new Expect(`x^{x_x}`).toParse();
  new Expect(`x_{x^x}`).toParse();
  new Expect(`x_{x_x}`).toParse();

  assertion = "A subscript and superscript tree-builder should not fail when there is no nucleus"
  new Expect(`^3`).toBuild();
  new Expect(`_2`).toBuild();
  new Expect(`^3_2`).toBuild();
  new Expect(`_2^3`).toBuild();

  assertion = "A parser with limit controls should fail when the limit control is not preceded by an op node"
  new Expect(`3\\nolimits_2^2`).toNotParse();
  new Expect(`\\sqrt\\limits_2^2`).toNotParse();
  new Expect(`45 +\\nolimits 45`).toNotParse();

  assertion = "A parser with limit controls should parse when the limit control directly follows an op node"
  new Expect(`\\int\\limits_2^2 3`).toParse();
  new Expect(`\\sum\\nolimits_3^4 4`).toParse();

  assertion = "A parser with limit controls should parse when the limit control is in the sup/sub area of an op node"
  new Expect(`\\int_2^2\\limits`).toParse();
  new Expect(`\\int^2\\nolimits_2`).toParse();
  new Expect(`\\int_2\\limits^2`).toParse();

  assertion = "A parser with limit controls should allow multiple limit controls in the sup/sub area of an op node"
  new Expect(`\\int_2\\nolimits^2\\limits 3`).toParse();
  new Expect(`\\int\\nolimits\\limits_2^2`).toParse();
  new Expect(`\\int\\limits\\limits\\limits_2^2`).toParse();

  assertion = "A parser with limit controls should have the rightmost limit control determine the limits property of the preceding op node"
  new Expect(parse(`\\int\\nolimits\\limits_2^2`)[0].base.limits).toEqual(true)
  new Expect(parse(`\\int\\limits_2\\nolimits^2`)[0].base.limits).toEqual(false)

  assertion = "A group parser should work"
  new Expect(`{xy}`).toParse();
  nodes = parse(`{xy}`)
  new Expect(nodes).toHaveLength(1);
  new Expect(nodes[0].type).toEqual("ordgroup");
  new Expect(nodes[0].body).toBeTruthy();
  new Expect(`\\begingroup xy \\endgroup`).toParse();
  new Expect(`\\begingroup xy`).toNotParse();
  new Expect(`\\begingroup xy }`).toNotParse();
  nodes = parse(`\\begingroup xy \\endgroup`)
  new Expect(nodes).toHaveLength(1)
  new Expect(nodes[0].type).toEqual("ordgroup");
  new Expect(nodes[0].body).toBeTruthy();
  new Expect(nodes[0].semisimple).toBeTruthy();

  assertion = "An implicit group parser should work"
  new Expect(`\\Large x`).toParse();
  new Expect(`abc {abc \\Large xyz} abc`).toParse();
  nodes = parse("\\Large abc")
  new Expect(nodes).toHaveLength(1);
  new Expect(nodes[0].type).toEqual("sizing");
  new Expect(nodes[0].body).toBeTruthy();
  nodes = parse("a \\Large abc")
  new Expect(nodes).toHaveLength(2);
  new Expect(nodes[1].type).toEqual("sizing");
  new Expect(nodes[1].body).toHaveLength(3);
  nodes = parse(`a { b \\Large c } d`)
  new Expect(nodes[1].body[1].type).toEqual("sizing");
  new Expect(nodes[1].body[1].body).toHaveLength(1);

  assertion = "An implicit group parser should work within optional groups"
  new Expect(parse(`\\sqrt[\\small 3]{x}`)).toMatchSnapshot('[{"type":"sqrt","mode":"math","body":{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"x"}]},"index":{"type":"ordgroup","mode":"math","body":[{"type":"sizing","mode":"math","funcName":"\\\\small","body":[{"type":"textord","mode":"math","text":"3"}]}]}}]');
  new Expect(parse(`\\sqrt[\\color{red} 3]{x}`)).toMatchSnapshot('[{"type":"sqrt","mode":"math","body":{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"x"}]},"index":{"type":"ordgroup","mode":"math","body":[{"type":"color","mode":"math","color":"red","body":[{"type":"textord","mode":"math","text":"3"}]}]}}]')
  new Expect(parse("\\sqrt[\\textstyle 3]{x}")).toMatchSnapshot('[{"type":"sqrt","mode":"math","body":{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"x"}]},"index":{"type":"ordgroup","mode":"math","body":[{"type":"styling","mode":"math","style":"text","body":[{"type":"textord","mode":"math","text":"3"}]}]}}]')
  new Expect(parse("\\sqrt[\\tt 3]{x}")).toMatchSnapshot('[{"type":"sqrt","mode":"math","body":{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"x"}]},"index":{"type":"ordgroup","mode":"math","body":[{"type":"font","mode":"math","font":"mathtt","body":{"type":"ordgroup","mode":"math","body":[{"type":"textord","mode":"math","text":"3"}]}}]}}]')

  assertion = "A function parser should work"
  new Expect(`\\div`).toParse();
  new Expect(`\\blue x`).toParse();
  new Expect(`\\frac 1 2`).toParse();
  new Expect(`\\tilde`).toNotParse();
  new Expect(`\\frac`).toNotParse();
  new Expect(`\\frac 1`).toNotParse();
  new Expect(parse(`\\tildex`)[0].color).toEqual("#b22222");
  new Expect(`\\frac12`).toParse(strictSettings);
  new Expect(`\\;x`).toParse();

  assertion = "A frac parser should work"
  const expression = r`\frac{x}{y}`;
  const dfracExpression = r`\dfrac{x}{y}`;
  const tfracExpression = r`\tfrac{x}{y}`;
  const cfracExpression = r`\cfrac{x}{y}`;
  const genfrac1 = r`\genfrac ( ] {0.06em}{0}{a}{b+c}`;
  const genfrac2 = r`\genfrac ( ] {0.8pt}{}{a}{b+c}`;
  new Expect(expression).toParse();
  node = parse(expression)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  new Expect(cfracExpression).toParse();
  new Expect(dfracExpression).toParse();
  new Expect(tfracExpression).toParse();
  new Expect(genfrac1).toParse();
  new Expect(genfrac2).toParse();
  const dfracParse = parse(dfracExpression)[0];
  new Expect(dfracParse.type).toEqual("genfrac");
  new Expect(dfracParse.numer).toBeDefined();
  new Expect(dfracParse.denom).toBeDefined();
  const tfracParse = parse(tfracExpression)[0];
  new Expect(tfracParse.type).toEqual("genfrac");
  new Expect(tfracParse.numer).toBeDefined();
  new Expect(tfracParse.denom).toBeDefined();
  const cfracParse = parse(cfracExpression)[0];
  new Expect(cfracParse.type).toEqual("genfrac");
  new Expect(cfracParse.numer).toBeDefined();
  new Expect(cfracParse.denom).toBeDefined();
  const genfracParse = parse(genfrac1)[0];
  new Expect(genfracParse.type).toEqual("genfrac");
  new Expect(genfracParse.numer).toBeDefined();
  new Expect(genfracParse.denom).toBeDefined();
  new Expect(genfracParse.leftDelim).toBeDefined();
  new Expect(genfracParse.rightDelim).toBeDefined();
  let badGenFrac = "\\genfrac ( ] {b+c}{0}{a}{b+c}";
  new Expect(badGenFrac).toNotParse();
  badGenFrac = "\\genfrac ( ] {0.06em}{0}{a}";
  new Expect(badGenFrac).toNotParse();
  node = parse(`x \\atop y`)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  new Expect(node.hasBarLine).toEqual(false);

  assertion = "An over/brace/brack parser should work"
  const simpleOver = r`1 \over x`;
  const complexOver = r`1+2i \over 3+4i`;
  const braceFrac = r`a+b \brace c+d`;
  const brackFrac = r`a+b \brack c+d`;
  new Expect(simpleOver).toParse();
  new Expect(complexOver).toParse();
  new Expect(braceFrac).toParse();
  new Expect(brackFrac).toParse();

  node = parse(simpleOver)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();

  node = parse(complexOver)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();

  const parseBraceFrac = parse(braceFrac)[0];
  new Expect(parseBraceFrac.type).toEqual("genfrac");
  new Expect(parseBraceFrac.numer).toBeDefined();
  new Expect(parseBraceFrac.denom).toBeDefined();
  new Expect(parseBraceFrac.leftDelim).toBeDefined();
  new Expect(parseBraceFrac.rightDelim).toBeDefined();

  const parseBrackFrac = parse(brackFrac)[0];
  new Expect(parseBrackFrac.type).toEqual("genfrac");
  new Expect(parseBrackFrac.numer).toBeDefined();
  new Expect(parseBrackFrac.denom).toBeDefined();
  new Expect(parseBrackFrac.leftDelim).toBeDefined();
  new Expect(parseBrackFrac.rightDelim).toBeDefined();
  node = parse(complexOver)[0];

  const numer = node.numer;
  new Expect(numer.body).toHaveLength(4);
  node = parse(complexOver)[0];

  const denom = node.denom;
  new Expect(denom.body).toHaveLength(4);
  const emptyNumerator = r`\over x`;
  node = parse(emptyNumerator)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  const emptyDenominator = r`1 \over`;
  node = parse(emptyDenominator)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  const displaystyleExpression = r`\displaystyle 1 \over 2`;
  node = parse(displaystyleExpression)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer.body[0].type).toEqual("styling");
  new Expect(node.denom).toBeDefined();
  new Expect(`\\textstyle 1 \\over 2`).toParseLike(`\\frac{\\textstyle 1}{2}`);
  new Expect(`{\\textstyle 1} \\over 2`).toParseLike(`\\frac{\\textstyle 1}{2}`);
  const nestedOverExpression = r`{1 \over 2} \over 3`;
  node = parse(nestedOverExpression)[0];
  new Expect(node.type).toEqual("genfrac");
  new Expect(node.numer.body[0].type).toEqual("genfrac");
  new Expect(node.numer.body[0].numer.body[0].text).toEqual("1");
  new Expect(node.numer.body[0].denom.body[0].text).toEqual("2");
  new Expect(node.denom).toBeDefined();
  new Expect(node.denom.body[0].text).toEqual("3");
  const badMultipleOvers = r`1 \over 2 + 3 \over 4`;
  new Expect(badMultipleOvers).toNotParse();
  const badOverChoose = r`1 \over 2 \choose 3`;
  new Expect(badOverChoose).toNotParse();

  assertion = "A genfrac builder should work"
  new Expect("\\frac{x}{y}").toBuild();
  new Expect("\\dfrac{x}{y}").toBuild();
  new Expect("\\tfrac{x}{y}").toBuild();
  new Expect("\\cfrac{x}{y}").toBuild();
  new Expect("\\genfrac ( ] {0.06em}{0}{a}{b+c}").toBuild();
  new Expect("\\genfrac ( ] {0.8pt}{}{a}{b+c}").toBuild();
  new Expect("\\genfrac {} {} {0.8pt}{}{a}{b+c}").toBuild();
  new Expect("\\genfrac [ {} {0.8pt}{}{a}{b+c}").toBuild();

  assertion = "A infix builder should not fail"
  new Expect("a \\over b").toBuild();
  new Expect("a \\atop b").toBuild();
  new Expect("a \\choose b").toBuild();
  new Expect("a \\brace b").toBuild();
  new Expect("a \\brack b").toBuild();

  assertion = "A sizing parser should work"
  const sizeExpression = r`\Huge{x}\small{x}`;
  new Expect(sizeExpression).toParse();
  node = parse(sizeExpression)[0];
  new Expect(node.type).toEqual("sizing");
  new Expect(node.body).toBeDefined();

  assertion = "A text parser should work"
  const textExpression = r`\text{a b}`;
  const noBraceTextExpression = r`\text x`;
  const nestedTextExpression = r`\text{a {b} \blue{c} \textcolor{#fff}{x} \llap{x}}`;
  const spaceTextExpression = r`\text{  a \ }`;
  const leadingSpaceTextExpression = r`\text {moo}`;
  const badTextExpression = r`\text{a b%}`;
  const badFunctionExpression = r`\text{\sqrt{x}}`;
  const mathTokenAfterText = r`\text{sin}^2`;
  new Expect(textExpression).toParse();
  node = parse(textExpression)[0];

  new Expect(node.type).toEqual("text");
  new Expect(node.body).toBeDefined();

  new Expect(parse(textExpression)[0].body[0].type).toEqual("textord");
  new Expect(badTextExpression).toNotParse();
  new Expect(badFunctionExpression).toNotParse();
  new Expect(noBraceTextExpression).toParse();
  new Expect(nestedTextExpression).toParse();
  node = parse(spaceTextExpression)[0];
  new Expect(node.body[0].type).toEqual("spacing");
  new Expect(node.body[1].type).toEqual("textord");
  new Expect(node.body[2].type).toEqual("spacing");
  new Expect(node.body[3].type).toEqual("spacing");
  new Expect(mathTokenAfterText).toParse();
  node = parse(leadingSpaceTextExpression)[0];
  // [m, o, o]
  new Expect(node.body).toHaveLength(3);
  new Expect(node.body.map(n => n.text).join("")).toEqual("moo");
  new Expect(`\\text{graph: $y = mx + b$}`).toParse();
  new Expect(`\\text{graph: \\(y = mx + b\\)}`).toParse();
  new Expect(`\\text{hello $x + \\text{world $y$} + z$}`).toParse();
  new Expect(`\\text{hello \\(x + \\text{world $y$} + z\\)}`).toParse();
  new Expect(`\\text{hello $x + \\text{world \\(y\\)} + z$}`).toParse();
  new Expect(`\\text{hello \\(x + \\text{world \\(y\\)} + z\\)}`).toParse();
  new Expect(`\\(`).toNotParse();
  new Expect(`\\text{$\\(x\\)$}`).toNotParse();
  new Expect(`$x$`).toNotParse();
  new Expect(`\\text{\\($x$\\)}`).toNotParse();
  new Expect(`\\)`).toNotParse();
  new Expect(`\\text{\\)}`).toNotParse();
  new Expect(`$`).toNotParse();
  new Expect(`\\text{$}`).toNotParse();
  new Expect(`\\text{$x\\)}`).toNotParse();
  new Expect(`\\text{\\(x$}`).toNotParse();
  new Expect(`a b\\, \\; \\! \\: \\> ~ \\thinspace \\medspace \\quad \\ `).toBuild();
  new Expect(`\\enspace \\thickspace \\qquad \\space \\nobreakspace`).toBuild();
  new Expect(`\\text{\\textellipsis !}`).toParseLike(`\\text{\\textellipsis!}`);

  assertion = "A texvc builder should not fail"
  new Expect("\\lang\\N\\darr\\R\\dArr\\Z\\Darr\\alef\\rang").toBuild();
  new Expect("\\alefsym\\uarr\\Alpha\\uArr\\Beta\\Uarr\\Chi").toBuild();
  new Expect("\\clubs\\diamonds\\hearts\\spades\\cnums\\Complex").toBuild();
  new Expect("\\Dagger\\empty\\harr\\Epsilon\\hArr\\Eta\\Harr\\exist").toBuild();
  new Expect("\\image\\larr\\infin\\lArr\\Iota\\Larr\\isin\\Kappa").toBuild();
  new Expect("\\Mu\\lrarr\\natnums\\lrArr\\Nu\\Lrarr\\Omicron").toBuild();
  new Expect("\\real\\rarr\\plusmn\\rArr\\reals\\Rarr\\Reals\\Rho").toBuild();
  new Expect("\\text{\\sect}\\sdot\\sub\\sube\\supe").toBuild();
  new Expect("\\Tau\\thetasym\\weierp\\Zeta").toBuild();

  assertion = "A tie parser should work"
  const mathTie = "a~b";
  const textTie = r`\text{a~ b}`;
  new Expect(mathTie).toParse();
  new Expect(textTie).toParse();
  new Expect(parse(mathTie)[1].type).toEqual("spacing");
  node = parse(textTie)[0];
  new Expect(node.body[1].type).toEqual("spacing");
  node = parse(textTie)[0];
  new Expect(node.body[2].type).toEqual("spacing");

  assertion = "A delimiter sizing parser should work"
  const normalDelim = r`\bigl |`;
  const notDelim = r`\bigl x`;
  const bigDelim = r`\Biggr \langle`;
  new Expect(normalDelim).toParse();
  new Expect(bigDelim).toParse();
  new Expect(notDelim).toNotParse();
  node = parse(normalDelim)[0];
  new Expect(node.type).toEqual("delimsizing");
  const leftParse = parse(normalDelim)[0];
  const rightParse = parse(bigDelim)[0];
  new Expect(leftParse.mclass).toEqual("mopen");
  new Expect(rightParse.mclass).toEqual("mclose");
  const smallParse = parse(normalDelim)[0];
  const bigParse = parse(bigDelim)[0];
  new Expect(smallParse.size).toEqual(1);
  new Expect(bigParse.size).toEqual(4);

  assertion = "An overline parser should work"
  const overline = r`\overline{x}`;
  new Expect(overline).toParse();
  node = parse(overline)[0];
  new Expect(node.type).toEqual("overline");

  assertion = "A lap parser should work"
  new Expect(`\\rlap{\\,/}{=}`).toParse();
  new Expect(`\\mathrlap{\\,/}{=}`).toParse();
  new Expect(`{=}\\llap{/\\,}`).toParse();
  new Expect(`{=}\\mathllap{/\\,}`).toParse();
  new Expect(`\\sum_{\\clap{ABCDEFG}}`).toParse();
  new Expect(`\\sum_{\\mathclap{ABCDEFG}}`).toParse();
  new Expect(`\\mathrlap{\\frac{a}{b}}{=}`).toParse();
  new Expect(`{=}\\mathllap{\\frac{a}{b}}`).toParse();
  new Expect(`\\sum_{\\mathclap{\\frac{a}{b}}}`).toParse();
  new Expect(`\\rlap{\\frac{a}{b}}{=}`).toNotParse();
  new Expect(`{=}\\llap{\\frac{a}{b}}`).toNotParse();
  new Expect(`\\sum_{\\clap{\\frac{a}{b}}}`).toNotParse();
  node = parse(`\\mathrlap{\\,/}`)[0];
  new Expect(node.type).toEqual("lap");

  assertion = "A rule parser should work"
  const emRule = r`\rule{1em}{2em}`;
  const exRule = r`\rule{1ex}{2em}`;
  let badUnitRule = r`\rule{1au}{2em}`;
  let noNumberRule = r`\rule{1em}{em}`;
  const incompleteRule = r`\rule{1em}`;
  const hardNumberRule = r`\rule{   01.24ex}{2.450   em   }`;
  new Expect(emRule).toParse();
  new Expect(exRule).toParse();
  new Expect(badUnitRule).toNotParse();
  new Expect(noNumberRule).toNotParse();
  new Expect(incompleteRule).toNotParse();
  node = parse(emRule)[0];
  new Expect(node.type).toEqual("rule");
  let emParse = parse(emRule)[0];
  let exParse = parse(exRule)[0];
  new Expect(emParse.width.unit).toEqual("em");
  new Expect(emParse.height.unit).toEqual("em");
  new Expect(exParse.width.unit).toEqual("ex");
  new Expect(exParse.height.unit).toEqual("em");
  const hardNumberParse = parse(hardNumberRule)[0];
  new Expect(hardNumberParse.width.number).toBeCloseTo(1.24);
  new Expect(hardNumberParse.height.number).toBeCloseTo(2.45);
  node = parse(`\\rule{-1em}{- 0.2em}`)[0];
  new Expect(node.width.number).toBeCloseTo(-1);
  new Expect(node.height.number).toBeCloseTo(-0.2);

  assertion = "A kern parser should work"
  let emKern = r`\kern{1em}`;
  let exKern = r`\kern{1ex}`;
  let muKern = r`\mkern{1mu}`;
  let abKern = r`a\kern{1em}b`;
  badUnitRule = r`\kern{1au}`;
  noNumberRule = r`\kern{em}`;
  emParse = parse(emKern)[0];
  exParse = parse(exKern)[0];
  let muParse = parse(muKern)[0];
  let abParse = parse(abKern)[1];
  new Expect(emParse.dimension.unit).toEqual("em");
  new Expect(exParse.dimension.unit).toEqual("ex");
  new Expect(muParse.dimension.unit).toEqual("mu");
  new Expect(abParse.dimension.unit).toEqual("em");
  new Expect(badUnitRule).toNotParse();
  new Expect(noNumberRule).toNotParse();
  node = parse(`\\kern{-1em}`)[0];
  new Expect(node.dimension.number).toBeCloseTo(-1);
  node = parse(`\\kern{+1em}`)[0];
  new Expect(node.dimension.number).toBeCloseTo(1);

  assertion = "A non-braced kern parser should work"
  emKern = r`\kern1em`;
  exKern = r`\kern 1 ex`;
  muKern = r`\mkern 1mu`;
  const abKern1 = r`a\mkern1mub`;
  const abKern2 = r`a\mkern-1mub`;
  const abKern3 = r`a\mkern-1mu b`;
  badUnitRule = r`\kern1au`;
  noNumberRule = r`\kern em`;
  emParse = parse(emKern)[0];
  exParse = parse(exKern)[0];
  muParse = parse(muKern)[0];
  let abParse1 = parse(abKern1)[1];
  let abParse2 = parse(abKern2)[1];
  let abParse3 = parse(abKern3)[1];
  new Expect(emParse.dimension.unit).toEqual("em");
  new Expect(exParse.dimension.unit).toEqual("ex");
  new Expect(muParse.dimension.unit).toEqual("mu");
  new Expect(abParse1.dimension.unit).toEqual("mu");
  new Expect(abParse2.dimension.unit).toEqual("mu");
  new Expect(abParse3.dimension.unit).toEqual("mu");
  abParse1 = parse(abKern1);
  abParse2 = parse(abKern2);
  abParse3 = parse(abKern3);
  new Expect(abParse1).toHaveLength(3);
  new Expect(abParse1[0].text).toEqual("a");
  new Expect(abParse1[2].text).toEqual("b");
  new Expect(abParse2).toHaveLength(3);
  new Expect(abParse2[0].text).toEqual("a");
  new Expect(abParse2[2].text).toEqual("b");
  new Expect(abParse3).toHaveLength(3);
  new Expect(abParse3[0].text).toEqual("a");
  new Expect(abParse3[2].text).toEqual("b");
  new Expect(badUnitRule).toNotParse();
  new Expect(noNumberRule).toNotParse();
  node = parse(`\\kern-1em`)[0];
  new Expect(node.dimension.number).toBeCloseTo(-1);
  node = parse(`\\kern+1em`)[0];
  new Expect(node.dimension.number).toBeCloseTo(1);
  abKern = "a\\mkern\t-\r1  \n mu\nb";
  abParse = parse("a\\mkern\t-\r1  \n mu\nb");
  new Expect(abParse).toHaveLength(3);
  new Expect(abParse[0].text).toEqual("a");
  new Expect(abParse[1].dimension.unit).toEqual("mu");
  new Expect(abParse[2].text).toEqual("b");

  assertion = "A left/right parser should work"
  const normalLeftRight = r`\left( \dfrac{x}{y} \right)`;
  const emptyRight = r`\left( \dfrac{x}{y} \right.`;
  new Expect(normalLeftRight).toParse();
  node = parse(normalLeftRight)[0];
  new Expect(node.type).toEqual("leftright");
  new Expect(node.left).toEqual("(");
  new Expect(node.right).toEqual(")");
  const unmatchedLeft = r`\left( \dfrac{x}{y}`;
  const unmatchedRight = r`\dfrac{x}{y} \right)`;
  new Expect(unmatchedLeft).toNotParse();
  new Expect(unmatchedRight).toNotParse();
  const unmatched = r`{ \left( \dfrac{x}{y} } \right)`;
  new Expect(unmatched).toNotParse();
  const nonDelimiter = r`\left$ \dfrac{x}{y} \right)`;
  new Expect(nonDelimiter).toNotParse();
  new Expect(emptyRight).toParse();
  const normalEmpty = r`\Bigl .`;
  new Expect(normalEmpty).toParse();
  const normalMiddle = r`\left( \dfrac{x}{y} \middle| \dfrac{y}{z} \right)`;
  new Expect(normalMiddle).toParse();
  const multiMiddle = r`\left( \dfrac{x}{y} \middle| \dfrac{y}{z} \middle/ \dfrac{z}{q} \right)`;
  new Expect(multiMiddle).toParse();
  const nestedMiddle = r`\left( a^2 \middle| \left( b \middle/ c \right) \right)`;
  new Expect(nestedMiddle).toParse();
  const unmatchedMiddle = r`(\middle|\dfrac{x}{y})`;
  new Expect(unmatchedMiddle).toNotParse();
  new Expect(r`\left\langle \right\rangle`).toBuildLike(r`\left< \right>`);
  new Expect(r`\left\langle \right\rangle`).toBuildLike('\\left\u27e8 \\right\u27e9');
  new Expect(r`\left\lparen \right\rparen`).toBuildLike(r`\left( \right)`);

  assertion = "A begin/end parser should work"
  new Expect(r`\begin{matrix}a&b\\c&d\end{matrix}`).toParse();
  new Expect(r`\begin{array}{cc}a&b\\c&d\end{array}`).toParse();
  new Expect(r`\begin{aligned}\end{aligned}`).toBuild();
  new Expect(r`\begin{matrix}\hline a&b\\ \hline c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}\hdashline a&b\\ \hdashline c&d\end{matrix}`).toParse();
  new Expect(r`\hline`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d\end{pmatrix}`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d\right{pmatrix}`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d`).toNotParse();
  new Expect(r`{\begin{matrix}a&b\\c&d}\end{matrix}`).toNotParse();
  new Expect(r`\begin{matrix}0&1\over2&3\\4&5&6\end{matrix}`).toParse();
  const m1 = r`\begin{pmatrix}1&2\\3&4\end{pmatrix}`;
  const m2 = r`\\begin{array}{rl}${m1}&0\\\\0&${m1}\\end{array}`;
  new Expect(m2).toParse();
  new Expect(r`\begin{matrix}a&b\cr c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}a&b\\c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}a&b\cr[c]&d\end{matrix}`).toParse();
  const m3 = parse(r`\begin{matrix}a&b\\ c&d \\ \end{matrix}`)[0];
  new Expect(m3.body).toHaveLength(2);
  node = parse(r`\def\arraystretch{1.5}\begin{matrix}a&b\\c&d\end{matrix}`);
  new Expect(node).toMatchSnapshot(r`[{"type":"array","mode":"math","arraystretch":1.5,"body":[[{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"a"}]},{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"b"}]}],[{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"c"}]},{"type":"ordgroup","mode":"math","body":[{"type":"mathord","mode":"math","text":"d"}]}]],"cols":[{"type":"align","align":"c"},{"type":"align","align":"c"}],"rowGaps":[null],"hskipBeforeAndAfter":false,"hLinesBeforeRow":[[],[],[]],"style":"text","tags":[null,null]}]`);
  new Expect("\\begin{matrix*}[r] a & -1 \\\\ -1 & d \\end{matrix*}").toBuild();
  new Expect("\\begin{pmatrix*}[r] a & -1 \\\\ -1 & d \\end{pmatrix*}").toBuild();
  new Expect("\\begin{bmatrix*}[r] a & -1 \\\\ -1 & d \\end{bmatrix*}").toBuild();
  new Expect("\\begin{Bmatrix*}[r] a & -1 \\\\ -1 & d \\end{Bmatrix*}").toBuild();
  new Expect("\\begin{vmatrix*}[r] a & -1 \\\\ -1 & d \\end{vmatrix*}").toBuild();
  new Expect("\\begin{Vmatrix*}[r] a & -1 \\\\ -1 & d \\end{Vmatrix*}").toBuild();
  new Expect("\\begin{matrix*} a & -1 \\\\ -1 & d \\end{matrix*}").toBuild();
  new Expect("\\begin{matrix*}[] a & -1 \\\\ -1 & d \\end{matrix*}").toNotParse();

  assertion = "A sqrt parser should work"
  const sqrt = r`\sqrt{x}`;
  const missingGroup = r`\sqrt`;
  new Expect(sqrt).toParse();
  new Expect(missingGroup).toNotParse();
  new Expect(parse(sqrt)[0].type).toEqual("sqrt");
  new Expect("\\Large\\sqrt[3]{x}").toBuild();
  new Expect("\\sqrt\\foo").toParseLike("\\sqrt123", new Settings({ macros: { "\\foo": "123" } }));
  new Expect("\\sqrt[2]\\foo").toParseLike("\\sqrt[2]{123}", new Settings({ macros: { "\\foo": "123" } }));

  assertion = "A TeX-compliant parser should work"
  new Expect(r`\frac 2 3`).toParse();
  const missingGroups = [
    r`\frac{x}`,
    r`\textcolor{#fff}`,
    r`\rule{1em}`,
    r`\llap`,
    r`\bigl`,
    r`\text`
  ];
  for (let i = 0; i < missingGroups.length; i++) {
      new Expect(missingGroups[i]).toNotParse();
  }
  new Expect(r`x^`).toNotParse();
  new Expect(r`x_`).toNotParse();
  const badArguments = [
    r`\frac \frac x y z`,
    r`\frac x \frac y z`,
    r`\frac \sqrt x y`,
    r`\frac x \sqrt y`,
    r`\frac \mathllap x y`,
    r`\frac x \mathllap y`,
    // This actually doesn't work in real TeX, but it is suprisingly
    // hard to get this to correctly work. So, we take hit of very small
    // amounts of non-compatiblity in order for the rest of the tests to
    // work
    // r`\llap \frac x y`,
    r`\mathllap \mathllap x`,
    r`\sqrt \mathllap x`
  ];
  for (let i = 0; i < badArguments.length; i++) {
      new Expect(badArguments[i]).toNotParse();
  }
  const goodArguments = [
    r`\frac {\frac x y} z`,
    r`\frac x {\frac y z}`,
    r`\frac {\sqrt x} y`,
    r`\frac x {\sqrt y}`,
    r`\frac {\mathllap x} y`,
    r`\frac x {\mathllap y}`,
    r`\mathllap {\frac x y}`,
    r`\mathllap {\mathllap x}`,
    r`\sqrt {\mathllap x}`
  ];
  for (let i = 0; i < goodArguments.length; i++) {
      new Expect(goodArguments[i]).toParse();
  }
  const badSupSubscripts = [
    r`x^\sqrt x`,
    r`x^\mathllap x`,
    r`x_\sqrt x`,
    r`x_\mathllap x`
  ];
  for (let i = 0; i < badSupSubscripts.length; i++) {
      new Expect(badSupSubscripts[i]).toNotParse();
  }
  const goodSupSubscripts = [
    r`x^{\sqrt x}`,
    r`x^{\mathllap x}`,
    r`x_{\sqrt x}`,
    r`x_{\mathllap x}`
  ];
  for (let i = 0; i < goodSupSubscripts.length; i++) {
      new Expect(goodSupSubscripts[i]).toParse();
  }
  new Expect(r`x''''`).toParse();
  new Expect(r`x_2''`).toParse();
  new Expect(r`x''_2`).toParse();
  new Expect(r`\sqrt^23`).toNotParse();
  new Expect(r`\frac^234`).toNotParse();
  new Expect(r`\frac2^34`).toNotParse();
  new Expect(r`\sqrt2^3`).toParse();
  new Expect(r`\frac23^4`).toParse(strictSettings);
  new Expect(r`\sqrt \frac x y`).toParse();
  new Expect(r`\sqrt \text x`).toParse();
  new Expect(r`x^\frac x y`).toParse();
  new Expect(r`x_\text x`).toParse();
  const badLeftArguments = [
    r`\frac \left( x \right) y`,
    r`\frac x \left( y \right)`,
    r`\mathllap \left( x \right)`,
    r`\sqrt \left( x \right)`,
    r`x^\left( x \right)`
  ];
  for (let i = 0; i < badLeftArguments.length; i++) {
      new Expect(badLeftArguments[i]).toNotParse();
  }
  const goodLeftArguments = [
    r`\frac {\left( x \right)} y`,
    r`\frac x {\left( y \right)}`,
    r`\mathllap {\left( x \right)}`,
    r`\sqrt {\left( x \right)}`,
    r`x^{\left( x \right)}`
  ];
  for (let i = 0; i < goodLeftArguments.length; i++) {
      new Expect(goodLeftArguments[i]).toParse();
  }

  assertion = "An op symbol builder should build"
  new Expect("\\int_i^n").toBuild();
  new Expect("\\iint_i^n").toBuild();
  new Expect("\\iiint_i^n").toBuild();
  new Expect("\\int\nolimits_i^n").toBuild();
  new Expect("\\iint\nolimits_i^n").toBuild();
  new Expect("\\iiint\nolimits_i^n").toBuild();
  new Expect("\\oint_i^n").toBuild();
  new Expect("\\oiint_i^n").toBuild();
  new Expect("\\oiiint_i^n").toBuild();
  new Expect("\\oint\nolimits_i^n").toBuild();
  new Expect("\\oiint\nolimits_i^n").toBuild();
  new Expect("\\oiiint\nolimits_i^n").toBuild();

  assertion = "A style change parser should work"
  new Expect(r`\displaystyle x`).toParse();
  new Expect(r`\textstyle x`).toParse();
  new Expect(r`\scriptstyle x`).toParse();
  new Expect(r`\scriptscriptstyle x`).toParse();
  const displayParse = parse(r`\displaystyle x`)[0];
  new Expect(displayParse.style).toEqual("display");
  const scriptscriptParse = parse(r`\scriptscriptstyle x`)[0];
  new Expect(scriptscriptParse.style).toEqual("scriptscript");
  const text = r`a b { c d \displaystyle e f } g h`;
  const displayNode = parse(text)[2].body[2];
  new Expect(displayNode.type).toEqual("styling");
  const displayBody = displayNode.body;
  new Expect(displayBody).toHaveLength(2);
  new Expect(displayBody[0].text).toEqual("e");

  assertion = "A font parser should work"
  new Expect(r`\mathrm x`).toParse();
  new Expect(r`\mathbb x`).toParse();
  new Expect(r`\mathit x`).toParse();
  new Expect(r`\mathnormal x`).toParse();
  new Expect(r`\mathrm {x + 1}`).toParse();
  new Expect(r`\mathbb {x + 1}`).toParse();
  new Expect(r`\mathit {x + 1}`).toParse();
  new Expect(r`\mathnormal {x + 1}`).toParse();
  new Expect(r`\mathcal{ABC123}`).toParse();
  new Expect(r`\mathfrak{abcABC123}`).toParse();
  const mathbbParse = parse(r`\mathbb x`)[0];
  new Expect(mathbbParse.font).toEqual("mathbb");
  new Expect(mathbbParse.type).toEqual("font");
  const mathrmParse = parse(r`\mathrm x`)[0];
  new Expect(mathrmParse.font).toEqual("mathrm");
  new Expect(mathrmParse.type).toEqual("font");
  const mathitParse = parse(r`\mathit x`)[0];
  new Expect(mathitParse.font).toEqual("mathit");
  new Expect(mathitParse.type).toEqual("font");
  const mathnormalParse = parse(r`\mathnormal x`)[0];
  new Expect(mathnormalParse.font).toEqual("mathnormal");
  new Expect(mathnormalParse.type).toEqual("font");
  const mathcalParse = parse(r`\mathcal C`)[0];
  new Expect(mathcalParse.font).toEqual("mathcal");
  new Expect(mathcalParse.type).toEqual("font");
  const mathfrakParse = parse(r`\mathfrak C`)[0];
  new Expect(mathfrakParse.font).toEqual("mathfrak");
  new Expect(mathfrakParse.type).toEqual("font");
  const nestedParse = parse(r`\mathbb{R \neq \mathrm{R}}`)[0];
  new Expect(nestedParse.font).toEqual("mathbb");
  new Expect(nestedParse.type).toEqual("font");
  const bbBody = nestedParse.body.body;
  new Expect(bbBody).toHaveLength(3);
  new Expect(bbBody[0].type).toEqual("mathord");
  new Expect(bbBody[2].type).toEqual("font");
  new Expect(bbBody[2].font).toEqual("mathrm");
  new Expect(bbBody[2].type).toEqual("font");
  const colorMathbbParse = parse(r`\textcolor{blue}{\mathbb R}`)[0];
  new Expect(colorMathbbParse.type).toEqual("color");
  new Expect(colorMathbbParse.color).toEqual("blue");
  const cbody = colorMathbbParse.body;
  new Expect(cbody).toHaveLength(1);
  new Expect(cbody[0].type).toEqual("font");
  new Expect(cbody[0].font).toEqual("mathbb");
  const bf = parse(r`\mathbf{a\mathrm{b}c}`)[0];
  new Expect(bf.type).toEqual("font");
  new Expect(bf.font).toEqual("mathbf");
  new Expect(bf.body.body).toHaveLength(3);
  new Expect(bf.body.body[0].text).toEqual("a");
  new Expect(bf.body.body[1].type).toEqual("font");
  new Expect(bf.body.body[1].font).toEqual("mathrm");
  new Expect(bf.body.body[2].text).toEqual("c");
  new Expect(r`e^\mathbf{x}`).toParse();
  const built = build(r`a\boldsymbol{}b\boldsymbol{=}c\boldsymbol{+}d\boldsymbol{++}e\boldsymbol{xyz}f`);
  new Expect(built).toMatchSnapshot('[{"type":"mi","attributes":{},"children":[{"text":"a"}],"classes":[],"isSVG":false},{"type":"mrow","attributes":{},"children":[],"classes":[],"isSVG":false},{"type":"mi","attributes":{},"children":[{"text":"b"}],"classes":[],"isSVG":false},{"type":"mo","attributes":{"stretchy":"false","lspace":"0em","rspace":"0em","mathvariant":"italic"},"children":[{"text":"="}],"classes":[],"isSVG":false},{"type":"mi","attributes":{},"children":[{"text":"c"}],"classes":[],"isSVG":false},{"type":"mo","attributes":{"mathvariant":"italic","lspace":"0.22em","rspace":"0.22em"},"children":[{"text":"+"}],"classes":[],"isSVG":false},{"type":"mi","attributes":{},"children":[{"text":"d"}],"classes":[],"isSVG":false},{"type":"mo","attributes":{"lspace":"0.22em","rspace":"0.22em"},"children":[{"type":"mrow","attributes":{},"children":[{"type":"mo","attributes":{"mathvariant":"bold-italic"},"children":[{"text":"+"}],"classes":[],"isSVG":false},{"type":"mo","attributes":{"mathvariant":"bold-italic"},"children":[{"text":"+"}],"classes":[],"isSVG":false}],"classes":[],"isSVG":false}],"classes":[],"isSVG":false},{"type":"mi","attributes":{},"children":[{"text":"e"}],"classes":[],"isSVG":false},{"type":"mi","attributes":{"mathvariant":"bold-italic"},"children":[{"text":"x"},{"text":"y"},{"text":"z"}],"classes":[],"isSVG":false},{"type":"mi","attributes":{},"children":[{"text":"f"}],"classes":[],"isSVG":false}]');
  new Expect(r`\rm xyz`).toParseLike(r`\mathrm{xyz}`);
  new Expect(r`\sf xyz`).toParseLike(r`\mathsf{xyz}`);
  new Expect(r`\tt xyz`).toParseLike(r`\mathtt{xyz}`);
  new Expect(r`\bf xyz`).toParseLike(r`\mathbf{xyz}`);
  new Expect(r`\it xyz`).toParseLike(r`\mathit{xyz}`);
  new Expect(r`\cal xyz`).toParseLike(r`\mathcal{xyz}`);

  assertion = "A \\pmb builder should work"
  new Expect("\\pmb{\\mu}").toBuild();
  new Expect("\\pmb{=}").toBuild();
  new Expect("\\pmb{+}").toBuild();
  new Expect("\\pmb{\\frac{x^2}{x_1}}").toBuild();
  new Expect("\\pmb{}").toBuild();
  new Expect("\\def\\x{1}\\pmb{\\x\\def\\x{2}}").toParseLike("\\pmb{1}");

  assertion = "A raise parser should work"
  new Expect("\\raisebox{5pt}{text}").toBuild(strictSettings);
  new Expect("\\raisebox{-5pt}{text}").toBuild(strictSettings);
  new Expect("\\vcenter{\\frac a b}").toBuild();
  new Expect("\\raisebox{5pt}{\\frac a b}").toNotParse();
  new Expect("\\raisebox{-5pt}{\\frac a b}").toNotParse();
  new Expect("\\hbox{\\frac a b}").toNotParse();
  new Expect("\\raisebox5pt{text}").toNotBuild();
  new Expect("\\raisebox5pt{text}").toNotBuild(strictSettings);
  new Expect("\\raisebox-5pt{text}").toNotBuild(strictSettings);
  new Expect("a + \\vcenter{\\hbox{$\\frac{\\frac a b}c$}}").toBuild(strictSettings);

  assertion = "A comment parser should work"
  new Expect("a^2 + b^2 = c^2 % Pythagoras' Theorem\n").toParse();
  new Expect("% comment\n").toParse();
  new Expect("% comment 1\n% comment 2\n").toParse();
  new Expect("x_3 %comment\n^2").toParseLike(`x_3^2`);
  new Expect("x^ %comment\n{2}").toParseLike(`x^{2}`);
  new Expect("x^ %comment\n\\frac{1}{2}").toParseLike(r`x^\frac{1}{2}`);
  new Expect("\\kern{1 %kern\nem}").toParse();
  new Expect("\\kern1 %kern\nem").toParse();
  new Expect("\\color{#f00%red\n}").toParse();
  new Expect("%comment\n{2}").toParseLike(`{2}`);
  new Expect("\\begin{matrix}a&b\\\\ %hline\n" +
    "\\hline %hline\n" +
    "\\hline c&d\\end{matrix}").toParse();
  new Expect("\\def\\foo{a %}\nb}\n\\foo").toParseLike(`ab`);
  new Expect("\\def\\foo{1\n2}\nx %\\foo\n").toParseLike(`x`);
  new Expect(`x%y`).toNotParse(strictSettings);
  new Expect(`x%y`).toParse();
  new Expect("\\text{hello% comment 1\nworld}").toParseLike(r`\text{helloworld}`);
  new Expect("\\text{hello% comment\n\nworld}").toParseLike(r`\text{hello world}`);
  new Expect("5 % comment\n").toParseLike(`5`);

  assertion = "A font tree-builder should work"
  let markup = temml.renderToString(r`\mathbb{R}`);
  new Expect(markup).toContain('<mi mathvariant="double-struck">R</mi>');
  markup = temml.renderToString(r`\mathrm{R}`);
  new Expect(markup).toContain('<mi mathvariant="normal">R</mi>');
  markup = temml.renderToString(r`\mathcal{R}`);
  new Expect(markup).toContain('<mrow><mi mathvariant="script">R</mi>');
  markup = temml.renderToString(r`\mathfrak{R}`);
  new Expect(markup).toContain('<mi mathvariant="fraktur">R</mi>');
  markup = temml.renderToString(r`\text{R}`);
  new Expect(markup).toContain('<mtext>R</mtext>');
  markup = temml.renderToString(r`\textit{R}`);
  new Expect(markup).toContain('<mtext mathvariant="italic">R</mtext>');
  markup = temml.renderToString(r`\text{\textit{R}}`);
  new Expect(markup).toContain('<mtext mathvariant="italic">R</mtext>');
  let markup1 = temml.renderToString(r`\textup{R}`);
  new Expect(markup1).toContain('<mtext>R</mtext>');
  let markup2 = temml.renderToString(r`\textit{\textup{R}}`);
  new Expect(markup2).toContain('<mtext>R</mtext>');
  let markup3 = temml.renderToString(r`\textup{\textit{R}}`);
  new Expect(markup3).toContain('<mtext mathvariant="italic">R</mtext>');
  markup = temml.renderToString(r`\text{R\textit{S}T}`);
  new Expect(markup).toContain('<mtext>R</mtext><mtext mathvariant="italic">S</mtext><mtext>T</mtext>');
  markup = temml.renderToString(r`\textbf{R }`);
  new Expect(markup).toContain('<mrow><mtext mathvariant="bold">R</mtext><mtext> </mtext>');
  markup1 = temml.renderToString(r`\textmd{R}`);
  new Expect(markup1).toContain('<mtext>R</mtext>');
  markup2 = temml.renderToString(r`\textbf{\textmd{R}}`);
  new Expect(markup2).toContain('<mtext>R</mtext>');
  markup3 = temml.renderToString(r`\textmd{\textbf{R}}`);
  new Expect(markup3).toContain('<mtext mathvariant="bold">R</mtext>');
  markup = temml.renderToString(r`\textsf{R}`);
  new Expect(markup).toContain('<mtext mathvariant="sans-serif">R</mtext>');
  markup = temml.renderToString(r`\textsf{\textit{R}G\textbf{B}}`);
  new Expect(markup).toContain('<mtext mathvariant="sans-serif-italic">R</mtext>');
  new Expect(markup).toContain('<mtext mathvariant="sans-serif">G</mtext>');
  new Expect(markup).toContain('<mtext mathvariant="bold-sans-serif">B</mtext>');
  markup = temml.renderToString(r`\texttt{R}`);
  new Expect(markup).toContain('<mtext mathvariant="monospace">R</mtext>');
  assertion = "A font tree-builder should render a combination of font and color changes"
  markup = temml.renderToString(r`\textcolor{blue}{\mathbb R}`);
  new Expect(markup).toContain('<mstyle mathcolor="blue"><mi mathvariant="double-struck">R</mi></mstyle>');
  markup = temml.renderToString(r`\mathbb{\textcolor{blue}{R}}`);
  new Expect(markup).toContain('<mi mathvariant="double-struck" mathcolor="blue">R</mi>');
  assertion = "A font tree-builder should render wide characters with <mi> and with the correct font"
  markup = temml.renderToString("𝐀");
  new Expect(markup).toContain('<mi>𝐀</mi>');

  assertion = "A parser should throw an error when the expression is of the wrong type"
  new Expect([1, 2]).toNotParse()
  new Expect({ badInputType: "yes" }).toNotParse()
  new Expect(undefined).toNotParse()
  new Expect(null).toNotParse()
  new Expect(1.234).toNotParse()
  assertion = "A parser should work when the expression is of the correct type"
  new Expect(r`\sqrt{123}`).toParse()
  new Expect(new String(r`\sqrt{123}`)).toParse()

  assertion = "A font tree-builder should render the correct mathvariants"
  markup = temml.renderToString(r`Ax2k\omega\Omega\imath+`);
  new Expect(markup).toContain("<mi>A</mi>");
  new Expect(markup).toContain("<mi>x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi>ω</mi>");   // \omega
  new Expect(markup).toContain('<mi mathvariant="normal">Ω</mi>');   // \Omega
  new Expect(markup).toContain('<mi>ı</mi>');   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathbb{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"double-struck\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"double-struck\">x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"double-struck\">2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"double-struck\">ω</mi>");  // \omega
  new Expect(markup).toContain("<mi mathvariant=\"double-struck\">Ω</mi>"); // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"double-struck\">ı</mi>");  // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathrm{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"normal\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"normal\">x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"normal\">ω</mi>");   // \omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathit{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi>A</mi>");
  new Expect(markup).toContain("<mi>x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"italic\">2</mn>");
  new Expect(markup).toContain("<mi>ω</mi>");   // \omega
  new Expect(markup).toContain("<mi>Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi>ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathnormal{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi>A</mi>");
  new Expect(markup).toContain("<mi>x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi>ω</mi>");   // \omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi>ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathbf{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"bold\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"bold\">x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"bold\">2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"bold\">ω</mi>");   // \omega
  new Expect(markup).toContain("<mi mathvariant=\"bold\">Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"bold\">ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathcal{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"script\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"script\">x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"script\">2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"script\">ω</mi>"); // \omega
  new Expect(markup).toContain("<mi mathvariant=\"script\">Ω</mi>"); // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"script\">ı</mi>"); // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathfrak{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"fraktur\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"fraktur\">x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"fraktur\">2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"fraktur\">ω</mi>"); // \omega
  new Expect(markup).toContain("<mi mathvariant=\"fraktur\">Ω</mi>"); // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"fraktur\">ı</mi>"); // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathscr{A}`);
  new Expect(markup).toContain("<mi><span class=\"script\">A</span></mi>");
  markup = temml.renderToString(r`\mathsf{Ax2k\omega\Omega\imath+}`);
  new Expect(markup).toContain("<mi mathvariant=\"sans-serif\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"sans-serif\">x</mi>");
  new Expect(markup).toContain("<mn mathvariant=\"sans-serif\">2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"sans-serif\">ω</mi>"); // \omega
  new Expect(markup).toContain("<mi mathvariant=\"sans-serif\">Ω</mi>"); // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"sans-serif\">ı</mi>"); // \imath
  new Expect(markup).toContain("<mo>+</mo>");

  assertion = "A font tree-builder should render a combination of font and color changes"
  markup = temml.renderToString(r`\textcolor{blue}{\mathbb R}`);
  new Expect(markup).toContain('<mstyle mathcolor="blue"><mi mathvariant="double-struck">R</mi></mstyle>');
  // reverse the order of the commands
  markup = temml.renderToString(r`\mathbb{\textcolor{blue}{R}}`);
  new Expect(markup).toContain('<mi mathvariant="double-struck" mathcolor="blue">R</mi>');

  assertion = "A font tree-builder should render text as <mtext>"
  markup = temml.renderToString(r`\text{for }`);
  new Expect(markup).toContain("<mtext>for\u00a0</mtext>");

  assertion = "A font tree-builder should render math within text as side-by-side children"
  markup = temml.renderToString(r`\text{graph: $y = mx + b$}`);
  new Expect(markup).toContain("<mi>y</mi><mo stretchy=\"false\">=</mo><mi>m</mi><mi>x</mi><mo>+</mo><mi>b</mi>");

  assertion = "An includegraphics builder should work"
  const img = "\\includegraphics[height=0.9em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png}";
  new Expect(parse(img)[0].color).toEqual("#b22222");  // undefined
  const trustSettings = new Settings({ trust: true })
  new Expect(img, trustSettings).toParse();
  new Expect(img, trustSettings).toBuild();
  markup = temml.renderToString(img, trustSettings);
  new Expect(markup).toEqual(`<math xmlns="http://www.w3.org/1998/Math/MathML" data-tex="\\includegraphics[height=0.9em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png}" class ="temml"><mrow><mtext><img  src='https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png 'alt='KA logo'  style="height:0.9em;width:0.9em;"'/></mtext></mrow></math>`);

/*  assertion = "An HTML extension builder should work"
  const html = "\\htmlId{bar}{x}\\htmlClass{foo}{x}\\htmlStyle{color: red;}{x}\\htmlData{foo=a, bar=b}{x}";
  new Expect(html, trustSettings).toBuild();
  built = build(html, trustSettings);
  new Expect(built[0].attributes.id).toEqual("bar");
  new Expect(built[1].classes).toContain("foo");
  new Expect(built[2].attributes.style).toEqual("color: red");
  new Expect(built[3].attributes).toMatchSnapshot({ "data-bar": "b", "data-foo": "a" });
  built = build("\\htmlId{a}{x+}y", trustSettings);
  new Expect(built).toMatchSnapshot("");
  built = build(html, trustSettings);
  new Expect(built).toMatchSnapshot(""); */

  assertion = "A bin parser should work"
  new Expect(parse('x + y')[1].family).toEqual("bin")
  new Expect(parse('+ x')[0].family).toEqual("bin")
  new Expect(parse(r`x + + 2`)[3].type).toEqual("textord");
  new Expect(parse(r`( + 2`)[2].type).toEqual("textord");
  new Expect(parse(r`= + 2`)[2].type).toEqual("textord");
  new Expect(parse(r`\sin + 2`)[2].type).toEqual("textord");
  new Expect(parse(r`, + 2`)[2].type).toEqual("textord");
  new Expect(parse(r`\textcolor{blue}{x}+y`)[1].family).toEqual("bin");
  new Expect(parse(r`\textcolor{blue}{x+}+y`)[2].type).toEqual("mathord");

  assertion = "A phantom and smash parser should work"
  new Expect(parse(r`\hphantom{a}`)[0].type).toEqual("hphantom");
  new Expect(parse(r`a\hphantom{=}b`)[2].type).toEqual("mathord");
  new Expect(parse(r`\smash{a}`)[0].type).toEqual("smash");
  new Expect(parse(r`a\smash{+}b`)[2].type).toEqual("mathord");

  assertion = "A markup generator should work"
  // Just a few quick sanity checks here...
  markup = temml.renderToString(r`\sigma^2`);
  new Expect(markup.indexOf("<span")).toEqual(-1);
  new Expect(markup).toContain("\u03c3");  // sigma
  new Expect(markup).toContain("<math");

  assertion = "An accent parser should work"
  new Expect(r`\vec{x}`).toParse();
  new Expect(r`\vec{x^2}`).toParse();
  new Expect(r`\vec{x}^2`).toParse();
  new Expect(r`\vec x`).toParse();
  new Expect(parse(r`\vec x`)[0].type).toEqual("accent");
  new Expect(parse(r`\vec x^2`)[0].type).toEqual("supsub");
  new Expect(r`\widehat{x}`).toParse();
  new Expect(r`\widecheck{x}`).toParse();
  new Expect(r`\overrightarrow{x}`).toParse();

  assertion = "An accent builder should work"
  new Expect(r`\vec{x}`).toBuild();
  new Expect(r`\vec{x}^2`).toBuild();
  new Expect(r`\vec{x}_2`).toBuild();
  new Expect(r`\vec{x}_2^2`).toBuild();
  console.log(build(r`\vec x`))
  new Expect(build(r`\vec x`)[0].classes).toContain("mord");
  new Expect(build(r`\vec +`)[0].classes).toContain("mord");
  new Expect(build(r`\vec +`)[0].classes).not.toContain("mbin");
  new Expect(build(r`\vec )^2`)[0].classes).toContain("mord");
  new Expect(build(r`\vec )^2`)[0].classes).not.toContain("mclose");
  new Expect(r`\widehat{AB}`).toBuild();
  new Expect(r`\widecheck{AB}`).toBuild();
  new Expect(r`\widehat{AB}^2`).toBuild();
  new Expect(r`\widehat{AB}_2`).toBuild();
  new Expect(r`\widehat{AB}_2^2`).toBuild();
  new Expect(build(r`\widehat{AB}`)[0].classes).toContain("mord");
  new Expect(build(r`\widehat +`)[0].classes).toContain("mord");
  new Expect(build(r`\widehat +`)[0].classes).not.toContain("mbin");
  new Expect(build(r`\widehat )^2`)[0].classes).toContain("mord");
  new Expect(build(r`\widehat )^2`)[0].classes).not.toContain("mclose");
  new Expect(r`\overrightarrow{AB}`).toBuild();
  new Expect(r`\overrightarrow{AB}^2`).toBuild();
  new Expect(r`\overrightarrow{AB}_2`).toBuild();
  new Expect(r`\overrightarrow{AB}_2^2`).toBuild();
  new Expect(build(r`\overrightarrow{AB}`)[0].classes).toContain("mord");
  new Expect(build(r`\overrightarrow +`)[0].classes).toContain("mord");
  new Expect(build(r`\overrightarrow +`)[0].classes).not.toContain("mbin");
  new Expect(build(r`\overrightarrow )^2`)[0].classes).toContain("mord");
  new Expect(build(r`\overrightarrow )^2`)[0].classes).not.toContain("mclose");



  console.log("Number of tests:    " + numTests)
  console.log("Number of failures: " + numFailures)
}

test()
