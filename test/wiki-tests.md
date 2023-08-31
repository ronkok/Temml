<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Temml Wiki Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="./temmlPostProcess.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(2) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
  </style>
</head>

<body>

# Wiki Test

Rows 1 thru 261 on this page reproduce the math examples from \
https://en.wikipedia.org/wiki/Help:Displaying\_a\_formula

A few of the functions on this page require Temml’s _texvc_ extension.

<br>

+-----+--------------------------------------------+------------------------------------------------+
|     | Source                                     | Temml                                          |
+=====+============================================+================================================+
| 1   | \alpha                                     | $\alpha$                                       |
+-----+--------------------------------------------+------------------------------------------------+
| 2   | f(x) = x^2                                 | $f(x) = x^2$                                   |
+-----+--------------------------------------------+------------------------------------------------+
| 3   | \\{1,e,\pi\\}                              | $\{1,e,\pi\}$                                  |
+-----+--------------------------------------------+------------------------------------------------+
| 4   | |z + 1| \leq 2                             | $|z + 1| \leq 2$                               |
+-----+--------------------------------------------+------------------------------------------------+
| 5   | `\# \$ \% \wedge \& \_ \{ \} \sim` \       | $\# \$ \% \wedge \& \_ \{ \} \sim              |
|     | `\backslash`                               |  \backslash$                                   |
+-----+--------------------------------------------+------------------------------------------------+
|  **Accents**                                                                                      |
+-----+--------------------------------------------+------------------------------------------------+
| 6   | \dot{a}, \ddot{a}, \acute{a}, \grave{a}    | $\dot{a}, \ddot{a}, \acute{a}, \grave{a}$      |
+-----+--------------------------------------------+------------------------------------------------+
| 7   | \dot{a}, \ddot{a}, \acute{a}, \grave{a}    | $\dot{a}, \ddot{a}, \acute{a}, \grave{a}$      |
+-----+--------------------------------------------+------------------------------------------------+
| 8   | \check{a}, \breve{a}, \tilde{a}, \bar{a}   | $\check{a}, \breve{a}, \tilde{a}, \bar{a}$     |
+-----+--------------------------------------------+------------------------------------------------+
| 9   | \hat{a}, \widehat{a}, \vec{a}              | $\hat{a}, \widehat{a}, \vec{a}$                |
+-----+--------------------------------------------+------------------------------------------------+
|  **Functions**                                                                                    |
+-----+--------------------------------------------+------------------------------------------------+
| 10  | \exp_a b = a^b, \exp b = e^b, 10^m         | $\exp_a b = a^b, \exp b = e^b, 10^m$           |
+-----+--------------------------------------------+------------------------------------------------+
| 11  | \ln c, \lg d = \log e, \log_{10} f         | $\ln c, \lg d = \log e, \log_{10} f$           |
+-----+--------------------------------------------+------------------------------------------------+
| 12  | \sin a, \cos b, \tan c, \cot d, \sec e, \  | $\sin a, \cos b, \tan c, \cot d, \sec e,       |
|     | \csc f                                     |  \csc f$                                       |
+-----+--------------------------------------------+------------------------------------------------+
| 13  | \arcsin h, \arccos i, \arctan j            | $\arcsin h, \arccos i, \arctan j$              |
+-----+--------------------------------------------+------------------------------------------------+
| 14  | \sinh k, \cosh l, \tanh m, \coth n         | $\sinh k, \cosh l, \tanh m, \coth n$           |
+-----+--------------------------------------------+------------------------------------------------+
| 15  | \operatorname{sh}k, \operatorname{ch}l, \  | $\operatorname{sh}k, \operatorname{ch}l,       |
|     | \operatorname{th}m, \operatorname{coth}n   | \operatorname{th}m, \operatorname{coth}n$      |
+-----+--------------------------------------------+------------------------------------------------+
| 16  | \sgn r, \left\vert s \right\vert           | $\sgn r, \left\vert s \right\vert$             |
+-----+--------------------------------------------+------------------------------------------------+
| 17  | \min(x,y), \max(x,y)                       | $\min(x,y), \max(x,y)$                         |
+-----+--------------------------------------------+------------------------------------------------+
|  **Bounds**                                                                                       |
+-----+--------------------------------------------+------------------------------------------------+
| 18  | \min x, \max y, \inf s, \sup t             | $\min x, \max y, \inf s, \sup t$               |
+-----+--------------------------------------------+------------------------------------------------+
| 19  | \lim u, \liminf v, \limsup w               | $\lim u, \liminf v, \limsup w$                 |
+-----+--------------------------------------------+------------------------------------------------+
| 20  | \dim p, \deg q, \det m, \ker\phi           | $\dim p, \deg q, \det m, \ker\phi$             |
+-----+--------------------------------------------+------------------------------------------------+
|  **Projections**                                                                                  |
+-----+--------------------------------------------+------------------------------------------------+
| 21  | \Pr j, \hom l, \lVert z \rVert, \arg z     | $\Pr j, \hom l, \lVert z \rVert, \arg z$       |
+-----+--------------------------------------------+------------------------------------------------+
|  **Differentials and derivatives**                                                                |
+-----+--------------------------------------------+------------------------------------------------+
| 22  | dt, \mathrm{d}t, \partial t, \nabla\psi    | $dt, \mathrm{d}t, \partial t, \nabla\psi$      |
+-----+--------------------------------------------+------------------------------------------------+
| 23  | dy/dx, \mathrm{d}y/\mathrm{d}x, \          | $dy/dx, \mathrm{d}y/\mathrm{d}x,               |
|     | \frac{dy}{dx}, \                           | \frac{dy}{dx},                                 |
|     | \frac{\mathrm{d}y}{\mathrm{d}x}, \         | \frac{\mathrm{d}y}{\mathrm{d}x},               |
|     | \frac{\partial^2}\                         | \frac{\partial^2}                              |
|     | {\partial x\_1\partial x\_2}y              | {\partial x_1\partial x_2}y$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 24  | \prime, \backprime, f^\prime, f', f'', \   | $\prime, \backprime, f^\prime, f', f'',        |
|     | f^{(3)}, \dot y, \ddot y                   | f^{(3)}, \dot y, \ddot y$                      |
+-----+--------------------------------------------+------------------------------------------------+
|  **Letter-like symbols or constants**                                                             |
+-----+--------------------------------------------+------------------------------------------------+
| 25  | \infty, \aleph, \complement,\backepsilon,\ | $\infty, \aleph, \complement,\backepsilon,     |
|     | \eth, \Finv, \hbar                         | \eth, \Finv, \hbar$                            |
+-----+--------------------------------------------+------------------------------------------------+
| 26  | \Im, \imath, \jmath, \Bbbk, \ell, \mho, \  | $\Im, \imath, \jmath, \Bbbk, \ell, \mho,       |
|     | \wp, \Re, \circledS, \S, \P, \AA           |  \wp, \Re, \circledS, \S, \P, \AA$             |
+-----+--------------------------------------------+------------------------------------------------+
|  **Modular arithmetic**                                                                           |
+-----+--------------------------------------------+------------------------------------------------+
| 27  | s_k \equiv 0 \pmod{m}                      | $s_k \equiv 0 \pmod{m}$                        |
+-----+--------------------------------------------+------------------------------------------------+
| 28  | a \bmod b                                  | $a \bmod b$                                    |
+-----+--------------------------------------------+------------------------------------------------+
| 29  | \gcd(m, n), \operatorname{lcm}(m, n)       | $\gcd(m, n), \operatorname{lcm}(m, n)$         |
+-----+--------------------------------------------+------------------------------------------------+
| 30  | \mid, \nmid, \shortmid, \nshortmid         | $\mid, \nmid, \shortmid, \nshortmid$           |
+-----+--------------------------------------------+------------------------------------------------+
|  **Radicals**                                                                                     |
+-----+--------------------------------------------+------------------------------------------------+
| 31  | \surd, \sqrt{2}, \sqrt[n]{2}, \            | $\surd, \sqrt{2}, \sqrt[n]{2},                 |
|     | \sqrt[3]{\frac{x^3+y^3}{2}}                | \sqrt[3]{\frac{x^3+y^3}{2}}$                   |
+-----+--------------------------------------------+------------------------------------------------+
|  **Operators**                                                                                    |
+-----+--------------------------------------------+------------------------------------------------+
| 32  | +, -, \pm, \mp, \dotplus                   | $+, -, \pm, \mp, \dotplus$                     |
+-----+--------------------------------------------+------------------------------------------------+
| 33  | \times, \div, \divideontimes, /,\backslash | $\times, \div, \divideontimes, /, \backslash$  |
+-----+--------------------------------------------+------------------------------------------------+
| 34  | \cdot, * \ast, \star, \circ, \bullet       | $\cdot, * \ast, \star, \circ, \bullet$         |
+-----+--------------------------------------------+------------------------------------------------+
| 35  | \boxplus, \boxminus, \boxtimes, \boxdot    | $\boxplus, \boxminus, \boxtimes, \boxdot$      |
+-----+--------------------------------------------+------------------------------------------------+
| 36  | \oplus, \ominus, \otimes, \oslash, \odot   | $\oplus, \ominus, \otimes, \oslash, \odot$     |
+-----+--------------------------------------------+------------------------------------------------+
| 37  | \circleddash, \circledcirc, \circledast    | $\circleddash, \circledcirc, \circledast$      |
+-----+--------------------------------------------+------------------------------------------------+
| 38  | \bigoplus, \bigotimes, \bigodot            | $\bigoplus, \bigotimes, \bigodot$              |
+-----+--------------------------------------------+------------------------------------------------+
|  **Sets**                                                                                         |
+-----+--------------------------------------------+------------------------------------------------+
| 39  | \{ \}, \O \empty \emptyset, \varnothing    | $\{ \}, \O \empty \emptyset, \varnothing$      |
+-----+--------------------------------------------+------------------------------------------------+
| 40  | \in, \notin \not\in, \ni, \not\ni          | $\in, \notin \not\in, \ni, \not\ni$            |
+-----+--------------------------------------------+------------------------------------------------+
| 41  | \cap, \Cap, \sqcap, \bigcap                | $\cap, \Cap, \sqcap, \bigcap$                  |
+-----+--------------------------------------------+------------------------------------------------+
| 42  | \cup, \Cup, \sqcup, \bigcup, \bigsqcup, \  | $\cup, \Cup, \sqcup, \bigcup, \bigsqcup,       |
|     | \uplus, \biguplus                          | \uplus, \biguplus$                             |
+-----+--------------------------------------------+------------------------------------------------+
| 43  | \setminus, \smallsetminus, \times          | $\setminus, \smallsetminus, \times$            |
+-----+--------------------------------------------+------------------------------------------------+
| 44  | \subset, \Subset, \sqsubset                | $\subset, \Subset, \sqsubset$                  |
+-----+--------------------------------------------+------------------------------------------------+
| 45  | \supset, \Supset, \sqsupset                | $\supset, \Supset, \sqsupset$                  |
+-----+--------------------------------------------+------------------------------------------------+
| 46  | \subseteq, \nsubseteq, \subsetneq, \       | $\subseteq, \nsubseteq, \subsetneq,            |
|     | \varsubsetneq, \sqsubseteq                 |  \varsubsetneq, \sqsubseteq$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 47  | \supseteq, \nsupseteq, \supsetneq, \       | $\supseteq, \nsupseteq, \supsetneq,            |
|     | \varsupsetneq, \sqsupseteq                 |  \varsupsetneq, \sqsupseteq$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 48  | \subseteqq, \nsubseteqq, \subsetneqq, \    | $\subseteqq, \nsubseteqq, \subsetneqq,         |
|     | \varsubsetneqq                             | \varsubsetneqq$                                |
+-----+--------------------------------------------+------------------------------------------------+
| 49  | \supseteqq, \nsupseteqq, \supsetneqq, \    | $\supseteqq, \nsupseteqq, \supsetneqq,         |
|     | \varsupsetneqq                             | \varsupsetneqq$                                |
+-----+--------------------------------------------+------------------------------------------------+
|  **Relations**                                                                                    |
+-----+--------------------------------------------+------------------------------------------------+
| 50  | =, \ne, \neq, \equiv, \not\equiv           | $=, \ne, \neq, \equiv, \not\equiv$             |
+-----+--------------------------------------------+------------------------------------------------+
| 51  | \doteq, \doteqdot, \                       | $\doteq, \doteqdot,                            |
|     | \overset{\underset{\mathrm{def}}{}}{=}, := | \overset{\underset{\mathrm{def}}{}}{=}, :=$    |
+-----+--------------------------------------------+------------------------------------------------+
| 52  | \sim, \nsim, \backsim, \thicksim, \simeq,\ | $\sim, \nsim, \backsim, \thicksim, \simeq,     |
|     | \backsimeq, \eqsim, \cong, \ncong          | \backsimeq, \eqsim, \cong, \ncong$             |
+-----+--------------------------------------------+------------------------------------------------+
| 53  | \approx, \thickapprox, \approxeq, \asymp,\ | $\approx, \thickapprox, \approxeq, \asymp,     |
|     | \propto, \varpropto                        | \propto, \varpropto$                           |
+-----+--------------------------------------------+------------------------------------------------+
| 54  | <, \nless, \ll, \not\ll, \lll, \not\lll, \ | $<, \nless, \ll, \not\ll, \lll, \not\lll,      |
|     | \lessdot                                   | \lessdot$                                      |
+-----+--------------------------------------------+------------------------------------------------+
| 55  | \le, \leq, \lneq, \leqq, \nleq, \nleqq, \  | $\le, \leq, \lneq, \leqq, \nleq, \nleqq,       |
|     | \lneqq, \lvertneqq                         | \lneqq, \lvertneqq$                            |
+-----+--------------------------------------------+------------------------------------------------+
| 56  | \ge, \geq, \gneq, \geqq, \ngeq, \ngeqq, \  | $\ge, \geq, \gneq, \geqq, \ngeq, \ngeqq,       |
|     | \gneqq, \gvertneqq                         | \gneqq, \gvertneqq$                            |
+-----+--------------------------------------------+------------------------------------------------+
| 57  | \lessgtr, \lesseqgtr, \lesseqqgtr, \       | $\lessgtr, \lesseqgtr, \lesseqqgtr,            |
|     | \gtrless, \gtreqless, \gtreqqless          | \gtrless, \gtreqless, \gtreqqless$             |
+-----+--------------------------------------------+------------------------------------------------+
| 58  | \leqslant, \nleqslant, \eqslantless        | $\leqslant, \nleqslant, \eqslantless$          |
+-----+--------------------------------------------+------------------------------------------------+
| 59  | \geqslant, \ngeqslant, \eqslantgtr         | $\geqslant, \ngeqslant, \eqslantgtr$           |
+-----+--------------------------------------------+------------------------------------------------+
| 60  | \lesssim, \lnsim, \lessapprox, \lnapprox   | $\lesssim, \lnsim, \lessapprox, \lnapprox$     |
+-----+--------------------------------------------+------------------------------------------------+
| 61  | \gtrsim, \gnsim, \gtrapprox, \gnapprox     | $\gtrsim, \gnsim, \gtrapprox, \gnapprox$       |
+-----+--------------------------------------------+------------------------------------------------+
| 62  | \prec, \nprec, \preceq, \npreceq,\precneqq | $\prec, \nprec, \preceq, \npreceq, \precneqq$  |
+-----+--------------------------------------------+------------------------------------------------+
| 63  | \succ, \nsucc, \succeq, \nsucceq,\succneqq | $\succ, \nsucc, \succeq, \nsucceq, \succneqq$  |
+-----+--------------------------------------------+------------------------------------------------+
| 64  | \preccurlyeq, \curlyeqprec                 | $\preccurlyeq, \curlyeqprec$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 65  | \succcurlyeq, \curlyeqsucc                 | $\succcurlyeq, \curlyeqsucc$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 66  | \precsim, \precnsim, \precapprox, \        | $\precsim, \precnsim, \precapprox,             |
|     | \precnapprox                               | \precnapprox$                                  |
+-----+--------------------------------------------+------------------------------------------------+
| 67  | \succsim, \succnsim, \succapprox, \        | $\succsim, \succnsim, \succapprox,             |
|     | \succnapprox                               | \succnapprox$                                  |
+-----+--------------------------------------------+------------------------------------------------+
|  **Geometric**                                                                                    |
+-----+--------------------------------------------+------------------------------------------------+
| 68  | \parallel, \nparallel, \shortparallel, \   | $\parallel, \nparallel, \shortparallel,        |
|     | \nshortparallel                            | \nshortparallel$                               |
+-----+--------------------------------------------+------------------------------------------------+
| 69  | \perp, \angle, \sphericalangle, \          | $\perp, \angle, \sphericalangle,               |
|     | \measuredangle, 45^\circ                   | \measuredangle, 45^\circ$                      |
+-----+--------------------------------------------+------------------------------------------------+
| 70  | \Box, \square, \blacksquare, \diamond, \   | $\Box, \square, \blacksquare, \diamond,        |
|     | \Diamond, \lozenge, \blacklozenge,\bigstar | \Diamond, \lozenge, \blacklozenge,\bigstar$    |
+-----+--------------------------------------------+------------------------------------------------+
| 71  | \bigcirc, \triangle, \bigtriangleup, \     | $\bigcirc, \triangle, \bigtriangleup,          |
|     | \bigtriangledown                           | \bigtriangledown$                              |
+-----+--------------------------------------------+------------------------------------------------+
| 72  | \vartriangle, \triangledown                | $\vartriangle, \triangledown$                  |
+-----+--------------------------------------------+------------------------------------------------+
| 73  | \blacktriangle, \blacktriangledown, \      | $\blacktriangle, \blacktriangledown,           |
|     | \blacktriangleleft, \blacktriangleright    | \blacktriangleleft, \blacktriangleright$       |
+-----+--------------------------------------------+------------------------------------------------+
|  **Logic**                                                                                        |
+-----+--------------------------------------------+------------------------------------------------+
| 74  | \forall, \exists, \nexists                 | $\forall, \exists, \nexists$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 75  | \therefore, \because, \And                 | $\therefore, \because, \And$                   |
+-----+--------------------------------------------+------------------------------------------------+
| 76  | \lor \vee, \curlyvee, \bigvee              | $\lor \vee, \curlyvee, \bigvee$                |
+-----+--------------------------------------------+------------------------------------------------+
| 77  | \land \wedge, \curlywedge, \bigwedge       | $\land \wedge, \curlywedge, \bigwedge$         |
+-----+--------------------------------------------+------------------------------------------------+
| 78  | \bar{q}, \bar{abc}, \overline{q}, \        | $\bar{q}, \bar{abc}, \overline{q},             |
|     | \overline{abc},\\\\ \                      | \overline{abc}, \\                             |
|     | \lnot \neg, \not\operatorname{R},\bot,\top | \lnot \neg, \not\operatorname{R},\bot,\top$    |
+-----+--------------------------------------------+------------------------------------------------+
| 79  | \vdash \dashv, \vDash, \Vdash, \models     | $\vdash \dashv, \vDash, \Vdash, \models$       |
+-----+--------------------------------------------+------------------------------------------------+
| 80  | \Vvdash \nvdash \nVdash \nvDash \nVDash    | $\Vvdash \nvdash \nVdash \nvDash \nVDash$      |
+-----+--------------------------------------------+------------------------------------------------+
| 81  | \ulcorner \urcorner \llcorner \lrcorner    | $\ulcorner \urcorner \llcorner \lrcorner$      |
+-----+--------------------------------------------+------------------------------------------------+
|  **Arrows**                                                                                       |
+-----+--------------------------------------------+------------------------------------------------+
| 82  | \Rrightarrow, \Lleftarrow                  | $\Rrightarrow, \Lleftarrow$                    |
+-----+--------------------------------------------+------------------------------------------------+
| 83  | \Rightarrow, \nRightarrow, \               | $\Rightarrow, \nRightarrow,                    |
|     | \Longrightarrow, \implies                  | \Longrightarrow, \implies$                     |
+-----+--------------------------------------------+------------------------------------------------+
| 84  | \Leftarrow, \nLeftarrow, \Longleftarrow    | $\Leftarrow, \nLeftarrow, \Longleftarrow$      |
+-----+--------------------------------------------+------------------------------------------------+
| 85  | \Leftrightarrow, \nLeftrightarrow, \       | $\Leftrightarrow, \nLeftrightarrow,            |
|     | \Longleftrightarrow, \iff                  | \Longleftrightarrow, \iff$                     |
+-----+--------------------------------------------+------------------------------------------------+
| 86  | \Uparrow, \Downarrow, \Updownarrow         | $\Uparrow, \Downarrow, \Updownarrow$           |
+-----+--------------------------------------------+------------------------------------------------+
| 87  | \rightarrow \to, \nrightarrow, \           | $\rightarrow \to, \nrightarrow,                |
|     | \longrightarrow                            | \longrightarrow$                               |
+-----+--------------------------------------------+------------------------------------------------+
| 88  | \leftarrow \gets, \nleftarrow, \           | $\leftarrow \gets, \nleftarrow,                |
|     | \longleftarrow                             | \longleftarrow$                                |
+-----+--------------------------------------------+------------------------------------------------+
| 89  | \leftrightarrow, \nleftrightarrow, \       | $\leftrightarrow, \nleftrightarrow,            |
|     | \longleftrightarrow                        | \longleftrightarrow$                           |
+-----+--------------------------------------------+------------------------------------------------+
| 90  | \uparrow, \downarrow, \updownarrow         | $\uparrow, \downarrow, \updownarrow$           |
+-----+--------------------------------------------+------------------------------------------------+
| 91  | \nearrow, \swarrow, \nwarrow, \searrow     | $\nearrow, \swarrow, \nwarrow, \searrow$       |
+-----+--------------------------------------------+------------------------------------------------+
| 92  | \mapsto, \longmapsto                       | $\mapsto, \longmapsto$                         |
+-----+--------------------------------------------+------------------------------------------------+
| 93  | \rightharpoonup \rightharpoondown \        | $\rightharpoonup \rightharpoondown             |
|     | \leftharpoonup \leftharpoondown \          | \leftharpoonup \leftharpoondown                |
|     | \upharpoonleft \upharpoonright \           | \upharpoonleft \upharpoonright                 |
|     | \downharpoonleft \downharpoonright \       | \downharpoonleft \downharpoonright             |
|     | \rightleftharpoons \leftrightharpoons      | \rightleftharpoons \leftrightharpoons$         |
+-----+--------------------------------------------+------------------------------------------------+
| 94  | \curvearrowleft \circlearrowleft \Lsh \    | $\curvearrowleft \circlearrowleft \Lsh         |
|     | \upuparrows \rightrightarrows \            | \upuparrows \rightrightarrows                  |
|     | \rightleftarrows \rightarrowtail \         | \rightleftarrows \rightarrowtail               |
|     | \looparrowright                            | \looparrowright$                               |
+-----+--------------------------------------------+------------------------------------------------+
| 95  | \curvearrowright \circlearrowright \Rsh \  | $\curvearrowright \circlearrowright \Rsh       |
|     | \downdownarrows \leftleftarrows \          | \downdownarrows \leftleftarrows                |
|     | \leftrightarrows \leftarrowtail \          | \leftrightarrows \leftarrowtail                |
|     | \looparrowleft                             | \looparrowleft$                                |
+-----+--------------------------------------------+------------------------------------------------+
| 96  | \hookrightarrow \hookleftarrow \multimap \ | $\hookrightarrow \hookleftarrow \multimap      |
|     | \leftrightsquigarrow \rightsquigarrow \    | \leftrightsquigarrow \rightsquigarrow          |
|     | \twoheadrightarrow \twoheadleftarrow       | \twoheadrightarrow \twoheadleftarrow$          |
+-----+--------------------------------------------+------------------------------------------------+
|  **Special**                                                                                      |
+-----+--------------------------------------------+------------------------------------------------+
| 97  | \amalg \P \S \%\dagger\ddagger\ldots\cdots | $\amalg \P \S \% \dagger\ddagger\ldots\cdots$  |
+-----+--------------------------------------------+------------------------------------------------+
| 98  | \smile \frown \wr \triangleleft \          | $\smile \frown \wr \triangleleft               |
|     | \triangleright                             | \triangleright$                                |
+-----+--------------------------------------------+------------------------------------------------+
| 99  | \diamondsuit, \heartsuit, \clubsuit, \     | $\diamondsuit, \heartsuit, \clubsuit,          |
|     | \spadesuit, \Game, \flat, \natural, \sharp | \spadesuit, \Game, \flat, \natural, \sharp$    |
+-----+--------------------------------------------+------------------------------------------------+
|  **Unsorted**                                                                                     |
+-----+--------------------------------------------+------------------------------------------------+
| 100 | \diagup \diagdown \centerdot \ltimes \     | $\diagup \diagdown \centerdot \ltimes          |
|     | \rtimes \leftthreetimes \rightthreetimes   | \rtimes \leftthreetimes \rightthreetimes$      |
+-----+--------------------------------------------+------------------------------------------------+
| 101 | \eqcirc \circeq \triangleq \bumpeq\Bumpeq\ | $\eqcirc \circeq \triangleq \bumpeq\Bumpeq     |
|     | \doteqdot \risingdotseq \fallingdotseq     | \doteqdot \risingdotseq \fallingdotseq$        |
+-----+--------------------------------------------+------------------------------------------------+
| 102 | \intercal \barwedge \veebar \              | $\intercal \barwedge \veebar                   |
|     | \doublebarwedge \between \pitchfork        | \doublebarwedge \between \pitchfork$           |
+-----+--------------------------------------------+------------------------------------------------+
| 103 | \vartriangleleft \ntriangleleft \          | $\vartriangleleft \ntriangleleft               |
|     | \vartriangleright \ntriangleright          | \vartriangleright \ntriangleright$             |
+-----+--------------------------------------------+------------------------------------------------+
| 104 | \trianglelefteq \ntrianglelefteq \         | $\trianglelefteq \ntrianglelefteq              |
|     | \trianglerighteq \ntrianglerighteq         | \trianglerighteq \ntrianglerighteq$            |
+-----+--------------------------------------------+------------------------------------------------+

<br>

+-----+----------------------------------------------+------------------------------------------------+
| Larger expressions                                                                                  |
+-----+----------------------------------------------+------------------------------------------------+
|     | Source                                       | Temml                                          |
+=====+==============================================+================================================+
| 105 | a^2, a^{x+3}                                 | $a^2, a^{x+3}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 106 | a\_2                                         | $a_2$                                          |
+-----+----------------------------------------------+------------------------------------------------+
| 107 | 10^{30} a^{2+2} \                            | $10^{30} a^{2+2} \\                            |
|     | a\_{i,j} b\_{f'}                             | a_{i,j} b_{f'}$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 108 | x\_2^3 \                                     | $x_2^3 \\                                      |
|     | {x\_2}^3                                     | {x_2}^3$                                       |
+-----+----------------------------------------------+------------------------------------------------+
| 109 | 10^{10^{8}}                                  | $10^{10^{8}}$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 110 | \sideset{\_1^2}{\_3^4}\prod\_a^b  \          | $$\sideset{_1^2}{_3^4}\prod_a^b$$              |
|     | {}\_1^2\\!\Omega\_3^4                        | $${}_1^2\!\Omega_3^4$$                         |
+-----+----------------------------------------------+------------------------------------------------+
| 111 | \overset{\alpha}{\omega} \                   | $\overset{\alpha}{\omega} \\                   |
|     | \underset{\alpha}{\omega} \                  | \underset{\alpha}{\omega}  \\                  |
|     | \overset{\alpha}{\underset{\gamma}{\omega}}\ | \overset{\alpha}{\underset{\gamma}{\omega}}\\  |
|     | \stackrel{\alpha}{\omega}                    | \stackrel{\alpha}{\omega}$                     |
+-----+----------------------------------------------+------------------------------------------------+
| 112 | x', y'', f', f'' \                           | $x', y'', f', f'' \\                           |
|     | x^\prime, y^{\prime\prime}                   | x^\prime, y^{\prime\prime}$                    |
+-----+----------------------------------------------+------------------------------------------------+
| 113 | \dot{x}, \ddot{x}                            | $\dot{x}, \ddot{x}$                            |
+-----+----------------------------------------------+------------------------------------------------+
| 114 | \hat a \\ \bar b \\ \vec c \                 | $\hat a \ \bar b \ \vec c \\                   |
|     | \overrightarrow{a b} \\ \overleftarrow{c d}\ | \overrightarrow{a b} \ \overleftarrow{c d}\\   |
|     | \widehat{d e f} \                            | \widehat{d e f} \\                             |
|     | \overline{g h i} \\ \underline{j k l}        | \overline{g h i} \ \underline{j k l}$          |
+-----+----------------------------------------------+------------------------------------------------+
| 115 | \overset{\frown} {AB}                        | $\overset{\frown} {AB}$                        |
+-----+----------------------------------------------+------------------------------------------------+
| 116 | A \xleftarrow{n+\mu-1} B \                   | $A \xleftarrow{n+\mu-1} B                      |
|     | \xrightarrow[T]{n\pm i-1} C                  | \xrightarrow[T]{n\pm i-1} C$                   |
+-----+----------------------------------------------+------------------------------------------------+
| 117 | \overbrace{ 1+2+\cdots+100 }^{5050}          | $\overbrace{ 1+2+\cdots+100 }^{5050}$          |
+-----+----------------------------------------------+------------------------------------------------+
| 118 | \underbrace{ a+b+\cdots+z }\_{26}            | $\underbrace{ a+b+\cdots+z }_{26}$             |
+-----+----------------------------------------------+------------------------------------------------+
| 119 | \sum\_{k=1}^N k^2                            | $$\sum_{k=1}^N k^2$$                           |
+-----+----------------------------------------------+------------------------------------------------+
| 120 | \textstyle \sum\_{k=1}^N k^2                 | $$\textstyle \sum_{k=1}^N k^2$$                |
+-----+----------------------------------------------+------------------------------------------------+
| 121 | \frac{\sum\_{k=1}^N k^2}{a}                  | $$\frac{\sum_{k=1}^N k^2}{a}$$                 |
+-----+----------------------------------------------+------------------------------------------------+
| 122 | \frac{\sum\limits^{^N}\_{k=1} k^2}{a}        | $$\frac{\sum\limits^{^N}_{k=1} k^2}{a}$$       |
+-----+----------------------------------------------+------------------------------------------------+
| 123 | \prod\_{i=1}^N x\_i                          | $$\prod_{i=1}^N x_i$$                          |
+-----+----------------------------------------------+------------------------------------------------+
| 124 | \textstyle \prod\_{i=1}^N x\_i               | $$\textstyle \prod_{i=1}^N x_i$$               |
+-----+----------------------------------------------+------------------------------------------------+
| 125 | \coprod\_{i=1}^N x\_i                        | $$\coprod_{i=1}^N x_i$$                        |
+-----+----------------------------------------------+------------------------------------------------+
| 126 | \textstyle \coprod\_{i=1}^N x\_i             | $$\textstyle \coprod_{i=1}^N x_i$$             |
+-----+----------------------------------------------+------------------------------------------------+
| 127 | \lim\_{n \to \infty}x\_n                     | $$\lim_{n \to \infty}x_n$$                     |
+-----+----------------------------------------------+------------------------------------------------+
| 128 | \textstyle \lim\_{n \to \infty}x\_n          | $$\textstyle \lim_{n \to \infty}x_n$$          |
+-----+----------------------------------------------+------------------------------------------------+
| 129 | \int\limits\_{1}^{3}\frac{e^3/x}{x^2}\\, dx  | $$\int\limits_{1}^{3}\frac{e^3/x}{x^2}\, dx$$  |
+-----+----------------------------------------------+------------------------------------------------+
| 130 | \int\_{1}^{3}\frac{e^3/x}{x^2}\\, dx         | $$\int_{1}^{3}\frac{e^3/x}{x^2}\, dx$$         |
+-----+----------------------------------------------+------------------------------------------------+
| 131 | \textstyle \int\limits\_{-N}^{N} e^x dx      | $$\textstyle \int\limits_{-N}^{N} e^x dx$$     |
+-----+----------------------------------------------+------------------------------------------------+
| 132 | \textstyle \int\_{-N}^{N} e^x dx             | $$\textstyle \int_{-N}^{N} e^x dx$$            |
+-----+----------------------------------------------+------------------------------------------------+
| 133 | \iint\limits\_D dx\\,dy                      | $$\iint\limits_D dx\,dy$$                      |
+-----+----------------------------------------------+------------------------------------------------+
| 134 | \iiint\limits\_E dx\\,dy\\,dz                | $$\iiint\limits_E dx\,dy\,dz$$                 |
+-----+----------------------------------------------+------------------------------------------------+
| 135 | \iiiint\limits\_F dx\\,dy\\,dz\\,dt          | $$\iiiint\limits_F dx\,dy\,dz\,dt$$            |
+-----+----------------------------------------------+------------------------------------------------+
| 136 | \int\_{(x,y)\in C} x^3\\, dx + 4y^2\\, dy    | $$\int_{(x,y)\in C} x^3\, dx + 4y^2\, dy$$     |
+-----+----------------------------------------------+------------------------------------------------+
| 137 | \oint\_{(x,y)\in C} x^3\\, dx + 4y^2\\, dy   | $$\oint_{(x,y)\in C} x^3\, dx + 4y^2\, dy$$    |
+-----+----------------------------------------------+------------------------------------------------+
| 138 | \bigcap\_{i=1}^n E\_i                        | $$\bigcap_{i=1}^n E_i$$                        |
+-----+----------------------------------------------+------------------------------------------------+
| 139 | \bigcup\_{i=1}^n E\_i                        | $$\bigcup_{i=1}^n E_i$$                        |
+-----+----------------------------------------------+------------------------------------------------+
| **Fractions, matrices, multiline**                                                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 140 | \frac{2}{4}=0.5 or {2 \over 4}=0.5           | $\frac{2}{4}=0.5$  or ${2 \over 4}=0.5$        |
+-----+----------------------------------------------+------------------------------------------------+
| 141 | \tfrac{2}{4} = 0.5                           | $$\tfrac{2}{4} = 0.5$$                         |
+-----+----------------------------------------------+------------------------------------------------+
| 142 | \dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \    | $\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c +       |
|     | \dfrac{2}{d + \dfrac{2}{4}}} = a             | \dfrac{2}{d + \dfrac{2}{4}}} = a$              |
+-----+----------------------------------------------+------------------------------------------------+
| 143 | \cfrac{2}{c +\cfrac{2}{d +\cfrac{2}{4}}} = a | $$\cfrac{2}{c+\cfrac{2}{d+\cfrac{2}{4}}} = a$$ |
+-----+----------------------------------------------+------------------------------------------------+
| 144 | \cfrac{x}{1 + \cfrac{\cancel{y}}\            | $\cfrac{x}{1 + \cfrac{\cancel{y}}              |
|     | {\cancel{y}}} = \cfrac{x}{2}                 | {\cancel{y}}} = \cfrac{x}{2}$                  |
+-----+----------------------------------------------+------------------------------------------------+
| 145 | \binom{n}{k}                                 | $\binom{n}{k}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 146 | \tbinom{n}{k}                                | $$\tbinom{n}{k}$$                              |
+-----+----------------------------------------------+------------------------------------------------+
| 147 | \dbinom{n}{k}                                | $\dbinom{n}{k}$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 148 | \begin{matrix} \                             | $\begin{matrix}                                |
|     |  x & y \\\\ \                                | x & y \\                                       |
|     |  z & v \                                     | z & v                                          |
|     | \end{matrix}                                 | \end{matrix}$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 149 | \begin{vmatrix} \                            | $\begin{vmatrix}                               |
|     |  x & y \\\\ \                                | x & y \\                                       |
|     |  z & v \                                     | z & v                                          |
|     | \end{vmatrix}                                | \end{vmatrix}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 150 | \begin{Vmatrix} \                            | $\begin{Vmatrix}                               |
|     |  x & y \\\\ \                                | x & y \\                                       |
|     |  z & v \                                     | z & v                                          |
|     | \end{Vmatrix}                                | \end{Vmatrix}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 151 | \begin{bmatrix} \                            | $\begin{bmatrix}                               |
|     |  0 & \cdots & 0 \\\\ \                       | 0 & \cdots & 0 \\                              |
|     | \vdots & \ddots & \vdots \\\\ \              | \vdots & \ddots & \vdots \\                    |
|     |  0 & \cdots & 0 \                            | 0 & \cdots & 0                                 |
|     | \end{bmatrix}                                | \end{bmatrix}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 152 | \begin{Bmatrix} \                            | $\begin{Bmatrix}                               |
|     |  x & y \\\\ \                                | x & y \\                                       |
|     |  z & v \                                     | z & v                                          |
|     | \end{Bmatrix}                                | \end{Bmatrix}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 153 | \begin{pmatrix} \                            | $\begin{pmatrix}                               |
|     |  x & y \\\\ \                                | x & y \\                                       |
|     |  z & v \                                     | z & v                                          |
|     | \end{pmatrix}                                | \end{pmatrix}$                                 |
+-----+----------------------------------------------+------------------------------------------------+
| 154 | \bigl( \begin{smallmatrix} \                 | $\bigl( \begin{smallmatrix}                    |
|     | a&b\\\\ c&d \                                | a&b\\ c&d                                      |
|     | \end{smallmatrix} \bigr)                     | \end{smallmatrix} \bigr)$                      |
+-----+----------------------------------------------+------------------------------------------------+
| 155 | f(n) = \begin{cases} \                       | $f(n) = \begin{cases}                          |
|     | n/2, & \text{if }n\text{ is even} \\\\ \     | n/2, & \text{if }n\text{ is even} \\           |
|     | 3n+1, & \text{if }n\text{ is odd}            | 3n+1, & \text{if }n\text{ is odd}              |
|     | \end{cases}                                  | \end{cases}$                                   |
+-----+----------------------------------------------+------------------------------------------------+
| 156 | \begin{cases} \                              | $\begin{cases}                                 |
|     | 3x + 5y + z \\\\ \                           | 3x + 5y + z \\                                 |
|     | 7x - 2y + 4z \\\\ \                          | 7x - 2y + 4z \\                                |
|     | -6x + 3y + 2z                                | -6x + 3y + 2z                                  |
|     | \end{cases}                                  | \end{cases}$                                   |
+-----+----------------------------------------------+------------------------------------------------+
| 157 | \begin{align} \                              | $$\begin{align}                                |
|     | f(x) & = (a+b)^2 \\\\ \                      | f(x) & = (a+b)^2 \\                            |
|     | & = a^2+2ab+b^2 \\\\ \                       | & = a^2+2ab+b^2 \\                             |
|     | \end{align}                                  | \end{align}$$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 158 | \begin{alignat}{2} \                         | $$\begin{alignat}{2}                           |
|     | f(x) & = (a+b)^2 \\\\ \                      | f(x) & = (a+b)^2 \\                            |
|     | & = a^2+2ab+b^2 \\\\ \                       | & = a^2+2ab+b^2 \\                             |
|     | \end{alignat}                                | \end{alignat}$$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 159 | \begin{align} \                              | $$\begin{align}                                |
|     | f(a,b) & = (a+b)^2 && = (a+b)(a+b) \\\\ \    | f(a,b) & = (a+b)^2 && = (a+b)(a+b) \\          |
|     | & = a^2+ab+ba+b^2  && = a^2+2ab+b^2 \\\\ \   | & = a^2+ab+ba+b^2  && = a^2+2ab+b^2 \\         |
|     | \end{align}                                  | \end{align}$$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 159 | \begin{alignat}{3} \                         | $$\begin{alignat}{3}                           |
|     | f(a,b) & = (a+b)^2 && = (a+b)(a+b) \\\\ \    | f(a,b) & = (a+b)^2 && = (a+b)(a+b) \\          |
|     | & = a^2+ab+ba+b^2  && = a^2+2ab+b^2 \\\\ \   | & = a^2+ab+ba+b^2  && = a^2+2ab+b^2 \\         |
|     | \end{alignat}                                | \end{alignat}$$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 160 | \begin{array}{lcl} \                         | $$\begin{array}{lcl}                           |
|     | z & = & a \\\\ \                             | z & = & a \\                                   |
|     | f(x,y,z) & = & x + y + z                     | f(x,y,z) & = & x + y + z                       |
|     | \end{array}                                  | \end{array}$$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 161 | \begin{array}{lcr} \                         | $$\begin{array}{lcr}                           |
|     | z & = & a \\\\ \                             | z & = & a \\                                   |
|     | f(x,y,z) & = & x + y + z                     | f(x,y,z) & = & x + y + z                       |
|     | \end{array}                                  | \end{array}$$                                  |
+-----+----------------------------------------------+------------------------------------------------+
| 162 | \begin{alignat}{4} \                         | $$\begin{alignat}{4}                           |
|     | F:\\; && C(X) && \\;\to\\;  & C(X) \\\\ \    | F:\; && C(X) && \;\to\;  & C(X) \\             |
|     | && g    && \\;\mapsto\\; & g^2               | && g    && \;\mapsto\; & g^2                   |
|     | \end{alignat}                                | \end{alignat}$$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 163 | \begin{alignat}{4} \                         | $$\begin{alignat}{4}                           |
|     | F:\\; && C(X) && \\;\to\\; && C(X) \\\\ \    | F:\; && C(X) && \;\to\; && C(X) \\             |
|     | && g    && \\;\mapsto\\; && g^2              | && g    && \;\mapsto\; && g^2                  |
|     | \end{alignat}                                | \end{alignat}$$                                |
+-----+----------------------------------------------+------------------------------------------------+
| 164 | `f(x) \,\!` `=\sum_{n=0}^\infty a_n x^n` \   | $f(x) \,\!$  $= \sum_{n=0}^\infty a_n x^n$     |
|     | `= a_0+a_1x+a_2x^2+\cdots`                   | $= a_0+a_1x+a_2x^2+\cdots$                     |
+-----+----------------------------------------------+------------------------------------------------+
| 165 | \begin{array}{|c|c|c|} \                     | $\begin{array}{|c|c|c|}                        |
|     | a & b & S \\\\ \                             | a & b & S \\                                   |
|     | \hline \                                     | \hline                                         |
|     | 0 & 0 & 1 \\\\ \                             | 0 & 0 & 1 \\                                   |
|     | 0 & 1 & 1 \\\\ \                             | 0 & 1 & 1 \\                                   |
|     | 1 & 0 & 1 \\\\ \                             | 1 & 0 & 1 \\                                   |
|     | 1 & 1 & 0 \\\\ \                             | 1 & 1 & 0 \\                                   |
|     | \end{array}                                  | \end{array}$                                   |
+-----+----------------------------------------------+------------------------------------------------+
{colWidths="null null 400"}

+-----+-----------------------------------------------+--------------------------------------------------+
| Delimiters                                                                                             |
+=====+===============================================+==================================================+
| 166 | ( \frac{1}{2} )^n                             | $( \frac{1}{2} )^n$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 167 | \left ( \frac{1}{2} \right )^n                | $\left ( \frac{1}{2} \right )^n$                 |
+-----+-----------------------------------------------+--------------------------------------------------+
| 168 | \left ( \frac{a}{b} \right )                  | $\left ( \frac{a}{b} \right )$                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 169 | \left [ \frac{a}{b} \right ] \quad \          | $\left [ \frac{a}{b} \right ] \quad              |
|     | \left \lbrack \frac{a}{b} \right \rbrack      | \left \lbrack \frac{a}{b} \right \rbrack$        |
+-----+-----------------------------------------------+--------------------------------------------------+
| 170 | \left \{ \frac{a}{b} \right \} \quad \        | $\left \{ \frac{a}{b} \right \} \quad            |
|     | \left \lbrace \frac{a}{b} \right \rbrace      | \left \lbrace \frac{a}{b} \right \rbrace$        |
+-----+-----------------------------------------------+--------------------------------------------------+
| 171 | \left \langle \frac{a}{b} \right \rangle      | $\left \langle \frac{a}{b} \right \rangle$       |
+-----+-----------------------------------------------+--------------------------------------------------+
| 172 | \left | \frac{a}{b} \right \vert \quad \      | $\left | \frac{a}{b} \right \vert \quad          |
|     | \left \Vert \frac{c}{d} \right \|             | \left \Vert \frac{c}{d} \right \|$               |
+-----+-----------------------------------------------+--------------------------------------------------+
| 173 | \left \lfloor \frac{a}{b} \right \rfloor \    | $\left \lfloor \frac{a}{b} \right \rfloor        |
|     | \quad \left \lceil \frac{c}{d} \right \rceil  | \quad \left \lceil \frac{c}{d} \right \rceil$    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 174 | \left / \frac{a}{b} \right \backslash         | $\left / \frac{a}{b} \right \backslash$          |
+-----+-----------------------------------------------+--------------------------------------------------+
| 175 | \left\uparrow\frac{a}{b}\right\downarrow\\; \ | $\left\uparrow\frac{a}{b}\right\downarrow\;      |
|     | \left\Uparrow\frac{a}{b}\right\Downarrow\\; \ | \left\Uparrow\frac{a}{b}\right\Downarrow\;       |
|     | \left \updownarrow \frac{a}{b} \right \       | \left \updownarrow \frac{a}{b} \right            |
|     | \Updownarrow                                  | \Updownarrow$                                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 176 | \left [ 0,1 \right ) \                        | $\left [ 0,1 \right )                            |
|     | \left \langle \psi \right |                   | \left \langle \psi \right |$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 177 | \left . \frac{A}{B} \right \} \to X           | $\left . \frac{A}{B} \right \} \to X$            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 178 | ( \bigl( \Bigl( \biggl( \Biggl( \dots \       | $( \bigl( \Bigl( \biggl( \Biggl( \dots           |
|     | \Biggr] \biggr] \Bigr] \bigr] ]               | \Biggr] \biggr] \Bigr] \bigr] ]$                 |
+-----+-----------------------------------------------+--------------------------------------------------+
| 179 | \{ \bigl\{ \Bigl\{ \biggl\{ \Biggl\{ \dots \  | $\{ \bigl\{ \Bigl\{ \biggl\{ \Biggl\{ \dots      |
|     | \Biggr\rangle \biggr\rangle \Bigr\rangle \    | \Biggr\rangle \biggr\rangle \Bigr\rangle         |
|     | \bigr\rangle \rangle                          | \bigr\rangle \rangle$                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 180 | \| \big\| \Big\| \bigg\| \Bigg\| \dots \      | $\| \big\| \Big\| \bigg\| \Bigg\| \dots          |
|     | \Bigg| \bigg| \Big| \big| |                   | \Bigg| \bigg| \Big| \big| |$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 181 | \lfloor \bigl\lfloor \Bigl\lfloor \           | $\lfloor \bigl\lfloor \Bigl\lfloor               |
|     | \biggl\lfloor \Biggl\lfloor \dots \           | \biggl\lfloor \Biggl\lfloor \dots                |
|     | \Biggr\rceil \biggr\rceil \Bigr\rceil \       | \Biggr\rceil \biggr\rceil \Bigr\rceil            |
|     | \bigr\rceil \rceil                            | \bigr\rceil \rceil$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 182 | \uparrow \big\uparrow \Big\uparrow \          | $\uparrow \big\uparrow \Big\uparrow              |
|     | \bigg\uparrow \Bigg\uparrow \dots \           | \bigg\uparrow \Bigg\uparrow \dots                |
|     | \Bigg\Downarrow \bigg\Downarrow \             | \Bigg\Downarrow \bigg\Downarrow                  |
|     | \Big\Downarrow \big\Downarrow \Downarrow      | \Big\Downarrow \big\Downarrow \Downarrow$        |
+-----+-----------------------------------------------+--------------------------------------------------+
| 183 | \updownarrow\big\updownarrow\Big\updownarrow\ | $\updownarrow\big\updownarrow\Big\updownarrow    |
|     | \bigg\updownarrow \Bigg\updownarrow \dots \   | \bigg\updownarrow \Bigg\updownarrow \dots        |
|     | \Bigg\Updownarrow \bigg\Updownarrow \Big \    | \Bigg\Updownarrow \bigg\Updownarrow \Big         |
|     | \Updownarrow \big\Updownarrow \Updownarrow    | \Updownarrow \big\Updownarrow \Updownarrow$      |
+-----+-----------------------------------------------+--------------------------------------------------+
| 184 | / \big/ \Big/ \bigg/ \Bigg/ \dots \           | $/ \big/ \Big/ \bigg/ \Bigg/ \dots               |
|     | \Bigg\backslash \bigg\backslash \Big \        | \Bigg\backslash \bigg\backslash \Big             |
|     | \backslash \big\backslash \backslash          | \backslash \big\backslash \backslash$            |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Greek Alphabet**                                                                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 185 | \Alpha \Beta \Gamma \Delta \Epsilon \Zeta \   | $\Alpha \Beta \Gamma \Delta \Epsilon \Zeta       |
|     | \Eta \Theta                                   | \Eta \Theta$                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 186 | \Iota \Kappa \Lambda \Mu \Nu \Xi \Omicron \Pi | $\Iota \Kappa \Lambda \Mu \Nu \Xi \Omicron \Pi$  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 187 | \Rho \Sigma \Tau \Upsilon \Phi \Chi \Psi \    | $\Rho \Sigma \Tau \Upsilon \Phi \Chi \Psi        |
|     | \Omega                                        | \Omega$                                          |
+-----+-----------------------------------------------+--------------------------------------------------+
| 188 | \alpha \beta \gamma \delta \epsilon \zeta \   | $\alpha \beta \gamma \delta \epsilon \zeta       |
|     | \eta \theta                                   | \eta \theta$                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 189 | \iota \kappa \lambda \mu \nu \xi \omicron \pi | $\iota \kappa \lambda \mu \nu \xi \omicron \pi$  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 190 | \rho \sigma \tau \upsilon \phi \chi \psi \    | $\rho \sigma \tau \upsilon \phi \chi \psi        |
|     | \omega                                        | \omega$                                          |
+-----+-----------------------------------------------+--------------------------------------------------+
| 191 | \varGamma \varDelta \varTheta \varLambda \    | $\varGamma \varDelta \varTheta \varLambda        |
|     | \varXi \varPi \varSigma \varPhi \varUpsilon \ | \varXi \varPi \varSigma \varPhi \varUpsilon      |
|     | \varOmega                                     | \varOmega$                                       |
+-----+-----------------------------------------------+--------------------------------------------------+
| 192 | \varepsilon \digamma \varkappa \varpi \       | $\varepsilon \digamma \varkappa \varpi           |
|     | \varrho \varsigma \vartheta \varphi           | \varrho \varsigma \vartheta \varphi$             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Hebrew symbols**                                                                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 193 | \aleph \beth \gimel \daleth                   | $\aleph \beth \gimel \daleth$                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Blackboard bold**                                                                                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 194 | \mathbb{ABCDEFGHI} \                          | $\mathbb{ABCDEFGHI} \\                           |
|     | \mathbb{JKLMNOPQR} \                          | \mathbb{JKLMNOPQR} \\                            |
|     | \mathbb{STUVWXYZ}                             | \mathbb{STUVWXYZ}$                               |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Boldface**                                                                                           |
+-----+-----------------------------------------------+--------------------------------------------------+
| 195 | \mathbf{ABCDEFGHI} \                          | $\mathbf{ABCDEFGHI} \\                           |
|     | \mathbf{JKLMNOPQR} \                          | \mathbf{JKLMNOPQR} \\                            |
|     | \mathbf{STUVWXYZ} \                           | \mathbf{STUVWXYZ} \\                             |
|     | \mathbf{abcdefghijklm} \                      | \mathbf{abcdefghijklm} \\                        |
|     | \mathbf{nopqrstuvwxyz} \                      | \mathbf{nopqrstuvwxyz} \\                        |
|     | \mathbf{0123456789}                           | \mathbf{0123456789}$                             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Boldface Greek**                                                                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 196 | \boldsymbol{\Alpha \Beta \Gamma \Delta \      | $\boldsymbol{\Alpha \Beta \Gamma \Delta          |
|     | \Epsilon \Zeta \Eta \Theta}                   | \Epsilon \Zeta \Eta \Theta}$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 197 | \boldsymbol{\Iota \Kappa \Lambda \Mu \Nu \Xi\ | $\boldsymbol{\Iota \Kappa \Lambda \Mu \Nu \Xi    |
|     |  \Omicron \Pi}                                | \Omicron \Pi}$                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 198 | \boldsymbol{\Rho \Sigma \Tau \Upsilon \Phi \  | $\boldsymbol{\Rho \Sigma \Tau \Upsilon \Phi      |
|     | \Chi \Psi \Omega}                             | \Chi \Psi \Omega}$                               |
+-----+-----------------------------------------------+--------------------------------------------------+
| 199 | \boldsymbol{\alpha \beta \gamma \delta \      | $\boldsymbol{\alpha \beta \gamma \delta          |
|     | \epsilon \zeta \eta \theta}                   | \epsilon \zeta \eta \theta}$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 200 | \boldsymbol{\iota \kappa \lambda \mu \nu \xi\ | $\boldsymbol{\iota \kappa \lambda \mu \nu \xi    |
|     | \omicron \pi}                                 | \omicron \pi}$                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 201 | \boldsymbol{\rho \sigma \tau \upsilon \phi \  | $\boldsymbol{\rho \sigma \tau \upsilon \phi      |
|     | \chi \psi \omega}                             | \chi \psi \omega}$                               |
+-----+-----------------------------------------------+--------------------------------------------------+
| 202 | \boldsymbol{\varepsilon\digamma\varkappa\     | $\boldsymbol{\varepsilon\digamma\varkappa        |
|     | \varpi}                                       | \varpi}$                                         |
+-----+-----------------------------------------------+--------------------------------------------------+
| 203 | \boldsymbol{\varrho\varsigma\vartheta\varphi} | $\boldsymbol{\varrho\varsigma\vartheta\varphi}$  |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Italics**                                                                                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 204 | \mathit{0123456789}                           | $\mathit{0123456789}$                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Greek Italics**                                                                                      |
+-----+-----------------------------------------------+--------------------------------------------------+
| 205 | \mathit{\Alpha \Beta \Gamma \Delta \Epsilon \ | $\mathit{\Alpha \Beta \Gamma \Delta \Epsilon     |
|     | \Zeta \Eta \Theta}                            | \Zeta \Eta \Theta}$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 206 | \mathit{\Iota \Kappa \Lambda \Mu \Nu \Xi \    | $\mathit{\Iota \Kappa \Lambda \Mu \Nu \Xi        |
|     | \Omicron \Pi}                                 | \Omicron \Pi}$                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 207 | \mathit{\Rho \Sigma \Tau \Upsilon \Phi \Chi \ | $\mathit{\Rho \Sigma \Tau \Upsilon \Phi \Chi     |
|     | \Psi \Omega}                                  | \Psi \Omega}$                                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Greek uppercase boldface italics**                                                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 208 | \boldsymbol{\varGamma \varDelta \varTheta \   | $\boldsymbol{\varGamma \varDelta \varTheta       |
|     | \varLambda}                                   | \varLambda}$                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 209 | \boldsymbol{\varXi \varPi \varSigma \         | $\boldsymbol{\varXi \varPi \varSigma             |
|     | \varUpsilon \varOmega}                        | \varUpsilon \varOmega}$                          |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Roman typeface**                                                                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 210 | \mathrm{ABCDEFGHI} \                          | $\mathrm{ABCDEFGHI} \\                           |
|     | \mathrm{JKLMNOPQR} \                          | \mathrm{JKLMNOPQR} \\                            |
|     | \mathrm{STUVWXYZ} \                           | \mathrm{STUVWXYZ} \\                             |
|     | \mathrm{abcdefghijklm} \                      | \mathrm{abcdefghijklm} \\                        |
|     | \mathrm{nopqrstuvwxyz} \                      | \mathrm{nopqrstuvwxyz} \\                        |
|     | \mathrm{0123456789}                           | \mathrm{0123456789}$                             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Sans serif**                                                                                         |
+-----+-----------------------------------------------+--------------------------------------------------+
| 211 | \mathsf{ABCDEFGHI} \                          | $\mathsf{ABCDEFGHI} \\                           |
|     | \mathsf{JKLMNOPQR} \                          | \mathsf{JKLMNOPQR} \\                            |
|     | \mathsf{STUVWXYZ} \                           | \mathsf{STUVWXYZ} \\                             |
|     | \mathsf{abcdefghijklm} \                      | \mathsf{abcdefghijklm} \\                        |
|     | \mathsf{nopqrstuvwxyz} \                      | \mathsf{nopqrstuvwxyz} \\                        |
|     | \mathsf{0123456789}                           | \mathsf{0123456789}$                             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Sans serif Greek**                                                                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 212 | \mathsf{\Alpha \Beta \Gamma \Delta \Epsilon \ | $\mathsf{\Alpha \Beta \Gamma \Delta \Epsilon     |
|     | \Zeta \Eta \Theta}                            | \Zeta \Eta \Theta}$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 213 | \mathsf{\Iota \Kappa \Lambda \Mu \Nu \Xi \    | $\mathsf{\Iota \Kappa \Lambda \Mu \Nu \Xi        |
|     | \Omicron \Pi}                                 | \Omicron \Pi}$                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 214 | \mathsf{\Rho \Sigma \Tau \Upsilon \Phi \Chi \ | $\mathsf{\Rho \Sigma \Tau \Upsilon \Phi \Chi     |
|     | \Psi \Omega}                                  | \Psi \Omega}$                                    |
+-----+-----------------------------------------------+--------------------------------------------------+

Unicode has special code points for bold Greek sans-serif, but no code points for\
regular-weight Greek sans-serif. I know of no servable math font that has glyphs\
for regular-weight Greek sans-serif. Consequently, these bold Greek sans-serif\
glyphs are the best approximation I can make to sans-serif Greek.

<br>

+-----+-----------------------------------------------+--------------------------------------------------+
| **Calligraphy**                                                                                        |
+-----+-----------------------------------------------+--------------------------------------------------+
| 215 | \mathcal{ABCDEFGHI} \                         | $\mathcal{ABCDEFGHI} \\                          |
|     | \mathcal{JKLMNOPQR} \                         | \mathcal{JKLMNOPQR} \\                           |
|     | \mathcal{STUVWXYZ} \                          | \mathcal{STUVWXYZ} \\                            |
|     | \mathcal{abcdefghi} \                         | \mathcal{abcdefghi} \\                           |
|     | \mathcal{jklmnopqr} \                         | \mathcal{jklmnopqr} \\                           |
|     | \mathcal{stuvwxyz}                            | \mathcal{stuvwxyz}$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Fraktur**                                                                                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 216 | \mathfrak{ABCDEFGHI} \                        | $\mathfrak{ABCDEFGHI} \\                         |
|     | \mathfrak{JKLMNOPQR} \                        | \mathfrak{JKLMNOPQR} \\                          |
|     | \mathfrak{STUVWXYZ} \                         | \mathfrak{STUVWXYZ} \\                           |
|     | \mathfrak{abcdefghi} \                        | \mathfrak{abcdefghi} \\                          |
|     | \mathfrak{jklmnopqr} \                        | \mathfrak{jklmnopqr} \\                          |
|     | \mathfrak{stuvwxyz}                           | \mathfrak{stuvwxyz}$                             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Scriptstyle text**                                                                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 217 | {\scriptstyle\text{abcdefghijklm}}            | ${\scriptstyle\text{abcdefghijklm}}$             |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Mixed text faces**                                                                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 218 | x y z                                         | $x y z$                                          |
+-----+-----------------------------------------------+--------------------------------------------------+
| 219 | \text{x y z}                                  | $\text{x y z}$                                   |
+-----+-----------------------------------------------+--------------------------------------------------+
| 220 | \text{if} n \text{is even}                    | $\text{if} n \text{is even}$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 221 | \text{if }n\text{ is even}                    | $\text{if }n\text{ is even}$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 222 | \text{if}~n\ \text{is even}                   | $\text{if}~n\ \text{is even}$                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Color**                                                                                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 223 | {\color{Blue}x^2}+{\color{Orange}2x}-\        | ${\color{Blue}x^2}+{\color{Orange}2x}-           |
|     | {\color{LimeGreen}1}                          | {\color{LimeGreen}1}$                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 224 | x_{1,2}=\frac{{\color{Blue}-b}\pm\            | $x_{1,2}=\frac{{\color{Blue}-b}\pm               |
|     | \sqrt{\color{Red}b^2-4ac}}{\color{Green}2a }  | \sqrt{\color{Red}b^2-4ac}}{\color{Green}2a }$    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 225 | {\color{Blue}x^2}+{\color{Orange}2x}-\        | ${\color{Blue}x^2}+{\color{Orange}2x}-           |
|     | {\color{LimeGreen}1}                          | {\color{LimeGreen}1}$                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 226 | \color{Blue}x^2\color{Black}+\color{Orange}\  | $\color{Blue}x^2\color{Black}+\color{Orange}     |
|     | 2x\color{Black}-\color{LimeGreen}1            | 2x\color{Black}-\color{LimeGreen}1$              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 227 | \color{Blue}{x^2}+\color{Orange}{2x}-\        | $\color{Blue}{x^2}+\color{Orange}{2x}-           |
|     | \color{LimeGreen}{1}                          | \color{LimeGreen}{1}$                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 228 | \definecolor{myorange}{rgb}{1,0.65,0.4}\      | $\definecolor{myorange}{rgb}{1,0.65,0.4}         |
|     | \color{myorange}e^{i \pi}\color{Black} + 1= 0 | \color{myorange}e^{i \pi}\color{Black} + 1= 0$   |
+-----+-----------------------------------------------+--------------------------------------------------+

For color names, see the [color section](https://temml.org/docs/en/supported.html#color)
in the Temml function support page.

<br>

+-----+-----------------------------------------------+--------------------------------------------------+
| **Spacing**                                                                                            |
+=====+===============================================+==================================================+
| 229 | a \qquad b \                                  | $a \qquad b \\                                   |
|     | a \quad b \                                   | a \quad b \\                                     |
|     | a\ b \                                        | a\ b \\                                          |
|     | a \text{ } b \                                | a \text{ } b \\                                  |
|     | a\\;b \                                       | a\;b \\                                          |
|     | a\\,b \                                       | a\,b \\                                          |
|     | ab \                                          | ab \\                                            |
|     | a b \                                         | a b \\                                           |
|     | \mathit{ab} \                                 | \mathit{ab} \\                                   |
|     | a\\!b                                         | a\!b$                                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 230 | | \uparrow \rangle                            | $| \uparrow \rangle$                             |
+-----+-----------------------------------------------+--------------------------------------------------+
| 231 | \left| \uparrow \right\rangle                 | $\left| \uparrow \right\rangle$                  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 232 | | {\uparrow} \rangle                          | $| {\uparrow} \rangle$                           |
+-----+-----------------------------------------------+--------------------------------------------------+
| 233 | | \mathord\uparrow \rangle                    | $| \mathord\uparrow \rangle$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| **Temml replacements for wiki workarounds**                                                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 234 | \oiint\limits\_D dx\\,dy \                    | $$\oiint\limits_D dx\,dy$$                       |
|     | \oiiint\limits\_E dx\\,dy\\,dz                | $$\oiiint\limits_E dx\,dy\,dz$$                  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 234 | \wideparen{AB}                                | $\wideparen{AB}$                                 |
+-----+-----------------------------------------------+--------------------------------------------------+
| 235 | \dddot{x}                                     | $\dddot{x}$                                      |
+-----+-----------------------------------------------+--------------------------------------------------+
| 236 | \operatorname*{median}\_\                     | $$\operatorname*{median}_{j\,\ne\,i} X_{i,j}$$   |
|     | {j\\,\ne\\,i} X\_{i,j}                        |                                                  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 237 | \sout{q}                                      | $\sout{q}$                                       |
+-----+-----------------------------------------------+--------------------------------------------------+
| 238 | \mathrlap{\\,/}{=}                            | $\mathrlap{\,/}{=}$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 239 | \text{\textsf{textual description}}           | $\text{\textsf{textual description}}$            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 240 | α π                                           | $α π$                                            |
+-----+-----------------------------------------------+--------------------------------------------------+

`mhchem` examples are displayed on their own [test page](https://temml.org/tests/mhchem-tests.html).

<br>

+-----+-----------------------------------------------+--------------------------------------------------+
| **Examples of implemented TeX formulas**                                                               |
+=====+===============================================+==================================================+
| 241 | ax^2 + bx + c = 0                             | $ax^2 + bx + c = 0$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 242 | x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}              | $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$               |
+-----+-----------------------------------------------+--------------------------------------------------+
| 243 | \left( \frac{\left(3-x\right) \               | $\left( \frac{\left(3-x\right)                   |
|     | \times 2}{3-x} \right)                        | \times 2}{3-x} \right)$                          |
+-----+-----------------------------------------------+--------------------------------------------------+
| 244 | S\_{\text{new}} = S\_{\text{old}} - \         | $$S_{\text{new}} = S_{\text{old}} -              |
|     | \frac{ \left( 5-T \right) ^2} {2}             | \frac{ \left( 5-T \right) ^2} {2}$$              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 245 | \int\_a^x \int\_a^s f(y)\\,dy\\,ds = \        | $$\int_a^x \int_a^s f(y)\,dy\,ds =               |
|     | \int\_a^x f(y)(x-y)\\,dy                      | \int_a^x f(y)(x-y)\,dy$$                         |
+-----+-----------------------------------------------+--------------------------------------------------+
| 246 | \int\_e^{\infty}\frac {1}{t(\ln t)^2}dt = \   | $$\int_e^{\infty}\frac {1}{t(\ln t)^2}dt =       |
|     | \left. \frac{-1}{\ln t}\right\vert\_e^\infty\ | \left. \frac{-1}{\ln t} \right\vert_e^\infty     |
|     | = 1                                           | = 1$$                                            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 247 | \det(\mathsf{A}-\lambda\mathsf{I}) = 0        | $\det(\mathsf{A}-\lambda\mathsf{I}) = 0$         |
+-----+-----------------------------------------------+--------------------------------------------------+
| 248 | \sum\_{i=0}^{n-1} i                           | $$\sum_{i=0}^{n-1} i$$                           |
+-----+-----------------------------------------------+--------------------------------------------------+
| 249 | \sum\_{m=1}^\infty\sum\_{n=1}^\infty \        | $$\sum_{m=1}^\infty\sum_{n=1}^\infty             |
|     | \frac{m^2 n}{3^m\left(m 3^n + n 3^m\right)}   | \frac{m^2 n}{3^m\left(m 3^n + n 3^m\right)}$$    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 250 | u'' + p(x)u' + q(x)u=f(x),\quad x>a           | $u'' + p(x)u' + q(x)u=f(x),\quad x>a$            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 251 | |\bar{z}| = |z|, |(\bar{z})^n| = |z|^n, \     | $|\bar{z}| = |z|, |(\bar{z})^n| = |z|^n,         |
|     | \arg(z^n) = n \arg(z)                         | \arg(z^n) = n \arg(z)$                           |
+-----+-----------------------------------------------+--------------------------------------------------+
| 252 | \lim\_{z\to z\_0} f(z)=f(z\_0)                | $$\lim_{z\to z_0} f(z)=f(z_0)$$                  |
+-----+-----------------------------------------------+--------------------------------------------------+
| 253 | \phi_n(\kappa) = \                            | $$\phi_n(\kappa) =                               |
|     | \frac{1}{4\pi^2\kappa^2} \int\_0^\infty \     | \frac{1}{4\pi^2\kappa^2} \int_0^\infty           |
|     | \frac{\sin(\kappa R)}{\kappa R} \             | \frac{\sin(\kappa R)}{\kappa R}                  |
|     | \frac{\partial}{\partial R} \                 | \frac{\partial}{\partial R}                      |
|     | \left [ R^2\frac{\partial D\_n(R)}\           | \left [ R^2\frac{\partial D_n(R)}                |
|     | {\partial R} \right ] \\,dR                   | {\partial R} \right ] \,dR$$                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 254 | \phi\_n(\kappa) = 0.033C\_n^2\kappa^{-11/3},\ | $\phi_n(\kappa) = 0.033C_n^2\kappa^{-11/3},      |
|     | \quad\frac{1}{L\_0}\ll\kappa\ll\frac{1}{l\_0} | \quad\frac{1}{L_0}\ll\kappa\ll\frac{1}{l_0}$     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 255 | f(x) = \begin{cases} \                        | $f(x) = \begin{cases}                            |
|     | 1 & -1 \le x < 0 \\\\ \                       | 1 & -1 \le x < 0 \\                              |
|     | \frac{1}{2} & x = 0 \\\\ \                    | \frac{1}{2} & x = 0 \\                           |
|     | 1 - x^2 & \text{otherwise} \                  | 1 - x^2 & \text{otherwise}                       |
|     | \end{cases}                                   | \end{cases}$                                     |
+-----+-----------------------------------------------+--------------------------------------------------+
| 256 | {}\_pF\_q(a\_1,\dots,a\_p;c\_1,\dots,c\_q;z)\ | ${}_pF_q(a_1,\dots,a_p;c_1,\dots,c_q;z)          |
|     | = \sum\_{n=0}^\infty \                        | = \sum_{n=0}^\infty                              |
|     | \frac{(a_1)\_n\cdots(a_p)\_n}\                | \frac{(a_1)_n\cdots(a_p)_n}                      |
|     | {(c\_1)\_n\cdots(c\_q)_n}\frac{z^n}{n!}       | {(c_1)_n\cdots(c_q)_n}\frac{z^n}{n!}$            |
+-----+-----------------------------------------------+--------------------------------------------------+
| 258 | \frac{a}{b}\ \tfrac{a}{b}                     | $$\frac{a}{b}\ \tfrac{a}{b}$$                    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 259 | S=dD\sin\alpha                                | $S=dD\sin\alpha$                                 |
+-----+-----------------------------------------------+--------------------------------------------------+
| 260 | V = \frac{1}{6} \pi h \left [ 3 \left \       | $V = \frac{1}{6} \pi h \left [ 3 \left           |
|     | ( r_1^2 + r_2^2 \right ) + h^2 \right ]       | ( r_1^2 + r_2^2 \right ) + h^2 \right ]$         |
+-----+-----------------------------------------------+--------------------------------------------------+
| 261 | \begin{align} \                               | $$\begin{align}                                  |
|     | u & = \tfrac{1}{\sqrt{2}}(x+y) \qquad & \     | u & = \tfrac{1}{\sqrt{2}}(x+y) \qquad &          |
|     | x &= \tfrac{1}{\sqrt{2}}(u+v) \\\\[0.6ex] \   | x &= \tfrac{1}{\sqrt{2}}(u+v) \\[0.6ex]          |
|     | v & = \tfrac{1}{\sqrt{2}}(x-y) \qquad & \     | v & = \tfrac{1}{\sqrt{2}}(x-y) \qquad &          |
|     | y &= \tfrac{1}{\sqrt{2}}(u-v) \               | y &= \tfrac{1}{\sqrt{2}}(u-v)                    |
|     | \end{align}                                   | \end{align}$$                                    |
+-----+-----------------------------------------------+--------------------------------------------------+

That concludes the tests from Wikipedia. Now a few more tests.

<br>

+-----+-----------------------------------------------+--------------------------------------------------+
| **Linear Logic**                                                                                       |
+=====+===============================================+==================================================+
| 262 | A \with B \parr C                             | $A \with B \parr C$                              |
+-----+-----------------------------------------------+--------------------------------------------------+
| 263 | a \coh \oc b \incoh \wn c \scoh d \sincoh e   | $a \coh \oc b \incoh \wn c \scoh d \sincoh e$    |
+-----+-----------------------------------------------+--------------------------------------------------+
| 264 | a \Perp \shpos b \multimapinv \shneg c        | $a \Perp \shpos b \multimapinv \shneg c$         |
+-----+-----------------------------------------------+--------------------------------------------------+

+-----+----------------------------------------------+-------------------------------------------------+
| **Nested font size**                                                                                 |
+=====+==============================================+=================================================+
| 265 | \mathrm{f{\large f{\normalsize f{\tiny f}}}} | $\mathrm{f{\large f{\normalsize f{\tiny f}}}}$  |
+-----+----------------------------------------------+-------------------------------------------------+

The next line tests the length of an extensible arrow. Since Firefox does not\
support the `minsize` attribute, Temml has a workaround. The middle arrow\
should be as long at the bar between C & D.

+=====+====================================+====================================+
| 266 | A \rightarrow B \xrightarrow{i} C\ | $A \rightarrow B \xrightarrow{i} C |
|     | \rule[0.3em]{1.75em}{0.05em} D     | \rule[0.3em]{1.75em}{0.05em} D$    |
+-----+------------------------------------+------------------------------------+

<br>
</body>
</html>
