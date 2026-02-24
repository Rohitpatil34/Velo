import React from "react";

const PlayPlayers = ({ game }) => {
  if (!game) return null;

  const host = game.createdBy || {};
  const participants = game.participants || [];

  const totalPlayers = 1 + participants.length;

  return (
    <section
      className="
        m-auto flex-grow max-h-[428px]
        rounded-2xl px-6 bg-white
        flex flex-col gap-6
        overflow-y-auto no-scrollbar
        pb-6
      "
    >
      {/* ================= HEADER ================= */}
      <section className="sticky top-0 bg-white pt-4 flex items-center gap-6">
        <div className="flex-grow text-xl font-bold text-main">
          Players ({totalPlayers})
        </div>
      </section>

      {/* ================= PLAYERS LIST ================= */}
      <section className="flex flex-col gap-6">

        {/* HOST */}
        <PlayerRow
          player={{
            name: host.name || "_",
            avatar:
              host.avatar ||
              "https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png?q=30",
          }}
          showRole
        />

        {/* DIVIDER */}
        {participants.length > 0 && (
          <div className="h-[1px] bg-[#e3e8e6]" />
        )}

        {/* PARTICIPANTS */}
        {participants.map((p) => (
          <PlayerRow
            key={p.user?._id}
            player={{
              name: p.user?.name,
              avatar:
                p.user?.avatar ||
                "https://playo-website.gumlet.io/playo-website-v3/icons/Avatar-man-specs.png?q=30",
            }}
          />
        ))}
      </section>
    </section>
  );
};

/* ================= PLAYER ROW ================= */
const PlayerRow = ({ player, showRole }) => {
  return (
    <section className="flex items-center gap-4">
      <div className="w-[44px] h-[44px] overflow-hidden">
        <img
          src={player.avatar}
          alt={player.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <section className="flex-grow flex flex-col">
        <div className="text-[16px] font-medium text-main">
          {player.name}
        </div>

        {showRole && (
          <div className="text-sm text-[#758a80]">
            Host
          </div>
        )}
      </section>
    </section>
  );
};

export default PlayPlayers;
