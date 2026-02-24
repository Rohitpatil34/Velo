import React from "react";

import PlayJoin from "./PlayJoin";
import PlayPlayers from "./PlayPlayers";
import PlayNearbyVenue from "./PlayNearbyVenue";
import PlaySimilarGames from "./PlaySimilarGames";

const PlayWrapper = ({ game, onJoin, onLeave }) => {
  if (!game) {
    return <div className="p-10">Loading game...</div>;
  }

  const isCreator = game.isCreator;
  const isJoined = game.isJoined;
  const isFull = game.availableSlots <= 0;

  return (
    <section
      className="
        max-w-[1440px] mx-auto w-full
        p-4 md:p-12 md:pt-6
        grid gap-6
        grid-cols-[minmax(66%,952px)]
        md:grid-cols-[minmax(60%,952px)_minmax(25%,360px)]
        xxl:grid-cols-[minmax(73%,952px)_minmax(22%,360px)]
      "
    >
      {/* LEFT COLUMN */}
      <div className="w-full flex flex-col gap-6">
        <PlayJoin game={game} />

        <div className="md:hidden">
          <PlayPlayers game={game} />
        </div>

        <PlaySimilarGames game={game} />
      </div>

      {/* RIGHT COLUMN */}
      <div className="w-full max-w-[360px] mx-auto flex flex-col gap-6">
        <div className="hidden md:block">
          <PlayPlayers game={game} />
        </div>

        <PlayNearbyVenue game={game} />
      </div>

      {/* ================= BOTTOM ACTION BAR ================= */}
      <section
        className="
          fixed left-0 bottom-12 md:bottom-0 w-full
          border border-[#e3e8e6]
          bg-white
          px-4 md:px-14 py-4 md:py-6
          flex justify-center
        "
      >
        <div className="max-w-[1440px] w-full flex justify-end">
          <div className="flex gap-4 w-full md:w-auto justify-center md:justify-end">

            {/* SEND QUERY */}
            <button
              className="
                py-3 px-6 rounded-2xl
                bg-background border border-[#e3e8e6]
                font-bold text-sm md:text-base
                shadow-[0_4px_0_0_#d6dcd9]
              "
            >
              SEND QUERY
            </button>

            {/* JOIN / LEAVE LOGIC */}
            {!isCreator && !isJoined && !isFull && (
              <button
                onClick={onJoin}
                className="
                  py-3 px-6 rounded-2xl
                  bg-[#00b562] hover:bg-green-700
                  font-bold text-sm md:text-base text-white
                  shadow-[0_4px_0_0_#00914e]
                "
              >
                JOIN GAME
              </button>
            )}

            {!isCreator && isJoined && (
              <button
                onClick={onLeave}
                className="
                  py-3 px-6 rounded-2xl
                  bg-red-500 hover:bg-red-600
                  font-bold text-sm md:text-base text-white
                "
              >
                LEAVE GAME
              </button>
            )}

            {isFull && !isJoined && (
              <button
                disabled
                className="
                  py-3 px-6 rounded-2xl
                  bg-gray-400 text-white font-bold
                "
              >
                GAME FULL
              </button>
            )}

            {isCreator && (
              <button
                disabled
                className="
                  py-3 px-6 rounded-2xl
                  bg-gray-400 text-white font-bold
                "
              >
                YOU ARE HOST
              </button>
            )}

          </div>
        </div>
      </section>
    </section>
  );
};

export default PlayWrapper;
