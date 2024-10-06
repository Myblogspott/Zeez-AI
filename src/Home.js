// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Assuming you have a Header component
import Footer from './Footer'; // Assuming you have a Footer component
import './App.css'; // Use your existing CSS file

const Home = () => {
    const navigate = useNavigate();

    const handleQuizClick = () => {
        navigate('/auth'); // Redirect to login/create account for quiz
    };

    const handleResearchClick = () => {
        navigate('/auth'); // Redirect to login/create account for research
    };

    return (
        <div className="home-container">
            <Header />
            <div className="content">
                <div className="box" onClick={handleQuizClick}>
                    Take a Quiz
                </div>
                <div className="box" onClick={handleResearchClick}>
                    Research a Topic
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
