import React from "react";
import { useLocation } from "../../context/LocationContext";

const sportsList = [
  "cricket",
  "football",
  "badminton",
  "tennis",
  "basketball",
];

const SearchBook = ({
  searchTerm,
  setSearchTerm,
  selectedSport,
  setSelectedSport,
}) => {
  const { location } = useLocation();

  return (
    <section className="z-20 bg-white flex w-full flex-col items-center justify-between space-y-3 border px-4 py-4 md:flex-row md:space-y-0 md:px-12">

      {/* DYNAMIC TITLE */}
      <h1 className="w-full max-w-full truncate text-lg font-bold md:text-2xl">
        Sports Venues in {location.city || "Your City"}: Discover and Book Nearby Venues
      </h1>

      <div className="flex w-full flex-col items-center justify-end space-y-3 md:w-auto md:flex-row md:space-y-0">
        
        {/* SEARCH INPUT */}
        <div className="relative w-full md:mx-4 md:w-64">
          <div className="flex h-10 items-center rounded-md border border-gray-300 px-2">
            <input
              type="text"
              placeholder="Search by venue name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ml-2 w-full appearance-none bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* SPORTS FILTER */}
        <div className="flex h-10 w-full items-center rounded-md border border-gray-300 md:w-64 px-2">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            <option value="">All Sports</option>
            {sportsList.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

      </div>
    </section>
  );
};

export default SearchBook;