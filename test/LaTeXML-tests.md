<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Temml LaTeXML Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="./temmlPostProcess.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(2) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
  </style>
</head>

<body>

# LaTeXML Test

This LaTeXML reproduces the math examples from https://latexml.mathweb.org/editor \
Rows 1-7 came originally from http://www.mathjax.org/demos/tex-samples/, which no longer exists.

<br>

+-----+------------------------------------------------+------------------------------------------------+
|     | Source                                         | Temml                                          |
+=====+================================================+================================================+
|       The Lorenz Equations                                                                            |
+-----+------------------------------------------------+------------------------------------------------+
|  1  | \\begin{aligned} \                             | $$\begin{aligned}                              |
|     | \\dot{x} & = \\sigma(y-x) \\\\ \               | \dot{x} & = \sigma(y-x) \\                     |
|     | \\dot{y} & = \\rho x - y - xz \\\\ \           | \dot{y} & = \rho x - y - xz \\                 |
|     | \\dot{z} & = -\\beta z + xy \                  | \dot{z} & = -\beta z + xy                      |
|     | \\end{aligned}                                 | \end{aligned}$$                                |
+-----+------------------------------------------------+------------------------------------------------+
|       The Cauchy-Schwarz Inequality                                                                   |
+-----+------------------------------------------------+------------------------------------------------+
|  2  | \\left( \\sum\_{k=1}^n a_k b_k \\right)^2 \    | $$\left( \sum_{k=1}^n a_k b_k \right)^2        |
|     | \\leq \\left( \\sum\_{k=1}^n a_k^2 \\right) \  | \leq \left( \sum_{k=1}^n a_k^2 \right)         |
|     | \left( \sum\_{k=1}^n b_k^2 \right) \           | \left( \sum_{k=1}^n b_k^2 \right)$$            |
+-----+------------------------------------------------+------------------------------------------------+
|       A Cross Product Formula                                                                         |
+-----+------------------------------------------------+------------------------------------------------+
|  3  | \\mathbf{V}\_1 \\times \\mathbf{V}\_2 = \      | $$\mathbf{V}_1 \times \mathbf{V}_2 =           |
|     | \\begin{vmatrix} \                             | \begin{vmatrix}                                |
|     | \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ \ | \mathbf{i} & \mathbf{j} & \mathbf{k} \\        |
|     | \\frac{\\partial X}{\\partial u} &  \          | \frac{\partial X}{\partial u} &                |
|     | \\frac{\\partial Y}{\\partial u} & 0 \\\\ \    | \frac{\partial Y}{\partial u} & 0 \\           |
|     | \\frac{\\partial X}{\\partial v} & \           | \frac{\partial X}{\partial v} &                |
|     | \\frac{\\partial Y}{\\partial v} & 0 \         | \frac{\partial Y}{\partial v} & 0              |
|     | \\end{vmatrix}                                 | \end{vmatrix}$$                                |
+-----+------------------------------------------------+------------------------------------------------+
|       The probability of getting $`k` heads when flipping $`n` coins is:                              |
+-----+------------------------------------------------+------------------------------------------------+
|  4  | P(E) = {n \\choose k} p^k (1-p)^{ n-k} \       | $$P(E) = {n \choose k} p^k (1-p)^{ n-k}$$      |
+-----+------------------------------------------------+------------------------------------------------+
|       An Identity of Ramanujan                                                                        |
+-----+------------------------------------------------+------------------------------------------------+
|  5  | \\frac{1}{\\Bigl(\\sqrt{\\phi \\sqrt{5}}- \    | $$\frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-         |
|     | \\phi\\Bigr) e^{\\frac25 \\pi}} = \            | \phi\Bigr) e^{\frac25 \pi}} =                  |
|     | 1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} \   | 1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}}         |
|     | {1+\\frac{e^{-6\\pi}} \                        | {1+\frac{e^{-6\pi}}                            |
|     | {1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }        | {1+\frac{e^{-8\pi}} {1+\ldots} } } }$$         |
+-----+------------------------------------------------+------------------------------------------------+
|       A Rogers-Ramanujan Identity                                                                     |
+-----+------------------------------------------------+------------------------------------------------+
|  6  | 1 +  \\frac{q^2}{(1-q)}+ \                     | $$1 +  \frac{q^2}{(1-q)}+                      |
|     | \\frac{q^6}{(1-q)(1-q^2)}+\\cdots = \          | \frac{q^6}{(1-q)(1-q^2)}+\cdots =              |
|     | \\prod\_{j=0}^{\\infty}\frac{1} \              | \prod_{j=0}^{\infty}\frac{1}                   |
|     | {(1-q^{5j+2})(1-q^{5j+3})}, \                  | {(1-q^{5j+2})(1-q^{5j+3})},                    |
|     | \\quad\\quad \\text{for} |q|<1.                | \quad\quad \text{for} |q|<1.$$                 |
+-----+------------------------------------------------+------------------------------------------------+
|       Maxwell's Equations                                                                             |
+-----+------------------------------------------------+------------------------------------------------+
|  7  | \\begin{aligned} \                             | $$\begin{aligned}                              |
|     | \\nabla \\times \\vec{\mathbf{B}} -\\\\, \     | \nabla \times \vec{\mathbf{B}} -\,             |
|     | \\frac1c\\, \\frac{\\partial\\vec{ \           | \frac1c\, \frac{\partial\vec{                  |
|     | \\mathbf{E}}}{\\partial t} & \                 | \mathbf{E}}}{\partial t} &                     |
|     | = \\frac{4\\pi}{c}\\vec{\\mathbf{j}} \\\\ \    | = \frac{4\pi}{c}\vec{\mathbf{j}} \\            |
|     | \\nabla \\cdot \\vec{\\mathbf{E}} & \          | \nabla \cdot \vec{\mathbf{E}} &                |
|     | = 4 \\pi \\rho \\\\ \                          | = 4 \pi \rho \\                                |
|     | \\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \   | \nabla \times \vec{\mathbf{E}}\, +\,           |
|     | \\frac1c\\, \\frac{\\partial\\vec{ \           | \frac1c\, \frac{\partial\vec{                  |
|     | \\mathbf{B}}}{\\partial t} & \                 | \mathbf{B}}}{\partial t} &                     |
|     | = \\vec{\mathbf{0}} \\\\ \                     | = \vec{\mathbf{0}} \\                          |
|     | \\nabla \\cdot \\vec{\\mathbf{B}} & \          | \nabla \cdot \vec{\mathbf{B}} &                |
|     |  = 0 \                                         | = 0                                            |
|     | \\end{aligned} \                               | \end{aligned}$$                                |
+-----+------------------------------------------------+------------------------------------------------+
|        Boxes                                                                                          |
+-----+------------------------------------------------+------------------------------------------------+
|  8  | \\raisebox{0pt}{\\Large% \                     | $`\raisebox{0pt}{\Large                        |
|     | \\textbf{Aaaa\\raisebox{-0.3ex}{a}% \          | \textbf{Aaaa\raisebox{-0.3ex}{a}               |
|     | \\raisebox{-0.7ex}{aa}\\raisebox{-1.2ex}{r}%\  | \raisebox{-0.7ex}{aa}\raisebox{-1.2ex}{r}      |
|     | \\raisebox{-2.2ex}{g}\\raisebox{-4.5ex}{h} \   | \raisebox{-2.2ex}{g}\raisebox{-4.5ex}{h}       |
|     |  } \                                           | }                                              |
|     | }                                              | }`                                             |
+-----+------------------------------------------------+------------------------------------------------+

<br>
</body>
</html>
