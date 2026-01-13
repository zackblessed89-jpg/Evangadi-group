const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  checkUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");

router.post("/register", register);
router.post("/login", login);
// checkUser is protected by authMiddleware
router.get("/checkUser", authMiddleware, checkUser);

router.post("/forgot-password", forgotPassword);

// Set new password using token (Public)
router.post("/reset-password/:token", resetPassword);

// Change password while logged in (Protected)
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
