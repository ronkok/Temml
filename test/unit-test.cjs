const temml = require("../utils/temml.cjs")

/*
 * Unit tests for Temml.
 * This file contains more than 1200 tests of various Temml functions.
 *
 * Sidenote:
 * Temml aims to minimize dependency hell by minimizing dependencies.
 * When Jest is installed, it adds several thousand files, so I don't use it.
 * Instead, I use this roll-your-own testing class.
 *
 * Many of the tests in this file have been ported from the Jest tests in KaTeX.
 */

// First, a few helpers.
const defaultSettings = _ => new Settings();
const strictSettings = _ => new Settings({ strict: true });
const displayMode = _ => new Settings({ displayMode: true });
const trustSettings = _ => new Settings({ trust: true });
const wrapSettings = str => new Settings({ wrap: str });
const mathTagRegEx = /<\/?math>/g;

// tagging literal
const r = x => x != null && Object.prototype.hasOwnProperty.call(x, 'raw') ? x.raw[0] : x;

class ParseError {
  constructor(message = "", token = {}) {
    this.message = message
    this.token = token
  }
}

const deflt = function(setting, defaultIfUndefined) {
  return setting === undefined ? defaultIfUndefined : setting;
}

class Settings {
  constructor(options) {
    // allow null options
    options = options || {};
    this.displayMode = deflt(options.displayMode, false);    // boolean
    this.annotate = deflt(options.annotate, false)           // boolean
    this.leqno = deflt(options.leqno, false);                // boolean
    this.errorColor = deflt(options.errorColor, "#b22222");  // string
    this.macros = options.macros || {};
    this.wrap = deflt(options.wrap, "tex")                    // "tex" | "="
    this.xml = deflt(options.xml, false);                     // boolean
    this.colorIsTextColor = deflt(options.colorIsTextColor, false);  // booelean
    this.strict = deflt(options.strict, false);    // boolean
    this.trust = deflt(options.trust, false);  // trust context. See html.js.
    this.maxSize = (options.maxSize === undefined
      ? [Infinity, Infinity]
      : Array.isArray(options.maxSize)
      ? options.maxSize
      : [Infinity, Infinity]
    )
    this.maxExpand = Math.max(0, deflt(options.maxExpand, 1000)); // number
  }

  isTrusted(context) {
    if (context.url && !context.protocol) {
      context.protocol = utils.protocolFromUrl(context.url);
    }
    const trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
    return Boolean(trust);
  }
}

// Strip positions from ParseNodes.
const stripPositions = expr => {
  if (typeof expr !== "object" || expr === null) { return expr }
  if (expr.loc && expr.loc.lexer && typeof expr.loc.start === "number") { delete expr.loc }
  Object.keys(expr).forEach(function(key) { stripPositions(expr[key]) });
  return expr;
};

const parse = (expr, settings = defaultSettings()) => {
  const tree = temml.__parse(expr, settings)
  return stripPositions(tree)
}

function build(expr, settings) {
  const builtMathML = temml.__renderToMathMLTree(expr, settings);
  if (builtMathML.classes.indexOf('temml-error') >= 0) { return builtMathML }
  return builtMathML.children;
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

    toBe(x) {
      numTests += 1
      if (this.input !== x) { say(this.input + " does not equal " + x) }
    }

    toNotBe(x) {
      numTests += 1
      if (this.input === x) { say(this.input + " equals " + x + "!") }
    }

    toMatch(regEx) {
      numTests += 1
      if (!regEx.test(this.input)) { say(this.input + " does not match the RegEx!") }
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

    toBeFalsy() {
      numTests += 1
      if (this.input) { say(this.input + " is truthy.") }
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

    toParse(settings = defaultSettings()) {
      numTests += 1
      let result = true
      try {
        const tree = parse(this.input, settings)
        if (tree instanceof ParseError) { result = false }
        if (tree.length === 1 && tree[0].color && tree[0].color === "#b22222") { result = false }
      } catch (e) {
        result = false
      }
      if (!result) { say(this.input + " does not parse.") }
    }

    toNotParse(settings = defaultSettings()) {
      numTests += 1
      let result = true
      try {
        const tree = parse(this.input, settings)
        if (tree instanceof ParseError) { result = false }
        if (tree.length === 1 && tree[0].color && tree[0].color === "#b22222") { result = false }
      } catch (e) {
        result = false
      }
      if (result) { say(this.input + " parses!") }
    }

    toParseLike(str, settings = defaultSettings()) {
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
      if (!result) {
        say(this.input + " does not parse like " + str)
      }
    }

    toBuild(settings = defaultSettings()) {
      numTests += 1
      let result = true
      try {
        const tree = build(this.input, settings)
        if (tree.classes && tree.classes[0] === "temml-error") { result = false }
      } catch (e) {
        result = false
        console.log(e)
      }
      if (!result) {
        say(this.input + " does not build.")
      }
    }

    toNotBuild(settings = defaultSettings()) {
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

    toBuildLike(str, settings = defaultSettings()) {
      numTests += 1
      let result = true
      try {
        const tree = build(this.input, settings)
        if (tree instanceof ParseError) { result = false }
        const comp = build(str, settings)
        if (comp instanceof ParseError) { result = false }
        result = JSON.stringify(tree) === JSON.stringify(comp)
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
  new Expect("1234|/@.`abcdefgzABCDEFGZ").toParse()

  assertion = "Parser should ignore whitespace"
  new Expect(`    x    y    `).toParseLike("xy")
  new Expect(`    x   ^ y    `).toParseLike("x^y")
  new Expect("\u00a0\ufe0e" + `x   ^ y    `).toParseLike("x^y")

  assertion = "Parser should build a list of ords"
  const ords = parse("1234|@.`abcdefgzABCDEFGZ");
  for (let i = 0; i < ords.length; i++) {
      new Expect(ords[i].type.slice(4)).toBe("ord");
  }

  assertion = "Parser should build a list of bins"
  let nodes = parse(r`+-*\cdot\pm\div`)
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toBe("atom");
    new Expect(nodes[i].family).toBe("bin");
  }

  assertion = "Parser should build a list of rels"
  nodes = parse(r`=<>\leq\geq\neq\nleq\ngeq\cong\in`)
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toBe("atom");
    new Expect(nodes[i].family).toBe("rel");
  }

  assertion = "Parser should parse a \\mathinner"
  new Expect(r`\mathinner{\langle{\psi}\rangle}`).toParse()
  new Expect(r`\frac 1 {\mathinner{\langle{\psi}\rangle}}`).toParse()
  assertion = "\\mathinner should return a group, not a fragment"
  new Expect(build(r`\mathinner{\langle{\psi}\rangle}`).length).toBe(1)

  assertion = "Parse should build a list of puncts"
  nodes = parse(",;")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toBe("atom");
    new Expect(nodes[i].family).toBe("punct");
  }

  assertion = "Parser should build a list of opens"
  nodes = parse("([")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toBe("atom");
    new Expect(nodes[i].family).toBe("open");
  }

  assertion = "Parser should build a list of closes"
  nodes = parse("])")
  for (let i = 0; i < nodes.length; i++) {
    new Expect(nodes[i].type).toBe("atom");
    new Expect(nodes[i].family).toBe("close");
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
  new Expect(node.type).toBe("supsub");
  new Expect(node.base).toBeDefined();
  new Expect(node.sup).toBeDefined();
  new Expect(node.sub).toBeUndefined();

  node = parse("x_3")[0]
  new Expect(node.type).toBe("supsub");
  new Expect(node.base).toBeDefined();
  new Expect(node.sub).toBeDefined();
  new Expect(node.sup).toBeUndefined();

  node = parse("x^2_3")[0]
  new Expect(node.type).toBe("supsub");
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

  assertion = "A row builder should work when given a document fragment"
  new Expect((build(`x^{\color{red}{hello}}`))[0].children.length).toBe(2)
  new Expect((build(`x^{\color{red}{hello}}`))[0].children[1].type).toBe("mrow")

  assertion = "A subscript and superscript tree-builder should not fail when there is no nucleus"
  new Expect(`^3`).toParse();
  new Expect(`_2`).toParse();
  new Expect(`^3_2`).toParse();
  new Expect(`_2^3`).toParse();
  new Expect(`^3`).toBuild();
  new Expect(`_2`).toBuild();
  new Expect(`^3_2`).toBuild();
  new Expect(`_2^3`).toBuild();

  assertion = "A subsup parser should work with Unicode (sub|super)script characters"
  new Expect(`A² + B²⁺³ + ²C + E₂³ + F₂₊₃`).toBuildLike("A^{2} + B^{2+3} + ^{2}C + E_{2}^{3} + F_{2+3}")
  new Expect(r`\text{B²⁺³}`).toParse()
  new Expect(r`\text{B²⁺³}`).toBuild()

  assertion = "A parser with limit controls should fail when the limit control is not preceded by an op node"
  new Expect(r`3\nolimits_2^2`).toNotParse();
  new Expect(r`\sqrt\limits_2^2`).toNotParse();
  new Expect(r`45 +\nolimits 45`).toNotParse();

  assertion = "A parser with limit controls should parse when the limit control directly follows an op node"
  new Expect(r`\int\limits_2^2 3`).toParse();
  new Expect(r`\sum\nolimits_3^4 4`).toParse();

  assertion = "A parser with limit controls should parse when the limit control is in the sup/sub area of an op node"
  new Expect(r`\int_2^2\limits`).toParse();
  new Expect(r`\int^2\nolimits_2`).toParse();
  new Expect(r`\int_2\limits^2`).toParse();

  assertion = "A parser with limit controls should allow multiple limit controls in the sup/sub area of an op node"
  new Expect(r`\int_2\nolimits^2\limits 3`).toParse();
  new Expect(r`\int\nolimits\limits_2^2`).toParse();
  new Expect(r`\int\limits\limits\limits_2^2`).toParse();

  assertion = "A parser with limit controls should have the rightmost limit control determine the limits property of the preceding op node"
  new Expect(parse(r`\int\nolimits\limits_2^2`)[0].base.limits).toBe(true)
  new Expect(parse(r`\int\limits_2\nolimits^2`)[0].base.limits).toBe(false)

  assertion = "A group parser should work"
  new Expect(`{xy}`).toParse();
  nodes = parse(`{xy}`)
  new Expect(nodes).toHaveLength(1);
  new Expect(nodes[0].type).toBe("ordgroup");
  new Expect(nodes[0].body).toBeTruthy();
  new Expect(r`\begingroup xy \endgroup`).toParse();
  new Expect(r`\begingroup xy`).toNotParse();
  new Expect(r`\begingroup xy }`).toNotParse();
  nodes = parse(r`\begingroup xy \endgroup`)
  new Expect(nodes).toHaveLength(1)
  new Expect(nodes[0].type).toBe("ordgroup");
  new Expect(nodes[0].body).toBeTruthy();
  new Expect(nodes[0].semisimple).toBeTruthy();

  assertion = "An implicit group parser should work"
  new Expect(r`\Large x`).toParse();
  new Expect(r`abc {abc \Large xyz} abc`).toParse();
  nodes = parse(r`\Large abc`)
  new Expect(nodes).toHaveLength(1);
  new Expect(nodes[0].type).toBe("sizing");
  new Expect(nodes[0].body).toBeTruthy();
  nodes = parse(r`a \Large abc`)
  new Expect(nodes).toHaveLength(2);
  new Expect(nodes[1].type).toBe("sizing");
  new Expect(nodes[1].body).toHaveLength(3);
  nodes = parse(r`a { b \Large c } d`)
  new Expect(nodes[1].body[1].type).toBe("sizing");
  new Expect(nodes[1].body[1].body).toHaveLength(1);

  assertion = "An implicit group parser should work within optional groups"
  new Expect(r`\sqrt[\small 3]{x}`).toParse();
  new Expect(r`\sqrt[\color{red} 3]{x}`).toParse()
  new Expect(r`\sqrt[\textstyle 3]{x}`).toParse()
  new Expect(r`\sqrt[\tt 3]{x}`).toParse()

  assertion = "A function parser should work"
  new Expect(r`\div`).toParse();
  new Expect(r`\blue x`).toParse();
  new Expect(r`\frac 1 2`).toParse();
  new Expect(r`\tilde`).toNotParse();
  new Expect(r`\frac`).toNotParse();
  new Expect(r`\frac 1`).toNotParse();
  new Expect(parse(r`\tildex`)[0].color).toBe("#b22222");
  new Expect(r`\frac12`).toParse();
  new Expect(r`\;x`).toParse();

  assertion = "A frac parser should work"
  const expression = r`\frac{x}{y}`;
  const dfracExpression = r`\dfrac{x}{y}`;
  const tfracExpression = r`\tfrac{x}{y}`;
  const cfracExpression = r`\cfrac{x}{y}`;
  const genfrac1 = r`\genfrac ( ] {0.06em}{0}{a}{b+c}`;
  const genfrac2 = r`\genfrac ( ] {0.8pt}{}{a}{b+c}`;
  new Expect(expression).toParse();
  node = parse(expression)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  new Expect(cfracExpression).toParse();
  new Expect(dfracExpression).toParse();
  new Expect(tfracExpression).toParse();
  new Expect(genfrac1).toParse();
  new Expect(genfrac2).toParse();
  const dfracParse = parse(dfracExpression)[0];
  new Expect(dfracParse.type).toBe("genfrac");
  new Expect(dfracParse.numer).toBeDefined();
  new Expect(dfracParse.denom).toBeDefined();
  const tfracParse = parse(tfracExpression)[0];
  new Expect(tfracParse.type).toBe("genfrac");
  new Expect(tfracParse.numer).toBeDefined();
  new Expect(tfracParse.denom).toBeDefined();
  const cfracParse = parse(cfracExpression)[0];
  new Expect(cfracParse.type).toBe("genfrac");
  new Expect(cfracParse.numer).toBeDefined();
  new Expect(cfracParse.denom).toBeDefined();
  const genfracParse = parse(genfrac1)[0];
  new Expect(genfracParse.type).toBe("genfrac");
  new Expect(genfracParse.numer).toBeDefined();
  new Expect(genfracParse.denom).toBeDefined();
  new Expect(genfracParse.leftDelim).toBeDefined();
  new Expect(genfracParse.rightDelim).toBeDefined();
  let badGenFrac = r`\genfrac ( ] {b+c}{0}{a}{b+c}`;
  new Expect(badGenFrac).toNotParse();
  badGenFrac = r`\genfrac ( ] {0.06em}{0}{a}`;
  new Expect(badGenFrac).toNotParse();
  node = parse(r`x \atop y`)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  new Expect(node.hasBarLine).toBe(false);

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
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();

  node = parse(complexOver)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();

  const parseBraceFrac = parse(braceFrac)[0];
  new Expect(parseBraceFrac.type).toBe("genfrac");
  new Expect(parseBraceFrac.numer).toBeDefined();
  new Expect(parseBraceFrac.denom).toBeDefined();
  new Expect(parseBraceFrac.leftDelim).toBeDefined();
  new Expect(parseBraceFrac.rightDelim).toBeDefined();

  const parseBrackFrac = parse(brackFrac)[0];
  new Expect(parseBrackFrac.type).toBe("genfrac");
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
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  const emptyDenominator = r`1 \over`;
  node = parse(emptyDenominator)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer).toBeDefined();
  new Expect(node.denom).toBeDefined();
  const displaystyleExpression = r`\displaystyle 1 \over 2`;
  node = parse(displaystyleExpression)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer.body[0].type).toBe("styling");
  new Expect(node.denom).toBeDefined();
  new Expect(r`\textstyle 1 \over 2`).toParseLike(r`\frac{\textstyle 1}{2}`);
  new Expect(r`{\textstyle 1} \over 2`).toParseLike(r`\frac{\textstyle 1}{2}`);
  const nestedOverExpression = r`{1 \over 2} \over 3`;
  node = parse(nestedOverExpression)[0];
  new Expect(node.type).toBe("genfrac");
  new Expect(node.numer.body[0].type).toBe("genfrac");
  new Expect(node.numer.body[0].numer.body[0].text).toBe("1");
  new Expect(node.numer.body[0].denom.body[0].text).toBe("2");
  new Expect(node.denom).toBeDefined();
  new Expect(node.denom.body[0].text).toBe("3");
  const badMultipleOvers = r`1 \over 2 + 3 \over 4`;
  new Expect(badMultipleOvers).toNotParse();
  const badOverChoose = r`1 \over 2 \choose 3`;
  new Expect(badOverChoose).toNotParse();

  assertion = `A genfrac builder should work`
  new Expect(r`\frac{x}{y}`).toParse();
  new Expect(r`\dfrac{x}{y}`).toParse();
  new Expect(r`\tfrac{x}{y}`).toParse();
  new Expect(r`\cfrac{x}{y}`).toParse();
  new Expect(r`\genfrac ( ] {0.06em}{0}{a}{b+c}`).toParse();
  new Expect(r`\genfrac ( ] {0.8pt}{}{a}{b+c}`).toParse();
  new Expect(r`\genfrac {} {} {0.8pt}{}{a}{b+c}`).toParse();
  new Expect(r`\genfrac [ {} {0.8pt}{}{a}{b+c}`).toParse();
  new Expect(r`\frac{x}{y}`).toBuild();
  new Expect(r`\dfrac{x}{y}`).toBuild();
  new Expect(r`\tfrac{x}{y}`).toBuild();
  new Expect(r`\cfrac{x}{y}`).toBuild();
  new Expect(r`\genfrac ( ] {0.06em}{0}{a}{b+c}`).toBuild();
  new Expect(r`\genfrac ( ] {0.8pt}{}{a}{b+c}`).toBuild();
  new Expect(r`\genfrac {} {} {0.8pt}{}{a}{b+c}`).toBuild();
  new Expect(r`\genfrac [ {} {0.8pt}{}{a}{b+c}`).toBuild();

  assertion = `A infix builder should not fail`
  new Expect(r`a \over b`).toParse();
  new Expect(r`a \atop b`).toParse();
  new Expect(r`a \choose b`).toParse();
  new Expect(r`a \brace b`).toParse();
  new Expect(r`a \brack b`).toParse();
  new Expect(r`a \over b`).toBuild();
  new Expect(r`a \atop b`).toBuild();
  new Expect(r`a \choose b`).toBuild();
  new Expect(r`a \brace b`).toBuild();
  new Expect(r`a \brack b`).toBuild();

  assertion = "A sizing parser should work"
  const sizeExpression = r`\Huge{x}\small{x}`;
  new Expect(sizeExpression).toParse();
  node = parse(sizeExpression)[0];
  new Expect(node.type).toBe("sizing");
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

  new Expect(node.type).toBe("text");
  new Expect(node.body).toBeDefined();

  new Expect(parse(textExpression)[0].body[0].type).toBe("textord");
  new Expect(badTextExpression).toNotParse();
  new Expect(badFunctionExpression).toNotParse();
  new Expect(noBraceTextExpression).toParse();
  new Expect(nestedTextExpression).toParse();
  node = parse(spaceTextExpression)[0];
  new Expect(node.body[0].type).toBe("spacing");
  new Expect(node.body[1].type).toBe("textord");
  new Expect(node.body[2].type).toBe("spacing");
  new Expect(node.body[3].type).toBe("spacing");
  new Expect(mathTokenAfterText).toParse();
  node = parse(leadingSpaceTextExpression)[0];
  // [m, o, o]
  new Expect(node.body).toHaveLength(3);
  new Expect(node.body.map(n => n.text).join("")).toBe("moo");
  new Expect(r`\text{graph: $y = mx + b$}`).toParse();
  new Expect(r`\text{graph: \(y = mx + b\)}`).toParse();
  new Expect(r`\text{hello $x + \text{world $y$} + z$}`).toParse();
  new Expect(r`\text{hello \(x + \text{world $y$} + z\)}`).toParse();
  new Expect(r`\text{hello $x + \text{world \(y\)} + z$}`).toParse();
  new Expect(r`\text{hello \(x + \text{world \(y\)} + z\)}`).toParse();
  new Expect(r`\(`).toNotParse();
  new Expect(r`\text{$\(x\)$}`).toNotParse();
  new Expect(r`$x$`).toNotParse();
  new Expect(r`\text{\($x$\)}`).toNotParse();
  new Expect(r`\)`).toNotParse();
  new Expect(r`\text{\)}`).toNotParse();
  new Expect(r`$`).toNotParse();
  new Expect(r`\text{$}`).toNotParse();
  new Expect(r`\text{$x\)}`).toNotParse();
  new Expect(r`\text{\(x$}`).toNotParse();
  new Expect(r`a b\, \; \! \: \> ~ \thinspace \medspace \quad \ `).toParse();
  new Expect(r`\enspace \thickspace \qquad \space \nobreakspace`).toParse();
  new Expect(r`a b\, \; \! \: \> ~ \thinspace \medspace \quad \ `).toBuild();
  new Expect(r`\enspace \thickspace \qquad \space \nobreakspace`).toBuild();
  new Expect(r`\text{\textellipsis !}`).toParseLike(r`\text{\textellipsis!}`);
  new Expect(r`\:_*`).toParse();
  new Expect(r`\:_*`).toBuild();
  // Check for duplication of text. Prevent reoccurence of issue #9.
  node = parse(r`\text{MMö}`)[0];
  new Expect(node.body[0].text).toBe("M")

  assertion = `A texvc builder should not fail`
  new Expect(r`\lang\N\darr\R\dArr\Z\Darr\alef\rang`).toParse();
  new Expect(r`\alefsym\uarr\Alpha\uArr\Beta\Uarr\Chi`).toParse();
  new Expect(r`\clubs\diamonds\hearts\spades\cnums\Complex`).toParse();
  new Expect(r`\Dagger\empty\harr\Epsilon\hArr\Eta\Harr\exist`).toParse();
  new Expect(r`\image\larr\infin\lArr\Iota\Larr\isin\Kappa`).toParse();
  new Expect(r`\Mu\lrarr\natnums\lrArr\Nu\Lrarr\Omicron`).toParse();
  new Expect(r`\real\rarr\plusmn\rArr\reals\Rarr\Reals\Rho`).toParse();
  new Expect(r`\text{\sect}\sdot\sub\sube\supe`).toParse();
  new Expect(r`\Tau\thetasym\weierp\Zeta`).toParse();
  new Expect(r`\lang\N\darr\R\dArr\Z\Darr\alef\rang`).toBuild();
  new Expect(r`\alefsym\uarr\Alpha\uArr\Beta\Uarr\Chi`).toBuild();
  new Expect(r`\clubs\diamonds\hearts\spades\cnums\Complex`).toBuild();
  new Expect(r`\Dagger\empty\harr\Epsilon\hArr\Eta\Harr\exist`).toBuild();
  new Expect(r`\image\larr\infin\lArr\Iota\Larr\isin\Kappa`).toBuild();
  new Expect(r`\Mu\lrarr\natnums\lrArr\Nu\Lrarr\Omicron`).toBuild();
  new Expect(r`\real\rarr\plusmn\rArr\reals\Rarr\Reals\Rho`).toBuild();
  new Expect(r`\text{\sect}\sdot\sub\sube\supe`).toBuild();
  new Expect(r`\Tau\thetasym\weierp\Zeta`).toBuild();

  assertion = "A tie parser should work"
  const mathTie = "a~b";
  const textTie = r`\text{a~ b}`;
  new Expect(mathTie).toParse();
  new Expect(textTie).toParse();
  new Expect(parse(mathTie)[1].type).toBe("spacing");
  node = parse(textTie)[0];
  new Expect(node.body[1].type).toBe("spacing");
  node = parse(textTie)[0];
  new Expect(node.body[2].type).toBe("spacing");

  assertion = "A delimiter sizing parser should work"
  const normalDelim = r`\bigl |`;
  const notDelim = r`\bigl x`;
  const bigDelim = r`\Biggr \langle`;
  new Expect(normalDelim).toParse();
  new Expect(bigDelim).toParse();
  new Expect(notDelim).toNotParse();
  node = parse(normalDelim)[0];
  new Expect(node.type).toBe("delimsizing");
  const leftParse = parse(normalDelim)[0];
  const rightParse = parse(bigDelim)[0];
  new Expect(leftParse.mclass).toBe("mopen");
  new Expect(rightParse.mclass).toBe("mclose");
  const smallParse = parse(normalDelim)[0];
  const bigParse = parse(bigDelim)[0];
  new Expect(smallParse.size).toBe(1);
  new Expect(bigParse.size).toBe(4);

  assertion = "An overline parser should work"
  const overline = r`\overline{x}`;
  new Expect(overline).toParse();
  node = parse(overline)[0];
  new Expect(node.type).toBe("enclose");

  assertion = "A lap parser should work"
  new Expect(r`\rlap{\,/}{=}`).toParse();
  new Expect(r`\mathrlap{\,/}{=}`).toParse();
  new Expect(r`{=}\llap{/\,}`).toParse();
  new Expect(r`{=}\mathllap{/\,}`).toParse();
  new Expect(r`\sum_{\clap{ABCDEFG}}`).toParse();
  new Expect(r`\sum_{\mathclap{ABCDEFG}}`).toParse();
  new Expect(r`\mathrlap{\frac{a}{b}}{=}`).toParse();
  new Expect(r`{=}\mathllap{\frac{a}{b}}`).toParse();
  new Expect(r`\sum_{\mathclap{\frac{a}{b}}}`).toParse();
  new Expect(r`\rlap{\frac{a}{b}}{=}`).toNotParse(strictSettings());
  new Expect(r`{=}\llap{\frac{a}{b}}`).toNotParse(strictSettings());
  new Expect(r`\sum_{\clap{\frac{a}{b}}}`).toNotParse(strictSettings());
  node = parse(r`\mathrlap{\,/}`)[0];
  new Expect(node.type).toBe("lap");

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
  new Expect(node.type).toBe("rule");
  let emParse = parse(emRule)[0];
  let exParse = parse(exRule)[0];
  new Expect(emParse.width.unit).toBe("em");
  new Expect(emParse.height.unit).toBe("em");
  new Expect(exParse.width.unit).toBe("ex");
  new Expect(exParse.height.unit).toBe("em");
  const hardNumberParse = parse(hardNumberRule)[0];
  new Expect(hardNumberParse.width.number).toBeCloseTo(1.24);
  new Expect(hardNumberParse.height.number).toBeCloseTo(2.45);
  node = parse(r`\rule{-1em}{- 0.2em}`)[0];
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
  new Expect(emParse.dimension.unit).toBe("em");
  new Expect(exParse.dimension.unit).toBe("ex");
  new Expect(muParse.dimension.unit).toBe("mu");
  new Expect(abParse.dimension.unit).toBe("em");
  new Expect(badUnitRule).toNotParse();
  new Expect(noNumberRule).toNotParse();
  node = parse(r`\kern{-1em}`)[0];
  new Expect(node.dimension.number).toBeCloseTo(-1);
  node = parse(r`\kern{+1em}`)[0];
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
  new Expect(emParse.dimension.unit).toBe("em");
  new Expect(exParse.dimension.unit).toBe("ex");
  new Expect(muParse.dimension.unit).toBe("mu");
  new Expect(abParse1.dimension.unit).toBe("mu");
  new Expect(abParse2.dimension.unit).toBe("mu");
  new Expect(abParse3.dimension.unit).toBe("mu");
  abParse1 = parse(abKern1);
  abParse2 = parse(abKern2);
  abParse3 = parse(abKern3);
  new Expect(abParse1).toHaveLength(3);
  new Expect(abParse1[0].text).toBe("a");
  new Expect(abParse1[2].text).toBe("b");
  new Expect(abParse2).toHaveLength(3);
  new Expect(abParse2[0].text).toBe("a");
  new Expect(abParse2[2].text).toBe("b");
  new Expect(abParse3).toHaveLength(3);
  new Expect(abParse3[0].text).toBe("a");
  new Expect(abParse3[2].text).toBe("b");
  new Expect(badUnitRule).toNotParse();
  new Expect(noNumberRule).toNotParse();
  node = parse(r`\kern-1em`)[0];
  new Expect(node.dimension.number).toBeCloseTo(-1);
  node = parse(r`\kern+1em`)[0];
  new Expect(node.dimension.number).toBeCloseTo(1);
  abKern = "a\\mkern\t-\r1  \n mu\nb";
  abParse = parse("a\\mkern\t-\r1  \n mu\nb");
  new Expect(abParse).toHaveLength(3);
  new Expect(abParse[0].text).toBe("a");
  new Expect(abParse[1].dimension.unit).toBe("mu");
  new Expect(abParse[2].text).toBe("b");

  assertion = "A left/right parser should work"
  const normalLeftRight = r`\left( \dfrac{x}{y} \right)`;
  const emptyRight = r`\left( \dfrac{x}{y} \right.`;
  new Expect(normalLeftRight).toParse();
  node = parse(normalLeftRight)[0];
  new Expect(node.type).toBe("leftright");
  new Expect(node.left).toBe("(");
  new Expect(node.right).toBe(")");
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
  new Expect(r`\left\langle \right\rangle`).toBuildLike("\\left\u27e8 \\right\u27e9");
  new Expect(r`\left\lparen \right\rparen`).toBuildLike(r`\left( \right)`);

  assertion = "A begin/end parser should work"
  new Expect(r`\begin{matrix}a&b\\c&d\end{matrix}`).toParse();
  new Expect(r`\begin{array}{cc}a&b\\c&d\end{array}`).toParse();
  new Expect(r`\begin{aligned}\end{aligned}`).toParse();
  new Expect(r`\begin{matrix}\hline a&b\\ \hline c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}\hdashline a&b\\ \hdashline c&d\end{matrix}`).toParse();
  new Expect(r`\hline`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d\end{pmatrix}`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d\right{pmatrix}`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\c&d`).toNotParse();
  new Expect(r`{\begin{matrix}a&b\\c&d}\end{matrix}`).toNotParse();
  new Expect(r`\begin{matrix}0&1\over2&3\\4&5&6\end{matrix}`).toParse();
  const m1 = `\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}`;
  const m2 = `\\begin{array}{rl}${m1}&0\\\\0&${m1}\\end{array}`;
  new Expect(m2).toParse();
  new Expect(r`\begin{matrix}a&b\cr c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}a&b\\c&d\end{matrix}`).toParse();
  new Expect(r`\begin{matrix}a&b\cr[c]&d\end{matrix}`).toParse();
  const m3 = parse(r`\begin{matrix}a&b\\ c&d \\ \end{matrix}`)[0];
  new Expect(m3.body).toHaveLength(2);
  new Expect(r`\begin{matrix*}[r] a & -1 \\ -1 & d \end{matrix*}`).toParse();
  new Expect(r`\begin{pmatrix*}[r] a & -1 \\ -1 & d \end{pmatrix*}`).toParse();
  new Expect(r`\begin{bmatrix*}[r] a & -1 \\ -1 & d \end{bmatrix*}`).toParse();
  new Expect(r`\begin{Bmatrix*}[r] a & -1 \\ -1 & d \end{Bmatrix*}`).toParse();
  new Expect(r`\begin{vmatrix*}[r] a & -1 \\ -1 & d \end{vmatrix*}`).toParse();
  new Expect(r`\begin{Vmatrix*}[r] a & -1 \\ -1 & d \end{Vmatrix*}`).toParse();
  new Expect(r`\begin{matrix*} a & -1 \\ -1 & d \end{matrix*}`).toParse();
  new Expect(r`\begin{matrix*}[r] a & -1 \\ -1 & d \end{matrix*}`).toBuild();
  new Expect(r`\begin{pmatrix*}[r] a & -1 \\ -1 & d \end{pmatrix*}`).toBuild();
  new Expect(r`\begin{bmatrix*}[r] a & -1 \\ -1 & d \end{bmatrix*}`).toBuild();
  new Expect(r`\begin{Bmatrix*}[r] a & -1 \\ -1 & d \end{Bmatrix*}`).toBuild();
  new Expect(r`\begin{vmatrix*}[r] a & -1 \\ -1 & d \end{vmatrix*}`).toBuild();
  new Expect(r`\begin{Vmatrix*}[r] a & -1 \\ -1 & d \end{Vmatrix*}`).toBuild();
  new Expect(r`\begin{matrix*} a & -1 \\ -1 & d \end{matrix*}`).toBuild();
  new Expect(r`\begin{matrix*}[] a & -1 \\ -1 & d \end{matrix*}`).toNotParse();
  new Expect(r`\begin{matrix}a&b\\ [c]&d\end{matrix}`).toParse()
  new Expect(r`a\\ [b]`).toParse()

  assertion = "A sqrt parser should work"
  const sqrt = r`\sqrt{x}`;
  const missingGroup = r`\sqrt`;
  new Expect(sqrt).toParse();
  new Expect(missingGroup).toNotParse();
  new Expect(parse(sqrt)[0].type).toBe("sqrt");
  new Expect("\\Large\\sqrt[3]{x}").toParse();
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
  new Expect(r`\frac23^4`).toParse();
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
  new Expect(r`\int_i^n`).toParse();
  new Expect(r`\iint_i^n`).toParse();
  new Expect(r`\iiint_i^n`).toParse();
  new Expect(r`\int\nolimits_i^n`).toParse();
  new Expect(r`\iint\nolimits_i^n`).toParse();
  new Expect(r`\iiint\nolimits_i^n`).toParse();
  new Expect(r`\oint_i^n`).toParse();
  new Expect(r`\oiint_i^n`).toParse();
  new Expect(r`\oiiint_i^n`).toParse();
  new Expect(r`\oint\nolimits_i^n`).toParse();
  new Expect(r`\oiint\nolimits_i^n`).toParse();
  new Expect(r`\oiiint\nolimits_i^n`).toParse();
  new Expect(r`\int_i^n`).toBuild();
  new Expect(r`\iint_i^n`).toBuild();
  new Expect(r`\iiint_i^n`).toBuild();
  new Expect(r`\int\nolimits_i^n`).toBuild();
  new Expect(r`\iint\nolimits_i^n`).toBuild();
  new Expect(r`\iiint\nolimits_i^n`).toBuild();
  new Expect(r`\oint_i^n`).toBuild();
  new Expect(r`\oiint_i^n`).toBuild();
  new Expect(r`\oiiint_i^n`).toBuild();
  new Expect(r`\oint\nolimits_i^n`).toBuild();
  new Expect(r`\oiint\nolimits_i^n`).toBuild();
  new Expect(r`\oiiint\nolimits_i^n`).toBuild();

  assertion = "A style change parser should work"
  new Expect(r`\displaystyle x`).toParse();
  new Expect(r`\textstyle x`).toParse();
  new Expect(r`\scriptstyle x`).toParse();
  new Expect(r`\scriptscriptstyle x`).toParse();
  const displayParse = parse(r`\displaystyle x`)[0];
  new Expect(displayParse.scriptLevel).toBe("display");
  const scriptscriptParse = parse(r`\scriptscriptstyle x`)[0];
  new Expect(scriptscriptParse.scriptLevel).toBe("scriptscript");
  const text = r`a b { c d \displaystyle e f } g h`;
  const displayNode = parse(text)[2].body[2];
  new Expect(displayNode.type).toBe("styling");
  const displayBody = displayNode.body;
  new Expect(displayBody).toHaveLength(2);
  new Expect(displayBody[0].text).toBe("e");

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
  new Expect(mathbbParse.font).toBe("mathbb");
  new Expect(mathbbParse.type).toBe("font");
  const mathrmParse = parse(r`\mathrm x`)[0];
  new Expect(mathrmParse.font).toBe("mathrm");
  new Expect(mathrmParse.type).toBe("font");
  const mathitParse = parse(r`\mathit x`)[0];
  new Expect(mathitParse.font).toBe("mathit");
  new Expect(mathitParse.type).toBe("font");
  const mathnormalParse = parse(r`\mathnormal x`)[0];
  new Expect(mathnormalParse.font).toBe("mathnormal");
  new Expect(mathnormalParse.type).toBe("font");
  const mathcalParse = parse(r`\mathcal C`)[0];
  new Expect(mathcalParse.font).toBe("mathcal");
  new Expect(mathcalParse.type).toBe("font");
  const mathfrakParse = parse(r`\mathfrak C`)[0];
  new Expect(mathfrakParse.font).toBe("mathfrak");
  new Expect(mathfrakParse.type).toBe("font");
  const nestedParse = parse(r`\mathbb{R \neq \mathrm{R}}`)[0];
  new Expect(nestedParse.font).toBe("mathbb");
  new Expect(nestedParse.type).toBe("font");
  const bbBody = nestedParse.body.body;
  new Expect(bbBody).toHaveLength(3);
  new Expect(bbBody[0].type).toBe("mathord");
  new Expect(bbBody[2].type).toBe("font");
  new Expect(bbBody[2].font).toBe("mathrm");
  new Expect(bbBody[2].type).toBe("font");
  const colorMathbbParse = parse(r`\textcolor{blue}{\mathbb R}`)[0];
  new Expect(colorMathbbParse.type).toBe("color");
  new Expect(colorMathbbParse.color).toBe("#0000FF");
  const cbody = colorMathbbParse.body;
  new Expect(cbody).toHaveLength(1);
  new Expect(cbody[0].type).toBe("font");
  new Expect(cbody[0].font).toBe("mathbb");
  const bf = parse(r`\mathbf{a\mathrm{b}c}`)[0];
  new Expect(bf.type).toBe("font");
  new Expect(bf.font).toBe("mathbf");
  new Expect(bf.body.body).toHaveLength(3);
  new Expect(bf.body.body[0].text).toBe("a");
  new Expect(bf.body.body[1].type).toBe("font");
  new Expect(bf.body.body[1].font).toBe("mathrm");
  new Expect(bf.body.body[2].text).toBe("c");
  new Expect(r`e^\mathbf{x}`).toParse();
  new Expect(r`\rm xyz`).toParseLike(r`\mathrm{xyz}`);
  new Expect(r`\sf xyz`).toParseLike(r`\mathsf{xyz}`);
  new Expect(r`\tt xyz`).toParseLike(r`\mathtt{xyz}`);
  new Expect(r`\bf xyz`).toParseLike(r`\mathbf{xyz}`);
  new Expect(r`\it xyz`).toParseLike(r`\mathit{xyz}`);
  new Expect(r`\cal xyz`).toParseLike(r`\mathcal{xyz}`);
  new Expect(r`\uptheta\varDelta`).toParse(strictSettings())
  new Expect(r`\uptheta\varDelta`).toBuild()

  assertion = "A \\pmb builder should work"
  new Expect(r`\pmb{\mu}`).toParse();
  new Expect(r`\pmb{=}`).toParse();
  new Expect(r`\pmb{+}`).toParse();
  new Expect(r`\pmb{\frac{x^2}{x_1}}`).toParse();
  new Expect(r`\pmb{}`).toParse();
  new Expect(r`\pmb{\mu}`).toBuild();
  new Expect(r`\pmb{=}`).toBuild();
  new Expect(r`\pmb{+}`).toBuild();
  new Expect(r`\pmb{\frac{x^2}{x_1}}`).toBuild();
  new Expect(r`\pmb{}`).toBuild();
  new Expect(r`\def\x{1}\pmb{\x\def\x{2}}`).toParseLike(r`\pmb{1}`);

  assertion = `A raise parser should work`
  new Expect(r`\raisebox{5pt}{text}`).toParse(strictSettings());
  new Expect(r`\raisebox{-5pt}{text}`).toParse(strictSettings());
  new Expect(r`\vcenter{\frac a b}`).toParse();
  new Expect(r`\raisebox{5pt}{text}`).toBuild(strictSettings());
  new Expect(r`\raisebox{-5pt}{text}`).toBuild(strictSettings());
  new Expect(r`\vcenter{\frac a b}`).toBuild();
  new Expect(r`\raisebox{5pt}{\frac a b}`).toNotParse();
  new Expect(r`\raisebox{-5pt}{\frac a b}`).toNotParse();
  new Expect(r`\hbox{\frac a b}`).toNotParse();
  new Expect(r`\raisebox5pt{text}`).toNotParse();
  new Expect(r`\raisebox5pt{text}`).toNotParse();
  new Expect(r`\raisebox-5pt{text}`).toNotParse();

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
  new Expect("\\begin{matrix}a&b\\\\ %hline\n\\hline %hline\n\\hline c&d\\end{matrix}").toParse();
  new Expect("\\def\\foo{a %}\nb}\n\\foo").toParseLike(`ab`);
  new Expect("\\def\\foo{1\n2}\nx %\\foo\n").toParseLike(`x`);
  new Expect(`x%y`).toNotParse(strictSettings());
  new Expect(`x%y`).toParse();
  new Expect("\\text{hello% comment 1\nworld}").toParseLike(r`\text{helloworld}`);
  new Expect("\\text{hello% comment\n\nworld}").toParseLike(r`\text{hello world}`);
  new Expect("5 % comment\n").toParseLike(`5`);

  assertion = "A font tree-builder should work"
  let markup = temml.renderToString(r`\mathbb{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mi>ℝ</mi>');
  markup = temml.renderToString(r`\mathrm{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mrow><mi mathvariant="normal">R</mi></mrow>');
  markup = temml.renderToString(r`\nabla`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mi mathvariant="normal">∇</mi>');
  markup = temml.renderToString(r`\mathcal{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mi class="mathcal">ℛ</mi>');
  markup = temml.renderToString(r`\mathfrak{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mi>ℜ</mi>');
  markup = temml.renderToString(r`\text{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>R</mtext>');
  markup = temml.renderToString(r`\textit{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>𝑅</mtext>');
  markup = temml.renderToString(r`\text{\textit{R}}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>𝑅</mtext>');
  let markup1 = temml.renderToString(r`\textup{R}`).replace(mathTagRegEx, "");
  new Expect(markup1).toBe('<mtext>R</mtext>');
  let markup2 = temml.renderToString(r`\textit{\textup{R}}`).replace(mathTagRegEx, "");
  new Expect(markup2).toBe('<mtext>R</mtext>');
  let markup3 = temml.renderToString(r`\textup{\textit{R}}`).replace(mathTagRegEx, "");
  new Expect(markup3).toBe('<mtext>𝑅</mtext>');
  markup = temml.renderToString(r`\text{R\textit{S}T}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>R𝑆T</mtext>');
  markup1 = temml.renderToString(r`\textmd{R}`).replace(mathTagRegEx, "");
  new Expect(markup1).toBe('<mtext>R</mtext>');
  markup2 = temml.renderToString(r`\textbf{\textmd{R}}`).replace(mathTagRegEx, "");
  new Expect(markup2).toBe('<mtext>R</mtext>');
  markup3 = temml.renderToString(r`\textmd{\textbf{R}}`).replace(mathTagRegEx, "");
  new Expect(markup3).toBe('<mtext>𝐑</mtext>');
  markup = temml.renderToString(r`\textsf{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>𝖱</mtext>');
  markup = temml.renderToString(r`\textsf{\textit{R}G\textbf{B}}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>𝘙𝖦𝗕</mtext>');
  markup = temml.renderToString(r`\texttt{R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mtext>𝚁</mtext>');
  assertion = "A font tree-builder should render a combination of font and color changes"
  markup = temml.renderToString(r`\textcolor{blue}{\mathbb R}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mrow><mi style="color:#0000FF;">ℝ</mi></mrow>');
  markup = temml.renderToString(r`\mathbb{\textcolor{blue}{R}}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mrow><mi style="color:#0000FF;">ℝ</mi></mrow>');
  assertion = "A font tree-builder should render wide characters with <mi> and with the correct font"
  markup = temml.renderToString("𝐀").replace(mathTagRegEx, "");
  new Expect(markup).toBe('<mi>𝐀</mi>');

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
  markup = temml.renderToString(r`Ax2k\omega\Omega\imath+`).replace(mathTagRegEx, "");
  new Expect(markup).toContain("<mi>A</mi>");
  new Expect(markup).toContain("<mi>x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi>ω</mi>");   // \omega
  new Expect(markup).toContain('<mi mathvariant="normal">Ω</mi>');   // \Omega
  new Expect(markup).toContain('<mi>ı</mi>');   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathbb{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe("<mrow><mi>𝔸</mi><mi>𝕩</mi><mn>𝟚</mn><mi>𝕜</mi><mi>ω</mi><mi>Ω</mi><mi>ı</mi><mo>+</mo></mrow>");
  markup = temml.renderToString(r`\mathrm{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toContain("<mi mathvariant=\"normal\">A</mi>");
  new Expect(markup).toContain("<mi mathvariant=\"normal\">x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi mathvariant=\"normal\">ω</mi>");   // \omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathit{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mrow><mi>A</mi><mi>x</mi><mstyle style="font-style:italic;font-family:Cambria, 'Times New Roman', serif;"><mn>2</mn></mstyle><mi>k</mi><mi>ω</mi><mi>Ω</mi><mi>ı</mi><mo>+</mo></mrow>`);
  markup = temml.renderToString(r`\mathnormal{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toContain("<mi>A</mi>");
  new Expect(markup).toContain("<mi>x</mi>");
  new Expect(markup).toContain("<mn>2</mn>");
  new Expect(markup).toContain("<mi>ω</mi>");   // \omega
  new Expect(markup).toContain("<mi mathvariant=\"normal\">Ω</mi>");   // \Omega
  new Expect(markup).toContain("<mi>ı</mi>");   // \imath
  new Expect(markup).toContain("<mo>+</mo>");
  markup = temml.renderToString(r`\mathbf{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mrow><mi>𝐀</mi><mi>𝐱</mi><mn>𝟐</mn><mi>𝐤</mi><mi>𝛚</mi><mi>𝛀</mi><mi>ı</mi><mo>+</mo></mrow>`);
  markup = temml.renderToString(r`\mathcal{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mrow><mi class="mathcal">𝒜</mi><mi class="mathcal">𝓍</mi><mn>2</mn><mi class="mathcal">𝓀</mi><mi class="mathcal">ω</mi><mi class="mathcal">Ω</mi><mi class="mathcal">ı</mi><mo>+</mo></mrow>`);
  markup = temml.renderToString(r`\mathfrak{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mrow><mi>𝔄</mi><mi>𝔵</mi><mn>2</mn><mi>𝔨</mi><mi>ω</mi><mi>Ω</mi><mi>ı</mi><mo>+</mo></mrow>`);
  markup = temml.renderToString(r`\mathscr{A}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mi class="mathscr">𝒜</mi>`);
  markup = temml.renderToString(r`\mathsf{Ax2k\omega\Omega\imath+}`).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mrow><mi>𝖠</mi><mi>𝗑</mi><mn>𝟤</mn><mi>𝗄</mi><mi>𝞈</mi><mi>𝝮</mi><mi>ı</mi><mo>+</mo></mrow>`);

  assertion = "A font tree-builder should render text as <mtext>"
  markup = temml.renderToString(r`\text{for }`);
  new Expect(markup).toContain("<mtext>for\u00a0</mtext>");

  assertion = "A font tree-builder should render math within text as side-by-side children"
  markup = temml.renderToString(r`\text{graph: $y = mx + b$}`);
  new Expect(markup).toContain("<mi>y</mi><mo>=</mo><mi>m</mi><mi>x</mi><mo>+</mo><mi>b</mi>");

  assertion = "An includegraphics builder should work"
  const img = "\\includegraphics[height=0.9em, totalheight=0.9em, width=0.9em, alt=KA logo]{https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png}";
  new Expect(img).toNotParse() // no trust
  new Expect(img, trustSettings()).toNotBuild();
  new Expect(img).toParse(trustSettings()) // no trust
  markup = temml.renderToString(img, trustSettings()).replace(mathTagRegEx, "");
  new Expect(markup).toBe(`<mtext><img src='https://cdn.kastatic.org/images/apple-touch-icon-57x57-precomposed.new.png' alt='KA logo' style="height:0.9em;width:0.9em;"/></mtext>`);

  assertion = "An HTML extension builder should work"
  const html = r`\id{bar}{x}\class{foo}{x}\style{color: red;}{x}\data{foo=a, bar=b}{x}`;
  new Expect(html).toParse(trustSettings());
  new Expect(html).toBuild(trustSettings());
  let built = build(html, trustSettings())[0].children[0].children;
  new Expect(built[0].attributes.id).toBe("bar");
  new Expect(built[1].classes).toContain("foo");
  new Expect(built[2].attributes.style).toBe("color: red;");

  assertion = "A bin parser should work"
  new Expect(parse('x + y')[1].family).toBe("bin")
  new Expect(parse('+ x')[0].family).toBe("bin")
  new Expect(parse(r`x + + 2`)[3].type).toBe("textord");
  new Expect(parse(r`( + 2`)[2].type).toBe("textord");
  new Expect(parse(r`= + 2`)[2].type).toBe("textord");
  new Expect(parse(r`\sin + 2`)[2].type).toBe("textord");
  new Expect(parse(r`, + 2`)[2].type).toBe("textord");
  new Expect(parse(r`\textcolor{blue}{x}+y`)[1].family).toBe("bin");
  new Expect(parse(r`\textcolor{blue}{x+}+y`)[2].type).toBe("mathord");

  assertion = "A phantom and smash parser should work"
  new Expect(parse(r`\hphantom{a}`)[0].type).toBe("hphantom");
  new Expect(parse(r`a\hphantom{=}b`)[2].type).toBe("mathord");
  new Expect(parse(r`\smash{a}`)[0].type).toBe("smash");
  new Expect(parse(r`a\smash{+}b`)[2].type).toBe("mathord");

  assertion = "A markup generator should work"
  // Just a few quick sanity checks here...
  markup = temml.renderToString(r`\sigma^2`);
  new Expect(markup.indexOf("<span")).toBe(-1);
  new Expect(markup).toContain("\u03c3");  // sigma
  new Expect(markup).toContain("<math");

  assertion = "An accent parser should work"
  new Expect(r`\vec{x}`).toParse();
  new Expect(r`\vec{x^2}`).toParse();
  new Expect(r`\vec{x}^2`).toParse();
  new Expect(r`\vec x`).toParse();
  new Expect(parse(r`\vec x`)[0].type).toBe("accent");
  new Expect(parse(r`\vec x^2`)[0].type).toBe("supsub");
  new Expect(r`\widehat{x}`).toParse();
  new Expect(r`\widecheck{x}`).toParse();
  new Expect(r`\overrightarrow{x}`).toParse();

  assertion = "An accent builder should work"
  new Expect(r`\vec{x}`).toParse();
  new Expect(r`\vec{x}^2`).toParse();
  new Expect(r`\vec{x}_2`).toParse();
  new Expect(r`\vec{x}_2^2`).toParse();
  new Expect(r`\vec{x}`).toBuild();
  new Expect(r`\vec{x}^2`).toBuild();
  new Expect(r`\vec{x}_2`).toBuild();
  new Expect(r`\vec{x}_2^2`).toBuild();
  new Expect(build(r`\vec x`)[0].type).toBe("mover");

  assertion = "An extensible arrow builder should work"
  new Expect(r`\xrightarrow{x}`).toParse()
  new Expect(r`\xrightarrow{x^2}`).toParse()
  new Expect(r`\xrightarrow{x}^2`).toParse()
  new Expect(r`\xrightarrow x`).toParse()
  new Expect(r`\xrightarrow[under]{over}`).toParse()
  new Expect(r`\xrightarrow{x}`).toBuild()
  new Expect(r`\xrightarrow{x^2}`).toBuild()
  new Expect(r`\xrightarrow{x}^2`).toBuild()
  new Expect(r`\xrightarrow x`).toBuild()
  new Expect(r`\xrightarrow[under]{over}`).toBuild()
  assertion = "An extensible arrow parser should be grouped more tightly than supsubs"
  new Expect(parse(r`\xrightarrow x^2`)[0].type).toBe("supsub")
  assertion = "An extensible arrow builder should produce munderover"
  new Expect(build(r`\xrightarrow [under]{over}`)[0].children[1].type).toBe("munderover")

  assertion = "A horizontal brace builder should work"
  new Expect(r`\overbrace{x}`).toParse()
  new Expect(r`\overbrace{x^2}`).toParse()
  new Expect(r`\overbrace{x}^2`).toParse()
  new Expect(r`\overbrace x`).toParse()
  new Expect(r`\underbrace{x}_2`).toParse()
  new Expect(r`\underbrace{x}_2^2`).toParse()
  new Expect(r`\overbrace{x}`).toBuild()
  new Expect(r`\overbrace{x^2}`).toBuild()
  new Expect(r`\overbrace{x}^2`).toBuild()
  new Expect(r`\overbrace x`).toBuild()
  new Expect(r`\underbrace{x}_2`).toBuild()
  new Expect(r`\underbrace{x}_2^2`).toBuild()
  assertion = "A horizontal brace parser should be grouped more tightly than supsubs"
  new Expect(parse(r`\overbrace x^2`)[0].type).toBe("supsub")
  assertion = "A horizontal brace builder should produce mover"
  new Expect(build(r`\overbrace x`)[0].type).toBe("mover")

  assertion = "A boxed builder should work"
  new Expect(r`\boxed{x}`).toParse()
  new Expect(r`\boxed{x^2}`).toParse()
  new Expect(r`\boxed{x}^2`).toParse()
  new Expect(r`\boxed x`).toParse()
  new Expect(r`\boxed{x}`).toBuild()
  new Expect(r`\boxed{x^2}`).toBuild()
  new Expect(r`\boxed{x}^2`).toBuild()
  new Expect(r`\boxed x`).toBuild()
  assertion = "A boxed parser should produce enclose"
  new Expect(parse(r`\boxed{x^2}`)[0].type).toBe("enclose")
  assertion = "A boxed builder should produce mrow"
  new Expect(build(r`\boxed{x^2}`)[0].type).toBe("mrow")

  assertion = "An fbox parser, unlike a boxed parser, should fail when given math"
  new Expect(r`\fbox{\frac a b}`).toNotParse(strictSettings())

  assertion = "A colorbox parser should not fail, given a text argument"
  new Expect(r`\colorbox{red}{a b}`).toParse()
  new Expect(r`\colorbox{red}{x}^2`).toParse()
  new Expect(r`\colorbox{red} x`).toParse()
  assertion = "A colorbox parser should fail, given math"
  new Expect(r`\colorbox{red}{\frac a b}`).toNotParse(strictSettings())
  assertion = "A colorbox parser should parse a color"
  new Expect(r`\colorbox{red}{a b}`).toParse()
  new Expect(r`\colorbox{Periwinkle}{a b}`).toParse()
  new Expect(r`\colorbox{#197}{a b}`).toParse()
  new Expect(r`\colorbox{#1a9b7c}{a b}`).toParse()
  new Expect(r`\colorbox{1a9b7c}{a b}`).toParse()
  assertion = "A colorbox parser should produce enclose"
  new Expect(parse(r`\colorbox{red}{a b}`)[0].type).toBe("enclose")

  assertion = "An fcolorbox parser should not fail, given a text argument"
  new Expect(r`\fcolorbox{red}{yellow}{a b}`).toParse()

  assertion = "\\color should work properly on right parens"
  new Expect(temml.renderToString(r`\color{red}\left(a\right)`)).toContain('form="postfix" style="color:#ff0000;"');

  assertion = "A strike-through builder should work"
  new Expect(r`\cancel{x}`).toParse()
  new Expect(r`\cancel{x^2}`).toParse()
  new Expect(r`\cancel{x}^2`).toParse()
  new Expect(r`\cancel x`).toParse()
  new Expect(r`\cancel{x}`).toBuild()
  new Expect(r`\cancel{x^2}`).toBuild()
  new Expect(r`\cancel{x}^2`).toBuild()
  new Expect(r`\cancel x`).toBuild()
  assertion = "A strike-through parser should produce enclose"
  new Expect(parse(r`\cancel{a b}`)[0].type).toBe("enclose")
  assertion = "A strike-through parser should be grouped more tightly than supsubs"
  new Expect(parse(r`\cancel x^2`)[0].type).toBe("supsub")

  assertion = "An actuarial angle parser should not fail in math mode"
  new Expect(r`a_{\angl{n}}`).toParse()
  assertion = "An actuarial angle parser should fail in text mode"
  new Expect(r`\text{a_{\angl{n}}}`).toNotParse()
  assertion = "An actuarial angle builder should work"
  new Expect(r`a_{\angl{n}}`).toParse()

  assertion = "A phase parser should not fail in math mode"
  new Expect(r`\phase{-78.2^\circ}`).toParse()
  assertion = "A phase parser should fail in text mode"
  new Expect(r`\text{\phase{-78.2^\circ}}`).toNotParse()
  assertion = "A phase builder should work"
  new Expect(r`\phase{-78.2^\circ}`).toParse()

  assertion = "A phantom builder should work"
  new Expect(r`\phantom{x}`).toParse()
  new Expect(r`\phantom{x^2}`).toParse()
  new Expect(r`\phantom{x}^2`).toParse()
  new Expect(r`\phantom x`).toParse()
  new Expect(r`\hphantom{x}`).toParse()
  new Expect(r`\hphantom{x^2}`).toParse()
  new Expect(r`\hphantom{x}^2`).toParse()
  new Expect(r`\hphantom x`).toParse()
  new Expect(r`\phantom{x}`).toBuild()
  new Expect(r`\phantom{x^2}`).toBuild()
  new Expect(r`\phantom{x}^2`).toBuild()
  new Expect(r`\phantom x`).toBuild()
  new Expect(r`\hphantom{x}`).toBuild()
  new Expect(r`\hphantom{x^2}`).toBuild()
  new Expect(r`\hphantom{x}^2`).toBuild()
  new Expect(r`\hphantom x`).toBuild()
  assertion = "A phantom parser should produce phantom"
  new Expect(parse(r`\phantom{x^2}`)[0].type).toBe("phantom")
 
  assertion = "A smash builder should work"
  new Expect(r`\smash{x}`).toParse()
  new Expect(r`\smash{x^2}`).toParse()
  new Expect(r`\smash{x}^2`).toParse()
  new Expect(r`\smash x`).toParse()
  new Expect(r`\smash[b]{x}`).toParse()
  new Expect(r`\smash[b]{x^2}`).toParse()
  new Expect(r`\smash[b]{x}^2`).toParse()
  new Expect(r`\smash[b] x`).toParse()
  new Expect(r`\smash[]{x}`).toParse()
  new Expect(r`\smash[]{x^2}`).toParse()
  new Expect(r`\smash[]{x}^2`).toParse()
  new Expect(r`\smash[] x`).toParse()
  new Expect(r`\smash{x}`).toBuild()
  new Expect(r`\smash{x^2}`).toBuild()
  new Expect(r`\smash{x}^2`).toBuild()
  new Expect(r`\smash x`).toBuild()
  new Expect(r`\smash[b]{x}`).toBuild()
  new Expect(r`\smash[b]{x^2}`).toBuild()
  new Expect(r`\smash[b]{x}^2`).toBuild()
  new Expect(r`\smash[b] x`).toBuild()
  new Expect(r`\smash[]{x}`).toBuild()
  new Expect(r`\smash[]{x^2}`).toBuild()
  new Expect(r`\smash[]{x}^2`).toBuild()
  new Expect(r`\smash[] x`).toBuild()
  assertion = "A smash parser should produce smash"
  new Expect(parse(r`\smash{x^2}`)[0].type).toBe("smash")
 
  assertion = "A parser error should report the position of an error"
  new Expect(temml.renderToString(r`\sqrt`)).toContain("end")

  assertion = "An optional argument parser should not fail"
  new Expect(r`\frac[1]{2}{3}`).toParse()
  new Expect(r`\rule[0.2em]{1em}{1em}`).toParse()
  new Expect(r`\sqrt[3]{2}`).toParse()
  assertion = "An optional argument parser should work when the optional argument is missing"
  new Expect(r`\sqrt{2}`).toParse()
  new Expect(r`\rule{1em}{2em}`).toParse()
  assertion = "An optional argument parser should fail when the optional argument is mal-formed"
  new Expect(r`\rule[1]{2em}{3em}`).toNotParse()
  new Expect(r`\sqrt[`).toNotParse()

  assertion = "An array environment should accept a single alignment character"
  node = parse(r`\begin{array}r1\\20\end{array}`)[0]
  new Expect(node.type).toBe("array")
  new Expect(node.cols[0].align).toBe("r")

  assertion = "An array environment should accept vertical separators"
  node = parse(r`\begin{array}{|l||c:r::}\end{array}`)[0]
  new Expect(node.type).toBe("array")
  new Expect(node.cols[0].separator).toBe("|")
  new Expect(node.cols[1].align).toBe("l")
  new Expect(node.cols[5].separator).toBe(":")
  
  assertion = "An sub-array environment should accept only a single alignment character"
  node = parse(r`\begin{subarray}{c}a \\ b\end{subarray}`)[0]
  new Expect(node.type).toBe("array")
  new Expect(node.cols[0].align).toBe("c")
  new Expect(r`\begin{subarray}{cc}a \\ b\end{subarray}`).toNotParse()

  assertion = "A substack function should build"
  new Expect(r`\sum_{\substack{ 0<i<m \\ 0<j<n }}  P(i,j)`).toParse()
  new Expect(r`\sum_{\substack{ 0<i<m \\ 0<j<n }}  P(i,j)`).toBuild()
  assertion = "A substack function should accept spaces in the argument"
  new Expect(r`\sum_{\substack{ 0<i<m \\ 0<j<n }}  P(i,j)`).toParse()
  new Expect(r`\sum_{\substack{ 0<i<m \\ 0<j<n }}  P(i,j)`).toBuild()
  assertion = "A substack function should accept an empty argument"
  new Expect(r`\sum_{\substack{}}  P(i,j)`).toParse()
  new Expect(r`\sum_{\substack{}}  P(i,j)`).toBuild()

  assertion = "A smallmatrix environment should build"
  new Expect(r`\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}`).toParse()
  new Expect(r`\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}`).toBuild()

  assertion = "A cases environment should build"
  new Expect(r`f(a,b)=\begin{cases}a+1&\text{if }b\text{ is odd}\\a&\text{if }b=0\\a-1&\text{otherwise}\end{cases}`).toParse()
  new Expect(r`f(a,b)=\begin{cases}a+1&\text{if }b\text{ is odd}\\a&\text{if }b=0\\a-1&\text{otherwise}\end{cases}`).toBuild()

  assertion = "An rcases environment should build"
  new Expect(r`\begin{rcases} a &\text{if } b \\ c &\text{if } d \end{rcases}⇒…`).toParse()
  new Expect(r`\begin{rcases} a &\text{if } b \\ c &\text{if } d \end{rcases}⇒…`).toBuild()

  assertion = "An aligned environment should build"
  new Expect(r`\begin{aligned}a&=b&c&=d\\e&=f\end{aligned}`).toParse()
  new Expect(r`\begin{aligned}a&=b&c&=d\\e&=f\end{aligned}`).toBuild()
  assertion = "An aligned environment should allow cells in brackets"
  new Expect(r`\begin{aligned}[a]&[b]\\ [c]&[d]\end{aligned}`).toParse()
  new Expect(r`\begin{aligned}[a]&[b]\\ [c]&[d]\end{aligned}`).toBuild()
  assertion = "An aligned environment should forbid cells in brackets without space"
  new Expect(r`\begin{aligned}[a]&[b]\\[c]&[d]\end{aligned}`).toNotParse()
  assertion = "An aligned environment should not eat the last row when its first cell is empty"
  new Expect(parse(r`\begin{aligned}&E_1 & (1)\\&E_2 & (2)\\&E_3 & (3)\end{aligned}`)[0].body).toHaveLength(3)

  assertion = "AMS environments should fail outside of display mode"
  new Expect(r`\begin{gather}a+b\\c+d\end{gather}`).toNotParse()
  new Expect(r`\begin{gather*}a+b\\c+d\end{gather*}`).toNotParse()
  new Expect(r`\begin{align}a&=b+c\\d+e&=f\end{align}`).toNotParse()
  new Expect(r`\begin{align*}a&=b+c\\d+e&=f\end{align*}`).toNotParse()
  new Expect(r`\begin{alignat}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat}`).toNotParse()
  new Expect(r`\begin{alignat*}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat*}`).toNotParse()
  new Expect(r`\begin{equation}a=b+c\end{equation}`).toNotParse()
  new Expect(r`\begin{split}a &=b+c\\&=e+f\end{split}`).toNotParse()

  assertion = "AMS environments should work in display mode"
  new Expect(r`\begin{gather}a+b\\c+d\end{gather}`).toParse(displayMode())
  new Expect(r`\begin{gather*}a+b\\c+d\end{gather*}`).toParse(displayMode())
  new Expect(r`\begin{align}a&=b+c\\d+e&=f\end{align}`).toParse(displayMode())
  new Expect(r`\begin{align*}a&=b+c\\d+e&=f\end{align*}`).toParse(displayMode())
  new Expect(r`\begin{alignat}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat}`).toParse(displayMode())
  new Expect(r`\begin{alignat*}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat*}`).toParse(displayMode())
  new Expect(r`\begin{equation}a=b+c\end{equation}`).toParse(displayMode())
  new Expect(r`\begin{split}a &=b+c\\&=e+f\end{split}`).toParse(displayMode())
  new Expect(r`\begin{gather}a+b\\c+d\end{gather}`).toBuild(displayMode())
  new Expect(r`\begin{gather*}a+b\\c+d\end{gather*}`).toBuild(displayMode())
  new Expect(r`\begin{align}a&=b+c\\d+e&=f\end{align}`).toBuild(displayMode())
  new Expect(r`\begin{align*}a&=b+c\\d+e&=f\end{align*}`).toBuild(displayMode())
  new Expect(r`\begin{alignat}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat}`).toBuild(displayMode())
  new Expect(r`\begin{alignat*}{2}10&x+ &3&y = 2\\3&x+&13&y = 4\end{alignat*}`).toBuild(displayMode())
  new Expect(r`\begin{equation}a=b+c\end{equation}`).toBuild(displayMode())
  new Expect(r`\begin{split}a &=b+c\\&=e+f\end{split}`).toBuild(displayMode())

  assertion = "{equation} should fail if argument contains two columns."
  new Expect(r`\\begin{equation}a &=b+c\end{equation}`).toNotParse(displayMode())
  assertion = "{split} should fail if argument contains three columns."
  new Expect(r`\begin{equation}\begin{split}a &=b &+c\\&=e &+f\end{split}\end{equation}`).toNotParse(displayMode())
  assertion = "{array} should fail if body contains more columns than specification."
  new Expect(r`\begin{array}{2}a & b & c\\d & e  f\end{array}`).toNotParse(displayMode())

  assertion = "operatorname should work"
  new Expect(r`\operatorname{x*Π∑\Pi\sum\frac a b}`).toParse()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}`).toParse()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}_2`).toParse()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}\limits_2`).toParse()
  new Expect(r`\operatorname{x*Π∑\Pi\sum\frac a b}`).toBuild()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}`).toBuild()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}_2`).toBuild()
  new Expect(r`\operatorname*{x*Π∑\Pi\sum\frac a b}\limits_2`).toBuild()
  assertion = "operatorname should consolidate contents when possible"
  new Expect(temml.renderToString(r`\operatorname{Max}`)).toContain("<mi>Max</mi>")

  assertion = "href and url commands should build their input"
  new Expect(r`\href{http://example.com/}{\sin}`).toParse(trustSettings())
  new Expect("\\url{http://example.com/}").toParse(trustSettings())
  assertion = "href and url commands should allow empty URLs"
  new Expect(r`\href{}{example here}`).toParse(trustSettings())
  new Expect("\\url{}").toParse(trustSettings())
  new Expect(r`\href{http://example.com/}{\sin}`).toBuild(trustSettings())
  new Expect("\\url{http://example.com/}").toBuild(trustSettings())
  assertion = "href and url commands should allow empty URLs"
  new Expect(r`\href{}{example here}`).toBuild(trustSettings())
  new Expect("\\url{}").toBuild(trustSettings())
  assertion = "href and url commands should allow single-character URLs"
  new Expect(r`\href%end`).toParseLike("\\href{%}end", trustSettings())
  new Expect("\\url%end").toParseLike("\\url{%}end", trustSettings())
  new Expect("\\url%%end\n").toParseLike("\\url{%}", trustSettings())
  new Expect("\\url end").toParseLike("\\url{e}nd", trustSettings())
  new Expect("\\url%end").toParseLike("\\url {%}end", trustSettings())
  assertion = "href and url commands should allow spaces ad single-character URLs"
  new Expect(r`\href %end`).toParseLike("\\href{%}end", trustSettings())
  new Expect("\\url %end").toParseLike("\\url{%}end", trustSettings())
  assertion = "href and url commands should allow [#$%&~_^] without escaping"
  let url = "http://example.org/~bar/#top?foo=$foo&bar=ba^r_boo%20baz";
  node = parse(`\\href{${url}}{\\alpha}`, trustSettings())[0];
  new Expect(node.href).toBe(url);
  node = parse(`\\url{${url}}`, trustSettings())[0];
  new Expect(node.href).toBe(url);
  assertion = "href and url commands should allow balanced braces in url"
  node = parse(`\\href{${url}}{\\alpha}`, trustSettings())[0];
  new Expect(node.href).toBe(url);
  url = "http://example.org/{{}t{oo}}";
  node = parse(`\\href{${url}}{\\alpha}`, trustSettings())[0];
  new Expect(node.href).toBe(url);
  node = parse(`\\url{${url}}`, trustSettings())[0];
  new Expect(node.href).toBe(url);
  assertion = "href and url commands should not allow balanced braces in url"
  new Expect(r`\href{http://example.com/{a}{bar}`).toNotParse(trustSettings())
  new Expect(r`\href{http://example.com/}a}{bar}`).toNotParse(trustSettings())
  new Expect(`\\url{http://example.com/{a}`).toNotParse(trustSettings())
  new Expect(`\\url{http://example.com/}a}`).toNotParse(trustSettings())
  assertion = "href and url commands should allow for escapes in [#$%&~_^]"
  url = "http://example.org/~bar/#top?foo=$}foo{&bar=bar^r_boo%20baz";
  url = url.replace(/([#$%&~_^{}])/g, '\\$1');
  new Expect(`\\href{${url}}{\\alpha}`).toParse(trustSettings())
  new Expect(`\\url{${url}}`).toParse(trustSettings());
  new Expect(`\\href{${url}}{\\alpha}`).toBuild(trustSettings())
  new Expect(`\\url{${url}}`).toBuild(trustSettings());
  assertion = "href and url commands should allow comments after URLs"
  new Expect("\\url{http://example.com/}%comment\n").toParse(trustSettings())
  new Expect("\\url{http://example.com/}%comment\n").toBuild(trustSettings())

  assertion = "href and url commands should allow  relative URLs when trust option is false"
  markup = temml.renderToString("\\href{relative}{foo}")
  new Expect(markup).toContain("#b22222") // color of error message

  assertion = "href and url commands should allow explicitly allowed protocols"
  new Expect("\\href{ftp://x}{foo}").toParse(new Settings({trust: (context) => context.protocol === "ftp"}))
  new Expect("\\href{ftp://x}{foo}").toBuild(new Settings({trust: (context) => context.protocol === "ftp"}))
  assertion = "href and url commands should allow all protocols when trust option is true"
  new Expect("\\href{ftp://x}{foo}").toParse(trustSettings())
  new Expect("\\href{ftp://x}{foo}").toBuild(trustSettings())
  assertion = "href and url commands should not allow explicitly disallowed protocols"
  new Expect("\\href{javascript:alert('x')}{foo}").toNotParse(new Settings({trust: context => context.protocol !== "javascript"}))

  assertion = "The symbol table integrity should treat certain symbols as synonyms"
  new Expect(`<`).toBuildLike(r`\lt`)
  new Expect(`>`).toBuildLike(r`\gt`)
  new Expect(r`\left<\frac{1}{x}\right>`).toBuildLike(r`\left\lt\frac{1}{x}\right\gt`)

  assertion = "Symbols should support AMS symbols in both text and math mode"
  new Expect(r`\yen\checkmark\circledR\maltese`).toBuild(strictSettings())
  new Expect(r`\text{\yen\checkmark\circledR\maltese}`).toBuild(strictSettings())
  new Expect(r`\yen\checkmark\circledR\maltese`).toParse(strictSettings())
  new Expect(r`\text{\yen\checkmark\circledR\maltese}`).toParse(strictSettings())

  assertion = "A macro expander should produce individual tokens"
  new Expect(r`e^\foo`).toParseLike("e^a 23", new Settings({macros: {"\\foo": "a23"}}))
  new Expect(r`e^\foo`).toParseLike("e^1 23", new Settings({strict: true, macros: {"\\foo": "123"}}))
  assertion = "A macro expander should preserve leading spaces inside macro definition"
  new Expect(r`\text{\foo}`).toParseLike(r`\text{ x}`, new Settings({macros: {"\\foo": " x"}}))
  assertion = "A macro expander should preserve leading spaces inside macro argument"
  new Expect(r`\text{\foo{ x}}`).toParseLike(r`\text{ x}`, new Settings({macros: {"\\foo": "#1"}}))
  assertion = "A macro expander should ignore expanded spaces in math mode"
  new Expect(r`\foo`).toParseLike("x", new Settings({macros: {"\\foo": " x"}}))
  assertion = "A macro expander should consume spaces after control-word macro"
  new Expect(r`\text{\foo }`).toParseLike(r`\text{x}`, new Settings({macros: {"\\foo": "x"}}))
  assertion = "A macro expander should consume spaces after macro with \\relax"
  new Expect(r`\text{\foo }`).toParseLike(r`\text{}`, new Settings({macros: {"\\foo": "\\relax"}}))
  assertion = "A macro expander not should consume spaces after control-word expansion"
  new Expect(r`\text{\\ }`).toParseLike(r`\text{ }`, new Settings({macros: {"\\\\": "\\relax"}}))
  assertion = "A macro expander should consume spaces after \\relax"
  new Expect(r`\text{\relax }`).toParseLike(r`\text{}`)
  assertion = "A macro expander should consume spaces after control-word function"
  new Expect(r`\text{\yen }`).toParseLike(r`\text{\yen}`)
  assertion = "A macro expander should preserve spaces after control-symbol macro"
  new Expect(r`\text{\% y}`).toParseLike(r`\text{x y}`, new Settings({macros: {"\\%": "x"}}))
  assertion = "A macro expander should preserve spaces after control-symbol function"
  new Expect(r`\text{\' }`).toParse()
  assertion = "A macro expander should consume spaces between arguments"
  new Expect(r`\text{\foo a 2}`).toParseLike(r`\text{a2end}`, new Settings({macros: {"\\foo": "#1#2end"}}))
  new Expect(r`\text{\foo {a} {2}}`).toParseLike(r`\text{a2end}`, new Settings({macros: {"\\foo": "#1#2end"}}))
  assertion = "A macro expander should allow for multiple expansion"
  new Expect(r`1\foo2`).toParseLike("1aa2", new Settings({macros: {
    "\\foo": "\\bar\\bar",
    "\\bar": "a",
  }}))
  assertion = "A macro expander should allow for multiple expansion with argument"
  new Expect(r`1\foo2`).toParseLike("1 2 2 2 2", new Settings({macros: {
    "\\foo": "\\bar{#1}\\bar{#1}",
    "\\bar": "#1#1",
  }}))
  assertion = "A macro expander should allow for macro argument"
  new Expect(r`\foo\bar`).toParseLike("(xyz)", new Settings({macros: {
    "\\foo": "(#1)",
    "\\bar": "xyz",
  }}))
  assertion = "A macro expander should allow properly nested group for macro argument"
  new Expect(r`\foo{e^{x_{12}+3}}`).toParseLike("(e^{x_{12}+3})", new Settings({macros: {"\\foo": "(#1)"}}))

  assertion = "A macro expander should delay expansion if preceded by \\expandafter"
  new Expect(r`\expandafter\foo\bar`).toParseLike("x+y", new Settings({macros: {
    "\\foo": "#1+#2",
    "\\bar": "xy",
  }}))
  // \def is not expandable, i.e., \expandafter doesn't define the macro
  new Expect(r`\def\foo{x}\def\bar{\def\foo{y}}\expandafter\bar\foo`).toParseLike(`x`)

  assertion = "A macro expander should not expand if preceded by \\noexpand"
  // \foo is not expanded and interpreted as if its meaning were \relax
  new Expect(r`\noexpand\foo y`).toParseLike(r`y`, new Settings({macros: {"\\foo": "x"}}))
  new Expect(r`\expandafter\foo\noexpand\foo`).toParseLike("x", new Settings({macros: {"\\foo": "x"}}))
  new Expect(r`\noexpand\frac xy`).toParseLike(`xy`)
  new Expect(r`\noexpand\def\foo{xy}\foo`).toParseLike(`xy`)

  assertion = "A macro expander should allow for space macro argument (text version)"
  new Expect(r`\text{\foo\bar}`).toParseLike(r`\text{( )}`, new Settings({macros: {
    "\\foo": "(#1)",
    "\\bar": " ",
  }}))

  assertion = "A macro expander should allow for space macro argument (math version)"
  new Expect(r`\foo\bar`).toParseLike("()", new Settings({macros: {
    "\\foo": "(#1)",
    "\\bar": " ",
  }}))

  assertion = "A macro expander should allow for second argument (text version)"
  new Expect(r`\text{\foo\bar\bar}`).toParseLike(r`\text{( , )}`, new Settings({macros: {
    "\\foo": "(#1,#2)",
    "\\bar": " ",
  }}))

  assertion = "A macro expander should allow for second argument (math version)"
  new Expect(r`\foo\bar\bar`).toParseLike("(,)", new Settings({macros: {
    "\\foo": "(#1,#2)",
    "\\bar": " ",
  }}))

  assertion = "A macro expander should allow for empty macro argument"
  new Expect(r`\foo\bar`).toParseLike("()", new Settings({macros: {
    "\\foo": "(#1)",
    "\\bar": "",
  }}))

  assertion = "A macro expander should allow for space function arguments"
  new Expect(r`\frac\bar\bar`).toParseLike(r`\frac{}{}`, new Settings({macros: { "\\bar": " " }}))

  assertion = "A macro expander should allow aliasing characters"
  new Expect(r`x’=c`).toParseLike("x'=c", new Settings({macros: { "’": "'" }}))

  assertion = "In a macro expander, \\@firstoftwo should consume both, and avoid errors"
  new Expect(r`\@firstoftwo{yes}{no}`).toParseLike("yes")
  new Expect(r`\@firstoftwo{yes}{1'_2^3}`).toParseLike("yes")

  assertion = "In a macro expander, \\@ifstar should consume star but nothing else"
  new Expect(r`\@ifstar{yes}{no}*!`).toParseLike("yes!")
  new Expect(r`\@ifstar{yes}{no}?!`).toParseLike("no?!")

  assertion = "In a macro expander, \\@ifnextchar should not consume nonspaces"
  new Expect(r`\@ifnextchar!{yes}{no}!!`).toParseLike("yes!!")
  new Expect(r`\@ifnextchar!{yes}{no}?!`).toParseLike("no?!")

  assertion = "In a macro expander, \\@ifnextchar should consume spaces"
  new Expect(r`\def\x#1{\@ifnextchar x{yes}{no}}\x{}x\x{} x`).toParseLike("yesxyesx")

  assertion = "In a macro expander, \\@ifstar should consume star but nothing else"
  new Expect(r`\@ifstar{yes}{no}*!`).toParseLike("yes!")
  new Expect(r`\@ifstar{yes}{no}?!`).toParseLike("no?!")

  assertion = "In a macro expander, \\def defines macros"
  new Expect(r`\def\foo{x^2}\foo+\foo`).toParseLike(`x^2+x^2`)
  new Expect(r`\def\foo{hi}\foo+\text\foo`).toParseLike(r`hi+\text{hi}`)
  new Expect(r`\def\foo#1{hi #1}\text{\foo{Alice}, \foo{Bob}}`).toParseLike(r`\text{hi Alice, hi Bob}`)
  new Expect(r`\def\foo#1#2{(#1,#2)}\foo 1 2+\foo 3 4`).toParseLike(r`(1, 2)+(3, 4)`)
  new Expect(r`\def\foo#a{}`).toNotParse()
  new Expect(r`\def\foo#1#2#3#4#5#6#7#8#9{}`).toParse()
  new Expect(r`\def\foo#2{}`).toNotParse()
  new Expect(r`\def\foo#1#2#3#4#5#6#7#8#9#10{}`).toNotParse()
  new Expect(r`\def\foo1`).toNotParse()
  new Expect(r`\def{\foo}{}`).toNotParse()
  new Expect(r`\def\foo\bar`).toNotParse()
  new Expect(r`\def{\foo\bar}{}`).toNotParse()
  new Expect(r`\def{}{}`).toNotParse()

  assertion = "In a macro expander, \\gdef defines macros"
  new Expect(r`\gdef\foo{x^2}\foo+\foo`).toParseLike(`x^2+x^2`)
  new Expect(r`\gdef\foo{hi}\foo+\text\foo`).toParseLike(r`hi+\text{hi}`)
  new Expect(r`\gdef\foo#1{hi #1}\text{\foo{Alice}, \foo{Bob}}`).toParseLike(r`\text{hi Alice, hi Bob}`)
  new Expect(r`\gdef\foo#1#2{(#1,#2)}\foo 1 2+\foo 3 4`).toParseLike(r`(1, 2)+(3, 4)`)
  new Expect(r`\gdef\foo#a{}`).toNotParse()
  new Expect(r`\gdef\foo#1#2#3#4#5#6#7#8#9{}`).toParse()
  new Expect(r`\gdef\foo#2{}`).toNotParse()
  new Expect(r`\gdef\foo#1#2#3#4#5#6#7#8#9#10{}`).toNotParse()
  new Expect(r`\gdef\foo1`).toNotParse()
  new Expect(r`\gdef{\foo}{}`).toNotParse()
  new Expect(r`\gdef\foo\bar`).toNotParse()
  new Expect(r`\gdef{\foo\bar}{}`).toNotParse()
  new Expect(r`\gdef{}{}`).toNotParse()

  assertion = "In a macro expander, \\def defines macros with delimited parameter"
  new Expect(r`\def\foo|#1||{#1}\text{\foo| x y ||}`).toParseLike(r`\text{ x y }`)
  new Expect(r`\def\foo#1|#2{#1+#2}\foo a 2 |34`).toParseLike(r`a2+34`)
  new Expect(r`\def\foo#1#{#1}\foo1^{23}`).toParseLike(r`1^{23}`)
  new Expect(r`\def\foo|{}\foo`).toNotParse()
  new Expect(r`\def\foo#1|{#1}\foo1`).toNotParse()
  new Expect(r`\def\foo#1|{#1}\foo1}|`).toNotParse()

  assertion = "In a macro expander, \\gdef defines macros with delimited parameter"
  new Expect(r`\gdef\foo|#1||{#1}\text{\foo| x y ||}`).toParseLike(r`\text{ x y }`)
  new Expect(r`\gdef\foo#1|#2{#1+#2}\foo a 2 |34`).toParseLike(r`a2+34`)
  new Expect(r`\gdef\foo#1#{#1}\foo1^{23}`).toParseLike(r`1^{23}`)
  new Expect(r`\gdef\foo|{}\foo`).toNotParse()
  new Expect(r`\gdef\foo#1|{#1}\foo1`).toNotParse()
  new Expect(r`\gdef\foo#1|{#1}\foo1}|`).toNotParse()

  assertion = "In a macro expander, \\edef should expand definition"
  new Expect(r`\def\foo{a}\edef\bar{\foo}\def\foo{}\bar`).toParseLike(`a`)
  // \def\noexpand\foo{} expands into \def\foo{}
  new Expect(r`\def\foo{a}\edef\bar{\def\noexpand\foo{}}\foo\bar\foo`).toParseLike(r`a`)
  // \foo\noexpand\foo expands into a\foo
  new Expect(r`\def\foo{a}\edef\bar{\foo\noexpand\foo}\def\foo{b}\bar`).toParseLike(r`ab`)
  // \foo is not defined
  new Expect(r`\edef\bar{\foo}`).toNotParse(strictSettings())

  assertion = "\\def should be handled in Parser"
  new Expect(r`\gdef\foo{1}`).toParse(new Settings({maxExpand: 0}))
  new Expect(r`2^\def\foo{1}2`).toNotParse()

  assertion = "\\def works locally"
  new Expect("\\def\\x{1}\\x{\\def\\x{2}\\x{\\def\\x{3}\\x}\\x}\\x").toParseLike(`1{2{3}2}1`)

  assertion = "\\gdef overrides at all levels"
  new Expect("\\def\\x{1}\\x{\\def\\x{2}\\x{\\gdef\\x{3}\\x}\\x}\\x").toParseLike(`1{2{3}3}3`)
  new Expect("\\def\\x{1}\\x{\\def\\x{2}\\x{\\global\\def\\x{3}\\x}\\x}\\x").toParseLike(`1{2{3}3}3`)

  assertion = "\\global needs to followed by macro prefixes, \\def or \\edef"
  new Expect(r`\global\def\foo{}\foo`).toParseLike("")
  new Expect(r`\global\edef\foo{}\foo`).toParseLike("")
  new Expect(r`\def\DEF{\def}\global\DEF\foo{}\foo`).toParseLike("")
  new Expect(r`\global\global\def\foo{}\foo`).toParseLike("")
  new Expect(r`\global\long\def\foo{}\foo`).toParseLike("")
  new Expect(r`\global\foo`).toNotParse()
  new Expect(r`\global\bar x`).toNotParse()

  assertion = "\\gdef changes settings.macros"
  let macros = {};
  new Expect(r`\gdef\foo{1}`).toParse(new Settings({macros}))
  new Expect(macros["\\foo"]).toBeTruthy()

  assertion = "\\def doesn't change settings.macros"
  macros = {}
  new Expect(r`\def\foo{1}`).toParse(new Settings({macros}))
  new Expect(macros["\\foo"]).toBeFalsy()

  assertion = "In a macro expander, \\long needs to be followed by macro prefixes, \\def or \\edef"
  new Expect(r`\long\def\foo{}\foo`).toParseLike("")
  new Expect(r`\long\edef\foo{}\foo`).toParseLike("")
  new Expect(r`\long\foo`).toNotParse()

  assertion = "In a macro expander, \\let copies the definition"
  new Expect(r`\let\foo=\frac\def\frac{}\foo1a`).toParseLike(r`\frac1a`)
  new Expect(r`\def\foo{1}\let\bar\foo\def\foo{2}\bar`).toParseLike(r`1`)
  new Expect(r`\let\foo=\kern\edef\bar{\foo1em}\let\kern=\relax\bar`).toParseLike(r`\kern1em`)
  // \foo = { (left brace)
  new Expect(r`\let\foo{\sqrt\foo1}`).toParseLike(r`\sqrt{1}`)
  // \equals = = (equal sign)
  new Expect(r`\let\equals==a\equals b`).toParseLike(r`a=b`)
  // \foo should not be expandable and not affected by \noexpand or \edef
  new Expect(r`\let\foo=x\noexpand\foo`).toParseLike(r`x`)
  new Expect(r`\let\foo=x\edef\bar{\foo}\def\foo{y}\bar`).toParseLike(r`y`)

  assertion = "In a macro expander, \\let should consume one optional space after equals sign"
  // https://tex.stackexchange.com/questions/141166/let-foo-bar-vs-let-foo-bar-let-with-equals-sign
  new Expect(r`\def\:{\let\space= }\: \text{\space}`).toParseLike(r`\text{ }`)

  assertion = "In a macro expander, \\futurelet should parse correctly"
  new Expect(r`\futurelet\foo\frac1{2+\foo}`).toParseLike(r`\frac1{2+1}`)

  assertion = "In a macro expander, \\newcommand defines new macros"
  new Expect(r`\newcommand\foo{x^2}\foo+\foo`).toParseLike(`x^2+x^2`, strictSettings())
  new Expect(r`\newcommand{\foo}{x^2}\foo+\foo`).toParseLike(`x^2+x^2`, strictSettings())
  // Function detection
  new Expect(r`\newcommand\bar{x^2}\bar+\bar`).toNotParse()
  new Expect(r`\newcommand{\bar}{x^2}\bar+\bar`).toNotParse()
  // Symbol detection
  new Expect(r`\newcommand\lambda{x^2}\lambda`).toNotParse()
  new Expect(r`\newcommand\textdollar{x^2}\textdollar`).toNotParse()
  // Macro detection
  new Expect(r`\newcommand{\foo}{1}\foo\newcommand{\foo}{2}\foo`).toNotParse()
  // Implicit detection
  new Expect(r`\newcommand\limits{}`).toNotParse()

  assertion = "In a macro expander, \\renewcommand redefines macro"
  new Expect(r`\renewcommand\foo{x^2}\foo+\foo`).toNotParse(strictSettings())
  new Expect(r`\renewcommand{\foo}{x^2}\foo+\foo`).toNotParse(strictSettings())
  new Expect(r`\renewcommand\bar{x^2}\bar+\bar`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\renewcommand{\bar}{x^2}\bar+\bar`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\newcommand{\foo}{1}\foo\renewcommand{\foo}{a}\foo`).toParseLike(r`1a`, strictSettings())

  assertion = "In a macro expander, \\providecommand (re)defines macros"
  new Expect(r`\providecommand\foo{x^2}\foo+\foo`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\providecommand{\foo}{x^2}\foo+\foo`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\providecommand\bar{x^2}\bar+\bar`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\providecommand{\bar}{x^2}\bar+\bar`).toParseLike(r`x^2+x^2`, strictSettings())
  new Expect(r`\newcommand{\foo}{1}\foo\providecommand{\foo}{b}\foo`).toParseLike(r`1b`, strictSettings())
  new Expect(r`\providecommand{\foo}{1}\foo\renewcommand{\foo}{b}\foo`).toParseLike(r`1b`, strictSettings())
  new Expect(r`\providecommand{\foo}{1}\foo\providecommand{\foo}{b}\foo`).toParseLike(r`1b`, strictSettings())

  assertion = "In a macro expander, \\newcommand accepts number of arguments"
  new Expect(r`\newcommand\foo[1]{#1^2}\foo x+\foo{y}`).toParseLike(r`x^2+y^2`, strictSettings())
  new Expect(r`\newcommand\foo[9]{#1^2}\foo abcdefghi`).toParseLike(r`a^2`, strictSettings())
  new Expect(r`\newcommand\foo[x]{}`).toNotParse(strictSettings())
  new Expect(r`\newcommand\foo[1.5]{}`).toNotParse(strictSettings())

  // This may change in the future, if we support the extra features of  \hspace.
  assertion = "A macro expander should treat \\hspace, \\hskip like \\kern"
  new Expect(r`\hspace{1em}`).toParseLike(r`\kern1em`)
  new Expect(r`\hskip{1em}`).toParseLike(r`\kern1em`)

  assertion = "A macro expander should expand \\limsup and \\liminf as expected"
  new Expect(r`\limsup`).toParseLike(r`\operatorname*{lim\,sup}`)
  new Expect(r`\liminf`).toParseLike(r`\operatorname*{lim\,inf}`)

  assertion = "A macro expander should expand AMS log-like symbols as expected"
  new Expect(r`\injlim`).toParseLike(r`\operatorname*{inj\,lim}`)
  new Expect(r`\projlim`).toParseLike(r`\operatorname*{proj\,lim}`)
  new Expect(r`\varlimsup`).toParseLike(r`\operatorname*{\overline{\text{lim}}}`)
  new Expect(r`\varliminf`).toParseLike(r`\operatorname*{\underline{\text{lim}}}`)
  new Expect(r`\varinjlim`).toParseLike(r`\operatorname*{\underrightarrow{\text{lim}}}`)
  new Expect(r`\varinjlim`).toParseLike(r`\operatorname*{\underrightarrow{\text{lim}}}`)
  new Expect(r`\varprojlim`).toParseLike(r`\operatorname*{\underleftarrow{\text{lim}}}`)

  assertion = "A macro expander should expand \\plim and \\argmin and \\argmax as expected"
  new Expect(r`\plim`).toParseLike(r`\operatorname*{plim}`)
  new Expect(r`\argmin`).toParseLike(r`\operatorname*{arg\,min}`)
  new Expect(r`\argmax`).toParseLike(r`\operatorname*{arg\,max}`)

  assertion = "A macro expander should expand \\bra and \ket as expected"
  new Expect(r`\bra{\phi}`).toParseLike(r`\mathinner{\langle{\phi}|}`)
  new Expect(r`\ket{\psi}`).toParseLike(r`\mathinner{|{\psi}\rangle}`)
  new Expect(r`\braket{\phi|\psi}`).toParseLike(r`\mathinner{\langle{\phi|\psi}\rangle}`)
  new Expect(r`\Bra{\phi}`).toParseLike(r`\left\langle\phi\right|`)
  new Expect(r`\Ket{\psi}`).toParseLike(r`\left|\psi\right\rangle`)

  assertion = "Macro arguments do not generate groups"
  new Expect("\\def\\x{a}\\x\\def\\foo#1{#1}\\foo{\\x\\def\\x{b}\\x}\\x").toParseLike(`aabb`)

  assertion = "\\gdef or \\xdef should produce an error"
  new Expect(temml.renderToString("\gdef\foo{Nope}")).toContain("#b22222") // color of error message
  new Expect(temml.renderToString("\xdef\foo{Nope}")).toContain("#b22222")

  assertion = "A preamble should capture viable macros and definecolor."
  macros = temml.definePreamble(r`\definecolor{sortaGreen}{RGB}{128,128,0}`)
  new Expect(r`\color{sortaGreen} F=ma`).toParse(new Settings({macros}))
  macros = temml.definePreamble(r`\def\foo{x^2}`)
  markup = temml.renderToString(r`\foo + \foo`, new Settings({macros}))
  new Expect(markup).toContain(`<math>`)
  macros = temml.definePreamble(r`\newcommand\d[0]{\operatorname{d}\!}`)
  markup = temml.renderToString(r`\d x`, new Settings({macros}))
  new Expect(markup).toContain(`<math>`)

  assertion = "\\textbf arguments do generate groups"
  new Expect("\\def\\x{a}\\x\\textbf{\\x\\def\\x{b}\\x}\\x").toParseLike(r`a\textbf{ab}a`)

  assertion = "\\sqrt optional arguments generate groups"
  new Expect("\\def\\x{a}\\def\\y{a}\\x\\y" + "\\sqrt[\\def\\x{b}\\x]{\\def\\y{b}\\y}\\x\\y").toParseLike(r`aa\sqrt[b]{b}aa`)

  assertion = "Array cells generate groups"
  new Expect(r`\def\x{a}\begin{matrix}\x&\def\x{b}\x&\x\end{matrix}\x`).toParseLike(r`\begin{matrix}a&b&a\end{matrix}a`)
  new Expect(r`\def\x{1}\begin{matrix}\def\x{2}\x&\x\end{matrix}\x`).toParseLike(r`\begin{matrix}2&1\end{matrix}1`)

  assertion = "\\char produces literal characters"
  new Expect("\\char`a").toParseLike("\\char`\\a");
  new Expect("\\char`\\%").toParseLike("\\char37");
  new Expect("\\char`\\%").toParseLike("\\char'45");
  new Expect("\\char`\\%").toParseLike('\\char"25');
  new Expect("\\char").toNotParse();
  new Expect("\\char`").toNotParse();
  new Expect("\\char'").toNotParse();
  new Expect('\\char"').toNotParse();
  new Expect("\\char'a").toNotParse();
  new Expect('\\char"g').toNotParse();
  new Expect('\\char"g').toNotParse();

  assertion = "Unicode private area characters should build"
  new Expect(r`\gvertneqq\lvertneqq\ngeqq\ngeqslant\nleqq`).toParse()
  new Expect(r`\nleqslant\nshortmid\nshortparallel\varsubsetneq`).toParse()
  new Expect(r`\varsubsetneqq\varsupsetneq\varsupsetneqq`).toParse()
  new Expect(r`\gvertneqq\lvertneqq\ngeqq\ngeqslant\nleqq`).toBuild()
  new Expect(r`\nleqslant\nshortmid\nshortparallel\varsubsetneq`).toBuild()
  new Expect(r`\varsubsetneqq\varsupsetneq\varsupsetneqq`).toBuild()

  assertion = "\\overset and \\underset should work"
  new Expect(r`\overset{f}{\rightarrow} Y`).toParse()
  new Expect("\\underset{f}{\\rightarrow} Y").toParse()
  new Expect(r`\overset{f}{\rightarrow} Y`).toBuild()
  new Expect("\\underset{f}{\\rightarrow} Y").toBuild()

  assertion = "\\iff, \\implies, and \\impliedby should work"
  new Expect(r`X \iff Y`).toParse()
  new Expect(r`X \implies Y`).toParse()
  new Expect(r`X \impliedby Y`).toParse()
  new Expect(r`X \iff Y`).toBuild()
  new Expect(r`X \implies Y`).toBuild()
  new Expect(r`X \impliedby Y`).toBuild()

  assertion = "\\tag support should fail outside display mode"
  new Expect(r`\tag{hi}x+y`).toNotParse()
  assertion = "\\tag support should fail with multiple tags"
  new Expect(r`\tag{1}\tag{2}x+y`).toNotParse(displayMode())
  assertion = "\\tag should build"
  new Expect(r`\tag{hi}x+y`).toParse(displayMode());
  new Expect(r`\tag{hi}x+y`).toBuild(displayMode());
  assertion = "\\tag support should ignore location of \\tag"
  new Expect(r`\tag{hi}x+y`).toParseLike(r`x+y\tag{hi}`, displayMode());
  assertion = "\\tag support should handle \\tag* like \\tag"
  new Expect(r`\tag{hi}x+y`).toParseLike(r`\tag*{({hi})}x+y`, displayMode());
  assertion = "\\tag support should add tml-tageqn class"
  new Expect(temml.renderToString(r`\tag{hi}x+y`, displayMode())).toContain("tml-tageqn")
  assertion = "leqno rendering option should differ from default"
  new Expect(temml.renderToString(r`\tag{hi}x+y`, new Settings({ displayMode: true, leqno: true }))).toContain("text-align:-webkit-left")
  new Expect(temml.renderToString(r`\tag{hi}x+y`,displayMode())).toNotContain("rspace")

  assertion = "\\@binrel automatic bin/rel/ord should generate proper class"
  new Expect(parse("L\\@binrel+xR")[1].mclass).toBe("mbin")
  new Expect(parse("L\\@binrel=xR")[1].mclass).toBe("mrel")
  new Expect(parse("L\\@binrel xxR")[1].mclass).toBe("mord")
  new Expect(parse("L\\@binrel=xR")[1].mclass).toBe("mrel")
  new Expect(parse("L\\@binrel{+}{x}R")[1].mclass).toBe("mbin")
  new Expect(parse("L\\@binrel{=}{x}R")[1].mclass).toBe("mrel")
  new Expect(parse("L\\@binrel{z}{x}R")[1].mclass).toBe("mord")
  assertion = "\\@binrel automatic bin/rel/ord should base on just first character in group"
  new Expect(parse("L\\@binrel{+x}xR")[1].mclass).toBe("mbin")
  new Expect(parse("L\\@binrel{=x}xR")[1].mclass).toBe("mrel")
  new Expect(parse("L\\@binrel{xx}xR")[1].mclass).toBe("mord")

  assertion = "A parser taking String objects should not fail on an empty String object"
  new Expect(new String("")).toParse()
  new Expect(new String("")).toBuild()
  assertion = "A parser taking String objects should parse the same as a regular string"
  new Expect(new String("xy")).toParseLike(`xy`)
  new Expect(new String(r`\div`)).toParseLike(r`\div`)
  new Expect(new String(r`\frac 1 2`)).toParseLike(r`\frac 1 2`)

  assertion = "Unicode accents should parse Latin-1 letters in math mode"
  new Expect(`ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåèéêëìíîïñòóôõöùúûüýÿ`).toBuildLike(
    r`\grave A\acute A\hat A\tilde A\ddot A\mathring A` +
    r`\grave E\acute E\hat E\ddot E` +
    r`\grave I\acute I\hat I\ddot I` +
    r`\tilde N` +
    r`\grave O\acute O\hat O\tilde O\ddot O` +
    r`\grave U\acute U\hat U\ddot U` +
    r`\acute Y` +
    r`\grave a\acute a\hat a\tilde a\ddot a\mathring a` +
    r`\grave e\acute e\hat e\ddot e` +
    r`\grave ı\acute ı\hat ı\ddot ı` +
    r`\tilde n` +
    r`\grave o\acute o\hat o\tilde o\ddot o` +
    r`\grave u\acute u\hat u\ddot u` +
    r`\acute y\ddot y`
  )
    
  assertion = "Unicode accents should parse Latin-1 letters in text mode"
  new Expect(`\\text{ÀÁÂÃÄÅÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåèéêëìíîïñòóôõöùúûüýÿ}`).toBuildLike(
    r`\text{\`A\'A\^A\~A\"A\r A` +
    r`\`E\'E\^E\"E` +
    r`\`I\'I\^I\"I` +
    r`\~N` +
    r`\`O\'O\^O\~O\"O` +
    r`\`U\'U\^U\"U` +
    r`\'Y` +
    r`\`a\'a\^a\~a\"a\r a` +
    r`\`e\'e\^e\"e` +
    r`\`ı\'ı\^ı\"ı` +
    r`\~n` +
    r`\`o\'o\^o\~o\"o` +
    r`\`u\'u\^u\"u` +
    r`\'y\"y}`
  )

  assertion = "Unicode accents should parse combining characters"
  new Expect("A\u0301C\u0301").toBuildLike(r`Á\acute C`);
  new Expect("\\text{A\u0301C\u0301}").toBuildLike(r`\text{Á\'C}`, strictSettings());

  assertion = "Unicode accents should build multi-accented characters"
  new Expect(`ấā́ắ\text{ấā́ắ}`).toParse()
  new Expect(`ấā́ắ\text{ấā́ắ}`).toBuild()

  assertion = "Unicode accents should parse accented i's and j's"
  new Expect(`íȷ́`).toBuildLike(r`\acute ı\acute ȷ`);
  new Expect(`ấā́ắ\text{ấā́ắ}`).toParse();
  new Expect(`ấā́ắ\text{ấā́ắ}`).toBuild();

  assertion = "Temml should build Unicode relations"
  new Expect(`∈∋∝∼∽≂≃≅≈≊≍≎≏≐≑≒≓≖⩵≗≜≡≤≥≦≧≪≫≬≳≷≺≻≼≽≾≿∴∵∣≔≕⩴⋘⋙⟂⊨∌⊶⊷⊂⊃⊆⊇⊏⊐⊑⊒⊢⊣⊩⊪⊸⋈⋍⋐⋑⋔⋛⋞⋟⌢⌣⩾⪆⪌⪕⪖⪯⪰⪷⪸⫅⫆≘≙≚≛≝≞≟≲⩽⪅≶⋚⪋`).toParse()
  new Expect(`∈∋∝∼∽≂≃≅≈≊≍≎≏≐≑≒≓≖⩵≗≜≡≤≥≦≧≪≫≬≳≷≺≻≼≽≾≿∴∵∣≔≕⩴⋘⋙⟂⊨∌⊶⊷⊂⊃⊆⊇⊏⊐⊑⊒⊢⊣⊩⊪⊸⋈⋍⋐⋑⋔⋛⋞⋟⌢⌣⩾⪆⪌⪕⪖⪯⪰⪷⪸⫅⫆≘≙≚≛≝≞≟≲⩽⪅≶⋚⪋`).toBuild()
  assertion = "Temml should build Unicode negated relations"
  new Expect(`∉∤∦≁≆≠≨≩≮≯≰≱⊀⊁⊈⊉⊊⊋⊬⊭⊮⊯⋠⋡⋦⋧⋨⋩⋬⋭⪇⪈⪉⪊⪵⪶⪹⪺⫋⫌`).toParse()
  new Expect(`∉∤∦≁≆≠≨≩≮≯≰≱⊀⊁⊈⊉⊊⊋⊬⊭⊮⊯⋠⋡⋦⋧⋨⋩⋬⋭⪇⪈⪉⪊⪵⪶⪹⪺⫋⫌`).toBuild()
  assertion = "Temml should build Unicode big operators"
  new Expect(`∏∐∑∫∬∭∮⋀⋁⋂⋃⨀⨁⨂⨄⨆`).toParse()
  new Expect(`∏∐∑∫∬∭∮⋀⋁⋂⋃⨀⨁⨂⨄⨆`).toBuild()
  assertion = "Temml should build Unicode symbols"
  new Expect(`£¥ℂℍℑℎℓℕ℘ℙℚℜℝℤℲℵðℶℷℸ⅁∀∁∂∃∇∞∠∡∢♠♡♢♣♭♮♯✓°¬‼⋮\u00B7\u00A9\\text{£¥ℂℍℎ\u00A9\u00AE\uFE0F}`).toParse()
  new Expect(`£¥ℂℍℑℎℓℕ℘ℙℚℜℝℤℲℵðℶℷℸ⅁∀∁∂∃∇∞∠∡∢♠♡♢♣♭♮♯✓°¬‼⋮\u00B7\u00A9\\text{£¥ℂℍℎ\u00A9\u00AE\uFE0F}`).toBuild()
  new Expect(temml.renderToString("ℓ")).toContain("ℓ")
  assertion = "Temml should build capital Greek letters"
  new Expect(`\u0391\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u039D\u039F\u03A1\u03A4\u03A7\u03DD`).toParse(strictSettings())
  new Expect(`\u0391\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u039D\u039F\u03A1\u03A4\u03A7\u03DD`).toBuild(strictSettings())
  assertion = "Temml should build Unicode arrows"
  new Expect(`←↑→↓↔↕↖↗↘↙↚↛↞↠↢↣↦↩↪↫↬↭↮↰↱↶↷↼↽↾↾↿⇀⇁⇂⇃⇄⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇚⇛⇝⟵⟶⟷⟸⟹⟺⟼`).toParse()
  new Expect(`←↑→↓↔↕↖↗↘↙↚↛↞↠↢↣↦↩↪↫↬↭↮↰↱↶↷↼↽↾↾↿⇀⇁⇂⇃⇄⇆⇇⇈⇉⇊⇋⇌⇍⇎⇏⇐⇑⇒⇓⇔⇕⇚⇛⇝⟵⟶⟷⟸⟹⟺⟼`).toBuild()
  assertion = "Temml should build Unicode binary operators"
  new Expect(`±×÷∓∔∧∨∩∪≀⊎⊓⊔⊕⊖⊗⊘⊙⊚⊛⊝◯⊞⊟⊠⊡⊺⊻⊼⋇⋉⋊⋋⋌⋎⋏⋒⋓⩞\u22C5\u2216\u2218\u2219`).toParse()
  new Expect(`±×÷∓∔∧∨∩∪≀⊎⊓⊔⊕⊖⊗⊘⊙⊚⊛⊝◯⊞⊟⊠⊡⊺⊻⊼⋇⋉⋊⋋⋌⋎⋏⋒⋓⩞\u22C5\u2216\u2218\u2219`).toBuild()
  assertion = "Temml should build Unicode delimiters"
  new Expect("\\left\u230A\\frac{a}{b}\\right\u230B").toParse()
  new Expect("\\left\u2308\\frac{a}{b}\\right\u2308").toParse()
  new Expect("\\left\u27ee\\frac{a}{b}\\right\u27ef").toParse()
  new Expect("\\left\u27e8\\frac{a}{b}\\right\u27e9").toParse()
  new Expect("\\left\u23b0\\frac{a}{b}\\right\u23b1").toParse()
  new Expect(`┌x┐ └x┘`).toParse()
  new Expect("\u231Cx\u231D \u231Ex\u231F").toParse()
  new Expect("\u27E6x\u27E7").toParse()
  new Expect("\\llbracket \\rrbracket").toParse()
  new Expect("\\lBrace \\rBrace").toParse()
  new Expect("\\left\u230A\\frac{a}{b}\\right\u230B").toBuild()
  new Expect("\\left\u2308\\frac{a}{b}\\right\u2308").toBuild()
  new Expect("\\left\u27ee\\frac{a}{b}\\right\u27ef").toBuild()
  new Expect("\\left\u27e8\\frac{a}{b}\\right\u27e9").toBuild()
  new Expect("\\left\u23b0\\frac{a}{b}\\right\u23b1").toBuild()
  new Expect(`┌x┐ └x┘`).toBuild()
  new Expect("\u231Cx\u231D \u231Ex\u231F").toBuild()
  new Expect("\u27E6x\u27E7").toBuild()
  new Expect("\\llbracket \\rrbracket").toBuild()
  new Expect("\\lBrace \\rBrace").toBuild()
  assertion = "Temml should build some Unicode surrogate pairs"
  let wideCharStr = "";
  wideCharStr += String.fromCharCode(0xD835, 0xDC00);   // bold A
  wideCharStr += String.fromCharCode(0xD835, 0xDC68);   // bold italic A
  wideCharStr += String.fromCharCode(0xD835, 0xDD04);   // Fraktur A
  wideCharStr += String.fromCharCode(0xD835, 0xDD38);   // double-struck
  wideCharStr += String.fromCharCode(0xD835, 0xDC9C);   // script A
  wideCharStr += String.fromCharCode(0xD835, 0xDDA0);   // sans serif A
  wideCharStr += String.fromCharCode(0xD835, 0xDDD4);   // bold sans A
  wideCharStr += String.fromCharCode(0xD835, 0xDE08);   // italic sans A
  wideCharStr += String.fromCharCode(0xD835, 0xDE70);   // monospace A
  wideCharStr += String.fromCharCode(0xD835, 0xDFCE);   // bold zero
  wideCharStr += String.fromCharCode(0xD835, 0xDFE2);   // sans serif zero
  wideCharStr += String.fromCharCode(0xD835, 0xDFEC);   // bold sans zero
  wideCharStr += String.fromCharCode(0xD835, 0xDFF6);   // monospace zero
  new Expect(wideCharStr).toParse(strictSettings());
  new Expect(wideCharStr).toBuild(strictSettings());
  let wideCharText = "\text{";
  wideCharText += String.fromCharCode(0xD835, 0xDC00);   // bold A
  wideCharText += String.fromCharCode(0xD835, 0xDC68);   // bold italic A
  wideCharText += String.fromCharCode(0xD835, 0xDD04);   // Fraktur A
  wideCharText += String.fromCharCode(0xD835, 0xDD38);   // double-struck
  wideCharText += String.fromCharCode(0xD835, 0xDC9C);   // script A
  wideCharText += String.fromCharCode(0xD835, 0xDDA0);   // sans serif A
  wideCharText += String.fromCharCode(0xD835, 0xDDD4);   // bold sans A
  wideCharText += String.fromCharCode(0xD835, 0xDE08);   // italic sans A
  wideCharText += String.fromCharCode(0xD835, 0xDE70);   // monospace A
  wideCharText += String.fromCharCode(0xD835, 0xDFCE);   // bold zero
  wideCharText += String.fromCharCode(0xD835, 0xDFE2);   // sans serif zero
  wideCharText += String.fromCharCode(0xD835, 0xDFEC);   // bold sans zero
  wideCharText += String.fromCharCode(0xD835, 0xDFF6);   // monospace zero
  wideCharText += "}";
  new Expect(wideCharText).toParse(strictSettings());
  new Expect(wideCharText).toBuild(strictSettings());
  assertion = "Unicode script characters should parse correctly."
  wideCharText = String.fromCharCode(0xD835, 0xdcaa); // Script O
  markup = temml.renderToString(wideCharText)
  new Expect(markup).toContain('class="mathcal"')
  wideCharText = String.fromCharCode(0xD835, 0xdcaa, 0xfe01); // Trailing U_FE01 per Unicode 14
  markup = temml.renderToString(wideCharText)
  new Expect(markup).toContain('class="mathscr"')

  assertion = "The maxSize setting should clamp size when set"
  const rule = r`\rule{999em}{999em}`
  markup = temml.renderToString(rule, new Settings({ maxSize: [5, 80] }))
  new Expect(markup).toContain(`width="5em"`)
  new Expect(markup).toContain(`height="5em"`)
  assertion = "The maxSize setting should not clamp size when not set"
  markup = temml.renderToString(rule)
  new Expect(markup).toNotContain(`width="5em"`)
  new Expect(markup).toNotContain(`height="5em"`)
  assertion = "The maxSize setting should make zero-width rules if a negative maxSize is passed"
  markup = temml.renderToString(rule, new Settings({ maxSize: [-5, -80] }))
  new Expect(markup).toContain(`width="0em"`)
  new Expect(markup).toContain(`height="0em"`)

  assertion = "The maxExpand setting should prevent expansion"
  new Expect(r`\def\foo{1}\foo`).toParse()
  new Expect(r`\def\foo{1}\foo`).toBuild()
  new Expect(r`\def\foo{1}\foo`).toParse(new Settings({maxExpand: 1}))
  new Expect(r`\def\foo{1}\foo`).toNotParse(new Settings({maxExpand: 0}))
  assertion = "The maxExpand setting should prevent infinite loops"
  new Expect(r`\def\foo{\foo}\foo`).toNotParse(new Settings({maxExpand: 10}))

  assertion = "The \\mathchoice function should render as if there is nothing other in display math"
  const cmd = r`\sum_{k = 0}^{\infty} x^k`
  new Expect(`\\displaystyle\\mathchoice{${cmd}}{T}{S}{SS}`).toBuildLike(`\\displaystyle${cmd}`)
  assertion = "The \\mathchoice function should render as if there is nothing other in text"
  new Expect(`\\textstyle\\mathchoice{D}{${cmd}}{S}{SS}`).toBuildLike(`\\textstyle${cmd}`)
  assertion = "The \\mathchoice function should render as if there is nothing other in scriptstyle"
  new Expect(`\\scriptstyle\\mathchoice{D}{T}{${cmd}}{SS}`).toBuildLike(`\\scriptstyle${cmd}`)
  assertion = "The \\mathchoice function should render as if there is nothing other in scriptscriptstyle"
  new Expect(`\\scriptscriptstyle\\mathchoice{D}{T}{S}{${cmd}}`).toBuildLike(`\\scriptscriptstyle${cmd}`)

  assertion = "Newlines via \\\\ and \\newline should build \\\\ without the optional argument and \\newline the same"
  new Expect(r`hello \\ world`).toBuildLike(r`hello \newline world`)
  assertion = "Newlines via \\\\ and \\newline should not allow \\newline to scan for an optional size argument"
  new Expect(r`hello \newline[w]orld`).toParse()
  new Expect(r`hello \newline[w]orld`).toBuild()
  assertion = "Newlines via \\\\ and \\newline should not allow \\cr at top level"
  new Expect(temml.renderToString(r`hello \cr world`)).toContain("#b22222") // color of error message
  assertion = "Newlines via \\\\ and \\newline: \\\\ causes newline, even after mrel and mop"
  markup = temml.renderToString(r`M = \\ a + \\ b \\ c`)
  new Expect(markup).toMatch(/=.+mo linebreak.+\+.+mo linebreak.+b.+mo linebreak/)
  assertion = "Newlines should cause left-justified lines."
  markup = temml.renderToString(r`a + b \\ c + d`)
  new Expect([...markup.matchAll(/text-align:left/g)].length).toBe(2)

  assertion = "Symbols should build"
  new Expect(r`\text{\i\j}`).toParse(strictSettings())
  new Expect(r`A\;B\,C\nobreakspace \text{A\;B\,C\nobreakspace}`).toParse(strictSettings())
  new Expect(r`\standardstate`).toParse(strictSettings())
  new Expect(r`\text{\i\j}`).toBuild(strictSettings())
  new Expect(r`A\;B\,C\nobreakspace \text{A\;B\,C\nobreakspace}`).toBuild(strictSettings())
  new Expect(r`\standardstate`).toBuild(strictSettings())
  new Expect(r`\text{\ae\AE\oe\OE\o\O\ss}`).toBuildLike(r`\text{æÆœŒøØß}`, strictSettings())

  assertion = "Settings should allow unicode text when not strict"
  new Expect(`é`).toParse()
  new Expect(`試`).toParse()

  assertion = "Settings should forbid math-mode unicode text when strict"
  new Expect(`é`).toNotParse(strictSettings())
  new Expect(`試`).toNotParse(strictSettings());

  assertion = "Unicode characters inside \\text{} should parse"
  new Expect(`\text{é}`).toParse()
  new Expect(`\text{試}`).toParse()

  assertion = "Line-wrapping should work"
  const wrapExpression = r`x = a \textcolor{blue}{+ a + a} = b + b + b`;
  new Expect(wrapExpression).toParse()
  new Expect(wrapExpression).toBuild();
  new Expect(wrapExpression).toBuild(wrapSettings("none"));
  new Expect(wrapExpression).toBuild(wrapSettings("tex"));
  new Expect(wrapExpression).toBuild(wrapSettings("="));
  // Line wrapping works by creating a series of <mrow> elements.
  // We check for regression by counting the number of elements.
  new Expect(build(wrapExpression, wrapSettings("tex"))[0].children.length).toBe(7)
  new Expect(build(wrapExpression, wrapSettings("="))[0].children.length).toBe(2)
  new Expect(build(r`x^{\textcolor{red}{-yz}}`)[0].children.length).toBe(2)

  console.log("Number of tests:    " + numTests)
  console.log("Number of failures: " + numFailures)
}

test()
