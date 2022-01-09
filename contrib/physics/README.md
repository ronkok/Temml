# physics extension

This extension adds to Temml many of the functions from the LaTeX [physics package](https://www.ctan.org/tex-archive/macros/latex/contrib/physics).

You can download the `physics.js` file from this repository.

### Usage

This extension isn't part of core Temml, so the script should be separately included in the HTML page's `<head>`. Place it _after_ the line that calls `temml.js`.

```html
<script src="./temml.min.js"></script>
<script src="./physics.js"></script>
```

If you are working sever-side, just use `temml.cjs`. It already includes all the functions in `physics.js`.

### Syntax

All the functions in the physics extension are listed in the [physics section](https://temml.org/docs/en/supported.html#physics-and-chemistry) (below the fold) of the Temml docs.
