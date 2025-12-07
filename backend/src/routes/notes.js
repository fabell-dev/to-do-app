import { Router } from "express";
import notesCtrl from "../controllers/notes.controller.js";

const router = Router();

//ALL
router.route("/").get(notesCtrl.getNotes).post(notesCtrl.postNotes);

//ONE
router
  .route("/:id")
  .get(notesCtrl.getNote)
  .put(notesCtrl.updateNote)
  .delete(notesCtrl.deleteNote);

export default router;
