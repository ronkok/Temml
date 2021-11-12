/* eslint-disable no-undef */

//////////////////////////////////////////////////////////////////////
// texvc.sty

// The texvc package contains macros available in mediawiki pages.
// We omit the functions deprecated at
// https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax

// We also omit texvc's \O, which conflicts with \text{\O}

temml.__defineMacro("\\darr", "\\downarrow");
temml.__defineMacro("\\dArr", "\\Downarrow");
temml.__defineMacro("\\Darr", "\\Downarrow");
temml.__defineMacro("\\lang", "\\langle");
temml.__defineMacro("\\rang", "\\rangle");
temml.__defineMacro("\\uarr", "\\uparrow");
temml.__defineMacro("\\uArr", "\\Uparrow");
temml.__defineMacro("\\Uarr", "\\Uparrow");
temml.__defineMacro("\\N", "\\mathbb{N}");
temml.__defineMacro("\\R", "\\mathbb{R}");
temml.__defineMacro("\\Z", "\\mathbb{Z}");
temml.__defineMacro("\\alef", "\\aleph");
temml.__defineMacro("\\alefsym", "\\aleph");
temml.__defineMacro("\\bull", "\\bullet");
temml.__defineMacro("\\clubs", "\\clubsuit");
temml.__defineMacro("\\cnums", "\\mathbb{C}");
temml.__defineMacro("\\Complex", "\\mathbb{C}");
temml.__defineMacro("\\Dagger", "\\ddagger");
temml.__defineMacro("\\diamonds", "\\diamondsuit");
temml.__defineMacro("\\empty", "\\emptyset");
temml.__defineMacro("\\exist", "\\exists");
temml.__defineMacro("\\harr", "\\leftrightarrow");
temml.__defineMacro("\\hArr", "\\Leftrightarrow");
temml.__defineMacro("\\Harr", "\\Leftrightarrow");
temml.__defineMacro("\\hearts", "\\heartsuit");
temml.__defineMacro("\\image", "\\Im");
temml.__defineMacro("\\infin", "\\infty");
temml.__defineMacro("\\isin", "\\in");
temml.__defineMacro("\\larr", "\\leftarrow");
temml.__defineMacro("\\lArr", "\\Leftarrow");
temml.__defineMacro("\\Larr", "\\Leftarrow");
temml.__defineMacro("\\lrarr", "\\leftrightarrow");
temml.__defineMacro("\\lrArr", "\\Leftrightarrow");
temml.__defineMacro("\\Lrarr", "\\Leftrightarrow");
temml.__defineMacro("\\natnums", "\\mathbb{N}");
temml.__defineMacro("\\plusmn", "\\pm");
temml.__defineMacro("\\rarr", "\\rightarrow");
temml.__defineMacro("\\rArr", "\\Rightarrow");
temml.__defineMacro("\\Rarr", "\\Rightarrow");
temml.__defineMacro("\\real", "\\Re");
temml.__defineMacro("\\reals", "\\mathbb{R}");
temml.__defineMacro("\\Reals", "\\mathbb{R}");
temml.__defineMacro("\\sdot", "\\cdot");
temml.__defineMacro("\\sect", "\\S");
temml.__defineMacro("\\spades", "\\spadesuit");
temml.__defineMacro("\\sub", "\\subset");
temml.__defineMacro("\\sube", "\\subseteq");
temml.__defineMacro("\\supe", "\\supseteq");
temml.__defineMacro("\\thetasym", "\\vartheta");
temml.__defineMacro("\\weierp", "\\wp");
