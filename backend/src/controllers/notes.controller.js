const notesCtrl = {};
const NoteModel = require("../models/notes.model");

//GET(all)
notesCtrl.getNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.json(notes);
};

//POST
notesCtrl.postNotes = async (req, res) => {
  const { title, content, author } = req.body;
  const note = new NoteModel({
    title,
    content,
    author,
  });
  await note.save();
  res.send({ message: "note saved" });
};

//GET(id)
notesCtrl.getNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  res.send(note);
};

//UPDATE
notesCtrl.updateNote = async (req, res) => {
  const { title, content, author } = req.body;
  await NoteModel.findByIdAndUpdate(req.params.id, {
    title,
    content,
    author,
    date_modified: new Date(),
  });
  res.send("Note Updated");
};

//DELETE
notesCtrl.deleteNote = async (req, res) => {
  const element = await NoteModel.findByIdAndDelete(req.params.id);
  if (element === null) {
    res.send("Already Deleted");
  } else {
    res.send("Deleted");
  }
};

module.exports = notesCtrl;
