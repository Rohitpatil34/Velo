import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";

const TrainerProfileSimilar = () => {
  const { id } = useParams();
  const scrollRef = useRef();
  const [trainers, setTrainers] = useState([]);
  const [currentTrainer, setCurrentTrainer] = useState(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 350;
    scrollRef.current.scrollLeft += direction === "left" ? -amount : amount;
  };

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        /* get current trainer */
        const t = await api.get(`/trainers/${id}`);
        setCurrentTrainer(t.data);

        const { coordinates } = t.data.location;

        /* fetch trainers nearby */
        const res = await api.get("/trainers", {
          params: {
            lat: coordinates.coordinates[1],
            lng: coordinates.coordinates[0],
            limit: 10,
          },
        });

        /* remove current trainer */
        const filtered = res.data.trainers.filter((tr) => tr._id !== id);
        setTrainers(filtered);

      } catch (err) {
        console.error(err);
      }
    };

    fetchSimilar();
  }, [id]);

  return (
    <div className="flex w-full mx-auto flex-col gap-4 bg-white rounded-2xl border border-[#e3e8e6]">

      <h2 className="px-4 text-base font-bold text-main pt-4 md:pt-6">
        Similar Trainers / Academies
      </h2>

      <div className="relative overflow-hidden">
        <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar pb-4">

          {trainers.map((trainer) => (
            <div key={trainer._id} className="min-w-[296px] px-4 flex-shrink-0">

              <Link
                to={`/trainer/details/${trainer._id}`}
                className="rounded-2xl border border-[#e3e8e6] bg-white overflow-hidden shadow h-full block"
              >
                <div className="relative">
                  <img
                    src={trainer.images?.[0]}
                    alt={trainer.name}
                    className="w-full h-[160px] object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold">
                    {trainer.type}
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-bold text-main">{trainer.name}</h3>
                  <div className="text-sm text-main">
                    {trainer.location?.city}
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    {trainer.interestCount} showed Interest
                  </div>
                </div>
              </Link>

            </div>
          ))}

        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center items-center mb-6 gap-3">
        <button
          onClick={() => scroll("left")}
          className="bg-white w-11 h-11 rounded-full shadow flex justify-center items-center"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="left"
            className="rotate-180"
            width="20"
          />
        </button>

        <button
          onClick={() => scroll("right")}
          className="bg-white w-11 h-11 rounded-full shadow flex justify-center items-center"
        >
          <img
            src="https://playo-website.gumlet.io/playo-website-v3/icons/right_arrow.png"
            alt="right"
            width="20"
          />
        </button>
      </div>
    </div>
  );
};

export default TrainerProfileSimilar;
