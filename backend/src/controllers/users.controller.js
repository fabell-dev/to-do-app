const usersCtrl = {};
const UserModel = require("../models/users.model");

//GET(ALL)
usersCtrl.getUsers = async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
};

//POST
usersCtrl.postUsers = async (req, res) => {
  const { username, email } = req.body;
  const user = new UserModel({ username, email });
  await user.save();
  res.send("User Created");
};

//GET(ONE)
usersCtrl.getUser = async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  res.send(user);
};

//UPDATE
usersCtrl.updateUser = async (req, res) => {
  const { username, email } = req.body;
  await UserModel.findByIdAndUpdate(req.params.id, {
    username,
    email,
    date_modified: new Date(),
  });
  res.send("User Updated");
};

//DELETE
usersCtrl.deleteUser = async (req, res) => {
  const element = await UserModel.findByIdAndDelete(req.params.id);
  if (element === null) {
    res.send("Already Deleted");
  } else {
    res.send("Deleted");
  }
};

module.exports = usersCtrl;
