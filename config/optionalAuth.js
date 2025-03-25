const passport = require("passport");

const optionalAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) return next(err);
      if (user) {
        req.user = user;
      }
      next();
    })(req, res, next);
  } else {
    next();
  }
};

module.exports = optionalAuth;
