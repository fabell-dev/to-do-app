import { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date },
});

export default model("note", noteSchema);
