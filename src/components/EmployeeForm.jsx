// src/components/EmployeeForm.jsx
// Enhanced form to support both "Add" and "Edit" mode
// Props:
//   onSubmit(payload): called when form is submitted
//   departments: array of department objects to populate dropdown
//   editingEmployee: object containing employee data to edit
//   onCancel: function to call when cancel button is clicked

import { useState,useEffect } from "react";

export default function EmployeeForm({ onSubmit, departments, editingEmployee, onCancel }) {
  // Controlled form inputs
  const [EmployeeName, setEmployeeName] = useState("");
  const [Designation, setDesignation] = useState("");
  const [DateOfJoining, setDateOfJoining] = useState("");
  const [Contact, setContact] = useState("");
  const [IsActive, setIsActive] = useState(true);
  const [DepartmentId, setDepartmentId] = useState("");

  // Populate form when editingEmployee changes
  useEffect(() => {
    if (editingEmployee) {
      setEmployeeName(editingEmployee.EmployeeName);
      setDesignation(editingEmployee.Designation);
      setDateOfJoining(editingEmployee.DateOfJoining);
      setContact(editingEmployee.Contact);
      setIsActive(editingEmployee.IsActive);
      setDepartmentId(editingEmployee.DepartmentId);
    }
  }, [editingEmployee]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Build payload as per backend API
    const payload = {
      EmployeeName,
      Designation,
      DateOfJoining,
      Contact,
      IsActive,
      DepartmentId: Number(DepartmentId),
    };
    // Call parent-provided function
    onSubmit(payload, editingEmployee?.EmployeeId); // pass id if editing
    // Clear form after submit
    resetForm();
  };

  const resetForm = () => {
    setEmployeeName("");
    setDesignation("");
    setDateOfJoining("");
    setContact("");
    setIsActive(true);
    setDepartmentId("");
  };


  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Add New Employee</h5>
        <form onSubmit={handleSubmit}>
          {/* Employee Name */}
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              className="form-control"
              value={EmployeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>

          {/* Designation */}
          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              className="form-control"
              value={Designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>

          {/* Date of Joining */}
          <div className="mb-3">
            <label className="form-label">Date of Joining</label>
            <input
              type="date"
              className="form-control"
              value={DateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
              required
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          {/* IsActive */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={IsActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label className="form-check-label">Active</label>
          </div>

          {/* Department Dropdown */}
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={DepartmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept.DepartmentId} value={dept.DepartmentId}>
                  {dept.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-success me-2">
            {editingEmployee ? "Update" : "Create"}
          </button>

          {editingEmployee && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
