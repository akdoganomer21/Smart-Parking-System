import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    fetchParkingSpots();
  }, []);

  const fetchParkingSpots = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parkings");
      setParkingSpots(response.data);
    } catch (err) {
      console.error("Veri alınırken hata oluştu", err);
    }
  };

  const deleteParkingSpot = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/parkings/${id}`);
      setParkingSpots(parkingSpots.filter((spot) => spot._id !== id));
    } catch (err) {
      console.error("Silme işlemi başarısız", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="min-w-full bg-white shadow-md rounded border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Şehir</th>
            <th className="py-2 px-4 border">Araç Tipi</th>
            <th className="py-2 px-4 border">Konum</th>
            <th className="py-2 px-4 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {parkingSpots.map((spot) => (
            <tr key={spot._id}>
              <td className="py-2 px-4 border">{spot.city}</td>
              <td className="py-2 px-4 border">{spot.vehicleType}</td>
              <td className="py-2 px-4 border">{spot.location}</td>
              <td className="py-2 px-4 border space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteParkingSpot(spot._id)}
                >
                  Sil
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  // Tıklanınca güncelleme ekranı açılacak
                >
                  Güncelle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        // Tıklanınca ekleme formu açılacak
      >
        Yeni Park Alanı Ekle
      </button>
    </div>
  );
}

export default AdminDashboard;
