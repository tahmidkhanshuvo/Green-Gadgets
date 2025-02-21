import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Container, Typography, TextField, Stack, Divider } from "@mui/material";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./UserAccount.css";
import AdsFavorites from "./AdsFavorites";

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

  // ✅ Update user details
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

  // ✅ Update Password
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

  // ✅ Logout and Redirect to Login Page
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className={`account-title ${theme === "dark" ? "dark" : ""}`}>
        My Account
      </Typography>

      {/* ✅ Tabs for My Ads, Favorites, and Settings */}
      <Box className="tabs-container">
        <Button onClick={() => setActiveTab("myAds")} variant={activeTab === "myAds" ? "contained" : "outlined"}>
          My Ads
        </Button>
        <Button onClick={() => setActiveTab("favorites")} variant={activeTab === "favorites" ? "contained" : "outlined"}>
          Favorites
        </Button>
        <Button onClick={() => setActiveTab("settings")} variant={activeTab === "settings" ? "contained" : "outlined"}>
          Settings
        </Button>
      </Box>

      {/* ✅ Tab Content */}
      <Box className="tab-content">
        {activeTab === "settings" ? (
          <Box className={`settings-container ${theme === "dark" ? "dark" : ""}`}>
            <Typography variant="h6">Update Profile</Typography>
            <Stack spacing={2}>
              <TextField label="Email" value={userData.email || ""} disabled fullWidth />
              <TextField label="Name" value={userData.name || ""} onChange={(e) => setUserData({ ...userData, name: e.target.value })} fullWidth />
              <TextField label="Location" value={userData.location || ""} onChange={(e) => setUserData({ ...userData, location: e.target.value })} fullWidth />
              <Button variant="contained" color="primary" onClick={handleUpdateDetails}>Update Details</Button>
            </Stack>

            <Divider className="divider" />

            <Typography variant="h6">Change Password</Typography>
            <Stack spacing={2}>
              <TextField type="password" label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth />
              <Button variant="contained" color="secondary" onClick={handleChangePassword}>Change Password</Button>
            </Stack>

            <Divider className="divider" />

            <Button variant="outlined" color="error" onClick={handleLogout} fullWidth>Log Out</Button>
          </Box>
        ) : (
          <AdsFavorites activeTab={activeTab} />
        )}
      </Box>
    </Container>
  );
};

export default UserAccount;
