import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./ChatList.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
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

    if (user && user._id) {
      fetchChats();
    }
  }, [user]);

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
          // For one-on-one chats, display the other user's name
          const otherUser = chat.participants.find(
            (participant) => participant._id !== user._id
          );
          // Get the last message and its time (if available)
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
