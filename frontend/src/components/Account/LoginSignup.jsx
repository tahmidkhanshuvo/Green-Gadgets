import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./LoginSignup.css";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

  // ✅ Redirect to /account only after authentication updates
  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => navigate("/account"), 200);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      if (!isLogin && values.password !== values.confirmPassword) {
        message.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const { data } = await axios.post(`${API_URL}${endpoint}`, values);

      localStorage.setItem("token", data.token);
      login(data.user, data.token);
      message.success(isLogin ? "Login successful!" : "Signup successful!");
    } catch (error) {
      message.error(error.response?.data?.message || "Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <Title level={2} className="center-text">{isLogin ? "Login" : "Sign Up"}</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        {!isLogin && (
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        {!isLogin && (
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        )}
        <Button type="primary" htmlType="submit" block loading={loading} className="gradient-button">
          {isLogin ? "Login" : "Sign Up"}
        </Button>
      </Form>
    </div>
  );
};

export default LoginSignup;
