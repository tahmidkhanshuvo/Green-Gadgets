import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>  {/* Wrap entire app */}
    <App />
  </AuthProvider>
);
