//npm start ile frontend çalışır
import React, { useState, useEffect } from "react";
import CitySearchInput from "../components/CitySearchInput";
import MapPreview from "../components/MapPreview";
import axios from "axios";

const INITIAL_ITEMS_PER_PAGE = 10;
const FILTERED_ITEMS_PER_PAGE = 5;

const ParkingListPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    isOccupied: "",
    spotNumber: "",
  });

  const [spots, setSpots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const isFilterActive = filters.city || filters.type || filters.isOccupied || filters.spotNumber;
  const itemsPerPage = isFilterActive ? FILTERED_ITEMS_PER_PAGE : INITIAL_ITEMS_PER_PAGE;

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      try {
        const url = isFilterActive
          ? `http://localhost:5050/api/parkingspots/all`
          : `http://localhost:5050/api/parkingspots?page=${currentPage}&limit=${itemsPerPage}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = isFilterActive ? res.data : res.data.spots;
        setSpots(data);
        setTotalPages(
          isFilterActive ? Math.ceil(data.length / FILTERED_ITEMS_PER_PAGE) : res.data.totalPages
        );
      } catch (err) {
        console.error("Veriler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, [currentPage, itemsPerPage, isFilterActive]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ city: "", type: "", isOccupied: "", spotNumber: "" });
    setCurrentPage(1);
  };

  const translateType = (type) => {
    switch (type) {
      case "car": return "Araba";
      case "truck": return "Tır";
      case "disabled": return "Engelli";
      case "motorcycle": return "Motosiklet";
      case "other": return "Diğer";
      default: return type;
    }
  };

  const filteredSpots = isFilterActive
    ? spots.filter((spot) =>
        (!filters.city || (spot.city?.toLowerCase() || "").includes(filters.city.toLowerCase())) &&
        (!filters.type || spot.type === filters.type) &&
        (!filters.spotNumber || spot.spotNumber?.includes(filters.spotNumber)) &&
        (filters.isOccupied === "" || spot.isOccupied === (filters.isOccupied === "true"))
      )
    : spots;

  const paginatedSpots = isFilterActive
    ? filteredSpots.slice((currentPage - 1) * FILTERED_ITEMS_PER_PAGE, currentPage * FILTERED_ITEMS_PER_PAGE)
    : filteredSpots;

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">🅿️ Otopark Filtreleme</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CitySearchInput
            value={filters.city}
            onChange={(val) => {
              setFilters({ ...filters, city: val });
              setCurrentPage(1);
            }}
          />
          <select name="type" value={filters.type} onChange={handleChange} className="p-2 border rounded">
            <option value="">Araç Tipi</option>
            <option value="car">Araba</option>
            <option value="truck">Tır</option>
            <option value="disabled">Engelli</option>
            <option value="motorcycle">Motosiklet</option>
            <option value="other">Diğer</option>
          </select>
          <select name="isOccupied" value={filters.isOccupied} onChange={handleChange} className="p-2 border rounded">
            <option value="">Durum</option>
            <option value="false">Boş</option>
            <option value="true">Dolu</option>
          </select>
          <input
            type="text"
            name="spotNumber"
            placeholder="Park No"
            value={filters.spotNumber}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Filtreleri Temizle
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600 animate-pulse">Yükleniyor...</p>
      ) : paginatedSpots.length === 0 ? (
        <p className="text-gray-600">Eşleşen otopark bulunamadı.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {paginatedSpots.map((spot) => (
              <li key={spot._id} className="border p-4 rounded shadow bg-white hover:shadow-lg transition-transform hover:scale-105">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <p><strong>Şehir:</strong> {spot.city || "Bilinmiyor"}</p>
                    <p><strong>Tip:</strong> {translateType(spot.type)}</p>
                    <p>
                      <strong>Durum:</strong> 
                      <span className={`ml-1 text-sm font-semibold ${spot.isOccupied ? "text-red-600" : "text-green-600"}`}>
                        {spot.isOccupied ? "Dolu" : "Boş"}
                      </span>
                    </p>
                    <p><strong>Park No:</strong> {spot.spotNumber || "-"}</p>
                  </div>
                  {spot.location?.lat && spot.location?.lng && (
                    <MapPreview lat={spot.location.lat} lng={spot.location.lng} />
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Önceki
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ParkingListPage;
