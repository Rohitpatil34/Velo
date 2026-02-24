import React from "react";
import { Star } from "lucide-react";

const BookMainContentHeader = ({ venue }) => {
  return (
    <div className="flex flex-col w-full">

      <h1 className="font-bold text-[24px] md:text-[32px]">
        {venue.name}
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center mt-2">
        <div className="text-[#515455] font-medium text-md">
          {venue.area || venue.city}
        </div>

        <div className="flex flex-row mt-1 sm:mt-0 sm:ml-2 sm:items-center">
          <Star className="w-5 h-5 text-yellow-500 mr-1 fill-yellow-500" />
          <div className="mr-1 text-sm font-semibold">
            {venue.rating?.toFixed(1) || "0.0"}
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookMainContentHeader;