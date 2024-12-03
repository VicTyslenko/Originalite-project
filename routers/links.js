const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addLinks,
  updateLinks,
  deleteLinks,
  getLink,
  getLinks
} = require("../controllers/links");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addLinks
);

router.put(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  updateLinks
);

router.delete(
  "/:id",
  passport.authenticate("jwt-admin", { session: false }),
  deleteLinks
);

router.get("/", getLinks);

router.get("/:id", getLink);

module.exports = router;