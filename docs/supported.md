<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Temml Functions</title>
   <link rel="stylesheet" href="../../assets/Temml-Latin-Modern.css">
   <link rel="stylesheet" href="../docStyles.css">
   <script src="../../assets/temml.min.js"></script>
   <style>
      #env + table tr td:nth-child(1) { min-width: 9em }
      #env + table tr td:nth-child(3) { min-width: 11em }
    </style>
</head>

<body>
<main id="main" class="latin-modern">

# Supported Functions

**Temml** is a JavaScript library that converts TeX math-mode functions to MathML.
This page lists the TeX functions it supports, sorted into logical groups.

To read this page, use a browser that supports MathML, such as Firefox or Safari.
Chrome and Edge will support MathML [soon](https://www.igalia.com/2022/06/22/Intent-to-Ship-MathML.html).

There is a similar [Support Table](./support_table.html), sorted alphabetically,
that lists both supported and some un-supported functions.

## Accents

+:-------------------------+:-------------------------+:-----------------------------------+
| $`a'` `a'`               | $`\tilde{a}` `\tilde{a}` | $`\widetilde{ac}` `\widetilde{ac}` |
+--------------------------+--------------------------+------------------------------------+
| $`a''` `a''`             | $`\vec{F}` `\vec{F}`     | $`\utilde{AB}` `\utilde{AB}`       |
+--------------------------+--------------------------+------------------------------------+
| $`a^{\prime}`            | $`\overleftarrow{AB}`    | $`\overrightarrow{AB}`             |
| `a^{\prime}`             |  `\overleftarrow{AB}`    | `\overrightarrow{AB}`              |
+--------------------------+--------------------------+------------------------------------+
| $`\acute{a}` `\acute{a}` | $`\underleftarrow{AB}`   | $`\underrightarrow{AB}`            |
|                          |  `\underleftarrow{AB}`   |  `\underrightarrow{AB}`            |
+--------------------------+--------------------------+------------------------------------+
| $`\bar{y}` `\bar{y}`     | $`\overline{AB}`         | $`\Overrightarrow{AB}`             |
|                          |  `\overline{AB}`         |  `\Overrightarrow{AB}`             |
+--------------------------+--------------------------+------------------------------------+
| $`\breve{a}` `\breve{a}` | $`\underline{AB}`        | $`\overleftrightarrow{AB}`         |
|                          |  `\underline{AB}`        |  `\overleftrightarrow{AB}`         |
+--------------------------+--------------------------+------------------------------------+
| $`\check{a}` `\check{a}` | $`\widecheck{ac}`        | $`\underleftrightarrow{AB}`        |
|                          |  `\widecheck{ac}`        |  `\underleftrightarrow{AB}`        |
+--------------------------+--------------------------+------------------------------------+
| $`\dot{a}` `\dot{a}`     | $`\overleftharpoon{ac}`  | $`\overrightharpoon{ac}`           |
|                          |  `\overleftharpoon{ac}`  |  `\overrightharpoon{ac}`           |
+--------------------------+--------------------------+------------------------------------+
| $`\ddot{a}` `\ddot{a}`   | $`\overgroup{AB}`        | $`\wideparen{AB}`                  |
|                          |  `\overgroup{AB}`        |  `\wideparen{AB}`                  |
+--------------------------+--------------------------+------------------------------------+
| $`\dddot{a}` `\dddot{a}` | $`\undergroup{AB}`       | $`\overparen{AB}`                  |
|                          |  `\undergroup{AB}`       |  `\overparen{AB}`                  |
+--------------------------+--------------------------+------------------------------------+
| $`\ddddot{a}`            | $`\underbar{X}`          | $`\underparen{AB}`                 |
|  `\ddddot{a}`            |  `\underbar{X}`          |  `\underparen{AB}`                 |
+--------------------------+--------------------------+------------------------------------+
| $`\grave{a}` `\grave{a}` | $`\mathring{g}`          | $`\overbrace{AB}`                  |
|                          |  `\mathring{g}`          |  `\overbrace{AB}`                  |
+--------------------------+--------------------------+------------------------------------+
| $`\hat{\theta}`          | $`\widehat{ac}`          | $`\underbrace{AB}`                 |
| `\hat{\theta}`           |  `\widehat{ac}`          |  `\underbrace{AB}`                 |
+--------------------------+--------------------------+------------------------------------+


**Accent functions inside \\text{…}**

+:------------------+:------------------+:-----------------+:----------------+
| $`\text{\'{a}}`   | $`\text{\~{a}}`   | $`\text{\.{a}}`  | $`\text{\H{a}}` |
| `\'{a}`           |  `\~{a}`          | `\.{a}`          |  `\H{a}`        |
+-------------------+-------------------+------------------+-----------------+
| $``\text{\`{a}}`` | $`\text{\={a}}`   | $`\text{\"{a}}`  | $`\text{\v{a}}` |
| ``\`{a}``         |  `\={a}`          |  `\"{a}`         |  `\v{a}`        |
+-------------------+-------------------+------------------+-----------------+
| $`\text{\^{a}}`   | $`\text{\u{a}}`   | $`\text{\r{a}}`  | $`\text{\c{c}}` |
| `\^{a}`           |  `\u{a}`          |  `\r{a}`         |  `\c{c}`        |
+-------------------+-------------------+------------------+-----------------+

See also [letters](#letters)

## Annotation

+:---------------------------------+:---------------------------------------------------+
| $`\cancel{5}` `\cancel{5}`       | $`\overbrace{a+b+c}^{\text{note}}`                 |
|                                  |  `\overbrace{a+b+c}^{\text{note}}`                 |
+----------------------------------+----------------------------------------------------+
| $`\bcancel{5}` `\bcancel{5}`     | $`\underbrace{a+b+c}_{\text{note}}`                |
|                                  |  `\underbrace{a+b+c}_{\text{note}}`                |
+----------------------------------+----------------------------------------------------+
| $`\xcancel{ABC}` `\xcancel{ABC}` | $`\boxed{\pi=\frac c d}`                           |
|                                  |  `\boxed{\pi=\frac c d}`                           |
+----------------------------------+----------------------------------------------------+
| $`\sout{abc}` `\sout{abc}`       |                                                    |
|                                  |                                                    |
+----------------------------------+----------------------------------------------------+
| $`\ref{tag1}` `\ref{tag1}`       |                                                    |
|                                  |                                                    |
+----------------------------------+----------------------------------------------------+
| $$                               | `\tag{hi} x+y^{2x} \label{tag1}`                   |
| \tag{hi} x+y^{2x} \label{tag1}   |                                                    |
| $$                               |                                                    |
+----------------------------------+----------------------------------------------------+
| $$                               | `\tag*{bye} x+y^{2x}`                              |
| \tag*{bye} x+y^{2x}              |                                                    |
| $$                               |                                                    |
+----------------------------------+----------------------------------------------------+

Also some [environments](#environments) have automatic equation numbering.

A `\label{…}` may be placed anywhere and will create an HTML id matching the
`\label{…}` argument. That argument may contain only the characters `A-Za-z0-9_-`.

On sites where Temml fields are updated dynamically, `\ref{…}` may not be
supported. Other Temml functions update only the local field. `\ref{…}` must
make two passes through the entire document. Some sites may choose not to do this.

## Color

+------------------------------+---------------------------------------------+
| $`\color{blue} F=ma`         | $`\color[RGB]{255,0,255} F=ma`              |
|  `{\color{blue} F=ma}`       |  `{\color[RGB]{255,0,255} F=ma}`            |
+------------------------------+---------------------------------------------+
| $`\textcolor{blue}{F=ma}`    | $`\color[rgb]{1,0,1} F=ma`                  |
|  `\textcolor{blue}{F=ma}`    |  `{\color[rgb]{1,0,1} F=ma}`                |
+------------------------------+---------------------------------------------+
| $`\textcolor{#228B22}{F=ma}` | $`\color[HTML]{ff00ff} F=ma`                |
|  `\textcolor{#228B22}{F=ma}` |  `{\color[HTML]{ff00ff} F=ma}`              |
+------------------------------+---------------------------------------------+
| $`\colorbox{aqua}{A}`        | `\definecolor{sortaGreen}{RGB}{128,128,0}`\ |
|  `\colorbox{aqua}{A}`        |  $`\definecolor{sortaGreen}{RGB}{128,128,0} |
+------------------------------+  \color{sortaGreen} F=ma`                   +
| $`\fcolorbox{red}{aqua}{A}`  |  `{\color{sortaGreen} F=ma}`                |
|  `\fcolorbox{red}{aqua}{A}`  |                                             |
+------------------------------+---------------------------------------------+

`\definecolor` functions can be included in a [preamble](administration.html#preamble).
If so, their color definitions will have document-wide scope.

Color functions can all take an optional argument to set the color model, as
in the `xcolor` package. (Exception: `\definecolor`’s model argument is
required.) Temml supports color models `HTML`, `RGB`, and `rgb`.

If the color model is omitted, Temml color functions will accept:

- `#rrggbb`, `#rgb`, or `rrggbb`.
- A color name previously created by `\definecolor`.
- Any color from the following `xcolor` table.
- Any of the standard HTML [predefined color names](https://www.w3schools.com/colors/colors_names.asp).

<br>

+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Apricot}\rule{1em}{0.8em}} `  Apricot               | $` {\color{ForestGreen}\rule{1em}{0.8em}} `  ForestGreen   | $` {\color{olive}\rule{1em}{0.8em}} `  olive             | $` {\color{RoyalPurple}\rule{1em}{0.8em}} `  RoyalPurple       |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Aquamarine}\rule{1em}{0.8em}} `  Aquamarine         | $` {\color{Fuchsia}\rule{1em}{0.8em}} `  Fuchsia           | $` {\color{OliveGreen}\rule{1em}{0.8em}} `  OliveGreen   | $` {\color{RubineRed}\rule{1em}{0.8em}} `  RubineRed           |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Bittersweet}\rule{1em}{0.8em}} `  Bittersweet       | $` {\color{Goldenrod}\rule{1em}{0.8em}} `  Goldenrod       | $` {\color{orange}\rule{1em}{0.8em}} `  orange           | $` {\color{Salmon}\rule{1em}{0.8em}} `  Salmon                 |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{blue}\rule{1em}{0.8em}} `  blue                     | $` {\color{gray}\rule{1em}{0.8em}} `  gray                 | $` {\color{Orange}\rule{1em}{0.8em}} `  Orange           | $` {\color{SeaGreen}\rule{1em}{0.8em}} `  SeaGreen             |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Blue}\rule{1em}{0.8em}} `  Blue                     | $` {\color{Gray}\rule{1em}{0.8em}} `  Gray                 | $` {\color{OrangeRed}\rule{1em}{0.8em}} `  OrangeRed     | $` {\color{Sepia}\rule{1em}{0.8em}} `  Sepia                   |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{BlueGreen}\rule{1em}{0.8em}} `  BlueGreen           | $` {\color{green}\rule{1em}{0.8em}} `  green               | $` {\color{Orchid}\rule{1em}{0.8em}} `  Orchid           | $` {\color{SkyBlue}\rule{1em}{0.8em}} `  SkyBlue               |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{BlueViolet}\rule{1em}{0.8em}} `  BlueViolet         | $` {\color{Green}\rule{1em}{0.8em}} `  Green               | $` {\color{Peach}\rule{1em}{0.8em}} `  Peach             | $` {\color{SpringGreen}\rule{1em}{0.8em}} `  SpringGreen       |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{BrickRed}\rule{1em}{0.8em}} `  BrickRed             | $` {\color{GreenYellow}\rule{1em}{0.8em}} `  GreenYellow   | $` {\color{Periwinkle}\rule{1em}{0.8em}} `  Periwinkle   | $` {\color{Tan}\rule{1em}{0.8em}} `  Tan                       |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{brown}\rule{1em}{0.8em}} `  brown                   | $` {\color{JungleGreen}\rule{1em}{0.8em}} `  JungleGreen   | $` {\color{PineGreen}\rule{1em}{0.8em}} `  PineGreen     | $` {\color{teal}\rule{1em}{0.8em}} `  teal                     |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Brown}\rule{1em}{0.8em}} `  Brown                   | $` {\color{Lavender}\rule{1em}{0.8em}} `  Lavender         | $` {\color{pink}\rule{1em}{0.8em}} `  pink               | $` {\color{TealBlue}\rule{1em}{0.8em}} `  TealBlue             |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{BurntOrange}\rule{1em}{0.8em}} `  BurntOrange       | $` {\color{lightgray}\rule{1em}{0.8em}} `  lightgray       | $` {\color{Plum}\rule{1em}{0.8em}} `  Plum               | $` {\color{Thistle}\rule{1em}{0.8em}} `  Thistle               |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{CadetBlue}\rule{1em}{0.8em}} `  CadetBlue           | $` {\color{lime}\rule{1em}{0.8em}} `  lime                 | $` {\color{ProcessBlue}\rule{1em}{0.8em}} `  ProcessBlue | $` {\color{Turquoise}\rule{1em}{0.8em}} `  Turquoise           |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{CarnationPink}\rule{1em}{0.8em}} `  CarnationPink   | $` {\color{LimeGreen}\rule{1em}{0.8em}} `  LimeGreen       | $` {\color{purple}\rule{1em}{0.8em}} `  purple           | $` {\color{violet}\rule{1em}{0.8em}} `  violet                 |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Cerulean}\rule{1em}{0.8em}} `  Cerulean             | $` {\color{magenta}\rule{1em}{0.8em}} `  magenta           | $` {\color{Purple}\rule{1em}{0.8em}} `  Purple           | $` {\color{Violet}\rule{1em}{0.8em}} `  Violet                 |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{CornflowerBlue}\rule{1em}{0.8em}} `  CornflowerBlue | $` {\color{Magenta}\rule{1em}{0.8em}} `  Magenta           | $` {\color{RawSienna}\rule{1em}{0.8em}} `  RawSienna     | $` {\color{VioletRed}\rule{1em}{0.8em}} `  VioletRed           |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{cyan}\rule{1em}{0.8em}} `  cyan                     | $` {\color{Mahogany}\rule{1em}{0.8em}} `  Mahogany         | $` {\color{red}\rule{1em}{0.8em}} `  red                 | $` {\color{WildStrawberry}\rule{1em}{0.8em}} `  WildStrawberry |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Cyan}\rule{1em}{0.8em}} `  Cyan                     | $` {\color{Maroon}\rule{1em}{0.8em}} `  Maroon             | $` {\color{Red}\rule{1em}{0.8em}} `  Red                 | $` {\color{yellow}\rule{1em}{0.8em}} `  yellow                 |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Dandelion}\rule{1em}{0.8em}} `  Dandelion           | $` {\color{Melon}\rule{1em}{0.8em}} `  Melon               | $` {\color{RedOrange}\rule{1em}{0.8em}} `  RedOrange     | $` {\color{Yellow}\rule{1em}{0.8em}} `  Yellow                 |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{darkgray}\rule{1em}{0.8em}} `  darkgray             | $` {\color{MidnightBlue}\rule{1em}{0.8em}} `  MidnightBlue | $` {\color{RedViolet}\rule{1em}{0.8em}} `  RedViolet     | $` {\color{YellowGreen}\rule{1em}{0.8em}} `  YellowGreen       |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{DarkOrchid}\rule{1em}{0.8em}} `  DarkOrchid         | $` {\color{Mulberry}\rule{1em}{0.8em}} `  Mulberry         | $` {\color{Rhodamine}\rule{1em}{0.8em}} `  Rhodamine     | $` {\color{YellowOrange}\rule{1em}{0.8em}} `  YellowOrange     |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+
| $` {\color{Emerald}\rule{1em}{0.8em}} `  Emerald               | $` {\color{NavyBlue}\rule{1em}{0.8em}} `  NavyBlue         | $` {\color{RoyalBlue}\rule{1em}{0.8em}} `  RoyalBlue     |                                                                |
+----------------------------------------------------------------+------------------------------------------------------------+----------------------------------------------------------+----------------------------------------------------------------+


## Delimiters

+:-----------------+:-------------------+:-------------+:---------------------------+:--------------------+
| $`(~)` `( )`     | $`\lparen~\rparen` | $`⌈~⌉` `⌈ ⌉` | $`\lceil~\rceil`           | $`\uparrow`         |
|                  |  `\lparen`\        |              | `\lceil`\                  |  `\uparrow`         |
|                  | $`~~~~` `\rparen`  |              | $`~~~~~` `\rceil`          |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`[~]` `[ ]`     | $`\lbrack~\rbrack` | $`⌊~⌋` `⌊ ⌋` | $`\lfloor~\rfloor`         | $`\downarrow`       |
|                  | `\lbrack`\         |              | `\lfloor`\                 | `\downarrow`        |
|                  | $`~~~~` `\rbrack`  |              | $`~~~~~` `\rfloor`         |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`\{ \}`         | $`\lbrace \rbrace` | $`⎰⎱` `⎰⎱`   | $`\lmoustache \rmoustache` | $`\updownarrow`     |
| `\{ \}`          | `\lbrace`\         |              | `\lmoustache`\             |  `\updownarrow`     |
|                  | $`~~~~` `\rbrace`  |              | $`~~~~` `\rmoustache`      |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`⟨~⟩` `⟨ ⟩`     | $`\langle~\rangle` | $`⟮~⟯` `⟮ ⟯` | $`\lgroup~\rgroup`         | $`\Uparrow`         |
|                  | `\langle` \        |              | `\lgroup`\                 | `\Uparrow`          |
|                  | $`~~~~~` `\rangle` |              | $`~~~~~` `\rgroup`         |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`\vert`         | $`\vert`           | $`┌ ┐` `┌ ┐` | $`\ulcorner \urcorner`     | $`\Downarrow`       |
| `|`              |  `\vert`           |              | `\ulcorner`\               |  `\Downarrow`       |
|                  |                    |              | $`~~~~` `\urcorner`        |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`\Vert`         | $`\Vert` `\Vert`   | $`└ ┘` `└ ┘` | $`\llcorner \lrcorner`     | $`\Updownarrow`     |
| `\|`             |                    |              | `\llcorner`\               |  `\Updownarrow`     |
|                  |                    |              | $`~~~~` `\lrcorner`        |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
| $`\lvert~\rvert` | $`\lVert~\rVert`   | `\left.`     | `\right.`                  | $`\backslash`       |
| `\lvert`\        | `\lVert`\          |              |                            | `\backslash`        |
| $`~~~~` `\rvert` | $`~~~~~` `\rVert`  |              |                            |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+
|                  | $`\lt\gt` `\lt`\   | $`⟦~⟧` `⟦ ⟧` | $`\llbracket~\rrbracket`   | $`\lBrace~\rBrace`  |
|                  | $`~~~~~~~~~~`      |              | `\llbracket`\              | `\lBrace \rBrace`   |
|                  | `\gt`              |              | $`~~~~` `\rrbracket`       |                     |
+------------------+--------------------+--------------+----------------------------+---------------------+

The _texvc_ extension includes $`\lang` `\lang` and $`\rang` `\rang`.

#### Delimiter Sizing 

$`\left(\LARGE{AB}\right)` `\left(\LARGE{AB}\right)`

$`( \big( \Big( \bigg( \Bigg(` `( \big( \Big( \bigg( \Bigg(`

+:----------+:--------+:---------+:---------+:---------+
| `\left`   | `\big`  | `\bigl`  | `\bigm`  | `\bigr`  |
+-----------+---------+----------+----------+----------+
| `\middle` | `\Big`  | `\Bigl`  | `\Bigm`  | `\Bigr`  |
+-----------+---------+----------+----------+----------+
| `\right`  | `\bigg` | `\biggl` | `\biggm` | `\biggr` |
+-----------+---------+----------+----------+----------+
|           | `\Bigg` | `\Biggl` | `\Biggm` | `\Biggr` |
+-----------+---------+----------+----------+----------+

## Environments

+:---------------------:+:---------------------------+:--------------------------:+:-----------------------------+
| $`\begin{matrix}      | `\begin{matrix}`\          | $`\begin{array}{cc}        | `\begin{array}{cc}`\         |
|  a & b \\             |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|  c & d                |    `c & d`\                | c & d                      |    `c & d`\                  |
|  \end{matrix}`        | `\end{matrix}`             | \end{array}`               | `\end{array}`                |
+-----------------------+---------------------------+----------------------------+------------------------------+
| $`\begin{pmatrix}     | `\begin{pmatrix}`\         | $`\begin{bmatrix}          | `\begin{bmatrix}`\           |
| a & b \\              |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
| c & d                 |    `c & d`\                | c & d                      |    `c & d`\                  |
| \end{pmatrix}`        | `\end{pmatrix}`            | \end{bmatrix}`             | `\end{matrix}`               |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $`\begin{vmatrix}     | `\begin{vmatrix}`\         | $`\begin{Vmatrix}          | `\begin{Vmatrix}`\           |
|    a & b \\           |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|    c & d              |    `c & d`\                | c & d                      |    `c & d`\                  |
| \end{vmatrix}`        | `\end{vmatrix}`            | \end{Vmatrix}`             | `\end{Vmatrix}`              |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $`\begin{Bmatrix}     | `\begin{Bmatrix}`\         | $`\def\arraystretch{1.5}   | `\def\arraystretch{1.5}`\    |
|  a & b \\             |    `a & b \\`\             | \begin{array}{c|c:c}       | `\begin{array}{c|c:c}`\      |
|  c & d                |    `c & d`\                | a & b & c \\ \hline        |    `a & b & c \\ \hline`\    |
| \end{Bmatrix}`        | `\end{Bmatrix}`            | d & e & f \\ \hdashline    |    `d & e & f \\`\           |
|                       |                            | g & h & i                  |    `\hdashline`\             |
|                       |                            | \end{array}`               |    `g & h & i`\              |
|                       |                            |                            | `\end{array}`                |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $`x = \begin{cases}   | `x = \begin{cases}`\       | $`\begin{rcases}           | `\begin{rcases}`\            |
| a &\text{if } b \\    |    `a &\text{if } b \\`\   | a &\text{if } b \\         |    `a &\text{if } b  \\`\    |
| c &\text{if } d       |    `c &\text{if } d`\      | c &\text{if } d            |   `c &\text{if } d`\         |
| \end{cases}`          | `\end{cases}`              | \end{rcases}⇒`             | `\end{rcases}⇒`              |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $`\begin{smallmatrix} | `\begin{smallmatrix}`\     | $$                         | `\sum_{\begin{subarray}{l}`\ |
|  a & b \\             |    `a & b \\`\             | \sum_{\begin{subarray}{l}  |    `i\in\Lambda\\`\          |
|  c & d                |    `c & d`\                | i\in\Lambda\\              |    `0<j<n`\                  |
| \end{smallmatrix}`    | `\end{smallmatrix}`        |  0<j<n\end{subarray}}      | `\end{subarray}}`            |
|                       |                            | $$                         |                              |
+-----------------------+----------------------------+----------------------------+------------------------------+

The auto-render extension will render the following environments even if they
are not inside math delimiters such as `$$…$$`. They are display-mode only.

<div id="env"></div>

+:-----------------+:-----------------------+:-------------------+:--------------------------+
| $$               | `\begin{equation}`\    | $$                 | `\begin{align}`\          |
| \begin{equation} | `\begin{split}`\       | \begin{align}      |    `a&=b+c \\`\           |
| \begin{split}    |    `a &=b+c\\`\        |    a&=b+c \\       |    `d+e&=f`\              |
|   a &=b+c\\      |    `&=e+f`\            |    d+e&=f          | `\end{align}`             |
|   &=e+f          | `\end{split}`\         | \end{align}        |                           |
| \end{split}      | `\end{equation}`       | $$                 |                           |
| \end{equation}   |                        |                    |                           |
| $$               |                        |                    |                           |
+------------------+------------------------+--------------------+---------------------------+
| $$               | `\begin{gather}`\      | $$                 | `\begin{alignat}{2}`\     |
| \begin{gather}   |    `a=b \\`\           | \begin{alignat}{2} |    `10&x+ &3&y = 2 \\`\   |
|    a=b \\        |    `e=b+c`\            |  10&x+ &3&y = 2 \\ |    `3&x+&13&y = 4`\       |
|    e=b+c         | `\end{gather}`         |  3&x+&13&y = 4     | `\end{alignat}`           |
| \end{gather}     |                        | \end{alignat}      |                           |
| $$               |                        | $$                 |                           |
+------------------+------------------------+--------------------+---------------------------+
| $$               | `\begin{CD}`\          | $$                 | `\begin{multline}`\       |
| \begin{CD}       |   `A  @>a>>  B  \\`\   | \begin{multline}   |    `\rm uno \\`\          |
|   A @>a>> B \\   | `@VbVV    @AAcA \\`\   |    \rm uno \\      \    `\rm dos \\`\          |
| @VbVV @AAcA\\    |   `C  @=   D`\         |    \rm dos \\      |    `\rm tres`\            |
|   C @= D         | `\end{CD}`             |    \rm tres        | `\end{multline}`          |
| \end{CD}         |                        | \end{multline}     |                           |
| $$               |                        | $$                 |                           |
+------------------+------------------------+--------------------+---------------------------+

#### Other Temml Environments

+:------------------------------------+:----------------------------------------------+
| Environments                        | How they differ from those shown above        |
+=====================================+===============================================+
| `darray`, `dcases`, `drcases`       | … apply `displaystyle`                        |
+-------------------------------------+-----------------------------------------------+
| `matrix*`, `pmatrix*`, `bmatrix*`\  | … take an optional argument that sets column\ |
| `Bmatrix*`, `vmatrix*`, `Vmatrix*`  | alignment, as in `\begin{matrix*}[r]`         |
+-------------------------------------+-----------------------------------------------+
| `equation*`, `gather*`\             | … have no automatic numbering.                |
| `align*`, `alignat*`                |                                               |
+-------------------------------------+-----------------------------------------------+
| `gathered`, `aligned`, `alignedat`  | … do not need to be in display mode.\         |
|                                     | … have no automatic numbering.\               |
|                                     | … must be inside math delimiters in\          |
|                                     | order to be rendered by the auto-render\      |
|                                     | extension.                                    |
+-------------------------------------+-----------------------------------------------+

Acceptable horizontal line separators are: `\\` and `\cr`.

Temml supports `\tag{…}`, `\notag`, and `\nonumber` to modify equation numbering.

The `{array}` environment does not yet support `\cline` or `\multicolumn`.

## HTML

The following "raw HTML" features are potentially dangerous for untrusted
inputs, so they are disabled by default, and attempting to use them produces
the command names in red (which you can configure via the `errorColor`
[option](administration.html#options)).  To fully trust your LaTeX input, you need to pass
an option of `trust: true`; you can also enable just some of the commands
or for just some URLs via the `trust` [option](administration.html#options).

+:-------------------------------------+:-----------------------------------------------+
| $`\href{https://temml.org/}{\Temml}` | `\href{https://temml.org/}{\Temml}`            |
+--------------------------------------+------------------------------------------------+
| $`\url{https://temml.org/}`          | `\url{https://temml.org/}`                     |
+--------------------------------------+------------------------------------------------+
| $`\includegraphics[height=1em,       | `\includegraphics[height=1em,`\                |
|  totalheight=1.2em, width=1.2em,     | `totalheight=1.2em,width=1.2em, alt=sphere]`\  |
|  alt=sphere]{../sphere.jpg}`         | `{../sphere.jpg}`                              |
+--------------------------------------+------------------------------------------------+
| $`\id{idName}{x}`                    | `\id{idName}{x}`                               |
+--------------------------------------+------------------------------------------------+
| $`\class{class-name}{x}`             | `\class{class-name}{x}`                        |
+--------------------------------------+------------------------------------------------+
| $`\style{color: red;}{x}`            | `\style{color: red;}{x}`                       |
+--------------------------------------+------------------------------------------------+
| $`\data{datum1=a, datum2=b}{x}`      | `\data{datum1=a, datum2=b}{x}`                 |
+--------------------------------------+------------------------------------------------+

## Letters

**Greek Letters**

+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\Alpha` `\Alpha` | $`\Beta` `\Beta` | $`\Gamma` `\Gamma` | $`\Delta` `\Delta` | $`\Epsilon` `\Epsilon`   |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\Zeta` `\Zeta`   | $`\Eta` `\Eta`   | $`\Theta` `\Theta` | $`\Iota` `\Iota`   | $`\Kappa` `\Kappa`       |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\Lambda`         | $`\Mu` `\Mu`     | $`\Nu` `\Nu`       | $`\Xi` `\Xi`       | $`\Omicron` `\Omicron`   |
| `\Lambda`          |                  |                    |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\Pi` `\Pi`       | $`\Rho` `\Rho`   | $`\Sigma` `\Sigma` | $`\Tau` `\Tau`     | $`\Upsilon` `\Upsilon`   |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\Phi` `\Phi`     | $`\Chi` `\Chi`   | $`\Psi` `\Psi`     | $`\Omega` `\Omega` | $`\varGamma` `\varGamma` |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\varDelta`       | $`\varTheta`     | $`\varLambda`      | $`\varXi` `\varXi` | $`\varPi` `\varPi`       |
| `\varDelta`        | `\varTheta`      | `\varLambda`       |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\varSigma`       | $`\varUpsilon`   | $`\varPhi`         | $`\varPsi`         | $`\varOmega` `\varOmega` |
| `\varSigma`        |  `\varUpsilon`   |  `\varPhi`         |  `\varPsi`         |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\alpha` `\alpha` | $`\beta` `\beta` | $`\gamma` `\gamma` | $`\delta` `\delta` | $`\epsilon` `\epsilon`   |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\zeta` `\zeta`   | $`\eta` `\eta`   | $`\theta` `\theta` | $`\iota` `\iota`   | $`\kappa` `\kappa`       |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\lambda`         | $`\mu` `\mu`     | $`\nu` `\nu`       | $`\xi` `\xi`       | $`\omicron` `\omicron`   |
|`\lambda`           |                  |                    |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\pi` `\pi`       | $`\rho` `\rho`   | $`\sigma` `\sigma` | $`\tau` `\tau`     | $`\upsilon` `\upsilon`   |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\phi` `\phi`     | $`\chi` `\chi`   | $`\psi` `\psi`     | $`\omega` `\omega` |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\upalpha`        | $`\upbeta`       | $`\upgamma`        | $`\updelta`        | $`\upepsilon`            |
|  `\upalpha`        |  `\upbeta`       |  `\upgamma`        |  `\updelta`        |  `\upepsilon`            |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\upzeta`         | $`\upeta`        | $`\uptheta`        | $`\upiota`         | $`\upkappa` `\upkappa`   |
|  `\upzeta`         |  `\upeta`        |  `\uptheta`        |  `\upiota`         |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\uplambda`       | $`\upmu` `\upmu` | $`\upnu` `\upnu`   | $`\upxi` `\upxi`   | $`\upomicron`            |
|  `\uplambda`       |                  |                    |                    | `\upomicron`             |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\uppi` `\uppi`   | $`\uprho`        | $`\upsigma`        | $`\uptau` `\uptau` | $`\upupsilon`            |
|                    | `\uprho`         |  `\upsigma`        |                    |  `\upupsilon`            |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\upphi` `\upphi` | $`\upchi`        | $`\uppsi` `\uppsi` | $`\upomega`        |                          |
|                    |  `\upchi`        |                    |  `\upomega`        |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\varepsilon`     | $`\varkappa`     | $`\vartheta`       | $`\varpi` `\varpi` | $`\varrho` `\varrho`     |
| `\varepsilon`      |  `\varkappa`     |  `\vartheta`       |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\varsigma`       | $`\varphi`       | $`\Coppa` `\Coppa` | $`\coppa` `\coppa` | $`\Koppa` `\Koppa`       |
|  `\varsigma`       |  `\varphi`       |                    |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\koppa` `\koppa` | $`\Sampi`        | $`\sampi` `\sampi` | $`\Stigma`         | $`\stigma` `\stigma`     |
|                    |  `\Sampi`        |                    |  `\Stigma`         |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+
| $`\digamma`        | $`\varcoppa`     |                    |                    |                          |
|  `\digamma`        |  `\varcoppa`     |                    |                    |                          |
+--------------------+------------------+--------------------+--------------------+--------------------------+

Direct Input: <span class="direct">Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω
 α β γ δ ϵ ζ η θ ι κ λ μ ν ξ o π ρ σ τ υ ϕ χ ψ ω ε ϑ ϖ ϱ ς φ ϝ</span>

#### Other Letters

+:---------------------+:-------------------+:-------------------+:---------------------------+:---------------------------+
| $`\aleph` `\aleph`   | $`\nabla` `\nabla` | $`\imath` `\imath` | $`\text{\aa}` `\text{\aa}` | $`\text{\OE}` `\text{\OE}` |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+
| $`\beth` `\beth`     | $`\partial`        | $`\jmath` `\jmath` | $`\text{\AA}` `\text{\AA}` | $`\text{\o}` `\text{\o}`   |
|                      |  `\partial`        |                    |                            |                            |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+
| $`\gimel` `\gimel`   | $`\Game` `\Game`   | $`\Im` `\Im`       | $`\text{\ae}` `\text{\ae}` | $`\text{\O}` `\text{\O}`   |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+
| $`\daleth` `\daleth` | $`\Finv` `\Finv`   | $`\Bbbk` `\Bbbk`   | $`\text{\AE}` `\text{\AE}` | $`\text{\ss}` `\text{\ss}` |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+
| $`\eth` `\eth`       | $`\hbar` `\hbar`   | $`\Re` `\Re`       | $`\text{\oe}` `\text{\oe}` | $`\text{\i}` `\text{\i}`   |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+
| $`\ell` `\ell`       | $`\hslash`         | $`\wp` `\wp`       |                            | $`\text{\j}` `\text{\j}`   |
|                      |  `\hslash`         |                    |                            |                            |
+----------------------+--------------------+--------------------+----------------------------+----------------------------+

Letters in the _texvc_ extension

+:-----------------------+:-----------------------+:-----------------------+:-------------------+:-------------------------+
| $`\alef` `\alef`       | $`\Complex` `\Complex` | $`\natnums` `\natnums` | $`\real` `\real`   | $`\weierp` `\weierp`     |
+------------------------+------------------------+------------------------+--------------------+--------------------------+
| $`\alefsym` `\alefsym` | $`\image` `\image`     | $`\R` `\R`             | $`\reals` `\reals` | $`\thetasym` `\thetasym` |
+------------------------+------------------------+------------------------+--------------------+--------------------------+
| $`\cnums` `\cnums`     | $`\N` `\N`             | $`\Reals` `\Reals`     |                    | $`\Z` `\Z`               |
+------------------------+------------------------+------------------------+--------------------+--------------------------+

Direct Input: <span class="direct">∂ ∇ ℑ Ⅎ ℵ ℶ ℷ ℸ ⅁ ℏ ð À Á Â Ã Ä Å Æ Ç È É Ê Ë
Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö Ù Ú Û Ü Ý Þ ß à á â ã ä å ç è é ê ë ì í î ï ð ñ ò ó ô ö ù ú û ü ý þ ÿ
 ₊ ₋ ₌ ₍ ₎ ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₐ ₑ ₕ ᵢ ⱼ ₖ ₗ ₘ ₙ ₒ ₚ ᵣ ₛ ₜ ᵤ ᵥ ₓ ᵦ ᵧ ᵨ ᵩ ᵪ ⁺ ⁻ ⁼ ⁽ ⁾ ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ᵃ ᵇ ᶜ ᵈ ᵉ ᵍ ʰ ⁱ ʲ ᵏ ˡ ᵐ ⁿ ᵒ ᵖ ʳ ˢ ᵗ ᵘ ʷ ˣ ʸ ᶻ ᵛ ᵝ ᵞ ᵟ ᵠ ᵡ</span>

Math-mode Unicode (sub|super)script characters will render as if you had written regular 
characters in a subscript or superscript. For instance, `A²⁺³` will render the same
as `A^{2+3}`.

#### Unicode Mathematical Alphanumeric Symbols

| Item         |  Range                |  Item             |  Range                  |
|--------------|-----------------------|-------------------|-------------------------|
| Bold         | $`\text{𝐀-𝐙 𝐚-𝐳 𝟎-𝟗}`  | Double-struck     | $`\text{𝔸-ℤ 𝕒-𝕫 𝟘-𝟡}` |
| Italic       | $`\text{𝐴-𝑍 𝑎-𝑧}`      | Sans serif        | $`\text{𝖠-𝖹 𝖺-𝗓 𝟢-𝟫}`  |
| Bold Italic  | $`\text{𝑨-𝒁 𝒂-𝒛}`      | Sans serif bold   | $`\text{𝗔-𝗭 𝗮-𝘇 𝟬-𝟵}` |
| Fractur      | $`\text{𝔄-ℨ}\text{𝔞-𝔷}`| Sans serif italic | $`\text{𝘈-𝘡 𝘢-𝘻}`     |
| Monospace    | $`\text{𝙰-𝚉 𝚊-𝚣 𝟶-𝟿}`  | Sans serif bold italic | $`\text{𝘼-𝙕 𝙖-𝙯}` |

Any character can be written with the `\char` function and the Unicode code in hex. For example `\char"263a` will render as $`\char"263a`.

<br>

<div>For chancery or roundhand characters, it’s probably best to use <code>\mathcal</code> and <code>\mathscr</code> instead of Unicode input.<details><summary>Why?</summary>
<p>Unicode has historically accepted either chancery or roundhand glyphs in the range U+1D49C—U+1D4B5. That's confusing,
because Cambria Math has chancery in those code points and some other math fonts have roundhand in the same code points.
<a href="https://www.unicode.org/charts/PDF/U1D400.pdf">Unicode 14</a> has recently added code points that resolve the ambiguity. Both chancery and roundhand still occupy the same range, but each unambigous chancery character has a <code>\ufe00</code> appended to the code point and each unambigous roundhand character has a <code>\ufe01</code> appended to the code point.</p>
<p>Published fonts have not yet caught up to the new code point assignments. If you want your documents to not break in the future, it’s probably best to avoid Unicode input and stick with <code>\mathcal</code> and <code>\mathscr</code>.</p>
</details>
</div>

## Layout

### Line Breaks

Hard line breaks are `\\` and `\newline`.

If the rendering options do not include annotations, Hurmet will write MathML
with soft line breaks after relations and binary operators. These soft line
breaks will appear only in Firefox. Chromium and Safari do not support soft
line breaks.

### Vertical Layout

+:---------------+:-------------------------------------+:---------------------------------------------------+
| $`x_n` `x_n`   | $`\stackrel{!}{=}` `\stackrel{!}{=}` | $`a\raisebox{0.25em}{b}c` `a\raisebox{0.25em}{b}c` |
+----------------+--------------------------------------+----------------------------------------------------+
| $`e^x` `e^x`   | $`\overset{!}{=}` `\overset{!}{=}`   | $`M\raise3pt{M^2}M` `M\raise3pt{M^2}M`             |
+----------------+--------------------------------------+----------------------------------------------------+
| $`_u^o` `_u^o` | $`\underset{!}{=}` `\underset{!}{=}` | $`M\lower3pt{M^2}M` `M\lower3pt{M^2}M`             |
+----------------+--------------------------------------+----------------------------------------------------+
|                | $`a \atop b` `a \atop b`             |                                                    |
+----------------+--------------------------------------+----------------------------------------------------+

+:-------------------------------+:---------------------------------+
| $$                             | `\sum_{\substack{0<i<m\\0<j<n}}` |
| \sum_{\substack{0<i<m\\0<j<n}} |                                  |
| $$                             |                                  |
+--------------------------------+----------------------------------+

LaTeX puts the second argument of `\raisebox` into text mode, but it can
contain math if the math is nested within `$…$` delimiters, as in
`\raisebox{0.25em}{$\frac a b$}`

### Overlap and Spacing

+:-----------------------------------------+:-----------------------------------------------------------+
| $`{=}\mathllap{/\,}` `{=}\mathllap{/\,}` | $`\left(x^{\smash{2}}\right)` `\left(x^{\smash{2}}\right)` |
+------------------------------------------+------------------------------------------------------------+
| $`\mathrlap{\,/}{=}` `\mathrlap{\,/}{=}` | $`\sqrt{\smash[b]{y}}` `\sqrt{\smash[b]{y}} `              |
+------------------------------------------+------------------------------------------------------------+

+:------------------------------------------+:----------------------------------------------+
| $$                                        | `\sum_{\mathclap{1\le i\le j\le n}} x_{ij}`   |
| \sum_{\mathclap{1\le i\le j\le n}} x_{ij} |                                               |
| $$                                        |                                               |
+-------------------------------------------+-----------------------------------------------+

Temml also supports `\llap`, `\rlap`, and `\clap`. They work only in text mode if the rendering options
include `strict: true`.

#### Spacing

| Function        | Produces           | Function             | Produces                  |
|:----------------|:-------------------|:---------------------|:--------------------------|
| `\,`            | ³∕₁₈ em space      | `\kern{distance}`    | space, width = _distance_ |
| `\thinspace`    | ³∕₁₈ em space      | `\mkern{distance}`   | space, width = _distance_ |
| `\>`            | ⁴∕₁₈ em space      | `\mskip{distance}`   | space, width = _distance_ |
| `\:`            | ⁴∕₁₈ em space      | `\hskip{distance}`   | space, width = _distance_ |
| `\medspace`     | ⁴∕₁₈ em space      | `\hspace{distance}`  | space, width = _distance_ |
| `\;`            | ⁵∕₁₈ em space      | `\hspace*{distance}` | space, width = _distance_ |
| `\thickspace`   | ⁵∕₁₈ em space      | `\phantom{content}`  | space the width and height of content |
| `\enspace`      | ½ em space         | `\hphantom{content}` | space the width of content |
| `\quad`         | 1 em space         | `\vphantom{content}` | a strut the height of content |
| `\qquad`        | 2 em space         | `\!`                 | – ³∕₁₈ em space |
| `~`             | non-breaking space | `\negthinspace`      | – ³∕₁₈ em space |
| `\<space>`      | space              | `\negmedspace`       | – ⁴∕₁₈ em space |
| `\nobreakspace` | non-breaking space | `\negthickspace`     | – ⁵∕₁₈ em space |
| `\space`        | space              |                      |                 |

**Notes:**

`distance` will accept any of the [Temml units](#units).

`\kern`, `\mkern`, `\mskip`, and `\hskip` accept unbraced distances, as in: `\kern1em`.

`\mkern` and `\mskip` will not work in text mode and both will write a console warning for any unit except `mu`.

`\rule{}{distance}` is valuable as a vertical strut.

## Logic and Set Theory

+:-----------------------+:---------------------+:----------------------------+:-----------------------------+
| $`\forall` `\forall`   | $`\complement`       | $`\therefore`               | $`\emptyset` `\emptyset`     |
|                        |  `\complement`       |  `\therefore`               |                              |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\exists` `\exists`   | $`\subset` `\subset` | $`\because` `\because`      | $`\varnothing` `\varnothing` |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\nexists` `\nexists` | $`\supset` `\supset` | $`\mapsto` `\mapsto`        | $`\implies` `\implies`       |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\in` `\in`           | $`\mid` `\mid`       | $`\to` `\to`                | $`\impliedby` `\impliedby`   |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\ni` `\ni`           | $`\land` `\land`     | $`\gets` `\gets`            | $`\iff` `\iff`               |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\notin` `\notin`     | $`\lor` `\lor`       | $`\leftrightarrow`          | $`\lightning` `\lightning`   |
|                        |                      |  `\leftrightarrow`          |                              |
+------------------------+----------------------+-----------------------------+------------------------------+
| $`\notni` `\notni`     | $`\neg` `\neg`       | $`\Set{ x | x<\frac 1 2 }`\ | $`\set{x|x<5 }`\             |
|                        | or `\lnot`           |  `\Set{ x | x<\frac 1 2 }`  |  `\set{x|x<5}`               |
+------------------------+----------------------+                             |                              |
| $`\strictif`           | $`\strictfi`         |                             |                              |
| `\strictif`            | `\strictfi`          |                             |                              |
+------------------------+----------------------+-----------------------------+------------------------------+

Linear Logic (from the `cmll` package):

+-----------+----------------------+------------------------+----------------------+------------------------+
| Operators | $` \oc ` `\oc`       | $` \wn ` `\wn`         | $` \with ` `\with`   | $` \parr ` `\parr`     |
*           +----------------------+------------------------+----------------------+------------------------+
|           | $` \shpos ` `\shpos` | $` \shneg ` `\shneg`   | $` \shift ` `\shift` | $` \invamp ` `\invamp` |
+-----------+----------------------+------------------------+----------------------+------------------------+
| Relations | $` \coh ` `\coh`     | $` \scoh ` `\scoh`     | $` \Perp ` `\Perp`   | $` \multimapboth `     |
|           |                      |                        |                      | `\multimapboth`        |
*           +----------------------+------------------------+----------------------+------------------------+
|           | $` \incoh ` `\incoh` | $` \sincoh ` `\sincoh` |                      | $` \multimapinv `      |
|           |                      |                        |                      | `\multimapinv`         |
+-----------+----------------------+------------------------+----------------------+------------------------+

Equivalents in the _texvc_ extension

+:-------------------+:-----------------+:-------------------+:---------------+
| $`\exist` `\exist` | $`\isin` `\isin` | $`\empty` `\empty` | $`\sub` `\sub` |
+--------------------+------------------+--------------------+----------------+

Direct Input: <span class="direct">∀ ∴ ∁ ∵ ∃ ∣ ∈ ∉ ∋ ⊂ ⊃ ∧ ∨ ↦ → ← ↔ ∅ ⟹ ⟺ ¬ ↯ ⥼ ⥽</span>\
<span class="direct">ℂ ℍ ℕ ℙ ℚ ℝ</span>

## Macros

+:---------------------------------+:--------------------------------------------------------+
| $`\def\foo#1#2{#1^2 #2^3}        | `\def\macroname<arg list>{definition to be expanded}` \ |
| \foo a b + \foo c d`             | `\def\foo#1#2{#1^2 #2^3}` \                             |
|                                  |  `\foo a b + \foo c d`                                  |
+----------------------------------+---------------------------------------------------------+
|                                  | `\edef\macroname#1#2…{definition}`                      |
+----------------------------------+---------------------------------------------------------+
|                                  | `\let\foo=\bar`                                         |
+----------------------------------+---------------------------------------------------------+
|                                  | `\futurelet\foo\bar x`                                  |
+----------------------------------+---------------------------------------------------------+
| $`\newcommand\foo[2]{#1^2 #2^3}  | `\newcommand\macroname[numargs]{definition}` \          |
| \foo a b + \foo c d`             | `\newcommand\foo[2]{#1^2 #2^3}` \                       |
|                                  | `\foo a b + \foo c d`                                   |
+----------------------------------+---------------------------------------------------------+
|                                  | `\renewcommand\macroname[numargs]{definition}`          |
+----------------------------------+---------------------------------------------------------+
|                                  | `\providecommand\macroname[numargs]{definition}`        |
+----------------------------------+---------------------------------------------------------+

To create macros with document-wide scope, a [preamble](./administration.html#preamble) can be defined
as one of the Temml [rendering options](./administration.html#options)

Macros accept up to nine arguments: #1, #2, etc.

Available functions include:

`\char` `\mathchoice` `\TextOrMath` `\@ifstar` `\@ifnextchar` `\@firstoftwo` `\@secondoftwo` `\relax` `\expandafter` `\noexpand`

@ is a valid character for commands, as if `\makeatletter` were in effect.

Temml macros do not escape their group, so `\gdef`, `\xdef`, and`\global` are not supported.
Temml has no `\par`, so `\long` is ignored.

## Numbers

Temml’s default mode will consolidate a string of numerals into a single MathML
`<mn>` element. This applies to any string that begins and ends with a digit
(0-9) and includes digits, commas, or dots. Example: `<mn>2,000.00</mn>`.

In strict mode, Temml acts like LaTeX and treats each digit individually. This
is not as nice semantically, but it does maintain backwards compatibility for
LaTeX macros.

## Operators

### Big Operators

+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\sum` `\sum`       | $`\prod` `\prod`         | $`\bigotimes` `\bigotimes` | $`\bigvee` `\bigvee`          |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\int` `\int`       | $`\coprod` `\coprod`     | $`\bigoplus` `\bigoplus`   | $`\bigwedge` `\bigwedge`      |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\iint` `\iint`     | $`\intop` `\intop`       | $`\bigodot` `\bigodot`     | $`\bigcap` `\bigcap`          |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\iiint` `\iiint`   | $`\smallint` `\smallint` | $`\biguplus` `\biguplus`   | $`\bigcup` `\bigcup`          |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\iiiint` `\iiiint` | $`\intcap` `\intcap`     | $`\intcup` `\intcup`       | $`\bigsqcup` `\bigsqcup`      |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\oint` `\oint`     | $`\varointclockwise`     | $`\intclockwise`           | $`\bigsqcap`                  |
|                      |  `\varointclockwise`     |  `\intclockwise`           |  `\bigsqcap`                  |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\oiint` `\oiint`   | $`\pointint` `\pointint` | $`\rppolint` `\rppolint`   | $`\scpolint` `\scpolint`      |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\oiiint` `\oiiint` | $`\intlarhk` `\intlarhk` | $`\sqint` `\sqint`         | $`\intx` `\intx`              |
+----------------------+--------------------------+----------------------------+-------------------------------+
| $`\intbar` `\intbar` | $`\intBar` `\intBar`     | $`\fint` `\fint`           | $`\sideset{_a^b}{_c^d}\sum`   |
|                      |                          |                            |  `\sideset{_a^b}{_c^d}\sum`   |
+----------------------+--------------------------+----------------------------+-------------------------------+

Direct Input: <span class="direct">∫ ∬ ∭ ⨌ ∮ ∯ ∰ ⨖ ∲ ∏ ∐ ∑ ⋀ ⋁ ⋂ ⋃ ⨀ ⨁ ⨂ ⨄ ⨆ ⨅</span>

### Binary Operators

+--------------------------+--------------------------+--------------------------+--------------------------+
| $` + ` `+`               | $` \cdot ` `\cdot`       | $` \gtrdot ` `\gtrdot`   | $` x \pmod a ` `x \pmod  |
|                          |                          |                          | a`                       |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` - ` `-`               | $` \cdotp ` `\cdotp`     | $` \intercal `           | $` x \pod a ` `x \pod a` |
|                          |                          | `\intercal`              |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` / ` `/`               | $`\centerdot`            | $` \land ` `\land`       | $` \rhd ` `\rhd`         |
|                          | `\centerdot`             |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` * ` `*`               | $` \circ ` `\circ`       | $` \leftthreetimes `     | $` \rightthreetimes `    |
|                          |                          | `\leftthreetimes`        | `\rightthreetimes`       |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \amalg ` `\amalg`     | $` \circledast `         | $` \ldotp ` `\ldotp`     | $` \rtimes ` `\rtimes`   |
|                          | `\circledast`            |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \And ` `\And`         | $` \circledcirc `        | $` \lor ` `\lor`         | $` \setminus `           |
|                          | `\circledcirc`           |                          | `\setminus`              |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \ast ` `\ast`         | $` \circleddash `        | $` \lessdot ` `\lessdot` | $` \smallsetminus `      |
|                          | `\circleddash`           |                          | `\smallsetminus`         |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \barwedge `           | $` \Cup ` `\Cup`         | $` \lhd ` `\lhd`         | $` \sqcap ` `\sqcap`     |
| `\barwedge`              |                          |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \bigcirc ` `\bigcirc` | $` \cup ` `\cup`         | $` \ltimes ` `\ltimes`   | $` \sqcup ` `\sqcup`     |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \bmod ` `\bmod`       | $` \curlyvee `           | $` x \mod a ` `x\mod a`  | $` \times ` `\times`     |
|                          | `\curlyvee`              |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \boxdot `  `\boxdot`  | $` \curlywedge `         | $` \mp ` `\mp`           | $` \unlhd ` `\unlhd`     |
|                          | `\curlywedge`            |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \boxminus `           | $` \div ` `\div`         | $` \odot ` `\odot`       | $` \unrhd ` `\unrhd`     |
| `\boxminus`              |                          |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \boxplus ` `\boxplus` | $` \divideontimes `      | $` \ominus ` `\ominus`   | $` \uplus ` `\uplus`     |
|                          | `\divideontimes`         |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \boxtimes `           | $` \dotplus ` `\dotplus` | $` \oplus ` `\oplus`     | $` \vee ` `\vee`         |
| `\boxtimes`              |                          |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \bullet `  `\bullet`  | $` \doublebarwedge `     | $` \otimes ` `\otimes`   | $` \veebar ` `\veebar`   |
|                          | `\doublebarwedge`        |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \Cap ` `\Cap`         | $` \doublecap `          | $` \oslash ` `\oslash`   | $` \wedge ` `\wedge`     |
|                          | `\doublecap`             |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
| $` \cap ` `\cap`         | $` \doublecup `          | $` \parr `  ` \parr `    | $` \with `  ` \with `    |
|                          | `\doublecup`             |                          |                          |
+--------------------------+--------------------------+--------------------------+--------------------------+
|                          |                          | $` \pm ` `\pm`           | $` \wr ` `\wr`           |
+--------------------------+--------------------------+--------------------------+--------------------------+

The _texvc_ extension provides $`\plusmn` `\plusmn`.

Direct Input: <span class="direct">+ - / ∖ * ⋅ ∘ ± × ÷ ∓ ∔ ∧ ∨ ∩ ∪ ≀ ⊎ ⊓ ⊔ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊝ ◯</span>

### Fractions and Binomials

+:----------------+:-----------------+:-------------------------------+
| $`\frac{a}{b}`  | $`\tfrac{a}{b}`  | $`\genfrac ( ] {2pt}{1}a{a+1}` |
|   `\frac{a}{b}` |  `\tfrac{a}{b}`  |  `\genfrac ( ] {2pt}{1}a{a+1}` |
+-----------------+------------------+--------------------------------+
| $`{a \over b}`  | $`\dfrac{a}{b}`  | $`{a \above{2pt} b+1}`         |
|  `{a \over b}`  |  `\dfrac{a}{b}`  |  `{a \above{2pt} b+1}`         |
+-----------------+------------------+--------------------------------+
| $`a/b`  `a/b`   |                  | $`\cfrac{a}{1 + \cfrac{1}{b}}` |
|                 |                  |  `\cfrac{a}{1 + \cfrac{1}{b}}` |
+-----------------+------------------+--------------------------------+

+:---------------------------------+:---------------------------------+:-----------------------------+
| $`\binom{n}{k}` `\binom{n}{k}`   | $`\dbinom{n}{k}` `\dbinom{n}{k}` | $`{n\brace k}` `{n\brace k}` |
+----------------------------------+----------------------------------+------------------------------+
| $`{n \choose k}` `{n \choose k}` | $`\tbinom{n}{k}` `\tbinom{n}{k}` | $`{n\brack k}` `{n\brack k}` |
+----------------------------------+----------------------------------+------------------------------+

### Math Operators

+---------------------------+------------------------+--------------------------------+--------------------+
| $` \operatorname{f} `     | $` \cosec ` `\cosec`   | $` \dim ` `\dim`               | $`\pdv*{f}{x,y}`   |
| `\operatorname{f}`        |                        |                                |  `\pdv*{f}{x,y}`   |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arcsin ` `\arcsin`    | $` \cosh ` `\cosh`     | $` \exp ` `\exp`               | $` \sec ` `\sec`   |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arccos ` `\arccos`    | $` \cot ` `\cot`       | $` \hom ` `\hom`               | $` \sgn `  `\sgn`  |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arctan ` `\arctan`    | $` \cotg ` `\cotg`     | $` \ker ` `\ker`               | $` \sin ` `\sin`   |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arctg ` `\arctg`      | $` \coth ` `\coth`     | $` \lg ` `\lg`                 | $` \sinh ` `\sinh` |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arcctg ` `\arcctg`    | $` \csc ` `\csc`       | $` \ln ` `\ln`                 | $` \sh ` `\sh`     |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \arg ` `\arg`          | $` \ctg ` `\ctg`       |  $` \log ` `\log`              | $` \tan ` `\tan`   |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \ch ` `\ch`            | $` \cth ` `\cth`       | $`\odv{f}{x}` `\odv{f}{x}`     | $` \tanh ` `\tanh` |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \cos ` `\cos`          | $` \nabla ` `\nabla`   | $`\odv*{f}{x}` `\odv*{f}{x}`   | $` \tg ` `\tg`     |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \partial ` `\partial`  | $` \deg ` `\deg`       | $`\pdv{f}{x,y}` `\pdv{f}{x,y}` | $` \th ` `\th`     |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \operatorname*{f} `    | $` \inf ` `\inf`       | $` \max ` `\max`               | $` \sup ` `\sup`   |
| `\operatorname*{f}` or\   |                        |                                |                    |
| `\operatornamewithlimits` |                        |                                |                    |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \argmax ` `\argmax`    | $` \injlim ` `\injlim` | $` \min ` `\min`               | $` \varinjlim `    |
|                           |                        |                                | `\varinjlim`       |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \argmin ` `\argmin`    | $` \lim ` `\lim`       | $` \plim ` `\plim`             | $` \varliminf `    |
|                           |                        |                                | `\varliminf`       |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \det ` `\det`          | $` \liminf ` `\liminf` | $` \Pr ` `\Pr`                 | $` \varlimsup `    |
|                           |                        |                                | `\varlimsup`       |
+---------------------------+------------------------+--------------------------------+--------------------+
| $` \gcd ` `\gcd`          | $` \limsup ` `\limsup` | $` \projlim ` `\projlim`       | $` \varprojlim `   |
|                           |                        |                                | `\varprojlim`      |
+---------------------------+------------------------+--------------------------------+--------------------+

Functions in the bottom five rows of this table can take `\limits`.

### Enclosing Operators

+:-------------------------------+:-------------------------------+
| $`\sqrt{x}` `\sqrt{x}`         | $`a_{\angl n}`   `a_{\angl n}` |
+--------------------------------+--------------------------------+
| $`\sqrt[3]{x}` `\sqrt[3]{x}`   | $`a_\angln`   `a_\angln`       |
+--------------------------------+--------------------------------+

## Physics and Chemistry

+:---------------------------+:-------------------------------------------------------------+
| $`\bra{\phi}` `\bra{\phi}` | $`\prescript{a}{2}{\mathbf{C}}^{5+}_{2}`                     |
|                            |  `\prescript{a}{2}{\mathbf{C}}^{5+}_{2}`                     |
+----------------------------+--------------------------------------------------------------+
| $`\ket{\psi}` `\ket{\psi}` | $`\braket{\phi\vert\psi}`                                    |
|                            |  `\braket{\phi\vert\psi}`                                    |
+----------------------------+--------------------------------------------------------------+
| $`\Bra{\phi}` `\Bra{\phi}` | $`\Braket{ \phi | \frac{\partial^2}{\partial t^2} | \psi }`\ |
|                            |  `\Braket{ \phi | \frac{\partial^2}{\partial t^2} | \psi }`  |
+----------------------------+                                                              +
| $`\Ket{\psi}` `\Ket{\psi}` |                                                              |
+----------------------------+--------------------------------------------------------------+

From the _mhchem_ extension:

+:----------------------------------+:---------------------------------+
| $`\ce{SO4^2- + Ba^2+ -> BaSO4 v}` | `\ce{SO4^2- + Ba^2+ -> BaSO4 v}` |
+-----------------------------------+----------------------------------+
| $`\pu{75.3 J // mol K}`           | `\pu{75.3 J // mol K}`           |
+-----------------------------------+----------------------------------+

<p>There is much more <code>mhchem</code> information in the
<a href="https://mhchem.github.io/MathJax-mhchem/" target="\_blank">mhchem docs</a>.</p>

<br>

<div><details><summary>Click to see the <em>physics</em> extension.</summary>

+:--------------------------------+:----------------------------+:-------------------------+
| $`\abs{x}` `\abs{x}`            | $`\innerproduct{a}{b}`      | $`\qif` `\qif`           |
|                                 | `\innerproduct{a}{b}`       |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\absolutevalue{x}`            | $`\ketbra{a}{b}`            | $`\qin` `\qin`           |
| `\absolutevalue{x}`             |   `\ketbra{a}{b}`           |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\acomm{A}{B}` `\acomm{A}{B}`  | $`\laplacian`               | $`\qinteger` `\qinteger` |
|                                 |  `\laplacian`               |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\anticommutator{A}{B}`        | $`\matrixel{n}{A}{m}`       | $`\qlet` `\qlet`         |
|  `\anticommutator{A}{B}`        |  `\matrixel{n}{A}{m}`       |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\Bqty{5 \text{mm}}`           | $`\matrixelement{n}{A}{m}`  | $`\qodd` `\qodd`         |
|  `\Bqty{5 \text{mm}}`           |  `\matrixelement{n}{A}{m}`  |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\bqty{5 \text{mm}}`           | $`\mel{n}{A}{m}`            | $`\qor` `\qor`           |
|  `\bqty{5 \text{mm}}`           |   `\mel{n}{A}{m}`           |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\comm{A}{B}` `\comm{A}{B}`    | $`\norm{x}` `\norm{x}`      | $`\qotherwise`           |
|                                 |                             |  `\qotherwise`           |
+---------------------------------+-----------------------------+--------------------------+
| $`\commutator{A}{B}`            | $`\op{a}{b}` `\op{a}{b}`    | $`\qq{text}` `\qq{text}` |
|  `\commutator{A}{B}`            |                             |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\cp` `\cp`                    | $`\order{x^2}`              | $`\qqtext{text}`         |
|                                 |  `\order{x^2}`              |  `\qqtext{text}`         |
+---------------------------------+-----------------------------+--------------------------+
| $`\cross` `\cross`              | $`\outerproduct{a}{b}`      | $`\qsince` `\qsince`     |
|                                 |  `\outerproduct{a}{b}`      |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\crossproduct`                | $`\partialderivative{x}{y}` | $`\qthen` `\qthen`       |
|  `\crossproduct`                |  `\partialderivative{x}{y}` |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\curl` `\curl`                | $`\pb{x}{y}` `\pb{x}{y}`    | $`\qty{5 \text{m}}`      |
|                                 |                             |  `\qty{5 \text{m}}`      |
+---------------------------------+-----------------------------+--------------------------+
| $`\dd` `\dd`                    |                             | $`\quantity{5 \text{m}}` |
|                                 |                             |  `\quantity{5 \text{m}}` |
+---------------------------------+-----------------------------+--------------------------+
| $`\derivative{x}{y}`            | $`\poissonbracket{A}{B}`    | $`\qunless` `\qunless`   |
|  `\derivative{x}{y}`            |  `\poissonbracket{A}{B}`    |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\differential`                | $`\pqty{5}` `\pqty{5}`      | $`\qusing` `\qusing`     |
|  `\differential`                |                             |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\divergence` `\divergence`    | $`\principalvalue`          | $`\rank M` `\rank M`     |
|                                 |  `\principalvalue`          |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\dotproduct` `\dotproduct`    | $`\pv` `\pv`                | $`\Res[f(z)]`            |
|                                 |                             |  `\Res\[f(z)\]`          |
+---------------------------------+-----------------------------+--------------------------+
| $`\dv{x}{y}` `\dv{x}{y}`        | $`\PV(x)` `\PV(x)`          | $`\Tr\rho` `\Tr\rho`     |
+---------------------------------+-----------------------------+--------------------------+
| $`\dyad{a}{b}` `\dyad{a}{b}`    | $`\qall` `\qall`            | $`\tr\rho` `\tr\rho`     |
+---------------------------------+-----------------------------+--------------------------+
| $`\erf(x)` `\erf(x)`            | $`\qand` `\qand`            | $`\va{a}` `\va{a}`       |
+---------------------------------+-----------------------------+--------------------------+
| $`\ev{x}` `\ev{x}`              | $`\qas` `\qas`              | $`\var` `\var`           |
+---------------------------------+-----------------------------+--------------------------+
| $`\eval{\tfrac 1 2 x}_0^n`      | $`\qassume` `\qassume`      | $`\variation`            |
|  `\eval{\tfrac 1 2 x}_0^n`      |                             |  `\variation`            |
+---------------------------------+-----------------------------+--------------------------+
| $`\evaluated{\tfrac 1 2 x}_0^n` | $`\qc` `\qc`                | $`\vb{a}` `\vb{a}`       |
|  `\evaluated{\tfrac 1 2 x}_0^n` |                             |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\expectationvalue{x}`         | $`\qcc` `\qcc`              | $`\vdot` `\vdot`         |
|  `\expectationvalue{x}`         |                             |                          |
+---------------------------------+-----------------------------+--------------------------+
| $`\expval{x}` `\expval{x}`      | $`\qcomma` `\qcomma`        | $`\vectorarrow{a}`       |
|                                 |                             |  `\vectorarrow{a}`       |
+---------------------------------+-----------------------------+--------------------------+
| $`\fdv{x}{y}` `\fdv{x}{y}`      | $`\qelse` `\qelse`          | $`\vectorbold{a}`        |
|                                 |                             |  `\vectorbold{a}`        |
+---------------------------------+-----------------------------+--------------------------+
| $`\functionalderivative{x}{y}`  | $`\qeven` `\qeven`          | $`\vectorunit{a}`        |
|  `\functionalderivative{x}{y}`  |                             |   `\vectorunit{a}`       |
+---------------------------------+-----------------------------+--------------------------+
| $`\grad` `\grad`                | $`\qfor` `\qfor`            | $`\vqty{x}` `\vqty{x}`   |
+---------------------------------+-----------------------------+--------------------------+
| $`\gradient` `\gradient`        | $`\qgiven` `\qgiven`        | $`\vu{a}` `\vu{a}`       |
+---------------------------------+-----------------------------+--------------------------+

</details></div>

## Relations

$`\stackrel{!}{=}\vphantom{\frac a b}` `\stackrel{!}{=}`

+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` = ` `=`                | $` \eqcirc ` `\eqcirc`    | $` \lesseqqgtr `                  | $` \smallsmile `         |
|                           |                           | `\lesseqqgtr`                     | `\smallsmile`            |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` < ` `<`                | $` \eqcolon ` `\eqcolon`  | $` \lessgtr ` `\lessgtr`          | $` \smile ` `\smile`     |
|                           | or\                       |                                   |                          |
|                           |   `\minuscolon`           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` > ` `>`                | $` \Eqcolon ` `\Eqcolon`  | $` \lesssim ` `\lesssim`          | $` \sqsubset `           |
|                           | or\                       |                                   | `\sqsubset`              |
|                           |    `\minuscoloncolon`     |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` : ` `:`                | $` \eqqcolon `            | $` \ll ` `\ll`                    | $` \sqsubseteq `         |
|                           | `\eqqcolon`               |                                   | `\sqsubseteq`            |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` := `  `:=`             | $` \Eqqcolon `            | $` \lll ` `\lll`                  | $` \sqsupset `           |
|                           | `\Eqqcolon`               |                                   | `\sqsupset`              |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \approx ` `\approx`    | $` \eqdef ` `\eqdef`      | $` \llless ` `\llless`            | $` \sqsupseteq `         |
|                           |                           |                                   | `\sqsupseteq`            |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \approxeq `            | $` \eqsim ` `\eqsim`      | $` \lt ` `\lt`                    | $` \stareq ` `\stareq`   |
| `\approxeq`               |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \arceq ` `\arceq`      | $` \eqslantgtr `          | $` \measeq ` `\measeq`            | $` \Subset ` `\Subset`   |
|                           | `\eqslantgtr`             |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \asymp ` `\asymp`      | $` \eqslantless `         | $` \mid ` `\mid`                  | $` \subset ` `\subset`   |
|                           | `\eqslantless`            |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \backcong `            | $` \equiv ` `\equiv`      | $` \models ` `\models`            | $` \subseteq `           |
| `\backcong`               |                           |                                   | `\subseteq`              |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \backepsilon `         | $` \fallingdotseq `       | $` \multimap `                    | $` \subseteqq `          |
| `\backepsilon`            | `\fallingdotseq`          | `\multimap`                       | `\subseteqq`             |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \backsim ` `\backsim`  | $` \frown ` `\frown`      | $`\multimapboth ` `\multimapboth` | $` \succ ` `\succ`       |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \backsimeq `           | $` \ge ` `\ge`            | $`\multimapinv ` `\multimapinv`   | $` \succapprox `         |
| `\backsimeq`              |                           |                                   | `\succapprox`            |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \between ` `\between`  | $` \geq ` `\geq`          | $` \origof ` `\origof`            | $` \succcurlyeq `        |
|                           |                           |                                   | `\succcurlyeq`           |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \bowtie ` `\bowtie`    | $` \geqq ` `\geqq`        | $` \owns ` `\owns`                | $` \succeq ` `\succeq`   |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \bumpeq ` `\bumpeq`    | $` \geqslant `            | $` \parallel `                    | $` \succsim ` `\succsim` |
|                           | `\geqslant`               | `\parallel`                       |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Bumpeq ` `\Bumpeq`    | $` \gg ` `\gg`            | $` \perp ` `\perp`                | $` \Supset ` `\Supset`   |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \circeq ` `\circeq`    | $` \ggg ` `\ggg`          | $` \Perp ` `\Perp`                | $` \supset ` `\supset`   |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \coh ` `\coh`          | $` \gggtr ` `\gggtr`      | $` \pitchfork `                   | $` \supseteq `           |
|                           |                           | `\pitchfork`                      | `\supseteq`              |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \colonapprox `         | $` \gt ` `\gt`            | $` \prec ` `\prec`                | $` \supseteqq `          |
| `\colonapprox`            |                           |                                   | `\supseteqq`             |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Colonapprox `         | $` \gtrapprox `           | $` \precapprox `                  | $` \thickapprox `        |
| `\Colonapprox` or\        | `\gtrapprox`              | `\precapprox`                     | `\thickapprox`           |
|     `\coloncolonapprox`   |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \coloneq `  `\coloneq` | $` \gtreqless `           | $` \preccurlyeq `                 | $` \thicksim `           |
| or\                       | `\gtreqless`              | `\preccurlyeq`                    | `\thicksim`              |
|    `\colonminus`          |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Coloneq `  `\Coloneq` | $` \gtreqqless `          | $` \preceq ` `\preceq`            | $` \trianglelefteq `     |
| or\                       | `\gtreqqless`             |                                   | `\trianglelefteq`        |
|    `\coloncolonminus`     |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \coloneqq `            | $` \gtrless `  `\gtrless` | $` \precsim ` `\precsim`          | $` \triangleq `          |
| `\coloneqq` or\           |                           |                                   | `\triangleq`             |
|    `\colonequals`         |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Coloneqq `            | $` \gtrsim ` `\gtrsim`    | $` \propto ` `\propto`            | $` \trianglerighteq `    |
| `\Coloneqq` or \          |                           |                                   | `\trianglerighteq`       |
|     `\coloncolonequals`   |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \colonsim `            | $` \imageof `  `\imageof` | $` \questeq ` `\questeq`          | $` \varpropto `          |
| `\colonsim`               |                           |                                   | `\varpropto`             |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Colonsim `            | $` \in ` `\in` or `\isin` | :`\ratio` or\                     | $` \vartriangle `        |
| `\Colonsim` or\           |                           |    `\vcentcolon`                  | `\vartriangle`           |
|    `\coloncolonsim`       |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \cong ` `\cong`        | $` \incoh ` `\incoh`      | $` \risingdotseq `                | $` \vartriangleleft `    |
|                           |                           | `\risingdotseq`                   | `\vartriangleleft`       |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \curlyeqprec `         | $` \Join ` `\Join`        | $` \scoh ` `\scoh`                | $` \vartriangleright `   |
| `\curlyeqprec`            |                           |                                   | `\vartriangleright`      |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \curlyeqsucc `         | $` \le ` `\le`            | $` \shortmid `                    | $` \vdash ` `\vdash`     |
| `\curlyeqsucc`            |                           | `\shortmid`                       |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \dashv ` `\dashv`      | $` \leq ` `\leq`          | $` \shortparallel `               | $` \vDash ` `\vDash`     |
|                           |                           | `\shortparallel`                  |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \dblcolon `            | $` \leqq ` `\leqq`        | $` \sim ` `\sim`                  | $` \Vdash ` `\Vdash`     |
| `\dblcolon` or\           |                           |                                   |                          |
|     `\coloncolon`         |                           |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \doteq ` `\doteq`      | $` \leqslant `            | $` \simeq ` `\simeq`              | $` \Vvdash ` `\Vvdash`   |
|                           | `\leqslant`               |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \Doteq ` `\Doteq`      | $` \lessapprox `          | $` \sincoh ` `\sincoh`            | $` \veeeq ` `\veeeq`     |
|                           | `\lessapprox`             |                                   |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+
| $` \doteqdot `            | $` \lesseqgtr `           | $` \smallfrown `                  | $` \wedgeq ` `\wedgeq`   |
| `\doteqdot`               | `\lesseqgtr`              | `\smallfrown`                     |                          |
+---------------------------+---------------------------+-----------------------------------+--------------------------+

The _texvc_ extension provides $`\sub` `\sub`, $`\sube` `\sube`, and $`\supe` `\supe`.

Direct Input: <span class="direct">= &lt; &gt; : ∈ ∋ ∝ ∼ ∽ ≂ ≃ ≅ ≈ ≊ ≍ ≎ ≏ ≐ ≑ ≒ ≓ ≖
≗ ≜ ≡ ≤ ≥ ≦ ≧ ≫ ≬ ≳ ≷ ≺ ≻ ≼ ≽ ≾ ≿ ⊂ ⊃ ⊆ ⊇ ⊏ ⊐ ⊑ ⊒ ⊢ ⊣ ⊩ ⊪ ⊸ ⋈ ⋍ ⋐ ⋑ ⋔ ⋙
⋛ ⋞ ⋟ ⌢ ⌣ ⩾ ⪆ ⪌ ⪕ ⪖ ⪯ ⪰ ⪷ ⪸ ⫅ ⫆ ≲ ⩽ ⪅ ≶ ⋚ ⪋ ⟂ ⊨ ≔ ≕ ⩴ ⊷ ⊶</span>

### Negated Relations

$`\not =` `\not =`

+----------------------+---------------------------+--------------------------+------------------------+
| $` \gnapprox `       | $` \ngeqslant `           | $` \nsubset `            | $` \nVdash ` `\nVdash` |
| `\gnapprox`          | `\ngeqslant`              |  ` \nsubset `            |                        |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \gneq ` `\gneq`   | $` \ngtr ` `\ngtr`        | $` \nsubseteq `          | $` \precnapprox `      |
|                      |                           | `\nsubseteq`             | `\precnapprox`         |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \gneqq ` `\gneqq` | $` \nleq ` `\nleq`        | $` \nsubseteqq `         | $` \precneqq `         |
|                      |                           | `\nsubseteqq`            | `\precneqq`            |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \gnsim ` `\gnsim` | $` \nleqq ` `\nleqq`      | $` \nsucc ` `\nsucc`     | $` \precnsim `         |
|                      |                           |                          | `\precnsim`            |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \gvertneqq `      | $` \nleqslant `           | $` \nsucceq ` `\nsucceq` | $` \subsetneq `        |
| `\gvertneqq`         | `\nleqslant`              |                          | `\subsetneq`           |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \lnapprox `       | $` \nless ` `\nless`      | $` \nsupset `            | $` \subsetneqq `       |
| `\lnapprox`          |                           |  ` \nsupset `            | `\subsetneqq`          |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \lneq ` `\lneq`   | $` \nmid ` `\nmid`        | $` \nsupseteq `          | $` \succnapprox `      |
|                      |                           | `\nsupseteq`             | `\succnapprox`         |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \lneqq ` `\lneqq` | $` \notin ` `\notin`      | $` \nsupseteqq `         | $` \succneqq `         |
|                      |                           | `\nsupseteqq`            | `\succneqq`            |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \lnsim ` `\lnsim` | $` \notni ` `\notni`      | $` \ntriangleleft `      | $` \succnsim `         |
|                      |                           | `\ntriangleleft`         | `\succnsim`            |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \lvertneqq `      | $` \nparallel `           | $` \ntrianglelefteq `    | $` \supsetneq `        |
| `\lvertneqq`         | `\nparallel`              | `\ntrianglelefteq`       | `\supsetneq`           |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \ncong ` `\ncong` | $` \nprec ` `\nprec`      | $` \ntriangleright `     | $` \supsetneqq `       |
|                      |                           | `\ntriangleright`        | `\supsetneqq`          |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \ne ` `\ne`       | $` \npreceq `  `\npreceq` | $` \ntrianglerighteq `   | $` \varsubsetneq `     |
|                      |                           | `\ntrianglerighteq`      | `\varsubsetneq`        |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \neq ` `\neq`     | $` \nshortmid `           | $` \nvdash ` `\nvdash`   | $` \varsubsetneqq `    |
|                      | `\nshortmid`              |                          | `\varsubsetneqq`       |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \ngeq ` `\ngeq`   | $` \nshortparallel `      | $` \nvDash ` `\nvDash`   | $` \varsupsetneq `     |
|                      | `\nshortparallel`         |                          | `\varsupsetneq`        |
+----------------------+---------------------------+--------------------------+------------------------+
| $` \ngeqq ` `\ngeqq` | $` \nsim ` `\nsim`        | $` \nVDash ` `\nVDash`   | $` \varsupsetneqq `    |
|                      |                           |                          | `\varsupsetneqq`       |
+----------------------+---------------------------+--------------------------+------------------------+

Direct Input: <span class="direct">∉ ∌ ∤ ∦ ≁ ≆ ≠ ≨ ≩ ≮ ≯ ≰ ≱ ⊀ ⊁ ⊄ ⊅ ⊈ ⊉ ⊊ ⊋ ⊬ ⊭ 
⊮ ⊯ ⋠ ⋡ ⋦ ⋧ ⋨ ⋩ ⋬ ⋭ ⪇ ⪈ ⪉ ⪊ ⪵ ⪶ ⪹ ⪺ ⫋ ⫌</span>

### Arrows

+------------------------+-------------------------+------------------------+
| $`\circlearrowleft`    | $`\Leftrightarrow`      | $`\rightarrow`         |
| `\circlearrowleft`     | `\Leftrightarrow`       | `\rightarrow`          |
+------------------------+-------------------------+------------------------+
| $`\circlearrowright`   | $`\leftrightarrows`     | $`\Rightarrow`         |
| `\circlearrowright`    | `\leftrightarrows`      | `\Rightarrow`          |
+------------------------+-------------------------+------------------------+
| $`\curvearrowleft`     | $`\leftrightharpoons`   | $`\rightarrowtail`     |
|  `\curvearrowleft`     |  `\leftrightharpoons`   |  `\rightarrowtail`     |
+------------------------+-------------------------+------------------------+
| $`\curvearrowright`    | $`\leftrightsquigarrow` | $`\rightharpoondown`   |
|  `\curvearrowright`    |  `\leftrightsquigarrow` |  `\rightharpoondown`   |
+------------------------+-------------------------+------------------------+
| $`\dashleftarrow`      | $`\Lleftarrow`          | $`\rightharpoonup`     |
|  `\dashleftarrow`      |  `\Lleftarrow`          |  `\rightharpoonup`     |
+------------------------+-------------------------+------------------------+
| $`\dashrightarrow`     | $`\longleftarrow`       | $`\rightleftarrows`    |
|  `\dashrightarrow`     |  `\longleftarrow`       |  `\rightleftarrows`    |
+------------------------+-------------------------+------------------------+
| $`\downarrow`          | $`\Longleftarrow`       | $`\rightleftharpoons`  |
|  `\downarrow`          |  `\Longleftarrow`       |  `\rightleftharpoons`  |
+------------------------+-------------------------+------------------------+
| $`\Downarrow`          | $`\longleftrightarrow`  | $`\rightrightarrows`   |
|  `\Downarrow`          |  `\longleftrightarrow`  |  `\rightrightarrows`   |
+------------------------+-------------------------+------------------------+
| $`\downdownarrows`     | $`\Longleftrightarrow`  | $`\rightsquigarrow`    |
|  `\downdownarrows`     |  `\Longleftrightarrow`  |  `\rightsquigarrow`    |
+------------------------+-------------------------+------------------------+
| $`\downharpoonleft`    | $`\longmapsto`          | $`\Rrightarrow`        |
|  `\downharpoonleft`    |  `\longmapsto`          |  `\Rrightarrow`        |
+------------------------+-------------------------+------------------------+
| $`\downharpoonright`   | $`\longrightarrow`      | $`\Rsh` `\Rsh`         |
|  `\downharpoonright`   |  `\longrightarrow`      |                        |
+------------------------+-------------------------+------------------------+
| $`\gets` `\gets`       | $`\Longrightarrow`      | $`\searrow` `\searrow` |
|                        |  `\Longrightarrow`      |                        |
+------------------------+-------------------------+------------------------+
| $`\hookleftarrow`      | $`\looparrowleft`       | $`\swarrow` `\swarrow` |
|  `\hookleftarrow`      |  `\looparrowleft`       |                        |
+------------------------+-------------------------+------------------------+
| $`\hookrightarrow`     | $`\looparrowright`      | $`\to` `\to`           |
|  `\hookrightarrow`     |  `\looparrowright`      |                        |
+------------------------+-------------------------+------------------------+
| $`\iff` `\iff`         | $`\Lsh` `\Lsh`          | $`\twoheadleftarrow`   |
|                        |                         |  `\twoheadleftarrow`   |
+------------------------+-------------------------+------------------------+
| $`\impliedby`          | $`\mapsto` `\mapsto`    | $`\twoheadrightarrow`  |
|  `\impliedby`          |                         |  `\twoheadrightarrow`  |
+------------------------+-------------------------+------------------------+
| $`\implies` `\implies` | $`\nearrow` `\nearrow`  | $`\uparrow` `\uparrow` |
+------------------------+-------------------------+------------------------+
| $`\leadsto` `\leadsto` | $`\nleftarrow`          | $`\Uparrow` `\Uparrow` |
|                        |  `\nleftarrow`          |                        |
+------------------------+-------------------------+------------------------+
| $`\leftarrow`          | $`\nLeftarrow`          | $`\updownarrow`        |
|  `\leftarrow`          |  `\nLeftarrow`          |  `\updownarrow`        |
+------------------------+-------------------------+------------------------+
| $`\Leftarrow`          | $`\nleftrightarrow`     | $`\Updownarrow`        |
|  `\Leftarrow`          |  `\nleftrightarrow`     |  `\Updownarrow`        |
+------------------------+-------------------------+------------------------+
| $`\leftarrowtail`      | $`\nLeftrightarrow`     | $`\upharpoonleft`      |
|  `\leftarrowtail`      |  `\nLeftrightarrow`     |  `\upharpoonleft`      |
+------------------------+-------------------------+------------------------+
| $`\leftharpoondown`    | $`\nrightarrow`         | $`\upharpoonright`     |
|  `\leftharpoondown`    |  `\nrightarrow`         |  `\upharpoonright`     |
+------------------------+-------------------------+------------------------+
| $`\leftharpoonup`      | $`\nRightarrow`         | $`\upuparrows`         |
|  `\leftharpoonup`      |  `\nRightarrow`         |  `\upuparrows`         |
+------------------------+-------------------------+------------------------+
| $`\leftleftarrows`     | $`\nwarrow` `\nwarrow`  |                        |
|  `\leftleftarrows`     |                         |                        |
+------------------------+-------------------------+------------------------+
| $`\leftrightarrow`     | $`\restriction`         |                        |
|  `\leftrightarrow`     |  `\restriction`         |                        |
+------------------------+-------------------------+------------------------+

Arrows in the _texvc_ extension

+:-----------------+:-----------------+:-----------------+:-------------------+:-----------------+:-----------------+
| $`\Darr` `\Darr` | $`\Harr` `\Harr` | $`\Larr` `\Larr` | $`\Lrarr` `\Lrarr` | $`\Rarr` `\Rarr` | $`\Uarr` `\Uarr` |
+------------------+------------------+------------------+--------------------+------------------+------------------+
| $`\dArr` `\dArr` | $`\hArr` `\hArr` | $`\lArr` `\lArr` | $`\lrArr` `\lrArr` | $`\rArr` `\rArr` | $`\uArr` `\uArr` |
+------------------+------------------+------------------+--------------------+------------------+------------------+
| $`\darr` `\darr` | $`\harr` `\harr` | $`\larr` `\larr` | $`\lrarr` `\lrarr` | $`\rarr` `\rarr` | $`\uarr` `\uarr` |
+------------------+------------------+------------------+--------------------+------------------+------------------+

Direct Input: <span class="direct">← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↞ ↠ ↢ ↣ ↦ ↩ ↪ ↫ ↬ ↭ ↮ ↰ ↱↶ ↷ ↺ ↻ ↼ ↽ ↾ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇚ ⇛ ⇝ ⇠ ⇢ ⟵ ⟶ ⟷ ⟸ ⟹ ⟺ ⟼ ↽</span>

### Extensible Arrows

+:-------------------------------------------------------+:---------------------------------------------------------+
| $`\xleftarrow{abc}` `\xleftarrow{abc}`                 | $`\xrightarrow[under]{over}` `\xrightarrow[under]{over}` |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xLeftarrow{abc}` `\xLeftarrow{abc}`                 | $`\xRightarrow{abc}` `\xRightarrow{abc}`                 |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xleftrightarrow{abc}` `\xleftrightarrow{abc}`       | $`\xLeftrightarrow{abc}` `\xLeftrightarrow{abc}`         |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xhookleftarrow{abc}` `\xhookleftarrow{abc}`         | $`\xhookrightarrow{abc}` `\xhookrightarrow{abc}`         |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xtwoheadleftarrow{abc}` `\xtwoheadleftarrow{abc}`   | $`\xtwoheadrightarrow{abc}` `\xtwoheadrightarrow{abc}`   |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xleftharpoonup{abc}` `\xleftharpoonup{abc}`         | $`\xrightharpoonup{abc}` `\xrightharpoonup{abc}`         |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xleftharpoondown{abc}` `\xleftharpoondown{abc}`     | $`\xrightharpoondown{abc}` `\xrightharpoondown{abc}`     |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xleftrightharpoons{abc}` `\xleftrightharpoons{abc}` | $`\xrightleftharpoons{abc}` `\xrightleftharpoons{abc}`   |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xtofrom{abc}` `\xtofrom{abc}`                       | $`\xmapsto{abc}` `\xmapsto{abc}`                         |
+--------------------------------------------------------+----------------------------------------------------------+
| $`\xlongequal{abc}` `\xlongequal{abc}`                 |                                                          |
+--------------------------------------------------------+----------------------------------------------------------+

All extensible arrows can take an optional argument in the same manner as `\xrightarrow[under]{over}`.

## Style, Size, and Font

#### Class Assignment

Override the usual spacing and semantic meaning of a character or fragment.

+-----------------------------------------------+-----------------------------------------------+
| $`a = b`  `a = b` \                           | $`a | b\;\,`  `a | b` \                       |
| $`a \mathord = b\;\,`  `a \mathord{=} b` \    | $`a \mathpunct | b\;`  `a \mathpunct{|} b` \  |
| $`a \mathopen = b\;\,`  `a \mathopen{=} b` \  | $`a \mathop | b\;`  `a \mathop{|} b` \        |
| $`a \mathclose = b\;\,`  `a \mathclose{=} b`  | $`a \mathbin | b\,`  `a \mathbin{|} b` \      |
|                                               | $`a \mathrel | b`  `a \mathrel{|} b`          |
+-----------------------------------------------+-----------------------------------------------+

See also [\operatorname](#math-operators).

#### Font

+:-------------------------------+:---------------------------------+:---------------------------------+
| $`\mathrm{Ab0}` `\mathrm{Ab0}` | $`\mathbf{Ab0θ}` `\mathbf{Ab0θ}` | $`\mathit{Ab0θ}` `\mathit{Ab0θ}` |
+--------------------------------+----------------------------------+----------------------------------+
| $`\mathnormal{Ab0}`            | $`\textbf{Ab0θ}` `\textbf{Ab0θ}` | $`\textit{Ab0θ}` `\textit{Ab0θ}` |
|  `\mathnormal{Ab0}`            |                                  |                                  |
+--------------------------------+----------------------------------+----------------------------------+
| $`\textrm{Ab0θ}`               | $`{\bf Ab0θ}` `{\bf Ab0θ}`       | $`{\it Ab0θ}` `{\it Ab0θ}`       |
|  `\textrm{Ab0θ}`               |                                  |                                  |
+--------------------------------+----------------------------------+----------------------------------+
| $`{\rm Ab0}` `{\rm Ab0}`       | $`\bold{Ab0θ}` `\bold{Ab0θ}`     | $`\textup{Ab0θ}` `\textup{Ab0θ}` |
+--------------------------------+----------------------------------+----------------------------------+
| $`\textnormal{Ab0θ}`           | $`\boldsymbol{Ab0θ}`             | $`\Bbb{Ab0}` `\Bbb{Ab0}`         |
|  `\textnormal{Ab0θ}`           |  `\boldsymbol{Ab0θ}`             |                                  |
+--------------------------------+----------------------------------+----------------------------------+
| $`\text{Ab0θ}` `\text{Ab0θ}`   | $`\bm{Ab0θ}` `\bm{Ab0θ}`         | $`\mathbb{Ab0}` `\mathbb{Ab0}`   |
+--------------------------------+----------------------------------+----------------------------------+
| $`\mathsf{Ab0}` `\mathsf{Ab0}` | $`\textmd{Ab0θ}` `\textmd{Ab0θ}` | $`\frak{Ab}` `\frak{Ab}`         |
+--------------------------------+----------------------------------+----------------------------------+
| $`\textsf{Ab0}` `\textsf{Ab0}` | $`\mathtt{Ab0}` `\mathtt{Ab0}`   | $`\mathfrak{Ab}` `\mathfrak{Ab}` |
+--------------------------------+----------------------------------+----------------------------------+
| $`{\sf Ab0}` `{\sf Ab0}`       | $`\texttt{Ab0}` `\texttt{Ab0}`   | $`\mathcal{AB}` `\mathcal{AB}`   |
+--------------------------------+----------------------------------+----------------------------------+
| $`\textsc{hey}` `\textsc{hey}` | $`{\tt Ab0}` `{\tt Ab0 }`        | $`{\cal AB}` `{\cal AB}`         |
+--------------------------------+----------------------------------+----------------------------------+
| $`\oldstylenums{123}`          |                                  | $`\mathscr{AB}` `\mathscr{AB}`   |
|  `\oldstylenums{123}`          |                                  |                                  |
+--------------------------------+----------------------------------+----------------------------------+

The `\textXX` versions can stack font family, font weight, and font shape. So `\textsf{\textbf{H}}` will produce $`\textsf{\textbf{H}}`. The other versions do not stack, e.g., `\mathsf{\mathbf{H}}` will produce $`\mathsf{\mathbf{H}}`.

In cases where math fonts do not have a bold glyph, `\pmb` can simulate one. For example, `\pmb{\vartheta}` renders as : $`\pmb{\vartheta}`

#### Font Size

+:-------------------------+:---------------------------------------+
| $`\Huge AB` `\Huge AB`   | $`\normalsize AB` `\normalsize AB`     |
+--------------------------+----------------------------------------+
| $`\huge AB` `\huge AB`   | $`\small AB` `\small AB`               |
+--------------------------+----------------------------------------+
| $`\LARGE AB` `\LARGE AB` | $`\footnotesize AB` `\footnotesize AB` |
+--------------------------+----------------------------------------+
| $`\Large AB` `\Large AB` | $`\scriptsize AB` `\scriptsize AB`     |
+--------------------------+----------------------------------------+
| $`\large AB` `\large AB` | $`\Tiny AB` `\Tiny AB`                 |
+--------------------------+----------------------------------------+
|                          | $`\tiny AB` `\tiny AB`                 |
+--------------------------+----------------------------------------+

#### Style

+:-----------------------------+:-----------------------------------------------------------------+
| $`\displaystyle\sum_{i=1}^n` | `\displaystyle\sum_{i=1}^n`                                      |
+------------------------------+------------------------------------------------------------------+
| $`\textstyle\sum_{i=1}^n`    | `\textstyle\sum_{i=1}^n`                                         |
+------------------------------+------------------------------------------------------------------+
| $`\scriptstyle x`            | `\scriptstyle x`     (The size of a first sub/superscript)       |
+------------------------------+------------------------------------------------------------------+
| $`\scriptscriptstyle x`      | `\scriptscriptstyle x` (The size of subsequent sub/superscripts) |
+------------------------------+------------------------------------------------------------------+
| $`\lim\limits_y x`           | `\lim\limits_y x`                                                |
+------------------------------+------------------------------------------------------------------+
| $`\lim\nolimits_y x`         | `\lim\nolimits_y x`                                              |
+------------------------------+------------------------------------------------------------------+
| $`\verb!x^2!`                | `\verb!x^2!`                                                     |
+------------------------------+------------------------------------------------------------------+
| $`\text{ABcd }ABcd`          | `\text{ABcd $ABcd$}`                                             |
+------------------------------+------------------------------------------------------------------+

`\text{…}` shifts its contents into text mode, but you can shift back into math mode by nesting `$…$`.

## Symbols and Punctuation

+:-----------------------------+:------------------------+:-----------------------------------+
| `% comment`                  | $`\dots` `\dots`        | $`\TeX` `\TeX`                     |
+------------------------------+-------------------------+------------------------------------+
| $`\%` `\%`                   | $`\cdots` `\cdots`      | $`\LaTeX` `\LaTeX`                 |
+------------------------------+-------------------------+------------------------------------+
| $`\#` `\#`                   | $`\ddots` `\ddots`      | $`\Temml` `\Temml`                 |
+------------------------------+-------------------------+------------------------------------+
| $`\&` `\&`                   | $`\ldots` `\ldots`      | $`\rule[6pt]{2ex}{1ex}`            |
|                              |                         |  `\rule[6pt]{2ex}{1ex}`            |
+------------------------------+-------------------------+------------------------------------+
| $`\_` `\_`                   | $`\vdots` `\vdots`      | $`\surd` `\surd`                   |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textunderscore}`    | $`\iddots` `\iddots`    | $`\infty` `\infty`                 |
|  `\text{\textunderscore}`    |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{--}` `\text{--}`     | $`\dotsb` `\dotsb`      | $`\checkmark` `\checkmark`         |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textendash}`        | $`\dotsc` `\dotsc`      | $`\ballotx` `\ballotx`             |
|  `\text{\textendash}`        |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{---}` `\text{---}`   | $`\dotsi` `\dotsi`      | $`\dag` `\dagger` or `\dag`        |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textemdash}`        | $`\dotsm` `\dotsm`      | $`\text{\textdagger}`              |
|  `\text{\textemdash}`        |                         |  `\text{\textdagger}`              |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textasciitilde}`    | $`\dotso` `\dotso`      | $`\ddagger` `\ddagger` or `\ddag`  |
|  `\text{\textasciitilde}`    |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textasciicircum}`   | $`\dotsi` `\idotsin`    | $`\text{\textdaggerdbl}`           |
|  `\text{\textasciicircum}`   |                         |  `\text{\textdaggerdbl}`           |
+------------------------------+-------------------------+------------------------------------+
| $`` ` ``  `` ` ``            | $`\mathellipsis`        | $`\angle` `\angle`                 |
|                              | `\mathellipsis`         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textquoteleft}`     | $`\text{\textellipsis}` | $`\measuredangle` `\measuredangle` |
|  `text{\textquoteleft}`      |  `\text{\textellipsis}` |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\lq` `\lq`                 | $`\Box` `\Box`          | $`\sphericalangle`                 |
|                              |                         |  `\sphericalangle`                 |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textquoteright}`    | $`\square` `\square`    | $`\top` `\top`                     |
|  `\text{\textquoteright}`    |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\rq` `\rq`                 | $`\blacksquare`         | $`\bot` `\bot`                     |
|                              |  `\blacksquare`         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textquotedblleft}`  | $`\triangle`            | $`\Bot` `\Bot`                     |
|  `\text{\textquotedblleft}`  |  `\triangle`            |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`"`  `"`                    | $`\triangledown`        | $`\$`  `\$`                        |
|                              |  `\triangledown`        |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textquotedblright}` | $`\triangleleft`        | $`\text{\textdollar}`              |
|  `\text{\textquotedblright}` |  `\triangleleft`        |  `\text{\textdollar}`              |
+------------------------------+-------------------------+------------------------------------+
| $`\colon` `\colon`           | $`\triangleright`       | $`\pounds` `\pounds`               |
|                              |  `\triangleright`       |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\backprime` `\backprime`   | $`\bigtriangledown`     | $`\mathsterling` `\mathsterling`   |
|                              |  `\bigtriangledown`     |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\prime` `\prime`           | $`\bigtriangleup`       | $`\text{\textsterling}`            |
|                              |  `\bigtriangleup`       |  `\text{\textsterling}`            |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textless}`          | $`\blacktriangle`       | $`\yen` `\yen`                     |
|  `\text{\textless}`          |  `\blacktriangle`       |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textgreater}`       | $`\blacktriangledown`   | $`\euro` `\euro`                   |
|  `\text{\textgreater}`       |  `\blacktriangledown`   |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbar}`           | $`\blacktriangleleft`   | $`\text{\texteuro}`                |
|  `\text{\textbar}`           |  `\blacktriangleleft`   |  `\text{\texteuro}`                |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbardbl}`        | $`\blacktriangleright`  | $`\degree` `\degree`               |
|  `\text{\textbardbl}`        |  `\blacktriangleright`  |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbraceleft}`     | $`\diamond` `\diamond`  | $`\text{\textdegree}`              |
|  `\text{\textbraceleft}`     |                         |  `\text{\textdegree}`              |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbraceright}`    | $`\Diamond` `\Diamond`  | $`\mho` `\mho`                     |
|  `\text{\textbraceright}`    |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbackslash}`     | $`\lozenge` `\lozenge`  | $`\diagdown` `\diagdown`           |
|  `\text{\textbackslash}`     |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textvisiblespace}`  | $`\blacklozenge`        | $`\diagup` `\diagup`               |
|  `\text{\textvisiblespace}`  |  `\blacklozenge`        |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\P}` `\text{\P}`     | $`\star` `\star`        | $`\flat` `\flat`                   |
| or `\P`                      |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\S}` `\text{\S}`     | $`\bigstar` `\bigstar`  | $`\natural` `\natural`             |
| or `\S`                      |                         |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\copyright` `\copyright`   | $`\maltese` `\maltese`  | $`\sharp` `\sharp`                 |
+------------------------------+-------------------------+------------------------------------+
| $`\circledR` `\circledR`     | $`\clubsuit`            | $`\varclubsuit` `\varclubsuit`     |
|                              |  `\clubsuit`            |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\circledS` `\circledS`     | $`\diamondsuit`         | $`\vardiamondsuit`                 |
|                              | `\diamondsuit`          |  `\vardiamondsuit`                 |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textregistered}`    | $`\heartsuit`           | $`\varheartsuit` `\varheartsuit`   |
|  `\text{\textregistered}`    |  `\heartsuit`           |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\text{\textbullet}`        | $`\spadesuit`           | $`\varspadesuit` `\varspadesuit`   |
|  `\text{\textbullet}`        |  `\spadesuit`           |                                    |
+------------------------------+-------------------------+------------------------------------+
| $`\smiley` `\smiley`         | $`\female` `\female`    | $`\male` `\male`                   |
+------------------------------+-------------------------+------------------------------------+
| $`\standardstate`            | $`\lightning`           | $`\permil` `\permil`               |
|  `\standardstate`            |  `\lightning`           |                                    |
+------------------------------+-------------------------+------------------------------------+

Symbols in the _texvc_ extension

+:-------------------------+:-------------------------------+:---------------------+
| $`\clubs` `\clubs`       | $`\hearts` `\hearts`           | $`\sdot` `\sdot`     |
+--------------------------+--------------------------------+----------------------+
| $`\diamonds` `\diamonds` | $`\spades` `\spades`           | $`\infin` `\infin`   |
+--------------------------+--------------------------------+----------------------+
| $`\bull` `\bull`         | $`\text{\sect}` `\text{\sect}` | $`\Dagger` `\Dagger` |
+--------------------------+--------------------------------+----------------------+

Direct Input: <span class="direct">§ ¶ £ ¥ € ∇ ∞ · ∠ ∡ ∢ ♠ ♡ ♢ ♣ ♭ ♮ ♯ © ® ☺ ✓ ↯ …  ⋮  ⋯  ⋱  ! ‼</span>

## Units

| Unit | Value        | Unit | Value         |
|:-----|:-------------|:-----|:--------------|
| em   | CSS em       | bp   | 1/72​ inch     |
| ex   | CSS ex       | pc   | 12 pt         |
| mu   | 1/18 em      | dd   | 1238/1157​ pt  |
| pt   | 1/72.27 inch | cc   | 14856/1157 pt |
| mm   | 1 mm         | nd   | 685/642 pt    |
| cm   | 1 cm         | nc   | 1370/107​ pt   |
| in   | 1 inch       | sp   | 1/65536 pt    |

The effect of script level and font size:

|  Unit  |     textstyle<br>normal size     | scriptscript         |       huge                 |
|:------:|:-----------------:|:-----------------------------------:|:--------------------------:|
|em or ex|$`\rule{1em}{1em}`  |$`\scriptscriptstyle\rule{1em}{1em}`  |$`\huge\rule{1em}{1em}`   |
| mu     |$`\rule{18mu}{18mu}`|$`\scriptscriptstyle\rule{18mu}{18mu}`|$`\huge\rule{18mu}{18mu}` |
| others |$`\rule{16pt}{16pt}`|$`\scriptscriptstyle\rule{16pt}{16pt}`|$`\huge\rule{16pt}{16pt}` |

`em` and `ex` are affected by font size changes such as `\Large`, but they are not affected
by script level, so they will not change size in a fraction numerator or an
exponent. 

`mu` is affected by both script level and font size.

The other units are absolute and are not affected by either script level or font size.

<br>

<p class="reduced" style="text-align: center">Copyright © 2021, 2022 Ron Kok.
Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></p>

<br>

</main>

<nav>
<div id="sidebar">

$`\href{https://temml.org/}{\color{black}\Large\Temml}`   v0.7.0

<h3><a href="#top">Contents</a></h3>

<ul class="toc">
<li><a href="#accents">Accents</a></li>
<li><a href="#annotation">Annotation</a></li>
<li><a href="#color">Color</a></li>
<li><a href="#delimiters">Delimiters</a></li>
<li><a href="#environments">Environments</a></li>
<li><a href="#html">HTML</a></li>
<li><a href="#letters">Letters</a></li>
<li>
<details><summary>Layout</summary>

* [Line Breaks](#line-breaks)
* [Vertical Layout](#vertical-layout)
* [Overlap and Spacing](#overlap-and-spacing)

</details>
</li>
<li><a href="#logic-and-set-theory">Logic and Set Theory</a></li>
<li><a href="#macros">Macros</a></li>
<li>
<li><a href="#numbers">Numbers</a></li>
<li>
<details><summary>Operators</summary>

* [Big Operators](#big-operators)
* [Binary Operators](#binary-operators)
* [Fractions and Binomials](#fractions-and-binomials)
* [Math Operators](#math-operators)
* [Enclosing Operators](#enclosing-operators)

</details>
</li>
<li><a href="#physics-and-chemistry">Physics and Chemistry</a></li>
<li>
<details><summary>Relations</summary>

* [Relations](#relations)
* [Negated Relations](#negated-relations)
* [Arrows](#arrows)
* [Extensible Arrows](#extensible-arrows)

</details>
</li>
<li><a href="#style-size-and-font">Style, Size, and Font</a></li>
<li><a href="#symbols-and-punctuation">Symbols and Punctuation</a></li>
<li><a href="#units">Units</a></li>
</ul>

<p>Render math with<br><select id="MathFont" onchange="updateMathFont()">
  <option value="Latin-Modern">Latin Modern</option>
  <option value="Local">Local font</option>
  <option value="Asana">Asana</option>
  <option value="STIX2">STIX TWO</option>
  <option value="XITS">XITS</option>
</select>
<script>
  function updateMathFont() {
    // Change the CSS style sheet.
    const temmlRegEx = /assets\/Temml-.+\.css$/
    const value = document.getElementById("MathFont").value
    const links = [...document.head.getElementsByTagName('link')];
    links.forEach(link => {
      if (temmlRegEx.test(link.href)) {
        link.setAttribute("href", `../../assets/Temml-${value}.css`);
      }
    })
  }
</script>
</p>

### Elsewhere

* [Installation](administration.html)
* [Support Table](support_table.html)
* [Home](../../index.html)

</div>  <!-- sidebar -->
</nav>

<div id="mobile-nav">
<!--On very small screens, the sidebar TOC is replaced by a button with a drop-down menu. -->
<input type="checkbox" id="checkbox_toggle">
<label for="checkbox_toggle"><svg xmlns="http://www.w3.org/2000/svg" width="25.6" height="25.6"><path d="M4.8 12.05h16v1.6h-16zM4.8 7.25h16v1.6h-16zM4.8 16.85h16v1.6h-16z"/></svg></label>
<ul>
  <li><a href="#accents">Accents</a></li>
  <li><a href="#delimiters">Delimiters</a></li>
  <li><a href="#environments">Environments</a></li>
  <li><a href="#letters">Letters</a></li>
  <li><a href="#layout">Layout</a></li>
  <li><a href="#operators">Operators</a></li>
  <li><a href="#relations">Relations</a></li>
  <li><a href="#style-color-size-and-font">Style</a></li>
  <li><a href="#symbols">Symbols</a></li>
</ul>
</div>

<script>
  // Assign id's to auto-numbered equations and populate \ref's
  temml.postProcess(document.getElementById("main"))

  let hasMathML = false;
  if (document.createElement) {
    var div = document.createElement("div");
    div.style.position = "absolute"; div.style.top = div.style.left = 0;
    div.style.visibility = "hidden"; div.style.width = div.style.height = "auto";
    div.style.fontFamily = "serif"; div.style.lineheight = "normal";
    div.innerHTML = "<math><mfrac><mi>xx</mi><mi>yy</mi></mfrac></math>";
    document.body.appendChild(div);
    hasMathML = (div.offsetHeight > div.offsetWidth);
  }
  if (!hasMathML) {
    // Insert the mathml.css stylesheet.
    link = document.createElement("link");
    link.href = "../../mathml.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
</script>

</body>
</html>