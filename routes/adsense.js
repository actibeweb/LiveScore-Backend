const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const {
  updateAdSense,
  getAdSense,
} = require("../controllers/adsense-controller");

router.post("/update", isAuthenticatedUser, updateAdSense);
router.get("/get", getAdSense);

module.exports = router;