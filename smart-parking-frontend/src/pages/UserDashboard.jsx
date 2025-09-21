import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";
import UserNavbar from "../components/UserNavbar"; // ✅ Sadece burada import ve 1 kez kullanılır

const UserDashboard = () => {
  const [spots, setSpots] = useState([]);
  const [filters, setFilters] = useState({ city: "", type: "", spotNumber: "" });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSpots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5050/api/parkingspots?page=${currentPage}&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSpots(res.data.spots || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Veri alınırken hata oluştu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, [currentPage]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({ city: "", type: "", spotNumber: "" });
    setCurrentPage(1);
  };

  const filteredSpots = Array.isArray(spots)
    ? spots.filter(
        (spot) =>
          (filters.city === "" || spot.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
          (filters.type === "" || spot.type === filters.type) &&
          (filters.spotNumber === "" || spot.spotNumber?.includes(filters.spotNumber))
      )
    : [];

  return (
    <>
      <UserNavbar /> {/* ✅ Yalnızca burada kullanılmalı */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Otopark Arama</h2>

        {/* Filtre Alanı */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleChange}
            placeholder="Şehir"
            className="p-2 border rounded w-64"
          />
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="p-2 border rounded w-64"
          >
            <option value="">Araç Tipi</option>
            <option value="car">Araba</option>
            <option value="truck">Tır</option>
            <option value="motorcycle">Motosiklet</option>
            <option value="disabled">Engelli</option>
            <option value="other">Diğer</option>
          </select>
          <input
            type="text"
            name="spotNumber"
            value={filters.spotNumber}
            onChange={handleChange}
            placeholder="Park No"
            className="p-2 border rounded w-64"
          />
          <button className="bg-blue-600 text-white p-2 rounded" onClick={fetchSpots}>
            <FaSearch /> Ara
          </button>
          <button
            className="bg-red-600 text-white p-2 rounded flex items-center gap-2"
            onClick={resetFilters}
          >
            <FaTimes /> Temizle
          </button>
        </div>

        {/* Sonuçlar */}
        {loading ? (
          <p>Yükleniyor...</p>
        ) : filteredSpots.length === 0 ? (
          <p className="text-gray-600">Eşleşen otopark bulunamadı.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpots.map((spot) => (
                <div
                  key={spot._id}
                  className="border p-4 rounded shadow-lg bg-white hover:shadow-xl transition-all duration-300"
                >
                  <div className="font-semibold text-lg">{spot.city}</div>
                  <div className="text-sm">Park No: {spot.spotNumber}</div>
                  <div className="text-sm">Tip: {spot.type}</div>
                  <div
                    className={`text-sm font-medium ${
                      spot.isOccupied ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {spot.isOccupied ? "Dolu" : "Boş"}
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button className="bg-yellow-500 text-white px-3 py-1 text-xs rounded">
                      Detaylar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sayfalama */}
            <div className="flex justify-center mt-6 space-x-1 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                «
              </button>

              {currentPage > 3 && (
                <>
                  <button onClick={() => setCurrentPage(1)} className="px-3 py-1 bg-gray-200 rounded">
                    1
                  </button>
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
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                »
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboard;