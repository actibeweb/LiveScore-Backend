const express = require('express');
const router = express.Router();

const {updateCategory} = require('../controllers/category-controller');
const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');

router.post('/update',isAuthenticatedUser,updateCategory);


module.exports = router;