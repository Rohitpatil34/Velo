import React from 'react'
import DesktopNavbar from '../components/Navbar/DesktopNavbar';
import TrainerProfileWrapper from '../components/Train Page/TrainerProfileWrapper';
import SportsComplexHome from '../components/SportsComplexHome';
import HomePageFooter from '../components/HomePageFooter';
import MobileBottomNav from '../components/Navbar/MobileBottomNav';
import MobileTopNav from '../components/Navbar/MobileTopNav';

const TrainerProfilePage = () => {
    return (
        <div className="bg-surface md:pb-40 text-main box-border">
            {/* Navbar */}
            <DesktopNavbar />
            <MobileTopNav/>

            {/* Trainer Profile Layout */}
            <TrainerProfileWrapper />
            <SportsComplexHome />
            <HomePageFooter />
            <MobileBottomNav />

        </div>
    );
};

export default TrainerProfilePage