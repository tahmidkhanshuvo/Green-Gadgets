import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import { FaHome, FaSearch, FaComment, FaUserCircle, FaPlusCircle } from 'react-icons/fa';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleButtonClick = (page) => {
    navigate(page);
  };

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt='logo' className='logo' />
      <ul>
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
        <li>
          <button onClick={() => handleButtonClick('/account')}>
            <FaUserCircle className="icon" />
            <span className="icon-text">Account</span>
          </button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/postAd')}>
            <FaPlusCircle className="icon" />
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
    </div>
  );
};

export default Navbar;
