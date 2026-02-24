import React, { useState, useEffect, useRef } from "react";
import VeloLogo from "../../assets/Velo.png";
import { NavLink } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";
import api from "../../services/api";

const MobileTopNav = () => {
  const { location, setLocation } = useLocation();

  const [openLocation, setOpenLocation] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const locationRef = useRef(null);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handler = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setOpenLocation(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= SEARCH LOCATION ================= */
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await api.get(
          "/location/search",
          { params: { q: query } }
        );
        setResults(data);
      } catch (err) {
        console.error("Location search failed", err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  /* ================= DETECT LOCATION ================= */
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocation((prev) => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const { data } = await api.get(
            "/location/search",
            { params: { q: query } }
          );

          setLocation({
            lat,
            lng,
            city: data.city,
            area: data.area,
            loading: false,
          });

          setOpenLocation(false);
        } catch (err) {
          console.error("Reverse geocode failed", err);
        }
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <header className="md:hidden sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between px-4 py-2">

        {/* LOGO */}
        <NavLink to="/" className="cursor-pointer w-[98px] flex-shrink-0">
          <img
            src={VeloLogo}
            alt="Velo"
            width="96"
            height="24"
            className="py-2 min-w-[98px]"
            loading="lazy"
          />
        </NavLink>

        {/* ================= LOCATION SELECTOR ================= */}
        <div className="relative" ref={locationRef}>
          <button
            onClick={() => setOpenLocation((v) => !v)}
            className="flex items-center gap-2 bg-surface border border-[#E3E8E6]
            rounded-2xl px-4 py-2 max-w-[200px]"
          >
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/location_icon.png"
              alt="Location"
              className="w-5 h-5"
            />

            <span className="capitalize truncate font-medium leading-6">
              {location.loading
                ? "Detecting..."
                : location.area || location.city || "Select Location"}
            </span>
          </button>

          {/* ================= DROPDOWN ================= */}
          {openLocation && (
            <div className="absolute right-0 mt-3 w-[300px] bg-white border rounded-xl shadow-lg p-3 z-30">

              {/* SEARCH INPUT */}
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results.length > 0) {
                      const place = results[0];
                      setLocation({
                        lat: Number(place.lat),
                        lng: Number(place.lng),
                        city: place.city,
                        area: place.area,
                        loading: false,
                      });
                      setQuery("");
                      setResults([]);
                      setOpenLocation(false);
                    }
                  }}
                  placeholder="Search city..."
                  className="w-full h-12 px-10 border rounded-md focus:outline-none"
                />

                {/* SEARCH ICON */}
                <img
                  src="https://playo-website.gumlet.io/playo-website-v2/logos-icons/search-icon-dark.svg"
                  className="w-5 h-5 absolute left-3 top-3"
                  alt="search"
                />

                {/* DETECT ICON */}
                <img
                  onClick={detectLocation}
                  src="https://playo-website.gumlet.io/playo-website-v2/logos-icons/detect-location-icon.svg"
                  className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
                  alt="detect"
                />
              </div>

              {/* RESULTS */}
              <div className="mt-2 max-h-60 overflow-auto">
                {results.map((place, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setLocation({
                        lat: Number(place.lat),
                        lng: Number(place.lng),
                        city: place.city,
                        area: place.area,
                        loading: false,
                      });
                      setQuery("");
                      setResults([]);
                      setOpenLocation(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {place.display}
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default MobileTopNav;
