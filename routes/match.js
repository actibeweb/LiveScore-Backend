const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");

const { createMatch } = require("../controllers/match-controller");

router.post("/create", isAuthenticatedUser, createMatch);

module.exports = router;
