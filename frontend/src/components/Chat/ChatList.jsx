import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/chats/user/${user._id}`);
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
    return <p>Loading chats...</p>;
  }

  if (!chats.length) {
    return <p>No chats available.</p>;
  }

  return (
    <div className="chat-list-container">
      <h2>Your Chats</h2>
      <ul>
        {chats.map((chat) => {
          // For one-on-one chats, display the other user's name
          const otherUser = chat.participants.find(
            (participant) => participant._id !== user._id
          );
          return (
            <li key={chat._id}>
              <Link to={`/chat/${chat._id}`}>
                <strong>{otherUser ? otherUser.name : "Unknown User"}</strong>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
