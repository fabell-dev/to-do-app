const notesCtrl = {};
const NoteModel = require("../models/notes.model");
const { errorResponse } = require("../utils/errorHandler");

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
    return errorResponse(res, 500, "Error retrieving notes", error);
  }
};

//POST
notesCtrl.postNotes = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    const note = new NoteModel({
      title,
      content,
    });
    await note.save();

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return errorResponse(res, 500, "Error creating note", error);
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
    return errorResponse(res, 500, "Error retrieving note", error);
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
    return errorResponse(res, 500, "Error updating note", error);
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
    return errorResponse(res, 500, "Error deleting note", error);
  }
};

module.exports = notesCtrl;
