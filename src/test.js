const levenshtein = require('./levenshtein/algorithm');
const bm = require('./bm/boyermoore');
const kmp = require('./kmp/kmp');

console.log(levenshtein.get('Honda','Hyundai'));

//"GCAATGCCTATGTGACC", "TATGTG"
//"LALALALAZ", "LAZ"
//"BELABELABLABELAJJ", "BLA"

let position1 = bm.boyerMatch("BELABELABLABELAJJ", "BLA");
let position2 = kmp.solvekmp("BELABELABLABELAJJ", "BLA");
if (position1 == -1) {console.log("no bm pattern");}
else {console.log("bm pattern at " + position1);}

if (position2 == -1) {console.log("no kmp pattern");}
else {console.log("kmp pattern at " + position2);}