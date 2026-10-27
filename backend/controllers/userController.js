const User = require("../models/User");

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select(
      "_id name email location",
    );
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
