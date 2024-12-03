const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addSubscriber,
  updateSubscriberById,
  updateSubscriberByEmail,
  getSubscribers,
  getSubscriber
} = require("../controllers/subscribers");

router.post(
  "/",
  // passport.authenticate("jwt-admin", { session: false }),
  addSubscriber
);

router.put(
  "/:id",
  // passport.authenticate("jwt-admin", { session: false }),
  updateSubscriberById
);

router.put(
    "/email/:email",
    // passport.authenticate("jwt-admin", { session: false }),
    updateSubscriberByEmail
)

router.get("/", getSubscribers)

router.get("/:email", getSubscriber)

module.exports = router;