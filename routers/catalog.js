const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {
    addCategory,
    aupdateCategory,
    deleteCategory,
    getCategories,
    getCategory,
} = require('../controllers/catalog')

router.post(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    addCategory
);

router.put(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    aupdateCategory
);

router.delete(
    "/:id",
    passport.authenticate("jwt-admin", { session: false }),
    deleteCategory
);

router.get("/", getCategories);

router.get("/:id", getCategory);

module.exports = router;