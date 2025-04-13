const express = require("express");
const userAuth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const {
  validateProfileEditData,
  validatePassword,
} = require("../utils/validation");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { firstName, lastName, emailId, photoUrl } = req.user;
    res.send({
      firstName,
      lastName,
      emailId,
      photoUrl,
    });
  } catch (err) {
    res.status(400).send("Error message : " + err);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileEditData(req);
    const { firstName, lastName, photoUrl } = req.body;
    const user = await User.findByIdAndUpdate(req.id, {
      firstName,
      lastName,
      photoUrl,
    });
    res.send("profile updated" + user);
  } catch (err) {
    throw new Error("unable to edit profile : " + err);
  }
});
profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      req.user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send("Invalid Password");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      { _id: req.id },
      {
        password: hashPassword,
      }
    );
    res.send("password changed");
  } catch (err) {
    throw new Error("unable to edit Password" + err);
  }
});
module.exports = profileRouter;
