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

### In-Browser, One Element

To render one `<math>` element into one DOM element, call `temml.render` with a TeX
expression and a DOM element to render into:

```js
temml.render("c = \\pm\\sqrt{a^2 + b^2}", element);
```

To render in display mode, the call would be:

```js
temml.render("c = \\pm\\sqrt{a^2 + b^2}", element, { displayMode: true });
```

If the element you provide is a `<math>` element, Temml will populate it.
Otherwise, it will create a new `<math>` element and make it a child
of the element you provide.

### In-Browser, Bulk

Breaking Change Notice: `renderMathInElement` is now part of `temml.js`. No
extension is necessary.

The `renderMathInElement` function is typically used to render all of the math in
the text of a running HTML document. It searches all of the text in a given element
for your chosen delimiters, and renders the math in place.

A typical call might look like this:

```js
<script>
   temml.renderMathInElement(document.main, { fences: "$+" })
</script>
```

<details><summary>Auto-render details</summary>

In an auto-render document, authors write LaTeX within math delimiters.
The default delimiters are:

- \$\$…\$\$
- \\(…\\)
- \\begin{equation}…\\end{equation}
- \\begin{equation\*}…\\end{equation*}
- \\begin{align}…\\end{align}
- \\begin{align\*}…\\end{align*}
- \\begin{alignat}…\\end{alignat}
- \\begin{alignat\*}…\\end{alignat*}
- \\begin{gather}…\\end{gather}
- \\begin{gather\*}…\\end{gather*}
- \\begin{CD}…\\end{CD}
- \\ref{…}
- \\eqref{…}
- \\[…\\]

The items beginning with `\begin{equation}` and ending with `\eqref{…}` are
from AMS LaTeX.

You can use the `fences` option to customize the recognized delimiters.

| fences<br>key | \$\$…\$\$ | \$\`…\`\$ | \$…\$ | \\\[…\\] | \\(…\\) | AMS   |
|---------------|-----------|-----------|-------|----------|---------|-------|
| default       | ✓         |           |       | ✓        | ✓       | ✓     |
| $             | ✓         | ✓         | ✓     |          |         |       |
| $+            | ✓         | ✓         | ✓     |          |         | ✓     |
| (             |           |           |       | ✓        | ✓       |       |
| (+            |           |           |       | ✓        | ✓       | ✓     |
| ams           |           |           |       |          |         | ✓     |
| all           | ✓         | ✓         | ✓     | ✓        | ✓       | ✓     |

<details><summary>…or you can use the <code>delimiters</code> option instead of the <code>fences</code> option to further customize your delimiters:</summary>

The property of a `delimiters` option is a detailed list of delimiters. Here is the default:

```
delimiters: [
  { left: "$$", right: "$$", display: true },
  { left: "\\(", right: "\\)", display: false },
  { left: "\\begin{equation}", right: "\\end{equation}", display: true },
  { left: "\\begin{equation*}", right: "\\end{equation*}", display: true },
  { left: "\\begin{align}", right: "\\end{align}", display: true },
  { left: "\\begin{align*}", right: "\\end{align*}", display: true },
  { left: "\\begin{alignat}", right: "\\end{alignat}", display: true },
  { left: "\\begin{alignat*}", right: "\\end{alignat*}", display: true },
  { left: "\\begin{gather}", right: "\\end{gather}", display: true },
  { left: "\\begin{gather*}", right: "\\end{gather*}", display: true },
  { left: "\\begin{CD}", right: "\\end{CD}", display: true },
  { left: "\\[", right: "\\]", display: true }
];
```

If you want to add support for inline math via `$…$`, be sure to list it
**after** `$$…$$`. Because rules are processed in order, putting a `$` rule first would
match `$$` and treat as an empty math expression.

</details>

The `renderMathInElement` function recognizes an options object as it’s second argument. This
is demonstrated above with `fences`. The options argument can include any [option](#options)
used by the `temml.render` function. It also recognizes `fences` or `delimiters` and the
following options:

- `ignoredTags`: This is a list of DOM node types to ignore when recursing
  through. The default value is
  `["script", "noscript", "style", "textarea", "pre", "code", "option"]`.

- `ignoredClasses`: This is a list of DOM node class names to ignore when
  recursing through. By default, this value is not set.

- `errorCallback`: A callback method returning a message and an error stack
  in case of an critical error during rendering. The default uses `console.error`.

- `preProcess`: A callback function, `(math: string) => string`, used to process
  math expressions before rendering.

</details>

### Server-Side

To generate a `<math>` element on the server or to generate an MathML string of the
rendered math, you can use `temml.renderToString`:

```js
const temml = require('./temml.cjs');  // if in Node.js
const mathML = temml.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
```

...and for display mode:

```js
const mathML = temml.renderToString("c = \\pm\\sqrt{a^2 + b^2}", { displayMode: true });
```

### Macro persistence

Authors can write their own macros, but you decide whether macros should
persist between calls to `temml.render`.

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

<details><summary>Available options are:</summary>

- `displayMode`: `boolean`. If `true` the math will be rendered in display mode, which will put the math in display style (so `\int` and `\sum` are large, for example), and will center the math on the page on its own line. If `false` the math will be rendered in inline mode. (default: `false`)

- `macros`: `object`. A collection of custom macros. The easy way to create them is via a preamble, noted just above. Alternatively, you can provide a set of key-value pairs in which each key is a new Temml function name and each value is the expansion of the macro.  Example: `macros: {"\\R": "\\mathbb{R}"}`.

- `annotate`: `boolean`. If `true`, Temml will include an `<annotation>` element that contains the input TeX string. Note: `annotate` must be true if you want the `copy-tex` extension to be effective. Also note: Auto-linebreaks will not work if annotation is true. (default: `false`)

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

</details>

## \ref and \eqref

If you are using `temml.renderMathInElement`, you can ignore this section.
`renderMathInElement` handles this automatically.

The `postProcess` function implements the AMS functions `\ref` and `\eqref`.
It should be called outside of any loop.

The main Temml functions, `temml.render` and `temml.renderToString`, each
operate on only one element at a time. In contrast, the `postProcess` function
makes two passes through the entire document. One pass finds the `\labels`
written in a document and the second pass populates `\ref` and `\eqref` with the
tags or auto-numbers associated with each label.

If you choose not to support `\ref` and `\eqref`, `postProcess` can be omitted.

If Temml is used server-side, `\ref` and `\eqref` are still implemented at
runtime with client-side JavaScript. A small file, `temmlPostProcess.js`, is
provided to be installed in place of `temml.min.js`. It exposes one function:

```
temml.postProcess(document.body)
```

If you do not provide a runtime `postProcess`, everything in Temml will work
except `\ref` and `\eqref`.

## Version

To get the current version of Temml running in the browser, open the console and type:

```
temml.version
```

# Fonts

Temml has several different pre-written CSS files. You should use only one and
by that choice, you also choose a math font. There are several math fonts
available and each has different advantages.

**Latin Modern** will provide the best quality rendering. It is a clone of
Computer Modern and so is very home-like for readers accustomed to LaTeX
documents. For best results, you must also serve a small
(10kb) `Temml.woff2` file. Then you’ll get support for `\mathscr{…}` and you’ll
get primes at the correct vertical alignment in Chrome and Edge.

**Temml-Local.css** is the light-weight option. It calls three fonts: _Cambria
Math_, which comes pre-installed in Windows, _STIX TWO_, which comes
pre-installed in iOS and MacOS (as of Safari 16), or _NotoSans Math_, which I
think comes pre-installed in Android. The first two need to be augmented with `Temml.woff2`.

Sadly, this option has rendering issues. Chrome botches extensible arrows and it
will fail to stretch the `∫` symbol on Windows.

**Asana** and **Libertinus** have some of the same rendering problems as Cambria Math,
although Asana does contain its own roundhand glyphs.

**NotoSans Math** is a sans-serif math font from Google. I think it comes bundled with Android.
Chromium fails to stretch extensible arrows in this font. NOTE: Temml’s NotoSans
CSS file calls the `ttf` version of the font, not the `woff2` version. The `woff2` version
has many rendering issues.

Several other math fonts exist and you can try them out at Frédéric Wang’s
[Mathematical OpenType Fonts][].

Where to find font files:

- Temml.woff2 can be downloaded with the latest Temml [release][].
- STIXTwoMath-Regular.woff2 is located at the STIX [repository][STIX].
- LibertinusMath-Regular.woff2 is located at the Libertinus [repository][Libertinus].
- NotoSansMath-Regular.ttf is located at the NotoSansMath [repository][Noto].
- The other fonts can be downloaded at [Mathematical OpenType Fonts][].

[release]: https://github.com/ronkok/Temml/releases
[STIX]: https://github.com/stipub/stixfonts/blob/master/fonts/static_otf_woff2/STIXTwoMath-Regular.woff2
[Libertinus]: https://github.com/alerque/libertinus
[Noto]: https://github.com/notofonts/math
[Mathematical OpenType Fonts]: https://fred-wang.github.io/MathFonts/

If you want a different math font size, you can add a rule to your own page’s
CSS, like this example:

```css
math { font-size: 125%; }
```

# Equation numbering

In order to place automatic equation numbers in certain AMS environments,
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

* [copy-tex][]: When users select and copy `<math>` elements, copies their LaTeX source to the clipboard
* [mhchem][]: Write beautiful chemical equations easily.
* [physics][]: Implement much of the LaTeX `physics` package.
* [texvc][]: Support functions used in wikimedia.

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

For server-side use, use `temml.cjs` or `temml.mjs` instead of `temml.min.js`.
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

+------------------------------+----------+-----------+-----------+-------------------------------------+
| Item                         | Chromium | Gecko \   | WebKit \  | Examples                            |
|                              |          | (Firefox) | (Safari)  |                                     |
+:=============================+:========:+:=========:+:=========:+:===================================:+
| Renders well on first paint  | ✓        | ✓         | bad¹      | $\vec{E}$                           |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Accents                      | ✓        | ✓         | bad²      |  $\hat{𝖺}$                         |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Integral, ∫, in display mode | meh³     | ✓         | ✓         | $\displaystyle\int \frac a b$       |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| \left( x \right)             | ✓        | ✓         | meh⁴      | $\left( x \right)$                  |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Tag placement                | ✓        | ✓         | poor⁵     | $$x\tag{tag}$$                      |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Extensible arrows            | poor⁶    | ✓         | poor⁶     | $A \xrightharpoonup{\text{note}} B$ |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Radical height               | ✓        | meh⁷      | meh⁷      | $\sqrt{f_c}$                        |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Size 4 radicals              | meh⁸     | ✓         | ✓         | $\sqrt{\rule{}{6em}\kern2em}$       |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Line-breaking                | ✓        | ✓         | bad⁹      |                                     |
+------------------------------+----------+-----------+-----------+-------------------------------------+
|\smash, \mathllap, \mathrlap,\| ✓        | ✓         | bad¹⁰     | $x\smash{y}z$                       |
| CD environment               |          |           |           |                                     |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Flattened circumflex accent  | poor¹¹   | poor¹¹    | poor¹¹    | $\hat{a}$                           |
+------------------------------+----------+-----------+-----------+-------------------------------------+
| Stretchy parentheses in      | bad¹²    | ✓         | bad¹²     |                                     |
| NotoSans Math                |          |           |           |                                     |
+------------------------------+----------+-----------+-----------+-------------------------------------+

Notes:

1.  WebKit renders some things correctly only after a page refresh.

2.  WebKit renders some accents too high.
    Temml does some work to mitigate this. It’s not enough.

3.  Chromium does not stretch a Cambria Math ∫ in display mode. Latin Modern is okay.

4.  WebKit mis-aligns short parentheses, given a \left and \right.

5.  WebKit mis-locates tags and AMS automatic equation numbers because it
    ignores `width: 100%` on an `<mtable>`.

6.  Chromium and WebKit system font extensible arrows have notes placed too high.
    Some do not stretch in Cambria Math or NotoSans. Again, Latin Modern is okay.

7.  Firefox and WebKit sometimes select radicals that are too tall. (Root cause:
    They don’t cramp subscripts and superscripts.)

8.  In very tall radicals, Chromium does not accurately match the vinculum to the surd.

9.  Automatic linebreaking (non-display mode) works in Chromium and Firefox. Not in WebKit.

10. WebKit fails to render anything inside the `<mpadded>` element.

11. All browsers fail to flatten a circumflex accent in any font other than Latin Modern.

12. Chromium does not stretch delimiters in NotoSans Math. WebKit does not stretch parentheses
    or arrows.

You can suggest revisions to this page at the Temml [issues page](https://github.com/ronkok/Temml/issues).

<br>

<p class="reduced">Copyright © 2021-2025 Ron Kok. Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></p>

<br>
</main>

<nav>
<div id="sidebar">

$\href{https://temml.org/}{\color{black}\Large\Temml}$    v0.11.02

<h3><a href="#top">Contents</a></h3>

* [Browser Support](#browser-support)
* [Installation](#installation)
* [API](#api)

    * [In-Browser, One Element](#in-browser-one-element)
    * [In-Browser, Bulk](#in-browser-bulk)
    * [Server-Side](#server-side)
    * [Macro Persistence](#macro-persistence)
    * [Preamble](#preamble)
    * [Options](#options)
    * [\ref and \eqref](#\ref-and-\eqref)
    * [Version](#version)

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