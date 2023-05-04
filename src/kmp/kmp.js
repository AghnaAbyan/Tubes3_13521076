/**
 * Get kmp m
 * @param {string} str1
 * @param {string} str2
 * @returns {number}
 */

const lpsarray = (text, tsize, lps) =>
{
    let len = 0;
    let i = 1; 
    lps[0] = 0;
    
    // loop untuk kalkulasi lps[i] pada i = 1 s.d. i = tsize-1
    while (i < tsize) {
        if (text.charAt(i) == text.charAt(len)) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = len;
                i++;
            }
        }
    }
    
    return lps;
}

const solvekmp = (text, pattern) =>
{
    let tsize = text.length;
    let psize = pattern.length;

    // evaluate pattern
    let plps = [];
    let pIdx = 0; // index for pattern

    plps = lpsarray(pattern, psize, plps)
    console.log(plps);

    let tIdx = 0; // index for text
    while ((tsize - tIdx) >= (pIdx-pIdx)) {
        if (pattern.charAt(pIdx) == text.charAt(tIdx)) {
            pIdx++;
            tIdx++;
        }
        if (pIdx == psize) {return tIdx - pIdx;}

        else if (tIdx < tsize && pattern.charAt(pIdx) != text.charAt(tIdx)) {
            if (pIdx != 0) {pIdx = plps[pIdx - 1];}
            else {tIdx = tIdx +1;}
        }
    }

    return -1;
}

module.exports.solvekmp = solvekmp;