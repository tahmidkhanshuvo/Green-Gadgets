import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Row, Pagination, Input, Typography, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import PostBlog from "./PostBlog";

const { Meta } = Card;
const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Set number of blogs per page
  const [modalVisible, setModalVisible] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch Blogs from Backend
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/blog`);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("Failed to load blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter and Paginate Blogs
  const filteredBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => selectedCategory === "All" || blog.category === selectedCategory);

  const currentBlogs = filteredBlogs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Blog
      </Title>

      {/* Search Bar */}
      <Input
        placeholder="Search blogs..."
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {/* Category Buttons */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {["All", "Recycle", "Refurbish", "E-waste"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: "0 10px",
              backgroundColor: selectedCategory === category ? "#579040" : "#f0f0f0",
              color: selectedCategory === category ? "#fff" : "#000",
              transition: "background-color 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#487C3E")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = selectedCategory === category ? "#579040" : "#f0f0f0")
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Post Blog Button (Only for Logged-in Users) */}
      {isAuthenticated && (
        <Button
          type="link"
          onClick={() => setModalVisible(true)}
          style={{
            background: "linear-gradient(#579040, #487C3E)",
            color: "white",
          }}
          onMouseOver={(e) => (e.target.style.background = "linear-gradient(#487C3E, #579040)")}
          onMouseOut={(e) => (e.target.style.background = "linear-gradient(#579040, #487C3E)")}
        >
          Post Blog
        </Button>
      )}

      {/* Blog Grid */}
      <Row gutter={[16, 16]}>
        {currentBlogs.map((blog) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blog._id}>
            <Card 
              hoverable 
              cover={
                <img 
                  alt={blog.title} 
                  src={blog.images[0] || "https://via.placeholder.com/300"} 
                  style={{ height: "200px", objectFit: "cover" }}
                />
              }
              style={{ height: "450px", display: "flex", flexDirection: "column" }}
              styles={{ body: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" } }}
            >
              <Meta
                title={blog.title}
                description={
                  <>
                    <p style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                      {blog.shortDescription}
                    </p>
                    <small>
                      Posted by: {blog.createdBy && blog.createdBy.name ? blog.createdBy.name : "Unknown"}
                    </small>
                    <br />
                    <small>{new Date(blog.createdAt).toLocaleDateString()}</small>
                  </>
                }
              />
              <Link to={`/blog/${blog._id}`}>
                <Button
                  type="link"
                  style={{
                    color: "#fff",
                    backgroundColor: "#487C3E",
                    marginTop: "10px",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#579040")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#487C3E")}
                >
                  Read more...
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        total={filteredBlogs.length}
        pageSize={pageSize}
        style={{ textAlign: "center", marginTop: "20px" }}
      />

      {/* Post Blog Modal */}
      <PostBlog
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        fetchBlogs={fetchBlogs}
      />
    </div>
  );
};

export default Blog;
