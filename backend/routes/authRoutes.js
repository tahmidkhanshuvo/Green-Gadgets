const express = require("express");
const { register, login } = require("../controllers/authController"); // Import the correct functions
const { authLimiter } = require("../middleware/rateLimit");

const router = express.Router();

router.post("/register", authLimiter, register); // ✅ Fix: Ensure function is properly imported
router.post("/login", authLimiter, login);

module.exports = router;
