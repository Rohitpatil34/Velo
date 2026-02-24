import React, { useState, useEffect } from "react";
import { useLocation } from "../../context/LocationContext";
import { Link } from "react-router-dom";


const Trainers = ({ setFilters }) => {

  const { location } = useLocation();
  const [search, setSearch] = useState("");

  /* update filter when typing */
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: search,
    }));
  }, [search]);

  return (
    <div
      id="homeData"
      className="flex mx-4 p-4 md:p-0 flex-col md:mt-[52px] gap-6 md:gap-[52px] bg-white rounded-2xl xl:w-[1032px] md:mx-auto"
    >
      {/* TOP SECTION */}
      <div className="flex flex-col gap-[52px]">
        <div className="flex flex-col gap-6 max-w-[926px] md:p-[52px] md:pb-0">

          {/* DYNAMIC TITLE */}
          <h1 className="font-bold text-main text-2xl md:text-[32px] leading-[1.5] mx-auto text-left w-full">
            Sports Trainers in {location?.city || "your city"}
          </h1>

          {/* SEARCH BAR */}
          <div className="max-w-[926px] w-full xl:w-[1032px] mx-auto flex flex-col relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for coaches / academies"
              className="h-[52px] md:h-[62px] rounded-2xl md:rounded-3xl outline-none border text-main placeholder:text-[#758a80] font-medium px-4 md:px-6 bg-[#f1f3f2] border-[#e3e8e6]"
            />

            <div className="absolute right-4 md:right-6 top-[33%] w-4 h-4 md:w-6 md:h-6">
              <img
                src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/search-icon.png"
                alt="search"
                className="w-5 h-5 md:w-full md:h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>

     
      {/* SERVICES SECTION */}
      <div
        id="services"
        className="max-w-[1032px] w-full mx-auto flex flex-col gap-[24px] md:gap-[32px] bg-white rounded-2xl md:p-[52px] md:pt-0"
      >
        <div className="text-base md:text-xl">
          Hey!{" "}
          <span className="font-bold text-main md:text-xl">
            What’re you looking to level up on?
          </span>
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-3 gap-[14px] md:gap-6 md:grid-cols-5 lg:grid-cols-6 justify-items-center items-center w-full">
          {[
            { name: "Badminton", img: "Badminton_new.png", link: "badminton" },
            { name: "Swimming", img: "Swimming_new.png", link: "swimming" },
            { name: "Pickleball", img: "PickleballWeb.png", link: "pickleball" },
            { name: "Football", img: "Football_new.png", link: "football" },
            { name: "Cricket", img: "Cricket_new.png", link: "cricket" },
            { name: "Tennis", img: "Tennis_new.png", link: "tennis" },
            { name: "Physio", img: "Physio_new.png", link: "physio" },
            { name: "Nutrition", img: "Nutrition_new.png", link: "nutrition" },
            { name: "Yoga", img: "Yoga_new.png", link: "yoga" },
            { name: "Fitness", img: "Fitness_new.png", link: "fitness-trainer" },
          ].map((item) => (
            <Link
              key={item.name}
              to={`/trainer/categories/${item.link}`}
              title={item.name}
              className="flex flex-col gap-2 cursor-pointer"
            >
              <img
                src={`https://playov2.gumlet.io/trainer_service_image/${item.img}`}
                alt={item.name}
                className="h-[100px] w-[100px] md:h-[140px] md:w-[140px] border-[2px] rounded-2xl object-cover border-transparent hover:border-[#00b562] transition-all"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
