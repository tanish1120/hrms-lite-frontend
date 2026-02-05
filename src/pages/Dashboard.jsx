import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const params = {};
      if (startDate) params.start_date = startDate;
      if (endDate) params.end_date = endDate;
      const res = await api.get("/attendance/summary", { params });
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to fetch summary", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto animate-fade">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>

      <div className="card p-4 rounded-xl shadow-md mb-6 transform transition duration-150 hover:shadow-lg">
        <h3 className="font-semibold">Summary</h3>
        {loading && <p>Loading...</p>}
        {summary && (
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="p-3 border rounded">
              <p className="text-sm text-muted">Employees</p>
              <p className="text-xl font-bold">{summary.total_employees}</p>
            </div>

            <div className="p-3 border rounded">
              <p className="text-sm text-muted">Attendance Records</p>
              <p className="text-xl font-bold">{summary.total_records}</p>
            </div>

            <div className="p-3 border rounded">
              <p className="text-sm text-muted">Total Present</p>
              <p className="text-xl font-bold">{summary.total_present}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">Per Employee</h3>
        {summary && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Present</th>
                  <th className="p-2">Absent</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {summary.per_employee.map((emp) => (
                  <tr key={emp.id} className="border-t">
                    <td className="p-2">{emp.employee_id}</td>
                    <td className="p-2">{emp.full_name}</td>
                    <td className="p-2">{emp.email}</td>
                    <td className="p-2">{emp.department}</td>
                    <td className="p-2">{emp.present_count}</td>
                    <td className="p-2">{emp.absent_count}</td>
                    <td className="p-2">{emp.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
