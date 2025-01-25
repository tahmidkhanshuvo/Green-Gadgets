import React, { useEffect, useState } from 'react'; 
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import UserAccount from './components/Account/UserAccount';
import PostAd from './components/Post_Ad/PostAd';

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');
  const [currentPage, setCurrentPage] = useState('home'); // Manage navigation

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  const renderPage = () => {
    switch (currentPage) {
      case 'account':
        return <UserAccount />;
      case 'postAd':
        return <PostAd />;
      default:
        return (
          <div className="welcome-page">
            <h1>Welcome to Green Gadget BD!</h1>
            <p>Your trusted platform for buying, selling, and recycling gadgets.</p>
          </div>
        );
    }
  };

  return (
    <div
      className={`container ${theme}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar theme={theme} setTheme={setTheme} setCurrentPage={setCurrentPage} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
};

export default App;
