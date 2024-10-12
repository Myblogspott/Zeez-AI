import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';

function SubmitPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, userAnswers } = location.state || {};

  if (!questions || !userAnswers) {
    return (
      <div style={styles.container}>
        <h3>Invalid Data. Please try again.</h3>
        <Button variation="primary" onClick={() => navigate('/quiz')}>
          Take Another Quiz
        </Button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Quiz Results</h2>
      {questions.map((questionData, index) => (
        <div key={index} style={styles.quizItem}>
          <h4 style={styles.question}>{index + 1}. {questionData.question}</h4>
          <p style={userAnswers[index] === questionData.correctAnswer ? styles.correctAnswer : styles.wrongAnswer}>
            Your answer: {userAnswers[index] || 'Not answered'}
          </p>
          <p style={styles.correctAnswerText}>
            Correct answer: {questionData.correctAnswer}
          </p>
          <p style={styles.explanation}>
            Explanation: {questionData.explanation}
          </p>
        </div>
      ))}
      <Button variation="primary" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </div>
  );
}

// Updated styles for the SubmitPage
const styles = {
  container: {
    width: '80%',
    margin: '20px auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  quizItem: {
    width: '100%',
    margin: '10px 0',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  },
  question: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  correctAnswer: {
    color: 'green',
    fontWeight: 'bold',
  },
  wrongAnswer: {
    color: 'red',
    fontWeight: 'bold',
  },
  correctAnswerText: {
    color: '#333',
    fontWeight: 'bold',
    marginTop: '5px',
  },
  explanation: {
    color: '#555',
    marginTop: '5px',
  },
};

export default SubmitPage;
