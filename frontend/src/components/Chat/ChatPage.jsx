import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ChatPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const socketRef = useRef();
  const fileInputRef = useRef();

  // Fetch chat details on mount
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chats/${chatId}`);
        setChat(response.data);
        setMessages(response.data.messages);
      } catch (error) {
        setError(
          error.response?.data?.error ||
            "Unable to load this conversation. Please try again.",
        );
      }
    };
    fetchChatDetails();
  }, [chatId]);

  // Setup Socket.io connection
  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      auth: { token: localStorage.getItem("token") },
    });
    socketRef.current.on("connect", () =>
      socketRef.current.emit("joinChat", { chatId }),
    );
    socketRef.current.on("messageError", (message) => setError(message));
    socketRef.current.on("connect_error", () =>
      setError(
        "Chat connection unavailable. Please check your connection or sign in again.",
      ),
    );
    socketRef.current.on("disconnect", () =>
      setError("Reconnecting to chat… Your draft is kept here."),
    );
    socketRef.current.on("connect", () => setError(""));

    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, { ...message }]);
    });

    return () => socketRef.current.disconnect();
  }, [chatId]);

  const sendTextMessage = () => {
    if (textInput.trim() && user && user._id && !sending) {
      if (!socketRef.current?.connected) {
        setError("Chat is reconnecting. Please try again in a moment.");
        return;
      }
      const payload = { chatId, sender: user._id, text: textInput };
      setSending(true);
      socketRef.current
        .timeout(15000)
        .emit("sendMessage", payload, (timeout, result) => {
          setSending(false);
          if (timeout || !result?.ok) {
            setError(
              result?.message ||
                "The message was not confirmed. Your draft is kept here.",
            );
            return;
          }
          setTextInput("");
          setError("");
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsImageUploading(false); // Ready state => green outline
      // Generate local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageMessage = async () => {
    if (!selectedImage || !user || !user._id || isImageUploading) return;
    if (!socketRef.current?.connected) {
      setError("Chat is reconnecting. Please try again in a moment.");
      return;
    }
    setIsImageUploading(true); // Mark as uploading (red outline)
    const formData = new FormData();
    formData.append("images", selectedImage);

    try {
      const response = await axios.post(
        `${API_URL}/api/upload/chat`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      const imageUrl = response.data.imageUrl;
      const payload = { chatId, sender: user._id, image: imageUrl };
      const result = await socketRef.current
        .timeout(15000)
        .emitWithAck("sendMessage", payload);
      if (!result?.ok) throw new Error("Message not confirmed.");
      setSelectedImage(null);
      setImagePreview(null);
      setIsImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setError("Unable to upload this image. Please try again.");
      setIsImageUploading(false);
    }
  };

  // Get the other participant's name
  const otherUserName =
    chat && chat.participants && user
      ? chat.participants.find((p) => p._id !== user._id)?.name || "Chat"
      : "Chat";

  return (
    <div className="chatpage-wrapper">
      <header className="chatpage-header">
        <h2>{otherUserName}</h2>
        {error && <p role="alert">{error}</p>}
      </header>
      <div className="chatpage-container">
        <div className="chatpage-messages">
          {messages.length === 0 ? (
            <p className="chatpage-no-messages">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chatpage-message ${String(msg.sender?._id || msg.sender) === String(user?._id || user?.id) ? "sent" : "received"}`}
              >
                {msg.text && <div className="message-content">{msg.text}</div>}
                {msg.image && (
                  <img
                    src={`${msg.image}?t=${new Date(msg.createdAt).getTime()}`}
                    alt="sent content"
                    className="chatpage-image"
                  />
                )}
                <div className="chatpage-timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="chatpage-input-section">
          <div className="chatpage-input-row">
            <textarea
              className="chatpage-input"
              placeholder="Type a message..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="chatpage-icons">
              <button
                className="chatpage-icon-btn"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                📷
              </button>
              <button
                className="chatpage-send-btn"
                aria-label="Send message"
                disabled={sending || !textInput.trim()}
                onClick={sendTextMessage}
              >
                ➤
              </button>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          {selectedImage && (
            <div
              className={`chatpage-image-preview ${isImageUploading ? "uploading" : "ready"}`}
            >
              <p>Preview:</p>
              <img src={imagePreview} alt="Preview" />
              <button
                className="chatpage-send-btn"
                disabled={isImageUploading}
                onClick={sendImageMessage}
              >
                Send Image
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
