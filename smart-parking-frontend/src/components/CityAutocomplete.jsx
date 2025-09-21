// src/components/CityAutocomplete.jsx
import React, { useEffect, useState } from "react";

const CityAutocomplete = ({ value, onChange, options }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (value.length === 0) {
      setSuggestions([]);
    } else {
      const matches = options.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    }
  }, [value, options]);

  return (
    <div className="relative w-48">
      <input
        type="text"
        placeholder="Şehir ara"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full z-10 max-h-40 overflow-y-auto text-sm">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => onChange(city)}
              className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
