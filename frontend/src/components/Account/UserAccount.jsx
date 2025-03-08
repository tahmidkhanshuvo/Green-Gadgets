import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Typography, Divider } from "@mui/material";
import { Form, Input } from "antd";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import AdsFavorites from "./AdsFavorites";
import { Layout, Menu } from 'antd';
import { AppstoreOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import "./UserAccount.css";

const { Header, Content, Footer, Sider } = Layout;

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const UserAccount = ({ theme }) => {
  const { user, logout, setUser, isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState(user || {});
  const [newPassword, setNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState("myAds");

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(`${API_URL}/api/account/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(data.user);
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        logout();
      }
    };

    fetchProfile();
  }, [isAuthenticated, logout, setUser]);

  const handleUpdateDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(`${API_URL}/api/account/update`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/api/account/change-password`, { newPassword }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Password changed successfully!");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // Menu items for the Sider
  const siderItems = [
    { label: 'My Ads', key: 'myAds', icon: <AppstoreOutlined /> },
    { label: 'Favorites', key: 'favorites', icon: <HeartOutlined /> },
    { label: 'Settings', key: 'settings', icon: <SettingOutlined /> },
  ];

  const handleMenuClick = ({ key }) => {
    setActiveTab(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ backgroundColor: '#e0f2e9' }}>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeTab]}
          onClick={handleMenuClick}
          style={{ border: 0 }} // Remove default border
        >
          {siderItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} className="tab-button">
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      
      <Layout>
        <Header
          style={{
            padding: 0,
            background: theme === "dark" ? '#333' : '#fff',
          }}
        />
        <Content style={{ margin: '0 16px' }}>
          <Typography variant="h4" className={`account-title ${theme}`}>
            My Account
          </Typography>

          <div className="tab-content">
            {activeTab === "settings" ? (
              <div className="settings-container">
                <Typography variant="h6" className="settings-title">
                  Update Profile
                </Typography>
                <Form layout="vertical">
                  <Form.Item label="Email">
                    <Input value={userData.email || ""} disabled />
                  </Form.Item>
                  <Form.Item label="Name">
                    <Input value={userData.name || ""} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                  </Form.Item>
                  <Form.Item label="Location">
                    <Input value={userData.location || ""} onChange={(e) => setUserData({ ...userData, location: e.target.value })} />
                  </Form.Item>
                  <Button className="update-button" onClick={handleUpdateDetails}>
                    Update Details
                  </Button>
                </Form>

                <Divider className="divider" />

                <Typography variant="h6" className="settings-title">
                  Change Password
                </Typography>
                <Form layout="vertical">
                  <Form.Item label="New Password">
                    <Input.Password value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </Form.Item>
                  <Button className="update-button" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </Form>

                <Divider className="divider" />

                <Button className="logout-button" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <AdsFavorites activeTab={activeTab} />
            )}
          </div>
        </Content>
        
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserAccount;
