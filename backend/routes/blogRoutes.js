const express = require("express");
const { createBlog, getAllBlogs, getBlogById } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBlog); // ✅ Protected Route (Only logged-in users)
router.get("/", getAllBlogs); // ✅ Public (Anyone can see blogs)
router.get("/:id", getBlogById); // ✅ Public (Anyone can see individual blogs)

module.exports = router;
