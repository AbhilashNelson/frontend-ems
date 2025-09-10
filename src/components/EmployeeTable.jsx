// src/components/EmployeeTable.jsx
// A Bootstrap-styled table component to display a list of employees.
// Props:
//  - data: array of employee objects
//  - onEdit(employee): callback when Edit clicked
//  - onDelete(id): callback when Delete clicked
export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Employees</h5>

        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Contact</th>
                <th>Is Active</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.length > 0 ? (
                employees.map((emp, idx) => (
                  <tr key={emp.EmployeeId ?? idx}>
                    <th scope="row">{emp.EmployeeId ?? idx + 1}</th>
                    <td>{emp.EmployeeName}</td>
                    <td>{emp.Designation}</td>
                    <td>{emp.Department.DepartmentName}</td>
                    <td>{emp.DateOfJoining}</td>
                    <td>{emp.Contact}</td>
                    <td>{emp.IsActive ? "Yes" : "No"}</td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(emp)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => { if (emp.EmployeeId == null) return; if (confirm("Delete this employee?")) onDelete(emp.EmployeeId); }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}