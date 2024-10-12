import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Flex, Heading, Text, View, Grid } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import '@aws-amplify/ui-react/styles.css';

const OPENAI_API_KEY = "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";  // Replace with your OpenAI API key

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Initialize navigate for redirection

  useEffect(() => {
    if (timeLeft > 0 && questions.length > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0 && !submitted) {
      alert("Time's up! The quiz will end now.");
      setSubmitted(true);
    }
  }, [timeLeft, questions.length, submitted]);

  const fetchQuestions = async (topic, questionCount, timeLimit) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Generate ${questionCount} quiz questions about ${topic} with four options each and indicate the correct answer for each question in the following format:\nQuestion: <question text>\nOptions: <option 1>, <option 2>, <option 3>, <option 4>\nCorrect Answer: <correct option>\nExplanation: <explanation for the correct answer>\n`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.5,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const generatedQuestionsText = response.data.choices[0].message.content.trim();
      const questionBlocks = generatedQuestionsText.split('\nQuestion: ');
      const generatedQuestions = questionBlocks.slice(1).map((block) => {
        const [questionTextLine, optionsLine, correctAnswerLine, explanationLine] = block.split('\n');
        const questionText = questionTextLine.trim();
        const options = optionsLine.replace('Options: ', '').split(', ').map(option => option.trim());
        const correctAnswer = correctAnswerLine.replace('Correct Answer: ', '').trim();
        const explanation = explanationLine.replace('Explanation: ', '').trim();
        return { questionText, options, correctAnswer, explanation };
      });

      setQuestions(generatedQuestions);
      setTimeLeft(timeLimit); // Set the timer based on the selected quiz format
    } catch (error) {
      console.error("Error fetching questions: ", error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    setShowCorrectAnswer(false);
    setSelectedOption("");
    setExplanation("");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitAnswer = () => {
    setShowCorrectAnswer(true);
    setExplanation(questions[currentQuestionIndex].explanation);
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleGenerateQuiz = () => {
    const topic = prompt("Enter a topic for the quiz:");
    if (topic) {
      const quizFormat = prompt("Choose a quiz format: 1 for 15 questions (3 minutes), 2 for 25 questions (5 minutes), 3 for 40 questions (10 minutes):");
      let questionCount, timeLimit;
      switch (quizFormat) {
        case "1":
          questionCount = 15;
          timeLimit = 180;
          break;
        case "2":
          questionCount = 25;
          timeLimit = 300;
          break;
        case "3":
          questionCount = 40;
          timeLimit = 600;
          break;
        default:
          alert("Invalid choice. Please enter 1, 2, or 3.");
          return;
      }
      fetchQuestions(topic, questionCount, timeLimit);
    }
  };

  const handleQuizSubmit = () => {
    // This will redirect to the homepage after submitting the quiz
    alert('Quiz Submitted! Redirecting to Homepage...');
    navigate('/');  // Redirect to the homepage
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View backgroundColor="#f0f0f0" padding="2rem">
      <Card variation="outlined">
        <Flex direction="column" alignItems="center" gap="1rem">
          <Heading level={3}>Zeez AI Quizzes</Heading>
          {questions.length === 0 ? (
            <Button onClick={handleGenerateQuiz} variation="primary" size="large">
              Generate Quiz
            </Button>
          ) : (
            <>
              <Text>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
              <Text>Score: {score} / {questions.length}</Text>
              <Heading level={4}>{currentQuestion.questionText}</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variation={selectedOption === option ? "primary" : "default"}
                    onClick={() => handleOptionClick(option)}
                    isDisabled={showCorrectAnswer}
                  >
                    {option}
                  </Button>
                ))}
              </Grid>
              {showCorrectAnswer && (
                <Text>
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <Text color="green">Correct! The answer is {currentQuestion.correctAnswer}.</Text>
                  ) : (
                    <Text color="red">Incorrect. The correct answer is {currentQuestion.correctAnswer}.</Text>
                  )}
                  <br />
                  Explanation: {explanation}
                </Text>
              )}
              <Flex direction="column" gap="1rem" alignItems="center">
                {!showCorrectAnswer ? (
                  <Button onClick={handleSubmitAnswer} isDisabled={!selectedOption} variation="primary">
                    Submit Answer
                  </Button>
                ) : currentQuestionIndex < questions.length - 1 ? (
                  <Button onClick={handleNextQuestion} variation="secondary">
                    Next Question
                  </Button>
                ) : (
                  <>
                    <Heading level={5}>You've completed the quiz! Your final score is {score} / {questions.length}</Heading>
                    <Button
                      variation="primary"
                      onClick={handleQuizSubmit}  // Use the function to navigate back to the homepage
                      style={{ marginTop: '1rem' }}
                    >
                      Submit Quiz
                    </Button>
                  </>
                )}
              </Flex>
            </>
          )}
        </Flex>
      </Card>
    </View>
  );
};

export { QuizComponent };
