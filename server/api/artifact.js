const express = require("express");
const router = express.Router();
const { ArtifactModel } = require("../model/schema");

//create new
router.post("/new", async (req, res) => {
    try {
        console.log("REQ: " + req.body);

        // Get the incoming data in the Mongoose-defined schema format.
        const newObject = new ArtifactModel({
            name: req.body.name,
            nature: req.body.nature,
            description: req.body.description,
            creation_datetime: new Date(Date.now()),
        });
        console.log("NEW OBJECT: " + newObject);
        await newObject.save();

        res.status(201).json({ success: true, data: "Successfully added artifact." });

    } catch (err) {
        // console.log(err.message);
        res.status(422).json({ success: false, data: err.message });
    }
});

router.get("/get_all", async (req, res) => {
    try {
        // find all
        const allResults = await ArtifactModel.find({});

        res.status(201).json({ success: true, data: allResults });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const result = await ArtifactModel.findById(req.params.id);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

module.exports = {router};