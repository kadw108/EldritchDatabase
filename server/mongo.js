const mongo = require("mongodb");
const mongoConfig = require("./mongoConfig");

const client = new mongo.MongoClient(mongoConfig.uri);

client
    .connect()
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const db = client.db("TODO");

module.exports = { db, mongo };
