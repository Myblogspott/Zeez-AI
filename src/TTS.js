// TextToSpeechComponent.js

import React, { useState } from 'react';
import { Predictions } from '@aws-amplify/predictions';

function TextToSpeechComponent() {
  const [textToGenerateSpeech, setTextToGenerateSpeech] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const handleTextToSpeech = () => {
    Predictions.convert({
      textToSpeech: {
        source: {
          text: textToGenerateSpeech
        },
        voiceId: "Amy"  // Choose any supported voice
      }
    })
    .then(result => {
      const audioUrl = result.speech.url;
      setAudioUrl(audioUrl);
    })
    .catch(err => {
      console.error('Error generating speech:', err);
    });
  };

  return (
    <div>
      <h3>Convert Text to Speech</h3>
      <textarea
        value={textToGenerateSpeech}
        onChange={(e) => setTextToGenerateSpeech(e.target.value)}
        placeholder="Enter text to convert to speech"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleTextToSpeech}>Convert to Speech</button>

      {audioUrl && (
        <div>
          <h4>Generated Speech:</h4>
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default TextToSpeechComponent;
