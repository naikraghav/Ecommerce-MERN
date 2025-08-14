const userModel = require("../models/userModel.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

async function userSignInController(req, res) {


  try {

    const { email, password } = req.body;

    if (!email ){
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found"); 
    }

    // Check password
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);

    if (checkPassword) {
      // Generate token
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: '1d'});

      const tokenOptions = {
        httpOnly: true,
        secure:true 
      };
      res.cookie("token", token, tokenOptions).json({
        message: "User signed in successfully",
        data : token,
        success: true,
        error: false,
      })
    } else {
      throw new Error("Please provide valid credentials");
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;