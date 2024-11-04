const express = require("express");
// const cors = require("cors");
// const http = require("http");

const app = express();
const PORT = 8888;

// middleware
// app.use(cors());

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
