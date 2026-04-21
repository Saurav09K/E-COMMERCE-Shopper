import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';

const App = () => {
  const [token, setToken] = useState(''); 

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
            
            <div className="admin-page-content">
                <h2>Select an option from the sidebar to get started.</h2>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                {/* <Route path='/orders' element={<Orders token={token} />} /> */}
              </Routes> 
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default App;