import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { withAuthenticator, Authenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import TranscriptionComponent from './ATT';  // Audio-to-Text Component
import TextToSpeechComponent from './TTS';  // Text-to-Speech Component
import AuthComponent from './AuthComponent';  // Authentication Component
import './App.css';

// Feature Selection Component
function FeatureSelection() {
  const navigate = useNavigate();

  // Function to handle feature navigation
  const handleNavigation = (path) => {
    navigate(path);  // Navigating to the specified path
  };

  return (
    <div>
      <h3>Select a feature to use:</h3>
      <ul>
        <li>
          <button onClick={() => handleNavigation('/text-to-speech')}>Text to Speech</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/transcribe')}>Audio to Text (Transcription)</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/auth')}>Auth Component</button>
        </li>
        <li>
          <button onClick={() => handleNavigation('/quiz')}>Take a Quiz</button>
        </li>
      </ul>
    </div>
  );
}

// Quiz Component that fetches from Flask API
function QuizComponent() {
  const [quiz, setQuiz] = useState([]);  // State to store the fetched quiz data
  const [loadingQuiz, setLoadingQuiz] = useState(false);  // Loading state for the quiz
  const [error, setError] = useState(null);  // State for any error during quiz generation

  // Fetch quiz data from the Flask API
  async function fetchQuiz(topic, grade, difficulty) {
    setLoadingQuiz(true);  // Start loading spinner
    setError(null);  // Reset any previous errors
    try {
      const response = await fetch('http://localhost:5001/quiz', {  // Replace with deployed Flask API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic,
          grade: grade,
          difficulty: difficulty,
          num_questions: 15  // You can adjust this based on user input
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch quiz");
      }
      
      const quizData = await response.json();
      console.log(quizData);  // Log for debugging
      setQuiz(quizData);  // Update quiz state
      setLoadingQuiz(false);  // Stop loading spinner
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError("Error fetching quiz");
      setLoadingQuiz(false);  // Stop loading in case of error
    }
  }

  return (
    <div style={styles.container}>
      <h2>Zeez-AI Quiz</h2>
      {loadingQuiz ? (
        <p>Loading quiz...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        quiz.length > 0 ? (
          quiz.map((question, index) => (
            <div key={index} style={styles.quiz}>
              <h3>{question.question}</h3>
              {question.options.map((option, i) => (
                <div key={i}>
                  <input type="radio" name={`question-${index}`} value={option} />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No quiz available</p>
        )
      )}
      {/* Button to trigger quiz generation */}
      <Button onClick={() => fetchQuiz('Math', '5', 'medium')} style={styles.button}>
        Start Quiz
      </Button>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <h2>Welcome to Zeez AI!</h2>
              <button onClick={signOut}>Sign out</button>

              {/* Routes */}
              <Routes>
                <Route path="/" element={<FeatureSelection />} /> {/* Feature Selection */}
                <Route path="/auth" element={<AuthComponent />} /> {/* Auth */}
                <Route path="/text-to-speech" element={<TextToSpeechComponent />} /> {/* Text to Speech */}
                <Route path="/transcribe" element={<TranscriptionComponent />} /> {/* Transcription */}
                <Route path="/quiz" element={<QuizComponent />} /> {/* Quiz */}

                {/* Catch-all route to handle unmatched paths */}
                <Route path="*" element={<h3>Page Not Found</h3>} />
              </Routes>
            </div>
          )}
        </Authenticator>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20
  },
  quiz: {
    marginTop: 20,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 5
  },
  button: {
    backgroundColor: 'black',
    color: 'white',
    outline: 'none',
    fontSize: 18,
    padding: '12px 0px'
  }
};

export default withAuthenticator(App);
