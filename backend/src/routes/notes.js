const { Router } = require("express");
const router = Router();
const {
  getNotes,
  postNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

router
  .route("/")
  .get(getNotes) //.json envia json
  .post(postNotes);

router
  .route("/:id")
  .get(getNote) //.send envia string
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;
