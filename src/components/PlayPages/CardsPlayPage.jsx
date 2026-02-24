import React, { useEffect, useState } from "react";
import GamesCard from "../GamesCard";
import { useLocation } from "../../context/LocationContext";

const CardsPlayPage = ({ filters }) => {
  const { location } = useLocation();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location.lat || !location.lng) return;

    const fetchGames = async () => {
      try {
        setLoading(true);

        
        // Build params object instead of manual URL string
        const params = {
          lat: location.lat,
          lng: location.lng,
        };

        if (filters?.sort === "distance") {
          params.sortBy = "distance";
        }

        if (filters?.time?.length) {
          params.time = filters.time[0];
        }

        if (filters?.sport?.length) {
          params.sport = filters.sport; // api supports arrays
        }

        if (filters?.date) {
          params.date = filters.date;
        }

        if (filters?.skill?.length) {
          params.skill = filters.skill[0];
        }

        if (filters?.others?.includes("Pay & Join")) {
          params.bookingType = "pay_and_join";
        }

        const { data } = await api.get(
          `/games`,
          { params }
        );

        setGames(data.games || []);
      } catch (err) {
        console.error(
          "Failed to fetch games",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [location.lat, location.lng, filters]);

  if (loading) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        Loading nearby games...
      </div>
    );
  }

  if (!games.length) {
    return (
      <div className="px-6 py-12 text-center text-gray-500">
        No games found near you
      </div>
    );
  }

  return (
    <section className="mt-6 mb-12 px-4 md:px-6">
      <div className="flex flex-wrap gap-6 justify-start">
        {games.map((game) => (
          <div key={game._id} className="w-full sm:w-[48%] md:w-[328px]">
            <GamesCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardsPlayPage;