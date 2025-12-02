const { Router } = require("express");
const router = Router();
const {
  getUsers,
  postUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

router
  .route("/")
  .get(getUsers) //.json envia json
  .post(postUsers);

router
  .route("/:id")
  .get(getUser) //.send envia string
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
