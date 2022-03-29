const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

let mongod = null;

const connectDB = async () => {
  try {
    let source = process.env.ATLAS_CONNECTION;
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      source = mongod.getUri();
    }
    const conn = await mongoose.connect(source, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
