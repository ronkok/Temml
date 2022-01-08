# Changelog

All notable changes to this project will be documented in this file. This CHANGELOG roughly follows the guidelines from [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
