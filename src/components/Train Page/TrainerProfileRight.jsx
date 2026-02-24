import React from "react";

const TrainerProfileRight = ({ trainer, onConnect, onViewQuery }) => {
  if (!trainer) return null;

  const { userQuery } = trainer;

  return (
    <div className="flex flex-col gap-6">

      <div className="bg-white flex flex-col rounded-2xl gap-4 p-4 w-full shadow border">

        {userQuery ? (
          <>
            <div className="font-bold text-main text-center">
              You’ve already contacted ✅
            </div>

            <button
              onClick={() => onViewQuery(userQuery)}
              className="bg-background py-3 px-4 rounded-2xl font-bold text-xs uppercase border"
            >
              View Query
            </button>

            <div className="text-[#758a80] text-center truncate">
              "{userQuery.message}"
            </div>
          </>
        ) : (
          <>
            <div className="font-bold text-main text-center">
              Interested in this trainer?
            </div>

            <button
              onClick={() => onConnect(trainer)}
              className="bg-[#00b562] text-white py-3 px-4 rounded-2xl font-bold text-xs uppercase"
            >
              Instant Connect
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default TrainerProfileRight;
