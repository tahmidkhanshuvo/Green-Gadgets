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
  images: { type: [String], required: true },
  details: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ad", AdSchema);
