const OpenAI = require('openai-api');
const dotenv = require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { resolve } = require('path');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function executeMongodbQuery(query) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db("sample_restaurants")
        var query = 'database.collection("restaurants").findOne({ restaurant_id: "30075445"})';
        var dbResult = eval(query).then(res => { return res; });
        var dbResult = await databaseDataResult(dbResult)
        // console.log("here " + JSON.stringify(dbResult))
        return JSON.stringify(dbResult);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
// executeMongodbQuery().catch(console.dir);
async function databaseDataResult(promise) {
    const data = await promise;
    return data;
}


async function textToMql(query) {

    // const openai_client = new OpenAI(process.env.OPEN_AI_KEY);

    // var data = await fs.promises.readFile('./models/trainingModels/TrainingModels.txt', 'utf8');

    // const learningModel = data;

    // var mqlQueryAi = learningModel + "Q:" + query + "\nA:";
    // //  console.log(aiInput); 
    // const response = await openai_client.complete({
    //     engine: 'davinci',
    //     prompt: mqlQueryAi,
    //     "temperature": 0.3,
    //     "max_tokens": 400,
    //     "top_p": 1,
    //     "frequency_penalty": 0.2,
    //     "presence_penalty": 0,
    // });

    // response.data.choices[0].text
    const mongodbResult = await executeMongodbQuery('database.collection("restaurants").findOne({ restaurant_id: "30075445"})');
    console.log(mongodbResult);

    // For Debugging 
    // console.log("Final Response" + response.data.choices[0].text);
}

textToMql("test");