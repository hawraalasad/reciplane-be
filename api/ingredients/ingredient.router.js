const express = require("express");
const ingredientRouter = express.Router();
const {
  getIngredients,

  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./ingredient.contoller");

ingredientRouter.get("/", getIngredients);
ingredientRouter.post("/", createIngredient);
ingredientRouter.put("/:ingredientId", updateIngredient);
ingredientRouter.delete("/:ingredientId", deleteIngredient);

module.exports = ingredientRouter;
