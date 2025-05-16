import React, { useState } from "react";
import api from "../api";

function ResumeUpload() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("role", role);
    formData.append("file", file);

    try {
      await api.post("/user/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Resume uploaded successfully!");
    } catch (error) {
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Upload Resume</h2>
      <form onSubmit={handleUpload}>
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

        <div className="mb-3">
          <label className="form-label">Role:</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="software_developer">Software Developer</option>
            <option value="web_developer">Web Developer</option>
            <option value="business_analyst">Business Analyst</option>
            <option value="aiml_intern">AIML Intern</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Resume (PDF):</label>
          <input
            type="file"
            className="form-control"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}

export default ResumeUpload;
