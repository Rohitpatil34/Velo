import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVenues } from "../services/venueApi";
import { useLocation } from "../context/LocationContext";
import VenueCard from "./VenueCard";

const DiscoverVenueHome = () => {
  const scrollRef = useRef(null);
  const { location } = useLocation();
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 360;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!location.lat || !location.lng) return;

    const loadVenues = async () => {
      try {
        setLoading(true);

        const data = await fetchVenues({
          lat: location.lat,
          lng: location.lng,
          page: 1,
          limit: 10,
        });

        setVenues(data.venues);
      } catch (error) {
        console.error("Error fetching venues:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [location.lat, location.lng]);

  return (
    <section className="mt-8">

      {/* Header */}
      <div className="flex justify-between font-bold md:px-12 px-4">
        <h2 className="md:text-2xl text-xl">
          Book Venues in {location.city || "Your City"}
        </h2>

        <button
          onClick={() => navigate("/book")}
          className="text-primary flex items-center gap-2 font-bold"
        >
          SEE ALL VENUES
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow_green.png"
            alt="right"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Scroll Area */}
      <div className="flex mt-6">
        <div className="relative overflow-hidden w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {loading ? (
              <div className="ml-6 text-gray-500">Loading venues...</div>
            ) : (
              venues.map((venue) => (
                <div
                  key={venue._id}
                  className="ml-4 mb-6 md:ml-6"
                >
                  <VenueCard venue={venue} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <div className="flex justify-center items-center mb-6 gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="bg-white w-11 h-11 rounded-full
                     shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                     flex justify-center items-center
                     transition-transform active:scale-95"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="left"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="bg-white w-11 h-11 rounded-full
                     shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                     flex justify-center items-center
                     transition-transform active:scale-95"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="right"
            width={20}
            height={20}
          />
        </button>
      </div>

    </section>
  );
};

export default DiscoverVenueHome;