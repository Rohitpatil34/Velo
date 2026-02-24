import React from "react";
import { Check } from "lucide-react";

const BookMainContentDetails = ({ venue }) => {
  if (!venue) return null;

  return (
    <div className="w-full md:col-span-2 md:row-span-5">

      {/* ================= SPORTS AVAILABLE ================= */}
      <div className="p-6 mt-4 border rounded-md border-border_color">
        <div className="flex flex-col md:flex-row md:items-center">
          <h2 className="font-semibold text-md md:text-lg">
            Sports Available
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 xl:grid-cols-7 gap-5 sm:gap-6 mt-5">
          {venue.sports && venue.sports.length > 0 ? (
            venue.sports.map((sport, index) => (
              <div
                key={index}
                className="flex flex-col items-center py-2 border rounded-md shadow-md aspect-square border-border_color transition"
              >
                <h3 className="mt-2 text-xs font-medium text-center capitalize">
                  {sport}
                </h3>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No sports available
            </p>
          )}
        </div>
      </div>

      {/* ================= AMENITIES ================= */}
      <div className="mt-5">
        <div className="p-6 border rounded-md border-border_color">
          <h3 className="font-semibold text-md">Amenities</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mt-5">
            {venue.amenities && venue.amenities.length > 0 ? (
              venue.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm capitalize"
                >
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <h4>{item}</h4>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No amenities listed
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= ABOUT VENUE ================= */}
      <div className="mt-5">
        <div className="p-5 border rounded-md border-border_color">
          <h3 className="font-semibold text-md">About Venue</h3>

          <p className="mt-5 text-sm">
            {venue.description || "No description available"}
          </p>
        </div>
      </div>

      {/* ================= RELATED LINKS ================= */}
      <div className="mt-5 pb-5">
        <div className="p-5 border rounded-md border-border_color">
          <h3 className="font-semibold text-md">
            Related To {venue.name}
          </h3>

          <div className="mt-5 text-sm leading-6">
            <span className="hover:text-primary cursor-pointer">
              Sports Clubs in {venue.city}
            </span>
            {", "}
            {venue.sports &&
              venue.sports.map((sport, index) => (
                <span key={index}>
                  <span className="hover:text-primary cursor-pointer capitalize">
                    {sport} Clubs in {venue.city}
                  </span>
                  {index !== venue.sports.length - 1 && ", "}
                </span>
              ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookMainContentDetails;