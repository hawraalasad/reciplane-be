const Ingredient = require("../../models/Ingredient");
const getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.update(req.body, {
      where: { id: req.params.ingredientId },
    });
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    await Ingredient.destroy({ where: { id: req.params.ingredientId } });
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getIngredients,

  createIngredient,
  updateIngredient,
  deleteIngredient,
};
