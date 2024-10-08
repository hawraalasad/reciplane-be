const express = require("express");
const upload = require("../../middlewares/multer");

const recipeRouter = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("./recipe.controller");
const passport = require("passport");

recipeRouter.get("/", getRecipes);
recipeRouter.get("/:recipeId", getRecipeById);
recipeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
recipeRouter.put("/:recipeId", upload.single("image"), updateRecipe);
recipeRouter.delete("/:recipeId", deleteRecipe);

module.exports = recipeRouter;
