<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="initial-scale=1">
	<title>Screenshots</title>
  <link rel="stylesheet" type="text/css" href="./temml.css">
	<script src="./temmlPostProcess.js"></script>
	<style>body{font-size: 18pt}</style>
</head>

<body>
<!-- I use this file to simulate KaTeX screenshotter tests -->

### Accents

$\vec{A}\vec{x}\vec x^2\vec{x}_2^2\vec{A}^2\vec{xA}^2\; \underbar{X}$

### AccentsText

$\begin{array}{lccccc} \text{\'\i} & \text{\.\i} & \text{\`\i} & \text{\"\i} & \text{\H\i} & \text{\r\i} \\ \text{\'\j} & \text{\.\j} & \text{\`\j} & \text{\"\j} & \text{\H\j} & \text{\r\j} \\ \text{\'a} & \text{\.a} & \text{\`a} & \text{\"a} & \text{\H{a}} & \text{\r{a}} \\ \text{\'A} & \text{\.A} & \text{\`A} & \text{\"A} & \text{\H{A}} & \text{\r{A}} \\ \text{\.I İ} & \text{\H e e̋} & \text{\i ı} \end{array}$

### Align

$$\begin{align}a &= 1 & b &= 2 \\ 3a &= 3 & 17b &= 34\end{align}$$

### Alignat

$$\begin{alignat}{3} a &= 1\quad & b &= 2 &\quad c &= 3\\ 3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 \end{alignat}$$

### Aligned

$\begin{aligned} a &= 1 & b &= 2 \\ 3a &= 3 & 17b &= 34 \end{aligned}$

### Alignedat

$\begin{alignedat}{3} a &= 1\quad & b &= 2 &\quad c &= 3\\ 3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 \end{alignedat}$

### Arrays

$\left(\begin{array}{|rl:c||} 1&2&3\\ \hline 1+1&2+1&3+1\cr1\over2&\scriptstyle 1/2&\frac 1 2\\ \hline \hdashline \begin{pmatrix}x\\y\end{pmatrix}&0&\begin{vmatrix}a&b\\c&d\end{vmatrix} \end{array}\right]$

$\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}$ $\begin{subarray}{c}a \\ b\end{subarray}$

### ArrayMode
$$\begin{matrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1\,\partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_1\,\partial x_n} \\ \frac{\partial^2 f}{\partial x_2\,\partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots & \frac{\partial^2 f}{\partial x_2\,\partial x_n} \\ \vdots & \vdots & \ddots & \vdots \\ \frac{\partial^2 f}{\partial x_n\,\partial x_1} & \frac{\partial^2 f}{\partial x_n\,\partial x_2} & \cdots & \frac{\partial^2 f}{\partial x_n^2} \end{matrix}$$

### ArrayType

$1\begin{array}{c}2\\3\end{array}4$

### ArrayRemoveEmptyLine

$\begin{pmatrix} 1 \\ 2 \\ \end{pmatrix}$

### Baseline

$a+b-c\cdot d/e$

### BasicTest

$a$

### BinCancellation

$\begin{array}{cccc} +1 & 1+ & 1+1 & (,) \\ 1++1 & 3\times) & 1+, & \left(,\right) \end{array}$

### BinomTest

$\dbinom{a}{b}\tbinom{a}{b}^{\binom{a}{b}+17}$

### BoldSpacing

$\mathbf{A}^2+\mathbf{B}_3*\mathscr{C}'$

### BoldSymbol

$\sum_{\boldsymbol{\alpha}}^{\boldsymbol{\beta}} \boldsymbol{\omega}+ \boldsymbol{\int_\alpha^\beta} \boldsymbol{\Omega + {}} \\ \boldsymbol{\lim_{x \to \infty} \log Ax2k\omega\Omega\imath+} \\ x \boldsymbol{+} y \boldsymbol{=} z$

### Boxed

$\begin{array}{l} \boxed{F=ma} \quad \boxed{ac}\color{magenta}{\boxed{F}}\boxed{F=mg} \\[2em] A_{\angl n} + B_{\angl g} + C_\angln \end{array}$

### Cases

$f(a,b)=\begin{cases} a+1&\text{if }b\text{ is odd} \\ a&\text{if }b=0 \\ a-1&\text{otherwise} \end{cases} \\ \begin{rcases} a &\text{if } b \\ c &\text{if } d \end{rcases}⇒…$

### CD

$$\begin{CD} A @<a<< B @>>b> C \\ @| @AcAA @VVdV \\ D @= E @>>> F \end{CD}$$

### Colors

$\textcolor{#0f0}{b}\textcolor{red}{c}$

### ColorImplicit

$\begin{array}{l} bl{ack\color{red}red\textcolor{green}{green}red\color{blue}blue}black \\ black\left(black\color{red}red\right)black \end{array}$

### ColorSpacing

$\textcolor{red}{\displaystyle \int x} + 1$

### Colorbox

$a \colorbox{teal} B \fcolorbox{blue}{red}{C} e+\colorbox{teal}x$

### DashesAndQuotes

$\begin{array}{l} \text{``a'' b---c -- d----`e'-{-}-f} -- \\ \text{\it ``a'' b---c -- d----`e'-{-}-f} ``x'' \\ \text{\tt ``a''---} \texttt{``a''---} \mathtt{--} \\ \end{array}$

### DeepFontSizing

$a^{\big| x^{\big(}}_{\Big\uparrow} + i^{i^{\Huge x}_y}_{\Huge z} + \dfrac{\Huge x}{y}$

\Huge inside \dfrac doesn't work, needs an extra {…}

### DelimiterSizing

$\bigl\uparrow\Bigl\downarrow\biggl\updownarrow \Biggl\Uparrow\Biggr\Downarrow\biggr\langle\Bigr\}\bigr\rfloor \\ \begin{pmatrix} a & b & c\\ a & b & c\\ a & b & c\\ \end{pmatrix}$

### DisplayMode

$$\sum_{i=0}^\infty \frac{1}{i}$$

### DisplayStyle

${\displaystyle\sqrt{x}}{\sqrt{x}} {\displaystyle \frac 1 2}{\frac 1 2}{\displaystyle x^1_2}{x^1_2}$

### Dots

$\begin{array}{l} \cdots;\dots+\dots\int\dots,\dots \\ \cdots{};\ldots+\ldots\int\ldots,\ldots \end{array}$

### Equation

$$\begin{equation}\begin{split}a& =b+c-d \\ & \quad +e-f \\ & =g+h \\ & =i \end{split}\end{equation}$$

### Exponents

$a^{a^a_a}_{a^a_a}$

### ExtensibleArrows

$\begin{array}{l} \xrightarrow[ab]{ABC} + \xRightarrow{ABC} \\ \xrightleftharpoons[ab]{ABC} + \xhookrightarrow[ab]{ABC} \\ \xtwoheadrightarrow{ABC} + \frac{\xrightarrow[ab]{ABC}}{\xrightarrow[ab]{ABC}} + \left\lvert\xrightarrow[ab]{ABC}\right\rvert \end{array}$

### FractionTest

$\begin{array}{l} \dfrac{a}{b}\frac{a}{b}\tfrac{a}{b}\;-\dfrac12\;1\tfrac12\;{1 \atop 2}  \; {a \brace b} \; {a \brack b} \\ \genfrac \{ ]{0.8pt}{0}{a}{b} \; {a \above1.0pt b} \; \cfrac{1}{1+\cfrac{1}{x}}  \xrightarrow[\dfrac g h]{\displaystyle\frac g h} \; \xrightarrow [2.\, \dfrac c d] {1.\, \displaystyle\frac c d} \end{array}$

### Functions

$\sin\cos\tan\ln\log$

### Gather

$$\begin{gather} a=\frac 1 2 \\ e=b+c \end{gather}$$

### Gathered

$\begin{gathered} x = \frac{1}{2} \\ y = \sum_{i=1}^n i \end{gathered} \approx \begin{array}{c} x = \frac{1}{2} \\ y = \sum_{i=1}^n i \end{array}$

### GreekLetters

$\alpha\beta\gamma\omega$

### GreekUnicode

$\frac{αβγδεϵζηθϑικλμνξοπϖρϱςστυφϕχψω}{ΓΔΘΞΠΣΦΨΩϝ\mathbf{Ω}\mathbf{\Omega}}$

### HorizontalBraces

$\overbrace{\displaystyle{\oint_S{\vec E\cdot\hat n\,\mathrm d a}}}^\text{emf} = \underbrace{\frac{q_{\text{enc}}}{\varepsilon_0}}_{\text{charge}}$

### HTML

$\id{a}{a+}b\style{color:red;}{+c}$

HTML extension not supported by LaTeX

### Includegraphics

$\def\logo{\includegraphics[height=0.8em, totalheight=0.9em, width=0.9em, alt=KA logo]{../site/sphere.jpg}} \def\logoB{\includegraphics[height=0.4em, totalheight=0.9em, width=0.9em, alt=KA logo]{../site/sphere.jpg}} \begin{array}{l} \underline{A\logo} + \sqrt{\logo} + \tfrac{A\logo}{\logo}\\[1em] \underline{A\logoB} + \sqrt{x\logoB} + \tfrac{A\logoB}{\logoB} \end{array}$

### Integrands

$\begin{array}{l} \displaystyle \int + \oint + \iint + \oiint_i^n \\ \displaystyle \iiint + \oiiint + \textstyle \int + \oint_i^n \\ \iint + \oiint + \iiint + \oiiint \end{array}$

### Temml:

$\Temml, \large \Temml$

### Kern

$\frac{a\kern{1em}b}{c}a\kern{1em}b\kern{1ex}c\kern{-0.25em}d$

LaTeX fails to typeset this, “Missing number, treated as zero.”

### Lap

$\begin{array}{l} ab\mathllap{f}cd\mathrlap{g}hij\mathclap{k}lm \; ab\llap{f}cd\rlap{g}hij\clap{k}lm \\ \mathrlap{\frac a b} \frac a b \\ \mathrlap{\overbrace{\phantom{a_0+a_1+a_2}}^m}a_0+a_1+a_2 \end{array}$

### LargeRuleNumerator

$\frac{\textcolor{blue}{\rule{1em}{2em}}}{x}$

### LaTeX

$\text{\LaTeX}, \text{\TeX}, \large \text{\LaTeX}, \text{\TeX}$

### LeftRight

$\left( x^2 \right) \left\{ x^{x^{x^{x^x}}} \right.$

### LeftRightListStyling

$a+\left(x+y\right)-x$

### LeftRightMiddle

$\left( x^2 \middle/ \right) \left\{ x^{x^{x^{x^x}}} \middle/ y \right.\left(x\middle|y\,\middle|\,z\right)$

### LeftRightStyleSizing

$+\left\{\rule{0.1em}{1em}\right. x^{+\left\{\rule{0.1em}{1em}\right. x^{+\left\{\rule{0.1em}{1em}\right.}}$

### LimitControls

$\displaystyle\int\limits_2^3 3x^2\,dx + \sum\nolimits^n_{i=1}i + \textstyle\int\limits_x^y z$

### LineBreak

$\frac{x^2}{y^2} + z^2 = z^2 + \frac{x^2}{y^2} = \frac{x^2}{y^2} +\nobreak z^2 = z^2 + \frac{x^2}{y^2} = \frac{x^2}{y^2} + ~ z^2 = z^2 + \frac{x^2}{y^2} = \frac{x^2}{y^2} + \hspace{1em} z^2 = z^2 + \frac{x^2}{y^2} = \frac{x^2}{y^2} + z^2 = \hspace*{1em} z^2 + \frac{x^2}{y^2} = \frac{x^2}{y^2} + z^2 = hi \allowbreak there = hi \allowbreak there$

### LowerAccent

$\begin{matrix} \underleftarrow{AB} \quad \underrightarrow{AB} \quad \underleftrightarrow{AB} \quad \undergroup{AB} \\ \underlinesegment{AB} \quad \utilde{AB}  \quad \color{green}{\underrightarrow{AB}} \\ \underrightarrow{F} + \underrightarrow{AB} + \underrightarrow{AB}^2 + \underrightarrow{AB}_2 \\ \frac{\underrightarrow{AB}}{\underrightarrow{AB}} + \sqrt{\underrightarrow{AB}} + \left\lvert\underrightarrow{AB}\right\rvert \\ \text{\underline{text}} \end{matrix}$

### MathAtom

$a\mathrel{\mathop{=}\limits^{\textcolor{blue} ?}}b$

### MathAtom2

$\mathop{\overline{\mathrm{lim}}}\limits_{x\to\infty}f(x)$

### MathChoice

${\displaystyle\mathchoice{D}{T}{S}{SS}} {\textstyle\mathchoice{D}{T}{S}{SS}} {\scriptstyle \mathchoice{D}{T}{S}{SS}} {\scriptscriptstyle\mathchoice{D}{T}{S}{SS}} \displaystyle X_{\mathchoice{D}{T}{S}{SS}_{\mathchoice{D}{T}{S}{SS}}}$

### MathDefaultFonts

$Ax2k\breve{a}\omega\Omega\imath+\Temml$

### MathBb

$\mathbb{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathBf

$\mathbf{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathCal

$\mathcal{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathFrak

$\mathfrak{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathIt

$\mathit{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathNormal

$\mathnormal{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathOp

$a\mathop+b\mathop:c\mathop{\delta}e\mathop{\textrm{and}}f\mathrel{\mathop{:}}=g\sin h$

### MathRm

$\mathrm{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathSf

$\mathsf{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathScr

$\mathscr{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### MathtoolsMatrix

$\begin{matrix*}[l] a & -1 \\ -1 & d \end{matrix*} \; \begin{pmatrix*}[r] a & -1 \\ -1 & d \end{pmatrix*}$

### MathTt

$\mathtt{Ax2k\breve{a}\omega\Omega\imath+\Temml}$

### Mod

$\begin{array}{cc} a \bmod 2 & b \pod 3 \\ c \pmod{4} & d \mod{56} \\ \displaystyle a\bmod 2 & \displaystyle b \pod 3 \\ \displaystyle c\pmod{4} & \displaystyle d \mod{56} \end{array}$

### ModScript

$\begin{array}{cc} \scriptstyle a\bmod 2 & \scriptstyle b \pod 3 \\ \scriptstyle c\pmod{4} & \scriptstyle d \mod{56} \end{array}$

### ModSpacing

$\begin{array}{l} (a \cdot b) \bmod 257 \\ (a \cdot b) \mkern1mu\mathbin{\mathrm{mod}}\mkern1mu 257 \\ (a \cdot b) \mathbin{\mathrm{mod}} 257 \end{array}$

### NegativeSpaceBetweenRel

$A =\!= B$

### NegativeSpace

$\boxed{\$1,\!000,\!000}\Temml$

### NestedFractions

$\dfrac{\frac{a}{b}}{\frac{c}{d}}\dfrac{\dfrac{a}{b}} {\dfrac{c}{d}}\frac{\frac{a}{b}}{\frac{c}{d}}$

### NewLine

$\frac{a^2+b^2}{c^2} \newline \frac{a^2+b^2}{c^2} \\ \begin{pmatrix} a & b \\ c & d \cr \end{pmatrix} \\ a+b+c+{d+\\e}+f+g$

### Not

$\not = \begin{array}{l} \not=\not>\not\geq\not\in\not<\not\leq\not{abc} \\ \not xy + ab \not xy \\ a \neq b \notin c \end{array}$

### NullDelimiterInteraction

$a \bigl. + 2 \quad \left. + a \right)$

### OldFont

$\begin{matrix} \rm rm & it & \it it & \bf bf & \sf sf & \tt tt \\ \text{\rm rm} & \text{rm} & \text{\it it} & \text{\bf bf} & \text{\sf sf} & \text{\tt tt} \\ i\rm r\it i & \text{r\it i\rm r} \end{matrix}$

### OperatorName

$\begin{matrix} \operatorname g (z) + 5\operatorname{g}z + \operatorname{Gam-ma}(z) \\ \operatorname{Gam ma}(z) + \operatorname{\Gamma}(z) + \operatorname{}x \\ \operatorname*{asin} x + \operatorname*{asin}_y x + \operatorname*{asin}\limits_y x \\ {\displaystyle \operatorname*{asin}_y x} \end{matrix}$

### OpLimits

$\begin{matrix} {\sin_2^2 \lim_2^2 \int_2^2 \sum_2^2} {\displaystyle \lim_2^2 \int_2^2 \intop_2^2 \sum_2^2} \\ \limsup_{x \rightarrow \infty} x \stackrel{?}= \liminf_{x \rightarrow \infty} x \\ {\displaystyle \limsup_{x \rightarrow \infty} x\:\: \sum_{\substack{0<i<m\\0<j<n}}} \end{matrix}$

### OverUnderline

$x\underline{x}\underline{\underline{x}}\underline{x_{x_{x_x}}}\underline{x^{x^{x^x}}}\overline{x}\overline{x}\overline{x^{x^{x^x}}} \textcolor{blue}{\overline{\underline{x}}\underline{\overline{x}}}$

### OverUnderset

$\begin{array}{l} x\overset?=1 \quad \underset{*}{x}^2 \quad \overset{a}{b}b\underset{a}{b}b \\ {\displaystyle\lim_{t\underset{>0}\to0}}\\ a+b+c+d\overset{b+c=0}\longrightarrow a+d\\ \overset { x = y } { \sqrt { a b } } \end{array}$

### Phantom

$\begin{array}{l} \dfrac{1+\phantom{x^{\textcolor{blue}{2}}} = x}{1+x^{\textcolor{blue}{2}} = x} \left(\vphantom{\int_t} zzz \right) \left( X \hphantom{\frac{\frac X X}{X}} \right)\\ \text{a \phantom{123}} b \hphantom{\frac{1}{2}}=c \vphantom{101112} d \\ \sqrt{\mathstrut a} + \sqrt{\mathstrut d} \end{array}$

### Phase

$120\text{V}\phase{-78.2^\circ}\;\Large\phase{78.2^\circ}$

### Pmb

$\mu\pmb{\mu}\pmb{=}\mu\pmb{+}\mu$

### PrimeSpacing

$f'+f_2'+f^{f'}$

### PrimeSuper

$x'^2+x'''^2+x'^2_3+x_3'^2$

### Raisebox

$\begin{matrix} \frac{a}{a\raisebox{0.5em}{b}} \cdot \frac{a\raisebox{-0.5em}{b}}{a} \cdot \sqrt{a\raisebox{0.5em}{b}} \cdot \sqrt{a\raisebox{-0.5em}{b}} \cdot \sqrt{a\raisebox{0.5em}{b}\raisebox{-0.5em}{b}} \\[2em] a + \left(\vcenter{\hbox{$\frac{a+b}{\dfrac{c}{d}}$}}\right) \end {matrix}$

### ReactionArrows:

$\begin{matrix} A \longleftrightarrows{} B \longRightleftharpoons{} C \longLeftrightharpoons{} D \\ A \longleftrightarrows{over} B \longRightleftharpoons{over} C \longLeftrightharpoons{over} D \end{matrix}$

### RelativeUnits

$\begin{array}{ll} a\kern1emb^{a\kern1emb^{a\kern1emb}} & {\footnotesize a\kern1emb^{a\kern1emb^{a\kern1emb}}} \\ a\mkern18mub^{a\mkern18mub^{a\mkern18mub}} & {\footnotesize a\mkern18mub^{a\mkern18mub^{a\mkern18mub}}} \\ \rule{1em}{1em}^{\rule{1em}{1em}}\rule{18mu}{18mu}^{\rule{18mu}{18mu}} & {\footnotesize\rule{1em}{1em}^{\rule{1em}{1em}}\rule{18mu}{18mu}^{\rule{18mu}{18mu}}} \end{array}$

### RlapBug

$\frac{\mathrlap{x}}{2}$

### Rule

$\rule{1em}{0.5em}\rule{1ex}{2ex}\rule{1em}{1ex}\rule{1em}{0.431ex}$

### SizingBaseline

${\tiny a+b}a+b{\Huge a+b}$

### Sizing

${\Huge x}{\LARGE y}{\normalsize z}{\scriptsize w}\sqrt[\small 3]{x+1}$

### Smash

$\left( X^{\smash 2} \right) \sqrt{\smash[b]{y=}}$

### Spacing

$\begin{matrix} ^3+[-1][1-1]1=1(=1)\lvert a\rvert~b \\ \scriptstyle{^3+[-1][1-1]1=1(=1)\lvert a\rvert~b} \\ \scriptscriptstyle{^3+[-1][1-1]1=1(=1)\lvert a\rvert~b} \\ a : a \colon a \\ \end{matrix}$

### Sqrt

$\sqrt{\sqrt{\sqrt{x}}}_{\sqrt{\sqrt{x}}}^{\sqrt{\sqrt{\sqrt{x}}} ^{\sqrt{\sqrt{\sqrt{x}}}}} \\ \sqrt{\frac{\frac{A}{B}}{\frac{A}{B}}} \; \sqrt{\frac{\frac{\frac{A}{B}}{\frac{A}{B}}}{\frac{\frac{A}{B}}{\frac{A}{B}}}}$

### SqrtRoot

$\begin{array}{l} 1+\sqrt[3]{2}+\sqrt[1923^234]{2^{2^{2^{2^{2^{2^{2^{2^{2^{2^{2^2}}}}}}}}}}} \\ \Huge \sqrt[3]{M} + x^{\sqrt[3] a} \end{array}$

### StackRel

$a \stackrel{?}{=} b \stackrel{\text{def}}{=} c$

### StretchyAccent

$\begin{array}{l} \overrightarrow{AB} \quad \overleftarrow{AB} \quad \Overrightarrow{AB} \quad \overleftrightarrow{AB} \quad \overgroup{AB} \\ \overlinesegment{AB} \quad \overleftharpoon{AB} \quad \overrightharpoon{AB} \quad \left(\underleftarrow{\frac{value}{j}}\right)  \\ \widecheck{AB} \quad \widehat{ABC} \quad \widetilde{AB} \quad \widetilde{ABC} \\ \overrightarrow{F} + \overrightarrow{AB} + \overrightarrow{F}^2 + \overrightarrow{F}_2 + \overrightarrow{F}_1^2 \\ \overrightarrow{AB}^2+\frac{\overrightarrow{AB}}{\overrightarrow{AB}} + \sqrt{\overrightarrow{AB}} + \left\lvert\overrightarrow{AB}\right\rvert \end{array}$

### StretchyAccentColor

$\textcolor{red}{\overrightarrow{AB}} \quad \color{blue}{\overleftarrow{AB}} \quad \color{blue}{\textcolor{green}{\Overrightarrow{AB}}} \quad \widehat{\theta} \widetilde{A}$

### StrikeThrough

$\begin{array}{l} \cancel x \quad \cancel{2B} + \bcancel 5 +\bcancel{5ay} \\ \sout{5ab} + \sout{5ABC} + \xcancel{\oint_S{\vec E\cdot\hat n\,\mathrm d a}} \\[0.3em] \frac{x+\cancel B}{x+\cancel x} + \frac{x+\cancel y}{x} + \cancel{B}_1^2 + \cancel{B^2} \\[0.2em] \left\lvert\cancel{ac}\right\rvert \end{array}$

### StrikeThroughColor

$\begin{array}{l} \textcolor{red}{\cancel x \quad \cancel{2B} + \bcancel 5 +\bcancel{5ay}} \\ \color{green}{\sout{5ab} + \sout{5ABC} + \xcancel{\oint_S{\vec E\cdot\hat n\,\mathrm d a}}} \end{array}$

### StyleSpacing

$\scriptstyle ab\;cd$

### StyleSwitching

$a\cdot b\scriptstyle a\cdot ba\textstyle\cdot ba\scriptstyle\cdot b$

### SupSubCharacterBox

$a_2f_2{f}_2{aa}_2{af}_2\mathbf{y}_Ay_A$

### SupSubHorizSpacing

$x^{x^{x}}\Big|x_{x_{x_{x_{x}}}}\bigg|x^{x^{x_{x_{x_{x_{x}}}}}}\bigg|$

### SupSubLeftAlignReset

$\omega^8_{888} \quad \frac{1}{\hat{\omega}^{8}_{888}} \quad \displaystyle\sum_{\omega^{8}_{888}}$

### SupSubOffsets

$\displaystyle \int_{2+3}x f^{2+3}+3\lim_{2+3+4+5}f$

### SurrogatePairs

$\begin{array}{l} 𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜 \\ 𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶 \\ \text{𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜} \\ \text{𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶} \\ \mathrm{𝐀𝐚𝑨𝒂𝔅𝔞𝔸𝒜} \\ \end{array}$

### Symbols1

$\maltese\degree\pounds\$\standardstate \text{\maltese\degree\pounds\textdollar}$

### Tag

$$\tag{$+$hi} \frac{x^2}{y}+x^{2^y}$$

### Text

$\frac{a}{b}\text{c~ {ab} \ e}+fg$

### TextSpace

$\begin{array}{l} \texttt{12345678901234} \\ \texttt{A test  1~~2\ \ 3} \\ \verb|A test 1  2  3| \end{array}$

### TextStacked

$\begin{matrix} \textsf{abc123 \textbf{abc123} \textit{abc123}}\\ \text{abc123 \textbf{abc123} \textit{abc123}}\\ \textrm{abc123 \textbf{abc123} \textit{abc123}}\\ \textsf{\textrm{\textbf{abc123}} \textbf{abc123} \textit{abc123}}\\ \textit{abc123 \textbf{abc123} \textsf{abc123}}\\ \end{matrix}$

### TextWithMath

$$\begin{matrix} \text{for $a < b$ and $ c < d $}. \\ \textsf{for $a < b$ and $ c < d $}. \\ \textsf{for $a < b \textbf{ and } c < d $} \\ \text{\sf for $a < b$ and $c < d$.} \end{matrix}$$

### Unicode

$\begin{matrix}\text{ÀàÇçÉéÏïÖöÛû} \\ \text{БГДЖЗЙЛФЦШЫЮЯ} \\ \text{여보세요} \\ \text{私はバナナです} \end{matrix}$

### Units

$\begin{array}{ll} \mathrm H\kern 1em\mathrm H \text{\tiny (1em)} & \mathrm H\kern 1ex\mathrm H \text{\tiny (1ex)} \\ \mathrm H{\scriptstyle \kern 1em}\mathrm H \text{\tiny (ss 1em)} & \mathrm H{\scriptstyle \kern 1ex}\mathrm H \text{\tiny (ss 1ex)} \\ \mathrm H{\small \kern 1em}\mathrm H \text{\tiny (sm 1em)} & \mathrm H{\small \kern 1ex}\mathrm H \text{\tiny (sm 1ex)} \\ \mathrm H\mkern 18mu\mathrm H \text{\tiny (18mu)} & \mathrm H\kern 1cm\mathrm H \text{\tiny (1cm)} \\ \mathrm H{\scriptstyle \mkern 18mu}\mathrm H \text{\tiny (ss 18mu)} & \mathrm H{\scriptstyle \kern 1cm}\mathrm H \text{\tiny (ss 1cm)} \\ \mathrm H{\small \mkern 18mu}\mathrm H \text{\tiny (sm 18mu)} & \mathrm H{\small \kern 1cm}\mathrm H \text{\tiny (sm 1cm)} \end{array}$

### UnsupportedCmds

$\err\,\frac\fracerr3\,2^\superr_\suberr\,\sqrt\sqrterr$

deliberately does not compile

### Verb

$\begin{array}{ll} \verb \verb ,   & \verb|\verb  |, \\ \verb* \verb* , & \verb*|\verb* |, \\ \verb!<x> & </y>! & \scriptstyle\verb|ss verb| \\ \verb*!<x> & </y>! & \small\verb|sm verb| \\ \verb|``---''~| \end{array}$

### VerticalSpacing

potato<br>blah$x^{\Huge y}z$<br>moo

<script>
  // Assign id's to auto-numbered equations and populate \ref's
  temml.postProcess(document.body)
</script>

</body>
</html>