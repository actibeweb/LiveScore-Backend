const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const {
  createContact,
  getAllContact,
} = require("../controllers/contact-controller");

router.post("/create", createContact);
router.get("/get", isAuthenticatedUser, getAllContact);

module.exports = router;
