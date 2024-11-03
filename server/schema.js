// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const ResearcherSchema = new Schema({
  name: String,
  category: String,
  creation_date: Date,
  description: String,
});
const ResearcherModel = mongoose.model("Researcher", ResearcherSchema);

module.exports = {ResearcherModel};