import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ChatPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
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
        console.error("Error fetching chat details:", error);
      }
    };
    fetchChatDetails();
  }, [chatId]);

  // Setup Socket.io connection
  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ["websocket"] });
    socketRef.current.emit("joinChat", { chatId });
    console.log(`Joining chat room ${chatId}`);

    socketRef.current.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, { ...message }]);
    });

    return () => socketRef.current.disconnect();
  }, [chatId]);

  const sendTextMessage = () => {
    if (textInput.trim() && user && user._id) {
      const payload = { chatId, sender: user._id, text: textInput };
      console.log("Sending text message:", payload);
      socketRef.current.emit("sendMessage", payload);
      setTextInput("");
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
    if (!selectedImage || !user || !user._id) return;
    setIsImageUploading(true); // Mark as uploading (red outline)
    const formData = new FormData();
    formData.append("images", selectedImage);

    try {
      const response = await axios.post(`${API_URL}/api/upload/chat`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = response.data.imageUrl;
      const payload = { chatId, sender: user._id, image: imageUrl };
      console.log("Sending image message:", payload);
      socketRef.current.emit("sendMessage", payload);
      setSelectedImage(null);
      setImagePreview(null);
      setIsImageUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
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
      </header>
      <div className="chatpage-container">
        <div className="chatpage-messages">
          {messages.length === 0 ? (
            <p className="chatpage-no-messages">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`chatpage-message ${msg.sender === user._id ? "sent" : "received"}`}
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
              <button className="chatpage-send-btn" onClick={sendTextMessage}>
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
              <button className="chatpage-send-btn" onClick={sendImageMessage}>
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
