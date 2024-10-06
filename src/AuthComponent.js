// AuthComponent.js

import React from 'react';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function AuthComponent() {
  return (
    <div>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h2>Welcome, {user.username}!</h2>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(AuthComponent);

