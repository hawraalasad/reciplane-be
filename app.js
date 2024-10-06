const express = require("express");
const app = express();
const connectDb = require("./database");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors"); // Add this line to import cors
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const UserRouter = require("./api/users/user.router"); // Add this line to import UserRouter
const passport = require("passport");
const { JwtStrategy, localStrategy } = require("./middlewares/passport");

const RecipeRouter = require("./api/recipes/recipe.router");
const IngredientRouter = require("./api/ingredients/ingredient.router");
const CountryRouter = require("./api/countries/country.router");
const RegionRouter = require("./api/regions/region.router");
dotenv.config();
const PORT = process.env.PORT;

connectDb();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(passport.initialize());
passport.use("jwt", JwtStrategy); // Initialize Passport with the JWT strategy
passport.use("local", localStrategy); // Initialize Passport with the local strategy

// Group related routes
app.use("/api/users", UserRouter);
app.use("/api/regions", RegionRouter);
app.use("/api/recipes", RecipeRouter);
app.use("/api/ingredients", IngredientRouter);
app.use("/api/countries", CountryRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
