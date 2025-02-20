import React, { useState } from "react";
import { List, Avatar, Space, Button, Card, Input, Modal, Form, Radio, message } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined, SearchOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import "antd/dist/reset.css"; // Import Ant Design styles

const articles = {
  recycle: [
    {
      title: "How to Recycle E-Waste Products",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
      description: "E-waste recycling is an essential process in managing discarded electronic devices responsibly.",
      content: `E-waste recycling ensures materials are reused efficiently, reducing environmental damage. Many electronic components, such as metals, plastics, and rare earth elements, can be extracted and repurposed.`
    },
    {
      title: "Benefits of Recycling",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
      description: "Recycling e-waste conserves natural resources and prevents hazardous waste.",
      content: `Recycling e-waste conserves natural resources and prevents hazardous waste. Many electronics contain valuable materials such as gold, copper, and silver.`
    },
  ],
  refurbish: [
    {
      title: "How to Refurbish E-Waste Products",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=3",
      description: "Refurbishing extends the lifespan of devices while reducing unnecessary disposal.",
      content: `Refurbishing old electronic devices not only helps in reducing e-waste but also provides economic benefits by giving second-hand products a new life.`
    },
    {
      title: "Benefits of Refurbishing E-Waste",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      description: "Refurbishing electronics contributes to sustainability and provides affordable tech options.",
      content: `Refurbishing electronics contributes to sustainability by reducing the amount of e-waste that ends up in landfills.`
    },
  ],
  ewaste: [
    {
      title: "E-Waste: A Growing Challenge",
      avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
      description: "The impact of e-waste on the environment and how we can mitigate it.",
      content: `E-waste is one of the fastest-growing waste streams globally. It contains hazardous substances like lead, mercury, and cadmium. Proper disposal and recycling are critical to minimizing environmental damage.`
    },
  ]
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Blog = ({ themeMode }) => {
  const [selectedTopic, setSelectedTopic] = useState("recycle");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("recycle");
  const [confirmVisible, setConfirmVisible] = useState(false);

  // Filter articles based on search input
  const filteredArticles = articles[selectedTopic].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDarkMode = themeMode === "dark";
  const cardBackground = isDarkMode ? "#f0f0f0" : "#f8f8f8";
  const textColor = isDarkMode ? "#000" : "#333";

  const handleOpenPostModal = () => {
    setIsPostModalVisible(true);
  };

  const handleCancelPostModal = () => {
    setIsPostModalVisible(false);
  };

  const handlePostBlog = () => {
    message.success("Blog posted successfully!");
    setIsPostModalVisible(false);
    // Here you can send the blog data to your server or save it locally
  };

  const handlePostClick = () => {
    setConfirmVisible(true);
  };

  const handleConfirmPost = () => {
    handlePostBlog();
    setConfirmVisible(false);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "auto", color: textColor }}>

      {/* Search Input */}
      <Input
        placeholder="Search articles..."
        prefix={<SearchOutlined />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {/* Topic Selection Buttons */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {Object.keys(articles).map((topic) => (
          <Button
            key={topic}
            type={selectedTopic === topic ? "primary" : "default"}
            onClick={() => setSelectedTopic(topic)}
            style={{ margin: "0 10px", fontSize: "16px" }}
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)}
          </Button>
        ))}
      </div>

      {/* "Post Blog" Button */}
      <Button
        type="primary"
        onClick={handleOpenPostModal}
        block
        style={{
          background: "linear-gradient(#579040, #487C3E)",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => e.target.style.color = "black"}
        onMouseLeave={(e) => e.target.style.color = "white"}
      >
        Post Blog
      </Button>

      {/* Articles List */}
      <List
        itemLayout="vertical"
        size="large"
        pagination={{ pageSize: 2 }}
        dataSource={filteredArticles}
        renderItem={(item) => (
          <Card style={{ backgroundColor: cardBackground, color: textColor, marginBottom: "16px", borderRadius: "8px" }}>
            <List.Item
              key={item.title}
              actions={[
                <IconText icon={StarOutlined} text="156" key="star" />,
                <IconText icon={LikeOutlined} text="120" key="like" />,
                <IconText icon={MessageOutlined} text="24" key="comment" />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href="#" style={{ color: textColor }}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          </Card>
        )}
      />

      {filteredArticles.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>No articles found.</p>
      )}

      {/* Post Blog Modal */}
      <Modal
        title="Post a New Blog"
        visible={isPostModalVisible}
        onCancel={handleCancelPostModal}
        footer={null}
        width={800}
      >
        <Form layout="vertical">
          {/* Category Selection */}
          <Form.Item label="Select Blog Category">
            <Radio.Group
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <Radio value="recycle">Recycle</Radio>
              <Radio value="refurbish">Refurbish</Radio>
              <Radio value="ewaste">E-Waste</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Title Input */}
          <Form.Item label="Blog Title">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
            />
          </Form.Item>

          {/* Short Description Input */}
          <Form.Item label="Short Description">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter a short description for your blog"
            />
          </Form.Item>

          {/* Blog Content Editor */}
          <Form.Item label="Blog Content">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your blog here..."
              theme="snow"
            />
          </Form.Item>

          {/* Post Blog Button */}
          <Button
            type="primary"
            block
            onClick={handlePostClick}
            style={{
              background: "linear-gradient(#579040, #487C3E)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Post Blog
          </Button>
        </Form>
      </Modal>

      {/* Confirmation Dialog */}
      <Modal
        title="Confirm Post"
        visible={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={handleConfirmPost}
        okText="Confirm"
        cancelText="Cancel"
      >
        <p>Are you sure you want to post this blog?</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Description:</strong> {description}</p>
        <div><strong>Content Preview:</strong></div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </Modal>
    </div>
  );
};

export default Blog;
