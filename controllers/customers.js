const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const passport = require("passport");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);

const { generateAccessToken, generateRefreshToken } = require("../utils/tokens");
// Load Customer model
const Customer = require("../models/Customer");

// Load validation helper to validate all received fields
const validateRegistrationForm = require("../validation/validationHelper");

// Load helper for creating correct query to save customer to DB
const queryCreator = require("../commonHelpers/queryCreator");

// Controller for creating customer and saving to DB
exports.createCustomer = (req, res, next) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object

  const initialQuery = _.cloneDeep(req.body);
  initialQuery.customerNo = rand();

  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({
    $or: [{ email: req.body.email }, { login: req.body.login }],
  })
    .then((customer) => {
      if (customer) {
        if (customer.email === req.body.email) {
          return res.status(400).json({ message: `Email ${customer.email} already exists` });
        }

        if (customer.login === req.body.login) {
          return res.status(400).json({ message: `Login ${customer.login} already exists` });
        }
      }

      // Create query object for customer for saving him to DB
      const newCustomer = new Customer(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) {
            res.status(400).json({
              message: `Error happened on server: ${err}`,
            });

            return;
          }

          newCustomer.password = hash;

          newCustomer
            .save()
            .then((customer) => {
              const payload = {
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                isAdmin: customer.isAdmin,
                email: customer.email,
                address: customer.address,
                telephone: customer.telephone,
              }; // Create JWT Payload

              // Sign Token
              jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
                res.json({
                  ...customer,
                  success: true,
                  token: "Bearer " + token,
                });
              });
            })
            .catch((err) =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `,
              })
            );
        });
      });
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

// Controller for customer login

//HERE

exports.loginCustomer = async (req, res, next) => {
  try {
    const { errors, isValid } = validateRegistrationForm(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { loginOrEmail, password } = req.body;

    const customer = await Customer.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!customer) return res.status(404).json({ loginOrEmail: "Customer not found" });

    const isMatch = await bcrypt.compare(password, customer.password);

    if (!isMatch) return res.status(400).json({ password: "Password incorrect" });

    // Create JWT Payload
    const payload = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      isAdmin: customer.isAdmin,
      email: customer.email,
      address: customer.address,
      telephone: customer.telephone,
    };

    // Generate Tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    customer.refreshToken = refreshToken;
    await customer.save();

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProduction,
      secure: false,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.json({
      success: true,
      accessToken: "Bearer " + accessToken,
    });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for verify refresh token

exports.refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); // No cookie = unauthorized

    const refreshToken = cookies.jwt;

    const foundUser = await Customer.findOne({ refreshToken });

    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, decoded) => {
      if (err || foundUser.userName !== decoded.userName) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { userName: decoded.userName },

        process.env.SECRET_OR_KEY,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    console.log("Error in refreshToken handler:", err);
    res.sendStatus(500); // Internal server error
  }
};

exports.getCustomers = async (req, res) => {
  const customerAll = await Customer.find();

  res.status(200).json({
    success: true,
    data: customerAll,
  });
};

// Controller for getting current customer
exports.getCustomer = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        address: req.user.address,
        telephone: req.user.telephone,
        gender: req.user.gender,
      },
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Controller for editing customer personal info
exports.editCustomerInfo = async (req, res) => {
  try {
    const { errors, isValid } = validateRegistrationForm(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find the current customer
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: `Customer with id ${req.params.id} not found` });
    }

    // Clone request body to prevent mutations
    const requestBody = _.cloneDeep(req.body);

    // Extract current values from the customer record
    const { email: currentEmail } = customer;
    const { firstName, lastName, email, telephone, birthday, gender } = requestBody;

    // Object to store only changed values
    let updatedFields = {};

    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (telephone) updatedFields.telephone = telephone;
    if (birthday) updatedFields.birthday = birthday;
    if (gender) updatedFields.gender = gender;

    // **Check if email is changing and ensure uniqueness**
    if (email && email !== currentEmail) {
      const existingUser = await Customer.findOne({ email });

      if (existingUser) {
        errors.email = `Email ${email} is already in use.`;
        return res.status(400).json(errors);
      }
      updatedFields.email = email;
    }

    // Update user in the database
    const updatedUser = await Customer.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // ✅ Generate a new JWT with updated user info
    const payload = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      isAdmin: updatedUser.isAdmin,
      email: updatedUser.email,
      address: updatedUser.address,
      telephone: updatedUser.telephone,
      gender: updatedUser.gender,
      birthday: updatedUser.birthday,
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 36000 }, (err, newToken) => {
      if (err) {
        return res.status(500).json({ message: "Error generating token" });
      }

      res.json({
        success: true,
        user: updatedUser, // ✅ Updated user data
        token: "Bearer " + newToken, // ✅ New token with updated user info
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller for editing customer password
exports.updatePassword = (req, res) => {
  // Check Validation
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // find our user by ID
  Customer.findOne({ _id: req.user.id }, (err, customer) => {
    let oldPassword = req.body.password;

    customer.comparePassword(oldPassword, function (err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            Customer.findOneAndUpdate(
              { _id: req.user.id },
              {
                $set: {
                  password: newPassword,
                },
              },
              { new: true }
            )
              .then((customer) => {
                res.json({
                  message: "Password successfully changed",
                  customer: customer,
                });
              })
              .catch((err) =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `,
                })
              );
          });
        });
      }
    });
  });
};
