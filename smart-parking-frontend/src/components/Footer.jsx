import React, { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mesaj gönderildi. Teşekkürler!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer
      id="contact"
      className="bg-gray-100 text-gray-700 py-12 px-6 border-t mt-16"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Bilgi */}
        <div>
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Smart Parking</h3>
          <p className="text-sm leading-relaxed">
            Akıllı şehirler için modern otopark yönetim çözümleri sunuyoruz.
            Teknolojiyi ve kullanıcı deneyimini birleştirerek şehir hayatını kolaylaştırıyoruz.
          </p>
          <div className="mt-4 flex gap-4 text-lg">
            <a
              href="https://www.linkedin.com/in/%C3%B6mer-akdo%C4%9Fan-a8a373259/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-700 hover:text-indigo-900 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/akdoganomer21/"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 hover:text-pink-800 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:akdoganomer42621@gmail.com"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://wa.me/905372040191"
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:text-green-800 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* İletişim Bilgisi */}
        <div>
          <h4 className="font-semibold mb-2">İletişim Bilgileri</h4>
          <p className="text-sm">
            <FaEnvelope className="inline mr-2" />
            akdoganomer42621@gmail.com
          </p>
          <p className="text-sm mt-2">
            <FaWhatsapp className="inline mr-2" />
            +90 (537) 204 01 91
          </p>
          <p className="text-sm mt-2">İstanbul, Türkiye</p>
        </div>

        {/* İletişim Formu */}
        <div>
          <h4 className="font-semibold mb-4">Bize Mesaj Gönder</h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız"
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta"
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mesajınız"
              required
              rows="4"
              className="w-full p-2 border rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © 2025 Smart Parking. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}