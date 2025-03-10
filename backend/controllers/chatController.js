const Chat = require("../models/Chat");

/**
 * Create a new chat between participants.
 * If a chat between the same participants already exists (for a two-user conversation),
 * returns the existing chat.
 *
 * Expected req.body: { participants: [userId1, userId2] }
 */
exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    if (!participants || !Array.isArray(participants) || participants.length < 2) {
      return res.status(400).json({ error: "At least two participants are required." });
    }

    // Check if a chat with these participants already exists
    let chat = await Chat.findOne({
      participants: { $all: participants, $size: participants.length }
    });

    if (!chat) {
      chat = new Chat({ participants, messages: [] });
      await chat.save();
    }

    res.json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieve a specific chat by its ID.
 * Populates participant details (e.g., name, email, avatar).
 *
 * Expected req.params: { chatId: "chatId" }
 */
exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("participants", "name email avatar");
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Add a message to an existing chat.
 *
 * Expected req.body: { chatId, sender, text, image }
 */
exports.addMessage = async (req, res) => {
  try {
    const { chatId, sender, text, image } = req.body;
    if (!chatId || !sender) {
      return res.status(400).json({ error: "chatId and sender are required." });
    }

    let chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    if (!chat.participants.includes(sender)) {
      chat.participants.push(sender);
    }

    chat.messages.push({ sender, text, image });
    await chat.save();

    res.json(chat);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get all chats for a specific user.
 *
 * Expected req.params: { userId: "userId" }
 */
exports.getChatsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ participants: { $in: [userId] } })
      .populate("participants", "name email avatar");
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Delete a chat by its ID.
 *
 * Expected req.params: { chatId: "chatId" }
 */
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    res.json({ message: "Chat deleted successfully", chatId });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
