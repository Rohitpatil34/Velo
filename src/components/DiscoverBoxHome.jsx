import React from 'react'
import DiscoverGamesHome from './DiscoverGamesHome'
import DiscoverVenueHome from './DiscoverVenueHome'
import PopularSportsCards from './PopularSportsCard'

const DiscoverBoxHome = () => {
  return (
    <div className="mx-4 md:mx-12 xxl:mx-auto mt-8 md:mt-14 max-w-page bg-white rounded-2xl md:rounded-3xl pt-6 md:pt-12">
        <DiscoverGamesHome/>
        <DiscoverVenueHome/>
        <PopularSportsCards/>
    </div>
  )
}

export default DiscoverBoxHome