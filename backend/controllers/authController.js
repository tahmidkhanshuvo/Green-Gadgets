const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ User Registration (Signup) with Location
const register = async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    // 🔹 Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // 🔹 Validate input fields
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, location });
    await user.save();

    // 🔹 Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, location: user.location } 
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ User Login with Location
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔹 Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 🔹 Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, location: user.location } 
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Export the functions
module.exports = { register, login };
