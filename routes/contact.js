const express = require("express");
const router = express.Router();

const { isAuthenticatedUser } = require("../middlewares/checkUserAuth");
const {
  createContact,
  getAllContact,
  updateContactPage,
  getContactPage,
} = require("../controllers/contact-controller");

router.post("/create", createContact);
router.get("/get", isAuthenticatedUser, getAllContact);
router.post("/updatePage", isAuthenticatedUser, updateContactPage);
router.get("/getPage",getContactPage);

module.exports = router;
