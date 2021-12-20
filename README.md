*Temml* is a LaTeX-to-MathML JavaScript conversion utility. It is built to be lightweight.

| Library       | Minified JavaScript + CSS |
|:--------------|:-------------------------:|
| Temml         |         137 KB            |
| MathJax 2.7.5 |         338 KB            |
| KaTeX         |         280 KB            |
| TeXZilla      |         168 KB            |

As a futher advantage, Temml can use local system fonts. The minimum Temml installation serves a font file that is only 12kb.

When the [MathML-in-Chromium](https://mathml.igalia.com/news/) project is complete, all the major browsers will support MathML and Temml will become the most lightweight way to render math in a browser.

Temml’s coverage of LaTeX functions is as good as MathJax, slightly better than KaTeX 0.13.0 and substantially better than TeXZilla. See a [detailed coverage comparison](https://temml.org/docs/en/comparison.html).

Temml's visual test suite includes images from LaTeX for comparison. The tests are available to be viewed at:

* [Mozilla Torture Test](https://temml.org/tests/mozilla-tests.html)

* [KaTeX Screenshotter Tests](https://temml.org/tests/katex-tests.html)

* [mhchem Manual Examples](https://temml.org/tests/mhchem-tests.html)

Documentation can be found at:

* [Installation](https://temml.org/docs/en/administration.html)

* LaTeX function support, [sorted into logical groups](https://temml.org/docs/en/supported.html).

* LaTeX function support, [sorted alphabetically](https://temml.org/docs/en/support_table.html).

### Acknowledgements

I built Temml by:

1. Forking [KaTeX](https://katex.org/).

2. Deleting half the code, removing the HTML parts and keeping the parser, the macro expander, and the MathML parts.

3. Doing some code refactoring and many MathML bug fixes.

4. Adding new functionality: upright lower-case Greek letters, `\euro`, `\label{…}`, `\ref{…}`, `\longdiv{…}`, `\prescript`, `xcolor` color names, etc.

I wish to thank Khan Academy and the many volunteer KaTeX contributors. This library would not exist if KaTeX had not existed first.

---

Temml is released under terms of the [MIT license](https://mit-license.org/)
