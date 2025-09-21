const express = require("express");
const router = express.Router();
const ParkingSpot = require("../models/ParkingSpot");
const verifyToken = require("../middleware/authMiddleware"); // ✅ Token doğrulama eklendi

// 👉 Yeni park alanı oluştur (korumalı)
router.post("/", verifyToken, async (req, res) => {
  try {
    const newSpot = new ParkingSpot(req.body);
    const savedSpot = await newSpot.save();
    res.status(201).json(savedSpot);
  } catch (err) {
    res.status(500).json({ message: "Park yeri oluşturulamadı", error: err.message });
  }
});

// routes/parking.js (güncellenmiş)
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
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ message: "Park yerleri alınamadı", error: err.message });
  }
});


// 👉 Belirli bir park alanını güncelle (korumalı)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedSpot = await ParkingSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSpot);
  } catch (err) {
    res.status(500).json({ message: "Park yeri güncellenemedi", error: err.message });
  }
});

// 👉 Belirli bir park alanını sil (korumalı)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await ParkingSpot.findByIdAndDelete(req.params.id);
    res.json({ message: "Park yeri silindi" });
  } catch (err) {
    res.status(500).json({ message: "Park yeri silinemedi", error: err.message });
  }
});

// ✅ Eksik olan export satırı eklendi
module.exports = router;
