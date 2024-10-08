const Country = require("../../models/Country");
const Region = require("../../models/Region");

const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCountryById = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.countryId).populate(
      "recipes"
    );
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndUpdate(
      req.params.countryId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCountry = async (req, res, next) => {
  try {
    await Country.findByIdAndDelete(req.params.countryId);
    res.status(204).json({ message: "Country deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountry,
};
