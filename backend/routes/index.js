const express = require('express');
const router = express.Router();

// Define your routes here
const userSignUpController = require("../controller/user/userSignUp.js");
const userSignInController = require('../controller/user/userSignin.js');
const userDetailsController = require('../controller/user/userDetails.js');
const authToken = require('../middleware/authToken.js');
const userLogout = require('../controller/user/userLogout.js');
const allUsers = require('../controller/user/allUsers.js');
const updateUser = require('../controller/user/updateUser.js');
const uploadProductController = require('../controller/product/uploadProduct.js');
const getProductController = require('../controller/product/getProduct.js');
const updateProductController = require('../controller/product/updateProduct.js');
const getCategoryProduct = require('../controller/product/getCategoryProductOne.js');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct.js');

router.post('/signup', userSignUpController); 
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);

//admin panel
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);

//product
router.post('/upload-product', authToken, uploadProductController);
router.get('/get-product',  getProductController);
router.post('/update-product', authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
module.exports = router;
