// src/components/DepartmentTable.jsx
// Displays a list of departments in a table.
// Props:
//   departments: array of department objects

export default function DepartmentTable({ departments }) {
  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title">Departments</h5>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Department ID</th>
                <th>Department Name</th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <tr key={dept.DepartmentId}>
                    <td>{dept.DepartmentId}</td>
                    <td>{dept.DepartmentName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-3">
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
