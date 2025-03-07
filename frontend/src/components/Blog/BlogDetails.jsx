import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Row, Col, Divider, message } from "antd";
import axios from "axios";

const { Title, Paragraph } = Typography;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const BlogDetails = () => {
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  // ✅ Fetch Blog Details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blog/${id}`);
        setBlog(data);

        // ✅ Fetch related blogs (excluding current one)
        const relatedResponse = await axios.get(`${API_URL}/api/blog`);
        const filteredBlogs = relatedResponse.data.filter((post) => post._id !== id).slice(0, 3);
        setRelatedBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        message.error("Blog not found");
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (!blog) {
    return (
      <Title level={2} style={{ textAlign: "center", marginTop: "50px" }}>
        Blog Not Found
      </Title>
    );
  }

  return (
    <div style={{ width: "100%", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Button
        onClick={() => navigate("/blogs")}
        type="link"
        style={{ margin: "20px", fontSize: "16px", textDecoration: "underline" }}
      >
        ← Back to Blogs
      </Button>

      <Card bordered={false} style={{ borderRadius: "0", boxShadow: "none", margin: "0", padding: "0" }}>
        <img
          src={blog.images?.[0] || "https://via.placeholder.com/600"}
          alt={blog.title}
          style={{ width: "100%", height: "80vh", objectFit: "cover", display: "block" }}
        />
        <div style={{ padding: "60px 40px", backgroundColor: "#f0f2f5" }}>
          <Title level={2} style={{ marginBottom: "20px" }}>{blog.title}</Title>
          <p style={{ color: "#888", marginBottom: "20px" }}>
            Published on: {new Date(blog.createdAt).toLocaleDateString()} by {blog.createdBy?.name}
          </p>
          <Paragraph style={{ fontSize: "18px", lineHeight: "1.8", color: "#333", maxWidth: "1200px", margin: "auto" }}>
            {blog.content || blog.description}
          </Paragraph>
        </div>
      </Card>

      {/* Related Blogs */}
      <Divider orientation="left" style={{ color: "#333", margin: "40px 40px 20px" }}>
        Related Blogs
      </Divider>
      <Row gutter={[24, 24]} style={{ padding: "0 40px 40px" }}>
        {relatedBlogs.map((related) => (
          <Col xs={24} sm={12} md={8} key={related._id}>
            <Card
              hoverable
              onClick={() => navigate(`/blog/${related._id}`)}
              bordered={false}
              style={{ borderRadius: "8px" }}
              cover={
                <img
                  alt={related.title}
                  src={related.images?.[0] || "https://via.placeholder.com/300"}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              }
            >
              <Title level={4} style={{ margin: "0 0 10px" }}>{related.title}</Title>
              <Paragraph ellipsis={{ rows: 2 }}>{related.shortDescription}</Paragraph>
              <Button type="primary" block style={{ marginTop: "10px" }}>
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogDetails;
