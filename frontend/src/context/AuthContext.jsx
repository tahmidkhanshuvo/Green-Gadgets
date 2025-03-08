import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Fetch user when token is available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/account/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched user:", data.user); // Verify that _id is present
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
        logout();
      }
    };

    fetchProfile();
  }, []);

  // Update isAuthenticated when user changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(!!storedUser);
  }, [user]);

  // Login function updates state immediately
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function clears state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
