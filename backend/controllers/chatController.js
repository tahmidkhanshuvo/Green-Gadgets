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
 * Populates participant details (e.g., name and email).
 *
 * Expected req.params: { chatId: "chatId" }
 */
exports.getChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("participants", "name email");
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
 * Either text or image (or both) can be provided.
 */
exports.addMessage = async (req, res) => {
  try {
    const { chatId, sender, text, image } = req.body;
    if (!chatId || !sender) {
      return res.status(400).json({ error: "chatId and sender are required." });
    }

    const message = { sender, text, image };
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: message } },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

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
    const chats = await Chat.find({ participants: userId })
      .populate("participants", "name email");
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats for user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
