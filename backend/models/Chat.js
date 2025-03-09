const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String },
  image: { type: String },
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
