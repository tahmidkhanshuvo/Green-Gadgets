import { useState, useEffect } from 'react';
import { FaLeaf, FaShieldAlt, FaRecycle, FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';  
import './Home.css';

// Import images
import image1 from '../../assets/Home/image1.jpg';
import image2 from '../../assets/Home/image2.jpg';
import image3 from '../../assets/Home/image3.jpg';
import ecoImage from '../../assets/Home/gg.jpg'; // Replace with actual image path
import qualityImage from '../../assets/Home/gg.jpg'; // Replace with actual image path
import affordabilityImage from '../../assets/Home/gg.jpg'; // Replace with actual image path


const images = [image1, image2, image3];

export default function HomePage({ theme }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`home-container ${theme}`}>
      <div
        className="home-background"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>

      <div className="home-overlay">
        <h1 className="home-title">Welcome to Green Gadgets</h1>
        <input
          type="text"
          placeholder="Search for products..."
          className="home-search-box"
        />
        <div className="home-buttons">
          <button className="home-button">
            <FaRecycle /> Recycled
          </button>
          <button className="home-button">
            <FontAwesomeIcon icon={faScrewdriverWrench} /> Refurbished
          </button>
          <button className="home-button">
            <FaTrashAlt /> E-waste
          </button>
        </div>
      </div>

      <div className="home-info">
      <h2>Why Choose Green Gadgets?</h2>
      <div className="info-container">
        <div className="info-item">
          <img src={ecoImage} alt="Eco-friendly" className="info-image" />
          <div className="info-text">
            <h3>Eco-Friendly Practices</h3>
            <p>
              We are committed to sustainability by offering eco-friendly
              products that contribute to reducing electronic waste. Choosing
              Green Gadgets means you are supporting the environment and helping
              reduce the carbon footprint.
            </p>
          </div>
        </div>

        <div className="info-item reverse">
          <img src={qualityImage} alt="Quality Assurance" className="info-image" />
          <div className="info-text">
            <h3>Quality Assurance</h3>
            <p>
              Every product we offer undergoes rigorous testing to ensure
              that it meets the highest standards. Our refurbished electronics
              are thoroughly checked for functionality, durability, and quality,
              providing you with reliable and long-lasting products.
            </p>
          </div>
        </div>

        <div className="info-item">
          <img src={affordabilityImage} alt="Affordability" className="info-image" />
          <div className="info-text">
            <h3>Affordable Prices</h3>
            <p>
              We believe that technology should be accessible to everyone. Our
              products are priced affordably to ensure that you can enjoy
              high-quality electronics without breaking the bank.
            </p>
          </div>
        </div>
      </div>
    </div>

      <div className="home-features">
        <h2>Our Features</h2>
        <ul>
        <li>
          <FaLeaf className="feature-icon" />
          <span>Eco-friendly products</span>
        </li>
        <li>
          <FaShieldAlt className="feature-icon" />
          <span>Quality assurance on refurbished electronics</span>
        </li>
        <li>
          <FaRecycle className="feature-icon" />
          <span>Contribution to reducing e-waste</span>
        </li>
        </ul>
      </div>

      <div className="home-testimonials">
        <h2>What Our Customers Say</h2>
        <p>"Green Gadgets helped me save money and contribute to a greener planet!"</p>
        <p>"Excellent customer service and great products! Highly recommend."</p>
      </div>

      <div className="home-statistics">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Recycled Products</p>
          </div>
          <div className="stat-item">
            <h3>300+</h3>
            <p>Refurbished Devices</p>
          </div>
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
