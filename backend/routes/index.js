const express = require('express');
const router = express.Router();

// Define your routes here
const userSignUpController = require("../controller/userSignUp.js");
const userSignInController = require('../controller/userSignin.js');

router.post('/signup', userSignUpController); 
router.post('/signin', userSignInController);

module.exports = router;
