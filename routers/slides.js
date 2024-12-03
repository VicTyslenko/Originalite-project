const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addSlide,
  updateSlide,
  deleteSlide,
  getSlides,
} = require("../controllers/slides");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addSlide
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updateSlide
);

router.delete(
    "/:customId",
    passport.authenticate("jwt-admin", { session: false }),
    deleteSlide
)

router.get("/", getSlides)

module.exports = router;