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
} = require("./user.controller");
const UserRouter = express.Router();

UserRouter.get("/users", getUsers);
UserRouter.get("/users/:userId", getUserById);
UserRouter.post("/signup", upload.single("image"), signup);
UserRouter.put("/users/:userId", upload.single("image"), updateUser);
UserRouter.delete("/users/:userId", deleteUser);
UserRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
UserRouter.post("/logout", logout);
module.exports = UserRouter;
