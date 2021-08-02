# Changelog

All notable changes to this project will be documented in this file. This CHANGELOG roughly follows the guidelines from [keepachangelog.com](https://keepachangelog.com/en/1.0.0/).

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
