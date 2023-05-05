const MongoClient = require('mongodb').MongoClient;

const CONNECTION_STRING = 'mongodb://localhost:27017/';

class Database{
    constructor(connection_string){
        console.log('connecting');
        this.connection_string = connection_string;
        this.client = new MongoClient(connection_string)
    }

    /**
     * @public
     * returns object that matches value in database
     * @param {object} value 
     * @returns {object} result
     */
    async find(value){
        try{
            await this.client.connect();
            const result = await this.client.db('stima').collection('qa').findOne(value);

            if(result){
                console.log(`Found data with the following id: ${result._id}`);
            }
            else{
                console.log(`No data found`);
            }
        }
        finally{
            await this.client.close();
            return result;
        }
    }

    /**
     * @public
     * insert a value into database
     * @param {object} value 
     * @returns {string} insertedId
     */
    async insert(value){
        let id = undefined;
        try{
            await this.client.connect();

            const keys = Object.keys(value);
            if(!(keys.length==2 && keys.includes('question') && keys.includes('answer'))){
                throw new Error('Value isn\'t valid');
            }
            if(await this.client.db('stima').collection('qa').findOne({question:value.question})){
                console.log(`Failed, identical question exists`);
            }else{
                id = await this.client.db('stima').collection('qa').insertOne(value);
                id = id.insertedId.toString();
                console.log(`Successfully inserted value with the following id: ${id}`);
            }
        }
        finally{
            await this.client.close();
            return id;
        }
    }

    /**
     * @public
     * delete a data from database that matches value
     * @param {object} value
     * @returns {object} deletedData
     */
    async delete(value){

    }
}
