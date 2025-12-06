const usersCtrl = {};
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");

//GET(ALL)
usersCtrl.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password"); // Excluir password

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
    const { name, username, email, password } = req.body;

    // Validar campos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required",
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findOne({
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

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Retornar usuario sin la contraseña
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: userResponse,
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
    const user = await UserModel.findById(req.params.id).select("-password");

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
    const { name, username, email, password } = req.body;

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

    // Preparar datos de actualización
    const updateData = {
      name,
      username,
      email,
      date_modified: new Date(),
    };

    // Si se envía una nueva contraseña, hashearla
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, updateData, {
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

//LOGIN
usersCtrl.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        error: "Se requiere usuario/email y contraseña",
      });
    }

    // Buscar usuario por email O username
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(401).json({
        errorIdentifier: "Usuario o email no encontrado",
        errorPassword: "",
      });
    }

    // Comparar contraseña usando bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        errorIdentifier: "",
        errorPassword: "Contraseña incorrecta",
      });
    }

    // Login exitoso - retornar usuario sin contraseña
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
    return res.status(500).json({
      error: "Error en el servidor",
      details: error.message,
    });
  }
};

module.exports = usersCtrl;
