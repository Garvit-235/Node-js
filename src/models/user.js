const { Schema, model } = require("mongoose");
const validator = require("validator");
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("gender not valid");
        }
      },
    },
    emailId: {
      type: String,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId is not Valid");
        }
      },
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password");
        }
      },
      required: true,
      minLength: 8,
    },
    photoUrl: {
      type: String,
      default: "kjsnfkjsndkjf",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
