import Charts from "../components/Charts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ParkingForm from "../components/ParkingForm";
import MapView from "../components/MapView";
import CityAutocomplete from "../components/CityAutocomplete";
import { FaParking, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [spots, setSpots] = useState([]);
  const [allSpots, setAllSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterOccupied, setFilterOccupied] = useState("");
  const [searchSpot, setSearchSpot] = useState("");

  const fetchSpots = async (page = 1) => {
    setLoading(true);
    try {
      const paged = await axios.get(
        `http://localhost:5050/api/parkingspots?page=${page}&limit=20`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const all = await axios.get("http://localhost:5050/api/parkingspots/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSpots(paged.data.spots);
      setAllSpots(all.data);
      setCurrentPage(page);
    } catch (err) {
      console.error("Veri alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/parkingspots/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchSpots(currentPage);
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingSpot) {
        await axios.put(
          `http://localhost:5050/api/parkingspots/${editingSpot._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
      } else {
        await axios.post("http://localhost:5050/api/parkingspots", formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      setShowForm(false);
      setEditingSpot(null);
      fetchSpots(currentPage);
    } catch (err) {
      console.error("Kayıt/Güncelleme hatası:", err);
    }
  };

  const filteredSpots = allSpots.filter(
    (s) =>
      (filterCity === "" || s.city === filterCity) &&
      (filterType === "" || s.type === filterType) &&
      (filterOccupied === "" || String(s.isOccupied) === filterOccupied) &&
      (searchSpot === "" || s.spotNumber.toLowerCase().includes(searchSpot.toLowerCase()))
  );

  const occupied = allSpots.filter((s) => s.isOccupied).length;
  const available = allSpots.length - occupied;
  const totalPages = Math.ceil(filteredSpots.length / 20);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6 pb-28 mt-20">
      <div className="bg-white p-6 rounded shadow text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-800 animate-fade-in">Smart Parking Admin Paneli</h1>
        <p className="text-sm text-gray-500 mt-1 animate-fade-in">Hoş geldiniz, sistem kontrol ekranındasınız.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-4 rounded shadow flex items-center animate-slideDown">
          <FaParking className="text-blue-600 text-3xl mr-4" />
          <div>
            <div className="text-gray-500 text-sm">Toplam Otopark</div>
            <div className="text-xl font-bold">{allSpots.length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center animate-slideDown">
          <FaCheckCircle className="text-green-600 text-3xl mr-4" />
          <div>
            <div className="text-gray-500 text-sm">Boş Otopark</div>
            <div className="text-xl font-bold">{available}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center animate-slideDown">
          <FaTimesCircle className="text-red-600 text-3xl mr-4" />
          <div>
            <div className="text-gray-500 text-sm">Dolu Otopark</div>
            <div className="text-xl font-bold">{occupied}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 animate-fade-in">
        <CityAutocomplete
          value={filterCity}
          onChange={(value) => {
            setFilterCity(value);
            setCurrentPage(1);
          }}
          options={[...new Set(allSpots.map((s) => s.city))].sort()}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tüm Tipler</option>
          <option value="car">Araba</option>
          <option value="truck">Tır/Kamyon</option>
          <option value="motorcycle">Motosiklet</option>
          <option value="disabled">Engelli</option>
          <option value="other">Diğer</option>
        </select>

        <select
          value={filterOccupied}
          onChange={(e) => setFilterOccupied(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Tümü</option>
          <option value="true">Dolu</option>
          <option value="false">Boş</option>
        </select>

        <input
          type="text"
          placeholder="Park No ile ara"
          value={searchSpot}
          onChange={(e) => setSearchSpot(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {showForm && (
        <ParkingForm
          initialData={editingSpot}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSpot(null);
          }}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSpots
          .slice((currentPage - 1) * 20, currentPage * 20)
          .map((spot, idx) => (
            <div
              key={spot._id}
              className="border shadow rounded-xl p-4 bg-white hover:shadow-xl transition-transform hover:scale-105"
            >
              <div className="text-xs text-gray-400 mb-1">#{(currentPage - 1) * 20 + idx + 1}</div>
              <div className="font-semibold text-lg">{spot.city}</div>
              <div className="text-sm">Park No: {spot.spotNumber}</div>
              <div className="text-sm">Tip: {spot.type}</div>
              <div className={`text-sm font-medium ${spot.isOccupied ? "text-red-600" : "text-green-600"}`}>
                Durum: {spot.isOccupied ? "Dolu" : "Boş"}
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 text-xs rounded"
                  onClick={() => {
                    setEditingSpot(spot);
                    setShowForm(true);
                  }}
                >
                  Güncelle
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 text-xs rounded"
                  onClick={() => handleDelete(spot._id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Sayfalama */}
      <div className="mt-6 flex justify-center space-x-1 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          «
        </button>

        {currentPage > 3 && (
          <>
            <button onClick={() => setCurrentPage(1)} className="px-3 py-1 bg-gray-200 rounded">1</button>
            {currentPage > 4 && <span className="px-2">...</span>}
          </>
        )}

        {[...Array(5)].map((_, i) => {
          const page = currentPage - 2 + i;
          if (page < 1 || page > totalPages) return null;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="px-2">...</span>}
            <button onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 bg-gray-200 rounded">
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          »
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-bold mb-2">Otopark Haritası</h2>
        <MapView spots={filteredSpots} />
      </div>

      <div className="mt-10">
        <Charts data={filteredSpots} />
      </div>
    </div>
  );
};

export default AdminDashboard;