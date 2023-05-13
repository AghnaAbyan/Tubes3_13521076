const {classify, QueryClassification} = require('./classifier');
const {db} = require('../database/database');
const {solvekmp} = require('../kmp/kmp');
const {boyerMatch} = require('../bm/boyermoore');
const {get} = require('../levenshtein/algorithm');

/**
 * @private
 * evaluate integer arithmetic expression
 * supported opreators: + - * / ^ 
 * @param {string} expr
 * @returns {string} 
 */
const eval_exp = (expr) => {
    let res = '';
    try{
        res = String(eval(expr));
    }   
    finally{
        res = 'Ekspresi aritmetika tidak valid';
    }
    return res;
}


/**
 * @private
 * get day of the week where the date lands
 * @param {string} date in ISO
 * @returns {string} names of the day of the week
 */
const get_day = (date) => {
    const Days = {
        3: 'Minggu',
        4: 'Senin',
        5: 'Selasa',
        6: 'Rabu',
        0: 'Kamis',
        1: 'Jumat',
        2: 'Sabtu'
    }

    const dateres = date.substring(0,date.length-1);
    const firstIdx = dateres.indexOf('/');
    const lastIdx = dateres.lastIndexOf('/');
    const year = parseInt(dateres.substring(0,firstIdx));
    const month = parseInt(dateres.substring(firstIdx+1, lastIdx));
    const day = parseInt(dateres.substring(lastIdx+1));
    let isValid = true;

    if([1,3,5,7,8,10,12].includes(month)){
        isValid = 1 <= day && day <= 31;
    }
    else if([4,6,9,11].includes(month)){
        isValid = 1 <= day && day <= 30;
    }
    else if(month == 2){
        if(year%4 == 0 || year%100 == 0 && year%400 == 0 ){
            isValid = 1 <= day && day <= 29;
        }
        else{
            isValid = 1 <= day && day <= 28;
        }
    }
    if(!isValid) return "Tanggal tidak valid!";

    const MS_IN_A_DAY = 1000 * 60 * 60 * 24;
    const ref = new Date(0);
    const d = new Date(date);
    const diffday = Math.round((d-ref)/MS_IN_A_DAY);
    const result_day = Days[((diffday % 7) + 7) % 7];

    return dateres+" adalah hari "+result_day;
}

/**
 * @private
 * fetch answer from database for the corresponding question
 * @param {string} question
 * @param {function} stringMatchingAlgorithm
 * @returns {string} answer
 */
const fetch_qa = (question, stringMatchingAlgorithm, callback) => {
    let minDistance = 9999;
    let answer = null;


    const promise = db.fetch();
    promise.then((stringList) => {
        const pattern = question.toLowerCase();
        const sortedStrings = stringList.sort((str1, str2)=>{
            return get(pattern, str1.question) - get(pattern, str2.question);
        });

        const distance = get(sortedStrings[0].question.toLowerCase(), pattern);
        const kemiripan = 1-(distance/Math.max(pattern.length, sortedStrings[0].question.length));
        if(kemiripan > 0.9){
            answer = sortedStrings[0].answer;
        }
        else{
            let count = 0;
            sortedStrings.forEach((str) => {
                let mirip = 1-(get(pattern, str.question.toLowerCase())/Math.max(pattern.length, str.question.length));
                answer += "Kemiripan: "+mirip*100 + "%\n";
                answer += '"'+str.question+'"\n';
                answer += str.answer+'\n\n';
                count++;
                if(count>5) return;
            })
        }

        // console.log(sortedStrings);

        // const matchingStrings = stringList.filter((str) => stringMatchingAlgorithm(str.question.toLowerCase(), pattern)!==-1);
        // const matchingString = stringList.filter((str) => {
        //     const strWords = str.question.toLowerCase().split(/\s+/);
        //     return pattern.some((word) => 
        //         stringMatchingAlgorithm(strWords, word)
        //     )
        // })
        // console.log(matchingStrings);

        // for(const obj of matchingString){
        //     // console.log(stringMatchingAlgorithm(pattern, obj.question.toLowerCase()));
        //     // console.log(obj)
        //     // const txt = obj.question.split(' ');
        //     const txt = obj.question.toLowerCase();
        //     const distance = get(txt, pattern);
        //     console.log(distance);
        //     if(minDistance > distance){
        //         minDistance = distance;
        //         answer = obj.answer;
        //     }
        // }
        callback(answer);
    });
}

// fetch_qa('Apa ibukota Filipina', boyerMatch, (str)=>console.log(str));


/**
 * @private
 * insert question and answer into database
 * @param {string} query
 * @param {function} stringMatchingAlgorithm
 * @returns {string} answer
 */
const insert_qa = (query, stringMatchingAlgorithm) => {
    const prelen = 'Tambahkan pertanyaan '.length;
    const ans = ' dengan jawaban ';

    const idxAns = stringMatchingAlgorithm(query, ans);
    const question = query.substring(prelen,idxAns);
    const answer = query.substring(idxAns+ans.length);

    const id = db.insert({question: question, answer: answer});
    if(id!=undefined) return "Berhasil menambahkan pertanyaan dan jawabannya";
    else return "Gagal menambahkan pertanyaan, pertanyaan sudah ada";
}

/**
 * @private
 * delete question and answer from database
 * @param {string} query
 * @returns {string} answer
 */
const remove_qa = (query) => {
    const prelen = 'Hapus pertanyaan '.length;
    
    const question = query.substring(prelen);
    const deletedData = db.delete({question: question});
    
    if(deletedData != undefined) return "Berhasil menghapus pertanyaan dan jawabannya";
    else return "Gagal menghapus, pertanyaan tidak ditemukan";
}

/**
 * @public
 * get the answer to query according to 5 classifications:
 * - QA
 * - Calculator
 * - Date
 * - Add QA
 * - Remove QA
 * @param {string} query
 * @param {function} stringMatchingAlgorithm
 * @returns {string} answer to query
 */
const answer = (query, stringMatchingAlgorithm=null, callback=null) => {
    const classification = classify(query);

    switch(classification){
        case QueryClassification.QA: return fetch_qa(query, stringMatchingAlgorithm, callback);
        case QueryClassification.addQA: return insert_qa(query, stringMatchingAlgorithm);
        case QueryClassification.removeQA: return remove_qa(query);
        case QueryClassification.date: return "Tanggal harus dalam bentuk ISO";
        case QueryClassification.dateISO: return get_day(query);
        case QueryClassification.calculator: return eval_exp(query);
    }
}

answer("Apa ibukota Jerm", boyerMatch, (str) => console.log(str));

module.exports.answer = answer;