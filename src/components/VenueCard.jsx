import React from "react";

const VenueCard = ({
  image="https://playo.gumlet.io/TIENTO/tientosports6.jpg?mode=crop&crop=smart&h=200&width=450&q=40&format=webp",
  name = "RSA Ravi's Turf",
  rating = "2.18",
  reviews = 17,
  address = "15, Cambridge Road, Ne...",
  distance = "3.73 Kms",
  featured = true,
}) => {
  return (
    <div className="w-full max-w-[340px] cursor-pointer rounded-[16px] border border-[#E3E8E6] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">

      {/* 🔹 Inner Padding Wrapper */}
      <div className="p-3 flex flex-col gap-3">

        {/* 🔹 Image */}
        <div className="relative h-[160px] w-full overflow-hidden rounded-[12px]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover rounded-[12px]"
          />

          {/* FEATURED Badge */}
          {featured && (
            <div className="absolute bottom-3 right-3 rounded-full bg-[#111827] px-[10px] py-[6px] text-[11px] font-semibold tracking-wide text-white">
              FEATURED
            </div>
          )}
        </div>

        {/* 🔹 Venue Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <span className="truncate text-[16px] font-semibold leading-[22px] text-[#111827]">
            {name}
          </span>

          <div className="flex items-center gap-1 rounded-md bg-[#E6F7EF] px-2 py-[2px] text-[12px] font-semibold text-[#16A34A]">
            {rating}
            <span className="text-[10px] font-medium">
              ({reviews})
            </span>
          </div>
        </div>

        {/* 🔹 Address */}
        <div className="truncate text-[13px] font-medium text-[#6B7280]">
          {address} (~{distance})
        </div>

      </div>
    </div>
  );
};

export default VenueCard;
