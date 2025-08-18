const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {

  const user = await userModel.findById(userId);
  if (!user) throw new Error("User not found");

  if (user.role !== "ADMIN") throw new Error("Permission denied");

  return true;
};

module.exports = uploadProductPermission