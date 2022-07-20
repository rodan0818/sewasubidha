var express = require("express");
var userRouter = express.Router();
const UserModel = require("../models/user");

/* GET users listing. */
userRouter.get("/", async function (req, res, next) {
  const users = await UserModel.find({}).exec();
  res.send(users);
});
userRouter.post("/signup", async function ({ body } = req, res, next) {
  try {
    let user = await UserModel.findOne({ username: body.username }).exec();
    if (user) {
      return res.status(409).send(`User ${body.username} already exists.`);
    }
    await UserModel.create(body);
    return res.send("Signed up successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

userRouter.patch("/:id/update", async function (req, res, next) {
  try {
    console.log("ran");
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).send(`User #${req.params.id} doesn't exist`);
    }
    return res.send(user);
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
module.exports = userRouter;
