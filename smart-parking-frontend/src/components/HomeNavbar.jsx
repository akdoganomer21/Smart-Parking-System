import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 shadow-lg fixed top-0 left-0 right-0 z-50 px-8 py-4 flex justify-between items-center backdrop-blur-sm bg-opacity-90 transition-all duration-300">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tight hover:scale-105 transition-transform duration-300">
        <div className="bg-white text-indigo-700 rounded-full w-12 h-12 flex items-center justify-center shadow-lg text-xl">
          SP
        </div>
        <span className="hidden sm:inline">Smart Parking</span>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 sm:gap-6 items-center text-sm font-medium">
        <a
          href="#about"
          className="text-white hover:text-yellow-300 transition duration-300 hover:underline underline-offset-4"
        >
          Hakkımızda
        </a>
        <a
          href="#solutions"
          className="text-white hover:text-yellow-300 transition duration-300 hover:underline underline-offset-4"
        >
          Çözümler
        </a>
        <a
          href="#contact"
          className="text-white hover:text-yellow-300 transition duration-300 hover:underline underline-offset-4"
        >
          Bize Ulaşın
        </a>
        <Link
          to="/hizmetlerimiz"
          className="text-white hover:text-yellow-300 transition duration-300 hover:underline underline-offset-4"
        >
          Hizmetlerimiz
        </Link>
        <Link
          to="/sss"
          className="text-white hover:text-yellow-300 transition duration-300 hover:underline underline-offset-4"
        >
          SSS
        </Link>
        <Link
          to="/login"
          className="bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-900 transition px-4 py-1.5 rounded-md shadow font-semibold"
        >
          Giriş Yap
        </Link>
        <Link
          to="/register"
          className="bg-yellow-400 text-indigo-800 hover:bg-yellow-500 transition px-4 py-1.5 rounded-md shadow font-semibold"
        >
          Kayıt Ol
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;