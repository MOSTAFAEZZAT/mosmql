# mql-mongodb-nodejs

### Prerequisites

- `NodeJS`

- `OPENAI_API_KEY`

- `MongoDB`

### installation

`npm i mosmql`

### How to use

- `const mosmql = require('mosmql');`

- `mosmql.mosmql(your text query ,OPENAI_API_KEY,filePath, your collection name, your mongodb uri)` 
- the 1st parameter is the query text for exmaple `give me results about John Doe`
- 2nd parameter is your `OPENAI_API_KEY` from [OpenAi]([https://pages.github.com/](https://openai.com/))
- 3rd parameter is your filePath training model example `input.txt`
- 4th parameter your db collection name example `sample_restaurants`
- 5th parameter popular mongodb uri connection to the database starts with `mongodb+srv://`
- _After installing the package_
- ```
  const mosmql = require('mosmql');
  async function dbResult() {
  const result = await mosmql.mosmql("Query restaurants collection for restaurants with American cuisine", process.env.OPENAI_API_KEY,
        'input.txt', "sample_restaurants", process.env.uri)
    console.log(result)
  }
  ```

### How could this software be used and contribute in AI
- You can use the packe for automatic mongodb queries
- monitoring text to MongoDB query executed e.g. "Give me info about User X or give me the last 10 entries" 
- Voice input to Text then Text to MongoDB Query executed by the package "something like AI software like Amazon Alexa" 

### For continuous development in the package & Donations

<a href="https://www.buymeacoffee.com/mostafaezzat" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
