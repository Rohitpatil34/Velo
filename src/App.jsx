import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection";
import DiscoverBoxHome from "./components/DiscoverBoxHome";
import SlidingCardsHome from "./components/SlidingCardsHome";
import HowVeloWorksHome from "./components/HowVeloWorksHome";
import AboutTheVeloHome from "./components/AboutTheVeloHome";
import SportsComplexHome from "./components/SportsComplexHome";
import BlogsHomePage from "./components/BlogsHomePage";
import HomePageFooter from "./components/HomePageFooter";
import CollectionGames from "./components/PlayPages/CollectionGames";
import Heading from "./components/PlayPages/Heading";
import FiltersPlayPage from "./components/PlayPages/FiltersPlayPage";
import CardsPlayPage from "./components/PlayPages/CardsPlayPage";
import MainContent from "./components/PlayPages/MainContent";
import PlayPage from "./Pages/PlayPage";
import HomePage from "./Pages/HomePage";
import MobileTopNav from "./components/Navbar/MobileTopNav";
import MobileBottomNav from "./components/Navbar/MobileBottomNav";
import TrainPage from "./Pages/TrainPage";
import BookPage from "./Pages/BookPage"

const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        {/* ✅ Default / Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Play page */}
        <Route path="/play" element={<PlayPage />} />

        {/* Train page */}
        <Route path="/train" element={<TrainPage/>} />

        {/* Book page */}
        <Route path="/book" element={<BookPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
