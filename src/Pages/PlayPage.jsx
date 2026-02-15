import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import MainContent from '../components/PlayPages/MainContent'
import CollectionGames from '../components/PlayPages/CollectionGames'
import SportsComplexHome from '../components/SportsComplexHome'
import HomePageFooter from '../components/HomePageFooter'
import MobileBottomNav from '../components/Navbar/MobileBottomNav'

const PlayPage = () => {
  return (
    <div className="bg-surface  text-main box-border">
        <Navbar/>
        <MainContent/>
        <CollectionGames/>
        <SportsComplexHome/>
        <HomePageFooter/>
        <MobileBottomNav/>
    </div>
  )
}

export default PlayPage