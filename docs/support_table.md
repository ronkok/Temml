<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Temml Support Table</title>
   <link rel="stylesheet" href="../../assets/Temml-Latin-Modern.css">
   <link rel="stylesheet" href="../docStyles.css">
   <script src="../../assets/temml.min.js"></script>
   <style>
      #atbl + table tr td:nth-child(2) { min-width: 12em }
      #etbl + table tr td:nth-child(2) { min-width: 8em }
      #gtbl + table tr td:nth-child(2) { min-width: 9em }
      #ntbl + table tr td:nth-child(2) { min-width: 9em }
      #stbl + table tr td:nth-child(2) { min-width: 9em }
      #ttbl + table tr td:nth-child(2) { min-width: 9em }
    </style>
</head>

<body>
<main id="main" class="sptable">

# Support Table

**Temml** is a JavaScript library that converts TeX math-mode functions to MathML.
This page provides an alphabetically sorted list of TeX functions that Temml
supports and some functions that it does not support. There is a similar page,
with functions [sorted by type](supported.html).

Some functions are provided by an extension and are listed as such. They will
be available only in pages that include the extension.

If you know the shape of a character, but not its name,
[Detexify](http://detexify.kirelabs.org/classify.html) can help.


## Symbols

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\!|$n!$|`n!`||
|\\\!|$a\!b$|`a\!b`||
|#|$\def\bar#1{#1^2} \bar{y}$|`\def\bar#1{#1^2} \bar{y}`||
|\\#|$\#$|||
|%||`%this is a comment`||
|\\%|$\%$|||
|&|$\begin{matrix} a & b\\ c & d \end{matrix}$|`\begin{matrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{matrix}`||
|\\&|$\&$|||
|'|$'$|||
|\\\'|$\text{\'{a}}$|`\text{\'{a}}`||
|\(| $($ |||
|\)| $)$ |||
|\\ |$a\ b$|`a\ b`||
|\\"|$\text{\"{a}}$|`\text{\"{a}}`||
|\\\$ | $\text{\textdollar}$|||
|\\,|$a\,\,{b}$|`a\,\,{b}`||
|\\.|$\text{\.{a}}$|`\text{\.{a}}`||
|\\:|$a\:\:{b}$|`a\:\:{b}`||
|\\;|$a\;\;{b}$|a`\;\;{b}`||
| \_ | $x_i$ | `x_i` ||
|\\_|$\_$|||
|\\`` ` ``| $\text{\`{a}}$ | ``\text{\'{a}}`` ||
|\<|$<$|||
|\\=|$\text{\={a}}$|`\text{\={a}}`||
| >|$>$|||
|\\\>|$a\>\>{b}$|`a\>\>{b}`||
|\[|$[$|||
|\]|$]$|||
|{|${a}$|`{a}`||
|}|${a}$|`{a}`||
|\\{|$\{$|||
|\\}|$\}$|||
| \| |$\vert$|||
| \\\| |$\Vert$|||
|\~|$\text{no~no~no~breaks}$|`\text{no~no~no~breaks}`||
|\\~|$\text{\~{a}}$|`\text{\~{a}}`||
| \\\\ |$\begin{matrix} a & b\\ c & d\end{matrix}$|`\begin{matrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{matrix}`||
|^|$x^i$|`x^i`||
|\\^|$\text{\^{a}}$|`\text{\^{a}}`||

## A

<div id="atbl"></div>

| Function       |  Rendered   | Source or Comment|  Package
|----------------|-------------|------------------|-----------|
|\AA|$\text{\AA}$|`\text{\AA}`|||
|\aa|$\text{\aa}$|`\text{\aa}`|||
|\above|${a \above{2pt} b+1}$|`{a \above{2pt} b+1}`||
|\abovewithdelims|(Not supported)|||
|\abs|$\abs{x}$|`\abs{x}`| physics extension |
|\absolutevalue|$\absolutevalue{x}$|`\absolutevalue{x}`| physics extension |
|\acomm|$\acomm{A}{B}$|`\acomm{A}{B}`| physics extension |
|\acute|$\acute e$|`\acute e`||
|\AE|$\text{\AE}$|`\text{\AE}`||
|\ae|$\text{\ae}$|`\text{\ae}`||
|\alef|$\alef$|| texvc extension |
|\alefsym|$\alefsym$|| texvc extension |
|\aleph|$\aleph$|||
|{align}| $$\begin{align}a&=b+c\\d+e&=f\end{align}$$ |`\begin{align}`<br>   `a&=b+c \\`<br>   `d+e&=f`<br>`\end{align}` | ams |
|{align\*}| $$\begin{align*}a&=b+c\\d+e&=f\end{align*}$$ |`\begin{align*}`<br>   `a&=b+c \\`<br>   `d+e&=f`<br>`\end{align*}` | ams |
|{aligned}| $$\begin{aligned}a&=b+c\\d+e&=f\end{aligned}$$ |`\begin{aligned}`<br>   `a&=b+c \\`<br>   `d+e&=f`<br>`\end{aligned}`| ams |
|{alignat}| $$\begin{alignat}{2}10&x+&3&y=2\\3&x+&13&y=4\end{alignat}$$ |`\begin{alignat}{2}`<br>   `10&x+ &3&y = 2 \\`<br>   ` 3&x+&13&y = 4`<br>`\end{alignat}` | ams |
|{alignat\*}| $$\begin{alignat*}{2}10&x+&3&y=2\\3&x+&13&y=4\end{alignat*}$$ |`\begin{alignat*}{2}`<br>   `10&x+ &3&y = 2 \\`<br>   ` 3&x+&13&y = 4`<br>`\end{alignat*}` | ams |
|{alignedat}| $$\begin{alignedat}{2}10&x+&3&y=2\\3&x+&13&y=4\end{alignedat}$$ |`\begin{alignedat}{2}`<br>   `10&x+ &3&y = 2 \\`<br>   ` 3&x+&13&y = 4`<br>`\end{alignedat}` | ams |
|\allowbreak||||
|\Alpha|$\Alpha$|||
|\alpha|$\alpha$|||
|\amalg|$\amalg$|||
|\And|$\And$|||
|\and|(Not supported)|[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)| texvc |
|\ang|(Not supported)|[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)| texvc |
|\angl|$a_{\angl n}$|`a_{\angl n}` | actuarialangle |
|\angln|$a_\angln$|`a_\angln` | actuarialangle |
|\angle|$\angle$|||
|\anticommutator|$\anticommutator{A}{B}$|`\anticommutator{A}{B}`| physics extension |
|\approx|$\approx$|||
|\approxeq|$\approxeq$|||
|\arccos|$\arccos$|||
|\arcctg|$\arcctg$|||
|\arceq|$\arceq$|| stix |
|\arcsin|$\arcsin$|||
|\arctan|$\arctan$|||
|\arctg|$\arctg$|||
|\arg|$\arg$|||
|\argmax|$\argmax$|| statmath |
|\argmin|$\argmin$|| statmath |
|{array}|$\begin{array}{cc}a&b\\c&d\end{array}$ | `\begin{array}{cc}`<br>   `a & b \\`<br>   `c & d`<br>`\end{array}`| LaTeX2ε |
|\array|(Not supported)|See `{array}`||
|\arraystretch|(Not supported)|||
|\Arrowvert|(Not supported)|see `\Vert`||
|\arrowvert|(Not supported)|see `\vert`||
|\ast|$\ast$|||
|\astrosun|$\astrosun$|| stix |
|\asymp|$\asymp$|||
|\atop|${a \atop b}$|`{a \atop b}`||
|\atopwithdelims|(Not supported)|||

## B

+---------------------+--------------------------+--------------------------+-------------------+
| Function            | Rendered                 | Source or Comment        | Package           |
+=====================+==========================+==========================+===================+
| \backcong           | $\backcong$              |                          | MnSymbol          |
+---------------------+--------------------------+--------------------------+-------------------+
| \backepsilon        | $\backepsilon$           |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \backprime          | $\backprime$             |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \backsim            | $\backsim$               |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \backsimeq          | $\backsimeq$             |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \backslash          | $\backslash$             |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bar                | $\bar{y}$                | `\bar{y}`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \barwedge           | $\barwedge$              |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \ballotx            | $\ballotx$               |                          | arev              |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bbb                | $\Bbb{ABC}$              | `\Bbb{ABC}`              |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bbbk               | $\Bbbk$                  |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bbox               | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bcancel            | $\bcancel{5}$            | `\bcancel{5}`            | cancel            |
+---------------------+--------------------------+--------------------------+-------------------+
| \because            | $\because$               |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \begin              | $\begin{matrix}          | `\begin{matrix}`\        | ams               |
|                     |  a & b \\                | `a & b \\`\              |                   |
|                     |  c & d                   | `c & d`\                 |                   |
|                     | \end{matrix}$            | `\end{matrix}`           |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \begingroup         | $\begingroup a\endgroup$ | `\begingroup a\endgroup` |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Beta               | $\Beta$                  |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \beta               | $\beta$                  |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \beth               | $\beth$                  |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \between            | $\between$               |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \bf                 | ${\bf AaBb12}$           | `{\bf AaBb12}`           |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bfseries           | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \big                | $\big(\big)$             | `\big(\big)`             |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Big                | $\Big(\Big)$             | `\Big(\Big)`             |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigcap             | $\bigcap$                |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigcirc            | $\bigcirc$               |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigcup             | $\bigcup$                |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigg               | $\bigg(\bigg)$           | `\bigg(\bigg)`           |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bigg               | $\Bigg(\Bigg)$           | `\Bigg(\Bigg)`           |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \biggl              | $\biggl($                | `\biggl(`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Biggl              | $\Biggl($                | `\Biggl(`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \biggm              | $\biggm\vert$            | `\biggm\vert`            |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Biggm              | $\Biggm\vert$            | `\Biggm\vert`            |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \biggr              | $\biggr)$                | `\biggr)`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Biggr              | $\Biggr)$                | `\Biggr)`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigl               | $\bigl($                 | `\bigl(`                 |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bigl               | $\Bigl($                 | `\Bigl(`                 |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigm               | $\bigm\vert$             | `\bigm\vert`             |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bigm               | $\Bigm\vert$             | `\Bigm\vert`             |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigodot            | $\bigodot$               |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigominus          | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigoplus           | $\bigoplus$              |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigoslash          | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigotimes          | $\bigotimes$             |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigr               | $\bigr)$                 | `\bigr)`                 |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bigr               | $\Bigr)$                 | `\Bigr)`                 |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigsqcap           | $\bigsqcap$              |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigsqcup           | $\bigsqcup$              |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigstar            | $\bigstar$               |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigtriangledown    | $\bigtriangledown$       |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigtriangleup      | $\bigtriangleup$         |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \biguplus           | $\biguplus$              |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigvee             | $\bigvee$                |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bigwedge           | $\bigwedge$              |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \binom              | $\binom n k$             | `\binom n k`             | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacklozenge       | $\blacklozenge$          |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacksquare        | $\blacksquare$           |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacktriangle      | $\blacktriangle$         |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacktriangledown  | $\blacktriangledown$     |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacktriangleleft  | $\blacktriangleleft$     |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \blacktriangleright | $\blacktriangleright$    |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \bm                 | $\bm{AaBb}$              | `\bm{AaBb}`              | bm                |
+---------------------+--------------------------+--------------------------+-------------------+
| {Bmatrix}           | $\begin{Bmatrix}         | `\begin{Bmatrix}`\       | ams               |
|                     |   a & b \\               | `a & b \\`\              |                   |
|                     |   c & d                  | `c & d`\                 |                   |
|                     |  \end{Bmatrix}$          | `\end{Bmatrix}`          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| {Bmatrix\*}         | $\begin{Bmatrix*}[r]     | `\begin{Bmatrix*}[r]`\   | mathtools         |
|                     |  -1 & 3 \\               | `-1 & 3 \\`\             |                   |
|                     |  2 & -4                  | `2 & -4`\                |                   |
|                     |  \end{Bmatrix*}$         | `\end{Bmatrix*}`         |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| {bmatrix}           | $\begin{bmatrix}         | `\begin{bmatrix}`\       | ams               |
|                     |   a & b \\               | `a & b \\`\              |                   |
|                     |   c & d                  | `c & d`\                 |                   |
|                     |  \end{bmatrix}$          | `\end{bmatrix}`          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| {bmatrix\*}         | $\begin{bmatrix*}[r]     | `\begin{bmatrix*}[r]`\   | mathtools         |
|                     |  -1 & 3 \\               | `-1 & 3 \\`\             |                   |
|                     |  2 & -4                  | `2 & -4`\                |                   |
|                     |   \end{bmatrix*}$        | `\end{bmatrix*}`         |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bmod               | $a \bmod b$              | `a \bmod b`              |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bold               | $\bold{AaBb123}$         | `\bold{AaBb123}`         |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \boldsymbol         | $\boldsymbol{AaBb}$      | `\boldsymbol{AaBb}`      | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \bot                | $\bot$                   |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bot                | $\Bot$                   |                          | cmll              |
+---------------------+--------------------------+--------------------------+-------------------+
| \bowtie             | $\bowtie$                |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Box                | $\Box$                   |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \boxdot             | $\boxdot$                |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \boxed              | $\boxed{ab}$             | `\boxed{ab}`             | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \boxminus           | $\boxminus$              |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \boxplus            | $\boxplus$               |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \boxtimes           | $\boxtimes$              |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bqty               | $\Bqty{5 \text{mm}}$     | `\Bqty{5 \text{mm}}`     | physics extension |
+---------------------+--------------------------+--------------------------+-------------------+
| \bqty               | $\bqty{5 \text{mm}}$     | `\bqty{5 \text{mm}}`     | physics extension |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bra                | $\Bra{\psi}$             | `\Bra{\psi}`             | braket            |
+---------------------+--------------------------+--------------------------+-------------------+
| \bra                | $\bra{\psi}$             | `\bra{\psi}`             | braket            |
+---------------------+--------------------------+--------------------------+-------------------+
| \braket             | $\braket{\phi|\psi}$     | `\braket{\phi|\psi}`     | braket            |
+---------------------+--------------------------+--------------------------+-------------------+
| \Braket             | $\Braket{ϕ|\frac{∂^2}{∂  | `\Braket{ϕ|\frac{∂^2}{∂  | braket            |
|                     |  t^2}|ψ}$                |  t^2}|ψ}`                |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \brace              | ${n\brace k}$            | `{n\brace k}`            |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bracevert          | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \brack              | ${n\brack k}$            | `{n\brack k}`            |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \breve              | $\breve{eu}$             | `\breve{eu}`             |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \buildrel           | Not supported            |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bull               | $\bull$                  |                          | texvc extension   |
+---------------------+--------------------------+--------------------------+-------------------+
| \bullet             | $\bullet$                |                          |                   |
+---------------------+--------------------------+--------------------------+-------------------+
| \Bumpeq             | $\Bumpeq$                |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+
| \bumpeq             | $\bumpeq$                |                          | ams               |
+---------------------+--------------------------+--------------------------+-------------------+

## C

| Function       |  Rendered   | Source or Comment|  Package
|----------------|-------------|------------------|-----------|
|\C|(Not supported)|[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)| texvc |
|\c|$\text{\c{c}}$|`\text{\c{c}}`||
|\cal|${\cal AaBb}$|`{\cal AaBb}`||
|\cancel|$\cancel{5}$|`\cancel{5}`| cancel |
|\Cap|$\Cap$|| ams |
|\cap|$\cap$|||
|{cases}|$$\begin{cases}a&\text{if }b\\c&\text{if }d\end{cases}$$|`\begin{cases}`<br>   `a &\text{if } b  \\`<br>   `c &\text{if } d`<br>`\end{cases}`| ams |
|\cases|(Not supported)|see `{cases}`||
|{CD}|$$\begin{CD}A @>a>> B \\@VbVV @AAcA\\C @= D\end{CD}$$|`\begin{CD}`<br>   `A  @>a>>  B  \\`<br>`@VbVV    @AAcA \\`<br>   `C  @=     D`<br>`\end{CD}`| ams |
|\cdot|$\cdot$|||
|\cdotp|$\cdotp$|||
|\cdots|$\cdots$|||
|\ce |${\mathrm{C}{\vphantom{X}}_{\smash[t]{6}}\mathrm{H}{\vphantom{X}}_{\smash[t]{5}}{-}\mathrm{CHO}}$|`\ce{C6H5-CHO}` | mhchem extension |
|\cee|(Not supported)|Deprecated<br>Use `\ce` instead. | mhchem |
|\cent|$\cent$|| wasysym | 
|\centerdot|$\centerdot$|| ams |
|\cf|(Not supported)|Deprecated<br>Use `\ce` instead.| mhchem |
|\cfrac|$\cfrac{2}{1+\cfrac{2}{1}}$|`\cfrac{2}{1+\cfrac{2}{1}}`| ams |
|\check|$\check{oe}$|`\check{oe}`||
|\ch|$\ch$|||
|\checkmark|$\checkmark$|| ams |
|\Chi|$\Chi$|||
|\chi|$\chi$|||
|\choose|${n+1 \choose k+2}$|`{n+1 \choose k+2}`||
|\circ|$\circ$|||
|\circeq|$\circeq$|| ams |
|\circlearrowleft|$\circlearrowleft$|| ams |
|\circlearrowright|$\circlearrowright$|| ams |
|\circledast|$\circledast$|| ams |
|\circledcirc|$\circledcirc$|| ams |
|\circleddash|$\circleddash$|| ams |
|\circledR|$\circledR$|| ams |
|\circledS|$\circledS$|| ams |
|\class|(Not supported)|||
|\cline|(Not supported)|||
|\clubs|$\clubs$|| texvc extension |
|\clubsuit|$\clubsuit$|||
|\cnums|$\cnums$|| texvc extension |
|\coh|$\coh$|| cmll |
|\colon|$\colon$|||
|\Colonapprox|$\Colonapprox$|| mathtools |
|\colonapprox|$\colonapprox$|| mathtools |
|\coloncolon|$\coloncolon$|| colonequals |
|\coloncolonapprox|$\coloncolonapprox$|| colonequals |
|\coloncolonequals|$\coloncolonequals$|| colonequals |
|\coloncolonminus|$\coloncolonminus$|| colonequals |
|\coloncolonsim|$\coloncolonsim$|| colonequals |
|\colonminus|$\colonminus$|| colonequals |
|\Coloneq|$\Coloneq$|| mathtools |
|\coloneq|$\coloneq$|| mathtools |
|\Coloneqq|$\Coloneqq$|| mathtools |
|\coloneqq|$\coloneqq$|| mathtools |
|\Colonsim|$\Colonsim$|| mathtools |
|\colonsim|$\colonsim$|| mathtools |
|\color|$\color{#0000FF} AaBb123$|`\color{#0000FF} AaBb123`| color |
|\colorbox|$\colorbox{red}{Black on red}$|`\colorbox{red}{Black on red}`| color |
|\comm|$\comm{A}{B}$|`\comm{A}{B}`| physics extension |
|\commutator|$\commutator{A}{B}$|`\commutator{A}{B}`| physics extension |
|\complement|$\complement$|| ams |
|\Complex|$\Complex$|| texvc extension |
|\cong|$\cong$|||
|\Coppa|$\Coppa$|||
|\coppa|$\coppa$|||
|\coprod|$\coprod$|||
|\copyright|$\copyright$|||
|\cos|$\cos$|||
|\cosec|$\cosec$|||
|\cosh|$\cosh$|||
|\cot|$\cot$|||
|\cotg|$\cotg$|||
|\coth|$\coth$|||
|\cp|$\cp$|| physics extension |
|\cr|$\begin{matrix} a & b\cr c & d \end{matrix}$|`\begin{matrix}`<br>   `a & b \cr`<br>   `c & d`<br>`\end{matrix}`||
|\cross|$\cross$|| physics extension |
|\crossproduct|$\crossproduct$|| physics extension |
|\csc|$\csc$|||
|\cssId|(Not supported)|See `\id`.|
|\ctg|$\ctg$|||
|\cth|$\cth$|||
|\Cup|$\Cup$|| ams |
|\cup|$\cup$|||
|\curl|$\curl$|| physics extension |
|\curlyeqprec|$\curlyeqprec$|| ams |
|\curlyeqsucc|$\curlyeqsucc$|| ams |
|\curlyvee|$\curlyvee$|| ams |
|\curlywedge|$\curlywedge$|| ams |
|\curvearrowleft|$\curvearrowleft$|| ams |
|\curvearrowright|$\curvearrowright$|| ams |

## D

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\dag|$\dag$|||
|\Dagger|$\Dagger$|| texvc extension |
|\dagger|$\dagger$|||
|\daleth|$\daleth$|| ams |
|\Darr|$\Darr$|| texvc extension |
|\dArr|$\dArr$|| texvc extension |
|\darr|$\darr$|| texvc extension |
|{darray}|$$\begin{darray}{cc}a&b\\c&d\end{darray}$$ | `\begin{darray}{cc}`<br>   `a & b \\`<br>   `c & d`<br>`\end{darray}`||
|\dashleftarrow|$\dashleftarrow$|| ams |
|\dashrightarrow|$\dashrightarrow$|| ams |
|\dashv|$\dashv$|||
|\dbinom|$\dbinom n k$|`\dbinom n k`| ams |
|\dblcolon|$\dblcolon$|| mathtools |
|{dcases}|$$\begin{dcases}a&\text{if }b\\c&\text{if }d\end{dcases}$$ | `\begin{dcases}`<br>   `a &\text{if } b  \\`<br>   `c &\text{if } d`<br>`\end{dcases}`| mathtools |
|\dd|$\dd$|`\dd`| physics extension |
|\ddag|$\ddag$|||
|\ddagger|$\ddagger$|||
|\ddddot|$\ddddot x$|`\ddddot x`| ams |
|\dddot|$\dddot x$|`\dddot x`| ams |
|\ddot|$\ddot x$|`\ddot x`||
|\ddots|$\ddots$|||
|\DeclareMathOperator|(Not supported)|||
|\def|$\def\foo{x^2} \foo + \foo$|`\def\foo{x^2} \foo + \foo`||
|\definecolor|$\definecolor{sortaGreen}{RGB}{128,128,0} \color{sortaGreen} F=ma$| `\definecolor{sortaGreen}{RGB}{128,128,0}` <br> `\color{sortaGreen} F=ma` | xcolor |
|\deg|$\deg$|||
|\degree|$\degree$|||
|\delta|$\delta$|||
|\Delta|$\Delta$|||
|\derivative|$\derivative{x}{y}$|`\derivative{x}{y}`| physics extension |
|\det|$\det$|||
|\dfrac|$\dfrac{a-1}{b-1}$|`\dfrac{a-1}{b-1}`| ams |
|\differential|$\differential$|`\differential`| physics extension |
|\diagdown|$\diagdown$|| ams |
|\diagonalmatrix|(Not supported)|| physics |
|\diagup|$\diagup$|| ams |
|\Diamond|$\Diamond$|||
|\diamond|$\diamond$|||
|\diamonds|$\diamonds$|| texvc extension |
|\diamondsuit|$\diamondsuit$|||
|\Digamma|(Not supported)|||
|\digamma|$\digamma$|| ams |
|\dim|$\dim$|||
|\displaylines|(Not supported)|||
|\displaystyle|$\displaystyle\sum_0^n$|`\displaystyle\sum_0^n`||
|\div|$\div$|||
|\divergence|$\divergence$|`\divergence`| physics extension |
|\divideontimes|$\divideontimes$|| ams |
|\dot|$\dot x$|`\dot x`||
|\Doteq|$\Doteq$|| ams |
|\doteq|$\doteq$|||
|\doteqdot|$\doteqdot$|| ams |
|\dotplus|$\dotplus$|| ams |
|\dotproduct|$\dotproduct$|`\dotproduct`| physics extension |
|\dots|$x_1 + \dots + x_n$ | `x_1 + \dots + x_n` ||
|\dotsb|$x_1 +\dotsb + x_n$ | `x_1 +\dotsb + x_n` | ams |
|\dotsc|$x,\dotsc,y$|`x,\dotsc,y`| ams |
|\dotsi|$$\int_{A_1}\int_{A_2}\dotsi$$|`\int_{A_1}\int_{A_2}\dotsi`| ams |
|\dotsm|$x_1 x_2 \dotsm x_n$|`$x_1 x_2 \dotsm x_n`| ams |
|\dotso|$\dotso$|| ams |
|\doublebarwedge|$\doublebarwedge$|| ams |
|\doublecap|$\doublecap$|| ams |
|\doublecup|$\doublecup$|| ams |
|\Downarrow|$\Downarrow$|||
|\downarrow|$\downarrow$|||
|\downdownarrows|$\downdownarrows$|| ams |
|\downharpoonleft|$\downharpoonleft$|| ams |
|\downharpoonright|$\downharpoonright$|| ams |
|{drcases}|$\begin{drcases}a&\text{if }b\\c&\text{if }d\end{drcases}$|`\begin{drcases}`<br>   `a &\text{if } b  \\`<br>   `c &\text{if } d`<br>`\end{drcases}`| mathtools |
|\dv|$\dv{x}{y}$|`\dv{x}{y}`| physics extension |
|\dyad|$\dyad{a}{b}$|`\dyad{a}{b}`| physics extension |


## E

<div id="etbl"></div>

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\edef|$\def\foo{a}\edef\bar{\foo}\def\foo{}\bar$|`\def\foo{a}\edef\bar{\foo}\def\foo{}\bar`||
|\ell|$\ell$|||
|\else|(Not supported)|||
|\em|(Not supported)|||
|\emph|(Not supported)|||
|\empty|$\empty$|| texvc extension |
|\emptyset|$\emptyset$|||
|\enclose|(Not supported)|Non standard.<br>See `\boxed`, `\cancel`, `\bcancel`,<br>`\xcancel`, `\sout`, `\angl`||
|\end|$\begin{matrix} a & b\\ c & d\end{matrix}$|`\begin{matrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{matrix}`||
|\endgroup|$\begingroup a\endgroup$|`\begingroup a\endgroup`||
|\enspace|$a\enspace b$|`a\enspace b`||
|\Epsilon|$\Epsilon$|||
|\epsilon|$\epsilon$|||
|\eqalign|(Not supported)|See {align*}||
|\eqalignno|(Not supported)|See {align}||
|\eqcirc|$\eqcirc$|| ams |
|\Eqcolon|$\Eqcolon$|| mathtools |
|\eqcolon|$\eqcolon$|| mathtools |
|\eqeq|$\eqeq$|| unicodemath |
|\eqeqeq|$\eqeqeq$|| unicodemath |
|\equalscolon|$\equalscolon$|| colonequals |
|\equalscoloncolon|$\equalscoloncolon$|| colonequals |
|{equation}|$$\begin{equation}a = b + c\end{equation}$$|`\begin{equation}`<br>   `a = b + c`<br>`\end{equation}`| ams |
|{equation*}|$$\begin{equation*}a = b + c\end{equation*}$$|`\begin{equation*}`<br>   `a = b + c`<br>`\end{equation*}`| ams |
|{eqnarray}|(Not supported)|||
|\Eqqcolon|$\Eqqcolon$|| mathtools |
|\eqqcolon|$\eqqcolon$|| mathtools |
|\eqdef|$\eqdef$|| stix |
|\eqref|$\eqref{tag1}$|`\eqref{tag1}`<br>Some sites do not support `\eqref`.| ams |
|\eqsim|$\eqsim$|| ams |
|\eqslantgtr|$\eqslantgtr$|| ams |
|\eqslantless|$\eqslantless$|| ams |
|\equiv|$\equiv$|||
|\erf|$\erf(x)$|`\erf(x)`| physics extension ||
|\Eta|$\Eta$|||
|\eta|$\eta$|||
|\eth|$\eth$|| ams |
|\euro|$\euro$|||
|\ev|$\ev{x}$|`\ev{x}`| physics extension |
|\eval|$\eval{\tfrac 1 2 x}_0^n$|`\eval{\tfrac 1 2 x}_0^n`| physics extension |
|\evaluated|$\evaluated{\tfrac 1 2 x}_0^n$|`\evaluated{\tfrac 1 2 x}_0^n`| physics extension |
|\exist|$\exist$|| texvc extension |
|\exists|$\exists$|||
|\exp|$\exp$|||
|\expandafter||||
|\expectationvalue|$\expectationvalue{x}$|`\expectationvalue{x}`| physics extension |
|\expval|$\expval{x}$|`\expval{x}`| physics extension |

## F

| Function              |  Rendered                      | Source or Comment            |  Package          |
|-----------------------|--------------------------------|------------------------------|-------------------|
| \fallingdotseq        | $\fallingdotseq$               |                              | ams               |
| \fbox                 | $\fbox{Hi there!}$             | `\fbox{Hi there!}`           |                   |
| \fcolorbox            | $\fcolorbox{red}{aqua}{A}$     | `\fcolorbox{red}{aqua}{A}`   | xcolor            |
| \fdv                  | $\fdv{x}{y}$                   | `\fdv{x}{y}`                 | physics extension |
| \female               | $\female$                      |                              | stix              |
| \fi                   | (Not supported)                |                              |                   |
| \Finv                 | $\Finv$                        |                              | ams               |
| \flat                 | $\flat$                        |                              |                   |
| \footnotesize         | $\footnotesize footnotesize$   | `\footnotesize footnotesize` |                   |
| \forall               | $\forall$                      |                              |                   |
| \frac                 | $\frac a b$                    | `\frac a b`                  | ams               |
| \frak                 | $\frak{AaBb}$                  | `\frak{AaBb}`                |                   |
| \frown                | $\frown$                       |                              |                   |
| \fullouterjoin        | $\fullouterjoin$               |                              | stix              |
| \functionalderivative | $\functionalderivative{x}{y}$  | `\functionalderivative{x}{y}`| physics extension |
| \futurelet            |                                |                              |                   |

## G

<div id="gtbl"></div>

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
| \Game          | $\Game$| | ams |
| \Gamma         | $\Gamma$| | |
| \gamma         | $\gamma$| | |
| {gather}       | $$\begin{gather}a=b\\e=b+c\end{gather}$$| `\begin{gather}`<br>   `a=b \\ `<br>   `e=b+c`<br>`\end{gather}`| ams |
| {gather*}      | $$\begin{gather*}a=b\\e=b+c\end{gather*}$$| `\begin{gather*}`<br>   `a=b \\ `<br>   `e=b+c`<br>`\end{gather*}`| ams |
| {gathered}     | $\begin{gathered}a=b\\e=b+c\end{gathered}$| `\begin{gathered}`<br>   `a=b \\ `<br>   `e=b+c`<br>`\end{gathered}`| ams |
| \gcd           | $\gcd$| | |
| \gdef          | (Not supported)| | |
| \ge            | $\ge$| | |
| \geneuro       | (Not supported) | See `\euro`| |
| \geneuronarrow | (Not supported) | See `\euro`| |
| \geneurowide   | (Not supported) | See `\euro`| |
| \genfrac       | $\genfrac ( ] {2pt}{0}a{a+1}$             | `\genfrac ( ] {2pt}{0}a{a+1}`| ams |
| \geq           | $\geq$| | |
| \geqq          | $\geqq$| | ams |
| \geqslant      | $\geqslant$| | ams |
| \gets          | $\gets$| | |
| \gg            | $\gg$| | |
| \ggg           | $\ggg$| | ams |
| \gggtr         | $\gggtr$| | ams |
| \gimel         | $\gimel$| | ams |
| \global        | (Not supported)| | |
| \gnapprox      | $\gnapprox$| | ams |
| \gneq          | $\gneq$| | ams |
| \gneqq         | $\gneqq$| | ams |
| \gnsim         | $\gnsim$| | ams |
| \grad          | $\grad$| |  physics extension |
| \gradient      | $\gradient$| |  physics extension |
| \grave         | $\grave{eu}$| `\grave{eu}`| |
| \gt            | $a \gt b$| `a \gt b`|  MathJax |
| \gtrapprox     | $\gtrapprox$| | ams |
| \gtrdot        | $\gtrdot$| | ams |
| \gtreqless     | $\gtreqless$| | ams |
| \gtreqqless    | $\gtreqqless$| | ams |
| \gtrless       | $\gtrless$| | ams |
| \gtrsim        | $\gtrsim$| | ams |
| \gvertneqq     | $\gvertneqq$| | ams |

## H

| Function        |  Rendered                 | Source or Comment |  Package  |
|-----------------|---------------------------|-------------------|-----------|
| \H              | $\text{\H{a}}$            | `\text{\H{a}}`| |
| \Harr           | $\Harr$                   | | texvc extension |
| \hArr           | $\hArr$                   | | texvc extension |
| \harr           | $\harr$                   | | texvc extension |
| \hat            | $\hat{\theta}$            | `\hat{\theta}`| |
| \hbar           | $\hbar$                   | | |
| \hbox           | $\hbox{ $x^2 $}$            | `\hbox{$x^2$}`| |
| \hbox to        |  (Not supported)          | | |
| \hdashline      | $\begin{matrix}a&b\\ \hdashline c &d\end{matrix}$| `\begin{matrix}`<br>   `a & b \\`<br>   `\hdashline`<br>   `c & d`<br>`\end{matrix}`|  arydshln |
| \hearts         | $\hearts$                 | | texvc extension |
| \heartsuit      | $\heartsuit$              | | |
| \hfil           | (Not supported)            | | |
| \hfill          | (Not supported)            | | |
| \hline          | $\begin{matrix}a&b\\ \hline c &d\end{matrix}$| `\begin{matrix}`<br>   `a & b \\ \hline`<br>   `c & d`<br>`\end{matrix}`| |
| \hom            | $\hom$                    | | |
| \hookleftarrow  | $\hookleftarrow$          | | |
| \hookrightarrow | $\hookrightarrow$         | | |
| \hphantom       | $a\hphantom{bc}d$         | `a\hphantom{bc}d`| |
| \href           | $\href{https://temml.org/}{\Temml}$| `\href{https://temml.org/}{\Temml}`<br>Requires `trust` [option](options.md)|  href |
| \hskip          | $w\hskip1em i\hskip2em d$ | `w\hskip1em i\hskip2em d`| |
| \hslash         | $\hslash$                 | | ams |
| \hspace         | $s\hspace{7ex} k$         | `s\hspace{7ex} k`| |
| \class          | $\class{foo}{x}$          | `\class{foo}{x}`<br>Must enable `trust` and disable `strict` [option](options.md)| |
| \data           | $\data{foo=a, bar=b}{x}$  | `\data{foo=a, bar=b}{x}`<br>Must enable `trust` and disable `strict` [option](options.md)| |
| \id             | $\id{bar}{x}$| `\id{bar}{x}`<br>Must enable `trust` and disable `strict` [option](options.md)| |
| \style          | $\style{color: red;}{x}$| `\style{color: red;}{x}`<br>Must enable `trust` and disable `strict` [option](options.md)| |
| \huge           | $\huge huge$              | `\huge huge`| |
| \Huge           | $\Huge Huge$              | `\Huge Huge`| |

## I

| Function         |  Rendered             | Source or Comment     |  Package          |
|------------------|-----------------------|-----------------------|-------------------|
| \i               | $\text{\i}$           | `\text{\i}`           |                   |
| \idotsint        | $\int\idotsint\int$   | `\int\idotsint\int`   | ams              |
| \iddots          | $\iddots$             |                       |                   |
| \if              | (Not supported)        |                       |                   |
| \iff             | $A\iff B$             | `A\iff B`             |                   |
| \ifmode          | (Not supported)        |                       |                   |
| \ifx             | (Not supported)        |                       |                   |
| \iiiint          | $\iiiint$             |                       | ams               |
| \iiint           | $\iiint$              |                       | ams               |
| \iint            | $\iint$               |                       | ams               |
| \Im              | $\Im$                 |                       |                   |
| \image           | $\image$              |                       | texvc extension   |
| \imageof         | $\imageof$            |                       | stix              |
| \imath           | $\imath$              |                       |                   |
| \impliedby       | $P\impliedby Q$       | `P\impliedby Q`       | ams               |
| \implies         | $P\implies Q$         | `P\implies Q`         | ams               |
| \in              | $\in$                 |                       |                   |
| \includegraphics | $\includegraphics[height=1em, totalheight=1.2em, width=1.2em, alt=sphere]{../sphere.jpg}$ |  `\includegraphics[height=1em,`<br>`totalheight=1.2em, width=1.2em,`<br>`alt=sphere]{../sphere.jpg}` | graphicx |
|\incoh            | $\incoh$              |                       | cmll              |
| \inf             | $\inf$                |                       |                   |
| \infin           | $\infin$              |                       | texvc extension   |
| \infty           | $\infty$              |                       |                   |
| \injlim          | $\injlim$             | `\injlim`             | ams               |
| \innerproduct    | $\innerproduct{a}{b}$ | `\innerproduct{a}{b}` | physics extension |
| \int             | $\int$                |                       |                   |
| \intbar          | $\intbar$             |                       |                   |
| \intBar          | $\intBar$             |                       |                   |
| \intcap          | $\intcap$             |                       |                   |
| \intclockwise    | $\intclockwise$       |                       |                   |
| \intcup          | $\intcup$             |                       |                   |
| \intercal        | $\intercal$           |                       | ams               |
| \intlarhk        | $\intlarhk$           |                       |                   |
| \intop           | $\intop$              |                       |                   |
| \intx            | $\intx$               |                       |                   |
| \invamp          | $\invamp$             |                       | cmll              |
| \Iota            | $\Iota$               |                       |                   |
| \iota            | $\iota$               |                       |                   |
| \isin            | $\isin$               |                       | texvc extension   |
| \it              | ${\it AaBb}$          | `{\it AaBb}`          |                   |
| \itshape         | (Not supported)        |                       |                   |

## JK

| Function |  Rendered        | Source or Comment |  Package          |
|----------|------------------|-------------------|-------------------|
| \j       | $\text{\j}$      | `\text{\j}`       |                   |
| \jmath   | $\jmath$         |                   |                   |
| \Join    | $\Join$          |                   | ams               |
| \Kappa   | $\Kappa$         |                   |                   |
| \kappa   | $\kappa$         |                   |                   |
| \ker     | $\ker$           |                   |                   |
| \kern    | $I\kern-2.5pt R$ | `I\kern-2.5pt R`  |                   |
| \Ket     | $\Ket{\psi}$     | `\Ket{\psi}`      | braket            |
| \ket     | $\ket{\psi}$     | `\ket{\psi}`      | braket            |
| \ketbra  | $\ketbra{a}{b}$  | `\ketbra{a}{b}`   | physics extension |
| \Koppa   | $\Koppa$         |                   |                   |
| \koppa   | $\koppa$         |                   |                   |

## L

| Function             |  Rendered                  | Source or Comment |  Package  |
|----------------------|----------------------------|-------------------|-----------|
| \L                   | (Not supported)            |                   |           |
| \l                   | (Not supported)            |                   |           |
| \Lambda              | $\Lambda$                  |                   |           |
| \lambda              | $\lambda$                  |                   |           |
| \label               | | `\label{idName}`<br>Creates an HTML id.<br>Characters limited to: `A-Za-z0-9_-`| |
| \land                | $\land$                    |                   |           |
| \lang                | $\lang A\rangle$           | `\lang A\rangle` | texvc extension |
| \langle              | $\langle A\rangle$         | `\langle A\rangle` | |
| \laplacian           | $\laplacian$               | | physics extension |
| \Larr                | $\Larr$                    | | texvc extension |
| \lArr                | $\lArr$                    | | texvc extension |
| \larr                | $\larr$                    | | texvc extension |
| \large               | $\large large$             | `\large large`| |
| \Large               | $\Large Large$             | `\Large Large`| |
| \LARGE               | $\LARGE LARGE$             | `\LARGE LARGE`| |
| \LaTeX               | $\LaTeX$                   | | |
| \lBrace              | $\lBrace$                  | | stix |
| \lbrace              | $\lbrace$                  | | |
| \lbrack              | $\lbrack$                  | | |
| \lceil               | $\lceil$                   | | |
| \ldotp               | $\ldotp$                   | | |
| \ldots               | $\ldots$                   | | |
| \le                  | $\le$                      | | |
| \leadsto             | $\leadsto$                 | | ams |
| \left                | $\left\lbrace \dfrac ab \right.$  | `\left\lbrace \dfrac ab \right.`| |
| \leftarrow           | $\leftarrow$               | | |
| \Leftarrow           | $\Leftarrow$               | | |
| \LeftArrow           | (Not supported)            | Non standard | |
| \leftarrowtail       | $\leftarrowtail$           | | ams |
| \leftharpoondown     | $\leftharpoondown$         | | |
| \leftharpoonup       | $\leftharpoonup$           | | |
| \leftleftarrows      | $\leftleftarrows$          | | ams |
| \leftmoon            | $\leftmoon$                | | stix |
| \leftouterjoin       | $\leftouterjoin$           | | stix |
| \Leftrightarrow      | $\Leftrightarrow$          | | |
| \leftrightarrow      | $\leftrightarrow$          | | |
| \leftrightarrows     | $\leftrightarrows$         | | ams |
| \leftrightharpoons   | $\leftrightharpoons$       | | ams |
| \leftrightsquigarrow | $\leftrightsquigarrow$     | | ams |
| \leftroot            | (Not supported)            | | |
| \leftthreetimes      | $\leftthreetimes$          | | ams |
| \leq                 | $\leq$                     | | |
| \leqalignno          | (Not supported)            | | |
| \leqq                | $\leqq$                    | | ams |
| \leqslant            | $\leqslant$                | | ams |
| \lessapprox          | $\lessapprox$              | | ams |
| \lessdot             | $\lessdot$                 | | ams |
| \lesseqgtr           | $\lesseqgtr$               | | ams |
| \lesseqqgtr          | $\lesseqqgtr$              | | ams |
| \lessgtr             | $\lessgtr$                 | | ams |
| \lesssim             | $\lesssim$                 | | ams |
| \let                 |                            | | |
| \lfloor              | $\lfloor$                  | | |
| \lg                  | $\lg$                      | | |
| \lgroup              | $\lgroup$                  | | |
| \lhd                 | $\lhd$                     | | ams |
| \lightning           | $\lightning$               | | |
| \lim                 | $\lim$                     | | |
| \liminf              | $\liminf$                  | | |
| \limits              | $\lim\limits_x$            | `\lim\limits_x`| |
| \limsup              | $\limsup$                  | | |
| \ll                  | $\ll$                      | | |
| \llap                | ${=}\llap{/\,}$            | `{=}\llap{/\,}`| |
| \llbracket           | $\llbracket$               | | stmaryrd |
| \llcorner            | $\llcorner$                | | ams |
| \Lleftarrow          | $\Lleftarrow$              | | ams |
| \lll                 | $\lll$                     | | ams |
| \llless              | $\llless$                  | | ams |
| \lmoustache          | $\lmoustache$              | | |
| \ln                  | $\ln$                      | | |
| \lnapprox            | $\lnapprox$                | | ams |
| \lneq                | $\lneq$                    | | ams |
| \lneqq               | $\lneqq$                   | | ams |
| \lnot                | $\lnot$                    | | |
| \lnsim               | $\lnsim$                   | | ams |
| \log                 | $\log$                     | | |
| \long                |                           | | |
| \Longleftarrow       | $\Longleftarrow$           | | |
| \longleftarrow       | $\longleftarrow$           | | |
| \Longleftrightarrow  | $\Longleftrightarrow$      | | |
| \longleftrightarrow  | $\longleftrightarrow$      | | |
| \longmapsto          | $\longmapsto$              | | |
| \Longrightarrow      | $\Longrightarrow$          | | |
| \longrightarrow      | $\longrightarrow$          | | |
| \looparrowleft       | $\looparrowleft$           | | ams |
| \looparrowright      | $\looparrowright$          | | ams |
| \lor                 | $\lor$                     | | |
| \lower               | $M\lower5pt{M^2}M$         | `M\lower5pt{M^2}M`  or <br>`M\lower5pt\hbox{$M^2$}M`| |
| \lozenge             | $\lozenge$                 | | ams |
| \lparen              | $\lparen$                  | | mathtools |
| \Lrarr               | $\Lrarr$                   | | texvc extension |
| \lrArr               | $\lrArr$                   | | texvc extension |
| \lrarr               | $\lrarr$                   | | texvc extension |
| \lrcorner            | $\lrcorner$                | | ams |
| \lq                  | $\lq$                      | | |
| \Lsh                 | $\Lsh$                     | | ams |
| \lt                  | $\lt$                      | | MathJax |
| \ltimes              | $\ltimes$                  | | ams |
| \lVert               | $\lVert$                   | | ams |
| \lvert               | $\lvert$                   | | ams |
| \lvertneqq           | $\lvertneqq$               | | ams |

## M

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\male|$\male$ || stix |
|\maltese|$\maltese$ || ams |
|\mapsfrom|$\mapsfrom$ || stmaryrd |
|\mapsto|$\mapsto$ |||
|\mathbb|$\mathbb{AB}$ |`\mathbb{AB}`| ams |
|\mathbf|$\mathbf{AaBb123}$ |`\mathbf{AaBb123}`||
|\mathbin|$a\mathbin{!}b$ |`a\mathbin{!}b`||
|\mathcal|$\mathcal{AaBb}$ |`\mathcal{AaBb}`||
|\mathchoice|$a\mathchoice{\,}{\,\,}{\,\,\,}{\,\,\,\,}b$ |`a\mathchoice{\,}{\,\,}{\,\,\,}{\,\,\,\,}b`||
|\mathclap|$\displaystyle\sum_{\mathclap{1\le i\le n}} x_{i}$ |`\sum_{\mathclap{1\le i\le n}} x_{i}`| mathtools |
|\mathclose|$a + (b\mathclose\gt + c$ |`a + (b\mathclose\gt + c`||
|\mathellipsis|$\mathellipsis$ |||
|\mathfrak|$\mathfrak{AaBb}$ |`\mathfrak{AaBb}`| ams |
|\mathinner|$ab\mathinner{\text{inside}}cd$ |`ab\mathinner{\text{inside}}cd`||
|\mathit|$\mathit{AaBb}$ |`\mathit{AaBb}`||
|\mathllap|${=}\mathllap{/\,}$ |`{=}\mathllap{/\,}`| mathtools |
|\mathnormal|$\mathnormal{AaBb}$ |`\mathnormal{AaBb}`||
|\mathop|$\mathop{\star}_a^b$ |`\mathop{\star}_a^b`||
|\mathopen|$a + \mathopen\lt b) + c$ |`a + \mathopen\lt b) + c`||
|\mathord|$1\mathord{,}234{,}567$ |`1\mathord{,}234{,}567`||
|\mathpunct|$A\mathpunct{-}B$ |`A\mathpunct{-}B`||
|\mathrel|$a \mathrel{\#} b$ |`a \mathrel{\#} b`||
|\mathrlap|$\mathrlap{\,/}{=}$ |`\mathrlap{\,/}{=}`| mathtools |
|\mathring|$\mathring{a}$ |`\mathring{a}`| ams |
|\mathrm|$\mathrm{AaBb12}$ |`\mathrm{AaBb12}`||
|\mathscr|$\mathscr{AB}$ |`\mathscr{AB}`||
|\mathsf|$\mathsf{AaBb123}$ |`\mathsf{AaBb123}`||
|\mathsterling|$\mathsterling$ |||
|\mathstrut|$\sqrt{\mathstrut a}$ |`\sqrt{\mathstrut a}`||
|\mathtip|(Not supported)|See `\texttip`||
|\mathtt|$\mathtt{AaBb123}$ |`\mathtt{AaBb123}`||
|\matrix|(Not supported)|See `{matrix}`||
|{matrix}|$\begin{matrix}a&b\\c&d\end{matrix}$ |`\begin{matrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{matrix}`| ams |
|{matrix*}|$\begin{matrix*}[r] -1 & 3\\ 2 & -4 \end{matrix*}$ |`\begin{matrix*}[r]`<br>   `-1 & 3 \\`<br>   `2 & -4`<br>`\end{matrix*}`| mathtools |
|\matrixel|$\matrixel{n}{A}{m}$ |`\matrixel{n}{A}{m}`| physics extension |
|\matrixelement|$\matrixelement{n}{A}{m}$ |`\matrixelement{n}{A}{m}`| physics extension |
|\mel|$\mel{n}{A}{m}$ |`\mel{n}{A}{m}`| physics extension |
|\max|$\max$ |||
|\mbox|(Not supported)|||
|\md|(Not supported)|||
|\mdseries|(Not supported)|||
|\measeq|$\measeq$ || stix |
|\measuredangle|$\measuredangle$ || ams |
|\medspace|$a\medspace b$ |`a\medspace b`| ams |
|\mho|$\mho$ |||
|\mid|$\{x∈ℝ\mid x>0\}$ |`\{x∈ℝ\mid x>0\}`||
|\middle|$P\left(A\middle\vert B\right)$ |`P\left(A\middle\vert B\right)`||
|\min|$\min$ |||
|\minuscolon|$\minuscolon$ || colonequals |
|\minuscoloncolon|$\minuscoloncolon$ || colonequals |
|\minuso|(Not supported)| See `\standardstate`||
|\mit|(Not supported)|See `\mathit`||
|\mkern|$a\mkern18mu b$ |`a\mkern18mu b`||
|\mmlToken|(Not supported)|||
|\mod|$3\equiv 5 \mod 2$ |`3\equiv 5 \mod 2`| ams |
|\models|$\models$ |||
|\moveleft|(Not supported)|||
|\moveright|(Not supported)|||
|\mp|$\mp$ |||
|\mskip|$a\mskip{10mu}b$ |`a\mskip{10mu}b`||
|\mspace|(Not supported)|||
|\Mu|$\Mu$ |||
|\mu|$\mu$ |||
|\multicolumn|(Not supported)|||
|\multimap|$\multimap$ || ams |
|\multimapboth|$\multimapboth$ || cmll |
|\multimapinv|$\multimapinv$ || cmll |
|{multline}|$$\begin{multline}\rm uno \\ \rm dos \\ \rm tres\end{multline}$$|`\begin{multline}`<br>  `\rm uno \\`<br>  `\rm dos \\`<br>  `\rm tres`<br>`\end{multline}`| ams |
|{multline*}|$$\begin{multline*}\rm uno \\ \rm dos \\ \rm tres\end{multline*}$$|`\begin{multline*}`<br>  `\rm uno \\`<br>  `\rm dos \\`<br>  `\rm tres`<br>`\end{multline*}`| ams |

## N

<div id="ntbl"></div>

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\N|$\N$ || texvc extension |
|\nabla|$\nabla$ |||
|\natnums|$\natnums$ || texvc extension |
|\natural|$\natural$ |||
|\negmedspace|$a\negmedspace b$ |`a\negmedspace b`| ams |
|\ncong|$\ncong$ || ams |
|\ne|$\ne$ |||
|\nearrow|$\nearrow$ |||
|\neg|$\neg$ |||
|\negthickspace|$a\negthickspace b$ |`a\negthickspace b`| ams |
|\negthinspace|$a\negthinspace b$ |`a\negthinspace b`| ams |
|\neq|$\neq$ |||
|\newcommand|$\newcommand\chk{\checkmark} \chk$ |`\newcommand\chk{\checkmark} \chk`| newcommand |
|\newenvironment|(Not supported)|||
|\newextarrow|(Not supported)|| extpfeil |
|\newline|$a\newline b$ |`a\newline b`||
|\nexists|$\nexists$ || ams |
|\ngeq|$\ngeq$ || ams |
|\ngeqq|$\ngeqq$ || ams |
|\ngeqslant|$\ngeqslant$ || ams |
|\ngtr|$\ngtr$ || ams |
|\ni|$\ni$ |||
|\nleftarrow|$\nleftarrow$ || ams |
|\nLeftarrow|$\nLeftarrow$ || ams |
|\nLeftrightarrow|$\nLeftrightarrow$ || ams |
|\nleftrightarrow|$\nleftrightarrow$ || ams |
|\nleq|$\nleq$ || ams |
|\nleqq|$\nleqq$ || ams |
|\nleqslant|$\nleqslant$ || ams |
|\nless|$\nless$ || ams |
|\nmid|$\nmid$ || ams |
|\nobreak||||
|\nobreakspace|$a\nobreakspace b$ |`a\nobreakspace b`| ams |
|\noexpand||||
|\nolimits|$\lim\nolimits_x$ |`\lim\nolimits_x`||
|\norm|$\norm{x}$ |\norm{x}| physics extension |
|\normalfont|(Not supported)|||
|\normalsize|$\normalsize normalsize$ |`\normalsize normalsize`||
|\not|$\not =$ |`\not =`||
|\notag|$$\begin{align} a&=b \\ \notag d+e&=f \end{align}$$|`\begin{align}`<br>  `a&=b \\`<br>  `\notag d+e&=f`<br>`\end{align}`| ams |
|\notin|$\notin$ |||
|\notni|$\notni$ || txfonts/pxfonts |
|\nparallel|$\nparallel$ || ams |
|\nprec|$\nprec$ || ams |
|\npreceq|$\npreceq$ || ams |
|\nRightarrow|$\nRightarrow$ || ams |
|\nrightarrow|$\nrightarrow$ || ams |
|\nshortmid|$\nshortmid$ || ams |
|\nshortparallel|$\nshortparallel$ || ams |
|\nsim|$\nsim$ || ams |
|\nsubset|$\nsubset$ || mathabx |
|\nsubseteq|$\nsubseteq$ || ams |
|\nsubseteqq|$\nsubseteqq$ || ams |
|\nsucc|$\nsucc$ || ams |
|\nsucceq|$\nsucceq$ || ams |
|\nsupset|$\nsupset$ || mathabx |
|\nsupseteq|$\nsupseteq$ || ams |
|\nsupseteqq|$\nsupseteqq$ || ams |
|\ntriangleleft|$\ntriangleleft$ || ams |
|\ntrianglelefteq|$\ntrianglelefteq$ || ams |
|\ntriangleright|$\ntriangleright$ || ams |
|\ntrianglerighteq|$\ntrianglerighteq$ || ams |
|\Nu|$\Nu$ |||
|\nu|$\nu$ |||
|\nVDash|$\nVDash$ || ams |
|\nVdash|$\nVdash$ || ams |
|\nvDash|$\nvDash$ || ams |
|\nvdash|$\nvdash$ || ams |
|\nwarrow|$\nwarrow$ |||

## O

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\O|$\text{\O}$ |`\text{\O}`||
|\o|$\text{\o}$ |`\text{\o}`||
|\oc|$\oc$ || cmll |
|\odot|$\odot$ |||
|\odv|$\odv{f}{x}$ |`\odv{f}{x}`| derivative |
|\odv*|$\odv*{f}{x}$ |`\odv*{f}{x}`| derivative |
|\OE|$\text{\OE}$ |`\text{\OE}`||
|\oe|$\text{\oe}$ |`\text{\oe}`||
|\officialeuro|(Not supported)|See `\euro`||
|\oiiint|$\oiiint$ |||
|\oiint|$\oiint$ |||
|\oint|$\oint$ |||
|\oldstyle|(Not supported)|||
|\oldstylenums|(Not supported)|||
|\omega|$\omega$ |||
|\Omega|$\Omega$ |||
|\Omicron|$\Omicron$ |||
|\omicron|$\omicron$ |||
|\ominus|$\ominus$ |||
|\op|$\op{a}{b}$ |`\op{a}{b}`| physics extension |
|\operatorname|$\operatorname{asin} x$ |\operatorname{asin} x| ams |
|\operatorname\*|$\operatorname*{asin}\limits_y x$ |`\operatorname*{asin}\limits_y x`| ams |
|\operatornamewithlimits|$\operatornamewithlimits{asin}\limits_y x$ |`\operatornamewithlimits{asin}\limits_y x`| |
|\oplus|$\oplus$ |||
|\or|(Not supported)|||
|\order|$\order{x^2}$ |`\order{x^2}`| physics extension |
|\origof|$\origof$ || stix |
|\oslash|$\oslash$ |||
|\otimes|$\otimes$ |||
|\outerproduct|$\outerproduct{a}{b}$ |`\outerproduct{a}{b}`| physics extension |
|\over|${a+1 \over b+2}+c$ |`{a+1 \over b+2}+c`||
|\overbrace|$\overbrace{x+⋯+x}^{n\text{ times}}$ |`\overbrace{x+⋯+x}^{n\text{ times}}`||
|\overbracket|(Not supported)|||
|\overgroup|$\overgroup{AB}$ |`\overgroup{AB}`| MnSymbol |
|\overleftarrow|$\overleftarrow{AB}$ |`\overleftarrow{AB}`| ams |
|\overleftharpoon|$\overleftharpoon{AB}$ |`\overleftharpoon{AB}`| MnSymbol |
|\overleftrightarrow|$\overleftrightarrow{AB}$ |`\overleftrightarrow{AB}`| ams |
|\overline|$\overline{\text{a long argument}}$ |`\overline{\text{a long argument}}`||
|\overlinesegment|(Not supported)|||
|\overparen|$\overparen{abc}$ |`\overparen{abc}`||
|\Overrightarrow|$\Overrightarrow{AB}$ |`\Overrightarrow{AB}`| overrightarrow |
|\overrightarrow|$\overrightarrow{AB}$ |`\overrightarrow{AB}`| ams |
|\overrightharpoon|$\overrightharpoon{ac}$ |`\overrightharpoon{ac}`||
|\overset|$\overset{!}{=}$ |`\overset{!}{=}`| ams |
|\overwithdelims|(Not supported)|||
|\owns|$\owns$ |||

## P

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\P|$\text{\P}$ |`\text{\P}` or `\P`||
|\pagecolor|(Not supported)|[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)| texvc |
|\parallel|$\parallel$ |||
|\parr|$\parr$ || cmll |
|\part|(Not supported)|[Deprecated](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Deprecated_syntax)| texvc |
|\partial|$\partial$ |||
|\partialderivative|$\partialderivative{x}{y}$ |`\partialderivative{x}{y}`| physics extension |
|\pb|$\pb{x}{y}$ |`\pb{x}{y}`| physics extension |
|\pdv|$\pdv{f}{x,y}$ |`\pdv{f}{x,y}`| derivative |
|\pdv*|$\pdv*{f}{x,y}$ |`\pdv*{f}{x,y}`| derivative |
|\permil|$\permil$ || wasysym |
|\perp|$\perp$ |||
|\Perp|$\Perp$ || cmll |
|\phantom|$\Gamma^{\phantom{i}j}_{i\phantom{j}k}$ |`\Gamma^{\phantom{i}j}_{i\phantom{j}k}`||
|\phase|(Not supported)|||
|\Phi|$\Phi$ |||
|\phi|$\phi$ |||
|\Pi|$\Pi$ |||
|\pi|$\pi$ |||
|{picture}|(Not supported)|||
|\pitchfork|$\pitchfork$ || ams |
|\plim|$\plim$ || statmath |
|\plusmn|$\plusmn$ || texvc extension |
|\pm|$\pm$ |||
|\pmatrix|(Not supported)| See `{pmatrix}` ||
|{pmatrix}|$\begin{pmatrix}a&b\\c&d\end{pmatrix}$ |`\begin{pmatrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{pmatrix}`| ams |
|{pmatrix*}|$\begin{pmatrix*}[r] -1 & 3\\ 2 & -4 \end{pmatrix*}$ |`\begin{pmatrix*}[r]`<br>   `-1 & 3 \\`<br>   `2 & -4`<br>`\end{pmatrix*}`| mathtools |
|\pmb|$\pmb{\mu}$ |`\pmb{\mu}`| ams |
|\pmod|$x\pmod a$ |`x\pmod a`||
|\pod|$x \pod a$ |`x \pod a`| ams |
|\pointint|$\pointint$ |||
|\poissonbracket|$\poissonbracket{A}{B}$ |`\poissonbracket{A}{B}`| physics extension |
|\pounds|$\pounds$ |||
|\pqty|$\pqty{5}$ |`\pqty{5}`| physics extension |
|\Pr|$\Pr$ |||
|\prec|$\prec$ |||
|\precapprox|$\precapprox$ || ams |
|\preccurlyeq|$\preccurlyeq$ || ams |
|\preceq|$\preceq$ || ams |
|\precnapprox|$\precnapprox$ || ams |
|\precneqq|$\precneqq$ || ams |
|\precnsim|$\precnsim$ || ams |
|\precsim|$\precsim$ || ams |
|\prescript|$\prescript{a}{2}{\mathbf{C}}^{5+}_{2}$ |`\prescript{a}{2}{\mathbf{C}}^{5+}_{2}`| mathtools |
|\prime|$\prime$ |||
|\principalvalue|$\principalvalue$ || physics extension |
|\pv|$\pv$ || physics extension |
|\PV|$\PV(x)$ |`\PV(x)`| physics extension |
|\prod|$\prod$ |||
|\projlim|$\projlim$ |`\projlim`| ams |
|\propto|$\propto$ |||
|\providecommand|$\providecommand\greet{\text{Hello}} \greet$ |`\providecommand\greet{\text{Hello}}`<br>`\greet`||
|\psi|$\psi$ |||
|\Psi|$\Psi$ |||
|\pu |${123~\mathchoice{\textstyle\frac{\mathrm{kJ}}{\mathrm{mol}}}{\frac{\mathrm{kJ}}{\mathrm{mol}}}{\frac{\mathrm{kJ}}{\mathrm{mol}}}{\frac{\mathrm{kJ}}{\mathrm{mol}}}}$ |`\pu{123 kJ//mol}`| mhchem extension |

## Q

| Function    |  Rendered                | Source or Comment       |  Package          |
|-------------|--------------------------|-------------------------|-------------------|
| \Q          | (Not supported)          | See `\Bbb{Q}`           |                   |
| \qall       | $\qall$                  |                         | physics extension |
| \qand       | $\qand$                  |                         | physics extension |
| \qas        | $\qas$                   |                         | physics extension |
| \qassume    | $\qassume$               |                         | physics extension |
| \qc         | $\qc$                    |                         | physics extension |
| \qcc        | $\qcc$                   |                         | physics extension |
| \qcomma     | $\qcomma$                |                         | physics extension |
| \QED        | $\QED$                   |                         | stix              |
| \qelse      | $\qelse$                 |                         | physics extension |
| \qeven      | $\qeven$                 |                         | physics extension |
| \qfor       | $\qfor$                  |                         | physics extension |
| \qgiven     | $\qgiven$                |                         | physics extension |
| \qif        | $\qif$                   |                         | physics extension |
| \qin        | $\qin$                   |                         | physics extension |
| \qinteger   | $\qinteger$              |                         | physics extension |
| \qlet       | $\qlet$                  |                         | physics extension |
| \qodd       | $\qodd$                  |                         | physics extension |
| \qor        | $\qor$                   |                         | physics extension |
| \qotherwise | $\qotherwise$            |                         | physics extension |
| \qq         | $\qq{text}$              | `\qq{text}`             | physics extension |
| \qqtext     | $\qqtext{text}$          | `\qqtext{text}`         | physics extension |
| \qquad      | $a\qquad\qquad{b}$       | `a\qquad\qquad{b}`      |                   |
| \qsince     | $\qsince$                |                         | physics extension |
| \qthen      | $\qthen$                 |                         | physics extension |
| \qty        | $\qty{5 \text{m}}$       | `\qty{5 \text{m}}`      | physics extension |
| \quad       | $a\quad\quad{b}$         | `a\quad\quad{b}`        |                   |
| \quantity   | $\quantity{5 \text{m}}$  | `\quantity{5 \text{m}}` | physics extension |
| \qunless    | $\qunless$               |                         | physics extension |
| \qusing     | $\qusing$                |                         | physics extension |
| \questeq    | $\questeq$               |                         | stix              |

## R

| Function           |  Rendered   | Source or Comment |  Package  |
|--------------------|-------------|-------------------|-----------|
| \R                 | $\R$| | texvc extension |
| \r                 | $\text{\r{a}}$| `\text{\r{a}}`| |
| \raise             | $M\raise3pt{M^2}M$| `M\raise3pt{M^2}M`  or<br>`M\raise3pt\hbox{$M^2$}M`| |
| \raisebox          | $h\raisebox{2pt}{ighe}r$| `h\raisebox{2pt}{ighe}r`| |
| \rang              | $\langle A\rang$| `\langle A\rang` | texvc extension |
| \rangle            | $\langle A\rangle$| `\langle A\rangle`| |
| \rank              | $\rank M$| `\rank M`|  physics extension |
| \Rarr              | $\Rarr$| | texvc extension |
| \rArr              | $\rArr$| | texvc extension |
| \rarr              | $\rarr$| | texvc extension |
| \ratio             | $\ratio$| |  colonequals |
| \rBrace            | $\rBrace$| |  stix |
| \rbrace            | $\rbrace$| | |
| \rbrack            | $\rbrack$| | |
| {rcases}           | $\begin{rcases}a&\text{if }b\\c&\text{if }d\end{rcases}$| `\begin{rcases}`<br>   `a &\text{if } b  \\`<br>   `c &\text{if } d`<br>`\end{rcases}`| mathtools |
| \rceil             | $\rceil$| | |
| \Re                | $\Re$| | |
| \real              | $\real$| | texvc extension |
| \Reals             | $\Reals$| | texvc extension |
| \reals             | $\reals$| | texvc extension |
| \ref               | $\ref{tag1}$| `\ref{tag1}`<br>Some sites do not support `\ref`.| |
| \relax             | | | |
| \renewcommand      | $\def\hail{Hi!}\renewcommand\hail{\text{Ahoy!}} \hail$| `\def\hail{Hi!}`<br>`\renewcommand\hail{\text{Ahoy!}}`<br>`\hail`|  newcommand |
| \renewenvironment  | (Not supported)| |  newcommand |
| \require           | (Not supported)| | |
| \Res               | $\Res[f(z)]$| `\Res[f(z)]`|  physics extension |
| \restriction       | $\restriction$| | ams |
| \rfloor            | $\rfloor$| | |
| \rgroup            | $\rgroup$| | |
| \rhd               | $\rhd$| | ams |
| \Rho               | $\Rho$| | |
| \rho               | $\rho$| | |
| \right             | $\left.\dfrac a b\right)$| `\left.\dfrac a b\right)`| |
| \Rightarrow        | $\Rightarrow$| | |
| \rightarrow        | $\rightarrow$| | |
| \rightarrowtail    | $\rightarrowtail$| | ams |
| \rightharpoondown  | $\rightharpoondown$| | |
| \rightharpoonup    | $\rightharpoonup$| | |
| \rightleftarrows   | $\rightleftarrows$| | ams |
| \rightleftharpoons | $\rightleftharpoons$| | ams |
| \rightmoon         | $\rightmoon$      | | stix |
| \rightouterjoin    | $\rightouterjoin$ | | stix |
| \rightrightarrows  | $\rightrightarrows$| | ams |
| \rightsquigarrow   | $\rightsquigarrow$| | ams |
| \rightthreetimes   | $\rightthreetimes$| | ams |
| \risingdotseq      | $\risingdotseq$| | ams |
| \rlap              | $\rlap{\,/}{=}$| `\rlap{\,/}{=}`| |
| \rm                | ${\rm AaBb12}$| `{\rm AaBb12}`| |
| \rmoustache        | $\rmoustache$| | |
| \root              | (Not supported)| | |
| \rotatebox         | (Not supported)| | |
| \rparen            | $\rparen$| | mathtools |
| \rppolint          | $\rppolint$| | |
| \rq                | $\rq$| | |
| \rrbracket         | $\rrbracket$| |  stmaryrd |
| \Rrightarrow       | $\Rrightarrow$| | ams |
| \Rsh               | $\Rsh$| | ams |
| \rtimes            | $\rtimes$| | ams |
| \Rule              | (Not supported)| see `\rule`| |
| \rule              | $x\rule[6pt]{2ex}{1ex}x$| `x\rule[6pt]{2ex}{1ex}x`| |
| \rVert             | $\rVert$| | ams |
| \rvert             | $\rvert$| | ams |

## S

<div id="stbl"></div>

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\S|$\text{\S}$|`\text{\S}` or `\S`||
|\Sampi|$\Sampi$|||
|\sampi|$\sampi$|||
|\sc|(Not supported)|See `\textsc`||
|\scoh|$\scoh$|| cmll |
|\scalebox|(Not supported)|||
|\scpolint|$\scpolint$|||
|\scr|(Not supported)|See `\mathscr`||
|\scriptscriptstyle|$\scriptscriptstyle \frac cd$|`\scriptscriptstyle \frac cd`||
|\scriptsize|$\scriptsize scriptsize$|`\scriptsize scriptsize`||
|\scriptstyle|$A{\scriptstyle  B}$|`A{\scriptstyle B}`||
|\sdot|$\sdot$|| texvc extension |
|\searrow|$\searrow$|||
|\sec|$\sec$|||
|\sect|$\text{\sect}$|`\text{\sect}`| texvc extension |
|\set| $\Set{ x | x<5 }$ |`\set{x | x<5}`| braket
|\Set| $\Set{ x | x<\tfrac 1 2 }$ |`\Set{ x | x<\tfrac 1 2 }`| braket
|\setlength|(Not supported)|||
|\setminus|$\setminus$|||
|\sf|${\sf AaBb123}$|`{\sf AaBb123}`||
|\sgn|$\sgn$|| mismath |
|\sharp|$\sharp$|||
|\shift|$\shift$|| cmll |
|\shneg|$\shneg$|| cmll |
|\shortmid|$\shortmid$|| ams |
|\shortparallel|$\shortparallel$|| ams |
|\shoveleft|(Not supported)|| ams |
|\shoveright|(Not supported)|| ams |
|\shpos|$\shpos$|| cmll |
|\sideset|$\sideset{_a^b}{_c^d}\sum$|`\sideset{_a^b}{_c^d}\sum`| ams |
|\Sigma|$\Sigma$|||
|\sigma|$\sigma$|||
|\sim|$\sim$|||
|\simeq|$\simeq$|||
|\sin|$\sin$|||
|\sincoh|$\sincoh$|| cmll |
|\sinh|$\sinh$|||
|\sixptsize|$\sixptsize sixptsize$|`\sixptsize sixptsize`||
|\sh|$\sh$|||
|\skew|(Not supported)|||
|\skip|(Not supported)|||
|\sl|(Not supported)|||
|\small|$\small small$|`\small small`||
|\smallfrown|$\smallfrown$|| ams |
|\smallint|$\smallint$|||
|{smallmatrix}|$\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}$|`\begin{smallmatrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{smallmatrix}`||
|\smallsetminus|$\smallsetminus$|| ams |
|\smallsmile|$\smallsmile$|| ams |
|\smash|$\left(x^{\smash{2}}\right)$|`\left(x^{\smash{2}}\right)`||
|\smile|$\smile$|||
|\smiley|$\smiley$|| wasysym |
|\sout|$\sout{abc}$|`\sout{abc}`| ulem |
|\Space|(Not supported)|see `\space`||
|\space|$a\space b$|`a\space b`||
|\spades|$\spades$|| texvc extension |
|\spadesuit|$\spadesuit$|||
|\sphericalangle|$\sphericalangle$|| ams |
|{split}|$$\begin{equation}\begin{split}a &=b+c\\&=e+f\end{split}\end{equation}$$|`\begin{equation}`<br>`\begin{split}`<br>   `a &=b+c\\`<br>      `&=e+f`<br>`\end{split}`<br>`\end{equation}`| ams |
|\sqcap|$\sqcap$|||
|\sqcup|$\sqcup$|||
|\sqint|$\sqint$|||
|\square|$\square$|||
|\sqrt|$\sqrt[3]{x}$|`\sqrt[3]{x}`||
|\sqsubset|$\sqsubset$|| ams |
|\sqsubseteq|$\sqsubseteq$|||
|\sqsupset|$\sqsupset$|| ams |
|\sqsupseteq|$\sqsupseteq$|| ams |
|\ss|$\text{\ss}$|`\text{\ss}`||
|\stackrel|$\stackrel{!}{=}$|`\stackrel{!}{=}`||
|\standardstate|$\standardstate$|| chemstyle |
|\star|$\star$|||
|\stareq|$\stareq$|| stix |
|\Stigma|$\Stigma$|||
|\stigma|$\stigma$|||
|\strictif|$\strictif$|| txfonts/pxfonts |
|\strictfi|$\strictfi$|| txfonts/pxfonts |
|\strut|(Not supported)|||
|\style|(Not supported)|Non standard||
|\sub|$\sub$|| texvc extension |
|{subarray}|$$\sum_{\begin{subarray}{l} i\in\Lambda\\ 0<j<n\end{subarray}}P(i,j)$$|`\sum_{\begin{subarray}{l}`<br> `i\in\Lambda\\`<br>  `0<j<n`<br>`\end{subarray}}P(i,j)`| ams |
|\sube|$\sube$|| texvc extension |
|\Subset|$\Subset$|| ams |
|\subset|$\subset$|||
|\subseteq|$\subseteq$|||
|\subseteqq|$\subseteqq$|| ams |
|\subsetneq|$\subsetneq$|| ams |
|\subsetneqq|$\subsetneqq$|| ams |
|\substack|$$\sum_{\substack{0<i<m\\0<j<n}}$$|`\sum_{\substack{0<i<m\\0<j<n}}`| ams |
|\succ|$\succ$|||
|\succapprox|$\succapprox$|| ams |
|\succcurlyeq|$\succcurlyeq$|| ams |
|\succeq|$\succeq$|||
|\succnapprox|$\succnapprox$|| ams |
|\succneqq|$\succneqq$|| ams |
|\succnsim|$\succnsim$|| ams |
|\succsim|$\succsim$|| ams |
|\sum|$\sum$|||
|\sun|$\sun$|| stix |
|\sup|$\sup$|||
|\supe|$\supe$|| texvc extension |
|\Supset|$\Supset$|| ams |
|\supset|$\supset$|| ams |
|\supseteq|$\supseteq$|||
|\supseteqq|$\supseteqq$|| ams |
|\supsetneq|$\supsetneq$|| ams |
|\supsetneqq|$\supsetneqq$|| ams |
|\surd|$\surd$|||
|\swarrow|$\swarrow$|||

## T

<div id="ttbl"></div>

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\tag|$$\tag{hi} e=mc^2 \label{tag1}$$|`\tag{hi} e=mc^2 \label{tag1}`| ams |
|\tag*|$$\tag*{hey} e=mc^2$$|`\tag*{hey} e=mc^2`| ams |
|\tan|$\tan$|||
|\tanh|$\tanh$|||
|\Tau|$\Tau$|||
|\tau|$\tau$|||
|\tbinom|$\tbinom n k$|`\tbinom n k`| ams |
|\TeX|$\TeX$|||
|\text|$\text{ yes }\&\text{ no }$|`\text{ yes }\&\text{ no }`||
|\textasciitilde|$\text{\textasciitilde}$|`\text{\textasciitilde}`||
|\textasciicircum|$\text{\textasciicircum}$|`\text{\textasciicircum}`||
|\textbackslash|$\text{\textbackslash}$|`\text{\textbackslash}`||
|\textbar|$\text{\textbar}$|`\text{\textbar}`||
|\textbardbl|$\text{\textbardbl}$|`\text{\textbardbl}`||
|\textbf|$\textbf{AaBb123}$|`\textbf{AaBb123}`||
|\textbraceleft|$\text{\textbraceleft}$|`\text{\textbraceleft}`||
|\textbraceright|$\text{\textbraceright}$|`\text{\textbraceright}`||
|\textbullet|$\text{\textbullet}$|`\text{\textbullet}`||
|\textcircled|(Not supported)|||
|\textcolor|$\textcolor{blue}{F=ma}$|`\textcolor{blue}{F=ma}`| color |
|\textdagger|$\text{\textdagger}$|`\text{\textdagger}`||
|\textdaggerdbl|$\text{\textdaggerdbl}$|`\text{\textdaggerdbl}`||
|\textdegree|$\text{\textdegree}$|`\text{\textdegree}`||
|\textdollar|$\text{\textdollar}$|`\text{\textdollar}`||
|\textellipsis|$\text{\textellipsis}$|`\text{\textellipsis}`||
|\textemdash|$\text{\textemdash}$|`\text{\textemdash}`||
|\textendash|$\text{\textendash}$|`\text{\textendash}`||
|\\texteuro|$\text{\texteuro}$|`\text{\texteuro}`||
|\textgreater|$\text{\textgreater}$|`\text{\textgreater}`||
|\textit|$\textit{AaBb}$|`\textit{AaBb}`||
|\textless|$\text{\textless}$|`\text{\textless}`||
|\textmd|$\textmd{AaBb123}$|`\textmd{AaBb123}`||
|\textnormal|$\textnormal{AB}$|`\textnormal{AB}`||
|\textquotedblleft|$\text{\textquotedblleft}$|`\text{\textquotedblleft}`||
|\textquotedblright|$\text{\textquotedblright}$|`\text{\textquotedblright}`||
|\textquoteleft|$\text{\textquoteleft}$|`\text{\textquoteleft}`||
|\textquoteright|$\text{\textquoteright}$|`\text{\textquoteright}`||
|\textregistered|$\text{\textregistered}$|`\text{\textregistered}`||
|\textrm|$\textrm{AaBb123}$|`\textrm{AaBb123}`||
|\textsc|$\textsc{hey}$|`\textsc{hey}`||
|\textsf|$\textsf{AaBb123}$|`\textsf{AaBb123}`||
|\textsl|(Not supported)|||
|\textsterling|$\text{\textsterling}$|`\text{\textsterling}`||
|\textstyle|$\textstyle\sum_0^n$|`\textstyle\sum_0^n`||
|\texttt|$\texttt{AaBb123}$|`\texttt{AaBb123}`||
|\textunderscore|$\text{\textunderscore}$|`\text{\textunderscore}`||
|\textup|$\textup{AaBb123}$|`\textup{AaBb123}`||
|\textvisiblespace|$\text{\textvisiblespace}$|`\text{\textvisiblespace}`||
|\tfrac|$\tfrac ab$|`\tfrac ab`| ams |
|\tg|$\tg$|||
|\th|$\th$|||
|\therefore|$\therefore$|| ams |
|\Theta|$\Theta$|||
|\theta|$\theta$|||
|\thetasym|$\thetasym$|| texvc extension |
|\thickapprox|$\thickapprox$|| ams |
|\thicksim|$\thicksim$|| ams |
|\thickspace|$a\thickspace b$|`a\thickspace b`| ams |
|\thinspace|$a\thinspace b$|`a\thinspace b`| ams |
|\tilde|$\tilde M$|`\tilde M`||
|\times|$\times$|||
|\Tiny|$\Tiny Tiny$|`\Tiny Tiny`||
|\tiny|$\tiny tiny$|`\tiny tiny`||
|\to|$\to$|||
|\top|$\top$|||
|\Tr|$\Tr\rho$|`\Tr\rho`| physics extension |
|\tr|$\tr\rho$|`\tr\rho`| physics extension |
|\triangle|$\triangle$|||
|\triangledown|$\triangledown$|| ams |
|\triangleleft|$\triangleleft$|||
|\trianglelefteq|$\trianglelefteq$|| ams |
|\triangleq|$\triangleq$|| ams |
|\triangleright|$\triangleright$|||
|\trianglerighteq|$\trianglerighteq$|| ams |
|\tt|${\tt AaBb123}$|`{\tt AaBb123}`||
|\twoheadleftarrow|$\twoheadleftarrow$|| ams |
|\twoheadrightarrow|$\twoheadrightarrow$|| ams |

## U

| Function             |  Rendered                   | Source or Comment          |  Package        |
|----------------------|-----------------------------|----------------------------|-----------------|
| \u                   | $\text{\u{a}}$              | `\text{\u{a}}`             |                 |
| \Uarr                | $\Uarr$                     |                            | texvc extension |
| \uArr                | $\uArr$                     |                            | texvc extension |
| \uarr                | $\uarr$                     |                            | texvc extension |
| \ulcorner            | $\ulcorner$                 |                            | ams             |
| \underbar            | $\underbar{X}$              | `\underbar{X}`             |                 |
| \underbrace          | $\underbrace{x+⋯+x}_{n\text{ times}}$ | `\underbrace{x+⋯+x}_{n\text{ times}}`| |
| \underbracket        | (Not supported)             |                            |                 |
| \undergroup          | $\undergroup{AB}$           | `\undergroup{AB}`          | MnSymbol        |
| \underleftarrow      | $\underleftarrow{AB}$       | `\underleftarrow{AB}`      | ams             |
| \underleftrightarrow | $\underleftrightarrow{AB}$  | `\underleftrightarrow{AB}` | ams             |
| \underrightarrow     | $\underrightarrow{AB}$      | `\underrightarrow{AB}`     | ams             |
| \underline           | $\underline{\text{a long argument}}$ | `\underline{\text{a long argument}}`| |
| \underlinesegment    | (Not supported)             |                            |                 |
| \underparen          | $\underparen{abc}$          | `\underparen{abc}`         |                 |
| \underrightarrow     | $\underrightarrow{AB}$      | `\underrightarrow{AB}`     |                 |
| \underset            | $\underset{!}{=}$           | `\underset{!}{=}`          | AMS             |
| \unicode             | (Not supported)             | See `\char`                |                 |
| \unlhd               | $\unlhd$                    |                            | ams             |
| \unrhd               | $\unrhd$                    |                            | ams             |
| \up                  | (Not supported)             |                            |                 |
| \upalpha             | $\upalpha$                  |                            | upgreek         |
| \Uparrow             | $\Uparrow$                  |                            |                 |
| \uparrow             | $\uparrow$                  |                            |                 |
| \upbeta              | $\upbeta$                   |                            | upgreek         |
| \updelta             | $\updelta$                  |                            | upgreek         |
| \upchi               | $\upchi$                    |                            | upgreek         |
| \Updownarrow         | $\Updownarrow$              |                            |                 |
| \updownarrow         | $\updownarrow$              |                            |                 |
| \upeta               | $\upeta$                    |                            | upgreek         |
| \upepsilon           | $\upepsilon$                |                            | upgreek         |
| \upgamma             | $\upgamma$                  |                            | upgreek         |
| \upharpoonleft       | $\upharpoonleft$            |                            | ams             |
| \upharpoonright      | $\upharpoonright$           |                            | ams             |
| \upiota              | $\upiota$                   |                            | upgreek         |
| \upkappa             | $\upkappa$                  |                            | upgreek         |
| \uplambda            | $\uplambda$                 |                            | upgreek         |
| \upmu                | $\upmu$                     |                            | upgreek         |
| \upnu                | $\upnu$                     |                            | upgreek         |
| \upomega             | $\upomega$                  |                            | upgreek         |
| \upomicron           | $\upomicron$                |                            | upgreek         |
| \uplus               | $\uplus$                    |                            | upgreek         |
| \upphi               | $\upphi$                    |                            | upgreek         |
| \uppi                | $\uppi$                     |                            | upgreek         |
| \uppsi               | $\uppsi$                    |                            | upgreek         |
| \uprho               | $\uprho$                    |                            | upgreek         |
| \uproot              | (Not supported)             |                            |                 |
| \upshape             | (Not supported)             |                            |                 |
| \upsigma             | $\upsigma$                  |                            | upgreek         |
| \Upsilon             | $\Upsilon$                  |                            |                 |
| \upsilon             | $\upsilon$                  |                            |                 |
| \uptau               | $\uptau$                    |                            | upgreek         |
| \uptheta             | $\uptheta$                  |                            | upgreek         |
| \upuparrows          | $\upuparrows$               |                            | ams             |
| \upupsilon           | $\upupsilon$                |                            | upgreek         |
| \upxi                | $\upxi$                     |                            | upgreek         |
| \upzeta              | $\upzeta$                   |                            | upgreek         |
| \urcorner            | $\urcorner$                 |                            | ams             |
| \url                 | $\footnotesize\url{https://temml.org/}$ | `\url{https://temml.org/}`<br>Requires `trust` [option](options.md)| |
| \utilde              | $\utilde{AB}$               | `\utilde{AB}`              |  undertilde     |

## V

| Function       |  Rendered   | Source or Comment |  Package  |
|----------------|-------------|-------------------|-----------|
|\v|$\text{\v{a}}$ |`\text{\v{a}}`||
|\va|$\va{a}$ |`\va{a}`| physics extension |
|\var|$\var$ || physics extension |
|\varcoppa|$\varcoppa$ |||
|\varclubsuit|$\varclubsuit$ || txfonts |
|\varDelta|$\varDelta$ || ams |
|\vardiamondsuit|$\vardiamondsuit$ || txfonts |
|\varepsilon|$\varepsilon$ |||
|\varGamma|$\varGamma$ || ams |
|\varheartsuit|$\varheartsuit$ || txfonts |
|\variation|$\variation$ || physics extension |
|\varinjlim|$\varinjlim$ |`\varinjlim`| ams |
|\varkappa|$\varkappa$ || ams |
|\varLambda|$\varLambda$ || ams |
|\varliminf|$\varliminf$ |`\varliminf`| ams |
|\varlimsup|$\varlimsup$ |`\varlimsup`| ams |
|\varnothing|$\varnothing$ || ams |
|\varointclockwise|$\varointclockwise$ |||
|\varOmega|$\varOmega$ || ams |
|\varPhi|$\varPhi$ || ams |
|\varphi|$\varphi$ |||
|\varPi|$\varPi$ || ams |
|\varpi|$\varpi$ |||
|\varprojlim|$\varprojlim$ |`\varprojlim`| ams |
|\varpropto|$\varpropto$ || ams |
|\varPsi|$\varPsi$ || ams |
|\varrho|$\varrho$ |||
|\varSigma|$\varSigma$ || ams |
|\varsigma|$\varsigma$ |||
|\varspadesuit|$\varspadesuit$ || txfonts |
|\varstigma|(Not supported)|||
|\varsubsetneq|$\varsubsetneq$ || ams |
|\varsubsetneqq|$\varsubsetneqq$ || ams |
|\varsupsetneq|$\varsupsetneq$ || ams |
|\varsupsetneqq|$\varsupsetneqq$ || ams |
|\varTheta|$\varTheta$ || ams |
|\vartheta|$\vartheta$ |||
|\vartriangle|$\vartriangle$ || ams |
|\vartriangleleft|$\vartriangleleft$ || ams |
|\vartriangleright|$\vartriangleright$ || ams |
|\varUpsilon|$\varUpsilon$ || ams |
|\varXi|$\varXi$ || ams |
|\vb|$\vb{a}$ |`\vb{a}`| physics extension |
|\vcentcolon|$\vcentcolon$ |||
|\vcenter|(Not supported)|||
|\Vdash|$\Vdash$ || ams |
|\VDash|$\VDash$ || MnSymbol |
|\vDash|$\vDash$ || ams |
|\vdash|$\vdash$ |||
|\vdot|$\vdot$ || physics extension |
|\vdots|$\vdots$ |||
|\vec|$\vec{F}$ |`\vec{F}`||
|\vectorarrow|$\vectorarrow{a}$ |`\vectorarrow{a}`| physics extension |
|\vectorbold|$\vectorbold{a}$ |`\vectorbold{a}`| physics extension |
|\vectorunit|$\vectorunit{a}$ |`\vectorunit{a}`| physics extension |
|\vee|$\vee$ |||
|\veebar|$\veebar$ || ams |
|\veeeq|$\veeeq$ || stix |
|\verb|$\verb!\frac a b!$ |`\verb!\frac a b!`||
|\Vert|$\Vert$ |||
|\vert|$\vert$ |||
|\vfil|(Not supported)|||
|\vfill|(Not supported)|||
|\vline|(Not supported)|||
|{Vmatrix}|$\begin{Vmatrix}a&b\\c&d\end{Vmatrix}$ |`\begin{Vmatrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{Vmatrix}`| ams |
|{Vmatrix*}|$\begin{Vmatrix*}[r] -1 & 3\\ 2 & -4 \end{Vmatrix*}$ |`\begin{Vmatrix*}[r]`<br>   `-1 & 3 \\`<br>   `2 & -4`<br>`\end{Vmatrix*}`| mathtools |
|{vmatrix}|$\begin{vmatrix}a&b\\c&d\end{vmatrix}$ |`\begin{vmatrix}`<br>   `a & b \\`<br>   `c & d`<br>`\end{vmatrix}`| ams |
|{vmatrix*}|$\begin{vmatrix*}[r] -1 & 3\\ 2 & -4 \end{vmatrix*}$ |`\begin{vmatrix*}[r]`<br>   `-1 & 3 \\`<br>   `2 & -4`<br>`\end{vmatrix*}`| mathtools |
|\vphantom|$\overline{\vphantom{M}a}$ |`\overline{\vphantom{M}a}`||
|\vqty|$\vqty{x}$ |`\vqty{x}`| physics extension |
|\vu|$\vu{a}$ |`\vu{a}`| physics extension |
|\Vvdash|$\Vvdash$ || ams |

## W

| Function   |  Rendered          | Source or Comment |  Package        |
|------------|--------------------|-------------------|-----------------|
| \wedge     | $\wedge$           |                   |                 |
| \wedgeq    | $\wedgeq$          |                   | stix            |
| \weierp    | $\weierp$          |                   | texvc extension |
| \widecheck | $\widecheck{AB}$   |`\widecheck{AB}`   | mathabx         |
| \widehat   | $\widehat{AB}$     |`\widehat{AB}`     |                 |
| \wideparen | $\wideparen{abc}$  |`\wideparen{abc}`  | MnSymbol        |
| \widetilde | $\widetilde{AB}$   |`\widetilde{AB}`   |                 |
| \with      | $\with$            |                   | cmll            |
| \wn        | $\wn$              |                   | cmll            |
| \wp        | $\wp$              |                   |                 |
| \wr        | $\wr$              |                   |                 |

## X

| Function            |  Rendered                   | Source or Comment          |  Package  |
|---------------------|-----------------------------|----------------------------|-----------|
| \xcancel            | $\xcancel{ABC}$             | `\xcancel{ABC}`            |  cancel   |
| \xdef               | (Not supported)             |                            |           |
| \Xi                 | $\Xi$                       |                            |           |
| \xi                 | $\xi$                       |                            |           |
| \xhookleftarrow     | $\xhookleftarrow{abc}$      | `\xhookleftarrow{abc}`     | mathtools |
| \xhookrightarrow    | $\xhookrightarrow{abc}$     | `\xhookrightarrow{abc}`    | mathtools |
| \xLeftarrow         | $\xLeftarrow{abc}$          | `\xLeftarrow{abc}`         | mathtools |
| \xleftarrow         | $\xleftarrow{abc}$          | `\xleftarrow{abc}`         | ams       |
| \xleftharpoondown   | $\xleftharpoondown{abc}$    | `\xleftharpoondown{abc}`   | mathtools |
| \xleftharpoonup     | $\xleftharpoonup{abc}$      | `\xleftharpoonup{abc}`     | mathtools |
| \xLeftrightarrow    | $\xLeftrightarrow{abc}$     | `\xLeftrightarrow{abc}`    | mathtools |
| \xleftrightarrow    | $\xleftrightarrow{abc}$     | `\xleftrightarrow{abc}`    | mathtools |
| \xleftrightharpoons | $\xleftrightharpoons{abc}$  | `\xleftrightharpoons{abc}` | mathtools |
| \xlongequal         | $\xlongequal{abc}$          | `\xlongequal{abc}`         |  extpfeil |
| \xmapsto            | $\xmapsto{abc}$             | `\xmapsto{abc}`            | mathtools |
| \xRightarrow        | $\xRightarrow{abc}$         | `\xRightarrow{abc}`        | mathtools |
| \xrightarrow        | $\xrightarrow{abc}$         | `\xrightarrow{abc}`        | ams       |
| \xrightharpoondown  | $\xrightharpoondown{abc}$   | `\xrightharpoondown{abc}`  | mathtools |
| \xrightharpoonup    | $\xrightharpoonup{abc}$     | `\xrightharpoonup{abc}`    | mathtools |
| \xrightleftharpoons | $\xrightleftharpoons{abc}$  | `\xrightleftharpoons{abc}` | mathtools |
| \xtofrom            | $\xtofrom{abc}$             | `\xtofrom{abc}`            | extpfeil  |
| \xtwoheadleftarrow  | $\xtwoheadleftarrow{abc}$   | `\xtwoheadleftarrow{abc}`  | extpfeil  |
| \xtwoheadrightarrow | $\xtwoheadrightarrow{abc}$  | `\xtwoheadrightarrow{abc}` | extpfeil  |

## YZ

| Function       |  Rendered   | Source or Comment |  Package        |
|----------------|-------------|-------------------|-----------------|
| \yen           | $\yen$       |                   | ams             |
| \Z             | $\Z$         |                   | texvc extension |
| \Zeta          | $\Zeta$      |                   |                 |
| \zeta          |$\zeta$       |                   |                 |


<br>

<p class="reduced">Copyright © 2021-2023 Ron Kok. Released under the <a href="https://opensource.org/licenses/MIT">MIT License</a></p>

<br>

</main>

<nav>
<div id="sidebar" class="narrow">

$\href{https://temml.org/}{\color{black}\Large\Temml}$    v0.10.15

<div style="height:0.5em;"></div>

* [Symbols](#symbols)
* [A](#a)
* [B](#b)
* [C](#c)
* [D](#d)
* [E](#e)
* [F](#f)
* [G](#g)
* [H](#h)
* [I](#i)
* [JK](#jk)
* [L](#l)
* [M](#m)
* [N](#n)
* [O](#o)
* [P](#p)
* [Q](#q)
* [R](#r)
* [S](#s)
* [T](#t)
* [U](#u)
* [V](#v)
* [W](#w)
* [X](#x)
* [YZ](#yz)

<ul style="border-top: 1px solid">
  <li><a href="supported.html">Support</a></li>
  <li><a href="administration.html">Installation</a></li>
  <li><a href="../../index.html">Home</a></li>
</ul>

</div>  <!-- sidebar -->
</nav>

<div id="mobile-nav">
  <!--On very small screens, the sidebar TOC is replaced by a button with a drop-down menu. -->
  <input type="checkbox" id="checkbox_toggle">
  <label for="checkbox_toggle"><svg xmlns="http://www.w3.org/2000/svg" width="25.6" height="25.6"><path d="M4.8 12.05h16v1.6h-16zM4.8 7.25h16v1.6h-16zM4.8 16.85h16v1.6h-16z"/></svg></label>
  <ul>
    <li><a href="#symbols">Symbols</a></li>
    <li><a href="#a">A</a></li>
    <li><a href="#d">D</a></li>
    <li><a href="#h">H</a></li>
    <li><a href="#l">L</a></li>
    <li><a href="#p">P</a></li>
    <li><a href="#t">T</a></li>
    <li><a href="#x">X</a></li>
    <li><a href="../../index.html">Home</a></li>
  </ul>
</div>

<script>
  // Assign id's to auto-numbered equations and populate \ref's
  temml.postProcess(document.getElementById("main"))
</script>

</body>
</html>