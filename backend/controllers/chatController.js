const Chat = require("../models/Chat");
const {
  validId,
  accessibleChat,
  appendMessage,
} = require("../services/chatService");

exports.createChat = async (req, res, next) => {
  try {
    const participants = [...new Set(req.body.participants || [])];
    if (
      participants.length !== 2 ||
      participants.some((id) => !validId(id)) ||
      !participants.includes(String(req.user.userId))
    ) {
      return res
        .status(400)
        .json({
          error: "A conversation must include you and one other person.",
        });
    }
    let chat = await Chat.findOne({
      participants: { $all: participants, $size: 2 },
    });
    if (!chat) chat = await Chat.create({ participants, messages: [] });
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
exports.getChat = async (req, res, next) => {
  try {
    const chat = await accessibleChat(req.params.chatId, req.user.userId);
    if (!chat) return res.status(404).json({ error: "Chat not found." });
    await chat.populate("participants", "name email avatar");
    res.json(chat);
  } catch (error) {
    next(error);
  }
};
exports.addMessage = async (req, res, next) => {
  try {
    const result = await appendMessage(
      req.body.chatId,
      req.user.userId,
      req.body,
    );
    if (!result) return res.status(404).json({ error: "Chat not found." });
    res.json(result.chat);
  } catch (error) {
    next(error);
  }
};
exports.getChatsForUser = async (req, res, next) => {
  try {
    if (req.params.userId !== String(req.user.userId))
      return res
        .status(403)
        .json({ error: "You can only access your own conversations." });
    res.json(
      await Chat.find({ participants: req.user.userId })
        .populate("participants", "name email avatar")
        .sort({ updatedAt: -1 }),
    );
  } catch (error) {
    next(error);
  }
};
exports.deleteChat = async (req, res, next) => {
  try {
    if (!validId(req.params.chatId))
      return res.status(404).json({ error: "Chat not found." });
    const chat = await Chat.findOneAndDelete({
      _id: req.params.chatId,
      participants: req.user.userId,
    });
    if (!chat) return res.status(404).json({ error: "Chat not found." });
    res.json({
      message: "Chat deleted successfully",
      chatId: req.params.chatId,
    });
  } catch (error) {
    next(error);
  }
};
