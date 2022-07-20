const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      required: [true, "name not provided "],
    },
    requestorId: {
      type: String,
      required: [true, "requestorId not provided"],
    },
    providerId: {
      type: String,
      required: [true, "providerId not provided"],
    },
    status: {
      type: String,
      enum: ["pending", "canceled", "completed"],
      required: [true, "Please specify status"],
    },
  },
  { timestamps: true }
);
const ServiceModel = mongoose.model("Service", userSchema);
module.exports = ServiceModel;
