const levenshtein = require('./levenshtein/algorithm');
const bm = require('./bm/boyermoore');

console.log(levenshtein.get('Honda','Hyundai'));

let position = bm.boyerMatch("GCAATGCCTATGTGACC", "TATGTG");
if (position == -1) {console.log("no pattern");}
else {console.log("pattern at" + position);}