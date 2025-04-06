const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
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
