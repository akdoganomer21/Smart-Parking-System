import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const [emailValid, setEmailValid] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shake, setShake] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setPasswordRules({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
      });
    }

    if (name === "email") {
      setEmailValid(validateEmail(value));
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { length, uppercase, lowercase, number } = passwordRules;

    if (!validateEmail(form.email)) {
      setEmailValid(false);
      setError("Geçerli bir e-posta adresi giriniz.");
      triggerShake();
      return;
    }

    if (!(length && uppercase && lowercase && number)) {
      setError("Şifre kurallarına uygun değil.");
      triggerShake();
      return;
    }

    setError("");
    setEmailValid(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccess("Kayıt başarılı. Giriş ekranına yönlendiriliyorsunuz...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(data.message || "Kayıt başarısız");
        triggerShake();
      }
    } catch (err) {
      setError("Sunucuya ulaşılamıyor. Lütfen tekrar deneyin.");
      triggerShake();
    }
  };

  const getRuleStyle = (valid) =>
    `text-sm ${valid ? "text-green-600" : "text-red-500"}`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-300 pt-20">
      <LoginNavbar />
      <div className="flex items-center justify-center">
        <div
          className={`bg-white p-8 rounded-xl shadow-lg w-full max-w-md transition-all duration-300 ${
            shake ? "animate-shake" : ""
          }`}
        >
          <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-700">
            🚀 Kayıt Sayfası
          </h2>

          <input
            type="text"
            name="name"
            placeholder="İsim"
            required
            className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="E-posta"
            required
            className={`w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 ${
              !emailValid
                ? "border-red-500 ring-red-300"
                : "focus:ring-indigo-400"
            } transition`}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Şifre"
            required
            className={`w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 ${
              error ? "border-red-500 ring-red-300" : "focus:ring-indigo-400"
            } transition`}
            onChange={handleChange}
          />

          <div className="mb-4 ml-1 space-y-1">
            <p className={getRuleStyle(passwordRules.length)}>• En az 8 karakter</p>
            <p className={getRuleStyle(passwordRules.uppercase)}>• En az 1 büyük harf</p>
            <p className={getRuleStyle(passwordRules.lowercase)}>• En az 1 küçük harf</p>
            <p className={getRuleStyle(passwordRules.number)}>• En az 1 sayı</p>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-semibold"
          >
            Kayıt Ol
          </button>

          <p className="text-sm text-center mt-4">
            Zaten hesabınız var mı?{" "}
            <Link
              className="text-indigo-600 underline hover:text-indigo-800"
              to="/login"
            >
              Giriş yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
