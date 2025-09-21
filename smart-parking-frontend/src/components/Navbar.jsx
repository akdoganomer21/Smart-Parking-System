import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Çıkış yapma fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // JWT içinden kullanıcı maili al
  let userEmail = "";
  try {
    const decoded = JSON.parse(atob(token?.split(".")[1]));
    userEmail = decoded?.email || "";
  } catch (err) {}

  const isAdmin = userEmail === "admin@parking.com.tr";

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-3 flex flex-col sm:flex-row justify-between items-center shadow-md fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
        <div className="h-10 w-10 bg-white text-indigo-800 flex items-center justify-center rounded-full shadow font-extrabold text-lg">
          SP
        </div>
        Smart Parking System
      </div>

      {/* Menü Linkleri */}
      <div className="flex flex-wrap gap-4 mt-3 sm:mt-0 items-center">
        {token ? (
          <>
            {isAdmin && (
              <Link
                to="/admin"
                className="hover:underline text-white font-medium flex items-center gap-1"
              >
                <FaUserShield /> Admin Paneli
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <FaSignOutAlt /> Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="hover:underline flex items-center gap-1 text-white"
            >
              <FaSignInAlt /> Giriş
            </Link>
            <Link
              to="/register"
              className="hover:underline flex items-center gap-1 text-white"
            >
              <FaUserPlus /> Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}