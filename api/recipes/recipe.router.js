const express = require("express");
const upload = require("../../middlewares/multer");

const recipeRouter = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesByCountry,
  toggleLike,
} = require("./recipe.controller");
const passport = require("passport");

recipeRouter.get("/", getRecipes);
recipeRouter.get("/:recipeId", getRecipeById);
recipeRouter.get("/country/:country", getRecipesByCountry);
recipeRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
recipeRouter.put(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateRecipe
);
recipeRouter.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
recipeRouter.post(
  "/like/:recipeId",
  passport.authenticate("jwt", { session: false }),
  toggleLike
);

module.exports = recipeRouter;
