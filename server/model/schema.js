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
    enum: ['Human', 'Manufactured'],
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

const ArtifactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nature: {
    type: String,
    enum: ['Physical', 'Digital'],
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
const ArtifactModel = mongoose.model("Artifact", ArtifactSchema);

const EntitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    enum: ['Planar', 'Extraplanar'],
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
const EntityModel = mongoose.model("Entity", EntitySchema);

const ExperienceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  researchers: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  artifacts: {
    type: [Schema.Types.ObjectId],
    required: true
  },
  entities: {
    type: [Schema.Types.ObjectId],
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
const ExperienceModel = mongoose.model("Experience", ExperienceSchema);

module.exports = {ResearcherModel, ArtifactModel, EntityModel, ExperienceModel};