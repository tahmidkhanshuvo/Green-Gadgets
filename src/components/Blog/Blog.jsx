import React, { useState} from "react";
import { Card,
   Col,
   Row,
   Pagination,
   Input,
   Typography,
   Button } 
   from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom"; // Ensure you're using Link
import "antd/dist/reset.css";
import PostBlog from './PostBlog';
import './PostBlog';
const { Meta } = Card;
const { Title } = Typography;

// Sample blog data

    const blogPosts = {
      Recycle: [
        { id: 1, title: "How We Recycle E-Waste", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQo3rvtXPMoYRD34PQ7onH7Cf8Fx3O1hoqkOeaV_68kbhY1aVDyLt1Zao&s", description: "A detailed guide on how we recycle e-waste efficiently.", date: "2024-02-15" },
        { id: 2, title: "Top Tips for E-Waste Recycling", image: "https://img.freepik.com/free-vector/students-learning-about-various-recyclable-materials_53876-40276.jpg?semt=ais_hybrid", description: "Tips on reducing and recycling your electronic waste.", date: "2024-02-10" },
        { id: 3, title: "The Importance of Proper Disposal", image: "https://img.freepik.com/premium-vector/green-ecology-concept-with-abstract-paper-cut-background_44481-215.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A look at the importance of proper disposal methods.", date: "2024-02-05" },
        { id: 4, title: "The Future of E-Waste Recycling", image: "https://img.freepik.com/free-vector/isometric-recycling-composition-with-isolated-view-factory-area-with-plant-building-bins-dump-truck-vector-illustration_1284-79914.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "We can see a sustainable future by doint it", date: "2024-01-05" },
        { id: 5, title: "People using recycled products more now", image: "https://img.freepik.com/premium-photo/smiling-asian-woman-with-tablet-pc-sorting-waste_380164-271663.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "Innovations in e-waste recycling technology.", date: "2024-01-05" },
        { id: 6, title: "Recycling is a social activity", image: "https://img.freepik.com/free-vector/electronic-garbage-isometric-composition-with-faceless-human-characters-holding-dead-batteries-lamps-with-trash-bin-illustration_1284-61020.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "Innovations in e-waste recycling technology.", date: "2024-01-05" },
        { id: 7, title: "Recycling will save the earth", image: "https://img.freepik.com/free-vector/hand-drawn-world-environment-day-save-planet-illustration_52683-61570.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "Innovations in e-waste recycling technology.", date: "2024-01-05" },
        
      ],
      Refurbish: [
        { id: 8, title: "How to Refurbish Your Old Laptop", image: "https://img.freepik.com/free-photo/cheerful-positive-radioman-holding-laptop-with-blank-screen-making-gesture-showing-with-forefinger-having-double-adapter-various-cords-neck-standing-with-necessary-equipment_176532-9104.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A step-by-step guide to refurbishing your old laptop.", date: "2024-02-12" },
        { id: 9, title: "The Benefits of Refurbished Electronics", image: "https://img.freepik.com/free-vector/background-with-ecology-recycling-concept_23-2148234397.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "Why buying refurbished is a smart choice.", date: "2024-01-28" },
        { id: 10, title: "DIY Computer Refurbishing Tips", image: "https://img.freepik.com/premium-vector/modern-quick-tips-composition-with-flat-design_23-2147885475.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "How to refurbish and upgrade your PC.", date: "2024-01-20" },
        { id: 11, title: "Best Places to Buy Refurbished Gadgets", image: "https://img.freepik.com/free-photo/laptop-shopping-bags-online-shopping-concept_1423-189.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A list of the best sites for refurbished electronics.", date: "2024-01-10" },
        { id: 12, title: "Refurbished product's Quality", image: "https://img.freepik.com/free-vector/character-illustration-home-improvement-concept_53876-43040.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A list of the best sites for refurbished electronics.", date: "2024-01-10" },
        { id: 13, title: "How we refurbish your e-wastes", image: "https://img.freepik.com/premium-photo/employee-paint-shop-automobile-plant-conducts-training-preparation-bumpers-painting_207949-113.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A list of the best sites for refurbished electronics.", date: "2024-01-10" },
        
      ],
      "E-waste": [
        { id: 14, title: "E-Waste Management Strategies", image: "https://img.freepik.com/free-photo/man-drawing-bulb-gears_1134-465.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "The best ways to manage and reduce e-waste.", date: "2024-02-08" },
        { id: 15, title: "What Happens to E-Waste?", image: "https://img.freepik.com/premium-photo/large-pile-assorted-electronic-waste-including-components-devices-isolated-white-backg_829699-8257.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "A look at how e-waste is processed and disposed of.", date: "2024-01-25" },
        { id: 16, title: "The Hidden Dangers of E-Waste", image: "https://img.freepik.com/free-vector/pollution-awareness-element-set_1284-32824.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/900", description: "How e-waste harms the environment and health.", date: "2024-01-18" },
        { id: 17, title: "E-Waste and the Environment", image: "https://img.freepik.com/free-vector/pollution-icon-flat_98292-1496.jpg?t=st=1740156035~exp=1740159635~hmac=2669fac21b6b7279b5dc2ff1f739ad8bc3d2de1683bdd8f56715044527bc9912&w=900", description: "E-wastes destroyes the environment.", date: "2024-01-30" },
        { id: 18, title: "E-waste Repair Guide", image: "https://img.freepik.com/free-vector/image-upload-landing-page_52683-23795.jpg?ga=GA1.1.896588627.1740154867&semt=ais_hybrid/400", description: "Its high time to learn how to repair e-wastes!", date: "2024-01-30" },
        
        
      ],
    };
    
    // More blog posts...
  
  // More categories...




const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Recycle");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Set number of blogs per page
  const navigate = useNavigate();
  // Filter and paginate blogs
  const filteredBlogs = blogPosts[selectedCategory].filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [modalVisible, setModalVisible] = useState(false);
  
  // Example function to handle posting
  const handlePostBlog = (formData) => {
    console.log('Posting blog...',formData);
    setModalVisible(false);  // Close the modal after posting
  };
  
  // Slice the filtered blogs for pagination
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
  {["Recycle", "Refurbish", "E-waste"].map((category) => (
    <Button
      key={category}
      onClick={() => setSelectedCategory(category)}
      style={{
        margin: "0 10px",
        backgroundColor: selectedCategory === category ? "#579040" : "#f0f0f0",
        color: selectedCategory === category ? "#fff" : "#000",
        transition: "background-color 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#487C3E"}
      onMouseLeave={(e) => e.target.style.backgroundColor = selectedCategory === category ? "#579040" : "#f0f0f0"}
    >
      {category}
    </Button>
  ))}
</div>

 {/* Button to open PostBlog modal */}
 <Button 
        type="link" 
        onClick={() => setModalVisible(true)}  // Open modal on click
        style={{ background: "linear-gradient(#579040, #487C3E)", color: 'white' }}
        onMouseOver={(e) => e.target.style.background = "linear-gradient(#487C3E, #579040)"} 
        onMouseOut={(e) => e.target.style.background = "linear-gradient(#579040, #487C3E)"}
      >
        Post Blog
      </Button>

      {/* Blog Grid */}
      <Row gutter={[16, 16]}>
        {currentBlogs.map((blog) => (
          <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
            <Card
              hoverable
              cover={<img alt={blog.title} src={blog.image} />}
              style={{ height: "100%" }} // Ensure all cards have equal height
            >
              <Meta
                title={blog.title}
                description={
                  <>
                    <p>{blog.description}</p>
                    <small>{blog.date}</small>
                  </>
                }
              />
              <Link to={`/blog/${blog.id}`}>
                <Button
                  type="link"
                  style={{
                    color: "#fff",
                    backgroundColor: "#487C3E",
                    marginTop: "10px",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#579040"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#487C3E"}
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
      <PostBlog
        visible={modalVisible}
        onCancel={() => setModalVisible(false)} // Close modal
        onPost={handlePostBlog} // Handle the post data
      />


    </div>
  );
};

export default Blog;
