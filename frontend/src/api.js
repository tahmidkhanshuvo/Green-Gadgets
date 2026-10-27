import axios from "axios";

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/+$/, "");

// Attach credentials only to our own API, never to image hosts or other services.
axios.interceptors.request.use((config) => {
  const url = new URL(config.url, window.location.origin);
  if (
    url.origin === new URL(API_URL, window.location.origin).origin &&
    url.pathname.startsWith("/api/")
  ) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.timeout ??= 90000;
  }
  return config;
});
