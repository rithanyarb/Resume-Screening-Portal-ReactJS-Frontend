# Resume Screening Portal — Frontend

This is the **React.js frontend** for the Kaay Labs Resume Screening Portal. It allows candidates to register and upload resumes, and enables admins to log in, view registered candidates by job role, process resumes using FAISS + LLM (via FastAPI backend), and view top-matching candidates.

---

### Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/)
  Nodejs - v18.17.0
- `npm` (comes with Node.js)
- Create **.env file** [here](#3-configure-environment).
  
## Features

### Candidate Portal

- ✅ User Registration
- ✅ Resume Upload (PDF ≤ 200KB) -PostgresSQL storage limitations 5MB
- ✅ Select Job Role

### Admin Portal

- ✅ Admin Login
- ✅ View Candidates by Job Role
- ✅ Trigger Resume Screening (FAISS + LLM)
- ✅ View Top Candidates with ATS Scores
- ✅ Inline Resume PDF Viewer

---

## 🔧 Tech Stack

- **Frontend**: React.js, React Router, Axios, Bootstrap (React-Bootstrap)
- **Backend**: [Refer](https://github.com/rithanyarb/Resume-Screening-API-Backend)

---

## 📁 Project Structure

```

📂resume-frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── AdminDashboard.js
│ │ ├── AdminLogin.js
│ │ ├── ResumeUpload.js
│ │ └── UserRegister.js
│ ├── App.js
│ ├── api.js
│ └── index.js
├── .env
├── package.json
├── README.md

```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/resume_frontend.git
cd resume_frontend
```

### 2. Install Dependencies

```bash
npm install
npx create-react-app resume-frontend
cd resume-frontend
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

> Replace with your actual FastAPI backend URL.

### 4. Run the Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 API Endpoints Expected

These are the backend API endpoints this frontend interacts with:

| Endpoint                            | Method | Description                            |
| ----------------------------------- | ------ | -------------------------------------- |
| `/user/register/`                   | POST   | Register new user                      |
| `/user/upload/`                     | POST   | Upload resume and job role             |
| `/admin/login/`                     | POST   | Admin authentication                   |
| `/admin/login/users/?role=XYZ`      | GET    | Get users by job role                  |
| `/admin/login/users/faiss-process/` | GET    | Run FAISS+LLM screening for a job role |
| `/admin/login/resume/pdf/<user_id>` | GET    | Get resume PDF for selected user       |

---

## Processes my app exhibits

- Register new user and upload resume
- Admin login and view user list by role
- Resume screening process works with FAISS+LLM
- PDFs are viewable inline or in new tab

---

## ✍️ Author

Made with ❤️ by **RB Rithanya**

---

## 📜 License

Free to use for personal and educational purposes.
