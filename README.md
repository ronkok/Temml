*Temml* is a LaTeX-to-MathML JavaScript conversion utility. It is built to be lightweight.

| Library       | Minified JavaScript + CSS |
|:--------------|:-------------------------:|
| Temml         |         128 KB            |
| MathJax 2.7.5 |         338 KB            |
| KaTeX         |         272 KB            |
| TeXZilla      |         168 KB            |

As a futher advantage, Temml mostly uses local system fonts. The minimum Temml installation serves a font file that is only 12kb.

When the [MathML-in-Chromium](https://mathml.igalia.com/news/) project is complete, all the major browsers will support MathML and Temml will become the most lightweight way to render math in a browser.

Temml’s coverage of LaTeX functions is as good as MathJax, slightly better than KaTeX 0.13.0-pre and substantially better than TeXZilla. There is a detailed coverage comparison [here](https://temml.org/site/docs/en/comparison.html).

Documentation can be found at:

* [Installation](https://temml.org/site/docs/en/administration.html)

* LaTeX function support, [sorted into logical groups](https://temml.org/site/docs/en/supported.html).

* LaTeX function support, [sorted alphabetically](https://temml.org/site/docs/en/support_table.html).

### Acknowledgements

I built Temml by:

1. Forking [KaTeX](https://katex.org/).

2. Deleting half the code, removing the HTML parts and keeping the parser, the macro expander, and the MathML parts.

3. Doing some code refactoring and MathML bug fixes.

4. Adding new functions: upright lower-case Greek letters, `\euro`, `\label{…}`, `\ref{…}`, `\longdiv{…}`, `\prescript`, etc.

I wish to thank Khan Academy and the many volunteer KaTeX contributors. This library would not exist if KaTeX had not existed first.

####

Temml is released under terms of the [MIT license](https://mit-license.org/)
