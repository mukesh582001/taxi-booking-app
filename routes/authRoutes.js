const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");  // ✅ FIXED

// Public Routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected Routes
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);

module.exports = router;
