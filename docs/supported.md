<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Temml Functions</title>
   <link rel="stylesheet" href="../../temml/temml-dual.css">
   <link rel="stylesheet" href="../docStyles.css">
   <script src="../../temml/temml.min.js"></script>
   <style>
      #env + table tr td:nth-child(1) { min-width: 9em }
      #env + table tr td:nth-child(3) { min-width: 11em }
    </style>
</head>

<body>
<main id="main" class="latin-modern">

# Supported Functions

**Temml** is a JavaScript library that converts TeX math-mode functions to MathML. This page lists the TeX functions it supports, sorted into logical groups.

To read this page, use a browser that supports MathML, such as Firefox or Safari. Chrome and Edge will support MathML [soon](https://mathml.igalia.com/).

There is a similar [Support Table](./support_table.html), sorted alphabetically, that lists both supported and some un-supported functions.

## Accents

||||
|:----------|:------------------------|:----------------------------------|
| $a'$ `a'` | $\tilde{a}$ `\tilde{a}` | $\widetilde{ac}$ `\widetilde{ac}` |
| $a''$ `a''` | $\vec{F}$ `\vec{F}` | $\utilde{AB}$ `\utilde{AB}` |
| $a^{\prime}$ `a^{\prime}` | $\overleftarrow{AB}$ `\overleftarrow{AB}` | $\overrightarrow{AB}$ `\overrightarrow{AB}` |
| $\acute{a}$ `\acute{a}` | $\underleftarrow{AB}$ `\underleftarrow{AB}` | $\underrightarrow{AB}$ `\underrightarrow{AB}` |
| $\bar{y}$ `\bar{y}` | $\overline{AB}$ `\overline{AB}` | $\Overrightarrow{AB}$ `\Overrightarrow{AB}` |
| $\breve{a}$ `\breve{a}` | $\underline{AB}$ `\underline{AB}` | $\overleftrightarrow{AB}$ `\overleftrightarrow{AB}` |
| $\check{a}$ `\check{a}` | $\widecheck{ac}$ `\widecheck{ac}` | $\underleftrightarrow{AB}$ `\underleftrightarrow{AB}` |
| $\dot{a}$ `\dot{a}` | $\overleftharpoon{ac}$ `\overleftharpoon{ac}` | $\overrightharpoon{ac}$ `\overrightharpoon{ac}` |
| $\ddot{a}$ `\ddot{a}` | $\overgroup{AB}$ `\overgroup{AB}` | $\wideparen{AB}$ `\wideparen{AB}` |
| $\dddot{a}$ `\dddot{a}` | $\undergroup{AB}$ `\undergroup{AB}` | $\overparen{AB}$ `\overparen{AB}` |
| $\ddddot{a}$ `\ddddot{a}` | $\underbar{X}$ `\underbar{X}` | $\underparen{AB}$ `\underparen{AB}` |
| $\grave{a}$ `\grave{a}` | $\mathring{g}$ `\mathring{g}` | $\overbrace{AB}$ `\overbrace{AB}` |
| $\hat{\theta}$ `\hat{\theta}` | $\widehat{ac}$ `\widehat{ac}` | $\underbrace{AB}$ `\underbrace{AB}` |

***Accent functions inside \\text{…}***

|||||
|:----------------------------------|:---------------------|:---------------------|:-----
|$\text{\'{a}}$ `\'{a}`             |$\text{\~{a}}$ `\~{a}`|$\text{\.{a}}$ `\.{a}`|$\text{\H{a}}$ `\H{a}`
|$\text{\`{a}}$ <code>\\`{a}</code> |$\text{\={a}}$ `\={a}`|$\text{\"{a}}$ `\"{a}`|$\text{\v{a}}$ `\v{a}`
|$\text{\^{a}}$ `\^{a}`             |$\text{\u{a}}$ `\u{a}`|$\text{\r{a}}$ `\r{a}`|

See also [letters](#letters)

## Annotation

|||
|:--------------------------------------|:-----
|$\cancel{5}$ `\cancel{5}`              |$\overbrace{a+b+c}^{\text{note}}$ `\overbrace{a+b+c}^{\text{note}}`
|$\bcancel{5}$ `\bcancel{5}`            |$\underbrace{a+b+c}_{\text{note}}$ `\underbrace{a+b+c}_{\text{note}}`
|$\xcancel{ABC}$ `\xcancel{ABC}`        |$\cancelto{0}{x+1}$ `\cancelto{0}{x+1}`
|$\sout{abc}$ `\sout{abc}`              |$\boxed{\pi=\frac c d}$ `\boxed{\pi=\frac c d}`
| $\ref{tag1}$ `\ref{tag1}` |$\texttip{\text{hover here}}{This is a tooltip.}$ `\texttip{\text{hover here}}{This is a tooltip.}`
| | $\toggle{\text{Click me}}{Hey!}{Ow!}\endtoggle$ `\toggle{\text{Click me}}{Hey!}{Ow!}\endtoggle`
| $$\tag{hi} x+y^{2x} \label{tag1}$$    | `\tag{hi} x+y^{2x} \label{tag1}` |
| $$\tag*{bye} x+y^{2x}$$               | `\tag*{bye} x+y^{2x}` |

Also some [environments](#environments) have automatic equation numbering.

A `\label{…}` may be placed anywhere and will create an HTML id matching the `\label{…}` argument. That argument may contain only the characters `A-Za-z0-9_-`.

On sites where Temml fields are updated dynamically, `\ref{…}` may not be supported. Other Temml functions update only the local field. `\ref{…}` must make two passes through the entire document. Some sites may choose not to do this.

## Delimiters

||||||
|:------------|:------------|:----------|:-----------------|:-----
|$(~)$ `( )` |$\lparen~\rparen$ `\lparen`<br>$~~~~$`\rparen`|$⌈~⌉$ `⌈ ⌉`|$\lceil~\rceil$ `\lceil`<br>$~~~~~$`\rceil`  |$\uparrow$ `\uparrow`
|$[~]$ `[ ]` |$\lbrack~\rbrack$ `\lbrack`<br>$~~~~$`\rbrack`|$⌊~⌋$ `⌊ ⌋`|$\lfloor~\rfloor$ `\lfloor`<br>$~~~~~$`\rfloor` |$\downarrow$ `\downarrow`
|$\{ \}$ `\{ \}`|$\lbrace \rbrace$ `\lbrace`<br>$~~~~$`\rbrace`|$⎰⎱$ `⎰⎱`  |$\lmoustache \rmoustache$ `\lmoustache`<br>$~~~~$`\rmoustache`|$\updownarrow$ `\updownarrow`
|$⟨~⟩$ `⟨ ⟩` |$\lt\gt$ `\lt`<br>$~~~~~~~~~~~~~$`\gt`|$⟮~⟯$ `⟮ ⟯`|$\lgroup~\rgroup$ `\lgroup`<br>$~~~~~$`\rgroup` |$\Uparrow$ `\Uparrow`
|$\vert$ <code>&#124;</code> |$\vert$ `\vert` |$┌ ┐$ `┌ ┐`|$\ulcorner \urcorner$ `\ulcorner`<br>$~~~~$`\urcorner`  |$\Downarrow$ `\Downarrow`
|$\Vert$ <code>&#92;&#124;</code> |$\Vert$ `\Vert` |$└ ┘$ `└ ┘`|$\llcorner \lrcorner$ `\llcorner`<br>$~~~~$`\lrcorner`  |$\Updownarrow$ `\Updownarrow`
|$\lvert~\rvert$ `\lvert`<br>$~~~~$`\rvert`|$\lVert~\rVert$ `\lVert`<br>$~~~~~$`\rVert` |`\left.`|  `\right.` |$\backslash$ `\backslash`
|||$⟦~⟧$ `⟦ ⟧`|$\llbracket~\rrbracket$ `\llbracket`<br>$~~~~$`\rrbracket`|$\lBrace~\rBrace$ `\lBrace \rBrace`

The *texvc* extension includes $\lang$ `\lang`, $\rang$ `\rang`, $\langle$ `\langle`, and $\rangle$ `\rangle`.

**Delimiter Sizing**

$\left(\LARGE{AB}\right)$ `\left(\LARGE{AB}\right)`

$( \big( \Big( \bigg( \Bigg($ `( \big( \Big( \bigg( \Bigg(`

||||||
|:--------|:------|:--------|:-------|:------|
|`\left`  |`\big` |`\bigl`  |`\bigm` |`\bigr`
|`\middle`|`\Big` |`\Bigl`  |`\Bigm` | `\Bigr`
|`\right` |`\bigg`|`\biggl` |`\biggm`|`\biggr`
|         |`\Bigg`|`\Biggl` |`\Biggm`|`\Biggr`

## Environments

|||||
|:---------------------|:---------------------|:---------------------|:--------
|$\begin{matrix} a & b \\ c & d \end{matrix}$ | `\begin{matrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{matrix}` |$\begin{array}{cc}a & b\\c & d\end{array}$ | `\begin{array}{cc}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{array}`
|$\begin{pmatrix} a & b \\ c & d \end{pmatrix}$ |`\begin{pmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{pmatrix}` |$\begin{bmatrix} a & b \\ c & d \end{bmatrix}$ | `\begin{bmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{bmatrix}`
|$\begin{vmatrix} a & b \\ c & d \end{vmatrix}$ |`\begin{vmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{vmatrix}` |$\begin{Vmatrix} a & b \\ c & d \end{Vmatrix}$ |`\begin{Vmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{Vmatrix}`
|$\begin{Bmatrix} a & b \\ c & d \end{Bmatrix}$ |`\begin{Bmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{Bmatrix}`|$\def\arraystretch{1.5}\begin{array}{c\|c:c} a & b & c \\ \hline d & e & f \\ \hdashline g & h & i \end{array}$|`\def\arraystretch{1.5}`<br>&nbsp;&nbsp;&nbsp;`\begin{array}{c\|c:c}`<br>&nbsp;&nbsp;&nbsp;`a & b & c \\ \hline`<br>&nbsp;&nbsp;&nbsp;`d & e & f \\`<br>&nbsp;&nbsp;&nbsp;`\hdashline`<br>&nbsp;&nbsp;&nbsp;`g & h & i`<br>`\end{array}`
|$x = \begin{cases} a &\text{if } b \\ c &\text{if } d \end{cases}$ |`x = \begin{cases}`<br>&nbsp;&nbsp;&nbsp;`a &\text{if } b  \\`<br>&nbsp;&nbsp;&nbsp;`c &\text{if } d`<br>`\end{cases}`|$\begin{rcases} a &\text{if } b \\ c &\text{if } d \end{rcases}⇒$ |`\begin{rcases}`<br>&nbsp;&nbsp;&nbsp;`a &\text{if } b  \\`<br>&nbsp;&nbsp;&nbsp;`c &\text{if } d`<br>`\end{rcases}⇒`|
|$\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}$ | `\begin{smallmatrix}`<br>&nbsp;&nbsp;&nbsp;`a & b \\`<br>&nbsp;&nbsp;&nbsp;`c & d`<br>`\end{smallmatrix}` |$$\sum_{\begin{subarray}{l} i\in\Lambda\\ 0<j<n\end{subarray}}$$|`\sum_{\begin{subarray}{l}`<br>&nbsp;`i\in\Lambda\\`<br>&nbsp;&nbsp;`0<j<n`<br>`\end{subarray}}`

The auto-render extension will render the following environments even if they are not inside math delimiters such as `$$…$$`. They are display-mode only.
<div id="env"></div>

|||||
|:---------------------|:---------------------|:---------------------|:--------
|$$\begin{equation}\begin{split}a &=b+c\\ &=e+f\end{split}\end{equation}$$ |`\begin{equation}`<br>`\begin{split}`<br>&nbsp;&nbsp;&nbsp;`a &=b+c\\`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`&=e+f`<br>`\end{split}`<br>`\end{equation}` |$$\begin{align} a&=b+c \\ d+e&=f \end{align}$$ |`\begin{align}`<br>&nbsp;&nbsp;&nbsp;`a&=b+c \\`<br>&nbsp;&nbsp;&nbsp;`d+e&=f`<br>`\end{align}`|$$\begin{alignat}{2}10&x+&3&y=2\\3&x+&13&y=4\end{alignat}$$ 
|$$\begin{gather} a=b \\ e=b+c \end{gather}$$ |`\begin{gather}`<br>&nbsp;&nbsp;&nbsp;`a=b \\ `<br>&nbsp;&nbsp;&nbsp;`e=b+c`<br>`\end{gather}`|$$\begin{alignat}{2} 10&x+ &3&y = 2 \\ 3&x+&13&y = 4\end{alignat}$$|`\begin{alignat}{2}`<br>&nbsp;&nbsp;&nbsp;`10&x+ &3&y = 2 \\`<br>&nbsp;&nbsp;&nbsp;` 3&x+&13&y = 4`<br>`\end{alignat}`
|$$\begin{CD}A @>a>> B \\@VbVV @AAcA\\C @= D\end{CD}$$ |`\begin{CD}`<br>&nbsp;&nbsp;&nbsp;`A  @>a>>  B  \\`<br>`@VbVV    @AAcA \\`<br>&nbsp;&nbsp;&nbsp;`C  @=   D`<br>`\end{CD}`|$$\begin{multline}\rm uno \\ \rm dos \\ \rm tres\end{multline}$$|`\begin{multline}`<br>&nbsp;&nbsp;`\rm uno \\`<br>&nbsp;&nbsp;`\rm dos \\`<br>&nbsp;&nbsp;`\rm tres`<br>`\end{multline}`

#### Other Temml Environments

| Environments | How they differ from those shown above |
|:-----------------------------------------------|:------------------|
| `darray`, `dcases`, `drcases`                  | … apply `displaystyle` |
| `matrix*`, `pmatrix*`, `bmatrix*`<br>`Bmatrix*`, `vmatrix*`, `Vmatrix*` | … take an optional argument to set column<br>alignment, as in `\begin{matrix*}[r]`
| `equation*`, `gather*`<br>`align*`, `alignat*` | … have no automatic numbering. |
| `gathered`, `aligned`, `alignedat`             | … do not need to be in display mode.<br> … have no automatic numbering.<br> … must be inside math delimiters in<br>order to be rendered by the auto-render<br>extension. |

Acceptable horizontal line separators are: `\\` and `\cr`.

Temml supports `\tag{…}` and `\notag` to modify equation numbering.

The `{array}` environment does not yet support `\cline` or `\multicolumn`.

## HTML

The following "raw HTML" features are potentially dangerous for untrusted
inputs, so they are disabled by default, and attempting to use them produces
the command names in red (which you can configure via the `errorColor`
[option](administration.html#options)).  To fully trust your LaTeX input, you need to pass
an option of `trust: true`; you can also enable just some of the commands
or for just some URLs via the `trust` [option](administration.html#options).

|||
|:------------------------------------|:-------------------|
| $\href{https://temml.org/}{\Temml}$ | `\href{https://temml.org/}{\Temml}` |
| $\url{https://temml.org/}$          | `\url{https://temml.org/}` |
| $\includegraphics[height=1em, totalheight=1.2em, width=1.2em, alt=sphere]{../sphere.jpg}$ | `\includegraphics[height=1em,`<br>`totalheight=1.2em,width=1.2em, alt=sphere]`<br>`{../sphere.jpg}` |
| $\id{idName}{x}$                    | `\id{idName}{x}` |
| $\class{class-name}{x}$             | `\class{class-name}{x}` |
| $\style{color: red;}{x}$            | `\style{color: red;}{x}` |
| $\data{datum1=a, datum2=b}{x}$      | `\data{datum1=a, datum2=b}{x}` |

## Letters

**Greek Letters**

||||||
|---------------|-------------|-------------|---------------|---------------|
| $\Alpha$ `\Alpha` | $\Beta$ `\Beta` | $\Gamma$ `\Gamma`| $\Delta$ `\Delta`| $\Epsilon$ `\Epsilon` 
| $\Zeta$ `\Zeta` | $\Eta$ `\Eta` | $\Theta$ `\Theta`| $\Iota$ `\Iota` | $\Kappa$ `\Kappa` 
| $\Lambda$ `\Lambda` | $\Mu$ `\Mu`| $\Nu$ `\Nu` | $\Xi$ `\Xi` | $\Omicron$ `\Omicron` 
| $\Pi$ `\Pi`| $\Rho$ `\Rho` | $\Sigma$ `\Sigma` | $\Tau$ `\Tau` | $\Upsilon$ `\Upsilon`
| $\Phi$ `\Phi` | $\Chi$ `\Chi` | $\Psi$ `\Psi` | $\Omega$ `\Omega`| $\varGamma$ `\varGamma`
| $\varDelta$ `\varDelta` | $\varTheta$ `\varTheta` | $\varLambda$ `\varLambda`| $\varXi$ `\varXi`| $\varPi$ `\varPi`
| $\varSigma$ `\varSigma` | $\varUpsilon$ `\varUpsilon`| $\varPhi$ `\varPhi`  | $\varPsi$ `\varPsi`| $\varOmega$ `\varOmega`
| $\alpha$ `\alpha`| $\beta$ `\beta`  | $\gamma$ `\gamma` | $\delta$ `\delta`| $\epsilon$ `\epsilon`
| $\zeta$ `\zeta`  | $\eta$ `\eta`| $\theta$ `\theta`| $\iota$ `\iota` | $\kappa$ `\kappa`
| $\lambda$ `\lambda`| $\mu$ `\mu`| $\nu$ `\nu`| $\xi$ `\xi` | $\omicron$ `\omicron`
| $\pi$ `\pi`| $\rho$ `\rho`  | $\sigma$ `\sigma` | $\tau$ `\tau`| $\upsilon$ `\upsilon` |
| $\phi$ `\phi`  | $\chi$ `\chi`| $\psi$ `\psi`| $\omega$ `\omega`||
| $\upalpha$ `\upalpha`| $\upbeta$ `\upbeta`  | $\upgamma$ `\upgamma` | $\updelta$ `\updelta`| $\upepsilon$ `\upepsilon`
| $\upzeta$ `\upzeta`  | $\upeta$ `\upeta`| $\uptheta$ `\uptheta`| $\upiota$ `\upiota` | $\upkappa$ `\upkappa`
| $\uplambda$ `\uplambda`| $\upmu$ `\upmu`| $\upnu$ `\upnu`| $\upxi$ `\upxi` | $\upomicron$ `\upomicron`
| $\uppi$ `\uppi`| $\uprho$ `\uprho`  | $\upsigma$ `\upsigma` | $\uptau$ `\uptau`| $\upupsilon$ `\upupsilon` |
| $\upphi$ `\upphi`  | $\upchi$ `\upchi`| $\uppsi$ `\uppsi`| $\upomega$ `\upomega`||
| $\varepsilon$ `\varepsilon` | $\varkappa$ `\varkappa` | $\vartheta$ `\vartheta`| $\varpi$ `\varpi`| $\varrho$ `\varrho`
| $\varsigma$ `\varsigma` | $\varphi$ `\varphi`| $\Coppa$ `\Coppa`| $\coppa$  `\coppa`   | $\Koppa$ `\Koppa`
| $\koppa$ `\koppa`| $\Sampi$ `\Sampi`| $\sampi$  `\sampi`   | $\Stigma$ `\Stigma` | $\stigma$ `\stigma`
| $\digamma$ `\digamma` | $\varcoppa$ `\varcoppa`|||

Direct Input: <span class="direct">Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ Μ Ν Ξ Ο Π Ρ Σ Τ Υ Φ Χ Ψ Ω
 α β γ δ ϵ ζ η θ ι κ λ μ ν ξ o π ρ σ τ υ ϕ χ ψ ω ε ϑ ϖ ϱ ς φ ϝ</span>

**Other Letters**

||||||
|:------------------|:-------------------|:-------------------|:--------------------------|:--------------------------|
| $\aleph$ `\aleph` | $\nabla$ `\nabla`  | $\imath$ `\imath`  | $\text{\aa}$ `\text{\aa}` | $\text{\OE}$ `\text{\OE}`
| $\beth$ `\beth`   | $\partial$ `\partial`| $\jmath$ `\jmath`| $\text{\AA}$ `\text{\AA}` | $\text{\o}$ `\text{\o}`
| $\gimel$ `\gimel` | $\Game$ `\Game`    | $\Im$ `\Im`        | $\text{\ae}$ `\text{\ae}` | $\text{\O}$ `\text{\O}`
| $\daleth$ `\daleth`| $\Finv$ `\Finv`   | $\Bbbk$ `\Bbbk`    | $\text{\AE}$ `\text{\AE}` | $\text{\ss}$ `\text{\ss}`
| $\eth$ `\eth`     | $\hbar$ `\hbar`    | $\ell$ `\ell`      | $\text{\oe}$ `\text{\oe}` | $\text{\i}$ `\text{\i}`
|                   | $\hslash$ `\hslash`| $\wp$ `\wp`        |                           | $\text{\j}$ `\text{\j}`

Letters in the *texvc* extension

||||||
|:----------------------|:----------------------|:----------------------|:------------------|:-------|
| $\alef$ `\alef`       | $\Complex$ `\Complex` | $\natnums$ `\natnums` | $\real$ `\real`   | $\weierp$ `\weierp`
| $\alefsym$ `\alefsym` | $\image$ `\image`     | $\R$ `\R`             | $\reals$ `\reals` | $\thetasym$ `\thetasym`
| $\cnums$ `\cnums`     | $\N$ `\N`             | $\Re$ `\Re`           | $\Reals$ `\Reals` | $\Z$ `\Z`

Direct Input: <span class="direct">∂ ∇ ℑ Ⅎ ℵ ℶ ℷ ℸ ⅁ ℏ ð À Á Â Ã Ä Å Æ Ç È É Ê Ë Ì Í Î Ï Ð Ñ Ò Ó Ô Õ Ö Ù Ú Û Ü Ý Þ ß à á â ã ä å ç è é ê ë ì í î ï ð ñ ò ó ô ö ù ú û ü ý þ ÿ</span>

**Unicode Mathematical Alphanumeric Symbols**

| Item         |  Range                |  Item             |  Range  |
|--------------|-----------------------|-------------------|---------------|
| Bold         | $\text{𝐀-𝐙 𝐚-𝐳 𝟎-𝟗}$  | Double-struck     | $\text{𝔸-ℤ 𝕒-𝕫 𝟘-𝟡}$
| Italic       | $\text{𝐴-𝑍 𝑎-𝑧}$      | Sans serif        | $\text{𝖠-𝖹 𝖺-𝗓 𝟢-𝟫}$
| Bold Italic  | $\text{𝑨-𝒁 𝒂-𝒛}$      | Sans serif bold   | $\text{𝗔-𝗭 𝗮-𝘇 𝟬-𝟵}$
| Calligraphic | $\text{𝒜-𝒵 𝒶-𝓏}$     | Sans serif italic | $\text{𝘈-𝘡 𝘢-𝘻}$
| Fractur      | $\text{𝔄-ℨ}\text{𝔞-𝔷}$| Monospace         | $\text{𝙰-𝚉 𝚊-𝚣 𝟶-𝟿}$

Any character can be written with the `\char` function and the Unicode code in hex. For example `\char"263a` will render as $\char"263a$.

## Layout

### Line Breaks

Temml will insert automatic soft line breaks in inline math after top-level relations or binary operators such as “=” or “+”. These can be suppressed by `\nobreak` or by placing math inside a pair of braces, as in `{F=ma}`. `\allowbreak` will allow soft line breaks at locations other than relations or operators.

Hard line breaks are `\\` and `\newline`. Temml math can contain a hard line break or an automatic soft line break, but not both.

In display math, Temml does not insert automatic soft line breaks. 

### Vertical Layout

||||
|:------------|:-----------------------------------|:-----
|$x_n$ `x_n`  |$\stackrel{!}{=}$ `\stackrel{!}{=}` | $a\raisebox{0.25em}{b}c$ `a\raisebox{0.25em}{b}c`
|$e^x$ `e^x`  |$\overset{!}{=}$ `\overset{!}{=}`   | $M\raise3pt{M^2}M$ `M\raise3pt{M^2}M`
|$_u^o$ `_u^o`| $\underset{!}{=}$ `\underset{!}{=}`| $M\lower3pt{M^2}M$ `M\lower3pt{M^2}M`
|             |$a \atop b$ `a \atop b`|

|||
|:--------------|:----------------------------------------|
|$$\sum_{\substack{0<i<m\\0<j<n}}$$ | `\sum_{\substack{0<i<m\\0<j<n}}` |

The second argument of `\raisebox` is set to text mode, but it can contain math if the math is nested within `$…$` delimiters, as in `\raisebox{0.25em}{$\frac a b$}`

### Overlap and Spacing

|||
|:-------|:-------|
|${=}\mathllap{/\,}$ `{=}\mathllap{/\,}` | $\left(x^{\smash{2}}\right)$ `\left(x^{\smash{2}}\right)`
|$\mathrlap{\,/}{=}$ `\mathrlap{\,/}{=}` | $\sqrt{\smash[b]{y}}$ `\sqrt{\smash[b]{y}} `

|||
|:-------|:-------|
|$$\displaystyle\sum_{\mathclap{1\le i\le j\le n}} x_{ij}$$ | `\sum_{\mathclap{1\le i\le j\le n}} x_{ij}`

Temml also supports `\llap`, `\rlap`, and `\clap`, but they will take only text, not math, as arguments.

**Spacing**

| Function        | Produces           | Function             | Produces|
|:----------------|:-------------------|:---------------------|:--------------------------------------|
| `\,`            | ³∕₁₈ em space      | `\kern{distance}`    | space, width = *distance*
| `\thinspace`    | ³∕₁₈ em space      | `\mkern{distance}`   | space, width = *distance*
| `\>`            | ⁴∕₁₈ em space      | `\mskip{distance}`   | space, width = *distance*
| `\:`            | ⁴∕₁₈ em space      | `\hskip{distance}`   | space, width = *distance*
| `\medspace`     | ⁴∕₁₈ em space      | `\hspace{distance}`  | space, width = *distance*
| `\;`            | ⁵∕₁₈ em space      | `\hspace*{distance}` | space, width = *distance*
| `\thickspace`   | ⁵∕₁₈ em space      | `\phantom{content}`  | space the width and height of content
| `\enspace`      | ½ em space         | `\hphantom{content}` | space the width of content
| `\quad`         | 1 em space         | `\vphantom{content}` | a strut the height of content
| `\qquad`        | 2 em space         | `\!`                 | – ³∕₁₈ em space
| `~`             | non-breaking space | `\negthinspace`      | – ³∕₁₈ em space
| `\<space>`      | space              | `\negmedspace`       | – ⁴∕₁₈ em space
| `\nobreakspace` | non-breaking space | `\negthickspace`     | – ⁵∕₁₈ em space
| `\space`        | space              |

**Notes:**

`distance` will accept any of the [Temml units](#units).

`\kern`, `\mkern`, `\mskip`, and `\hspace` accept unbraced distances, as in: `\kern1em`.

`\mkern` and `\mskip` will not work in text mode and both will write a console warning for any unit except `mu`.

## Logic and Set Theory

|||||
|:----------------------|:----------------------------|:--------------------------|:------------------------|
| $\forall$ `\forall`   | $\complement$ `\complement` | $\therefore$ `\therefore` | $\emptyset$ `\emptyset` |
| $\exists$ `\exists`   | $\subset$ `\subset`         | $\because$ `\because`     | $\varnothing$ `\varnothing` |
| $\nexists$ `\nexists` | $\supset$ `\supset`         | $\mapsto$ `\mapsto`       | $\implies$ `\implies` |
| $\in$ `\in`           | $\mid$ `\mid`               | $\to$ `\to`               | $\impliedby$ `\impliedby` |
| $\ni$ `\ni`           | $\land$ `\land`             | $\gets$ `\gets`           | $\iff$ `\iff` |
| $\notin$ `\notin`     | $\lor$ `\lor`     | $\leftrightarrow$ `\leftrightarrow` | $\lightning$ `\lightning` |
| $\notni$ `\notni`     | $\neg$ `\neg` or `\lnot`    | | |

Equivalents in the *texvc* extension

|||||
|:------------------|:----------------|:------------------|:--------------|
| $\exist$ `\exist` | $\isin$ `\isin` | $\empty$ `\empty` | $\sub$ `\sub` |

Direct Input: <span class="direct">∀ ∴ ∁ ∵ ∃ ∣ ∈ ∉ ∋ ⊂ ⊃ ∧ ∨ ↦ → ← ↔ ∅ ⟹ ⟺ ¬ ↯ ℂ ℍ ℕ ℙ ℚ ℝ</span>

## Macros

|||
|:-------------------------------------|:------
|$\def\foo{x^2} \foo + \foo$           | `\def\foo{x^2} \foo + \foo`
|$\gdef\bar#1{#1^2} \bar{y} + \bar{y}$ | `\gdef\bar#1{#1^2} \bar{y} + \bar{y}`
|                                      | `\edef\macroname#1#2…{definition to be expanded}`
|                                      | `\xdef\macroname#1#2…{definition to be expanded}`
|                                      | `\let\foo=\bar`
|                                      | `\futurelet\foo\bar x`
|                                      | `\global\def\macroname#1#2…{definition}`
|                                      | `\newcommand\macroname[numargs]{definition}`
|                                      | `\renewcommand\macroname[numargs]{definition}`
|                                      | `\providecommand\macroname[numargs]{definition}`

Macros can also be defined in the Temml [rendering options](options.md).

Macros accept up to nine arguments: #1, #2, etc.

<div id="gdef"></div>

Macros defined by `\gdef`, `\xdef`, `\global\def`, `\global\edef`, `\global\let`, and `\global\futurelet` will persist between math expressions. (Exception: macro persistence may be disabled. There are legitimate security reasons for that.)

Temml has no `\par`, so all macros are long by default and `\long` will be ignored.

Available functions include:

`\char` `\mathchoice` `\TextOrMath` `\@ifstar` `\@ifnextchar` `\@firstoftwo` `\@secondoftwo` `\relax` `\expandafter` `\noexpand`

@ is a valid character for commands, as if `\makeatletter` were in effect.

## Operators

### Big Operators

|||||
|---------------------|-------------------------|--------------------------|--------------|
| $\sum$ `\sum`       | $\prod$ `\prod`         | $\bigotimes$ `\bigotimes`| $\bigvee$ `\bigvee`
| $\int$ `\int`       | $\coprod$ `\coprod`     | $\bigoplus$ `\bigoplus`  | $\bigwedge$ `\bigwedge`
| $\iint$ `\iint`     | $\intop$ `\intop`       | $\bigodot$ `\bigodot`    | $\bigcap$ `\bigcap`
| $\iiint$ `\iiint`   | $\smallint$ `\smallint` | $\biguplus$ `\biguplus`  | $\bigcup$ `\bigcup`
| $\iiiint$ `\iiiint` | $\intcap$ `\intcap`     | $\intcup$ `\intcup`      | $\bigsqcup$ `\bigsqcup`
| $\oint$ `\oint`     | $\varointclockwise$ `\varointclockwise` | $\intclockwise$ `\intclockwise`| $\bigsqcap$ `\bigsqcap`
| $\oiint$ `\oiint`| $\pointint$ `\pointint` | $\rppolint$ `\rppolint` | $\scpolint$ `\scpolint`
| $\oiiint$ `\oiiint` | $\intlarhk$ `\intlarhk` | $\sqint$ `\sqint` | $\intx$ `\intx`
| $\intbar$ `\intbar` | $\intBar$ `\intBar`     | $\fint$ `\fint`  | $\sideset{_a^b}{_c^d}\sum$ `\sideset{_a^b}{_c^d}\sum`

Direct Input: <span class="direct">∫ ∬ ∭ ⨌ ∮ ∯ ∰ ⨖ ∲ ∏ ∐ ∑ ⋀ ⋁ ⋂ ⋃ ⨀ ⨁ ⨂ ⨄ ⨆ ⨅</span>

### Binary Operators

|||||
|-------------------|--------------------------|----------------------|--------------------|
| $+$ `+`           | $\cdot$ `\cdot`          | $\gtrdot$ `\gtrdot`  | $x \pmod a$ `x \pmod a`
| $-$ `-`           | $\cdotp$ `\cdotp`        | $\intercal$ `\intercal`| $x \pod a$ `x \pod a`
| $/$ `/`           | $\centerdot$ `\centerdot`| $\land$ `\land`      | $\rhd$ `\rhd`
| $*$ `*`           | $\circ$ `\circ`  | $\leftthreetimes$ `\leftthreetimes` | $\rightthreetimes$ `\rightthreetimes`
| $\amalg$ `\amalg` | $\circledast$ `\circledast`  | $\ldotp$ `\ldotp`| $\rtimes$ `\rtimes`
| $\And$ `\And`     | $\circledcirc$ `\circledcirc` | $\lor$ `\lor`   | $\setminus$ `\setminus`
| $\ast$ `\ast`     | $\circleddash$ `\circleddash` | $\lessdot$ `\lessdot`  | $\smallsetminus$ `\smallsetminus`
| $\barwedge$ `\barwedge`| $\Cup$ `\Cup`        | $\lhd$ `\lhd`       | $\sqcap$ `\sqcap`
| $\bigcirc$ `\bigcirc`| $\cup$ `\cup`          | $\ltimes$ `\ltimes` | $\sqcup$ `\sqcup`
| $\bmod$ `\bmod`   | $\curlyvee$ `\curlyvee`   | $x \mod a$ `x\mod a`| $\times$ `\times`
| $\boxdot$ `\boxdot`| $\curlywedge$ `\curlywedge`| $\mp$ `\mp`       | $\unlhd$ `\unlhd`
| $\boxminus$ `\boxminus`| $\div$ `\div`        | $\odot$ `\odot`     | $\unrhd$ `\unrhd`
| $\boxplus$ `\boxplus`| $\divideontimes$ `\divideontimes` | $\ominus$ `\ominus`| $\uplus$ `\uplus`
| $\boxtimes$ `\boxtimes`| $\dotplus$ `\dotplus`| $\oplus$ `\oplus`   | $\vee$ `\vee`
| $\bullet$ `\bullet`| $\doublebarwedge$ `\doublebarwedge`| $\otimes$ `\otimes`| $\veebar$ `\veebar`
| $\Cap$ `\Cap`      | $\doublecap$ `\doublecap`| $\oslash$ `\oslash` | $\wedge$ `\wedge`
| $\cap$ `\cap`      | $\doublecup$ `\doublecup`| $\pm$ `\pm`         | $\wr$ `\wr`

The *texvc* extension provides $\plusmn$ `\plusmn`.

Direct Input: <span class="direct">+ - / * ⋅ ± × ÷ ∓ ∔ ∧ ∨ ∩ ∪ ≀ ⊎ ⊓ ⊔ ⊕ ⊖ ⊗ ⊘ ⊙ ⊚ ⊛ ⊝ ◯</span>

### Fractions and Binomials

||||
|:--------------------------|:----------------------------|:-----
|$\frac{a}{b}$ `\frac{a}{b}`|$\tfrac{a}{b}$ `\tfrac{a}{b}`|$\genfrac ( ] {2pt}{1}a{a+1}$ `\genfrac ( ] {2pt}{1}a{a+1}`
|${a \over b}$ `{a \over b}`|$\dfrac{a}{b}$ `\dfrac{a}{b}`|${a \above{2pt} b+1}$ `{a \above{2pt} b+1}`
|$a/b$ `a/b`                |  |$\cfrac{a}{1 + \cfrac{1}{b}}$ `\cfrac{a}{1 + \cfrac{1}{b}}`

||||
|:------------------------------|:------------------------------|:--------
|$\binom{n}{k}$ `\binom{n}{k}`  |$\dbinom{n}{k}$ `\dbinom{n}{k}`|${n\brace k}$ `{n\brace k}`
|${n \choose k}$ `{n \choose k}`|$\tbinom{n}{k}$ `\tbinom{n}{k}`|${n\brack k}$ `{n\brack k}`

### Math Operators

|||||
|:----------------------------------------|:----------------------|:----------------------|:----------------------------|
| $\operatorname{f}$ `\operatorname{f}`   | $\partial$ `\partial` | $\nabla$ `\nabla`     |                             |
| $\arcsin$ `\arcsin`                     | $\cosec$ `\cosec`     | $\deg$ `\deg`         | $\sec$ `\sec`               |
| $\arccos$ `\arccos`                     | $\cosh$ `\cosh`       | $\dim$ `\dim`         | $\sin$ `\sin`               |
| $\arctan$ `\arctan`                     | $\cot$ `\cot`         | $\exp$ `\exp`         | $\sinh$ `\sinh`             |
| $\arctg$ `\arctg`                       | $\cotg$ `\cotg`       | $\hom$ `\hom`         | $\sh$ `\sh`                 |
| $\arcctg$ `\arcctg`                     | $\coth$ `\coth`       | $\ker$ `\ker`         | $\tan$ `\tan`               |
| $\arg$ `\arg`                           | $\csc$ `\csc`         | $\lg$ `\lg`           | $\tanh$ `\tanh`             |
| $\ch$ `\ch`                             | $\ctg$ `\ctg`         | $\ln$ `\ln`           | $\tg$ `\tg`                 |
| $\cos$ `\cos`                           | $\cth$ `\cth`         | $\log$ `\log`         | $\th$ `\th`                 |
| $\operatorname*{f}$ `\operatorname*{f}` | $\inf$ `\inf`         | $\max$ `\max`         | $\sup$ `\sup`               |
| $\argmax$ `\argmax`                     | $\injlim$ `\injlim`   | $\min$ `\min`         | $\varinjlim$ `\varinjlim`   |
| $\argmin$ `\argmin`                     | $\lim$ `\lim`         | $\plim$ `\plim`       | $\varliminf$ `\varliminf`   |
| $\det$ `\det`                           | $\liminf$ `\liminf`   | $\Pr$ `\Pr`           | $\varlimsup$ `\varlimsup`   |
| $\gcd$ `\gcd`                           | $\limsup$ `\limsup`   | $\projlim$ `\projlim` | $\varprojlim$ `\varprojlim` |

Functions in the bottom five rows of this table can take `\limits`.

### Enclosing Operators

|||
|:----------------------------|:------------------
| $\sqrt{x}$ `\sqrt{x}`       | $\longdiv{3x^2 + 2x + 5}$ `\longdiv{3x^2 + 2x + 5}`
| $\sqrt[3]{x}$ `\sqrt[3]{x}` | $\phase{-78^\circ}$ `\phase{-78^\circ}` 
| $a_{\angl n}$ &nbsp;&nbsp;`a_{\angl n}` | $a_\angln$ &nbsp;&nbsp;`a_\angln`

## Physics and Chemistry

|||
|:-------------------------|:--------------------------------------------
|$\bra{\phi}$ `\bra{\phi}` | $\prescript{a}{2}{\mathbf{C}}^{5+}_{2}$ `\prescript{a}{2}{\mathbf{C}}^{5+}_{2}`
|$\ket{\psi}$ `\ket{\psi}` | $\braket{\phi\vert\psi}$ `\braket{\phi\vert\psi}` 
|$\Bra{\phi}$ `\Bra{\phi}` | $\Ket{\psi}$ `\Ket{\psi}`

From the *mhchem* extension:

|||
|:--------------------------------|:---------------------------------|
|$\ce{SO4^2- + Ba^2+ -> BaSO4 v}$ | `\ce{SO4^2- + Ba^2+ -> BaSO4 v}` |
|$\pu{75.3 J // mol K}$           | `\pu{75.3 J // mol K}`           |

<details>
<summary>Click to see more of the <em>mhchem</em> extension.</summary>

## Chemical Equations (ce)

$\ce{CO2 + C -> 2 CO}$ `\ce{CO2 + C -> 2 CO}`

$\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$<br>
`\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}`

$C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$<br>
`C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}`

## Chemical Formulae

$\ce{H2O}$ `\ce{H2O}`

$\ce{Sb2O3}$ `\ce{Sb2O3}`

## Charges

$\ce{H+}$ `\ce{H+}`

$\ce{CrO4^2-}$ `\ce{CrO4^2-}`

$\ce{[AgCl2]-}$ `\ce{[AgCl2]-}`

$\ce{Y^99+}$ `\ce{Y^99+}`

$\ce{Y^{99+}}$ `\ce{Y^{99+}}`

## Stoichiometric Numbers

$\ce{2 H2O}$ `\ce{2 H2O}`

$\ce{2H2O}$ `\ce{2H2O}`

$\ce{0.5 H2O}$ `\ce{0.5 H2O}`

$\ce{1/2 H2O}$ `\ce{1/2 H2O}`

$\ce{(1/2) H2O}$ `\ce{(1/2) H2O}` % IUPAC Green Book

$\ce{ $n $ H2O}$ `\ce{ $n $ H2O}`

## Isotopes

$\ce{^{227}_{90}Th+}$ `\ce{^{227}_{90}Th+}`

$\ce{^227_90Th+}$ `\ce{^227_90Th+}`

$\ce{^{0}_{-1}n^{-}}$ `\ce{^{0}_{-1}n^{-}}`

$\ce{^0_-1n-}$ `\ce{^0_-1n-}`

It might be ambiguous whether a superscript belongs to the left or right element. There is automatic detection (digits only = mass number = belongs to right side), but to make sure you can type `{}` as a separator.

$\ce{H{}^3HO}$ `\ce{H{}^3HO}`

$\ce{H^3HO}$ `\ce{H^3HO}`

## Reaction Arrows

$\ce{A -> B}$ `\ce{A -> B}`

$\ce{A <- B}$ `\ce{A <- B}`

$\ce{A <-> B}$ `\ce{A <-> B}` % not to be used according to IUPAC and ACS

$\ce{A <--> B}$ `\ce{A <--> B}`

$\ce{A <=> B}$ `\ce{A <=> B}`

$\ce{A <=>> B}$ `\ce{A <=>> B}`

$\ce{A <<=> B}$ `\ce{A <<=> B}`

Each arrow can take two optional arguments: one for above and one for below. The arrow arguments use the same input syntax as the `\ce` command.

$\ce{A ->[H2O] B}$ `\ce{A ->[H2O] B}` % chemistry

$\ce{A ->[{text above}][{text below}] B}$ `\ce{A ->[{text above}][{text below}] B}` % upright text, see below

$\ce{A ->[ $x $][ $x_i $ ] B}$ `\ce{A ->[$x$][$x_i$] B}` % italic math, see below

## Parentheses, Brackets, Braces

Use parentheses `( )` and brackets `[ ]` normally. Write braces as `\{ \}`.

$\ce{(NH4)2S}$ `\ce{(NH4)2S}`

$\ce{[\{(X2)3\}2]^3+}$ `\ce{[\{(X2)3\}2]^3+}`

For large parentheses, `\left` and `\right` macros need to be in the same math environment, so you might have to put `\ce` into `$` into `\ce`, but that's fine.

$\ce{CH4 + 2  $\left( \ce{O2 + 79/21 N2} \right) $}$ `\ce{CH4 + 2 $\left( \ce{O2 + 79/21 N2} \right)$}`

## States of Aggregation

$\ce{H2(aq)}$ `\ce{H2(aq)}` % IUPAC recommendation

$\ce{CO3^2-_{(aq)}}$ `\ce{CO3^2-_{(aq)}}` % not IUPAC-conform, not ACS-conform

$\ce{NaOH(aq, $\infty $)}$ `\ce{NaOH(aq,$\infty$)}`

## Crystal Systems

$\ce{ZnS( $c $)}$ `\ce{ZnS($c$)}`

$\ce{ZnS(\ca $c $)}$ `\ce{ZnS(\ca$c$)}` % Circa, tilde

## Variables like __*x*, *n*, 2*n*+1__

Typographical conventions say that variables are typeset in an italic font, while other entities (like chemical elements) are typeset in an upright font. mhchem tries to recognize common patterns and use the correct (italic) font, like the *x* and *n* in the following examples.

$\ce{NO_x}$ `\ce{NO_x}`

$\ce{Fe^n+}$ `\ce{Fe^n+}`

$\ce{x Na(NH4)HPO4 ->[\Delta] (NaPO3)_x + x NH3 ^ + x H2O}$ `\ce{x Na(NH4)HPO4 ->[\Delta] (NaPO3)_x + x NH3 ^ + x H2O}`

If a more complex term is not properly recognized, you can switch to math mode (= italics) explicitly.

## Greek Characters

Just write `\alpha` etc. Temml supports upright lower-case Greek characters.

$\ce{\mu-Cl}$ `\ce{\mu-Cl}`

$\ce{[Pt(\eta^2-C2H4)Cl3]-}$ `\ce{[Pt(\eta^2-C2H4)Cl3]-}`

Spaces after a greek character are ignored. This is standard TeX behavior. Insert `{}` to get the desired output.

$\ce{\beta +}$ `\ce{\beta +}`

$\ce{^40_18Ar + \gamma{} + \nu_e}$ `\ce{^40_18Ar + \gamma{} + \nu_e}`

## (Italic) Math

By using `$...$` you can escape to math mode.

$\ce{NaOH(aq, $\infty $)}$ `\ce{NaOH(aq,$\infty$)}`

$\ce{Fe(CN)_{{$\frac{6}{2}$}}}$ `\ce{Fe(CN)_{$\frac{6}{2}$}}`

$\ce{X_{$i$}^{$x$}}$ `\ce{X_{$i$}^{$x$}}`

$\ce{X_{$i$}^{$x$}}$ `\ce{X_$i$^$x$}`

## Italic Text

With the same mechanism you can mimic an italic text font.

$\ce{ $cis ${-}[PtCl2(NH3)2]}$ `\ce{$cis${-}[PtCl2(NH3)2]}`

$\ce{CuS( $hP12 $)}$ `\ce{CuS($hP12$)}` % Pearson Symbol

Spaces will be ignored. Use a `~` when you need to typeset a space.

## Upright Text, Escape Parsing

Enclose upright text with `{...}`.

$\ce{{Gluconic Acid} + H2O2}$ `\ce{{Gluconic Acid} + H2O2}`

$\ce{X_{{red}}}$ `\ce{X_{{red}}}`

With the same mechanism, you can escape parsing, for instance if you need a simple hyphen (that should not become a bond).

$\ce{{(+)}_589{-}[Co(en)3]Cl3}$ `\ce{{(+)}_589{-}[Co(en)3]Cl3}`

## Bonds

$\ce{C6H5-CHO}$ `\ce{C6H5-CHO}`

$\ce{A-B=C#D}$ `\ce{A-B=C#D}`

mhchem tries to differentiate whether `\ce{-}` should be a bond, a charge or a hyphen.

$\ce{A\bond{-}B\bond{=}C\bond{#}D}$ `\ce{A\bond{-}B\bond{=}C\bond{#}D}`

$\ce{A\bond{1}B\bond{2}C\bond{3}D}$ `\ce{A\bond{1}B\bond{2}C\bond{3}D}`

$\ce{A\bond{~}B\bond{~-}C}$ `\ce{A\bond{~}B\bond{~-}C}`

$\ce{A\bond{~--}B\bond{~=}C\bond{-~-}D}$ `\ce{A\bond{~--}B\bond{~=}C\bond{-~-}D}`

$\ce{A\bond{...}B\bond{....}C}$ `\ce{A\bond{...}B\bond{....}C}`

$\ce{A\bond{->}B\bond{<-}C}$ `\ce{A\bond{->}B\bond{<-}C}`

## Addition Compounds

$\ce{KCr(SO4)2*12H2O}$ `\ce{KCr(SO4)2*12H2O}`

$\ce{KCr(SO4)2.12H2O}$ `\ce{KCr(SO4)2.12H2O}`

$\ce{KCr(SO4)2 * 12 H2O}$ `\ce{KCr(SO4)2 * 12 H2O}`

## Oxidation States

$\ce{Fe^{II}Fe^{III}2O4}$ `\ce{Fe^{II}Fe^{III}2O4}`

## Unpaired Electrons, Radical Dots

$\ce{OCO^{.-}}$ `\ce{OCO^{.-}}`

$\ce{NO^{(2.)-}}$ `\ce{NO^{(2.)-}}`

## Kr&ouml;ger-Vink Notation

$\ce{Li^x_{Li,1-2x}Mg^._{Li,x} $V $'_{Li,x}Cl^x_{Cl}}$ `\ce{Li^x_{Li,1-2x}Mg^._{Li,x}$V$'_{Li,x}Cl^x_{Cl}}`

$\ce{O''_{i,x}}$ `\ce{O''_{i,x}}`

$\ce{M^{..}_i}$ `\ce{M^{..}_i}`

$\ce{ $V $^{4'}_{Ti}}$ `\ce{$V$^{4'}_{Ti}}`

$\ce{V_{V,1}C_{C,0.8} $V $_{C,0.2}}$ `\ce{V_{V,1}C_{C,0.8}$V$_{C,0.2}}` % upright V = Vanadium, italic V = vacancy

## Equation Operators

$\ce{A + B}$ `\ce{A + B}`

$\ce{A - B}$ `\ce{A - B}` % not to be confused with bonds

$\ce{A = B}$ `\ce{A = B}` % not to be confused with bonds

$\ce{A \pm B}$ `\ce{A \pm B}`

## Precipitate and Gas

$\ce{SO4^2- + Ba^2+ -> BaSO4 v}$ `\ce{SO4^2- + Ba^2+ -> BaSO4 v}`

$\ce{A v B (v) -> B ^ B (^)}$ `\ce{A v B (v) -> B ^ B (^)}`

## Other Symbols and Shortcuts

$\ce{NO^*}$ `\ce{NO^*}` % Excited state

$\ce{1s^2-N}$ `\ce{1s^2-N}` % Orbitals

$\ce{n-Pr}$ `\ce{n-Pr}`

$\ce{iPr}$ `\ce{iPr}`

$\ce{\ca Fe}$ `\ce{\ca Fe}`

$\ce{A, B, C; F}$ `\ce{A, B, C; F}` % Punctuation

$\ce{{and others}}$ `\ce{{and others}}`

## Complex Examples

$\ce{Zn^2+  <=>[+ 2OH-][+ 2H+] $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}} $  <=>[+ 2OH-][+ 2H+]  {$\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}}$<br>
`\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]  $\underset{\text{amphoteres Hydroxid}}{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]  $\underset{\text{Hydroxozikat}}{\ce{[Zn(OH)4]^2-}}$}`

$\ce{ $K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]} $}$<br>
`\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}{[\ce{Hg2^2+}]}$}`

$\ce{ $K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}} $}$<br>
`\ce{$K = \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}`

$\ce{Hg^2+ ->[I-] $\underset{\mathrm{red}}{\ce{HgI2}} $  ->[I-] $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}} $}$<br>
`\ce{Hg^2+ ->[I-]  $\underset{\mathrm{red}}{\ce{HgI2}}$  ->[I-]  $\underset{\mathrm{red}}{\ce{[Hg^{II}I4]^2-}}$}`

<a name="pu"></a>

## Physical Units (pu)

$\pu{123 kJ}$ `\pu{123 kJ}`

$\pu{123 mm2}$ `\pu{123 mm2}`

There are two conventions regarding the multiplication within units.

$\pu{123 J s}$ `\pu{123 J s}`

$\pu{123 J*s}$ `\pu{123 J*s}`

There are four conventions regarding divisions.

$\pu{123 kJ/mol}$ `\pu{123 kJ/mol}`

$\pu{123 kJ//mol}$ `\pu{123 kJ//mol}`

$\pu{123 kJ mol-1}$ `\pu{123 kJ mol-1}`

$\pu{123 kJ*mol-1}$ `\pu{123 kJ*mol-1}`

There are four main conventions for writing numbers in scientific notation.

$\pu{1.2e3 kJ}$ `\pu{1.2e3 kJ}`

$\pu{1,2e3 kJ}$ `\pu{1,2e3 kJ}`

$\pu{1.2E3 kJ}$ `\pu{1.2E3 kJ}`

$\pu{1,2E3 kJ}$ `\pu{1,2E3 kJ}`

</details>

<br>

<details>
<summary>Click to see the <em>physics</em> extension.</summary>

||||
|:-----------------|:---------------|:------------------------------------------------------|
| $\abs{x}$ `\abs{x}` | $\innerproduct{a}{b}$ `\innerproduct{a}{b}` | $\qif$ `\qif` |
| $\absolutevalue{x}$ `\absolutevalue{x}` | $\ketbra{a}{b}$ `\ketbra{a}{b}` | $\qin$ `\qin` |
| $\acomm{A}{B}$ `\acomm{A}{B}` | $\laplacian$ `\laplacian` | $\qinteger$ `\qinteger` |
| $\anticommutator{A}{B}$ `\anticommutator{A}{B}` | $\matrixel{n}{A}{m}$ `\matrixel{n}{A}{m}` | $\qlet$ `\qlet` |
| $\Bqty{5 \text{mm}}$ `\Bqty{5 \text{mm}}` | $\matrixelement{n}{A}{m}$ `\matrixelement{n}{A}{m}` | $\qodd$ `\qodd` |
| $\bqty{5 \text{mm}}$ `\bqty{5 \text{mm}}` | $\mel{n}{A}{m}$ `\mel{n}{A}{m}` | $\qor$ `\qor` |
| $\comm{A}{B}$ `\comm{A}{B}` | $\norm{x}$ `\norm{x}` | $\qotherwise$ `\qotherwise` |
| $\commutator{A}{B}$ `\commutator{A}{B}` | $\op{a}{b}$ `\op{a}{b}` | $\qq{text}$ `\qq{text}` |
| $\cp$ `\cp` | $\order{x^2}$ `\order{x^2}` | $\qqtext{text}$ `\qqtext{text}` |
| $\cross$ `\cross` | $\outerproduct{a}{b}$ `\outerproduct{a}{b}` | $\qsince$ `\qsince` |
| $\crossproduct$ `\crossproduct` | $\partialderivative{x}{y}$ `\partialderivative{x}{y}` | $\qthen$ `\qthen` |
| $\curl$ `\curl` | $\pb{x}{y}$ `\pb{x}{y}` | $\qty{5 \text{m}}$ `\qty{5 \text{m}}` |
| $\dd$ `\dd` | $\pdv{x}{y}$ `\pdv{x}{y}` | $\quantity{5 \text{m}}$ `\quantity{5 \text{m}}` |
| $\derivative{x}{y}$ `\derivative{x}{y}` | $\poissonbracket{A}{B}$ `\poissonbracket{A}{B}` | $\qunless$ `\qunless` |
| $\differential$ `\differential` | $\pqty{5}$ `\pqty{5}` | $\qusing$ `\qusing` |
| $\divergence$ `\divergence` | $\principalvalue$ `\principalvalue` | $\rank M$ `\rank M` |
| $\dotproduct$ `\dotproduct` | $\pv$ `\pv` | $\Res[f(z)]$ `\Res\[f(z)\]` |
| $\dv{x}{y}$ `\dv{x}{y}` | $\PV(x)$ `\PV(x)` | $\Tr\rho$ `\Tr\rho` |
| $\dyad{a}{b}$ `\dyad{a}{b}` | $\qall$ `\qall` | $\tr\rho$ `\tr\rho` |
| $\erf(x)$ `\erf(x)` | $\qand$ `\qand` | $\va{a}$ `\va{a}` |
| $\ev{x}$ `\ev{x}` | $\qas$ `\qas` | $\var$ `\var` |
| $\eval{\tfrac 1 2 x}_0^n$ `\eval{\tfrac 1 2 x}_0^n` | $\qassume$ `\qassume` | $\variation$ `\variation` |
| $\evaluated{\tfrac 1 2 x}_0^n$ `\evaluated{\tfrac 1 2 x}_0^n` | $\qc$ `\qc` | $\vb{a}$ `\vb{a}` |
| $\expectationvalue{x}$ `\expectationvalue{x}` | $\qcc$ `\qcc` | $\vdot$ `\vdot` |
| $\expval{x}$ `\expval{x}` | $\qcomma$ `\qcomma` | $\vectorarrow{a}$ `\vectorarrow{a}` |
| $\fdv{x}{y}$ `\fdv{x}{y}` | $\qelse$ `\qelse` | $\vectorbold{a}$ `\vectorbold{a}` |
| $\functionalderivative{x}{y}$ `\functionalderivative{x}{y}` | $\qeven$ `\qeven` | $\vectorunit{a}$ `\vectorunit{a}` |
| $\grad$ `\grad` | $\qfor$ `\qfor` | $\vqty{x}$ `\vqty{x}` |
| $\gradient$ `\gradient` | $\qgiven$ `\qgiven` | $\vu{a}$ `\vu{a}` |

</details>

## Relations

$\stackrel{!}{=}\vphantom{\frac a b}$ `\stackrel{!}{=}`

|||||
|:--------|:-------------------------------------|:----------------------|:----------------------------|
| $=$ `=` | $\eqcolon$ `\eqcolon` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\minuscolon` | $\lessgtr$ `\lessgtr` | $\sqsupseteq$ `\sqsupseteq` |
| $<$ `<` | $\Eqcolon$ `\Eqcolon` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\minuscoloncolon` | $\lesssim$ `\lesssim` | $\stareq$ `\stareq` |
| $>$ `>` | $\eqqcolon$ `\eqqcolon` | $\ll$ `\ll` | $\Subset$ `\Subset` |
| $:$ `:` | $\Eqqcolon$ `\Eqqcolon` | $\lll$ `\lll` | $\subset$ `\subset` |
| $\approx$ `\approx` | $\eqdef$ `\eqdef` | $\llless$ `\llless` | $\subseteq$ `\subseteq` |
| $\approxeq$ `\approxeq` | $\eqsim$ `\eqsim` | $\lt$ `\lt` | $\subseteqq$ `\subseteqq` |
| $\arceq$ `\arceq` | $\eqslantgtr$ `\eqslantgtr` | $\measeq$ `\measeq` | $\succ$ `\succ` |
| $\asymp$ `\asymp` | $\eqslantless$ `\eqslantless` | $\mid$ `\mid` | $\succapprox$ `\succapprox` |
| $\backepsilon$ `\backepsilon` | $\equiv$ `\equiv` | $\models$ `\models` | $\succcurlyeq$ `\succcurlyeq` |
| $\backsim$ `\backsim` | $\fallingdotseq$ `\fallingdotseq` | $\multimap$ `\multimap` | $\succeq$ `\succeq` |
| $\backsimeq$ `\backsimeq` | $\frown$ `\frown` | $\owns$ `\owns` | $\succsim$ `\succsim` |
| $\between$ `\between` | $\ge$ `\ge` | $\parallel$ `\parallel` | $\Supset$ `\Supset` |
| $\bowtie$ `\bowtie` | $\geq$ `\geq` | $\perp$ `\perp` | $\supset$ `\supset` |
| $\bumpeq$ `\bumpeq` | $\geqq$ `\geqq` | $\pitchfork$ `\pitchfork` | $\supseteq$ `\supseteq` |
| $\Bumpeq$ `\Bumpeq` | $\geqslant$ `\geqslant` | $\prec$ `\prec` | $\supseteqq$ `\supseteqq` |
| $\circeq$ `\circeq` | $\gg$ `\gg` | $\precapprox$ `\precapprox` | $\thickapprox$ `\thickapprox` |
| $\colonapprox$ `\colonapprox` | $\ggg$ `\ggg` | $\preccurlyeq$ `\preccurlyeq` | $\thicksim$ `\thicksim` |
| $\Colonapprox$ `\Colonapprox` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\coloncolonapprox` | $\gggtr$ `\gggtr` | $\preceq$ `\preceq` | $\trianglelefteq$ `\trianglelefteq` |
| $\coloneq$ `\coloneq` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\colonminus` | $\gt$ `\gt` | $\precsim$ `\precsim` | $\triangleq$ `\triangleq` |
| $\Coloneq$ `\Coloneq` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\coloncolonminus` | $\gtrapprox$ `\gtrapprox` | $\propto$ `\propto` | $\trianglerighteq$ `\trianglerighteq` |
| $\coloneqq$ `\coloneqq` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\colonequals` | $\gtreqless$ `\gtreqless` | $\questeq$ `\questeq` | $\varpropto$ `\varpropto` |
| $\Coloneqq$ `\Coloneqq` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\coloncolonequals` | $\gtreqqless$ `\gtreqqless` | $\ratio$ `\ratio` or<br>&nbsp;&nbsp;&nbsp;`\vcentcolon` | $\vartriangle$ `\vartriangle` |
| $\colonsim$ `\colonsim` | $\gtrless$ `\gtrless` | $\risingdotseq$ `\risingdotseq` | $\vartriangleleft$ `\vartriangleleft` |
| $\Colonsim$ `\Colonsim` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\coloncolonsim` | $\gtrsim$ `\gtrsim` | $\shortmid$ `\shortmid` | $\vartriangleright$ `\vartriangleright` |
| $\cong$ `\cong` | $\in$ `\in` or `\isin` | $\shortparallel$ `\shortparallel` | $\vdash$ `\vdash` |
| $\curlyeqprec$ `\curlyeqprec` | $\Join$ `\Join` | $\sim$ `\sim` | $\vDash$ `\vDash` |
| $\curlyeqsucc$ `\curlyeqsucc` | $\le$ `\le` | $\simeq$ `\simeq` | $\Vdash$ `\Vdash` |
| $\dashv$ `\dashv` | $\leq$ `\leq` | $\smallfrown$ `\smallfrown` | $\Vvdash$ `\Vvdash` |
| $\dblcolon$ `\dblcolon` or<br>&nbsp;&nbsp;&nbsp;&nbsp;`\coloncolon` | $\leqq$ `\leqq` | $\smallsmile$ `\smallsmile` | $\veeeq$ `\veeeq` |
| $\doteq$ `\doteq` | $\leqslant$ `\leqslant` | $\smile$ `\smile` | $\wedgeq$ `\wedgeq` |
| $\Doteq$ `\Doteq` | $\lessapprox$ `\lessapprox` | $\sqsubset$ `\sqsubset` | |
| $\doteqdot$ `\doteqdot` | $\lesseqgtr$ `\lesseqgtr` | $\sqsubseteq$ `\sqsubseteq` | |
| $\eqcirc$ `\eqcirc` | $\lesseqqgtr$ `\lesseqqgtr` | $\sqsupset$ `\sqsupset` | |

The *texvc* extension provides $\sub$ `\sub`, $\sube$ `\sube`, and $\supe$ `\supe`.

Direct Input: <span class="direct">= < > : ∈ ∋ ∝ ∼ ∽ ≂ ≃ ≅ ≈ ≊ ≍ ≎ ≏ ≐ ≑ ≒ ≓ ≖ ≗ ≜ ≡ ≤ ≥ ≦ ≧ ≫ ≬ ≳ ≷ ≺ ≻ ≼ ≽ ≾ ≿ ⊂ ⊃ ⊆ ⊇ ⊏ ⊐ ⊑ ⊒ ⊢ ⊣ ⊩ ⊪ ⊸ ⋈ ⋍ ⋐ ⋑ ⋔ ⋙ ⋛ ⋞ ⋟ ⌢ ⌣ ⩾ ⪆ ⪌ ⪕ ⪖ ⪯ ⪰ ⪷ ⪸ ⫅ ⫆ ≲ ⩽ ⪅ ≶ ⋚ ⪋ ⟂ ⊨ ≔ ≕ ⩴</span>

### Negated Relations

$\not =$ `\not =`

|||||
|------------------|-------------------|---------------------|------------------|
| $\gnapprox$ `\gnapprox`| $\ngeqslant$ `\ngeqslant`| $\nsubseteq$ `\nsubseteq`  | $\precneqq$ `\precneqq`|
| $\gneq$ `\gneq`  | $\ngtr$ `\ngtr`  | $\nsubseteqq$ `\nsubseteqq` | $\precnsim$ `\precnsim`|
| $\gneqq$ `\gneqq`| $\nleq$ `\nleq`  | $\nsucc$ `\nsucc`| $\subsetneq$ `\subsetneq`  |
| $\gnsim$ `\gnsim`| $\nleqq$ `\nleqq` | $\nsucceq$ `\nsucceq` | $\subsetneqq$ `\subsetneqq` |
| $\gvertneqq$ `\gvertneqq` | $\nleqslant$ `\nleqslant`| $\nsupseteq$ `\nsupseteq`  | $\succnapprox$ `\succnapprox`|
| $\lnapprox$ `\lnapprox`  | $\nless$ `\nless` | $\nsupseteqq$ `\nsupseteqq` | $\succneqq$ `\succneqq`|
| $\lneq$ `\lneq`  | $\nmid$ `\nmid`  | $\ntriangleleft$ `\ntriangleleft` | $\succnsim$ `\succnsim`|
| $\lneqq$ `\lneqq` | $\notin$ `\notin` | $\ntrianglelefteq$ `\ntrianglelefteq`  | $\supsetneq$ `\supsetneq`  |
| $\lnsim$ `\lnsim`| $\notni$ `\notni` | $\ntriangleright$ `\ntriangleright`| $\supsetneqq$ `\supsetneqq` |
| $\lvertneqq$ `\lvertneqq` | $\nparallel$ `\nparallel`| $\ntrianglerighteq$ `\ntrianglerighteq` | $\varsubsetneq$ `\varsubsetneq`  |
| $\ncong$ `\ncong`| $\nprec$ `\nprec` | $\nvdash$ `\nvdash`  | $\varsubsetneqq$ `\varsubsetneqq` |
| $\ne$ `\ne`      | $\npreceq$ `\npreceq`  | $\nvDash$ `\nvDash`  | $\varsupsetneq$ `\varsupsetneq`  |
| $\neq$ `\neq`    | $\nshortmid$ `\nshortmid`| $\nVDash$ `\nVDash`  | $\varsupsetneqq$ `\varsupsetneqq` |
| $\ngeq$ `\ngeq`  | $\nshortparallel$ `\nshortparallel` | $\nVdash$ `\nVdash`  |
| $\ngeqq$ `\ngeqq`| $\nsim$ `\nsim`  | $\precnapprox$ `\precnapprox`|

Direct Input: <span class="direct">∉ ∌ ∤ ∦ ≁ ≆ ≠ ≨ ≩ ≮ ≯ ≰ ≱ ⊀ ⊁ ⊈ ⊉ ⊊ ⊋ ⊬ ⊭ ⊮ ⊯ ⋠ ⋡ ⋦ ⋧ ⋨ ⋩ ⋬ ⋭ ⪇ ⪈ ⪉ ⪊ ⪵ ⪶ ⪹ ⪺ ⫋ ⫌</span>

### Arrows

||||
|:-------------------|:---------------|:-------------------|
| $\circlearrowleft$ `\circlearrowleft` | $\Leftrightarrow$ `\\Leftrightarrow` | $\rightarrow$ `\rightarrow` |
| $\circlearrowright$ `\circlearrowright` | $\leftrightarrows$ `\leftrightarrows` | $\Rightarrow$ `\Rightarrow` |
| $\curvearrowleft$ `\curvearrowleft` | $\leftrightharpoons$ `\leftrightharpoons` | $\rightarrowtail$ `\rightarrowtail` |
| $\curvearrowright$ `\curvearrowright` | $\leftrightsquigarrow$ `\leftrightsquigarrow` | $\rightharpoondown$ `\rightharpoondown` |
| $\dashleftarrow$ `\dashleftarrow` | $\Lleftarrow$ `\Lleftarrow` | $\rightharpoonup$ `\rightharpoonup` |
| $\dashrightarrow$ `\dashrightarrow` | $\longleftarrow$ `\longleftarrow` | $\rightleftarrows$ `\rightleftarrows` |
| $\downarrow$ `\downarrow` | $\Longleftarrow$ `\Longleftarrow` | $\rightleftharpoons$ `\rightleftharpoons` |
| $\Downarrow$ `\Downarrow` | $\longleftrightarrow$ `\longleftrightarrow` | $\rightrightarrows$ `\rightrightarrows` |
| $\downdownarrows$ `\downdownarrows` | $\Longleftrightarrow$ `\Longleftrightarrow` | $\rightsquigarrow$ `\rightsquigarrow` |
| $\downharpoonleft$ `\downharpoonleft` | $\longmapsto$ `\longmapsto` | $\Rrightarrow$ `\Rrightarrow` |
| $\downharpoonright$ `\downharpoonright` | $\longrightarrow$ `\longrightarrow` | $\Rsh$ `\Rsh` |
| $\gets$ `\gets` | $\Longrightarrow$ `\Longrightarrow` | $\searrow$ `\searrow` |
| $\hookleftarrow$ `\hookleftarrow` | $\looparrowleft$ `\looparrowleft` | $\swarrow$ `\swarrow` |
| $\hookrightarrow$ `\hookrightarrow` | $\looparrowright$ `\looparrowright` | $\to$ `\to` |
| $\iff$ `\iff` | $\Lsh$ `\Lsh` | $\twoheadleftarrow$ `\twoheadleftarrow` |
| $\impliedby$ `\impliedby` | $\mapsto$ `\mapsto` | $\twoheadrightarrow$ `\twoheadrightarrow` |
| $\implies$ `\implies` | $\nearrow$ `\nearrow` | $\uparrow$ `\uparrow` |
| $\leadsto$ `\leadsto` | $\nleftarrow$ `\nleftarrow` | $\Uparrow$ `\Uparrow` |
| $\leftarrow$ `\leftarrow` | $\nLeftarrow$ `\nLeftarrow` | $\updownarrow$ `\updownarrow` |
| $\Leftarrow$ `\Leftarrow` | $\nleftrightarrow$ `\nleftrightarrow` | $\Updownarrow$ `\Updownarrow` |
| $\leftarrowtail$ `\leftarrowtail` | $\nLeftrightarrow$ `\nLeftrightarrow` | $\upharpoonleft$ `\upharpoonleft` |
| $\leftharpoondown$ `\leftharpoondown` | $\nrightarrow$ `\nrightarrow` | $\upharpoonright$ `\upharpoonright` |
| $\leftharpoonup$ `\leftharpoonup` | $\nRightarrow$ `\nRightarrow` | $\upuparrows$ `\upuparrows` |
| $\leftleftarrows$ `\leftleftarrows` | $\nwarrow$ `\nwarrow` | |
| $\leftrightarrow$ `\leftrightarrow` | $\restriction$ `\restriction` | |

Arrows in the *texvc* extension

|||||||
|:----------------|:----------------|:----------------|:------------------|:----------------|:----------------|
| $\Darr$ `\Darr` | $\Harr$ `\Harr` | $\Larr$ `\Larr` | $\Lrarr$ `\Lrarr` | $\Rarr$ `\Rarr` | $\Uarr$ `\Uarr` |
| $\dArr$ `\dArr` | $\hArr$ `\hArr` | $\lArr$ `\lArr` | $\lrArr$ `\lrArr` | $\rArr$ `\rArr` | $\uArr$ `\uArr` |
| $\darr$ `\darr` | $\harr$ `\harr` | $\larr$ `\larr` | $\lrarr$ `\lrarr` | $\rarr$ `\rarr` | $\uarr$ `\uarr` |

Direct Input: <span class="direct">← ↑ → ↓ ↔ ↕ ↖ ↗ ↘ ↙ ↚ ↛ ↞ ↠ ↢ ↣ ↦ ↩ ↪ ↫ ↬ ↭ ↮ ↰ ↱↶ ↷ ↺ ↻ ↼ ↽ ↾ ↾ ↿ ⇀ ⇁ ⇂ ⇃ ⇄ ⇆ ⇇ ⇈ ⇉ ⇊ ⇋ ⇌⇍ ⇎ ⇏ ⇐ ⇑ ⇒ ⇓ ⇔ ⇕ ⇚ ⇛ ⇝ ⇠ ⇢ ⟵ ⟶ ⟷ ⟸ ⟹ ⟺ ⟼ ↽</span>

### Extensible Arrows

$\newextarrow{\xArrOpen}{5,5}{0x21fe} \xArrOpen{Hello}$ `\newextarrow{\xArrOpen}{5,5}{0x21fe} \xArrOpen{Hello}`

|||
|:----------------------------------------------------|:-----
|$\xleftarrow{abc}$ `\xleftarrow{abc}`                |$\xrightarrow[under]{over}$ `\xrightarrow[under]{over}`
|$\xLeftarrow{abc}$ `\xLeftarrow{abc}`                |$\xRightarrow{abc}$ `\xRightarrow{abc}`
|$\xleftrightarrow{abc}$ `\xleftrightarrow{abc}`      |$\xLeftrightarrow{abc}$ `\xLeftrightarrow{abc}`
|$\xhookleftarrow{abc}$ `\xhookleftarrow{abc}`        |$\xhookrightarrow{abc}$ `\xhookrightarrow{abc}`
|$\xtwoheadleftarrow{abc}$ `\xtwoheadleftarrow{abc}`  |$\xtwoheadrightarrow{abc}$ `\xtwoheadrightarrow{abc}`
|$\xleftharpoonup{abc}$ `\xleftharpoonup{abc}`        |$\xrightharpoonup{abc}$ `\xrightharpoonup{abc}`
|$\xleftharpoondown{abc}$ `\xleftharpoondown{abc}`    |$\xrightharpoondown{abc}$ `\xrightharpoondown{abc}`
|$\xleftrightharpoons{abc}$ `\xleftrightharpoons{abc}`|$\xrightleftharpoons{abc}$ `\xrightleftharpoons{abc}`
|$\xtofrom{abc}$ `\xtofrom{abc}`                      |$\xmapsto{abc}$ `\xmapsto{abc}`
|$\xlongequal{abc}$ `\xlongequal{abc}`

All extensible arrows except `\newextarrow` can take an optional argument in the same manner as `\xrightarrow[under]{over}`.

## Style, Color, Size, and Font

**Class Assignment**

`\mathbin` `\mathclose` `\mathinner` `\mathop`<br>
`\mathopen` `\mathord` `\mathpunct` `\mathrel`

**Color**

|||
|:-----------------------------------------|--|
| $\color{blue} F=ma$  `\color{blue} F=ma` ||
| $\textcolor{blue}{F=ma}$ `\textcolor{blue}{F=ma}` ||
| $\textcolor{#228B22}{F=ma}$ `\textcolor{#228B22}{F=ma}` ||
| $\colorbox{aqua}{A}$ `\colorbox{aqua}{A}` ||
| $\fcolorbox{red}{aqua}{A}$ `\fcolorbox{red}{aqua}{A}` ||

For color definition, Temml color functions will accept the standard HTML [predefined color names](https://www.w3schools.com/colors/colors_names.asp). They will also accept an RGB argument in CSS hexa­decimal style. The "#" is optional before a six-digit specification.

**Font**

||||
|:--------------------------------|:--------------------------------|:-----
|$\mathrm{Ab0θ}$ `\mathrm{Ab0θ}`  |$\mathbf{Ab0θ}$ `\mathbf{Ab0θ}`  |$\mathit{Ab0θ}$ `\mathit{Ab0θ}`
|$\mathnormal{Ab0θ}$ `\mathnormal{Ab0θ}`|$\textbf{Ab0θ}$ `\textbf{Ab0θ}`|$\textit{Ab0θ}$ `\textit{Ab0θ}`
|$\textrm{Ab0θ}$ `\textrm{Ab0θ}`  |${\bf Ab0θ}$ `{\bf Ab0θ}`        |${\it Ab0θ}$ `{\it Ab0θ}`
|${\rm Ab0θ}$ `{\rm Ab0θ}`        |$\bold{Ab0θ}$ `\bold{Ab0θ}`      |$\textup{Ab0θ}$ `\textup{Ab0θ}`
|$\textnormal{Ab0θ}$ `\textnormal{Ab0θ}`|${\boldsymbol Ab0θ}$ `{\boldsymbol Ab0θ}`|$\Bbb{Ab0}$ `\Bbb{Ab0}`
|$\text{Ab0θ}$ `\text{Ab0θ}`      |$\bm{Ab0θ}$ `\bm{Ab0θ}`          |$\mathbb{Ab0}$ `\mathbb{Ab0}`
|$\mathsf{Ab0θ}$ `\mathsf{Ab0θ}`  |$\textmd{Ab0θ}$ `\textmd{Ab0θ}`  |$\frak{Ab}$ `\frak{Ab}`
|$\textsf{Ab0θ}$ `\textsf{Ab0θ}`  |$\mathtt{Ab0θ}$ `\mathtt{Ab0θ}`  |$\mathfrak{Ab}$ `\mathfrak{Ab}`
|${\sf Ab0θ}$ `{\sf Ab0θ}`        |$\texttt{Ab0θ}$ `\texttt{Ab0θ}`  |$\mathcal{Ab}$ `\mathcal{Ab}`
|$\textsc{hey}$ `\textsc{hey}`    |${\tt Ab0θ}$ `{\tt Ab0}`         |${\cal Ab}$ `{\cal Ab}`
|$\oldstylenums{123}$ `\oldstylenums{123}`|                         |$\mathscr{AB}$ `\mathscr{AB}`

One can stack font family, font weight, and font shape by using the `\textXX` versions of the font functions. So `\textsf{\textbf{H}}` will produce $\textsf{\textbf{H}}$. The other versions do not stack, e.g., `\mathsf{\mathbf{H}}` will produce $\mathsf{\mathbf{H}}$.

In cases where Temml fonts do not have a bold glyph, `\pmb` can simulate one. For example, `\pmb{\mu}` renders as : $\pmb{\mu}$

Currently, neither Unicode not MathML distinguish between calligraphic and script fonts.

**Font Size**

|||
|:----------------------|:-----
|$\Huge AB$ `\Huge AB`  |$\normalsize AB$ `\normalsize AB`
|$\huge AB$ `\huge AB`  |$\small AB$ `\small AB`
|$\LARGE AB$ `\LARGE AB`|$\footnotesize AB$ `\footnotesize AB`
|$\Large AB$ `\Large AB`|$\scriptsize AB$ `\scriptsize AB`
|$\large AB$ `\large AB`|$\Tiny AB$ `\Tiny AB`
|                       |$\tiny AB$ `\tiny AB`

**Style**

|||
|:----------------------------|:----------------------------|
| $\displaystyle\sum_{i=1}^n$ | `\displaystyle\sum_{i=1}^n` |
| $\textstyle\sum_{i=1}^n$    | `\textstyle\sum_{i=1}^n`    |
| $\scriptstyle x$            |`\scriptstyle x` &nbsp;&nbsp;&nbsp;(The size of a first sub/superscript) |
| $\scriptscriptstyle x$      | `\scriptscriptstyle x` (The size of subsequent sub/superscripts) |
| $\lim\limits_y x$           | `\lim\limits_y x`     |
| $\lim\nolimits_y x$         | `\lim\nolimits_y x` |
| $\verb!x^2!$                | `\verb!x^2!`           |
| $\text{ABcd }ABcd$          | `\text{ABcd $ABcd$}` |

`\text{…}` shifts its contents into text mode, but you can shift back into math mode by nesting `$…$`.

## Symbols and Punctuation

||||
|:------------|:----------------|:------------------|
| `% comment` | $\dots$ `\dots` | $\TeX$ `\TeX` |
| $\%$ `\%` | $\cdots$ `\cdots` | $\LaTeX$ `\LaTeX` |
| $\#$ `\#` | $\ddots$ `\ddots` | $\Temml$ `\Temml` |
| $\&$ `\&` | $\ldots$ `\ldots` | $\surd$ `\surd` |
| $\_$ `\_` | $\vdots$ `\vdots` | $\infty$ `\infty` |
| $\text{\textunderscore}$ `\text{\textunderscore}` | $\iddots$ `\iddots` | $\checkmark$ `\checkmark` |
| $\text{--}$ `\text{--}` | $\dotsb$ `\dotsb` | $\lightning$ `\lightning` |
| $\text{\textendash}$ `\text{\textendash}` | $\dotsc$ `\dotsc` | $\dag$ `\dag` |
| $\text{---}$ `\text{---}` | $\dotsi$ `\dotsi` | $\dagger$ `\dagger` |
| $\text{\textemdash}$ `\text{\textemdash}` | $\dotsm$ `\dotsm` | $\text{\textdagger}$ `\text{\textdagger}` |
| $\text{\textasciitilde}$ `\text{\textasciitilde}` | $\dotso$ `\dotso` | $\ddag$ `\ddag` |
| $\text{\textasciicircum}$ `\text{\textasciicircum}` | $\dotsi$ `\idotsin` | $\ddagger$ `\ddagger` |
| $`$ `` ` `` | $\mathellipsis$ `\mathellipsis` | $\text{\textdaggerdbl}$ `\text{\textdaggerdbl}` |
| $\text{\textquoteleft}$ `text{\textquoteleft}` | $\text{\textellipsis}$ `\text{\textellipsis}` | $\angle$ `\angle` |
| $\lq$ `\lq` | $\Box$ `\Box` | $\measuredangle$ `\measuredangle` |
| $\text{\textquoteright}$ `\text{\textquoteright}` | $\square$ `\square` | $\sphericalangle$ `\sphericalangle` |
| $\rq$ `\rq` | $\blacksquare$ `\blacksquare` | $\top$ `\top` |
| $\text{\textquotedblleft}$ `\text{\textquotedblleft}` | $\triangle$ `\triangle` | $\bot$ `\bot` |
| $"$ `"` | $\triangledown$ `\triangledown` | $\$$ `\$` |
| $\text{\textquotedblright}$ `\text{\textquotedblright}` | $\triangleleft$ `\triangleleft` | $\text{\textdollar}$ `\text{\textdollar}` |
| $\colon$ `\colon` | $\triangleright$ `\triangleright` | $\pounds$ `\pounds` |
| $\backprime$ `\backprime` | $\bigtriangledown$ `\bigtriangledown` | $\mathsterling$ `\mathsterling` |
| $\prime$ `\prime` | $\bigtriangleup$ `\bigtriangleup` | $\text{\textsterling}$ `\text{\textsterling}` |
| $\text{\textless}$ `\text{\textless}` | $\blacktriangle$ `\blacktriangle` | $\yen$ `\yen` |
| $\text{\textgreater}$ `\text{\textgreater}` | $\blacktriangledown$ `\blacktriangledown` | $\euro$ `\euro` |
| $\text{\textbar}$ `\text{\textbar}` | $\blacktriangleleft$ `\blacktriangleleft` | $\text{\texteuro}$ `\text{\texteuro}` |
| $\text{\textbardbl}$ `\text{\textbardbl}` | $\blacktriangleright$ `\blacktriangleright` | $\degree$ `\degree` |
| $\text{\textbraceleft}$ `\text{\textbraceleft}` | $\diamond$ `\diamond` | $\text{\textdegree}$ `\text{\textdegree}` |
| $\text{\textbraceright}$ `\text{\textbraceright}` | $\Diamond$ `\Diamond` | $\mho$ `\mho` |
| $\text{\textbackslash}$ `\text{\textbackslash}` | $\lozenge$ `\lozenge` | $\diagdown$ `\diagdown` |
| $\text{\textvisiblespace}$ `\text{\textvisiblespace}` | $\blacklozenge$ `\blacklozenge` | $\diagup$ `\diagup` |
| $\text{\P}$ `\text{\P}` or `\P` | $\star$ `\star` | $\flat$ `\flat` |
| $\text{\S}$ `\text{\S}` or `\S` | $\bigstar$ `\bigstar` | $\natural$ `\natural` |
| $\copyright$ `\copyright` | $\maltese$ `\maltese` | $\sharp$ `\sharp` |
| $\circledR$ `\circledR` | $\clubsuit$ `\clubsuit` | $\varclubsuit$ `\varclubsuit` |
| $\circledS$ `\circledS` | $\diamondsuit$ `\diamondsuit` | $\vardiamondsuit$ `\vardiamondsuit` |
| $\text{\textregistered}$ `\text{\textregistered}` | $\heartsuit$ `\heartsuit` | $\varheartsuit$ `\varheartsuit` |
| $\text{\textbullet}$ `\text{\textbullet}` | $\spadesuit$ `\spadesuit` | $\varspadesuit$ `\varspadesuit` |
| $\smiley$ `\smiley` | $\standardstate$ `\standardstate` | |

Symbols in the *texvc* extension

||||
|:------------------------|:------------------------------|:--------------------|
| $\clubs$ `\clubs`       | $\hearts$ `\hearts`           | $\sdot$ `\sdot`     |
| $\diamonds$ `\diamonds` | $\spades$ `\spades`           | $\infin$ `\infin`   |
| $\bull$ `\bull`         | $\text{\sect}$ `\text{\sect}` | $\Dagger$ `\Dagger` |

Direct Input: <span class="direct">£ ¥ ∇ ∞ · ∠ ∡ ∢ ♠ ♡ ♢ ♣ ♭ ♮ ♯ ✓ …  ⋮  ⋯  ⋱  ! ‼</span>

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

|  Unit  |     textstyle<br>normal size     | scriptscript         |       huge            |
|:------:|:-----------------:|:-----------------------------------:|:---------------------:|
|em or ex|$\rule{1em}{1em}$  |$\scriptscriptstyle\rule{1em}{1em}$  |$\huge\rule{1em}{1em}$
| mu     |$\rule{18mu}{18mu}$|$\scriptscriptstyle\rule{18mu}{18mu}$|$\huge\rule{18mu}{18mu}$
| others |$\rule{16pt}{16pt}$|$\scriptscriptstyle\rule{16pt}{16pt}$|$\huge\rule{16pt}{16pt}$

`em` and `ex` are affected by font size changes such as `\Large`, but they are not affected
by script level, so they will not change size in a fraction numerator or an
exponent. 

`mu` is affected by both script level and font size.

The other units are absolute and are not affected by either script level or font size.

# Troubleshooting

If an expression is not valid LaTeX, Temml will render the expression in <span style="color: FireBrick;">red</span>. Hover over the expression to see a message with more information about the error. For example the expression `x^` will render as: $x^$.

To determine the Temml version number, open the console (Ctrl-Shift-I) and type `temml.version`.

<br>

<span class="reduced">Copyright © 2021 Ron Kok. Released under the [MIT License](https://opensource.org/licenses/MIT)</span>

<br>

</main>

<nav>
<div id="sidebar">

$\href{https://temml.org/}{\color{black}\Large\Temml}$ &nbsp;&nbsp;v0.1.3

<h3><a href="#top">Contents</a></h3>

<ul class="toc">
<li><a href="#accents">Accents</a></li>
<li><a href="#annotation">Annotation</a></li>
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
<li><a href="#style-color-size-and-font">Style, Color, Size, and Font</a></li>
<li><a href="#symbols-and-punctuation">Symbols and Punctuation</a></li>
<li><a href="#units">Units</a></li>
<li><a href="#troubleshooting">Troubleshooting</a></li>
</ul>

<p>Render math with<br><select id="MathFont" onchange="updateMathFont()">
    <option value="LatinModern">Latin Modern</option>
    <option value="Local">Local font</option>
</select>
<script>
  function updateMathFont() {
    const main = document.getElementById("main")
    if (document.getElementById("MathFont").value === "LatinModern") {
      main.setAttribute("class", "latin-modern")
    } else {
      main.removeAttribute("class")
    }
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
</script>

</body>
</html>