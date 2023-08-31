<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Environment Tests</title>
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

## Environments

+:=====================:+:===========================+:==========================:+:=============================+
| $\begin{matrix}       | `\begin{matrix}`\          | $\begin{array}{cc}         | `\begin{array}{cc}`\         |
|  a & b \\             |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|  c & d                |    `c & d`\                | c & d                      |    `c & d`\                  |
|  \end{matrix}$        | `\end{matrix}`             | \end{array}$               | `\end{array}`                |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{matrix*}[r]   | `\begin{matrix*}`\         | $\begin{array}{cc}         | `\begin{darray}{cc}`\        |
|  a & b \\             |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|  1.2 & 3.5            |    `1.2 & 3.5`\            | c & d                      |    `c & d`\                  |
|  \end{matrix*}$       | `\end{matrix*}`            | \end{array}$               | `\end{darray}`               |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{pmatrix}      | `\begin{pmatrix}`\         | $\begin{bmatrix}           | `\begin{bmatrix}`\           |
| a & b \\              |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
| c & d                 |    `c & d`\                | c & d                      |    `c & d`\                  |
| \end{pmatrix}$        | `\end{pmatrix}`            | \end{bmatrix}$             | `\end{bmatrix}`              |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{pmatrix*}[r]  | `\begin{pmatrix*}[r]`\     | $\begin{bmatrix*}[r]       | `\begin{bmatrix*}[r]`\       |
| a & b \\              |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
| 1.2 & 3.5             |    `1.2 & 3.5`\            | 1.2 & 3.5                  |    `1.2 & 3.5`\              |
| \end{pmatrix*}$       | `\end{pmatrix*}`           | \end{bmatrix*}$            | `\end{bmatrix*}`             |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{vmatrix}      | `\begin{vmatrix}`\         | $\begin{Vmatrix}           | `\begin{Vmatrix}`\           |
|    a & b \\           |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|    c & d              |    `c & d`\                | c & d                      |    `c & d`\                  |
| \end{vmatrix}$        | `\end{vmatrix}`            | \end{Vmatrix}$             | `\end{Vmatrix}`              |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{vmatrix*}[r]  | `\begin{vmatrix}`\         | $\begin{Vmatrix*}[r]       | `\begin{Vmatrix}`\           |
|    a & b \\           |    `a & b \\`\             | a & b \\                   |    `a & b \\`\               |
|    1.2 & 3.5          |    `1.2 & 3.5`\            | 1.2 & 3.5                  |    `1.2 & 3.5`\              |
| \end{vmatrix*}$       | `\end{vmatrix*}`           | \end{Vmatrix*}$            | `\end{Vmatrix*}`             |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{Bmatrix}      | `\begin{Bmatrix}`\         | $\begin{array}{c|c:c}      | `\begin{array}{c|c:c}`\      |
|  a & b \\             |    `a & b \\`\             | a & b & c \\ \hline        |    `a & b & c \\ \hline`\    |
|  1.2 & 3.5            |    `1.2 & 3.5`\            | d & e & f \\ \hdashline    |    `d & e & f \\`\           |
| \end{Bmatrix}$        | `\end{Bmatrix*}`           | g & h & i                  |    `\hdashline`\             |
|                       |                            | \end{array}$               |    `g & h & i`\              |
|                       |                            |                            | `\end{array}`                |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{Bmatrix*}[r]  | `\begin{Bmatrix*}[r]`\     | $\begin{array}{c|c:c}      | `\begin{array}{c|c:c}`\      |
|  a & b \\             |    `a & b \\`\             | a & b & c \\ \hline        |    `a & b & c \\ \hline`\    |
|  1.2 & 3.5            |    `1.2 & 3.5`\            | d & e & f \\ \hdashline    |    `d & e & f \\`\           |
| \end{Bmatrix*}$       | `\end{Bmatrix*}`           | g & h & i                  |    `\hdashline`\             |
|                       |                            | \end{array}$               |    `g & h & i`\              |
|                       |                            |                            | `\end{array}`                |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $x = \begin{cases}    | `x = \begin{cases}`\       | $\begin{rcases}            | `\begin{rcases}`\            |
| a &\text{if } b \\    |    `a &\text{if } b \\`\   | a &\text{if } b \\         |    `a &\text{if } b  \\`\    |
| c &\text{if } d       |    `c &\text{if } d`\      | c &\text{if } d            |   `c &\text{if } d`\         |
| \end{cases}$          | `\end{cases}`              | \end{rcases}⇒$             | `\end{rcases}⇒`              |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $x = \begin{dcases}   | `x = \begin{dcases}`\      | $\begin{drcases}           | `\begin{drcases}`\           |
| a &\text{if } b \\    |    `a &\text{if } b \\`\   | a &\text{if } b \\         |    `a &\text{if } b  \\`\    |
| c &\text{if } d       |    `c &\text{if } d`\      | c &\text{if } d            |   `c &\text{if } d`\         |
| \end{dcases}$         | `\end{dcases}`             | \end{drcases}⇒$            | `\end{drcases}⇒`             |
+-----------------------+----------------------------+----------------------------+------------------------------+
| $\begin{smallmatrix}  | `\begin{smallmatrix}`\     | $$                         | `\sum_{\begin{subarray}{l}`\ |
|  a & b \\             |    `a & b \\`\             | \sum_{\begin{subarray}{l}  |    `i\in\Lambda\\`\          |
|  c & d                |    `c & d`\                | i\in\Lambda\\              |    `0<j<n`\                  |
| \end{smallmatrix}$    | `\end{smallmatrix}`        |  0<j<n\end{subarray}}      | `\end{subarray}}`            |
|                       |                            | $$                         |                              |
+-----------------------+----------------------------+----------------------------+------------------------------+

¶

+:==================+:=======================+:=======================+:==========================+
| $$                | `\begin{equation}`\    | $$                     | `\begin{align}`\          |
| \begin{equation}  | `\begin{split}`\       | \begin{align}          |    `10&x+ &3&y = 2 \\`\   |
| \begin{split}     |    `a &=b+c\\`\        |    10&x+ &3&y = 2 \\   |    `3&x+&13&y = 4`\       |
|   a &=b+c\\       |    `&=e+f`\            |    3&x+&13&y = 4       | `\end{align}`             |
|   &=e+f           | `\end{split}`\         | \end{align}            |                           |
| \end{split}       | `\end{equation}`       | $$                     |                           |
| \end{equation}    |                        |                        |                           |
| $$                |                        |                        |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{equation*}`\   | $$                     | `\begin{align*}`\         |
| \begin{equation*} | `\begin{split}`\       | \begin{align*}         |    `10&x+ &3&y = 2 \\`\   |
| \begin{split}     |    `a &=b+c\\`\        |    10&x+ &3&y = 2 \\   |    `3&x+&13&y = 4`\       |
|   a &=b+c\\       |    `&=e+f`\            |    3&x+&13&y = 4       | `\end{align*}`            |
|   &=e+f           | `\end{split}`\         | \end{align*}           |                           |
| \end{split}       | `\end{equation*}`      | $$                     |                           |
| \end{equation*}   |                        |                        |                           |
| $$                |                        |                        |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $\begin{gathered} | `\begin{gathered}`\    | $\begin{aligned}       | `\begin{aligned}`\        |
|    a=b \\         | `   a=b \\   `\        |    10&x+ &3&y = 2 \\   |    `10&x+ &3&y = 2 \\`\   |
|    e=b+c          | `   e=b+c`\            |    3&x+&13&y = 4       |    `3&x+&13&y = 4`\       |
| \end{gathered}$   | `\end{gathered}`\      | \end{aligned}$         | `\end{aligned}`           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{gather}`\      | $$                     | `\begin{alignat}{2}`\     |
| \begin{gather}    |    `a=b \\`\           | \begin{alignat}{2}     |    `10&x+ &3&y = 2 \\`\   |
|    a=b \\         |    `e=b+c`\            |  10&x+ &3&y = 2 \\     |    `3&x+&13&y = 4`\       |
|    e=b+c          | `\end{gather}`         |  3&x+&13&y = 4         | `\end{alignat}`           |
| \end{gather}      |                        | \end{alignat}          |                           |
| $$                |                        | $$                     |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{gather*}`\     | $$                     | `\begin{alignat*}{2}`\    |
| \begin{gather*}   |    `a=b \\`\           | \begin{alignat*}{2}    |    `10&x+ &3&y = 2 \\`\   |
|    a=b \\         |    `e=b+c`\            |  10&x+ &3&y = 2 \\     |    `3&x+&13&y = 4`\       |
|    e=b+c          | `\end{gather*}`        |  3&x+&13&y = 4         | `\end{alignat*}`          |
| \end{gather*}     |                        | \end{alignat*}         |                           |
| $$                |                        | $$                     |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{CD}`\          | $\begin{alignedat}{2}  | `\begin{alignedat}{2}`\   |
| \begin{CD}        |   `A  @>a>>  B  \\`\   |   10&x+ &3&y = 2 \\    |    `\10&x+ &3&y = 2\\`\   |
|   A @>a>> B \\    | `@VbVV    @AAcA \\`\   |   3&x+&13&y = 4        |    `3&x+&13&y = 4 \\`\    |
| @VbVV @AAcA\\     |   `C  @=   D`\         | \end{alignedat}$       | `\end{alignedat}`\        |
|   C @= D          | `\end{CD}`             |                        |                           |
| \end{CD}          |                        |                        |                           |
| $$                |                        |                        |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{CD}`\          | $$                     | `\begin{multline}`\       |
| \begin{CD}        |   `A  @>a>>  B  \\`\   | \begin{multline}       |    `\rm uno \\`\          |
|   A @>a>> B \\    | `@VbVV    @AAcA \\`\   |    \rm uno \\          |    `\rm dos \\`\          |
| @VbVV @AAcA\\     |   `C  @=   D`\         |    \rm dos \\          |    `\rm tres`\            |
|   C @= D          | `\end{CD}`             |    \rm tres            | `\end{multline}`          |
| \end{CD}          |                        | \end{multline}         |                           |
| $$                |                        | $$                     |                           |
+-------------------+------------------------+------------------------+---------------------------+


</body>
</html>
