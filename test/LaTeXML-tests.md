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
    #equations + table tr > td:nth-of-type(2) { font-size: 10pt; font-family: Consolas, "Courier New", Courier, monospace; }
    #boxes + table tr > td:nth-of-type(1) { font-size: 10pt; font-family: Consolas, "Courier New", Courier, monospace; }
  </style>
</head>

<body>

# LaTeXML Test

This LaTeXML test reproduces math examples from https://latexml.mathweb.org/editor\
The equations in the first table came originally from http://www.mathjax.org/demos/tex-samples/, which no longer exists.

### Equations

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
|       The probability of getting $k$  heads when flipping $n$  coins is:                              |
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

### Boxes

| Source | Temml  |
|:-------|:--------|
| `\raisebox{0pt}[0pt][0pt]{\Large%`<br>`\textbf{Aaaa\raisebox{-0.3ex}{a}%`<br>`\raisebox{-0.7ex}{aa}\raisebox{-1.2ex}{r}%`<br>`\raisebox{-2.2ex}{g}\raisebox{-4.5ex}{h}}}` |  $\raisebox{0pt}{\Large\textbf{Aaaa\raisebox{-0.3ex}{a}\raisebox{-0.7ex}{aa}\raisebox{-1.2ex}{r}\raisebox{-2.2ex}{g}\raisebox{-4.5ex}{h}}}$ |

### Unicode

The tests below come from https://latexml.mathweb.org/editor\
They got them from https://trac.edgewall.org/wiki/TracUnicode\
I have no idea what these lines say. 

All the Unicode characters are written inside `\text{}`.

| Language              | Temml                                                        |
|:----------------------|:-------------------------------------------------------------|
| Arabic                | $\dfrac{\text{تراك يقوم بحفظ كل الكلمات باستخدام صيغة}} 2$   |
| Bulgarian             | $\dfrac{\text{Българският език работи ли?}} 2$               |
| Česky                 | $\dfrac{\text{Čeština v kódování UTF-8, žádný problém.}} 2$  |
| Chinese (Traditional) | $\dfrac{\text{繁體中文, 漢字測試}} 2$                      |
| Chinese (Simplified)  | $\dfrac{\text{简体中文，汉字测试}} 2$                       |
| Croatian              | $\left(\begin{array}{l}\text{Ako podržava srpski i slovenski mora podržavati} \\ \text{ i Hrvatski - čćžšđ ČĆŽŠĐ}\end{array}\right)$ |
| English               | $\dfrac{\text{Yes indeed, Trac supports English. Fully.}} 2$ |
| Français              | $\dfrac{\text{Il est possible d'écrire en Français : à, ç, û, …}} 2$ |
| German                | $\left(\begin{array}{l}\text{Trac-Wiki muß auch deutsche Umlaute richtig anzeigen:} \\ \text{ö, ä, ü, Ä, Ö, Ü; und das scharfe ß}\end{array}\right)$ |
| Greek                 | $\dfrac{\text{Τα Ελληνικά υποστηρίζονται επαρκώς επίσης.}} 2$ |
| Hebrew                | $\dfrac{\text{אני יכול לאכול זכוכית וזה לא מזיק לי}} 2$       |
| Hindi                 | $\dfrac{\text{अब हिन्दी में।}} 2$                                  |
| Hungarian             | $\dfrac{\text{Árvíztűrő tükörfúrógép}} 2$                     |
| Icelandic             | $\dfrac{\text{Ævar sagði við ömmu sína: Sjáðu hvað ég er stór!}} 2$ |
| Japanese              | $\dfrac{\text{漢字 ひらがな カタカナ ﾊﾝｶｸｶﾅ 日本語試験}} 2$  |
| Korean                | $\dfrac{\text{이번에는 한글로 써보겠습니다. 잘 보이나요? 한글}} 2$ |
| Latvian               | $\dfrac{\text{Latviešu valoda arī strādā!}} 2$                |
| Lithuanian            | $\left(\begin{array}{l}\text{Sudalyvaukime ir mes. Ar veikia lietuviškos raidės?} \\ \text{ąčęėįšųūž ĄČĘĖĮŠŲŪŽ Žinoma, kad veikia :) Kas tie mes?}\end{array}\right)$ |
| Persian (Farsi)       | $\left(\begin{array}{l}\text{ولی امکان نوشتن مستقیم فارسی نیست چون حالت متن از راست به چپ و جود} \\ \text{این یک متن فارسی است  ندارد برای فارسی نوشتن باید از HTML استفاده کنید.}\end{array}\right)$ |
| Polish                | $\left(\begin{array}{l}\text{Pchnąć w tę łódź jeża lub osiem skrzyń fig;} \\ \text{Nocna gżegżółka zawsze dzienną przekuka.}\end{array}\right)$ |
| Portuguese            | $\left(\begin{array}{l}\text{É possível guardar caracteres especias da língua portuguesa, } \\ \text{incluindo o símbolo da moeda européia '€', trema 'ü', crase 'à', agudos 'áéíóú',} \\ \text{circunflexos 'âêô', til 'ãõ', cedilha 'ç', ordinais 'ªº', grau '°¹²³'.}\end{array}\right)$ |
| Russian               | $\dfrac{(\text{Проверка русского языка: кажется работает... И буква "ё" есть...}} 2$ |
| Serbian               | $\left(\begin{array}{l}\text{Podržan, uprkos činjenici da se za njegovo} \\ \text{pisanje koriste чак два алфабета.}\end{array}\right)$ |
| Slovenian             | $\dfrac{\text{Ta suhi škafec pušča vodo že od nekdaj!}} 2$ |
| Spanish               | $\left(\begin{array}{l}\text{Esto es un pequeño texto en Español,} \\ \text{donde el veloz murciélago hindú comía cardlllo y kiwi}\end{array}\right)$ |
| Swedish               | $\dfrac{\text{Räven raskar över isen med luva på.}} 2$     |
| Thai                  | $\dfrac{\text{Trac แสดงภาษาไทยได้อย่างถูกต้อง!}} 2$                 |
| Ukrainian             | $\dfrac{\text{Перевірка української мови...}} 2$           |
| Urdu                  | $\dfrac{\text{ٹریک اردو بھی سپورٹ کرتا ہے۔}} 2$            |
| Vietnamese            | $\dfrac{\text{Viết tiếng Việt cũng được.}} 2$              |

<br>
</body>
</html>
