import React from "react";
import { useNavigate } from "react-router-dom";

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  if (!venue) return null;

  // 🔹 Extract Data Safely
  const image =
    venue.images && venue.images.length > 0
      ? venue.images[0]
      : "https://via.placeholder.com/450";

  const name = venue.name;

  const rating = venue.rating
    ? venue.rating.toFixed(1)
    : "0.0";

  const reviews = venue.totalReviews || 0; 
  // (If you don’t store reviews yet, this will default to 0)

  const address =
    venue.area
      ? `${venue.area}, ${venue.city}`
      : venue.city;

  const distance =
    venue.distance
      ? (venue.distance / 1000).toFixed(2) + " km"
      : null;

  const featured = venue.rating >= 4; 
  // Example logic: rating 4+ = featured

  return (
    <div
      onClick={() => navigate(`/book/${venue._id}`)}
      className="w-full max-w-[340px] cursor-pointer rounded-[16px] border border-[#E3E8E6] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-lg transition"
    >

      <div className="p-3 flex flex-col gap-3">

        {/* 🔹 Image */}
        <div className="relative h-[160px] w-full overflow-hidden rounded-[12px]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover rounded-[12px]"
          />

          {featured && (
            <div className="absolute bottom-3 right-3 rounded-full bg-[#111827] px-[10px] py-[6px] text-[11px] font-semibold tracking-wide text-white">
              FEATURED
            </div>
          )}
        </div>

        {/* 🔹 Venue Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <span className="truncate text-[16px] font-semibold leading-[22px] text-[#111827]">
            {name}
          </span>

          <div className="flex items-center gap-1 rounded-md bg-[#E6F7EF] px-2 py-[2px] text-[12px] font-semibold text-[#16A34A]">
            {rating}
            <span className="text-[10px] font-medium">
              ({reviews})
            </span>
          </div>
        </div>

        {/* 🔹 Address + Distance */}
        <div className="truncate text-[13px] font-medium text-[#6B7280]">
          {address}
          {distance && ` (~${distance})`}
        </div>

      </div>
    </div>
  );
};

export default VenueCard;