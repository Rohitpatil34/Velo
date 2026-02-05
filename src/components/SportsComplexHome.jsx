import React, { useState, useRef } from "react";

const CITIES = [
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi NCR",

];

const SportsComplexHome = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const itemRefs = useRef([]);

  const toggleCity = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));

    // ⬇️ scroll to clicked box
    setTimeout(() => {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section className="mt-14 md:mx-12 px-4 md:px-0 xxl:mx-auto max-w-page">
      <section className="rounded-2xl overflow-hidden md:rounded-3xl">
        
        {/* 🟢 GREEN STRIP */}
        <div className="bg-[#00b562] flex items-center justify-center md:justify-between flex-wrap">
          <h3 className="text-white font-bold text-center md:text-left md:pl-12 text-3xl md:w-1/2 py-6">
            Explore Sports Complexes Near You
          </h3>
        </div>

        {/* CONTENT */}
        <div className="bg-white py-14 md:px-14 px-4">
          <h3 className="font-bold mb-6 text-2xl">
            Top Sports Complexes in Cities
          </h3>

          <div className="flex flex-wrap gap-6">
            {CITIES.map((city, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={city}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className="
                    border px-6 py-4 rounded-2xl
                    grow md:grow-0
                    basis-full md:basis-[calc(50%-12px)]
                    transition-all duration-300
                  "
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleCity(index)}
                    className="flex items-center w-full font-medium text-left"
                  >
                    {city}

                    <img
                      src="https://playo-website.gumlet.io/playo-website-v3/icons/down_arrow.png"
                      width={16}
                      height={16}
                      alt="toggle"
                      className={`ml-auto transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Slide-down content */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${isOpen ? "max-h-40 mt-4" : "max-h-0"}
                    `}
                  >
                    <p className="text-sm leading-6 text-[#758a80]">
                      Discover top-rated sports complexes in {city}. Book venues,
                      join games, and play your favorite sports with ease using
                      Velo.
                    </p>

                    <button className="mt-3 text-sm font-semibold text-[#00b562] hover:underline">
                      View Venues →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default SportsComplexHome;
