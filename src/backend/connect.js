const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://aduffaut:1024Sox!@cluster0.pfkjk.mongodb.net/sample_training?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
