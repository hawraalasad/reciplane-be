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
const { jwtStrategy, localStrategy } = require("./config/passport");

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
passport.use("jwt", jwtStrategy, localStrategy); // Initialize Passport with the JWT strategy

// Add here to use routers
app.use("/api/", UserRouter);
app.use("/api/", RegionRouter);
app.use("/api/", RecipeRouter);
app.use("/api/", IngredientRouter);
app.use("/api/", CountryRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The application is running on localhost:${PORT}`);
});
