const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {
    createCart, 
    updateCart, 
    addProductToCart, 
    decreaseCartProductQuantity, 
    deleteCart, 
    deleteProductFromCart, 
    getCart
} = require('../controllers/cart');

router.post(
    "/", 
    passport.authenticate("jwt", { session: false }), 
    createCart
);

router.put(
    "/", 
    passport.authenticate("jwt", {session: false}),
    updateCart
);

router.put(
    "/:productId", 
    passport.authenticate("jwt", {session: false}),
    addProductToCart
);

router.delete(
    "/", 
    passport.authenticate("jwt", {session: false}),
    deleteCart
);

router.delete(
    "/:productId", 
    passport.authenticate("jwt", {session: false}),
    deleteProductFromCart
);


router.delete(
    "/product/:productId", 
    passport.authenticate("jwt", {session: false}),
    decreaseCartProductQuantity
);

router.get(
    "/", 
    passport.authenticate("jwt", {session: false}),
    getCart
);
module.exports = router;