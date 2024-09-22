# mosmql

### Prerequisites

- `NodeJS`

- `OPENAI_API_KEY`

- `MongoDB`

### installation

`npm i mosmql`

### How to use

- initialize a class

- ```
  const mosmqlInstance = new Mosmql(
        process.env.OPENAI_API_KEY,
        './models/trainingModels/TrainingModels.txt',
        "sample_restaurants",
        process.env.uri
    )

- Then invoke the function to call the data you want from the database 
- `const result = await mosmqlInstance.mosmql("Query restaurants collection for restaurants with Bakery cuisine")`

### Explanation
- ```
  const mosmqlInstance = new Mosmql(
        process.env.OPENAI_API_KEY,
        './models/trainingModels/TrainingModels.txt',
        "sample_restaurants",
        process.env.uri
    )
- 1st parameter is your `OPENAI_API_KEY` from [OpenAi]([https://pages.github.com/](https://openai.com/))
- 2nd parameter is your filePath training model example `input.txt`
- 3rd parameter your db collection name example `sample_restaurants`
- 4th parameter popular mongodb uri connection to the database starts with `mongodb+srv://`

- `const result = await mosmqlInstance.mosmql("Query restaurants collection for restaurants with Bakery cuisine")`
- Here when after initialize the class you will be ready to call the function and retrieve the data from database

- #### _Example After installing the package_
- ```
  const { Mosmql } = require('mosmql');

  const mosmqlInstance = new Mosmql(
      process.env.OPENAI_API_KEY,
      './models/trainingModels/TrainingModels.txt',
      "sample_restaurants",
      process.env.uri
  );

  async function dbResult() {
      const result = await mosmqlInstance.mosmql(
          "Query restaurants collection for restaurants with Bakery cuisine"
      );
      console.log(result);
  }

  dbResult();

  ```

### How could this software be used and contribute in AI
- You can use the packe for automatic mongodb queries
- monitoring text to MongoDB query executed e.g. "Give me info about User X or give me the last 10 entries" 
- Voice input to Text then Text to MongoDB Query executed by the package "something like AI software like Amazon Alexa" 

### For continuous development in the package & Donations

<a href="https://www.buymeacoffee.com/mostafaezzat" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
