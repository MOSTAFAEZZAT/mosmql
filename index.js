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

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const database = client.db("sample_restaurants")


        var query = 'database.collection("restaurants").findOne({ restaurant_id: "30075445"});';
        var dbres;
        var resultDb = eval(query).then(res => { return res; })
        // var promise = resultDb;
        // var data = promise.then(res => {
        //     resolve
        // })
        var dbResult = await example(resultDb)
        console.log("here " + JSON.stringify(dbResult._id))
        // console.log(data + dbres)
        // database.eval('function(){ return ' + query + '.toArray(); }', function (err, result) {
        //     console.log("the result is", result);
        // // }); 
        // const res = eval("(async () => { const results = await database.collection('restaurants').findOne({ restaurant_id: '30075445' }); return results;   })()")
        // console.log(res)



        // const DB = await Object.getPrototypeOf(async function () { }).constructor("const results = await database.collection('restaurants').findOne({ restaurant_id: '30075445' }); ")();
        // console.log(DB)

        // client.db.eval('async function test(){ return await' + query + '.toArray(); }', function (err, result) {
        //     console.log("the result is", result);
        //     console.log("the result is", err);

        // })
        // const res = await database.collection("restaurants").findOne({ restaurant_id: "30075445" });
        // console.log(res);
        // const movie = await movies.find().toArray();
        // Print the document returned by findOne()
        // console.log(resturant);


        // Execute query


    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
async function example(promise) {
    const data = await promise;
    console.log(data);
    var secdata = data;
    return secdata;
}


async function textToMql(query) {

    const openai_client = new OpenAI(process.env.OPEN_AI_KEY);

    var data = await fs.promises.readFile('./models/trainingModels/TrainingModels.txt', 'utf8');

    const learningPath = data;

    var aiInput = learningPath + "Q:" + query + "\nA:";
    //  console.log(aiInput); 
    const gptResponse = await openai_client.complete({
        engine: 'davinci',
        prompt: aiInput,
        "temperature": 0.3,
        "max_tokens": 400,
        "top_p": 1,
        "frequency_penalty": 0.2,
        "presence_penalty": 0,

    });

    console.log("Final Response" + gptResponse.data.choices[0].text);
}

// textToMql('Query peachy_scrapped_data collection for companyName with value "Adobe"');