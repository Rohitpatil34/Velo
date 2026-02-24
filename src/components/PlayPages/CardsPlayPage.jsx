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

        // BASE URL
        let url = `http://localhost:5000/api/games?lat=${location.lat}&lng=${location.lng}`;

        // APPLY FILTERS
        if (filters?.sort === "distance") url += "&sortBy=distance";

        if (filters?.time?.length)
          url += `&time=${filters.time[0]}`;

        if (filters?.sport?.length) {
          filters.sport.forEach(s => {
            url += `&sport=${s}`;
          });
        }
        if (filters?.date)
          url += `&date=${filters.date}`;


        if (filters?.skill?.length)
          url += `&skill=${filters.skill[0]}`;

        if (filters?.others?.includes("Pay & Join"))
          url += "&bookingType=pay_and_join";

        const res = await fetch(url);
        const data = await res.json();
        setGames(data.games || []);
      } catch (err) {
        console.error("Failed to fetch games", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

  }, [location.lat, location.lng, filters]);   // IMPORTANT

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
