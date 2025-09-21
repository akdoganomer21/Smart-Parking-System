const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ParkingSpot = require("./models/ParkingSpot");
const fs = require("fs");

// .env dosyasını yükle
dotenv.config();

// JSON verisini oku
const rawData = JSON.parse(fs.readFileSync("./mock_parking_data.json", "utf-8"));

// Enum normalization
const normalizeType = (type) => {
  if (type === "bike") return "motorcycle";
  const valid = ["car", "motorcycle", "disabled", "truck", "other"];
  return valid.includes(type) ? type : "other";
};

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı"))
  .catch((err) => {
    console.error("❌ Mongo bağlantı hatası:", err);
    process.exit(1);
  });

// Seed işlemi
const seedDatabase = async () => {
  try {
    await ParkingSpot.deleteMany();

    const seen = new Set();
    const cleanedData = [];

    for (const { id, spotNumber, city, type, location, ...rest } of rawData) {
      // Boş alan kontrolü
      if (!spotNumber || !city || !type || !location?.lat || !location?.lng) continue;
      // Duplicate kontrolü
      if (seen.has(spotNumber)) continue;
      seen.add(spotNumber);

      cleanedData.push({
        spotNumber,
        city,
        type: normalizeType(type),
        location,
        ...rest,
      });
    }

    await ParkingSpot.insertMany(cleanedData, { ordered: false });

    console.log(`✅ ${cleanedData.length} kayıt başarıyla eklendi.`);
  } catch (err) {
    console.error("❌ Yükleme hatası:", err?.writeErrors?.length ? err.writeErrors.map(e => e.errmsg || e) : err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();