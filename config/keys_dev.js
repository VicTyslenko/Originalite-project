require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  refreshKey: process.env.SECRET_REFRESH_KEY
};
