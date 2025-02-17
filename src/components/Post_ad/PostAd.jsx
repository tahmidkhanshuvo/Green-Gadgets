import React, { useState } from "react";
import "./PostAd.css";

const PostAd = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [photos, setPhotos] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  // Dynamic fields based on subcategory (separate state for each field)
  const [dynamicFields, setDynamicFields] = useState({});

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

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
    // Reset dynamic fields when subcategory changes
    const initialFields = {};
    subCategories[subCategory]?.forEach((field) => (initialFields[field] = ""));
    setDynamicFields(initialFields);
  };

  const handleDynamicFieldChange = (field, value) => {
    setDynamicFields((prev) => ({
      ...prev,
      [field]: value, // Update only the specific field
    }));
  };

  const handlePostAd = () => {
    if (
      !selectedCategory ||
      !selectedSubCategory ||
      adTitle.trim() === "" ||
      adDescription.trim() === "" ||
      price.trim() === "" ||
      !photos ||
      name.trim() === "" ||
      mobile.trim() === "" ||
      location.trim() === "" ||
      email.trim() === ""
    ) {
      setPopupMessage("❌ You must fill in all fields before posting!");
      setPopupType("error");
    } else {
      setPopupMessage("✅ Your Ad has been Posted Successfully!");
      setPopupType("success");

      // Reset form
      setSelectedCategory("");
      setSelectedSubCategory("");
      setAdTitle("");
      setAdDescription("");
      setPrice("");
      setPhotos(null);
      setName("");
      setMobile("");
      setLocation("");
      setEmail("");
      setDynamicFields({});
    }
    setShowPopup(true);
  };

  return (
    <div className="post-ad-container">
      <h2 className="title">Post an Ad</h2>

      {/* Step 1: Category Selection */}
      <div className="form-group">
        <label>Select Category *</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: Subcategory Selection */}
      {selectedCategory && (
        <div className="form-group">
          <label>Sub Category *</label>
          <select value={selectedSubCategory} onChange={(e) => handleSubCategoryChange(e.target.value)}>
            <option value="">Select Sub Category</option>
            {Object.keys(subCategories).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Step 3: Show all other fields only after subcategory is selected */}
      {selectedSubCategory && (
        <>
          {/* Other Input Fields */}
          <div className="form-group">
            <label>Ad Title *</label>
            <input type="text" placeholder="Enter your ad title" value={adTitle} onChange={(e) => setAdTitle(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Ad Description *</label>
            <textarea placeholder="Write a few lines about your product" value={adDescription} onChange={(e) => setAdDescription(e.target.value)}></textarea>
          </div>

          {/* Dynamically Show Additional Fields */}
          {subCategories[selectedSubCategory]?.map((field) => (
            <div className="form-group" key={field}>
              <label>{field} *</label>
              <input
                type="text"
                placeholder={`Enter ${field}`}
                value={dynamicFields[field] || ""}
                onChange={(e) => handleDynamicFieldChange(field, e.target.value)}
              />
            </div>
          ))}

          {/* Price Field */}
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setPrice(value);
                }
              }}
            />
          </div>

          {/* Photos Field */}
          <div className="form-group">
            <label>Photos for Your Ad *</label>
            <input type="file" multiple onChange={(e) => setPhotos(e.target.files.length > 0 ? e.target.files : null)} />
          </div>

          <div className="form-group">
            <label>Your Name *</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Your Mobile No *</label>
            <input type="text" placeholder="Enter your mobile number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Your Location *</label>
            <input type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Your Email Address *</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <p className="terms">
            By clicking <b>post</b> button, you accept our{" "}
            <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
          </p>

          <button className="post-btn" onClick={handlePostAd}>POST</button>
        </>
      )}

      {/* Popup Message */}
      {showPopup && (
        <div className="popup">
          <div className={`popup-content ${popupType}`}>
            <p>{popupMessage}</p>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostAd;
