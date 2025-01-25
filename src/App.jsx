import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/Home';

const App = () => {
  const current_theme = localStorage.getItem('current_theme') || 'light';
  const [theme, setTheme] = useState(current_theme);

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <div
      className={`container ${theme}`}
      style={{
        minHeight: '100vh', // Ensure the background covers the entire viewport
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{ flex: 1 }}>
        <HomePage />
      </div>
      <Footer />
    </div>
  );
};

export default App;
