var express = require("express");
var userRouter = express.Router();
const userService = require("../services/user");
const bcrypt = require("bcrypt");

userRouter.post(
  "/signup",
  async function ({ body: userBody } = req, res, next) {
    try {
      const user = await userService.findUserByUserName(userBody.username);
      if (user) {
        return res
          .status(409)
          .send(`User ${userBody.username} already exists.`);
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(userBody.password, saltOrRounds);
      userBody.password = hash;
      const newUser = await userService.createUser(userBody);
      return res.send({
        message: "Signed up successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          fullname: newUser.fullName,
          email: newUser.email,
          mobile: newUser.mobile,
          role: newUser.role,
        },
      });
    } catch (error) {
      return res.status(500).send(`Error: ${error}`);
    }
  }
);

userRouter.patch("/:id/update", async function (req, res, next) {
  try {
    const user = await userService.findUserByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!user) {
      return res.status(404).send(`User #${req.params.id} doesn't exist`);
    }
    return res.send({ message: "Updated successfully", user: user });
  } catch (error) {
    return res.status(500).send(`Error: ${error}`);
  }
});
module.exports = userRouter;
