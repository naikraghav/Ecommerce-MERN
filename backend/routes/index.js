const express = require('express');
const router = express.Router();

// Define your routes here
const userSignUpController = require("../controller/userSignUp.js");
const userSignInController = require('../controller/userSignin.js');
const userDetailsController = require('../controller/userDetails.js');
const authToken = require('../middleware/authToken.js');
const userLogout = require('../controller/userLogout.js');
const allUsers = require('../controller/allUsers.js');

router.post('/signup', userSignUpController); 
router.post('/signin', userSignInController);
router.get('/user-details', authToken, userDetailsController);
router.get('/userLogout', userLogout);

//admin panel
router.get('/all-users', allUsers);
module.exports = router;
