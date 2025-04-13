const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("enter a valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password not valid");
  }
};
const validateProfileEditData = (req) => {
  const { firstName, lastName } = req.body;
  if (
    !validator.isLength(firstName, { min: 3, max: 15 }) ||
    !validator.isLength(lastName, { min: 3, max: 15 })
  ) {
    throw new Error("enter valid fields");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
};
