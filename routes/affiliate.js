const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const {
  updateAffiliate,
  getAffiliate,
} = require("../controllers/affiliate-controller");

router.post("/update", isAuthenticatedUser, updateAffiliate);
router.get("/get", getAffiliate);

module.exports = router;