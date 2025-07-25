const express = require("express");
const router = express.Router();
const passport = require("passport");
// const optionalAuth = require("../config/optionalAuth");

const { placeOrder, updateOrder, cancelOrder, deleteOrder, getOrders, getOrder } = require("../controllers/orders");

// Commented passport token cheking, allowing placing an order as a guest

// router.post("/", passport.authenticate("jwt", { session: false }), placeOrder);
router.post("/", placeOrder);

// router.put("/:id", passport.authenticate("jwt", { session: false }), updateOrder);
router.put("/:id", updateOrder);

router.delete("/cancel/:id", passport.authenticate("jwt", { session: false }), cancelOrder);

router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteOrder);

router.get("/", passport.authenticate("jwt", { session: false }), getOrders);

router.get("/:orderNo", passport.authenticate("jwt", { session: false }), getOrder);

module.exports = router;
