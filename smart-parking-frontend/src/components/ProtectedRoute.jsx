import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Token yoksa → login sayfasına yönlendir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // JWT decode
    const email = decoded?.email;

    // ✅ Admin kontrolü
    if (adminOnly && email !== "admin@parking.com.tr") {
      return <Navigate to="/dashboard" replace />;
    }

    // ✅ Admin kullanıcı yanlış sayfadaysa admin paneline yönlendir
    if (!adminOnly && email === "admin@parking.com.tr" && location.pathname !== "/admin") {
      return <Navigate to="/admin" replace />;
    }

    // Eğer sorun yoksa → route’u render et
    return children;
  } catch (err) {
    console.error("Token çözümleme hatası:", err);
    localStorage.removeItem("token"); // Geçersiz token varsa temizle
    return <Navigate to="/login" replace />;
  }
}
