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
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const socketRef = useRef();
  const fileInputRef = useRef();

  // Fetch existing chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chats/${chatId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [chatId]);

  // Setup socket connection
  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ["websocket"] });
    socketRef.current.emit("joinChat", { chatId });
    console.log(`Joining chat room ${chatId}`);

    socketRef.current.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
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
      // Generate a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageMessage = async () => {
    if (!selectedImage || !user || !user._id) return;
    const formData = new FormData();
    // Append with key "images" as expected by your multer middleware
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="chatpage-container">
      <h2 className="chatpage-title">Chat Conversation</h2>
      <div className="chatpage-messages">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="chatpage-message">
              {msg.text && <span className="chatpage-text">{msg.text}</span>}
              {msg.image && (
                <img src={msg.image} alt="sent content" className="chatpage-image" />
              )}
              <small className="chatpage-timestamp">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
      </div>
      <div className="chatpage-input-container">
        <textarea
          className="chatpage-input"
          placeholder="Type a message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <div className="chatpage-buttons">
          <button className="chatpage-btn" onClick={sendTextMessage}>
            Send Text
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <button
            className="chatpage-btn"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Choose Image
          </button>
          {selectedImage && (
            <button className="chatpage-btn" onClick={sendImageMessage}>
              Send Image
            </button>
          )}
        </div>
        {imagePreview && (
          <div className="chatpage-image-preview">
            <p>Image Preview:</p>
            <img src={imagePreview} alt="Preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
