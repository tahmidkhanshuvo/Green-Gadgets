import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';

const Navbar = ({ theme, setTheme }) => {
  const navigate = useNavigate(); // Move navigate here to avoid it being inside toggle_mode

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggle theme between light and dark
  };

  const handleButtonClick = () => {
    navigate('/search'); // Navigate to the product search page
  };

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt='logo' className='logo' />
      <ul>
        <li className='ads'> <button onClick={handleButtonClick}>All Ads</button></li>
        <li className='chat'>Chat</li>
        <li className='account'>Account</li>
        <li><button>Post Ads</button></li>
      </ul>
      <img onClick={toggle_mode} src={theme === 'light' ? toggle_light : toggle_dark} alt='toggle icon' className='toggle-icon' />
    </div>
  );
};

export default Navbar;
