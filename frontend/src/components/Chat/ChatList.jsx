import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import io from "socket.io-client";
import "./ChatList.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatList = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = React.useRef();

  const fetchChats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/chats/user/${user._id}`);
      console.log("Fetched chats:", response.data);
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchChats();
    }
  }, [user]);

  // Listen for new chat message events to update chat list automatically
  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ["websocket"] });
    socketRef.current.on("newChatMessage", (data) => {
      console.log("New chat message event received:", data);
      fetchChats();
    });
    return () => socketRef.current.disconnect();
  }, []);

  if (loading) {
    return <p className="chatlist-loading">Loading chats...</p>;
  }

  if (!chats.length) {
    return <p className="chatlist-empty">No chats available.</p>;
  }

  return (
    <div className="chatlist-container">
      <h2 className="chatlist-title">Your Chats</h2>
      <ul className="chatlist-list">
        {chats.map((chat) => {
          const otherUser = chat.participants.find(
            (participant) => participant._id !== user._id
          );
          const lastMessage =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : null;
          return (
            <li key={chat._id} className="chatlist-item">
              <Link to={`/chat/${chat._id}`} className="chatlist-link">
                <div className="chatlist-avatar">
                  {otherUser ? otherUser.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="chatlist-info">
                  <h3 className="chatlist-name">
                    {otherUser ? otherUser.name : "Unknown User"}
                  </h3>
                  {lastMessage && (
                    <div className="chatlist-extra">
                      <p className="chatlist-preview">
                        {lastMessage.text ||
                          (lastMessage.image ? "Image" : "")}
                      </p>
                      <span className="chatlist-time">
                        {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
