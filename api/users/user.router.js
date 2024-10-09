const express = require("express");
const passport = require("passport");
const upload = require("../../middlewares/multer");
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  signup,
  logout,
  register,
  getMyProfile,
} = require("./user.controller");
const User = require("../../models/UserSchema");
const UserRouter = express.Router();

UserRouter.get("/users", getUsers);
UserRouter.get(
  "/myProfile",
  passport.authenticate("jwt", { session: false }),
  getMyProfile
);
UserRouter.get("/users/:userId", getUserById);
UserRouter.post("/register", upload.single("image"), register);
UserRouter.put("/users/:userId", upload.single("image"), updateUser);
UserRouter.delete("/users/:userId", deleteUser);
UserRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
UserRouter.post("/logout", logout);
module.exports = UserRouter;
