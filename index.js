const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const path = require("node:path");

const cart = require("./routers/cart");
const catalog = require("./routers/catalog");
const colors = require("./routers/colors");
const comments = require("./routers/comments");
const customers = require("./routers/customers");
const filters = require("./routers/filters");
const globalConfigs = require("./routers/globalConfigs");
const links = require("./routers/links");
const orders = require("./routers/orders");
const pages = require("./routers/pages");
const partners = require("./routers/partners");
const paymentMethods = require("./routers/paymentMethods");
const products = require("./routers/products");
const shippingMethods = require("./routers/shippingMethods");
const sizes = require("./routers/sizes");
const slides = require("./routers/slides");
const subscribers = require("./routers/subscribers");
const wishlist = require("./routers/wishlist");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4444;
const bd = require("./config/keys").mongoURI;

mongoose
  .connect(bd, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB connected...`))
  .catch((error) => console.log(error));

require("./config/passport")(passport);
app.use(passport.initialize());

app.use("/api/cart", cart);
app.use("/api/catalog", catalog);
app.use("/api/colors", colors);
app.use("/api/comments", comments);
app.use("/api/customers", customers);
app.use("/api/filters", filters);
app.use("/api/configs", globalConfigs);
app.use("/api/links", links);
app.use("/api/orders", orders);
app.use("/api/pages", pages);
app.use("/api/partners", partners);
app.use("/api/payment-methods", paymentMethods);
app.use("/api/products", products);
app.use("/api/shipping-methods", shippingMethods);
app.use("/api/sizes", sizes);
app.use("/api/slides", slides);
app.use("/api/subscribers", subscribers);
app.use("/api/wishlist", wishlist);

if (process.env.NODE_ENV == "production") {
  const buildPath = path.join(__dirname, "client", "build");

  app.use(express.static(buildPath));

  //   app.use(express.static("./сlient/public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server ${PORT}`);
});
