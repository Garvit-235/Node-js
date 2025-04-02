const express = require("express");
const connectDB = require("./config/database");
const app = express();
const port = 3000;

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
