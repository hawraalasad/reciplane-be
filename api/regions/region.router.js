const express = require("express");
const regionRouter = express.Router();
const {
  getRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("./region.controller");
regionRouter.get("/", getRegions);
regionRouter.get("/:regionId", getRegionById);
regionRouter.post("", createRegion);
regionRouter.put("/:regionId", updateRegion);
regionRouter.delete("/:regionId", deleteRegion);

module.exports = regionRouter;
