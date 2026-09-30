import { useState } from 'react';
import aiAgentImage from '../assets/ai-agent.jpg';
import './ChatBot.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://shikhar-portfolio-wine.vercel.app';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Shikhar's AI assistant. Ask me about my skills, projects, experience or services."
    }
  ]);

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: 'user',
        text: userMessage
      }
    ]);

    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setMessages((previous) => [
        ...previous,
        {
          sender: 'bot',
          text: data.reply
        }
      ]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage = error instanceof TypeError
        ? 'Sorry, I could not connect to the AI right now.'
        : error.message || 'AI request failed. Please try again later.';

      setMessages((previous) => [
        ...previous,
        {
          sender: 'bot',
          text: errorMessage
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className={`portfolio-chatbot${isOpen ? ' is-open' : ''}`}>
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <div>
              <h3>AI Assistant</h3>
              <p>Shikhar's Portfolio</p>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chatbot-message ${item.sender}`}
              >
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="chatbot-message bot">
                Typing...
              </div>
            )}
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              value={message}
              placeholder="Ask me something..."
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <button
          className="chatbot-launcher"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
          aria-expanded={false}
        >
          <img src={aiAgentImage} alt="" />
        </button>
      )}
    </div>
  );
}