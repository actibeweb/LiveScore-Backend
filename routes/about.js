const express = require('express');
const router = express.Router();

const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');
const {updateAbout,getAbout} = require('../controllers/about-controller');

router.post('/update',isAuthenticatedUser,updateAbout);
router.get('/get',getAbout);


module.exports = router;