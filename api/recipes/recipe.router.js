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

recipeRouter.get("/recipes", getRecipes);
recipeRouter.get("/recipes/:recipeId", getRecipeById);
recipeRouter.post("/recipes", upload.single("image"), createRecipe);
recipeRouter.put("/recipes/:recipeId", upload.single("image"), updateRecipe);
recipeRouter.delete("/recipes/:recipeId", deleteRecipe);

module.exports = recipeRouter;
