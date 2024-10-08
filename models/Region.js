const { Schema, model } = require("mongoose");

const regionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Country",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to handle potential errors
regionSchema.pre("save", async function (next) {
  try {
    // You can add custom validation or operations here if needed
    next();
  } catch (error) {
    next(error);
  }
});

// Static method to create a new region with error handling
regionSchema.statics.createRegion = async function (regionData) {
  try {
    const region = new this(regionData);
    await region.save();
    return region;
  } catch (error) {
    throw new Error(`Error creating region: ${error.message}`);
  }
};

// Static method to find a region by ID with error handling
regionSchema.statics.findRegionById = async function (id) {
  try {
    const region = await this.findById(id).populate("countries");
    if (!region) {
      throw new Error("Region not found");
    }
    return region;
  } catch (error) {
    throw new Error(`Error finding region: ${error.message}`);
  }
};

const Region = model("Region", regionSchema);

module.exports = Region;
