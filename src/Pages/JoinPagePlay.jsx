import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileTopNav from "../components/Navbar/MobileTopNav";
import PlayWrapper from "../components/PlayPages/PlayWrapper";
import SportsComplexHome from "../components/SportsComplexHome";
import MobileBottomNav from "../components/Navbar/MobileBottomNav";
import api from "../services/api";

const JoinPagePlay = () => {
  const { playId } = useParams();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");

  /* ================= FETCH GAME ================= */
  const fetchGame = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        `/games/${playId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch game");
      }


      setGame(res.data);
    } catch (err) {
      console.error("Failed to fetch game:", err);
      setGame(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGame();
  }, [playId]);

  /* ================= JOIN GAME ================= */
  const handleJoin = async (message = "") => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/games/${playId}/join`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Join failed");
        return;
      }

      await fetchGame(); // refresh game state
    } catch (err) {
      console.error("Join failed:", err);
    }
  };

  /* ================= LEAVE GAME ================= */
  const handleLeave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(
        `/games/${playId}/leave`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Leave failed");
        return;
      }

      await fetchGame(); // refresh UI
    } catch (err) {
      console.error("Leave failed:", err);
    }
  };

  if (loading) return <div className="p-10">Loading game...</div>;
  if (!game) return <div className="p-10">Game not found</div>;

  return (
    <div className="bg-surface text-main">

      {/* Desktop Navbar */}
      <header className="hidden md:block sticky top-0 z-10 bg-white">
        <DesktopNavbar />
      </header>

      {/* Mobile Navbar */}
      <header className="md:hidden sticky top-0 z-10 bg-white">
        <MobileTopNav />
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-[96px] md:pb-[80px]">
        <PlayWrapper
          game={game}
          onJoin={() => setShowJoinModal(true)}
          onLeave={handleLeave}
        />
        <SportsComplexHome />
      </main>

      <MobileBottomNav />

      {/* ================= JOIN MODAL ================= */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end md:items-center justify-center z-50">

          <div className="bg-white w-full md:max-w-[788px] rounded-t-3xl md:rounded-3xl p-6 flex flex-col gap-6">

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowJoinModal(false)}
                className="w-10 h-10 bg-background rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Title */}
            <div className="text-2xl font-bold text-main">
              Send Join Request
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <div className="text-base font-medium">
                Message (Optional)
              </div>

              <textarea
                value={joinMessage}
                onChange={(e) => setJoinMessage(e.target.value)}
                maxLength={250}
                placeholder="Eg. Hey! I would like to join this game!"
                className="border border-[#e3e8e6] rounded-2xl p-4 min-h-[120px] outline-none resize-none"
              />

              <div className="text-xs text-[#758a88] text-right">
                {joinMessage.length}/250 characters
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={async () => {
                await handleJoin(joinMessage);
                setShowJoinModal(false);
                setJoinMessage("");
              }}
              className="py-3 px-6 rounded-xl bg-[#00b562] text-white font-bold shadow-[0_4px_0_0_#00914e]"
            >
              SEND REQUEST
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default JoinPagePlay;
