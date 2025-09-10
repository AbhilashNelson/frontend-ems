// LoginPage - Authenticate user
// src/pages/LoginPage.jsx
import { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      setMessage("Login successful ");
      navigate("/"); // redirect to employees
    } catch (err) {
      setMessage("Login failed ! " + (err.response?.data?.detail || err.message));
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text" className="form-control"
            value={username} onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password" className="form-control"
            value={password} onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}