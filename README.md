*Temml* is a LaTeX-to-MathML JavaScript conversion utility. It is built to be lightweight.

| Library       | Minified JavaScript + CSS |
|:--------------|:-------------------------:|
| Temml         |         139 KB            |
| MathJax 2.7.5 |         338 KB            |
| KaTeX         |         280 KB            |
| TeXZilla      |         168 KB            |

As a futher advantage, Temml can use local system fonts. The minimum Temml installation serves a font file that is only 12kb.

When the [MathML-in-Chromium](https://mathml.igalia.com/news/) project is complete, all the major browsers will support MathML and Temml will become the most lightweight way to render math in a browser.

Temml’s coverage of LaTeX functions is as good as MathJax, slightly better than KaTeX 0.13.0 and substantially better than TeXZilla. See a [detailed coverage comparison](https://temml.org/docs/en/comparison.html).

Temml's test suite includes many rendered examples that are available for viewing:

* The Temml [function support page](https://temml.org/docs/en/supported.html) enumerates every Temml control word and displays a working example of each.

* A [reproduction](https://temml.org/tests/mozilla-tests.html) of the [Mozilla Torture Test](https://www-archive.mozilla.org/projects/mathml/demo/texvsmml.xhtml) includes images from LaTeX for comparison.

* The most comprehensive visual test page is a reproduction of [every LaTeX example](https://temml.org/tests/wiki-tests.html) on the [Wikipedia math help page](https://en.wikipedia.org/wiki/Help:Displaying_a_formula).

* A [reproduction](https://temml.org/tests/katex-tests.html) of the [KaTeX Screenshotter Tests](https://github.com/KaTeX/KaTeX/blob/main/test/screenshotter/ss_data.yaml) shows several edge cases and also includes images from LaTeX for comparision.

* A [reproduction](https://temml.org/tests/mhchem-tests.html) of the examples in the [mhchem Manual](https://mhchem.github.io/MathJax-mhchem/) demonstrates, among many other things, Temml's support for upright lower-case Greek letters.

Documentation can be found at:

* [Installation](https://temml.org/docs/en/administration.html)

* LaTeX function support, [sorted into logical groups](https://temml.org/docs/en/supported.html).

* LaTeX function support, [sorted alphabetically](https://temml.org/docs/en/support_table.html).

### Acknowledgements

I built Temml by:

1. Forking [KaTeX](https://katex.org/).

2. Deleting half the code, removing the HTML parts and keeping the parser, the macro expander, and the MathML parts.

3. Doing some code refactoring and many MathML bug fixes.

4. Adding new functionality: upright lower-case Greek letters, `\euro`, `\label{…}`, `\ref{…}`, `\longdiv{…}`, `\prescript`, `definecolor`, `xcolor` color names, etc.

I wish to thank Khan Academy and the many volunteer KaTeX contributors. This library would not exist if KaTeX had not existed first.

---

Temml is released under terms of the [MIT license](https://mit-license.org/)
