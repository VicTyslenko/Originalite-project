const express = require("express");
const router = express.Router();
const passport = require("passport");
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many attempts from this IP, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Import controllers
const {
  createCustomer,
  loginCustomer,
  getCustomer,
  editCustomerInfo,
  updatePassword,
  getCustomers,
  refreshToken,
  verifyCustomer,
  resendEmail,
  handleLogout,
} = require("../controllers/customers");

// @route   POST /customers
// @desc    Register customer
// @access  Public
router.post("/", authLimiter, createCustomer);

router.get("/", getCustomers);

router.post("/resend-email", authLimiter, resendEmail);

router.get("/verify/:token", verifyCustomer);
// @route   POST /customers/login
// @desc    Login Customer / Returning JWT Token
// @access  Public

router.post("/logout", handleLogout);
router.post("/login", authLimiter, loginCustomer);
// @route  GET /
// @desc   Return access token
router.get("/refresh", refreshToken);
// @route   GET /
// @desc    Return current customer
// @access  Private

router.get("/me", passport.authenticate("jwt", { session: false }), getCustomer);

// @route   PUT /customers
// @desc    Return current customer
// @access  Private
router.put("/:id", passport.authenticate("jwt", { session: false }), editCustomerInfo);

// @route   POST /customers/profile/update-password
// @desc    Return current customer and success or error message
// @access  Private
router.put("/password", passport.authenticate("jwt", { session: false }), updatePassword);

module.exports = router;
