const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Create (or retrieve existing) chat between participants
router.post("/", chatController.createChat);

// Retrieve a chat by its ID
router.get("/:chatId", chatController.getChat);

// Add a message to a chat
router.post("/message", chatController.addMessage);

// Get all chats for a specific user
router.get("/user/:userId", chatController.getChatsForUser);

// Delete a chat by its ID
router.delete("/:chatId", chatController.deleteChat);

module.exports = router;
