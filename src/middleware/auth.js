const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decodeId = jwt.verify(token, "shriharivansh");
    const { _id } = decodeId;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    throw new Error("error occured at userAuth");
  }
};

module.exports = userAuth;
