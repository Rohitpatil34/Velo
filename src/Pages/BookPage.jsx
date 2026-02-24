import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import BookMainContent from "../components/BookPage/BookMainContent";
import BookMainContentCombined from "../components/BookPage/BookMainContentCombined";
import SearchBook from "../components/BookPage/SearchBook";

import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileTopNav from "../components/Navbar/MobileTopNav";
import SportsComplexHome from "../components/SportsComplexHome";
import HomePageFooter from "../components/HomePageFooter";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";

import { useLocation } from "../context/LocationContext";

const BookPage = () => {
  const { venueId } = useParams();
  const { location } = useLocation();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  /* ===============================
     Sync sport from URL
  =============================== */
  useEffect(() => {
    const sportFromURL = searchParams.get("sport");

    if (sportFromURL) {
      setSelectedSport(sportFromURL);
    } else {
      setSelectedSport("");
    }
  }, [searchParams]);

  /* ===============================
     Reset search ONLY on location change
     (but don't override sport from URL)
  =============================== */
  useEffect(() => {
    if (!venueId) {
      setSearchTerm("");

      const sportFromURL = searchParams.get("sport");

      // Only reset sport if URL has no sport
      if (!sportFromURL) {
        setSelectedSport("");
      }
    }
  }, [location.lat, location.lng, venueId, searchParams]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <DesktopNavbar />
      <MobileTopNav />

      {venueId ? (
        <BookMainContentCombined />
      ) : (
        <>
          <SearchBook
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
          />

          <BookMainContent
            searchTerm={searchTerm}
            selectedSport={selectedSport}
          />

          <SportsComplexHome />
        </>
      )}

      <HomePageFooter />
      <MobileBottomNav />
    </div>
  );
};

export default BookPage;