import React, { useRef } from "react";

const TrainerProfile = ({ trainer }) => {
  const scrollRef = useRef();

  const images = trainer?.images || [];

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 380; // card width approx
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="border bg-white rounded-2xl pt-6 flex flex-col gap-6">

      {/* Carousel */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar"
        >
          {/* Bio card */}
          <div className="rounded-2xl w-[360px] max-w-[260px] md:max-w-[360px] ml-6 mb-6 bg-[#c5fceb] h-[178px] md:h-[248px] flex items-center p-4 shrink-0">
            <div className="text-main text-base line-clamp-6">
              {trainer?.bio || "Trainer description"}
            </div>
          </div>

          {/* Images */}
          {images.map((img, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden h-[178px] md:h-[248px] max-w-[260px] md:max-w-[360px] w-full ml-3 md:ml-6 mb-6 shrink-0"
            >
              <img
                src={img}
                alt={`trainer-${index}`}
                className="object-cover h-full w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center mb-6 gap-3">
        <button
          onClick={() => scroll("left")}
          className="bg-white w-11 h-11 rounded-full shadow flex justify-center items-center"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="left"
            width="20"
            className="rotate-180"
          />
        </button>

        <button
          onClick={() => scroll("right")}
          className="bg-white w-11 h-11 rounded-full shadow flex justify-center items-center"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="right"
            width="20"
          />
        </button>
      </div>
    </div>
  );
};

export default TrainerProfile;
