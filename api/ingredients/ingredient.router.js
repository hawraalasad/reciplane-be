const express = require("express");
const ingredientRouter = express.Router();
const {
  getIngredients,

  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./ingredient.contoller");

ingredientRouter.get("/", getIngredients);
ingredientRouter.post("/ingredients", createIngredient);
ingredientRouter.put("/ingredients/:ingredientId", updateIngredient);
ingredientRouter.delete("/ingredients/:ingredientId", deleteIngredient);

module.exports = ingredientRouter;
