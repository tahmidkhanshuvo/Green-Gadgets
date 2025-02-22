import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Product-Search.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ProductSearch = () => {
  const [ads, setAds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const navigate = useNavigate();

  // Fetch Ads from API
  useEffect(() => {
    axios.get(`${API_URL}/api/ads`)
      .then((response) => setAds(response.data))
      .catch((error) => console.error("Error fetching ads:", error));
  }, []);

  // Optimized Filtering & Sorting
  const filteredAds = useMemo(() => {
    let updatedAds = ads.filter(
      (ad) =>
        (selectedCategory === "All" || ad.category === selectedCategory) &&
        (selectedSubCategory === "All" || ad.subCategory === selectedSubCategory) &&
        (selectedLocation === "All" || ad.location === selectedLocation) &&
        ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "lowToHigh") {
      updatedAds.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updatedAds.sort((a, b) => b.price - a.price);
    }

    return updatedAds;
  }, [ads, selectedCategory, selectedSubCategory, selectedLocation, searchTerm, sortOption]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAds.length / productsPerPage);
  const currentProducts = filteredAds.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Handle Page Change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="product-search">
      <div className="product-container">
        
        {/* Sidebar Filters */}
        <div className="sidebar">
          <h2>Categories</h2>
          {["All", "Recycle", "Refurbished", "Reuse"].map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory("All");
              }}
            >
              {category}
            </button>
          ))}

          <h2>Subcategories</h2>
          {selectedCategory !== "All" &&
            ["All", "Mobile", "Laptop", "Monitor", "TV", "Speaker", "Camera"].map((subCategory) => (
              <button
                key={subCategory}
                className={selectedSubCategory === subCategory ? "active" : ""}
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                {subCategory}
              </button>
            ))}

          <h2>Location</h2>
          {["All", "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Barishal"].map((location) => (
            <button
              key={location}
              className={selectedLocation === location ? "active" : ""}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
            </button>
          ))}
        </div>

        {/* Product Section */}
        <div className="product-section">
          <div className="search-filter-container">
            
            {/* Search Bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sorting Options */}
            <div className="filter-section">
              <label>Sort: </label>
              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-list">
            {currentProducts.length > 0 ? (
              currentProducts.map((ad) => (
                <div key={ad._id} className="product-item" onClick={() => navigate(`/productdetails/${ad._id}`)}>
                  <div className="image-container">
                    <span className="badge">{ad.category}</span>
                    <img
                      src={ad.images.length > 0 ? ad.images[0] : "https://via.placeholder.com/200"}
                      alt={ad.title}
                      className="product-image"
                    />
                  </div>
                  <div className="product-details">
                    <h3>{ad.title}</h3>
                    <p>৳ {ad.price}</p>
                    <p className="location">{ad.location}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
