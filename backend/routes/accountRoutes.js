const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// Fetch User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update User Details
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, location } = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, { name, location }, { new: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Change Password
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
});

module.exports = router;
