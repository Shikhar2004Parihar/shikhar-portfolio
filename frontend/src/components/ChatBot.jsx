import { useState } from 'react';
import aiAgentImage from '../assets/ai-agent.jpg';
import { readApiResponse } from '../utils/api';
import './ChatBot.css';

const API_URL = "";

const suggestedQuestions = [
  'Tell me about yourself',
  'What are your skills?',
  'What projects have you worked on?',
  'What is your experience?',
  'How can I contact you?'
];

const prewrittenAnswers = {
  'tell me about yourself':
    'I’m Shikhar Parihar, a Full Stack Web Developer who enjoys building modern, responsive, and user-friendly web applications.',
  'what are your skills?':
    'I work with HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB, SQL, Git, and GitHub.',
  'what projects have you worked on?':
    'I built My To-Do List, a task-planning app for organizing tasks, setting priorities and due dates, and creating custom lists. You can try it at https://shikhar-todolist.vercel.app/.',
  'what is your experience?':
    'I have worked as a Frontend Development Intern, building and improving web features with JavaScript and React. I also work as a freelance graphic designer, with 300+ custom designs and 50+ edited videos.',
  'how can i contact you?':
    'You can email Shikhar at pariharshikhar101@gmail.com, call 6232553367, or use the contact form on this portfolio.'
};

export default function ChatBot({ isOpen: controlledIsOpen, onOpen, onClose }) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = (value) => {
    if (value) {
      onOpen?.();
    } else {
      onClose?.();
    }

    if (controlledIsOpen === undefined) {
      setInternalIsOpen(value);
    }
  };

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Shikhar's AI assistant. Ask me about my skills, projects, experience or services."
    }
  ]);

  const sendMessage = async (text = message) => {
    const userMessage = text.trim();
    if (!userMessage || loading) {
      return;
    }

    const normalizedMessage = userMessage.toLowerCase().replace(/\s+/g, ' ');
    const prewrittenAnswer = prewrittenAnswers[normalizedMessage];

    setMessages((previous) => [
      ...previous,
      {
        sender: 'user',
        text: userMessage
      }
    ]);

    setMessage('');
    setActiveView('message');

    if (prewrittenAnswer) {
      setMessages((previous) => [
        ...previous,
        {
          sender: 'bot',
          text: prewrittenAnswer
        }
      ]);
      return;
    }

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

      const data = await readApiResponse(response);

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
            {activeView === 'home' ? (
              <div className="chatbot-brand">
                <img src={aiAgentImage} alt="" />
                <div>
                  <h3>Shikhar AI Chat</h3>
                  <p>Ask me anything about Shikhar</p>
                </div>
              </div>
            ) : (
              <h3 className="chatbot-view-title">Message</h3>
            )}
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
            >
              ×
            </button>
          </div>

          {activeView === 'home' ? (
            <div className="chatbot-home">
              <h2>Hello!</h2>
              <p className="chatbot-home-intro">
                I’m Shikhar’s AI assistant. What would you like to know?
              </p>
              <div className="chatbot-suggestions">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                    <span aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="chatbot-messages" aria-live="polite">
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
                  aria-label="Write a message"
                />

                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={loading || !message.trim()}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </>
          )}

          <nav className="chatbot-bottom-nav" aria-label="Chat navigation">
            <button
              className={activeView === 'home' ? 'active' : ''}
              type="button"
              onClick={() => setActiveView('home')}
              aria-current={activeView === 'home' ? 'page' : undefined}
            >
              <span aria-hidden="true">⌂</span>
              Home
            </button>
            <button
              className={activeView === 'message' ? 'active' : ''}
              type="button"
              onClick={() => setActiveView('message')}
              aria-current={activeView === 'message' ? 'page' : undefined}
            >
              <span aria-hidden="true">✉</span>
              Message
            </button>
          </nav>
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