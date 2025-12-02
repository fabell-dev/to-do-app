const { Timestamp } = require("mongodb");
const { Schema, Model, model } = require("mongoose");

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: String,
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date },
});

module.exports = model("note", noteSchema);
