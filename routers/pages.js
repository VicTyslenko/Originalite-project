const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addPage,
  updatePage,
  deletePage,
  getPage,
} = require("../controllers/pages");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addPage
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updatePage
);

router.delete(
    "/:customId",
    passport.authenticate("jwt-admin", { session: false }),
    deletePage
);

router.get("/:customId", getPage);

module.exports = router;