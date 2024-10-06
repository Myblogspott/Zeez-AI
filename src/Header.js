// src/Header.js
import React from 'react';

const Header = () => {
    return (
        <header>
            <h1>Your App Title</h1>
            <nav>
                <a href="/auth">Sign In</a> | <a href="/auth">Create Account</a>
            </nav>
        </header>
    );
};

export default Header;
