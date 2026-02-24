import React from "react";

const TrainerProfileSidebar = ({ trainer }) => {
  if (!trainer) return null;

  const {
    name,
    type,
    images = [],
    interestCount = 0,
    location = {},
    services = [],
    ageGroups = [],
    batchTypes = [],
  } = trainer;

  const lat = location?.coordinates?.coordinates?.[1];
  const lng = location?.coordinates?.coordinates?.[0];

  return (
    <div className="w-full bg-background flex flex-col gap-8 justify-start rounded-3xl border break-words overflow-hidden bg-[linear-gradient(180deg,_#C5FCEB_5%,_#FFF_23%)] p-6">

      <div className="grow flex flex-col gap-[34px]">

        {/* Interested */}
        <div className="w-full flex flex-col gap-2 justify-start items-center">
          <div className="text-main text-sm font-medium w-full text-center">
            {interestCount} People interested
          </div>
        </div>

        {/* Trainer Info */}
        <div className="w-full flex flex-col gap-2 justify-start items-center">

          <div className="w-[150px] h-[150px] overflow-hidden rounded-2xl relative mb-2">
            <img
              src={
                images[0] ||
                "https://playo-website.gumlet.io/playo-website-v3/icons/trainer/Placeholder_Academy.png"
              }
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute w-full text-center bottom-2">
              <span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm text-main font-semibold uppercase">
                {type}
              </span>
            </div>
          </div>

          <h1 className="text-2xl text-main font-bold w-full text-center">
            {name}
          </h1>

          {/* Location */}
          <div className="flex flex-col w-full">
            <div className="w-full h-[1px] mt-2 mb-4 bg-[#e3e8e6]" />

            <span className="max-w-[268px] mx-auto w-full text-sm text-center font-medium text-main">
              {location?.city}, {location?.area}
            </span>

            {lat && lng && (
              <a
                href={`https://www.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col mt-5 cursor-pointer"
              >
                <iframe
                  height="172"
                  title="trainer-map"
                  loading="lazy"
                  width="100%"
                  frameBorder="0"
                  src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                  className="rounded-lg pointer-events-none"
                />
              </a>
            )}

          </div>

          {/* Batch Type */}
          <div className="flex flex-col mt-2 gap-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex justify-center gap-4 items-center">
                <div className="max-w-[268px] flex flex-wrap gap-2 justify-center items-center font-medium text-main text-sm">
                  {batchTypes.map((b, i) => (
                    <span key={i}>{b} •</span>
                  ))}
                </div>
              </div>

              {ageGroups.length > 0 && (
                <div className="flex items-center gap-2">
                  <img
                    src="https://playo-website.gumlet.io/playo-website-v3/icons/trainer/kidsAdult.png"
                    alt="age"
                    width="24"
                  />
                  <div className="rounded-md text-sm font-medium text-main">
                    {ageGroups.join(" & ")}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sports */}
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full h-[1px] my-2 bg-[#e3e8e6]" />
            <div className="font-bold text-main flex justify-center items-center">
              Sports
            </div>

            <div className="flex justify-center items-center gap-2 flex-wrap text-sm md:text-base">
              {services.map((s, i) => (
                <span key={i}>{s} •</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrainerProfileSidebar;
