# Changelog

All notable changes to this project will be documented in this file. This CHANGELOG roughly follows the guidelines from [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

## [0.10.15] = 2023-10-4

### Changed

- Move environment CSS from external file to inline

### Added

- Support TypeScript modules
- Support stix astronomy symbols

## [0.10.14] = 2023-07-28

### Fixed

- Center display math in Firefox & WebKit.
- Spurious line-breaking on delimiters.
- `\bigg(\Bigg(` sizes in Chromium.
- \boxed & \colorbox in WebKit
- \lower in WebKit
- \raise, \raisebox, & \lower all adjust height & depth in Chromium. (Alas, not in Firefox).

### Changed

- Use <mrow> instead of <menclose> (to comply with MathML-Core).

### Added

- Support \VDash


## [0.10.13] = 2023-06-08

### Changed

- Simplify code for extensible arrows

### Added

- \QED

## [0.10.12] = 2023-05-21

### Fixed

- Display \nabla as upright, not italic

## [0.10.11] = 2023-04-22

### Fixed

- Center display mode math
- \bin{symbols}

### Added

- Support `throwOnError` rendering option
- Support  `\eqeq` and `\eqeqeq`

## [0.10.10] = 2023-02-14

### Fixed

- Enable arbitrary Unicode characters inside strict-mode `\text{…}`

## [0.10.9] = 2023-02-03

### Fixed

- Unicode ℓ

## [0.10.8] = 2023-01-31

### Fixed

- Left-justify after a newline

## [0.10.7] = 2023-01-30

### Fixed

- `<mrow>` containing a single `DocumentFragment`. Resolves issue #18.

## [0.10.6] = 2023-01-29

### Fixed

- Remove `mathcolor` property. Resolves issue #17.
- `<mrow>` containing a document fragment
- `\definecolor` with lower case rgb

## [0.10.5] = 2023-01-28

### Fixed

- color/spacing/linebreaking interaction

## [0.10.4] = 2023-01-25

### Fixed

- Number parsing. Resolves issue #13.

## [0.10.3] = 2023-01-17

### Fixed

- Soft lines breaks via CSS flex-wrap

## [0.10.2] = 2023-01-09

### Fixed

- consumeSpaces() to consume non-breaking space

### Added

- Support \leftouterjoin, \rightouterjoin, \fullouterjoin

## [0.10.1] = 2022-12-29

### Fixed

- Consolidate contents of \operatorname when possible
- Insert space after a subsup whose base is an op
- Spelling errors

## [0.10.0] = 2022-12-14

### Fixed

- A space prevents an optional argument to \\

### Added

- \cent
- Unicode input for chancery and roundhand (script) letters.

### Removed

- Support for \oldstylenums

## [0.9.2] = 2022-12-06

### Fixed

- \underline inside \text{}
- Align-left in {cases} in Firefox
- Hard line breaks
- Wrap \vdots in `<mrow>`, not `<mi>`
- Use CSS style='font-weight:bold;' for \pmb

## [0.9.1] = 2022-11-27

### Added

- \underline inside \text{}
- Align-left in {cases} in Firefox
- Hard line breaks
- Wrap \vdots in <mrow>, not <mi>
- \pmb via CSS font-weight: bold
- \texttt{<number>}

### Removed

- CSS file for XTIS font

## [0.9.0] = 2022-10-28

### Changed

- Remove support for \arraystretch
- Control soft line breaks with a rendering option
- Array spacing via CSS, not attributes

### Added

- Support \gdef and \global\let
- Support array double borders called by double \hline and {array}{c||c}
- Support \mapsfrom

### Fixed

- Avoid unwanted stretch of harpoons
- \hline after \cr
- \prime vertical alignment in STIX TWO and Asana
- Ignore emoji suppression character &#xFE0E;

### Securtity

- Avoid recursive call to parser which evaded limit on \def

## [0.8.0] = 2022-09-05

### Breaking Change

- Soft line breaks are now controlled by the `wrap` rendering option.
  Temml does this by creating a series of `<math>` elements.

## [0.7.3] = 2022-08-29

### Fixed

- Get (lowered) prime from Temml.woff2 font
- Add a prime character to Temml.woff2

## [0.7.2] = 2022-08-08

### Fixed

- Consolidation of text into a <mtext> element

## [0.7.1] = 2022-08-07

### Fixed

- Vertical arrow heights in Chromium
- mclass, e.g. \mathrel, in Chromium

## [0.7.0] = 2022-08-03

### Release Notes

This release is all about Chromium. Ignalia has announced an [intent to ship](https://www.igalia.com/2022/06/22/Intent-to-Ship-MathML.html) MathML in Chromium. In anticipation of that event, this version of Temml is written to support both Firefox and Chromium.

Those two implementations are not written to the same specification. So Temml’s MathML must conform simultaneously to both [MathML 3]( https://www.w3.org/TR/MathML3/) (Firefox) and [MathML Core](https://w3c.github.io/mathml-core/) (Chromium). Given that challenge, I’m pretty happy with how well it has turned out. Temml emulates several hundred LaTeX functions and nearly all of them work very well.

It’s not all perfect. In this version, Temml drops support for `\cancelto`, `\toggle`, `\texttip`, `\phase`, and `\longdiv`. I think that `\toggle` and `\texttip` are probably gone forever. The others I hope to restore someday after Chromium fully supports the `menclose` element.

Also, Chromium’s implementation of MathML is new and not yet mature. It fails with some stretchy accents and extensible arrows. Chromium cannot yet print a page that contains MathML. I’m testing this in Chrome Canary and those issues may be worked out before MathML is shipped.

### Added

- Support for [MathML Core](https://w3c.github.io/mathml-core/) for rendering in Chromium

### Removed

- Support for `\cancelto`, `\toggle`, `\texttip`, `\phase`, and `\longdiv`

## [0.6.9] = 2022-06-11

### Fixed

- Colors of lower-case color names
- `\surd` vertical alignment when rendered in Latin Modern

## [0.6.8] = 2022-05-20

### Fixed

- Avoid crash when mhchem \ce{} is empty
- Numerals in text mode

### Added

- Support Unicode (sub|superscript) characters

## [0.6.7] = 2022-03-27

### Fixed

- Added operator spacing to Unicode characters ∖∘∙
- Avoid error when a spacing function is the base of a subscript.
- Fix nested font size changes
- Replace string.substr() with string.slice()
- Use Unicode U+203E, Overline, for \bar{}

### Added

- Support \strictif and \strictfi

### Docs

- Explain how to work around a Cambria Math radical size problem
- Edit README for brevity

## [0.6.6] = 2022-01-28

### Fixed

- Workaround a Firefox bug. Prevent space around a \mathrm{} function with a one-character argument.

## [0.6.5] = 2022-01-20

### Added

- 15 functions from the `cmll` package

### Fixed

- Omit color attribute and <mpadded> wrapper from \rule when unecessary

## [0.6.4] = 2022-01-15

### Fixed

- More improvement of recognition of delimiters after functions like \sin

## [0.6.3] = 2022-01-14

### Fixed

- Improve recognition of delimiters after functions like \sin

## [0.6.2] = 2022-01-13

### Fixed

- \bm{\sin}
- Remove spurious space between \sin (x)

## [0.6.1] = 2022-01-12

### Fixed

- \mathinner when part of a denominator

## [0.6.0] = 2022-01-11

### Changed

- In default Temml, Numbers are now consolidated into one <mn> element if they begin and end with a number and contain numerals, commas, or dots
- Some error messages are revised

### Added

- Documentation section regarding numbers

## [0.5.3] = 2022-01-08

### Fixed

- Suppress operator spacing between adjacent relations

## [0.5.2] = 2022-01-07

### Fixed

- \tag now stays in display mode

### Changed

- Parse error message now is displayed on screen, not in a hover hint.
- Added locations to some error messages.

## [0.5.1] = 2022-01-05

### Fixed

- \vcentcolon, \ratio

## [0.5.0] = 2022-01-04

### Changed

- Rendering option `maxSize` now takes an array of two numbers.

### Added

- \centerdot

### Fixed

- text-mode colon
- All unit tests now pass.
- All SVG images have been removed from Temml

## [0.4.2] = 2021-12-24

### Fixed

- \mathcal{ego}
- \not\operatorname
- \big\backslash and \right\backslash
- displaystyle \sideset
- :=
- {cases} environment row spacing
- \varnothing
- math-mode \O and \o
- Greek edge cases of bold, italic, and sans-serif
- \shortmid, \nshortmid, \shortparallel, \nshortparallel, \smallsetminus
- non-stretchy accents (so they do not stretch)
- Make best effort to support Greek sans-serif

### Added

- \sgn

## [0.4.1] = 2021-12-20

### Fixed

- \bmod
- \colon spacing
- \right .
- \includegraphics
- \angle padding
- \subarray row spacing
- "/" spacing
- width of stacked harpoons
- operator spacing when adjacent to \color
- Improve laps
- Use character U+2044 for inline fractions
- Work around Firefox bug affecting \mathrlap
- \boldsymbol when it wraps an operator
- array environment enclosing lines
- \mathbf{\Omega}
- \mathop

### Added

- Copy button to home page.
- Images from LaTeX in KaTeX screenshotter tests
- Mozilla test suite
- mhchem test suite

## [0.4.0] = 2021-12-06

### Changed

- Remove \centerdot
- Remove \vcenter
- Remove \newextarrow
- Edit mhchem to sync w/extensible arrow fix.

### Fixed

- Prevent arrowhead distortion on extensible arrows
- Fix scriptstyle errors.
- Adjust RGB values of base colors.

## [0.3.3] - 2021-11-24

### Added

- Support \odv and \pdv from derivative package
- Rendering option `elementIsMath`

### Changed

- Make color names case-sensitive
- Use Unicode character U+212B for \AA

### Fixed

- Explicitly set stretchy="true" on delimiters to evade a Firefox bug
- Soft line breaks inside \color
- \mathbin that contains a <mtext>

## [0.3.2] - 2021-11-21

### Added

- \definecolor
- Optional argument that sets the color model in color functions
- Predefined colors per Tables 4.1 and 4.2 in xcolor package
- \nsubset and \nsupset

### Changed

- Use character U+005F for \overline and \underline. Regain stretchiness.

### Fixed

- Spacing for \mid
- Workaround a Fireox bug for spacing of <mtext>

## [0.3.1] - 2021-11-15

### Added

- Rendering option preventTagLap

## [0.3.0] - 2021-11-12

### Removed

- Support for \global, \gdef, and \xdef

### Added

- Preamble definition
- Support \nonumber
- STIX2 is now available on the home page

### Fixed

- Text mode accents in strict mode get only a console message, not an error.

### Changed

- Revert to macron character for \bar
- Change a font name from Temml-Script.woff2 to Temml.woff2.
- Change a folder name from /temml/ to /assets/.
- Documentation clarifies the current chancery/roundhand situation.

## [0.2.3] - 2021-11-06

### Added

- Support \ballotx
- Support \permil

## [0.2.2] - 2021-11-04

### Added

- Support \c
- Support \female and \male
- Support \relax
- Soft line breaks in Firefox, if no <annotation>

### Changed

- <math> element namespace is now optional
- <annotation> elemennt w/TeX string is now optional
- Removed "temml" class from <math> element
- Reduced number of visible DOM elements
- Support AMS environment w/one empty row
- \bar{} accent now uses character U+2015, horizontal bar

### Fixed

- Spaces inside \text{}
- \char now supports >16-bit Unicode characters
- \mathbb operating on numbers
- Circular dependency
- Stretchy arrow bug
- Validation errors in \mathop, \mathrel, and \operatorname

## [0.2.1] - 2021-08-10

### Changed

- Change CSS files. Each CSS file now is synchronized with a single math font.

### Added

- Support Asana and XITS fonts.
- Support \Braket, \Set, and \set.

## [0.2.0] - 2021-08-02

### Removed

- Soft line breaks, since they will not work in Chromium.

### Fixed

- Improve handling of \limits
- Improve handling of newline.
- Respect catcode in macro expansion and set ~ correctly.
- Improve \operatorname*.
- Fix non-stretchy accents in Firefox.
- Use correct Unicode for uppercase Greek.

### Changed

- Support font functions via substitution of Unicode characters instead of `mathvariant`. Font functions will now work in Chromium.
- Change \pmb to use CSS text-shadow instead of `mathvariant = bold`.

### Added

- Support \backcong.

## [0.1.3] - 2021-05-21

### Fixed

- Treat `\` followed by whitespace including up to one newline as equivalent to `\ `.
- Isolate `border-color` from page CSS.

### Added

- `\P` and `\S` in math mode.

## [0.1.2] - 2021-02-18

### Fixed

- Workaround for Firefox arrow minlength bug.

### Removed

- \overlinesegment & \underlinesegment

## [0.1.1] - 2021-02-17

### Fixed

- \overlinesegment & \underlinesegment SVGs

### Changed

- Removed Firefox browser sniff from CSS

## [0.1.0] - 2021-02-01

### Added

- Initial Release
