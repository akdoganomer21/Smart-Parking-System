const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// .env ayarları
dotenv.config();

// express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const parkingRoutes = require("./routes/parkingSpots");

// Route'ları kullan
app.use("/api/auth", authRoutes);
app.use("/api/parkingspots", parkingRoutes); // 🔹 burada sadece 1 kez tanımlanıyor

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch(err => console.error("MongoDB bağlantı hatası:", err));

// Sunucuyu başlat
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
