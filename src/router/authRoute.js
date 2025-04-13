const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const userAuth = require("../middleware/auth");
// --- signUP - Login - Logout ---

authRouter.post("/signUp", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    console.log("lkmd");
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
    res.status(400).send("Invalid credentials : " + err);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    const { password: hashPassword } = user;
    if (!user) {
      throw new Error("Invalid Credentials u");
    }
    const isPasswordValid = await bcrypt.compare(password, hashPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials p");
    }
    const token = await user.getJWT();
    res.cookie("userCookie", token);
    res.send("user LoggedIn successfully");
  } catch (err) {
    res.status(400).send("error :" + err);
  }
});
authRouter.post("/logout", userAuth, async function (req, res) {
  res.clearCookie("userCookie");
  res.send("loggedOut successfully");
});
module.exports = authRouter;
