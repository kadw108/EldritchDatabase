// Require Mongoose
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB);

// Define a schema
const Schema = mongoose.Schema;
const ResearcherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creation_datetime: {
    type: Date,
    required: true
  }
});
const ResearcherModel = mongoose.model("Researcher", ResearcherSchema);

module.exports = {ResearcherModel};