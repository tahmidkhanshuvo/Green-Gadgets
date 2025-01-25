import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>About Us</h4>
        <ul>
          <li>Our Story</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Resources</h4>
        <ul>
          <li>Blog</li>
          <li>Help Center</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer-section social-icons">
        <h4>Follow Us</h4>
        <img src="https://static.vecteezy.com/system/resources/previews/018/930/476/non_2x/facebook-logo-facebook-icon-transparent-free-png.png" alt="Facebook" />
        <img src="https://static.vecteezy.com/system/resources/thumbnails/027/395/710/small_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="Twitter" />
        <img src="https://static.vecteezy.com/system/resources/previews/042/148/632/non_2x/instagram-logo-instagram-social-media-icon-free-png.png" alt="Instagram" />
      </div>
      <div className="footer-section download-buttons">
        <h4>Get Our App</h4>
        <img src="https://w7.pngwing.com/pngs/961/859/png-transparent-google-play-android-app-store-apple-android-text-rectangle-logo.png" alt="Google Play" />
        <img src="https://e7.pngegg.com/pngimages/1015/380/png-clipart-app-store-logo-iphone-app-store-google-play-apple-app-store-electronics-text.png" alt="App Store" />
      </div>
      <div className="footer-bottom">&copy; 2025 Green Gadgets. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
