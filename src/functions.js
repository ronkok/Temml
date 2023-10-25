/** Include this to ensure that all functions are defined. */
import { _functions } from "./defineFunction";

const functions = _functions;
export default functions;

// TODO(kevinb): have functions return an object and call defineFunction with
// that object in this file instead of relying on side-effects.
import "./functions/accent";
import "./functions/accentunder";
import "./functions/arrow";
//import "./functions/cancelto";
import "./environments/cd";
import "./functions/char";
import "./functions/color";
import "./functions/cr";
import "./functions/def";
import "./functions/delimsizing";
import "./functions/enclose";
import "./functions/environment";
import "./functions/envTag";
import "./functions/font";
import "./functions/genfrac";
import "./functions/horizBrace";
import "./functions/href";
import "./functions/html";
import "./functions/includegraphics";
import "./functions/kern";
import "./functions/label";
import "./functions/lap";
import "./functions/math";
import "./functions/mathchoice";
import "./functions/mclass";
import "./functions/multiscript";
import "./functions/not";
import "./functions/op";
import "./functions/operatorname";
import "./functions/ordgroup";
import "./functions/phantom";
import "./functions/pmb";
import "./functions/raise";
import "./functions/ref";
import "./functions/relax";
import "./functions/rule";
import "./functions/sizing";
import "./functions/smash";
import "./functions/sqrt";
import "./functions/styling";
import "./functions/supsub";
import "./functions/symbolsOp";
import "./functions/symbolsOrd";
import "./functions/symbolsSpacing";
import "./functions/tag";
import "./functions/text";
// import "./functions/tip";
// import "./functions/toggle";
import "./functions/verb";
