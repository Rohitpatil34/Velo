import React from "react";
import { MapPin } from "lucide-react";

const GamesCard = () => {
  return (
    <div className="bg-white border border-[#E3E8E6] rounded-[16px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)] max-w-[340px] w-full flex flex-col gap-3 cursor-pointer">

      {/* Top Tags */}
      <div className="flex items-center gap-1 text-xs font-medium text-mute_text">
        <span className="capitalize">Doubles</span>
        <span className="w-1 h-1 rounded-full bg-gray-400" />
        <span className="capitalize">Regular</span>
      </div>

      {/* Players + Going */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          <img
            src="https://playov2.gumlet.io/profiles/1765881344118-1765881343.881257.jpg?q=30"
            className="w-9 h-9 rounded-full border-2 border-white object-cover"
          />
          <img
            src="https://playov2.gumlet.io/profiles/1765976318167-file_17659763151782378410881573306310.png?q=30"
            className="w-9 h-9 rounded-full border-2 border-white object-cover"
          />
        </div>

        <span className="text-sm font-semibold text-gray-900">
          7 Going
        </span>
      </div>

      {/* Host + Karma */}
      <div className="text-xs font-medium text-mute_text">
        Srinivas <span className="mx-1">|</span> 553 Karma
      </div>

      {/* Date & Time */}
      <div className="text-sm font-semibold text-gray-900">
        Wed, 21 Jan 2026, 06:30 AM - 08:00 PM
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-xs text-mute_text">
        <MapPin size={16} />
        <span>Sportfit - JP Nagar ~8.86 Kms</span>
      </div>

      {/* Level Chip */}
      <div className="flex items-center gap-2 mt-1">
        <img
          src="https://playo.gumlet.io/V3SPORTICONS/SP5.png"
          className="w-5 h-5"
        />
        <div className="bg-[#F1F3F2] rounded-lg px-3 py-1 text-xs font-medium text-gray-700 truncate">
          Beginner - Professional
        </div>
      </div>

    </div>
  );
};

export default GamesCard;
