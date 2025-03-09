import React, { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './FloatingAIChat.css';

const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi! I am Green AI. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const formatText = (text) => {
    const lines = text.split('\n').map((line) => line.trim()).filter((line) => line);
    return lines.join('\n');
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_GENAI_KEY;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: input }],
          },
        ],
      };

      console.log('API Request Payload:', payload);
      const response = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      });
      console.log('Raw API Response Data:', response.data);

      let aggregatedText = '';

      if (Array.isArray(response.data)) {
        response.data.forEach((obj) => {
          if (obj.candidates && obj.candidates.length > 0) {
            const candidate = obj.candidates[0];
            if (candidate.content && candidate.content.parts) {
              candidate.content.parts.forEach((part) => {
                if (part.text) {
                  aggregatedText += part.text;
                }
              });
            }
          }
        });
      }

      const formattedText = formatText(aggregatedText);
      console.log('Formatted Response:', formattedText);

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { sender: 'ai', text: formattedText }];
        console.log('Updated Messages:', updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: 'Sorry, there was an error getting a response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-chat">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Green AI</h4>
            <button className="close-button" onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</pre>
              </div>
            ))}
            {loading && <div className="chat-message ai">Typing...</div>}
          </div>
          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>
        </div>
      )}
      <button className="chat-toggle-button" onClick={toggleChat}>
        <FaComments size={24} />
      </button>
    </div>
  );
};

export default FloatingAIChat;