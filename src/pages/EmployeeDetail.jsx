import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getErrorMessage } from "../api";

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("desc");
  const [error, setError] = useState("");

  const fetchEmployee = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/employees/${id}`, { params: { sort } });
      setEmployee(res.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sort]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!employee) return <p className="p-6">No employee found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fade">
      <div className="card p-4 rounded-xl shadow mb-6 transform transition hover:shadow-lg duration-150">
        <h2 className="text-lg font-semibold">{employee.full_name} <span className="text-xs text-muted">{employee.employee_id}</span></h2>
        <p className="text-sm text-muted">{employee.email} • {employee.department}</p>
        <p className="text-sm text-muted mt-2">Present: <strong>{employee.present_count}</strong> • Absent: <strong>{employee.absent_count}</strong> • Total: <strong>{employee.total}</strong></p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Attendance</h3>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
            >
              Sort: {sort === "desc" ? "Newest" : "Oldest"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {employee.attendance.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-2">{a.date}</td>
                  <td className="p-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
