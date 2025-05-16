import React, { useState } from "react";
import api from "../api";
import Spinner from "react-bootstrap/Spinner";

function AdminDashboard() {
  const [role, setRole] = useState("");
  const [topN, setTopN] = useState(5);
  const [users, setUsers] = useState([]);
  const [topResumes, setTopResumes] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/login/users/", {
        params: { role },
      });
      setUsers(response.data);
    } catch (error) {
      alert("Failed to fetch users.");
    }
  };

  const processResumes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/login/users/faiss-process/", {
        params: { role, top_n: topN },
      });
      const key = `top_${topN}_resumes`;
      setTopResumes(response.data[key] || []);
    } catch (error) {
      alert("Failed to process resumes.");
    } finally {
      setLoading(false);
    }
  };

  const openPdfInNewWindow = (userId) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/admin/login/resume/pdf/${userId}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Role:</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="software_developer">Software Developer</option>
            <option value="web_developer">Web Developer</option>
            <option value="business_analyst">Business Analyst</option>
            <option value="aiml_intern">AIML Intern</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Top N Resumes:</label>
          <input
            type="number"
            className="form-control"
            value={topN}
            min="1"
            max="20"
            onChange={(e) => setTopN(parseInt(e.target.value))}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary me-2" onClick={fetchUsers}>
            Fetch Users
          </button>
          <button className="btn btn-success" onClick={processResumes}>
            Process Resumes
          </button>
        </div>
      </div>

      <div className="row">
        {/* Users list */}
        <div className="col-md-6">
          <h4>Users:</h4>
          <ul className="list-group">
            {users.map((user) => (
              <li key={`user-${user.id}`} className="list-group-item">
                <strong>{user.name}</strong> ({user.email})
              </li>
            ))}
          </ul>
        </div>

        {/* Top resumes */}
        <div className="col-md-6">
          <h4>Top {topN} Resumes:</h4>
          {loading && (
            <div className="my-2">
              <Spinner animation="grow" variant="primary" size="sm" />
              <span className="ms-2">Processing resumes...</span>
            </div>
          )}
          <ul className="list-group">
            {topResumes.map((resume) => (
              <li
                key={`top-${resume.user_id}`}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{resume.user_name}</strong> - ATS Score:{" "}
                  <span className="badge bg-info">{resume.ats_score}</span>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedUserId(resume.user_id)}
                  >
                    View PDF
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => openPdfInNewWindow(resume.user_id)}
                  >
                    Open in New Window
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* PDF Viewer */}
      {selectedUserId && (
        <div className="mt-5">
          <h5>Resume PDF (User ID: {selectedUserId})</h5>
          <div className="ratio ratio-16x9">
            <iframe
              src={`${process.env.REACT_APP_API_BASE_URL}/admin/login/resume/pdf/${selectedUserId}`}
              title="Resume PDF"
              style={{ border: "1px solid #ccc" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
