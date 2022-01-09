# texvc extension

This extension adds to Temml functions available in mediawiki pages.

It omits the functions deprecated at
https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax

You can download the `texvc.js` file from this repository.

### Usage

This extension isn't part of core Temml, so the script should be separately included in the HTML page's `<head>`. Place it _after_ the line that calls `temml.js`.

```html
<script src="./temml.min.js"></script>
<script src="./texvc.js"></script>
```

If you are working sever-side, just use `temml.cjs`. It already includes all the functions in `texvc.js`.

### Syntax

All the functions in the _texvc_ extension are listed in the [Temml docs](https://temml.org/docs/en/supported.html).
