import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "../../context/LocationContext";

import DesktopNavbar from "../Navbar/DesktopNavbar";
import MobileTopNav from "../Navbar/MobileTopNav";
import MobileBottomNav from "../Navbar/MobileBottomNav";
import SportsComplexHome from "../SportsComplexHome";
import HomePageFooter from "../HomePageFooter";

import TrainerCardsCollection from "./TrainerCardsCollection";

const TrainerCategoryPage = () => {
  const { sport } = useParams();
  const { location } = useLocation();

  /* filters passed to TrainerCardsCollection */
  const [filters, setFilters] = useState({
    service: [sport], // ⭐ important
    distance: 10,
  });

  return (
    <div className="bg-surface text-main">

      {/* NAVBAR */}
      <DesktopNavbar />
      <MobileTopNav />

      {/* PAGE TITLE */}
      <div className="max-w-[1032px] mx-auto px-4 mt-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {sport.toUpperCase()} Trainers in {location?.city}
        </h1>
      </div>

      {/* TRAINER LIST */}
      <div className="mt-8">
        <TrainerCardsCollection filters={filters} />
      </div>

      {/* FOOTER */}
      <SportsComplexHome />
      <HomePageFooter />
      <MobileBottomNav />
    </div>
  );
};

export default TrainerCategoryPage;
