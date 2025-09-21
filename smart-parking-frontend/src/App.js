import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/HomePage";
import HomeNavbar from "./components/HomeNavbar";
import Hizmetlerimiz from "./pages/Hizmetlerimiz";
import SssPage from "./pages/SssPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana Sayfa */}
        <Route
          path="/"
          element={
            <>
              <HomeNavbar />
              <HomePage />
            </>
          }
        />

        {/* Giriş ve Kayıt */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Paneli */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Navbar />
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Kullanıcı Paneli - ❗️Navbar artık sadece UserDashboard içinde */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ekstra Sayfalar */}
        <Route path="/hizmetlerimiz" element={<Hizmetlerimiz />} />
        <Route path="/sss" element={<SssPage />} />
      </Routes>
    </Router>
  );
}

export default App;