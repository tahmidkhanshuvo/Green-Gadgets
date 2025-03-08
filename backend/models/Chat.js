const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },            // Optional text content
  image: { type: String },           // Optional image URL (e.g., from Cloudinary)
  createdAt: { type: Date, default: Date.now }
});

const ChatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
    messages: [MessageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
