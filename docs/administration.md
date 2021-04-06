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

Temml works in browsers that support MathML. This includes Firefox and Safari. It will [soon](https://mathml.igalia.com/) include Chrome, Edge, Opera, Brave, and Vivaldi. Temml will never work in Internet Explorer.

# Installation

You can download Temml files from the [`dist` folder](https://github.com/ronkok/Temml/dist/) of the Temml repository and serve them from your own site. The minimum browser  installation needs the following files. The `css` file and font file must be in the same folder.

* temml.css
* temml.min.js
* KaTeX_Script-Regular.woff2

A server-side installation should include `temml.cjs.js` instead of `temml.min.js`.

#### Starter template

```html
<!DOCTYPE html>
<!-- Temml requires the use of the HTML5 doctype. -->
<html>
    <head>
        ...
        <link rel="stylesheet" href="./temml.css">
        <script src="./temml.min.js"></script>
    </head>
    ...
</html>
```

# API

### In-Browser

Call `temml.render` with a TeX expression and a DOM element to render into:

```js
temml.render("c = \\pm\\sqrt{a^2 + b^2}", element);
```

### Server-Side

To generate HTML on the server or to generate an HTML string of the rendered math, you can use `temml.renderToString`:

```js
const temml = require('./temml.cjs.js');  // if in Node.js
const html = temml.renderToString("c = \\pm\\sqrt{a^2 + b^2}");
```

### Options

You can provide an object of options as the last argument to [`temml.render` and `temml.renderToString`](#api). For example:

```js
const macros = {};
temml.render(
  "c = \\pm\\sqrt{a^2 + b^2}",
  element, 
  { displayMode: true,  macros }
);
```

Available options are:

- `displayMode`: `boolean`. If `true` the math will be rendered in display mode, which will put the math in display style (so `\int` and `\sum` are large, for example), and will center the math on the page on its own line. If `false` the math will be rendered in inline mode. (default: `false`)
- `macros`: `object`. A collection of custom macros. Each macro is a key-value pair in which the key is a new Temml function name and the value is the expansion of the macro.  Example: `macros: {"\\R": "\\mathbb{R}"}`.
  
  If you do not pre-define any macros, provide an empty macros object. This enables user-created persistent `\gdef` macros. See the [macros](#persistent-macros-and-ref) example below.
- `leqno`: `boolean`. If `true`, display math has `\tag`s rendered on the left instead of the right, like `\usepackage[leqno]{amsmath}` in LaTeX.
- `colorIsTextColor`: `boolean`. In LaTeX, `\color` is a switch, but tn early versions of MathJax and KaTeX, `\color` applied its color to a second argument, the way that LaTeX `\textcolor` works. Set option `colorIsTextColor` to `true` if you want `\color` to work like early MathJax or KaTeX. Default is `false.`
- `errorColor`: `string`. A color string given in the format `"#XXX"` or `"#XXXXXX"`. This option determines the color that unsupported commands and invalid LaTeX are rendered in. (default: `#b22222`)
- `maxSize`: `number`. All user-specified sizes, e.g. in `\rule{500em}{500em}`, will be capped to `maxSize` ems. If set to `Infinity` (the default), users can make elements and spaces arbitrarily large.
- `maxExpand`: `number`. Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to `Infinity`, the macro expander will try to fully expand as in LaTeX. (default: 1000)
- `strict`: `boolean`. If `false` (similar to MathJax), allow features that make writing LaTeX convenient but are not actually supported by LaTeX. If `true` (LaTeX faithfulness mode), throw an error for any such transgressions. (default = `false`) 
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

## Persistent Macros and \ref

Temml’s [macro documentation](supported.html#gdef) tells the author that `\gdef` will create a macro that persists between Temml elements. In order to enable that persistence, you must create one shared `macros` object that you pass into every call to `temml.render` or `temml.renderToString`. (Do not create a fresh `macros` object for each call.)

For example, suppose that you have an array `mathElements` of DOM elements that contain math. Then you could write this code:

```js
const macros = {};
for (let element of mathElements) {
    temml.render(element.textContent, element, { macros });
}
temml.postProcess(document.body);
```
Notice that you create the `macros` object outside the loop. If an author uses `\gdef`, Temml will insert that macro definition into the `macros` object and since `macros` continues to exist between calls to `temml.render`, `\gdef` macros will persist between `mathElements`.

`macros` can be omitted if you choose not to support persistent macros.

The `postProcess` function implements the AMS functions `\ref` and `\label`. It should also be called outside the loop

`temml.render` and `temml.renderToString` each operate on only one element at a time. In contrast, the `postProcess` function makes two passes throught the entire document. `postProcess` can be omitted if you choose not to support `\ref.`

Next, a server-side example. Say that you have written a Markdown document with math delimited by `$…$` or `$$…$$`. And say that you have an array of matches to the math. Then you could render the math so:

```js
const macros = {};
for (let i = matches.length - 1; i >= 0; i--) {
    const displayMode = matches[i].value.slice(0, 2) === "$$";
    const delimLength = displayMode ? 2 : 1;
    const tex = matches[i].value.slice(delimLength, -delimLength).trim();
    const mathML =  temml.renderToString(tex, { displayMode, macros });
    str = str.slice(0, matches[i].index) + mathML + str.slice(matches[i].lastindex);
}
```

If Temml is used server-side, `\ref` and `\label` are still implemented at runtime with client-side JavaScript. A small file, `temmlPostProcess.js`, is provided to be installed in place of `temml.min.js`. It exposes one function:

```
temml.postProcess(document body)
```

If you do not do a runtime `postProcess`, everthing in Temml will work except `\ref`.

If you use the [auto-render extension](#auto-render-extension), it includes the `macros` and post-processor nuances.

### Security of Persistent Macros

Persistent macros can change the behavior of Temml (e.g. redefining standard commands), so for security, such a setup should be used only for multiple elements of common trust.  For example, you might enable persistent macros within a message posted by a single user (by creating a `macros` object for that message), but you probably should not enable persistent macros across multiple messages posted by multiple users.

# Fonts

In Temml, you can choose a math font from several different options. Each has different advantages.

**Local fonts** are the light-weight option. The fastest font is the one you don’t have to serve. `temml.css` is written to prefer these fonts:

* **Cambria Math** comes pre-installed in Windows, Macs, and iOS. It lacks roundhand glyphs, so you still have to serve a small (12 kb) font in order to support `\mathscr{…}`. The roundhand font file is a KaTeX font, which is a clone of a MathJax font, which is a clone of Computer Modern.

* **Noto** is an Android font. I have not yet done much testing with it.

* I don’t know what system fonts are common in \*nix.

**Latin Modern** is a clone of Computer Modern and so is very home-like for readers accustomed to LaTeX documents. Rendering is excellent except that some line thicknesses may be too thin for some screens. The woff2 version of Latin Modern is a 380 kb file. This option also needs that additional 12kb font file in order to support `\mathscr{…}`.

**Asana**.woff2 is a 242 kb file and does not need a separate file for `\mathscr{…}`.

Several other math fonts exist and you can try them out at Frédéric Wang’s [Mathematical OpenType Fonts](https://fred-wang.github.io/MathFonts/ "Math fonts").

The `temml.css` file is set up to use local fonts. 

Another option is the `temml-dual.css` file. It also uses local fonts but it enables a toggle from local fonts to Latin-Modern. (The Temml home page uses `temml-dual.css`.) Use `temml.css` or `temml-dual.css` but not both.

If you want a different math font size, you can edit the Temml CSS file or add a rule to your own page's CSS, like this example:

```css
...
.temml { font-size: 115%; }
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
<link rel="stylesheet" href="./temml.css">
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
    // Put \[ last to avoid conflict with \\[1em] row separator
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
    <link rel="stylesheet" href="./temml.css">
    <script src="./temml.min.js"></script>
    <script src="./mhchem.min.js"></script>
  </head>
```

The extension reference must come after the reference to `temml.min.js`.

For server-side use, just use `temml.cjs.js` instead of `temml.min.js`. `temml.cjs.js` includes `mhchem`, `physics`, and `texvc`.

<br>

<span class="reduced">Copyright © 2021 Ron Kok. Released under the [MIT License](https://opensource.org/licenses/MIT)</span>

<br>

</main>

<nav>
<div id="sidebar">

$\href{https://temml.org/}{\color{black}\Large\Temml}$ &nbsp;&nbsp;v0.1.3

<h3><a href="#top">Contents</a></h3>

* [Browser Support](#browser-support)
* [Installation](#installation)
* [API](#api)
    * [In Browser](#in-browser)
    * [Server Side](#server-side)
    * [Options](#options)
    * [Macros and \ref](#persistent-macros-and-ref)
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