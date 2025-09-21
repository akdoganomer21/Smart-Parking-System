# 🚗 Smart Parking System

**PROJEYE AİT TÜM DETAYLARI ;** ""TezRapor(ÖmerAkdoğan).pdf "" ADLI DOSYADA BULABİLİRSİNİZ.

--

**Smart Parking System**, akıllı otopark yönetimi için geliştirilmiş modern bir web uygulamasıdır.  
Kullanıcılar boş park yerlerini görebilir, rezervasyon yapabilir, giriş/kayıt işlemleri yapabilir.  
Admin ise yönetim paneli üzerinden park alanlarını ve kullanıcıları kontrol edebilir.

---

## ⚙️ Kullanılan Teknolojiler

### Backend
Backend **Node.js** ve **Express.js** ile geliştirildi.  
- Veriler **MongoDB** üzerinde tutuluyor ve **Mongoose** ile yönetiliyor.  
- Kullanıcı kimlik doğrulama işlemleri **JWT** tabanlı yapılırken, şifreler **bcryptjs** ile güvenli şekilde hashleniyor.  
- Çevresel değişkenler **dotenv** ile yönetiliyor.  
- Farklı istemcilerden erişim için **CORS** aktif.  

**Stack:**
- Node.js  
- Express.js 5  
- MongoDB + Mongoose  
- JWT (jsonwebtoken)  
- bcryptjs  
- dotenv  
- cors  

### Frontend
Frontend **React 19** ile geliştirildi.  
- Kullanıcı arayüzünde **TailwindCSS** ile modern ve responsive bir tasarım sağlandı.  
- Harita işlemleri için **Leaflet** ve **Google Maps API** kullanıldı.  
- Dashboard ekranında istatistiksel veriler **Recharts** kütüphanesi ile gösteriliyor.  
- Kullanıcı kimlik doğrulama süreçleri için **JWT-Decode** kullanıldı.  

**Stack:**
- React 19  
- React Router 7  
- TailwindCSS 3  
- Axios  
- Leaflet & React-Leaflet  
- @react-google-maps/api  
- Recharts  
- JWT-Decode  

---

## 📌 Özellikler

### Kullanıcı Özellikleri
Normal kullanıcılar sisteme kayıt olabilir, giriş yapabilir ve otopark alanlarını görüntüleyebilir.  
- Kullanıcı kaydı (Register)  
- Kullanıcı girişi (Login)  
- Harita üzerinde park alanlarını görüntüleme  
- Boş/dolu durumunu anlık olarak görme  
- Rezervasyon yapma  

### Admin Özellikleri
Admin paneli üzerinden park alanlarının yönetimi yapılır.  
- Park alanı ekleme, düzenleme ve silme  
- Kullanıcı listesi görüntüleme  
- Rezervasyon durumlarını izleme  
- Dashboard ekranı ile istatistikleri görme (örneğin doluluk oranları)  
- Harita üzerinde alanların güncellenmesi  

---

## 🔗 API Endpointleri

### Auth
- `POST /api/auth/register` → Yeni kullanıcı kaydı  
- `POST /api/auth/login` → Kullanıcı girişi ve JWT token oluşturma  

### Parking
- `GET /api/parkingspots` → Tüm park alanlarını listele  
- `GET /api/parkingspots/:id` → Belirli bir park alanını getir  
- `POST /api/parkingspots` → Yeni park alanı ekle (Admin)  
- `PUT /api/parkingspots/:id` → Park alanını güncelle (Admin)  
- `DELETE /api/parkingspots/:id` → Park alanını sil (Admin)  

---

## 🚀 Deployment

Backend **Node.js** tabanlı olup herhangi bir sunucuda çalıştırılabilir.  
MongoDB bağlantısı için environment değişkenleri kullanılmaktadır.  
Frontend tarafı React olduğu için build alınıp statik olarak servis edilebilir (ör. Netlify, Vercel, Nginx).  

**Backend .env:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart_parking
JWT_SECRET=supersecret
