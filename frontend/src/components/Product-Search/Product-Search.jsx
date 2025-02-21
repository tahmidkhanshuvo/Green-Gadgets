import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Product-Search.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const ProductSearch = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/ads`)
      .then(response => setAds(response.data))
      .catch(error => console.error("Error fetching ads:", error));
  }, []);

  return (
    <div className="product-list">
      {ads.map(ad => (
        <div key={ad._id} onClick={() => navigate(`/productdetails/${ad._id}`)}>
          <h3>{ad.title}</h3>
          <p>${ad.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductSearch;
