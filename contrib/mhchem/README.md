# mhchem extension

This extension adds to Temml the `\ce` and `\pu` functions from the [mhchem](https://mhchem.github.io/MathJax-mhchem/) package.

You can download the `mhchem.min.js` file from this repository.

### Usage

This extension isn't part of core Temml, so the script should be separately included. Write the following line into the HTML page's `<head>`. Place it _after_ the line that calls `temml.js`.

```html
<script src="./temml.min.js"></script>
<script src="./mhchem.min.js"></script>
```

If you are working sever-side, just use `temml.cjs`. It already includes all the functions in `mhchem.js`.

### Syntax

See the [mhchem Manual](https://mhchem.github.io/MathJax-mhchem/) for a full explanation of the input syntax, with working examples. The manual also includes a demonstration box.

Note that old versions of `mhchem.sty` used `\cf` for chemical formula and `\ce` for chemical equations, but `\cf` has been deprecated in place of `\ce`. This extension supports only `\ce`. You can define a macro mapping `\cf` to `\ce` if needed.

### Browser Support

This extension has been tested on Chrome, Firefox, Opera, and Edge.
