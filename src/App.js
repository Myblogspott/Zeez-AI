import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react'; 
import Header from './Header';  
import Footer from './Footer';  
import { QuizComponent } from './QuizApp';  // Import the merged QuizComponent
import AuthComponent from './AuthComponent'; 
import TranscriptionComponent from './ATT'; 
import TextToSpeechComponent from './TTS';
import IdentityText from './IdentityText';
import ChatComponent from './ChatComponent';
import SubmitPage from './SubmitPage';
import Homepage from './Homepage';  // Import the updated Homepage component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Authenticator>
          {({ signOut }) => (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/auth" element={<AuthComponent />} />
                <Route path="/text-to-speech" element={<TextToSpeechComponent />} />
                <Route path="/transcribe" element={<TranscriptionComponent />} />
                <Route path="/quiz" element={<QuizComponent />} />
                <Route path="/identify-text" element={<IdentityText />} />
                <Route path="/chat" element={<ChatComponent />} />
                <Route path="/submit" element={<SubmitPage />} />
                <Route path="*" element={<h3>Page Not Found</h3>} />
              </Routes>
              <Footer />
            </>
          )}
        </Authenticator>
      </div>
    </Router>
  );
};

export default App;
