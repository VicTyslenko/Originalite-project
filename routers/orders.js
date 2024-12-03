const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  placeOrder,
  updateOrder,
  cancelOrder,
  deleteOrder,
  getOrders,
  getOrder
} = require("../controllers/orders");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  placeOrder
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateOrder
);

router.delete(
    "/cancel/:id",
    passport.authenticate("jwt", { session: false }),
    cancelOrder
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteOrder
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }), 
  getOrders);

router.get(
  "/:orderNo",
  passport.authenticate("jwt", { session: false }), 
  getOrder);

module.exports = router;