const express = require("express");
const router = express.Router();
const { EntityModel } = require("../model/schema");

//create new
router.post("/new", async (req, res) => {
    try {
        console.log("REQ: " + req.body);

        // Get the incoming data in the Mongoose-defined schema format.
        const newObject = new EntityModel({
            name: req.body.name,
            origin: req.body.origin,
            description: req.body.description,
            creation_datetime: new Date(Date.now()),
        });
        console.log("NEW OBJECT: " + newObject);
        await newObject.save();

        res.status(201).json({ success: true, data: "Successfully added experience." });

    } catch (err) {
        // console.log(err.message);
        res.status(422).json({ success: false, data: err.message });
    }
});

module.exports = {router};