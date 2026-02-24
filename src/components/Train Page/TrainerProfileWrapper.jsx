import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

import TrainerProfileSidebar from "./TrainerProfileSidebar";
import TrainerProfile from "./TrainerProfile";
import TrainerProfileAbout from "./TrainerProfileAbout";
import TrainerProfileSimilar from "./TrainerProfileSimilar";
import TrainerProfileRight from "./TrainerProfileRight";
import ViewQueryModal from "./ViewQueryModal";

const TrainerProfileWrapper = () => {
  const { id } = useParams();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [queryModal, setQueryModal] = useState(null);   // ⭐ modal state

  /* ================= FETCH TRAINER ================= */
  const fetchTrainer = async () => {
    try {
      const res = await api.get(`/trainers/${id}`);
      setTrainer(res.data);
    } catch (err) {
      console.error("Failed to load trainer", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, [id]);

  /* ================= CONNECT TRAINER ================= */
  const handleConnect = async () => {
    try {
      await api.post(`/trainers/${id}/contact`, {
        message: "Hi, I am interested.",
      });

      fetchTrainer();
    } catch (err) {
      if (err.response?.status === 400) {
        fetchTrainer();
      } else {
        console.error("Connect failed", err);
      }
    }
  };

  /* ================= VIEW QUERY ================= */
  const handleViewQuery = (query) => {
    setQueryModal(query);
  };

  if (loading) {
    return <div className="text-center py-20">Loading trainer profile...</div>;
  }

  if (!trainer) {
    return <div className="text-center py-20">Trainer not found</div>;
  }

  return (
    <div className="w-full">

      <section className="grid grid-cols-1 md:grid-cols-[23%_50%_23%] gap-6 md:mx-12 mx-4 mt-6">

        <TrainerProfileSidebar trainer={trainer} />

        <div className="flex flex-col gap-6">
          <TrainerProfile trainer={trainer} />
          <TrainerProfileAbout trainer={trainer} />
          <TrainerProfileSimilar trainer={trainer} />
        </div>

        <TrainerProfileRight
          trainer={trainer}
          onConnect={handleConnect}
          onViewQuery={handleViewQuery}
        />

      </section>

      {/*  MODAL */}
      {queryModal && (
        <ViewQueryModal
          query={queryModal}
          onClose={() => setQueryModal(null)}
        />
      )}

    </div>
  );
};

export default TrainerProfileWrapper;
