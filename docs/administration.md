<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Temml Administration</title>
   <link rel="stylesheet" href="../docStyles.css">
</head>

<body>
<main id="main" class="latin-modern">

# Temml Administration

# Browser Support

Temml works in browsers that support MathML. This includes Firefox and Safari.
It will [soon](https://www.igalia.com/2021/08/09/MathML-Progress.html) include
Chrome, Edge, Opera, Brave, and Vivaldi.\
Temml will never work in Internet Explorer.

# Installation

You can download Temml files from the [dist folder][] of the Temml repository
and serve them from your own site. The minimum browser  installation needs the
following files. The `css` file and font file must be in the same folder.

[dist folder]: https://github.com/ronkok/Temml/tree/main/dist

* temml.min.js
* Temml-Local.css
* Temml.woff2

A server-side installation should include `temml.cjs.js` instead of `temml.min.js`.

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

Say that you have an HTMLCollection of elements whose contents should be converted from TeX
strings to math. And also say that you wish to define two macros and a color with document-wide
scope. The code for such a conversion might look like this:

```js
// Optional preamble.
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

Below, we examine the parts of that code.

### In-Browser

To render math in one DOM element, call `temml.render` with a TeX expression
and a DOM element to render into:

```js
temml.render("c = \\pm\\sqrt{a^2 + b^2}", element);
```

### Server-Side

To generate MathML on the server or to generate an MathML string of the
rendered math, you can use `temml.renderToString`:

```js
const temml = require('./temml.cjs.js');  // if in Node.js
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
- `annotate`: `boolean`. If `true`, Temml will include an `<annotation>` element that contains the input TeX string. Note: this will defeat [soft line breaks](./supported.html#line-breaks) in Firefox. (default: `false`)
- `elementIsMath`: `boolean`. When you call the `temml.render()` function, you pass an `element` as an argument to the function. If that `element` is a span, then allow `elementIsMath` to remain `false` (the default), and Temml will create a new `<math>` element inside the span. It you pass a `<math>` element as the argument, then set `elementIsMath` to `true`. Then Temml will populate it with math contents. 
- `leqno`: `boolean`. If `true`, display math has `\tag`s rendered on the left instead of the right, like `\usepackage[leqno]{amsmath}` in LaTeX. (default: `false`)
- `preventTagLap`: `boolean`. This option affects the horizontal alignment of `displayMode` math and `\tag`s. The default (`false`) acts in the LaTeX manner and centers the math. That’s good in a wide container, but if the container is narrow, the tag will overlap the math. The `preventTagLap: true` option acts differently. It will first place the tag and then center the math in the remainder of the container, with no overlap. If you are targeting mobile, `preventTagLap: true` is probably a good choice .
- `colorIsTextColor`: `boolean`. In LaTeX, `\color` is a switch, but in early versions of MathJax and KaTeX, `\color` applied its color to a second argument, the way that LaTeX `\textcolor` works. Set option `colorIsTextColor` to `true` if you want `\color` to work like early MathJax or KaTeX. (default: `false`)
- `errorColor`: `string`. A color string given in the format `"#XXX"` or `"#XXXXXX"`. This option determines the color that unsupported commands and invalid LaTeX are rendered in. (default: `#b22222`)
- `maxSize`: `number`. All user-specified sizes, e.g. in `\rule{500em}{500em}`, will be capped to `maxSize` ems. If set to `Infinity` (the default), users can make elements and spaces arbitrarily large.
- `maxExpand`: `number`. Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to `Infinity`, the macro expander will try to fully expand as in LaTeX. (default: 1000)
- `strict`: `boolean`. If `false` (similar to MathJax), allow features that make writing LaTeX convenient but are not actually supported by LaTeX. If `true` (LaTeX faithfulness mode), throw an error for any such transgressions. (default: `false`)
- `xml`: `boolean`. If `true`, Temml will write a namespace into the `<math>` element. That namespace is `xmlns="http://www.w3.org/1998/Math/MathML"`. Such a namespace is unnecessary for modern browsers but may be helpful for other user agents. (default: `false`)
- `trust`: `boolean` or `function` (default: `false`). If `false` (do not trust input), prevent any commands like `\includegraphics` that could enable adverse behavior, rendering them instead in `errorColor`. If `true` (trust input), allow all such commands. Provide a custom function `handler(context)` to customize behavior depending on the context (command, arguments e.g. a URL, etc.).  A list of possible contexts:

  - `{command: "\\url", url, protocol}`
  - `{command: "\\href", url, protocol}`
  - `{command: "\\includegraphics", url, protocol}`
  - `{command: "\\htmlClass", class}`
  - `{command: "\\htmlId", id}`
  - `{command: "\\htmlStyle", style}`
  - `{command: "\\htmlData", attributes}`

  Here are some sample trust settings:

  - Forbid specific command: `trust: (context) => context.command !== '\\includegraphics'`
  - Allow specific command: `trust: (context) => context.command === '\\url'`
  - Allow multiple specific commands: `trust: (context) => ['\\url', '\\href'].includes(context.command)`
  - Allow all commands with a specific protocol: `trust: (context) => context.protocol === 'http'`
  - Allow all commands with specific protocols: `trust: (context) => ['http', 'https', '_relative'].includes(context.protocol)`
  - Allow all commands but forbid specific protocol: `trust: (context) => context.protocol !== 'file'`
  - Allow certain commands with specific protocols: `trust: (context) => ['\\url', '\\href'].includes(context.command) && ['http', 'https', '_relative'].includes(context.protocol)`

## Post Process

The `postProcess` function implements the AMS functions `\ref` and `\label`. It should be called outside of any loop.

Unlike other Temml functions, the `postProcess` function makes two passes through the entire document. In contrast, `temml.render` and `temml.renderToString` each operate on only one element at a time. If you choose not to support `\ref`, `postProcess` can be omitted.

If Temml is used server-side, `\ref` and `\label` are still implemented at runtime with client-side JavaScript. A small file, `temmlPostProcess.js`, is provided to be installed in place of `temml.min.js`. It exposes one function:

```
temml.postProcess(document.body)
```

If you do not do a runtime `postProcess`, everthing in Temml will work except `\ref`.

If you use the [auto-render extension](#auto-render-extension), it includes the post-processor nuances.

# Fonts

Temml has several different pre-written CSS files. You should use only one and by that choice, you also choose a math font. There are several math fonts available and each has different advantages.

**Cambria Math** comes pre-installed in Windows, Macs, and iOS, so it is the light-weight option. Cambria Math lacks roundhand glyphs, so you still have to serve a small (12 kb) font, `Temml.woff2`, in order to support `\mathscr{…}`. Sadly, Cambria Math radicals are sometimes too tall for their content. And its integration symbols are too tall for my taste. Otherwise, this would be a good choice.

**Latin Modern** is a clone of Computer Modern and so is very home-like for readers accustomed to LaTeX documents. Rendering is excellent except that some line thicknesses may be too thin for some screens. This option also needs that additional 12kb `Temml.woff2` file in order to support `\mathscr{…}`.

**Asana**, **STIX TWO**, and **XITS** can be served without the `Temml.woff2` file.

Several other math fonts exist and you can try them out at Frédéric Wang’s [Mathematical OpenType Fonts][].

Where to find font files:

- Temml.woff2 can be found in the Temml [dist folder][].
- STIXTwoMath-Regular.woff2 is located at the STIX [repository](https://github.com/stipub/stixfonts/blob/master/fonts/static_otf_woff2/STIXTwoMath-Regular.woff2).
- The other fonts can be downloaded at [Mathematical OpenType Fonts][].

[Mathematical OpenType Fonts]: https://fred-wang.github.io/MathFonts/

If you want a different math font size, you can edit add a rule to your own page's CSS, like this example:

```css
math { font-size: 125%; }
```

# Auto-numbering

In order to place automatic numbering in certain AMS environments, Temml contains a CSS rule:

```
body { counter-reset: tmlEqnNo; }
```

If your site does not render automatic numbering properly, check if your other CSS has overwritten the Temml counter-reset.

# Auto-Render Extension

The auto-render extension is a client-side JavaScript function that can automatically
render all of the math inside of text. It searches all of the text nodes within a given 
element for the specified delimiters, ignoring certain tags like `<pre>`, and renders the math in place.

This extension isn't part of Temml proper, so the script needs to be included
(via a `<script>` tag) in the page along with Temml itself.  For example:

```html
<head>
   ...
<link rel="stylesheet" href="./Temml-Local.css">
<script src="./temml.min.js"></script>
<script src="./auto-render.min.js"></script>
  ...
</head>
<body>
  ...
<script>renderMathInElement(document.body);</script>
</body>
```

The auto-render extension exposes a single function, `window.renderMathInElement`, with
the following API:

```js
function renderMathInElement(elem, options)
```

`elem` is an HTML DOM element. The function will recursively search for text
nodes inside this element and render the math in them.

`options` is an optional object argument that can have the same keys as [the
options passed to `temml.render`](#options), in addition to two auto-render-specific keys:

- `delimiters`: This is a list of delimiters to look for math, processed in
  the same order as the list. Each delimiter has three properties:

    - `left`: A string which starts the math expression (i.e. the left delimiter).
    - `right`: A string which ends the math expression (i.e. the right delimiter).
    - `display`: A boolean of whether the math in the expression should be
      rendered in display mode or not.

  The default `delimiters` value is:

  ```js
  [
    { left: "$$", right: "$$", display: true },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\begin{equation}", right: "\\end{equation}", display: true },
    { left: "\\begin{align}",    right: "\\end{align}", display: true },
    { left: "\\begin{alignat}",  right: "\\end{alignat}", display: true },
    { left: "\\begin{gather}",   right: "\\end{gather}", display: true },
    { left: "\\begin{CD}",       right: "\\end{CD}", display: true },
    { left: "\\begin{multline}", right: "\\end{multline}", display: true },
    { left: "\\[", right: "\\]", display: true }
  ]
  ```

  If you want to add support for inline math via `$…$`, be sure to list it
  *after* `$$…$$`. Because rules are processed in order, putting a `$` rule first would
  match `$$` and treat as an empty math expression. Here is an example that includes `$…$`: 

  ```js
  [
    {left: "$$", right: "$$", display: true},
    // Put $ after $$.
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false},
    // Put \[ last to avoid conflict with possible future \\[1em] row separator.
    {left: "\\[", right: "\\]", display: true}
  ]
  ```

- `ignoredTags`: This is a list of DOM node types to ignore when recursing
  through. The default value is
  `["script", "noscript", "style", "textarea", "pre", "code", "option"]`.

- `ignoredClasses`: This is a list of DOM node class names to ignore when
  recursing through. By default, this value is not set.

- `errorCallback`: A callback method returning a message and an error stack
  in case of an critical error during rendering. The default uses `console.error`.

- `preProcess`: A callback function, `(math: string) => string`, used to process
  math expressions before rendering.

# Extensions

More Temml functions can be added via the following extensions:

* `mhchem`: Write beautiful chemical equations easily.
* `physics`: Implements much of the LaTeX `physics` package.
* `texvc`: Provides functions used in wikimedia.

To install extensions for browser use, include the appropriate file from the `contrib` folder of the Temml repository. Then reference the file in the `<head>` of the HTML page. As in this `mhchem` example:

```html
  <head>
    ...
    <link rel="stylesheet" href="./Temml-Local.css">
    <script src="./temml.min.js"></script>
    <script src="./mhchem.min.js"></script>
  </head>
```

The extension reference must come after the reference to `temml.min.js`.

For server-side use, just use `temml.cjs.js` instead of `temml.min.js`. `temml.cjs.js` includes `mhchem`, `physics`, and `texvc`.

<br>

<p class="reduced">Copyright © 2021 Ron Kok. Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></p>

<br>

</main>

<nav>
<div id="sidebar">

$`\href{https://temml.org/}{\color{black}\Large\Temml}`   v0.4.0

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
* [Auto-numbering](#auto-numbering)
* [Auto-Render Extension](#auto-render-extension)
* [Extensions](#extensions)

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