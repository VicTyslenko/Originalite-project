const express = require("express");
const router = express.Router();
const passport = require("passport");

// Import controllers
const { createCustomer, loginCustomer, getCustomer, editCustomerInfo, updatePassword, getCustomers } = require("../controllers/customers");

// @route   POST /customers
// @desc    Register customer
// @access  Public
router.post("/", createCustomer);

router.get("/", getCustomers);

// @route   POST /customers/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post("/login", loginCustomer);

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
