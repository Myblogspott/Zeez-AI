import React, { useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';

function TranscriptionComponent() {
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState('');

  // Function to handle file input (e.g., audio file)
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      // Read the file as an ArrayBuffer (to get the raw bytes)
      reader.onload = async (e) => {
        const audioBytes = e.target.result;

        try {
          const result = await Predictions.convert({
            transcription: {
              source: {
                bytes: audioBytes // Pass the raw audio bytes
              }
              // You can also specify the language if needed
              // language: "en-US"
            }
          });
          
          setTranscription(result.transcription.fullText); // Set the transcription result
        } catch (err) {
          console.error('Error during transcription:', err);
          setError('Failed to transcribe the audio. Please try again.');
        }
      };

      // Read the file as ArrayBuffer to get raw bytes
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <h3>Transcribe Audio</h3>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      {transcription && (
        <div>
          <h4>Transcription:</h4>
          <p>{transcription}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default TranscriptionComponent;