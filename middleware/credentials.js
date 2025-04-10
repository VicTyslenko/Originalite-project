const whitelist = ["http://localhost:3000", "https://originalite-project.onrender.com"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }

  next();
};

module.exports = credentials;
