const express = require("express");
const countryRouter = express.Router();
const {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("./country.controller");

countryRouter.get("/", getCountries);
countryRouter.get("/:countryId", getCountryById);
countryRouter.post("/", createCountry);
countryRouter.put("/:countryId", updateCountry);
countryRouter.delete("/:countryId", deleteCountry);

module.exports = countryRouter;
