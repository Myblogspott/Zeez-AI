import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);  // Array of chat messages
  const [input, setInput] = useState('');        // User input message
  const [loading, setLoading] = useState(false); // Loading state for the AI response

  // Replace with your OpenAI API key
  const OPENAI_API_KEY = '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 ';

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory'));
    if (savedMessages) {
      setMessages(savedMessages);  // Load the messages into the state
    }
  }, []);

  // Save chat history to localStorage
  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  // Function to handle user message submission
  const handleSendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = { sender: 'user', text: input }; // User message object
    const updatedMessages = [...messages, userMessage];  // Add user message to the message array

    setMessages(updatedMessages);       // Update message list with user input
    setInput('');                       // Clear input field
    setLoading(true);                   // Set loading while fetching AI response
    saveMessagesToLocalStorage(updatedMessages); // Save updated messages

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // OpenAI Chat API endpoint
        {
          model: 'gpt-3.5-turbo',                    // Chat model (you can change to gpt-4 if available)
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' }, // System's instructions for AI
            { role: 'user', content: input }                              // User's message sent to AI
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,  // Authorization header with API key
            'Content-Type': 'application/json',           // API expects JSON
          },
        }
      );

      // OpenAI returns an array of choices, take the first one
      const aiMessage = response.data.choices[0].message.content;
      const aiMessageObject = { sender: 'ai', text: aiMessage }; // AI message object

      const updatedMessagesWithAI = [...updatedMessages, aiMessageObject]; // Append AI message
      setMessages(updatedMessagesWithAI);  // Update message list with AI response
      saveMessagesToLocalStorage(updatedMessagesWithAI); // Save updated messages with AI response

    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }

    setLoading(false); // Stop loading when response is fetched
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>AI is typing...</div>}  {/* Display loading message */}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

// Chat component styles
const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80vh',
    width: '60%',
    margin: '50px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chatBox: {
    flexGrow: 1,
    overflowY: 'scroll',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  userMessage: {
    backgroundColor: '#daf8e3',
    padding: '8px',
    borderRadius: '8px',
    margin: '5px 0',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#f1f1f1',
    padding: '8px',
    borderRadius: '8px',
    margin: '5px 0',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888',
    margin: '10px 0',
  },
};

export default ChatComponent;
