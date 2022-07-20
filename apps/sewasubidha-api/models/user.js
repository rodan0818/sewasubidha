const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      required: [true, "username not provided "],
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "fullname not provided "],
    },
    email: {
      type: String,
      required: [true, "email not provided"],
    },
    mobile: {
      type: String,
      required: [true, "mobile number not provided"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "serviceProvider"],
      required: [true, "Please specify user role"],
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
