import React, { useState, useEffect } from "react";

const cityList = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya",
  "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis",
  "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır",
  "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun",
  "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta", "İstanbul", "İzmir", "Kahramanmaraş",
  "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kilis", "Kırıkkale", "Kırklareli",
  "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla",
  "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt",
  "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak",
  "Van", "Yalova", "Yozgat", "Zonguldak"
];

const CitySearchInput = ({ value, onChange }) => {
  const [query, setQuery] = useState(value || "");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  const handleInput = (e) => {
    const input = e.target.value;
    setQuery(input);
    const filtered = cityList.filter(city =>
      city.toLowerCase().startsWith(input.toLowerCase())
    );
    setFilteredCities(filtered);
    onChange(input);
  };

  const handleSelect = (city) => {
    setQuery(city);
    setFilteredCities([]);
    onChange(city);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Şehir ara..."
        className="w-full p-2 border rounded"
      />
      {filteredCities.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto shadow">
          {filteredCities.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearchInput;
