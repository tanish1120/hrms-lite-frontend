import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import EmployeeDetail from "./pages/EmployeeDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
