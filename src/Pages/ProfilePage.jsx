import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileTopNav from "../components/Navbar/MobileTopNav";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      
      {/* NAVBARS */}
      <DesktopNavbar />
      <MobileTopNav />

      {/* MAIN LAYOUT */}
      <main
        className="
          grid grid-cols-12 gap-3
          px-3 md:px-8 lg:px-12
          mt-4
          pb-24 md:pb-6   /* space for bottom sidebar on mobile */
        "
      >
        {/* SIDEBAR */}
        <div className="col-span-12 md:col-span-3">
          <Sidebar />
        </div>

        {/* CONTENT */}
        <div className="col-span-12 md:col-span-9">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
