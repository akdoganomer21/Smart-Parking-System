import React from "react";

const UserNavbar = () => {
  const token = localStorage.getItem("token");
  let userName = "";

  try {
    const base64 = token.split(".")[1];
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    userName = decoded?.name || decoded?.username || decoded?.email || "";
  } catch (err) {
    console.warn("JWT çözümleme hatası:", err.message);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
      {/* Sol: Logo */}
      <div className="font-bold text-xl tracking-wide flex items-center gap-2">
        <span className="text-2xl">🚗</span>
        <span>Smart Parking</span>
      </div>

      {/* Orta: Kullanıcı İsmi */}
      <div className="text-base sm:text-lg font-medium text-center">
        Merhaba,{" "}
        <span className="font-semibold capitalize">{userName || "kullanıcı"}</span> 👋
      </div>

      {/* Sağ: Çıkış */}
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-md font-semibold text-sm shadow"
        >
          ⎋ Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;