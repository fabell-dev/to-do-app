const { Timestamp } = require("mongodb");
const { Schema, Model, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    trim: true, //Limpia espacios innecesarios
  },
  username: {
    type: String,
    required: true,
    trim: true, //Limpia espacios innecesarios
    unique: true, //Se explica sola
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date },
});

module.exports = model("user", userSchema);
