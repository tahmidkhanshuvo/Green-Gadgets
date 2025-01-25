import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/Home';
import ProductSearch from './components/Product-Search/Product-Search';
import UserAccount from './components/Account/UserAccount';
import PostAd from './components/Post_Ad/PostAd';

const App = () => {
  const current_theme = localStorage.getItem('current_theme') || 'light';
  const [theme, setTheme] = useState(current_theme);

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
    <Router>
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/postAd" element={<PostAd />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
