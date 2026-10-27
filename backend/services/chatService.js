const mongoose = require("mongoose");
const Chat = require("../models/Chat");

function validId(value) {
  return typeof value === "string" && mongoose.isValidObjectId(value);
}
function isParticipant(chat, userId) {
  return chat.participants.some(
    (participant) => String(participant._id || participant) === String(userId),
  );
}
async function accessibleChat(chatId, userId) {
  if (!validId(chatId)) return null;
  return Chat.findOne({ _id: chatId, participants: userId });
}
async function appendMessage(chatId, userId, { text, image }) {
  const content = typeof text === "string" ? text.trim() : "";
  if (
    (!content && !image) ||
    content.length > 5000 ||
    (image &&
      (typeof image !== "string" ||
        image.length > 2048 ||
        !/^https:\/\//i.test(image)))
  ) {
    const error = new Error(
      "Enter a message up to 5,000 characters or a valid image.",
    );
    error.status = 400;
    throw error;
  }
  const message = {
    sender: userId,
    text: content,
    image: image || undefined,
    createdAt: new Date(),
  };
  if (!validId(chatId)) return null;
  const chat = await Chat.findOneAndUpdate(
    { _id: chatId, participants: userId },
    { $push: { messages: message } },
    { new: true },
  );
  return chat ? { chat, message: { ...message, chatId } } : null;
}
module.exports = { validId, isParticipant, accessibleChat, appendMessage };
