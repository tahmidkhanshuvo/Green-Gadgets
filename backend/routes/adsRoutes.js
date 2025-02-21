const express = require("express");
const { createAd, getAds, getAdById } = require("../controllers/adController");
const validateAd = require("../middleware/validateAd");

const router = express.Router();

router.post("/", validateAd, createAd);
router.get("/", getAds);
router.get("/:id", getAdById);

module.exports = router;
