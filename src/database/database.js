const MongoClient = require('mongodb').MongoClient;

const CONNECTION_STRING = 'mongodb://localhost:27017/';

class Database{
    constructor(connection_string){
        console.log('connecting');
        this.connection_string = connection_string;
        this.client = new MongoClient(connection_string)
    }

    async fetch(){
        let result;
        try{
            await this.client.connect();
            result = await this.client.db('stima').collection('qa').find().toArray();
        }
        finally{
            await this.client.close();
            return result;
        }
    }

    /**
     * @public
     * returns object that matches filter in database
     * @param {object} filter 
     * @returns {object} found
     */
    async find(filter){
        let result;
        try{
            await this.client.connect();
            result = await this.client.db('stima').collection('qa').findOne(filter);

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
     * delete a data from database that matches filter
     * @param {object} filter
     * @returns {object} deletedData
     */
    async delete(filter){
        let deletedData = undefined;
        try{
            await this.client.connect();

            deletedData = await this.client.db('stima').collection('qa').findOne(filter);
            if(deletedData){
                console.log(`Successfully deleted data with the following id: ${deletedData._id}`);
            }
            else{
                console.log(`Data not found`);
            }
            await this.client.db('stima').collection('qa').deleteOne(filter);
        }
        finally{
            await this.client.close();
            return deletedData;
        }
    }
}

const db = new Database(CONNECTION_STRING);

module.exports.db = db;