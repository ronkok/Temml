<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Temml Administration</title>
   <link rel="stylesheet" href="../../assets/Temml-Local.css">
   <link rel="stylesheet" href="../docStyles.css">
</head>

<body>
<main id="main" class="latin-modern">

# Temml Administration

# Browser Support

Temml works in browsers that support MathML. This includes Chrome, Edge, Firefox, and Safari.
Temml will never work in Internet Explorer.

# Installation

For use in the browser, you can download a zip file of Temml from the
[releases page][] of the Temml repository. For server-side use, you can obtain
Temml via CLI commands `npm install temml` or `yarn add temml`.

The minimum browser installation needs the following files. The `css` file and
font file must be in the same folder.

* temml.min.js
* Temml-Local.css
* Temml.woff2

A server-side installation should use `temml.cjs` or `temml.mjs` instead
of `temml.min.js`.

[releases page]: https://github.com/ronkok/Temml/releases

#### Starter template

```html
<!DOCTYPE html>
<!-- Temml requires the use of the HTML5 doctype. -->
<html>
    <head>
        ...
        <link rel="stylesheet" href="./Temml-Local.css">
        <script src="./temml.min.js"></script>
    </head>
    ...
</html>
```

# API

### Overview

Say that you have an HTMLCollection of elements whose contents should be
converted from TeX strings to math. The code for such a conversion
might look like this:

Option 1: Macros do not persist between calls to Temml:

```
// Render all the math.
for (let aSpan of [...mathSpans]) {
    const tex = aSpan.textContent;
    const displayMode = aSpan.classList.contains("display");
    temml.render(tex, aSpan, { displayMode });
}
// Optional postProcess to render \ref{}
temml.postProcess(document.body);
```

<details><summary>Option 2: Macros defined with <code>\gdef</code> <strong>do</strong> persist:</summary>

```
// Optional macros object to hold macros that persist between calls to Temml.
const macros = {}
// Render all the math.
for (let aSpan of [...mathSpans]) {
    const tex = aSpan.textContent;
    const displayMode = aSpan.classList.contains("display");
    // Notice the macros argument below.
    // It carries macros that were defined with \gdef or \global\let
    temml.render(tex, aSpan, { macros, displayMode });
}
// Optional postProcess to render \ref{}
temml.postProcess(document.body);
```

::: indented
Notice that you can choose when to stop macro persistence by redefining `macros`.
:::

<br>

</details>

<details><summary>Option 3: Macros persist and there are some predefined macros:</summary>

Now say that you wish to pre-define two macros and a color with document-wide scope.

```
// Optional preamble to pre-define macros.
const macros = temml.definePreamble(
    `\\newcommand\\d[0]{\\operatorname{d}\\!}
    \\def\\foo{x^2}
    \\definecolor{sortaGreen}{RGB}{128,128,0}`
);
// Render all the math.
for (let aSpan of [...mathSpans]) {
    const tex = aSpan.textContent;
    const displayMode = aSpan.classList.contains("display");
    temml.render(tex, aSpan, { macros, displayMode });
}
// Optional postProcess to render \ref{}
temml.postProcess(document.body);
```

</details>

Below, we examine the parts of that code.

### In-Browser

To render math in one DOM element, call `temml.render` with a TeX expression
and a DOM element to render into:

```js
temml.render("c = \\pm\\sqrt{a^2 + b^2}", element);
```

If the element you provide is a `<math>` element, Temml will populate it.
Otherwise, it will create a new `<math>` element and make it a child
of the element you provide.

### Server-Side

To generate MathML on the server or to generate an MathML string of the
rendered math, you can use `temml.renderToString`:

```js
const temml = require('./temml.cjs');  // if in Node.js
const mathML = temml.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
```

### Preamble

To give document-wide scope to a set of macros or colors, define them in a preamble.

```js
const macros = temml.definePreamble(
    `\\newcommand\\d[0]{\\operatorname{d}\\!}
    \\def\\foo{x^2}
    \\definecolor{sortaGreen}{RGB}{128,128,0}`
);
```

Any valid [Temml macro](supported.html#macros) or [\definecolor](supported.html#style-color-size-and-font)
may be written into a preamble. Then include the resulting macros in the Temml options.

### Options

You can provide an object of options as the last argument to `temml.render` and `temml.renderToString`. For example:

```js
temml.render(
  "c = \\pm\\sqrt{a^2 + b^2}",
  element, 
  { displayMode: true,  macros }
);
```

Available options are:

- `displayMode`: `boolean`. If `true` the math will be rendered in display mode, which will put the math in display style (so `\int` and `\sum` are large, for example), and will center the math on the page on its own line. If `false` the math will be rendered in inline mode. (default: `false`)

- `macros`: `object`. A collection of custom macros. The easy way to create them is via a preamble, noted just above. Alternatively, you can provide a set of key-value pairs in which each key is a new Temml function name and each value is the expansion of the macro.  Example: `macros: {"\\R": "\\mathbb{R}"}`.

- `annotate`: `boolean`. If `true`, Temml will include an `<annotation>` element that contains the input TeX string. (default: `false`)

- `wrap`: (`"tex"` | `"="` | `"none"`).  A mode for soft line breaks in non-display
  mode math. The `tex` option sets a soft line break after every top-level relation and
  binary operator, per _The TeXbook_, page 173. The `=` option sets a soft line
  break before the second and subsequent top-level `=` signs. `tex` is the default.

  Caveats: Soft line breaks work in Chromium and Firefox, but do not work in WebKit or Safari.
  Display mode math gets no soft line breaks. Annotated math gets no soft line
  breaks. If a writer sets a hard line break via `\\` or `\cr`, then Temml will
  not set any soft line breaks in that expression.

- `leqno`: `boolean`. If `true`, display math has `\tag`s rendered on the left instead of the right, like `\usepackage[leqno]{amsmath}` in LaTeX. (default: `false`)

- `colorIsTextColor`: `boolean`. In LaTeX, `\color` is a switch, but in early versions of MathJax and KaTeX, `\color` applied its color to a second argument, the way that LaTeX `\textcolor` works. Set option `colorIsTextColor` to `true` if you want `\color` to work like early MathJax or KaTeX. (default: `false`)

- 'throwOnError': `boolean`. If true, Temml will throw parse errors to the console. If false, Temml will write the parse error to the output of the `render()` function. (default: false)

- `errorColor`: `string`. A color string given in the format `"#XXX"` or `"#XXXXXX"`. This option determines the color that unsupported commands and invalid LaTeX are rendered in. (default: `#b22222`)

- `maxSize`: `[number, number]`. This provides a way to cap all user-specified sizes, e.g. in `\rule{500em}{500em}`. The first number is the cap in `em` units, which will be applied to user-specified relative units. The second number is the cap in CSS `pt` units, which will be applied to user-specified absolute units. The default is `[Infinity, Infinity]`, which allows users to make elements and spaces arbitrarily large.

- `maxExpand`: `number`. Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. (`\edef` expansion counts all expanded tokens.) If set to `Infinity`, the macro expander will try to fully expand as in LaTeX. (default: 1000)

- `strict`: `boolean`. If `false` (similar to MathJax), allow features that make writing LaTeX convenient but are not actually supported by LaTeX. If `true` (LaTeX faithfulness mode), throw an error for any such transgressions. (default: `false`)

- `xml`: `boolean`. If `true`, Temml will write a namespace into the `<math>` element. That namespace is `xmlns="http://www.w3.org/1998/Math/MathML"`. Such a namespace is unnecessary for modern browsers but can be helpful for other user agents, such as Microsoft Word. (default: `false`)

- `trust`: `boolean` or `function` (default: `false`). If `false` (do not trust input), prevent any commands like `\includegraphics` that could enable adverse behavior, rendering them instead in `errorColor`. If `true` (trust input), allow all such commands. Provide a custom function `handler(context)` to customize behavior depending on the context (command, arguments e.g. a URL, etc.).  A list of possible contexts:

  - `{command: "\\url", url, protocol}`\
    where `protocol` is a lowercased string like `"http"` or `"https"`
    that appears before a colon, or `"_relative"` for relative URLs.
  - `{command: "\\href", url, protocol}`
  - `{command: "\\includegraphics", url, protocol}`
  - `{command: "\\class", class}`
  - `{command: "\\id", id}`
  - `{command: "\\style", style}`
  - `{command: "\\data", attributes}`

  Here are some sample trust settings:

  - Forbid specific command: `trust: (context) => context.command !== '\\includegraphics'`
  - Allow specific command: `trust: (context) => context.command === '\\url'`
  - Allow multiple specific commands: `trust: (context) => ['\\url', '\\href'].includes(context.command)`
  - Allow all commands with a specific protocol: `trust: (context) => context.protocol === 'http'`
  - Allow all commands with specific protocols: `trust: (context) => ['http', 'https', '_relative'].includes(context.protocol)`
  - Allow all commands but forbid specific protocol: `trust: (context) => context.protocol !== 'file'`
  - Allow certain commands with specific protocols: `trust: (context) => ['\\url', '\\href'].includes(context.command) && ['http', 'https', '_relative'].includes(context.protocol)`

## Post Process

The `postProcess` function implements the AMS functions `\ref` and `\label`.
It should be called outside of any loop.

The main Temml functions, `temml.render` and `temml.renderToString`, each
operate on only one element at a time. In contrast, the `postProcess` function
makes two passes through the entire document. If you choose not to support
`\ref`, `postProcess` can be omitted.

If Temml is used server-side, `\ref` and `\label` are still implemented at
runtime with client-side JavaScript. A small file, `temmlPostProcess.js`, is
provided to be installed in place of `temml.min.js`. It exposes one function:

```
temml.postProcess(document.body)
```

If you do not provide a runtime `postProcess`, everything in Temml will work except `\ref`.

If you use the [auto-render extension][], it includes the post-processor nuances.

[auto-render extension]: https://github.com/ronkok/Temml/tree/main/contrib/auto-render

# Fonts

Temml has several different pre-written CSS files. You should use only one and
by that choice, you also choose a math font. There are several math fonts
available and each has different advantages.

**Latin Modern** will provide the best quality rendering. It is a clone of
Computer Modern and so is very home-like for readers accustomed to LaTeX
documents. For best results, you must also serve a small
(10kb) `Temml.woff2` file. Then you’ll get support for `\mathscr{…}` and you’ll
get primes at the correct vertical alignment in Chrome and Edge.

**Temml-Local.css** is the light-weight option. It calls two fonts: _Cambria
Math_, which comes pre-installed in Windows, or _STIX TWO_, which comes
pre-installed in iOS and MacOS (as of Safari 16). It also needs to be augmented
with `Temml.woff2`.

Sadly, this option has rendering issues. Chrome botches extensible arrows and it
will fail to stretch the `∫` symbol on Windows. Android does not currently
provide a font with a MATH table, so it has many problems.

**Asana** and **Libertinus** have some of the same rendering problems as Cambria Math,
although Asana does contain its own roundhand glyphs.

**Fira Math** is a sans-serif math font.

Several other math fonts exist and you can try them out at Frédéric Wang’s
[Mathematical OpenType Fonts][].

Where to find font files:

- Temml.woff2 can be downloaded with the latest Temml [release][].
- STIXTwoMath-Regular.woff2 is located at the STIX [repository][STIX].
- LibertinusMath-Regular.woff2 is located at the Libertinus [repository][Libertinus].
- The other fonts can be downloaded at [Mathematical OpenType Fonts][].

[release]: https://github.com/ronkok/Temml/releases
[STIX]: https://github.com/stipub/stixfonts/blob/master/fonts/static_otf_woff2/STIXTwoMath-Regular.woff2
[Libertinus]: https://github.com/alerque/libertinus
[Mathematical OpenType Fonts]: https://fred-wang.github.io/MathFonts/

If you want a different math font size, you can add a rule to your own page's
CSS, like this example:

```css
math { font-size: 125%; }
```

# Equation numbering

In order to place automatic equation numbering in certain AMS environments,
Temml contains these CSS rules:

```
.tml-eqn::before {
  counter-increment: tmlEqnNo;
  content: "(" counter(tmlEqnNo) ")";
}
body { counter-reset: tmlEqnNo; }
```

You can overwrite the `content` rule to produce customized equation numbers.
For instance, if chapter three of your book is in its own html file, that file’s
`<head>` could contain:

```
<style>
   .tml-eqn::before { content: "(3." counter(tmlEqnNo) ")"; }
</style>
```

Then the automatic equation numbering in that chapter would look like: (3.1)

If your site does not render automatic numbering properly, check if your other
CSS has overwritten the Temml counter-reset.

# Extensions

More Temml functionality can be added via the following extensions:

* [auto-render][]: Find and render all math in a running HTML page.
* [copy-tex][]: When users select and copy <math> elements, copies their LaTeX source to the clipboard
* [mhchem][]: Write beautiful chemical equations easily.
* [physics][]: Implement much of the LaTeX `physics` package.
* [texvc][]: Support functions used in wikimedia.

[auto-render]: https://github.com/ronkok/Temml/tree/main/contrib/auto-render
[copy-tex]: https://github.com/ronkok/Temml/tree/main/contrib/copy-tex
[mhchem]: https://github.com/ronkok/Temml/tree/main/contrib/mhchem
[physics]: https://github.com/ronkok/Temml/tree/main/contrib/texvc
[texvc]: https://github.com/ronkok/Temml/tree/main/contrib/texvc

To install extensions for browser use, include the appropriate file from the
`contrib` folder of the Temml repository. Then reference the file in the
`<head>` of the HTML page. As in this `mhchem` example:

```html
  <head>
    ...
    <link rel="stylesheet" href="./Temml-Local.css">
    <script src="./temml.min.js"></script>
    <script src="./mhchem.min.js"></script>
  </head>
```

The extension reference must come after the reference to `temml.min.js`.

For server-side use, just use `temml.cjs` or `temml.mjs` instead of `temml.min.js`.
`temml.cjs` and `temml.mjs` both include `mhchem`, `physics`, and `texvc`.

# Security

Any HTML generated by Temml should be safe from `<script>` or other code injection attacks.

A variety of options give finer control over the security of Temml with untrusted inputs;
refer to [Options](#options) for more details.

- `maxSize` can prevent large width/height visual affronts.
- `maxExpand` can prevent infinite macro loop attacks.
- `trust` can allow certain commands that may load external resources or change
  HTML attributes and thus are not always safe (e.g., `\includegraphics` or `\class`)

# Browser Issues

If you are deciding whether to render math in MathML, know that all the major
browser engines now support MathML. If you want to revel in the sight of over
a thousand LaTeX functions rendered well in MathML, head on over to the
Temml [function support page](https://temml.org/docs/en/supported.html).

The rest of you, stay here. This section identifies functions that browsers render
poorly.

| Item                     | Chromium | Gecko<br>(Firefox) | WebKit<br>(Safari) | Examples                    |
|:-----------------------------|:--------:|:---------:|:---------:|:-----------------------------------------:|
| Renders well on first paint  | ✓        | ✓         | bad¹      | $\hat{E}\;\; \overrightarrow{ABCD}$       |
| Accents                      | ✓        | ✓         | bad²      | $\hat{𝖺}$                                 |
| Integral, ∫, in display mode | meh³     | ✓         | ✓         | $\displaystyle\int \frac a b$             |
| \left( x \right)             | ✓        | ✓         | meh⁴      | $\left( x \right)$                        |
| \cancel, \bcancel, \xcancel  | meh⁵     | meh⁵      | meh⁵      | $\cancel{5}$                              |
| Tag placement                | ✓        | ✓         | poor⁶     | $$x\tag{tag}$$                            |
| Extensible arrows            | poor⁷    | ✓         | bad<sup>7, 8</sup> | $\;\;\;A \xrightharpoonup{\text{note}} B\;\;\;$  |
| Radical height               | ✓        | meh⁹      | meh⁹      | $\sqrt{f_c}$                              |
| Size 4 radicals              | meh¹⁰    | ✓         | ✓         | $\sqrt{\rule{}{6em}\kern2em}$             |
| Line-breaking                | ✓        | ✓         | bad¹¹     |                                           |
| \smash                       | ✓        | ✓         | bad¹²     | $x\smash{y}z$                             |

Notes:

1.  There are several items that WebKit places correctly only after a page refresh, or sometimes only after a back-button navigation.
    + accent height
    + accent italic correction
    + extensible accents
    + extensible arrows
    + height of ‖ in {Vmatrix} environment

2.  WebKit renders some accents too high even after a page refresh.
    Temml does some work to mitigate this. It’s not enough.

3.  Chromium does not stretch a Cambria Math ∫ in display mode. Latin Modern is okay.

4.  WebKit mis-aligns short parentheses, given a \left and \right.

5.  Because Chromium does not support `<enclose>`, Temml uses background images for
    \cancel. It may not print properly.

6.  WebKit mis-locates tags and AMS automatic equation numbers because it
    ignores `width: 100%` on an `<mtable>`.

7.  Chromium and WebKit system font extensible arrows have notes placed too high.
    Some do not stretch in Cambria Math. Again, Latin Modern is okay.

8.  WebKit fails to stretch most extensible arrows.

9.  Firefox and WebKit sometimes select radicals that are too tall. (Root cause:
    They don’t cramp subscripts and superscripts.)

10. In very tall radicals, Chromium does not accurately match the vinculum to the surd.

11. Automatic linebreaking (non-display mode) works in Chromium and Firefox. Not in WebKit.

12. WebKit hides anything inside `\smash{…}`. Root cause: WebKit does not implement
    `<mpadded>` correctly.

Another issue if you are targeting mobile: Android has not provided a math
system font. They are planning to add a MATH table to the Noto Sans font. I
don’t think it has shipped.

You can suggest revisions to this page at the Temml [issues page](https://github.com/ronkok/Temml/issues).

<br>

<p class="reduced">Copyright © 2021-2024 Ron Kok. Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></p>

<br>
</main>

<nav>
<div id="sidebar">

$\href{https://temml.org/}{\color{black}\Large\Temml}$    v0.10.27

<h3><a href="#top">Contents</a></h3>

* [Browser Support](#browser-support)
* [Installation](#installation)
* [API](#api)

    * [Overview](#overview)
    * [In Browser](#in-browser)
    * [Server Side](#server-side)
    * [Preamble](#preamble)
    * [Options](#options)
    * [Post Process](#post-process)

* [Fonts](#fonts)
* [Equation numbering](#equation-numbering)
* [Extensions](#extensions)
* [Security](#security)
* [Browser Issues](#browser-issues)

### Elsewhere

* [Supported Functions](supported.html)
* [Support Table](support_table.html)
* [Home](../../index.html)

</div>  <!-- sidebar -->
</nav>

<div id="mobile-nav">
  <!--On very small screens, the sidebar TOC is replaced by a button with a drop-down menu. -->
  <input type="checkbox" id="checkbox_toggle">
  <label for="checkbox_toggle"><svg xmlns="http://www.w3.org/2000/svg" width="25.6" height="25.6"><path d="M4.8 12.05h16v1.6h-16zM4.8 7.25h16v1.6h-16zM4.8 16.85h16v1.6h-16z"/></svg></label>
  <ul>
    <li><a href="#browser-support">Browser Support</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#api">API</a></li>
    <li><a href="#fonts">Fonts</a></li>
    <li><a href="../../index.html">Home</a></li>
  </ul>
</div>

</body>
</html>