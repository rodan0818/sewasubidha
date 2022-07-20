const UserModel = require("../models/user");

async function createUser(newUser) {
  return await UserModel.create(newUser);
}
async function findUserByUserName(username) {
  return await UserModel.findOne({ username: username }).exec();
}
async function findUserByIdAndUpdate(id, userUpdate) {
  return await UserModel.findOneAndUpdate({ _id: id }, userUpdate, {
    new: true,
  }).select("-password");
}
module.exports = {
  createUser,
  findUserByUserName,
  findUserByIdAndUpdate,
};
