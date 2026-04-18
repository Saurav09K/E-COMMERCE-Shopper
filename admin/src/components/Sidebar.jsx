import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-links">
                
                <NavLink className="sidebar-item" to="/add">
                    <p>Add Items</p>
                </NavLink>

                <NavLink className="sidebar-item" to="/list">
                    <p>List Items</p>
                </NavLink>

                <NavLink className="sidebar-item" to="/orders">
                    <p>Orders</p>
                </NavLink>

            </div>
        </div>
    );
};

export default Sidebar;