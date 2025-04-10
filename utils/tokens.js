const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const generateAccessToken = (payload) => {
  return jwt.sign(payload, keys.secretOrKey, { expiresIn: "15m" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, keys.refreshKey, { expiresIn: "7d" });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
