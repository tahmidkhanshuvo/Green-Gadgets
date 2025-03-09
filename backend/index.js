require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Chat = require("./models/Chat"); // Your Chat model

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/ad", require("./routes/adsRoutes")); // Product Routes
app.use("/api/upload", require("./routes/uploadRoutes")); // Image Upload Routes
app.use("/api/blog", require("./routes/blogRoutes")); // Blog Routes
app.use("/api/chats", require("./routes/chatRoutes")); // Chat Routes
app.use("/api/users", require("./routes/userRoutes")); // User Routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io Event Handlers
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Client joins a chat room
  socket.on("joinChat", ({ chatId }) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat room ${chatId}`);
  });

  // When a message is sent from a client
  socket.on("sendMessage", async (data) => {
    console.log("Message received via socket:", data);
    try {
      // Persist the message by pushing it into the chat document
      const updatedChat = await Chat.findByIdAndUpdate(
        data.chatId,
        {
          $push: {
            messages: {
              sender: data.sender,
              text: data.text,
              image: data.image,
            },
          },
        },
        { new: true }
      );

      if (!updatedChat) {
        console.error("Chat not found for chatId:", data.chatId);
        return;
      }

      // Broadcast the new message to all clients in the chat room
      io.to(data.chatId).emit("message", { ...data, createdAt: new Date() });
      // Also, notify all connected clients that a chat document was updated
      io.emit("newChatMessage", { chatId: data.chatId });
    } catch (error) {
      console.error("Error persisting message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
