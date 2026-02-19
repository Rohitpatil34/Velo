import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      className="
        fixed bottom-0 left-0 right-0 z-10
        w-full bg-white border-2 border_container
        md:static md:top-0 md:h-screen md:col-span-3
      "
    >
      <div className="flex flex-row md:flex-col justify-center w-full">

        {/* ================= PROFILE INFO (DESKTOP ONLY) ================= */}
        <div className="hidden md:flex flex-col items-center py-4 space-y-1 border-b">
          <div className="relative w-16 h-16">
            <img
              src="https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png"
              alt="profile"
              className="rounded-full w-16 h-16 object-cover"
            />
          </div>

          <div className="font-semibold text-md">
            {user?.name || "Guest User"}
          </div>
          <div className="text-sm font-medium">
            {user?.mobile || ""}
          </div>
          <div className="text-sm font-normal break-all text-center">
            {user?.email || ""}
          </div>
        </div>

        {/* ================= MENU ================= */}
        {user && (
          <nav className="flex w-full flex-row md:flex-col">

            {/* My Profile */}
            <SidebarItem
              to="myprofile"
              label="My Profile"
              activeIcon="https://playo-website.gumlet.io/playo-website-v2/profile/white-booking.svg"
              inactiveIcon="https://playo-website.gumlet.io/playo-website-v2/profile/disable-booking.svg"
            />

            {/* Edit Profile */}
            <SidebarItem
              to="editprofile"
              label="Edit Profile"
              activeIcon="https://playo-website.gumlet.io/playo-website-v2/profile/white-edit.svg"
              inactiveIcon="https://playo-website.gumlet.io/playo-website-v2/profile/disable-edit.svg"
            />

            {/* Feedback */}
            <SidebarItem
              to="feedback"
              label="Feedback"
              activeIcon="https://playo-website.gumlet.io/playo-website-v2/profile/white-feedback.svg"
              inactiveIcon="https://playo-website.gumlet.io/playo-website-v2/profile/disable-feedback.svg"
            />

          </nav>
        )}
      </div>
    </aside>
  );
}

/* ================= MENU ITEM ================= */
const SidebarItem = ({ to, label, activeIcon, inactiveIcon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex flex-col md:flex-row
        items-center justify-center md:justify-start
        w-full py-3 md:px-5
        cursor-pointer transition
        ${
          isActive
            ? "bg-primary text-white"
            : "bg-white text-black hover:bg-gray-50"
        }
        `
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? activeIcon : inactiveIcon}
            alt={label}
            className="w-5 h-5 md:mr-4"
          />
          <span className="text-sm md:text-md font-medium text-center md:text-left">
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;
