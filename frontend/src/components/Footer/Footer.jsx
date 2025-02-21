import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link from React Router
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li>
              <Link to="/about" className="footer-link">Our Story</Link> {/* ✅ Redirects to About Us */}
            </li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Explore Section */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>
  <Link to="/blog" className="footer-link">Blog</Link>
</li>

            <li>Affiliate Program</li>
            <li>Partners</li>
            <li>Community</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Download Section */}
        <div className="footer-section download-section">
          <h4>Get Our App</h4>
          <div className="app-links">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="app-badge"
              />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="app-badge"
              />
            </a>
          </div>
        </div>
      </div>

      <hr className="footer-line" />

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025. All rights reserved. Green Gadgets BD Limited.</p>
      </div>
    </footer>
  );
};

export default Footer;
