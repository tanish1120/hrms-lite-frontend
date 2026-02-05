import { useEffect, useState } from "react";
import { api, getErrorMessage } from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    api.get("/employees/").then((res) => setEmployees(res.data));
  }, []);

  const submitAttendance = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    try {
      await api.post("/attendance/", form);
      setMessageType("success");
      setMessage("Attendance marked successfully ✅");
    } catch (err) {
      setMessageType("error");
      setMessage(getErrorMessage(err));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto animate-fade">
      <form
        onSubmit={submitAttendance}
        className="bg-white p-5 rounded-xl shadow-md space-y-4 transform transition hover:shadow-lg duration-150"
      >
        <h2 className="text-lg font-semibold">
          Mark Attendance
        </h2>

        {message && (
          <p className={messageType === "error" ? "text-red-600 text-sm" : "text-green-600 text-sm"}>
            {message}
          </p>
        )}

        <select
          className="w-full border p-2 rounded"
          value={form.employee_id}
          onChange={(e) =>
            setForm({ ...form, employee_id: e.target.value })
          }
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <select
          className="w-full border p-2 rounded"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Submit Attendance
        </button>
      </form>
    </div>
  );
}
