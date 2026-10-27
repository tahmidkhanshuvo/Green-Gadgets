const Ad = require("../models/Ad");
const User = require("../models/User");
const mongoose = require("mongoose");

// ✅ Create Ad
exports.createAd = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user)
      return res.status(401).json({ message: "Sign in to post a listing." });
    const {
      title,
      category,
      subCategory,
      description,
      price,
      location,
      mobile,
      mainImage,
      images,
      details,
    } = req.body;
    const newAd = new Ad({
      title,
      category,
      subCategory,
      description,
      price,
      location,
      mobile,
      mainImage,
      images,
      details,
      name: user.name,
      email: user.email,
      createdBy: user._id,
    });
    await newAd.save();
    res.status(201).json(newAd);
  } catch (error) {
    res
      .status(error.name === "ValidationError" ? 400 : 500)
      .json({
        message: "Unable to post this listing. Please check its details.",
      });
  }
};

// ✅ Get All Ads
exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.find({ status: { $ne: "sold" } }).sort({
      createdAt: -1,
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ads", error });
  }
};

exports.getMyAds = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user)
      return res
        .status(401)
        .json({ message: "Sign in to view your listings." });
    res.json(
      await Ad.find({
        $or: [
          { createdBy: user._id },
          { createdBy: { $exists: false }, email: user.email },
        ],
      }).sort({ createdAt: -1 }),
    );
  } catch (error) {
    next(error);
  }
};
exports.updateStatus = async (req, res, next) => {
  try {
    if (!["active", "sold"].includes(req.body.status))
      return res.status(400).json({ message: "Choose active or sold." });
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: "Listing not found." });
    const user = await User.findById(req.user.userId);
    if (!user)
      return res.status(401).json({ message: "Sign in to manage listings." });
    const ad = await Ad.findOneAndUpdate(
      {
        _id: req.params.id,
        $or: [
          { createdBy: user._id },
          { createdBy: { $exists: false }, email: user.email },
        ],
      },
      { status: req.body.status },
      { new: true },
    );
    if (!ad) return res.status(404).json({ message: "Listing not found." });
    res.json(ad);
  } catch (error) {
    next(error);
  }
};

// ✅ Get Ad by ID
exports.getAdById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(404).json({ message: "Ad not found" });
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ad", error });
  }
};
