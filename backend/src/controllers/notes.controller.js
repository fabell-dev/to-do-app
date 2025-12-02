const notesCtrl = {};
const NoteModel = require("../models/notes.model");

//GET(all)
notesCtrl.getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find();

    return res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
      count: notes.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

//POST
notesCtrl.postNotes = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validar campos requeridos
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Title, content and author are required",
      });
    }

    const note = new NoteModel({
      title,
      content,
      author,
    });
    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message,
    });
  }
};

//GET(id)
notesCtrl.getNote = async (req, res) => {
  try {
    const note = await NoteModel.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving note",
      error: error.message,
    });
  }
};

//UPDATE
notesCtrl.updateNote = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const note = await NoteModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        author,
        date_modified: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

//DELETE
notesCtrl.deleteNote = async (req, res) => {
  try {
    const element = await NoteModel.findByIdAndDelete(req.params.id);

    if (!element) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: element,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = notesCtrl;
