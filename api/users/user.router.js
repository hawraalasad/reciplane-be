const express = require("express");
const upload = require("../../middlewares/multer");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./user.controller");
const UserRouter = express.Router();

UserRouter.get("/users", getUsers);
UserRouter.get("/users/:userId", getUserById);
UserRouter.post("/users", upload.single("image"), createUser);
UserRouter.put("/users/:userId", upload.single("image"), updateUser);
UserRouter.delete("/users/:userId", deleteUser);

module.exports = UserRouter;
