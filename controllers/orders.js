const Order = require("../models/Order");
const Product = require("../models/Product");
const sendMail = require("../commonHelpers/mailSender");
const jwt = require("jsonwebtoken");
const validateOrderForm = require("../validation/validationHelper");
const productAvailibilityChecker = require("../commonHelpers/productAvailibilityChecker");
const subtractProductsFromCart = require("../commonHelpers/subtractProductsFromCart");
const keys = require("../config/keys");
const _ = require("lodash");

const Customer = require("../models/Customer");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(1000000, 9999999);

exports.placeOrder = async (req, res) => {

  
  try {
    const orderDetails = _.cloneDeep(req.body);
    orderDetails.orderNo = String(rand());

    const customer = await Customer.findById(orderDetails.customerId);

    if (!customer) {
      const newOrder = new Order({
        ...orderDetails,
        guest: true,
      });

      await newOrder.save();
      console.log("order details", orderDetails);
      res.status(200).json({ message: "Success placing order!", orderDetails, orderId: newOrder._id });
    }

    // if (req.body.address) {
    //   order.address = req.body.address;
    //   customer.address = req.body.address;
    // }

    // if (req.body.telephone) {
    //   customer.telephone = req.body.telephone;
    // }

    // await customer.save();

    // const accessTokenPayload = {
    //   address: customer.address,
    //   telephone: customer.telephone,
    // };

    // const accessToken = jwt.sign(accessTokenPayload, keys.secretOrKey, { expiresIn: 36000 });

    // let cartProducts = [];

    // const isGuest = !req.body.customerId;

    // if (!isGuest) {
    //   order.customerId = req.body.customerId;
    //   cartProducts = await subtractProductsFromCart(order.customerId);
    // }

    // order.products = isGuest ? req.body.products : cartProducts.length > 0 ? cartProducts : req.body.products;
    // order.guest = isGuest;

    // if (!req.body.products && cartProducts.length < 1) {
    //   res.status(400).json({ message: "The list of products is required, but absent!" });
    // }

    // order.totalSum = order.products.reduce((sum, cartItem) => sum + cartItem.product.currentPrice * cartItem.cartQuantity, 0);

    // // const productAvailibilityInfo = await productAvailibilityChecker(order.products);

    // // if (productAvailibilityInfo.productsAvailibilityStatus) {
    // //   // res.json({
    // //   //   message: "Some of your products are unavailable for now",
    // //   //   productAvailibilityInfo,
    // //   // });
    // //   console.warn("Warning: Some products may be limited, but order will proceed.");
    // // } else {
    // const subscriberMail = req.body.email;
    // const letterSubject = req.body.letterSubject;
    // const letterHtml = req.body.letterHtml;

    // const { errors, isValid } = validateOrderForm(req.body);

    // // Check Validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // // checking if the order details are the same and the status is 'pending', just update the order
    // const { orderId } = req.body;

    // const existingOrder = await Order.findOne({
    //   _id: orderId,
    //   paymentStatus: "pending",
    // });

    // if (existingOrder) {
    //   existingOrder.address = req.body.address ?? existingOrder.address;
    //   existingOrder.products = req.body.products;
    //   existingOrder.firstName = req.body.firstName ?? existingOrder.firstName;
    //   existingOrder.lastName = req.body.lastName ?? existingOrder.lastName;
    //   existingOrder.telephone = req.body.telephone ?? existingOrder.telephone;
    //   existingOrder.email = req.body.email ?? existingOrder.email;

    //   await existingOrder.save();

    //   return res.status(200).json({
    //     message: "Existing order updated successfully.",
    //     order: existingOrder,
    //     orderId: existingOrder._id,
    //     accessToken,
    //   });
    // }

    // /// Placing a new order ///

    // const newOrder = new Order(order);

    // if (order.customerId) {
    //   newOrder.populate("customerId").execPopulate();
    // }

    // newOrder
    //   .save()
    //   .then(async (order) => {
    //     const mailResult = await sendMail(subscriberMail, letterSubject, letterHtml, res);

    //     for (item of order.products) {
    //       const id = item.product._id;
    //       const product = await Product.findOne({ _id: id });
    //       const productQuantity = product.quantity;
    //       await Product.findOneAndUpdate({ _id: id }, { quantity: productQuantity - item.cartQuantity }, { new: true });
    //     }

    //     // return orderId to save it on frontend to update the same order in the future
    //     return res.status(201).json({ message: "Order created successfully", order, orderId: newOrder._id, mailResult, accessToken });
    //   })
    //   .catch((err) =>
    //     res.status(400).json({
    //       message: `Error happened on server when placing an order: ${err}`,
    //     })
    //   );
    // // }
  } catch (err) {
    res.status(400).json({
      message: `Error happened on server: "${err}" `,
    });
  }
};

exports.updateOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id }).then(async (currentOrder) => {
    if (!currentOrder) {
      return res.status(400).json({ message: `Order with id ${req.params.id} is not found` });
    } else {
      const order = _.cloneDeep(req.body);

      if (req.body.email) {
        currentOrder.emal = req.body.email;
      }
      if (req.body.address) {
        currentOrder.address = req.body.address;
      }

      if (req.body.paymentInfo) {
        currentOrder.paymentInfo = req.body.paymentInfo;
      }

      if (req.body.customerId) {
        currentOrder.customerId = req.body.customerId;
      }
      if (req.body.paymentStatus) {
        currentOrder.paymentStatus = req.body.paymentStatus;
      }

      if (req.body.products) {
        currentOrder.products = req.body.products;

        // order.totalSum = order.products.reduce((sum, cartItem) => sum + cartItem.product.currentPrice * cartItem.cartQuantity, 0);

        // const productAvailibilityInfo = await productAvailibilityChecker(order.products);

        // if (!productAvailibilityInfo.productsAvailibilityStatus) {
        //   res.json({
        //     message: "Some of your products are unavailable for now",
        //     productAvailibilityInfo,
        //   });
        // }
      }

      const subscriberMail = req.body.email;
      const letterSubject = req.body.letterSubject;
      const letterHtml = req.body.letterHtml;

      const { errors, isValid } = validateOrderForm(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (!letterSubject) {
        return res.status(400).json({
          message: "This operation involves sending a letter to the client. Please provide field 'letterSubject' for the letter.",
        });
      }

      if (!letterHtml) {
        return res.status(400).json({
          message: "This operation involves sending a letter to the client. Please provide field 'letterHtml' for the letter.",
        });
      }

      Order.findOneAndUpdate({ _id: req.params.id }, { $set: order }, { new: true })
        .populate("customerId")
        .then(async (order) => {
          const mailResult = await sendMail(subscriberMail, letterSubject, letterHtml, res);

          res.json({ order, mailResult });
        })
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server when updating an order "${err}" `,
          })
        );
    }
  });
};

exports.cancelOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id }).then(async (currentOrder) => {
    if (!currentOrder) {
      return res.status(400).json({ message: `Order with id ${req.params.id} is not found` });
    } else {
      const subscriberMail = req.body.email;
      const letterSubject = req.body.letterSubject;
      const letterHtml = req.body.letterHtml;

      const { errors, isValid } = validateOrderForm(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (!letterSubject) {
        return res.status(400).json({
          message: "This operation involves sending a letter to the client. Please provide field 'letterSubject' for the letter.",
        });
      }

      if (!letterHtml) {
        return res.status(400).json({
          message: "This operation involves sending a letter to the client. Please provide field 'letterHtml' for the letter.",
        });
      }

      Order.findOneAndUpdate({ _id: req.params.id }, { canceled: true }, { new: true })
        .populate("customerId")
        .then(async (order) => {
          const mailResult = await sendMail(subscriberMail, letterSubject, letterHtml, res);

          res.json({ order, mailResult });
        })
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};
exports.deleteOrder = (req, res, next) => {
  Order.findOne({ _id: req.params.id }).then(async (order) => {
    if (!order) {
      return res.status(400).json({ message: `Order with id ${req.params.id} is not found.` });
    } else {
      const orderToDelete = await Order.findOne({ _id: req.params.id });

      Order.deleteOne({ _id: req.params.id })
        .then((deletedCount) =>
          res.status(200).json({
            message: `Order witn id "${orderToDelete._id}" is successfully deletes from DB. Order Details: ${orderToDelete}`,
          })
        )
        .catch((err) =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          })
        );
    }
  });
};

exports.getOrders = (req, res, next) => {
  Order.find({ customerId: req.user.id })
    .populate("customerId")
    .then((orders) => res.json(orders))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getOrder = (req, res, next) => {
  Order.findOne({ orderNo: req.params.orderNo })
    .populate("customerId")
    .then((order) => res.json(order))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};
