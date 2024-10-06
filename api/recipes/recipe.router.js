const express = require("express");
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
recipeRouter.post("/recipes", createRecipe);
recipeRouter.put("/recipes/:recipeId", updateRecipe);
recipeRouter.delete("/recipes/:recipeId", deleteRecipe);

module.exports = recipeRouter;
