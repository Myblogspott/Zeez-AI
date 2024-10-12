// src/IdentityText.js
import React, { useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';

const IdentityText = () => {
  const [response, setResponse] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);  // State for handling errors

  // Function to handle text identification
  const identifyText = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const result = await Predictions.identify({
        text: {
          source: {
            file,
          },
          format: 'ALL',  // Extract all text from the image
        },
      });

      // Safely extract the fullText, fallback to "No text found" if unavailable
      const extractedText = result?.text?.fullText || 'No text found';
      
      // Log the full JSON response for debugging
      console.log('Full JSON response:', result);
      
      // Set the extracted text in the response state for display
      setResponse(extractedText);
      setError(null);  // Clear any previous errors
    } catch (error) {
      console.error('Error identifying text:', error);
      setError('Error identifying text. Please try again.');
      setResponse(null);  // Clear response in case of error
    }
  };

  return (
    <div>
      <h3>Identify Text</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={identifyText}>Identify Text</button>

      {/* Display the error if one occurs */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the extracted text if available */}
      {response && (
        <div>
          <h3>Extracted Text:</h3>
          <p style={styles.text}>{response}</p> {/* Styled extracted text */}
        </div>
      )}
    </div>
  );
};

// Add some CSS styling for better text presentation
const styles = {
  text: {
    whiteSpace: 'pre-wrap', // Preserve newlines and spacing in the extracted text
    backgroundColor: '#f0f0f0',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
  },
};

export default IdentityText;
