import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, TextField, Stack, Divider } from "@mui/material";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./UserAccount.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const UserAccount = () => {
  const { user, logout, setUser, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user || {});

  // ✅ Only redirect after ensuring authentication state is checked
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => navigate("/login"), 500);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
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
  }, [setUser]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" className="account-title">My Account</Typography>

      <Box className="account-container">
        <Typography variant="h6">Update Profile</Typography>
        <Stack spacing={2}>
          <TextField label="Email" value={userData.email || ""} disabled fullWidth />
          <TextField label="Name" value={userData.name || ""} onChange={(e) => setUserData({ ...userData, name: e.target.value })} fullWidth />
          <Button variant="contained" color="primary">Update Details</Button>
        </Stack>

        <Divider className="divider" />

        <Button variant="outlined" color="error" onClick={logout} fullWidth>Log Out</Button>
      </Box>
    </Container>
  );
};

export default UserAccount;
