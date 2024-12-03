const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethods,
  getPaymentMethodById
} = require("../controllers/paymentMethods");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addPaymentMethod
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updatePaymentMethod
);

router.delete(
    "/:customId",
    passport.authenticate("jwt-admin", { session: false }),
    deletePaymentMethod
);

router.get("/", getPaymentMethods);

router.get("/:customId", getPaymentMethodById);

module.exports = router;