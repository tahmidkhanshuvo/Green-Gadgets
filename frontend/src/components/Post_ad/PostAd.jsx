import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./PostAd.css";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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
  const { user, isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    title: "",
    description: "",
    price: "",
    mobile: user?.mobile || "",
    mainImage: "",
    images: [],
    details: {},
  });
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (!isAuthenticated) {
    return <h2>Please login to post an ad.</h2>;
  }

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, category, subCategory: "", details: {} }));
  };

  const handleSubCategoryChange = (subCategory) => {
    const initialFields = {};
    subCategories[subCategory]?.forEach((field) => (initialFields[field] = ""));
    setFormData((prev) => ({ ...prev, subCategory, details: initialFields }));
  };

  const handleDetailChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      details: { ...prev.details, [field]: value },
    }));
  };

  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    const uploadData = new FormData();
    uploadData.append("images", file);
    try {
      const { data } = await axios.post(`${API_URL}/api/upload/ad`, uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadedImages = Array.isArray(data.images)
        ? data.images
        : Array.isArray(data.imageUrls)
        ? data.imageUrls
        : [];
      setFormData((prev) => ({
        ...prev,
        mainImage: data.mainImage || uploadedImages[0] || "",
        images: [...prev.images, ...uploadedImages],
      }));
      onSuccess();
      message.success("Image uploaded successfully!");
    } catch (error) {
      onError(error);
      message.error("Image upload failed!");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.category ||
      !formData.subCategory ||
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.mobile ||
      formData.images.length === 0
    ) {
      setMessageText("❌ Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setMessageText("");
    try {
      await axios.post(
        `${API_URL}/api/ad`,
        {
          ...formData,
          name: user.name,
          email: user.email,
          location: user.location,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessageText("✅ Your Ad has been Posted Successfully!");
      setFormData({
        category: "",
        subCategory: "",
        title: "",
        description: "",
        price: "",
        mobile: user.mobile,
        mainImage: "",
        images: [],
        details: {},
      });
    } catch (error) {
      setMessageText("❌ Error posting ad.");
    }
    setLoading(false);
  };

  return (
    <div className="post-ad-container">
      <h2>Post an Ad</h2>
      <form onSubmit={(e) => e.preventDefault()} className="post-ad-form">
        <div className="form-group">
          <label>Name *</label>
          <input type="text" value={user.name} disabled className="form-control" />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" value={user.email} disabled className="form-control" />
        </div>
        <div className="form-group">
          <label>Location *</label>
          <input type="text" value={user.location} disabled className="form-control" />
        </div>
        <div className="form-group">
          <label>Mobile *</label>
          <input
            type="text"
            value={formData.mobile}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mobile: e.target.value }))
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="form-control"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {formData.category && (
          <div className="form-group">
            <label>Sub Category *</label>
            <select
              value={formData.subCategory}
              onChange={(e) => handleSubCategoryChange(e.target.value)}
              className="form-control"
            >
              <option value="">Select Sub Category</option>
              {Object.keys(subCategories).map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
        {formData.subCategory &&
          subCategories[formData.subCategory]?.map((field) => (
            <div className="form-group" key={field}>
              <label>{field} *</label>
              <input
                type="text"
                value={formData.details[field] || ""}
                onChange={(e) => handleDetailChange(field, e.target.value)}
                className="form-control"
              />
            </div>
          ))}
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Upload Images *</label>
          <Upload customRequest={handleImageUpload} listType="picture-card" multiple>
            <div className="upload-area">
              <UploadOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              <div>Upload</div>
            </div>
          </Upload>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="post-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </div>
      </form>
      {messageText && <p className="message">{messageText}</p>}
    </div>
  );
};

export default PostAd;
