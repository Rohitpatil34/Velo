import React, { useState } from "react";
import FilterModal from "./FilterModal";
import DateDropdown from "./DateDropdown";

const FiltersPlayPage = ({ filters = {}, setFilters }) => {

  /* SAFETY DEFAULTS */
  const safeFilters = {
    sport: [],
    date: null,
    sort: null,
    time: [],
    skill: [],
    others: [],
    ...filters
  };

  const [open, setOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);

  const sportsList = [
    "cricket",
    "football",
    "tennis",
    "badminton",
    "basketball"
  ];

  return (
    <>
      <div className="mt-6 w-full flex gap-2 px-4 md:mx-2 overflow-visible no-scrollbar">

        {/* GameTime Toggle */}
        {/* <div className="flex gap-4 border border-[#E3E8E6] bg-white py-3 px-4 rounded-2xl cursor-pointer min-w-fit">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/activity/gameTime_logo.png"
            className="h-6 w-6"
          />
          <span className="font-medium">GameTime by Playo</span>
        </div> */}

        {/* Filter & Sort */}
        <div
          onClick={() => setOpen(true)}
          className="flex justify-center items-center gap-4 border border-[#E3E8E6] bg-white py-3 px-4 rounded-2xl cursor-pointer min-w-fit"
        >
          <span className="font-medium">Filter & Sort By</span>
        </div>

        {/* SPORTS */}
        <div className="relative">
          <button onClick={() => setSportsOpen(!sportsOpen)}>
            <div className="flex justify-center items-center py-3 px-4 rounded-2xl border bg-white min-w-fit">
              <span className="font-medium">Sports</span>
            </div>
          </button>

          {sportsOpen && (
            <div className="absolute mt-2 w-52 bg-white border rounded-xl shadow-lg z-50 p-2">
              {sportsList.map((sport) => (
                <label
                  key={sport}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={(safeFilters.sport || []).includes(sport)}
                    onChange={() => {
                      const updated =
                        safeFilters.sport.includes(sport)
                          ? safeFilters.sport.filter((s) => s !== sport)
                          : [...safeFilters.sport, sport];

                      setFilters(prev => ({
                        ...prev,
                        sport: updated
                      }));
                    }}
                  />
                  {sport}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* DATE */}
        <div className="relative">
          <button onClick={() => setDateOpen(!dateOpen)}>
            <div className="flex justify-center items-center py-3 px-4 rounded-2xl border bg-white">
              <span className="font-medium">
                {safeFilters.date ? new Date(safeFilters.date).toLocaleDateString() : "Date"}
              </span>

            </div>
          </button>
          

          {dateOpen && (
            <div className="absolute mt-2 z-50">
              <DateDropdown
                onSelect={(date) => {
                  setFilters(prev => ({
                    ...prev,
                    date
                  }));
                  setDateOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Pay & Join */}
        {/* <div className="flex justify-center items-center py-3 px-4 rounded-2xl border bg-white">
          <span className="font-medium">Pay & Join Game</span>
        </div> */}
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-80"
            onClick={() => setOpen(false)}
          ></div>

          <div className="relative z-10">
            <FilterModal
              initialFilters={safeFilters}
              onClose={() => setOpen(false)}
              onApply={(modalFilters) => {
                setFilters(prev => ({
                  ...prev,
                  ...modalFilters
                }));
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FiltersPlayPage;
