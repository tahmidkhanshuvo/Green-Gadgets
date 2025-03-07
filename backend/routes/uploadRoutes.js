const express = require("express");
const { uploadBlogImages, uploadAdImages } = require("../middleware/upload");

const router = express.Router();

// ✅ Upload Blog Images Route
router.post("/blog", (req, res) => {
  uploadBlogImages(req, res, (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(500).json({ message: "Image upload failed", error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded!" });
    }

    const imageUrls = req.files.map(file => file.path); // ✅ Cloudinary image URLs
    res.json({ message: "Blog images uploaded successfully", imageUrls });
  });
});

// ✅ Upload Ad Images Route
router.post("/ad", (req, res) => {
  uploadAdImages(req, res, (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(500).json({ message: "Image upload failed", error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded!" });
    }

    const imageUrls = req.files.map(file => file.path);
    res.json({ message: "Ad images uploaded successfully", imageUrls });
  });
});

module.exports = router;
