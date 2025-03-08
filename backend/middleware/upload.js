const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ✅ Function to create Cloudinary Storage with different transformations
const createStorage = (folderName, width, height) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `green-gadgets/${folderName}`, // Separate folders for blog and ad uploads
      allowedFormats: ["jpeg", "png", "jpg", "webp"],
      transformation: [{ width, height, crop: "limit" }], // Apply different sizes
    },
  });
};

// ✅ Upload handlers for different types of uploads
const uploadBlogImages = multer({ storage: createStorage("blogs", 800, 600) }).array("images", 5); // Blog images
const uploadAdImages = multer({ storage: createStorage("ads", 500, 500) }).array("images", 8); // Ad images
const uploadChatImages = multer({ storage: createStorage("chats", 500, 500) }).array("images", 1); // Chat images

module.exports = { uploadBlogImages, uploadAdImages, uploadChatImages };
