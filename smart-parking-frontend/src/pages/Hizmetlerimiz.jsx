import React from "react";
import {
  FaMapMarkedAlt,
  FaChartPie,
  FaParking,
  FaMobileAlt,
  FaCog,
  FaDatabase,
} from "react-icons/fa";
import SimpleNavbar from "../components/SimpleNavbar"; // ✅ Sadece bu navbar'ı kullan

const Hizmetlerimiz = () => {
  const hizmetler = [
    {
      title: "Akıllı Otopark Yönetimi",
      desc: "Şehir içi otoparkların doluluk takibini gerçek zamanlı yaparak sürücülere yönlendirme sağlıyoruz.",
      icon: <FaParking className="text-4xl text-indigo-600" />,
    },
    {
      title: "Entegre Harita Sistemi",
      desc: "Kullanıcılar harita üzerinden boş alanları görebilir, yol tarifi alabilir ve en yakın park yerini anlık olarak görüntüleyebilir.",
      icon: <FaMapMarkedAlt className="text-4xl text-green-600" />,
    },
    {
      title: "Yönetici Paneli",
      desc: "Adminler için gelişmiş veri yönetimi, grafiksel analiz, filtreleme, güncelleme ve silme işlemleri yapılabilir.",
      icon: <FaChartPie className="text-4xl text-yellow-500" />,
    },
    {
      title: "Mobil Uyumlu Arayüz",
      desc: "Responsive tasarım sayesinde kullanıcılar her cihazdan erişim sağlayabilir ve park durumlarını takip edebilir.",
      icon: <FaMobileAlt className="text-4xl text-pink-500" />,
    },
    {
      title: "Otomatik Güncellemeler",
      desc: "Sistem, doluluk bilgilerini sensör verilerine göre otomatik olarak günceller ve analiz eder.",
      icon: <FaCog className="text-4xl text-blue-500" />,
    },
    {
      title: "Veri Tabanı Entegrasyonu",
      desc: "Güçlü ve güvenli veri altyapısıyla MongoDB tabanlı arka plan desteği sağlanır.",
      icon: <FaDatabase className="text-4xl text-red-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6 pb-16">
      <SimpleNavbar /> {/* ✅ Sadece bu navbar gösterilecek */}

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 animate-fade-in">
        Hizmetlerimiz
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {hizmetler.map((hizmet, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105"
          >
            <div className="mb-4 flex justify-center">{hizmet.icon}</div>
            <h2 className="text-xl font-bold text-center text-indigo-600 mb-2">
              {hizmet.title}
            </h2>
            <p className="text-gray-700 text-sm text-center leading-relaxed">
              {hizmet.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white py-12 px-6 rounded-xl shadow-lg max-w-4xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Neden Bizi Seçmelisiniz?
        </h2>
        <p className="text-gray-600 text-sm">
          Smart Parking olarak akıllı şehir vizyonuyla, kullanıcı dostu ve verimli park sistemleri geliştiriyoruz.
          Sistemimiz; gelişmiş analiz araçları, canlı harita entegrasyonu ve güçlü veri altyapısıyla hem yönetici hem kullanıcı deneyimini en üst seviyeye çıkarır.
        </p>
      </div>
    </div>
  );
};

export default Hizmetlerimiz;