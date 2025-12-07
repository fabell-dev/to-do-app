import { Router } from "express";
import usersCtrl from "../controllers/users.controller.js";

const router = Router();

//ALL
router.get("/", usersCtrl.getUsers);
router.post("/", usersCtrl.postUsers);

//ONE
router.get("/:id", usersCtrl.getUser);
router.put("/:id", usersCtrl.updateUser);
router.delete("/:id", usersCtrl.deleteUser);
router.post("/login", usersCtrl.loginUser);

export default router;
