# Auto-render extension

This is a client-side extension to automatically render all of the math inside of the
text of a running HTML document. It searches all of the text nodes in a given element
for the given delimiters, and renders the math in place.


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

`elem` is an HTML DOM element, typically `document.main`. The function will
recursively search for text nodes inside this element and render the math in them.

`options` is an optional object argument that can have the same keys as [the
options](https://temml.org/docs/en/administration.html#options) passed to 
`temml.render`. In addition, there are five auto-render-specific keys:

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
  **after** `$$…$$`. Because rules are processed in order, putting a `$` rule first would
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
