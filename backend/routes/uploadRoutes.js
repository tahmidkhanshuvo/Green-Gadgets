const express = require("express");
const { uploadBlogImages, uploadAdImages, uploadChatImages } = require("../middleware/upload");

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
    const imageUrls = req.files.map(file => file.path);
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

// ✅ Upload Chat Image Route
router.post("/chat", (req, res) => {
  uploadChatImages(req, res, (err) => {
    if (err) {
      console.error("Image upload error:", err);
      return res.status(500).json({ message: "Image upload failed", error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image uploaded!" });
    }
    // Assuming one image per upload
    const imageUrl = req.files[0].path;
    res.json({ message: "Chat image uploaded successfully", imageUrl });
  });
});

module.exports = router;
