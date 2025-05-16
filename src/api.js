// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // or your FastAPI base URL
  withCredentials: true, // Optional: if using cookies
});

export default api;
