const { db, mongo } = require("./mongo");
const express = require("express");
const router = express.Router();

const { ResearcherSchema } = require("./schema");

//create new review
router.post("/new", async (req, res) => {
    try {
        console.log(req);

        /*
        // check reservation associated with review 
        // (to ensure you're not reviewing the same reservation twice)

        // if review of item (from borrower)
        if (req.body.userId == "" && req.body.itemId != "") {
            const reservation = await db.collection("reservations").findOne({ _id: new mongo.ObjectId(req.params.reservationId) }, { borrowerReview: 1 });
            console.log(reservation + " " + (reservation.borrowerReview === ""));

            if (reservation.borrowerReview !== "") {
                console.error("Review already exists! Review id: " + reservation.borrowerReview);
                throw new Error("Review already exists! Review id: " + reservation.borrowerReview);
            }
        }
        // if review of borrower (from lender)
        else if (req.body.userId != "" && req.body.itemId == "") {
            const reservation = await db.collection("reservations").findOne({ _id: new mongo.ObjectId(req.params.reservationId) }, { lenderReview: 1 });
            console.log(reservation + " " + (reservation.lenderReview === ""));

            if (reservation.lenderReview !== "") {
                console.error("Review already exists! Review id: " + reservation.lenderReview);
                throw new Error("Review already exists! Review id: " + reservation.lenderReview);
            }
        }
        else {
            console.error("Improperly formatted review! " + req.body);
            throw new Error("Improperly formatted review!");
        }

        // actually create reservation, set appropriate fields

        //save date as date object
        req.body.dateModified = new Date(req.body.dateModified);
        const results = await db.collection("reviews").insertOne(req.body);
        const reviewId = results.insertedId.toString();

        // every user tracks reviews they've left
        await db.collection('users').updateOne({ _id: new mongo.ObjectId(req.body.reviewerId) }, { $push: { reviewsMade: reviewId } });

        // if review is review of an item (from borrower)
        if (req.body.userId == "" && req.body.itemId != "") {
            await db.collection('items').updateOne({ _id: new mongo.ObjectId(req.body.itemId) }, { $push: { review: reviewId } });

            await db.collection('reservations').updateOne({ _id: new mongo.ObjectId(req.params.reservationId) }, { $set: { borrowerReview: reviewId } });
        }
        // if review is review of a user (from lender)
        else if (req.body.itemId == "" && req.body.userId != "") {
            await db.collection('users').updateOne({ _id: new mongo.ObjectId(req.body.userId) }, { $push: { reviewsOfUser: reviewId } });

            await db.collection('reservations').updateOne({ _id: new mongo.ObjectId(req.params.reservationId) }, { $set: { lenderReview: reviewId } });
        }

        res.status(201).json({ success: true, data: "successfully added review!" });
        */
    } catch (err) {
        res.status(404).json({ success: false, data: err.message });
    }
});

module.exports = {router};