import React, { useEffect, useState } from "react";
import TrainersCard from "./TrainersCard";
import { useLocation } from "../../context/LocationContext";
import api from "../../services/api";
import ContactTrainerModal from "./ContactTrainerModal";
import ViewQueryModal from "./ViewQueryModal";

const TrainerCardsCollection = ({ filters }) => {
  const { location } = useLocation();

  const [trainers, setTrainers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [viewQuery, setViewQuery] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  /* ================= DEBOUNCE SEARCH ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [filters.search]);

  /* ================= FETCH TRAINERS ================= */
  const fetchTrainers = async () => {
    if (!location.lat || !location.lng) return;

    try {
      setLoading(true);

      const res = await api.get("/trainers", {
        params: {
          lat: location.lat,
          lng: location.lng,
          distance: filters.distance,
          sport: filters.service?.join(","),
          age: filters.age?.join(","),
          batch: filters.batch?.join(","),
          type: filters.coachOnly
            ? "coach"
            : filters.academyOnly
            ? "academy"
            : "",
          search: debouncedSearch || "", // ⭐ search sent to backend
        },
      });

      setTrainers(res.data.trainers || []);
      setVisibleCount(6);

    } catch (err) {
      console.error("Failed to fetch trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPDATE TRAINERS AFTER CONNECT ================= */
  const handleQuerySent = (trainerId, message) => {
    setTrainers(prev =>
      prev.map(t =>
        t._id === trainerId
          ? {
              ...t,
              interestCount: (t.interestCount || 0) + 1,
              userQuery: {
                message,
                createdAt: new Date(),
              },
            }
          : t
      )
    );
  };

  useEffect(() => {
    fetchTrainers();
  }, [location, filters.distance, filters.service, filters.age, filters.batch, filters.coachOnly, filters.academyOnly, debouncedSearch]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="mx-auto w-full max-w-[1032px] flex flex-col gap-[64px]">

      {/* GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {trainers.slice(0, visibleCount).map((trainer) => (
          <TrainersCard
            key={trainer._id}
            trainer={trainer}
            onConnect={() => setSelectedTrainer(trainer)}
            onViewQuery={(query) => setViewQuery(query)}
          />
        ))}
      </section>

      {/* LOAD MORE */}
      {visibleCount < trainers.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="rounded-2xl bg-[#00b562] px-6 py-3 text-white font-bold shadow-[0_4px_0_0_#00914e]"
          >
            LOAD MORE
          </button>
        </div>
      )}

      {/* CONTACT MODAL */}
      {selectedTrainer && (
        <ContactTrainerModal
          trainer={selectedTrainer}
          onClose={() => setSelectedTrainer(null)}
          onSuccess={(message) => {
            handleQuerySent(selectedTrainer._id, message);
            setSelectedTrainer(null);
          }}
        />
      )}

      {/* VIEW QUERY MODAL */}
      {viewQuery && (
        <ViewQueryModal
          query={viewQuery}
          onClose={() => setViewQuery(null)}
        />
      )}

    </div>
  );
};

export default TrainerCardsCollection;
