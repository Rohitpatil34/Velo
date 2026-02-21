import React, { useState } from "react";

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="w-full">

      {/* ================= TABS ================= */}
      <div className="absolute inset-x-0 w-full px-4 py-2 bg-white rounded-lg md:bg-transparent md:relative sm:px-0">
        <div
          className="flex items-center max-w-md space-x-1 rounded-lg sm:m-3 md:h-16 md:p-2 bg-surface"
          role="tablist"
        >
          <button
            onClick={() => setActiveTab("all")}
            className={`w-full rounded-lg py-2.5 text-md font-semibold h-10
              ${activeTab === "all"
                ? "bg-primary text-white"
                : "bg-white text-black"}`}
          >
            All Bookings
          </button>

          <button
            onClick={() => setActiveTab("cancelled")}
            className={`w-full rounded-lg py-2.5 text-md font-semibold h-10
              ${activeTab === "cancelled"
                ? "bg-primary text-white"
                : "bg-white text-black"}`}
          >
            Cancelled
          </button>
        </div>

        {/* ================= INFO BANNER ================= */}
        <div className="flex flex-row items-center justify-center px-1 py-3 mx-3 mt-5 border-2 md:px-3 border_container">
          <div className="hidden w-8 h-8 bg-white rounded-full lg:flex">
            <img
              src="https://playo-website.gumlet.io/playo-website-v2/profile/Icon+color.svg"
              alt="info"
              className="object-contain"
            />
          </div>

          <div className="flex flex-col items-center lg:flex-row">
            <span className="px-3 py-2 text-sm font-medium border-b md:border-b-white md:text-md lg:text-lg xl:border-r">
              The <span className="font-semibold">Reschedule</span> feature is only
              available on iOS and Android app
            </span>

            <span className="flex flex-row items-center py-2 mx-3 text-xs font-medium lg:py-0 lg:text-lg">
              Download Now
              <img
                src="https://playo-website.gumlet.io/playo-website-v2/google-play+1.svg"
                alt="google-play"
                className="mx-2 cursor-pointer"
              />
              <img
                src="https://playo-website.gumlet.io/playo-website-v2/app-store+1.svg"
                alt="app-store"
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="w-full mt-10">
        <div className="rounded-xl bg-white p-3">

          {/* EMPTY STATE */}
          <div className="flex flex-col items-center mb-20">
            <p className="text-gray-500 text-lg mb-6">
              {activeTab === "all"
                ? "No bookings found."
                : "No cancelled bookings."}
            </p>

            {/* PAGINATION */}
            <nav className="inline-flex rounded-md shadow-sm">
              <button className="px-2 py-2 border border-gray-300 rounded-l-md hover:bg-gray-50">
                ‹
              </button>
              <button className="px-2 py-2 border border-gray-300 rounded-r-md hover:bg-gray-50">
                ›
              </button>
            </nav>
          </div>
        </div>
      </div>

    </section>
  );
};

export default MyBookings;
