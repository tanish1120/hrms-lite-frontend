import { useState } from "react";
import { api, getErrorMessage } from "../api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    department: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    try {
      await api.post("/employees/", form);
      refresh();
      setForm({
        full_name: "",
        email: "",
        department: "",
      });
    } catch (err) {
      const detail = err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        const fe = {};
        detail.forEach((d) => {
          if (Array.isArray(d.loc) && d.loc.includes("email")) {
            fe.email = d.msg;
          }
        });
        setFieldErrors(fe);
        setError("Please correct the highlighted fields.");
      } else {
        const msg = getErrorMessage(err);
        if (typeof msg === "string" && msg.toLowerCase().includes("email") && msg.toLowerCase().includes("exist")) {
          setFieldErrors({ email: msg });
          setError("Please correct the highlighted fields.");
        } else {
          setError(msg);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 rounded-xl shadow-md space-y-3 transform transition hover:shadow-lg hover:-translate-y-1 duration-150"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add Employee</h2>
        <span className="text-xs text-gray-400">Employee ID auto-generated</span>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <input
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        value={form.full_name}
        onChange={(e) =>
          setForm({ ...form, full_name: e.target.value })
        }
        required
      />

      <input
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        required
      />

      {fieldErrors.email && (
        <p className="text-red-500 text-sm">{fieldErrors.email}</p>
      )}

      <input
        placeholder="Department"
        className="w-full border p-2 rounded"
        value={form.department}
        onChange={(e) =>
          setForm({ ...form, department: e.target.value })
        }
        required
      />

      <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transform transition active:scale-95">
        Add Employee
      </button>
    </form>
  );
}
