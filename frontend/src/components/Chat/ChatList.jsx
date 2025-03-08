import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import io from "socket.io-client";
import "./ChatList.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatList = () => {
  const { user } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});
  const socketRef = useRef();
  const location = useLocation();

  const fetchChats = async () => {
    try {
      if (!user || !user._id) return;
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

  // Listen for new chat message events (real-time notifications)
  useEffect(() => {
    socketRef.current = io(API_URL, { transports: ["websocket"] });
    socketRef.current.on("newChatMessage", (data) => {
      console.log("New chat message event received:", data);
      // If the current URL is not the chat page, update unread count
      if (!location.pathname.includes(`/chat/${data.chatId}`)) {
        setUnreadCounts((prev) => ({
          ...prev,
          [data.chatId]: (prev[data.chatId] || 0) + 1,
        }));
      }
      // Also re-fetch chats to update last message preview
      fetchChats();
    });
    return () => socketRef.current.disconnect();
  }, [location]);

  const handleChatClick = (chatId) => {
    // Reset unread count for the chat when clicked
    setUnreadCounts((prev) => ({ ...prev, [chatId]: 0 }));
  };

  if (loading) {
    return <p className="chatlist-loading">Loading chats...</p>;
  }

  if (!chats.length) {
    return <p className="chatlist-empty">No chats available.</p>;
  }

  return (
    <div className="chatlist-container">
      <h2 className="chatlist-title">Chats</h2>
      <ul className="chatlist-list">
        {chats.map((chat) => {
          const otherUser = chat.participants.find(
            (participant) => participant._id !== user._id
          );
          const lastMessage =
            chat.messages.length > 0
              ? chat.messages[chat.messages.length - 1]
              : null;
          const unread = unreadCounts[chat._id] || 0;

          return (
            <li key={chat._id} className="chatlist-item">
              <Link
                to={`/chat/${chat._id}`}
                className="chatlist-link"
                onClick={() => handleChatClick(chat._id)}
              >
                <div className="chatlist-avatar">
                  {otherUser && otherUser.avatar ? (
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      className="chatlist-avatar-img"
                    />
                  ) : (
                    <span>
                      {otherUser ? otherUser.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  )}
                </div>
                <div className="chatlist-info">
                  <h3 className="chatlist-name">
                    {otherUser ? otherUser.name : "Unknown User"}
                  </h3>
                  {lastMessage && (
                    <div className="chatlist-extra">
                      <p className="chatlist-preview">
                        {lastMessage.text ||
                          (lastMessage.image ? "📷 Image" : "")}
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
                {unread > 0 && (
                  <div className="chatlist-unread-badge">{unread}</div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
