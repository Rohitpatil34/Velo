import React from "react";

import HeroSection from "../components/HeroSection";
import DiscoverBoxHome from "../components/DiscoverBoxHome";
import SlidingCardsHome from "../components/SlidingCardsHome";
import HowVeloWorksHome from "../components/HowVeloWorksHome";
import AboutTheVeloHome from "../components/AboutTheVeloHome";
import SportsComplexHome from "../components/SportsComplexHome";
import BlogsHomePage from "../components/BlogsHomePage";
import HomePageFooter from "../components/HomePageFooter";

import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileTopNav from "../components/Navbar/MobileTopNav";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";

const HomePage = ({ onLoginClick }) => {
  return (
    <div className="bg-surface md:pb-40 text-main box-border">

      {/* ✅ PASS PROP */}
      <DesktopNavbar onLoginClick={onLoginClick} />
      <MobileTopNav onLoginClick={onLoginClick} />

      <HeroSection />
      <DiscoverBoxHome />
      <SlidingCardsHome />
      <BlogsHomePage />
      <HowVeloWorksHome />
      <AboutTheVeloHome />
      <SportsComplexHome />
      <HomePageFooter />
      <MobileBottomNav onLoginClick={onLoginClick} />
    </div>
  );
};

export default HomePage;
