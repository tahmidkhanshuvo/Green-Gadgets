const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Ad = require("../models/Ad");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/favorites", authMiddleware, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).populate("favorites");
    if (!user)
      return res
        .status(401)
        .json({ message: "Sign in to view saved listings." });
    res.json(user.favorites.filter(Boolean));
  } catch (error) {
    next(error);
  }
});
router.post("/favorites/:id", authMiddleware, async (req, res, next) => {
  try {
    if (
      !mongoose.isValidObjectId(req.params.id) ||
      !(await Ad.exists({ _id: req.params.id }))
    )
      return res.status(404).json({ message: "Listing not found." });
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { favorites: req.params.id } },
      { new: true },
    );
    if (!user)
      return res.status(401).json({ message: "Sign in to save listings." });
    res.json({ favorites: user.favorites });
  } catch (error) {
    next(error);
  }
});
router.delete("/favorites/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: "Listing not found." });
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { favorites: req.params.id } },
      { new: true },
    );
    if (!user)
      return res
        .status(401)
        .json({ message: "Sign in to manage saved listings." });
    res.json({ favorites: user.favorites });
  } catch (error) {
    next(error);
  }
});

// ✅ Fetch User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update User Details
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { name, location } = req.body;
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Name and location are required" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, location },
      { new: true, runValidators: true },
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// ✅ Change Password
router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    const { newPassword, currentPassword } = req.body;

    if (
      typeof newPassword !== "string" ||
      newPassword.length < 6 ||
      newPassword.length > 72
    ) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const account = await User.findById(req.user.userId);
    if (
      !account ||
      typeof currentPassword !== "string" ||
      !(await bcrypt.compare(currentPassword, account.password))
    )
      return res
        .status(400)
        .json({ message: "Your current password is incorrect." });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(req.user.userId, {
      password: hashedPassword,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password" });
  }
});

// ✅ Delete Account (Optional)
router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ message: "Error deleting account" });
  }
});

module.exports = router;
