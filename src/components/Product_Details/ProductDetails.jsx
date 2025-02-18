import React, { useState } from "react";
import "./ProductDetails.css";

// Image URLs
const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lE9_0e_RNqR6jcNlwWqNzlp24a5iMSCNrA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7p2GSN6YX1Pt-SgBbxQ1bwFNkP3jyBsnOA&s",
];

const avatarImage = "https://cdn.pixabay.com/photo/2017/03/19/20/19/ball-2157465_640.png";

const ProductFeatures = () => {
  return (
    <div className="features-section">
      <h2>Features</h2>
      <ul>
        <li><strong>Condition:</strong> Refurbished</li>
        <li><strong>Brand:</strong> HP</li>
        <li><strong>Model:</strong> HP 250 G8 Intel Celeron N4020 15.6" FHD Laptop</li>
        <li><strong>Processor:</strong> Intel Celeron N4020 (4M Cache, 1.10 GHz up to 2.80 GHz)</li>
        <li><strong>Ram:</strong> 16GB</li>
        <li><strong>Storage:</strong> 1 TB</li>
      </ul>
    </div>
  );
};

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(images[0]); // Default to the first image
  const [isContactRevealed, setIsContactRevealed] = useState(false); // Contact reveal state

  return (
    <div className="product-details-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        Category &gt; Refurbished &gt; Laptop
      </div>

      <div className="product-details-content">
        {/* Left Section */}
        <div className="left-section">
          {/* Image Section with Clickable Thumbnails */}
          <div className="images-section">
            <img src={mainImage} alt="Main Product" className="main-image" />
            <div className="thumbnail-container">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail ${mainImage === image ? "active" : ""}`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Title & Metadata */}
          <h1 className="product-title">HP 250 G8 Intel Celeron N4020 15.6" FHD Laptop</h1>
          <div className="product-meta">
            <p>Posted on 18 Feb 2025</p>
            <p>Shymoli road no 2, Dhaka</p>
          </div>

          {/* Price */}
          <div className="product-price">$146,300</div>

          {/* Product Features Component */}
          <ProductFeatures />

          {/* Description */}
          <div className="description-section">
            <h2>Description</h2>
            <p>
            The HP 250 G8 Intel Celeron N4020 15.6" FHD Laptop is a dependable and cost-effective computing option for everyday work. This laptop, powered by an Intel Celeron N4020 CPU, strikes a mix between performance and economy. Users may experience excellent graphics for business, entertainment, and other purposes thanks to the sleek 15.6-inch Full HD display (1920 x 1080). The laptop has 4GB of DDR4 RAM clocked at 3200MHz, allowing for excellent multitasking, while a 1TB HDD provides enough storage capacity. The laptop is powered by an Intel Celeron N4020 CPU with a 4M cache and a basic clock speed of 1.10 GHz that may be increased to 2.80 GHz when necessary. This processor is appropriate for general processing workloads and provides efficient performance. The laptop offers a speedy and flawless multitasking experience thanks to 4GB of DDR4 RAM working at 3200MHz. Users may simply move between programs with no noticeable latency. The laptop includes a large 1TB HDD (Hard Disk Drive), which provides plenty of storage capacity for papers, multimedia files, and apps. While HDDs are slower than SSDs, they provide cost-effective and big storage alternatives. The 15.6-inch Full HD (1920 x 1080) display provides colorful and clear graphics, making it ideal for productivity activities, multimedia consumption, and general use. The addition of a full-size keyboard with a numeric keypad improves the usefulness of the laptop, particularly for those who work with numerical data or routinely use spreadsheet apps. The availability of a Type-C connector expands the laptop's adaptability, enabling speedier data transfer and connectivity to a wide range of current peripherals. The HP 250 G8 Intel Celeron N4020 laptop has a well-rounded collection of capabilities, making it an excellent choice for customers looking for a low-cost computer for daily computing needs.
            </p>
            <ul>
              <li>All listings verified for authenticity</li>
              <li>Direct contact with the seller</li>
              <li>Negotiable prices available</li>
              <li>Wide range of products and categories</li>
              <li>Local deals for easy transactions</li>
            </ul>
          </div>

          {/* Report Button */}
          <button className="report-button">Report</button>
        </div>

        {/* Right Section (Seller Info, Contact, etc.) */}
        <div className="right-section">
          <div className="seller-card">
            <img src={avatarImage} alt="Seller Avatar" className="user-avatar" />
            <div className="seller-info">
              <h3>Cameron Williamson</h3>
              <p>Member since 2019</p>
            </div>

            {/* Reveal Contact Button */}
            <button
              className={`contact-button ${isContactRevealed ? "revealed" : ""}`}
              onClick={() => setIsContactRevealed(true)}
              disabled={isContactRevealed}
            >
              {isContactRevealed ? "01819324567" : "Reveal Contact"}
            </button>
          </div>

          <div className="message-section">
            <textarea placeholder="Type a message..."></textarea>
            <button className="send-message-button">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
