import { useState, useEffect } from 'react';
import { FaLeaf, FaShieldAlt, FaRecycle, FaTrashAlt } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

// Import images
import image1 from '../../assets/Home/image1.jpg';
import image2 from '../../assets/Home/image2.jpg';
import image3 from '../../assets/Home/image3.jpg';
import ecoImage from '../../assets/Home/gg.jpg'; // Replace with actual image path
import qualityImage from '../../assets/Home/gg.jpg'; // Replace with actual image path
import affordabilityImage from '../../assets/Home/gg.jpg'; // Replace with actual image path

const images = [image1, image2, image3];
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Dummy data for testimonials slider
const testimonialsData = [
  {
    quote: "Green Gadgets has transformed my business by offering sustainable solutions that not only reduce waste but also cut costs significantly. Highly recommended for any forward-thinking entrepreneur in Bangladesh.",
    customer: "Rifat Chowdhury Roni",
    image: "https://www.shutterstock.com/image-photo/happy-bangladesh-business-man-holding-600nw-391133695.jpg",
  },
  {
    quote: "The quality of refurbished products is exceptional, and the service is truly top-notch. I am proud to support an eco-friendly initiative that benefits both my business and the community.",
    customer: "Md. Hasibuzzaman Tuhin",
    image: "https://www.tuhinhossainphotography.com/wp-content/themes/tuhin-photography/assets/img/corporate/large/CORPORATE-PHOTO_19.jpg",
  },
  {
    quote: "As a small business owner in Dhaka, I appreciate how Green Gadgets provides reliable electronics at affordable prices while actively promoting environmental sustainability.",
    customer: "Sadia Akhter",
    image: "https://businessinspection.com.bd/wp-content/uploads/2022/09/Samira-Zuberi-Himika-1.jpg", // Replace with a real image URL
  },
  {
    quote: "Their commitment to quality and sustainable practices is evident in every product. Green Gadgets sets a high standard in the industry, and I am delighted with the results.",
    customer: "Arifa Hossain",
    image: "https://st2.depositphotos.com/37996792/42271/i/450/depositphotos_422718976-stock-photo-pretty-young-indian-woman-using.jpg", // Replace with a real image URL
  },
  {
    quote: "I am extremely satisfied with the exceptional customer service and innovative eco-friendly products offered by Green Gadgets. It’s a true game changer for the local market.",
    customer: "Anika Tasnim",
    image: "https://www.sumitomocorp.com/jp/-/media/Images/hq/Enriching/0012/contents_kv.jpg",
  },
];


export default function HomePage({ theme }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [randomBlogs, setRandomBlogs] = useState([]);
  
  // Testimonial slider state with fade effect
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");
  
  // Impact counters
  const [recycledCount, setRecycledCount] = useState(0);
  const [refurbishedCount, setRefurbishedCount] = useState(0);
  const [happyCustomersCount, setHappyCustomersCount] = useState(0);

  // SLIDER: Cycle background images (unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch blogs and select 3 random ones
  useEffect(() => {
    const fetchRandomBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blog`);
        const shuffled = data.sort(() => 0.5 - Math.random());
        setRandomBlogs(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchRandomBlogs();
  }, []);

  // Testimonial slider auto cycle with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
        setFadeClass("fade-in");
      }, 500); // 500ms fade duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animate impact counters using requestAnimationFrame
  useEffect(() => {
    const targetRecycled = 500;
    const targetRefurbished = 300;
    const targetHappy = 1000;
    const duration = 2000; // 2 seconds animation
    let startTime;
    let animationFrame;

    function update(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setRecycledCount(Math.floor(progress * targetRecycled));
      setRefurbishedCount(Math.floor(progress * targetRefurbished));
      setHappyCustomersCount(Math.floor(progress * targetHappy));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(update);
      }
    }
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
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

      {/* Elaborate Features Section */}
      <div className="home-features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Eco-Friendly</h3>
            <p>
              We offer products that are environmentally sustainable and help reduce waste.
            </p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faScrewdriverWrench} className="feature-icon" />
            <h3>Refurbished Quality</h3>
            <p>
              All our refurbished electronics undergo stringent quality checks for reliability.
            </p>
          </div>
          <div className="feature-card">
            <FaRecycle className="feature-icon" />
            <h3>Recycling Commitment</h3>
            <p>
              We are dedicated to recycling electronic components to minimize environmental impact.
            </p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Trusted Assurance</h3>
            <p>
              Our products come with quality assurance and comprehensive warranties for peace of mind.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section with improved fade transition */}
      <div className="home-testimonials">
        <h2>What Our Customers Say</h2>
        <div className={`testimonial-slider ${fadeClass}`}>
          <div className="testimonial-card">
            <img
              src={testimonialsData[testimonialIndex].image}
              alt={testimonialsData[testimonialIndex].customer}
            />
            <p className="testimonial-quote">
              "{testimonialsData[testimonialIndex].quote}"
            </p>
            <p className="testimonial-customer">
              - {testimonialsData[testimonialIndex].customer}
            </p>
          </div>
        </div>
      </div>

      {/* Impact Counters Section */}
      <div className="home-statistics">
        <h2>Our Impact</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>{recycledCount}+</h3>
            <p>Recycled Products</p>
          </div>
          <div className="stat-item">
            <h3>{refurbishedCount}+</h3>
            <p>Refurbished Devices</p>
          </div>
          <div className="stat-item">
            <h3>{happyCustomersCount}+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Latest from Our Blog Section */}
      {randomBlogs.length > 0 && (
        <div className="home-blogs">
          <h2>Latest from Our Blog</h2>
          <div className="blogs-grid">
            {randomBlogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <img
                  src={
                    blog.images && blog.images[0]
                      ? blog.images[0]
                      : "https://via.placeholder.com/300"
                  }
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3>{blog.title}</h3>
                  <p>{blog.shortDescription}</p>
                  <Link to={`/blog/${blog._id}`} className="read-more">
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
