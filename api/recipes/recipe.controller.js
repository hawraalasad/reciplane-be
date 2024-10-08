const Recipe = require("../../models/Recipe");
const Country = require("../../models/Country");
const Region = require("../../models/Region");
const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("country").populate("region");
    res.json(recipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate("country")
      .populate("region");
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
    const recipeData = { ...req.body, user: req.user._id };
    const { country: recipeCountry, region: recipeRegion } = recipeData;
    if (req.file) {
      recipeData.imageUrl = req.file.path;
    }
    const recipe = await Recipe.create(recipeData);
    const country = await Country.findByIdAndUpdate(recipeCountry, {
      $push: { recipes: recipe._id },
    });
    const region = await Region.findByIdAndUpdate(recipeRegion, {
      $push: { recipes: recipe._id },
    });
    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipeData = { ...req.body, user: req.user._id };
    const { country: recipeCountry, region: recipeRegion } = recipeData;
    if (req.file) {
      recipeData.imageUrl = req.file.path;
    }
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      recipeData,
      { new: true }
    );
    const country = await Country.findByIdAndUpdate(recipeCountry, {
      $push: { recipes: recipe._id },
    });
    const region = await Region.findByIdAndUpdate(recipeRegion, {
      $push: { recipes: recipe._id },
    });
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
