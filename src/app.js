const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const validateSignUpData = require("./utils/validation");
const jwt = require("jsonwebtoken");
const userAuth = require("./middleware/auth");
// ---middle-wares---
app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
  // validation of signUp data
  const { firstName, lastName, emailId, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);
  try {
    validateSignUpData(req);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.send("Sucessfull");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.password;
  try {
    const user = await User.find({ password: userEmail });
    res.send(user);
  } catch (err) {
    res.send("error occured");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    console.error("no user sorry");
  }
});

app.get("/oneUser", async (req, res) => {
  const userPassword = req.body.password;
  try {
    // it returns oldest document
    const user = await User.findOne({ password: userPassword });
    res.send(user);
  } catch (err) {
    res.status(400).send("sorry no user found");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user deleted shriharivansh" + user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted sucssfully");
  } catch (err) {
    res.send("errorrr");
  }
});
app.get("/profile", userAuth, async (req, res) => {
  res.send("profile : " + req.user.lastName);
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    const isUserValid = await user.validatePassword(password);
    if (isUserValid) {
      const token = user.getJWT();
      res.cookie("token", token);
      res.send("logged in ");
    } else {
      throw new Error("user doesnt exist");
    }
  } catch (err) {
    res.status(400).send("login failed : " + err);
  }
});

connectDB()
  .then(() => {
    console.log("db connected shriharivansh");
    app.listen(port, () => {
      console.log("shriharivansh");
    });
  })
  .catch((err) => {
    console.error("error found");
  });
