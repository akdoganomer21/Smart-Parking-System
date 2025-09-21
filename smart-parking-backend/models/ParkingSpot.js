const mongoose = require("mongoose");

const ParkingSpotSchema = new mongoose.Schema(
  {
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    spotNumber: {
      type: String,
      required: true, // ✅ Artık her spot’un numarası olmalı
      trim: true,
      unique: true,    // ✅ Aynı spot numarası tekrar eklenemesin
    },
    type: {
      type: String,
      enum: ["car", "motorcycle", "disabled", "truck", "other"],
      required: true,
    },
    city: {
      type: String,
      required: true, // ✅ Şehir zorunlu olmalı (filtrelemeye yarıyor)
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParkingSpot", ParkingSpotSchema);
