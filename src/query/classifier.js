const QueryClassification = {
    QA: 1,
    calculator: 2,
    dateISO: 3,
    addQA: 4,
    removeQA: 5,
    date: 6
}

/**
 * Get the classification of query
 * @param {string} query 
 * @returns {number} QueryClasification enum
 */
const classify = (query) => {
    const dateISO_regex = new RegExp(/^(\d{1,4}\/\d{1,2}\/\d{1,2})?$/);
    const date_regex = new RegExp(/^(\d{1,2}\/\d{1,2}\/\d{1,4})?$/);
    const addQA_regex = new RegExp(/^(Tambahkan pertanyaan)\s+(\w+\s*)+\s(dengan jawaban)\s+(\w+\s*)+$/);
    const removeQA_regex = new RegExp(/^(Hapus pertanyaan)\s+(\w+\s*)+$/);
    const calculator_regex = new RegExp(/^\s*((\s*[+\-*/^()]\s*|\d)+\s*[=?]?$)/);

    if(query.match(dateISO_regex)) return QueryClassification.dateISO;
    else if(query.match(date_regex)) return QueryClassification.date;
    else if(query.match(calculator_regex)) return QueryClassification.calculator;
    else if(query.match(addQA_regex)) return QueryClassification.addQA;
    else if(query.match(removeQA_regex)) return QueryClassification.removeQA;
    else return QueryClassification.QA;
}

module.exports.classify = classify;
module.exports.QueryClassification = QueryClassification;