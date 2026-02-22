import React, { useState } from "react";
import Trainers from "./Trainers";
import FiltersTrain from "./FiltersTrain";
import TrainerCardsCollection from "./TrainerCardsCollection";

const TrainMainContent = () => {

  const [filters, setFilters] = useState({
    service: [],
    age: [],
    batch: [],
    coachOnly: false,
    academyOnly: false,
    contacted: false,
    distance: 10,
  });

  return (
    <main className="flex flex-col gap-6 bg-background pt-6">

      <Trainers setFilters={setFilters} />
      <FiltersTrain filters={filters} setFilters={setFilters} />
      <TrainerCardsCollection filters={filters} />

    </main>
  );
};

export default TrainMainContent;
