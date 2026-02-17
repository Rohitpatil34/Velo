import React from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GamesCard = ({ game }) => {
  const navigate = useNavigate();

  if (!game) return null;

  /* ================= CALCULATIONS ================= */

  const going = game.totalSlots - game.availableSlots;

  const dateObj = new Date(game.date);
  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const distanceKm =
    game.distance != null ? (game.distance / 1000).toFixed(2) : null;

  /* ================= CLICK HANDLER ================= */

  const handleClick = () => {
    navigate(`/play/${game._id}`);
  };

  /* ================= RENDER ================= */

  return (
    <div
      onClick={handleClick}
      className="flex overflow-hidden relative h-[250px] flex-col space-y-2 p-4 shadow-card border mb-6 rounded-[16px] border-[#E3E8E6] cursor-pointer bg-white w-full md:min-w-[320px] hover:shadow-lg transition"
    >
      {/* ================= TOP TAGS ================= */}
      <div className="flex items-center text-xs font-medium text-mute_text">
        <span className="capitalize">{game.sport}</span>
        <span className="mx-1">•</span>
        <span className="capitalize">
          {game.bookingType?.replaceAll("_", " ")}
        </span>
      </div>

      {/* ================= GOING + PRICE ================= */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">
          {going}
          <span className="text-xs font-medium">
            /{game.totalSlots}
          </span>{" "}
          Going
        </div>

        {game.price > 0 && (
          <div className="bg-surface rounded-lg px-2 py-1 text-sm font-semibold">
            ₹ {game.price}
          </div>
        )}
      </div>

      {/* ================= HOST ================= */}
      <div className="text-xs text-mute_text font-medium">
        {game.createdBy?.name || "Host"}
      </div>

      {/* ================= DATE & TIME ================= */}
      <div className="text-sm font-semibold text-on_background">
        {formattedDate}, {game.startTime} - {game.endTime}
      </div>

      {/* ================= LOCATION ================= */}
      <div className="flex items-center gap-2 text-xs text-on_background mt-1">
        <MapPin size={14} />
        <span className="truncate">
          {game.location?.name}
          {distanceKm && ` ~${distanceKm} km`}
        </span>
      </div>

      {/* ================= PARTICIPANT AVATARS ================= */}
      {game.participants?.length > 0 && (
        <div className="flex items-center mt-1">
          {game.participants.slice(0, 2).map((p, index) => (
            <div
              key={index}
              className="h-8 w-8 rounded-full overflow-hidden border-2 border-white mr-[-10px]"
            >
              <img
                src={
                  p.user?.avatar ||
                  "https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png?q=30"
                }
                alt="participant"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* ================= SKILL LEVEL ================= */}
      <div className="flex items-center mt-auto">
        <div className="bg-[#F1F3F2] rounded-lg px-3 py-1 text-xs font-medium capitalize">
          {game.skillLevel}
        </div>
      </div>
    </div>
  );
};

export default GamesCard;
