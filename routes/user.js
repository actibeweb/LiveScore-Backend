const express = require("express");
const router = express.Router();

const { signup,login, getDetails,updateDetails } = require("../controllers/user-controller");
const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');
router.post("/signup", signup);
router.post("/login", login);
router.get("/details",isAuthenticatedUser,getDetails);
router.put("/update",isAuthenticatedUser,updateDetails);

module.exports = router;
