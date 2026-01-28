import React from "react";

const BookCard = () => {
  return (
    <div className="border_radius bg-white card_shadow pb-2 cursor-pointer transition duration-200 transform hover:scale-[1.02]">
      
      {/* IMAGE */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-full h-44 sm:h-48 md:h-52">
          <img
            src="https://playo.gumlet.io/KLUTCHJCROAD20250512053737422393/KlutchJCRoad1758113426707.jpeg?mode=crop&crop=smart&h=200&width=450&q=75"
            alt="Klutch JC Road"
            className="absolute inset-0 w-full h-full object-cover rounded-t-md bg-surface"
          />
        </div>

        {/* TAGS */}
        <div className="absolute right-0 py-2 my-3 text-sm font-medium text-center text-white rounded-tl-md w-28 bg-primary bottom-[50px] md:bottom-[54px]">
          Bookable
        </div>

        <div className="absolute left-0 py-2 my-3 text-sm font-medium text-center rounded-tr-md w-28 bg-tertiary text-on_tertiary bottom-[50px] md:bottom-[54px]">
          Featured
        </div>

        {/* DETAILS */}
        <div className="flex flex-col items-start justify-start w-full px-4 py-1">
          
          {/* TITLE + RATING */}
          <div className="flex items-center justify-between w-full mt-2 text-sm text-tint">
            <div className="w-64 overflow-hidden truncate text-[#27272A] title_large">
              Klutch JC Road
            </div>

            <div className="flex items-center space-x-1">
              <img
                src="https://playo-website.gumlet.io/playo-website-v2/logos-icons/ico+_+24+_+actions+_+star.svg"
                alt="rating"
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold">4.17</span>
              <span className="text-sm">(24)</span>
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex mt-2 text-xs md:text-sm text-tint max-w-52 md:max-w-1/2 overflow-hidden">
            <span className="truncate max-w-48">Town Hall</span>
            <span className="ml-1 truncate">(~ 1.8 km)</span>
          </div>
        </div>
      </div>

      {/* SPORTS */}
      <div className="flex items-center mx-2 mt-1">
        <img
          src="https://playo.gumlet.io/V3SPORTICONS/SP83.png?q=20"
          alt="Pickleball"
          className="w-10 h-10"
        />
        <img
          src="https://playo.gumlet.io/V3SPORTICONS/SP56.png?q=20"
          alt="Box Cricket"
          className="w-10 h-10"
        />
        <span className="ml-1 text-xs text-tint">+ 2 more</span>
      </div>
    </div>
  );
};

export default BookCard;
