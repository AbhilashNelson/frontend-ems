// src/pages/SignupPage.jsx
// SignupPage - Register new user
import { useState } from "react";
import { signupUser } from "../api";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ username, password, group_name: groupName });
      setMessage("Signup successful! You can now log in.");
      setUsername(""); setPassword(""); setGroupName("");
    } catch (err) {
      setMessage("Signup failed ! " + (err.response?.data?.detail || err.message));
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h2>Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSignup}>
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
        <div className="mb-3">
          <label className="form-label">Group Name</label>
          <input
            type="text" className="form-control"
            value={groupName} onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Signup</button>
      </form>
    </div>
  );
}
