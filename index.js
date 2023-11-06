const OpenAI = require('openai-api');
const dotenv = require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve } = require('path');



async function executeMongodbQuery(query, mongodbUri) {
    try {

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(mongodbUri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const db = client.db("sample_restaurants");
        // query sample
        // var query = 'db.collection("restaurants").find({"grades.score": {$gt: 10}})';
        query = query.toString().replace(/\\/g, '');
        // uncomment to debug
        console.log("query" + query);
        var dbResult = eval(query).then(res => { return res; });
        var dbResult = await databaseDataResult(dbResult)
        return JSON.stringify(dbResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function databaseDataResult(promise) {
    const data = await promise;
    return data;
}


async function mosmql(query, openaiApiKey, filePath, mongodbUri) {

    const dbQuery = await openaiCompletion(query, openaiApiKey, filePath);
    const mongodbResult = await executeMongodbQuery(dbQuery, mongodbUri);
    // in case of debugging uncomment
    //  console.log(mongodbResult);
    return mongodbResult;


}

async function openaiCompletion(query, openaiApiKey, filePath) {


    const openai = new OpenAI(openaiApiKey);

    var data = await fs.promises.readFile(filePath, 'utf8');

    const learningModel = data;

    var mqlQueryAi = learningModel + "Q:" + query + "\nA:";

    const response = await openai.complete({
        engine: 'davinci',
        prompt: mqlQueryAi,
        "temperature": 0.3,
        "max_tokens": 400,
        "top_p": 1,

        "stop": ["\n"]
    });

    const dbQuery = response.data.choices[0].text;
    // uncomment when you need debug
    // console.log("dbQuery" + dbQuery + "\n\n");
    return dbQuery;
}

// mosmql("Query restaurants collection for restaurants with American cuisine", process.env.OPENAI_API_KEY,
//     './models/trainingModels/TrainingModels.txt', process.env.uri);


module.exports = { mosmql };