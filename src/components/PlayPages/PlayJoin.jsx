import React, { useState } from "react";

const PlayJoin = ({ game }) => {
  const [activeTab, setActiveTab] = useState("instructions");

  if (!game) return null;

  const dateObj = new Date(game.date);

  const formattedDate = dateObj.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // const going = game.totalSlots - game.availableSlots;

  const queries = game.queries || []; // later from backend
  /* ================= MAP HANDLER ================= */
  const handleMapDirections = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const gameLat = game.location?.geo?.coordinates[1];
        const gameLng = game.location?.geo?.coordinates[0];

        window.open(
          `https://www.google.com/maps/dir/${userLat},${userLng}/${gameLat},${gameLng}`,
          "_blank"
        );
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  return (
    <div className="p-6 w-full max-w-[952px] bg-white rounded-3xl flex flex-col gap-6">

      {/* ================= MAIN CARD ================= */}
      <section className="w-full p-6 border border-[#e3e8e6] rounded-3xl flex flex-col gap-8 bg-white">

        {/* HEADER */}
        <section className="flex flex-col gap-6 md:flex-row">
          <section className="flex-grow flex flex-col gap-2 justify-center">
            <div className="leading-7 text-xl text-main font-bold md:text-2xl capitalize">
              {game.sport} Activity
            </div>

            <div className="text-[16px] font-medium text-[#758a80]">
              Hosted by {game.createdBy?.name || "_"}
            </div>
          </section>

          <section className="w-[84px] h-[84px] overflow-hidden hidden md:block">
            <img
              src={
                game.createdBy?.avatar ||
                "https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png?q=30"
              }
              className="w-full h-full rounded-full object-cover"
              alt="host"
            />
          </section>
        </section>

        {/* DATE */}
        <section className="flex gap-4 items-start">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/clock_icon_large.png"
            alt="time"
            className="max-w-[24px]"
          />
          <div>
            <div className="text-xl text-main font-bold">
              {formattedDate}
            </div>
            <div className="text-[16px] font-medium text-main capitalize">
              {game.timeCategory}
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section className="flex gap-4 items-start">
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/location_icon_large.png"
            alt="location"
            className="max-w-[24px]"
          />

          <div className="flex flex-col gap-4">
            <div className="text-[16px] font-medium text-main">
              {game.location?.name}, {game.location?.city}
            </div>

            <button
              onClick={handleMapDirections}
              className="h-12 max-w-xs border border-main bg-white py-3 px-4 rounded-2xl flex items-center gap-2 text-main font-bold shadow-[0_4px_0_0_#d6dcd9]"
            >
              Show Directions
              <img
                src="https://playo-website.gumlet.io/playo-website-v3/icons/arrow-up-right_large.png"
                className="w-[20px]"
                alt="arrow"
              />
            </button>
          </div>
        </section>
      </section>

      {/* ================= TABS ================= */}
      <section className="w-full flex flex-col pt-6">

        {/* TAB HEADER */}
        <section className="flex items-start gap-14 border-b-2">

          <div
            onClick={() => setActiveTab("instructions")}
            className={`cursor-pointer pb-3 font-medium transition border-b-2 ${activeTab === "instructions"
              ? "border-main text-main"
              : "border-transparent text-[#758a80]"
              }`}
          >
            Game Instructions
          </div>

          <div
            onClick={() => setActiveTab("queries")}
            className={`cursor-pointer pb-3 font-medium transition border-b-2 ${activeTab === "queries"
              ? "border-main text-main"
              : "border-transparent text-[#758a80]"
              }`}
          >
            Queries ({queries.length})
          </div>

        </section>

        {/* ================= TAB CONTENT ================= */}
        <section className="pt-8">

          {/* INSTRUCTIONS */}
          {activeTab === "instructions" && (
            <section className="flex flex-wrap gap-6">

              <div className="flex items-center gap-4">
                <img
                  src="https://playo-website.gumlet.io/playo-website-v3/icons/skillset_icon.png"
                  alt="skill"
                  width="40"
                />
                <div className="font-medium text-[16px] capitalize">
                  {game.skillLevel}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src="https://playo-website.gumlet.io/playo-website-v3/icons/Required_players_icon_Large.png"
                  alt="players"
                  width="40"
                />
                <div className="font-medium text-[16px]">
                  <span className="font-bold">{game.totalSlots}</span> Required Players
                </div>
              </div>

            </section>
          )}

          {/* QUERIES */}
          {activeTab === "queries" && (
            <section className="flex flex-col gap-4">

              {queries.length === 0 ? (
                <div className="text-[#758a80]">
                  No queries yet.
                </div>
              ) : (
                queries.map((q, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#e3e8e6] rounded-2xl bg-white"
                  >
                    <div className="font-medium text-main">
                      {q.user?.name || "User"}
                    </div>
                    <div className="text-sm text-[#758a80] mt-1">
                      {q.message}
                    </div>
                  </div>
                ))
              )}

            </section>
          )}

        </section>
      </section>

    </div>
  );
};

export default PlayJoin;
