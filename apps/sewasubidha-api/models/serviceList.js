const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      required: [true, "name not provided "],
      unique: [true, "name already used"],
    },
    adminId: {
      type: String,
      required: [true, "adminId not provided"],
    },
  },
  { timestamps: true }
);
const ServiceListModel = mongoose.model("ServiceList", serviceListSchema);
module.exports = ServiceListModel;
