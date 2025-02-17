import React, { useState } from "react";
import "./PostAd.css";

const PostAd = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");

  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [photos, setPhotos] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  // Additional fields
  const [condition, setCondition] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");

  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

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

  const handlePostAd = () => {
    if (
      selectedCategory === "Select Category" ||
      selectedSubCategory === "" ||
      adTitle.trim() === "" ||
      adDescription.trim() === "" ||
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

      // Reset form after successful submission
      setSelectedCategory("Select Category");
      setSelectedSubCategory("");
      setAdTitle("");
      setAdDescription("");
      setPhotos(null);
      setName("");
      setMobile("");
      setLocation("");
      setEmail("");
      setCondition("");
      setBrand("");
      setModel("");
    }
    setShowPopup(true);
  };

  return (
    <div className="post-ad-container">
      <h2 className="title">Post an Ad</h2>

      {/* Category Selection */}
      <div className="form-group">
        <label>Select Category *</label>
        <button className="dropdown-btn" onClick={() => setShowCategoryPopup(true)}>
          {selectedCategory}
        </button>
      </div>

      {showCategoryPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Select a Category</h3>
            <ul>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowCategoryPopup(false);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
            <button className="back-btn" onClick={() => setShowCategoryPopup(false)}>
              Back
            </button>
          </div>
        </div>
      )}

      {/* Subcategory Selection */}
      <div className="form-group">
        <label>Sub Category *</label>
        <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
          <option value="">Select Sub Category</option>
          {Object.keys(subCategories).map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </div>

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
      {selectedSubCategory && subCategories[selectedSubCategory] && (
        <>
          {subCategories[selectedSubCategory].map((field) => (
            <div className="form-group" key={field}>
              <label>{field} *</label>
              <input
                type="text"
                placeholder={`Enter ${field}`}
                value={field === "Condition" ? condition : field === "Brand" ? brand : model}
                onChange={(e) => {
                  if (field === "Condition") setCondition(e.target.value);
                  else if (field === "Brand") setBrand(e.target.value);
                  else setModel(e.target.value);
                }}
              />
            </div>
          ))}
        </>
      )}

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


 