const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const sendMail = require("../commonHelpers/mailSender");
const keys = require("../config/keys");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);
const { generateAccessToken, generateRefreshToken } = require("../utils/tokens");
const Customer = require("../models/Customer");
const validateRegistrationForm = require("../validation/validationHelper");
const queryCreator = require("../commonHelpers/queryCreator");
const logger = require("../utils/logger");

// Controller for creating customer and saving to DB
exports.createCustomer = (req, res) => {
  // Clone query object, because validator module mutates req.body, adding other fields to object

  const initialQuery = _.cloneDeep(req.body);

  initialQuery.customerId = rand();

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
            .then(async (customer) => {
              try {
                const emailToken = jwt.sign(
                  {
                    email: customer.email,
                  },
                  process.env.EMAIL_SECRET,
                  { expiresIn: "1d" }
                );

                const confirmLink = `${process.env.CLIENT_URL || "http://localhost:3000"}/verify?token=${emailToken}`;

                await sendMail(
                  customer.email,
                  "Confirm your email",
                  `<h2>Hi ${customer.firstName}</h2>
                   <p>Please confirm your email by clicking <a href="${confirmLink}">here</a>.</p>`
                );
                res.json({
                  success: true,
                  message: "User registered. Please check your email to confirm your account.",
                });
              } catch (err) {
                logger.error("Failed to send verification email", err);
              }
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

exports.resendEmail = async (req, res) => {
  const userEmail = req.body.email;

  try {
    const customer = await Customer.findOne({ email: userEmail });

    if (!customer) return res.status(404).json("Customer not found");
    const emailToken = jwt.sign({ email: customer.email }, process.env.EMAIL_SECRET, { expiresIn: "1d" });

    const confirmLink = `${process.env.CLIENT_URL || "http://localhost:3000"}/verify?token=${emailToken}`;

    await sendMail(
      customer.email,
      "Confirm your email",
      `<h2>Hi ${customer.firstName}</h2>
      <p>Please confirm your email by clicking <a href="${confirmLink}">here</a>.</p>`
    );

    res.json({ message: `The link to ${customer.email} was sent successfully` });
  } catch (error) {
    logger.error("resendEmail error", error);
    res.status(500).json({ message: "Failed to send confirmation email" });
  }
};

// Controller to verify the customer by email

exports.verifyCustomer = async (req, res) => {
  const token = req.params.token;

  if (!token) return res.status(400).json("No token provided");

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    const user = await Customer.findOne({ email: decoded.email });
    if (!user) return res.status(404).json("User not found");

    if (user.emailConfirmed) {
      return res.status(400).json({ message: "Email already confirmed" });
    }

    user.emailConfirmed = true;
    await user.save();

    return res.status(200).json({ message: "Email confirmed!" });
  } catch (err) {
    logger.error("verifyCustomer error", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

// Controller for customer login

exports.loginCustomer = async (req, res) => {
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

    // Generating payloads for refresh token and access token

    const accessTokenPayload = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      isAdmin: customer.isAdmin,
      email: customer.email,
      address: customer.address,
      telephone: customer.telephone,
      birthday: customer.birthday,
      id: customer.id,
    };
    const accessToken = generateAccessToken(accessTokenPayload);

    const refreshTokenPayload = {
      customerId: customer.customerId,
      email: customer.email,
    };
    const refreshToken = generateRefreshToken(refreshTokenPayload);

    customer.refreshToken = refreshToken;
    await customer.save();

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });

    res.json({
      success: true,
      accessToken,
      test: isProduction,
    });
  } catch (err) {
    logger.error("loginCustomer error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller for verify refresh token

exports.refreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    const refreshToken = cookies.jwt;

    const foundUser = await Customer.findOne({ refreshToken });

    if (!foundUser) return res.status(403).json({ message: "Forbidden, cookies not found" });

    jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (error) => {
      if (error) return res.sendStatus(403); // Token not associated with any user

      const { id, email, firstName, lastName, isAdmin, telephone, birthday, address } = foundUser;

      const accessToken = jwt.sign(
        { id, email, firstName, lastName, isAdmin, telephone, birthday, address },

        process.env.SECRET_OR_KEY,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    logger.error("refreshToken error", err);
    res.sendStatus(500);
  }
};

exports.handleLogout = async (req, res) => {
  const refreshToken = req.cookies?.jwt;

  if (!refreshToken) return res.sendStatus(204);

  const foundUser = await Customer.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();
  //Clear cookie

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  res.sendStatus(204);
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
    logger.error("editCustomerInfo error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller for editing customer password
//here go
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
