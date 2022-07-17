const express = require('express');
const router = express.Router();

const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');
const {updateTerms,getTerms} = require('../controllers/terms-controller');

router.post("/update",isAuthenticatedUser,updateTerms);
router.get("/get",getTerms);

module.exports = router;