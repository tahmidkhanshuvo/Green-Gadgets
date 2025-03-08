import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductDetails.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isContactRevealed, setIsContactRevealed] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/ad/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <p className="loading-text">Loading product details...</p>;

  // Slick Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <button className="slick-prev">❮</button>,
    nextArrow: <button className="slick-next">❯</button>,
  };

  // Handler for sending a message directly to the seller using email lookup
  const handleSendMessage = async () => {
    // Check if a user is logged in (from localStorage)
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    // Use the seller's email from the product (assuming product.email is the seller's email)
    const sellerEmail = product.email;
    if (!sellerEmail) {
      console.error("Seller email not available");
      return;
    }

    try {
      // Lookup the seller by email
      const sellerResponse = await axios.get(`${API_URL}/api/users/email/${sellerEmail}`);
      const sellerData = sellerResponse.data;
      if (!sellerData || !sellerData._id) {
        console.error("Seller not found");
        return;
      }

      // Create (or retrieve) a chat between logged-in user and seller using their IDs
      const chatResponse = await axios.post(`${API_URL}/api/chats`, {
        participants: [loggedInUser._id, sellerData._id],
      });
      const chatId = chatResponse.data._id;

      // Optionally, send a default message here (if you wish)
      // For example:
      // await axios.post(`${API_URL}/api/chats/message`, {
      //   chatId,
      //   sender: loggedInUser._id,
      //   text: `Hi, I'm interested in your product: ${product.title}`
      // });

      // Navigate to the chat page
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

  return (
    <div className="product-details-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        Home &gt; {product.category} &gt; {product.subCategory}
      </div>

      <div className="product-details-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Image Slider */}
          <div className="image-slider">
            <Slider {...settings}>
              {product.images.map((image, index) => (
                <div key={index} className="slide">
                  <img src={image} alt={`Product ${index + 1}`} className="slider-image" />
                </div>
              ))}
            </Slider>
          </div>

          {/* Title & Metadata */}
          <h1 className="product-title">{product.title}</h1>
          <div className="product-meta">
            <p>Posted on: {new Date(product.createdAt).toDateString()}</p>
            <p>Location: {product.location}</p>
          </div>

          {/* Price */}
          <div className="product-price">৳ {product.price}</div>

          {/* Product Features */}
          <div className="features-container">
            <h2>Features</h2>
            <ul className="features-list">
              {Object.entries(product.details).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="description-section">
            <h2>Description</h2>
            <p>{product.description}</p>
          </div>

          {/* Report Button */}
          <button className="report-button">Report</button>
        </div>

        {/* Right Section (Seller Info, Contact, etc.) */}
        <div className="right-section">
          <div className="seller-card">
            <img
              src="https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465_640.png"
              alt="Seller Avatar"
              className="user-avatar"
            />
            <div className="seller-info">
              <h3>{product.name}</h3>
              <p>{product.email}</p>
            </div>

            {/* Reveal Contact Button */}
            <button
              className={`contact-button ${isContactRevealed ? "revealed" : ""}`}
              onClick={() => setIsContactRevealed(true)}
              disabled={isContactRevealed}
            >
              {isContactRevealed ? product.mobile : "Reveal Contact"}
            </button>
          </div>

          {/* Message Section: Single "Message Author" Button */}
          <div className="message-section">
            <button className="send-message-button" onClick={handleSendMessage}>
              Message Author
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
