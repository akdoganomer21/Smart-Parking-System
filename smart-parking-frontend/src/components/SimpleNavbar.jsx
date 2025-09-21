import React from "react";
import { Link } from "react-router-dom";

const SimpleNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-3 flex justify-between items-center border-b border-gray-200">
      {/* Sol logo */}
      <div className="flex items-center gap-2 text-indigo-700 font-bold text-xl tracking-tight">
        <div className="bg-indigo-100 text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center font-extrabold shadow">
          SP
        </div>
        <span className="text-xl font-semibold">Smart Parking</span>
      </div>

      {/* Sağ buton */}
      <div>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-4 py-2 rounded shadow"
        >
          Ana Sayfaya Dön
        </Link>
      </div>
    </nav>
  );
};

export default SimpleNavbar;