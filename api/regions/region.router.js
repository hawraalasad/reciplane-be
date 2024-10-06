const express = require("express");
const regionRouter = express.Router();
const {
  getRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
} = require("./region.controller");
regionRouter.get("/regions", getRegions);
regionRouter.get("/regions/:regionId", getRegionById);
regionRouter.post("/regions", createRegion);
regionRouter.put("/regions/:regionId", updateRegion);
regionRouter.delete("/regions/:regionId", deleteRegion);

module.exports = regionRouter;
