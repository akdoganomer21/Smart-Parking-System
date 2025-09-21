import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const email = decoded?.email;

    // Admin sayfasına sadece admin girsin
    if (adminOnly && email !== "admin@parking.com.tr") {
      return <Navigate to="/dashboard" replace />;
    }

    // Normal sayfaya admin girerse yönlendir
    if (!adminOnly && email === "admin@parking.com.tr" && location.pathname !== "/admin") {
      return <Navigate to="/admin" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/" replace />;
  }
}
