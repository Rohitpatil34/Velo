import React from "react";

const PlayBottomNav = () => {
  return (
    <section className="py-4 md:py-6 px-4 fixed left-0 w-full flex justify-center items-stretch border border-[#e3e8e6] bg-background gap-4 bottom-12 md:bottom-0 md:justify-end md:px-14 z-50">
      <div className="max-w-[1440px] w-full flex justify-center items-stretch mx-auto self-end justify-self-end">
        <section className="w-full flex items-center justify-between flex-col md:flex-row">
          
          {/* Left spacer */}
          <div></div>

          {/* Buttons */}
          <div className="flex gap-4 w-full justify-center pb-4 md:pb-0 md:w-auto">
            {/* Send Query */}
            <div className="self-stretch flex justify-center items-center py-3 px-6 rounded-2xl bg-background font-bold text-[14px] md:text-base leading-6 text-center text-[#3b4540] tracking-wider border cursor-pointer border-[#e3e8e6] shadow-[#d6dcd9] shadow-[0_4px_0_0]">
              SEND QUERY
            </div>

            {/* Pay & Join */}
            <div className="self-stretch flex justify-center items-center py-3 px-6 shadow-[#00914e] rounded-2xl bg-[#00b562] font-bold text-[14px] md:text-[16px] leading-6 text-center text-[#fff] tracking-wider cursor-pointer hover:bg-green-700 shadow-[0_4px_0_0]">
              PAY &amp; JOIN
            </div>

            {/* Right spacer */}
            <div></div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default PlayBottomNav;
