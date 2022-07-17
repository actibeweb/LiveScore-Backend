const express = require('express');
const router = express.Router();

const {updateCategory,getAllCategories} = require('../controllers/category-controller');
const {isAuthenticatedUser} = require('../middlewares/checkUserAuth');

router.post('/update',isAuthenticatedUser,updateCategory);
router.get('/get',getAllCategories);


module.exports = router; 