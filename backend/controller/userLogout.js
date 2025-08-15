
async function userLogout(req, res) {
  try {
    // Clear the user session or token
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      error: false,
      message: "User logged out successfully",
      data: []
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

module.exports = userLogout;