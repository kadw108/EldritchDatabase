const express = require("express");
const router = express.Router();
const { ExperienceModel } = require("../model/schema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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

    const queryToIdArray = (queryField) => {
        if (queryField) {
            return queryField.split(",").map((id) => new ObjectId(id));
        }
        return [];
    };

    try {
        const searchString = req.query.s;
        const qResearchers = queryToIdArray(req.query.r);
        const qArtifacts = queryToIdArray(req.query.a);
        const qEntities = queryToIdArray(req.query.e);
        console.log("SEARCH\nstring: " + searchString + 
            "\nresearchers: " + qResearchers + 
            "\nartifacts: " + qArtifacts + 
            "\nentities: " + qEntities
        );

        let query = {};

        // get all experiences whose name and description match the search string
        if (searchString != "") {
            query = {
                ...query,
                $or: [
                    { name: { $regex: searchString, $options: "i" } },
                    { description: { $regex: searchString, $options: "i" } }
                ]
            };
        }
        // get only experiences with specified researchers/artifacts/entities in search filters
        if (qResearchers.length > 0) {
            query = {
                ...query,
                researchers: { $all : qResearchers }
            };
        }
        if (qArtifacts.length > 0) {
            query = {
                ...query,
                artifacts: { $all : qArtifacts }
            };
        }
        if (qEntities.length > 0) {
            query = {
                ...query,
                entities: { $all : qEntities }
            }
        }
        const objects = await ExperienceModel.find(query);

        let aggData = await ExperienceModel.aggregate([
            {$match: query},
            {$unwind: "$researchers"},
            {$lookup: {
                from: "researchers",
                localField: "researchers",
                foreignField: "_id",
                as: "r"
            }},
            {$set: {
                r: {$first: "$r"}
            }},
            {$group: {
                _id: null,
                earliest: { $min: "$creation_datetime"},
                latest: {$max: "$creation_datetime"},
                earliestResearcher: { $min: "$r.creation_datetime"},
                latestResearcher: {$max: "$r.creation_datetime"},
                countHuman: {$sum: {
                  $cond: [{ $eq: ["$r.category", "Human"] }, 1, 0]
                }},
                count: {$count: {}},
                researcherNames: {$push: "$r.name"}
            }}, 
        ]);
        aggData = aggData[0]; // results are returned as array with 1 object, we only want the object

        res.status(201).json({ success: true, data: {objects: objects, aggData: aggData}});
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, data: err.message });
    }
});

module.exports = { router };
