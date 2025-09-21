import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginNavbar from "../components/LoginNavbar"; // ✅ Navbar eklendi

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setSuccess("");
    setEmailError(false);
    setPasswordError(false);

    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setSuccess("Giriş başarılı!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError("Yanlış e-posta veya şifre.");
        if (!data.user.email === email) {
          setEmailError(true);
        }
        if (data.message === "Geçersiz şifre") {
          setPasswordError(true);
        }
      }
    } catch (err) {
      setError("Hata: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-indigo-800 pt-20">
      <LoginNavbar /> {/* ✅ Navbar çağrıldı */}

      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-xl">
          {/* Proje Tanıtım Metni */}
          <div className="text-center mb-6 text-indigo-700">
            <p className="text-xl font-medium">Akıllı Otopark Yönetim Sistemine Hoş Geldiniz!</p>
            <p>En yakın otopark alanını kolayca bulabilir, araç tipinizi seçerek otopark durumunu öğrenebilirsiniz.</p>
          </div>

          {/* Giriş Formu */}
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Giriş Yap</h2>

          <div className="space-y-4">
            {/* E-posta */}
            <div>
              <input
                type="email"
                placeholder="E-posta"
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  emailError ? "border-red-500 animate-shake" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">Geçersiz e-posta</p>
              )}
            </div>

            {/* Şifre */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre"
                className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  passwordError ? "border-red-500 animate-shake" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">Yanlış şifre</p>
              )}
            </div>

            {/* Hata veya Başarı mesajı */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            {/* Giriş Butonu */}
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Giriş Yap
            </button>

            {/* Kayıt Ol Linki */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Hesabınız yok mu?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-indigo-600 cursor-pointer hover:underline"
                >
                  Kayıt Ol
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}