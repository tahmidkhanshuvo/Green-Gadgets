const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// ✅ Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "green-gadgets-ads",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// ✅ Upload Multiple Images to Cloudinary
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const imageUrls = req.files.map((file) => file.path);
    res.json({ 
      mainImage: imageUrls[0], // First image as main image
      images: imageUrls
    });
  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error });
  }
});

module.exports = router;
