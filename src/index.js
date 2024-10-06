import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import Amplify and the auto-generated configuration from aws-exports.js
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';  // Import the Amplify configuration

// Configure Amplify using the aws-exports.js file
Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: for performance monitoring
reportWebVitals();
