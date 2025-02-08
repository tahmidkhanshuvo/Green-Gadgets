const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// 🔹 Replace with your actual MongoDB connection string
const MONGO_URI = "mongodb+srv://test:test123@green-gadgets.i1tu7.mongodb.net/?retryWrites=true&w=majority";

// 🟢 Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🟢 Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", userSchema);

// 🟢 GET: Fetch all users
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 🔵 POST: Add a new user
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const newUser = new User({ name, email });
    await newUser.save(); // Save to MongoDB
    res.status(201).json(newUser);
});

// Start server
app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});
