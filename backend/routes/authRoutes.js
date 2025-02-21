const express = require("express");
const { register, login } = require("../controllers/authController"); // Import the correct functions

const router = express.Router();

router.post("/register", register); // ✅ Fix: Ensure function is properly imported
router.post("/login", login);

module.exports = router;
