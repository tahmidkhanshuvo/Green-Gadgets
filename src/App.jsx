import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

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
      <div style={{ flex: 1 }}></div> {/* Spacer to push footer to bottom */}
      <Footer />
    </div>
  );
};

export default App;
