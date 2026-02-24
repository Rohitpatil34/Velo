import React from "react";
import image1 from "../assets/Image1.png";
import image2 from "../assets/Image2.png";
import image3 from "../assets/Image3.png";
import image4 from "../assets/image4.png";

const SlidingCardsHome = () => {
  return (
    <section className="mt-7">
      <div className="w-full inline-flex flex-nowrap mt-[52px] overflow-hidden no-scrollbar">

        {/* 🔁 First track */}
        <div className="flex flex-shrink-0 items-center justify-center md:justify-start gap-4 animate-infinite-scroll ml-4">
          <img
            src={image1}
            alt="Featured"
            className="min-w-[143px] h-[400px] w-[143px] pl-4 md:pl-0"
          />

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image2}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Turf"
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image3}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Trainers"
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image4}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Book"
            />
          </a>
          
          
        </div>

        {/* 🔁 Duplicate track */}
        <div className="flex flex-shrink-0 items-center justify-center md:justify-start gap-4 animate-infinite-scroll ml-4">
          <img
            src={image1}
            alt="Featured"
            className="min-w-[143px] h-[400px] w-[143px] pl-4 md:pl-0"
          />

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image2}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Turf"
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image3}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Trainers"
            />
          </a>

          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src={image4}
              className="rounded-2xl min-w-[316px] h-[400px] w-[316px]"
              alt="Book"
            />
          </a>
          
        </div>

      </div>
    </section>
  );
};

export default SlidingCardsHome;
