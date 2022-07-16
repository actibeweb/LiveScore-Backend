const express = require('express');
const router = express.Router();

const {updateLogo,getLogo} = require('../controllers/logo-controller');
const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');

router.post('/update',isAuthenticatedUser,updateLogo);
router.get('/get',isAuthenticatedUser,getLogo);

module.exports = router;