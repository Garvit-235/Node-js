const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("enter a valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email not valid");
  }
  //  else if (!validator.isStrongPassword(password)) {
  //     throw new Error("password not valid");
  //   }
};

module.exports = validateSignUpData;
