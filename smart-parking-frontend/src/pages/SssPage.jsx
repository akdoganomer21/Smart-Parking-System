import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import SimpleNavbar from "../components/SimpleNavbar"; // ✅ doğru navbar

const SssPage = () => {
  const sorular = [
    {
      soru: "Smart Parking nedir?",
      cevap: "Smart Parking, şehir içi otoparkları akıllı sistemlerle yöneten, doluluk bilgilerini anlık sunan bir dijital çözümdür.",
    },
    {
      soru: "Kullanıcı olarak nasıl giriş yapabilirim?",
      cevap: "Ana sayfadaki 'Giriş Yap' butonuna tıklayıp e-posta ve şifrenizle giriş yapabilirsiniz.",
    },
    {
      soru: "Otopark doluluk oranı nasıl takip edilir?",
      cevap: "Kullanıcı panelinde harita üzerinden tüm otoparkların doluluk durumu canlı olarak izlenebilir.",
    },
    {
      soru: "Sisteme nasıl kayıt olurum?",
      cevap: "Ana sayfadaki 'Kayıt Ol' butonunu kullanarak kolayca kayıt işlemi yapabilirsiniz.",
    },
    {
      soru: "Mobil cihazlarla uyumlu mu?",
      cevap: "Evet, sistem mobil uyumludur ve her cihazdan rahatça erişilebilir.",
    },
    {
      soru: "Admin paneli kimler içindir?",
      cevap: "Admin paneli sadece yöneticiler için geliştirilmiştir. Yönetim, düzenleme ve analiz işlemleri buradan yapılır.",
    },
    {
      soru: "Veri güvenliği nasıl sağlanıyor?",
      cevap: "Tüm kullanıcı verileri şifrelenerek saklanır ve güvenlik önlemleriyle korunur.",
    },
    {
      soru: "Veriler hangi sıklıkla güncelleniyor?",
      cevap: "Veriler sensörler yardımıyla her 10 saniyede bir güncellenmektedir.",
    },
    {
      soru: "Giriş yapmadan sistemi kullanabilir miyim?",
      cevap: "Hayır, otopark verilerine ulaşmak için giriş yapmanız gerekmektedir.",
    },
    {
      soru: "Destek almak için ne yapmalıyım?",
      cevap: "Footer’daki e-posta adresi veya sosyal medya hesaplarımızdan bize ulaşabilirsiniz.",
    },
  ];

  const [acikIndex, setAcikIndex] = useState(null);

  const toggleIndex = (index) => {
    setAcikIndex(index === acikIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-8">
      <SimpleNavbar /> {/* ✅ doğru navbar burada */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-12">Sık Sorulan Sorular (SSS)</h1>
        <div className="space-y-4">
          {sorular.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow transition">
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-indigo-700 font-medium text-lg hover:bg-indigo-50 transition"
              >
                <span>{item.soru}</span>
                {acikIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {acikIndex === index && (
                <div className="px-6 pb-4 text-gray-700 text-sm animate-fade-in">
                  {item.cevap}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SssPage;