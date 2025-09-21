import React, { useState, useEffect } from "react";

function ParkingForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    city: "",
    spotNumber: "",
    type: "",
    location: "",
    isOccupied: false,
    ...initialData,
  });

  useEffect(() => {
    setFormData({
      city: initialData?.city || "",
      spotNumber: initialData?.spotNumber || "",
      type: initialData?.type || "",
      location: typeof initialData?.location === "string" ? initialData.location : "",
      isOccupied: initialData?.isOccupied || false,
    });
  }, [initialData]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Form gönderiliyor:", formData); // 🔥 log ekle
    onSubmit(formData);
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 border rounded mt-4"
    >
      <div className="mb-2">
        <label>Şehir:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label>Park No:</label>
        <input
          type="text"
          name="spotNumber"
          value={formData.spotNumber}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label>Tip:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-2">
        <label>Konum:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="mr-2">Dolu mu?</label>
        <input
          type="checkbox"
          name="isOccupied"
          checked={formData.isOccupied}
          onChange={handleChange}
        />
      </div>
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Kaydet
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-1 rounded"
        >
          Vazgeç
        </button>
      </div>
    </form>
  );
}

export default ParkingForm;
