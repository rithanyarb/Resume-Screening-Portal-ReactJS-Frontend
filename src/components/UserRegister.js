import React, { useState } from "react";
import api from "../api";

function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);

    try {
      const response = await api.post("/user/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Registration successful! User ID: ${response.data.user_id}`);
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">User Registration</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
