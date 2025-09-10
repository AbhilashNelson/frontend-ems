// src/App.jsx
// Define routes for Employees and Departments
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import EmployeesPage from "./pages/EmployeesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// Define a functional component called PrivateRoute that receives children as a prop
function PrivateRoute({ children }) {
  // Get the JWT token from localStorage to check if the user is authenticated
  const token = localStorage.getItem("token");
  // If the token exists, render the protected children components
  // Otherwise, redirect the user to the "/login" page
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Default route shows employees */}
        <Route path="/" element={
          <PrivateRoute><EmployeesPage /></PrivateRoute>
        } />
        {/* Departments route */}
        <Route path="/departments" element={
          <PrivateRoute><DepartmentsPage /></PrivateRoute>
        } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}