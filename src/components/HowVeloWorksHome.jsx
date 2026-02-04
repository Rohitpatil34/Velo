import React, { useState } from "react";

const STEPS = [
  {
    step: "01",
    title: "Discover",
    description:
      "Find sports venues and games near you based on location, sport, and skill level.",
  },
  {
    step: "02",
    title: "Book or Join",
    description:
      "Instantly book venues or join games hosted by other players in just a few clicks.",
  },
  {
    step: "03",
    title: "Play",
    description:
      "Show up, play your game, and enjoy a seamless sports experience with zero hassle.",
  },
  {
    step: "04",
    title: "Connect",
    description:
      "Meet new players, build your Karma, and become part of the Velo sports community.",
  },
];

const HowVeloWorksHome = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="p-6 md:p-12">
      {/* Title */}
      <h3 className="font-bold text-xl md:text-2xl leading-9 mb-8">
        How Velo Works
      </h3>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STEPS.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.step}
              onClick={() => toggle(index)}
              className="
                border rounded-2xl p-5 bg-white
                cursor-pointer
                transition-shadow duration-200
                hover:shadow-md
              "
            >
              {/* Step Number */}
              <div className="text-[#00b562] font-bold text-lg mb-2">
                {item.step}
              </div>

              {/* Title */}
              <h4 className="font-semibold text-lg text-[#1F2933]">
                {item.title}
              </h4>

              {/* Sliding Description */}
              <div
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${isOpen ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"}
                `}
              >
                <p className="text-sm leading-6 text-[#758a80]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowVeloWorksHome;
