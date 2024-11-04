const express = require("express");
const router = express.Router();
const { ResearcherModel } = require("../model/schema");

//create new
router.post("/new", async (req, res) => {
    try {
        // Get the incoming data in the Mongoose-defined schema format.
        const newObject = new ResearcherModel({
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            creation_datetime: new Date(Date.now()),
        });
        console.log("NEW OBJECT: " + newObject);
        await newObject.save();

        res.status(201).json({ success: true, data: "Successfully added researcher." });
    } catch (err) {
        res.status(422).json({ success: false, data: err.message });
    }
});

router.get("/get_all", async (req, res) => {
    try {
        // find all
        const allResults = await ResearcherModel.find({});

        res.status(201).json({ success: true, data: allResults });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const result = await ResearcherModel.findById(req.params.id);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

module.exports = { router };
