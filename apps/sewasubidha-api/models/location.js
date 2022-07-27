const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["user", "serviceProvider"],
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    streetName: {
      type: String,
      required: true,
    },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] },
    },
    services: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
locationSchema.index({ location: "2dsphere" });
const LocationModel = mongoose.model("Location", locationSchema);
module.exports = LocationModel;
