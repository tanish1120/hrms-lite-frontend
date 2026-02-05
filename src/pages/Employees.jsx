import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import EmployeeForm from "../components/EmployeeForm";
import ConfirmModal from "../components/ConfirmModal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees/");
      const employeesData = res.data;

      // Fetch attendance summary to get present/absent counts per employee
      const summaryRes = await api.get("/attendance/summary");
      const perEmp = summaryRes.data.per_employee || [];

      const merged = employeesData.map((emp) => {
        const s = perEmp.find((p) => p.id === emp.id) || {};
        return {
          ...emp,
          present_count: s.present_count || 0,
          absent_count: s.absent_count || 0,
          total_attendance: s.total || 0,
        };
      });

      setEmployees(merged);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    } finally {
      setLoading(false);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };

  const requestDelete = (emp) => {
    setEmployeeToDelete(emp);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!employeeToDelete) return;
    await deleteEmployee(employeeToDelete.id);
    setShowConfirm(false);
    setEmployeeToDelete(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <aside className="p-6 rounded-xl shadow-sm card">
          <h2 className="text-lg font-semibold mb-3 accent">Add Employee</h2>
          <EmployeeForm refresh={fetchEmployees} />
        </aside>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Employee List</h2>
            <p className="text-sm text-muted">{employees.length} employees</p>
          </div>

          {loading && <p>Loading...</p>}

          {!loading && employees.length === 0 && (
            <p className="text-gray-500">No employees added yet.</p>
          )}

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((emp) => (
              <li
                key={emp.id}
                className="p-4 rounded-lg shadow-sm hover:shadow-md transform transition hover:-translate-y-1 duration-150"
                style={{ background: 'var(--card)', borderLeft: '4px solid var(--accent)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/employees/${emp.id}`} className="font-semibold text-indigo-700 hover:underline">
                      {emp.full_name}
                    </Link>
                    <p className="text-xs text-muted">{emp.employee_id}</p>
                    <p className="text-sm text-muted">{emp.department} • {emp.email}</p>
                    <p className="text-sm text-muted mt-2">Present: <strong>{emp.present_count}</strong> • Absent: <strong>{emp.absent_count}</strong></p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => requestDelete(emp)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete Employee"
          message={`Are you sure you want to delete '${employeeToDelete?.full_name}'? This cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}
