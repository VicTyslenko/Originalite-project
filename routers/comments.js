const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {
    addComment,
    updateComment,
    deleteComment,
    getComments,
    getCustomerComments,
    getProductComments
} = require('../controllers/comments')

router.post (
    "/", 
    passport.authenticate("jwt", { session: false }), 
    addComment
);

router.put (
    "/:id",
    passport.authenticate("jwt", { session: false }),
    updateComment
);

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    deleteComment
  );

router.get("/", getComments);

router.get("/customer/:customerId", getCustomerComments)

router.get("/product/:productId", getProductComments);

module.exports = router;