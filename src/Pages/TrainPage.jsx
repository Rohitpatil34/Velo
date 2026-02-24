import React from "react";
import TrainPageNavBar from "../components/Navbar/TrainPageNavBar";
import Trainers from "../components/Train Page/Trainers";
import FiltersTrain from "../components/Train Page/FiltersTrain";
import TrainerCardsCollection from "../components/Train Page/TrainerCardsCollection";
import TrainerFaq from "../components/Train Page/TrainerFaq";
import SportsComplexHome from "../components/SportsComplexHome";
import HomePageFooter from "../components/HomePageFooter";
import TrainMainContent from "../components/Train Page/TrainMainContent";
import MobileTopNav from "../components/Navbar/MobileTopNav";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";

const TrainPage = () => {
    return (
        <>
            <div className="bg-surface  text-main box-border">
                {/* <TrainPageNavBar /> */}
                <DesktopNavbar/>
                <MobileTopNav/>
                <TrainMainContent />
                <TrainerFaq />
                <SportsComplexHome />
                <HomePageFooter />
                <MobileBottomNav/>
            </div>

        </>
    );
};

export default TrainPage;
