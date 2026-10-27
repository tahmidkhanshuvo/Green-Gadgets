const express = require("express");
const {
  createAd,
  getAds,
  getAdById,
  getMyAds,
  updateStatus,
} = require("../controllers/adController");
const validateAd = require("../middleware/validateAd");
const authMiddleware = require("../middleware/authMiddleware"); // 🔹 Protect posting

const router = express.Router();

// ✅ Public Routes (Anyone can view ads)
router.get("/", getAds);
router.get("/mine", authMiddleware, getMyAds);
router.get("/:id", getAdById);
router.patch("/:id/status", authMiddleware, updateStatus);

// ✅ Protected Route (Only logged-in users can post ads)
router.post("/", authMiddleware, validateAd, createAd);

module.exports = router;
