import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';
import { FaHome, FaSearch, FaComment, FaUserCircle, FaPlusCircle } from 'react-icons/fa'; // Imported icon library

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate(); // Move navigate here to avoid it being inside toggle_mode

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle theme between light and dark
  };

  const handleButtonClick = (page) => {
    navigate(page); // Navigate to the specific page passed in the argument
  };

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt='logo' className='logo'  />
      <ul>
        <li className='ads'>
          <button onClick={() => handleButtonClick('/search')}><FaSearch /></button>
        </li>
        <li className='chat'>
          <button onClick={() => handleButtonClick('/chat')}><FaComment /></button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/account')}><FaUserCircle /></button>
        </li>
        <li>
          <button onClick={() => handleButtonClick('/post')}><FaPlusCircle /></button>
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
