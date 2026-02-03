import React, { useRef } from "react";
import GamesCard from "./GamesCard";

const DiscoverGamesHome = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    // Card min width (320) + spacing (~40)
    const scrollAmount = 360;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-8">

      {/* Header */}
      <div className="flex justify-between font-bold md:px-12 px-4">
        <h2 className="md:leading-9 leading-8 md:text-2xl text-xl">
          Discover Games
        </h2>

        <button className="text-primary flex justify-center items-center gap-2 font-bold leading-6">
          SEE ALL GAMES
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow_green.png"
            alt="right"
            width={16}
            height={16}
          />
        </button>
      </div>

      {/* Scroll Area */}
      <div className="flex mt-6">
        <div className="relative overflow-hidden w-full">

          {/* Actual scroll container (IMPORTANT) */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {/* Card wrappers for spacing (Playo style) */}
            <div className="md:ml-6 md:first:ml-12 first:ml-4 ml-4 mb-6">
              <GamesCard />
            </div>

            <div className="md:ml-6 ml-4 mb-6">
              <GamesCard />
            </div>

            <div className="md:ml-6 ml-4 mb-6">
              <GamesCard />
            </div>

            <div className="md:ml-6 ml-4 mb-6">
              <GamesCard />
            </div>

            <div className="md:ml-6 ml-4 mb-6 last:pr-4 md:last:pr-12">
              <GamesCard />
            </div>

            {/* Add more GamesCard here → scroll will activate automatically */}
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <div className="flex justify-center items-center mb-6 gap-3">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="bg-white w-11 h-11 rounded-full
                     shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                     flex justify-center items-center
                     transition-transform active:scale-95"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="left"
            width={20}
            height={20}
            className="rotate-180"
          />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="bg-white w-11 h-11 rounded-full
                     shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]
                     flex justify-center items-center
                     transition-transform active:scale-95"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="right"
            width={20}
            height={20}
          />
        </button>
      </div>

    </section>
  );
};

export default DiscoverGamesHome;
