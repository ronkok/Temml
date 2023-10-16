# Copy-tex extension

This extension modifies the copy/paste behavior in any browser supporting the
[Clipboard API][1] so that, when a user selects and copies `<math>` elements, the
text content of the resulting clipboard replaces `<math>` elements with their LaTeX
source surrounded by specified delimiters.

The default delimiters are `$…$` for inline math and `$$…$$` for display math,
but you can switch them to e.g. `\(…\)` and `\[…\]` by modifying
`copyDelimiters` in [the source code][2]. Note that a selection containing part
of a math element gets extended to include the entire element.

`<math>` elements must include an `<annotation>` element containing the LaTeX source,
so when you run Temml, be sure to include `annotate: "true"` in the Temml rendering
options.

Note that soft line breaks cannot co-exist with an `<annotation>` element. You’ll have
to choose one or the other.

## Usage

This extension isn't part of Temml proper, so the script needs to be included
(via a `<script>` tag) in the page along with Temml itself. For example:

```
<head>
   …
<link rel="stylesheet" href="./Temml-Local.css">
<script src="./temml.min.js"></script>
<script src="./copy-tex.min.js"></script>
  …
</head>
```

See [copy-tex.html][3] for an example.


[1]: https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent

[2]: https://github.com/ronkok/Temml/tree/main/contrib/copy-tex/copy-tex.js

[3]: https://temml.org/copy-tex.html
