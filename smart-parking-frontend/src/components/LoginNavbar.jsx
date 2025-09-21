// src/components/LoginNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl">
        <div className="bg-indigo-100 text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center font-extrabold shadow">
          SP
        </div>
        Smart Parking
      </div>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition font-semibold text-sm"
      >
        Ana Sayfaya Dön
      </Link>
    </nav>
  );
};

export default LoginNavbar;