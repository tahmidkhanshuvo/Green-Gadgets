import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/Home';
import ProductSearch from './components/Product-Search/Product-Search';
import UserAccount from './components/Account/UserAccount';
import PostAd from './components/Post_ad/PostAd';
import AboutUs from './components/About_us/AboutUs';
import ProductDetails from './components/Product_Details/ProductDetails';
import Blog from './components/Blog/Blog';
import LoginSignup from './components/Account/LoginSignup';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('current_theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div
        className={`container ${theme}`}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Navbar theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setUser={setUser} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/postAd" element={<PostAd />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/" element={<ProductSearch />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog themeMode={theme} />} />
            <Route
              path="/account"
              element={isAuthenticated ? <UserAccount user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<LoginSignup setIsAuthenticated={setIsAuthenticated} setUser={setUser} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
