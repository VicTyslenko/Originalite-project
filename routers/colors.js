const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {
    addColor,
    updateColor,
    deleteColor,
    getColors,
} = require('../controllers/colors')

router.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    addColor
);

router.put(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    updateColor
);

router.delete(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    deleteColor
);

router.get("/", getColors);

module.exports = router;