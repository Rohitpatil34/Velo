import React from "react";
import { useLocation } from "../../context/LocationContext";

const Heading = () => {
  const { location } = useLocation();

  const cityName =
    location.city && location.city !== "Select Location"
      ? location.city
      : "your area";

  return (
    <div className="mx-4 md:mx-0 md:px-6">
      <div className="flex justify-between items-center mx-auto w-full">

        {/* Left Heading */}
        <h1 className="text-[32px] font-bold leading-[48px]">
          Games in <span className="capitalize">{cityName}</span>
        </h1>

      </div>
    </div>
  );
};

export default Heading;
