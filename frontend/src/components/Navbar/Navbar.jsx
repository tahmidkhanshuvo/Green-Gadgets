import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext"; // ✅ Import AuthContext
import './Navbar.css';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import { FaBars, FaTimes, FaSearch, FaComment, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // ✅ Use AuthContext
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
        <img src={theme === 'light' ? logo_light : logo_dark} alt='logo' className='logo' />

        <ul className='desktop-menu'>
          <li className='ads'>
            <button onClick={() => handleButtonClick('/search')}>
              <FaSearch className="icon" />
              <span className="icon-text">Search</span>
            </button>
          </li>
          <li className='chat'>
            <button onClick={() => handleButtonClick('/chat')}>
              <FaComment className="icon" />
              <span className="icon-text">Chat</span>
            </button>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <button onClick={() => handleButtonClick('/account')}>
                  <FaUserCircle className="icon" />
                  <span className="icon-text">Account</span>
                </button>
              </li>
              <li>
                <button onClick={logout}>
                  <FaSignOutAlt className="icon" />
                  <span className="icon-text">Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => handleButtonClick('/login')}>
                <FaUserCircle className="icon" />
                <span className="icon-text">Login / Sign Up</span>
              </button>
            </li>
          )}

          <li className='post-ads'>
            <button onClick={() => handleButtonClick('/postAd')} className="post-ads-button">
              <span className="icon-text">Post Free Ads</span>
            </button>
          </li>
        </ul>

        <img
          onClick={toggle_mode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt='toggle icon'
          className='toggle-icon'
        />

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
          <FaBars />
        </button>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
          <FaTimes />
        </button>

        <ul>
          <li>
            <button onClick={() => handleButtonClick('/search')}>
              <FaSearch className="icon" /> Search
            </button>
          </li>
          <li>
            <button onClick={() => handleButtonClick('/chat')}>
              <FaComment className="icon" /> Chat
            </button>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <button onClick={() => handleButtonClick('/account')}>
                  <FaUserCircle className="icon" /> Account
                </button>
              </li>
              <li>
                <button onClick={logout}>
                  <FaSignOutAlt className="icon" /> Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => handleButtonClick('/login')}>
                <FaUserCircle className="icon" /> Login / Sign Up
              </button>
            </li>
          )}

          <li>
            <button onClick={() => handleButtonClick('/postAd')} className="post-ads-button">
              📢 Post Free Ads
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
