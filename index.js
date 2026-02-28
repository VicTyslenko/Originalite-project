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
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const logger = require("./utils/logger");

app.use(cookieParser());

// cors middlware check
app.use(credentials);

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());

const PORT = process.env.PORT || 4444;
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => logger.info("MongoDB connected"))
  .catch((error) => logger.error("MongoDB connection error", error));

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

app.listen(PORT, (err) => {
  if (err) {
    return logger.error("Server failed to start", err);
  }
  logger.info(`Server running on port ${PORT}`);
});
