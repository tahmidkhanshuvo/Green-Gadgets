import React from 'react'; 
import './Navbar.css';
import logo_light from '../../assets/logo-black.png';
import logo_dark from '../../assets/logo-white.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';

const Navbar = ({ theme, setTheme, setCurrentPage }) => {
  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <div className='navbar'>
      <img src={theme === 'light' ? logo_light : logo_dark} alt='logo' className='logo' />
      <ul>
        <li className='ads' onClick={() => setCurrentPage('home')}>All Ads</li>
        <li className='chat' onClick={() => alert('Chat functionality coming soon!')}>Chat</li>
        <li className='account' onClick={() => setCurrentPage('account')}>Account</li>
        <li>
          <button onClick={() => setCurrentPage('postAd')}>+</button>
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
