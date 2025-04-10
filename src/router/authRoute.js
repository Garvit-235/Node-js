const express = require("express");
const validateSignUpData = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
// --- signUP - Login - Logout ---

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    validateSignUpData(req);
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("you are signedUp successfully");
  } catch (err) {
    res.status(400).send("Invalid credentials");
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = await user.getJWT();
        res.cookie("userCookie", token);
        res.send("user LoggedIn successfully");
      }
    } else {
      res.send("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("error :" + err);
  }
});
authRouter.post("/logout", async function (req, res) {
  res.clearCookie("userCookie");
  res.send("loggedOut successfully");
});
module.exports = authRouter;
