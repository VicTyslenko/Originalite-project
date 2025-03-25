const Order = require("../models/Order");
const Product = require("../models/Product");
const sendMail = require("../commonHelpers/mailSender");
const validateOrderForm = require("../validation/validationHelper");
const productAvailibilityChecker = require("../commonHelpers/productAvailibilityChecker");
const subtractProductsFromCart = require("../commonHelpers/subtractProductsFromCart");
const _ = require("lodash");

const Customer = require("../models/Customer");

const uniqueRandom = require("unique-random");
const rand = uniqueRandom(1000000, 9999999);

exports.placeOrder = async (req, res) => {
  try {
    const order = _.cloneDeep(req.body);
    order.orderNo = String(rand());
    let cartProducts = [];

    if (req.body.address) {
      order.address = req.body.address;
    }

    // if (req.body.shipping) {
    //   order.shipping = req.body.shipping;
    // }

    // if (req.body.paymentInfo) {
    //   order.paymentInfo = req.body.paymentInfo;
    // }

    const isGuest = !req.body.customerId;

    if (!isGuest) {
      order.customerId = req.body.customerId;
      cartProducts = await subtractProductsFromCart(order.customerId);
    }

    order.products = isGuest ? req.body.products : cartProducts.length > 0 ? cartProducts : req.body.products;
    order.guest = isGuest;

    // if (cartProducts.length > 0) {
    //   order.products = _.cloneDeep(cartProducts);
    // } else {
    //   order.products = req.body.products;
    // }

    // if (req.body.customerId) {
    //   order.customerId = req.body.customerId;

    //   cartProducts = await subtractProductsFromCart(order.customerId);
    // }

    // order.guest = !req.body.customerId;

    if (!req.body.products && cartProducts.length < 1) {
      res.status(400).json({ message: "The list of products is required, but absent!" });
    }

    order.totalSum = order.products.reduce((sum, cartItem) => sum + cartItem.product.currentPrice * cartItem.cartQuantity, 0);

    // const productAvailibilityInfo = await productAvailibilityChecker(order.products);

    ///////////////////////////temporary commented products availability checking

    // if (productAvailibilityInfo.productsAvailibilityStatus) {
    //   // res.json({
    //   //   message: "Some of your products are unavailable for now",
    //   //   productAvailibilityInfo,
    //   // });
    //   console.warn("Warning: Some products may be limited, but order will proceed.");
    // } else {
    const subscriberMail = req.body.email;
    const letterSubject = req.body.letterSubject;
    const letterHtml = req.body.letterHtml;

    const { errors, isValid } = validateOrderForm(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // if (!letterSubject) {
    //   return res.status(400).json({
    //     message:
    //       "This operation involves sending a letter to the client. Please provide field 'letterSubject' for the letter."
    //   });
    // }

    // if (!letterHtml) {
    //   return res.status(400).json({
    //     message:
    //       "This operation involves sending a letter to the client. Please provide field 'letterHtml' for the letter."
    //   });
    // }

    // checking if the order details are the same and the status is 'pending', just update the order
    const { orderId } = req.body;

    const existingOrder = await Order.findOne({
      _id: orderId,
      paymentStatus: "pending",
    });

    if (existingOrder) {
      existingOrder.address = req.body.address ?? existingOrder.address;
      existingOrder.products = req.body.products;
      existingOrder.firstName = req.body.firstName ?? existingOrder.firstName;
      existingOrder.lastName = req.body.lastName ?? existingOrder.lastName;
      existingOrder.telephone = req.body.telephone ?? existingOrder.telephone;
      existingOrder.email = req.body.email ?? existingOrder.email;

      await existingOrder.save();

      return res.status(200).json({
        message: "Existing order updated successfully.",
        order: existingOrder,
        orderId: existingOrder._id,
      });
    }

    /// Placing a new order ///

    const newOrder = new Order(order);

    if (order.customerId) {
      newOrder.populate("customerId").execPopulate();
    }

    newOrder
      .save()
      .then(async (order) => {
        if (req.body.address || req.body.telephone) {
          const customer = await Customer.findById(order.customerId);

          if (customer) {
            customer.address = req.body.address || customer.address;
            customer.telephone = req.body.telephone || customer.telephone;

            await customer.save();
          }
        }

        const mailResult = await sendMail(subscriberMail, letterSubject, letterHtml, res);

        for (item of order.products) {
          const id = item.product._id;
          const product = await Product.findOne({ _id: id });
          const productQuantity = product.quantity;
          await Product.findOneAndUpdate({ _id: id }, { quantity: productQuantity - item.cartQuantity }, { new: true });
        }

        // return orderId to save it on frontend to update the same order in the future
        return res.status(201).json({ message: "Order created successfully", order, orderId: newOrder._id, mailResult });
      })
      .catch((err) =>
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        })
      );
    // }
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

      if (req.body.deliveryaddress) {
        order.deliveryaddress = req.body.deliveryaddress;
      }

      if (req.body.shipping) {
        order.shipping = req.body.shipping;
      }

      if (req.body.paymentInfo) {
        order.paymentInfo = req.body.paymentInfo;
      }

      if (req.body.customerId) {
        order.customerId = req.body.customerId;
      }
      if (req.body.paymentStatus) {
        order.paymentStatus = req.body.paymentStatus;
      }

      if (req.body.products) {
        order.products = req.body.products;

        order.totalSum = order.products.reduce((sum, cartItem) => sum + cartItem.product.currentPrice * cartItem.cartQuantity, 0);

        const productAvailibilityInfo = await productAvailibilityChecker(order.products);

        if (!productAvailibilityInfo.productsAvailibilityStatus) {
          res.json({
            message: "Some of your products are unavailable for now",
            productAvailibilityInfo,
          });
        }
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
            message: `Error happened on server: "${err}" `,
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
