import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';  // Import an upload icon

const IdentifyText = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  // State to track loading

  // Function to handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle the identify text action
  const handleIdentifyText = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setError('');
    setLoading(true);  // Set loading to true when the request starts
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Replace 'http://localhost:5001' with your deployed server URL
      const response = await fetch('http://localhost:5001/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setResponse(result.text || 'No text identified.');
    } catch (err) {
      setError('Error processing the file. Please try again.');
    } finally {
      setLoading(false);  // Set loading to false when the request finishes
    }
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
          style={{ display: 'none' }} // Hide the default input
        />
        <label htmlFor="file-input" className="custom-file-upload">
          <FaUpload className="custom-file-upload-icon" />  {/* Add the upload icon */}
        </label>
        <button onClick={handleIdentifyText} className="identify-button">
          Identify Text
        </button>
      </div>

      {/* Show loading message while processing */}
      {loading && <p className="loading-message">🤖 Please wait, generating response from the robot...</p>}

      {/* Error and success messages */}
      {error && <p className="error-message">{error}</p>}
      {response && (
        <div className="result-section">
          <h4>Extracted Text:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default IdentifyText;
