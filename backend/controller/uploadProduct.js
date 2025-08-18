const productModel = require('../models/productModel');
const uploadProductPermission = require('../helper/permission.js');

async function uploadProductController(req, res) {

  try {
    const sessionUserId = req.userId;

    if(!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const uploadProduct = new productModel(req.body);
    const savedProduct = await uploadProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      data: savedProduct,
      success: true,
      error: false
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    })
  }
}

module.exports = uploadProductController;