const OpenAI = require('openai');
const dotenv = require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');


async function executeMongodbQuery(query, database, mongodbUri) {
    try {

        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        var client = new MongoClient(mongodbUri, {
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
        const db = client.db(database);
        // query sample
        // var query = 'db.collection("restaurants").find({"grades.score": {$gt: 10}})';
        query = query.toString().replace(/\\/g, '');
        // uncomment to debug
        // console.log("query" + query);
        var dbResult = eval(query).then(res => { return res; });
        var dbResult = await databaseDataResult(dbResult);
        return JSON.stringify(dbResult);

    } catch (err) {
        console.log(err);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function databaseDataResult(promise) {
    const data = await promise;
    return data;
}


async function mosmql(query, openaiApiKey, filePath, database, mongodbUri) {

    const dbQuery = await openaiCompletion(query, openaiApiKey, filePath);
    const mongodbResult = await executeMongodbQuery(dbQuery, database, mongodbUri);
    // in case of debugging uncomment
    // console.log(mongodbResult);
    return mongodbResult;
}

async function openaiCompletion(query, openaiApiKey, filePath) {


    const openai = new OpenAI(openaiApiKey);

    var data = await fs.promises.readFile(filePath, 'utf8');

    const learningModel = data;

    var mqlQueryAi = learningModel + "Q:" + query + "\nA:";
    const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: mqlQueryAi,
        max_tokens: 100,
        temperature: 0,
    });
    const dbQuery = completion.choices[0].text;
    // uncomment when you need debug
    // console.log("dbQuery" + dbQuery + "\n\n");

    return dbQuery;
}

//  Sample call
/* (async () => {
    console.log(await mosmql("Query restaurants collection for a restaurant name Morris Park Bake Shop", process.env.OPENAI_API_KEY,
        './models/trainingModels/TrainingModels.txt', "sample_restaurants", process.env.uri))
})(); */

module.exports = { mosmql };