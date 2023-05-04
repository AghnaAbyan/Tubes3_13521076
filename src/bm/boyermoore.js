const LastOccur = (pattern) =>
{
    let n = 128;
    const last = [];
    for (let i = 0; i < n; i++)
    {
        last[i] = -1;
    }
    for (let i = 0; i < pattern.length; i++)
    {
        last[pattern.charCodeAt(i)] = i;
    }
    return last;
}

const boyerMatch = (text, pattern) =>
{
    const last = LastOccur(pattern);
    let m = text.length;
    let n = pattern.length;
    let i = n - 1;

    if (i > m - 1) {return -1;}
    let j = n - 1;
    do {
        if (pattern.charCodeAt(j) == text.charCodeAt(i))
        {
            if (j == 0) {return i;}
            else {i--; j--;}
        } else {
            const lastocc = last[text.charCodeAt(i)];
            i = i + n - Math.min(j, 1 + lastocc);
            j = n - 1;
        }
    } while (i < m);
    return -1;
}

module.exports.boyerMatch = boyerMatch;