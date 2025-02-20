import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginSignup = ({ setIsAuthenticated, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (isLogin) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === values.email && storedUser.password === values.password) {
          setUser(storedUser); // Update the user state
          setIsAuthenticated(true);
          message.success('Logged in successfully!');
          navigate('/account');
        } else {
          message.error('Incorrect email or password!');
        }
      } else {
        localStorage.setItem('user', JSON.stringify(values)); // Save the user data on signup
        setUser(values); // Update the user state
        setIsAuthenticated(true);
        message.success('Signed up successfully!');
        navigate('/account');
      }
      setLoading(false);
    }, 1000);
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '30px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ background: 'linear-gradient(#579040, #487C3E)', color: 'white' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Button type="link" onClick={toggleForm}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginSignup;