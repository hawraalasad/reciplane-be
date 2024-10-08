const Recipe = require("../../models/Recipe");
const Country = require("../../models/Country");
const Ingredient = require("../../models/Ingredient");

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = req.body;
    if (req.file) {
      recipeData.image = req.file.path;
    }

    recipeData.user = req.user._id;
    const country = await Country.find({ name: recipeData.country });
    recipeData.country = country._id;

    const ingredients = await Ingredient.find({ name: recipeData.ingredients });

    console.log("ingredients", ingredients);

    // const recipe = await Recipe.create(recipeData);
    res.status(201).json(recipeData);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipeData = req.body;
    if (req.file) {
      recipeData.imageUrl = req.file.path;
    }
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      recipeData,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
