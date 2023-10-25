<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Temml Screen Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="./temmlPostProcess.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(1) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
    p { font-size: 8pt; }
  </style>
</head>

<body>

# Tests from KaTeX

This file renders examples from KaTeX’s
[screenshotter tests](https://github.com/KaTeX/KaTeX/blob/main/test/screenshotter/ss_data.yaml).\
Images from LaTeX are also provided for comparison.\
(Images come from [LaTeX Previewer](http://www.tlhiv.org/ltxpreview/), thanks.)

#### Accents

+---------------------------+---------------------------------------+--------------------------------+
| Source                    | Temml                                 | LaTeX                          |
+===========================+=======================================+================================+
| \vec{A}\vec{x}\vec x^2 \  | $\vec{A}\vec{x}\vec x^2\vec{x}_2^2    | ![accents](images/accents.svg) |
| \vec{x}_2^2 \vec{A}^2 \   |   \vec{A}^2\vec{xA}^2\; \underbar{X}$ |                                |
| \vec{xA}^2\; \underbar{X} |                                       |                                |
+---------------------------+---------------------------------------+--------------------------------+

#### AccentsText

+---+---------------------------------------------------------------------------------------------------------------+------------------+
|   | $\begin{array}{lccccc} \text{\'\i} & \text{\.\i} & \text{\`\i} & \text{\"\i} & \text{\H\i} & \text{\r\i} \\   | ![AccentsText][] |
|   |    \text{\'\j} & \text{\.\j} & \text{\`\j} & \text{\"\j} & \text{\H\j} & \text{\r\j} \\                       |                  |
|   |    \text{\'a} & \text{\.a} & \text{\`a} & \text{\"a} & \text{\H{a}} & \text{\r{a}} \\                         |                  |
|   |    \text{\'A} & \text{\.A} & \text{\`A} & \text{\"A} & \text{\H{A}} & \text{\r{A}} \\                         |                  |
|   |    \text{\.I İ} & \text{\H e e̋} & \text{\i ı} \end{array}$                                                   |                  |
+---+---------------------------------------------------------------------------------------------------------------+------------------+

[AccentsText]: images/AccentsText.svg

#### Actuarial Angle

+--------------------------+---------------------------+--------------------------+
| `a_{\angl n}\; a_\angln` | $a_{\angl n}\; a_\angln$  | ![angl](images/angl.svg) |
+--------------------------+---------------------------+--------------------------+

#### Align

+---------------------------+------------------------------------+
| \begin{align} \           | $$\begin{align}a &= 1 & b &= 2 \\  |
|   a &= 1 & b &= 2 \\\\ \  |   3a &= 3 & 17b &= 34\end{align}$$ |
|   3a &= 3 & 17b &= 34 \   |                                    |
| \end{align}               |                                    |
+---------------------------+------------------------------------+
{colWidths="null 200"}

#### Alignat

+--------------------------------------------------+------------------------------------------------+
| \begin{alignat}{3} \                             | $$\begin{alignat}{3}                           |
|   a &= 1\quad & b &= 2 &\quad c &= 3\\\\ \       |   a &= 1\quad & b &= 2 &\quad c &= 3\\         |
|   3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 \ |   3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 |
| \end{alignat}                                    | \end{alignat}$$                                |
+--------------------------------------------------+------------------------------------------------+
{colWidths="null 350"}

#### Aligned

+---------------------------+-------------------------------------+--------------------------------+
| \begin{aligned} \         | $\begin{aligned}a &= 1 & b &= 2 \\  | ![aligned](images/aligned.svg) |
|   a &= 1 & b &= 2 \\\\ \  |   3a &= 3 & 17b &= 34\end{aligned}$ |                                |
|   3a &= 3 & 17b &= 34 \   |                                     |                                |
| \end{aligned}             |                                     |                                |
+---------------------------+-------------------------------------+--------------------------------+

#### Alignedat

+--------------------------------------------------+------------------------------------------------+----------------+
| \begin{alignedat}{3} \                           | $$\begin{alignedat}{3}                         | ![alignedat][] |
|   a &= 1\quad & b &= 2 &\quad c &= 3\\\\ \       |   a &= 1\quad & b &= 2 &\quad c &= 3\\         |                |
|   3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 \ |   3a &= 3 &\quad 17b &= 34 &\quad 400c &= 1200 |                |
| \end{alignedat}                                  | \end{alignedat}$$                              |                |
+--------------------------------------------------+------------------------------------------------+----------------+

[alignedat]: images/alignedat.svg

#### Arrays

This LaTeX image does include dashed lines.\
LaTeX Previewer does not include the `arydshln` package.

+-------------------------------------------------------------+----------------------------------------------------------+---------------+
| \left(\begin{array}{|rl:c|}                                 | $\left(\begin{array}{|rl:c|}                             | ![Arrays][]   |
|    1&2&3\\\\ \hline \                                       |   1&2&3\\ \hline                                         |               |
|    1+1&2+1&3+1\cr1\over2&\scriptstyle 1/2&\frac 1 2\\\\  \  |   1+1&2+1&3+1\cr1\over2&\scriptstyle 1/2&\frac 1 2\\     |               |
|    \hdashline \                                             |   \hdashline                                             |               |
|    \begin{pmatrix}x\\\\y\end{pmatrix}&0& \                  |   \begin{pmatrix}x\\y\end{pmatrix}&0&                    |               |
|    \begin{vmatrix}a&b\\\\c&d\end{vmatrix} \                 |   \begin{vmatrix}a&b\\c&d\end{vmatrix}                   |               |
|  \end{array}\right]                                         | \end{array}\right]$                                      |               |
+-------------------------------------------------------------+----------------------------------------------------------+---------------+
| \begin{smallmatrix} a & b \\\\ c & d \end{smallmatrix} \    |  $\begin{smallmatrix} a & b \\ c & d \end{smallmatrix}$  | ![subarray][] |
| \begin{subarray}{c}a \\\\ b\end{subarray}                   |  $\begin{subarray}{c}a \\ b\end{subarray}$               |               |
+-------------------------------------------------------------+----------------------------------------------------------+---------------+

[Arrays]: images/Arrays.svg
[subarray]: images/subarray.svg

#### ArrayMode

+---+---------------------------------------------------------------+------------------------------------+
|   | $$\begin{matrix} \frac{\partial^2 f}{\partial x_1^2} &        | ![ArrayMode](images/ArrayMode.svg) |
|   |   \frac{\partial^2 f}{\partial x_1\,\partial x_2} &           |                                    |
|   |   \cdots & \frac{\partial^2 f}{\partial x_1\,\partial x_n} \\ |                                    |
|   |   \frac{\partial^2 f}{\partial x_2\,\partial x_1} &           |                                    |
|   |   \frac{\partial^2 f}{\partial x_2^2} &                       |                                    |
|   |   \cdots & \frac{\partial^2 f}{\partial x_2\,\partial x_n} \\ |                                    |
|   |   \vdots & \vdots & \ddots & \vdots \\                        |                                    |
|   |   \frac{\partial^2 f}{\partial x_n\,\partial x_1} &           |                                    |
|   |   \frac{\partial^2 f}{\partial x_n\,\partial x_2} &           |                                    |
|   |   \cdots & \frac{\partial^2 f}{\partial x_n^2}                |                                    |
|   |   \end{matrix}$$                                              |                                    |
+---+---------------------------------------------------------------+------------------------------------+

#### ArrayType

+-------------------------------------+--------------------------------------+------------------------------------+
| 1\begin{array}{c}2\\\\3\end{array}4 | $1\begin{array}{c}2\\3\end{array}4$  | ![ArrayType](images/ArrayType.svg) |
+-------------------------------------+--------------------------------------+------------------------------------+

#### ArrayRemoveEmptyLine

A `\\` at the end of a matrix should not create another line.

+---------------------------------------------+--------------------------------------------+
| \begin{pmatrix} 1 \\\\ 2 \\\\ \end{pmatrix} | $\begin{pmatrix} 1 \\ 2 \\ \end{pmatrix}$  |
+---------------------------------------------+--------------------------------------------+

#### Baseline

+----------------+-------------------+----------------------------------+
| a+b-c\cdot d/e | $a+b-c\cdot d/e$  | ![Baseline](images/baseline.svg) |
+----------------+-------------------+----------------------------------+

#### BasicTest

$`a`

#### BinCancellation

+--------------------------------------------+-------------------------------------------+----------------------+
| \begin{array}{cccc} \                      | $\begin{array}{cccc}                      | ![BinCancellation][] |
|   +1 & 1+ & 1+1 & (,) \\\\ \               |    +1 & 1+ & 1+1 & (,) \\                 |                      |
|   1++1 & 3\times) & 1+, & \left(,\right) \ |    1++1 & 3\times) & 1+, & \left(,\right) |                      |
| \end{array}                                |  \end{array}$                             |                      |
+--------------------------------------------+-------------------------------------------+----------------------+

[BinCancellation]: images/BinCancellation.svg

#### Binom

+----------------------------------------------+-------------------------------------------------+------------+
| \dbinom{a}{b}\tbinom{a}{b}^{\binom{a}{b}+17} | $\dbinom{a}{b}\tbinom{a}{b}^{\binom{a}{b}+17}$  | ![binom][] |
+----------------------------------------------+-------------------------------------------------+------------+

[binom]: images/binom.svg

#### BoldSpacing

+----------------------------------------+-------------------------------------------+
| \mathbf{A}^2+\mathbf{B}_3*\mathscr{C}' | $\mathbf{A}^2+\mathbf{B}_3*\mathscr{C}'$  |
+----------------------------------------+-------------------------------------------+

#### BoldSymbol

+-----------------------------------------------------+----------------------------------------------------+-----------------+
| `\sum_{\boldsymbol{\alpha}}^{\boldsymbol{\beta}}` \ | $\sum_{\boldsymbol{\alpha}}^{\boldsymbol{\beta}}   | ![BoldSymbol][] |
| \boldsymbol{\omega}+ \                              | \boldsymbol{\omega}+                               |                 |
| `\boldsymbol{\int_\alpha^\beta}` \                  | \boldsymbol{\int_\alpha^\beta}                     |                 |
| \boldsymbol{\Omega + {}} \\\\ \                     | \boldsymbol{\Omega + {}} \\                        |                 |
| \boldsymbol{\lim_{x \to \infty} \                   | \boldsymbol{\lim_{x \to \infty}                    |                 |
| \log Ax2k\omega\Omega\imath+} \\\\ \                | \log Ax2k\omega\Omega\imath+} \\                   |                 |
| x \boldsymbol{+} y \boldsymbol{=} z                 | x \boldsymbol{+} y \boldsymbol{=} z$               |                 |
+-----------------------------------------------------+----------------------------------------------------+-----------------+

[BoldSymbol]: images/BoldSymbol.svg

#### Boxed

+----------------------------------------+-----------------------------------------+------------+
| \boxed{F=ma} \quad \boxed{ac}\         | $\boxed{F=ma} \quad \boxed{ac}          | ![boxed][] |
| \color{magenta}{\boxed{F}}\boxed{F=mg} | \color{magenta}{\boxed{F}}\boxed{F=mg}$ |            |
+----------------------------------------+-----------------------------------------+------------+

[boxed]: images/boxed.svg

#### Cases

+----------------------------------------+------------------------------------+------------------------------+
| f(a,b)= \                              | $f(a,b)=                           | ![cases](images/cases.svg)   |
| \begin{cases} \                        | \begin{cases}                      |                              |
|   a+1&\text{if }b\text{ is odd} \\\\ \ |   a+1&\text{if }b\text{ is odd} \\ |                              |
|   a&\text{if }b=0 \\\\ \               |   a&\text{if }b=0 \\               |                              |
|   a-1&\text{otherwise} \               |   a-1&\text{otherwise}             |                              |
| \end{cases}                            | \end{cases}$                       |                              |
+----------------------------------------+------------------------------------+------------------------------+
| \begin{rcases} \                       | $\begin{rcases}                    | ![rcases](images/rcases.svg) |
|   a &\text{if } b \\\\ \               |   a &\text{if } b \\               |                              |
|   c &\text{if } d \                    |   c &\text{if } d                  |                              |
| \end{rcases}\Rightarrow\ldots          | \end{rcases}\Rightarrow\ldots$     |                              |
+----------------------------------------+------------------------------------+------------------------------+

#### CD

+-----------------------------+-------------------------+----------------------+
| \begin{CD} \                | $$\begin{CD}            | ![CD](images/CD.svg) |
|   A @<a<< B @>>b> C \\\\ \  |   A @<a<< B @>>b> C \\  |                      |
|   @| @AcAA @VVdV \\\\ \     |   @| @AcAA @VVdV \\     |                      |
|   D @= E @>>> F \           |   D @= E @>>> F         |                      |
| \end{CD}                    | \end{CD}$$              |                      |
+-----------------------------+-------------------------+----------------------+

#### Colors

+-----------------------+-----------------------+------------------------------+
| \textcolor{#0f0}{b} \ | $\textcolor{#0f0}{b}  | ![colors](images/colors.svg) |
| \textcolor{red}{c}    |   \textcolor{red}{c}$ |                              |
+-----------------------+-----------------------+------------------------------+

#### ColorImplicit

+----------------------------------+------------------------------+--------------------------------------------+
| bl{ack\color{red}red \           | $bl{ack\color{red}red        | ![ColorImplicit](images/ColorImplicit.svg) |
| \textcolor{green}{green} \       | \textcolor{green}{green}     |                                            |
| red\color{blue}blue}black \\\\ \ | red\color{blue}blue}black \\ |                                            |
| black\left(black \               | black\left(black             |                                            |
| \color{red}red\right)black       | \color{red}red\right)black$  |                                            |
+----------------------------------+------------------------------+--------------------------------------------+

#### ColorSpacing

+----------------------------+-----------------------------+------------------------------------------+
| \textcolor{red}{x} + 1 \   | $\textcolor{red}{x} + 1     | ![ColorSpacing](images/ColorSpacing.svg) |
| {\color{green}+ 2 +} 3 + 4 | {\color{green}+ 2 +} 3 + 4$ |                                          |
+----------------------------+-----------------------------+------------------------------------------+

#### Colorbox

+----------------------------+----------------------------+----------------------------------+
| a \colorbox{teal} B \      | $a \colorbox{teal} B       | ![Colorbox](images/Colorbox.svg) |
| \fcolorbox{blue}{red}{C} \ |   \fcolorbox{blue}{red}{C} |                                  |
| e+\colorbox{teal}x         |   e+\colorbox{teal}x$      |                                  |
+----------------------------+----------------------------+----------------------------------+

#### DashesAndQuotes

+-----------------------------------------------------------+------------------------------------------------------+----------------------+
| \begin{array}{l} \                                        | $\begin{array}{l}                                    | ![DashesAndQuotes][] |
| ```\text{``a'' b---c -- d----`e'-{-}-f} -- \\``` \        | \text{``a'' b---c -- d----`e'-{-}-f} -- \\           |                      |
| ```\text{\it ``a'' b---c -- d----`e'-{-}-f} ``x'' \\``` \ | \text{\it ``a'' b---c -- d----`e'-{-}-f} ``x'' \\    |                      |
| ```\text{\tt ``a''---} \texttt{``a''---} \mathtt{--}``` \ | \text{\tt ``a''---} \texttt{``a''---} \mathtt{--} \\ |                      |
| \end{array}                                               | \end{array}$                                         |                      |
+-----------------------------------------------------------+------------------------------------------------------+----------------------+

[DashesAndQuotes]: images/DashesAndQuotes.svg

#### DelimiterSizing

+-----------------------------------+-----------------------------------+-----------------------+
| \bigl\uparrow\Bigl\downarrow \    | $\bigl\uparrow\Bigl\downarrow     | ![DelimiterSizing1][] |
| \biggl\updownarrow \              | \biggl\updownarrow                |                       |
| \Biggl\Uparrow\Biggr\Downarrow \  | \Biggl\Uparrow\Biggr\Downarrow    |                       |
| \biggr\langle\Bigr\\}\bigr\rfloor | \biggr\langle\Bigr\}\bigr\rfloor$ |                       |
+-----------------------------------+-----------------------------------+-----------------------+
| \begin{pmatrix} \                 | $\begin{pmatrix}                  | ![DelimiterSizing2][] |
|   a & b & c\\\\ \                 |   a & b & c\\                     |                       |
|   a & b & c\\\\ \                 |   a & b & c\\                     |                       |
|   a & b & c \                     |   a & b & c\\                     |                       |
| \end{pmatrix}                     | \end{pmatrix}$                    |                       |
+-----------------------------------+-----------------------------------+-----------------------+

[DelimiterSizing1]: images/DelimiterSizing1.svg
[DelimiterSizing2]: images/DelimiterSizing2.svg

#### DisplayMode

+-------------------------------+-----------------------------------+----------------------------------------+
| \sum_{i=0}^\infty \frac{1}{i} | $$\sum_{i=0}^\infty \frac{1}{i}$$ | ![DisplayMode](images/DisplayMode.svg) |
+-------------------------------+-----------------------------------+----------------------------------------+

#### DisplayStyle

+----------------------------------------+---------------------------------------+-------------------+
| {\displaystyle\sqrt{x}}{\sqrt{x}} \    | ${\displaystyle\sqrt{x}}{\sqrt{x}}    | ![displaystyle][] |
| {\displaystyle \frac 1 2}{\frac 1 2} \ |  {\displaystyle \frac 1 2}{\frac 1 2} |                   |
| `{\displaystyle x^1_2}{x^1_2}`         |  {\displaystyle x^1_2}{x^1_2}$        |                   |
+----------------------------------------+---------------------------------------+-------------------+

[displaystyle]: images/displaystyle.svg

#### Dots

+---------------------------------------------+-----------------------------------------+--------------------------+
| \begin{array}{l} \                          | $\begin{array}{l}                       | ![dots](images/dots.svg) |
|   \cdots;\dots+\dots\int\dots,\dots \\\\ \  | \cdots;\dots+\dots\int\dots,\dots \\    |                          |
|   \cdots{};\ldots+\ldots\int\ldots,\ldots \ | \cdots{};\ldots+\ldots\int\ldots,\ldots |                          |
| \end{array}                                 | \end{array}$                            |                          |
+---------------------------------------------+-----------------------------------------+--------------------------+

#### Equation

+---------------------+--------------------+----------------------------------+
| \begin{equation} \  | $$\begin{equation} | ![equation](images/equation.svg) |
| \begin{split} \     | \begin{split}      |                                  |
| a& =b+c-d \\\\ \    | a& =b+c-d \\       |                                  |
| & \quad +e-f \\\\ \ | & \quad +e-f \\    |                                  |
| & =g+h \\\\ \       | & =g+h \\          |                                  |
| & =i \              | & =i               |                                  |
| \end{split} \       | \end{split}        |                                  |
| \end{equation}      | \end{equation}$$   |                                  |
+---------------------+--------------------+----------------------------------+
{colWidths="null 150"}

#### Exponents

+---------------------+----------------------+------------------------------------+
| `a^{a^a_a}_{a^a_a}` | $a^{a^a_a}_{a^a_a}$  | ![exponents](images/exponents.svg) |
+---------------------+----------------------+------------------------------------+

#### ExtensibleArrows

+------------------------------------+----------------------------------+-----------------------+
| \begin{array}{l} \                 | $\begin{array}{l}                | ![ExtensibleArrows][] |
| \xrightarrow[ab]{ABC} + \          | \xrightarrow[ab]{ABC} +          |                       |
| \xRightarrow{ABC} \\\\ \           | \xRightarrow{ABC} \\             |                       |
| \xleftrightharpoons[ab]{ABC} + \   | \xleftrightharpoons[ab]{ABC} +   |                       |
| \xhookrightarrow[ab]{ABC} \\\\ \   | \xhookrightarrow[ab]{ABC} \\     |                       |
| \xmapsto{ABC} + \                  | \xmapsto{ABC} +                  |                       |
| \frac{\xrightarrow[ab]{ABC}} \     | \frac{\xrightarrow[ab]{ABC}}     |                       |
| {\xrightarrow[ab]{ABC}} + \        | {\xrightarrow[ab]{ABC}} +        |                       |
| \left\lvert\xrightarrow[ab]{ABC} \ | \left\lvert\xrightarrow[ab]{ABC} |                       |
| \right\rvert \                     | \right\rvert                     |                       |
| \end{array}                        | \end{array}$                     |                       |
+------------------------------------+----------------------------------+-----------------------+

[ExtensibleArrows]: images/ExtensibleArrows.svg

#### Fractions

+----------------------------------------------------+--------------------------------------------------+-----------------+
| \dfrac{a}{b}\frac{a}{b} \                          | $\dfrac{a}{b}\frac{a}{b}                         | ![Fractions1][] |
| \tfrac{a}{b}\\;- \                                 | \tfrac{a}{b}\;-                                  |                 |
| \dfrac 1 2\\;1\tfrac 1 2\\;{1 \atop 2}\\;  \       | \dfrac 1 2\;1\tfrac 1 2\;{1 \atop 2}\;           |                 |
| {a \brace b} \\; {a \brack b}                      | {a \brace b} \; {a \brack b}$                    |                 |
+----------------------------------------------------+--------------------------------------------------+-----------------+
| \genfrac \\{ ]{0.8pt}{0}{a}{b}\\;  \               | $\genfrac \{ ]{0.8pt}{0}{a}{b}\;                 | ![Fractions2][] |
| {a \above1.0pt b} \\; \                            | {a \above1.0pt b} \;                             |                 |
| \cfrac{1}{1+\cfrac{1}{x}} \                        | \cfrac{1}{1+\cfrac{1}{x}}                        |                 |
| \xrightarrow[\dfrac g h]{\displaystyle\frac g h} \ | \xrightarrow[\dfrac g h]{\displaystyle\frac g h} |                 |
| \\; \xrightarrow [2.\\, \dfrac c d] \              | \; \xrightarrow [2.\, \dfrac c d]                |                 |
| {1.\\, \displaystyle\frac c d}                     | {1.\, \displaystyle\frac c d}$                   |                 |
+----------------------------------------------------+--------------------------------------------------+-----------------+

[Fractions1]: images/Fractions1.svg
[Fractions2]: images/Fractions2.svg

#### Functions

+---------------------+------------------------+------------------------------------+
| \sin\cos\tan\ln\log | $\sin\cos\tan\ln\log$  | ![functions](images/functions.svg) |
+---------------------+------------------------+------------------------------------+

#### Gather

+--------------------+------------------+------------------------------+
| \begin{gather} \   | $$\begin{gather} | ![gather](images/gather.svg) |
| a=\frac 1 2 \\\\ \ |   a=\frac 1 2 \\ |                              |
| e=b+c \            |   e=b+c          |                              |
| \end{gather}       | \end{gather}$$   |                              |
+--------------------+------------------+------------------------------+
{colWidths="null 150 null"}

#### GreekLetters

+-------------------------+----------------------------+----------------------------+
| \alpha\beta\gamma\omega | $\alpha\beta\gamma\omega$  | ![greek](images/greek.svg) |
+-------------------------+----------------------------+----------------------------+

#### GreekUnicode

+--------------------------------------------+-----------------------------------------------+
| \frac{αβγδεϵζηθϑικλμνξοπϖρϱςστυφϕχψω} \    | $\frac{αβγδεϵζηθϑικλμνξοπϖρϱςστυφϕχψω}        |
| {ΓΔΘΞΠΣΦΨΩϝ\mathbf{Ω}\mathbf{\Omega}}      |        {ΓΔΘΞΠΣΦΨΩϝ\mathbf{Ω}\mathbf{\Omega}}$ |
+--------------------------------------------+-----------------------------------------------+

#### HorizontalBraces

+------------------------------------------------+-----------------------------------------------+-----------------------+
| \overbrace{\displaystyle{ \                    | $\overbrace{\displaystyle{                    | ![HorizontalBraces][] |
| `\oint_S{\vec E\cdot\hat n\,\mathrm d a}}}^` \ | \oint_S{\vec E\cdot\hat n\,\mathrm d a}}}^    |                       |
| \text{emf} = \                                 | \text{emf} =                                  |                       |
| `\underbrace{\frac{q_{` \                      | \underbrace{\frac{q_{                         |                       |
| `\text{enc}}}{\varepsilon_0}}_{\text{charge}}` | \text{enc}}}{\varepsilon_0}}_{\text{charge}}$ |                       |
+------------------------------------------------+-----------------------------------------------+-----------------------+

[HorizontalBraces]: images/HorizontalBraces.svg

#### HTML

+-----------------------------------+--------------------------------------+-----+
| \id{a}{a+}b\style{color:red;}{+c} | $\id{a}{a+}b\style{color:red;}{+c}$  | N/A |
+-----------------------------------+--------------------------------------+-----+

#### Includegraphics

$\def\logo{\includegraphics[height=0.8em, totalheight=0.9em, width=0.9em, alt=sphere]{../docs/sphere.jpg}}
\def\logoB{\includegraphics[height=0.4em, totalheight=0.9em, width=0.9em, alt=sphere]{../docs/sphere.jpg}}
\begin{array}{l} \underline{A\logo} + \sqrt{\logo} + \tfrac{A\logo}{\logo}\\[1em] \underline{A\logoB} + \sqrt{x\logoB} + \tfrac{A\logoB}{\logoB} \end{array}$

#### Integrands

+------------------------------------+----------------------------------+--------------------------------------+
| \begin{array}{l} \                 | $\begin{array}{l}                | ![Integrands](images/Integrands.svg) |
| \displaystyle \int + \oint + \     | \displaystyle \int + \oint +     |                                      |
| `\iint + \oiint_i^n \\` \          | \iint + \oiint_i^n \\            |                                      |
| \displaystyle \iiint + \oiiint + \ | \displaystyle \iiint + \oiiint + |                                      |
| `\textstyle \int + \oint_i^n \\` \ | \textstyle \int + \oint_i^n \\   |                                      |
| \iint + \oiint + \                 | \iint + \oiint +                 |                                      |
| \iiint + \oiiint \end{array}       |  \iiint + \oiiint \end{array}$   |                                      |
+------------------------------------+----------------------------------+--------------------------------------+

#### Kern

+----------------------------+-----------------------------+--------------------------+
| \frac{a\kern{1em}b}{c}a \  | $\frac{a\kern{1em}b}{c}a    | ![kern](images/kern.svg) |
| \kern{1em}b \              |  \kern{1em}b                |                          |
| \kern{1ex}c\kern{-0.25em}d | \kern{1ex}c\kern{-0.25em}d$ |                          |
+----------------------------+-----------------------------+--------------------------+


#### Lap

+----------------------------------------------------+--------------------------------------------------+----------+
| \begin{array}{l} \                                 | $\begin{array}{l}                                | ![lap][] |
| ab\mathllap{f}cd\mathrlap{g}hij\mathclap{k}lm \; \ | ab\mathllap{f}cd\mathrlap{g}hij\mathclap{k}lm \; |          |
| ab\llap{f}cd\rlap{g}hij\clap{k}lm \\\\ \           | ab\llap{f}cd\rlap{g}hij\clap{k}lm \\             |          |
| \mathrlap{\frac a b}\frac a b \\\\ \               | \mathrlap{\frac a b}{\frac a b} \\               |          |
| \mathrlap{\overbrace{ \                            | \mathrlap{\overbrace{                            |          |
| `\phantom{a_0+a_1+a_2}}^m}a_0+a_1+a_2` \           | \phantom{a_0+a_1+a_2}}^m}a_0+a_1+a_2             |          |
| \end{array}                                        | \end{array}$                                     |          |
+----------------------------------------------------+--------------------------------------------------+----------+

[lap]: images/lap.svg

#### LargeRuleNumerator

+--------------------------+--------------------------+------------------------------------------------------+
| \frac{\textcolor{blue} \ | $\frac{\textcolor{blue}  | ![LargeRuleNumerator](images/LargeRuleNumerator.svg) |
|   {\rule{1em}{2em}}}{x}  |   {\rule{1em}{2em}}}{x}$ |                                                      |
+--------------------------+--------------------------+------------------------------------------------------+

#### LaTeX

+----------------------------+-------------------------------+----------------------------+
| \text{\LaTeX}, \text{\TeX} | $\text{\LaTeX}, \text{\TeX}$  | ![latex](images/latex.svg) |
+----------------------------+-------------------------------+----------------------------+

#### LeftRight

+----------------------------------+----------------------------------+------------------------------------+
| \left( x^2 \right) \             | $\left( x^2 \right)              | ![LeftRight](images/LeftRight.svg) |
| \left\\{ x^{x^{x^{x^x}}} \right. | \left\{ x^{x^{x^{x^x}}} \right.$ |                                    |
+----------------------------------+----------------------------------+------------------------------------+

#### LeftRightListStyling

+----------------------+-------------------------+----------------------------------------------------------+
| a+\left(x+y\right)-x | $a+\left(x+y\right)-x$  | ![LeftRightListStyling](images/LeftRightListStyling.svg) |
+----------------------+-------------------------+----------------------------------------------------------+

#### LeftRightMiddle

+----------------------------------------+----------------------------------------+----------------------+
| \left( x^2 \middle/ \right)  \         | $\left( x^2 \middle/ \right)           | ![LeftRightMiddle][] |
| \left\\{ x^{x^{x^{x^x}}}  \            |  \left\{ x^{x^{x^{x^x}}}               |                      |
|   \middle/ y \right. \                 |   \middle/ y \right.                   |                      |
| \left(x\middle|y\\,\middle|\\,z\right) |  \left(x\middle|y\,\middle|\,z\right)$ |                      |
+----------------------------------------+----------------------------------------+----------------------+

[LeftRightMiddle]: images/LeftRightMiddle.svg

#### LeftRightStyleSizing

+----------------------------------------+-----------------------------------------+---------------------------+
| +\left\\{\rule{0.1em}{1em}\right. \    | $+\left\{\rule{0.1em}{1em}\right.       | ![LeftRightStyleSizing][] |
| x^{+\left\\{\rule{0.1em}{1em}\right. \ |  x^{+\left\{\rule{0.1em}{1em}\right.    |                           |
| x^{+\left\\{\rule{0.1em}{1em}\right.}} |  x^{+\left\{\rule{0.1em}{1em}\right.}}$ |                           |
+----------------------------------------+-----------------------------------------+---------------------------+

[LeftRightStyleSizing]: images/LeftRightStyleSizing.svg

#### LimitControls

+-------------------------------------------+------------------------------------------+--------------------+
| `\displaystyle\int\limits_2^3 3x^2\,dx` \ | $\displaystyle\int\limits_2^3 3x^2\,dx   | ![LimitControls][] |
| `+ \sum\nolimits^n_{i=1}i + ` \           |  + \sum\nolimits^n_{i=1}i +              |                    |
| `\textstyle\int\limits_x^y z `            |  \textstyle\int\limits_x^y z$            |                    |
+-------------------------------------------+------------------------------------------+--------------------+

[LimitControls]: images/LimitControls.svg

#### LowerAccent

+--------------------------------------------------------+------------------------------------------------------+
| \begin{array}{l} \                                     | $\begin{array}{l}                                    |
| \underleftarrow{AB} \quad \underrightarrow{AB} \quad \ | \underleftarrow{AB} \quad \underrightarrow{AB} \quad |
| \underleftrightarrow{AB} \quad \undergroup{AB} \\\\ \  | \underleftrightarrow{AB} \quad \undergroup{AB} \\    |
| \text{\underline{text}} \quad \utilde{AB} \            | \text{\underline{text}} \quad \utilde{AB}            |
| \quad \underrightarrow{AB} \\\\ \                      | \quad \underrightarrow{AB} \\                        |
| \underrightarrow{F} + \underrightarrow{AB} + \         | \underrightarrow{F} + \underrightarrow{AB} +         |
| \underrightarrow{AB}^2 + \underrightarrow{AB}_2 \\\\ \ | \underrightarrow{AB}^2 + \underrightarrow{AB}_2 \\   |
| \frac{\underrightarrow{AB}}{\underrightarrow{AB}} + \  | \frac{\underrightarrow{AB}}{\underrightarrow{AB}} +  |
| \sqrt{\underrightarrow{AB}} + \                        | \sqrt{\underrightarrow{AB}} +                        |
| \left\lvert\underrightarrow{AB}\right\rvert \          | \left\lvert\underrightarrow{AB}\right\rvert          |
| \end{array}                                            |  \end{array}$                                        |
+--------------------------------------------------------+------------------------------------------------------+

#### MathChoice

+---------------------------------------------------+------------------------------------------------+-----------------+
| {\displaystyle\mathchoice{D}{T}{S}{SS}}\\; \      | ${\displaystyle\mathchoice{D}{T}{S}{SS}}\;     | ![MathChoice][] |
| {\textstyle\mathchoice{D}{T}{S}{SS}}\\; \         | {\textstyle\mathchoice{D}{T}{S}{SS}}\;         |                 |
| {\scriptstyle \mathchoice{D}{T}{S}{SS}}\\; \      | {\scriptstyle \mathchoice{D}{T}{S}{SS}}\;      |                 |
| {\scriptscriptstyle\mathchoice{D}{T}{S}{SS}}\\; \ | {\scriptscriptstyle\mathchoice{D}{T}{S}{SS}}\; |                 |
| \displaystyle X\_{\mathchoice{D}{T}{S}{SS}\_ \    | \displaystyle X_{\mathchoice{D}{T}{S}{SS}_     |                 |
| {\mathchoice{D}{T}{S}{SS}}}                       | {\mathchoice{D}{T}{S}{SS}}}$                   |                 |
+---------------------------------------------------+------------------------------------------------+-----------------+

[MathChoice]: images/MathChoice.svg

#### MathDefaultFonts

+---------------------------------+------------------------------------+
| Ax2k\breve{a}\omega\Omega\imath | $Ax2k\breve{a}\omega\Omega\imath$  |
+---------------------------------+------------------------------------+

#### MathBb

+------------------------------------------+---------------------------------------------+
| \mathbb{Ax2k\breve{a}\omega\Omega\imath} | $\mathbb{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### MathBf

+------------------------------------------+---------------------------------------------+
| \mathbf{Ax2k\breve{a}\omega\Omega\imath} | $\mathbf{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### MathCal

+-------------------------------------------+----------------------------------------------+
| \mathcal{Ax2k\breve{a}\omega\Omega\imath} | $\mathcal{Ax2k\breve{a}\omega\Omega\imath}$  |
+-------------------------------------------+----------------------------------------------+

#### MathFrak

+--------------------------------------------+-----------------------------------------------+
| \mathfrak{Ax2k\breve{a}\omega\Omega\imath} | $\mathfrak{Ax2k\breve{a}\omega\Omega\imath}$  |
+--------------------------------------------+-----------------------------------------------+

#### MathIt

+------------------------------------------+---------------------------------------------+
| \mathit{Ax2k\breve{a}\omega\Omega\imath} | $\mathit{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### MathNormal

+----------------------------------------------+-------------------------------------------------+
| \mathnormal{Ax2k\breve{a}\omega\Omega\imath} | $\mathnormal{Ax2k\breve{a}\omega\Omega\imath}$  |
+----------------------------------------------+-------------------------------------------------+

#### MathOp

+--------------------------------------+--------------------------------------+------------------------------+
| a\mathop+b\mathop:c\mathop{\delta} \ | $a\mathop+b\mathop:c\mathop{\delta}  | ![mathop](images/mathop.svg) |
| e\mathop{\textrm{and}}f \            |  e\mathop{\textrm{and}}f             |                              |
| \mathrel{\mathop{:}}=g\sin h         |  \mathrel{\mathop{:}}=g\sin h$       |                              |
+--------------------------------------+--------------------------------------+------------------------------+

#### MathRm

+------------------------------------------+---------------------------------------------+
| \mathrm{Ax2k\breve{a}\omega\Omega\imath} | $\mathrm{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### MathSf

+------------------------------------------+---------------------------------------------+
| \mathsf{Ax2k\breve{a}\omega\Omega\imath} | $\mathsf{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### MathScr

+-------------------------------------------+----------------------------------------------+
| \mathscr{Ax2k\breve{a}\omega\Omega\imath} | $\mathscr{Ax2k\breve{a}\omega\Omega\imath}$  |
+-------------------------------------------+----------------------------------------------+

#### MathtoolsMatrix

+-----------------------+----------------------+------------------------------------------------+
| \begin{matrix*}[l] \  | $\begin{matrix*}[l]  | ![MathtoolsMatrix](images/MathtoolsMatrix.svg) |
|  a & -1 \\\\ \        |  a & -1 \\           |                                                |
|  -1 & d \             |  -1 & d              |                                                |
| \end{matrix*} \\; \   | \end{matrix*} \;     |                                                |
| \begin{pmatrix*}[r] \ | \begin{pmatrix*}[r]  |                                                |
|  a & -1 \\\\ \        | a & -1 \\            |                                                |
|  -1 & d \             | -1 & d               |                                                |
| \end{pmatrix*}        |  \end{pmatrix*}$     |                                                |
+-----------------------+----------------------+------------------------------------------------+

#### MathTt

+------------------------------------------+---------------------------------------------+
| \mathtt{Ax2k\breve{a}\omega\Omega\imath} | $\mathtt{Ax2k\breve{a}\omega\Omega\imath}$  |
+------------------------------------------+---------------------------------------------+

#### Mod

+-------------------------------------------+---------------------------------------+------------------------+
| \begin{array}{cc}                         | $\begin{array}{cc}                    | ![mod](images/mod.svg) |
|  a \bmod 2 & b \pod 3 \\\\ \              | a \bmod 2 & b \pod 3 \\               |                        |
|  c \pmod{4} & d \mod{56} \\\\ \           | c \pmod{4} & d \mod{56} \\            |                        |
|  \displaystyle a\bmod 2 & b \pod 3 \\\\ \ | \displaystyle a\bmod 2 & b \pod 3 \\  |                        |
|  \displaystyle c\pmod{4} & d \mod{56} \   | \displaystyle c\pmod{4} &  d \mod{56} |                        |
| \end{array}                               | \end{array}$                          |                        |
+-------------------------------------------+---------------------------------------+------------------------+

#### NegativeSpace

+-------------------------+----------------------------+--------------------------------------------+
| \boxed{\$1,\!000,\!000} | $\boxed{\$1,\!000,\!000}$  | ![NegativeSpace](images/NegativeSpace.svg) |
+-------------------------+----------------------------+--------------------------------------------+

#### NestedFractions

+--------------------------------------+-------------------------------------+----------------------+
| \dfrac{\frac{a}{b}}{\frac{c}{d}} \   | $\dfrac{\frac{a}{b}}{\frac{c}{d}}   | ![NestedFractions][] |
| \dfrac{\dfrac{a}{b}}{\dfrac{c}{d}} \ | \dfrac{\dfrac{a}{b}} {\dfrac{c}{d}} |                      |
| \frac{\frac{a}{b}}{\frac{c}{d}}      | \frac{\frac{a}{b}}{\frac{c}{d}}$    |                      |
+--------------------------------------+-------------------------------------+----------------------+

[NestedFractions]: images/NestedFractions.svg

#### NewLine

+--------------------------------+--------------------------------+--------------------------------+
| \frac{a^2+b^2}{c^2} \newline \ | $\frac{a^2+b^2}{c^2} \newline  | ![newline](images/newline.svg) |
| \frac{a^2+b^2}{c^2} \\\\ \     | \frac{a^2+b^2}{c^2} \\         |                                |
| \begin{pmatrix} a & b \\\\ \   | \begin{pmatrix} a & b \\       |                                |
| c & d \cr \end{pmatrix} \\\\ \ | c & d \cr \end{pmatrix} \\     |                                |
|  a+b+c+{d+\\\\e}+f+g           | a+b+c+{d+\\e}+f+g$             |                                |
+--------------------------------+--------------------------------+--------------------------------+

#### Not

+--------------------------------------------------------+----------------------------------------------------+----------+
| \not = \begin{array}{l} \                              | $\not = \begin{array}{l}                           | ![not][] |
| \not=\not>\not\geq\not\in\not<\not\leq\not{abc} \\\\ \ | \not=\not>\not\geq\not\in\not<\not\leq\not{abc} \\ |          |
|  \not xy + ab \not xy \\\\ \                           | \not xy + ab \not xy \\                            |          |
|  a \neq b \notin c \end{array}                         | a \neq b \notin c \end{array}$                     |          |
+--------------------------------------------------------+----------------------------------------------------+----------+

[not]: images/not.svg

#### NullDelimiterInteraction

+---------------------------------------+------------------------------------------+-------------------------------+
| a \bigl. + 2 \quad \left. + a \right) | $a \bigl. + 2 \quad \left. + a \right)$  | ![NullDelimiterInteraction][] |
+---------------------------------------+------------------------------------------+-------------------------------+

[NullDelimiterInteraction]: images/NullDelimiterInteraction.svg

#### OldFont

+------------------------------------------------------+--------------------------------------------------+--------------+
| \begin{matrix} \                                     | $\begin{matrix}                                  | ![oldfont][] |
| \rm rm & it & \it it &  \                            | \rm rm & it & \it it &                           |              |
| \bf bf & \sf sf & \tt tt \\\\ \                      | \bf bf & \sf sf & \tt tt \\                      |              |
| \text{\rm rm} & \text{rm} & \text{\it it} & \        | \text{\rm rm} & \text{rm} & \text{\it it} &      |              |
| \text{\bf bf} & \text{\sf sf} & \text{\tt tt} \\\\ \ | \text{\bf bf} & \text{\sf sf} & \text{\tt tt} \\ |              |
| i\rm r\it i & \text{r\it i\rm r} \                   |  i\rm r\it i & \text{r\it i\rm r}                |              |
| \end{matrix}                                         | \end{matrix}$                                    |              |
+------------------------------------------------------+--------------------------------------------------+--------------+

[oldfont]: images/oldfont.svg

#### OperatorName

+----------------------------------------------+------------------------------------------+-------------------+
| \begin{matrix}                               | $\begin{matrix}                          | ![OperatorName][] |
| \operatorname g (z) + 5\operatorname{g}z \   | \operatorname g (z) + 5\operatorname{g}z |                   |
| + \operatorname{Gam-ma}(z) \\\\ \            |  + \operatorname{Gam-ma}(z) \\           |                   |
|  \operatorname{Gam ma}(z) \                  | \operatorname{Gam ma}(z)                 |                   |
| + \operatorname{\Gamma}(z) \                 | + \operatorname{\Gamma}(z)               |                   |
| + \operatorname{}x \\\\ \                    | + \operatorname{}x \\                    |                   |
| \operatorname*{asin} x + \                   | \operatorname*{asin} x +                 |                   |
| \operatorname*{asin}\_y x + \                | \operatorname*{asin}_y x +               |                   |
| \operatorname*{asin}\limits\_y x \\\\ \      | \operatorname*{asin}\limits_y x \\       |                   |
| {\displaystyle \operatorname*{asin}\_y x} \  | {\displaystyle \operatorname*{asin}_y x} |                   |
| \end{matrix}                                 | \end{matrix}$                            |                   |
+----------------------------------------------+------------------------------------------+-------------------+

[OperatorName]: images/OperatorName.svg

#### OpLimits

+--------------------------------------------------------------+----------------------------------------------------------+---------------+
| \begin{matrix} \                                             |  $\begin{matrix}                                         |               |
| {\sin\_2^2 \lim\_2^2 \int\_2^2 \sum\_2^2} \                  | {\sin_2^2 \lim_2^2 \int_2^2 \sum_2^2}                    | ![OpLimits][] |
| `{\displaystyle \lim_2^2 \int_2^2 \intop_2^2 \sum_2^2} \\` \ | {\displaystyle \lim_2^2 \int_2^2 \intop_2^2 \sum_2^2} \\ |               |
| \limsup\_{x \rightarrow \infty} x \stackrel{?}= \            | \limsup_{x \rightarrow \infty} x \stackrel{?}=           |               |
| \liminf\_{x \rightarrow \infty} x \\\\ \                     | \liminf_{x \rightarrow \infty} x \\                      |               |
| {\displaystyle \limsup\_{x \rightarrow \infty} \             | {\displaystyle \limsup_{x \rightarrow \infty}            |               |
| `x\:\: \sum_{\substack{0<i<m\\0<j<n}}} \end{matrix}`         | x\:\: \sum_{\substack{0<i<m\\0<j<n}}} \end{matrix}$      |               |
+--------------------------------------------------------------+----------------------------------------------------------+---------------+

[OpLimits]: images/OpLimits.svg

#### OverUnderline

+--------------------------------------------------+------------------------------------------------+--------------------+
| x\underline{x}\underline{\underline{x}} \        | $x\underline{x}\underline{\underline{x}}       | ![OverUnderline][] |
| \underline{x_{x_{x_x}}}\underline{x^{x^{x^x}}} \ | \underline{x_{x_{x_x}}}\underline{x^{x^{x^x}}} |                    |
| \overline{x}\overline{x}\overline{x^{x^{x^x}}} \ | \overline{x}\overline{x}\overline{x^{x^{x^x}}} |                    |
| \textcolor{blue}{\overline{\underline{x}} \      | \textcolor{blue}{\overline{\underline{x}}      |                    |
| \underline{\overline{x}}}                        | \underline{\overline{x}}}$                     |                    |
+--------------------------------------------------+------------------------------------------------+--------------------+

[OverUnderline]: images/OverUnderline.svg

#### OverUnderset

+------------------------------------------------+--------------------------------------------+-------------------+
| \begin{array}{l} \                             | $\begin{array}{l}                          | ![OverUnderset][] |
| x\overset?=1 \quad \underset{\*}{x}^2 \quad \  | x\overset?=1 \quad \underset{*}{x}^2 \quad |                   |
| \overset{a}{b}b\underset{a}{b}b \\\\ \         | \overset{a}{b}b\underset{a}{b}b \\         |                   |
| {\displaystyle\lim_{t\underset{>0}\to0}}\\\\ \ | {\displaystyle\lim_{t\underset{>0}\to0}}\\ |                   |
| a+b+c+d\overset{b+c=0} \                       | a+b+c+d\overset{b+c=0}                     |                   |
| \longrightarrow a+d\\\\ \                      | \longrightarrow a+d\\                      |                   |
| \overset { x = y } { \sqrt { a b } } \         | \overset { x = y } { \sqrt { a b } }       |                   |
| \end{array}                                    | \end{array}$                               |                   |
+------------------------------------------------+--------------------------------------------+-------------------+

[OverUnderset]: images/OverUnderset.svg

#### Phantom

+-------------------------------------------------------+---------------------------------------------------+--------------+
| \begin{array}{l}                                      | $\begin{array}{l}                                 | ![phantom][] |
| \dfrac{1+\phantom{x^{\textcolor{blue}{2}}} = x} \     | \dfrac{1+\phantom{x^{\textcolor{blue}{2}}} = x}   |              |
| {1+x^{\textcolor{blue}{2}} = x} \                     | {1+x^{\textcolor{blue}{2}} = x}                   |              |
| \left(\vphantom{\int_t} zzz \right) \                 | \left(\vphantom{\int_t} zzz \right)               |              |
| \left( X \hphantom{\frac{\frac X X}{X}} \right)\\\\ \ | \left( X \hphantom{\frac{\frac X X}{X}} \right)\\ |              |
| \text{a \phantom{123}} b \hphantom{\frac{1}{2}}=c \   | \text{a \phantom{123}} b \hphantom{\frac{1}{2}}=c |              |
| \vphantom{101112} d \\\\ \                            | \vphantom{101112} d \\                            |              |
| \sqrt{\mathstrut a} + \sqrt{\mathstrut d} \           | \sqrt{\mathstrut a} + \sqrt{\mathstrut d}         |              |
| \end{array}                                           | \end{array}$                                      |              |
+-------------------------------------------------------+---------------------------------------------------+--------------+

[phantom]: images/phantom.svg

#### Pmb

+----------------------------------+-------------------------------------+------------------------+
| \mu\pmb{\mu}\pmb{=}\mu\pmb{+}\mu | $\mu\pmb{\mu}\pmb{=}\mu\pmb{+}\mu$  | ![pmb](images/pmb.svg) |
+----------------------------------+-------------------------------------+------------------------+

#### PrimeSpacing

+------------------+-------------------+------------------------------------------+
| `f'+f_2'+f^{f'}` | $f'+f_2'+f^{f'}$  | ![PrimeSpacing](images/PrimeSpacing.svg) |
+------------------+-------------------+------------------------------------------+

#### PrimeSuper

+-----------------------------+------------------------------+--------------------------------------+
| `x'^2+x'''^2+x'^2_3+x_3'^2` | $x'^2+x'''^2+x'^2_3+x_3'^2$  | ![PrimeSuper](images/PrimeSuper.svg) |
+-----------------------------+------------------------------+--------------------------------------+

#### Raisebox

+-------------------------------------------------+--------------------------------------------------+---------------+
| \frac{a}{a\raisebox{0.5em}{b}} \cdot \          | $\frac{a}{a\raisebox{0.5em}{b}} \cdot            | ![raisebox][] |
| \frac{a\raisebox{-0.5em}{b}}{a} \cdot \         | \frac{a\raisebox{-0.5em}{b}}{a} \cdot            |               |
| \sqrt{a\raisebox{0.5em}{b}} \cdot \             | \sqrt{a\raisebox{0.5em}{b}} \cdot                |               |
| \sqrt{a\raisebox{-0.5em}{b}} \cdot \            | \sqrt{a\raisebox{-0.5em}{b}} \cdot               |               |
| \sqrt{a\raisebox{0.5em}{b}\raisebox{-0.5em}{b}} | \sqrt{a\raisebox{0.5em}{b}\raisebox{-0.5em}{b}}$ |               |
+-------------------------------------------------+--------------------------------------------------+---------------+

[raisebox]: images/raisebox.svg

#### RelativeUnits

+------------------------------------------------+----------------------------------------------+--------------------+
| \begin{array}{ll} \                            | $\begin{array}{ll}                           | ![RelativeUnits][] |
| a\kern1emb^{a\kern1emb^{a\kern1emb}} & \       | a\kern1emb^{a\kern1emb^{a\kern1emb}} &       |                    |
| {\footnotesize a\kern1emb^ \                   | {\footnotesize a\kern1emb^                   |                    |
| {a\kern1emb^{a\kern1emb}}} \\\\ \              | {a\kern1emb^{a\kern1emb}}} \\                |                    |
| a\mkern18mub^{a\mkern18mub^{a\mkern18mub}} & \ | a\mkern18mub^{a\mkern18mub^{a\mkern18mub}} & |                    |
| {\footnotesize a\mkern18mub^ \                 | {\footnotesize a\mkern18mub^{a\mkern18mub^   |                    |
| {a\mkern18mub^{a\mkern18mub}}} \\\\ \          | {a\mkern18mub}}} \\                          |                    |
| \end{array}                                    | \end{array}$                                 |                    |
+------------------------------------------------+----------------------------------------------+--------------------+

[RelativeUnits]: images/RelativeUnits.svg

#### RlapBug

+-------------------------+---------------------------+--------------------------------+
| \frac{\mathrlap{x}}{2}  | $\frac{\mathrlap{x}}{2}$  | ![rlapbug](images/rlapbug.svg) |
+-------------------------+---------------------------+--------------------------------+

#### Rule

+------------------------------------+-------------------------------------+--------------------------+
| \rule{1em}{0.5em}\rule{1ex}{2ex} \ | $\rule{1em}{0.5em}\rule{1ex}{2ex}   | ![rule](images/rule.svg) |
| \rule{1em}{1ex}\rule{1em}{0.431ex} | \rule{1em}{1ex}\rule{1em}{0.431ex}$ |                          |
+------------------------------------+-------------------------------------+--------------------------+

#### SizingBaseline

+----------------------------------+-------------------------------------+----------------------------------------------+
| \text{{\tiny a+b}a+b{\Huge a+b}} | $\text{{\tiny a+b}a+b{\Huge a+b}}$  | ![SizingBaseline](images/SizingBaseline.svg) |
+----------------------------------+-------------------------------------+----------------------------------------------+

#### Sizing

+-----------------------------------+---------------------------------+------------------------------+
| \text{{\Huge x}{\LARGE y} \       | $\text{{\Huge x}{\LARGE y}      | ![sizing](images/sizing.svg) |
| {\normalsize z}{\scriptsize w}} \ | {\normalsize z}{\scriptsize w}} |                              |
| \sqrt[\text{\small 3}]{x+1}       | \sqrt[\text{\small 3}]{x+1}$    |                              |
+-----------------------------------+---------------------------------+------------------------------+

#### Smash

+-------------------------------+-------------------------------+----------------------------+
| \left( X^{\smash 2} \right) \ | $\left( X^{\smash 2} \right)  | ![smash](images/smash.svg) |
| \sqrt{\smash[b]{y=}}          | \sqrt{\smash[b]{y=}}$         |                            |
+-------------------------------+-------------------------------+----------------------------+

#### Spacing

+--------------------------------------------+----------------------------------------+--------------+
| \begin{matrix} \                           | $\begin{matrix}                        | ![spacing][] |
| `^3+[-1][1-1]1=1(=1)\lvert a\rvert~b \\` \ | ^3+[-1][1-1]1=1(=1)\lvert a\rvert~b \\ |              |
| `\scriptstyle{^3+[-1][1-1]` \              | \scriptstyle{^3+[-1][1-1]              |              |
| 1=1(=1)\lvert a\rvert~b} \\\\ \            | 1=1(=1)\lvert a\rvert~b} \\            |              |
| `\scriptscriptstyle{^3+[-1][1-1]` \        | \scriptscriptstyle{^3+[-1][1-1]        |              |
| 1=1(=1)\lvert a\rvert~b} \\\\ \            | 1=1(=1)\lvert a\rvert~b} \\            |              |
| a : a \colon a \\\\ \                      | a : a \colon a \\                      |              |
|  \end{matrix}                              | \end{matrix}$                          |              |
+--------------------------------------------+----------------------------------------+--------------+

[spacing]: images/spacing.svg

#### Sqrt

+------------------------------------------------+----------------------------------------------+-----------+
| \sqrt{\sqrt{\sqrt{x}}}\_ \                     | $\sqrt{\sqrt{\sqrt{x}}}_                     | ![sqrt][] |
| {\sqrt{\sqrt{x}}}^ \                           | {\sqrt{\sqrt{x}}}^                           |           |
| {\sqrt{\sqrt{\sqrt{x}}} \                      | {\sqrt{\sqrt{\sqrt{x}}}                      |           |
| ^{\sqrt{\sqrt{\sqrt{x}}}}} \\\\ \              | ^{\sqrt{\sqrt{\sqrt{x}}}}} \\                |           |
| \sqrt{\frac{\frac{A}{B}}{\frac{A}{B}}} \\; \   | \sqrt{\frac{\frac{A}{B}}{\frac{A}{B}}} \;    |           |
| \sqrt{\frac{\frac{\frac{A}{B}}{\frac{A}{B}}} \ | \sqrt{\frac{\frac{\frac{A}{B}}{\frac{A}{B}}} |           |
| {\frac{\frac{A}{B}}{\frac{A}{B}}}}             | {\frac{\frac{A}{B}}{\frac{A}{B}}}}$          |           |
+------------------------------------------------+----------------------------------------------+-----------+

[sqrt]: images/sqrt.svg

#### SqrtRoot

+------------------------------------------------------+--------------------------------------------------+---------------+
| \begin{array}{l} \                                   | $\begin{array}{l}                                | ![SqrtRoot][] |
| 1+\sqrt[3]{2}+\sqrt[1923^234] \                      | 1+\sqrt[3]{2}+\sqrt[1923^234]                    |               |
| {2^{2^{2^{2^{2^{2^{2^{2^{2^{2^{2^2}}}}}}}}}}} \\\\ \ | {2^{2^{2^{2^{2^{2^{2^{2^{2^{2^{2^2}}}}}}}}}}} \\ |               |
| \Huge \sqrt[3]{M} + x^{\sqrt[3] a} \                 | \Huge \sqrt[3]{M} + x^{\sqrt[3] a}               |               |
| \end{array}                                          | \end{array}$                                     |               |
+------------------------------------------------------+--------------------------------------------------+---------------+

[SqrtRoot]: images/SqrtRoot.svg

#### StackRel

+----------------------------+-----------------------------+----------------------------------+
| a \stackrel{?}{=} b \      | $a \stackrel{?}{=} b        | ![StackRel](images/StackRel.svg) |
| \stackrel{\text{def}}{=} c | \stackrel{\text{def}}{=} c$ |                                  |
+----------------------------+-----------------------------+----------------------------------+

#### StretchyAccent

+---------------------------------------------------------+--------------------------------------------------------+---------------------+
| \begin{array}{l} \                                      | $\begin{array}{l}                                      | ![StretchyAccent][] |
| \overrightarrow{AB} \quad \overleftarrow{AB} \quad \    | \overrightarrow{AB} \quad \overleftarrow{AB} \quad     |                     |
|  \overleftrightarrow{AB} \quad \                        | \overleftrightarrow{AB}  \quad                         |                     |
| \left(\underleftarrow{\frac{value}{j}}\right)  \\\\ \   | \left(\underleftarrow{\frac{value}{j}}\right)  \\      |                     |
| \widehat{ABC} \quad \                                   | \widehat{ABC} \quad                                    |                     |
| \widetilde{AB} \quad \widetilde{ABC} \\\\ \             | \widetilde{AB} \quad \widetilde{ABC} \\                |                     |
| \overrightarrow{F} + \overrightarrow{AB} + \            | \overrightarrow{F} + \overrightarrow{AB} +             |                     |
| \overrightarrow{F}^2 + \overrightarrow{F}\_2 + \        | \overrightarrow{F}^2 + \overrightarrow{F}_2 +          |                     |
| \overrightarrow{F}\_1^2 \\\\ \                          | \overrightarrow{F}_1^2 \\                              |                     |
| \overrightarrow{AB}^2+ \                                | \overrightarrow{AB}^2+                                 |                     |
| \frac{\overrightarrow{AB}}{\overrightarrow{AB}} + \     | \frac{\overrightarrow{AB}}{\overrightarrow{AB}} +      |                     |
| \sqrt{\overrightarrow{AB}} + \                          | \sqrt{\overrightarrow{AB}} +                           |                     |
| \left\lvert\overrightarrow{AB}\right\rvert              | \left\lvert\overrightarrow{AB}\right\rvert             |                     |
| \end{array}                                             | \end{array}$                                           |                     |
+---------------------------------------------------------+--------------------------------------------------------+---------------------+

[StretchyAccent]: images/StretchyAccent.svg

#### StrikeThrough

+-------------------------------------------+----------------------------------------+--------------------+
| \begin{array}{l} \                        | $\begin{array}{l}                      | ![StrikeThrough][] |
| \cancel x \quad \cancel{2B} + \           | \cancel x \quad \cancel{2B} +          |                    |
| \bcancel 5 +\bcancel{5ay} \\\\ \          | \bcancel 5 +\bcancel{5ay} \\           |                    |
| \sout{5ab} + \sout{5ABC} + \              | \sout{5ab} + \sout{5ABC} +             |                    |
| \xcancel{\oint\_S{\vec E\cdot\hat n \     | \xcancel{\oint_S{\vec E\cdot\hat n     |                    |
| \\,\mathrm d a}} \\\\[0.3em] \            | \,\mathrm d a}} \\[0.3em]              |                    |
| \frac{x+\cancel B}{x+\cancel x} + \       | \frac{x+\cancel B}{x+\cancel x} +      |                    |
| \frac{x+\cancel y}{x} + \cancel{B}\_1^2 \ | \frac{x+\cancel y}{x} + \cancel{B}_1^2 |                    |
|  + \cancel{B^2} \\\\[0.2em] \             | + \cancel{B^2} \\[0.2em]               |                    |
| \left\lvert\cancel{ac}\right\rvert \      | \left\lvert\cancel{ac}\right\rvert     |                    |
| \end{array}                               | \end{array}$                           |                    |
+-------------------------------------------+----------------------------------------+--------------------+

[StrikeThrough]: images/StrikeThrough.svg

#### StrikeThroughColor

+----------------------------------------------------------+------------------------------------------------------+-------------------------+
| \begin{array}{l}                                         | $\begin{array}{l}                                    | ![StrikeThroughColor][] |
| \textcolor{red}{\cancel x \quad \cancel{2B}} \\\\ \      | \textcolor{red}{\cancel x \quad \cancel{2B}} \\      |                         |
| \textcolor{red}{\bcancel{\textcolor{black}{5}}} + \      | \textcolor{red}{\bcancel{\textcolor{black}{5}}} +    |                         |
| \textcolor{red}{\bcancel{\textcolor{black}{5ay}}} \\\\ \ | \textcolor{red}{\bcancel{\textcolor{black}{5ay}}} \\ |                         |
| \color{green}{\sout{5ABC}} \                             | \color{green}{\sout{5ABC}}                           |                         |
| \end{array}                                              |  \end{array}$                                        |                         |
+----------------------------------------------------------+------------------------------------------------------+-------------------------+

[StrikeThroughColor]: images/StrikeThroughColor.svg

#### StyleSpacing

+----------------------+------------------------+------------------------------------------+
| \scriptstyle ab\\;cd | $\scriptstyle ab\;cd$  | ![StyleSpacing](images/StyleSpacing.svg) |
+----------------------+------------------------+------------------------------------------+

#### StyleSwitching

+---------------------------------------+----------------------------------------+---------------------+
| a\cdot b\scriptstyle a\cdot ba \      | $a\cdot b\scriptstyle a\cdot ba        | ![StyleSwitching][] |
| \textstyle\cdot ba\scriptstyle\cdot b | \textstyle\cdot ba\scriptstyle\cdot b$ |                     |
+---------------------------------------+----------------------------------------+---------------------+

[StyleSwitching]: images/StyleSwitching.svg

#### SupSubCharacterBox

+------------------------------------------+-------------------------------------------+-------------------------+
| `a_2f_2{f}_2{aa}_2{af}_2\mathbf{y}_Ay_A` | $a_2f_2{f}_2{aa}_2{af}_2\mathbf{y}_Ay_A$  | ![SupSubCharacterBox][] |
+------------------------------------------+-------------------------------------------+-------------------------+

[SupSubCharacterBox]: images/SupSubCharacterBox.svg

#### SupSubHorizSpacing

+------------------------------------+----------------------------------+-------------------------+
| `x^{x^{x}}\Big|` \                 | $x^{x^{x}}\Big|                  | ![SupSubHorizSpacing][] |
| `x_{x_{x_{x_{x}}}}\bigg|` \        | x_{x_{x_{x_{x}}}}\bigg|          |                         |
| `x^{x^{x_{x_{x_{x_{x}}}}}}\bigg|`  | x^{x^{x_{x_{x_{x_{x}}}}}}\bigg|$ |                         |
+------------------------------------+----------------------------------+-------------------------+

[SupSubHorizSpacing]: images/SupSubHorizSpacing.svg

#### SupSubLeftAlignReset

+-------------------------------------------+----------------------------------------+---------------------------+
| \omega^8\_{888} \quad \                   | $\omega^8_{888} \quad                  | ![SupSubLeftAlignReset][] |
| \frac{1}{\hat{\omega}^{8}\_{888}} \quad \ | \frac{1}{\hat{\omega}^{8}_{888}} \quad |                           |
| \displaystyle\sum\_{\omega^{8}\_{888}}    | \displaystyle\sum_{\omega^{8}_{888}}$  |                           |
+-------------------------------------------+----------------------------------------+---------------------------+

[SupSubLeftAlignReset]: images/SupSubLeftAlignReset.svg

#### SupSubOffsets

+-------------------------------------+-------------------------------------+--------------------+
| \displaystyle \int_{2+3}x f^{2+3} \ | $\displaystyle \int_{2+3}x f^{2+3}  | ![SupSubOffsets][] |
| +3\lim\_{2+3+4+5}f                  | +3\lim_{2+3+4+5}f$                  |                    |
+-------------------------------------+-------------------------------------+--------------------+

[SupSubOffsets]: images/SupSubOffsets.svg

#### SurrogatePairs

|     Source            |    Temml               |
|-----------------------|------------------------|
| 𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜         | $𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜$        |
| 𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶          | $𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶$          |
| \text{𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜}  | $\text{𝐀𝐚𝟎𝐴𝑎𝑨𝒂𝔅𝔞𝔸𝒜}$ |
| \text{𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶}   | $\text{𝖠𝖺𝟢𝗔𝗮𝟬𝘈𝘢𝙰𝚊𝟶}$   |
| \mathrm{𝐀𝐚𝑨𝒂𝔅𝔞𝔸𝒜}   | $\mathrm{𝐀𝐚𝑨𝒂𝔅𝔞𝔸𝒜}$  |

#### Symbols1

+-------------------------------------------+-------------------------------------------+
| \maltese\degree\standardstate\pounds\\$ \ | $\maltese\degree\standardstate\pounds\$   |
| \text{\maltese\degree\pounds\textdollar}  | \text{\maltese\degree\pounds\textdollar}$ |
+-------------------------------------------+-------------------------------------------+

#### Tag

+-----------------------------------+---------------------------------------+
| \tag{$+$hi} \frac{x^2}{y}+x^{2^y} | $$\tag{$+$hi} \frac{x^2}{y}+x^{2^y}$$ |
+-----------------------------------+---------------------------------------+
{colWidths="null 200"}

#### Text

+----------------------------------+-------------------------------------+--------------------------+
| \frac{a}{b}\text{c~ {ab} \ e}+fg | $\frac{a}{b}\text{c~ {ab} \ e}+fg$  | ![text](images/text.svg) |
+----------------------------------+-------------------------------------+--------------------------+

#### TextSpace

+-------------------------------------+-------------------------------+------------------------------------+
| \begin{array}{l} \                  | $\begin{array}{l}             | ![TextSpace](images/TextSpace.svg) |
| \texttt{12345678901234} \\\\ \      | \texttt{12345678901234} \\    |                                    |
| \texttt{A test  1~~2 \ \\ 3} \\\\ \ | \texttt{A test  1~~2\ \ 3} \\ |                                    |
| \verb|A test 1  2  3| \             | \verb|A test 1  2  3|         |                                    |
| \end{array}                         | \end{array}$                  |                                    |
+-------------------------------------+-------------------------------+------------------------------------+

#### TextStacked

+------------------------------------+----------------------------------+------------------+
| \begin{matrix} \                   | $\begin{matrix}                  | ![TextStacked][] |
| \textsf{abc123 \textbf{abc123} \   | \textsf{abc123 \textbf{abc123}   |                  |
| \textit{abc123}}\\\\ \             | \textit{abc123}}\\               |                  |
| \text{abc123 \textbf{abc123} \     | \text{abc123 \textbf{abc123}     |                  |
| \textit{abc123}}\\\\ \             | \textit{abc123}}\\               |                  |
| \textrm{abc123 \textbf{abc123} \   | \textrm{abc123 \textbf{abc123}   |                  |
| \textit{abc123}}\\\\ \             | \textit{abc123}}\\               |                  |
| \textsf{\textrm{\textbf{abc123}} \ | \textsf{\textrm{\textbf{abc123}} |                  |
| \textbf{abc123}  \                 | \textbf{abc123}                  |                  |
| \textit{abc123}}\\\\ \             | \textit{abc123}}\\               |                  |
| \textit{abc123 \textbf{abc123} \   | \textit{abc123 \textbf{abc123}   |                  |
| \textsf{abc123}}\\\\ \             | \textsf{abc123}}\\               |                  |
| \end{matrix}                       | \end{matrix}$                    |                  |
+------------------------------------+----------------------------------+------------------+

[TextStacked]: images/TextStacked.svg

#### TextWithMath

+---------------------------------------------------+-----------------------------------------------+-------------------+
| \begin{matrix} \                                  | $\begin{matrix}                               | ![TextWithMath][] |
| \text{for $a < b$ and $ c < d $}. \\\\ \          | \text{for $a < b$ and $ c < d $}. \\          |                   |
| \textsf{for $a < b$ and $ c < d $}. \\\\ \        | \textsf{for $a < b$ and $ c < d $}. \\        |                   |
| \textsf{for $a < b \textbf{ and } c < d $} \\\\ \ | \textsf{for $a < b \textbf{ and } c < d $} \\ |                   |
| \text{\sf for $a < b$ and $c < d$.} \             | \text{\sf for $a < b$ and $c < d$.}           |                   |
| \end{matrix}                                      | \end{matrix}$                                 |                   |
+---------------------------------------------------+-----------------------------------------------+-------------------+

[TextWithMath]: images/TextWithMath.svg

#### Unicode

|        Source        |     Temml              |
|----------------------|------------------------|
| \text{ÀàÇçÉéÏïÖöÛû}  | $\text{ÀàÇçÉéÏïÖöÛû}$  |
| \text{БГДЖЗЙЛФЦШЫЮЯ} | $\text{БГДЖЗЙЛФЦШЫЮЯ}$ |
| \text{여보세요}       | $\text{여보세요}$      |
| \text{私はバナナです} | $\text{私はバナナです}$ |

#### Units

+------------------------------------------------+----------------------------------------------+------------+
| \begin{array}{ll} \                            | $\begin{array}{ll}                           | ![units][] |
| \mathrm H\kern 1em\mathrm H \                  | \mathrm H\kern 1em\mathrm H                  |            |
| \text{\tiny (1em)} & \                         | \text{\tiny (1em)} &                         |            |
| \mathrm H\kern 1ex\mathrm H \                  | \mathrm H\kern 1ex\mathrm H                  |            |
| \text{\tiny (1ex)} \\\\ \                      | \text{\tiny (1ex)} \\                        |            |
| \mathrm H{\scriptstyle \kern 1em}\mathrm H \   | \mathrm H{\scriptstyle \kern 1em}\mathrm H   |            |
| \text{\tiny (ss 1em)} & \                      | \text{\tiny (ss 1em)} &                      |            |
| \mathrm H{\scriptstyle \kern 1ex}\mathrm H \   | \mathrm H{\scriptstyle \kern 1ex}\mathrm H   |            |
| \text{\tiny (ss 1ex)} \\\\ \                   | \text{\tiny (ss 1ex)} \\                     |            |
| \mathrm H{\small \kern 1em}\mathrm H \         | \mathrm H{\small \kern 1em}\mathrm H         |            |
| \text{\tiny (sm 1em)} & \                      | \text{\tiny (sm 1em)} &                      |            |
| \mathrm H{\small \kern 1ex}\mathrm H \         | \mathrm H{\small \kern 1ex}\mathrm H         |            |
| \text{\tiny (sm 1ex)} \\\\ \                   | \text{\tiny (sm 1ex)} \\                     |            |
| \mathrm H\mkern 18mu\mathrm H \                | \mathrm H\mkern 18mu\mathrm H                |            |
| \text{\tiny (18mu)} & \                        | \text{\tiny (18mu)} &                        |            |
| \mathrm H\kern 1cm\mathrm H \                  | \mathrm H\kern 1cm\mathrm H                  |            |
| \text{\tiny (1cm)} \\\\ \                      | \text{\tiny (1cm)} \\                        |            |
| \mathrm H{\scriptstyle \mkern 18mu}\mathrm H \ | \mathrm H{\scriptstyle \mkern 18mu}\mathrm H |            |
| \text{\tiny (ss 18mu)} & \                     | \text{\tiny (ss 18mu)} &                     |            |
| \mathrm H{\scriptstyle \kern 1cm}\mathrm H \   | \mathrm H{\scriptstyle \kern 1cm}\mathrm H   |            |
| \text{\tiny (ss 1cm)} \\\\ \                   | \text{\tiny (ss 1cm)} \\                     |            |
| \mathrm H{\small \mkern 18mu}\mathrm H \       | \mathrm H{\small \mkern 18mu}\mathrm H       |            |
| \text{\tiny (sm 18mu)} & \                     | \text{\tiny (sm 18mu)} &                     |            |
| \mathrm H{\small \kern 1cm}\mathrm H \         | \mathrm H{\small \kern 1cm}\mathrm H         |            |
| \text{\tiny (sm 1cm)} \                        | \text{\tiny (sm 1cm)}                        |            |
| \end{array}                                    | \end{array}$                                 |            |
+------------------------------------------------+----------------------------------------------+------------+

[units]: images/units.svg

#### UnsupportedCmds

$\err\,\frac\fracerr3\,2^\superr_\suberr\,\sqrt\sqrterr$

deliberately does not compile

#### Verb

+-------------------------------------------------------+---------------------------------------------------+-----------+
| \begin{array}{ll} \                                   | $\begin{array}{ll}                                | ![verb][] |
| \verb \verb ,   & \verb|\verb  |, \\\\ \              | \verb \verb ,   & \verb|\verb  |, \\              |           |
| \verb* \verb* , & \verb*|\verb* |, \\\\ \             | \verb* \verb* , & \verb*|\verb* |, \\             |           |
| \verb!<x> & </y>! & \scriptstyle\verb|ss verb| \\\\ \ | \verb!<x> & </y>! & \scriptstyle\verb|ss verb| \\ |           |
| \verb*!<x> & </y>! & \small\verb|sm verb| \\\\ \      | \verb*!<x> & </y>! & \small\verb|sm verb| \\      |           |
| \verb|``---''~| \                                     | \verb|``---''~|                                   |           |
| \end{array}                                           | \end{array}$                                      |           |
+-------------------------------------------------------+---------------------------------------------------+-----------+

[verb]: images/verb.svg

</body>
</html>