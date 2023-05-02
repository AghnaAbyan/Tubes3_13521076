/**
 * Get the levenshtein distance of two strings
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */
const solve = (str1, str2) => {
    if(str1.length > str2.length) return solve(str2,str1);


    const mtrx = new Array(str2.length+1);
    for(let i = 0; i<mtrx.length; i++){
        mtrx[i] = Array(str1.length+1).fill(0);
    }
    for(let i = 0; i<str1.length+1; i++){
        mtrx[0][i] = i;
    }
    for(let j = 0; j<str2.length+1; j++){
        mtrx[j][0] = j;
    }

    for(let i = 1; i<str2.length+1; i++){
        for(let j = 1; j<str1.length+1; j++){
            if(str2[i-1] == str1[j-1]){
                mtrx[i][j] = mtrx[i-1][j-1];
            }
            else{
                insertion = mtrx[i][j-1] + 1;
                deletion = mtrx[i-1][j] + 1;
                replacement = mtrx[i-1][j-1] + 1;

                mtrx[i][j] = Math.min(insertion, deletion, replacement);
            }
        }
    }

    return mtrx[str2.length][str1.length];
} 

module.exports.get = solve;