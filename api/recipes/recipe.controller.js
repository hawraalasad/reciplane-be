const Recipe = require("../../models/Recipe");
const Country = require("../../models/Country");
const Region = require("../../models/Region");
const Ingredient = require("../../models/Ingredient");
const UserSchema = require("../../models/UserSchema");

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .populate("ingredients")
      .populate("country")
      .populate("region");
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
      .populate("user")
      .populate("ingredients")
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

const getRecipesByCountry = async (req, res, next) => {
  try {
    const country = await Country.find({ name: req.params.country });
    const recipes = await Recipe.find({ country: country._id });
    res.json(recipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    const recipeData = {
      user: req.user._id,
      name: req.body.title,
      description: req.body.instructions,
      ingredients: req.body.ingredients,
      continent: req.body.continent,
      country: req.body.country,
    };
    const { country: recipeCountry, continent: recipeRegion } = recipeData;
    if (req.file) {
      recipeData.image = req.file.path;
    }

    const foundRegion = await Region.findOne({ name: recipeRegion });
    const foundCountry = await Country.findOne({ name: recipeCountry });

    console.log("foundCountry", foundCountry, "country", recipeCountry);
    if (!foundCountry) {
      const newCountry = await Country.create({
        name: recipeCountry,
        region: foundRegion._id,
      });
      recipeData.country = newCountry._id;
    } else {
      recipeData.country = foundCountry._id;
    }

    recipeData.region = foundRegion._id;

    let ingredients = recipeData.ingredients.split(",");

    let ingridentIDs = [];

    for (const ingredient of ingredients) {
      const foundIngredient = await Ingredient.findOne({ name: ingredient });
      if (!foundIngredient) {
        const newIngredient = await Ingredient.create({ name: ingredient });
        ingridentIDs.push(newIngredient._id);
      } else {
        ingridentIDs.push(foundIngredient._id);
      }
    }
    recipeData.ingredients = ingridentIDs;

    console.log("recipeData", recipeData);
    const recipe = await Recipe.create(recipeData);

    const country = await Country.findByIdAndUpdate(recipeData.country, {
      $push: { recipes: recipe._id },
    });

    const region = await Region.findByIdAndUpdate(recipeData.region, {
      $push: { recipes: recipe._id },
    });

    const updateUser = await UserSchema.findByIdAndUpdate(recipeData.user, {
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
  getRecipesByCountry,
};
