const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://garvits235:Garvit12345@cluster0.xtvuomw.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
