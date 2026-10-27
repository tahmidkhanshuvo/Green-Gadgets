require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const { apiLimiter } = require("./middleware/rateLimit");
const { accessibleChat, appendMessage } = require("./services/chatService");
const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
const origins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""));
const corsOptions = { origin: origins, credentials: true };
app.use(cors(corsOptions));
app.get("/healthz", (req, res) =>
  res
    .status(mongoose.connection.readyState === 1 ? 200 : 503)
    .json({
      service: "green-gadgets",
      database:
        mongoose.connection.readyState === 1 ? "connected" : "unavailable",
    }),
);
app.use("/api", apiLimiter);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/ad", require("./routes/adsRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/assistant", require("./routes/assistantRoutes"));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res
    .status(error.status || 500)
    .json({
      message: error.status
        ? error.message
        : "Something went wrong. Please try again.",
    });
});
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });
io.use((socket, next) => {
  try {
    const claims = jwt.verify(
      socket.handshake.auth?.token || "",
      process.env.JWT_SECRET,
    );
    if (!claims.userId) return next(new Error("Sign in to chat."));
    socket.data.userId = claims.userId;
    next();
  } catch {
    next(new Error("Sign in to chat."));
  }
});
io.on("connection", (socket) => {
  const userId = socket.data.userId;
  socket.join(`user:${userId}`);
  socket.on("joinChat", async ({ chatId } = {}, ack) => {
    try {
      if (!(await accessibleChat(chatId, userId)))
        throw new Error("Chat not found.");
      socket.join(chatId);
      if (typeof ack === "function") ack({ ok: true });
    } catch {
      socket.emit("messageError", "Unable to join this conversation.");
    }
  });
  socket.on("sendMessage", async (data = {}, ack) => {
    try {
      const result = await appendMessage(data.chatId, userId, data);
      if (!result) throw new Error("Chat not found.");
      io.to(data.chatId).emit("message", result.message);
      result.chat.participants.forEach((id) =>
        io.to(`user:${id}`).emit("newChatMessage", { chatId: data.chatId }),
      );
      if (typeof ack === "function") ack({ ok: true });
    } catch (error) {
      const message = error.message || "Unable to send this message.";
      if (typeof ack === "function") ack({ ok: false, message });
      socket.emit("messageError", message);
    }
  });
});
if (require.main === module) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      server.listen(process.env.PORT || 4000, () =>
        console.log("Green Gadgets API is ready."),
      );
    })
    .catch(() => {
      console.error("Database connection failed. Check MONGO_URI.");
      process.exitCode = 1;
    });
}
module.exports = { app, server, io };
