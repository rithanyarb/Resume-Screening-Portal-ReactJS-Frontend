import React, { useState } from "react";
import api from "../api";

function AdminLogin({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("name", name);
      formData.append("password", password);

      await api.post("/admin/login/", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      alert("Admin authenticated successfully!");
      onLogin();
    } catch (error) {
      alert("Authentication failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
