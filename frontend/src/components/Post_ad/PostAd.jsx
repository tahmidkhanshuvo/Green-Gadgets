import React, { useState } from "react";
import axios from "axios";
import "./PostAd.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Categories and their respective subcategories with dynamic fields
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
    images: [],
    details: {},
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle category selection
  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category, subCategory: "", details: {} });
  };

  // Handle subcategory selection and reset dynamic fields
  const handleSubCategoryChange = (subCategory) => {
    const initialFields = {};
    subCategories[subCategory]?.forEach((field) => (initialFields[field] = ""));
    setFormData({ ...formData, subCategory, details: initialFields });
  };

  // Handle dynamic field updates
  const handleDetailChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  // Handle file upload preview
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews);
    setFormData({ ...formData, images: files });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.subCategory ||
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.location ||
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      formData.images.length === 0
    ) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Upload images to the backend (You need a file upload API)
      const uploadedImages = formData.images.map((file) => URL.createObjectURL(file));

      // Send ad data to the backend
      const response = await axios.post(`${API_URL}/api/ads`, {
        ...formData,
        images: uploadedImages,
      });

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

      <label>Category *</label>
      <select value={formData.category} onChange={(e) => handleCategoryChange(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

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

      {formData.subCategory &&
        subCategories[formData.subCategory]?.map((field) => (
          <div key={field}>
            <label>{field} *</label>
            <input type="text" value={formData.details[field] || ""} onChange={(e) => handleDetailChange(field, e.target.value)} />
          </div>
        ))}

      <label>Title *</label>
      <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

      <label>Description *</label>
      <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>

      <label>Price *</label>
      <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />

      <label>Location *</label>
      <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

      <label>Your Name *</label>
      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

      <label>Your Email *</label>
      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

      <label>Your Mobile No *</label>
      <input type="text" value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />

      <label>Upload Images *</label>
      <input type="file" multiple onChange={handleImageUpload} />
      <div className="image-preview">
        {imagePreviews.map((src, index) => (
          <img key={index} src={src} alt="Preview" />
        ))}
      </div>

      <button className="post-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post Ad"}
      </button>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PostAd;
