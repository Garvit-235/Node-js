const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
});

const User = model("User", userSchema);

module.exports = User;
