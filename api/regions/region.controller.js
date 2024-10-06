const Region = require("../../models/Region");
const getRegions = async (req, res, next) => {
  try {
    const regions = await Region.find();
    res.status(200).json(regions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getRegionById = async (req, res, next) => {
  try {
    const region = await Region.findById(req.params.regionId);
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createRegion = async (req, res, next) => {
  try {
    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateRegion = async (req, res, next) => {
  try {
    const region = await Region.update(req.body, {
      where: { id: req.params.regionId },
    });
    res.status(200).json(region);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteRegion = async (req, res, next) => {
  try {
    await Region.destroy({ where: { id: req.params.regionId } });
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
