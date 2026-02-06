import React from "react";
import BookCard from "./BookCard";

const tabs = [
  { label: "Venues", count: 1143, active: true },
  { label: "Coaching", count: 30 },
  { label: "Events", count: 7 },
  { label: "Memberships", count: 1 },
];

const BookMainContent = () => {
  return (
    <div className="flex flex-col bg-surface">

      {/* TABS */}
      <div className="sticky -top-20 z-10 bg-white shadow-md">
        <div className="flex w-full items-center gap-8 overflow-x-auto px-6 py-2 lg:px-20">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center gap-1 border-b-4 py-3 text-[16px] font-medium md:h-16 md:py-5
                ${
                  tab.active
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }
              `}
            >
              <span>{tab.label}</span>
              <span>({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-8 px-4 lg:px-20">

        {/* GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* You can map real data later */}
          {Array.from({ length: 9 }).map((_, index) => (
            <BookCard key={index} />
          ))}
        </div>

        {/* SHOW MORE */}
        <div className="mt-20 flex justify-center">
          <button className="h-10 w-32 rounded-md bg-green-600 font-semibold text-white shadow-lg transition hover:scale-105">
            Show More
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookMainContent;
