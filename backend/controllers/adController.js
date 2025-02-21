const Ad = require("../models/Ad");

// ✅ Create Ad
exports.createAd = async (req, res) => {
  try {
    const newAd = new Ad(req.body);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: "Error posting ad", error });
  }
};

// ✅ Get All Ads
exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ads", error });
  }
};

// ✅ Get Ad by ID
exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ad", error });
  }
};
