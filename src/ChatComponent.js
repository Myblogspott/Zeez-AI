import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Predictions } from '@aws-amplify/predictions';
import { FaUpload, FaPaperPlane } from 'react-icons/fa';  // Import upload and send icons

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);  // Array of chat messages
  const [input, setInput] = useState('');        // User input message
  const [loading, setLoading] = useState(false); // Loading state for the AI response
  const [image, setImage] = useState(null);      // To store the uploaded image

  const OPENAI_API_KEY = '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';  // Replace with your OpenAI API key

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('chatHistory'));
    if (savedMessages) {
      setMessages(savedMessages);  // Load the messages into the state
    }
  }, []);

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    saveMessagesToLocalStorage(updatedMessages);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: input }
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      const aiMessageObject = { sender: 'ai', text: aiMessage };

      const updatedMessagesWithAI = [...updatedMessages, aiMessageObject];
      setMessages(updatedMessagesWithAI);
      saveMessagesToLocalStorage(updatedMessagesWithAI);
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
    }

    setLoading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      processImage(file);
    }
  };

  const processImage = async (imageFile) => {
    setLoading(true);

    try {
      const result = await Predictions.identify({
        text: {
          source: {
            file: imageFile,
          },
          format: 'ALL',
        },
      });

      const extractedText = result?.text?.fullText || 'No text found';
      const imageMessage = { sender: 'user', text: `Extracted text from image: ${extractedText}` };
      const updatedMessages = [...messages, imageMessage];

      setMessages(updatedMessages);
      saveMessagesToLocalStorage(updatedMessages);
    } catch (error) {
      console.error('Error processing image:', error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.aiMessage}>
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>Processing...</div>}
      </div>
      <div style={styles.inputContainer}>
        <label htmlFor="imageUpload" style={styles.uploadLabel}>
          <FaUpload size={20} color="#007bff" />
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={styles.fileInput}
          id="imageUpload"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          <FaPaperPlane size={20} color="white" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '80vh',
    width: '100%',  // Set to 100% for full width
    margin: '0',    // Remove margin to fit the full width
    padding: '10px',
    border: 'none',  // Remove border
    backgroundColor: 'transparent',  // Transparent background
    boxShadow: 'none',  // Remove shadow to remove card effect
  },
  chatBox: {
    flexGrow: 1,
    overflowY: 'scroll',
    padding: '10px',
    borderBottom: 'none',  // Remove bottom border
    backgroundColor: 'transparent',  // Transparent background
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
    padding: '10px 0',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '20px',
    margin: '0 10px',
  },
  fileInput: {
    display: 'none',
  },
  uploadLabel: {
    cursor: 'pointer',
    marginRight: '10px',
  },
  sendButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
