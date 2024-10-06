// src/IdentityText.js
import React, { useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';

const IdentityText = () => {
  const [response, setResponse] = useState(null); // Response state
  const [file, setFile] = useState(null); // File state

  const identifyText = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const response = await Predictions.identify({
        text: {
          source: {
            file, // Use the file state
          },
          format: 'ALL' // You can adjust the format based on your needs
        }
      });

      setResponse(response);
      console.log({ response });

    } catch (error) {
      console.error('Error identifying text:', error);
    }
  };

  return (
    <div>
      <h2>Identify Text</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={identifyText}>Identify Text</button>

      {response && (
        <div>
          {/* Display response data */}
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IdentityText;
