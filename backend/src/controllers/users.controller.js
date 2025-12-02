const usersCtrl = {};
const UserModel = require("../models/users.model");

//GET(ALL)
usersCtrl.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
      count: users.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

//POST
usersCtrl.postUsers = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Validar campos requeridos
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required",
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const user = new UserModel({ username, email });
    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

//GET(ONE)
usersCtrl.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};

//UPDATE
usersCtrl.updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Verificar si el nuevo username ya existe (excepto el mismo usuario)
    if (username) {
      const existingUser = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        date_modified: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

//DELETE
usersCtrl.deleteUser = async (req, res) => {
  try {
    const element = await UserModel.findByIdAndDelete(req.params.id);

    if (!element) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: element,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = usersCtrl;
