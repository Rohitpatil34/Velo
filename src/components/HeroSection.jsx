import React from "react";
import hero1 from "../assets/hero1.png"
import hero2 from "../assets/hero2.png"
import hero3 from "../assets/hero3.png"
const HeroSection = () => {
  return (
    <section className="bg-white rounded-b-3xl">
      <div className="md:flex max-w-page md:mx-12 xxl:m-auto mx-4">

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 flex flex-col justify-center">

          {/* Location chip (desktop only) */}
          <div className="hidden md:block mt-4">
            <div className="bg-surface border border-[#E3E8E6] flex items-center rounded-2xl pl-4 py-2 pr-6 w-fit">
              <img
                src="https://playo-website.gumlet.io/playo-website-v3/icons/location_icon.png"
                alt="Location"
                className="w-5 h-5"
              />
              <span className="ml-2 capitalize font-medium leading-6">
                bangalore
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="md:text-3xl text-2xl leading-[1.5] font-black md:w-3/5 mt-6 uppercase text-[#3b4540]">
            Book sports venues. <br />
            Join games. <br />
            Find trainers near you.
          </h1>

          {/* Subheading */}
          <h2 className="text-mute_text font-medium md:w-2/3 leading-[1.5] mt-6 text-xl">
            The ultimate platform to discover top-rated facilities, connect with professional coaches, and find your team instantly.
          </h2>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:w-1/2 pb-4 relative">

         
          {/* <div className="absolute top-2/3 left-1/2 -translate-x-1/2">
            <div className="relative flex items-center justify-center">
              {[
                "Y","O","U","R"," ",
                "O","N","E"," ",
                "S","T","O","P"," ",
                "P","L","A","T","F","O","R","M"
              ].map((char, i) => (
                <span
                  key={i}
                  className="absolute uppercase font-medium h-52"
                  style={{
                    transform: `rotate(${i * 18}deg)`,
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div> */}

          {/* Hero Images */}
          <div className="flex w-full items-center justify-center h-full mt-8 mb-18">

            {/* Left image */}
            <img
              src={hero1}
              className="w-1/2"
              alt="Basketball"
            />

            {/* Right images */}
            <div className="relative w-1/2 flex flex-col">

              

              <img
                src={hero2}
                alt="Badminton"
              />

              <img
                src={hero3}
                alt="Football"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
