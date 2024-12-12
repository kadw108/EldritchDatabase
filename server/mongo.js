const mongo = require("mongodb");
const config = require("./config")

const client = new mongo.MongoClient(config.uri);

client.connect().then( () => {
    console.log("Successfully connected to MongoDB.");
}).catch((err) => {
    console.log(err);
});

const db = client.db("eldritch");

const createIndex = async() => {
    const test = await db.collection("experiences").findOne({name: "Extraplanar Shadow"});
    console.log(test);

    const test2 = await db.collection("experiences").createIndex({researchers: 1});
    console.log(test2);

    const test3 = await db.collection("researchers").createIndex({name: 1});
    console.log(test3);
}
createIndex();

module.exports = {db, mongo};