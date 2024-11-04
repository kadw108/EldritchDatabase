const express = require("express");
const router = express.Router();
const { ExperienceModel } = require("../model/schema");

//create new
router.post("/new", async (req, res) => {
    try {
        console.log("REQ: " + req.body);

        // Get the incoming data in the Mongoose-defined schema format.
        const newObject = new ExperienceModel({
            name: req.body.name,
            researchers: req.body.researchers,
            artifacts: req.body.artifacts,
            entities: req.body.entities,
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

router.get("/get_all", async (req, res) => {
    try {
        // find all
        const allResults = await ExperienceModel.find({});

        res.status(201).json({ success: true, data: allResults });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        const result = await ExperienceModel.findById(req.params.id);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await ExperienceModel.deleteOne({_id: req.params.id});
        res.status(201).json({ success: true, data: "Experience deleted." });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

module.exports = {router};