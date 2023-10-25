<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1">
  <title>Temml mhchem Tests</title>
  <link rel="stylesheet" href="../docs/docStyles.css">
  <link rel="stylesheet" type="text/css" href="../assets/Temml-Latin-Modern.css">
  <script src="./temmlPostProcess.js"></script>
  <style>
    body{font-size: 18px}
    table tr > td:nth-of-type(1) { font-size: 8pt; font-family: Consolas, "Courier New", Courier, monospace; }
  </style>
</head>

<body>

# mhchem

This file contains all the examples in the `mhchem` manual.\
Ref: https://mhchem.github.io/MathJax-mhchem/

## Chemical Equations (ce)

| Source                                         | Temml                   |
|------------------------------------------------|-------------------------|
| `\ce{CO2 + C -> 2 CO}`                         | $\ce{CO2 + C -> 2 CO}$  |
| `\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}` | $\ce{Hg^2+ ->[I-] HgI2 ->[I-] [Hg^{II}I4]^2-}$  |
| `C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}`      | $C_p[\ce{H2O(l)}] = \pu{75.3 J // mol K}$  |

## Chemical Formulae

| Source       | Temml         |
|--------------|---------------|
| `\ce{H2O}`   |  $\ce{H2O}$   |
| `\ce{Sb2O3}` | $\ce{Sb2O3}$  |

## Charges

| Source          | Temml            |
|-----------------|------------------|
| `\ce{H+}`       | $\ce{H+}$        |
| `\ce{CrO4^2-}`  | $\ce{CrO4^2-}$   |
| `\ce{[AgCl2]-}` | $\ce{[AgCl2]-}$  |
| `\ce{Y^99+}`    | $\ce{Y^99+}$     |
| `\ce{Y^{99+}}`  | $\ce{Y^{99+}}$   |

## Stoichiometric Numbers

| Source          | Temml              |
|-----------------|--------------------|
| `\ce{2 H2O}`    | $\ce{2 H2O}$       |
| `\ce{2H2O}`     | $\ce{2H2O}$        |
| `\ce{0.5 H2O}`  | $\ce{0.5 H2O}$     |
| `\ce{1/2 H2O}`  | $\ce{1/2 H2O}$     |
| `\ce{(1/2) H2O}` | $\ce{(1/2) H2O}$  |
| `\ce{$n$ H2O}`   | $\ce{ $n $ H2O}$    |

## Isotopes

+-----------------------+------------------------------+
| `\ce{^{227}_{90}Th+}` | $\ce{^{227}_{90}Th+}$        |
+-----------------------+------------------------------+
| `\ce{^227_90Th+}`     | $\ce{^227_90Th+}$            |
+-----------------------+------------------------------+
| `\ce{^{0}_{-1}n^{-}}` | $\ce{^{0}_{-1}n^{-}}$        |
+-----------------------+------------------------------+
| `\ce{^0_-1n-}`        | $\ce{^0_-1n-}$               |
+-----------------------+------------------------------+
| `\ce{H{}^3HO}`        | $\ce{H{}^3HO}$               |
+-----------------------+------------------------------+
| `\ce{H^3HO}`          | $\ce{H^3HO}$                 |
+-----------------------+------------------------------+

## Reaction Arrows

| Source           |  Temml           |
|------------------|------------------|
| `\ce{A -> B}`    | $\ce{A -> B}$    |
| `\ce{A <- B}`    | $\ce{A <- B}$    |
| `\ce{A <-> B}`   | $\ce{A <-> B}$   |
| `\ce{A <--> B}`  | $\ce{A <--> B}$  |
| `\ce{A <=> B}`   | $\ce{A <=> B}$   |
| `\ce{A <=>> B}`  | $\ce{A <=>> B}$  |
| `\ce{A <<=> B}`  | $\ce{A <<=> B}$  |
| `\ce{A ->[H2O] B}` | $\ce{A ->[H2O] B}$  |
| `\ce{A ->[{text above}][{text below}] B}` | $\ce{A ->[{text above}][{text below}] B}$  |
| `\ce{A ->[$x$][$x_i$] B}` | $\ce{A ->[ $x $][ $x_i $] B}$  |

## Parentheses, Brackets, Braces

| Source                 |  Temml           |
|------------------------|------------------|
| `\ce{(NH4)2S}`         | $\ce{(NH4)2S}$   |
| `\ce{[\{(X2)3\}2]^3+}` | $\ce{[\{(X2)3\}2]^3+}$  |
| `\ce{CH4 + 2 $\left( \ce{O2 + 79/21 N2} \right)$}` | $\ce{CH4 + 2  $\left( \ce{O2 + 79/21 N2} \right) $}$  |

## States of Aggregation

| Source                   |  Temml                      |
|--------------------------|-----------------------------|
| `\ce{H2(aq)}`            | $\ce{H2(aq)}$               |
| `\ce{CO3^2-_{(aq)}}`     | $\ce{CO3^2-_{(aq)}}$        |
| `\ce{NaOH(aq,$\infty$)}` | $\ce{NaOH(aq, $\infty $)}$  |

## Crystal Systems

| Source             |  Temml               |
|--------------------|----------------------|
| `\ce{ZnS($c$)}`    | $\ce{ZnS( $c $)}$    |
| `\ce{ZnS(\ca$c$)}` | $\ce{ZnS(\ca $c $)}$ |

## Variables

+--------------------------------+--------------------------------+
| Source                         |  Temml                         |
+================================+================================+
| `\ce{NO_x}`                    | $\ce{NO_x}$                    |
+--------------------------------+--------------------------------+
| `\ce{Fe^n+}`                   | $\ce{Fe^n+}$                   |
+--------------------------------+--------------------------------+
| \ce{x Na(NH4)HPO4 ->[\Delta] \ | $\ce{x Na(NH4)HPO4 ->[\Delta]  |
| (NaPO3)_x + x NH3 ^ + x H2O}   | (NaPO3)_x + x NH3 ^ + x H2O}$  |
+--------------------------------+--------------------------------+

## Greek Characters

| Source                             |  Temml              |
|------------------------------------|---------------------|
| `\ce{\mu-Cl}`                      | $\ce{\mu-Cl}$       |
| `\ce{[Pt(\eta^2-C2H4)Cl3]-}`       | $\ce{[Pt(\eta^2-C2H4)Cl3]-}$  |
| `\ce{\beta +}`                     | $\ce{\beta +}$                |
| `\ce{^40_18Ar + \gamma{} + \nu_e}` | $\ce{^40_18Ar + \gamma{} + \nu_e}$  |

## (Italic) Math

| Source                        |  Temml           |
|-------------------------------|------------------|
| `\ce{NaOH(aq,$\infty$)}`      | $\ce{NaOH(aq, $\infty $)}$  |
| `\ce{Fe(CN)_{$\frac{6}{2}$}}` | $\ce{Fe(CN)_{{ $\frac{6}{2} $}}}$  |
| `\ce{X_{$i$}^{$x$}}`          | $\ce{X_{ $i $}^{ $x $}}$ |
| `\ce{X_$i$^$x$}`              | $\ce{X_{ $i $}^{ $x $}}$ |

## Italic Text

| Source                        |  Temml           |
|-------------------------------|------------------|
| `\ce{$cis${-}[PtCl2(NH3)2]}`  | $\ce{ $cis ${-}[PtCl2(NH3)2]}$ |
| `\ce{CuS($hP12$)}`            | $\ce{CuS( $hP12 $)}$ |

## Upright Text, Escape Parsing

| Source                          |  Temml           |
|---------------------------------|------------------|
| `\ce{{Gluconic Acid} + H2O2}`   | $\ce{{Gluconic Acid} + H2O2}$  |
| `\ce{X_{{red}}}`                | $\ce{X_{{red}}}$  |
| `\ce{{(+)}_589{-}[Co(en)3]Cl3}` | $\ce{{(+)}_589{-}[Co(en)3]Cl3}$  |

## Bonds

| Source                                   |  Temml           |
|------------------------------------------|------------------|
| `\ce{C6H5-CHO}`                          | $\ce{C6H5-CHO}$  |
| `\ce{A-B=C#D}`                           | $\ce{A-B=C#D}$   |
| `\ce{A\bond{-}B\bond{=}C\bond{#}D}`      | $\ce{A\bond{-}B\bond{=}C\bond{#}D}$  |
| `\ce{A\bond{1}B\bond{2}C\bond{3}D}`      | $\ce{A\bond{1}B\bond{2}C\bond{3}D}$  |
| `\ce{A\bond{~}B\bond{~-}C}`              | $\ce{A\bond{~}B\bond{~-}C}$          |
| `\ce{A\bond{~--}B\bond{~=}C\bond{-~-}D}` | $\ce{A\bond{~--}B\bond{~=}C\bond{-~-}D}$  |
| `\ce{A\bond{...}B\bond{....}C}`          | $\ce{A\bond{...}B\bond{....}C}$           |
| `\ce{A\bond{->}B\bond{<-}C}`             | $\ce{A\bond{->}B\bond{<-}C}$              |

## Addition Compounds

| Source                    |  Temml           |
|---------------------------|------------------|
| `\ce{KCr(SO4)2*12H2O}`    | $\ce{KCr(SO4)2*12H2O}$  |
| `\ce{KCr(SO4)2.12H2O}`    | $\ce{KCr(SO4)2.12H2O}$  |
| `\ce{KCr(SO4)2 * 12 H2O}` | $\ce{KCr(SO4)2 * 12 H2O}$  |

## Oxidation States

| Source                    |  Temml           |
|---------------------------|------------------|
| `\ce{Fe^{II}Fe^{III}2O4}` | $\ce{Fe^{II}Fe^{III}2O4}$  |

## Unpaired Electrons, Radical Dots

| Source            |  Temml             |
|-------------------|--------------------|
| `\ce{OCO^{.-}}`   | $\ce{OCO^{.-}}$    |
| `\ce{NO^{(2.)-}}` | $\ce{NO^{(2.)-}}$  |

## Kröger-Vink Notation

+------------------------------------+------------------------------------------+
| Source                             |  Temml                                   |
+====================================+==========================================+
| `\ce{Li^x_{Li,1-2x}Mg^._{Li,x}` \  | $\ce{Li^x_{Li,1-2x}Mg^._{Li,x}           |
| ``$V$'_{Li,x}Cl^x_{Cl}}``          | $V $'_{Li,x}Cl^x_{Cl}}$                  |
+------------------------------------+------------------------------------------+
| ```\ce{O''_{i,x}}```               | $\ce{O''_{i,x}}$                         |
+------------------------------------+------------------------------------------+
| `\ce{M^{..}_i}`                    | $\ce{M^{..}_i}$                          |
+------------------------------------+------------------------------------------+
| ``\ce{$V$^{4'}_{Ti}}``             | $\ce{ $V $^{4'}_{Ti}}$                   |
+------------------------------------+------------------------------------------+
| `\ce{V_{V,1}C_{C,0.8}$V$_{C,0.2}}` | $\ce{V_{V,1}C_{C,0.8} $V $_{C,0.2}}$     |
+------------------------------------+------------------------------------------+

## Equation Operators

| Source         |  Temml          |
|----------------|-----------------|
| `\ce{A + B}`   | $\ce{A + B}$    |
| `\ce{A - B}`   | $\ce{A - B}$    |
| `\ce{A = B}`   | $\ce{A = B}$    |
| `\ce{A \pm B}` | $\ce{A \pm B}$  |

## Precipitate and Gas

| Source                           |  Temml           |
|----------------------------------|------------------|
| `\ce{SO4^2- + Ba^2+ -> BaSO4 v}` | $\ce{SO4^2- + Ba^2+ -> BaSO4 v}$  |
| `\ce{A v B (v) -> B ^ B (^)}`    | $\ce{A v B (v) -> B ^ B (^)}$     |

## Other Symbols and Shortcuts

| Source              |  Temml         |
|---------------------|----------------|
| `\ce{NO^*}`         | $\ce{NO^*}$    |
| `\ce{1s^2-N}`       | $\ce{1s^2-N}$  |
| `\ce{n-Pr}`         | $\ce{n-Pr}$    |
| `\ce{iPr}`          | $\ce{iPr}$     |
| `\ce{\ca Fe}`       | $\ce{\ca Fe}$  |
| `\ce{A, B, C; F}`   | $\ce{A, B, C; F}$  |
| `\ce{{and others}}` | $\ce{{and others}}$  |

## Complex Examples

+---------------------------------------------+-------------------------------------------+
| Source                                      |  Temml                                    |
+=============================================+===========================================+
| `\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]` \           | $\ce{Zn^2+  <=>[+ 2OH-][+ 2H+]            |
| `$\underset{\text{amphoteres Hydroxid}}` \  | $\underset{\text{amphoteres Hydroxid}}    |
| `{\ce{Zn(OH)2 v}}$  <=>[+ 2OH-][+ 2H+]` \   | {\ce{Zn(OH)2 v}} $  <=>[+ 2OH-][+ 2H+]    |
| `$\underset{\text{Hydroxozikat}}` \         | { $\underset{\text{Hydroxozikat}}         |
| `{\ce{[Zn(OH)4]^2-}}$}`                     | {\ce{[Zn(OH)4]^2-}} $}}$                  |
+---------------------------------------------+-------------------------------------------+
| `\ce{$K = \frac{[\ce{Hg^2+}][\ce{Hg}]}` \   | $\ce{ $K = \frac{[\ce{Hg^2+}][\ce{Hg}]}   |
| `{[\ce{Hg2^2+}]}$}`                         | {[\ce{Hg2^2+}]} $}$                       |
+---------------------------------------------+-------------------------------------------+
| `\ce{$K =` \                                | $\ce{ $K =                                |
| `\ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}}$}`       | \ce{\frac{[Hg^2+][Hg]}{[Hg2^2+]}} $}$     |
+---------------------------------------------+-------------------------------------------+
| `\ce{Hg^2+ ->[I-]` \                        | $\ce{Hg^2+ ->[I-]                         |
| `$\underset{\mathrm{red}}{\ce{HgI2}}$` \    | $\underset{\mathrm{red}}{\ce{HgI2}} $     |
| `->[I-]  $\underset{\mathrm{red}}` \        | ->[I-] $\underset{\mathrm{red}}           |
| `{\ce{[Hg^{II}I4]^2-}}$}`                   | {\ce{[Hg^{II}I4]^2-}} $}$                 |
+---------------------------------------------+-------------------------------------------+

## Physical Units

| Source              |  Temml          |
|---------------------|-----------------|
| `\pu{123 kJ}`       | $\pu{123 kJ}$   |
| `\pu{123 mm2}`      | $\pu{123 mm2}$  |
| `\pu{123 J s}`      | $\pu{123 J s}$  |
| `\pu{123 J*s}`      | $\pu{123 J*s}$  |
| `\pu{123 kJ/mol}`   | $\pu{123 kJ/mol}$    |
| `\pu{123 kJ//mol}`  | $\pu{123 kJ//mol}$   |
| `\pu{123 kJ mol-1}` | $\pu{123 kJ mol-1}$  |
| `\pu{123 kJ*mol-1}` | $\pu{123 kJ*mol-1}$  |
| `\pu{1.2e3 kJ}`     | $\pu{1.2e3 kJ}$      |
| `\pu{1,2e3 kJ}`     | $\pu{1,2e3 kJ}$      |
| `\pu{1.2E3 kJ}`     | $\pu{1.2E3 kJ}$      |
| `\pu{1,2E3 kJ}`     | $\pu{1,2E3 kJ}$      |

</body>
</html>