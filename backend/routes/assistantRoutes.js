const router = require("express").Router();
const rateLimit = require("express-rate-limit");

router.post(
  "/",
  rateLimit({
    windowMs: 60_000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  }),
  (req, res) => {
    const text =
      typeof req.body.message === "string" ? req.body.message.trim() : "";
    if (!text || text.length > 2000)
      return res
        .status(400)
        .json({ message: "Enter a question up to 2,000 characters." });
    let reply =
      "Browse All Ads to discover electronics, or sign in and choose Post Free Ads to list your device. Ask about selling, accounts, chat, or recycling.";
    if (/sell|post|list|upload/i.test(text))
      reply =
        "Sign in, choose Post Free Ads, add accurate device details and clear photos, then publish your listing. Include the condition and any known faults.";
    else if (/chat|message|contact|buy/i.test(text))
      reply =
        "Open a listing and choose Chat with Seller. You need to sign in to send messages. Check the device condition and agree on a safe handover before buying.";
    else if (/recycl|environment|waste|repair/i.test(text))
      reply =
        "Repair or reuse a working device before recycling it. Back up your data, sign out of accounts, and erase personal information before handing it over. Use a qualified local e-waste collector for devices beyond repair.";
    else if (/login|sign|account|password/i.test(text))
      reply =
        "Choose Login / Sign Up to create an account using your name, email, password, and location. Your Account page contains your profile and listings.";
    res.json({ reply });
  },
);
module.exports = router;
