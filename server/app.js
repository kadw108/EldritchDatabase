const { queryParser } = require("express-query-parser");
const express = require("express");
// const cors = require("cors");
// const http = require("http");

const { db, mongo } = require('./mongo') //gets mongodb db instance

const app = express();
const PORT = 8888;

// middleware
// app.use(cors());

// to parse url queries like ?q=a
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true,
    })
);

/*
app.use(express.urlencoded({ extended: false, limit: "50mb" })); // parse form data
*/
app.use(express.json({ limit: "50mb" })); // needed to parse json in requests

// API routes
const researcher = require("./api/researcher").router;
app.use("/api/researcher", researcher);

app.use("/api/entity", require("./api/entity").router);
app.use("/api/artifact", require("./api/artifact").router);
app.use("/api/experience", require("./api/experience").router);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT + ".");
});
