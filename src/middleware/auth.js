const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  try {
    const { userCookie } = req.cookies;
    const decodeId = jwt.verify(userCookie, "shriharivansh");
    const { _id } = decodeId;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    req.id = _id;
    next();
  } catch (err) {
    return next(new Error("error occured at userAuth"));
  }
};

module.exports = userAuth;
