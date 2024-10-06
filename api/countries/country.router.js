const express = require("express");
const countryRouter = express.Router();
const {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("./country.controller");

countryRouter.get("/countries", getCountries);
countryRouter.get("/countries/:countryId", getCountryById);
countryRouter.post("/countries", createCountry);
countryRouter.put("/countries/:countryId", updateCountry);
countryRouter.delete("/countries/:countryId", deleteCountry);

module.exports = countryRouter;
