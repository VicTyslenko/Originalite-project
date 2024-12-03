const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  createWishlist,
  updateWishlist,
  addProductToWishlist,
  deleteProductFromWishlish,
  deleteWishlist,
  getWishlist,
} = require("../controllers/wishlist");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createWishlist
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateWishlist
);

router.put(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    addProductToWishlist
  );

router.delete(
    "/:productId",
    passport.authenticate("jwt", { session: false }),
    deleteProductFromWishlish
)

router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    deleteWishlist
)

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getWishlist
);

module.exports = router;