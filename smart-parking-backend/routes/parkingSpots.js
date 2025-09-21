const express = require("express");
const router = express.Router();
const ParkingSpot = require("../models/ParkingSpot");
const verifyToken = require("../middleware/authMiddleware"); // JWT middleware

// 🔹 Sayfalı park yerlerini getir
router.get("/", verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await ParkingSpot.countDocuments();
    const spots = await ParkingSpot.find().skip(skip).limit(limit);

    res.json({
      spots,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: "Park yerleri alınamadı", error: err.message });
  }
});

// 🔹 Tüm verileri getir (filtreleme frontend'de yapılacak)
router.get("/all", verifyToken, async (req, res) => {
  try {
    const spots = await ParkingSpot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: "Tüm veriler alınamadı", error: err.message });
  }
});

// 🔹 Yeni park yeri ekle
router.post("/", verifyToken, async (req, res) => {
  try {
    const newSpot = new ParkingSpot(req.body);
    const saved = await newSpot.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Park yeri eklenemedi", error: err.message });
  }
});

// 🔹 Belirli bir park yerini güncelle
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await ParkingSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Güncelleme başarısız", error: err.message });
  }
});

// 🔹 Belirli bir park yerini sil
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await ParkingSpot.findByIdAndDelete(req.params.id);
    res.json({ message: "Park yeri silindi" });
  } catch (err) {
    res.status(500).json({ message: "Silme başarısız", error: err.message });
  }
});

module.exports = router;
