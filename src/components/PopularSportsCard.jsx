import React from "react";

const SPORTS_LIST = [
  {
    label: "Badminton",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/badminton_new.png?q=50",
  },
  {
    label: "Football",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/football_new.png?q=50",
  },
  {
    label: "Cricket",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/cricket_new.png?q=50",
  },
  {
    label: "Swimming",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/swimming_new.png?q=50",
  },
  {
    label: "Tennis",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/tennis_new.png?q=50",
  },
  {
    label: "Table Tennis",
    image:
      "https://playo-website.gumlet.io/playo-website-v3/popular_sports/table_tennis_new.png?q=50",
  },
];

const PopularSportsCard = () => {
  return (
    <section className="mt-8 min-h-[140px]">
      {/* Title */}
      <h3 className="md:px-12 px-4 font-bold leading-9 md:text-2xl text-xl">
        Popular Sports
      </h3>

      {/* Cards Row */}
      <div className="flex mt-6 gap-6 overflow-x-auto no-scrollbar md:justify-between">
        {SPORTS_LIST.map((sport) => (
          <div
            key={sport.label}
            className="
              relative cursor-pointer
              aspect-[185/246]
              shadow-card rounded-2xl
              mb-6 md:mb-12
              overflow-hidden
              min-w-[180px] md:min-w-[100px]
              min-h-[120px]
              first:ml-4 last:mr-4
              md:first:ml-12 md:last:mr-12
            "
          >
            {/* Label */}
            <div className="absolute bottom-0 ml-4 mb-6 md:mb-4 leading-7 text-white font-bold">
              {sport.label}
            </div>

            {/* Image */}
            <img
              src={sport.image}
              alt={sport.label}
              className="min-w-[180px] md:min-w-[100px] min-h-[120px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularSportsCard;
