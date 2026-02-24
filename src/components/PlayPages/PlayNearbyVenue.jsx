import React from "react";

const PlayNearbyVenue = () => {
  const venues = [
    {
      id: 1,
      name: "Shuttlewhizz Badminton Academy",
      distance: "3.17 km away",
      image:
        "https://playo.gumlet.io/SHUTTLEWHIZZBADMINTONACADEMY20251206185259510524/ShuttlewhizzBadmintonAcademy1768058565173.jpeg",
    },
    {
      id: 2,
      name: "Power Play Badminton Academy",
      distance: "3.17 km away",
      image:
        "https://playo.gumlet.io/POWERPLAYBADMINTONACADEMY20251002175206690237/PowerPlayBadmintonAcademy1759843706105.jpeg",
    },
    {
      id: 3,
      name: "Power Play Sports Academy",
      distance: "3.19 km away",
      image:
        "https://playo.gumlet.io/POWERPLAYSPORTSACADEMY20240913064747255193/PowerPlaySportsAcademy1726210291556.jfif",
    },
  ];

  return (
    <section
      className="
        self-stretch m-auto flex-grow w-full
        rounded-2xl px-6 bg-white
        flex flex-col gap-6
        overflow-y-auto no-scrollbar
      "
    >
      {/* ================= HEADER ================= */}
      <section className="sticky top-0 bg-white pt-4 text-xl font-bold text-main">
        Venues Nearby
      </section>

      {/* ================= VENUE LIST ================= */}
      <section className="flex flex-col gap-6 w-full">
        {venues.map((venue) => (
          <VenueRow key={venue.id} venue={venue} />
        ))}
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="sticky bottom-0 pb-6 bg-white">
        <button
          className="
            h-12 max-w-xs w-full
            border border-[#e3e8e6]
            shadow-[0-4px-0-0] shadow-[#d6dcd9]
            bg-white
            py-3 px-4 rounded-2xl
            flex items-center justify-center gap-2
            text-main font-bold
          "
        >
          SEE ALL VENUES
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/arrow_right_icon.png"
            alt="arrow right"
            className="w-6 h-6 object-contain"
          />
        </button>
      </section>
    </section>
  );
};

/* ================= SINGLE VENUE ROW ================= */
const VenueRow = ({ venue }) => {
  return (
    <section className="flex items-center gap-4 w-full cursor-pointer">
      {/* Image */}
      <div className="w-[54px] h-[44px] overflow-hidden">
        <img
          src={venue.image}
          alt={`${venue.name} venue`}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Info */}
      <section className="flex-grow flex flex-col gap-1">
        <div className="text-[16px] font-medium text-main">
          {venue.name}
        </div>
        <div className="text-sm font-medium text-[#758a80]">
          ~ {venue.distance}
        </div>
      </section>
    </section>
  );
};

export default PlayNearbyVenue;
