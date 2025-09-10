//src\pages\EmployeesPage.jsx
// EmployeesPage - manages employee CRUD
import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import {
  fetchEmployees,
  fetchDepartments,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
    loadDepartments();
  }, []);

  const loadEmployees = async () => {
    const data = await fetchEmployees();
    setEmployees(Array.isArray(data) ? data : []);
  };

  const loadDepartments = async () => {
    const data = await fetchDepartments();
    setDepartments(Array.isArray(data) ? data : []);
  };


  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;
    await deleteEmployee(id);
    loadEmployees();
  };

  const handleSubmit = async (payload, id) => {
    if (id) {
      await updateEmployee(id, payload);
      setEditingEmployee(null);
    } else {
      await createEmployee(payload);
    }
    loadEmployees();
  };

  return (
    <div className="container mt-4">
      <h2>Employees</h2>
      <div className="row">
        <div className="col-md-5 mb-4">
          <EmployeeForm onSubmit={handleSubmit} 
          departments={departments} 
          editingEmployee={editingEmployee}
          onCancel={() => setEditingEmployee(null)}
          />
        </div>
        <div className="col-md-7">
          <EmployeeTable
            employees={employees}
            onEdit={(emp) => setEditingEmployee(emp)}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}