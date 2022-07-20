const mongoose = require("mongoose");
const config = require("config");

const mongodbUri = config.get("database.mongoUri");
async function connectDB() {
  return await mongoose.connect(mongodbUri);
}
module.exports = connectDB;
