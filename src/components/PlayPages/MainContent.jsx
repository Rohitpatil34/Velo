import React, { useState } from 'react'
import Heading from './Heading'
import FiltersPlayPage from './FiltersPlayPage'
import CardsPlayPage from './CardsPlayPage'
import LoadMoreButton from './LoadMoreButton'

const MainContent = () => {

  const [filters,setFilters] = useState({
    sport:[],
    date:null,
    sort:null,
    time:[],
    skill:[],
    others:[]
  })

  return (
    <section className="flex flex-col md:mx-auto max-w-[1080px] mt-6 md:mt-[52px] w-full">
        <Heading/>
        <FiltersPlayPage
            filters={filters}
            setFilters={setFilters}
        />
        <CardsPlayPage filters={filters}/>
        <LoadMoreButton/>
    </section>
  )
}

export default MainContent
