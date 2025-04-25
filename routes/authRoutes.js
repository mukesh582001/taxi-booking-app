// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");  // Protect middleware

// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Profile route (Protected)
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);

module.exports = router;
