const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }], // Store image URLs
  category: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", BlogSchema);
