import React, { useState, useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker issue by importing images
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Custom marker icon
const customIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DHAKA = [23.8103, 90.4125];

const GoToLocation = ({ target }) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, 10, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [target, map]);
  return null;
};

const Coverage = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [coverageData, setCoverageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);

  const inputRef = useRef(null);

  // Fetch data
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetch("/service-centers.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCoverageData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load coverage data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServiceData();
  }, []);

  const suggestions = useMemo(() => {
    if (!query || isLoading) return [];
    const q = query.toLowerCase();
    return coverageData
      .filter((d) => d.district.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, coverageData, isLoading]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSelect = (districtName) => {
    setQuery(districtName);
    setShowSuggestions(false);
    const selected = coverageData.find((d) => d.district === districtName);
    if (selected) {
      setTargetLocation([selected.latitude, selected.longitude]);
    }
  };

  const handleSearch = () => {
    const q = query.toLowerCase();
    const foundDistrict = coverageData.find((d) =>
      d.district.toLowerCase().includes(q)
    );
    if (foundDistrict) {
      setTargetLocation([foundDistrict.latitude, foundDistrict.longitude]);
    } else {
      alert("District not found. Please try again.");
    }
  };

  return (
    <section className="w-full pb-10 px-4">
      <div className="max-w-5xl mx-auto relative">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          We are available in 64 districts in Bangladesh 🗺️
        </h2>

        {/* Search box */}
        <div ref={inputRef} className="relative max-w-md mx-auto z-[9999]">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search for a district..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="w-full p-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-[#9ACD32] text-white rounded-2xl shadow-sm hover:bg-green-600 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-[999] left-0 right-0 bottom-full mb-1  bg-white border  shadow-lg max-h-56 overflow-auto p-1">
              {suggestions.map((item) => (
                <li
                  key={item.district}
                  onClick={() => handleSelect(item.district)}
                  className="px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-50"
                >
                  {item.district}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Map */}
        <div className="w-full h-[520px] rounded-2xl overflow-hidden shadow-lg mt-6 z-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-lg text-gray-600">
              Loading map data...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-lg text-red-500">
              {error}
            </div>
          ) : (
            <MapContainer center={DHAKA} zoom={7} className="h-full w-full z-0">
              <GoToLocation target={targetLocation} />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {coverageData.map((location) => (
                <Marker
                  key={location.district}
                  position={[location.latitude, location.longitude]}
                  icon={customIcon}
                >
                  <Popup>{location.district}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default Coverage;
