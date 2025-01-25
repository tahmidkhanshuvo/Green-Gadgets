import { useState, useEffect } from 'react';
import { FaRecycle, FaTools, FaTrashAlt } from 'react-icons/fa';
import './Home.css';

const images = [
  '/assets/Home/image1.jpg',
  '/assets/Home/image2.jpg',
  '/assets/Home/image3.jpg'
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
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
            <FaTools /> Refurbished
          </button>
          <button className="home-button">
            <FaTrashAlt /> E-waste
          </button>
        </div>
      </div>
      <div className="home-info">
        <h2>Why Choose Green Gadgets?</h2>
        <p>
          We provide the best recycled and refurbished electronics, ensuring sustainability and affordability.
          Join us in making the world a greener place by responsibly managing e-waste.
        </p>
      </div>
    </div>
  );
}
