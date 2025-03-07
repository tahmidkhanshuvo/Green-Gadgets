import React, { useState, useContext } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Import AuthContext

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const PostBlog = ({ visible, onCancel, fetchBlogs }) => {
  const [form] = Form.useForm();
  const [imageList, setImageList] = useState([]);
  const [content, setContent] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return null; // Prevent access if not logged in

  // ✅ Handle Image Upload
  const handleImageUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("images", file); // ✅ Match backend field name
  
    try {
      const { data } = await axios.post(`${API_URL}/api/upload/blog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setImageList((prevList) => [...prevList, ...data.imageUrls]); // ✅ Store uploaded image URLs
      onSuccess();
      message.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      onError(error);
      message.error("Image upload failed!");
    }
  };

  // ✅ Handle Blog Submission
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/api/blog`,
        {
          ...values,
          content,
          images: imageList, // Send image URLs to the backend
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach token for authentication
        }
      );

      message.success("Blog posted successfully!");
      fetchBlogs(); // Refresh the blog list after posting
      form.resetFields();
      setImageList([]);
      setContent("");
      onCancel();
    } catch (error) {
      message.error("Error posting blog!");
      console.error(error);
    }
  };

  return (
    <Modal open={visible} title="Post Blog" onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item name="title" label="Blog Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="shortDescription"
          label="Short Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item name="content" label="Content" rules={[{ required: true }]}>
          <ReactQuill value={content} onChange={setContent} theme="snow" />
        </Form.Item>

        <Form.Item label="Upload Images">
          <Upload
            customRequest={handleImageUpload}
            listType="picture-card"
            multiple
          >
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
