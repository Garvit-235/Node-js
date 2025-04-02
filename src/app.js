const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
const port = 3000;

app.post("/signUp", async (req, res) => {
  const user = new User({
    firstName: "Shriharivansh",
    lastName: "ju Maharaj",
    emailId: "harivansh@vrindavan.com",
    password: "radha@vallabh",
  });
  try {
    await user.save();
    res.send("Sucessfull");
  } catch (err) {
    res.status(400).send("Failed some error ");
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
