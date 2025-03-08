import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatPage = () => {
  const { chatId } = useParams();
  const { user } = useContext(AuthContext);  
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const socketRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    // Establish socket connection
    socketRef.current = io(API_URL);

    // Join the chat room with the given chatId
    socketRef.current.emit("joinChat", { chatId });

    // Listen for incoming messages
    socketRef.current.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup on component unmount
    return () => socketRef.current.disconnect();
  }, [chatId]);

  const sendTextMessage = () => {
    if (textInput.trim() && user && user._id) {
      const senderId = user._id;
      socketRef.current.emit("sendMessage", { chatId, sender: senderId, text: textInput });
      setTextInput("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const sendImageMessage = async () => {
    if (!selectedImage || !user || !user._id) return;
    const formData = new FormData();
    formData.append("images", selectedImage); // Ensure key matches your multer field name

    try {
      // Upload image to Cloudinary via your chat image upload endpoint
      const response = await axios.post(`${API_URL}/api/upload/chat`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = response.data.imageUrl;
      const senderId = user._id;
      socketRef.current.emit("sendMessage", { chatId, sender: senderId, image: imageUrl });

      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat Conversation</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.text && <span>{msg.text}</span>}
            {msg.image && (
              <img
                src={msg.image}
                alt="sent content"
                style={{ maxWidth: "200px", display: "block", marginTop: "8px" }}
              />
            )}
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          placeholder="Type a message..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={sendTextMessage}>Send Text</button>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          Choose Image
        </button>
        {selectedImage && (
          <div>
            <p>Selected: {selectedImage.name}</p>
            <button onClick={sendImageMessage}>Send Image</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
