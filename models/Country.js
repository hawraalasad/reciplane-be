const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    region: {
      type: Schema.Types.ObjectId,
      ref: "Region",
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;
