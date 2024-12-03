const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addPartner,
  updatePartner,
  deletePartner,
  getPartners,
} = require("../controllers/partners");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addPartner
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updatePartner
);

router.delete(
    "/:customId",
    passport.authenticate("jwt-admin", { session: false }),
    deletePartner
);

router.get("/", getPartners);

module.exports = router;