<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Temml Mozilla Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="./temmlPostProcess.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(2),
    table tr > td:nth-of-type(5) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
    table tr > td:nth-of-type(4) { text-align: center; }
  </style>
</head>

<body>

# Mozilla Torture Test

This page reproduces the tests from \
https://www-archive.mozilla.org/projects/mathml/demo/texvsmml.xhtml and \
https://fred-wang.github.io/MathFonts/mozilla\_mathml\_test/

Images from LaTeX are also included for comparison.

<br>

+----+------------------------------+------------------------------+-----------+--------------+
|    | Source                       | Temml                        | LaTeX     | Comment      |
+====+==============================+==============================+===========+==============+
| 1  | x^2y^2                       | $$x^2y^2$$                   | ![ex1][]  | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 2  | \_2F\_3                      | $$_2F_3$$                    | ![ex2][]  | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 3  | x+y^2\over k+1               | $$x+y^2\over k+1$$           | ![ex3][]  | TeXbook p139 |
+----+------------------------------+------------------------------+-----------+--------------+
| 4  | x+y^{2\over k+1}             | $$x+y^{2\over k+1}$$         | ![ex4][]  | TeXbook p139 |
+----+------------------------------+------------------------------+-----------+--------------+
| 5  | a\over{b/2}                  | $$a\over{b/2}$$              | ![ex5][]  | TeXbook p139 |
+----+------------------------------+------------------------------+-----------+--------------+
| 6  | a\_0 + \cfrac{1}{a\_1 +  \   | $$a_0 + \cfrac{1}{a_1 +      | ![ex6][]  | TeXbook p142 |
|    | \cfrac{1}{a\_2 +  \          | \cfrac{1}{a_2 +              |           |              |
|    | \cfrac{1}{a\_3 +  \          | \cfrac{1}{a_3 +              |           |              |
|    | \cfrac{1}{a\_4}}}}           | \cfrac{1}{a_4}}}}$$          |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 7  | a\_0+{1\over a\_1+{1\over \  | $$a_0+{1\over a_1+{1\over    | ![ex7][]  | TeXbook p142 |
|    | a\_2+{1\over a\_3+ \         | a_2+{1\over a_3+             |           |              |
|    | {1\over a\_4}}}}             | {1\over a_4}}}}$$            |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 8  | n\choose {k / 2}             | $$n\choose {k / 2}$$         | ![ex8][]  | TeXbook p143 |
+----+------------------------------+------------------------------+-----------+--------------+
| 9  | {p \choose 2} x^2 y^{p-2} \  | $${p \choose 2} x^2 y^{p-2}  | ![ex9][]  | TeXbook p143 |
|    | - {1\over{1-x}} \            | - {1\over{1-x}}              |           |              |
|    | {1\over{1-x^2}}              | {1\over{1-x^2}}$$            |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 10 | \sum\_{\scriptstyle 0 \le\   | $$\sum_{\scriptstyle 0 \le   | ![ex10][] | TeXbook p145 |
|    | i \le m \atop \scriptstyle\  | i \le m \atop \scriptstyle   |           |              |
|    | 0 < j < n} P(i, j)           | 0 < j < n} P(i, j)$$         |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 11 | x^{2y}                       | $$x^{2y}$$                   | ![ex11][] | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 12 | \sum\_{i=1}^p \              | $$\sum_{i=1}^p               | ![ex12][] | TeXbook p145 |
|    | \sum\_{j=1}^q \              | \sum_{j=1}^q                 |           |              |
|    | \sum\_{k=1}^r \              | \sum_{k=1}^r                 |           |              |
|    | a\_{ij}b\_{jk}c\_{ki}        | a_{ij}b_{jk}c_{ki}$$         |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 13 | \sqrt{1+\sqrt{1+\sqrt{1+ \   | $$\sqrt{1+\sqrt{1+\sqrt{1+   | ![ex13][] | TeXbook p145 |
|    | \sqrt{1+\sqrt{1+\sqrt{1+ \   | \sqrt{1+\sqrt{1+\sqrt{1+     |           |              |
|    | \sqrt{1+x}}}}}}}             | \sqrt{1+x}}}}}}}$$           |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 14 | \bigg(\frac{\partial^2} \    | $$\bigg(\frac{\partial^2}    | ![ex14][] | TeXbook p147 |
|    | {\partial x^2} + \frac \     | {\partial x^2} + \frac       |           |              |
|    | {\partial^2}{\partial y^2}\  | {\partial^2}{\partial y^2}   |           |              |
|    | \bigg){\big\lvert\varphi \   | \bigg){\big\lvert\varphi     |           |              |
|    | (x+iy)\big\rvert}^2          | (x+iy)\big\rvert}^2$$        |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 15 | 2^{2^{2^x}}                  | $$2^{2^{2^x}}$$              | ![ex15][] | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 16 | \int\_1^x {dt\over t}        | $$\int_1^x {dt\over t}$$     | ![ex16][] | TeXbook p168 |
+----+------------------------------+------------------------------+-----------+--------------+
| 17 | \int\\!\\!\\!\int\_D dx\,dy  | $$\int\!\!\!\int_D dx\,dy$$  | ![ex17][] | TeXbook p169 |
+----+------------------------------+------------------------------+-----------+--------------+
| 18 | f(x) = \begin{cases}1/3 & \  | $$f(x) = \begin{cases}1/3 &  | ![ex18][] | TeXbook p175 |
|    | \text{if }0 \le x \le 1; \   | \text{if }0 \le x \le 1; \\  |           |              |
|    | \\\\ \                       | 2/3 & \text{if }3\le x \le   |           |              |
|    | 2/3 & \text{if }3\le x \le \ | 4;\\ 0 & \text{elsewhere.}   |           |              |
|    | 4;\\\\ 0 &\text{elsewhere.}\ | \end{cases}$$                |           |              |
|    | \end{cases}                  |                              |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 19 | \overbrace{x +\cdots + x}  \ | $$\overbrace{x +\cdots + x}  | ![ex19][] | TeXbook p176 |
|    | ^{k \text{ times}}           | ^{k \text{ times}}$$         |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 20 | y\_{x^2}                     | $$y_{x^2}$$                  | ![ex20][] | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 21 | \sum\_{p\text{ prime}} \     | $$\sum_{p\text{ prime}}f(p)  | ![ex21][] | TeXbook p181 |
|    | f(p)=\int\_{t>1} f(t)d\pi(t) | =\int_{t>1} f(t)d\pi(t)$$    |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 22 | \{\underbrace{\overbrace{ \  | $$\{\underbrace{\overbrace{  | ![ex22][] | TeXbook p181 |
|    | \mathstrut a,\dots,a}^{k  \  | \mathstrut a,\dots,a}^{k     |           |              |
|    | \,a\rq\text{s}},\overbrace{\ | \,a\rq\text{s}},\overbrace{  |           |              |
|    | \mathstrut b,\dots,b}^{l\,\  | \mathstrut b,\dots,b}^{l\,   |           |              |
|    | b\rq\text{s}}}\_{k+l \       | b\rq\text{s}}}_{k+l          |           |              |
|    | \text{ elements}}\}          | \text{ elements}}\}$$        |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 23 | \begin{pmatrix} \            | $$\begin{pmatrix}            | ![ex23][] | TeXbook p181 |
|    | \begin{pmatrix}a&b\\\\c&d \  | \begin{pmatrix}a&b\\c&d      |           |              |
|    | \end{pmatrix} & \            | \end{pmatrix} &              |           |              |
|    | \begin{pmatrix}e&f\\\\g&h \  | \begin{pmatrix}e&f\\g&h      |           |              |
|    | \end{pmatrix} \\\\ 0 & \     | \end{pmatrix} \\ 0 &         |           |              |
|    | \begin{pmatrix}i&j\\\\k&l \  | \begin{pmatrix}i&j\\k&l      |           |              |
|    | \end{pmatrix} \              | \end{pmatrix}                |           |              |
|    | \end{pmatrix}                | \end{pmatrix}$$              |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 24 | `\det\begin{vmatrix}` \      | $$\det\begin{vmatrix}        | ![ex24][] | TeXbook p181 |
|    | `c_0&c_1&c_2&\dots& c_n\\`\ `| c_0&c_1&c_2&\dots& c_n\\     |           |              |
|    | `c_1 & c_2 & c_3 & \dots &`\ | c_1 & c_2 & c_3 & \dots &    |           |              |
|    | `c_{n+1}\\ c_2 & c_3 & c_4`\ | c_{n+1}\\ c_2 & c_3 & c_4    |           |              |
|    | `&\dots & c_{n+2}\\ \vdots`\ | &\dots & c_{n+2}\\ \vdots    |           |              |
|    | `&\vdots&\vdots & &\vdots` \ | &\vdots&\vdots & &\vdots     |           |              |
|    | `\\c_n & c_{n+1} & c_{n+2}`\ | \\c_n & c_{n+1} & c_{n+2}    |           |              |
|    | `&\dots&c_{2n}` \            | &\dots&c_{2n}                |           |              |
|    | `\end{vmatrix} > 0`          | \end{vmatrix} > 0$$          |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 25 | y\_{x\_2}                    | $$y_{x_2}$$                  | ![ex25][] | TeXbook p128 |
+----+------------------------------+------------------------------+-----------+--------------+
| 26 | x\_{92}^{31415} + \pi        | $$x_{92}^{31415} + \pi$$     | ![ex26][] | TeXbook p129 |
+----+------------------------------+------------------------------+-----------+--------------+
| 27 | x\_{y^a\_b}^{z^c\_d}         | $$x_{y^a_b}^{z^c_d}$$        | ![ex27][] | TeXbook p129 |
+----+------------------------------+------------------------------+-----------+--------------+
| 28 | y\_3'''                      | $$y_3'''$$                   | ![ex28][] | TeXbook p130 |
+----+------------------------------+------------------------------+-----------+--------------+
| 29 | \lim\_{n\rightarrow+\infty}\ | $$\lim_{n\rightarrow+\infty} | ![ex29][] |              |
|    | {\sqrt{2\pi n}\over n!} \    | {\sqrt{2\pi n}\over n!}      |           |              |
|    | \genfrac (){}{}n{e}^n = 1    | \genfrac (){}{}n{e}^n = 1$$  |           |              |
+----+------------------------------+------------------------------+-----------+--------------+
| 30 | \det(A) = \sum\_{\sigma \    | $$\det(A) = \sum_{\sigma     | ![ex30][] |              |
|    | \in S_n} \epsilon(\sigma) \  | \in S_n} \epsilon(\sigma)    |           |              |
|    | \prod\_{i=1}^n \             | \prod_{i=1}^n                |           |              |
|    | a\_{i, \sigma\_i}            | a_{i, \sigma_i}$$            |           |              |
+----+------------------------------+------------------------------+-----------+--------------+

[ex1]: images/ex1.gif
[ex2]: images/ex2.gif
[ex3]: images/ex3.gif
[ex4]: images/ex4.gif
[ex5]: images/ex5.gif
[ex6]: images/ex6.gif
[ex7]: images/ex7.gif
[ex8]: images/ex8.gif
[ex9]: images/ex9.gif
[ex10]: images/ex10.gif
[ex11]: images/ex11.gif
[ex12]: images/ex12.gif
[ex13]: images/ex13.gif
[ex14]: images/ex14.gif
[ex15]: images/ex15.gif
[ex16]: images/ex16.gif
[ex17]: images/ex17.gif
[ex18]: images/ex18.gif
[ex19]: images/ex19.gif
[ex20]: images/ex20.gif
[ex21]: images/ex21.gif
[ex22]: images/ex22.gif
[ex23]: images/ex23.gif
[ex24]: images/ex24.gif
[ex25]: images/ex25.gif
[ex26]: images/ex26.gif
[ex27]: images/ex27.gif
[ex28]: images/ex28.gif
[ex29]: images/ex29.png
[ex30]: images/ex30.png

</body>
</html>
