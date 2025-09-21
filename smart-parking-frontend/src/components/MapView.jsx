import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Varsayılan marker ikonları
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapView = ({ spots }) => {
  const validSpots = spots.filter(
    (s) => s.location && s.location.lat && s.location.lng
  );

  const center = validSpots.length
    ? { lat: validSpots[0].location.lat, lng: validSpots[0].location.lng }
    : { lat: 39.92, lng: 32.85 }; // Ankara fallback

  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={6}
        className="w-full h-[400px]"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validSpots.map((spot, i) => (
          <Marker
            key={i}
            position={{ lat: spot.location.lat, lng: spot.location.lng }}
          >
            <Popup>
              <div className="text-sm">
                <strong>{spot.city}</strong> <br />
                No: {spot.spotNumber} <br />
                Tip: {spot.type} <br />
                Durum:{" "}
                <span className={spot.isOccupied ? "text-red-600" : "text-green-600"}>
                  {spot.isOccupied ? "Dolu" : "Boş"}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
