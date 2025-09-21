import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDetail = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const solutions = [
    {
      title: "Yolüstü Otopark",
      desc: "Cadde kenarı otoparklarda hızlı yönetim.",
      detail:
        "Şehir içi trafiği azaltmak için optimize edilmiş, sensör destekli yolüstü park yönetimi sistemidir.",
    },
    {
      title: "Kapalı Otopark",
      desc: "AVM ve bina otoparklarında akıllı çözümler.",
      detail:
        "Kamera destekli, alan verimliliğini artıran modern kapalı park sistemleri sunar.",
    },
    {
      title: "Engelli Otopark",
      desc: "Özel alanların erişilebilir takibi.",
      detail:
        "Erişilebilirlik ilkelerine uygun tasarım ve doluluk kontrolü sağlayan çözümler.",
    },
    {
      title: "Gerçek Zamanlı İzleme",
      desc: "Doluluk oranlarını canlı takip edin.",
      detail:
        "Her an güncellenen verilerle kullanıcılar boş alanları önceden görebilir.",
    },
    {
      title: "Mobil Uygulama Desteği",
      desc: "Mobil uygulama ile her yerden kontrol imkanı.",
      detail:
        "Kullanıcılar telefonlarından park durumu, rezervasyon ve bildirimleri görebilir.",
    },
    {
      title: "Yapay Zeka Yönlendirme",
      desc: "Boş alanlara otomatik yönlendirme sistemi.",
      detail:
        "Makine öğrenimi destekli algoritmalar ile en uygun park noktası önerilir.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header
        className="relative h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url('/cover.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4">Smart Parking</h1>
          <p className="text-lg max-w-2xl">
            Şehirlerdeki park sorunlarına yenilikçi ve etkili çözümler sunarak,
            kentlerin daha sürdürülebilir ve yaşanabilir olmasına katkı sağlıyoruz.
          </p>
          <div className="mt-6 space-x-4">
            <Link
              to="/login"
              className="bg-white text-indigo-800 px-4 py-2 rounded shadow font-semibold hover:bg-gray-100 transition"
            >
              Giriş Yap
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded shadow font-semibold hover:bg-indigo-700 transition"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>
      </header>

      {/* Hakkımızda */}
      <section id="about" className="pt-24 pb-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Hakkımızda</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-gray-600 text-lg">
          <p>
            Smart Parking olarak şehir içi park sorunlarına akıllı çözümler sunuyoruz.
            Modern teknolojilerle desteklenmiş altyapımız sayesinde sürücülere anlık
            boş/dolu otopark bilgisi sağlıyor, trafik yoğunluğunu azaltıyor ve kullanıcı
            deneyimini artırıyoruz.
          </p>
          <p>
            Sistemimiz, yöneticilere gelişmiş veri analiz araçları sunarken,
            kullanıcıların da en verimli park alanlarını hızlıca bulmasına yardımcı olur.
            Geliştirilmiş algoritmalar ve yapay zeka destekli yönlendirme sistemi sayesinde,
            zaman ve enerji tasarrufu sağlanır.
          </p>
          <p>
            Misyonumuz, sürdürülebilir ve erişilebilir şehir yaşamı için teknoloji tabanlı
            park çözümleri geliştirmek; vizyonumuz ise, global ölçekte akıllı şehir projelerine
            entegre olabilen lider bir platform olmaktır.
          </p>
        </div>
      </section>

      {/* Çözümler */}
      <section id="solutions" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Akıllı Otopark Çözümlerimiz</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {solutions.map((item, i) => (
        <div key={i} className="card-3d h-64">
          <div className="card-inner">
            {/* Ön yüz */}
            <div className="card-front">
             <div className="text-3xl mb-4">🅿️</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
          {/* Arka yüz */}
          <div className="card-back">
            <p>{item.detail}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Misyon Vizyon */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Park Sorunlarına Akıllı Çözümler</h2>
            <p className="text-gray-700 text-sm mb-4">
              Misyonumuz, şehir sakinlerine değer katan çevreci park yönetimi çözümleri
              sunmaktır. Sürdürülebilir şehirler için doğa dostu teknolojiler kullanırız.
            </p>
            <p className="text-gray-700 text-sm">
              Vizyonumuz, Türkiye'de ve dünyada akıllı otopark yönetimi alanında lider
              olmak ve daha yaşanabilir şehirler yaratmaktır.
            </p>
          </div>
          <img
            src="/parking-sign.jpg"
            alt="Akıllı Park"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}