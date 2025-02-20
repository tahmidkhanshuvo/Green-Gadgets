import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Layout, Typography, Button, Container, Box, Select, MenuItem, FormControl, InputLabel, TextField, Stack, Paper } from "antd";

const { Content, Sider } = Layout;

const items = [
  {
    key: "sub1",
    icon: <MailOutlined />,
    label: "Navigation One",
    children: [
      { key: "1", label: "Option 1" },
      { key: "2", label: "Option 2" },
    ],
  },
  {
    key: "sub2",
    icon: <AppstoreOutlined />,
    label: "Navigation Two",
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
    ],
  },
  {
    key: "sub3",
    icon: <SettingOutlined />,
    label: "Navigation Three",
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
    ],
  },
];

const PostAd = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [showAdForm, setShowAdForm] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e);
    setSubcategory("");
    setShowAdForm(false);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e);
    setShowAdForm(!!e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ad submitted successfully!");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={256}>
        <Menu mode="vertical" items={items} />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", maxWidth: "800px", margin: "auto" }}>
          <Container maxWidth="md">
            <Typography.Title level={2} style={{ textAlign: "center" }}>Post Your Ad</Typography.Title>
            <Paper component="form" onSubmit={handleSubmit} style={{ padding: "24px", backgroundColor: "#e8f5e9", borderRadius: "8px" }}>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={handleCategoryChange}>
                    <MenuItem value="recycled">Recycled Product</MenuItem>
                    <MenuItem value="refurbished">Refurbished Products</MenuItem>
                    <MenuItem value="ewaste">E-waste</MenuItem>
                  </Select>
                </FormControl>

                {category && (
                  <FormControl fullWidth>
                    <InputLabel>Sub Category</InputLabel>
                    <Select value={subcategory} onChange={handleSubcategoryChange}>
                      {["TV", "Laptop", "Smart Phone"].map((sub) => (
                        <MenuItem key={sub} value={sub}>
                          {sub}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {showAdForm && (
                  <Stack spacing={3}>
                    <TextField fullWidth label="Title" required />
                    <TextField fullWidth label="Description" multiline rows={4} required />
                    <TextField fullWidth label="Quantity" type="number" required />
                    <TextField fullWidth label="Price" type="number" required />
                    <TextField fullWidth label="Location" required />
                    <TextField fullWidth label="Contact Number" required />
                    <Button type="submit" variant="contained" color="primary">Post Ad</Button>
                  </Stack>
                )}
              </Stack>
            </Paper>
          </Container>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PostAd;
