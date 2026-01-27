import React from 'react'
import BookMainContent from '../components/BookPage/BookMainContent'
import SearchBook from '../components/BookPage/SearchBook'
import DesktopNavbar from '../components/Navbar/DesktopNavbar'
import MobileTopNav from '../components/Navbar/MobileTopNav'
import SportsComplexHome from '../components/SportsComplexHome'
import HomePageFooter from '../components/HomePageFooter'
import MobileBottomNav from '../components/Navbar/MobileBottomNav'


const BookPage = () => {
  return (
    <div className=" scroll-m-2">
        <DesktopNavbar/>
        <MobileTopNav/>
        <SearchBook/>
        <BookMainContent/>
        <SportsComplexHome/>
        <HomePageFooter/>
        <MobileBottomNav/>
    </div>
  )
}

export default BookPage