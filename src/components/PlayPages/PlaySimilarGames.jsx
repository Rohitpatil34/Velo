import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const PlaySimilarGames = ({ game }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [similarGames, setSimilarGames] = useState([]);

  /* ================= FETCH SIMILAR GAMES ================= */
  useEffect(() => {
    if (!game?.location?.geo?.coordinates) return;

    const fetchSimilarGames = async () => {
      try {
        const lat = game.location.geo.coordinates[1];
        const lng = game.location.geo.coordinates[0];

        const { data } = await api.get(
          `/games`,
          {
            params: { lat, lng, distance: 10 },
          }
        );

        // Remove current game
        const filtered = data.games.filter(
          (g) => g._id !== game._id
        );

        setSimilarGames(filtered);
      } catch (err) {
        console.error("Failed to fetch similar games", err);
      }
    };

    fetchSimilarGames();
  }, [game]);

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  if (!similarGames.length) return null;

  return (
    <section className="bg-white rounded-3xl pt-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center px-4 md:px-12 font-bold">
        <h2 className="text-xl md:text-2xl">Similar Games</h2>

        <button
          onClick={() => navigate("/play")}
          className="text-primary flex items-center gap-2"
        >
          SEE ALL GAMES
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow_green.png"
            alt="right"
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* ================= CAROUSEL ================= */}
      <div className="relative mt-6">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar whitespace-nowrap"
        >
          {similarGames.map((g) => (
            <GameCard key={g._id} game={g} />
          ))}
        </div>

        {/* ================= NAV BUTTONS ================= */}
        <div className="flex justify-center gap-3 mb-6 mt-4">
          <CarouselButton direction="left" onClick={() => scroll("left")} />
          <CarouselButton direction="right" onClick={() => scroll("right")} />
        </div>
      </div>
    </section>
  );
};

/* ================= GAME CARD ================= */
const GameCard = ({ game }) => {
  const navigate = useNavigate();

  const going = game.totalSlots - game.availableSlots;

  const dateObj = new Date(game.date);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="ml-4 md:ml-6 first:ml-4 md:first:ml-12 last:pr-4 md:last:pr-12">
      <div
        onClick={() => navigate(`/play/${game._id}`)}
        className="h-[250px] p-4 bg-white border border-[#E3E8E6] rounded-2xl shadow-card cursor-pointer flex flex-col gap-2 min-w-[320px] max-w-[340px]"
      >
        {/* Type */}
        <div className="text-xs md:text-sm text-mute_text capitalize">
          {game.sport} · {game.bookingType.replaceAll("_", " ")}
        </div>

        {/* Going */}
        <div className="font-bold text-sm">
          {going}/{game.totalSlots} Going
        </div>

        {/* Host */}
        <div className="text-xs md:text-sm text-mute_text">
          {game.createdBy?.name || "Host"}
        </div>

        {/* Time */}
        <div className="text-xs md:text-sm font-semibold">
          {formattedDate}
        </div>

        {/* Location */}
        <div className="text-xs md:text-sm text-on_background truncate">
          {game.location?.name}
        </div>

        {/* Skill */}
        <div className="bg-[#F1F3F2] rounded-lg px-3 py-1 text-xs font-medium capitalize">
          {game.skillLevel}
        </div>
      </div>
    </div>
  );
};

/* ================= BUTTON ================= */
const CarouselButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className="w-11 h-11 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center"
  >
    <img
      src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
      alt={direction}
      className={`w-5 h-5 ${direction === "left" ? "rotate-180" : ""}`}
    />
  </button>
);

export default PlaySimilarGames;
