import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../api";
import "./FloatingAIChat.css";

export default function FloatingAIChat() {
  const [isOpen, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I can help you buy, sell, or recycle electronics. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  async function send(event) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;
    setMessages((previous) => [...previous, { sender: "user", text: message }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/assistant`, {
        message,
      });
      setMessages((previous) => [
        ...previous,
        { sender: "ai", text: data.reply },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          sender: "ai",
          text: "Help is unavailable for a moment. Please try again, or visit the Help Center.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="floating-chat">
      {isOpen && (
        <section
          className="chat-window"
          role="dialog"
          aria-label="Green Gadgets help"
        >
          <div className="chat-header">
            <h4>Green Gadgets help</h4>
            <button
              className="close-button"
              onClick={() => setOpen(false)}
              aria-label="Close help"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {message.text}
                </p>
              </div>
            ))}
            {loading && <p role="status">Thinking…</p>}
          </div>
          <form className="chat-input-area" onSubmit={send}>
            <input
              aria-label="Your question"
              maxLength={2000}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about buying or selling…"
            />
            <button type="submit" disabled={loading || !input.trim()}>
              Send
            </button>
          </form>
        </section>
      )}
      <button
        className="chat-toggle-button"
        aria-label={isOpen ? "Close help" : "Open help"}
        aria-expanded={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        <FaComments size={24} />
      </button>
    </div>
  );
}
