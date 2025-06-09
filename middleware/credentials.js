const whitelist = ["http://localhost:3000", "https://originalite-shop.vercel.app"];

const credentials = (req, res, next) => {
  const origin = req.headers.origin;

  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  } else {
    console.warn(`Origin not in whitelist: ${origin}`);
  }

  next();
};

module.exports = credentials;
