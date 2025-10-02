const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// .env ayarları
dotenv.config();

// express app
const app = express();

// ✅ CORS ayarları
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-parking-turkey.netlify.app",
      "https://smart-parking-system-cidh.onrender.com" // backend domain
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const parkingRoutes = require("./routes/parking"); // ✅ sadece parking.js kullanılıyor

// Route'ları kullan
app.use("/api/auth", authRoutes);
app.use("/api/parkingspots", parkingRoutes);

// ✅ Test için basit GET endpoint (Render health check için)
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Auth route çalışıyor ✅" });
});

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));

// Ana health check (root)
app.get("/", (req, res) => {
  res.send("Smart Parking API çalışıyor 🚀");
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor`);
});