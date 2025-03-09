import React, { useState, useContext } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const { Option } = Select;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const PostBlog = ({ visible, onCancel, fetchBlogs }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [content, setContent] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return null;

  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("images", file);

    try {
      const { data } = await axios.post(`${API_URL}/api/upload/blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageList((prevList) => [...prevList, ...data.imageUrls]);
      onSuccess();
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      onError(error);
      message.error("Image upload failed!");
    }
  };

  const handleSubmit = async (values) => {
    // Manually validate content field
    if (!content || content.trim() === "") {
      message.error("Content is required");
      return;
    }

    console.log("User in PostBlog:", user);
    if (!user || !user._id) {
      message.error("User information not loaded. Please log in again.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/blog`,
        {
          ...values,
          content,
          images: imageList,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Blog posted successfully!");
      fetchBlogs();
      form.resetFields();
      setImageList([]);
      setContent("");
      onCancel();
    } catch (error) {
      console.error("Error posting blog:", error);
      message.error("Error posting blog!");
    }
  };

  return (
    <Modal open={visible} title="Post Blog" onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="title"
          label="Blog Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="shortDescription"
          label="Short Description"
          rules={[{ required: true, message: "Short description is required" }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        {/* Removed name and rules to handle content separately */}
        <Form.Item label="Content">
          <ReactQuill value={content} onChange={setContent} theme="snow" />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category">
            <Option value="Recycle">Recycle</Option>
            <Option value="Refurbish">Refurbish</Option>
            <Option value="E-waste">E-waste</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Upload Images">
          <Upload customRequest={handleImageUpload} listType="picture-card" multiple>
            <div>
              <UploadOutlined style={{ fontSize: 24, color: "#1890ff" }} />
              <div>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Post
        </Button>
      </Form>
    </Modal>
  );
};

export default PostBlog;
