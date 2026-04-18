import React from 'react';
import '../css/Navbar.css';

const Navbar = ({ setToken }) => {
    return (
        <div className="admin-navbar">
            <h2 className="admin-logo">ShopMates <span className="text-gray">PANEL</span></h2>
            <button onClick={() => setToken('')} className="logout-btn">Logout</button>
        </div>
    );
};

export default Navbar;