import React, { useState } from "react";
import axios from "axios";
import "./PostAd.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ✅ Categories & Subcategories
const categories = ["Refurbished", "Recycle", "Reuse"];
const subCategories = {
  Mobile: ["Condition", "Brand", "Model"],
  Laptop: ["Condition", "Brand", "Processor", "RAM", "Storage"],
  Monitor: ["Condition", "Brand", "Screen Size"],
  Watch: ["Condition", "Brand", "Type"],
  TV: ["Condition", "Brand", "Screen Size", "Type"],
  Speaker: ["Condition", "Brand", "Power"],
  CPU: ["Condition", "Brand", "Processor", "RAM", "Storage"],
  Camera: ["Condition", "Brand", "Lens Type"],
  "Video Game Console": ["Condition", "Brand", "Model"],
  Photocopiers: ["Condition", "Brand", "Type"],
};

const PostAd = () => {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    location: "",
    name: "",
    email: "",
    mobile: "",
    mainImage: "",
    images: [],
    details: {},
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Category Change
  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category, subCategory: "", details: {} });
  };

  // ✅ Handle Subcategory Change
  const handleSubCategoryChange = (subCategory) => {
    const initialFields = {};
    subCategories[subCategory]?.forEach((field) => (initialFields[field] = ""));
    setFormData({ ...formData, subCategory, details: initialFields });
  };

  // ✅ Handle Dynamic Field Updates
  const handleDetailChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  // ✅ Upload Images to Backend API (Cloudinary)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.images) {
        setFormData((prev) => ({
          ...prev,
          mainImage: response.data.mainImage, // First image as main
          images: response.data.images, // Store all images
        }));
        setImagePreviews(response.data.images); // Show preview
      }
    } catch (error) {
      console.error("Image upload failed", error);
      setMessage("❌ Image upload failed.");
    }

    setLoading(false);
  };

  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    if (!formData.category || !formData.subCategory || !formData.title || !formData.description || !formData.price || !formData.location || !formData.name || !formData.email || !formData.mobile || formData.images.length === 0) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/api/ads`, formData);
      setMessage("✅ Your Ad has been Posted Successfully!");
      setFormData({
        category: "",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        location: "",
        name: "",
        email: "",
        mobile: "",
        mainImage: "",
        images: [],
        details: {},
      });
      setImagePreviews([]);
      console.log(response.data);
    } catch (error) {
      console.error("Error posting ad:", error);
      setMessage("❌ Error posting ad.");
    }

    setLoading(false);
  };

  return (
    <div className="post-ad-container">
      <h2>Post an Ad</h2>

      {/* Category Selection */}
      <label>Category *</label>
      <select value={formData.category} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Subcategory Selection */}
      {formData.category && (
        <>
          <label>Sub Category *</label>
          <select value={formData.subCategory} onChange={(e) => handleSubCategoryChange(e.target.value)}>
            <option value="">Select Sub Category</option>
            {Object.keys(subCategories).map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </>
      )}

      {/* Dynamic Fields */}
      {formData.subCategory &&
        subCategories[formData.subCategory]?.map((field) => (
          <div key={field}>
            <label>{field} *</label>
            <input
              type="text"
              value={formData.details[field] || ""}
              onChange={(e) => handleDetailChange(field, e.target.value)}
            />
          </div>
        ))}

      {/* Title */}
      <label>Title *</label>
      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

      {/* Description */}
      <label>Description *</label>
      <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

      {/* Price */}
      <label>Price *</label>
      <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />

      {/* Location */}
      <label>Location *</label>
      <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

      {/* Contact Information */}
      <label>Your Name *</label>
      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

      <label>Your Email *</label>
      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

      <label>Your Mobile No *</label>
      <input type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

      {/* Upload Images */}
      <label>Upload Images *</label>
      <input type="file" multiple onChange={handleImageUpload} />
      <div className="image-preview">
        {imagePreviews.map((src, index) => (
          <img key={index} src={src} alt="Preview" />
        ))}
      </div>

      {/* Submit Button */}
      <button className="post-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post Ad"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PostAd;
