import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuthenticator } from '@aws-amplify/ui-react';

function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthenticator((context) => [context.user]); // Check the authentication state

  const handleNavigation = (path) => {
    navigate(path);  // Navigating to the specified path
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* Make the logo clickable */}
        <h1 onClick={() => handleNavigation('/')} style={{ cursor: 'pointer' }}>
          Zeez AI
        </h1>
      </div>
      <div className="header-center">
        <button onClick={() => handleNavigation('/identify-text')}>Generate Text from Image</button>
        <button onClick={() => handleNavigation('/text-to-speech')}>Text to Speech</button>
      </div>
      <div className="header-right">
        {user ? (
          // If logged in, show Sign out button
          <button onClick={signOut}>Sign out</button>
        ) : (
          // If not logged in, show Login and Signup buttons
          <>
            <button onClick={() => handleNavigation('/auth')}>Log in</button>
            <button onClick={() => handleNavigation('/auth')}>Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
