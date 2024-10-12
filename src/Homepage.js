import React from 'react';
import { Button, Heading, Text, Flex } from '@aws-amplify/ui-react';  // Import necessary components
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="content">
      <Heading level={3} align="center">Welcome to Zeez AI</Heading>
      <Text align="center" marginBottom="1rem">An AI-powered platform for quizzes and topic research.</Text>
      <Flex direction="row" justifyContent="center" gap="1rem">
        {/* Adjusting the "Take a Quiz" button */}
        <Button
          variation="primary"
          size="large"
          onClick={() => navigate('/quiz')}
          style={{
            backgroundColor: '#4CAF50', // Set the background color to match the theme
            color: 'white',              // Set text color to whit             // Remove border
            padding: '10px 20px',        // Add padding for better visuals
            fontSize: '16px'             // Adjust font size
          }}
        >
          Take a Quiz
        </Button>

        {/* Adjusting the "Research a Topic" button */}
        <Button
          variation="secondary"
          size="large"
          onClick={() => navigate('/chat')}
          style={{
            backgroundColor: '#4CAF50',  // Green background
            color: 'white',              // White text
            padding: '10px 20px',        // Add padding for better visuals
            fontSize: '16px'             // Adjust font size
          }}
        >
          Research a Topic
        </Button>
      </Flex>
    </div>
  );
};

export default Homepage;
