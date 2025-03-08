import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Row, Col, Divider, message, Carousel } from "antd";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const { Title, Paragraph } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blog/${id}`);
        setBlog(data);

        const relatedResponse = await axios.get(`${API_URL}/api/blog`);
        const filteredBlogs = relatedResponse.data
          .filter((post) => post._id !== id)
          .slice(0, 3);
        setRelatedBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        message.error("Blog not found");
      }
    };

    fetchBlogDetails();
  }, [id]);

  // Function to handle messaging the blog author
  const handleMessage = async () => {
    if (!user) {
      message.info("Please log in to send a message.");
      navigate("/login");
      return;
    }
    // Check if createdBy is an object with _id; otherwise, use blog.createdBy directly if it's an ID.
    const authorId = blog.createdBy && blog.createdBy._id ? blog.createdBy._id : blog.createdBy;
    if (!authorId) {
      message.error("Unable to message the author.");
      return;
    }
    try {
      // Create (or retrieve) a chat between the current user and the blog author.
      const response = await axios.post(`${API_URL}/api/chats`, {
        participants: [user._id, authorId],
      });
      const chatId = response.data._id;
      navigate(`/chat/${chatId}`);
    } catch (error) {
      console.error("Error initiating chat:", error);
      message.error("Error initiating chat.");
    }
  };

  if (!blog) {
    return (
      <Title level={2} style={{ textAlign: "center", marginTop: "50px" }}>
        Blog Not Found
      </Title>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: "#fff", paddingBottom: "40px" }}>
      <div style={{ margin: "20px" }}>
        <Button 
          type="primary" 
          onClick={() => navigate("/blog")}
          style={{ fontSize: "16px" }}
        >
          ← Back to Blog
        </Button>
      </div>

      <Card
        bordered={false}
        style={{
          margin: "0 20px",
          padding: "0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {blog.images && blog.images.length > 1 ? (
          <Carousel autoplay>
            {blog.images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`${blog.title} - Slide ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "80vh",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <img
            src={blog.images?.[0] || "https://via.placeholder.com/600"}
            alt={blog.title}
            style={{
              width: "100%",
              height: "80vh",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
        <div style={{ padding: "60px 40px", backgroundColor: "#f0f2f5" }}>
          <Title level={2} style={{ marginBottom: "20px", color: "#333" }}>
            {blog.title}
          </Title>
          <Paragraph style={{ color: "#888", marginBottom: "20px", fontSize: "16px" }}>
            Published on: {new Date(blog.createdAt).toLocaleDateString()} by{" "}
            {blog.createdBy && blog.createdBy.name ? blog.createdBy.name : blog.createdBy || "Unknown"}
          </Paragraph>
          <div
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              color: "#333",
              maxWidth: "100%",
              margin: "auto",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content || blog.description }}
          />
          <div style={{ marginTop: "30px" }}>
            <Button type="primary" onClick={handleMessage}>
              Message Author
            </Button>
          </div>
        </div>
      </Card>

      <Divider orientation="left" style={{ color: "#333", margin: "40px 20px 20px" }}>
        Related Blogs
      </Divider>
      <Row gutter={[24, 24]} style={{ padding: "0 20px" }}>
        {relatedBlogs.map((related) => (
          <Col xs={24} sm={12} md={8} key={related._id}>
            <Card
              hoverable
              onClick={() => navigate(`/blog/${related._id}`)}
              bordered={false}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              cover={
                <img
                  alt={related.title}
                  src={related.images?.[0] || "https://via.placeholder.com/300"}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              }
            >
              <Title level={4} style={{ margin: "0 0 10px" }}>
                {related.title}
              </Title>
              <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: "10px" }}>
                {related.shortDescription}
              </Paragraph>
              <Button type="primary" block>
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
