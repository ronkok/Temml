<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Environment Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="../assets/temml.min.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(2),
    table tr > td:nth-of-type(5) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
    table tr > td:nth-of-type(4) { text-align: center; }
  </style>
</head>

<body>
<main id="main" class="latin-modern">

The Temml [supported functions page][1] includes working examples of some
environments, but there are several _other_ Temml environments that are only
referenced in that page, not fully displayed.

This test page shows more of the environments.

Also, there is a section [below][2] on `\tag`s, `\label`s, and `\ref`s.

[1]: ../docs/en/supported.html
[2]: #tags-labels-and-refs

### Environments

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
| \end{split}       |  `\label{eqn}`\        | $$                     |                           |
| \label{eqn}       | `\end{equation}`       |                        |                           |
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
|    a=b \\         |    `e=b+c \label{g}`\  |  10&x+ &3&y = 2 \\     |    `3&x+&13&y = 4`\       |
|   e=b+c \label{g} | `\end{gather}`         |  3&x+&13&y = 4         | `\end{alignat}`           |
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
| $$                | `\begin{gather}`\      | $$                     | `\begin{multline}`\       |
| \begin{gather}    | `  a=b \notag \\`\     | \begin{multline}       |    `\rm uno \\`\          |
|   a=b \notag\\    | `  e=b+c \\`\          |    \rm uno \\          |    `\rm dos \\`\          |
|   e=b+c\\         | `\end{gather}`         |    \rm dos \\          |    `\rm tres`\            |
| \end{gather}      |                        |    \rm tres            | `\end{multline}`          |
| $$                |                        | \end{multline}         |                           |
|                   |                        | $$                     |                           |
+-------------------+------------------------+------------------------+---------------------------+
| $$                | `\begin{gather}` \     |                        |                           |
| \begin{gather}    | `   a=b \nonumber\\` \ |                        |                           |
|   a=b \nonumber\\ | `   e=b+c\\` \         |                        |                           |
|   e=b+c\\         | `\end{gather}`         |                        |                           |
| \end{gather}      |                        |                        |                           |
| $$                |                        |                        |                           |
+-------------------+------------------------+------------------------+---------------------------+

### Tags, Labels, and Refs

Here, we’ll show tests of tags, labels, and refs as they interact with environments.
Some tags are already visible above, those being the AMS auto-numbers.
There are also two labels above that we can target with refs. The first ref is: $\ref{eqn}$, which
is an instance of the code: `\ref{eqn}`. Then we have $\eqref{g}$, created via `\eqref{g}`.

While we are looking at AMS environments, let’s show a case in which a tag over-writes
the automatic number.

+:=================:+:=======================+
| $$                | `\begin{gather}`\      |
| \begin{gather}    |    `a=b \tag{90}\\`\   |
|    a=b \tag{90}\\ |    `e=b+c `\           |
|   e=b+c           | `\end{gather}`         |
| \end{gather}      |                        |
| $$                |                        |
+-------------------+------------------------+

Let's add a label to that one:

+:============================:+:==================================+
| $$                           | `\begin{gather}`\                 |
| \begin{gather}               |    `a=b \tag{91} \label{g2}\\`\   |
|    a=b \tag{91} \label{g2}\\ |    `e=b+c `\                      |
|   e=b+c                      | `\end{gather}`                    |
| \end{gather}                 |                                   |
| $$                           |                                   |
+------------------------------+-----------------------------------+

...and show an eqref to the label: $\eqref{g2}$, via the code: `\eqref{g2}`.

Next, we have a non-AMS environment with a tag:

+:=====================:+:===========================+
| $$\begin{matrix}      | `\begin{matrix}`\          |
|  a & b \tag{hi!} \\   |    `a & b \tag{hi!} \\`\   |
|  c & d                |    `c & d`\                |
|  \end{matrix}$$       | `\end{matrix}`             |
+-----------------------+----------------------------+

The tag is applied to the entire math zone, not just one row. That is
consistent with LaTeX. We can then add a label:

+:===============================:+:===================================+
| $$\begin{matrix}                | `\begin{matrix}`\                  |
|  a & b \tag{yo!} \label{m} \\   |    `a & b \tag{yo!} \label{m} \\`\ |
|  c & d                          |    `c & d`\                        |
|  \end{matrix}$$                 | `\end{matrix}`                     |
+---------------------------------+------------------------------------+

Now an eqref to that label: $\eqref{m}$, via the code: `\eqref{m}`.

¶

<script>
temml.postProcess(document.getElementById("main"))
</script>

</main>
</body>
</html>
