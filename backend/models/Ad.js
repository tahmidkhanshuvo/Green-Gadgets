const mongoose = require("mongoose");

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },

  // ✅ Main Image & Additional Images
  mainImage: { type: String, required: true }, // URL for the primary image
  images: { type: [String], required: true },  // Array of additional images

  details: { type: mongoose.Schema.Types.Mixed, default: {} }, // Dynamic fields
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ad", AdSchema);
