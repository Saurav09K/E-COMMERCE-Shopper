import React, { useState } from 'react';
import Login from './components/Login';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div className="app-container">
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <div className="admin-dashboard">
            <h1>Welcome to the Control Room, Boss.</h1>
            <button onClick={() => setToken('')}>Logout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;