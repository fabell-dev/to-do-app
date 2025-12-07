import User from "../models/users.model.js";
import errorResponse from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";

const usersCtrl = {};

//GET(ALL)
usersCtrl.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
      count: users.length,
    });
  } catch (error) {
    return errorResponse(res, 500, "Error retrieving users", error);
  }
};

//POST
usersCtrl.postUsers = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
    });
  } catch (error) {
    return errorResponse(res, 500, "Error creating user", error);
  }
};

//GET(ONE)
usersCtrl.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

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
    return errorResponse(res, 500, "Error retrieving user", error);
  }
};

//UPDATE
usersCtrl.updateUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (username) {
      const existingUser = await User.findOne({
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

    const updateData = {
      name,
      username,
      email,
      date_modified: new Date(),
    };

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

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
    return errorResponse(res, 500, "Error updating user", error);
  }
};

//DELETE
usersCtrl.deleteUser = async (req, res) => {
  try {
    const element = await User.findByIdAndDelete(req.params.id);

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
    return errorResponse(res, 500, "Error deleting user", error);
  }
};

//LOGIN
usersCtrl.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        error: "Se requiere usuario/email y contraseña",
      });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        errorIdentifier: "Usuario o email no encontrado",
        errorPassword: "",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        errorIdentifier: "",
        errorPassword: "Contraseña incorrecta",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return errorResponse(res, 500, "Error durante el login", error);
  }
};

export default usersCtrl;
