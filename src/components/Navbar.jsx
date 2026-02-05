import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-slate-50 border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold shadow-sm">HR</div>
            <span className="text-slate-800 font-semibold">HRMS Lite</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-slate-700 hover:text-indigo-600 transition">Employees</Link>
              <Link to="/attendance" className="text-slate-700 hover:text-indigo-600 transition">Attendance</Link>
              <Link to="/dashboard" className="text-slate-700 hover:text-indigo-600 transition">Dashboard</Link>
            </div>


            <div className="md:hidden">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
              >
                {open ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-3 pb-4 space-y-1">
            <Link onClick={() => setOpen(false)} to="/" className="block px-3 py-2 rounded text-slate-700 hover:bg-slate-50">Employees</Link>
            <Link onClick={() => setOpen(false)} to="/attendance" className="block px-3 py-2 rounded text-slate-700 hover:bg-slate-50">Attendance</Link>
            <Link onClick={() => setOpen(false)} to="/dashboard" className="block px-3 py-2 rounded text-slate-700 hover:bg-slate-50">Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
