// src\pages\DepartmentsPage.jsx
// DepartmentsPage - list all departments
import { useEffect, useState } from "react";
import DepartmentTable from "../components/DepartmentTable";
import { fetchDepartments } from "../api";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(Array.isArray(data) ? data : []);
  };

  return (
    <div className="container mt-4">
      <h2>Departments</h2>
      <DepartmentTable departments={departments} />
    </div>
  );
}