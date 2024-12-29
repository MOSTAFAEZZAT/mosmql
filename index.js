const OpenAI = require('openai');
const dotenv = require('dotenv').config();
const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

class Mosmql {
    constructor(openaiApiKey, filePath, database, mongodbUri) {
        this.openaiApiKey = openaiApiKey;
        this.filePath = filePath;
        this.database = database;
        this.mongodbUri = mongodbUri;
        this.openai = new OpenAI({ apiKey: openaiApiKey });
    }

    async executeMongodbQuery(query) {
        try {
            // Create a MongoClient with a MongoClientOptions object to set the Stable API version
            var client = new MongoClient(this.mongodbUri, {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            });
            // Connect the client to the server (optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            const db = client.db(this.database);
            // Process query
            query = query.toString().replace(/\\/g, '');
            var dbResult = eval(query).then(res => { return res; });
            var dbResult = await this.databaseDataResult(dbResult);
            return JSON.stringify(dbResult);

        } catch (err) {
            console.log(err);
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }

    async databaseDataResult(promise) {
        const data = await promise;
        return data;
    }

    async mosmql(query) {
        const dbQuery = await this.openaiCompletion(query);
        const mongodbResult = await this.executeMongodbQuery(dbQuery);
        return mongodbResult;
    }

    async openaiCompletion(query) {
        var data = await fs.promises.readFile(this.filePath, 'utf8');
        const learningModel = data;
        var mqlQueryAi = learningModel + "Q:" + query + "\nA:";

        const completion = await this.openai.chat.completions.create({
            messages: [
                { "role": "system", "content": "You are a Database system machine"},
                { "role": "user", "content": mqlQueryAi },
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            temperature: 0,
        });

        console.log(completion.choices[0]);
        const dbQuery = completion.choices[0].message.content;
        return dbQuery;
    }
}


module.exports = Mosmql;