const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addShippingMethod,
  updateShippingMethod,
  deleteShippingMethod,
  getShippingMethods,
  getShippingMethodById,
} = require("../controllers/shippingMethods");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addShippingMethod
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updateShippingMethod
);

router.delete(
    "/:customId",
    passport.authenticate("jwt-admin", { session: false }),
    deleteShippingMethod
)

router.get("/", getShippingMethods)

router.get("/:customId", getShippingMethodById);

module.exports = router;