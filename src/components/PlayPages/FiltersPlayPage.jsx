import React from "react";

const FiltersPlayPage = () => {
  return (
    <div className="mt-6 w-full flex gap-2 px-4 md:mx-2 overflow-auto no-scrollbar">
      
      {/* GameTime Toggle */}
      <div className="flex gap-4 border border-[#E3E8E6] bg-white py-3 px-4 rounded-2xl cursor-pointer min-w-fit">
        <img
          src="https://playo-website.gumlet.io/playo-website-v3/icons/activity/gameTime_logo.png"
          width="24"
          height="24"
          alt="Gametime activities"
          className="h-6 w-6"
        />
        <span className="font-medium">GameTime by Playo</span>
        <div className="flex items-center justify-center">
          <button className="border-main relative inline-flex items-center bg-white border-2 h-4 w-6 rounded-full transition-colors focus:outline-none">
            <span className="translate-x-[2px] bg-white border-2 border-main inline-block h-2 w-2 transform rounded-full transition-transform"></span>
          </button>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="flex justify-center items-center gap-4 border border-[#E3E8E6] bg-white py-3 px-4 rounded-2xl cursor-pointer min-w-fit">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M0 2V7.33333H7.33333V0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2ZM6 6H1.33333V2C1.33333 1.82319 1.40357 1.65362 1.5286 1.5286C1.65362 1.40357 1.82319 1.33333 2 1.33333H6V6Z" fill="#3B4540"/>
          <path d="M0 14C0 14.5304 0.210714 15.0392 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H7.33333V8.66669H0V14Z" fill="#3B4540"/>
        </svg>
        <span className="font-medium">Filter & Sort By</span>
        <div className="w-6 h-6 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15.0572 3.95264L8.47124 10.5386C8.34449 10.6603 8.1756 10.7282 7.99991 10.7282C7.82421 10.7282 7.65533 10.6603 7.52857 10.5386L0.946573 3.95597L0.00390625 4.89864L6.58591 11.4813C6.96714 11.8447 7.47359 12.0473 8.00024 12.0473C8.52689 12.0473 9.03334 11.8447 9.41457 11.4813L15.9999 4.8953L15.0572 3.95264Z" fill="#3B4540"/>
          </svg>
        </div>
      </div>

      {/* Sports */}
      <button className="outline-none">
        <div className="flex justify-center items-center gap-4 py-3 px-4 rounded-2xl cursor-pointer border border-[#E3E8E6] bg-white min-w-fit">
          <span className="font-medium">Sports</span>
        </div>
      </button>

      {/* Date */}
      <button>
        <div className="flex justify-center items-center gap-4 py-3 px-4 rounded-2xl cursor-pointer border border-[#E3E8E6] bg-white min-w-fit">
          <span className="font-medium">Date</span>
        </div>
      </button>

      {/* Pay & Join */}
      <div className="flex justify-center items-center gap-4 py-3 px-4 rounded-2xl cursor-pointer border border-[#E3E8E6] bg-white min-w-fit">
        <span className="font-medium">Pay & Join Game</span>
      </div>

    </div>
  );
};

export default FiltersPlayPage;
