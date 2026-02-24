import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { fetchVenues } from "../../services/venueApi";
import { useLocation } from "../../context/LocationContext";

const BookMainContent = ({ searchTerm, selectedSport }) => {
  const { location } = useLocation();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.lat || !location.lng) return;

    const loadVenues = async () => {
      try {
        setLoading(true);

        const data = await fetchVenues({
          lat: location.lat,
          lng: location.lng,
          sport: selectedSport,
          page: 1,
        });

        let filteredVenues = data.venues;

        // 🔥 SEARCH FILTER (frontend filtering)
        if (searchTerm) {
          filteredVenues = filteredVenues.filter((venue) =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setVenues(filteredVenues);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [location.lat, location.lng, selectedSport, searchTerm]);

  return (
    <div className="mt-8 px-4 lg:px-20">
      {loading ? (
        <div className="text-center">Loading venues...</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <BookCard key={venue._id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookMainContent;