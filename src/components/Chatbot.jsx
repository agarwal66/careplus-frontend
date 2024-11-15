import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: 'Hello! How can I help you?', isBot: true }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Fetching bot response from Gemini API
  const getBotResponse = async (userMessage) => {
    const requestBody = {
      prompt: `You are a chatbot: ${userMessage}`,
    };

    try {
      setLoading(true); // Show loading spinner
      const response = await fetch('https://gemini-a.onrender.com/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      setLoading(false); // Hide loading spinner
      return data.generatedText;
    } catch (error) {
      setLoading(false); // Hide loading spinner even if there's an error
      console.error('Error fetching bot response:', error);
      return "Sorry, I am facing some issues. Please try again later.";
    }
  };

  useEffect(() => {
    if (messages.length > 1 && !messages[messages.length - 1].isBot) {
      const userMessage = messages[messages.length - 1].text;
      const timeout = setTimeout(async () => {
        const botResponse = await getBotResponse(userMessage);
        setMessages(prevMessages => [...prevMessages, { text: botResponse, isBot: true }]);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [messages]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isBot: false }]);
      setInput('');
    }
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        className="chat-toggle"
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <FontAwesomeIcon icon={faRobot} size="2x" />
      </button>

      {/* Chatbot window */}
      {isChatOpen && (
        <div className="chat-container" style={{ position: 'fixed', bottom: '70px', right: '20px', width: '300px', height: '400px', zIndex: 1000, background: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.25)', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
          {/* Header with close button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
            <h6>Careplus Chatbot</h6>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Chat window */}
          <div className="chat-window" style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`} style={{ margin: '5px', padding: '10px', backgroundColor: msg.isBot ? '#eee' : '#ddf', borderRadius: '5px' }}>
                {msg.text}
              </div>
            ))}

            {/* Show loading spinner while waiting for bot response */}
            {loading && (
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              </div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="input-container" style={{ display: 'flex', borderTop: '1px solid #ccc', padding: '5px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{ flexGrow: 1, marginRight: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button type="submit" style={{ padding: '5px 10px', backgroundColor: '#4a76a8', color: 'white', borderRadius: '5px', border: 'none' }}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
