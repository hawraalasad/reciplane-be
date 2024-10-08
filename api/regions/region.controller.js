const Region = require("../../models/Region");
const Country = require("../../models/Country");
const getRegions = async (req, res, next) => {
  try {
    const regions = await Region.find().populate("recipes");
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRegionById = async (req, res, next) => {
  try {
    const region = await Region.findById(req.params.regionId).populate(
      "recipes"
    );
    if (!region) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createRegion = async (req, res, next) => {
  try {
    const region = await Region.create(req.body);
    const country = await Country.findByIdAndUpdate(req.body.country, {
      $push: { regions: region._id },
    });
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRegion = async (req, res, next) => {
  try {
    const region = await Region.findByIdAndUpdate(
      req.params.regionId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteRegion = async (req, res, next) => {
  try {
    await Region.findByIdAndDelete(req.params.regionId);
    res.status(200).json({ message: "Region deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
};
