import React, { useRef } from "react";
import VenueCard from "./VenueCard";

const DiscoverVenueHome = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    // Venue card min width (~316) + spacing
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
        <h2 className="md:leading-9 md:text-2xl text-xl">
          Book Venues
        </h2>

        <button className="text-primary flex items-center gap-2 font-bold leading-6">
          SEE ALL VENUES
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

          {/* Actual scroll container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap"
          >
            {/* Card wrappers (spacing same as Playo) */}
            <div className="first:ml-4 ml-4 mb-6 md:first:ml-12 md:ml-6">
              <VenueCard />
            </div>

            <div className="ml-4 mb-6 md:ml-6">
              <VenueCard />
            </div>

            <div className="ml-4 mb-6 md:ml-6">
              <VenueCard />
            </div>

            <div className="ml-4 mb-6 md:ml-6">
              <VenueCard />
            </div>

            <div className="ml-4 mb-6 md:ml-6 last:mr-4 md:last:mr-12">
              <VenueCard />
            </div>
            
            <div className="ml-4 mb-6 md:ml-6 last:mr-4 md:last:mr-12">
              <VenueCard />
            </div>
            {/* Add more VenueCard → scroll activates automatically */}
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

export default DiscoverVenueHome;
