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
        await ExperienceModel.deleteOne({ _id: req.params.id });
        res.status(201).json({ success: true, data: "Experience deleted." });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const newObject = {
            name: req.body.name,
            researchers: req.body.researchers,
            artifacts: req.body.artifacts,
            entities: req.body.entities,
            description: req.body.description,
        };
        console.log("EDITED OBJECT: " + newObject);

        const result = await ExperienceModel.findOneAndUpdate({ _id: req.params.id }, newObject, { new: true });
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        console.log("SEARCH: " + req.query.s, req.query.r, req.query.a, req.query.e);
        const searchString = req.query.s;
        const researchers = req.query.r;
        const artifacts = req.query.a;
        const entities = req.query.e;

        let query = [];

        // get all experiences whose name and description match the search string
        if (searchString != "") {
            query.push({$or: [
                { name: { $regex: searchString, $options: "i" } },
                { description: { $regex: searchString, $options: "i" } }
            ]});
        }
        // get only experiences with specified researchers/artifacts/entities in search filters
        if (researchers.length > 0) {
            query.push({
                researchers: { $all : researchers }
            });
        }
        if (artifacts.length > 0) {
            query.push({
                artifacts: { $all : artifacts }
            });
        }
        if (entities.length > 0) {
            query.push({
                entities: { $all : entities }
            });
        }

        const result = await ExperienceModel.find(...query);
        res.status(201).json({ success: true, data: result });
    } catch (err) {
        res.status(404).json({ success: false, data: err.message });
    }
});

module.exports = { router };
