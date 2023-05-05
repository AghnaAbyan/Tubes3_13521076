const {classify, QueryClassification} = require('./classifier');

/**
 * @public
 * get the answer to query according to 5 classifications:
 * - QA
 * - Calculator
 * - Date
 * - Add QA
 * - Remove QA
 * @param {string} query
 * @returns {string} answer to query
 */
const answer = (query) => {
    const classification = classify(query);

    switch(classification){
        case QueryClassification.QA: return;
        case QueryClassification.addQA: return;
        case QueryClassification.removeQA: return;
        case QueryClassification.date: return;
        case QueryClassification.calculator: return;
    }
}

/**
 * @private
 * evaluate integer arithmetic expression
 * supported opreators: + - * / ^ 
 * @param {string} expr
 * @returns {number} 
 */
const eval_exp = (expr) => {

}

/**
 * @private
 * get day of the week where the date lands
 * @param {string} date
 * @returns {string} names of the day of the week
 */
const get_day = (date) => {

}

/**
 * @private
 * fetch answer from database for the corresponding question
 * @param {string} question
 * @returns {string} answer
 */
const fetch_qa = (question) => {

}

/**
 * @private
 * insert question and answer into database
 * @param {string} question
 * @param {string} answer
 * @returns {void}
 */
const insert_qa = (question, answer) => {

}

/**
 * @private
 * delete question and answer from database
 * @param {string} question
 * @returns {void}
 */
const remove_qa = (question) => {
    
}