const { schema, model } = require("mongoose");

const userSchema = new schema({
  firstName: String,
  lastName: String,
  emailId: String,
  age: Number,
});

const User = model("User", userSchema);

module.exports = User;
