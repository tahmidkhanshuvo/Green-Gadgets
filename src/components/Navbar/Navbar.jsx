import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import { FaBars, FaComment, FaUserCircle } from 'react-icons/fa';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleButtonClick = (page) => {
    navigate(page);
    setMobileMenuOpen(false); // Close menu on navigation
  };

  return (
    <>
      <div className='navbar'>
        {/* Logo - Click to go home */}
        <img 
          src={theme === 'light' ? logo_light : logo_dark} 
          alt='logo' 
          className='logo' 
          onClick={() => handleButtonClick('/')} // Redirect to Home
          style={{ cursor: 'pointer' }} // Ensure it's clickable
        />

        {/* Main Menu (Hidden on Mobile) */}
        <ul className='desktop-menu'>
          <li className='ads'>
            <button onClick={() => handleButtonClick('/search')}>
              <span className="icon-text">All Ads</span>
            </button>
          </li>
          <li className='chat'>
            <button onClick={() => handleButtonClick('/chat')}>
              <FaComment className="icon" />
              <span className="icon-text">Chat</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/account')}>
              <FaUserCircle className="icon" />
              <span className="icon-text">Account</span>
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/postAd')}>
              <span className="icon-text">Post Free Ads</span>
            </button>
          </li>
        </ul>

        {/* Toggle Theme Icon */}
        <img
          onClick={toggle_mode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt='toggle icon'
          className='toggle-icon'
        />

        {/* Mobile Menu Toggle Button (☰) */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Side Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Mobile Menu Items */}
        <ul>
          <li>
            <button onClick={() => handleButtonClick('/search')}>
              Search
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/chat')}>
              <FaComment className="icon" /> Chat
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/account')}>
              <FaUserCircle className="icon" /> Account
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/postAd')}>
              📢 Post Free Ads
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
