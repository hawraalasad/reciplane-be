const User = require("../../models/UserSchema");

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
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const userData = req.body;

    // If an image was uploaded, add its path to userData
    if (req.file) {
      userData.imagePath = req.file.path;
    }

    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userData = req.body;

    // If an image was uploaded, add its path to userData
    if (req.file) {
      userData.imagePath = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.params.userId, userData, {
      new: true,
    });
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
  createUser,
  updateUser,
  deleteUser,
};
