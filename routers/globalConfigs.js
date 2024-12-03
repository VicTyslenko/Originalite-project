const express = require("express");
const router = express.Router();
const passport = require("passport"); 

const {
  addConfig,
  updateConfig,
  deleteConfig,
  getConfigs,
  getConfigById
} = require("../controllers/globalConfigs");

router.post(
  "/",
  passport.authenticate("jwt-admin", { session: false }),
  addConfig
);

router.put(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  updateConfig
);

router.delete(
  "/:customId",
  passport.authenticate("jwt-admin", { session: false }),
  deleteConfig
);

router.get("/", getConfigs);

router.get("/:customId", getConfigById);

module.exports = router;