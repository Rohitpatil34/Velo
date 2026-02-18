import React, { useState } from "react";

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
import LoginSignupModal from "./components/Auth/LoginSignupModal";
import VerifyEmail from "./Pages/VerifyEmail";
import ProfilePage from "./Pages/ProfilePage";
import Myprofile from "./components/Profile/MyBookings";
import FeedBack from "./components/Profile/FeedBack";
import EditProfile from "./components/Profile/EditProfile";
import MyBookings from "./components/Profile/MyBookings";
import JoinPagePlay from "./Pages/JoinPagePlay";
import TrainerProfilePage from "./Pages/TrainerProfilePage";
import TrainerCategoryPage from "./components/Train Page/TrainerCategoryPage";


const App = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);


  return (
    <BrowserRouter>

      {/* 🔹 LOGIN / SIGNUP MODAL (GLOBAL) */}
      <LoginSignupModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage onLoginClick={() => setIsAuthOpen(true)} />}
        />

        <Route
          path="/play"
          element={<PlayPage onLoginClick={() => setIsAuthOpen(true)} />}

        />
        <Route path="/play/:playId" element={<JoinPagePlay />} />

        <Route
          path="/train"
          element={<TrainPage onLoginClick={() => setIsAuthOpen(true)} />}
        />
        <Route
          path="/trainer/categories/:sport"
          element={<TrainerCategoryPage />}
        />
        <Route
          path="/trainer/details/:id"
          element={<TrainerProfilePage />}
        />


        <Route
          path="/book"
          element={<BookPage onLoginClick={() => setIsAuthOpen(true)} />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
        <Route path="/profile" element={<ProfilePage />} >
          <Route index element={<Myprofile />} />
          <Route path="myprofile" element={<MyBookings />} />
          <Route path="feedback" element={<FeedBack />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>


      </Routes>

    </BrowserRouter>
  );
};

export default App;
