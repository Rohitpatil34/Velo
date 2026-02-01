import React from "react";
import VeloLogo from "../../assets/Velo.png";
import { NavLink } from "react-router-dom";



const MobileTopNav = () => {
    return (
        <header className="md:hidden sticky top-0 z-20 bg-white">
            <div className="flex items-center justify-between px-4 py-2">

                {/* Logo */}
                <NavLink to="/" className="cursor-pointer w-[98px] flex-shrink-0">
                    <img
                        src={VeloLogo}
                        alt="Playo"
                        width="96"
                        height="24"
                        className="py-2 min-w-[98px]"
                        loading="lazy"
                    />
                </NavLink>

                {/* Location Button */}
                <button
                    aria-label="location"
                    className="flex items-center gap-2 bg-surface border border-[#E3E8E6]
                     rounded-2xl px-4 py-2 max-w-[200px]"
                >
                    <img
                        src="https://playo-website.gumlet.io/playo-website-v3/icons/location_icon.png"
                        alt="Location"
                        className="w-5 h-5"
                    />

                    <span className="capitalize truncate font-medium leading-6">
                        bangalore
                    </span>
                </button>

            </div>
        </header>
    );
};

export default MobileTopNav;
