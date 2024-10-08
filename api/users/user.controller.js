const User = require("../../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Password hashing failed");
  }
};

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });
  return token;
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const userData = req.body;
    console.log("Received user data:", userData);

    // Hash the password
    userData.password = await hashPassword(userData.password);
    console.log("Password hashed");

    // If an image was uploaded, add its path to userData
    if (req.file) {
      userData.image = req.file.path;
    }

    console.log("User data before creation:", userData);

    const user = await User.create(userData);

    console.log("Created user:", user);

    // Generate a token for the new user
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error in signup:", error);
    next(error);
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userData = req.body;

    // If password is being updated, hash it
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    // If an image was uploaded, add its path to userData
    if (req.file) {
      userData.image = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.params.userId, userData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
  logout,
};
