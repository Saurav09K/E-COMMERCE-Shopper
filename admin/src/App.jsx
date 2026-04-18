import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


const App = () => {
  const [token, setToken] = useState(''); // The master key!

  return (
    <div className="app-container">
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {/* Top Navigation */}
          <Navbar setToken={setToken} />
          <hr className="admin-hr" />
          
          {/* Main Dashboard Area */}
          <div className="admin-main-content">
            
            {/* Left Sidebar */}
            <Sidebar />
            
            {/* Right Side: Where the actual pages load */}
            <div className="admin-page-content">
                <h2>Select an option from the sidebar to get started.</h2>
              {/* WE WILL UNCOMMENT THIS ONCE WE BUILD THE PAGES! */}
              {/* <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes> */}
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default App;