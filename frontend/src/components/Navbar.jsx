import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; 
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  
  const { token, user, logoutUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
      await logoutUser();
      navigate('/');
  };

  return (
    <nav className='navbar'>
      
      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='logo' />
      </Link>

      {/* Center Navigation Links */}
      <ul className='nav-links'>
        <li>
          <NavLink to={'/'}>
            <p>HOME</p>
            <hr className="underline" />
          </NavLink>
        </li>

        <li>
          <NavLink to={'/collections'}>
            <p>COLLECTIONS</p>
            <hr className="underline" />
          </NavLink>
        </li>

        <li>
          <NavLink to={'/about'}>
            <p>ABOUT</p>
            <hr className="underline" />
          </NavLink>
        </li>

        <li>
          <NavLink to={'/contact'}>
            <p>CONTACT</p>
            <hr className="underline" />
          </NavLink>
        </li>
      </ul>

      {/* Right Side Icons, Profile & Cart */}
      <div className='nav-right'>
        <img src={assets.search_icon} alt="Search" className='icon' />

        {/* --- DYNAMIC PROFILE SECTION --- */}
        <div className='profile-dropdown'>
            {/* If NO token, click goes to login. If token, click does nothing (hover triggers menu) */}
            <Link to={token ? '#' : '/login'}>
                <img src={assets.profile_icon} alt="Profile" className='icon' />
            </Link>

            {/* ONLY render the dropdown menu if the user is actually logged in */}
            {token && (
                <div className='dropdown-menu'>
                    <div className='dropdown-content'>
                        <p>My Profile</p>
                        <p>Orders</p>
                        
                        {/* Only show this if the logged-in user is an admin */}
                        {user && user.role === 'admin' && (
                            <p style={{ color: '#2563eb', fontWeight: 'bold' }}>Admin Panel</p>
                        )}
                        
                        {/* Wire up the logout function here */}
                        <p className='logout-text' onClick={handleLogout}>Logout</p> 
                    </div>
                </div>
            )}
        </div>

        {/* Cart Icon Section */}
        <Link to='/cart' className='cart-link'>
          <img src={assets.cart_icon} alt="Cart" className='icon' />
          <p className='cart-count'>0</p> 
        </Link>

        {/* Menu Icon (Mobile) */}
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt="Menu" className='menu-icon' />

      </div>

      {/* Mobile Sidebar Menu */}
      <div className={`sidebar-menu ${visible ? 'visible' : ''}`}>
        <div className='sidebar-content'>
          <div onClick={() => setVisible(false)} className='sidebar-back'>
            <img src={assets.dropdown_icon} alt="back" className='back-icon' />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to={'/'}>Home</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to={'/collections'}>Collection</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to={'/about'}>About</NavLink>
          <NavLink onClick={() => setVisible(false)} className='sidebar-link' to={'/contact'}>Contact</NavLink>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;