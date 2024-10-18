import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

const IdentifyText = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleIdentifyText = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setError('');
    setLoading(true);

    // Convert the image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

      try {
        // API request payload
        const requestPayload = {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: 'TEXT_DETECTION' }],
            },
          ],
        };

        // Make API call to Google Vision using environment variable for API key
        const result = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_GOOGLE_VISION_API_KEY}`,
          requestPayload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const detectedText = result.data.responses[0].fullTextAnnotation.text;
        setResponse(detectedText || 'No text identified.');
      } catch (err) {
        setError('Error processing the file. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="identify-text-container">
      <h3>Identify Text</h3>
      <div className="file-upload-section">
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="custom-file-upload">
          <FaUpload className="custom-file-upload-icon" /> 
        </label>
        <button onClick={handleIdentifyText} className="identify-button">
          Identify Text
        </button>
      </div>

      {loading && <p>🤖 Please wait, generating response...</p>}
      {error && <p>{error}</p>}
      {response && (
        <div>
          <h4>Extracted Text:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default IdentifyText;
