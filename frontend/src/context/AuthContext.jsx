import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      return stored ? { ...stored, _id: stored._id || stored.id } : null;
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
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

        setUser({ ...data.user, _id: data.user._id || data.user.id });
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) logout();
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
  const login = useCallback((userData, token) => {
    localStorage.setItem("token", token);
    const normalizedUser = { ...userData, _id: userData._id || userData.id };
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);
    setIsAuthenticated(true);
  }, []);

  // Logout function clears state
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
