import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ venue }) => {
  const navigate = useNavigate();

  if (!venue) return null;

  const distanceKm = venue.distance
    ? (venue.distance / 1000).toFixed(1)
    : null;

  const handleClick = () => {
    navigate(`/book/${venue._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="border_radius bg-white card_shadow pb-2 cursor-pointer transition duration-200 transform hover:scale-[1.02]"
    >
      {/* IMAGE */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-full h-44 sm:h-48 md:h-52">
          <img
            src={venue.images?.[0] || "https://via.placeholder.com/450"}
            alt={venue.name}
            className="absolute inset-0 w-full h-full object-cover rounded-t-md bg-surface"
          />
        </div>

        {/* TAG */}
        <div className="absolute right-0 py-2 my-3 text-sm font-medium text-center text-white rounded-tl-md w-28 bg-primary bottom-[50px] md:bottom-[54px]">
          Bookable
        </div>

        {/* DETAILS */}
        <div className="flex flex-col items-start justify-start w-full px-4 py-1">
          {/* TITLE + RATING */}
          <div className="flex items-center justify-between w-full mt-2 text-sm text-tint">
            <div className="w-64 overflow-hidden truncate text-[#27272A] title_large">
              {venue.name}
            </div>

            <div className="flex items-center space-x-1">
              <img
                src="https://playo-website.gumlet.io/playo-website-v2/logos-icons/ico+_+24+_+actions+_+star.svg"
                alt="rating"
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">
                {venue.rating?.toFixed(1) || "0.0"}
              </span>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex mt-2 text-xs md:text-sm text-tint max-w-52 md:max-w-1/2 overflow-hidden">
            <span className="truncate max-w-48">
              {venue.area || venue.city}
            </span>

            {distanceKm && (
              <span className="ml-1 truncate">
                (~ {distanceKm} km)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SPORTS */}
      <div className="flex items-center mx-2 mt-1">
        {venue.sports?.slice(0, 2).map((sport, index) => (
          <div
            key={index}
            className="px-2 py-1 mr-2 text-xs bg-gray-100 rounded-md"
          >
            {sport}
          </div>
        ))}

        {venue.sports?.length > 2 && (
          <span className="ml-1 text-xs text-tint">
            + {venue.sports.length - 2} more
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;