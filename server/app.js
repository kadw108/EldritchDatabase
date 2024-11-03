const express = require("express");
const { db, mongo } = require("./mongo"); // for mongoDB
// const cors = require("cors");
// const http = require("http");

const app = express();
const PORT = 8888;

// middleware
// app.use(cors());

/*
app.use(express.urlencoded({ extended: false, limit: "50mb" })); // parse form data
app.use(express.json({ limit: "50mb" })); // parse json
*/

// API routes
const researcher = require("./researcher").router;
app.use("/api/researcher", researcher);

app.listen(PORT, () => {
    console.log("Server running on port " + PORT + ".");
});
