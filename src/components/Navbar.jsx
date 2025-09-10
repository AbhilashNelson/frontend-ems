// Components/Navbar.jsx
// A reusable navigation bar using Bootstrap.
// This will appear at the top of every page.
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let username = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      username = decoded.sub; // username from token
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Container keeps content aligned */}
      <div className="container-fluid">
        {/* Navbar brand (logo/title) */}
        <a className="navbar-brand" href="#">
          EMS Systems - {username ? `Hello, ${username}` : "Not logged in"}
        </a>
        {/* Right side: links */}
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* if valid token exists show employees and dept */}
            {token && (
              <>
            <li className="nav-item">
              <Link className="nav-link" to="/">Employees</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/departments">Departments</Link>
            </li>
            </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
