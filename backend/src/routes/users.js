const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controllers/users.controller");

router.get("/", usersCtrl.getUsers);
router.post("/", usersCtrl.postUsers);
router.get("/:id", usersCtrl.getUser);
router.put("/:id", usersCtrl.updateUser);
router.delete("/:id", usersCtrl.deleteUser);
router.post("/login", usersCtrl.loginUser);

module.exports = router;
